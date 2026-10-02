# Crimson Desert Website Wiki — Projektregeln

## Offene Aufgaben
- **ZUERST `git fetch && git pull --ff-only`** (siehe Sync-Disziplin unten), dann aktuellen `index.html`-Stand bewerten — NICHT blind dem alten Handover folgen.
- **Arbeitsplan Aktualisierung & Faktencheck (seit 01.10.2026): `.claude/WIKI-PLAN.md`** — Blöcke 1–7 mit Terminen, Rollen (Opus nur Orchestrator-Planung/-Integration, Rest Sonnet), Stand und Backlog. Block 1 (Aktualität + Bosse) und Block 2 (Story & Quests, inkl. 2b Fraktionen/Nebenquests am 03.10.) erledigt, gearbeitet auf dem Hosting-Pi (winklerWak) in `~/cdwiki-work/repo`.
- `.claude/audit-handover.json` ist der Fable-5-Vollaudit vom 2026-06-10 und inzwischen GROSSTEILS ERLEDIGT (NPCs, Bestiarium, Crafting 12->310, Witch-Synthese-Baum, SEO-Seiten, Patch 1.11, Kuku-Gadgets, Abyss-Cores). Offen nur noch marginale Optionalpunkte (Waffen-crit/slots-Restluecken, PWA-Manifest-Screenshots, Monolith-Aufteilung nach Absprache).

## Zweites Repo: der Arbeitskontext (privat)
Zu diesem Projekt gehören ZWEI Repos. Dieses hier ist die Website. Der **Arbeitskontext**
liegt seit 2026-08-21 im privaten Repo **`xdennxd6-spec/crimson-wiki-werkstatt`**:
Recherche-Rohdaten, Auswerteskripte, Prüfberichte, Codex-Prompts, Screenshots und der
Projektstand — alles, was vorher nur auf dem PC lag und beim Maschinenwechsel verloren ging.

- **Auf dem PC:** `G:\Claude\Crimson-Wiki-Werkstatt\`
- **Auf dem Pi:** `~/crimson-wiki-werkstatt` (klonen, falls noch nicht vorhanden)
- **Erste Anlaufstelle dort ist `STATUS.md`** — Projekthistorie und offene Punkte. Vor
  größeren Aufgaben dort nachsehen, statt den Stand aus dem Code zu erraten.
- Archiv unter `archiv/<projektordner>/`, u.a. `Crimson-Desert-Patch-Update` (Patch-Pflege
  samt Insert-Skript), `Crimson-Desert-Fundorte`, `Crimson-Wiki-Faktencheck`.
- Kein Deploy, kein Build → dort darf **jederzeit gepusht** werden, anders als in diesem Repo.
- Auf dem PC spiegelt `sync-von-g.ps1` neue Arbeit von `G:\Claude\Crimson-*` ins Archiv.
  Auf dem Pi ist das Skript wirkungslos, dort direkt unter `archiv/` arbeiten.

Ist das Repo auf der aktuellen Maschine nicht vorhanden, den User fragen statt es
anzulegen — es ist privat und braucht Credentials, die Claude nicht anfassen darf.

## Projekt
- **Lokaler Ordner (seit 09.09.2026):** `G:\Claude\Crimson-Desert-Wiki\website\` (der alte Desktop-Ordner `deploy-69fcff9bfbeb7525ed81aec7` ist nur noch eine Kopie)
- **GitHub:** https://github.com/xdennxd6-spec/Crimson-Desert-Website-Wiki
- **Live-URL:** https://crimson-desert-wiki.com (eigene Domain seit 09/2026). **Hosting seit 29.09.2026: eigener Raspberry Pi 5** (nginx + Cloudflare Tunnel + kleiner API-Dienst), NICHT mehr Netlify. Die alte Adresse `crimson-desert-wiki.netlify.app` bleibt nur als Mini-Umleitung auf Netlify bestehen (siehe Abschnitt Hosting)
- **Haupt-Datei:** `index.html` (~9.600 Zeilen, Markup+CSS+Renderer) + `data/d01…d08-*.js`
  (Datenkonstanten, seit 23.08.2026 ausgelagert; laden per `<script src>` vor dem Hauptscript)

## Hosting (seit 29.09.2026: Raspberry Pi, nicht mehr Netlify)
- `https://crimson-desert-wiki.com` (Apex + `www`) wird vom Pi 5 ausgeliefert: Cloudflare (DNS/Proxy) → Cloudflare Tunnel → nginx → Webroot; `/api/` geht an den lokalen Python-Dienst (`127.0.0.1:8790`, SQLite). Betrieb, Deploy-Ablauf, Rückweg und Fehlersuche: `pi-hosting/LIESMICH.md` im Arbeitsordner `G:\Claude\Crimson-Desert-Wiki\pi-hosting\`.
- **Deploy = Push auf `main`** (siehe Git-Regeln). Der Pi holt binnen ca. 2 Minuten und liefert den Stand **wie eingecheckt** aus: **Der Pi baut nichts und führt keinen Repo-Code aus** (kein node, kein `gen-seo`, kein `verify-seo`). Also VOR JEDEM PUSH am PC `node scripts/gen-seo.mjs` + `node scripts/verify-seo.mjs` laufen lassen und die erzeugten Seiten (`bosse.html`, `waffen.html`, … und `sitemap.xml`) mitcommitten. Nicht ausgeliefert werden Entwicklerdateien (`scripts/`, `.claude/`, `package.json`, `netlify.toml`, `legacy-netlify/`, `README.md` u. a.).
- **Sync statt Konto:** Netlify Identity ist entfernt. „🔑 Sync" (Sidebar) erzeugt einen Sync-Code oder nimmt einen vorhandenen; synchronisiert wird nur die True-Ending-Checkliste. Der bisherige Serverstand aus dem Netlify-Login wurde NICHT übernommen (lokal abgehakte Einträge bleiben im Browser und wandern beim Erstellen eines Codes auf den Server).
- **Netlify-Rest:** Die Netlify-Site `crimson-desert-wiki` liefert nur noch `legacy-netlify/` (Search-Console-Verifikationsdatei + `migrate-storage.html`) und leitet alles andere der alten Adresse `crimson-desert-wiki.netlify.app` per 301 auf die Domain um (`netlify.toml`, ausführlicher Kommentar dort). Bis 31.03.2027 so lassen, dann Netlify-Site löschen und `netlify.toml` + `legacy-netlify/` entfernen. Änderungen an diesen beiden Dateien lösen einen Netlify-Build aus, sonst wird übersprungen.
- Die Kopien von `googleae4c65c5953c849f.html` und `migrate-storage.html` im Repo-Root gehören zur Pi-Auslieferung (Search-Console-Verifikation der neuen Property), die in `legacy-netlify/` zur alten Adresse. Beide Verifikationsdateien sind identisch zu halten. **`migrate-storage.html` unterscheidet sich absichtlich:** die Root-Kopie nimmt `cd_sync_code` nicht ins Fragment `#cdmig=` (Browserverlauf), die Kopie in `legacy-netlify/` bleibt unverändert (die alte Adresse hatte nie einen Code).

## Git / Push Regeln — WICHTIG
- **NIEMALS automatisch pushen.** Immer erst den User fragen: "Soll ich das auf GitHub pushen?"
- Mehrere Änderungen sammeln und in einem einzigen Push bündeln (jeder Push geht binnen ca. 2 Minuten live, es gibt kein „Zurückholen" ohne neuen Commit)
- **Deploy = Push auf `main`.** Der Pi holt neue Commits von GitHub (Timer alle ~2 min), prüft den Stand (nur Shell-Prüfungen, keine Repo-Skripte) und schaltet atomar um. Keine Netlify-Build-Minuten mehr, kein Kontingent. **Der Pi generiert keine SEO-Seiten:** `gen-seo` + `verify-seo` vorher am PC (siehe Abschnitt SEO-Landing-Pages).

## Sync-Disziplin Pi + PC — WICHTIG (vor JEDER Wiki-Änderung)
Pi (schinkler) UND der PC pushen beide auf dieses Repo. Ohne Sync entsteht Divergenz (doppelte Arbeit, Merge-Konflikte) — genau das passierte am 2026-06-17 (Kuku/Synthese auf beiden Maschinen parallel gebaut).
- **Vor jeder Änderung: `git fetch origin && git pull --ff-only`** auf den aktuellen `main`. Erst arbeiten, wenn lokal == origin/main.
- Bei Divergenz / eigenen ungepushten Commits / nicht-ff-Pull: STOPP, nichts überschreiben, erst klären (ggf. Backup-Tag setzen).
- Immer nur EINE Maschine bearbeitet das Wiki zur Zeit. Nach fremdem Push erst wieder pullen.
- **Pflicht-Verifikation vor jedem Push:** `node scripts/verify-crafting.mjs` grün UND echter Headless-Chrome-Render (0 JS-Fehler, Karten-/Daten-Counts plausibel, keine Dubletten) — NICHT nur jsdom (das verdeckt Scope-/Init-Fehler). Chrome: `C:\Program Files\Google\Chrome\Application\chrome.exe`; Methode: Test-Kopie mit injiziertem `ensureAllRendered()` + `--dump-dom`, Ergebnis aus dem DOM-Dump lesen. Zusätzlich `node scripts/gen-seo.mjs` + `node scripts/verify-seo.mjs` (der Pi baut nichts) und die erzeugten Seiten committen.
- **Keine erfundenen Spielfakten.** Gegen echte Guides (game8 / Fextralife / VULKK / PowerPyx / Pearl Abyss) verifizieren; Unsicherheit als `conf`-Flag bzw. „nicht erfasst" markieren statt raten.

## Token-sparendes Datei-Lesen via GitHub Raw URL
- GitHub MCP ist NICHT verfügbar — stattdessen Raw-URL nutzen:
  `https://raw.githubusercontent.com/xdennxd6-spec/Crimson-Desert-Website-Wiki/main/index.html`
- Für andere Dateien: `https://raw.githubusercontent.com/xdennxd6-spec/Crimson-Desert-Website-Wiki/main/PFAD`
- Repo ist public → kein Token nötig
- WebFetch auf Raw-URL ist der bevorzugte Weg um index.html zu lesen (spart Token vs. lokalem Read)
- Lokales Read-Tool nur nutzen wenn Änderungen noch nicht gepusht sind
- **Seit 23.08.2026 liegen die Spieldaten (Waffen/Crafting/Quests/Armor/Fraktionen/Items/
  Patches/Ruinen) in `data/d01…d08-*.js`, NICHT mehr in `index.html`.** Für Datenfragen
  daher die passende Raw-URL unter `.../main/data/dNN-*.js` lesen statt `index.html` —
  sonst fehlt der eigentliche Inhalt.

## KI-Auslagerung an Gemini 3 Pro — Token sparen
**Ziel:** Einfache, gut abgrenzbare Teilaufgaben NICHT selbst erledigen, sondern dem User
einen fertigen Prompt geben, den er an Google Gemini 3 Pro weitergibt. Spart Claude-Usage.

**Wann auslagern (proaktiv anbieten):**
- Reine Recherche / Faktensammlung (z.B. "finde Bild-URLs für Liste X")
- Texte schreiben/umformulieren ohne Code-Kontext (Beschreibungen, Lore, Notizen)
- Listen/Tabellen/JSON aus bekannten Fakten erzeugen
- Übersetzungen, Zusammenfassungen, Stichpunkte
- Wiederholende Fleißarbeit nach klarem Muster

**Niemals auslagern (selbst machen):**
- Änderungen an `index.html` oder anderem Code (Edit/Integration/Verifikation)
- Aufgaben die Repo-Kontext, Dateipfade oder bestehende Logik brauchen
- Architektur-Entscheidungen, Debugging, alles mit Urteilsvermögen
- Git/Push/Deploy

**Format wenn ich auslagern kann:** Ich sage kurz WAS ausgelagert wird und liefere einen
abgeschlossenen Prompt in einem Codeblock. Regeln für den Prompt:
- Auf Deutsch, simpel formuliert (Gemini ist schwächer als Claude — keine verschachtelten Aufgaben)
- Komplett selbsterklärend (kein Verweis auf "das Projekt" / diese Konversation)
- Exaktes Output-Format vorgeben (z.B. "antworte nur als JSON: {name: url}")
- Eine Aufgabe pro Prompt, nicht mehrere mischen
- Danach: User gibt mir das Ergebnis zurück, ICH baue es ein und verifiziere

## Workflow
1. Änderungen lokal in `index.html` vornehmen
2. User fragen ob gepusht werden soll
3. Bei Ja: `git add . && git commit -m "..." && git push`
4. Der Pi deployt automatisch (Timer, ca. 2 Minuten nach dem Push)

## Linkcheck externe Bilder
- `node scripts/linkcheck.mjs` prüft alle externen URLs der *_IMGS-Maps (HEAD/GET, Exit 1 bei Brüchen).
- Periodisch bzw. vor größeren Releases laufen lassen; kaputte questlog-/Fextralife-Links durch lokale Spiegel ersetzen (cd_assets/*/fex/).

## SEO-Landing-Pages (statisch, aus index.html generiert)
- **Ziel:** organischer Google-Traffic. Single-Page-App (`index.html`) ist für Crawler schlecht indexierbar (JS-nachgeladener Inhalt). Daher zusätzlich statische, vorgerenderte Seiten mit echten URLs.
- **Generator:** `node scripts/gen-seo.mjs` — extrahiert BOSSES/WEAPONS/TRUE_ENDING (+ BOSS_IMGS/WEAPON_IMGS) per balancierter-Klammern-`eval` aus `index.html` (Single Source of Truth, KEINE Datenduplizierung) und schreibt `bosse.html`, `waffen.html`, `true-ending.html` + `sitemap.xml`.
- **Build:** Es gibt keinen Build auf dem Server. `node scripts/gen-seo.mjs && node scripts/verify-seo.mjs` laufen **vor jedem Push am PC** (keine Abhängigkeiten, kein `npm install`); die erzeugten Seiten werden mitcommittet, sonst gehen veraltete Seiten live. `sitemap.xml` wird wie eingecheckt ausgeliefert. `gen-seo` setzt dort immer das heutige `<lastmod>`: nur bei echten Datenänderungen mitcommitten, sonst `git checkout sitemap.xml`.
- **Verifikation:** `node scripts/verify-seo.mjs` (Exit 1 bei Fehlern) prüft Soll-Mengen (dynamisch aus index.html), eindeutige Titel/Descriptions, Längen, canonical, valides JSON-LD, Deep-Links, Existenz aller referenzierten lokalen Bilder, sitemap-Einträge.
- **URLs:** nginx liefert `bosse.html` unter `/bosse` aus (`try_files $uri $uri.html`, `/bosse/` → 301 auf `/bosse`, wie zuvor bei Netlify Pretty URLs); canonical/sitemap/Links nutzen die `.html`-losen Pfade (`/bosse`, `/waffen`, `/true-ending`). CTAs springen via `/#sec-...` zurück in die App.
- **ERLEDIGT / geprüft am 24.08.2026:** Die Live-Site `/bosse` liefert 200; `/bosse/` antwortet mit 301 auf `/bosse`. Canonical und Sitemap verwenden bereits die passende Form ohne Slash, daher ist keine Umstellung nötig.
- **Search Console (Stand 17.09.2026):** Zwei URL-Präfix-Properties, beide per `googleae4c65c5953c849f.html` bestätigt: die alte `https://crimson-desert-wiki.netlify.app/` (Adressänderung auf die neue Domain eingereicht, 180 Tage Migrationsfenster, der 301 muss so lange bleiben) und die neue `https://crimson-desert-wiki.com/` (Sitemap eingereicht, 13 Seiten erkannt). Die 12 Unterseiten waren bis dahin „Gefunden – zurzeit nicht indexiert“; Indexierungsanträge über die URL-Prüfung auf der NEUEN Property stellen (Kontingent ca. 10 pro Tag).

## Tech Stack
- Static Single-Page HTML/JS/CSS App (kein Build-Step nötig, `package.json` ohne Abhängigkeiten)
- `npx serve -p 5000 .` zum lokalen Testen (die `/api/*`-Aufrufe laufen dann ins Leere: Zähler fällt auf localStorage zurück, Sync-Anfragen scheitern sauber; zum Testen ein Mock nötig)
- Backend (Besucherzähler `/api/visits`, Sync `/api/sync`, `/api/health`) ist ein Python-Dienst mit SQLite auf dem Pi, NICHT in diesem Repo (Quelle im Arbeitsordner `G:\Claude\Crimson-Desert-Wiki\pi-hosting\api\`, Vertrag und Betrieb dort in `LIESMICH.md`). Netlify Functions und Drizzle/Neon gibt es nicht mehr (09/2026 entfernt).
- Assets unter `cd_assets/` (bosses, armor, weapons, skills, mounts, cores, map)

## localStorage Keys
- `cd_bosses` — besiegte Bosse
- `cd_gm` — Greymane Commissions
- `cd_te` — True Ending Checklist
- `cd_wep` — Waffen Checklist
- `cd_ms` — Missables
- `cd_cmt_{sec}` — Kommentare pro Sektion
- `cd_ch_done` — Chapters Checklist
- `cd_sec` — zuletzt aktive Sektion
- `cd_migrate_hint` — Domainwechsel 09/2026: Hinweisleiste „Fortschritt von der alten Adresse übernehmen“ gesehen/abgelehnt/übernommen (Handoff über `migrate-storage.html` auf der alten Adresse und `#cdmig=` beim Rücksprung; kann nach 2027-03 samt Skript entfernt werden)
- `cd_sync_code`: Sync-Code (24 Zeichen, Alphabet ohne 0/O/1/I/L) für den Fortschritts-Sync der True-Ending-Checkliste (`cd_te`) über `/api/sync`; Schlüssel zum Serverstand, der Server kennt nur `sha256(code)`. Wird bewusst NICHT in Export/Import und nicht bei der Speicher-Übernahme mitgenommen (nur „Sync beenden" oder Löschen der Website-Daten entfernt ihn). Der Client lädt nur IDs hoch, die `^[A-Za-z0-9_-]{1,40}$` erfüllen (höchstens 500, Body höchstens 16 KiB); alle heutigen `cd_te`-IDs (`te1`…, `te_abyss_01`…) passen. Neue Checklisten-IDs müssen dieser Form folgen, sonst werden sie nicht synchronisiert.
- `cd_boss_open_all` — Bosskarten: `'1'` = „Alle Details“ aktiv (alle sichtbaren `details.boss-more` aufgeklappt, Knopf `#boss-more-all` zeigt „Alle einklappen“), sonst `'0'`/fehlend = Standard zugeklappt; einzelne Karten werden nicht gemerkt

## Bekannte Besonderheiten
- MapGenie iframe ist cross-origin — kein JS-Zugriff möglich, nur Banner + Modal als Workaround
- Easter Egg: Konami Code (↑↑↓↓←→←→BA), 5x Titel-Klick, oder 🥚 im Footer
- Damiane-exklusive Items (z.B. Brass Rose Rapier) klar kennzeichnen
- BOSS_IMGS / ARMOR_IMGS / WEAPON_IMGS mappen Namen zu Pfaden unter cd_assets/
