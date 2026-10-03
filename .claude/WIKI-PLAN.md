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

## Backlog (aus den Blöcken gesammelt)

_wird nach jedem Block ergänzt_

### Aus Block 1, Orchestrator B (Bosse), Stand 01.10.2026
- **Block 2 (Quests):** MAIN_QUESTS-Questnamen: „In Ashes“ doppelt (Prolog und Kap. 6; questlog hat zwei Missionen dieses Namens), „The Unyielding Shields“ im Epilog, „Silverwolf“ neben „Silver Wolf“. Quest- vs. Missionsebene laut questlog durchgehend angleichen (in BOSSES.quest jetzt „Quest (Mission …)“). Nummerierung von CHAPTERS prüfen. Prolog-Kampf gegen Myurdin (Quest Ambush/In Ashes, Axiom Bracelet) nur als Text in MAIN_QUESTS/CHAPTERS Kap. 1 erwägen (B1-15 als BOSSES-Eintrag abgelehnt: chapter null = Side/Faction). Dreadnought (jetzt chapter 11) ist bei questlog Teil der Quest „Forbidden Transplant“ – Kap.-11-Strings beobachten.
- **Block 3 (Waffen):** Platzhalter in WEAPONS.source prüfen; Darkbringer hat keinen WEAPONS-Eintrag; Axe of the Apocalypse (Umbra-Finale, 99.999 ATK) fehlt in WEAPONS; Sorcerer's Staff source (Grave Walker, Tor hinter Steinlaternen) präzisieren.
- **Block 5 (Lore/Secrets/Gegner):** neue Gegner (Lightningwalker u. a.); Hidden-Lore-Klammern bei Hexe Marie und Corrupted Caliburn (B2-3/B2-8 unsicher) samt Secrets-Section und Lore-Timeline index.html (~Z. 5254–5259) gemeinsam mit Primärbeleg (Axiom Archive) klären; Mount-Hinweise; „Path of Trials (Frost Mantle) nach Priscus“ in d01/d03 Z. 25/124/d04 Z. 918 klären (B2-14); Priscus-strategy „Bow + Nature's Snare“ an BOSS_COMBOS angleichen; Skull-Knight-Kill (VULKK vs. questlog-Meldung) beobachten; Merrick „~2.227 HP, 120 Def“ (thegameswiki nennt Def 100) direkt prüfen (B4-12).
- **Block 6 (Pflege):** Namensformat mit Komma bzw. Titelstellung (15 Fälle); offene Namenskonflikte Thunder Tank/Thunder Crusher und Cloud/Flying Fortress Orbian (aktuell nur Alias/Quest-Zeile); Region „The Abyss“ vs. „Abyss - …“ samt Chip-Logik (split(' ')[0]) gemeinsam lösen (B4-18 abgelehnt) sowie „Hernand Highlands“ bei Kearush; ungenutzte Bilddateien (u. a. cd_assets/bosses/avatar_umbra.webp); optionale Erweiterung von BOSS_LORE (u. a. Ludvig (Phase 1)); Knowledge-Zahl „Bosses 77“ in index.html ~Z. 4092; Unleashed Aeserion als Phase (B2-34) belegen; d07 1.00.03-Text „u. a. Kearush“ bei HP/Angriff korrigieren (offiziell nur Angriffsmuster angepasst) – Bereich A.

### Aus Block 1, Abnahme (konsolidiert aus allen zehn Unteraufträgen), Stand 02.10.2026
- **Block 2 (Quests) — Quest-/Kapitelnamen in MAIN_QUESTS/CHAPTERS angleichen:** Kap. 7 „Silverwolf“ vs. „Silver Wolf Mountain“; Kap. 11 Quest Foreboding Shadow/Flying Fortress Orbian und Bossliste (Thunder Crusher, Storm Crusher, Orbian, Dreadnought); Kap. 9 Quest-Container statt Missionsnamen; Time to Face Justice (One-Armed Ludvig) nicht in questlog; Prolog-Myurdin als Text in MAIN_QUESTS; LOCATIONS Karin Quarry (Stolen Quarry vs. Estate in Dismay); CHAPTERS-Tipps mit unbelegten Boss-Strategien (Kailok Force-Palm-Kette).
- **Block 2 (Quests) — Rematch-Wissen/Fundorte und Reaper-Trio:** Memory-Fragment-Fundorte der vier Rematch-Bosse (1.13.00) bleiben undokumentiert; LOCATIONS-Vermerk datieren. Reaper-Trio (New/Half/Full Moon) Taktik und House Elemore prüfen; Golden-Star-Kampf nach 2.00.00 nicht neu dokumentiert; welche Bosse in 2.00.00 neue Fragmente erhielten.
- **Block 3 (Ausrüstung) — WEAPONS.source gegen Bossbeute abgleichen:** Marni Musket (Storm Crusher), Wyvern Blaster (Balthazar), Mechanical Clockwork Blaster (Thunder Crusher), Electro-Mecha Longsword (Machina Knight); Axe of the Apocalypse fehlt; Aeserion-Waffen Blueprint-Herkunft; The Grove's Thorn Kap. 4 vs. 5; Balton Hammer; Spear (Thorn of Dark Pursuit) und Tristan (Spada Sword/Drake Shield) belegen; Rock Tusk Warthog Molar vs. Tusk; gemeinsame Walker-Drop-Tabelle (Tervis, Crussis, Lutemir, Crimson Nightmare, Icewalker).
- **Block 3 (Ausrüstung) — Vaporwalker/Dunstläufer und Water Stride:** Prüfen, ob Schuh-/Accessory-Daten den Rutsch-Effekt mit Water Stride (2.03.00) erwähnen.
- **Block 4 (Crafting & Sammeln) — Camp-/Entsendungs-Aussagen seit 2.01.00:** Camp-Mittel-Spenden (10x beim Silberspenden), Goldbarren-Investitionsmission, Demeniss-Kettensäge spendbar in Camp-/Forschungsseiten (index.html, d06) nachziehen.
- **Block 5 (Welt & Figuren) — Skills, Abyss und 2.x-Folgen:** Acht neue Kliff-Fähigkeiten (offiziell nur Water Stride, Descending Force Palm) in Skill-Daten; Abyss-Artefakt = 1 Skill Point um Abyss-Verknüpfung ergänzen; KLIFF_STAMINA Double Jump/Unerwartetes Geschenk; Duo-NPCs Tommaso in MINIGAMES; Steuerungs-/Flug-Reittier-Hinweise; Quests Der verfluchte Ritter, Der geheimnisvolle Topf u. a.; Barden Middler und Dornwallfestung in Orts-/NPC-Daten; Stoffrobe des Kampfmönchs; neue Sprachausgaben; SEO-FAQ Trophäen „alle in einem Durchgang“ mit Zweitquelle füllen.
- **Block 5 (Welt & Figuren) — Unbelegte Boss-Detailaussagen, Lore und Regionen:** Lore-Timeline/LORE_TERMS (Caliburn = Umbra, Hexe Marie = White Crow, Goyen) als Theorie kennzeichnen; Regionsangaben mit Einzelquelle bzw. Konflikt (Praevus, Primus, Mechanicus, Ironwing REN-X, Skull Knight, Queen Bismuth Oreback Crab, Antumbra/Bari); One-Eyed Jackal Captain und Black Bear Captain Namen; Walker-Gegner (Lightningwalker, Rustwalker, Crookstone Walker) ohne Bossstatus; Taming Dragon verworfen; Matthias-Rotation (Parry-Konter) und Awakened Lucian Bastier Fraktion; Beloth, Titan, Queen Spider, Moren, Sir Catfish u. a. Einzelaussagen; Vordis/Tervis/Crussis-Taktik.
- **Block 6 (Technik & Qualität) — SEO, Format und Zeichen:** Kommentar in scripts/seo-parts/patch-notes.mjs („32 Eintraege“); Datumssemantik „Veröffentlicht am“ bei 2.00.02; ASCII-Transliterationen („fuer“, „ueber“ …) in index.html/data prüfen, ob sichtbar; Regionsfeld „The Abyss“ vs. „Abyss“ (split(' ')[0]) per Renderer-Anpassung vereinheitlichen; Format-Abweichungen der Bossnamen (Kommas) nur als Format; Typfilter-Zahlen auf Bossseite/SEO nach Typänderungen (Black Fang, Hemon); Switch-2-/Multiplayer-Hinweis optional; Namensschlüssel-Migration bei künftigen Umbenennungen (BOSS_RENAMES erweitern).
- **Block 7 (DLC) — DLC nach Release (ab 30.10.2026):** Bosse, Gegner, Waffen, Rüstungen, Story-Voraussetzung, Inseln/Schiffe/Wirtschaftssystem, Beziehungen erfassen; DLC-Kasten von Vorschau auf Inhalt umstellen; SEO-Seiten um DLC ergänzen; vorher #134/#129 auf weitere Verschiebung prüfen, PS-Store-Metadaten (noch 15.10.), Epic (403), Marktliste-Stichprobe, Mac-Ankündigung, CEST/CET-Etikett.
- **Laufend (Patch-Check) — Freitags-Patch-Check erweitern:** Apple-Versionsverlauf (itunes lookup id 6747100856) je Lauf festhalten; Known-Issues #68 EN/DE bei Änderung mit Zeitstempel archivieren; Steam-News-Abstände beobachten; revidierte 1.x-Notes (1.00.03 bis 1.11.00) inhaltlich gegen Revisionsstand prüfen; 1.14.00 Cross-Save/Steam-Mac-Angaben nachziehen; 1.13.00 DE/EN-Abweichung Kuku-Ausrüstung (Kliff/Oongka vs. Damiane/Oongka) vermerken; 2.00.00 Neustart-Übernahme (Questfortschritt) belegen; 2.01.00 Downloadgröße 3,7 GB (vulkk) belegen oder streichen; neue Roadmap, Switch 2, Multiplayer, 3Q26-Ergebnisse (Nov. 2026) beobachten; MP1st-Artikel sind per WebFetch lesbar, Wiki-Notizen zu HTTP 403 aktualisieren; vollständiger Abgleich der Boss-Listen (game8, Fextralife, PowerPyx) gegen alle 100 Namen.

### Aus Block 2, Abnahme (konsolidiert), Stand 02.10.2026
- **Block 2 (Reste) — Reste Block 2:** ms15 an „A Shadow in the Void“ angleichen; Oongka-Permanenz (Kap.-7-unlock, Kap.-8-warn, te2/te3, ms7/ms8) klären; miss-Flag-Semantik (For Honor, Time to Face Justice); zweites „In Ashes“ gegen questlog; Marni's Excavatron/„Stolen Quarry“; FAC-vs-SIDE_QUESTS-Dopplungen; 16 vs. 17 Sanctums (te_abyss_35); A5-Umfang (TRUE_ENDING, MISSABLE_ITEMS) nachholen; 27. Greymane Commission; Kap.-11-warn „Kein Point of No Return“ absichern.
- **Block 3 (Ausrüstung) — Ausrüstung/Bosse:** Shield of Betrayal Questlinie (Undying statt Unyielding); Kailok-Strategie und Drop (Evasive Roll/Sword of the Lord vs. Wind Slash); Ludvig-Container „Dawnrise“; Leofric Musket Fundort (Lingering Shadow, Kap. 10); Kuku Ice-Resistant Armor Zuordnung; Marni Musket, Mechanical Clockwork Blaster, Frozen Heart Plate Cloak/Sonic Resonator; Reaper-Trio inkl. Elemore Rapier und New Moon als Elite Boss; BOSSES-Strategiereste (Draven Glider, Hexe Marie, Master Du, Myurdin All-Fours, Reed Devil Phase, Cassius R2, Black Bear Captain); Silverwolf/Silver Wolf Ortsnamen vereinheitlichen (d01:97,122, d02:727, d05:128).
- **Block 4 (Crafting & Sammeln) — Skills/Missables/Sanctums:** Focused Force Palm (Ort, Kap.-9-Nachholmöglichkeit, WATCH_AND_LEARN, MISSABLE-Bezug); neue Missables prüfen (Marni Laser Helm Umbau, Vessel of Dark Pursuit); Sanctum-Felder (Regionen, Rewards, Bossbezug) prüfen.
- **Block 5 (Welt & Figuren) — Fraktionen/Nebenquests/Hexen:** Hexe Elowen/Alfonso Estate (ms6); Hexen-Sanctum-Bezüge und Region Pywel; Marni-Fraktion (~27 Einträge, nur 1 erfasst); Gearmelt/Drywind-Regionsabgrenzung; Boss-Region vs. Quest-Trigger (Ravok, Queen Bismuth, Mechanicus); Sammel-/Platzhalter-Einträge auflösen; Celeste-Bounties; St. Halssius's House of Healing; Greymanes-Fraktion Details; te28 Fraktions-Threshold Beleg; deutsche Mischtitel SIDE_QUESTS 0-5 (Migration cd_sq_done nötig); Kapitel-Gates Demeniss/Pailune; Pailune Requests Vollständigkeit.
- **Block 6 (Technik & Qualität) — Struktur/Namensformat:** Sub-Chapter-Gliederung im Modell; Epilog als CHAPTERS-Eintrag (Label-Logik); deutsche Kapiteltitel 9-12 (pcgames.de); Kap.-11-Namensvarianten (Thunder Tank/Crusher, Cloud/Flying Orbian).
- **Laufend (Patch-Check) — Quellenabgleich:** Zugang zu questlog.gg (JS-App) für Quest-/Missionsnamen, Container; Demenissian-Delegation-Reward (Gale I vs. Swift I); Axiom Bracelet Prolog; unbelegte Tipps (Angeln Prolog, Palmar Pill hinter dem Haus, Barden Middler, Seal of Greed); Golden-Star-Patch-2.00.00-Check; neue Memory Fragments Patch 2.00.00; Shackle Breaking Hammer/Felix; Gating Vellua/Solumen; Hooves Through the Wind; Grimzle-Titel; CHAPTERS-Reste (Kap. 1 items/tip, Kap. 8 Brass Rose Rapier, Kap. 10 missable); conf-Stufen und isNew bei Fraktionen und Nebenquests.
- **Block 6 (Technik & Qualität) — Schreibweise Silverwolf Mountain:** PowerPyx schreibt „Battle at Silverwolf Mountain“ (Questname, in MAIN_QUESTS und BOSSES.quest so angeglichen). Als Ortsname steht „Silver Wolf Mountain“ noch 16× (d01 3, d04 1, d05 8, d06 3, index.html 1) neben „Silverwolf Mountain“ 8× — offiziellen Ortsnamen belegen und einheitlich ziehen.

### Aus Block 2b, Abnahme (konsolidiert), Stand 03.10.2026
- **Block 2b (Reste) — Tales-/Favor-/Corners-Missionen:** 349 offene questlog-Missionen (Tales of Residents/Merchants, A Favor for Hernand/Demeniss/Crimson Desert, Corners, Tales After) als SIDE_QUESTS-Einträge mit neuen Namen; Namenskollisionen (Where the Wind Blows, Safety First) mit Suffix.
- **Block 2b (Reste) — Bounty Notices:** Demeniss (13), Delesyia (11), Crimson Desert/Tommaso (10) ohne belastbare Guide-Quelle; Fextralife/PowerPyx suchen, dann je Region Sammelquest.
- **Block 2b (Reste) — Dopplungen FAC/SIDE bereinigen:** Je Doppelung Primäreintrag festlegen; FAC behalten empfohlen. Calphadean-Anlaufstelle (Temir vs. Peregrine) klären.
- **Block 2b (Reste) — Verpassbar-Flags und Pailune-Extras:** miss bei Harry/Lola/Gunter und Mounts mit Zweitquelle prüfen; Extra-Belohnungen der 13 Pailune-Händleraufträge ingame/mehrquellig klären; Plentiful Greeting Silver vs. Copper.
- **Block 2b (Reste) — Fraktions-Lücken und Zuordnung:** Fehlende Missionen: Hound's Gate, Foundation of Abundance, Forsaken Factory, Spear Left Behind, Gathered Will (10), Solid Foundation (6), Concern of the Tannery, The Clue for Chaos, Black Bears' Claw. Regionszuordnung Aeserion und House Wells; Alfonso-Reihenfolge; The Missing Forbidden Book/Investigation; Legendary Animals (22 Jagdmissionen).
- **Block 2b (Reste) — Kapitel-Gates und Contribution-Werte:** Gates und Beträge mit game8/PowerPyx/Fextralife gegenprüfen (Vellua, Solumen, Calphadean, Kharonso, Pailune/Demeniss, Delesyia).
- **Block 2b (Reste) — Hauptquest-Aliase:** MAIN_QUESTS-Namensabgleich zu questlog (Time of Reckoning, Foul-Mouthed Reunion/Familiar Curses, Demeniss Bound, Bared Fangs, A Stand of Resolve); fehlende Belohnungen Bared Fang, Rekindled Hope, Podium of Resolve.
- **Block 3 (Ausrüstung) — Mount-Stats und Itemnamen:** Stats von White Bear, Snowwhite Deer, Ibex, Warthog nur teilweise belegt; Champion's vs. Combat God's Plate Gloves; Machina Plate Armor Set Drop; Bossnamen Lithus/Beloth/Warspike Commander; Demenissian-Delegation Gale I vs. Swift I.
- **Block 4 (Crafting & Sammeln) — Items, Cores, Bounty-Orte:** Kuku-Blueprint-Zuordnung zu Devotion/Exaltation prüfen; Core-Übersicht je Sanctum im Crafting; Pump Kick Widerspruch (For Honor); Bounty-Orte Alessio/Blix/Bianca und Beträge in d06; Firefly Lantern miss-Flag.
- **Block 5 (Welt & Figuren) — Hexen, Sanctums, Fraktionen:** Hexen neu prüfen (Sylvia, The Hermit Witch/Refined Power, Hexe Marie, White Crow/Mortification, Frost-Mantle-Aussagen); Sanctum-Regionen (Temperance/Benediction/Expiation, Antumbra Order -> Pywel, Skull Knight Region); fehlende Fraktionen Wyvernflames, H.A.L.L., Tinkertons, Marnirail, Dusksongs, Tommaso, Varnia, Urdavah, Marni-Anlagen; Greymanes-Overview '~99 Einträge'.
- **Block 6 (Technik & Qualität) — Roadmap-Empty-State:** 'TRUE ENDING UNLOCKED' von gmDone>=27 entkoppeln, GREYMANE_COMMISSIONS.length statt Hartkodierung; lastCh-Schwelle prüfen.

### Aus Block 3, Abnahme (konsolidiert), Stand 03.10.2026
- **Block 3 (Reste) — Ausrüstungslücken:** ca. 376 questlog-Teile ohne Wiki-Eintrag, davon 31 geliefert. Offen: 15 Set-Stämme (Chelcia, Sahazhad, Silverwolf, Grotevant, Grey Wolf, Carta, Ferman, Tariv, Greymane, Baltheon, Ator Will, Ironwilled Guardian, Helfryn, Lauques), ca. 25 Grade-4/5-Einzelteile, ca. 100 Grade-1/2-Teile, 5 special-accessories (neuer type-Wert, Renderer/gen-seo abstimmen), 41 Einhandwaffen; Animal Spirit, Harkan's Spear (ohne Bezugsquelle).
- **Block 3 (Reste) — Konventionen und Namen:** built_in-Notation vereinheitlichen (Stat-Labels vs. Abyss-Gear-Namen); Aliasse (Serdin/Verak/Parvel/Arben/Lusec Greatsword „Giant“, Blackwing Leather Mask vs. Blackwing Mask, Darkbringer); CORES-Doppel Breath of Life I = Vitality I, Rampaging Insight = Greater Insight, Crow's Pursuit I; Goblin Pumpkin Helm und Demeniss Elite Uniform (Def +18) unbelegt; ARMOR_SETS.pieces mit Namen außerhalb ARMOR (Ashen Execution, Patch-1.13-Platzhalter).
- **Block 3 (Reste) — Belege für Zusatzwerte:** Resist-/Move-Speed-Aussagen im Altbestand (prov altbestand) prüfen oder streichen; Set-Boni; „Drop“/„Feldbeute“ ohne questlog-Beleg (ca. 61 Banner Pikes, 25 Drops, Plate Armor of the Shadows, Cursed-Soul-Teile) einheitlich entschärfen; Axe of the Apocalypse nur Einzelquelle; Aeserion Gear Blueprint, Wolf's Fang, Ignir, Divine Echoes Bow, Sorcerer's Staff ohne gesicherten Fundort; Mount-Stats (nicht im questlog-Abzug).
- **Block 4 (Crafting & Sammeln):** Munition/Wurfgegenstände (43 Projectiles) als Abschnitt; Rezept-Suffix „(+N)“; Blueprint-Herkunft Kuku-Teile; Destruction-I-Rezept; Faded Abyss Artifact, Gold Bar, Platinum, Riding-Amulette; Refinement-Kosten (Silber, Unlock-Orte).
- **Block 5 (Welt & Figuren):** Orte der questlog-Händler (Kathor, Tranan, Temir, Quentin, Leore, Khron, Ronan, Nork, Elowen, Brek, Bari); Hexen Sylvia, The Hermit Witch, Refined Power, White Crow, Frost Mantle, Hexe Marie.
- **Block 6 (Technik & Qualität):** Sockel-Semantik (Both = Waffen, Handschuhe, Schuhe) in Cores-Abschnitt und Build-Simulator; Crit-Mapping (Stat 1000007/1000010) dokumentieren und maschinell prüfen; Slot-Ausnahmen in verify-weapons; Typen Grotevant Cloak, Gale Shield; Legende „(+10)“ in der UI.
- **Laufend (Ingame-Prüfung):** Händler vs. „nicht kaufbar“ (Righteous Verdict, Golden Greathammer, Oblivion of the Past, Mace of Ambition, Delesyian Longsword, Hwando); Sockelzahlen 0/null (Eastern Witch's Fan, Specter Sword, Gale Shield, Shotgun Shield, Shield of Ringing, Banner Pikes, Kuku-Spitter); x100/x20-Händlerpreise (17 Items); Boss-Drops Rhias, Octarr, Valgash, Grey Wolf, Black Bear, Crimson Warden, Muskan in BOSSES.drop_weapon.

### Aus Block 4, Abnahme (konsolidiert), Stand 03.10.2026
- **Block 4 (Reste) — Farbstoffe:** neue DYES ohne Hex-Farbwert (Chip fällt auf Icon/Grau zurück); Dye-Intro „ca. 20 Farbtöne pro Grundfarbe“ vs. 5 Stufen je Grundfarbe bei questlog klären; 13 Kräutermengen nur nach Familienmuster; Händlerangaben Black Dye (Aris/Solan), Pure White, Spring Green, Teal, Shadow Grey.
- **Block 4 (Reste) — ITEMS-Lücken:** 27 Projectiles (Bundles, Magic Bullets, Buckshot, Smoke Bomb, Oil Canister …), Platinum und Gold-Bar-Platinum-Weg, Medium/Large Bag, Sturdy Broom, Rucksäcke, Haven for Pets/Livestock, Wells-Military-Tack, 47 Schlüssel, 27 Schatzkarten; ITEMS[110]/[112] laut Abnahme gleiche questlog-ID 802926 (prüfen); Sprayer-Widersprüche (ITEMS 23/25/34); Disruptor Cannonball loc vs. Detail; Crude Bismuth Cannonball „flächig“ vs. Spieltext „verfolgt“.
- **Block 4 (Reste) — Kochen/Alchemie-Werte:** HP der 54 Hearty- und 23 Basis-Stufen, Spirit-Wirkung bei 118 Gerichten, Gruppenmengen in 19 Familien, Resistenz-Dauer Lv 6, HP-Konflikt Fextralife; Elixier-Effektwerte nur aus Guides; Platinum als Katalysator-Ersatz; Destruction I (Butterfly) questlog vs. Guides.
- **Block 4 (Reste) — Smithing/Kuku/Camp:** 715 Smithing-Rezepte nur als Hinweis/Liste; Refinement Stufen 6–10, Token-Grenze 4 vs. 5, Rezept-Suffix (+N); Blueprint-Quellen der 5 Special-Blueprint-Bücher ingame; Goldbarren-Investitionsmission (Einsatz/Ertrag), Camp-Spendenkurs vor 2.01.00, Kettensäge-Spende (2.00.00 vs. 2.01.00), Camp Food/Timber/Stone/Weapons.
- **Block 4 (Reste) — Sammeln/FUNDORTE:** 105 weitere Gatherables (Filter-Kategorien Gemüse/Früchte/Fleisch); Missable-Mechanismen (Hoenmark 3/4, Sweet Deal, Fruit of Life, Skull Knight); 11 FUNDORTE ohne Quellen-URL, Soul Spear, Caliburn's Mercy, Divine Echoes Bow, Marni Laser Helm Fundort.
- **Block 3 (Nachtrag):** Widersprüche FUNDORTE vs. WEAPONS/ARMOR (Plate Armor of the Shadows/Beloth, Odeck's Protector, Scorchflame, Darkbringer, Goblin King's Treasure, Hwando-Schlüssel, Shield of Ringing, Lightning Spear).
- **Block 5 (Welt & Figuren):** Hexen-Tabelle index.html (Areciel/Lyselia-Regionen) vs. SANCTUM_DATA; Hauptquest-Aliase (Secret at the Church, Casted Shadow, Bloodwind, Path of Providence); Expert Explorer 178 Challenges; Guard's Report/Proof of Stay Varnia; Core Blueprint vs. Gear Blueprint: Haste.
- **Block 6 (Technik & Qualität):** Knowledge-Intro Summe 2.905 vs. 2.921 und Memory Fragments 214 vs. 201; Missable-Chip-Konvention; Smoked Egg/Eggs; Saw und Heavy Bucket conf high ohne questlog-Beleg.
