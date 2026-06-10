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
    "Access-Control-Allow-Origin": "https://crimson-desert-wiki.netlify.app",
  };

  try {
    if (req.method === "GET") {
      const rows = await db
        .select()
        .from(userProgress)
        .where(eq(userProgress.userId, user.id));

      const checkedItems = rows[0]?.checkedItems ?? [];
      return Response.json({ checkedItems }, { headers });
    }

    if (req.method === "POST") {
      const body = await req.json().catch(() => null);
      if (!body || !Array.isArray(body.checkedItems)) {
        return Response.json({ error: "checkedItems (Array) erwartet" }, { status: 400, headers });
      }
      // Validierung: nur Strings, begrenzte Laenge und Anzahl (Schutz vor Muell-Payloads)
      const checkedItems: string[] = body.checkedItems
        .filter((x: unknown): x is string => typeof x === "string" && x.length <= 200)
        .slice(0, 5000);

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
  } catch (err) {
    console.error("progress.mts:", err);
    return Response.json({ error: "Interner Fehler" }, { status: 500, headers });
  }
};

export const config = {
  path: "/api/progress",
};
