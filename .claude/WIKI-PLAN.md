# Crimson-Desert-Wiki — Arbeitsplan Aktualisierung & Faktencheck (ab 01.10.2026)

Auftrag des Users (01.10.2026): Wiki auf den aktuellen Stand bringen, Fehler, Lücken und falsche
Informationen finden und korrigieren. Arbeit in großen Blöcken, je Block ein Workflow mit
**zwei Orchestratoren (Opus)** und **je fünf Unteragenten (Opus oder Sonnet, je nach Aufgabe)**.
Gearbeitet wird auf dem Pi (winklerWak) in `~/cdwiki-work/repo` (Klon von `origin/main`).

## Rollen

| Rolle | Wer | Aufgabe |
|---|---|---|
| Prozessverantwortlicher | Claude, Haupt-Session | Plan, Workflow starten, Abnahme, Commit/Push, Meldung per Telegram |
| Orchestrator A / B | Planung Sonnet (ab Block 2, hohe Denktiefe), Integration Opus (mittlere Denktiefe) | Lagebild, genau 5 Unteraufträge planen, bestätigte Änderungen einbauen |
| Unteragenten (je 5) | Sonnet (mittlere Denktiefe); je Team höchstens 1 Auftrag mit Opus, wenn die Aufgabe es verlangt | nur Recherche: belegte Änderungsvorschläge (Ist-Text wörtlich, Soll-Text im Wiki-Stil, Quellen mit Zitat) |
| Gegenprüfung | Sonnet, unabhängig (hohe Denktiefe) | versucht jeden Vorschlag zu widerlegen; nur Bestätigtes wird eingebaut |
| Abnahme im Workflow | Sonnet (mittlere Denktiefe) | Diff-Review, Checks, Backlog, Commit-Text; danach Schlussprüfung durch den Prozessverantwortlichen |

**Sparmodus (User-Vorgabe 02.10.2026):** Opus nur für Planung und Integration der Orchestratoren, alles andere
Sonnet — lieber langsamer, aber ohne ins Session-Limit zu laufen. (Block 1 lief bis A3 noch mit Opus-Unteragenten.)

## Ablauf je Block

1. Sync: `git fetch origin && git pull --ff-only` (lokal == origin/main, sonst STOPP)
2. Planung: Orchestratoren erstellen je 5 Unteraufträge
3. Recherche: Unteragenten liefern belegte Vorschläge (keine Dateiänderungen)
4. Gegenprüfung: adversarial gegen Primärquellen (offiziell > mehrere Guides > Einzelquelle)
5. Integration: Orchestratoren nacheinander (keine parallelen Edits an denselben Dateien)
6. Abnahme: `verify-crafting`, `verify-weapons`, `gen-seo` + `verify-seo`, Headless-Render-Check
   (0 JS-Fehler, 0 doppelte IDs, 34 Sektionen, plausible Counts), Diff-Review
7. Commit + Push auf `main` (der Pi deployt binnen ~2 min), Live-Check, Telegram-Meldung

Quellen-Regel (CLAUDE.md): keine erfundenen Spielfakten; Pearl Abyss (Notice-Board EN+DE),
game8, Fextralife, PowerPyx, VULKK, questlog. Unsicheres als `conf` bzw. „nicht erfasst“ markieren.

## Blöcke und Termine

| Block | Termin | Thema | Orchestrator A | Orchestrator B |
|---|---|---|---|---|
| 1 | Do 01.10.2026 | Aktualität + Bosse | Notice-Board seit 24.09., DLC-Verschiebung (29.10.), Known Issues, Roadmap Juni–Sept., Patch-Archiv, zeitgebundene Aussagen | 99 Bosse Feld für Feld, fehlende Bosse, BOSS_IMGS/BOSS_LORE/BOSS_COMBOS, Boss-Bezüge in Quests/Trophäen |
| 2 | Fr 02.10.2026 | Story & Quests | MAIN_QUESTS (14 Kap./168), CHAPTERS, TRUE_ENDING (68), MISSABLE_ITEMS | SIDE_QUESTS (78), GREYMANE_COMMISSIONS (27), FAC_DATA (Fraktionsquests), SANCTUM |
| 3 | Sa 03.–So 04.10.2026 | Ausrüstung | WEAPONS (500), WEAPON_UPGRADES, BUILDS | ARMOR (359), ARMOR_SETS (33), ACCESSORIES (25), CORES (71), WITCH_SYNTHESIS (185), SIGIL_AMULETS |
| 4 | Mo 05.10.2026 | Crafting & Sammeln | CRAFTING (308), FOOD_ELIXIRS, DYES | ITEMS (165), GATHERABLES, COLLECTIBLES, PUZZLES, RUINS_DATA, FUNDORTE |
| 5 | Di 06.–Mi 07.10.2026 | Welt & Figuren | NPCS, ENEMIES (Bestiarium), LOCATIONS, BELL_TOWERS, Secrets | MOUNTS (50), PETS (195), Camp, MINIGAMES, Skills (Kliff/Damiane/Oongka, Watch & Learn), TROPHIES/ACHIEVEMENTS, Einsteiger-Guide |
| 6 | Do 08.10.2026 | Technik & Qualität | Linkcheck, Bild-Audit (`audit-images`), SEO-Texte/FAQ | Querverweise, Namenskonsistenz DE/EN, Suche, Mobile-Stichprobe |
| laufend | jeden Freitag (02.10., 09.10., 16.10., 23.10.) | Patch-Check | neue Patches/Hotfixes, Known Issues, Notice-Board | — |
| 7 | ab Fr 30.10.2026 | DLC „Charting the Unknown“ (Release 29.10.2026) | Ozean, Inseln, Schiffe, Wohnen/Wirtschaft | neue Gegner, Bosse, Ausrüstung |

## Stand

- **Block 1: erledigt 02.10.2026** (Workflow `wf_6b58a480-bc1`, 25 Agenten). 203 belegte Vorschläge → 145 bestätigt,
  42 in korrigierter Fassung, 8 widerlegt, 8 unsicher; 186 eingebaut, 18 bewusst weggelassen (siehe Backlog).
  Ergebnis: DLC-Termin 29.10.2026 (22:00 UTC / 23:00 MEZ) samt Verschiebungs-Hinweis, Known Issues und Patch-Kopf
  (geprüft 01.10.), Roadmap-Bilanz Juni–Sept., PATCHES-Metadaten (Uhrzeit, boardNo, Plattformstand); 100 Bosse
  (neu: Ludvig (Phase 1); „Avatar of Umbra“ → „Myurdin, the Avatar of Umbra“ mit localStorage-Migration),
  Quests/Beute/Schwächen/Lore korrigiert. Checks grün, Render-Check: tr 519, data_s 2624, 0 Fehler, 0 doppelte IDs.
- **Block 2: teilweise erledigt 02.10.2026** (Workflow `wf_09a44cf1-9b4`, 24 Agenten). Patch-Check 02.10. (02:42):
  keine neue Meldung nach #134.
- **Block 1 + 2 gepusht und live am 02.10.2026** (`cbfc239..6166f6b`, Deploy auf dem Pi geprüft). GitHub ist auf dem
  Pi seitdem per `gh` angemeldet (Konto xdennxd6-spec, HTTPS).
  - Team A (Hauptstory) vollständig: 77 Vorschläge → 74 eingebaut. CHAPTERS mit echten Kapitelnamen (vorher teils
    erfunden), Items/Missables/Boss-Strategien korrigiert, MAIN_QUESTS-Felder überarbeitet, ~35 Quests mit
    PowerPyx-Beleg auf conf high. TRUE_ENDING (68) und MISSABLE_ITEMS (15) gegen PowerPyx/VULKK geprüft: korrekt.
  - Team B (Nebenquests & Fraktionen) **nur eingeschränkt**: Das WebSearch-Kontingent der Session (200) war erschöpft,
    questlog lieferte nur eine JS-Hülle, Fextralife 404, game8 nicht erreichbar. Eingebaut nur 13 kleine, belegte bzw.
    rein sprachliche Änderungen (u. a. Calphadean-Requests einzeln: 179 → 184 Fraktionsquests).
- **Block 2b: erledigt 03.10.2026** (Workflow `wf_7a8d62cf-6f6`, 25 Agenten, höchstens 2 gleichzeitig; nur die Integration
  lief mit Opus bei mittlerer Denktiefe). Hauptquelle war ein lokaler Abzug der questlog-Datenbank über deren tRPC-API
  (`~/cdwiki-work/questlog/{en,de}`, Suche: `~/cdwiki-work/tools/ql-find.py`; 135 Fraktionen, 809 Quests, 4423 Missionen).
  322 belegte Vorschläge: 230 bestätigt, 70 in korrigierter Fassung, 4 widerlegt, 18 unsicher.
  - FAC_DATA: rund 160 Feldkorrekturen (Belohnungen, Overviews nach den offiziellen Texten, questlog-Namen mit Alias);
    jetzt 55 Fraktionen und 218 Fraktionsquests (vorher 53 und 184). Neu sind Hernand's Politics, Skoghorn Tribe,
    House-Celeste-Bounties, 13 Greymane-Camp-Quests; Pailune-Bounties als Container.
  - SIDE_QUESTS: 107 (vorher 78) mit belegten Startorten und Belohnungen. 5 Titel tragen jetzt den Spielnamen, der
    gespeicherte Fortschritt wird über `SQ_RENAMES`/`migrateSQRenames` in index.html übernommen.
  - Sanctums: alle 16 Belohnungen eingetragen (bleibt bei 16; Transcendence ist eine Abyss-Challenge).
    GREYMANE_COMMISSIONS: Notizen, gm27 = Diederik's Request (IDs unverändert).
  - Reste aus Block 2: Oongka-Permanenz (Words Left by the Riverside), ms15, beide „In Ashes“, Time to Face Justice
    (questlog: Time of Reckoning), Stolen Quarry, Kap.-11-warn.
  - Checks grün, Render-Check: tr 519, data_s 2692, 0 Fehler, 0 doppelte IDs, 34 Sektionen.
  - Weiterhin offen: ca. 349 Tales-/Favor-/Corners-Missionen und die Bounties von Demeniss, Delesyia und Crimson Desert
    (siehe Backlog „Aus Block 2b“). Diese Reste können bei Gelegenheit nachgezogen werden; Block 3 ist erledigt (siehe unten).
- **Block 3: erledigt 03.10.2026** (Workflow `wf_db013d36-8eb`, 25 Agenten, höchstens 2 gleichzeitig, einmal pausiert
  wegen Session-Limit; Integration Opus mittlere Denktiefe, sonst Sonnet). Neue Hauptquelle: questlog-Item-Abzug
  (`~/cdwiki-work/questlog/{en,de}/items.json`, 1878 Ausrüstungsteile je Sprache, `tools/ql-items.py`; Suche
  `ql-find.py --kind items`; Stat 1000002 = Angriff, 1000003 = Verteidigung, Werte ×1000). 735 belegte Vorschläge:
  626 bestätigt, 103 in korrigierter Fassung, 0 widerlegt, 6 unsicher.
  - WEAPONS (500): 277 Einträge überarbeitet (Fundorte nach questlog-Händler/Mission/Rezept/Boss statt Platzhaltern,
    eingebaute Abyss Gears, Typen), ATK Rhinard Cannon 31, Goblin King's Treasure 34, Flamespitter 25; Axe of the
    Apocalypse neu, Dublette Rhonid Shield entfernt (Migration `WEAPON_RENAMES`/`migrateWeaponRenames` für cd_wep und
    cd_favs.weapon). „Gale I“ → „Swift I“ (questlog). WEAPON_UPGRADES mit Materialien je Klasse, Hidden Weapons, Builds entschärft.
  - ARMOR: Def/Atk einheitlich als Höchststufe Refinement +10 (+0-Wert in notes); 380 Rüstungen (vorher 359),
    ARMOR_SETS +6, ACCESSORIES 34 (vorher 25). CORES/WITCH_SYNTHESIS: Sockel-Zuordnung Weapon/Armor/Both nach questlog-Hash.
  - Checks grün, Render-Check: tr 519, data_s 2728, 0 Fehler, 0 doppelte IDs, 34 Sektionen.
  - Außerdem am 03.10.: NPC-Karten zeigen nur Bild und Name, Details per Klick (`8b24382`).

- **Block 4: erledigt 03.10.2026** (Workflow `wf_17d40dcb-a6e`, 25 Agenten, bis zu 5 gleichzeitig; Planung, Gegenprüfung
  und Integration Opus, Recherche und Abnahme Sonnet; einmal pausiert wegen 5h-Limit). Neue Quellen: questlog-Abzüge
  `tools/ql-db.py` → `questlog/{en,de}/{recipes,items-misc,gatherables,chests}.json` (1373 Rezepte, 4200 Items,
  152 Gatherables, 39 Truhentypen). Achtung: questlog-recipeMaterials ohne Zutaten-Gruppen (Catalyst/Reagent).
  352 belegte Vorschläge: 256 bestätigt, 93 in korrigierter Fassung, 2 widerlegt, 1 unsicher.
  - CRAFTING 308 → 386 (78 neue Kochrezepte, Mahlzeiten-Familie, Rezeptbuch-Quellen für 315 Gerichte), Elixier-Formel-
    Fundorte, Kuku-Werkstatt korrigiert (Laser Helm, Watcher Pack, Disruptor Spear), Kuku-Cores je Sanctum, DYES 19 → 55
    (Icons der neuen Farbstoffe vom questlog-CDN).
  - ITEMS 165 → 171, GATHERABLES 25 → 35, MISSABLE_ITEMS ms16/ms17 neu, Sanctum-Checkliste zeigt alle 16 (vorher 13),
    Focused Force Palm/Pump Kick bereinigt, Ruinen Hoenmark/Smoking Lands (Alias), Camp-Texte bis Patch 2.03.00.
  - Checks grün, Render-Check: tr 593, data_s 2792, 0 Fehler, 0 doppelte IDs, 34 Sektionen.

- **Block 5: erledigt 04.10.2026** (Workflow `wf_7cfcb5ae-733`, 25 Agenten, alle Opus 5.5 high, höchstens 2 gleichzeitig,
  ca. 4 h). Neue Quellen: `tools/ql-live.py` (Live-Suche `searchEntities` + Details für npc/skill/knowledge …, da diese
  Listen bei questlog keine Kategorien haben und bei 1000 gedeckelt sind), `ql-db.py mounts|pets` (436 Mounts, 119 Pets).
  334 belegte Vorschläge: 249 bestätigt, 82 in korrigierter Fassung, 3 widerlegt.
  - NPCS 29 → 40 (Valgash zu Verbündeten, Naira, Stefan Lanford, Drake Wells, 8 Händler), ENEMIES 46 → 54 (DE-Namen,
    Drops), LOCATIONS 37 (Thornbriar Fortress), Bell Towers, Boss-Regionen, „Silver Wolf Mountain“ vereinheitlicht.
  - Hexen: Wohnorte, Händlerware, Sanctum-Lagen getrennt; 5 neue Fraktionskarten (H.A.L.L., Marni's Tinkertons,
    Marnirail, The Wyvernflames, The Dusksongs). Lore mit Archiv-Zitaten, Deutungen gekennzeichnet.
  - Skills: Kliff inkl. 8 Fähigkeiten aus 2.00.00, Watch & Learn 21, Damiane 75, Oongka 76 (Migration Skill-Favoriten);
    MOUNTS 52, PETS 200, MINIGAMES 18; Camp-, Trophäen- und Einsteiger-Texte präzisiert.
  - Checks grün, Render-Check: tr 609, data_s 2825, 0 Fehler, 0 doppelte IDs, 34 Sektionen.

- **Block 6: erledigt 05.10.2026** (Workflow `wf_bd17b952-510`, 25 Agenten, höchstens 2 gleichzeitig; Planung und
  Team-A-Recherche Opus high, danach auf User-Wunsch Sonnet 5.5 high bzw. Integration Opus medium; zweimal unterbrochen
  (Modellwechsel, kurzer Netzausfall EAI_AGAIN)). 419 belegte Vorschläge: 398 bestätigt, 15 in korrigierter Fassung,
  6 widerlegt.
  - Querverweise: linkifyXrefs ohne Spans in Attributen (43 → 0 betroffene Texte), Tooltips bei gleichnamigen Skills,
    Oongka „Slash (Oongka)“ → „Slash“ (Migration cd_favs/cd_recent). Bosse: Thunder Tank → Thunder Crusher, Cloud Fortress
    Orbian → Flying Fortress Orbian (BOSS_RENAMES), einheitliche Regionserkennung, Heatmap mit 6 Regionen.
  - Namen: Kapitel 9–12 (DE), New Foundations (169 Hauptmissionen), Hexen/Orte/Items vereinheitlicht, „Kraftstoß“ → „Kraftfaust“.
  - Suche: alle Waffenseiten, mehr Sektionen, Umlaut-/Apostroph-Toleranz, klappt eingeklappte Karten (Crafting/NPC) bei
    Treffer im Detailteil auf (nur im aktiven Bereich), Namenstreffer zuerst. Roadmap/Achievements aus Daten, Core-Slot
    „Waffe/Hand/Fuß“, einheitliches „verpassbar“.
  - Bilder: 11 NPC-Porträts, 34 Skill-Icons, 55 Farbstoff-Farben, 9 ungenutzte Dateien gelöscht; linkcheck 960/960;
    audit-images schreibt Report nach /tmp (kein Windows-Pfad mehr). SEO: Anker mit Umlauten, lastmod je Seite, FAQ/Intros.
  - verify-weapons prüft zusätzlich Crit gegen questlog (scripts/weapon-crit-reference.json).
  - Checks grün, Render-Check: tr 610, data_s 2826, 0 Fehler, 0 doppelte IDs, 34 Sektionen (neue Baseline).
- **Backlog-Abarbeitung: erledigt 06.10.2026** (Workflow `wf_6a7a9482-724`, 24 Agenten, Sonnet 5.5 high, Integration
  Opus medium, höchstens 2 gleichzeitig, ca. 15 h). Triage der 91 Backlog-Einträge: 28 Unterpunkte schon erledigt,
  28 nicht machbar (ingame/DLC/laufend/User-Entscheidung), Rest in 10 Arbeitspaketen. 649 Vorschläge: 513 bestätigt,
  126 korrigiert, 1 widerlegt, 9 unsicher.
  - Daten: Hauptquest-Aliase/Belohnungen und 10 neue Missionen, Boss-Strategien belegt, 62 neue BOSS_LORE-Texte,
    Waffen-Herkunft nach questlog, ARMOR 420 / ARMOR_SETS 51, Munition/Wurfgegenstände/Taschen/Schlüssel in ITEMS,
    DYES 60, GATHERABLES 64, SIDE_QUESTS 134 (27 Tales-Aufträge), FAC/SIDE-Dopplungen als Verweise, NPCS +11 (Marni,
    Alustin …), Bestiarium 56, Hexen-Verstecke, ~40 Kliff-Skills.
  - Renderer: Suche bleibt nach Neuaufbau erhalten, leere Gruppen ausgeblendet, Touch-/Tastatur-Bedienung, Skill-Icons
    je Charakter, Deeplinks mit Tab (`#sec=quests&tab=fac`), BOSS_ALIASES entfernt.
  - Migrationen: Cresset-Obergrenzen 11/9/13/7/20 (migrateCressetCaps, Summe bleibt), Sigil of Solidarity (SQ_RENAMES),
    Falling Palm (SKILL_RENAMES), Waffen-Umbenennung zieht cd_recent mit — mit alten Speicherständen getestet.
  - verify-seo prüft Meta-Zahlen, FAQ-Namenslisten und Anker; verify-weapons Ausnahmen/Slot-Verteilung.
  - Checks grün, Render-Check (neue Baseline): tr 727, data_s 3055, 0 Fehler, 0 doppelte IDs, 34 Sektionen.

## Backlog (bereinigt am 06.10.2026 nach der Backlog-Abarbeitung)

_Ersetzt alle früheren Backlog-Abschnitte. Erledigtes ist entfernt; übrig ist nur, was Ingame-Prüfung, eine Entscheidung des Users, Block 7 oder laufende Beobachtung braucht oder zu groß für einen Durchgang ist._

### ingame
- **Händler- und Kaufbarkeitsfragen:** Righteous Verdict, Golden Greathammer, Oblivion of the Past, Mace of Ambition, Delesyian Longsword, Hwando (Händler vs. nicht kaufbar), Sword of the Lord (Grimrak 17.400 Kupfer vs. Fextralife), Deceiver's Fedora (Noble Punter/Seratien vs. Tommaso-Mineralhändler), x100/x20-Händlerpreise (17 Items), Dark Ringleader's Cloth Armor Move Speed Lv1 vs. Lv2.
- **Sockelzahlen 0/null und Boss-Drops:** Eastern Witch's Fan, Specter Sword, Gale Shield, Shotgun Shield, Shield of Ringing, Banner Pikes, Kuku-Spitter; Boss-Drops Rhias, Octarr, Valgash, Grey Wolf, Black Bear, Crimson Warden, Muskan in BOSSES.drop_weapon; Dropliste der Walker (Tervis, Crussis, Lutemir, Crimson Nightmare, Icewalker, Grave Walker) ohne Wahrscheinlichkeiten.
- **Memory-Fragmente und Wissenszahlen:** Fundorte der Fragmente der vier Rematch-Bosse (1.13.00), welche Bosse in 2.00.00 neue Fragmente erhielten, Golden-Star-Kampf nach 2.00.00, Gesamtzahl 201/214/327, Kameraden-Obergrenze 37 per Ingame-Zählung klären.
- **Pailune-Aufträge, Blueprints, Refinement:** Extra-Belohnungen der 13 Pailune-Händleraufträge; Blueprint-Quellen der 5 Kuku-Special-Blueprint-Bücher und Kuku Ice-Resistant Armor (Devotion vs. Exaltation); Refinement-Unlock-Orte, Silberkosten, Token-Grenze +4 oder +5; Camp-Spendenkurs vor 2.01.00.
- **Missable-Mechanismen und Flags:** Hoenmark 3/4, Sweet Deal, Fruit of Life, Skull Knight (Sperrmechanismus nur Guides); Harry/Lola/Gunter beim Camp-Umzug und Mount-Quests; Mount-Dauerverlust Clawed Bear (Kap. 7); miss-Flag-Konvention für Church Crypt Key, Guard's Letter, Guard's Report, Letter to Younger Sibling, Lost Letter, Proof of Stay (Regel: nur setzen, wenn eine Quelle Verpassbarkeit nennt); Dye-miss-Flags (Pure White, Shadow Grey, Black, Grey, Bright Grey) vs. Chip „verpassbar“.
- **Hauptquests: Reihenfolge, Gates, Pflicht:** Master Camper an New Foundations (Patch 2.03); zehn neue und drei deaktivierte Hauptmissionen (Broken Claws, Lust for Power, altes Return Home) im Spiel prüfen; Aliase nur nach Position (Healing Pailune, Untouchable, Whispering Shadows); Festungsbosse Thunder Crusher, Storm Crusher, Dreadnought Pflicht oder umgehbar; Orbian Speichern gesperrt (Einzelquelle); Medium Bag gleich Standard Inventory Expansion Tool; Rückkehr von Oongka (Words Left by the Riverside?); Return Home Kap. 6 vs. 7.
- **Boss-Einstufungen und Bossstatus:** Lunar Reapers Pflicht oder optional (New Moon „Elite Boss“ unbelegt); Unleashed Aeserion eigener Kampf oder Phase; Black Bear Vice Captain (Steinnfell Fortress) eigener Boss und gleich Black Bear Captain; Fundorte und Bossstatus von Lightningwalker, Rustwalker, Crookstone Walker; Reed-Devil-Lebensleisten, Totem-Anzahl Hexe Marie, Priscus-Retribution, Queen Bismuth Region (Demeniss vs. Crimson Desert); Primus-Kampfort (Daggerhead Monolith vs. Arrowhead Rock vs. Three Brothers' Cliff); Bell Towers #3/#7/#8 Mechanik.
- **Ortsangaben und Einzelquellen:** Quentin (White Mountains, Hernand oder Pailune), Ronan, Bradie Gu (Region), Wandershrub Haunted Hill/Abyss Nexus, Farm-Spot Drakesfall Castle, Golden-Apple-Igel Grey Rock Dock, Gilded Goblin/Guardian, Bounty Notice Alessio (vier Orte), Pororin-Himmelsrichtung, Orte/Gates der neuen Einzelquests, Kapitel-Gates und Contribution-Werte der Fraktionen, Bounty-Beträge Demeniss/Delesyia/Tommaso/Muiquun.
- **Mounts, Pets, Minispiele:** Swift-Wolf-Statblock (450/100/45 vs. 250/70/20) und Aufzucht-Stufen Kuku Bird/Wyvern (mount/1004046, 1004233); Beschaffung Hernandian Soldier's Horse und Race Horse; Calphade Military Dog/Guard Dog Boarhound zähmbar; Hyacinth-Macaw-Fundort; Duo-NPCs und Einsatz in Tommaso, Five-Card-Einsatz und Tischgröße; Silver Trigger mit Kliff seit 1.08.00.
- **Skills: Freischaltung und Kosten:** Reckoning, Devastation, Focused Scatter Shot (Kosten 0 vs. 1 AA), Axiom Force, Ambush, Nature's Snare, Aerial Maneuver, Winch, Nature's Retribution, Nature's Veil, Focused Shield Bash bei Damiane/Oongka; AA-Kosten je Untervariante und Maximalstufen; Focused Force Palm Nachholbarkeit Kap. 9; Skystep/Vertical Flight Forschungsinstitut; Frost-Mantle-Lernkosten; Story-Zeitpunkt der acht 2.x-Fähigkeiten.
- **Alchemie, Kochen, Farben:** Resistenz-Dauer Lv 4/Lv 6 (60 s, 90 s, 10 Min); Platinum als Katalysator-Ersatz in Greater Elixirs; Destruction I mit oder ohne Orange-Barred Sulphur Butterfly; Sprayer-Haltbarkeit; Farbwerte (Pure White, Bright Red, Bright Grey, Shadow Grey, Teal, Rich Spring Green u. a.) gegen Ingame-Swatch.
- **Rest-Ingame-Prüfungen:** Palmar Pill hinter dem Haus (PowerPyx-Zitat nicht auffindbar); Awakened Lucian Bastier Fraktion (questlog: Cassius Morten); PC-Standardtasten und Wind-Element im Einsteiger-Guide; Test auf echtem iOS/Android (Touch-Tooltip, Trefferzähler-Pille, Tap-Ziele der Kartenknöpfe 24-28 px), Emoji-Darstellung, Tree-Graph-Sichtprüfung; Quest-Label ms11/ms12 (The Sport Hunter, Master of the Wetlands); Visione-Auto-Equip-Aussage (Kap. 2).

### Block 7 DLC
- **„Charting the Unknown“ (29./30.10.2026):** Bosse, Gegner, Waffen, Rüstungen, Inseln und Schiffe, DLC-Kasten, SEO, Steam-App „Crimson Desert Enhanced“, Trophäen/Achievements, PS-Store-Metadaten, Epic, Mac, CEST/CET. Harkan's Spear und Animal Spirit (questlog, ohne Bezugsquelle, vermutlich DLC/unerreichbar) hier mit zurückstellen.

### laufend
- **Freitags-Patch-Check erweitern:** Apple-Versionsverlauf (itunes lookup 6747100856), Known-Issues #68 EN/DE archivieren und Stand 21.09.2026 gegen 2.03.02 abgleichen, Steam-News-Abstände, neue Roadmap, Switch 2, Multiplayer, 3Q26-Ergebnisse (Nov. 2026), Zweitquelle für Downloadgröße 3,7 GB (2.01.00), Mac-Cross-Save-Weg (Steam vs. Mac App Store).
- **Widersprüche und Einzelquellen beobachten:** Tashkalp-Contribution-Pool, Patrigio- und Iron-Eagle-Uhrzeiten, Mercury-Menge, Swift-Wolf-Statblöcke, verworfene questlog-Mounts/Boote, Snowwhite-Deer-Fundort, PSNProfiles/TrueAchievements nicht abrufbar, Nebenquest-FAQ „nach der Hauptstory“, CDN-Status der 8 *_enhanced-Kliff-Icons (404), Schrotflinte ohne questlog-Skill, Axe of the Apocalypse und Secrets mit Einzelquelle (Illusory Walls, Crossroads Tombs, 107-Striche), Titan Nacken-Schwachpunkt/i-frames (Zweitquelle), Merrick-Werte (thegameswiki direkt lesen, Anzeige- vs. questlog-Rohskala), Tranan-Contracts (thegameswiki), Taktik Vordis/Tervis/Crussis (Fextralife 404, Crussis-Totem-Mechanik prüfen).
- **Datenlage der Zahlen:** Knowledge-Intro-Zahlen (2.921/2.905, Bosses 77, 214 Fragmente) stammen aus dem Spielmenü und sind nicht ableitbar; Widerspruch 201/214/327 erklärt stehen lassen; verwaiste Stellen bei Änderungen prüfen.
- **Textangleichung Händler Areciel/Lyselia:** 13 Stellen „Händler Areciel/Lyselia“ (d01 4, d02 3, d05 6) per Skript auf das Muster „Hexe X (Händlerin)“ bringen; Herkunft Wolf's Fang (questlog Kap. 7) und Sielos Longsword (Pot Put to Good Use, Kap. 4) in WEAPONS nachziehen; Boss-Region vs. Quest-Trigger (Ravok, Queen Bismuth, Mechanicus); Paulus/Jakril NPC-Karten, wenn Porträt und Gruppe geklärt sind.
- **Gesamtdurchgänge:** conf-/isNew-Gesamtdurchgang über 224 FAC-Quests und 134 SIDE-Quests; vollständige Belohnungslisten je Hauptmission (Kupfer, Camp Funds); BOSS_LORE für Maschinen-, Tier- und Walker-Bosse (Tenebrum/Goyen nur Platzhaltertexte); Lore-Ausbau aus Archive Entries (Kearush #17, Sanctum-Hexen #19, Witches of the East #25, Marni #48, Pryce #53, Marius/Naira #78, Duane/Shane #82, Blackstar #89) mit Test des Linkifizierungs-Seiteneffekts.
- **Skill-Favoriten mit Charakterschlüssel:** Erst sinnvoll, wenn an den Skill-Karten ein Fav-Button existiert (aktuell ruft keine Karte toggleFav('skill') auf); dann Schlüssel „Name|Charakter“ mit idempotenter Migration (cd_favs.skill, cd_recent), Kliff-Icons und -Einträge für die zehn Kollisionsnamen prüfen.

### offen
- **Nachträge Scout-/Kuku-Bezugsquellen:** Bezugsquellen aus den Händleraufträgen in ARMOR/ITEMS/WEAPONS nachtragen: Purple Scout Hat (Donny's Request), Purple Scout Lantern (Martina's Request), Purple/Blue Scout Ring/Necklace/Earring/Saddle/Stirrups/Champron (Maidon, Skaldar, Samir, Zara, Alina; Esford, Nora, Fatima), Kuku Boltspitter (Omar's Request).
- **Kuku-Ausrüstungsnotizen DE/EN:** Fünf bis sechs ARMOR-Notizen in d02 „seit 1.13.00 auch für Kliff/Oongka ausrüstbar“ folgen nur den englischen Notes; die deutschen nennen Damiane/Oongka. Wie bei der PATCHES-Notiz mit Einschränkung versehen.
- **Rezept-Suffix (+N), Riding-Amulette, Kräutermengen:** Bedeutung des Suffixes (+1 bis +5) bei 332 Rezepten ungeklärt (Hypothese Refinement-Stufe unbelegt), Wortlaut vereinheitlichen; Riding-Amulette (5 Einträge, witch-other) ohne Quelle; 14 Kräutermengen der Farbstoffe nur nach Familienmuster; Kochwerte (HP Hearty/Basis, Spirit bei 118 Gerichten, Gruppenmengen 19 Familien) bräuchten die thegameswiki-Tabelle.
- **Unbelegte Einträge ohne Quelle:** Demeniss Elite Uniform (Def +18, Streichung braucht Favoriten-Migration), Grasping Moon und Troll Hook Greataxe ohne Quellen-URL, Counter Stance (kein questlog-Skill), Stufenvarianten „Enhanced … I/II“ und weitere questlog-Skills (Frenzied Slash, Taunt, Focused Insight D/O, Mystical Storage D/O, Iron Fists, Flurry of Blows), Typ-Labels „Kriegspferd (Tier 4)“ und „Tier 2“ bei Mounts, Hexen-Namensvarianten Frost Mantle Lernkosten „1 AA“, Alias „Path of Providence“, Pailune-Händlerauftrag Details.
- **Kleine Redaktions- und Technikreste:** Priscus „Bow + Nature's Snare“ gegen BOSS_COMBOS abgleichen; DE-Bossnamen als Alias nur bei belegten Spielnamen; Crafting-Kuku-Zeilen mit „(+10)“ und Fließtexte „Missables“ (index.html Z. ca. 3443, 4199, 9045) auf „verpassbar“/Legende angleichen; Kailok-Questname „Cheers Echoing From the Edge“ als Alias; bossType-Heuristik für Faction-Questbosse (Black Bear Captain u. a.) belegen; isNew-Badge für Hauptquests braucht Schemafeld plus Renderer-Änderung; Sanctum-Edikte I-XVI optional als additives Feld; Tippfehlerfreie Kontrolle der neuen Intro-Texte.

### Entscheidung User
- **Datenmodell und Konventionen:** Epilog als CHAPTERS-Eintrag und Sub-Chapter-Gliederung; WEAPONS.type vereinheitlichen (Sword/Sword (1H), Knuckles-Varianten, Halberd/Spear (2H), Eastern Witch's Fan, Crow Whisperer); BOSSES.drop_weapon/drop_abyss_gear strukturieren; Namensformat Boss mit Komma/Titelstellung (7 bzw. 15 Fälle); Prolog-Boss Myurdin (B1-15 abgelehnt); Schilde crit:0 (76) vs. crit:null mit crit_none:true; Rename der 10 Schilde „X Shield“ auf „X Large Shield“ mit WEAPON_RENAMES; Demeniss/Demenissian-Alias (Favoriten-Migration); überschattete LORE_TERMS (Axiom Force, Hexe Marie, Goyen, Antumbra's Sword); neuer Accessory-Typ für 5 Circlets und Crow Cloth Blindfold (Renderer, gen-seo, verify-seo); getrennte Fraktionskarten Tommaso/Varnia/Urdavah; Boss ohne questlog-Beleg (Turbine) behalten oder streichen; Switch-2-/Multiplayer-/Mobile-Hinweis; Wortlaut der Intros für bosse.html und waffen.html freigeben.
- **Fextralife-Bildspiegel:** cd_assets/weapons/fex (435 Dateien), bosses/fex, mounts/ig und Fallback static0.fextralifeimages.com: Nutzungserlaubnis klären oder auf questlog-/offizielle Icons umstellen.

### zu groß/später
- **Missionen und Nebenquests:** Rund 150 benannte Tales-/Favor-/Corners-/After-Missionen ohne wesentlichen Spielwert (Residents Demeniss 29, Pailune 16, Delesyia 15, Crimson Desert 12, Hernand 11, Corners, Tales After, Händler), Namenskollisionen „Where the Wind Blows“ und „Safety First“; Marni-Fraktion (57 Figuren, 75 Quests); Legendary Animals alle 22 Jagdmissionen; Bounty-Notice-Sammelquests je Region.
- **Ausrüstung und Items:** Rund 376 questlog-Ausrüstungsteile ohne Eintrag (ca. 100 Grade-1/2, 41 Einhandwaffen, ca. 25 Grade-4/5, Greymane- und Ator-Will-Stamm), 88 Reittier-Ausrüstungen, 14 Pet-Ausrüstungen, 17 A.T.A.G.-Teile, 11 Rucksäcke, 12 Engraved Stones, Karten-Stücke; Bilder für neue Rüstungsteile (nur lokale Bilder); 715 Smithing-Rezepte, Projectiles-Rest, 47 Schlüssel, 27 Schatzkarten, 86 Gatherables (u. a. 17 Gemüse, 9 Getreide, 16 Früchte, 5 Fleisch), Gold-Bar-Platinum-Weg.
- **Skills:** Rund 42 SKILL_IMGS-Einträge für D/O-Skills per ql-live nachziehen, 5 bessere Icons (Rend Armor 20083/20080, Sure Hit 20085, Proficiency 20101, Expertise 20102), Aerial Stab/Aerial Maneuver-Icons, Klammer-Skillnamen („Flight (Crow's Wing)“ u. a.) mit Migration vereinheitlichen.
- **Werkzeug- und Test-Nacharbeit:** Tap-Ziele der Karten-Buttons (fav-btn, defeat-btn, copy-btn, map-pin-btn) vergrößern nach Sichtprüfung; ui-regress.mjs und bt.mjs räumen Temp-Dateien nur im übergebenen Ordner (auf Kopie laufen lassen) – bei Gelegenheit Aufräumen einbauen; FAQ-Namenslisten und Sanctum-Gruppen (feste te-IDs) aus Daten ableiten, sobald Gruppenfelder belegt sind.


### Entscheidung User — Einzelpunkte aus der Triage
- Umbenennung der 10 Schilde 'X Shield' -> 'X Large Shield' (WEAPONS.name, WEAPON_IMGS, WEAPON_RENAMES-Migration; Test scratchpad/b6/t3/migtest.mjs) — Policy-Entscheidung
- Armor-Alias Demeniss/Demenissian vertauscht gegenüber questlog (Favoriten-Migration nötig)
- Schilde mit crit:0 (76): crit:null mit crit_none:true oder Altkonvention beibehalten
- Überschattete LORE_TERMS (Axiom Force, Hexe Marie, Goyen, Antumbra's Sword): bewusst lassen, Boss-Tooltip ergänzen oder bereinigen
- Epilog als CHAPTERS-Eintrag (Label-Logik, cd_ch_done- und Roadmap-Gate) und Sub-Chapter-Gliederung im Modell — braucht abgestimmtes Datenmodell
- WEAPONS.type vereinheitlichen (21 Abschnitte auf waffen.html: Sword/Sword (1H), Knuckles-Varianten, Halberd/Spear (2H))
- BOSSES.drop_weapon/drop_abyss_gear sind Prosa (strukturieren?); Namensformat mit Komma/Titelstellung (15 Fälle); Prolog-Boss-Entscheidung (B1-15 abgelehnt)
- Intro-Absatz für bosse.html und waffen.html (redaktionell); Switch-2-/Multiplayer-Hinweis optional; Mobile-Test-Hinweis
- Fextralife-Spiegel (cd_assets/weapons/fex 435 Dateien, bosses/fex, mounts/ig, Fallback static0.fextralifeimages.com): Lizenz/Nutzungserlaubnis — rechtliche Klärung oder Umstellung auf questlog-/offizielle Icons
- Regelfrage 'Boss ohne questlog-Beleg (Turbine) entfernen oder behalten' und '13 Fraktionen der Liberation nicht belegt' — Paket 2 liefert Befund, Streichung entscheidet der User
