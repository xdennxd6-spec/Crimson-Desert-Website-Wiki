// d12-dlc.js: Datenbestand der Seite "Charting the Unknown" (erster DLC, Patch 2.04.00 vom 29.10.2026).
// Angelegt am 31.10.2026 (Bauagent B). Faktenbasis: _run_2026-10-31-dlc-inhalte/FAKTEN-DLC.md (Abschnitte C bis L)
// und fuer Erscheinen/Preis/Zugang _run_2026-10-29-dlc/FAKTEN.md. Nichts hier ist geraten: was keine Quelle
// belegt, steht als "nicht belegt" da.
//
// Feldvertrag (gilt fuer App-Renderer renderDlc() in index.html UND scripts/seo-parts/charting-the-unknown.mjs):
//   Wert = "Text" (belegt) | {v:"Text", c:"ok"|"unb"|"nb", q:"Quelle/Hinweis"} | [Wert, Wert, ...]
//   c: ok = belegt (offizielle Notice oder mind. zwei unabhaengige Guides), unb = unbestaetigt (nur eine Quelle,
//   wird grau mit Vermerk gezeigt), nb = nicht belegt (gesucht, nichts gefunden). Fehlt c, gilt "ok".
//   Eintraege mit eigenem c (Zeile ganz unbestaetigt) erben das auf alle Felder ohne eigenes c.
// Item-, Orts-, Boss- und Questnamen bleiben englisch (Spielschreibweise der Quellen); deutsch nur, wo die
// offizielle deutsche Notice den Begriff vorgibt. Zahlen im deutschen Format (2.000 statt 2,000).
// Die neue DLC-Ausruestung steht NICHT hier, sondern in WEAPONS (d01) und ARMOR (d02) mit dem Feld
// dlc:"Charting the Unknown"; die Seite filtert danach.
//
// Erweiterung Nachtlauf 01.11.2026 (Orchestrator B), alle Felder optional, Werte wie oben:
//   DLC_ISLANDS[i]: where (Lage), nexus (Abyss Nexus), unlock (Erschliessung/Freischaltung), info (Besonderheiten)
//   DLC_SHIPS[i]: vendor (Verkaeufer), crew (Besatzungsplaetze)
//   DLC_MOUNTS[i]: where (Fundort), trust (Vertrauen/Futter), stats (Werte)
//   DLC_QUESTS[i]: req (Voraussetzung), steps:[{name, d, reward, c, q}] (ersetzt subs in der Anzeige, wenn vorhanden)
//   DLC_GARDEN[i]: bq (Quelle der Bossnamen, Standard "GameRant"; bc:"ok" = Bossnamen belegt)
//   DLC_TRADE: Seehandel-Waren {name, buy, sell, note, c, q}            -> Zeilen-ID dlc-ware-<slug>
//   DLC_HOMES: Wohnsitze {name, where, how, note, c, q}                -> Zeilen-ID dlc-wohnsitz-<slug>
//   DLC_RELIC_SHOPS: Relic-Haendler {name, where, sells, unlock, c, q} -> Zeilen-ID dlc-relic-<slug>
//   Leere Arrays = Tabelle wird nicht gezeigt.

const DLC_META = {
  name: "Charting the Unknown",
  full: "Crimson Desert Enhanced: Charting the Unknown",
  release: "29.10.2026, 22:00 UTC (in Deutschland 23:00 MEZ)",
  patch: "2.04.00",
  hotfixes: "Hotfix zu 2.04.00 sowie 2.04.02 bis 2.04.05 (Fehlerbehebungen, unter anderem zu Erschließung, Tauchen, Romanze und Einrichtungen; 2.04.04 und 2.04.05 am 01.11.2026)",
  price: "24,99 € im Steam-Shop (Pearl Abyss nennt selbst keinen Preis)",
  platforms: "Steam (Windows und macOS), PlayStation 5, Xbox Series X|S, Epic Games Store; laut Pearl Abyss auch im Mac App Store, das Spiel-Update 2.04.00 ist dort aber noch in Vorbereitung",
  checked: "02.11.2026",
  recheck: "01.11.2026",
  // Garten der Pruefungen: hoechstens so viele spielbare Charaktere je Lauf (offiziell, Patch-Notes 2.04.00)
  gardenChars: 3
};

// Zugang Schritt fuer Schritt. d = belegt, u = Zusatz mit eigener Quellenlage.
const DLC_ACCESS = [
  {t: "DLC kaufen und Spiel aktualisieren", d: "Gekauft und geladen wird der DLC über das Menü „DLC kaufen“ im Titelbildschirm. Vorher das Spiel auf die neueste Version bringen (Patch 2.04.00). Steam setzt das Basisspiel Crimson Desert Enhanced voraus."},
  {t: "Ozean und Schiffe", d: "Die Ozean-Quest „Auf in eine größere Welt“ (A Wider World) beginnt nach der Hauptquest „Heulender Hügel“ und ausreichendem Ausbau des Graumähnen-Camps. Laut Guides heißt das konkret: die Questreihe „Gathered Will“ samt dem späteren „Expanding the Camp“ abschließen (nicht die gleichnamige frühere Quest in „Embers of Return“)."},
  {t: "Tauchen", d: "Tauchen geht ohne besondere Voraussetzung, auch an der Küste und in Binnenseen.", u: {v: "Game8 verlangt Kapitel 3, Camp-Ausbau und das Schiff; das gilt nur für die tiefen Tauchplätze im Ozean.", c: "unb", q: "Game8"}},
  {t: "Neue Geschichten für Kliff, Oongka und Damiane", d: "Je eine eigene Questreihe nach der Hauptquest „Ende der Reise“ (Journey's End), zu finden im Abenteuertagebuch."},
  {t: "Garten der Prüfungen und Burg Drachensturz", d: "Beides nach der Hauptquest „Ende der Reise“; für die Burg zusätzlich den Stützpunkt befreien."},
  {t: "Freies Bauen", d: "Nach fertigem Camp am Heulenden Hügel und der Graumähnen-Fraktionsquest „Anfrage von Luke“ (Luke's Request) in „Gründe des Sonnenaufgangs“. Menü: Dekorieren, Hausgrundriss, Freies Bauen."},
  {t: "Einrichtungen verwalten", d: "Region befreien, deren Fraktionsquest abschließen, Camp errichtet. Dann erscheint eine lila Pacht-Meldung; gepachtet wird über Karte, Reiter „Einrichtung“, Lease."}
];
const DLC_WARN = [
  {t: "Nur als Kliff", d: "Graumähnen-Fraktionsquests lassen sich mit Damiane oder Oongka nicht zuverlässig fortsetzen (offiziell bekannter Fehler). Die DLC-Reihe „Auf in eine größere Welt“ daher als Kliff spielen."},
  {t: "Spielstände", d: "Spielstände aus einer Umgebung mit DLC lassen sich ohne DLC weder laden noch per Cross-Save nutzen."}
];

// C1 Schiffe. stats = Health / Inventar / Tempo / Beschleunigung / Handling.
const DLC_SHIPS = [
  {name: "Humble Rowboat", price: ["2.000 Camp Funds in Vellua", {v: "6.000 in Stoneward Harbor, 8.000 in Delesyia, 10.000 im Demeniss Port", c: "unb", q: "th.gl"}], vendor: "Schiffsverwalter in Vellua, Demeniss Port, Delesyia und Stoneward Harbor", obtain: ["Kauf beim Schiffsverwalter", {v: "In den Spieldaten heißt das Boot nur „Rowboat“.", c: "unb", q: "th.gl"}], stats: {v: "100 / 6 / 1 / 1 / 1", c: "unb", q: "Power Up Gaming"}},
  {name: "Small Greymane Ship", price: "kein Kaufpreis", vendor: {v: "kein Händler", c: "nb"}, obtain: "Eigenbau: Entsendung „Small Shipbuilding“ in Vellua, Quest „A Call from Beyond the Horizon“", stats: {v: "5.100 / 14 / 3 / 1 / 1", c: "unb", q: "Power Up Gaming; in der Quelltabelle fehlt in dieser Zeile ein Wert, die Spaltenzuordnung ist unsicher"}},
  {name: "Small Hernandian Ship", price: "40.000 Camp Funds", vendor: "Hopkins, Schiffsverwalter in Vellua (Grace Estate)", obtain: "Kauf beim Schiffsverwalter", stats: {v: "5.000 / 14 / 1 / 1 / 1", c: "unb", q: "Power Up Gaming"}},
  {name: "Medium Hernandian Ship", price: "1.200.000 Camp Funds", vendor: "Hopkins, Schiffsverwalter in Vellua (Grace Estate)", obtain: "Kauf beim Schiffsverwalter", stats: {v: "7.500 / 22 / 2 / 1 / 1", c: "unb", q: "Power Up Gaming"}},
  {name: "Large Hernandian Ship", price: "6.000.000 Camp Funds", vendor: "Hopkins, Schiffsverwalter in Vellua (Grace Estate)", obtain: "Kauf beim Schiffsverwalter", stats: [{v: "10.000 / 36 / 2 / 2 / 1", c: "unb", q: "Power Up Gaming"}, {v: "laut GameRant in allen Werten und bei den Besatzungsplätzen das beste Schiff", c: "unb", q: "GameRant"}]},
  {name: "Small Demenissian Ship", c: "unb", q: "th.gl", price: "40.000 Camp Funds", vendor: "Schiffsverwalter im Demeniss Port", obtain: "Kauf beim Schiffsverwalter", stats: {v: "nicht belegt", c: "nb"}},
  {name: "Medium Demenissian Ship", c: "unb", q: "th.gl", price: "1.200.000 Camp Funds", vendor: "Schiffsverwalter im Demeniss Port", obtain: "Kauf beim Schiffsverwalter", stats: {v: "nicht belegt", c: "nb"}},
  {name: "Large Demenissian Ship", c: "unb", q: "th.gl", price: "6.000.000 Camp Funds", vendor: "Schiffsverwalter im Demeniss Port", obtain: "Kauf beim Schiffsverwalter", stats: {v: "nicht belegt", c: "nb"}},
  {name: "Small Delesyian Ship", price: {v: "40.000 Camp Funds", c: "unb", q: "th.gl"}, vendor: "Schiffsverwalter in Stoneward Harbor (südlich von Dewhaven)", obtain: "Kauf beim Schiffsverwalter", stats: {v: "nicht belegt", c: "nb"}, c: "unb", q: "nur laut th.gl"},
  {name: "Medium Delesyian Ship", c: "unb", q: "th.gl", price: "1.200.000 Camp Funds", vendor: "Schiffsverwalter in Delesyia", obtain: "Kauf beim Schiffsverwalter", stats: {v: "nicht belegt", c: "nb"}},
  {name: "Large Delesyian Ship", c: "unb", q: "th.gl", price: "6.000.000 Camp Funds", vendor: "Schiffsverwalter in Delesyia", obtain: "Kauf beim Schiffsverwalter", stats: {v: "nicht belegt", c: "nb"}},
  // 02.11.2026: sieben Schiffe nur aus den Spieldaten (Riding_*-Datensätze in characterinfo.dlc_01), ohne Händler; Erwerb nicht belegt.
  {name: "Medium Greymane Ship", c: "unb", q: "Spieldaten", price: {v: "nicht belegt", c: "nb"}, vendor: {v: "nicht belegt", c: "nb"}, obtain: {v: "nicht belegt", c: "nb"}, stats: {v: "nicht belegt", c: "nb"}},
  {name: "Large Greymane Ship", c: "unb", q: "Spieldaten", price: {v: "nicht belegt", c: "nb"}, vendor: {v: "nicht belegt", c: "nb"}, obtain: {v: "nicht belegt", c: "nb"}, stats: {v: "nicht belegt", c: "nb"}},
  {name: "Phantom Ship", c: "unb", q: "Spieldaten", price: {v: "nicht belegt", c: "nb"}, vendor: {v: "nicht belegt", c: "nb"}, obtain: {v: "nicht belegt", c: "nb"}, stats: {v: "nicht belegt", c: "nb"}},
  {name: "Assault Ship of the East", c: "unb", q: "Spieldaten", price: {v: "nicht belegt", c: "nb"}, vendor: {v: "nicht belegt", c: "nb"}, obtain: {v: "nicht belegt", c: "nb"}, stats: {v: "nicht belegt", c: "nb"}},
  {name: "Flagship of the East", c: "unb", q: "Spieldaten", price: {v: "nicht belegt", c: "nb"}, vendor: {v: "nicht belegt", c: "nb"}, obtain: {v: "nicht belegt", c: "nb"}, stats: {v: "nicht belegt", c: "nb"}},
  {name: "The Drunken Catfish", c: "unb", q: "Spieldaten", price: {v: "nicht belegt", c: "nb"}, vendor: {v: "nicht belegt", c: "nb"}, obtain: {v: "nicht belegt", c: "nb"}, stats: {v: "nicht belegt", c: "nb"}},
  {name: "Large Delesyian Naval Ship", c: "unb", q: "Spieldaten", price: {v: "nicht belegt", c: "nb"}, vendor: {v: "nicht belegt", c: "nb"}, obtain: {v: "nicht belegt", c: "nb"}, stats: {v: "nicht belegt", c: "nb"}}
];
const DLC_SHIP_NOTES = [
  "Kaufen lassen sich Schiffe erst nach dem eigenen Small Greymane Ship. Jeder Hafen verkauft die Schiffe seiner Region: Hernandian ships in Vellua, Demenissian ships im Demeniss Port, Delesyian ships in Delesyia und das kleine in Stoneward Harbor.",
  {v: "Die letzten sieben Schiffskarten (Medium und Large Greymane Ship, Phantom Ship, Assault Ship of the East, Flagship of the East, The Drunken Catfish und das Large Delesyian Naval Ship der Marine) stehen nur in den Spieldaten, ohne Händler. Wie man sie bekommt, ist nicht belegt.", c: "unb", q: "th.gl, Spieldaten"},
  {v: "Werte der Demenissian und Delesyian ships und Besatzungsplätze je Schiff", c: "nb"}
];
// C2 Haendler, Waehrung, Folgequest
const DLC_SHIP_FACTS = [
  ["Was sind Schiffe?", "Ein neues Transportmittel. Ein Segelschiff baut man per Schiffsbau-Entsendung selbst oder kauft es bei Schiffsverwaltern; Schiffsausrüstung gibt es bei den Schiffsverwaltern in Demeniss und Delesyia."],
  ["Währung", "Schiffe kosten Camp Funds, nicht Silber oder Kupfer."],
  ["Vellua", "Hopkins im Grace Estate verkauft und repariert Schiffe und holt verlorene Schiffe zurück."],
  ["Demeniss und Delesyia", ["Schiffsverwalter im Port of Demeniss und im Port of Delesyia, daneben je ein Händler für Schiffsausrüstung (Ship Outfitter); im Demeniss Port ist das Juan.", {v: "Der Ausrüster im Port Delesyia heißt Joaquin.", c: "unb", q: "Game8"}]],
  ["Stoneward Harbor", "Südlich von Dewhaven (Delesyia): ein weiterer Schiffsverwalter mit dem Small Delesyian Ship und dem Rowboat."],
  ["Ab wann kaufen?", ["Erst nach dem eigenen Small Greymane Ship.", {v: "Die Händler verkaufen, sobald in „A Wider World“ die Entsendung zum Small Shipbuilding in Vellua erledigt ist (th.gl); Game8 nennt dafür die Folgequest „Where the Wind Blows“.", c: "unb", q: "th.gl, Game8"}]],
  ["Seekampf", "Kanonen feuern nur mit Gunner an Bord; das Schiff hat eine eigene Lebensanzeige."],
  ["Seehandel", ["Mit dem Segelschiff lässt sich Seehandel mit neuen Handelswaren betreiben.", {v: "Auf Xamaca Island, Satyros Island und Samora Island verkauft je ein Island Trading Post verpackte Inselwaren gegen Camp Funds (Tabelle unten).", c: "unb", q: "th.gl"}, {v: "Wo und zu welchem Preis man die Waren verkauft", c: "nb"}]],
  ["Wagenwerkstatt", "In Hafengebieten gibt es jetzt eine Wagenwerkstatt."]
];
// C3 Besatzung
const DLC_CREW = [
  {role: "First Mate", d: "Übernimmt das Steuer, wenn es im Kampf unbesetzt ist."},
  {role: "Rigger", d: "Stellt die Segel, wenn du das Tempo wechselst."},
  {role: "Lookout", d: "Markiert Riffe und Fischschwärme auf der Karte."},
  {role: "Carpenter", d: "Repariert das Schiff; mehr Carpenter reparieren schneller."},
  {role: "Gunner", d: "Nötig zum Feuern der Kanonen; jeder weitere Gunner bedient eine Kanone mehr."},
  {role: "Deckhand", d: "Angelt, wenn das Schiff steht; für Erschließungs-Missionen auf Inseln nötig."}
];
const DLC_CREW_NOTES = ["Die Besatzung lässt sich nur im Hafen ändern. Es zählt nur, dass eine Rolle besetzt ist, nicht wer sie besetzt."];
// C4 Schiffsbau per Entsendung
const DLC_SHIPBUILD = [
  ["Small Shipbuilding", "Die Entsendung ergibt das Small Greymane Ship. Nötig ist ein Gefährte mit Engineering."],
  ["Startort", ["Vellua (Game8; die Spieldaten nennen die Entsendung „small shipbuilding mission in Vellua“).", {v: "Output Lag nennt abweichend Pailune.", c: "unb", q: "Output Lag"}]],
  ["Kosten und Dauer", {v: "Vier Quellen nennen vier verschiedene Werte; deshalb stehen hier keine Zahlen.", c: "nb"}],
  ["Large Shipbuilding", {v: "2 Tage 10 Std.; 500.000 Camp Funds, 12.000 Camp Wood, 12.000 Camp Stone, 25.000 Camp Provisions; 20 Gefährten (1 mit Engineering); Shiny Ore x100, Malachite x50, Hydrothermal Mineral Deposit x45, Manganese x20. Welches Schiff dabei entsteht, nennt die Quelle nicht.", c: "unb", q: "Game8"}],
  ["Eigenbau oder Kauf", {v: "Der Eigenbau kostet weniger Camp Funds, braucht aber mehr Material und Zeit.", c: "unb", q: "Output Lag"}],
  ["Ausrüstung ab Werft", {v: "Alle Kaufschiffe und die Greymane ships tragen ab Werft die Steel Naval Cannon und ein Segel ihrer Bauart (z. B. Small Hernandian Sail). Das Phantom Ship fährt mit Gloom Dead Naval Cannon, Gloom Dead Prow Cannon und Large Wraithdrift Sail, die beiden Schiffe des Ostens mit der Dragon Naval Cannon.", c: "unb", q: "th.gl"}]
];

// D Schiffsteile. Kaufpreise doppelt belegt: Game8 in Silver, th.gl in Copper (1 Silver = 100 Copper). Boni nur laut Game8.
const DLC_SHIP_PARTS = [
  {name: "Bright Iron Prow Cannon", type: "Front Cannon", size: "Large", vendor: ["Ship Outfitter, Port Delesyia", {v: "Joaquin", c: "unb", q: "Game8"}], price: "30 Silver (3.000 Copper)", bonus: {v: "keine genannt", c: "unb", q: "Game8"}},
  {name: "Captain's Bow Cannon", type: "Front Cannon", size: "Large", vendor: "Juan, Ship Outfitter im Demeniss Port", price: "240 Silver (24.000 Copper)", bonus: {v: "keine genannt", c: "unb", q: "Game8"}},
  {name: "Iron Naval Cannon", type: "Side Cannon", size: "Large", vendor: ["Ship Outfitter, Port Delesyia", {v: "Joaquin", c: "unb", q: "Game8"}], price: "30 Silver (3.000 Copper)", bonus: {v: "keine genannt", c: "unb", q: "Game8"}},
  {name: "Gilded Naval Cannon", type: "Side Cannon", size: "Large", vendor: "Juan, Ship Outfitter im Demeniss Port", price: "240 Silver (24.000 Copper)", bonus: {v: "keine genannt", c: "unb", q: "Game8"}},
  {name: "Small Tideblessed Sail", type: "Sail", size: "Small", vendor: "Juan, Ship Outfitter im Demeniss Port", price: "70 Silver (7.000 Copper)", bonus: {v: "Health +100, Speed +1", c: "unb", q: "Game8"}},
  {name: "Medium Tideblessed Sail", type: "Sail", size: "Medium", vendor: "Juan, Ship Outfitter im Demeniss Port", price: "140 Silver (14.000 Copper)", bonus: {v: "Health +100, Speed +1", c: "unb", q: "Game8"}},
  {name: "Large Tideblessed Sail", type: "Sail", size: "Large", vendor: "Juan, Ship Outfitter im Demeniss Port", price: "175 Silver (17.500 Copper)", bonus: {v: "Health +100, Speed +1", c: "unb", q: "Game8"}},
  {name: "Small Demenissian Sail", type: "Sail", size: "Small", vendor: "Juan, Ship Outfitter im Demeniss Port", price: "110 Silver (11.000 Copper)", bonus: {v: "Health +100, Speed +2", c: "unb", q: "Game8"}},
  {name: "Medium Demenissian Sail", type: "Sail", size: "Medium", vendor: "Juan, Ship Outfitter im Demeniss Port", price: "220 Silver (22.000 Copper)", bonus: {v: "Health +100, Speed +2", c: "unb", q: "Game8"}},
  {name: "Large Demenissian Sail", type: "Sail", size: "Large", vendor: "Juan, Ship Outfitter im Demeniss Port", price: "275 Silver (27.500 Copper)", bonus: {v: "Health +100, Speed +2", c: "unb", q: "Game8"}},
  {name: "Small Delesyian Sail", type: "Sail", size: "Small", vendor: ["Ship Outfitter, Port Delesyia", {v: "Joaquin", c: "unb", q: "Game8"}], price: "110 Silver (11.000 Copper)", bonus: {v: "Health +100, Speed +2", c: "unb", q: "Game8"}},
  {name: "Medium Delesyian Sail", type: "Sail", size: "Medium", vendor: ["Ship Outfitter, Port Delesyia", {v: "Joaquin", c: "unb", q: "Game8"}], price: "220 Silver (22.000 Copper)", bonus: {v: "Health +100, Speed +2", c: "unb", q: "Game8"}},
  {name: "Large Delesyian Sail", type: "Sail", size: "Large", vendor: ["Ship Outfitter, Port Delesyia", {v: "Joaquin", c: "unb", q: "Game8"}], price: "275 Silver (27.500 Copper)", bonus: {v: "Health +100, Speed +2", c: "unb", q: "Game8"}},
  {name: "Small Tidesworn Sail", type: "Sail", size: "Small", vendor: ["Ship Outfitter, Port Delesyia", {v: "Joaquin", c: "unb", q: "Game8"}], price: "110 Silver (11.000 Copper)", bonus: {v: "Health +100, Speed +2", c: "unb", q: "Game8"}},
  {name: "Medium Tidesworn Sail", type: "Sail", size: "Medium", vendor: ["Ship Outfitter, Port Delesyia", {v: "Joaquin", c: "unb", q: "Game8"}], price: "220 Silver (22.000 Copper)", bonus: {v: "Health +100, Speed +2", c: "unb", q: "Game8"}},
  {name: "Large Tidesworn Sail", type: "Sail", size: "Large", vendor: ["Ship Outfitter, Port Delesyia", {v: "Joaquin", c: "unb", q: "Game8"}], price: "275 Silver (27.500 Copper)", bonus: {v: "Health +100, Speed +2", c: "unb", q: "Game8"}},
  {name: "Giant Golden Compass Sail", type: "Sail", size: "Special", vendor: "nur herstellbar: Handbuch aus der Truhe hinter dem Wasserfall in Castaway's Shelter (Ocula Island), dann an einer Werkbank", price: "Material: Natural Pearl x1, Shiny Ore x30, „Giant Hydrothermal Salam“ (so geschrieben, Menge fehlt), Flawless Timber x200, Fleece x90", bonus: "Health +200, Speed +2", c: "unb", q: "Game8; Größe „Special“ bezieht sich auf den Schiffstyp „Special Ship“, Bezug offen"},
  {name: "Medium Gentle Wave Figurehead", type: "Figurehead", size: "Medium", vendor: ["Ship Outfitter, Port Delesyia", {v: "Joaquin", c: "unb", q: "Game8"}], price: "125 Silver (12.500 Copper)", bonus: {v: "Health +400", c: "unb", q: "Game8"}},
  {name: "Large Gentle Wave Figurehead", type: "Figurehead", size: "Large", vendor: "Juan, Ship Outfitter im Demeniss Port", price: "156 Silver (15.600 Copper)", bonus: {v: "Health +400", c: "unb", q: "Game8"}},
  {name: "Medium Gentle Wave Stern", type: "Stern", size: "Medium", vendor: ["Ship Outfitter, Port Delesyia", {v: "Joaquin", c: "unb", q: "Game8"}], price: "140 Silver (14.000 Copper)", bonus: {v: "Health +100, Handling +1", c: "unb", q: "Game8"}},
  {name: "Large Gentle Wave Stern", type: "Stern", size: "Large", vendor: "Juan, Ship Outfitter im Demeniss Port", price: "175 Silver (17.500 Copper)", bonus: {v: "Health +100, Handling +1", c: "unb", q: "Game8"}},
  {name: "Large Fair Wind Figurehead", type: "Figurehead", size: "Large", vendor: "beide Ship Outfitter (Demeniss Port und Port Delesyia)", price: "250 Silver (25.000 Copper)", bonus: {v: "nicht belegt", c: "nb"}, c: "unb", q: "th.gl"},
  {name: "Large Fair Wind Stern", type: "Stern", size: "Large", vendor: "beide Ship Outfitter (Demeniss Port und Port Delesyia)", price: "275 Silver (27.500 Copper)", bonus: {v: "nicht belegt", c: "nb"}, c: "unb", q: "th.gl"},
  {name: "Long-Horned Fish Figurehead", type: "Figurehead", size: {v: "nicht belegt", c: "nb"}, vendor: "Blaupause bei Rafi (Relic Exchange, Port Delesyia) ab Vertrauen 100, dann herstellen", price: "50 Ancient Relics (Blaupause)", bonus: {v: "nicht belegt", c: "nb"}, c: "unb", q: "th.gl"},
  {name: "Long-Horned Fish Stern", type: "Stern", size: {v: "nicht belegt", c: "nb"}, vendor: "Blaupause bei Rafi (Relic Exchange, Port Delesyia) ab Vertrauen 100, dann herstellen", price: "50 Ancient Relics (Blaupause)", bonus: {v: "nicht belegt", c: "nb"}, c: "unb", q: "th.gl"},
  {name: "Large Tidewish Sail", type: "Sail", size: "Large", vendor: "Blaupause bei Rafi (Relic Exchange, Port Delesyia), dann herstellen", price: "12 Ancient Relics (Blaupause)", bonus: {v: "nicht belegt", c: "nb"}, c: "unb", q: "th.gl"},
  {name: "Chain-Breaking Wolf Figurehead", type: "Figurehead", size: {v: "nicht belegt", c: "nb"}, vendor: "Blaupause in einer Truhe der Höhle hinter einem Wasserfall an der Südseite von Samora Island (Eingang per Stoßangriff), dann herstellen", price: {v: "nicht belegt", c: "nb"}, bonus: "Schiffs-Health +1.000", c: "unb", q: "Mobalytics"},
  {name: "Medium Fair Wind Figurehead", type: "Figurehead", size: "Medium", vendor: "Twitch-Drop Woche 2 (nur mit DLC)", price: "Twitch-Drop", bonus: {v: "nicht belegt", c: "nb"}},
  {name: "Medium Fair Wind Stern", type: "Stern", size: "Medium", vendor: "Twitch-Drop Woche 2 (nur mit DLC)", price: "Twitch-Drop", bonus: {v: "nicht belegt", c: "nb"}},
  {name: "Medium Fair Wind Sail", type: "Sail", size: "Medium", vendor: "Twitch-Drop Woche 2 (nur mit DLC)", price: "Twitch-Drop", bonus: {v: "nicht belegt", c: "nb"}}
];
const DLC_PART_NOTES = [
  "Offiziell belegt ist, dass Schiffsausrüstung bei den Schiffsverwaltern in Demeniss und Delesyia verkauft wird. Bevor man Teile anlegen kann, braucht man ein Schiff. Die Kaufpreise nennen Game8 in Silver und die Spieldaten-Datenbank th.gl in Copper übereinstimmend (1 Silver = 100 Copper).",
  {v: "Die Boni der Kaufteile nennt nur Game8 (Seitenstand 31.10.2026).", c: "unb", q: "Game8"},
  {v: "Beim Relic-Händler Rafi im Port Delesyia gibt es Blaupausen für Schiffsteile (Long-Horned Fish Figurehead und Stern, Large Tidewish Sail).", c: "unb", q: "th.gl"},
  "Die Fair-Wind-Teile in Größe Medium sind Twitch-Drops; die Large-Fassungen von Galionsfigur und Heck verkaufen die Ausrüster."
];

// E Inseln. Namen aus der Regionsliste der MapGenie-Karte und den Spieldaten (th.gl); eine zweite Quelle hebt
// den Namen auf belegt. 17 Inseln = alle Inseln der DLC-Regionsdatei region.dlc_01.paloc. Red Hangs Island steht in der
// Hauptspiel-Datei region.paloc und ist deshalb nur ein Hinweis in DLC_ISLAND_FACTS (Lücken-Audit 03.11.2026).
// Winding Island bewusst NICHT als Insel: nur aus einem Questnamen bekannt. Slugs nicht aendern
// (Abhakliste cd_r2_dlc_inseln haengt daran).
const DLC_ISLANDS = [
  {name: "Auronui Island", where: "Südöstlich von Vellua", unlock: "Erste unerschlossene Insel der Reihe „A Wider World“; Erschließungs-Mission „Footsteps in Unfamiliar Lands“ am Ankerplatz", info: ["Relic-Händler Reyard (Archäologe, kehrt nach jeder Expedition hierher zurück).", "Höhle mit der Forgotten Treasure Map (Quest „Secret of the Winding Island“).", {v: "Ausgedehnte Korallenriffe.", c: "unb", q: "th.gl"}]},
  {name: "Samora Island", info: ["Relic-Händler Cartaine mit Beruf- und Haustier-Outfits.", "Fundort des Naval Officer's Hat; Wasserfallhöhlen.", "Piratenschiff „The Siren's Cry“ (Quest „Outlaws of the Ocean“).", {v: "Island Trading Post (Harris); die Gewässer ringsum sind voller Piraten. Ocean Ruins der Herausforderung „Ocean Ruins“.", c: "unb", q: "th.gl"}]},
  {name: "Satyros Island", where: {v: "Laut Mobalytics die südliche von zwei eng benachbarten Inseln im äußersten Südwesten, mit einem Dorf am Wasserfall.", c: "unb", q: "Mobalytics"}, info: ["Relic-Händler mit Abyss-Gear-Blaupausen und Haustierkleidung.", {v: "Inselboss Satyros, Häuptling der Satyrn (Quest „Isolated Island Chief“), mit dem Satyros Spear als Beute. Der Relic-Händler heißt Evander; dazu ein Island Trading Post (Killiian) und Ocean Ruins.", c: "unb", q: "th.gl"}]},
  {name: "Ocula Island", where: "Im südöstlichen Ozean", info: [{v: "Castaway's Shelter mit dem Handbuch für das Giant Golden Compass Sail; Fundort des Spiral Spear.", c: "unb", q: "Game8, Mobalytics (je ein Detail)"}]},
  {name: "Cloven Hoof Isle", where: {v: "Östlich von Delesyia, zwei Landmassen", c: "unb", q: "Mobalytics"}, info: [{v: "Treppen hinauf zu den Felsgipfeln, deren Herkunft niemand kennt.", c: "unb", q: "th.gl"}, {v: "Vergrabene Truhe mit dem Guardian's Horn.", c: "unb", q: "Mobalytics"}]},
  {name: "Navra Island", c: "unb", q: "Mobalytics gegen MapGenie", info: ["Die Karte von MapGenie schreibt „Navrah Island“.", "Ostküste: vergrabene Truhe mit dem Silverwave Longsword."]},
  {name: "Razanui Island", info: [{v: "Verlassene Insel des Inselbosses Reggis the Isleguard, eines menschenfressenden Riesen-Imps (Quest „Predator of the Abandoned Island“); Ocean Ruins.", c: "unb", q: "th.gl"}]},
  {name: "Bergel Island", info: [{v: "Cave of Sorrow mit dem Boss Rohan Cooper (gleichnamige Quest); Ocean Ruins.", c: "unb", q: "th.gl"}]},
  {name: "Iliya Island", info: [{v: "Zwei Ocean Ruins (am felsigen Hügel und an der Klippe).", c: "unb", q: "th.gl"}]},
  {name: "Phragma Island", info: [{v: "Ocean Ruins.", c: "unb", q: "th.gl"}]},
  {name: "Carcano Island", info: [{v: "Ocean Ruins.", c: "unb", q: "th.gl"}]},
  {name: "Nirakan Island", info: [{v: "Ocean Ruins.", c: "unb", q: "th.gl"}]},
  {name: "Xamaca Island", info: [{v: "Abgelegene Insel weit vom Festland mit einem Island Trading Post (Ludic).", c: "unb", q: "th.gl"}]},
  {name: "Drangar Island", c: "unb", q: "MapGenie", info: ["Bisher nur als Name auf der Karte belegt."]},
  {name: "Estra Island", c: "unb", q: "MapGenie", info: ["Bisher nur als Name auf der Karte belegt."]},
  {name: "Saeon Island", c: "unb", q: "MapGenie", info: ["Bisher nur als Name auf der Karte belegt."]},
  {name: "Spagnola Island", c: "unb", q: "MapGenie", info: ["Bisher nur als Name auf der Karte belegt."]}
];
const DLC_ISLAND_FACTS = [
  ["Pywels Großer Ozean", ["Neue Meeresregion im Süden und Südosten (Great Ocean of Pywel) mit den Teilgebieten East Sea of Pywel und South Sea of Pywel.", "Offiziell gibt es dort „mehrere noch unerschlossene Inseln“ mit Erschließungs-Missionen; eine Zahl nennt Pearl Abyss nicht."]],
  ["Anzahl der Inseln", "17 neue Inseln: so viele führt die DLC-Regionsdatei der Spieldaten, Game8 nennt ebenfalls 17 (nicht zu verwechseln mit den 17 neuen Wohnsitzen). Die Karte von MapGenie zählt zusätzlich Red Hangs Island mit, die laut Spieldaten zum Hauptspiel gehört."],
  ["Red Hangs Island (Hauptspiel)", ["Keine DLC-Insel, liegt aber im Haigebiet nahe der Küste von Delesyia.", {v: "In der South Sea of Pywel; die Haie halten sich bei den Hydrothermalquellen auf, gut zum Zähmen eines Hais.", c: "unb", q: "Sportskeeda"}, {v: "Fundort des Wailing Sea Greathammer.", c: "unb", q: "Mobalytics"}]],
  ["Erschließung", "Insel befreien, dann Graumähnen per Entsendung hinschicken; die Insel erscheint danach im Kartenreiter „Einrichtung“."],
  ["Erschließung im Detail", {v: "3 Deckhands an Bord, Schiff im Kreis der Einrichtung, Auronui dauert 12 Std.; abschließen lässt sich die Mission nur auf der Insel oder dem Schiff, sonst bleibt sie bei 100 % hängen.", c: "unb", q: "Output Lag"}],
  ["Hotfixes", "„Footsteps in Unfamiliar Lands“ lässt sich seit dem Hotfix zu 2.04.00 vom Startort aus beginnen; seit 2.04.02 startet die Erschließungs-Benachrichtigung Missionen direkt aus dem Menü."],
  ["Piraten-Inseln", ["Von Piraten gehaltene Inseln bei Delesyia lassen sich befreien und als Stützpunkt beanspruchen.", {v: "Dazu gehört die Questreihe „Remote Islands“: ein von Piraten überranntes Inseldorf befreien und die Bewohner in Sicherheit bringen.", c: "unb", q: "th.gl"}]],
  ["Abyss Nexus und Cressets", ["Auch im Ozean gibt es Abyss Nexus zum Schnellreisen und Abyss-Rätsel.", {v: "Auf jeder Insel mindestens ein Abyss Nexus, dazu Abyss Cressets.", c: "unb", q: "Game8"}]],
  ["Ocean Ruins", {v: "Herausforderung „Ocean Ruins“ (Ties of the Waves) mit 9 Ruinen auf Samora, Iliya (zwei), Razanui, Phragma, Bergel, Carcano, Satyros und Nirakan Island; jede bringt 2 bis 3 Abyss Artifacts und Ancient Relics.", c: "unb", q: "th.gl"}],
  ["Schatzkarten", ["Offiziell „zahlreiche Schatzkarten“; für vergrabene Truhen braucht man eine Schaufel.", {v: "Die Forgotten Treasure Maps sind nummeriert (mindestens bis #39). Es gibt sie in Quests, auf den Piratenschiffen von „Outlaws of the Ocean“ und bei den Relic-Händlern, teils erst ab Vertrauen 100.", c: "unb", q: "th.gl"}]],
  ["Häfen", "Vellua (südlich von Hernand), Port of Demeniss, Port of Delesyia und Stoneward Harbor (südlich von Dewhaven)."],
  ["Unterwasser-Gebiete", ["Great Trench, Great Rocky Reef und Rocky Reef, Sea Serpent Kelp Forest, Hydrothermalquellen, Great Coral Reef.", {v: "Weitere Namen der Karte: Belcross Kelp Forest, Central Waters, Coral Reef, Coral Reef Colony, Coral Sea, Dead Coral Sea, Great Hydrothermal Vents, Sea of Silence (bei Mobalytics „Silent Sea“), Seafloor Plain, Trench. Dazu Forgotten Ocean Ruins und Great Ocean's Scar Cave.", c: "unb", q: "MapGenie, Mobalytics"}]],
  ["Winding Island", {v: "Kennt man nur aus dem Questnamen „Secret of the Winding Island“; IGN verortet die Quest auf Auronui. Auf der Karte gibt es keine Insel dieses Namens, hier deshalb nicht als eigene Insel geführt.", c: "unb", q: "IGN, MapGenie"}]
];

// F Tauchen
const DLC_DIVE = [
  ["Atemanzeige", "Neu ist eine Atemanzeige. Das maximale Atemvolumen bestimmt, wie lange du tauchen kannst."],
  ["Atem erhöhen", "Tauchanzug verfeinern; neue Gerichte regenerieren den Atem kurzzeitig."],
  ["Charter's Helm und Suit", ["Je +120 maximaler Atem (Vorbesteller-Set „Tauchanzug-Set des Entdeckers“).", {v: "Als Zeit: je 2 Minuten, zusammen 4 (Mobalytics, Sportskeeda) gegen „fast 5 Minuten“ (GameRant); in der Tiefe verbraucht man schneller.", c: "unb", q: "Quellen widersprechen sich"}]],
  ["Tauchanzug ohne Vorbestellung", ["Bei Relic-Händlern gibt es fertige Teile und Blaupausen: Sulivan im Demeniss Port verkauft das Marine Charter's Diving Set.", {v: "Sulivan führt die normale und die leichte Fassung (Light) von Helm, Anzug, Handschuhen und Stiefeln für 5 bzw. 7 Ancient Relics; Reyard auf Auronui verkauft Blaupausen für Charter Assistant's Diving Helm und Suit (je 7).", c: "unb", q: "th.gl"}]],
  ["A.T.A.G.", ["Neue Meereserkundungsausrüstung lässt den A.T.A.G. tauchen.", {v: "Name und Rezept", c: "nb"}]],
  ["Atemgeräte", ["Explorer's Breathing Device als Blaupause bei Reyard (Auronui), das stärkere Propulsion Breathing Device bei Sulivan (Demeniss Port); Wirkung in der Tabelle „Weitere Ausrüstung“.", {v: "Die Blaupausen kosten 3 bzw. 30 Ancient Relics.", c: "unb", q: "th.gl"}]],
  ["Ancient Relics", "Neue Währung aus Wracks, Truhen, Ozean-Bossen und Inselbefreiungen; Anzeige wie Silber oben rechts. In den offiziellen Notes nicht erwähnt."],
  ["Shattered Ancient Relic", {v: "2 Stück ergeben an einer Schmiede 1 Ancient Relic.", c: "unb", q: "Game8"}],
  ["Relic-Händler", ["Fünf Relic Exchanges: Reyard (Auronui), Sulivan (Demeniss Port), Rafi (Port Delesyia), Cartaine (Samora), dazu einer auf Satyros Island; Sortiment in der Tabelle unten.", {v: "Freigeschaltet nach „A Wider World“ und der Befreiung von Auronui, am Ankerplatz.", c: "unb", q: "Game8"}]],
  ["Unterwasser-Ortung", {v: "Beim Segeln: weiße Impulse, gelb bei Beute, blauer Kreis am Fundort.", c: "unb", q: "Game8"}],
  ["Unterwasserwelt", "Ruinen, Schatztruhen, Kreaturen und Wracks unter Wasser."],
  ["Luftblasen", "Air Pockets in Ruinen und Höhlen füllen den Atem auf."],
  ["Gefahren", ["Quallen, darunter elektrische und giftige Arten. Wer zu tief oder über die Grenze taucht, sieht „Cannot enter this region“ mit Countdown.", {v: "Läuft der Countdown ab, zieht ein Kraken den Charakter in einer Zwischensequenz in die Tiefe.", c: "unb", q: "TheGamer"}, {v: "Wirbel.", c: "unb", q: "Output Lag"}]],
  ["Herausforderung „Swimming“", {v: "„Into the Deep“ mit 10 Zielen unter Wasser; jedes bringt ein Sealed Abyss Artifact und Ancient Relics.", c: "unb", q: "th.gl"}],
  ["Karte", "Die Karte zeigt, wo Transportmittel und Haustiere gerufen werden können (Luft, Land, Wasser)."],
  ["Hotfix 2.04.02", "Interaktionen beim Tauchen mit Laterne repariert."]
];

// G Reittiere
const DLC_MOUNTS = [
  {name: "Shark", de: "Hai", where: ["Häufig rund um die Inseln, etwa bei Red Hangs Island.", {v: "Auch südöstlich vor Delesyia.", c: "unb", q: "Sportskeeda"}], how: ["Mit Force Palm betäuben, aufsteigen, Zähm-Minispiel wie beim Pferd, dann registrieren. Harpoon Gun (aus „Where the Wind Blows“) und Tauchausrüstung mitnehmen; Füttern zähmt Haie nicht.", {v: "Mit der Harpoon Gun nur ermüden, nicht töten; im Minispiel der echten Schwanzflosse folgen, nicht dem Symbol. Sind alle Haie tot, wegreisen und zurückkommen.", c: "unb", q: "Sportskeeda"}]},
  {name: "Orca", de: "Orca", where: "Seltener als Haie, in denselben Gebieten", how: ["Zähmen wie den Hai (Force Palm)."]},
  {name: "Sea Turtle", de: "Meeresschildkröte", where: {v: "nicht belegt", c: "nb"}, how: ["Als Reittier belegt.", {v: "Zähmmethode", c: "nb"}]},
  {name: "Sun Fish", de: "Mondfisch", where: {v: "nicht belegt", c: "nb"}, how: ["Als Reittier belegt.", {v: "Wird laut Output Lag gefüttert statt bezwungen; passend dazu verkauft Sulivan das Schriftstück „Sunfish Feed and Preferences“. Welches Futter, ist nicht belegt.", c: "unb", q: "Output Lag, th.gl"}]},
  {name: "Electric Ray", de: "Zitterrochen", c: "unb", q: "Game8", where: {v: "nicht belegt", c: "nb"}, how: ["Aufsteigen und mit Fish Fillet füttern, bis das Vertrauen 100 erreicht."]},
  {name: "Golden Shark", de: "Goldener Hai (legendär)", where: [{v: "Südlich von Dewhaven, östlich des Sea Serpent Kelp Forest, etwa 220 m tief.", c: "unb", q: "GameRant"}], how: ["Legendäres Meerestier in den tiefen Gewässern des Ozeans.", {v: "Mit Axiom Force auf den Kopf, dann Reit-Minispiel.", c: "unb", q: "GameRant"}]}
];
const DLC_MOUNT_FACTS = [
  ["Offiziell", "Verschiedene Unterwassertiere: je nach Art bezwingen oder füttern, um Vertrauen zu gewinnen, dann als Transportmittel registrieren. Eine offizielle Liste gibt es nicht."],
  ["Schiffe und kleine Boote", "Zählen ebenfalls als Transportmittel (Kauf mit Camp Funds, siehe Schiffe)."],
  ["Kartennebel", "Wie weit sich der Kartennebel lichtet, hängt jetzt vom Transportmittel ab."],
  ["Hai im Einsatz", {v: "Haie schwimmen unter Wasser sehr schnell, beißen andere Fische, und die Beute lässt sich direkt vom Rücken einsammeln.", c: "unb", q: "Sportskeeda"}],
  ["Twitch-Drops Woche 1", "Pet Parrot (180 Min. Zuschauzeit) und Braised Meat x10 (60 Min.); Parrot Pirate Hat und Pirate Lantern stehen in der Tabelle „Weitere Ausrüstung“."],
  ["Reittier-Ausrüstung", "Ausrüstung für Transportmittel und Haustiere (z. B. die Bear Dverkhan Armor) steht im Abschnitt „Neue DLC-Ausrüstung“."]
];

// H Quests. subs = Unterquests in Reihenfolge laut Game8. steps = dieselben Schritte mit Belohnung; Belohnungen je Schritt
// nennen Game8 und die Spieldaten-Datenbank th.gl (th.gl fuehrt nur Schritte mit Belohnung). Schritt ohne c = in beiden.
const DLC_QUESTS = [
  {name: "Beyond the Margins", who: "Kliff", start: "Taverne in Pailune City", req: "Hauptquest „Ende der Reise“", subs: {v: "A Moment's Respite; Familiar Faces; Teachings to Light the Way; Where Rumors Gather; Witches of the East; Beyond the Sandstorm; The Buried Neighbors; The Lost Child; The Missing Calf; Village in Darkness; Distorted Light; Veil of Darkness; Path of the Mapmaker", c: "unb", q: "Game8"}, steps: [
    {name: "A Moment's Respite", c: "unb", q: "Game8"},
    {name: "Familiar Faces", d: {v: "Kampf gegen Matthias auf der Treppe von Pailune Castle.", c: "unb", q: "Game8"}, reward: "Greymane Apprentice Combat Armor"},
    {name: "Teachings to Light the Way", d: {v: "Kampf gegen T'rukan in der Arena im Serpent Marsh.", c: "unb", q: "Game8"}, reward: "Ascended Incarnate (Abyss Gear)"},
    {name: "Where Rumors Gather", c: "unb", q: "Game8"},
    {name: "Witches of the East", reward: "Glowing Seed x100"},
    {name: "Beyond the Sandstorm", c: "unb", q: "Game8"},
    {name: "The Buried Neighbors", reward: {v: "Maddin Survey Records, Lukumiya Survey Records", c: "unb", q: "th.gl"}},
    {name: "The Lost Child", reward: {v: "Faraj Survey Records", c: "unb", q: "th.gl"}},
    {name: "The Missing Calf", reward: {v: "Hazran Survey Records", c: "unb", q: "th.gl"}},
    {name: "Village in Darkness", reward: {v: "Yasmin Survey Records", c: "unb", q: "th.gl"}},
    {name: "Distorted Light", reward: {v: "Remnants of Paradise Survey Records", c: "unb", q: "th.gl"}},
    {name: "Veil of Darkness", d: {v: "Kampf gegen Kharzek im Silent Burial Ground westlich des Sandsturmgebiets.", c: "unb", q: "Game8"}, reward: ["Revelation's End (Abyss Gear), Abyss Artifact", {v: "dazu Silent Burial Ground Survey Records", c: "unb", q: "th.gl"}]},
    {name: "Path of the Mapmaker", c: "unb", q: "Game8"}
  ], rewards: ["Greymane Apprentice Combat Armor, Ascended Incarnate, Glowing Seed x100, Revelation's End, Abyss Artifact, dazu Survey Records der durchreisten Orte", {v: "Matthias als entsendbarer Gefährte.", c: "unb", q: "Game8"}]},
  {name: "From the Ashes", who: "Damiane", start: {v: "Countess Azerian am Osttor von Demeniss", c: "unb", q: "Game8"}, req: "Hauptquest „Ende der Reise“", subs: {v: "Reclaimed and Remaining; Demeniss in Upheaval; Countess Azerian's Whereabouts; Judgement of Fire; Schemes; Wavering Sentiment; Chasing a Shadow; Secret Summons; Path of the Politician", c: "unb", q: "Game8 (schreibt „Upheaveal“)"}, steps: [
    {name: "Reclaimed and Remaining", c: "unb", q: "Game8"},
    {name: "Demeniss in Upheaval", c: "unb", q: "Game8 (schreibt „Upheaveal“)"},
    {name: "Countess Azerian's Whereabouts", c: "unb", q: "Game8"},
    {name: "Judgement of Fire", c: "unb", q: "Game8"},
    {name: "Schemes", reward: {v: "Secret Orders, Assembly Sabotage Plan (Schriftstücke)", c: "unb", q: "th.gl"}},
    {name: "Wavering Sentiment", c: "unb", q: "Game8"},
    {name: "Chasing a Shadow", d: {v: "Kampf gegen Geago the Flamecrazed in Scorchrock Castle.", c: "unb", q: "Game8"}, reward: "Ashen Blitz (Abyss Gear), Abyss Artifact"},
    {name: "Secret Summons", reward: ["Demenissian Council Set", {v: "einzeln: Robes, Cloak, Boots, Gloves, dazu das Schriftstück Edict of King Thorel", c: "unb", q: "th.gl"}]},
    {name: "Path of the Politician", c: "unb", q: "Game8"}
  ], rewards: "Ashen Blitz, Abyss Artifact, Demenissian Council Set", note: {v: "Ob die offizielle Quest „Politiker“ (Voraussetzung der Burg der Flammenritter) „Path of the Politician“ ist, ist offen.", c: "nb"}},
  {name: "Forged Resolve", who: "Oongka", start: {v: "Werkstatt im Graumähnen-Camp, Wynstan", c: "unb", q: "Game8"}, req: "Hauptquest „Ende der Reise“", subs: {v: "A New Path; To Scholastone; Unfamiliar Workshop; Faltering Hands, Iron Will; Fractured Door; Fateful Encounter; The Scattered Pieces; Twisted Fate; Path of the Engineer; Unidentified Attack", c: "unb", q: "Game8"}, steps: [
    {name: "A New Path", c: "unb", q: "Game8"},
    {name: "To Scholastone", c: "unb", q: "Game8"},
    {name: "Unfamiliar Workshop", c: "unb", q: "Game8"},
    {name: "Faltering Hands, Iron Will", reward: {v: "Skyway Rocket Pack", c: "unb", q: "th.gl"}},
    {name: "Fractured Door", c: "unb", q: "Game8"},
    {name: "Fateful Encounter", reward: {v: "Enhanced Blaster Blueprint", c: "unb", q: "th.gl"}},
    {name: "The Scattered Pieces", reward: "Enhanced Fatum Blaster"},
    {name: "Twisted Fate", d: {v: "Kampf gegen Goyen am Thron von Pailune Castle, zwei Phasen.", c: "unb", q: "Game8"}, reward: ["Storm's Echo", {v: "Game8 schreibt „Storm Echo“.", c: "unb", q: "Game8 gegen th.gl"}]},
    {name: "Path of the Engineer", c: "unb", q: "Game8"},
    {name: "Unidentified Attack", d: {v: "Bei Yanns verlassenem Wagen nordöstlich der Region Crimson Desert: Kampf gegen die Scrap Metal Queen Stoneback Crab und danach Iron Tyrant Harkan.", c: "unb", q: "Game8"}, reward: "Radiant Flash, Abyss Artifact"}
  ], rewards: "Enhanced Fatum Blaster, Storm's Echo, Radiant Flash, Abyss Artifact"},
  {name: "A Wider World", de: "Auf in eine größere Welt", who: "Graumähnen, Ozean", start: "nach „Heulender Hügel“ und Camp-Ausbau", subs: "A Call from Beyond the Horizon; Where the Wind Blows; A Beginning Beyond the Waves; Footsteps in Unfamiliar Lands; Secret of the Winding Island", steps: [
    {name: "A Call from Beyond the Horizon", d: "Entsendung „Small Shipbuilding“ in Vellua, dafür ein Gefährte mit Engineering.", reward: "Small Greymane Ship"},
    {name: "Where the Wind Blows", reward: "Harpoon Gun"},
    {name: "A Beginning Beyond the Waves"},
    {name: "Footsteps in Unfamiliar Lands", d: "Erschließungs-Mission auf Auronui Island; seit dem Hotfix zu 2.04.00 vom Startort aus beginnbar."},
    {name: "Secret of the Winding Island", d: "Höhle auf Auronui Island.", reward: "Forgotten Treasure Map"},
    {name: "Signpost of the Great Ocean", reward: "5 Ancient Relics", c: "unb", q: "th.gl; Stelle in der Reihe nicht belegt"}
  ], rewards: "Small Greymane Ship, Harpoon Gun, Forgotten Treasure Map, Ancient Relics"},
  {name: "Remote Islands", who: "Fraktionsquest, Ozean", c: "unb", q: "th.gl", subs: {v: "nicht belegt", c: "nb"}, steps: [
    {name: "Inseldorf befreien", d: "Ein von Piraten überranntes Inseldorf befreien und die verängstigten Bewohner in Sicherheit bringen."}
  ], rewards: "Abyss Artifact, 5 Ancient Relics, Trial by Fire"},
  {name: "Mistbound Sea", who: "Fraktionsquest, Ozean", c: "unb", q: "th.gl", subs: {v: "nicht belegt", c: "nb"}, steps: [
    {name: "Die mechanische Seeschlange", d: "Eine uralte Waffe ist in der Tiefe erwacht: dem metallischen Brüllen über die Insel folgen und Leviakan besiegen."}
  ], rewards: "Abyss Artifact, 20 Ancient Relics, Guardian's Gaze"},
  {name: "Isolated Island Chief", who: "Fraktionsquest, Satyros Island", c: "unb", q: "th.gl", subs: {v: "nicht belegt", c: "nb"}, steps: [
    {name: "Häuptling der Satyrn", d: "Auf der Insel, die jeden Fremden abweist, den Häuptling Satyros besiegen, den stärksten Krieger seines Stammes."}
  ], rewards: "Satyros Spear, 5 Ancient Relics, Abyss Artifact"},
  {name: "Predator of the Abandoned Island", who: "Fraktionsquest, Razanui Island", c: "unb", q: "th.gl", subs: {v: "nicht belegt", c: "nb"}, steps: [
    {name: "Der Menschenfresser", d: "Das menschenfressende Ungeheuer Reggis the Isleguard besiegen."}
  ], rewards: "Abyss Artifact, 5 Ancient Relics, Unfurled Feathers"},
  {name: "Cave of Sorrow", who: "Fraktionsquest, Bergel Island", c: "unb", q: "th.gl", subs: {v: "nicht belegt", c: "nb"}, steps: [
    {name: "Klagen in der Höhle", d: "Dem Klagen in der dunklen, feuchten Höhle folgen und Rohan Cooper besiegen."}
  ], rewards: "Naval Officer's Armor, Mirage Cascade, 5 Ancient Relics, Abyss Artifact, Notiz von Rohan Cooper"},
  {name: "Vestiges of the Void", who: "Fraktionsquest, Region Crimson Desert", c: "unb", q: "th.gl (Questname)", subs: {v: "nicht belegt", c: "nb"}, steps: [
    {name: "Der Ritter der Leere", d: "Tief in den Ruinen (Buried Corridor) den Knight of Void besiegen."}
  ], rewards: ["Longsword of Void, Abyss Artifact", {v: "Die Void-Rüstung liegt in einer Truhe im Boss-Bereich.", c: "unb", q: "Mobalytics, GameRant"}]},
  {name: "Shield of Hernand", who: "Graumähnen", c: "unb", q: "Game8", subs: "Guardian of Peace; Cornerstone of Peace", rewards: "Burg Drachensturz (Schenkung durch Duke Celeste)"},
  {name: "Renewed Vitality", who: "Graumähnen", c: "unb", q: "Game8", subs: "The Stilled Saw; The Saw Turns Again", rewards: "Pacht der Timberham Sawmill"},
  {name: "Garden of Trials", de: "Garten der Prüfungen", who: "Graumähnen", subs: "At the Threshold of a New Ordeal", rewards: "Zugang zum Garten der Prüfungen"},
  {name: "A Memory Beyond Ashes", who: "Fraktion Charting the Unknown", c: "unb", q: "Game8", subs: {v: "nicht belegt", c: "nb"}, rewards: "Schaltet die Burgbau-Entsendung der Burg der Flammenritter frei"},
  {name: "Outlaws of the Ocean", who: "Great Ocean, Piratenschiffe", c: "unb", q: "Game8, th.gl", subs: "Pirate Ship: The Siren's Cry; Pirate Ship: The Black Bloom; Pirate Ship: The Crimson Shield; Pirate Ship: The Vengeance; Pirate Ship: Faunus; Pirate Ship: The Grim Wind; Pirate Ship: The Scarlet Widow; Pirate Ship: The Bloodied Stake; Pirate Ship: The Devils' Plunder; Pirate Ship: The Black Curved Blade", steps: [
    {name: "Pirate Ship: The Siren's Cry", d: "Bei Samora Island.", c: "unb", q: "Game8"},
    {name: "Pirate Ship: The Black Bloom", reward: "Forgotten Treasure Map #1"},
    {name: "Pirate Ship: The Crimson Shield", reward: "Forgotten Treasure Map #2"},
    {name: "Pirate Ship: The Vengeance", reward: "Forgotten Treasure Map #3"},
    {name: "Pirate Ship: Faunus", reward: "Forgotten Treasure Map #4"},
    {name: "Pirate Ship: The Grim Wind", reward: "Forgotten Treasure Map #5"},
    {name: "Pirate Ship: The Scarlet Widow", reward: "Forgotten Treasure Map #39"},
    {name: "Pirate Ship: The Bloodied Stake", reward: "Forgotten Treasure Map #23"},
    {name: "Pirate Ship: The Devils' Plunder", reward: "Forgotten Treasure Map #24"},
    {name: "Pirate Ship: The Black Curved Blade", reward: "Forgotten Treasure Map #36"}
  ], rewards: "Je Piratenschiff eine Forgotten Treasure Map"},
  {name: "Tales of the Ocean Residents", who: "Great Ocean", c: "unb", q: "th.gl, Game8", subs: "Ronnie's Bar Snack; Food from the Heart; The Secret to Rich Flavors; The Ingredient of Inspiration; For a Better Tomorrow; The Heart That Couldn't Leave", steps: [
    {name: "Ronnie's Bar Snack", d: "Der Koch Ronnie braucht Jakobsmuscheln für neue Bar-Snacks (Game8 schreibt „Ronnie's Special Bar Snack“).", reward: "Medium Bag"},
    {name: "Food from the Heart", reward: "Medium Bag, Forgotten Treasure Map #31"},
    {name: "The Secret to Rich Flavors", reward: "Medium Bag"},
    {name: "The Ingredient of Inspiration", reward: "Medium Bag"},
    {name: "For a Better Tomorrow", reward: "Medium Bag"},
    {name: "The Heart That Couldn't Leave", reward: "Medium Bag"}
  ], rewards: "Medium Bags, Forgotten Treasure Map #31"}
];
const DLC_QUEST_NOTES = [
  "Offiziell: je eine eigene Quest für Kliff, Oongka und Damiane nach „Ende der Reise“ im Abenteuertagebuch. Die Namen der drei Reihen nennen die Patch-Notes nicht; sie stammen aus den Guides und stehen so auch in den Spieldaten.",
  "Schritte ohne grauen Vermerk nennen Game8 und die Spieldaten-Datenbank th.gl übereinstimmend; th.gl führt nur Schritte mit Belohnung, die übrigen Schritte nennt bisher nur Game8.",
  {v: "Neue Herausforderungen im Abenteuertagebuch: Voyage („Beyond the Horizon“, 8 Ziele auf See), Swimming („Into the Deep“, 10 Ziele unter Wasser), Scenic View („Echoes of the Deep“, 20 Aussichtspunkte), Ocean Ruins („Ties of the Waves“, 9 Ruinen) und Management („The Fruits of Endeavor“, 6 Ziele für Einrichtungen). Voyage und Swimming bringen zusammen 18 neue Sealed Abyss Artifacts.", c: "unb", q: "th.gl"},
  {v: "Eine Journal-Kategorie „Charting the Unknown“ mit 14 Quests nennt nur games.gg.", c: "unb", q: "games.gg"}
];

// I Bosse. w = Name im Boss-Bestand des Wikis, falls vorhanden.
const DLC_BOSSES = [
  {name: "Knight of Void", where: "Buried Corridor (laut Mobalytics im Trivana Sound): versteckte Höhle hinter einer Illusionswand in der Region Crimson Desert, nördlich des „R“ in „Crimson“ auf der Karte. Quest „Vestiges of the Void“.", drop: ["Longsword of Void, Abyss Artifact; Plate Armor in einer Truhe im Boss-Bereich", {v: "Schreibweise der Spieldaten „of Void“ (th.gl, GameRant), Mobalytics schreibt „of the Void“.", c: "unb", q: "th.gl, GameRant gegen Mobalytics"}]},
  {name: "Satyros", where: ["Inselboss, Häuptling der Satyrn: die südliche von zwei eng benachbarten Inseln im äußersten Südwesten (Dorf am Wasserfall); auf der nördlichen Insel ein Knochennest mit einer weiteren Begegnung.", {v: "Name, Satyros Island und die Quest „Isolated Island Chief“ nennt th.gl.", c: "unb", q: "th.gl"}], drop: "Satyros Spear, 5 Ancient Relics, 1 Abyss Artifact"},
  {name: "Leviakan", where: ["Gegner des Großen Ozeans, im Hotfix 2.04.02 erwähnt („Leviakan would stop moving“).", {v: "Eine uralte mechanische Seeschlange, auf einer nebligen Insel erwacht und einst in einem versunkenen Tempel eingeschlossen; Quest „Mistbound Sea“.", c: "unb", q: "th.gl"}], drop: {v: "Guardian's Gaze, 20 Ancient Relics, Abyss Artifact (Questbelohnung)", c: "unb", q: "th.gl"}},
  {name: "Reggis the Isleguard", c: "unb", q: "th.gl", where: "Razanui Island: ein menschenfressender Riesen-Imp, den Piraten einst zähmten; greift auch Schiffe an. Quest „Predator of the Abandoned Island“.", drop: "Unfurled Feathers, 5 Ancient Relics, Abyss Artifact (Questbelohnung)"},
  {name: "Rohan Cooper", c: "unb", q: "th.gl", where: "Cave of Sorrow auf Bergel Island: der ruhelose Geist des Sohns eines Marineoffiziers aus Demeniss. Quest „Cave of Sorrow“.", drop: "Naval Officer's Armor, Mirage Cascade, 5 Ancient Relics, Abyss Artifact (Questbelohnung)"},
  {name: "The Dancing Catfish Crusher", c: "unb", q: "th.gl", where: "Boss des Großen Ozeans: eine Zerstörungsmaschine, die Sir Catfish mit der Technik der Helms bauen ließ. Ort nicht belegt.", drop: {v: "nicht belegt", c: "nb"}},
  {name: "Matthias", w: "Matthias", c: "unb", q: "Game8", where: "Pailune Castle, Treppe; Kliffs Quest „Familiar Faces“", drop: "Danach entsendbarer Gefährte", note: {v: "Matthias ist schon Boss im Hauptspiel (Kapitel 2, „For Honor“); ob es eine eigene DLC-Variante oder nur eine erneute Begegnung ist, ist nicht belegt.", c: "nb"}},
  {name: "T'rukan", c: "unb", q: "Game8", where: "Arena im Serpent Marsh; Kliffs Quest „Teachings to Light the Way“", drop: "Ascended Incarnate (Questbelohnung)"},
  {name: "Kharzek, Archon of Antumbra", where: [{v: "Silent Burial Ground westlich des Sandsturmgebiets; Kliffs Quest „Veil of Darkness“.", c: "unb", q: "Game8"}, {v: "Die Spieldaten schreiben „Archon of Antumbra, Kharzek“.", c: "unb", q: "th.gl"}], drop: "Revelation's End, Abyss Artifact (Questbelohnung)"},
  {name: "Geago the Flamecrazed", where: {v: "Scorchrock Castle; Damianes Quest „Chasing a Shadow“", c: "unb", q: "Game8"}, drop: "Ashen Blitz, Abyss Artifact (Questbelohnung)"},
  {name: "Goyen", w: "Goyen", c: "unb", q: "Game8", where: "Pailune Castle (Thron), zwei Phasen; Oongkas Quest „Twisted Fate“", drop: "Storm's Echo (Questbelohnung)", note: {v: "Den Namen gibt es auch als Boss im Hauptspiel; ob es dieselbe Variante ist, ist unklar.", c: "nb"}},
  {name: "Scrap Metal Queen Stoneback Crab", where: [{v: "Eine Kriegsmaschine, die Harkan nach dem Vorbild der Queen Stoneback Crab aus Schrott baute.", c: "unb", q: "th.gl"}, {v: "Bei Yanns verlassenem Wagen nordöstlich der Region Crimson Desert; Oongkas Quest „Unidentified Attack“.", c: "unb", q: "Game8"}], drop: {v: "nicht belegt", c: "nb"}},
  {name: "Iron Tyrant Harkan", where: {v: "Direkt nach der Scrap Metal Queen Stoneback Crab, gleiche Quest", c: "unb", q: "Game8"}, drop: "Radiant Flash, Abyss Artifact (Questbelohnung von „Unidentified Attack“)"},
  {name: "Sea serpents (Seeschlangen)", where: "Gegnerklasse im Ozean, im Hotfix 2.04.02 erwähnt.", drop: {v: "nicht belegt", c: "nb"}}
];
const DLC_BOSS_NOTES = [
  "Offiziell: „mehrere neue, mächtige Bosse“, gegen einige ist über ein Erinnerungsfragment eine Revanche möglich. Namen nennt Pearl Abyss nicht; hier stehen die Namen, die Guides und die Spieldaten-Datenbank th.gl belegen.",
  {v: "th.gl führt eine eigene Gruppe „Bosses: Great Ocean“ mit Leviakan, Satyros, Reggis the Isleguard, Rohan Cooper und The Dancing Catfish Crusher.", c: "unb", q: "th.gl"},
  "Im Garten der Prüfungen kämpft man nur gegen bereits bekannte Bosse aus dem Hauptspiel."
];

// J Garten der Pruefungen. b = Bossnamen laut GameRant, Schreibweise hier wie im Boss-Bestand des Wikis.
const DLC_GARDEN_RULES = [
  ["Freischaltung", "Nach der Hauptquest „Ende der Reise“; Einstiegsquest „Garden of Trials: At the Threshold of a New Ordeal“."],
  ["Ort", ["Im Abyss nahe dem Archiv des Axioms: Abyss Nexus Axiom Archive (Path of Providence oberhalb von Hernand), dort an Sockel oder Würfel die Gruppe wählen.", {v: "Ansprechpartner White Crow.", c: "unb", q: "GameRant"}]],
  ["Regeln", "10 Gruppen in frei wählbarer Reihenfolge, allein oder mit bis zu 3 Charakteren (Kliff, Oongka, Damiane). Fällt einer, kämpft der nächste weiter. Gerichte heilen nicht."],
  ["Belohnung je Gruppe", "Jede abgeschlossene Gruppe verbessert eine bestehende Fähigkeit."],
  ["Abschlussbelohnung", "Lumen Longsword am hinteren Pfeiler, nachdem alle 10 Gruppen geschafft sind."],
  ["Gruppe wählbar?", {v: "Eine Gruppe soll erst wählbar sein, wenn ihre Bosse in der Oberwelt besiegt sind; Output Lag nennt das ausdrücklich eine Vermutung.", c: "unb", q: "Output Lag"}],
  ["Skillbaum", {v: "Alle 10 verbesserten Fähigkeiten schalten „Ascend“ im Skillbaum frei.", c: "unb", q: "Games Horizon"}],
  ["Erfolg", {v: "„Trial by flower“.", c: "unb", q: "Output Lag"}]
];
const DLC_GARDEN = [
  {n: 1, name: "Battlefield Piercers", b: ["Gwen Kraber", "Half Moon Reaper", "Antumbra's Spear"], reward: "Ascend Stab (kürzere Ladezeit von Slash)"},
  {n: 2, name: "The Deathbringers", b: ["Walter Lanford", "The Crimson Warden", "Samara the Sandwatcher"], reward: "Ascended Evasive Slash", bc: "ok"},
  {n: 3, name: "Marni's Relics", b: ["Marni's Clockwork Mantis", "Mechanicus", "Dreadnought"], reward: "Ascended Elements (weniger Spirit-Kosten beim Element-Imbuen)"},
  {n: 4, name: "Earth-Trampling Giants", b: ["The Raging Tempest", "Bradie Gu", "Mazzul, the Dark Justiciar"], reward: "Ascended Lariat (weniger Spirit-Kosten)"},
  {n: 5, name: "Harbingers of Death", b: ["Reed Devil", "Draven the Crowcaller", "Hexe Marie"], reward: "Ascended Flight (weniger Ausdauer im Flug)"},
  {n: 6, name: "The Ironbound Warriors", b: ["Saigord the Staglord", "White Bearclaw", "Cassius Morten"], reward: "Ascended Turning Slash (weniger Spirit-Kosten)"},
  {n: 7, name: "Anomalous Beings", b: ["Kailok the Hornsplitter", "Sizlek the Insatiable", "Master Du"], reward: "Ascended Evasive Roll (weniger Spirit-Kosten)"},
  {n: 8, name: "Earth-Shattering Beasts", b: ["Kearush the Slayer", "White Horn", "Ogre"], reward: "Regeneration (HP und Spirit bei unbewaffneten Treffern)"},
  {n: 9, name: "The Soul-Consumed", b: ["Awakened Ludvig", "Awakened Lucian Bastier", "Lava Myurdin (Phase 2)"], reward: "Ascended Blinding Flash Finisher"},
  {n: 10, name: "The Apparition Bearers", b: ["Giath", "Fortain the Cursed Knight", "Antumbra's Sword"], reward: "Ascended Forward Slash (weniger Ausdauer)"}
];
const DLC_GARDEN_NOTE = {v: "Gruppennamen und Belohnungen sind belegt. Die Bossnamen der Gruppen nennt nur GameRant (Gruppe 2 auch Sportskeeda); sie sind deshalb außer bei Gruppe 2 unbestätigt. Abweichende Schreibweisen der Quelle (z. B. „Crowcaller“, „White Horn, Shepherd of Souls“, „Lava Myurdin“) stehen hier unter dem Namen aus der Bossliste des Wikis.", c: "unb", q: "GameRant"};

// K Burgen, Wohnen, Verwaltung, Soziales. g = Gruppe.
const DLC_LIVING = [
  {g: "Burgen", t: "Burg Drachensturz (Drakesfall Castle)", d: ["Selbst gestaltbar; nach „Ende der Reise“ und der Befreiung des Stützpunkts.", {v: "Schenkung durch Duke Celeste über „Shield of Hernand“; Burgbau-Entsendung 30.000 Camp Funds, 20 Gefährten (1 mit Construction), 15 Spieltage. Ort nicht genannt.", c: "unb", q: "Game8"}]},
  {g: "Burgen", t: "Burg der Flammenritter (Flame Knight's Castle)", d: ["Selbst gestaltbar; nach Damianes Quest „Politiker“ und der Befreiung des Stützpunkts.", {v: "Liegt in Demeniss; die Befreiung schaltet „A Memory Beyond Ashes“ frei; Burgbau 100.000 Camp Funds, 10.000 Camp Weapons, 40.000 Camp Stone, 40.000 Camp Wood, 10.000 Camp Provisions, 20 Gefährten (1 mit Construction), 15 Spieltage.", c: "unb", q: "Game8 (schreibt wie th.gl „Flame Knights' Castle“)"}]},
  {g: "Burgen", t: "Dritte Burg?", d: {v: "Die Feature-Übersicht spricht von drei Burgen, die Patch-Notes nennen zwei, kein Guide findet eine dritte. Scorchrock Castle ist nur Questort, keine gestaltbare Burg.", c: "nb"}},
  {g: "Wohnen", t: "Freies Bauen", d: "Grundriss selbst entwerfen, Wände und Fenster frei setzen (Dekorieren, Hausgrundriss, Freies Bauen); Voraussetzung siehe Zugang."},
  {g: "Wohnen", t: "17 neue Wohnsitze", d: ["Werden per Entsendung errichtet; der Ehepartner lebt im zugewiesenen Wohnsitz, die Karte zeigt das Symbol des Besitzers.", {v: "Namen und Orte der Wohnsitze", c: "nb"}]},
  {g: "Wohnen", t: "Neue Wohnobjekte", d: "Wege, Bäume, Blumenbeete, Katzenwachtürme, Hundekissen; Katzenwachtürme beim neuen Katzenwachturm-Händler."},
  {g: "Verwaltung", t: "Kartenreiter „Einrichtung“", d: "Befreite Stützpunkte pachten und als Restaurant, Sägewerk, Schmiede oder Schneiderei betreiben. Die Einrichtungen laufen auch weiter, wenn du weit weg bist; gelegentlich kommen besondere Kunden. Graumähnen-Stützpunkte sind auf der Karte jetzt blau."},
  {g: "Verwaltung", t: "Beispiele", d: ["Restaurant in Vellua, Schmiede in der Zargan-Panzerfabrik (Zargan Tankworks), Sägewerk Timberham Sawmill (Hernand).", {v: "Die Pacht des Sägewerks läuft laut Game8 über „Renewed Vitality“ bzw. „The Stilled Saw“.", c: "unb", q: "Game8"}, {v: "Ort der Schneiderei", c: "nb"}]},
  {g: "Verwaltung", t: "Betrieb", d: "Personal mit passenden Fähigkeiten zuweisen, Waren und Preise festlegen, Einrichtungsgegenstände platzieren; ein steigender Recognition Level schaltet Rezepte frei."},
  {g: "Verwaltung", t: "Herausforderung „Management“", d: {v: "„The Fruits of Endeavor“ mit 6 Zielen für Einrichtungen; die Belohnungen sind Einrichtungsgegenstände: Fisherman's Pride, Rowboat Bookshelf, Captain's Bed of Dignity, Captain's Chair of Dignity, Golden Bottled Ship und Fancy Gilded Ship's Wheel.", c: "unb", q: "th.gl"}},
  {g: "Verwaltung", t: "Miete und Ertrag", d: ["Hotfix 2.04.02 korrigierte abnormal steigende Erträge.", {v: "Zahlen zu Miete und Ertrag", c: "nb"}]},
  {g: "Soziales", t: "Romanze und Ehe", d: "Über „Interagieren“ und „Flirten“; bei Vertrauen 100 auf der erweiterten Stufe ist ein Heiratsantrag möglich. Hexen brauchen dafür ihre abgeschlossenen Sanktum-Quests. Der Ehepartner reist mit, schenkt regelmäßig etwas und lässt sich beim Friseur anpassen. Scheidung ist möglich, „hat jedoch seinen Preis“."},
  {g: "Soziales", t: "Kandidaten", d: ["Die Hexen sind als Partnerinnen möglich.", {v: "Namentlich Elowen, Bari, Lyselia und Areciel, nur Kliff kann sie heiraten; weitere NPCs mit Herzsymbol. Flirten unter dem Maximum kostet je 10 Vertrauen; mehrere Romanzen, aber nur eine Ehe; Oongka und Damiane brauchen erst einen Wohnsitz.", c: "unb", q: "Game8"}]},
  {g: "Soziales", t: "Romanze-Hotfixes", d: "2.04.02: Ehepartner folgte ins Wasser und verhielt sich im Kampf abnormal. 2.04.03: keine Geschenke nach der Hochzeit, Mehrfachauswahl bei „Gift“."},
  {g: "Soziales", t: "Fest im Camp", d: "Mission für ein Fest: NPCs mit genug Vertrauen besuchen das Camp, bestimmte Besucher lassen sich als Ehrengraumähnen anheuern."},
  {g: "Soziales", t: "Würfelspiel (Banker's Dice)", d: ["Neues Minispiel in Demeniss und Delesyia.", {v: "Regeln, genaue Orte und Einsätze", c: "nb"}]},
  {g: "Soziales", t: "Legendäre Insekten", d: ["Drei neue legendäre Insekten samt eigenem Insektenlager.", {v: "Golden Butterfly (nahe einem Tempel mitten in einer zerklüfteten Felsregion), Golden Jewel Beetle und Golden Rhinoceros Beetle (sehr selten, an Orten mit alter mystischer Energie).", c: "unb", q: "th.gl"}, {v: "Genaue Fundorte", c: "nb"}]},
  {g: "Soziales", t: "Friseur und Outfits", d: "Friseure in größeren Städten; das Graumähnen-Outfit wechselst du im Graumähnen-Verwaltungsbüro."}
];

// Hinweise im Ausruestungsblock (keine Waffen-/Ruestungszeilen; die stehen datengetrieben aus WEAPONS/ARMOR).
const DLC_GEAR_TOOLS = ["Frying Pan", "Ladle", "Frying Pan Lid", "Jar Lid", "Kitchen Knife"];
const DLC_GEAR_TOOLS_DE = {"Frying Pan": "Bratpfanne", "Ladle": "Schöpfkelle", "Frying Pan Lid": "Pfannendeckel", "Jar Lid": "Krugdeckel", "Kitchen Knife": "Küchenmesser"};
const DLC_GEAR_NOTES = [
  "Offiziell neu: Rüstungen, Waffen, Ausrüstung für Transportmittel und Haustiere sowie Abyss-Ausrüstung, ohne Einzelnamen. Alle Guides sind zwei bis drei Tage nach Release ausdrücklich unvollständig.",
  "Vorbesteller-Bonus: „Tauchanzug-Set des Entdeckers“ (Charter's Diving Set) für Kliff und Oongka, „Leichtes Tauchanzug-Set des Entdeckers“ (Charter's Light Diving Set) für Damiane; abholen über Pause, Others, Add-ons, Receive. Ohne Vorbestellung gibt es Tauchanzug-Teile bei Relic-Händlern.",
  "Twitch-Drops Woche 1 (29.10. bis 04.11.2026, auch ohne DLC): Pirate's Sword und Pirate Eyepatch nach 120 Minuten Zuschauzeit."
];

// Seehandel-Waren, Wohnsitze, Relic-Haendler (Nachtlauf 01.11.2026; Felder siehe Dateikopf, leer = ausgeblendet)
const DLC_TRADE = [
  {name: "Packaged Red Seaweed Bundle", c: "unb", q: "th.gl", buy: "Island Trading Post (Ludic), Xamaca Island: 1.289 Camp Funds", sell: {v: "nicht belegt", c: "nb"}},
  {name: "Packaged Kelp Bundle", c: "unb", q: "th.gl", buy: "Island Trading Post (Ludic), Xamaca Island: 1.521 Camp Funds", sell: {v: "nicht belegt", c: "nb"}},
  {name: "Packaged Special Abalone", c: "unb", q: "th.gl", buy: "Island Trading Post (Ludic), Xamaca Island: 3.161 Camp Funds", sell: {v: "nicht belegt", c: "nb"}},
  {name: "Packaged Premium Mussels", c: "unb", q: "th.gl", buy: "Island Trading Post (Killiian), Satyros Island: 1.321 Camp Funds", sell: {v: "nicht belegt", c: "nb"}},
  {name: "Packaged Premium Sea Pineapples", c: "unb", q: "th.gl", buy: "Island Trading Post (Killiian), Satyros Island: 1.594 Camp Funds", sell: {v: "nicht belegt", c: "nb"}},
  {name: "Packaged Premium Scallops", c: "unb", q: "th.gl", buy: "Island Trading Post (Killiian), Satyros Island: 1.622 Camp Funds", sell: {v: "nicht belegt", c: "nb"}},
  {name: "Packaged Pearl Remembrance Lamp", c: "unb", q: "th.gl", buy: "Island Trading Post (Harris), Samora Island: 31.992 Camp Funds", sell: {v: "nicht belegt", c: "nb"}},
  {name: "Packaged Octopus-legged Candlestick", c: "unb", q: "th.gl", buy: "Island Trading Post (Harris), Samora Island: 10.397 Camp Funds", sell: {v: "nicht belegt", c: "nb"}},
  {name: "Packaged Blue Coral Lamp", c: "unb", q: "th.gl", buy: "Island Trading Post (Harris), Samora Island: 12.790 Camp Funds", sell: {v: "nicht belegt", c: "nb"}}
];
const DLC_HOMES = [
];
const DLC_RELIC_SHOPS = [
  {name: "Reyard", where: "Auronui Island (Archäologe)", sells: ["Blaupause für das Explorer's Breathing Device", {v: "Preise in Ancient Relics. Blaupausen Charter Assistant's Diving Helm und Suit (je 7), Recipe: Jellyfish Salad (4), Alchemy Formula: Luftis's Lesser Elixir (6) und Luftis's Elixir (12), Forgotten Treasure Maps #22, #34 und #27 (2 bis 50), Schriftstück Thoughts on the Shiny Ore", c: "unb", q: "th.gl"}], unlock: [{v: "Nach „A Wider World“ und der Befreiung von Auronui, am Ankerplatz.", c: "unb", q: "Game8"}, {v: "Zwei Schatzkarten erst ab Vertrauen 100.", c: "unb", q: "th.gl"}]},
  {name: "Sulivan", where: "Demeniss Port (Archäologe)", sells: ["Marine Charter's Diving Set, Blaupause für das Propulsion Breathing Device", {v: "Preise in Ancient Relics. Helm, Anzug, Handschuhe und Stiefel je normal und Light (5 bzw. 7), Propulsion-Blaupause 30, Forgotten Treasure Maps #9 und #26, Schriftstücke wie „Sunfish Feed and Preferences“", c: "unb", q: "th.gl"}], unlock: {v: "Schatzkarten erst ab Vertrauen 100.", c: "unb", q: "th.gl"}},
  {name: "Rafi", where: "Port Delesyia (Sammler)", sells: ["Möbel-Blaupausen", {v: "Preise in Ancient Relics. Captain's Carpet of Dignity, drei Ancient Runic Stone Sconces, Schiffsteil-Blaupausen (Long-Horned Fish Figurehead und Stern je 50, Large Tidewish Sail 12), Alchemy Formula: Lucaris's Lesser Elixir und Lucaris's Elixir, Forgotten Treasure Map #33, Schriftstücke", c: "unb", q: "th.gl"}], unlock: {v: "Schiffsteil-Blaupausen und Schatzkarte erst ab Vertrauen 100.", c: "unb", q: "th.gl"}},
  {name: "Cartaine", where: "Samora Island (Archäologe der Samora-Ruinen)", sells: ["Beruf- und Haustier-Outfits", {v: "Preise in Ancient Relics. Cook's, Architect's und Fisherman's Outfits (9 bis 20), Katzen- und Hunde-Outfits (nur mit passendem Haustier), Recipe: Knife-Cut Clam Noodles und Grilled Cheese Clams, Alchemy Formula: Fluva's Lesser Elixir und Fluva's Elixir, Forgotten Treasure Maps #16 und #6", c: "unb", q: "th.gl"}], unlock: {v: "Schatzkarten erst ab Vertrauen 100.", c: "unb", q: "th.gl"}},
  {name: "Evander", where: "Satyros Island (erforscht die Wandbilder der Satyrn)", sells: ["Abyss-Gear-Blaupausen und Haustierkleidung", {v: "Preise in Ancient Relics. Gear Blueprints Writhebolt, Radiant Flash, Power Overload, Venomous Fangs, Rushing Wind und Storm's Echo (22 bis 27), Scholastone- und Ludeon-Outfits für Katze und Hund, Forgotten Treasure Maps #37 und #38", c: "unb", q: "th.gl"}], unlock: {v: "Schatzkarten erst ab Vertrauen 100. Den Namen Evander nennt nur th.gl.", c: "unb", q: "th.gl"}}
];

// L Was noch offen ist
const DLC_OPEN = [
  "Vollständige Waffen- und Rüstungsliste: Rund 40 weitere Gegenstände stehen in den Spieldaten neben der DLC-Ausrüstung, ihr Fundort und damit die DLC-Zugehörigkeit sind nicht belegt. Eine zweite Quelle für die Werte der meisten DLC-Waffen (bisher nur th.gl), Sockel der DLC-Waffen.",
  "Void-Set: Das Wiki folgt jetzt der Spieldaten-Datenbank th.gl und GameRant („of Void“, z. B. „Plate Helm of Void“); Mobalytics schreibt „of the Void“. Zahlenwerte der Void-Teile stehen bisher nur bei th.gl, einen Set-Bonus nennt keine Quelle.",
  "Eine zweite Quelle für den Angriffswert des Lumen Longsword (th.gl: 64 bei +10).",
  "Kosten und Dauer der Entsendung „Small Shipbuilding“; welches Schiff „Large Shipbuilding“ ergibt und wie man Medium und Large Greymane Ship, Phantom Ship und die Schiffe des Ostens bekommt.",
  "Werte der Demenissian und Delesyian ships, Besatzungsplätze je Schiff, Kanonenwerte, Boni der Fair-Wind-Teile und der Blaupausen-Teile.",
  "Lage und Inhalte der Inseln, die bisher nur als Kartenname bekannt sind (Drangar, Estra, Saeon, Spagnola); Lösungen der Schatzkarten.",
  "Wo und zu welchem Preis man die neuen Handelswaren verkauft, Seerouten.",
  "Verfeinerungsstufen und Materialien des Tauchanzugs, Namen der Atem-Gerichte, Erhalt der A.T.A.G.-Meereserkundungsausrüstung (Namen bisher nur laut th.gl).",
  "Zähmmethode von Sea Turtle, Futter für den Sun Fish, Vertrauensschwellen außer beim Electric Ray, Werte der Unterwasser-Reittiere.",
  "Schritte und Belohnungen von „A Beginning Beyond the Waves“, „Shield of Hernand“, „Renewed Vitality“ und „A Memory Beyond Ashes“; alle Schritte der neuen Inselquests.",
  "Ort von The Dancing Catfish Crusher; zweite Quelle für die Bossnamen im Garten der Prüfungen.",
  "Dritte Burg aus der Feature-Übersicht, Ort von Burg Drachensturz, Ort der Schneiderei, Miete und Ertrag der Einrichtungen, die 17 Wohnsitze.",
  "Regeln und Orte des Würfelspiels, Fundorte der drei legendären Insekten, vollständige Liste der Romanze-Kandidaten.",
  "Kampf-Alltagswerkzeuge (Bratpfanne und Co.): Fundort bzw. Erhalt, dazu eine zweite Quelle für Werte und Waffentyp (bisher nur th.gl).",
  "Ob die Twitch-Drop-Gegenstände nach dem Ende des Events (11.11.2026) noch auf anderem Weg erhältlich sind."
];

// Quellen (t = Anzeige, url = Link)
const DLC_SOURCES = [
  {t: "Patch-Notes 2.04.00", url: "https://crimsondesert.pearlabyss.com/de-DE/News/Notice/Detail?_boardNo=140"},
  {t: "Feature-Übersicht", url: "https://crimsondesert.pearlabyss.com/de-DE/News/Notice/Detail?_boardNo=137"},
  {t: "Vorbesteller-Bonus", url: "https://crimsondesert.pearlabyss.com/de-DE/News/Notice/Detail?_boardNo=129"},
  {t: "Hotfix zu 2.04.00", url: "https://crimsondesert.pearlabyss.com/en-US/News/Notice/Detail?_boardNo=145"},
  {t: "Hotfix 2.04.02", url: "https://crimsondesert.pearlabyss.com/en-US/News/Notice/Detail?_boardNo=146"},
  {t: "Hotfix 2.04.03", url: "https://crimsondesert.pearlabyss.com/en-US/News/Notice/Detail?_boardNo=147"},
  {t: "Hotfix 2.04.04", url: "https://crimsondesert.pearlabyss.com/en-US/News/Notice/Detail?_boardNo=148"},
  {t: "Hotfix 2.04.05", url: "https://crimsondesert.pearlabyss.com/en-US/News/Notice/Detail?_boardNo=149"},
  {t: "Game8 Schiffe", url: "https://game8.co/games/Crimson-Desert/archives/635788"},
  {t: "Game8 Schiffsteile", url: "https://game8.co/games/Crimson-Desert/archives/636449"},
  {t: "Game8 Quests", url: "https://game8.co/games/Crimson-Desert/archives/635794"},
  {t: "Game8 Burgen", url: "https://game8.co/games/Crimson-Desert/archives/635872"},
  {t: "Game8 Reittiere", url: "https://game8.co/games/Crimson-Desert/archives/635858"},
  {t: "Game8 DLC-Karte", url: "https://game8.co/games/Crimson-Desert/archives/636448"},
  {t: "th.gl Quests", url: "https://crimsondesert.th.gl/db/journal"},
  {t: "th.gl Händler", url: "https://crimsondesert.th.gl/db/vendors"},
  {t: "th.gl Bestiarium", url: "https://crimsondesert.th.gl/db/bestiary"},
  {t: "MapGenie Karte", url: "https://mapgenie.io/crimson-desert/maps/pywel"},
  {t: "GameRant Schiffe", url: "https://gamerant.com/crimson-desert-all-ships-guide-chartering-the-unknown/"},
  {t: "GameRant Garten der Prüfungen", url: "https://gamerant.com/crimson-desert-all-garden-of-trials-bosses-rewards/"},
  {t: "GameRant Ancient Relics", url: "https://gamerant.com/crimson-desert-ancient-relics-guide/"},
  {t: "Power Up Gaming Schiffe", url: "https://powerupgaming.co.uk/2026/10/30/how-to-unlock-upgrade-ships-in-crimson-desert-charting-the-unknown/"},
  {t: "Output Lag Tauchen und Inseln", url: "https://outputlag.com/guides/crimson-desert-diving-underwater-mounts-islands-treasure-charting-the-unknown/"},
  {t: "Output Lag Einrichtungen", url: "https://outputlag.com/guides/crimson-desert-stronghold-facilities-housing-castles-charting-the-unknown/"},
  {t: "Sportskeeda Hai", url: "https://www.sportskeeda.com/esports/how-get-new-shark-mount-crimson-desert-dlc"},
  {t: "TheGamer Kraken", url: "https://www.thegamer.com/crimson-desert-charting-the-unknown-dlc-kraken-secret-encounter-easter-egg/"},
  {t: "Mobalytics Unterwasser", url: "https://mobalytics.gg/gamebase/guides/crimson-desert-underwater-exploration"},
  {t: "Mobalytics versteckte Ausrüstung", url: "https://mobalytics.gg/gamebase/guides/crimson-desert-hidden-weapons-and-gear"},
  {t: "IGN Fraktionsquests", url: "https://www.ign.com/wikis/crimson-desert/Charting_the_Unknown_Faction_Quests"}
];

// ===== Bereich Orchestrator A (Nachtlauf 01.11.2026): weitere DLC-Ausrüstung =====
// Ausrüstung aus dem DLC, die keinen Platz in WEAPONS (d01), ARMOR (d02) oder ACCESSORIES (d05) hat:
// Reittier-, Haustier- und Wagenausrüstung, Taucher-Zubehör, Kampf-Alltagswerkzeuge mit Werten usw.
// Feldvertrag: {name, kind, slot, char, stats, source, req, c, q} (Werte wie oben: Text oder {v,c,q}; c ok|unb|nb).
// Nur Orchestrator A schreibt zwischen diesen beiden Markern; Renderer (App + SEO) baut Orchestrator B.
const DLC_GEAR_EXTRA = [
  {name: "Bear Dverkhan Armor", kind: "Reittier-Ausrüstung", slot: "Rüstung für das Bärenreittier", char: "Bärenreittier", stats: [{v: "23 Angriff, 120 Verteidigung"}, {v: "600 Gesundheit", c: "unb", q: "nur Mobalytics"}], source: "Truhe in einer Höhle hinter einem Wasserfall auf Samora Island (Mobalytics, geprüft 01.11.2026); das Item steht in den Spieldaten als Special Mount Armor (th.gl)", req: "Mit einem Stoßangriff durch den Wasserfall; ein Bärenreittier", q: "Angriff und Verteidigung laut Mobalytics und th.gl"},
  {name: "Explorer's Breathing Device", kind: "Taucher-Zubehör", slot: {v: "Rucksack", c: "unb", q: "Mobalytics"}, stats: {v: "Mehr maximales Atemvolumen und höheres Schwimmtempo, Zahlen nicht belegt", c: "unb", q: "Mobalytics"}, source: "Blaupause beim Relic-Exchange-Händler Reyard auf Auronui Island für 3 Ancient Relics, danach herstellen (th.gl, GameRant, Mobalytics, geprüft 01.11.2026; den Preis nennt nur th.gl)", req: "Ancient Relics; der Händler erscheint nach der Befreiung von Auronui Island in „Auf in eine größere Welt“"},
  {name: "Propulsion Breathing Device", kind: "Taucher-Zubehör", stats: {v: "Verbesserung des Explorer's Breathing Device: +600 Sekunden Atemvolumen, mehr Schwimmtempo und ein Unterwasser-Antrieb, der bei gehaltener Sprinttaste Ausdauer verbraucht", c: "unb", q: "Mobalytics, einzige Quelle"}, source: "Blaupause beim Relic-Exchange-Händler Sulivan im Demeniss Port für 30 Ancient Relics; hergestellt wird es aus dem Explorer's Breathing Device (th.gl, GameRant, Mobalytics, geprüft 01.11.2026; den Preis nennt nur th.gl)", req: "Ancient Relics und ein Explorer's Breathing Device", q: "Name laut th.gl und GameRant; Mobalytics schreibt Propulsion-Type Breathing Device"},
  {name: "Enhanced Propulsion Breathing Device", kind: "Taucher-Zubehör", stats: {v: "Werte nicht belegt", c: "nb"}, source: "Wird aus dem Propulsion Breathing Device hergestellt (th.gl, geprüft 01.11.2026); Rezept und Blaupause nicht belegt", c: "unb", q: "th.gl Spieldaten, einzige Quelle"},
  {name: "Charter Assistant's Diving Helm und Diving Suit (Blaupausen)", kind: "Taucher-Zubehör", source: "Je eine Blaupause beim Relic-Exchange-Händler Reyard auf Auronui Island für 7 Ancient Relics (th.gl, geprüft 01.11.2026)", stats: {v: "Werte und Material nicht belegt", c: "nb"}, c: "unb", q: "th.gl Spieldaten, einzige Quelle"},
  {name: "A.T.A.G. Marine Exploration Plating, Pack und Feet", kind: "Taucher-Zubehör (A.T.A.G.)", slot: "A.T.A.G.-Rüstung, -Rucksack und -Füße", stats: [{v: "Mit dieser Meereserkundungsausrüstung kann der A.T.A.G. unter Wasser eingesetzt werden und tauchen (Pearl Abyss, Patch-Notes 2.04.00)", c: "ok"}, {v: "je 80 Verteidigung", c: "unb", q: "th.gl Spieldaten"}], source: {v: "Erhalt und Rezept nicht belegt", c: "nb"}, c: "unb", q: "Namen laut th.gl (Spieldaten), Existenz offiziell"},
  {name: "Wagen-Laderäume (Cargo Hold)", kind: "Wagenausrüstung", slot: "Laderaum", stats: "Wandering Merchant's, Meticulous Carpenter's, Seasoned Comrade's, Rugged Traveler's, The Laughing Marionette's, Renowned Magnate's, Elegant Noble's und Noble Delegation's Cargo Hold; alle auch herstellbar", source: "Wagon Workshop in Hernand (Wandering Merchant's, 800 Kupfer), Pailune (Meticulous Carpenter's, 2.500 Kupfer) und Demeniss (The Laughing Marionette's, 4.000 Kupfer); die übrigen nur per Herstellung (th.gl, geprüft 01.11.2026)", req: "Neue Wagenwerkstatt laut Patch-Notes 2.04.00", c: "unb", q: "Namen und Preise laut th.gl Spieldaten; die Wagenausrüstung selbst ist offiziell"},
  {name: "Wagen-Kutschbock (Wagon Seat)", kind: "Wagenausrüstung", slot: "Kutschbock", stats: "Meticulous Carpenter's, The Laughing Marionette's, Seasoned Comrade's, Noble Delegation's, Wandering Merchant's, Renowned Magnate's, Eccentric Doctor's, Eccentric Lord's und Elegant Noble's Wagon Seat; alle auch herstellbar", source: "Wagon Workshop in Hernand (Seasoned Comrade's, 750 Kupfer), Pailune (Meticulous Carpenter's, 2.300 Kupfer) und Demeniss (The Laughing Marionette's, 4.000 Kupfer); die übrigen nur per Herstellung (th.gl, geprüft 01.11.2026)", c: "unb", q: "th.gl Spieldaten, einzige Quelle"},
  {name: "Wagenräder (Wheel)", kind: "Wagenausrüstung", slot: "Räder", stats: "Seasoned Comrade's, Meticulous Carpenter's, The Laughing Marionette's, Renowned Magnate's, Wandering Merchant's, Elegant Noble's und Noble Delegation's Wheel; alle auch herstellbar", source: "Wagon Workshop in Hernand (Seasoned Comrade's, 600 Kupfer), Pailune (Meticulous Carpenter's, 2.000 Kupfer) und Demeniss (The Laughing Marionette's, 3.500 Kupfer); die übrigen nur per Herstellung (th.gl, geprüft 01.11.2026)", c: "unb", q: "th.gl Spieldaten, einzige Quelle"},
  {name: "Wagon Lantern", kind: "Wagenausrüstung", slot: "Wagenlaterne", source: "Nur per Herstellung (th.gl, geprüft 01.11.2026)", stats: {v: "Werte nicht belegt", c: "nb"}, c: "unb", q: "th.gl Spieldaten, einzige Quelle"},
  {name: "Skyway Rocket Pack", kind: "Ausrüstung (Rucksack)", char: "Oongka (laut Itembeschreibung kann ihn kaum ein anderer Graumähne bändigen)", slot: "Rucksack", source: "Belohnung der Quest „Faltering Hands, Iron Will“ in Oongkas Reihe „Forged Resolve“ (th.gl, geprüft 01.11.2026); verbesserte Fassung des Kuku Rocket Pack", stats: {v: "Mehr Schub als der Kuku Rocket Pack, Zahlen nicht belegt", c: "unb", q: "Itembeschreibung laut th.gl"}, c: "unb", q: "th.gl Spieldaten, einzige Quelle"},
  {name: "Pirate Eyepatch", kind: "Ausrüstung (Twitch-Drop)", slot: {v: "Brille (Glasses)", c: "unb", q: "th.gl Spieldaten"}, source: "Twitch-Drop Woche 1 (29.10.2026 22:00 UTC bis 04.11.2026 23:59 UTC) nach 120 Minuten Zuschauzeit, zusammen mit dem Pirate's Sword (Pearl-Abyss-Drops-Seite und Notice 136, geprüft 01.11.2026)", req: "Eine Crimson Desert Edition genügt, der DLC ist nicht nötig; Steam direkt im Spiel, PlayStation, Xbox und Epic per Code", stats: {v: "Werte nicht belegt", c: "nb"}},
  {name: "Pirate Lantern", kind: "Werkzeug (Laterne)", source: "Twitch-Drop Woche 1 nach 60 Minuten Zuschauzeit, zusammen mit Braised Meat x10 (Pearl-Abyss-Drops-Seite und Notice 136, geprüft 01.11.2026)", req: "Eine Crimson Desert Edition genügt, der DLC ist nicht nötig", stats: {v: "Wirkung und Werte nicht belegt", c: "nb"}},
  {name: "Parrot Pirate Hat", kind: "Haustier-Ausrüstung", slot: {v: "Haustier-Kopfschmuck (Pet Helm) für den Pet Parrot", c: "unb", q: "th.gl Spieldaten"}, source: "Twitch-Drop Woche 1 nach 180 Minuten Zuschauzeit, zusammen mit dem Pet Parrot (Pearl-Abyss-Drops-Seite und Notice 136, geprüft 01.11.2026)", req: "Eine Crimson Desert Edition genügt, der DLC ist nicht nötig", stats: {v: "Werte nicht belegt", c: "nb"}},
  {name: "Haustier-Outfits bei Cartaine (Cook's, Worker's, Fishing)", kind: "Haustier-Ausrüstung", char: "Katze (Feline) und Hund (Canine)", stats: "Feline/Canine Cook's Cloth Hat und Outfit, Feline/Canine Worker's Cloth Hat und Outfit, Feline/Canine Fishing Hat und Outfit", source: "Relic-Exchange-Händler Cartaine auf Samora Island: Hut 5, Outfit 9 Ancient Relics (th.gl, geprüft 01.11.2026; dass Cartaine Katzen- und Hunde-Outfits führt, sagen auch GameRant und Mobalytics)", req: "Wird erst angeboten, wenn man ein passendes Haustier hat", c: "unb", q: "Einzelnamen und Preise nur laut th.gl"},
  {name: "Haustier-Outfits bei Evander (Scholastone, Ludeon)", kind: "Haustier-Ausrüstung", char: "Katze (Feline) und Hund (Canine)", stats: "Feline/Canine Scholastone Honorary Scholar Cap und Outfit, Feline/Canine Ludeon Plate Hat und Outfit", source: "Relic-Exchange-Händler Evander auf Satyros Island: Scholastone Cap 5 und Outfit 9, Ludeon Hat 7 und Outfit 12 Ancient Relics (th.gl, geprüft 01.11.2026; Haustierkleidung bei diesem Händler nennen auch GameRant und Mobalytics)", req: "Wird erst angeboten, wenn man ein passendes Haustier hat", c: "unb", q: "Einzelnamen und Preise nur laut th.gl"},
  {name: "Feline und Canine Charter's Diving Helm und Suit", kind: "Haustier-Ausrüstung", char: "Katze (Feline) und Hund (Canine)", source: "Nur per Herstellung (th.gl, geprüft 01.11.2026); Blaupause nicht belegt", stats: {v: "Werte nicht belegt", c: "nb"}, c: "unb", q: "th.gl Spieldaten, einzige Quelle"},
  {name: "Solar Transference", kind: "Abyss-Ausrüstung (vorgesockelt)", slot: "Im Lumen Sword", source: "Im Lumen Sword vorgesockelt (Game8, geprüft 01.11.2026); als Abyss Gear auch in den Spieldaten (th.gl)", stats: {v: "Effekt nicht belegt", c: "nb"}},
  {name: "Ascended Incarnate", kind: "Abyss-Ausrüstung (Questbelohnung)", stats: {v: "Eine Erscheinung von T'rukan führt einen verheerenden Schlag mit Bonusschaden aus", c: "unb", q: "th.gl Spieldaten"}, source: "Boss T'rukan in der Arena im Serpent Marsh, Quest „Teachings to Light the Way“ in Kliffs Reihe „Beyond the Margins“ (Game8, Sportskeeda, th.gl, geprüft 01.11.2026)", req: "Kliffs DLC-Reihe nach der Hauptquest „Ende der Reise“", slot: {v: "nicht belegt", c: "nb"}},
  {name: "Revelation's End", kind: "Abyss-Ausrüstung (Questbelohnung)", stats: {v: "Beschwört einen riesigen, von böser Macht erfüllten Hammer und schmettert ihn auf den Gegner", c: "unb", q: "th.gl Spieldaten"}, source: "Boss Kharzek, Archon of Antumbra, im Silent Burial Ground, Quest „Veil of Darkness“ in Kliffs Reihe „Beyond the Margins“, dazu 1 Abyss Artifact (Game8, Sportskeeda, th.gl, geprüft 01.11.2026)", req: "Kliffs DLC-Reihe nach der Hauptquest „Ende der Reise“", slot: {v: "nicht belegt", c: "nb"}},
  {name: "Ashen Blitz", kind: "Abyss-Ausrüstung (Questbelohnung)", stats: {v: "Entfesselt augenblicklich rohe Kraft und trifft Gegner mit einem verheerenden Schlag", c: "unb", q: "th.gl Spieldaten"}, source: "Quest „Chasing a Shadow“ in Damianes Reihe „From the Ashes“ (Boss Geago the Flamecrazed), dazu 1 Abyss Artifact (Game8, th.gl, geprüft 01.11.2026)", req: "Damianes DLC-Reihe nach der Hauptquest „Ende der Reise“", slot: {v: "nicht belegt", c: "nb"}},
  {name: "Storm's Echo", kind: "Abyss-Ausrüstung (Questbelohnung)", stats: {v: "Beschwört einen durchdringenden Sturmwind, der Gegner wegbläst", c: "unb", q: "th.gl Spieldaten"}, source: "Quest „Twisted Fate“ in Oongkas Reihe „Forged Resolve“ (th.gl, geprüft 01.11.2026); Gear Blueprint auch bei Evander (Relic Exchange, Satyros Island) für 27 Ancient Relics (th.gl)", req: "Oongkas DLC-Reihe nach der Hauptquest „Ende der Reise“", slot: {v: "nicht belegt", c: "nb"}, c: "unb", q: "Name strittig: th.gl Storm's Echo, Game8 Storm Echo"},
  {name: "Radiant Flash", kind: "Abyss-Ausrüstung (Questbelohnung)", stats: {v: "Erzeugt einen grellen Lichtblitz, der Gegner verletzt", c: "unb", q: "th.gl Spieldaten"}, source: "Quest „Unidentified Attack“ in Oongkas Reihe „Forged Resolve“ (th.gl; Game8 nennt Radiant Flash in der Belohnungsliste der Reihe, geprüft 01.11.2026); Gear Blueprint auch bei Evander (Satyros Island) für 27 Ancient Relics (th.gl)", req: "Oongkas DLC-Reihe nach der Hauptquest „Ende der Reise“", slot: {v: "nicht belegt", c: "nb"}},
  {name: "Mirage Cascade", kind: "Abyss-Ausrüstung (Questbelohnung)", stats: {v: "Eine Fata Morgana trifft Gegner auf einer sternförmigen Bahn mit einem unablässigen Hagel von Angriffen", c: "unb", q: "th.gl Spieldaten"}, source: "Quest „A Vengeful Spirit at Sea“ (Reihe Cave of Sorrow), zusammen mit der Naval Officer's Armor (th.gl, geprüft 01.11.2026)", slot: {v: "nicht belegt", c: "nb"}, c: "unb", q: "th.gl Spieldaten, einzige Quelle"},
  {name: "Unfurled Feathers", kind: "Abyss-Ausrüstung (Questbelohnung)", stats: {v: "Verschießt sich teilende Federn, deren Schaden auf nahe Gegner überspringt", c: "unb", q: "th.gl Spieldaten"}, source: "Quest „Unending Hunger“ (Reihe Predator of the Abandoned Island), dazu Abyss Artifact und 5 Ancient Relics (th.gl, geprüft 01.11.2026)", slot: {v: "nicht belegt", c: "nb"}, c: "unb", q: "th.gl Spieldaten, einzige Quelle"},
  {name: "Guardian's Gaze", kind: "Abyss-Ausrüstung (Questbelohnung)", stats: {v: "Feuert einen Wächterstrahl auf Gegner", c: "unb", q: "th.gl Spieldaten"}, source: "Quest „Catastrophe of Ancient Times“ (Reihe Mistbound Sea), dazu Abyss Artifact und 20 Ancient Relics (th.gl, geprüft 01.11.2026)", slot: {v: "nicht belegt", c: "nb"}, c: "unb", q: "th.gl Spieldaten, einzige Quelle"},
  {name: "Trial by Fire", kind: "Abyss-Ausrüstung (Questbelohnung)", stats: {v: "Verschießt zielsuchende Projektile, die jeden getroffenen Gegner verletzen", c: "unb", q: "th.gl Spieldaten"}, source: "Quest „The Seaborne Village“ (Reihe Remote Islands), dazu Abyss Artifact und 5 Ancient Relics (th.gl, geprüft 01.11.2026)", slot: {v: "nicht belegt", c: "nb"}, c: "unb", q: "th.gl Spieldaten, einzige Quelle"},
  {name: "Writhebolt", kind: "Abyss-Ausrüstung (Blaupause)", stats: {v: "Ein Klingenschwung, der allen Gegnern im Umkreis Blitzschaden zufügt", c: "unb", q: "th.gl Spieldaten"}, source: "Gear Blueprint beim Relic-Exchange-Händler Evander auf Satyros Island für 24 Ancient Relics, danach herstellen (th.gl, geprüft 01.11.2026; Abyss-Gear-Blaupausen bei diesem Händler nennen auch GameRant und Mobalytics)", slot: {v: "nicht belegt", c: "nb"}, c: "unb", q: "Name, Effekt und Preis nur laut th.gl"},
  {name: "Power Overload", kind: "Abyss-Ausrüstung (Blaupause)", stats: {v: "Erzeugt ein sich ständig ausdehnendes elektrisches Feld, das Gegner darin verletzt", c: "unb", q: "th.gl Spieldaten"}, source: "Gear Blueprint bei Evander (Relic Exchange, Satyros Island) für 22 Ancient Relics, danach herstellen (th.gl, geprüft 01.11.2026)", slot: {v: "nicht belegt", c: "nb"}, c: "unb", q: "Name, Effekt und Preis nur laut th.gl"},
  {name: "Venomous Fangs", kind: "Abyss-Ausrüstung (Blaupause)", stats: {v: "Setzt einen Giftnebel frei, der Gegner verfolgt und Giftschaden verursacht", c: "unb", q: "th.gl Spieldaten"}, source: "Gear Blueprint bei Evander (Relic Exchange, Satyros Island) für 24 Ancient Relics, danach herstellen (th.gl, geprüft 01.11.2026)", slot: {v: "nicht belegt", c: "nb"}, c: "unb", q: "Name, Effekt und Preis nur laut th.gl"},
  {name: "Rushing Wind", kind: "Abyss-Ausrüstung (Blaupause)", stats: {v: "Feuert eine Windkugel, die Gegner verfolgt und Schaden verursacht", c: "unb", q: "th.gl Spieldaten"}, source: "Gear Blueprint bei Evander (Relic Exchange, Satyros Island) für 22 Ancient Relics, danach herstellen (th.gl, geprüft 01.11.2026)", slot: {v: "nicht belegt", c: "nb"}, c: "unb", q: "Name, Effekt und Preis nur laut th.gl"}
];
// ===== Ende Bereich Orchestrator A =====

// 01.11.2026: Icons für DLC-Tabellen (Schiffsteile, Handelswaren, weitere Ausrüstung) aus den Spieldateien,
// Item-Tabelle -> Icon, KI-Mix 2x. Schiffe und Unterwasser-Reittiere seit 02.11.2026 über ihre Charakterdatensätze (siehe unten).
const DLC_IMGS={
  "Bright Iron Prow Cannon":"cd_assets/dlc/item-1006297.webp",
  "Captain's Bow Cannon":"cd_assets/dlc/item-1006624.webp",
  "Iron Naval Cannon":"cd_assets/dlc/item-1005569.webp",
  "Gilded Naval Cannon":"cd_assets/dlc/item-1005919.webp",
  "Small Tideblessed Sail":"cd_assets/dlc/item-1005572.webp",
  "Medium Tideblessed Sail":"cd_assets/dlc/item-1005576.webp",
  "Large Tideblessed Sail":"cd_assets/dlc/item-1005580.webp",
  "Small Demenissian Sail":"cd_assets/dlc/item-1006753.webp",
  "Medium Demenissian Sail":"cd_assets/dlc/item-1006758.webp",
  "Large Demenissian Sail":"cd_assets/dlc/item-1006774.webp",
  "Small Delesyian Sail":"cd_assets/dlc/item-1006750.webp",
  "Medium Delesyian Sail":"cd_assets/dlc/item-1006759.webp",
  "Large Delesyian Sail":"cd_assets/dlc/item-1006775.webp",
  "Small Tidesworn Sail":"cd_assets/dlc/item-1005573.webp",
  "Medium Tidesworn Sail":"cd_assets/dlc/item-1005577.webp",
  "Large Tidesworn Sail":"cd_assets/dlc/item-1005581.webp",
  "Giant Golden Compass Sail":"cd_assets/dlc/item-1006962.webp",
  "Medium Gentle Wave Figurehead":"cd_assets/dlc/item-1005584.webp",
  "Large Gentle Wave Figurehead":"cd_assets/dlc/item-1006021.webp",
  "Medium Gentle Wave Stern":"cd_assets/dlc/item-1005590.webp",
  "Large Gentle Wave Stern":"cd_assets/dlc/item-1006868.webp",
  "Large Fair Wind Figurehead":"cd_assets/dlc/item-1006022.webp",
  "Large Fair Wind Stern":"cd_assets/dlc/item-1006869.webp",
  "Large Tidewish Sail":"cd_assets/dlc/item-1006764.webp",
  "Medium Fair Wind Figurehead":"cd_assets/dlc/item-1005585.webp",
  "Medium Fair Wind Stern":"cd_assets/dlc/item-1005591.webp",
  "Medium Fair Wind Sail":"cd_assets/dlc/item-1006234.webp",
  "Packaged Red Seaweed Bundle":"cd_assets/dlc/item-1006055.webp",
  "Packaged Kelp Bundle":"cd_assets/dlc/item-1006056.webp",
  "Packaged Special Abalone":"cd_assets/dlc/item-1006057.webp",
  "Packaged Premium Mussels":"cd_assets/dlc/item-1006058.webp",
  "Packaged Premium Sea Pineapples":"cd_assets/dlc/item-1006059.webp",
  "Packaged Premium Scallops":"cd_assets/dlc/item-1006060.webp",
  "Packaged Pearl Remembrance Lamp":"cd_assets/dlc/item-1006243.webp",
  "Packaged Octopus-legged Candlestick":"cd_assets/dlc/item-1006244.webp",
  "Packaged Blue Coral Lamp":"cd_assets/dlc/item-1006245.webp",
  "Bear Dverkhan Armor":"cd_assets/dlc/item-1004428.webp",
  "Explorer's Breathing Device":"cd_assets/dlc/item-1005479.webp",
  "Propulsion Breathing Device":"cd_assets/dlc/item-1005439.webp",
  "Enhanced Propulsion Breathing Device":"cd_assets/dlc/item-1006523.webp",
  "Wagon Lantern":"cd_assets/dlc/item-1005799.webp",
  "Skyway Rocket Pack":"cd_assets/dlc/item-1004823.webp",
  "Pirate Eyepatch":"cd_assets/dlc/item-1005305.webp",
  "Parrot Pirate Hat":"cd_assets/dlc/item-1004909.webp",
  "Solar Transference":"cd_assets/dlc/item-1004203.webp",
  "Ascended Incarnate":"cd_assets/dlc/item-1006123.webp",
  "Revelation's End":"cd_assets/dlc/item-1006110.webp",
  "Ashen Blitz":"cd_assets/dlc/item-1006113.webp",
  "Storm's Echo":"cd_assets/dlc/item-1006125.webp",
  "Radiant Flash":"cd_assets/dlc/item-1006114.webp",
  "Mirage Cascade":"cd_assets/dlc/item-1006122.webp",
  "Unfurled Feathers":"cd_assets/dlc/item-1006120.webp",
  "Guardian's Gaze":"cd_assets/dlc/item-1006121.webp",
  "Trial by Fire":"cd_assets/dlc/item-1006117.webp",
  "Writhebolt":"cd_assets/dlc/item-1006109.webp",
  "Power Overload":"cd_assets/dlc/item-1006115.webp",
  "Venomous Fangs":"cd_assets/dlc/item-1006116.webp",
  "Rushing Wind":"cd_assets/dlc/item-1006119.webp",
  // 02.11.2026: Pirate Lantern (Icon aus dem Itemdatensatz), drei Schiffsteile (Medium-Variante, passend zu den Blaupausen),
  // die ersten 11 Schiffe (Riding_*-Datensätze in characterinfo.dlc_01) und 5 Unterwasser-Reittiere (Porträts der Charakterdatensätze).
  // Sea Turtle: Die Spieldaten führen das Reittier nur allgemein (Actor_Vehicle_Turtle_Hired, Skill_OceanTurtle_Shield), ohne Art.
  // Bild = Porträt der Unechten Karettschildkröte (Animal_Caretta_Wild_32300), optisch abgeglichen mit dem Trailerbild bei game8 (rötliche Flossen).
  "Pirate Lantern":"cd_assets/dlc/item-1005306.webp",
  "Long-Horned Fish Figurehead":"cd_assets/dlc/item-1006685.webp",
  "Long-Horned Fish Stern":"cd_assets/dlc/item-1006687.webp",
  "Chain-Breaking Wolf Figurehead":"cd_assets/dlc/item-1005588.webp",
  "Humble Rowboat":"cd_assets/dlc/ship-humble-rowboat.webp",
  "Small Greymane Ship":"cd_assets/dlc/ship-small-greymane.webp",
  "Small Hernandian Ship":"cd_assets/dlc/ship-small-hernandian.webp",
  "Medium Hernandian Ship":"cd_assets/dlc/ship-medium-hernandian.webp",
  "Large Hernandian Ship":"cd_assets/dlc/ship-large-hernandian.webp",
  "Small Demenissian Ship":"cd_assets/dlc/ship-small-demenissian.webp",
  "Medium Demenissian Ship":"cd_assets/dlc/ship-medium-demenissian.webp",
  "Large Demenissian Ship":"cd_assets/dlc/ship-large-demenissian.webp",
  "Small Delesyian Ship":"cd_assets/dlc/ship-small-delesyian.webp",
  "Medium Delesyian Ship":"cd_assets/dlc/ship-medium-delesyian.webp",
  "Large Delesyian Ship":"cd_assets/dlc/ship-large-delesyian.webp",
  // 02.11.2026 b: die sieben Schiffe ohne Händler (Fahrzeug-Icons aus characterinfo.dlc_01). Large Delesyian Naval Ship: Wissensbild
  // (Knowledge_Riding_Ship_Navy), weil der Datensatz nur auf das generische Icon Big_Ship_01 mit weißen Segeln verweist.
  "Medium Greymane Ship":"cd_assets/dlc/ship-medium-greymane.webp",
  "Large Greymane Ship":"cd_assets/dlc/ship-large-greymane.webp",
  "Phantom Ship":"cd_assets/dlc/ship-phantom.webp",
  "Assault Ship of the East":"cd_assets/dlc/ship-assault-east.webp",
  "Flagship of the East":"cd_assets/dlc/ship-flagship-east.webp",
  "The Drunken Catfish":"cd_assets/dlc/ship-drunken-catfish.webp",
  "Large Delesyian Naval Ship":"cd_assets/dlc/ship-large-delesyian-naval-wissen.webp",
  "Shark":"cd_assets/dlc/mount-shark.webp",
  "Orca":"cd_assets/dlc/mount-orca.webp",
  "Sun Fish":"cd_assets/dlc/mount-sunfish.webp",
  "Electric Ray":"cd_assets/dlc/mount-electric-ray.webp",
  "Golden Shark":"cd_assets/dlc/mount-golden-shark.webp",
  "Sea Turtle":"cd_assets/dlc/mount-sea-turtle.webp"
};
// 02.11.2026 b: Icons der Sammeleinträge in DLC_GEAR_EXTRA, je Eintrag [Itemname, Bild]. Weg: Item-Datensatz (iteminfo) -> Icon-Slot-Hash
// -> PNG, Namen gegen item*.paloc geprüft. Gleiche Bilddatei nur einmal: Das Spiel gibt Feline und Canine bei Cook's, Worker's, Fishing,
// Scholastone und Ludeon dieselbe Icon-Datei. Charter Assistant's: die beiden Produkt-Icons (PetArmor_Diving_Helm/_Armor_Cat), nicht das
// allgemeine Blaupausen-Papier. _dlcImg liefert für diese Namen das erste Bild (Gruppenregel _dlcAllImg).
const DLC_SET_IMGS={
  "Charter Assistant's Diving Helm und Diving Suit (Blaupausen)":[["Charter Assistant's Diving Helm","cd_assets/dlc/item-1005359.webp"],["Charter Assistant's Diving Suit","cd_assets/dlc/item-1005360.webp"]],
  "A.T.A.G. Marine Exploration Plating, Pack und Feet":[["A.T.A.G. Marine Exploration Plating","cd_assets/dlc/item-1005566.webp"],["A.T.A.G. Marine Exploration Pack","cd_assets/dlc/item-1005567.webp"],["A.T.A.G. Marine Exploration Feet","cd_assets/dlc/item-1005568.webp"]],
  "Wagen-Laderäume (Cargo Hold)":[["Wandering Merchant's Cargo Hold","cd_assets/dlc/item-1005776.webp"],["Meticulous Carpenter's Cargo Hold","cd_assets/dlc/item-1005777.webp"],["Seasoned Comrade's Cargo Hold","cd_assets/dlc/item-1005778.webp"],["Rugged Traveler's Cargo Hold","cd_assets/dlc/item-1005779.webp"],["The Laughing Marionette's Cargo Hold","cd_assets/dlc/item-1005780.webp"],["Renowned Magnate's Cargo Hold","cd_assets/dlc/item-1005781.webp"],["Elegant Noble's Cargo Hold","cd_assets/dlc/item-1005782.webp"],["Noble Delegation's Cargo Hold","cd_assets/dlc/item-1005783.webp"]],
  "Wagen-Kutschbock (Wagon Seat)":[["Meticulous Carpenter's Wagon Seat","cd_assets/dlc/item-1005802.webp"],["The Laughing Marionette's Wagon Seat","cd_assets/dlc/item-1005784.webp"],["Seasoned Comrade's Wagon Seat","cd_assets/dlc/item-1005785.webp"],["Noble Delegation's Wagon Seat","cd_assets/dlc/item-1005786.webp"],["Wandering Merchant's Wagon Seat","cd_assets/dlc/item-1005787.webp"],["Renowned Magnate's Wagon Seat","cd_assets/dlc/item-1005788.webp"],["Eccentric Doctor's Wagon Seat","cd_assets/dlc/item-1005789.webp"],["Eccentric Lord's Wagon Seat","cd_assets/dlc/item-1005790.webp"],["Elegant Noble's Wagon Seat","cd_assets/dlc/item-1005791.webp"]],
  "Wagenräder (Wheel)":[["Seasoned Comrade's Wheel","cd_assets/dlc/item-1005792.webp"],["Meticulous Carpenter's Wheel","cd_assets/dlc/item-1005793.webp"],["The Laughing Marionette's Wheel","cd_assets/dlc/item-1005794.webp"],["Renowned Magnate's Wheel","cd_assets/dlc/item-1005795.webp"],["Wandering Merchant's Wheel","cd_assets/dlc/item-1005796.webp"],["Elegant Noble's Wheel","cd_assets/dlc/item-1005797.webp"],["Noble Delegation's Wheel","cd_assets/dlc/item-1005798.webp"]],
  "Haustier-Outfits bei Cartaine (Cook's, Worker's, Fishing)":[["Feline/Canine Cook's Cloth Hat","cd_assets/dlc/item-1004874.webp"],["Feline/Canine Cook's Cloth Outfit","cd_assets/dlc/item-1004875.webp"],["Feline/Canine Worker's Cloth Hat","cd_assets/dlc/item-1005442.webp"],["Feline/Canine Worker's Cloth Outfit","cd_assets/dlc/item-1005443.webp"],["Feline/Canine Fishing Hat","cd_assets/dlc/item-1006524.webp"],["Feline/Canine Fishing Outfit","cd_assets/dlc/item-1006525.webp"]],
  "Haustier-Outfits bei Evander (Scholastone, Ludeon)":[["Feline/Canine Scholastone Honorary Scholar Cap","cd_assets/dlc/item-1004511.webp"],["Feline/Canine Scholastone Honorary Scholar Outfit","cd_assets/dlc/item-1004512.webp"],["Feline/Canine Ludeon Plate Hat","cd_assets/dlc/item-1004876.webp"],["Feline/Canine Ludeon Plate Outfit","cd_assets/dlc/item-1004877.webp"]],
  "Feline und Canine Charter's Diving Helm und Suit":[["Feline Charter's Diving Helm","cd_assets/dlc/item-1005359.webp"],["Feline Charter's Diving Suit","cd_assets/dlc/item-1005360.webp"],["Canine Charter's Diving Helm","cd_assets/dlc/item-1005361.webp"],["Canine Charter's Diving Suit","cd_assets/dlc/item-1005362.webp"]]
};
// 02.11.2026 b: Steckbriefe („Pirate Ship Alert“) der Piratenschiffe, Schlüssel = Schritt in DLC_QUESTS. Weg: knowledgeinfo.dlc_01
// Knowledge_WantedPaper_PirateShip_00xx und missioninfo.dlc_01 Mission_Ocean_Wanted_Normal_Monster_ship_xx -> dasselbe Icon
// ItemIcon_Prefab_CD_T0000_BoardPaper_03xx; flache Plakat-Textur, auf 512 px verkleinert. Zeigt Seekarte, Route und Wappen, kein Schiffsbild.
const DLC_QUEST_IMGS={
  "Pirate Ship: The Siren's Cry":"cd_assets/dlc/pirate-sirens-cry.webp",
  "Pirate Ship: The Black Bloom":"cd_assets/dlc/pirate-black-bloom.webp",
  "Pirate Ship: The Crimson Shield":"cd_assets/dlc/pirate-crimson-shield.webp",
  "Pirate Ship: The Vengeance":"cd_assets/dlc/pirate-vengeance.webp",
  "Pirate Ship: Faunus":"cd_assets/dlc/pirate-faunus.webp",
  "Pirate Ship: The Grim Wind":"cd_assets/dlc/pirate-grim-wind.webp",
  "Pirate Ship: The Scarlet Widow":"cd_assets/dlc/pirate-scarlet-widow.webp",
  "Pirate Ship: The Bloodied Stake":"cd_assets/dlc/pirate-bloodied-stake.webp",
  "Pirate Ship: The Devils' Plunder":"cd_assets/dlc/pirate-devils-plunder.webp",
  "Pirate Ship: The Black Curved Blade":"cd_assets/dlc/pirate-black-curved-blade.webp"
};

// 01.11.2026: Bilder der DLC-Bosse aus den Spieldateien (Wissens- und Questbilder, 512 px). Matthias und Goyen nehmen
// das Bild aus BOSS_IMGS (Feld w). 02.11.2026: Dancing Catfish Crusher, Geago, Scrap Metal Queen und Seeschlangen über die
// Wissenseinträge in knowledgeinfo.dlc_01 ergänzt (die Seeschlange ist im Spiel ein Tier, Animal_SeaKrait, kein Boss-Datensatz).
// Harkan: Datei boss_landspider_scrapqueen_goblin (Pilot der Scrap Metal Queen), Zuordnung über den Dateinamen.
const DLC_BOSS_IMGS={
  "Knight of Void":"cd_assets/dlc/boss-knight-of-void.webp",
  "Satyros":"cd_assets/dlc/boss-satyros.webp",
  "Leviakan":"cd_assets/dlc/boss-leviakan.webp",
  "Reggis the Isleguard":"cd_assets/dlc/boss-reggis.webp",
  "Rohan Cooper":"cd_assets/dlc/boss-rohan-cooper.webp",
  "T'rukan":"cd_assets/dlc/boss-trukan.webp",
  "Kharzek, Archon of Antumbra":"cd_assets/dlc/boss-kharzek.webp",
  "Iron Tyrant Harkan":"cd_assets/dlc/boss-harkan.webp",
  "The Dancing Catfish Crusher":"cd_assets/dlc/boss-catfish-crusher.webp",
  "Geago the Flamecrazed":"cd_assets/dlc/boss-geago.webp",
  "Scrap Metal Queen Stoneback Crab":"cd_assets/dlc/boss-scrap-metal-queen.webp",
  "Sea serpents (Seeschlangen)":"cd_assets/dlc/boss-sea-serpent.webp"
};
