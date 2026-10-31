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

const DLC_META = {
  name: "Charting the Unknown",
  full: "Crimson Desert Enhanced: Charting the Unknown",
  release: "29.10.2026, 22:00 UTC (in Deutschland 23:00 MEZ)",
  patch: "2.04.00",
  hotfixes: "Hotfix zu 2.04.00 sowie 2.04.02 und 2.04.03 (Fehlerbehebungen zu Erschließung, Tauchen, Romanze und Einrichtungen)",
  price: "24,99 € im Steam-Shop (Pearl Abyss nennt selbst keinen Preis)",
  platforms: "Steam (Windows und macOS), PlayStation 5, Xbox Series X|S, Epic Games Store; laut Pearl Abyss auch im Mac App Store, das Spiel-Update 2.04.00 ist dort aber noch in Vorbereitung",
  checked: "31.10.2026",
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
  {name: "Humble Rowboat", price: "2.000 Camp Funds", obtain: "Kauf beim Schiffsverwalter", stats: {v: "100 / 6 / 1 / 1 / 1", c: "unb", q: "Power Up Gaming"}},
  {name: "Small Greymane Ship", price: "kein Kaufpreis", obtain: "Eigenbau: Entsendung „Small Shipbuilding“ in der Quest „A Call from Beyond the Horizon“", stats: {v: "5.100 / 14 / 3 / 1 / 1", c: "unb", q: "Power Up Gaming; in der Quelltabelle fehlt in dieser Zeile ein Wert, die Spaltenzuordnung ist unsicher"}},
  {name: "Small Hernandian Ship", price: "40.000 Camp Funds", obtain: "Kauf beim Schiffsverwalter", stats: {v: "5.000 / 14 / 1 / 1 / 1", c: "unb", q: "Power Up Gaming"}},
  {name: "Medium Hernandian Ship", price: "1.200.000 Camp Funds", obtain: "Kauf beim Schiffsverwalter", stats: {v: "7.500 / 22 / 2 / 1 / 1", c: "unb", q: "Power Up Gaming"}},
  {name: "Large Hernandian Ship", price: "6.000.000 Camp Funds", obtain: "Kauf beim Schiffsverwalter", stats: [{v: "10.000 / 36 / 2 / 2 / 1", c: "unb", q: "Power Up Gaming"}, {v: "laut GameRant in allen Werten und bei den Besatzungsplätzen das beste Schiff", c: "unb", q: "GameRant"}]}
];
const DLC_SHIP_NOTES = [
  {v: "Weitere Schiffsklassen: Demenissian ships und Delesyian ships, kleine Delesyian ships auch in Stoneward Harbor. Einzelnamen und Preise sind nicht belegt.", c: "unb", q: "Game8"},
  {v: "Besatzungsplätze je Schiff sind nicht belegt.", c: "nb"}
];
// C2 Haendler, Waehrung, Folgequest
const DLC_SHIP_FACTS = [
  ["Was sind Schiffe?", "Ein neues Transportmittel. Ein Segelschiff baut man per Schiffsbau-Entsendung selbst oder kauft es bei Schiffsverwaltern; Schiffsausrüstung gibt es bei den Schiffsverwaltern in Demeniss und Delesyia."],
  ["Währung", "Schiffe kosten Camp Funds, nicht Silber oder Kupfer."],
  ["Vellua", "Hopkins im Grace Estate verkauft und repariert Schiffe und holt verlorene Schiffe zurück."],
  ["Demeniss und Delesyia", "Schiffsverwalter im Port of Demeniss und im Port of Delesyia."],
  ["Stoneward Harbor", {v: "Südlich von Dewhaven (Delesyia): kleine Delesyian ships.", c: "unb", q: "Game8"}],
  ["Folgequest", ["„Where the Wind Blows“ setzt das gebaute Small Greymane Ship voraus.", {v: "Sie schaltet den Schiffskauf bei den Schiffsverwaltern frei.", c: "unb", q: "Game8"}]],
  ["Seekampf", "Kanonen feuern nur mit Gunner an Bord; das Schiff hat eine eigene Lebensanzeige."],
  ["Seehandel", ["Mit dem Segelschiff lässt sich Seehandel mit neuen Handelswaren betreiben.", {v: "Namen der Handelswaren", c: "nb"}]],
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
  ["Startort", {v: "Vellua laut Game8, Pailune laut Output Lag. Die Quellen widersprechen sich.", c: "unb", q: "Game8 gegen Output Lag"}],
  ["Kosten und Dauer", {v: "Vier Quellen nennen vier verschiedene Werte; deshalb stehen hier keine Zahlen.", c: "nb"}],
  ["Large Shipbuilding", {v: "2 Tage 10 Std.; 500.000 Camp Funds, 12.000 Camp Wood, 12.000 Camp Stone, 25.000 Camp Provisions; 20 Gefährten (1 mit Engineering); Shiny Ore x100, Malachite x50, Hydrothermal Mineral Deposit x45, Manganese x20. Welches Schiff dabei entsteht, nennt die Quelle nicht.", c: "unb", q: "Game8"}],
  ["Eigenbau oder Kauf", {v: "Der Eigenbau kostet weniger Camp Funds, braucht aber mehr Material und Zeit.", c: "unb", q: "Output Lag"}]
];

// D Schiffsteile. Kauf mit Silver (laut Game8), zuerst braucht man ein Schiff. Eine Quelle: Zeile ist unbestaetigt.
const DLC_SHIP_PARTS = [
  {name: "Bright Iron Prow Cannon", type: "Front Cannon", size: "Large", vendor: "Joaquin, Port Delesyia", price: "30 Silver", bonus: "keine genannt", c: "unb", q: "Game8"},
  {name: "Captain's Bow Cannon", type: "Front Cannon", size: "Large", vendor: "Juan, Demeniss Port", price: "240 Silver", bonus: "keine genannt", c: "unb", q: "Game8"},
  {name: "Iron Naval Cannon", type: "Side Cannon", size: "Large", vendor: "Joaquin, Port Delesyia", price: "30 Silver", bonus: "keine genannt", c: "unb", q: "Game8"},
  {name: "Gilded Naval Cannon", type: "Side Cannon", size: "Large", vendor: "Juan, Demeniss Port", price: "240 Silver", bonus: "keine genannt", c: "unb", q: "Game8"},
  {name: "Small Tideblessed Sail", type: "Sail", size: "Small", vendor: "Juan, Demeniss Port", price: "70 Silver", bonus: "Health +100, Speed +1", c: "unb", q: "Game8"},
  {name: "Medium Tideblessed Sail", type: "Sail", size: "Medium", vendor: "Juan, Demeniss Port", price: "140 Silver", bonus: "Health +100, Speed +1", c: "unb", q: "Game8"},
  {name: "Large Tideblessed Sail", type: "Sail", size: "Large", vendor: "Juan, Demeniss Port", price: "175 Silver", bonus: "Health +100, Speed +1", c: "unb", q: "Game8"},
  {name: "Small Demenissian Sail", type: "Sail", size: "Small", vendor: "Juan, Demeniss Port", price: "110 Silver", bonus: "Health +100, Speed +2", c: "unb", q: "Game8"},
  {name: "Medium Demenissian Sail", type: "Sail", size: "Medium", vendor: "Juan, Demeniss Port", price: "220 Silver", bonus: "Health +100, Speed +2", c: "unb", q: "Game8"},
  {name: "Large Demenissian Sail", type: "Sail", size: "Large", vendor: "Juan, Demeniss Port", price: "275 Silver", bonus: "Health +100, Speed +2", c: "unb", q: "Game8"},
  {name: "Small Delesyian Sail", type: "Sail", size: "Small", vendor: "Joaquin, Port Delesyia", price: "110 Silver", bonus: "Health +100, Speed +2", c: "unb", q: "Game8"},
  {name: "Medium Delesyian Sail", type: "Sail", size: "Medium", vendor: "Joaquin, Port Delesyia", price: "220 Silver", bonus: "Health +100, Speed +2", c: "unb", q: "Game8"},
  {name: "Large Delesyian Sail", type: "Sail", size: "Large", vendor: "Joaquin, Port Delesyia", price: "275 Silver", bonus: "Health +100, Speed +2", c: "unb", q: "Game8"},
  {name: "Small Tidesworn Sail", type: "Sail", size: "Small", vendor: "Joaquin, Port Delesyia", price: "110 Silver", bonus: "Health +100, Speed +2", c: "unb", q: "Game8"},
  {name: "Medium Tidesworn Sail", type: "Sail", size: "Medium", vendor: "Joaquin, Port Delesyia", price: "220 Silver", bonus: "Health +100, Speed +2", c: "unb", q: "Game8"},
  {name: "Large Tidesworn Sail", type: "Sail", size: "Large", vendor: "Joaquin, Port Delesyia", price: "275 Silver", bonus: "Health +100, Speed +2", c: "unb", q: "Game8"},
  {name: "Giant Golden Compass Sail", type: "Sail", size: "Special", vendor: "nur herstellbar: Handbuch aus der Truhe hinter dem Wasserfall in Castaway's Shelter (Ocula Island), dann an einer Werkbank", price: "Material: Natural Pearl x1, Shiny Ore x30, „Giant Hydrothermal Salam“ (so geschrieben, Menge fehlt), Flawless Timber x200, Fleece x90", bonus: "Health +200, Speed +2", c: "unb", q: "Game8; Größe „Special“ bezieht sich auf den Schiffstyp „Special Ship“, Bezug offen"},
  {name: "Medium Gentle Wave Figurehead", type: "Figurehead", size: "Medium", vendor: "Joaquin, Port Delesyia", price: "125 Silver", bonus: "Health +400", c: "unb", q: "Game8"},
  {name: "Large Gentle Wave Figurehead", type: "Figurehead", size: "Large", vendor: "Juan, Demeniss Port", price: "156 Silver", bonus: "Health +400", c: "unb", q: "Game8"},
  {name: "Medium Gentle Wave Stern", type: "Stern", size: "Medium", vendor: "Joaquin, Port Delesyia", price: "140 Silver", bonus: "Health +100, Handling +1", c: "unb", q: "Game8"},
  {name: "Large Gentle Wave Stern", type: "Stern", size: "Large", vendor: "Juan, Demeniss Port", price: "175 Silver", bonus: "Health +100, Handling +1", c: "unb", q: "Game8"},
  {name: "Chain-Breaking Wolf Figurehead", type: "Figurehead", size: {v: "nicht belegt", c: "nb"}, vendor: "Blaupause in einer Truhe der Höhle hinter einem Wasserfall an der Südseite von Samora Island (Eingang per Stoßangriff), dann herstellen", price: {v: "nicht belegt", c: "nb"}, bonus: "Schiffs-Health +1.000", c: "unb", q: "Mobalytics"},
  {name: "Medium Fair Wind Figurehead", type: "Figurehead", size: "Medium", vendor: "Twitch-Drop Woche 2 (nur mit DLC)", price: "Twitch-Drop", bonus: {v: "nicht belegt", c: "nb"}},
  {name: "Medium Fair Wind Stern", type: "Stern", size: "Medium", vendor: "Twitch-Drop Woche 2 (nur mit DLC)", price: "Twitch-Drop", bonus: {v: "nicht belegt", c: "nb"}},
  {name: "Medium Fair Wind Sail", type: "Sail", size: "Medium", vendor: "Twitch-Drop Woche 2 (nur mit DLC)", price: "Twitch-Drop", bonus: {v: "nicht belegt", c: "nb"}}
];
const DLC_PART_NOTES = [
  "Offiziell belegt ist nur, dass Schiffsausrüstung bei den Schiffsverwaltern in Demeniss und Delesyia verkauft wird. Bevor man Teile kaufen kann, braucht man ein Schiff.",
  {v: "Alle Kaufpreise und Boni stammen von einer einzigen Quelle (Game8, Seitenstand 31.10.2026) und sind deshalb unbestätigt. Die Preise sind auffällig gestaffelt (Kanonen gleicher Größe für 30 gegen 240 Silver).", c: "unb", q: "Game8"},
  {v: "Schiffskosmetik (Segel) zusätzlich beim Relic-Händler im Delesyia Port; Namen nicht genannt.", c: "unb", q: "Mobalytics"}
];

// E Inseln (Winding Island bewusst NICHT als Insel: nur aus einem Questnamen bekannt).
const DLC_ISLANDS = [
  {name: "Auronui Island", info: ["Südöstlich von Vellua; die erste unerschlossene Insel der Reihe „A Wider World“.", "Ankerplatz mit Erschließungs-Mission („Footsteps in Unfamiliar Lands“).", "Höhle mit der Forgotten Treasure Map (Quest „Secret of the Winding Island“).", {v: "Relic-Händler Reyard.", c: "unb", q: "GameRant"}]},
  {name: "Samora Island", info: ["Piratenschiff „The Siren's Cry“ (Quest „Outlaws of the Ocean“).", "Fundort des Naval Officer's Hat; Wasserfallhöhlen.", {v: "Relic-Händler Cartaine mit Beruf- und Haustier-Outfits.", c: "unb", q: "GameRant"}]},
  {name: "Ocula Island", info: ["Im südöstlichen Ozean.", {v: "Castaway's Shelter mit dem Handbuch für das Giant Golden Compass Sail; Fundort des Spiral Spear.", c: "unb", q: "Game8, Mobalytics (je ein Detail)"}]},
  {name: "Red Hangs Island", info: ["Nahe der Küste von Delesyia.", {v: "Haigebiet; Fundort des Wailing Sea Greathammer.", c: "unb", q: "Power Up Gaming, Mobalytics (je ein Detail)"}]},
  {name: "Satyros Island", info: ["Relic-Händler mit Abyss-Gear-Blaupausen und Haustierkleidung."]},
  {name: "Navra Island", c: "unb", q: "Mobalytics", info: ["Ostküste: vergrabene Truhe mit dem Silverwave Longsword."]},
  {name: "Cloven Hoof Isle", c: "unb", q: "Mobalytics", info: ["Östlich von Delesyia, zwei Landmassen: vergrabene Truhe mit dem Guardian's Horn."]}
];
const DLC_ISLAND_FACTS = [
  ["Pywels Großer Ozean", "Neue Meeresregion im Süden und Südosten (Great Ocean of Pywel). Offiziell gibt es dort „mehrere noch unerschlossene Inseln“ mit Erschließungs-Missionen; eine Zahl nennt Pearl Abyss nicht."],
  ["Anzahl der Inseln", {v: "17 Inseln laut Game8 (nicht zu verwechseln mit den 17 neuen Wohnsitzen).", c: "unb", q: "Game8"}],
  ["Erschließung", "Insel befreien, dann Graumähnen per Entsendung hinschicken; die Insel erscheint danach im Kartenreiter „Einrichtung“."],
  ["Erschließung im Detail", {v: "3 Deckhands an Bord, Schiff im Kreis der Einrichtung, Auronui dauert 12 Std.; abschließen lässt sich die Mission nur auf der Insel oder dem Schiff, sonst bleibt sie bei 100 % hängen.", c: "unb", q: "Output Lag"}],
  ["Hotfixes", "„Footsteps in Unfamiliar Lands“ lässt sich seit dem Hotfix zu 2.04.00 vom Startort aus beginnen; seit 2.04.02 startet die Erschließungs-Benachrichtigung Missionen direkt aus dem Menü."],
  ["Piraten-Inseln", "Von Piraten gehaltene Inseln bei Delesyia lassen sich befreien und als Stützpunkt beanspruchen."],
  ["Abyss Nexus und Cressets", {v: "Auf jeder Insel ein Abyss Nexus, dazu Abyss Cressets.", c: "unb", q: "Game8"}],
  ["Schatzkarten", "Offiziell „zahlreiche Schatzkarten“; für vergrabene Truhen braucht man eine Schaufel."],
  ["Häfen", ["Vellua (südlich von Hernand), Port of Demeniss, Port of Delesyia.", {v: "Stoneward Harbor.", c: "unb", q: "Game8"}]],
  ["Weitere Orte (keine Inseln)", {v: "Forgotten Ocean Ruins, Great Trench, Great Ocean's Scar Cave, Rocky Reef bzw. Great Rocky Reef, Silent Sea, Sea Serpent Kelp Forest, Hydrothermalquellen. „Winding Island“ kennt man nur aus einem Questnamen, IGN verortet die Quest auf Auronui; hier deshalb nicht als eigene Insel geführt.", c: "unb", q: "je eine Quelle"}]
];

// F Tauchen
const DLC_DIVE = [
  ["Atemanzeige", "Neu ist eine Atemanzeige. Das maximale Atemvolumen bestimmt, wie lange du tauchen kannst."],
  ["Atem erhöhen", "Tauchanzug verfeinern; neue Gerichte regenerieren den Atem kurzzeitig."],
  ["Charter's Helm und Suit", ["Je +120 maximaler Atem (Vorbesteller-Set „Tauchanzug-Set des Entdeckers“).", {v: "Als Zeit: je 2 Minuten, zusammen 4 (Mobalytics, Sportskeeda) gegen „fast 5 Minuten“ (GameRant); in der Tiefe verbraucht man schneller.", c: "unb", q: "Quellen widersprechen sich"}]],
  ["Tauchanzug ohne Vorbestellung", "Bei Relic-Händlern gibt es fertige Teile und Blaupausen."],
  ["A.T.A.G.", ["Neue Meereserkundungsausrüstung lässt den A.T.A.G. tauchen.", {v: "Name und Rezept", c: "nb"}]],
  ["Explorer's Breathing Device", ["Atemgerät beim Relic-Händler.", {v: "GameRant nennt Reyard (Auronui), Mobalytics eine Blaupause auf „Pioneered Island“.", c: "unb", q: "GameRant gegen Mobalytics"}]],
  ["Propulsion Breathing Device", ["Bei Sulivan im Demeniss Port.", {v: "Mobalytics schreibt „Propulsion-Type Breathing Device“.", c: "unb", q: "Name strittig"}]],
  ["Ancient Relics", "Neue Währung aus Wracks, Truhen, Ozean-Bossen und Inselbefreiungen; Anzeige wie Silber oben rechts. In den offiziellen Notes nicht erwähnt."],
  ["Shattered Ancient Relic", {v: "2 Stück ergeben an einer Schmiede 1 Ancient Relic.", c: "unb", q: "Game8"}],
  ["Relic-Händler", ["Sulivan (Demeniss Port).", {v: "Reyard (Auronui), Cartaine (Samora), Rafi (Delesyia Port, Möbel-Blaupausen), ein unbenannter Händler auf Satyros. Freigeschaltet nach „A Wider World“ und der Befreiung von Auronui, am Ankerplatz.", c: "unb", q: "GameRant, Game8"}]],
  ["Unterwasser-Ortung", {v: "Beim Segeln: weiße Impulse, gelb bei Beute, blauer Kreis am Fundort.", c: "unb", q: "Game8"}],
  ["Unterwasserwelt", "Ruinen, Schatztruhen, Kreaturen und Wracks unter Wasser."],
  ["Luftblasen", {v: "Air Pockets in Ruinen und Höhlen füllen den Atem auf.", c: "unb", q: "Output Lag"}],
  ["Gefahren", {v: "Quallen, Wirbel und gesperrte Tiefenzonen mit Countdown.", c: "unb", q: "Output Lag"}],
  ["Karte", "Die Karte zeigt, wo Transportmittel und Haustiere gerufen werden können (Luft, Land, Wasser)."],
  ["Hotfix 2.04.02", "Interaktionen beim Tauchen mit Laterne repariert."]
];

// G Reittiere
const DLC_MOUNTS = [
  {name: "Shark", de: "Hai", how: ["Häufig um die Inseln. Mit Force Palm betäuben, aufsteigen, Zähm-Minispiel wie beim Pferd, dann registrieren. Harpoon Gun und Tauchausrüstung helfen; Füttern zähmt Haie nicht."]},
  {name: "Orca", de: "Orca", how: ["Seltener als Haie, in denselben Gebieten; zähmen wie den Hai (Force Palm)."]},
  {name: "Sea Turtle", de: "Meeresschildkröte", how: ["Als Reittier belegt.", {v: "Zähmmethode", c: "nb"}]},
  {name: "Sun Fish", de: "Mondfisch", how: ["Als Reittier belegt.", {v: "Wird laut Output Lag gefüttert statt bezwungen; Game8 führt die Methode noch als offen.", c: "unb", q: "Output Lag"}]},
  {name: "Electric Ray", de: "Zitterrochen", c: "unb", q: "Game8", how: ["Aufsteigen und mit Fish Fillet füttern, bis das Vertrauen 100 erreicht."]},
  {name: "Golden Shark", de: "Goldener Hai (legendär)", c: "unb", q: "GameRant", how: ["Südlich von Dewhaven, östlich des Sea Serpent Kelp Forest, etwa 220 m tief. Mit Axiom Force auf den Kopf, dann Reit-Minispiel."]}
];
const DLC_MOUNT_FACTS = [
  ["Offiziell", "Verschiedene Unterwassertiere: je nach Art bezwingen oder füttern, um Vertrauen zu gewinnen, dann als Transportmittel registrieren. Eine offizielle Liste gibt es nicht."],
  ["Schiffe und kleine Boote", "Zählen ebenfalls als Transportmittel (Kauf mit Camp Funds, siehe Schiffe)."],
  ["Kartennebel", "Wie weit sich der Kartennebel lichtet, hängt jetzt vom Transportmittel ab."],
  ["Bear Dverkhan Armor", {v: "Reittier-Rüstung für den Bären: 600 Health, 23 ATK, 120 DEF; Truhe hinter einem Wasserfall auf Samora Island (Eingang per Stoßangriff).", c: "unb", q: "Mobalytics"}],
  ["Twitch-Drops Woche 1", "Pet Parrot und Parrot Pirate Hat (180 Min. Zuschauzeit), Pirate Lantern und Braised Meat x10 (60 Min.)."]
];

// H Quests. subs = Unterquests in Reihenfolge laut Game8 (Liste laut Game8 selbst unvollstaendig).
const DLC_QUESTS = [
  {name: "Beyond the Margins", who: "Kliff", start: "Taverne in Pailune City", subs: {v: "A Moment's Respite; Familiar Faces; Teachings to Light the Way; Where Rumors Gather; Witches of the East; Beyond the Sandstorm; The Buried Neighbors; The Lost Child; The Missing Calf; Village in Darkness; Distorted Light; Veil of Darkness; Path of the Mapmaker", c: "unb", q: "Game8"}, rewards: {v: "Greymane Apprentice Combat Armor, Matthias (entsendbarer Gefährte), Ascended Incarnate (Abyss Gear), Glowing Seed x100, Abyss Artifact x1, Revelation's End (Abyss Gear)", c: "unb", q: "Game8"}},
  {name: "From the Ashes", who: "Damiane", start: {v: "Countess Azerian am Osttor von Demeniss", c: "unb", q: "Game8"}, subs: {v: "Reclaimed and Remaining; Demeniss in Upheaval; Countess Azerian's Whereabouts; Judgement of Fire; Schemes; Wavering Sentiment; Chasing a Shadow; Secret Summons; Path of the Politician", c: "unb", q: "Game8 (schreibt „Upheaveal“)"}, rewards: {v: "Abyss Artifact x1, Ashen Blitz (Abyss Gear), Demenissian Council Set", c: "unb", q: "Game8"}, note: {v: "Ob die offizielle Quest „Politiker“ (Voraussetzung der Burg der Flammenritter) „Path of the Politician“ ist, ist offen.", c: "nb"}},
  {name: "Forged Resolve", who: "Oongka", start: {v: "Werkstatt im Graumähnen-Camp, Wynstan", c: "unb", q: "Game8"}, subs: {v: "A New Path; To Scholastone; Unfamiliar Workshop; Faltering Hands, Iron Will; Fractured Door; Fateful Encounter; The Scattered Pieces; Twisted Fate; Path of the Engineer; Unidentified Attack", c: "unb", q: "Game8"}, rewards: {v: "Abyss Artifact x1, Enhanced Fatum Blaster, Storm Echo, Radiant Flash", c: "unb", q: "Game8"}},
  {name: "A Wider World", de: "Auf in eine größere Welt", who: "Graumähnen, Ozean", start: "nach „Heulender Hügel“ und Camp-Ausbau", subs: "A Call from Beyond the Horizon; Where the Wind Blows; A Beginning Beyond the Waves; Footsteps in Unfamiliar Lands; Secret of the Winding Island", rewards: ["Small Greymane Ship (A Call from Beyond the Horizon), Harpoon Gun, Forgotten Treasure Map (Secret of the Winding Island)", {v: "Die Harpoon Gun gibt es laut IGN und Sportskeeda in „Where the Wind Blows“.", c: "unb", q: "IGN, Sportskeeda"}]},
  {name: "Shield of Hernand", who: "Graumähnen", c: "unb", q: "Game8", subs: "Guardian of Peace; Cornerstone of Peace", rewards: "Burg Drachensturz (Schenkung durch Duke Celeste)"},
  {name: "Renewed Vitality", who: "Graumähnen", c: "unb", q: "Game8", subs: "The Stilled Saw; The Saw Turns Again", rewards: "Pacht der Timberham Sawmill"},
  {name: "Garden of Trials", de: "Garten der Prüfungen", who: "Graumähnen", subs: "At the Threshold of a New Ordeal", rewards: "Zugang zum Garten der Prüfungen"},
  {name: "A Memory Beyond Ashes", who: "Fraktion Charting the Unknown", c: "unb", q: "Game8", subs: {v: "nicht belegt", c: "nb"}, rewards: "Schaltet die Burgbau-Entsendung der Burg der Flammenritter frei"},
  {name: "Outlaws of the Ocean", who: "Great Ocean, Samora Island", c: "unb", q: "Game8", subs: "Pirate Ship: The Siren's Cry", rewards: {v: "nicht belegt", c: "nb"}},
  {name: "Tales of the Ocean Residents", who: "Great Ocean", c: "unb", q: "Game8", subs: "Ronnie's Special Bar Snack", rewards: {v: "nicht belegt", c: "nb"}}
];
const DLC_QUEST_NOTES = [
  "Offiziell: je eine eigene Quest für Kliff, Oongka und Damiane nach „Ende der Reise“ im Abenteuertagebuch. Die Namen der drei Reihen nennen die Patch-Notes nicht; sie stammen aus den Guides.",
  {v: "Game8 erklärt die eigene Questliste für unvollständig (Stand 31.10.2026). Eine Journal-Kategorie „Charting the Unknown“ mit 14 Quests nennt nur games.gg.", c: "unb", q: "Game8, games.gg"}
];

// I Bosse. w = Name im Boss-Bestand des Wikis, falls vorhanden.
const DLC_BOSSES = [
  {name: "Knight of Void", where: "Buried Corridor (laut Mobalytics im Trivana Sound): versteckte Höhle hinter einer Illusionswand in der Region Crimson Desert, nördlich des „R“ in „Crimson“ auf der Karte.", drop: "Longsword of the Void (Name strittig); Plate Armor in einer Truhe im Boss-Bereich"},
  {name: "Boss am „waterfall village“", where: "Südliche von zwei eng benachbarten Inseln im äußersten Südwesten des Ozeans; auf der nördlichen Insel ein Knochennest mit einer weiteren Begegnung.", drop: "Satyros Spear, 5 Relics, 1 Abyss Artifact", note: {v: "Name des Bosses", c: "nb"}},
  {name: "Matthias", w: "Matthias", c: "unb", q: "Game8", where: "Pailune Castle, Treppe; Kliffs Quest „Familiar Faces“", drop: "Danach entsendbarer Gefährte", note: {v: "Matthias ist schon Boss im Hauptspiel (Kapitel 2, „For Honor“); ob es eine eigene DLC-Variante oder nur eine erneute Begegnung ist, ist nicht belegt.", c: "nb"}},
  {name: "T'rukan", c: "unb", q: "Game8", where: "Arena im Serpent Marsh; Kliffs Quest „Teachings to Light the Way“", drop: {v: "nicht belegt", c: "nb"}},
  {name: "Kharzek, Archon of Antumbra", c: "unb", q: "Game8", where: "Silent Burial Ground westlich des Sandsturmgebiets; Kliffs Quest „Veil of Darkness“", drop: {v: "nicht belegt", c: "nb"}},
  {name: "Geago the Flamecrazed", c: "unb", q: "Game8", where: "Scorchrock Castle; Damianes Quest „Chasing a Shadow“", drop: "Ashen Blitz"},
  {name: "Goyen", w: "Goyen", c: "unb", q: "Game8", where: "Pailune Castle (Thron), zwei Phasen; Oongkas Quest „Twisted Fate“", drop: {v: "nicht belegt", c: "nb"}, note: {v: "Den Namen gibt es auch als Boss im Hauptspiel; ob es dieselbe Variante ist, ist unklar.", c: "nb"}},
  {name: "Scrap Metal Queen Stoneback Crab", c: "unb", q: "Game8", where: "Bei Yanns verlassenem Wagen nordöstlich der Region Crimson Desert; Oongkas Quest „Unidentified Attack“", drop: {v: "nicht belegt", c: "nb"}},
  {name: "Iron Tyrant Harkan", c: "unb", q: "Game8", where: "Direkt danach, gleiche Quest", drop: {v: "nicht belegt", c: "nb"}},
  {name: "Leviakan", where: "Nur als Name aus Hotfix 2.04.02 („Leviakan would stop moving“) belegt.", drop: {v: "Art, Ort und Bossstatus nicht belegt", c: "nb"}},
  {name: "Sea serpents (Seeschlangen)", where: "Gegnerklasse im Ozean, im Hotfix 2.04.02 erwähnt.", drop: {v: "nicht belegt", c: "nb"}}
];
const DLC_BOSS_NOTES = [
  "Offiziell: „mehrere neue, mächtige Bosse“, gegen einige ist über ein Erinnerungsfragment eine Revanche möglich. Namen nennt Pearl Abyss nicht; hier stehen die Namen, die Guides belegen.",
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
  {g: "Burgen", t: "Burg der Flammenritter (Flame Knight's Castle)", d: ["Selbst gestaltbar; nach Damianes Quest „Politiker“ und der Befreiung des Stützpunkts.", {v: "Liegt in Demeniss; die Befreiung schaltet „A Memory Beyond Ashes“ frei; Burgbau 100.000 Camp Funds, 10.000 Camp Weapons, 40.000 Camp Stone, 40.000 Camp Wood, 10.000 Camp Provisions, 20 Gefährten (1 mit Construction), 15 Spieltage.", c: "unb", q: "Game8 (schreibt „Flame Knights' Castle“)"}]},
  {g: "Burgen", t: "Dritte Burg?", d: {v: "Die Feature-Übersicht spricht von drei Burgen, die Patch-Notes nennen zwei, kein Guide findet eine dritte. Scorchrock Castle ist nur Questort, keine gestaltbare Burg.", c: "nb"}},
  {g: "Wohnen", t: "Freies Bauen", d: "Grundriss selbst entwerfen, Wände und Fenster frei setzen (Dekorieren, Hausgrundriss, Freies Bauen); Voraussetzung siehe Zugang."},
  {g: "Wohnen", t: "17 neue Wohnsitze", d: ["Werden per Entsendung errichtet; der Ehepartner lebt im zugewiesenen Wohnsitz, die Karte zeigt das Symbol des Besitzers.", {v: "Namen und Orte der Wohnsitze", c: "nb"}]},
  {g: "Wohnen", t: "Neue Wohnobjekte", d: "Wege, Bäume, Blumenbeete, Katzenwachtürme, Hundekissen; Katzenwachtürme beim neuen Katzenwachturm-Händler."},
  {g: "Verwaltung", t: "Kartenreiter „Einrichtung“", d: "Befreite Stützpunkte pachten und als Restaurant, Sägewerk, Schmiede oder Schneiderei betreiben. Die Einrichtungen laufen auch weiter, wenn du weit weg bist; gelegentlich kommen besondere Kunden. Graumähnen-Stützpunkte sind auf der Karte jetzt blau."},
  {g: "Verwaltung", t: "Beispiele", d: ["Restaurant in Vellua, Schmiede in der Zargan-Panzerfabrik (Zargan Tankworks), Sägewerk Timberham Sawmill (Hernand).", {v: "Die Pacht des Sägewerks läuft laut Game8 über „Renewed Vitality“ bzw. „The Stilled Saw“.", c: "unb", q: "Game8"}, {v: "Ort der Schneiderei", c: "nb"}]},
  {g: "Verwaltung", t: "Betrieb", d: "Personal mit passenden Fähigkeiten zuweisen, Waren und Preise festlegen, Einrichtungsgegenstände platzieren; ein steigender Recognition Level schaltet Rezepte frei."},
  {g: "Verwaltung", t: "Miete und Ertrag", d: ["Hotfix 2.04.02 korrigierte abnormal steigende Erträge.", {v: "Zahlen zu Miete und Ertrag", c: "nb"}]},
  {g: "Soziales", t: "Romanze und Ehe", d: "Über „Interagieren“ und „Flirten“; bei Vertrauen 100 auf der erweiterten Stufe ist ein Heiratsantrag möglich. Hexen brauchen dafür ihre abgeschlossenen Sanktum-Quests. Der Ehepartner reist mit, schenkt regelmäßig etwas und lässt sich beim Friseur anpassen. Scheidung ist möglich, „hat jedoch seinen Preis“."},
  {g: "Soziales", t: "Kandidaten", d: ["Die Hexen sind als Partnerinnen möglich.", {v: "Namentlich Elowen, Bari, Lyselia und Areciel, nur Kliff kann sie heiraten; weitere NPCs mit Herzsymbol. Flirten unter dem Maximum kostet je 10 Vertrauen; mehrere Romanzen, aber nur eine Ehe; Oongka und Damiane brauchen erst einen Wohnsitz.", c: "unb", q: "Game8"}]},
  {g: "Soziales", t: "Romanze-Hotfixes", d: "2.04.02: Ehepartner folgte ins Wasser und verhielt sich im Kampf abnormal. 2.04.03: keine Geschenke nach der Hochzeit, Mehrfachauswahl bei „Gift“."},
  {g: "Soziales", t: "Fest im Camp", d: "Mission für ein Fest: NPCs mit genug Vertrauen besuchen das Camp, bestimmte Besucher lassen sich als Ehrengraumähnen anheuern."},
  {g: "Soziales", t: "Würfelspiel (Banker's Dice)", d: ["Neues Minispiel in Demeniss und Delesyia.", {v: "Regeln, genaue Orte und Einsätze", c: "nb"}]},
  {g: "Soziales", t: "Legendäre Insekten", d: ["Drei neue legendäre Insekten samt eigenem Insektenlager.", {v: "Namen", c: "nb"}]},
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

// L Was noch offen ist
const DLC_OPEN = [
  "Vollständige Waffen- und Rüstungsliste; Werte der meisten DLC-Waffen, Slots, Charakter-Zuordnung; Werte und Set-Bonus des Void-Sets.",
  "Exakte Ingame-Namen des Void-Sets („of the Void“ bei Mobalytics, „of Void“ bei GameRant; „Helmet“ oder „Helm“).",
  "Angriffswert des Lumen Longsword.",
  "Kosten, Dauer und Startort (Vellua oder Pailune) der Entsendung „Small Shipbuilding“.",
  "Namen und Preise der Demenissian und Delesyian ships, Besatzungsplätze, Kanonenwerte, Teile für kleine Schiffe.",
  "Namen der übrigen Inseln (Game8 nennt 17), Ozean-Ruinen, Lösungen der Schatzkarten, neue Handelswaren und Seerouten.",
  "Verfeinerungsstufen und Materialien des Tauchanzugs, Namen der Atem-Gerichte, Name der A.T.A.G.-Tauchausrüstung.",
  "Zähmmethode von Sea Turtle und Sun Fish, Vertrauensschwellen außer beim Electric Ray.",
  "Inhalte und Belohnungen von „A Beginning Beyond the Waves“, „Footsteps in Unfamiliar Lands“, „Secret of the Winding Island“, „Shield of Hernand“, „Renewed Vitality“, „A Memory Beyond Ashes“ und „Outlaws of the Ocean“.",
  "Rolle von „Leviakan“ (Boss oder Weltgegner, Ort), Name des Roboter-Gegners aus dem Trailer, Name des Bosses im äußersten Südwesten.",
  "Dritte Burg aus der Feature-Übersicht, Ort von Burg Drachensturz, Ort der Schneiderei, Miete und Ertrag der Einrichtungen, die 17 Wohnsitze.",
  "Regeln und Orte des Würfelspiels, die drei legendären Insekten, vollständige Liste der Romanze-Kandidaten.",
  "Kampf-Alltagswerkzeuge (Bratpfanne und Co.): Werte, Fundort, Waffentyp.",
  "Die Twitch-Drops-Eventseite war beim Prüfen nicht abrufbar; die Drop-Namen sind deshalb noch nicht an der offiziellen Seite gegengeprüft."
];

// Quellen (t = Anzeige, url = Link)
const DLC_SOURCES = [
  {t: "Patch-Notes 2.04.00", url: "https://crimsondesert.pearlabyss.com/de-DE/News/Notice/Detail?_boardNo=140"},
  {t: "Feature-Übersicht", url: "https://crimsondesert.pearlabyss.com/de-DE/News/Notice/Detail?_boardNo=137"},
  {t: "Vorbesteller-Bonus", url: "https://crimsondesert.pearlabyss.com/de-DE/News/Notice/Detail?_boardNo=129"},
  {t: "Hotfix zu 2.04.00", url: "https://crimsondesert.pearlabyss.com/en-US/News/Notice/Detail?_boardNo=145"},
  {t: "Hotfix 2.04.02", url: "https://crimsondesert.pearlabyss.com/en-US/News/Notice/Detail?_boardNo=146"},
  {t: "Hotfix 2.04.03", url: "https://crimsondesert.pearlabyss.com/en-US/News/Notice/Detail?_boardNo=147"},
  {t: "Game8 Schiffe", url: "https://game8.co/games/Crimson-Desert/archives/635788"},
  {t: "Game8 Schiffsteile", url: "https://game8.co/games/Crimson-Desert/archives/636449"},
  {t: "Game8 Quests", url: "https://game8.co/games/Crimson-Desert/archives/635794"},
  {t: "Game8 Burgen", url: "https://game8.co/games/Crimson-Desert/archives/635872"},
  {t: "Game8 Reittiere", url: "https://game8.co/games/Crimson-Desert/archives/635858"},
  {t: "GameRant Schiffe", url: "https://gamerant.com/crimson-desert-all-ships-guide-chartering-the-unknown/"},
  {t: "GameRant Garten der Prüfungen", url: "https://gamerant.com/crimson-desert-all-garden-of-trials-bosses-rewards/"},
  {t: "GameRant Ancient Relics", url: "https://gamerant.com/crimson-desert-ancient-relics-guide/"},
  {t: "Power Up Gaming Schiffe", url: "https://powerupgaming.co.uk/2026/10/30/how-to-unlock-upgrade-ships-in-crimson-desert-charting-the-unknown/"},
  {t: "Output Lag Tauchen und Inseln", url: "https://outputlag.com/guides/crimson-desert-diving-underwater-mounts-islands-treasure-charting-the-unknown/"},
  {t: "Output Lag Einrichtungen", url: "https://outputlag.com/guides/crimson-desert-stronghold-facilities-housing-castles-charting-the-unknown/"},
  {t: "Mobalytics Unterwasser", url: "https://mobalytics.gg/gamebase/guides/crimson-desert-underwater-exploration"},
  {t: "Mobalytics versteckte Ausrüstung", url: "https://mobalytics.gg/gamebase/guides/crimson-desert-hidden-weapons-and-gear"},
  {t: "IGN Fraktionsquests", url: "https://www.ign.com/wikis/crimson-desert/Charting_the_Unknown_Faction_Quests"}
];
