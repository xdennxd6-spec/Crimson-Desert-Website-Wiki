import { getUser } from "@netlify/identity";
import type { Context } from "@netlify/functions";
import { db } from "../../db/index.js";
import { userProgress } from "../../db/schema.js";
import { eq } from "drizzle-orm";

export default async (req: Request, context: Context) => {
  const user = await getUser(req, context);
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "https://crimson-desert-website-wiki.netlify.app",
  };

  if (req.method === "GET") {
    const rows = await db
      .select()
      .from(userProgress)
      .where(eq(userProgress.userId, user.id));

    const checkedItems = rows[0]?.checkedItems ?? [];
    return Response.json({ checkedItems }, { headers });
  }

  if (req.method === "POST") {
    const body = await req.json();
    const checkedItems: string[] = Array.isArray(body.checkedItems)
      ? body.checkedItems
      : [];

    await db
      .insert(userProgress)
      .values({ userId: user.id, checkedItems })
      .onConflictDoUpdate({
        target: userProgress.userId,
        set: {
          checkedItems,
          updatedAt: new Date(),
        },
      });

    return Response.json({ ok: true }, { headers });
  }

  return new Response("Method Not Allowed", { status: 405 });
};

export const config = {
  path: "/api/progress",
};
