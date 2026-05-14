# Crimson Desert Website Wiki — Projektregeln

## Projekt
- **Lokaler Ordner:** `C:\Users\Rainer Winkler\Desktop\deploy-69fcff9bfbeb7525ed81aec7\`
- **GitHub:** https://github.com/xdennxd6-spec/Crimson-Desert-Website-Wiki
- **Live-URL:** https://crimson-desert-wiki.netlify.app (via Netlify, Auto-Deploy bei Push)
- **Haupt-Datei:** `index.html` (single-file app, ~2700+ Zeilen)

## Git / Push Regeln — WICHTIG
- **NIEMALS automatisch pushen.** Immer erst den User fragen: "Soll ich das auf GitHub pushen?"
- Mehrere Änderungen sammeln und in einem einzigen Push bündeln (spart Netlify Build Minutes)
- Netlify deployt automatisch nach jedem Push (~21 Sekunden Build-Zeit)
- Free Plan: 300 Build Minutes/Monat — sparsam verwenden

## Token-sparendes Datei-Lesen via GitHub Raw URL
- GitHub MCP ist NICHT verfügbar — stattdessen Raw-URL nutzen:
  `https://raw.githubusercontent.com/xdennxd6-spec/Crimson-Desert-Website-Wiki/main/index.html`
- Für andere Dateien: `https://raw.githubusercontent.com/xdennxd6-spec/Crimson-Desert-Website-Wiki/main/PFAD`
- Repo ist public → kein Token nötig
- WebFetch auf Raw-URL ist der bevorzugte Weg um index.html zu lesen (spart Token vs. lokalem Read)
- Lokales Read-Tool nur nutzen wenn Änderungen noch nicht gepusht sind

## Workflow
1. Änderungen lokal in `index.html` vornehmen
2. User fragen ob gepusht werden soll
3. Bei Ja: `git add . && git commit -m "..." && git push`
4. Netlify deployed automatisch

## Tech Stack
- Static Single-Page HTML/JS/CSS App (kein Build-Step nötig)
- `npx serve -p 5000 .` zum lokalen Testen
- Netlify Functions in `netlify/functions/`
- Datenbank-Schema in `db/schema.ts` (Drizzle ORM)
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

## Bekannte Besonderheiten
- MapGenie iframe ist cross-origin — kein JS-Zugriff möglich, nur Banner + Modal als Workaround
- Easter Egg: Konami Code (↑↑↓↓←→←→BA), 5x Titel-Klick, oder 🥚 im Footer
- Damiane-exklusive Items (z.B. Brass Rose Rapier) klar kennzeichnen
- BOSS_IMGS / ARMOR_IMGS / WEAPON_IMGS mappen Namen zu Pfaden unter cd_assets/
