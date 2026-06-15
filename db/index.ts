// Runtime-DB-Verbindung (visits.mts Besucherzaehler + progress.mts Progress-Sync).
//
// Bewusst ENTKOPPELT vom Netlify-Build: Das Paket "@netlify/database" wurde aus
// package.json entfernt. Seine blosse Anwesenheit liess Netlify bei JEDEM Deploy eine DB
// bereitstellen bzw. fuer Deploy-Previews einen DB-Branch anlegen ("Netlify Database
// setup"). War die monatliche Neon-Active-Time-Quota erschoepft, scheiterte schon dieser
// Schritt (createSiteDatabaseBranch -> HTTP 500) und brach den GESAMTEN Build/Deploy ab --
// auch reine Frontend-Aenderungen. Ohne das Paket fasst der Build die DB nicht mehr an.
//
// Die Functions verbinden sich daher zur LAUFZEIT direkt per Connection-String aus einer
// Env-Var (in der Netlify-UI setzbar; der bestehende Neon-String kann wiederverwendet
// werden). Mehrere Namen werden akzeptiert.
import { drizzle } from "drizzle-orm/netlify-db";
import * as schema from "./schema.js";

const connectionString =
  process.env.NETLIFY_DB_URL ??
  process.env.NETLIFY_DATABASE_URL ??
  process.env.DATABASE_URL;

// Lazy konstruieren: ein fehlender Connection-String soll die Function NICHT schon beim
// Import (Cold-Start) crashen -- der Fehler faellt erst beim ersten DB-Zugriff an und wird
// vom try/catch der Functions abgefangen (visits.mts degradiert dann sauber auf den
// localStorage-Fallback statt hart zu 5xx).
let _db: any;
function getDb(): any {
  if (_db) return _db;
  if (!connectionString) {
    throw new Error(
      "Keine DB-Verbindung gesetzt: erwartet NETLIFY_DB_URL, NETLIFY_DATABASE_URL oder DATABASE_URL.",
    );
  }
  _db = drizzle(connectionString, { schema });
  return _db;
}

export const db: any = new Proxy(
  {},
  {
    get(_target, prop) {
      const real = getDb();
      const value = real[prop];
      return typeof value === "function" ? value.bind(real) : value;
    },
  },
);
