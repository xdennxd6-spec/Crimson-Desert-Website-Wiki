// netlify/functions/visits.mts
// Selbst-gehosteter, ANONYMER Besucherzaehler fuer das Crimson-Desert-Wiki.
// Ersetzt den toten countapi.xyz. Oeffentlich, KEIN Auth, Same-Origin.
//
// DESIGN (Korrektheit + Robustheit + DSGVO):
//  - Genau 2 Tabellen, KEINE Abhaengigkeit von der Migrations-Pipeline:
//    Schema wird per CREATE TABLE IF NOT EXISTS in der Function angelegt
//    (idempotent, selbstheilend nach DB-Reset; nur 1x pro Cold-Start dank Flag).
//  - Neon-HTTP kann KEINE Multi-Statement-Transaktion pro Aufruf -> jeder
//    Increment ist GENAU EIN atomares Statement:
//      INSERT ... ON CONFLICT (key) DO UPDATE SET count = t.count + 1 RETURNING count
//    ON CONFLICT serialisiert konkurrierende Schreiber auf derselben Zeile,
//    RETURNING liefert den post-increment-Wert atomar -> kein read-modify-write,
//    keine verlorenen Hits bei gleichzeitigen Besuchern.
//  - "Heute" wird serverseitig in EINER festen Zeitzone (Europe/Berlin) per
//    Postgres berechnet -> Tageswechsel um Berliner Mitternacht, DST-sicher,
//    Client/Server sehen immer denselben Tag.
//  - "Online" = echte Praesenz ueber eine ephemere, anonyme Session-ID
//    (sessionStorage). KEINE IP, KEIN persistenter Personen-/Geraete-Identifier.
//  - Alle Werte via sql`...${value}` parameterisiert ($1) -> injektionssicher,
//    KEIN String-Concat, KEINE erfundenen Drizzle-Query-Builder-Aufrufe.
//
// neon-http Rueckgabeform: db.execute(sql`...`) liefert (raw-execute-Pfad ohne
// select-fields) ein FullQueryResults-Objekt, d.h. Zeilen via result.rows.
// Verifiziert gegen drizzle-orm neon-http session.ts (rawQueryConfig->fullResults).
// Da package.json drizzle-orm auf "beta" (ungepinnt) haelt, deckt rowsOf()
// defensiv BEIDE Formen ab (Objekt-mit-.rows ODER nacktes Array) -> bricht nicht
// still, falls eine kuenftige Beta die Form aendert.

import type { Context } from "@netlify/functions";
import { db } from "../../db/index.js";
import { sql } from "drizzle-orm";

// Praesenz-Fenster (klein & explizit fuer Wartbarkeit).
const ONLINE_WINDOW = "5 minutes"; // gilt als "online", wenn innerhalb gesehen
const PRESENCE_TTL = "1 day"; // aeltere Praesenz-Zeilen werden geprunt
const SID_MAX = 64; // Laenge der ephemeren Session-ID begrenzen

// Einmal-pro-Cold-Start-Guard, damit das DDL nicht bei JEDEM Request laeuft.
// Wiederholtes Ausfuehren waere 100% sicher (IF NOT EXISTS); das ist nur eine
// Cold-Start-Kostenoptimierung.
let schemaReady = false;

// Defensiver Reader: deckt FullQueryResults (Objekt mit .rows) UND ein nacktes
// Array ab. So bleibt das Auslesen der RETURNING/COUNT-Spalte robust.
function rowsOf(res: any): any[] {
  if (!res) return [];
  if (Array.isArray(res)) return res;
  if (Array.isArray(res.rows)) return res.rows;
  return [];
}

const num = (v: any): number => {
  const n = Number(v); // PG BIGINT kommt als String zurueck -> Number()
  return Number.isFinite(n) ? n : 0;
};

// Idempotentes DDL. Laeuft VOR jeglichem DML (Neon-HTTP: ein Statement pro execute()).
async function ensureSchema(): Promise<void> {
  if (schemaReady) return;
  // Aggregat-Zaehler: key = 'total' (gesamt) oder 'day:YYYY-MM-DD' (Berlin-Tag).
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS visit_counters (
      key   TEXT PRIMARY KEY,
      count BIGINT NOT NULL DEFAULT 0
    )
  `);
  // Ephemere, anonyme Praesenz. sid = zufaellige Session-ID aus sessionStorage.
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS visit_presence (
      sid       TEXT PRIMARY KEY,
      last_seen TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `);
  // Beschleunigt "Online der letzten 5 Min" + Pruning (Tabelle bleibt winzig).
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS visit_presence_last_seen_idx
      ON visit_presence (last_seen)
  `);
  schemaReady = true;
}

// Heutiger Counter-Key in fester Zeitzone (Europe/Berlin), als sql-Fragment.
// to_char((now() AT TIME ZONE 'Europe/Berlin')::date, 'YYYY-MM-DD') -> z.B. "day:2026-06-06".
// Direkt in die Statements eingebettet -> KEIN extra DB-Roundtrip fuer den Key.
const dayKeyExpr = sql`'day:' || to_char((now() AT TIME ZONE 'Europe/Berlin')::date, 'YYYY-MM-DD')`;
const totalKeyExpr = sql`'total'`;

// Atomarer Increment EINES Counters; gibt den NEUEN Wert zurueck (post-increment).
async function bumpCounter(keyExpr: ReturnType<typeof sql>): Promise<number> {
  const res = await db.execute(sql`
    INSERT INTO visit_counters (key, count)
    VALUES (${keyExpr}, 1)
    ON CONFLICT (key) DO UPDATE SET count = visit_counters.count + 1
    RETURNING count
  `);
  return num(rowsOf(res)[0]?.count);
}

// Reiner Lesewert eines Counters (kein Increment; 0 falls nicht vorhanden).
async function readCounter(keyExpr: ReturnType<typeof sql>): Promise<number> {
  const res = await db.execute(sql`
    SELECT count FROM visit_counters WHERE key = ${keyExpr}
  `);
  return num(rowsOf(res)[0]?.count);
}

// Saeubert die client-gelieferte Session-ID: anonym, opak, laengenbegrenzt.
// (DB ist ohnehin parametrisiert -> injektionssicher; das ist Hygiene/Bounds.)
function cleanSid(raw: string | null): string | null {
  if (!raw) return null;
  const s = String(raw).replace(/[^A-Za-z0-9_-]/g, "").slice(0, SID_MAX);
  return s.length >= 8 ? s : null;
}

export default async (req: Request, _context: Context) => {
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    // Same-Origin -> kein CORS noetig. Live-Zahlen NICHT cachen.
    "Cache-Control": "no-store, max-age=0",
  };

  if (req.method !== "GET" && req.method !== "HEAD") {
    return new Response("Method Not Allowed", {
      status: 405,
      headers: { Allow: "GET, HEAD" },
    });
  }

  try {
    await ensureSchema();

    const url = new URL(req.url);
    const isHit = url.searchParams.get("hit") === "1"; // Client-Wunsch (untrusted)
    const sid = cleanSid(url.searchParams.get("sid"));

    // 1) Praesenz ZUERST upserten — und dabei serverseitig feststellen, ob die
    //    sid NEU ist (xmax = 0 nur bei echtem INSERT, nicht bei UPDATE). Der
    //    Zaehler wird NUR fuer neue sids erhoeht: ein Client, der ?hit=1 spammt,
    //    trifft immer dieselbe Praesenz-Zeile und inkrementiert nichts mehr
    //    (Manipulations-/Neon-Quota-Schutz). Ohne sid wird nie gezaehlt.
    let isNewSid = false;
    if (sid) {
      const pres = await db.execute(sql`
        INSERT INTO visit_presence (sid, last_seen)
        VALUES (${sid}, now())
        ON CONFLICT (sid) DO UPDATE SET last_seen = now()
        RETURNING (xmax = 0) AS is_new
      `);
      isNewSid = rowsOf(pres)[0]?.is_new === true;
    }
    const countHit = isHit && isNewSid;

    // 2) Zaehler: total + today sind voneinander unabhaengige Zeilen -> die
    //    beiden einzelnen, je atomaren Statements laufen parallel (Promise.all).
    const [total, today] = await Promise.all([
      countHit ? bumpCounter(totalKeyExpr) : readCounter(totalKeyExpr),
      countHit ? bumpCounter(dayKeyExpr) : readCounter(dayKeyExpr),
    ]);

    // 3) Pruning (best-effort; Fehler darf die Antwort NICHT kippen).
    //    Laeuft NUR, wenn gerade eine neue sid dazugekommen ist. Die Tabelle
    //    waechst ausschliesslich durch neue sids — wer nie eine anlegt, muss auch
    //    nicht aufraeumen. Das koppelt die Putzarbeit ans tatsaechliche Wachstum
    //    und spart bei Wiederkehrern einen von fuenf Neon-Roundtrips pro Aufruf
    //    (relevant, weil Neon-Quota und Netlify-Function-Aufrufe gedeckelt sind).
    //    Die TTL ist ein Tag, ein paar Minuten Verzug schaden also nichts.
    if (isNewSid) {
      try {
        await db.execute(sql`
          DELETE FROM visit_presence
          WHERE last_seen < now() - (${PRESENCE_TTL})::interval
        `);
      } catch {
        /* prune ist nicht kritisch */
      }
    }

    // 4) Online = aktive Praesenz der letzten 5 Minuten.
    const onRes = await db.execute(sql`
      SELECT COUNT(*)::int AS online
      FROM visit_presence
      WHERE last_seen > now() - (${ONLINE_WINDOW})::interval
    `);
    // Mindestens 1: der/die aktuelle Besucher:in ist gerade da.
    const online = Math.max(1, num(rowsOf(onRes)[0]?.online));

    return Response.json({ ok: true, total, today, online }, { headers });
  } catch (err) {
    // Niemals ein hartes 5xx fuer einen kosmetischen Zaehler: Wir antworten mit
    // HTTP 200 + ok:false, damit das Frontend deterministisch seinen
    // localStorage-Fallback behaelt (Felder zeigen NIE "—").
    console.error("visits function error:", err);
    return Response.json(
      { ok: false, error: "counter_unavailable" },
      { status: 200, headers }
    );
  }
};

export const config = {
  path: "/api/visits",
};