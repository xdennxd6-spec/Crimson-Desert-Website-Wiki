import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./db/schema.ts",
  // Bewusst NICHT "netlify/database/migrations": diesen Pfad wendet Netlify beim Deploy
  // automatisch gegen die DB an. Migrationen liegen daher ausserhalb (db/migrations/)
  // und werden manuell angewendet (s. netlify.toml).
  out: "db/migrations",
});
