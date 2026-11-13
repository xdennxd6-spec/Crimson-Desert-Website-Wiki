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
//
// Ausbau 05.11.2026 (Paket d-dlc-welt): Schrittbeschreibungen und neue Reihen in DLC_QUESTS aus den Missionstexten der Spieldaten
//   (quest.dlc_01), Piratenschiff-Steckbriefe aus item.dlc_01 ("Pirate Ship Alert"), Inselbeschreibungen aus knowledge.dlc_01;
//   DLC_ISLANDS[i].de (deutscher Inselname laut Spieltext); neue Gruppe "Romanze" im Renderer (who beginnt mit "Romanze").

const DLC_META = {
  name: "Charting the Unknown",
  full: "Crimson Desert Enhanced: Charting the Unknown",
  release: "29.10.2026, 22:00 UTC (in Deutschland 23:00 MEZ)",
  patch: "2.04.00",
  hotfixes: "Hotfix zu 2.04.00 sowie 2.04.02 bis 2.04.07 (Fehlerbehebungen, unter anderem zu Erschließung, Tauchen, Romanze und Einrichtungen; 2.04.04 und 2.04.05 am 01.11.2026, 2.04.06 am 04.11.2026, 2.04.07 am 05.11.2026); danach Patch 2.04.08 am 06.11.2026 (Unterwasserhöhlen, Freies Bauen, Antragsquest, Leviakans Schuppe) und Patch 2.05.00 am 13.11.2026 (DLC für Mac, Freies Bauen, Tauchen, Seefahrt, Leviakans Schuppe auf der Insel Bergel, Harpunengewehr beim Händler)",
  price: "24,99 € im Steam-Shop (Pearl Abyss nennt selbst keinen Preis)",
  platforms: "Steam (Windows und macOS), PlayStation 5, Xbox Series X|S, Epic Games Store; auf dem Mac laut Pearl Abyss erst mit Patch 2.05.00 (13.11.2026) hinzugefügt, Kauf über das Menü „DLC kaufen“ auf dem Titelbildschirm; im Mac App Store ist das Spiel-Update 2.05.00 noch in Vorbereitung",
  checked: "13.11.2026",
  // Garten der Pruefungen: hoechstens so viele spielbare Charaktere je Lauf (offiziell, Patch-Notes 2.04.00)
  gardenChars: 3
};

// Zugang Schritt fuer Schritt. d = belegt, u = Zusatz mit eigener Quellenlage.
const DLC_ACCESS = [
  {t: "DLC kaufen und Spiel aktualisieren", d: "Gekauft und geladen wird der DLC über das Menü „DLC kaufen“ im Titelbildschirm. Vorher das Spiel auf die neueste Version bringen (Patch 2.04.00). Steam setzt das Basisspiel Crimson Desert Enhanced voraus."},
  {t: "Ozean und Schiffe", d: "Die Ozean-Quest „Auf in eine größere Welt“ beginnt nach der Hauptquest „Heulender Hügel“ und ausreichendem Ausbau des Graumähnen-Camps. Laut Guides heißt das konkret: die Questreihe „Vereinter Wille“ samt dem späteren „Camperweiterung“ abschließen (nicht die gleichnamige frühere Quest in „Rückkehr der Kameraden“)."},
  {t: "Tauchen", d: "Tauchen geht ohne besondere Voraussetzung, auch an der Küste und in Binnenseen.", u: {v: "Game8 verlangt Kapitel 3, Camp-Ausbau und das Schiff; das gilt nur für die tiefen Tauchplätze im Ozean.", c: "unb", q: "Game8"}},
  {t: "Neue Geschichten für Kliff, Oongka und Damiane", d: "Je eine eigene Questreihe nach der Hauptquest „Ende der Reise“, zu finden im Abenteuertagebuch."},
  {t: "Garten der Prüfungen und Burg Drachensturz", d: "Beides nach der Hauptquest „Ende der Reise“; für die Burg zusätzlich den Stützpunkt befreien."},
  {t: "Freies Bauen", d: "Nach fertigem Camp am Heulenden Hügel und der Graumähnen-Fraktionsquest „Anfrage von Luke“ in „Gründe des Sonnenaufgangs“. Menü: Dekorieren, Hausgrundriss, Freies Bauen."},
  {t: "Einrichtungen verwalten", d: "Region befreien, deren Fraktionsquest abschließen, Camp errichtet. Dann erscheint eine lila Pacht-Meldung; gepachtet wird über Karte, Reiter „Einrichtung“, Lease."}
];
const DLC_WARN = [
  {t: "Nur als Kliff", d: "Graumähnen-Fraktionsquests lassen sich mit Damiane oder Oongka nicht zuverlässig fortsetzen (offiziell bekannter Fehler). Die DLC-Reihe „Auf in eine größere Welt“ daher als Kliff spielen. Die Romanze-Reihen laufen intern ebenfalls als Graumähnen-Fraktionsquests und dürften deshalb genauso betroffen sein (eigener Schluss, nicht getestet)."},
  {t: "Spielstände", d: "Spielstände aus einer Umgebung mit DLC lassen sich ohne DLC weder laden noch per Cross-Save nutzen."}
];

// C1 Schiffe. stats = Health / Inventar / Tempo / Beschleunigung / Handling.
const DLC_SHIPS = [
  {name: "Humble Rowboat", price: ["2.000 Camp-Mittel in Vellua", {v: "6.000 in Steinwacht-Hafen, 8.000 in Delesyia, 10.000 im Hafen von Demeniss", c: "unb", q: "th.gl"}], vendor: "Schiffsverwalter in Vellua, Hafen von Demeniss, Delesyia und Steinwacht-Hafen", obtain: ["Kauf beim Schiffsverwalter", {v: "In den Spieldaten heißt das Boot nur „Fähre“.", c: "unb", q: "th.gl"}], stats: {v: "100 / 6 / 1 / 1 / 1", c: "unb", q: "Power Up Gaming"}},
  {name: "Small Greymane Ship", price: "kein Kaufpreis", vendor: {v: "kein Händler", c: "nb"}, obtain: "Eigenbau: Entsendung „Bau eines kleinen Segelschiffs“ in Vellua, Quest „A Call from Beyond the Horizon“", stats: {v: "5.100 / 14 / 3 / 1 / 1", c: "unb", q: "Power Up Gaming; in der Quelltabelle fehlt in dieser Zeile ein Wert, die Spaltenzuordnung ist unsicher"}},
  {name: "Small Hernandian Ship", price: "40.000 Camp-Mittel", vendor: "Hopkins, Schiffsverwalter in Vellua (Graces Reich)", obtain: "Kauf beim Schiffsverwalter", stats: {v: "5.000 / 14 / 1 / 1 / 1", c: "unb", q: "Power Up Gaming"}},
  {name: "Medium Hernandian Ship", price: "1.200.000 Camp-Mittel", vendor: "Hopkins, Schiffsverwalter in Vellua (Graces Reich)", obtain: "Kauf beim Schiffsverwalter", stats: {v: "7.500 / 22 / 2 / 1 / 1", c: "unb", q: "Power Up Gaming"}},
  {name: "Large Hernandian Ship", price: "6.000.000 Camp-Mittel", vendor: "Hopkins, Schiffsverwalter in Vellua (Graces Reich)", obtain: "Kauf beim Schiffsverwalter", stats: [{v: "10.000 / 36 / 2 / 2 / 1", c: "unb", q: "Power Up Gaming"}, {v: "laut GameRant in allen Werten und bei den Besatzungsplätzen das beste Schiff", c: "unb", q: "GameRant"}]},
  {name: "Small Demenissian Ship", c: "unb", q: "th.gl", price: "40.000 Camp-Mittel", vendor: "Cruise (deutsch „Cruze“), Schiffsverwalter im Hafen von Demeniss", obtain: "Kauf beim Schiffsverwalter", stats: {v: "nicht belegt", c: "nb"}},
  {name: "Medium Demenissian Ship", c: "unb", q: "th.gl", price: "1.200.000 Camp-Mittel", vendor: "Cruise (deutsch „Cruze“), Schiffsverwalter im Hafen von Demeniss", obtain: "Kauf beim Schiffsverwalter", stats: {v: "nicht belegt", c: "nb"}},
  {name: "Large Demenissian Ship", c: "unb", q: "th.gl", price: "6.000.000 Camp-Mittel", vendor: "Cruise (deutsch „Cruze“), Schiffsverwalter im Hafen von Demeniss", obtain: "Kauf beim Schiffsverwalter", stats: {v: "nicht belegt", c: "nb"}},
  {name: "Small Delesyian Ship", price: {v: "40.000 Camp-Mittel", c: "unb", q: "th.gl"}, vendor: "Dwight, Schiffsverwalter in Steinwacht-Hafen (südlich von Tauhafen)", obtain: "Kauf beim Schiffsverwalter", stats: {v: "nicht belegt", c: "nb"}, c: "unb", q: "nur laut th.gl"},
  {name: "Medium Delesyian Ship", c: "unb", q: "th.gl", price: "1.200.000 Camp-Mittel", vendor: "Barrett, Schiffsverwalter in Delesyia", obtain: "Kauf beim Schiffsverwalter", stats: {v: "nicht belegt", c: "nb"}},
  {name: "Large Delesyian Ship", c: "unb", q: "th.gl", price: "6.000.000 Camp-Mittel", vendor: "Barrett, Schiffsverwalter in Delesyia", obtain: "Kauf beim Schiffsverwalter", stats: {v: "nicht belegt", c: "nb"}},
  // 02.11.2026: sieben Schiffe nur aus den Spieldaten (Riding_*-Datensätze in characterinfo.dlc_01), ohne Händler; Erwerb nicht belegt.
  {name: "Medium Greymane Ship", c: "unb", q: "Spieldaten", price: {v: "nicht belegt", c: "nb"}, vendor: {v: "nicht belegt", c: "nb"}, obtain: [{v: "Erwerb nicht belegt. Die Spieldaten kennen die Bau-Entsendungen „Schiffbau“ und „Bau eines großen Segelschiffs“, ohne ein Schiff zu nennen.", c: "nb"}, "Spieltext: Haupttransportschiff der Graumähnen mit viel Laderaum und schwerer Bewaffnung."], stats: {v: "nicht belegt", c: "nb"}},
  {name: "Large Greymane Ship", c: "unb", q: "Spieldaten", price: {v: "nicht belegt", c: "nb"}, vendor: {v: "nicht belegt", c: "nb"}, obtain: [{v: "Erwerb nicht belegt. Die Spieldaten kennen die Bau-Entsendungen „Schiffbau“ und „Bau eines großen Segelschiffs“, ohne ein Schiff zu nennen.", c: "nb"}, "Spieltext: großes Haupttransportschiff der Graumähnen mit sehr viel Laderaum und schwerer Bewaffnung."], stats: {v: "nicht belegt", c: "nb"}},
  {name: "Phantom Ship", c: "unb", q: "Spieldaten, KeenGamer", price: {v: "kein Kaufpreis, nur Eigenbau: 750.000 Camp-Mittel", c: "unb", q: "KeenGamer"}, vendor: {v: "kein Händler, nur Eigenbau nach Bauplan", c: "unb", q: "KeenGamer"}, obtain: [{v: "Das gegnerische Geisterschiff im Gebiet Das Jahr des Schweigens (südöstlich von Delesyia) versenken und die Schatzkarte aus den Trümmern aufnehmen; auf Insel Iliya mit der Schaufel die Truhe mit dem Blauplan: Geisterschiff ausgraben und den Bauplan lesen. Dann erscheint die Entsendung „Bau eines Geisterschiffs“ in Steinwacht-Hafen: 10 Gefährten, 4 Tage 4 Std., 750.000 Camp-Mittel, 45.000 Lagerstein, 45.000 Camp Wood, 90.000 Camp Provisions, Naturperle x5, Haut der Riesen-Qualle x10, Obsidian x30.", c: "unb", q: "KeenGamer"}, "Die Spieldaten kennen den Bauplan als Item „Blauplan: Geisterschiff“ und die Entsendung „Bau eines Geisterschiffs“. Spieltext: legendäres Segelschiff, um das sich Seemannsgarn von Toten rankt."], stats: {v: "nicht belegt", c: "nb"}},
  {name: "Assault Ship of the East", c: "unb", q: "Spieldaten, KeenGamer", price: {v: "kein Kaufpreis, nur Eigenbau: 750.000 Camp-Mittel", c: "unb", q: "KeenGamer"}, vendor: {v: "kein Händler, nur Eigenbau nach Bauplan", c: "unb", q: "KeenGamer"}, obtain: [{v: "Auf Insel Samora im Tempel die Bücher „Auf der Suche nach dem legendären Schiff“ und „Ship of the East“ lesen, dann vier Teile des Bauplan des unbekannten Schiffs sammeln: zwei am Schiffswrack beim Großen Felsgebiet (Strudel nahe dem Gebiet Das Jahr des Schweigens, tauchen), eines in der Bravgork-Werft (Regentenhöhe, im unfertigen Piratenschiff hinter der Treppe) und eines im Strandlager im Südosten von Insel Estra (auf einem Tisch im Zelt). Teile im Inventar mit „Restore“ zusammensetzen und lesen; die Entsendung „Bau eines unbekannten Schiffs“ läuft in Steinwacht-Hafen: 10 Gefährten, 4 Tage 4 Std., 750.000 Camp-Mittel, 45.000 Lagerstein, 45.000 Camp Wood, 90.000 Camp Provisions, Naturperle x5, Haut des riesigen Hydrothermal-Salamanders x10, Ambra x10. Im Inventar heißt das Schiff bis zur Fertigstellung „Mysterious Ship“.", c: "unb", q: "KeenGamer"}, "Die Spieldaten kennen die vier Bauplanteile (Bauplan des unbekannten Schiffs: Teil 1 bis 4) und die Entsendung. Spieltext: legendäres Segelschiff mit eisenbewehrtem Schildkrötenpanzer, das als Einzelkämpfer eine Flotte der Toten versenkte."], stats: {v: "12.000 / nicht genannt / 5 / 4 / 4; Seitenkanonen Drachen-Schiffskanone, Bugkanone Schildkrötenkopf-Bugkanone", c: "unb", q: "KeenGamer"}},
  {name: "Flagship of the East", c: "unb", q: "Spieldaten", price: {v: "nicht belegt", c: "nb"}, vendor: {v: "nicht belegt", c: "nb"}, obtain: [{v: "Die Spieldaten kennen den „Bauplan des unvollendeten Schiffs“ in zwei Teilen (Part 1 und 2), die Missionsziele „Rekonstruiere den Bauplan des unvollendeten Schiffs“ und „Stelle das unvollendete Schiff her“ und die Entsendung „Bau des unvollendeten Schiffs“. Fundorte der Teile, Ort und Kosten der Entsendung sind nicht belegt.", c: "nb"}, "Spieltext: Jians unerfüllter Traum von einem Flaggschiff für Pailune, ausgewogen und ohne Schwäche."], stats: {v: "nicht belegt", c: "nb"}},
  {name: "The Drunken Catfish", c: "unb", q: "Spieldaten", price: {v: "nicht belegt", c: "nb"}, vendor: {v: "nicht belegt", c: "nb"}, obtain: [{v: "Die Spieldaten kennen den Bauplan „Bauplan: Der trunkener Wels“ und die Entsendung „Bau: Trunkener Wels“. Wie man den Bauplan bekommt und was die Entsendung kostet, ist nicht belegt; ob ihn der Kampf gegen das Piratenschiff (Quest „Piratenschiff: Der trunkene Wels“) liefert, ebenfalls nicht.", c: "nb"}, "Spieltext: das Schiff von Welsmensch (Crogg), allein aus Rache entworfen; der Bauplan ist grob über die Schemata eines Kriegsschiffs aus Demeniss gezeichnet."], stats: {v: "nicht belegt", c: "nb"}},
  {name: "Large Delesyian Naval Ship", c: "unb", q: "Spieldaten", price: {v: "nicht belegt", c: "nb"}, vendor: {v: "nicht belegt", c: "nb"}, obtain: [{v: "Erwerb nicht belegt.", c: "nb"}, "Spieltext: großes Segelschiff der Marine der Republik Delesyia, ein Kampfschiff mit mehreren Kanonen, das Wasserwege und Handelsschiffe schützt."], stats: {v: "nicht belegt", c: "nb"}}
];
const DLC_SHIP_NOTES = [
  "Kaufen lassen sich Schiffe erst nach dem eigenen Kleinen Graumähnen-Segelschiff. Jeder Hafen verkauft die Schiffe seiner Region: Hernandian ships in Vellua, Demenissian ships im Hafen von Demeniss, Delesyian ships in Delesyia und das kleine in Steinwacht-Hafen.",
  {v: "Die letzten sieben Schiffskarten (Medium und Großes Graumähnen-Segelschiff, Geisterschiff, Sturmschiff des Ostens, Kommandoschiff des Ostens, Der trunkene Wels und das Marine-Segelschiff von Delesyia (L) der Marine) stehen nur in den Spieldaten, ohne Händler. Vier davon sind laut Spieltext „legendäre“ Schiffe, die man nach Bauplan selbst baut (Geisterschiff, Sturmschiff des Ostens, Kommandoschiff des Ostens, Der trunkene Wels). Für Geisterschiff und Sturmschiff des Ostens liegt je ein Beschaffungsweg einer Quelle vor, für die übrigen fünf ist der Erwerb nicht belegt.", c: "unb", q: "KeenGamer, th.gl, Spieldaten"},
  "Offizielle deutsche Namen laut den Patch-Notizen 2.04.06: Geisterschiff heißt dort „Geisterschiff“, Sturmschiff des Ostens „Sturmschiff des Ostens“ und Der trunkene Wels „trunkener Wels“. Behoben ist seitdem, dass die Drachenpiraten (Kite Pirates) ins Innere des Sturmschiffs des Ostens gelangen konnten, und dass beim Besiegen von Geisterschiff und trunkenem Wels die Belohnungsgüter nun garantiert vergeben werden (die englische Notice formuliert das Gegenteil, maßgeblich ist die deutsche Fassung).",
  {v: "Werte der Demenissian und Delesyian ships und Besatzungsplätze je Schiff", c: "nb"}
];
// C2 Haendler, Waehrung, Folgequest
const DLC_SHIP_FACTS = [
  ["Was sind Schiffe?", "Ein neues Transportmittel. Ein Segelschiff baut man per Schiffsbau-Entsendung selbst oder kauft es bei Schiffsverwaltern; Schiffsausrüstung gibt es bei den Schiffsverwaltern in Demeniss und Delesyia."],
  ["Währung", "Schiffe kosten Camp-Mittel, nicht Silber oder Kupfer."],
  ["Vellua", "Hopkins in Graces Reich verkauft und repariert Schiffe und holt verlorene Schiffe zurück."],
  ["Demeniss und Delesyia", "Schiffsverwalter im Port of Demeniss (Cruise, in der deutschen Fassung Cruze) und im Port of Delesyia (Barrett), daneben je ein Händler für Schiffsausrüstung (Schiffsausrüstungsladen): Juan im Hafen von Demeniss, Joaquin im Hafen Delesyia."],
  ["Steinwacht-Hafen", "Südlich von Tauhafen (Delesyia): ein weiterer Schiffsverwalter (Dwight) mit dem Delesyia-Segelschiff (S) und der Fähre."],
  ["Ab wann kaufen?", ["Erst nach dem eigenen Kleinen Graumähnen-Segelschiff.", {v: "Die Händler verkaufen, sobald in „Auf in eine größere Welt“ die Entsendung zum Bau eines kleinen Segelschiffs in Vellua erledigt ist (th.gl); Game8 nennt dafür die Folgequest „Where the Wind Blows“.", c: "unb", q: "th.gl, Game8"}]],
  ["Seekampf", "Kanonen feuern nur mit Kanonier an Bord; das Schiff hat eine eigene Lebensanzeige."],
  ["Seehandel", ["Mit dem Segelschiff lässt sich Seehandel mit neuen Handelswaren betreiben.", {v: "Auf Insel Xamaca, Insel Satyros und Insel Samora verkauft je ein Insel-Handelsposten verpackte Inselwaren gegen Camp-Mittel (Tabelle unten).", c: "unb", q: "th.gl"}, {v: "Wo und zu welchem Preis man die Waren verkauft", c: "nb"}]],
  ["Wagenwerkstatt", "In Hafengebieten gibt es jetzt eine Wagenwerkstatt."]
];
// C3 Besatzung
const DLC_CREW = [
  {role: "Erster Offizier", d: "Übernimmt das Steuer, wenn es im Kampf unbesetzt ist."},
  {role: "Toppsgast", d: "Stellt die Segel, wenn du das Tempo wechselst."},
  {role: "Ausguck", d: "Markiert Riffe und Fischschwärme auf der Karte."},
  {role: "Zimmermann", d: "Repariert das Schiff; mehr Zimmermann reparieren schneller."},
  {role: "Kanonier", d: "Nötig zum Feuern der Kanonen; jeder weitere Kanonier bedient eine Kanone mehr."},
  {role: "Matrose", d: "Angelt, wenn das Schiff steht; für Erschließungs-Missionen auf Inseln nötig."}
];
const DLC_CREW_NOTES = ["Die Besatzung lässt sich nur im Hafen ändern. Es zählt nur, dass eine Rolle besetzt ist, nicht wer sie besetzt."];
// C4 Schiffsbau per Entsendung
const DLC_SHIPBUILD = [
  ["Bau eines kleinen Segelschiffs", "Die Entsendung ergibt das Kleine Graumähnen-Segelschiff. Nötig ist ein Gefährte mit Engineering."],
  ["Startort", ["Vellua (Game8; die Spieldaten nennen die Entsendung „small shipbuilding mission in Vellua“).", {v: "Output Lag nennt abweichend Pailune.", c: "unb", q: "Output Lag"}]],
  ["Kosten und Dauer", {v: "Vier Quellen nennen vier verschiedene Werte; deshalb stehen hier keine Zahlen.", c: "nb"}],
  ["Bau eines großen Segelschiffs", {v: "2 Tage 10 Std.; 500.000 Camp-Mittel, 12.000 Camp Wood, 12.000 Lagerstein, 25.000 Camp Provisions; 20 Gefährten (1 mit Engineering); Glänzendes Erz x100, Malachit x50, Hydrothermale Erzlagerstätte x45, Mangan x20. Welches Schiff dabei entsteht, nennt die Quelle nicht.", c: "unb", q: "Game8"}],
  ["Schiffbau", {v: "100.000 Camp-Mittel, 2.400 Camp Wood, 2.400 Lagerstein, 5.000 Camp Provisions, 7 Gefährten, Glänzendes Erz x100, Malachit x50; die Dauer nennt die Quelle nicht, ebenso wenig, welches Schiff entsteht.", c: "unb", q: "Game8"}],
  ["Legendäre Schiffe", {v: "Geisterschiff und Sturmschiff des Ostens entstehen nach Bauplan in Steinwacht-Hafen: je 10 Gefährten, 4 Tage 4 Std., 750.000 Camp-Mittel, 45.000 Lagerstein, 45.000 Camp Wood, 90.000 Camp Provisions, 5 Naturperle, dazu je eigene Zutaten (siehe Schiffskarten). Die Entsendungen für Kommandoschiff des Ostens und Der trunkene Wels kennen die Spieldaten, Kosten und Ort sind nicht belegt.", c: "unb", q: "KeenGamer"}],
  ["Eigenbau oder Kauf", {v: "Der Eigenbau kostet weniger Camp-Mittel, braucht aber mehr Material und Zeit.", c: "unb", q: "Output Lag"}],
  ["Ausrüstung ab Werft", {v: "Alle Kaufschiffe und die Graumähne ships tragen ab Werft die Stählerne Schiffskanone und ein Segel ihrer Bauart (z. B. Kleines Hernand-Segel). Das Geisterschiff fährt mit Schiffskanone der dunklen Geister, Schiffskanone der dunklen Geister und Großes Segel des umherirrenden Rachegeists, die beiden Schiffe des Ostens mit der Drachen-Schiffskanone.", c: "unb", q: "th.gl"}]
];

// D Schiffsteile. Kaufpreise doppelt belegt: Game8 in Silver, th.gl in Copper (1 Silver = 100 Copper). Boni nur laut Game8.
const DLC_SHIP_PARTS = [
  {name: "Bright Iron Prow Cannon", type: "Front Cannon", size: "Large", vendor: ["Schiffsausrüstungsladen, Hafen Delesyia", {v: "Joaquin", c: "unb", q: "Game8"}], price: "30 Silber (3.000 Kupfer)", bonus: {v: "keine genannt", c: "unb", q: "Game8"}},
  {name: "Captain's Bow Cannon", type: "Front Cannon", size: "Large", vendor: "Juan, Schiffsausrüstungsladen im Hafen von Demeniss", price: "240 Silber (24.000 Kupfer)", bonus: {v: "keine genannt", c: "unb", q: "Game8"}},
  {name: "Iron Naval Cannon", type: "Side Cannon", size: "Large", vendor: ["Schiffsausrüstungsladen, Hafen Delesyia", {v: "Joaquin", c: "unb", q: "Game8"}], price: "30 Silber (3.000 Kupfer)", bonus: {v: "keine genannt", c: "unb", q: "Game8"}},
  {name: "Gilded Naval Cannon", type: "Side Cannon", size: "Large", vendor: "Juan, Schiffsausrüstungsladen im Hafen von Demeniss", price: "240 Silber (24.000 Kupfer)", bonus: {v: "keine genannt", c: "unb", q: "Game8"}},
  {name: "Small Tideblessed Sail", type: "Sail", size: "Small", vendor: "Juan, Schiffsausrüstungsladen im Hafen von Demeniss", price: "70 Silber (7.000 Kupfer)", bonus: {v: "Health +100, Speed +1", c: "unb", q: "Game8"}},
  {name: "Medium Tideblessed Sail", type: "Sail", size: "Medium", vendor: "Juan, Schiffsausrüstungsladen im Hafen von Demeniss", price: "140 Silber (14.000 Kupfer)", bonus: {v: "Health +100, Speed +1", c: "unb", q: "Game8"}},
  {name: "Large Tideblessed Sail", type: "Sail", size: "Large", vendor: "Juan, Schiffsausrüstungsladen im Hafen von Demeniss", price: "175 Silber (17.500 Kupfer)", bonus: {v: "Health +100, Speed +1", c: "unb", q: "Game8"}},
  {name: "Small Demenissian Sail", type: "Sail", size: "Small", vendor: "Juan, Schiffsausrüstungsladen im Hafen von Demeniss", price: "110 Silber (11.000 Kupfer)", bonus: {v: "Health +100, Speed +2", c: "unb", q: "Game8"}},
  {name: "Medium Demenissian Sail", type: "Sail", size: "Medium", vendor: "Juan, Schiffsausrüstungsladen im Hafen von Demeniss", price: "220 Silber (22.000 Kupfer)", bonus: {v: "Health +100, Speed +2", c: "unb", q: "Game8"}},
  {name: "Large Demenissian Sail", type: "Sail", size: "Large", vendor: "Juan, Schiffsausrüstungsladen im Hafen von Demeniss", price: "275 Silber (27.500 Kupfer)", bonus: {v: "Health +100, Speed +2", c: "unb", q: "Game8"}},
  {name: "Small Delesyian Sail", type: "Sail", size: "Small", vendor: ["Schiffsausrüstungsladen, Hafen Delesyia", {v: "Joaquin", c: "unb", q: "Game8"}], price: "110 Silber (11.000 Kupfer)", bonus: {v: "Health +100, Speed +2", c: "unb", q: "Game8"}},
  {name: "Medium Delesyian Sail", type: "Sail", size: "Medium", vendor: ["Schiffsausrüstungsladen, Hafen Delesyia", {v: "Joaquin", c: "unb", q: "Game8"}], price: "220 Silber (22.000 Kupfer)", bonus: {v: "Health +100, Speed +2", c: "unb", q: "Game8"}},
  {name: "Large Delesyian Sail", type: "Sail", size: "Large", vendor: ["Schiffsausrüstungsladen, Hafen Delesyia", {v: "Joaquin", c: "unb", q: "Game8"}], price: "275 Silber (27.500 Kupfer)", bonus: {v: "Health +100, Speed +2", c: "unb", q: "Game8"}},
  {name: "Small Tidesworn Sail", type: "Sail", size: "Small", vendor: ["Schiffsausrüstungsladen, Hafen Delesyia", {v: "Joaquin", c: "unb", q: "Game8"}], price: "110 Silber (11.000 Kupfer)", bonus: {v: "Health +100, Speed +2", c: "unb", q: "Game8"}},
  {name: "Medium Tidesworn Sail", type: "Sail", size: "Medium", vendor: ["Schiffsausrüstungsladen, Hafen Delesyia", {v: "Joaquin", c: "unb", q: "Game8"}], price: "220 Silber (22.000 Kupfer)", bonus: {v: "Health +100, Speed +2", c: "unb", q: "Game8"}},
  {name: "Large Tidesworn Sail", type: "Sail", size: "Large", vendor: ["Schiffsausrüstungsladen, Hafen Delesyia", {v: "Joaquin", c: "unb", q: "Game8"}], price: "275 Silber (27.500 Kupfer)", bonus: {v: "Health +100, Speed +2", c: "unb", q: "Game8"}},
  {name: "Giant Golden Compass Sail", type: "Sail", size: "Special", vendor: "nur herstellbar: Handbuch aus der Truhe hinter dem Wasserfall in Refugium der Gestrandeten (Insel Ocula), dann an einer Werkbank", price: "Material: Naturperle x1, Glänzendes Erz x30, „Giant Hydrothermal Salam“ (so geschrieben, Menge fehlt), Hervorragendes Holz x200, Wolle x90", bonus: "Health +200, Speed +2", c: "unb", q: "Game8; Größe „Special“ bezieht sich auf den Schiffstyp „Special Ship“, Bezug offen"},
  {name: "Medium Gentle Wave Figurehead", type: "Figurehead", size: "Medium", vendor: ["Schiffsausrüstungsladen, Hafen Delesyia", {v: "Joaquin", c: "unb", q: "Game8"}], price: "125 Silber (12.500 Kupfer)", bonus: {v: "Health +400", c: "unb", q: "Game8"}},
  {name: "Large Gentle Wave Figurehead", type: "Figurehead", size: "Large", vendor: "Juan, Schiffsausrüstungsladen im Hafen von Demeniss", price: "156 Silber (15.600 Kupfer)", bonus: {v: "Health +400", c: "unb", q: "Game8"}},
  {name: "Medium Gentle Wave Stern", type: "Stern", size: "Medium", vendor: ["Schiffsausrüstungsladen, Hafen Delesyia", {v: "Joaquin", c: "unb", q: "Game8"}], price: "140 Silber (14.000 Kupfer)", bonus: {v: "Health +100, Handling +1", c: "unb", q: "Game8"}},
  {name: "Large Gentle Wave Stern", type: "Stern", size: "Large", vendor: "Juan, Schiffsausrüstungsladen im Hafen von Demeniss", price: "175 Silber (17.500 Kupfer)", bonus: {v: "Health +100, Handling +1", c: "unb", q: "Game8"}},
  {name: "Large Fair Wind Figurehead", type: "Figurehead", size: "Large", vendor: "beide Schiffsausrüstungsladen (Hafen von Demeniss und Hafen Delesyia)", price: "250 Silber (25.000 Kupfer)", bonus: {v: "nicht belegt", c: "nb"}, c: "unb", q: "th.gl"},
  {name: "Large Fair Wind Stern", type: "Stern", size: "Large", vendor: "beide Schiffsausrüstungsladen (Hafen von Demeniss und Hafen Delesyia)", price: "275 Silber (27.500 Kupfer)", bonus: {v: "nicht belegt", c: "nb"}, c: "unb", q: "th.gl"},
  {name: "Long-Horned Fish Figurehead", type: "Figurehead", size: {v: "nicht belegt", c: "nb"}, vendor: "Blaupause bei Lafi (Relikt-Austausch, Hafen Delesyia) ab Vertrauen 100, dann herstellen", price: "50 Uralte Relikte (Blaupause)", bonus: {v: "nicht belegt", c: "nb"}, c: "unb", q: "th.gl"},
  {name: "Long-Horned Fish Stern", type: "Stern", size: {v: "nicht belegt", c: "nb"}, vendor: "Blaupause bei Lafi (Relikt-Austausch, Hafen Delesyia) ab Vertrauen 100, dann herstellen", price: "50 Uralte Relikte (Blaupause)", bonus: {v: "nicht belegt", c: "nb"}, c: "unb", q: "th.gl"},
  {name: "Large Tidewish Sail", type: "Sail", size: "Large", vendor: "Blaupause bei Lafi (Relikt-Austausch, Hafen Delesyia), dann herstellen", price: "12 Uralte Relikte (Blaupause)", bonus: {v: "nicht belegt", c: "nb"}, c: "unb", q: "th.gl"},
  {name: "Chain-Breaking Wolf Figurehead", type: "Figurehead", size: {v: "nicht belegt", c: "nb"}, vendor: "Blaupause in einer Truhe der Höhle hinter einem Wasserfall an der Südseite von Insel Samora (Eingang per Stoßangriff), dann herstellen", price: {v: "nicht belegt", c: "nb"}, bonus: "Schiffs-Health +1.000", c: "unb", q: "Mobalytics"},
  {name: "Medium Fair Wind Figurehead", type: "Figurehead", size: "Medium", vendor: "Twitch-Drop Woche 2 (nur mit DLC)", price: "Twitch-Drop", bonus: {v: "nicht belegt", c: "nb"}},
  {name: "Medium Fair Wind Stern", type: "Stern", size: "Medium", vendor: "Twitch-Drop Woche 2 (nur mit DLC)", price: "Twitch-Drop", bonus: {v: "nicht belegt", c: "nb"}},
  {name: "Medium Fair Wind Sail", type: "Sail", size: "Medium", vendor: "Twitch-Drop Woche 2 (nur mit DLC)", price: "Twitch-Drop", bonus: {v: "nicht belegt", c: "nb"}}
];
const DLC_PART_NOTES = [
  "Offiziell belegt ist, dass Schiffsausrüstung bei den Schiffsverwaltern in Demeniss und Delesyia verkauft wird. Bevor man Teile anlegen kann, braucht man ein Schiff. Die Kaufpreise nennen Game8 in Silber und die Spieldaten-Datenbank th.gl in Kupfer übereinstimmend (1 Silber = 100 Kupfer).",
  {v: "Die Boni der Kaufteile nennt nur Game8 (Seitenstand 31.10.2026).", c: "unb", q: "Game8"},
  {v: "Beim Relic-Händler Lafi im Hafen Delesyia gibt es Blaupausen für Schiffsteile (Galionsfigur des Langhorn-Fisches und Stern, Großes Segel des Wogenwunsches).", c: "unb", q: "th.gl"},
  "Die Fair-Wind-Teile in Größe Medium sind Twitch-Drops; die Large-Fassungen von Galionsfigur und Heck verkaufen die Ausrüster."
];

// E Inseln. Namen aus der Regionsliste der MapGenie-Karte und den Spieldaten (th.gl); eine zweite Quelle hebt
// den Namen auf belegt. 17 Inseln = alle Inseln der DLC-Regionsdatei region.dlc_01.paloc. Red Hangs Island steht in der
// Hauptspiel-Datei region.paloc und ist deshalb nur ein Hinweis in DLC_ISLAND_FACTS (Lücken-Audit 03.11.2026).
// Winding Island bewusst NICHT als Insel: nur aus einem Questnamen bekannt. Slugs nicht aendern
// (Abhakliste cd_r2_dlc_inseln haengt daran).
const DLC_ISLANDS = [
  {name: "Auronui Island", de: "Insel Auronui", where: "Südöstlich von Vellua", unlock: "Erste unerschlossene Insel der Reihe „Auf in eine größere Welt“; Erschließungs-Mission „Schritte in unbekannten Ländern“ am Ankerplatz", info: ["Relikt-Händler Reyard (Archäologe, kehrt nach jeder Expedition hierher zurück).", "Höhle mit der Vergessenen Schatzkarte (Quest „Das Geheimnis der gewundenen Insel“).", {v: "Ausgedehnte Korallenriffe.", c: "unb", q: "th.gl"}, "Spieltext: zwei Felsinseln mit dichtem Grün, kleinem Sandstrand und Korallenriffen im klaren, flachen Wasser."]},
  {name: "Samora Island", de: "Insel Samora", where: {v: "Östlich von Delesyia.", c: "unb", q: "KeenGamer"}, info: ["Relikt-Händler Cartaine mit Beruf- und Haustier-Outfits.", "Fundort der Marineoffiziersmütze; Wasserfallhöhlen.", "Von Piratenbanden besetzt (Mission „Piraten, die die Insel besetzen“); nach dem Sieg über Welsmensch ist die Insel befreit (Mission „Die geraubte Reliquie“, Teil von „Die abgelegene Insel“).", "Laut Steckbriefen kreuzen bei der Insel die Piratenschiffe „Der grimmige Wind“ (Flotte aus drei Schiffen) und „Der trunkene Wels“ (Quest „Kopfgeldsteckbriefe: Piratenschiffe auf dem Ozean“). Game8 verortet auch „Der Schrei der Sirene“ hier, der Steckbrief nennt Insel Saeon.", {v: "Insel-Handelsposten (Harris); die Gewässer ringsum sind voller Piraten. Ozeanruinen der Herausforderung „Ozeanruinen“.", c: "unb", q: "th.gl"}, "Spieltext: Die Bewohner hüten seit Generationen das Siegel der riesigen Schlange."]},
  {name: "Satyros Island", de: "Insel Satyros", where: {v: "Laut Mobalytics die südliche von zwei eng benachbarten Inseln im äußersten Südwesten, mit einem Dorf am Wasserfall.", c: "unb", q: "Mobalytics"}, info: ["Relikt-Händler mit Abyss-Gear-Blaupausen und Haustierkleidung.", {v: "Inselboss Satyros, Häuptling der Satyrn (Quest „Häuptling der abgeschiedenen Insel“), mit dem Satyr-Speer als Beute. Der Relikt-Händler heißt Evander; dazu ein Insel-Handelsposten (Killiian) und Ozeanruinen.", c: "unb", q: "th.gl"}, "Die Insel wird von den Satyros beherrscht (Mission „Ein Stamm, der Eindringlinge jagt“). Spieltext: Insel der Verehrer roher Stärke mit dichten Wäldern und Wasserfällen, aber tödlichen Gefahren im rauen Gelände; benannt nach dem Häuptling und stärksten Krieger Satyros."]},
  {name: "Ocula Island", de: "Insel Ocula", where: ["Im südöstlichen Ozean", "Von Insel Samora aus per Boot erreichbar: eine Herausforderung der Spieldaten verlangt die Fahrt in unter 10 Minuten."], info: [{v: "Refugium der Gestrandeten mit dem Handbuch für das Riesige Segel des Goldenen Kompasses; Fundort des Spiralspeers.", c: "unb", q: "Game8, Mobalytics (je ein Detail)"}, "Laut Steckbrief kreuzt bei der Insel die Piratenflotte „Die Teufelsbeute“ (vier Kriegsschiffe).", "Spieltext: Insel mit einem See zwischen schroffen Felskämmen und dichten Wäldern, schmalen weißen Sandstränden und der Stimmung eines verborgenen Rückzugsorts."]},
  {name: "Cloven Hoof Isle", de: "Insel Spalthuf", where: {v: "Östlich von Delesyia, zwei Landmassen", c: "unb", q: "Mobalytics"}, info: [{v: "Treppen hinauf zu den Felsgipfeln, deren Herkunft niemand kennt.", c: "unb", q: "th.gl"}, {v: "Vergrabene Truhe mit dem Horn des Beschützers.", c: "unb", q: "Mobalytics"}, "Spieltext: Die Insel hat die Form eines gespaltenen Hufs; die einzigen menschlichen Spuren sind Trümmer eines angespülten Wracks und eine Treppe zu den Felsgipfeln."]},
  {name: "Navrah Island", de: "Insel Navrah", info: ["Schreibweise nach dem Spieltext und der Karte von MapGenie; Mobalytics schreibt „Navra“.", {v: "Ostküste: vergrabene Truhe mit dem Silberwellen-Langschwert.", c: "unb", q: "Mobalytics"}, "Spieltext: Im Zentrum liegt ein gewaltiges Schiffswrack, ringsum unzählige weitere Wracks; Spuren menschlichen Lebens gibt es nicht, offenbar hat es niemand lebend hierher geschafft."]},
  {name: "Razanui Island", de: "Insel Razanui", info: [{v: "Verlassene Insel des Inselbosses Reggis, Wächter der Insel, eines menschenfressenden Riesen-Imps (Quest „Prädator der verlassenen Insel“); Ozeanruinen.", c: "unb", q: "th.gl"}, "Eine Piratenbande hält die Insel besetzt (Mission „Belagerungsring der Piraten“); im Gebiet liegt das Razanui-Knochennest. Spieltext: Insel mit Knochenbergen, einst Hort berüchtigter Piraten, heute hallt nur das Gebrüll ausgehungerter Monster."]},
  {name: "Bergel Island", de: "Insel Bergel", where: {v: "Südlich von Delesyia; die Route nach Insel Estra führt südöstlich an Bergel vorbei.", c: "unb", q: "KeenGamer"}, info: [{v: "Höhle der Trauer mit dem Boss Rohan Cooper (gleichnamige Quest); Ozeanruinen.", c: "unb", q: "th.gl"}, {v: "Obsidian-Vorkommen zum Abbauen (je 5 Obsidian).", c: "unb", q: "KeenGamer"}, "Spieltext: Schlangenstatuen und ein Altar unbekannter Herkunft zeugen von einer Wacht über ein schlummerndes Unheil; die Anlage wirkt mutwillig zerstört und liegt im dichten Nebel der Insel."]},
  {name: "Iliya Island", de: "Insel Iliya", where: {v: "Südlich von Delesyia: von der South Sea weiter durch die Zentralen Gewässer nach Süden.", c: "unb", q: "KeenGamer"}, info: [{v: "Zwei Ozeanruinen (am felsigen Hügel und an der Klippe).", c: "unb", q: "th.gl"}, {v: "Hier liegt die Truhe mit dem Blauplan: Geisterschiff (Schatzkarte vom versenkten Phantomschiff).", c: "unb", q: "KeenGamer"}, "Spieltext: Insel mit den verwitterten Überresten einer einst gewaltigen Zivilisation."]},
  {name: "Phragma Island", de: "Insel Phragma", info: [{v: "Ozeanruinen.", c: "unb", q: "th.gl"}, "Spieltext: Insel mit drei aufragenden Felsspitzen; bei ruhiger See kann man zwischen den Gipfeln wie über das Wasser gehen."]},
  {name: "Carcano Island", de: "Insel Carcano", info: [{v: "Ozeanruinen.", c: "unb", q: "th.gl"}, "Spieltext: Riffe bilden einen gewaltigen Ring, dessen Form keine Menschenhand schaffen könnte."]},
  {name: "Nirakan Island", de: "Insel Nirakan", info: [{v: "Ozeanruinen.", c: "unb", q: "th.gl"}, "Laut Steckbrief kreuzt bei der Insel die Piratenflotte „Der blutige Pfahl“ (vier Schiffe). Spieltext: Insel in Form eines Haifischzahns, außer angespülten Wracks ohne Spuren von Zivilisation, mit unberührter Natur."]},
  {name: "Xamaca Island", de: "Insel Xamaca", info: [{v: "Abgelegene Insel weit vom Festland mit einem Insel-Handelsposten (Ludic).", c: "unb", q: "th.gl"}, "Spieltext: sanft geschwungene Küsten, die an ein Urlaubsparadies erinnern; die Wracks ringsum zeigen, wie tückisch die Gewässer sind."]},
  {name: "Drangar Island", de: "Insel Drangar", info: ["Laut Steckbrief kreuzt südlich der Insel das Piratenschiff „Die Seeklaue“ (Quest „Kopfgeldsteckbriefe: Piratenschiffe auf dem Ozean“). Spieltext: Felseninsel, aus deren Sandstrand ein gewaltiger Felsenberg einsam aufragt; ein treppenartiges Bauwerk steht dort, doch scheint lange niemand hier gewesen zu sein."]},
  {name: "Estra Island", de: "Insel Estra", where: {v: "Weit im Süden: von Delesyia durch die South Sea, südöstlich an Insel Bergel vorbei und weiter nach Süden; Strandlager im Südosten.", c: "unb", q: "KeenGamer"}, info: [{v: "Im Strandlager liegt auf einem Tisch im Zelt ein Teil des Bauplan des unbekannten Schiffs (Weg zum Sturmschiff des Ostens).", c: "unb", q: "KeenGamer"}, "Laut Steckbrief kreuzt westlich der Insel das Piratenschiff „Die Rache der See“. Spieltext: weitläufige Felsplateaus gehen in eine geschwungene Küstenlinie über, grüne Felskämme prägen eine friedliche Landschaft."]},
  {name: "Saeon Island", de: "Insel Saeon", info: ["Laut Steckbrief kreuzt bei der Insel das Piratenschiff „Der Schrei der Sirene“ (Quest „Kopfgeldsteckbriefe: Piratenschiffe auf dem Ozean“). Spieltext: Insel mit einer riesigen Felsenhöhle; an der Küste stehen grabsteinförmige Felsen mit kreisrunden, auffallend präzisen Löchern, dazu Reste eines alten Schiffbruchs und zwei Skelette."]},
  {name: "Spagnola Island", de: "Insel Spagnola", info: ["Laut Steckbriefen kreuzen bei der Insel die Piratenflotten „Die scharlachrote Witwe“ (nahe) und „Der schwarze Krummsäbel“ (südlich). Spieltext: Insel aus Sand und Fels; mitten im Strand ragen gewaltige Felsen wie ein zerklüfteter Grat auf, der Kontrast aus hellem Sand und dunklem Gestein wirkt bizarr."]}
];
const DLC_ISLAND_FACTS = [
  ["Pywels Großer Ozean", ["Neue Meeresregion im Süden und Südosten (Great Ocean of Pywel) mit den Teilgebieten Ostmeer von Pywel und Südmeer von Pywel.", "Offiziell gibt es dort „mehrere noch unerschlossene Inseln“ mit Erschließungs-Missionen; eine Zahl nennt Pearl Abyss nicht."]],
  ["Anzahl der Inseln", "17 neue Inseln: so viele führt die DLC-Regionsdatei der Spieldaten, Game8 nennt ebenfalls 17 (nicht zu verwechseln mit den 17 neuen Wohnsitzen). Die Karte von MapGenie zählt zusätzlich Insel der roten Hänge mit, die laut Spieldaten zum Hauptspiel gehört."],
  ["Insel der roten Hänge (Hauptspiel)", ["Keine DLC-Insel, liegt aber im Haigebiet nahe der Küste von Delesyia.", {v: "Im Südmeer von Pywel; die Haie halten sich bei den Hydrothermalquellen auf, gut zum Zähmen eines Hais.", c: "unb", q: "Sportskeeda"}, {v: "Fundort des Zweihandhammer der klagenden See.", c: "unb", q: "Mobalytics"}]],
  ["Erschließung", "Insel befreien, dann Graumähnen per Entsendung hinschicken; die Insel erscheint danach im Kartenreiter „Einrichtung“."],
  ["Erschließung im Detail", {v: "3 Matrosen an Bord, Schiff im Kreis der Einrichtung, Auronui dauert 12 Std.; abschließen lässt sich die Mission nur auf der Insel oder dem Schiff, sonst bleibt sie bei 100 % hängen.", c: "unb", q: "Output Lag"}],
  ["Hotfixes", "„Schritte in unbekannten Ländern“ lässt sich seit dem Hotfix zu 2.04.00 vom Startort aus beginnen; seit 2.04.02 startet die Erschließungs-Benachrichtigung Missionen direkt aus dem Menü."],
  ["Piraten-Inseln", ["Von Piraten gehaltene Inseln bei Delesyia lassen sich befreien und als Stützpunkt beanspruchen.", {v: "Dazu gehört die Questreihe „Die abgelegene Insel“: ein von Piraten überranntes Inseldorf befreien und die Bewohner in Sicherheit bringen.", c: "unb", q: "th.gl"}]],
  ["Abyss-Nexus und Cressets", ["Auch im Ozean gibt es Abyss-Nexus zum Schnellreisen und Abyss-Rätsel.", {v: "Auf jeder Insel mindestens ein Abyss-Nexus, dazu Abyss-Grenzsteine.", c: "unb", q: "Game8"}]],
  ["Ozeanruinen", {v: "Herausforderung „Ozeanruinen“ (Knoten der Wellen) mit 9 Ruinen auf Samora, Iliya (zwei), Razanui, Phragma, Bergel, Carcano, Satyros und Insel Nirakan; jede bringt 2 bis 3 Abyss-Artefakte und Uralte Relikte.", c: "unb", q: "th.gl"}],
  ["Schatzkarten", ["Offiziell „zahlreiche Schatzkarten“; für vergrabene Truhen braucht man eine Schaufel.", {v: "Die Vergessene Schatzkarten sind nummeriert (mindestens bis #39). Es gibt sie in Quests, auf den Piratenschiffen von „Kopfgeldsteckbriefe: Piratenschiffe auf dem Ozean“ und bei den Relikt-Händlern, teils erst ab Vertrauen 100.", c: "unb", q: "th.gl"}]],
  ["Häfen", "Vellua (südlich von Hernand), Port of Demeniss, Port of Delesyia und Steinwacht-Hafen (südlich von Tauhafen)."],
  ["Unterwasser-Gebiete", ["Großer Tiefseegraben, Großes Felsgebiet und Felsgebiet, Seetangwald der Seeschlangengewässer, Hydrothermalquellen, Große Korallenregion.", {v: "Weitere Namen der Karte: Seetangwald in der Belcross-See, Zentrale Gewässer, Korallenregion, Korallenriffbeete, Korallenmeer, Meer der toten Korallen, Großes Hydrothermalquellen-Areal, Das Jahr des Schweigens (bei Mobalytics „Silent Sea“), Tiefsee-Ebene, Trench. Dazu Vergessene Ozeanruinen und Höhle der Ozeannarbe.", c: "unb", q: "MapGenie, Mobalytics"}]],
  ["Winding Island", {v: "Kennt man nur aus dem Questnamen „Das Geheimnis der gewundenen Insel“; IGN verortet die Quest auf Auronui. Auf der Karte gibt es keine Insel dieses Namens, hier deshalb nicht als eigene Insel geführt.", c: "unb", q: "IGN, MapGenie"}]
];

// F Tauchen
const DLC_DIVE = [
  ["Atemanzeige", "Neu ist eine Atemanzeige. Das maximale Atemvolumen bestimmt, wie lange du tauchen kannst."],
  ["Atem erhöhen", "Tauchanzug verfeinern; neue Gerichte regenerieren den Atem kurzzeitig."],
  ["Charter's Helm und Suit", ["Je +120 maximaler Atem (Vorbesteller-Set „Tauchanzug-Set des Entdeckers“).", {v: "Als Zeit: je 2 Minuten, zusammen 4 (Mobalytics, Sportskeeda) gegen „fast 5 Minuten“ (GameRant); in der Tiefe verbraucht man schneller.", c: "unb", q: "Quellen widersprechen sich"}]],
  ["Tauchanzug ohne Vorbestellung", ["Bei Relikt-Händlern gibt es fertige Teile und Blaupausen: Sulivan im Hafen von Demeniss verkauft das Marine Charter's Diving Set.", {v: "Sulivan führt die normale und die leichte Fassung (Light) von Helm, Anzug, Handschuhen und Stiefeln für 5 bzw. 7 Uralte Relikte; Reyard auf Auronui verkauft Blaupausen für Tauchhelm für Assistenten des Entdeckers und Suit (je 7).", c: "unb", q: "th.gl"}]],
  ["A.T.A.G.", ["Neue Meereserkundungsausrüstung lässt den A.T.A.G. tauchen.", {v: "Name und Rezept", c: "nb"}]],
  ["Atemgeräte", ["Atemgerät des Entdeckers als Blaupause bei Reyard (Auronui), das stärkere Antriebs-Atemgerät bei Sulivan (Hafen von Demeniss); Wirkung in der Tabelle „Weitere Ausrüstung“.", {v: "Die Blaupausen kosten 3 bzw. 30 Uralte Relikte.", c: "unb", q: "th.gl"}]],
  ["Uralte Relikte", "Neue Währung aus Wracks, Truhen, Ozean-Bossen und Inselbefreiungen; Anzeige wie Silber oben rechts. In den offiziellen Notes nicht erwähnt."],
  ["Zerbrochenes Uraltes Relikt", {v: "2 Stück ergeben an einer Schmiede 1 Uraltes Relikt.", c: "unb", q: "Game8"}],
  ["Relikt-Händler", ["Fünf Relic Exchanges: Reyard (Auronui), Sulivan (Hafen von Demeniss), Lafi (Hafen Delesyia), Cartaine (Samora) und Evander (Insel Satyros); Sortiment in der Tabelle unten.", "Das ist der „Relic Collector“ aus den Patch-Notes 2.04.00: Die Spieldaten führen alle fünf unter der Gruppe „Reliktsammler“ (deutsch „Reliktsammler“); sie tauschen auf Erkundung gefundene Relikte gegen Gegenstände.", {v: "Freigeschaltet nach „Auf in eine größere Welt“ und der Befreiung von Auronui, am Ankerplatz.", c: "unb", q: "Game8"}]],
  ["Unterwasser-Ortung", {v: "Beim Segeln: weiße Impulse, gelb bei Beute, blauer Kreis am Fundort.", c: "unb", q: "Game8"}],
  ["Unterwasserwelt", "Ruinen, Schatztruhen, Kreaturen und Wracks unter Wasser."],
  ["Luftblasen", "Air Pockets in Ruinen und Höhlen füllen den Atem auf."],
  ["Gefahren", ["Quallen, darunter elektrische und giftige Arten. Wer zu tief oder über die Grenze taucht, sieht „Cannot enter this region“ mit Countdown.", {v: "Läuft der Countdown ab, zieht ein Krake den Charakter in einer Zwischensequenz in die Tiefe.", c: "unb", q: "TheGamer"}, {v: "Wirbel.", c: "unb", q: "Output Lag"}]],
  ["Herausforderung „Swimming“", {v: "„Ab in die Tiefsee“ mit 10 Zielen unter Wasser; jedes bringt ein Versiegeltes Abyss-Artefakt und Uralte Relikte.", c: "unb", q: "th.gl"}],
  ["Karte", "Die Karte zeigt, wo Transportmittel und Haustiere gerufen werden können (Luft, Land, Wasser)."],
  ["Hotfix 2.04.02", "Interaktionen beim Tauchen mit Laterne repariert."]
];

// G Reittiere
const DLC_MOUNTS = [
  {name: "Shark", de: "Hai", where: ["Häufig rund um die Inseln, etwa bei Insel der roten Hänge.", {v: "Auch südöstlich vor Delesyia.", c: "unb", q: "Sportskeeda"}], how: ["Mit Kraftfaust betäuben, aufsteigen, Zähm-Minispiel wie beim Pferd, dann registrieren. Harpunengewehr (aus „Wo der Wind weht“) und Tauchausrüstung mitnehmen; Füttern zähmt Haie nicht.", {v: "Mit dem Harpunengewehr nur ermüden, nicht töten; im Minispiel der echten Schwanzflosse folgen, nicht dem Symbol. Sind alle Haie tot, wegreisen und zurückkommen.", c: "unb", q: "Sportskeeda"}]},
  {name: "Orca", de: "Schwertwal", where: "Seltener als Haie, in denselben Gebieten", how: ["Zähmen wie den Hai (Kraftfaust)."]},
  {name: "Sea Turtle", de: "Meeresschildkröte", where: {v: "nicht belegt", c: "nb"}, how: ["Als Reittier belegt.", {v: "Zähmmethode", c: "nb"}]},
  {name: "Sun Fish", de: "Mondfisch", where: {v: "nicht belegt", c: "nb"}, how: ["Als Reittier belegt.", {v: "Wird laut Output Lag gefüttert statt bezwungen; passend dazu verkauft Sulivan das Schriftstück „Nahrung und Vorlieben des Mondfischs“. Welches Futter, ist nicht belegt.", c: "unb", q: "Output Lag, th.gl"}]},
  {name: "Electric Ray", de: "Schläferrochen", c: "unb", q: "Game8", where: {v: "nicht belegt", c: "nb"}, how: ["Aufsteigen und mit Fischfilet füttern, bis das Vertrauen 100 erreicht."]},
  {name: "Golden Shark", de: "Goldhai (legendär)", where: [{v: "Südlich von Tauhafen, östlich des Seetangwalds der Seeschlangengewässer, etwa 220 m tief.", c: "unb", q: "GameRant"}], how: ["Legendäres Meerestier in den tiefen Gewässern des Ozeans.", {v: "Mit Macht des Axioms auf den Kopf, dann Reit-Minispiel.", c: "unb", q: "GameRant"}]},
  {name: "Pink Manta Ray", de: "Rosa Mantarochen", c: "unb", q: "Spieldaten, Game8", where: [{v: "Nördlich des Meeres der toten Korallen an einer unentdeckten Landmarke, die man zuerst entdecken muss.", c: "unb", q: "Game8"}, "Spieltext: Das Wesen soll in den tiefen Gewässern des großen Ozeans erscheinen."], how: ["Die Spieldaten kennen die Aufgabe „Zähme den rosa Mantarochen“ und beschreiben ein Wesen, das über die Schwingungen des Herzens eine Bindung zu Menschen aufbauen soll, verirrten Schiffen mit seinen gewaltigen rosafarbenen Flügeln den Weg weist und nur auf den Ruf reiner Seelen reagiert.", {v: "Zähmmethode", c: "nb"}]},
  {name: "Pink Dolphin", de: "Rosa Delfin (legendär)", c: "unb", q: "GameRant, Xbox Play, GamerHour", where: [{v: "Große Korallenregion ganz im Südwesten, in einer Delfin-Gruppe in etwa 60 m Tiefe.", c: "unb", q: "GameRant, Xbox Play"}, {v: "Östlich der Insel Rosenui, meist zwischen 18:00 und 6:00 Uhr Spielzeit. Eine Insel dieses Namens kennen die Spieldaten nicht (nur Razanui und Auronui).", c: "unb", q: "GamerHour"}], how: ["Aufsteigen und mit 3 Fischfilets füttern, bis das Vertrauen voll ist. Taucheranzug und Harpunengewehr gegen Haie mitnehmen, der Delfin kämpft nicht selbst.", {v: "Fähigkeit: Unter-Wasser-Ortung (LB + RB bzw. L2 + R2) für versteckte Beute und Truhen.", c: "unb", q: "Xbox Play"}]},
  {name: "Ocean Drifter", de: "Ozeangleiter", c: "unb", q: "Spieldaten, Game8", where: [{v: "In einer Schatztruhe in den Vergessenen Ozeanruinen bei Insel Razanui; darin liegt das Item Uralte Lagerkiste.", c: "unb", q: "Game8"}], how: ["Wird nicht gezähmt: Das Item Uralte Lagerkiste erweckt laut Itemtext den schlafenden Ozeangleiter, mit dem man sich frei und schnell unter der Wasseroberfläche bewegt. Game8 führt ihn unter den Reittieren."]}
];
const DLC_MOUNT_FACTS = [
  ["Offiziell", "Verschiedene Unterwassertiere: je nach Art bezwingen oder füttern, um Vertrauen zu gewinnen, dann als Transportmittel registrieren. Eine offizielle Liste gibt es nicht."],
  ["Schiffe und kleine Boote", "Zählen ebenfalls als Transportmittel (Kauf mit Camp-Mittel, siehe Schiffe)."],
  ["Kartennebel", "Wie weit sich der Kartennebel lichtet, hängt jetzt vom Transportmittel ab."],
  ["Hai im Einsatz", {v: "Haie schwimmen unter Wasser sehr schnell, beißen andere Fische, und die Beute lässt sich direkt vom Rücken einsammeln.", c: "unb", q: "Sportskeeda"}],
  ["Twitch-Drops Woche 1", "Pet Parrot (180 Min. Zuschauzeit) und Gedünstetes Fleisch x10 (60 Min.); Papageien-Piratenhut und Piratenlaterne stehen in der Tabelle „Weitere Ausrüstung“. Bei Abholproblemen bleiben die Belohnungen von Woche 1 bis 11.11.2026, 23:59 UTC erhältlich."],
  ["Reittier-Ausrüstung", "Ausrüstung für Transportmittel und Haustiere (z. B. die Dverkhan-Rüstung für Bären) steht im Abschnitt „Neue DLC-Ausrüstung“."]
];

// H Quests. subs = Unterquests in Reihenfolge laut Game8. steps = dieselben Schritte mit Belohnung; Belohnungen je Schritt
// nennen Game8 und die Spieldaten-Datenbank th.gl (th.gl fuehrt nur Schritte mit Belohnung). Schritt ohne c = in beiden.
const DLC_QUESTS = [
  {name: "Beyond the Margins", who: "Kliff", start: "Taverne in Pailune City", req: "Hauptquest „Ende der Reise“", subs: {v: "A Moment's Respite; Familiar Faces; Teachings to Light the Way; Where Rumors Gather; Witches of the East; Beyond the Sandstorm; The Buried Neighbors; The Lost Child; The Missing Calf; Village in Darkness; Distorted Light; Veil of Darkness; Path of the Mapmaker", c: "unb", q: "Game8"}, steps: [
    {name: "A Moment's Respite", d: "Nach der Tragödie herrscht in Pailune wieder strahlender Frieden; der Weg führt dorthin.", c: "unb", q: "Game8; Beschreibung aus den Spieldaten"},
    {name: "Familiar Faces", d: ["In Pailune regt sich eine seltsame Energie; zuerst die Gefährten ansprechen.", {v: "Kampf gegen Matthias auf der Treppe von Schloss Pailune.", c: "unb", q: "Game8"}], reward: "Kamfprüstung des Graumähnenanwärters"},
    {name: "Teachings to Light the Way", d: ["T'rukan terrorisiert die Menschen erneut; dem Ruf des Abts folgen und zum Jijeong-Tempel gehen.", {v: "Kampf gegen T'rukan in der Arena im Schlangenmoor.", c: "unb", q: "Game8"}], reward: "Manifestation des Ultimativen (Abyss-Ausrüstung)"},
    {name: "Where Rumors Gather", d: "Um die unbekannte Dunkelheit zu ergründen, geht es an den Ort, an dem sich die seltsamen Gerüchte sammeln.", c: "unb", q: "Game8; Beschreibung aus den Spieldaten"},
    {name: "Witches of the East", d: "Am Rand der Wüste den Spuren kostbarer Bande folgen, die schicksalhaft wieder zusammenfinden.", reward: "Glänzender Samen x100"},
    {name: "Beyond the Sandstorm", d: "Mit Hilfe der Hexen des Ostens ist das verborgene Land hinter der Sandsturmbarriere erreicht; im Licht der Marker Stones den Weg durch die Wüste finden, Probleme lösen und die Quelle der dunklen Macht aufspüren.", c: "unb", q: "Game8; Beschreibung aus den Spieldaten"},
    {name: "The Buried Neighbors", d: "Bewohner, die in der Dunkelheit stöhnen, aufsuchen und anhören, was geschehen ist.", reward: {v: "Erkundungsbericht über Maddin, Erkundungsbericht über Lukumiya", c: "unb", q: "th.gl"}},
    {name: "The Lost Child", d: "Am Wüstenrand ein leises Schluchzen im Sandsturm hören und ihm folgen.", reward: {v: "Erkundungsbericht über Faraj", c: "unb", q: "th.gl"}},
    {name: "The Missing Calf", d: "Ein fassungsloser Bewohner steht nach einem heftigen Sandsturm in der Wüste; seine Not anhören.", reward: {v: "Erkundungsbericht über Hazran", c: "unb", q: "th.gl"}},
    {name: "Village in Darkness", d: "Antumbra-Priester haben das Dorf Yasmin besetzt.", reward: {v: "Erkundungsbericht über das Dorf Yasmin", c: "unb", q: "th.gl"}},
    {name: "Distorted Light", d: "Ein Marker Stone, der Reisende im Sandsturm führen soll, ist korrumpiert und strahlt in die falsche Richtung; den Stein läutern.", reward: {v: "Erkundungsbericht über die Trümmer des Paradieses", c: "unb", q: "th.gl"}},
    {name: "Veil of Darkness", d: ["Verschobene Marker Stones weisen auf einen Ort, der nicht auf der Karte steht; mit Sebastians Hinweisen herausfinden, was Antumbra verbirgt.", {v: "Kampf gegen Kharzek im Silent Burial Ground westlich des Sandsturmgebiets.", c: "unb", q: "Game8"}], reward: ["Vollstrecker der Enthüllung (Abyss-Ausrüstung), Abyss-Artefakt", {v: "dazu Erkundungsbericht über die Grabstätte des Schweigens", c: "unb", q: "th.gl"}]},
    {name: "Path of the Mapmaker", d: "Nach dem Sieg über Kharzek ist die Vermessung der letzten unerforschten Gebiete abgeschlossen; zu Sebastian zurück, um die Wüstenkarte zu vervollständigen.", c: "unb", q: "Game8; Beschreibung aus den Spieldaten"}
  ], rewards: ["Kamfprüstung des Graumähnenanwärters, Manifestation des Ultimativen, Glänzender Samen x100, Vollstrecker der Enthüllung, Abyss-Artefakt, dazu Survey Records der durchreisten Orte", {v: "Matthias als entsendbarer Gefährte.", c: "unb", q: "Game8"}]},
  {name: "From the Ashes", who: "Damiane", start: {v: "Countess Azerian am Osttor von Demeniss", c: "unb", q: "Game8"}, req: "Hauptquest „Ende der Reise“", subs: {v: "Das Wiedergewonnene und das Verbliebene; Demeniss in Aufruhr; Azerians Verbleib; Flammen; Schemes; Wankende Gunst des Volkes; Einen Schatten werfen; Ein heimlicher Ruf; Der Pfad des Politikers", c: "unb", q: "Game8 (schreibt „Upheaveal“)"}, steps: [
    {name: "Reclaimed and Remaining", d: "Durch die Straßen von Demeniss gehen, in denen die unterschiedlichsten Stimmen widerhallen.", c: "unb", q: "Game8; Beschreibung aus den Spieldaten"},
    {name: "Demeniss in Upheaval", d: "Countess Azerian um Rat bitten, wie es mit Demeniss besser weitergehen kann.", c: "unb", q: "Game8 (schreibt „Upheaveal“); Beschreibung aus den Spieldaten"},
    {name: "Countess Azerian's Whereabouts", d: "Azerian hat das Anwesen verlassen und ist nicht zurückgekehrt; ihrer Spur folgen.", c: "unb", q: "Game8; Beschreibung aus den Spieldaten"},
    {name: "Judgment of Fire", d: "Im Vorratslager von Demeniss gibt es Ärger; zur Brandstelle gehen. Die Entführung von Azerian und die Explosion sind der Auftakt einer großen Verschwörung.", c: "unb", q: "Game8 schreibt „Judgement“; Beschreibung aus den Spieldaten"},
    {name: "Schemes", d: "Den hinterlassenen Hinweisen zu Azerians Verbleib nachgehen.", reward: {v: "Geheimbefehl, Sabotageplan für das Treffen (Schriftstücke)", c: "unb", q: "th.gl"}},
    {name: "Wavering Sentiment", d: "Durch das vom Chaos gezeichnete Demeniss gehen und die Stimmen der Bürger anhören.", c: "unb", q: "Game8; Beschreibung aus den Spieldaten"},
    {name: "Chasing a Shadow", d: ["Die Fluchtroute der Entführer verfolgen, um Countess Azerians Aufenthaltsort zu finden.", {v: "Kampf gegen Pyromane Geago in der Burg Schmorstein.", c: "unb", q: "Game8"}], reward: "Aschener Blitz (Abyss-Ausrüstung), Abyss-Artefakt"},
    {name: "Secret Summons", d: "Falsche Gerüchte verbreiten sich weiter und die öffentliche Meinung kippt; zum Azerian-Anwesen zurückkehren und die Gedanken ordnen.", reward: ["Demenissian Council Set", {v: "einzeln: Robes, Umhang, Boots, Handschuhe, dazu das Schriftstück Königliches Dekret des Hauses Thorel", c: "unb", q: "th.gl"}]},
    {name: "Path of the Politician", d: "Auf der Rednertribüne am Platz King Thorels letzten Willen der Stadt verkünden.", c: "unb", q: "Game8; Beschreibung aus den Spieldaten"}
  ], rewards: "Aschener Blitz, Abyss-Artefakt, Demenissian Council Set", note: {v: "Ob die offizielle Quest „Politiker“ (Voraussetzung der Burg der Flammenritter) „Der Pfad des Politikers“ ist, ist offen.", c: "nb"}},
  {name: "Forged Resolve", who: "Oongka", start: {v: "Werkstatt im Graumähnen-Camp, Wynstan", c: "unb", q: "Game8"}, req: "Hauptquest „Ende der Reise“", subs: {v: "Ein neuer Weg; Nach Scholastein; Fremde Werkstatt; Ungeschickte Hände, fester Wille; Die rissige Tür; Schicksalhafte Begegnung; Verstreute Fragmente; Verdrehtes Schicksal; Der Weg des Ingenieurs; Ein mysteriöser Angriff", c: "unb", q: "Game8"}, steps: [
    {name: "A New Path", d: "Tiefe innere Unruhe: die eigene Lage überdenken und prüfen, was fehlt.", c: "unb", q: "Game8; Beschreibung aus den Spieldaten"},
    {name: "To Scholastone", d: "Mit festem Entschluss nach Scholastein, wo neues Wissen wartet.", c: "unb", q: "Game8; Beschreibung aus den Spieldaten"},
    {name: "Unfamiliar Workshop", d: "Mit Grimricks Hilfe ist das Scholastein-Institut erreicht; den Dekan aufsuchen, um das Studium zu beginnen.", c: "unb", q: "Game8; Beschreibung aus den Spieldaten"},
    {name: "Faltering Hands, Iron Will", d: "Der defekte Power Regulator ist dank Vargus' Hinweisen repariert; mit dem Grundwissen im Engineering beginnt die eigentliche Technikforschung.", reward: {v: "Himmelsweg-Raketenrucksack", c: "unb", q: "th.gl"}},
    {name: "Fractured Door", d: "Vargus ist nicht zu finden, als es um die Verbesserung der Hand Kanone geht; im Nebengebäude nachsehen.", c: "unb", q: "Game8; Beschreibung aus den Spieldaten"},
    {name: "Fateful Encounter", d: "Vargus' Transportgerät hat dich an einen fremden Ort gebracht; umsehen und einen Weg zurück finden.", reward: {v: "Herstellungsrezept: Verstärkte Handkanone", c: "unb", q: "th.gl"}},
    {name: "The Scattered Pieces", d: "In Marnis Anwesen Material suchen, mit dem sich die Leistung des Blasters maximieren lässt.", reward: "Verbesserte Fatum-Handkanone"},
    {name: "Twisted Fate", d: ["Hinter dem Riss liegen die gefallenen Gefährten; sich dem Unbekannten stellen, der in den Ruinen von Pailune erschienen ist.", {v: "Kampf gegen Goyen am Thron von Schloss Pailune, zwei Phasen.", c: "unb", q: "Game8"}], reward: ["Echo des Sturms", {v: "Game8 schreibt „Storm Echo“.", c: "unb", q: "Game8 gegen th.gl"}]},
    {name: "Path of the Engineer", d: "Nach der Rückkehr durch unzählige Dimensionen nach Scholastein Vargus über die Testergebnisse des Geräts und die anderen Dimensionen berichten.", c: "unb", q: "Game8; Beschreibung aus den Spieldaten"},
    {name: "Unidentified Attack", d: ["Mit dem neuen Wissen aus Scholastein zum Camp zurückkehren, die Gefährten treffen und die Neuigkeiten hören.", {v: "Bei Yanns verlassenem Wagen nordöstlich der Region Crimson Desert: Kampf gegen die Schrottkönigin der Steinrückenkrebse und danach Eisentyrann Harkan.", c: "unb", q: "Game8"}], reward: "Flugbahn des Glanzes, Abyss-Artefakt"}
  ], rewards: "Verbesserte Fatum-Handkanone, Echo des Sturms, Flugbahn des Glanzes, Abyss-Artefakt"},
  {name: "A Wider World", de: "Auf in eine größere Welt", who: "Graumähnen, Ozean", start: "nach „Heulender Hügel“ und Camp-Ausbau", subs: "A Call from Beyond the Horizon; Where the Wind Blows; A Beginning Beyond the Waves; Footsteps in Unfamiliar Lands; Secret of the Winding Island", steps: [
    {name: "A Call from Beyond the Horizon", d: ["Im beruhigten Camp haben sich die Gefährten zu einem Gespräch versammelt; hingehen und nachfragen.", "Entsendung „Bau eines kleinen Segelschiffs“ in Vellua, dafür ein Gefährte mit Engineering."], reward: "Kleines Graumähnen-Segelschiff"},
    {name: "Where the Wind Blows", d: "Das Schiff für die Reise ist bereit; im Hafenort auf Neuigkeiten achten und zum Auslaufen bereitmachen.", reward: "Harpunengewehr"},
    {name: "A Beginning Beyond the Waves", d: "Mit dem Schiff in See stechen und die unbekannte Insel im Süden suchen, von der die Gefährten erzählt haben."},
    {name: "Footsteps in Unfamiliar Lands", d: ["Auf der fremden Insel ist ein Fundament für die weitere Reise zu schaffen.", "Erschließungs-Mission auf Insel Auronui; seit dem Hotfix zu 2.04.00 vom Startort aus beginnbar."]},
    {name: "Secret of the Winding Island", d: ["Auf der Insel gibt es noch viel zu entdecken; den kurvigen Pfaden folgen und jeden Winkel untersuchen.", "Höhle auf Insel Auronui."], reward: "Vergessene Schatzkarte"},
    {name: "Signpost of the Great Ocean", d: "Auf der Insel steht ein erster Stützpunkt; mit den Gefährten die kommenden Seefahrten planen.", reward: "5 Uralte Relikte", c: "unb", q: "th.gl; Stelle in der Reihe nicht belegt"}
  ], rewards: "Kleines Graumähnen-Segelschiff, Harpunengewehr, Vergessene Schatzkarte, Uralte Relikte"},
  {name: "Remote Islands", who: "Fraktionsquest, Ozean", c: "unb", q: "th.gl", subs: {v: "nicht belegt", c: "nb"}, steps: [
    {name: "The Seaborne Village", d: "Ein von Piraten besetztes Inseldorf erreichen, die Piraten besiegen und die verängstigten Bewohner in Sicherheit bringen. Der Abschlusstext nennt Insel Samora als Piratenbasis und Welsmensch als Gegner."}
  ], rewards: "Abyss-Artefakt, 5 Uralte Relikte, Feuertaufe"},
  {name: "Mistbound Sea", who: "Fraktionsquest, Ozean", c: "unb", q: "th.gl", subs: {v: "nicht belegt", c: "nb"}, steps: [
    {name: "Catastrophe of Ancient Times", d: "Eine uralte Waffe ist in der Tiefe erwacht und lässt das Meer beben; dem metallischen Gebrüll über die Insel folgen und die mechanische Seeschlange (Leviakan) besiegen."}
  ], rewards: "Abyss-Artefakt, 20 Uralte Relikte, Blick des Beschützers"},
  {name: "Isolated Island Chief", who: "Fraktionsquest, Satyros Island", c: "unb", q: "th.gl", subs: {v: "nicht belegt", c: "nb"}, steps: [
    {name: "The Tribe's Foremost", d: "Auf der Insel, die jeden Fremden abweist, den Häuptling Satyros besiegen, den stärksten Krieger des Stammes."}
  ], rewards: "Satyr-Speer, 5 Uralte Relikte, Abyss-Artefakt"},
  {name: "Predator of the Abandoned Island", who: "Fraktionsquest, Razanui Island", c: "unb", q: "th.gl", subs: {v: "nicht belegt", c: "nb"}, steps: [
    {name: "Unending Hunger", d: "Das gewaltige, menschenfressende Ungeheuer, um das sich bisher nur Gerüchte rankten, hat sich gezeigt; das von unstillbarem Hunger getriebene Raubtier Reggis besiegen."}
  ], rewards: "Abyss-Artefakt, 5 Uralte Relikte, Ausbreitende Federn"},
  {name: "Cave of Sorrow", who: "Fraktionsquest, Bergel Island", c: "unb", q: "th.gl", subs: {v: "nicht belegt", c: "nb"}, steps: [
    {name: "A Vengeful Spirit at Sea", d: "Aus einer dunklen, feuchten Höhle hallt ein klagender Schrei; das Wesen besiegen, das sich dort zeigt (Rohan Cooper)."}
  ], rewards: "Marineoffiziersrüstung, Trugbild-Kaskade, 5 Uralte Relikte, Abyss-Artefakt, Notiz von Rohan Cooper"},
  {name: "Vestiges of the Void", who: "Fraktionsquest, Region Crimson Desert", c: "unb", q: "th.gl (Questname)", subs: {v: "nicht belegt", c: "nb"}, steps: [
    {name: "The Golden Wraith", d: "Tief in den Ruinen sperrt ein Ritter in blendend goldener Rüstung den Weg; den von der Leere besessenen Ritter der Leere besiegen."}
  ], rewards: ["Langschwert der Leere, Abyss-Artefakt", {v: "Die Void-Rüstung liegt in einer Truhe im Boss-Bereich.", c: "unb", q: "Mobalytics, GameRant"}]},
  {name: "Shield of Hernand", who: "Graumähnen", c: "unb", q: "Game8", subs: "Hüter des Friedens; Grundstein des Friedens", steps: [
    {name: "Guardian of Peace", d: "Der Frieden in Hernand fühlt sich noch ungewohnt an, doch das Wissen, ihn bewahrt zu haben, wärmt das Herz; nach Hernand reisen und die Stimmung im Dorf aufnehmen."},
    {name: "Cornerstone of Peace", d: "Burg Drachensturz soll Hernands Stützpunkt des Friedens werden; die Gebäude der Burg instand setzen, um den Banditen die Stirn zu bieten."}
  ], rewards: "Burg Drachensturz (Schenkung durch Duke Celeste)", note: {v: "Die Reihenfolge der beiden Schritte stammt von Game8; der Text von „Hüter des Friedens“ liest sich, als käme er nach dem Burgausbau.", c: "unb", q: "Game8, Spieldaten"}},
  {name: "Renewed Vitality", who: "Graumähnen", c: "unb", q: "Game8", subs: "Die stillstehenden Sägeblätter; Wieder rotierende Sägeblätter", steps: [
    {name: "The Stilled Saw", d: "Das Scheitheim-Sägewerk steckt offenbar in Schwierigkeiten; an der Anschlagtafel Näheres erfahren."},
    {name: "The Saw Turns Again", d: "Das angeschlagene Scheitheim-Sägewerk wieder auf Erfolgskurs bringen (Einrichtung verwalten)."}
  ], rewards: "Pacht des Scheitheim-Sägewerks"},
  {name: "Garden of Trials", de: "Garten der Prüfungen", who: "Graumähnen", subs: "An der Schwelle neuer Prüfungen", steps: [
    {name: "The Gardener's Invitation", d: "Jemand hat per Brieftaube einen Brief geschickt; den Brief lesen. Die Einladung führt zum Garten der Prüfungen."},
    {name: "At the Threshold of a New Ordeal", d: "Der Einladung folgen und zum Archiv des Axioms gehen."}
  ], rewards: "Zugang zum Garten der Prüfungen"},
  {name: "A Memory Beyond Ashes", who: "Fraktion Charting the Unknown", c: "unb", q: "Game8", subs: {v: "nicht belegt", c: "nb"}, rewards: "Schaltet die Burgbau-Entsendung der Burg der Flammenritter frei"},
  {name: "Outlaws of the Ocean", who: "Great Ocean, Piratenschiffe", c: "unb", q: "Game8, th.gl", subs: "Piratenschiff: Der Schrei der Sirene; Piratenschiff: Die schwarze Blüte; Piratenschiff: Der rote Schild; Piratenschiff: Der Rächer; Piratenschiff: Faunus; Piratenschiff: Der grimmige Wind; Piratenschiff: Die scharlachrote Witwe; Piratenschiff: Der blutige Pfahl; Piratenschiff: Die Teufelsbeute; Piratenschiff: Der schwarze Krummsäbel; Piratenschiff: Die Rache der See; Piratenschiff: Die Todesblüte; Piratenschiff: Die Seeklaue; Piratenschiff: Der trunkene Wels", steps: [
    {name: "Pirate Ship: The Siren's Cry", d: "Laut Steckbrief in den Spieldaten bei Insel Saeon gesichtet (Game8 nennt Insel Samora): kleines bewaffnetes Schiff mit gestreiften Segeln und zwei gekreuzten Schwertern."},
    {name: "Pirate Ship: The Black Bloom", d: "Steckbrief: im Südmeer von Vellua gesichtet, großes schwer bewaffnetes Schiff mit schwarzen Segeln und roten Blumen.", reward: "Vergessene Schatzkarte #1"},
    {name: "Pirate Ship: The Crimson Shield", reward: "Vergessene Schatzkarte #2"},
    {name: "Pirate Ship: The Vengeance", reward: "Vergessene Schatzkarte #3"},
    {name: "Pirate Ship: Faunus", reward: "Vergessene Schatzkarte #4"},
    {name: "Pirate Ship: The Grim Wind", d: "Steckbrief: bei Insel Samora gesichtet, Flotte aus drei schwer bewaffneten Schiffen mit gestreiften Segeln und Schwertwappen.", reward: "Vergessene Schatzkarte #5"},
    {name: "Pirate Ship: The Scarlet Widow", d: "Steckbrief: bei Insel Spagnola gesichtet, Flotte aus drei schwer bewaffneten Schiffen mit roten Segeln und weißen Speeren.", reward: "Vergessene Schatzkarte #39"},
    {name: "Pirate Ship: The Bloodied Stake", d: "Steckbrief: bei Insel Nirakan gesichtet, Flotte aus vier schwer bewaffneten Schiffen mit rot gestreiften Segeln und orangefarbener Klinge.", reward: "Vergessene Schatzkarte #23"},
    {name: "Pirate Ship: The Devils' Plunder", d: "Steckbrief: bei Insel Ocula gesichtet, Flotte aus vier schwer bewaffneten Kriegsschiffen mit rot gestreiften Segeln und einem menschlichen Gesichtsprofil.", reward: "Vergessene Schatzkarte #24"},
    {name: "Pirate Ship: The Black Curved Blade", d: "Steckbrief: südlich von Insel Spagnola gesichtet, Flotte aus vier großen schwer bewaffneten Schiffen mit schwarz gestreiften Segeln und dem Wappen eines Greifvogels.", reward: "Vergessene Schatzkarte #36"},
    {name: "Pirate Ship: The Sea's Vengeance", d: "Steckbrief: westlich von Insel Estra gesichtet, mittelgroßes bewaffnetes Schiff mit roten Segeln und einem riesigen Oktopus. Belohnung nicht belegt."},
    {name: "Pirate Ship: The Death Blossom", d: "Steckbrief: östlich von Insel der roten Hänge gesichtet, mittelgroßes bewaffnetes Schiff mit schwarzen Segeln und zwei Äxten. Belohnung nicht belegt."},
    {name: "Pirate Ship: The Sea Claw", d: "Steckbrief: südlich von Insel Drangar gesichtet, kleines bewaffnetes Schiff mit schwarzen Segeln und einem riesigen Tintenfisch. Belohnung nicht belegt."},
    {name: "Pirate Ship: The Drunken Catfish", d: "Steckbrief: bei Insel Samora gesichtet, schwer bewaffnetes Kriegsschiff mit prunkvollen Segeln und einem Anker. Es ist das Schiff von Welsmensch; ein Bauplan „Bauplan: Der trunkener Wels“ existiert, ob dieser Kampf ihn liefert, ist nicht belegt."}
  ], rewards: "Je Piratenschiff eine Vergessene Schatzkarte (belegt für die zuerst erfassten zehn Schiffe, bei den vier ergänzten nicht belegt)"},
  {name: "Tales of the Ocean Residents", who: "Great Ocean", c: "unb", q: "th.gl, Game8", subs: "Ronnie's Bar Snack; Food from the Heart; The Secret to Rich Flavors; The Ingredient of Inspiration; For a Better Tomorrow; The Heart That Couldn't Leave", steps: [
    {name: "Ronnie's Bar Snack", d: "Der Koch Ronnie braucht Jakobsmuscheln für neue Bar-Snacks (Game8 schreibt „Ronnie's Special Bar Snack“).", reward: "Mittelgroße Tasche"},
    {name: "Food from the Heart", d: "Ein Mann im Hafen von Vellua wirkt bedrückt; anhören, was er zu sagen hat.", reward: "Mittelgroße Tasche, Vergessene Schatzkarte #31"},
    {name: "The Secret to Rich Flavors", d: "Ein Mann, der im Hafen von Delesyia kocht, wirkt in Gedanken versunken.", reward: "Mittelgroße Tasche"},
    {name: "The Ingredient of Inspiration", d: "Im Steinwacht-Hafen den bekümmert wirkenden Künstler aufsuchen.", reward: "Mittelgroße Tasche"},
    {name: "For a Better Tomorrow", d: "Im Hafen von Demeniss den bedrückten Mann ansprechen.", reward: "Mittelgroße Tasche"},
    {name: "The Heart That Couldn't Leave", d: "In Dewhaven Castle wirkt ein Mann tief besorgt; herausfinden, was ihn bedrückt.", reward: "Mittelgroße Tasche"}
  ], rewards: "Medium Bags, Vergessene Schatzkarte #31"},
  {name: "Besetzte Inseln und Küsten", who: "Great Ocean, Inselmissionen", subs: "Piraten, die die Insel besetzen; Die geraubte Reliquie; Schleier der Gesetzlosen; Belagerungsring der Piraten; Ein Stamm, der Eindringlinge jagt", steps: [
    {name: "Seized by Pirates", d: "Überall auf Insel Samora sind Piratenbanden aufgetaucht und haben die Gegend unter ihre Kontrolle gebracht; die besetzten Küstengebiete und wichtigen Stützpunkte zurückerobern."},
    {name: "The Stolen Relic", d: "Welsmensch ist besiegt und Insel Samora befreit; den Häuptling der Insel ansprechen."},
    {name: "Outlaw's Veil", d: "Eine Piratenbande hält die Schnellen der Gesetzlosen besetzt."},
    {name: "Pirate Siege Line", d: "Eine Piratenbande hält Insel Razanui besetzt."},
    {name: "A tribe that hunts intruders", d: "Insel Satyros wird von den Satyros beherrscht."}
  ], rewards: {v: "nicht belegt", c: "nb"}, note: "Gruppierung dieses Wikis: Die Spieldaten führen diese Missionen als Inselaufträge, ohne Reihenfolge oder Zuordnung zu einer Fraktionsquest. „Das Inseldorf auf dem Meer“ (Samora, Welsmensch) steht unter „Die abgelegene Insel“."},
  {name: "Weitere Missionen auf See", who: "Great Ocean, Einzelmissionen", subs: "Windumwehter Hafen; Das ruhig gewordene Meer; Ruhelose Seelen; Uralter Tempel", steps: [
    {name: "The Windswept Harbor", d: "Die in Delesyia eingetroffenen Gefährten wirken bedrückt; nachfragen, welche Probleme beim Transport der Vorräte aufgetreten sind."},
    {name: "The Stilled Sea", d: "Das wild tobende Meer hat sich beruhigt; den Inselbewohnern die Neuigkeit überbringen und nach Delesyia zu den Gefährten zurückkehren."},
    {name: "Sleepless Souls", d: "Gerüchten zufolge geistert irgendwo auf dem Ozean ein Phantomschiff durch dichte Nebelschwaden."},
    {name: "Ancient Shrine", d: "Zum Tempel in der Korallenregion gehen, von dem Milo erzählt hat, und nach der Reliquie suchen."}
  ], rewards: {v: "nicht belegt", c: "nb"}, note: "Gruppierung dieses Wikis. Zu welcher Questreihe diese vier Missionen gehören und in welcher Reihenfolge sie kommen, nennen die Spieldaten nicht."},
  {name: "Demeniss und die Flammenritter", who: "Damiane", subs: "Ein Flackern in der Dunkelheit; Ein Schwur auf Asche", steps: [
    {name: "A Flicker in the Dark", d: "Während Damiane Demeniss beim Neuanfang hilft, spricht sich herum, dass jemand nach ihr sucht; zur Burg Demeniss gehen und die Lage klären."},
    {name: "Vow Raised from Ash", d: "Das zurückgewonnene Lehen trägt noch die Narben, die Caliburn hinterlassen hat; die Burg der Flammenritter instand setzen und das Heim wieder aufbauen, das man als Erbe der Familie Spencer beschützen wird."}
  ], rewards: {v: "nicht belegt", c: "nb"}, note: "Gruppierung dieses Wikis. Ob die Missionen zu „Aus der Asche“ oder zu „Erinnerung jenseits der Asche“ gehören, ist nicht belegt."},
  {name: "Romanze: Bari", who: "Romanze, Bari", subs: "Das behütete Herz; Sehnsucht nach einem gewöhnlichen Leben; Ein unberechenbares Herz; Freundliche Worte; Mache Bari einen Heiratsantrag", steps: [
    {name: "The Heart Held Within", d: "Bari aufsuchen und im Gespräch herausfinden, welche Gedanken sich hinter ihren knappen Bemerkungen verbergen."},
    {name: "Longing for the Ordinary", d: "Baris Antwort war offenbar gar nicht so schlecht: ihr lang erwarteter Brief ist eingetroffen; den Brief lesen."},
    {name: "An Unpredictable Heart", d: "Mit dem Geheimnis, das Bari nur dir anvertraut hat, einen Weg finden, dem jungen Mann zu helfen und ihren Kummer zu lindern."},
    {name: "Kind Words", d: "Die Zeit ist gekommen, Bari zu gestehen, was man lange im Herzen getragen hat."},
    {name: "Propose to Bari", d: "Eigene Aufgabe: Bari einen Heiratsantrag machen (DE „Mache Bari einen Heiratsantrag“)."}
  ], rewards: {v: "nicht belegt", c: "nb"}, note: ["Reihe „Beyond the Words“ (DE „Wahre Gefühle hinter den Worten“).", {v: "Zuordnung des Reihennamens zu Bari.", c: "unb", q: "Game Overdrive"}, {v: "Die Reihenfolge der Schritte ist aus den Abschlusstexten der Spieldaten erschlossen und stimmt mit Game Overdrive überein; amtlich ist sie nicht.", c: "unb", q: "erschlossen"}, "Voraussetzungen: abgeschlossene Sanktum-Quests der Hexe (Patch-Notes), normales Vertrauen 100 vor dem ersten Flirt, Brief per Taube, neue Quests nahe 50, 75 und 100 auf der erweiterten Stufe (mehrere Guides). Die Reihe startet über Briefe nach Meilensteinen, Flirten ist die Voraussetzung."]},
  {name: "Romanze: Elowen", who: "Romanze, Elowen", subs: "Über das Wissen; Eine neue Frage; Ein Prost zum Abend; Die Antwort vor Augen; Mache Elowen einen Heiratsantrag", steps: [
    {name: "On Knowing", d: "Elowen aufsuchen und mit ihr über das sprechen, was sie gewöhnlich beschäftigt."},
    {name: "New Questions", d: "Nach dem Gespräch über Weisheit ist ein Brief von Elowen eingetroffen; vielleicht bietet sich die Gelegenheit, ihr etwas Neues beizubringen. Den Brief lesen."},
    {name: "An Evening Toast", d: "Ein besonderes Geschenk für Elowen vorbereiten, das ihre standhafte Vernunft aufweichen könnte."},
    {name: "Known Answers", d: "Beide ahnten die Gefühle des anderen bereits; Elowen die wahren Gefühle offen sagen."},
    {name: "Propose to Elowen", d: "Eigene Aufgabe: Elowen einen Heiratsantrag machen (DE „Mache Elowen einen Heiratsantrag“)."}
  ], rewards: {v: "nicht belegt", c: "nb"}, note: ["Reihe „Missing Final Page“ (DE „Ein Buch ohne letzte Seite“), Zuordnung zu Elowen erschlossen.", {v: "Die Reihenfolge der Schritte ist aus den Abschlusstexten der Spieldaten erschlossen und stimmt mit Game Overdrive überein; amtlich ist sie nicht.", c: "unb", q: "erschlossen"}, "Voraussetzungen: abgeschlossene Sanktum-Quests der Hexe (Patch-Notes), normales Vertrauen 100 vor dem ersten Flirt, Brief per Taube, neue Quests nahe 50, 75 und 100 auf der erweiterten Stufe (mehrere Guides). Die Reihe startet über Briefe nach Meilensteinen, Flirten ist die Voraussetzung."]},
  {name: "Romanze: Lyselia", who: "Romanze, Lyselia", subs: "Der Ruf der Höhle; Jenseits der bekannten Welt; Sternennacht; Die Welt, die vor uns liegt; Mache Lyselia einen Heiratsantrag", steps: [
    {name: "The Cave's Calling", d: "Lyselia in der Höhle aufsuchen und sie vorsichtig ansprechen."},
    {name: "A World Beyond", d: "Während die Gefühle für Lyselia wachsen, kommt ein Brief von ihr; den Brief lesen."},
    {name: "One Starry Night", d: "Hoffentlich bleibt Lyselia der gemeinsame Nachthimmel in guter Erinnerung; der Wunsch, sie näher kennenzulernen, wächst."},
    {name: "Life Ahead of Us", d: "Lyselia hat ihren Mut zusammengenommen und ist in die Welt hinausgetreten; gemeinsam den Sternenhimmel betrachten."},
    {name: "Propose to Lyselia", d: "Eigene Aufgabe: Lyselia einen Heiratsantrag machen (DE „Mache Lyselia einen Heiratsantrag“)."}
  ], rewards: {v: "nicht belegt", c: "nb"}, note: ["Reihe „Brave Steps“ (DE „Der erste mutige Schritt“), Zuordnung zu Lyselia erschlossen.", {v: "Die Reihenfolge der Schritte ist aus den Abschlusstexten der Spieldaten erschlossen und stimmt mit Game Overdrive überein; amtlich ist sie nicht.", c: "unb", q: "erschlossen"}, "Voraussetzungen: abgeschlossene Sanktum-Quests der Hexe (Patch-Notes), normales Vertrauen 100 vor dem ersten Flirt, Brief per Taube, neue Quests nahe 50, 75 und 100 auf der erweiterten Stufe (mehrere Guides). Die Reihe startet über Briefe nach Meilensteinen, Flirten ist die Voraussetzung."]},
  {name: "Romanze: Areciel", who: "Romanze, Areciel", subs: "Resilience in the Sandstorm; The Undrawn Blade; Power Yet Unleashed; Someone to Lean On; Propose to Areciel", steps: [
    {name: "Resilience in the Sandstorm", d: "Areciel aufsuchen und fragen, warum sie ohne Pause unablässig trainiert."},
    {name: "The Undrawn Blade", d: "Beim Nachdenken, wie man Areciel einen Moment der Erholung näherbringen kann, trifft ein Brief von ihr ein; den Brief lesen."},
    {name: "Power Yet Unleashed", d: "Areciel hätte die Kraft, einzugreifen, und muss doch zusehen; mit ihr dort sprechen, wo sie das Geschehen aus der Ferne beobachtet."},
    {name: "Someone to Lean On", d: "Ein Zufluchtsort sein, an dem Areciel, die immer stark erscheinen musste, ihre Wachsamkeit ablegen kann; ihr die Gefühle gestehen."},
    {name: "Propose to Areciel", d: "Eigene Aufgabe: Areciel einen Heiratsantrag machen (DE „Mache Areciel einen Heiratsantrag“)."}
  ], rewards: {v: "nicht belegt", c: "nb"}, note: ["Reihe „Courage to Be Vulnerable“ (DE „Der Mut, Schwäche zu zeigen“).", {v: "Zuordnung des Reihennamens zu Areciel.", c: "unb", q: "Game Overdrive"}, {v: "Die Reihenfolge der Schritte ist aus den Abschlusstexten der Spieldaten erschlossen und stimmt mit Game Overdrive überein; amtlich ist sie nicht.", c: "unb", q: "erschlossen"}, "Voraussetzungen: abgeschlossene Sanktum-Quests der Hexe (Patch-Notes), normales Vertrauen 100 vor dem ersten Flirt, Brief per Taube, neue Quests nahe 50, 75 und 100 auf der erweiterten Stufe (mehrere Guides). Die Reihe startet über Briefe nach Meilensteinen, Flirten ist die Voraussetzung."]}
];
const DLC_QUEST_NOTES = [
  "Offiziell: je eine eigene Quest für Kliff, Oongka und Damiane nach „Ende der Reise“ im Abenteuertagebuch. Die Namen der drei Reihen nennen die Patch-Notes nicht; sie stammen aus den Guides und stehen so auch in den Spieldaten.",
  "Schritte ohne grauen Vermerk nennen Game8 und die Spieldaten-Datenbank th.gl übereinstimmend; th.gl führt nur Schritte mit Belohnung, die übrigen Schritte nennt bisher nur Game8.",
  {v: "Neue Herausforderungen im Abenteuertagebuch: Voyage („Die Welt jenseits des Horizonts“, 8 Ziele auf See), Swimming („Ab in die Tiefsee“, 10 Ziele unter Wasser), Atemberaubende Aussicht („Spuren der blauen Reise“, 20 Aussichtspunkte), Ozeanruinen („Knoten der Wellen“, 9 Ruinen) und Management („Die Früchte rastloser Tage“, 6 Ziele für Einrichtungen). Voyage und Swimming bringen zusammen 18 neue Versiegelte Abyss-Artefakte.", c: "unb", q: "th.gl"},
  {v: "Eine Tagebuch-Kategorie „Charting the Unknown“ mit 14 Quests nennt nur games.gg.", c: "unb", q: "games.gg"},
  "Beschreibungen der Schritte (05.11.2026): in eigenen Worten nach den Missionstexten der Spieldaten (quest.dlc_01). Namen der Schritte stehen dort genau so; Reihenfolge und Zugehörigkeit zu einer Reihe nennen die Spieldaten nicht, sie stammen von Game8 und th.gl (grau mit Vermerk).",
  "Neu: „Besetzte Inseln und Küsten“, „Weitere Missionen auf See“, „Demeniss und die Flammenritter“ und die vier Romanze-Reihen (Bari, Elowen, Lyselia, Areciel) fassen Missionen zusammen, die die Spieldaten ohne Zuordnung führen; die Gruppierung stammt von diesem Wiki.",
  "Die vier Händler-Aufträge der Spieldaten (Insel-Handelsposten, Relikt-Austausch, Schiffsverwaltungsbüro, Schiffsausrüstungsladen) sind keine Quests, sondern die Beschreibungen der Händler Harris, Sulivan, Cruise und Joaquin; sie stehen bei Schiffen und Relikt-Händlern."
];

// I Bosse. w = Name im Boss-Bestand des Wikis, falls vorhanden.
const DLC_BOSSES = [
  {name: "Knight of Void", where: "Buried Corridor (laut Mobalytics in der Trivana-Meerenge): versteckte Höhle hinter einer Illusionswand in der Region Crimson Desert, nördlich des „R“ in „Crimson“ auf der Karte. Quest „Von der Leere zerfressenes Nachbild“.", drop: ["Langschwert der Leere, Abyss-Artefakt; Schützende Plattenausrüstung der Welt in einer Truhe im Boss-Bereich", {v: "Schreibweise der Spieldaten „of Void“ (th.gl, GameRant), Mobalytics schreibt „of the Void“.", c: "unb", q: "th.gl, GameRant gegen Mobalytics"}]},
  {name: "Satyros", where: ["Inselboss, Häuptling der Satyrn: die südliche von zwei eng benachbarten Inseln im äußersten Südwesten (Dorf am Wasserfall); auf der nördlichen Insel ein Knochennest mit einer weiteren Begegnung.", {v: "Name, Insel Satyros und die Quest „Häuptling der abgeschiedenen Insel“ nennt th.gl.", c: "unb", q: "th.gl"}], drop: "Satyr-Speer, 5 Uralte Relikte, 1 Abyss-Artefakt"},
  {name: "Leviakan", where: ["Gegner des Großen Ozeans, im Hotfix 2.04.02 erwähnt („Leviakan would stop moving“).", {v: "Eine uralte mechanische Seeschlange, auf einer nebligen Insel erwacht und einst in einem versunkenen Tempel eingeschlossen; Quest „Nebelmeer“.", c: "unb", q: "th.gl"}], drop: [{v: "Blick des Beschützers, 20 Uralte Relikte, Abyss-Artefakt (Questbelohnung)", c: "unb", q: "th.gl"}, "Seit Patch 2.04.08 (06.11.2026) zusätzlich Leviakans Schuppe als Beute; seit Patch 2.05.00 (13.11.2026) erhält man sie nach dem Sieg über Leviakan auf der Insel Bergel (offizielle Patch-Notizen)."]},
  {name: "Reggis the Isleguard", c: "unb", q: "th.gl", where: "Insel Razanui: ein menschenfressender Riesen-Imp, den Piraten einst zähmten; greift auch Schiffe an. Quest „Prädator der verlassenen Insel“.", drop: "Ausbreitende Federn, 5 Uralte Relikte, Abyss-Artefakt (Questbelohnung)"},
  {name: "Rohan Cooper", c: "unb", q: "th.gl", where: "Höhle der Trauer auf Insel Bergel: der ruhelose Geist des Sohns eines Marineoffiziers aus Demeniss. Quest „Höhle der Trauer“.", drop: "Marineoffiziersrüstung, Trugbild-Kaskade, 5 Uralte Relikte, Abyss-Artefakt (Questbelohnung)"},
  {name: "The Dancing Catfish Crusher", c: "unb", q: "th.gl", where: "Boss des Großen Ozeans: eine Zerstörungsmaschine, die Welsmensch mit der Technik der Helms bauen ließ. Ort nicht belegt.", drop: {v: "nicht belegt", c: "nb"}},
  {name: "Matthias", w: "Matthias", c: "unb", q: "Game8", where: "Schloss Pailune, Treppe; Kliffs Quest „Ein bekanntes Gesicht“", drop: "Danach entsendbarer Gefährte", note: {v: "Matthias ist schon Boss im Hauptspiel (Kapitel 2, „Für die Ehre“); ob es eine eigene DLC-Variante oder nur eine erneute Begegnung ist, ist nicht belegt.", c: "nb"}},
  {name: "T'rukan", c: "unb", q: "Game8", where: "Arena im Schlangenmoor; Kliffs Quest „Wegweisende Lehren“", drop: "Manifestation des Ultimativen (Questbelohnung)"},
  {name: "Kharzek, Archon of Antumbra", where: [{v: "Silent Burial Ground westlich des Sandsturmgebiets; Kliffs Quest „Der Drahtzieher“.", c: "unb", q: "Game8"}, {v: "Die Spieldaten schreiben „Antumbra-Archon, Kharzek“.", c: "unb", q: "th.gl"}], drop: "Vollstrecker der Enthüllung, Abyss-Artefakt (Questbelohnung)"},
  {name: "Geago the Flamecrazed", where: {v: "Burg Schmorstein; Damianes Quest „Einen Schatten werfen“", c: "unb", q: "Game8"}, drop: "Aschener Blitz, Abyss-Artefakt (Questbelohnung)"},
  {name: "Goyen", w: "Goyen", c: "unb", q: "Game8", where: "Schloss Pailune (Thron), zwei Phasen; Oongkas Quest „Verdrehtes Schicksal“", drop: "Echo des Sturms (Questbelohnung)", note: {v: "Den Namen gibt es auch als Boss im Hauptspiel; ob es dieselbe Variante ist, ist unklar.", c: "nb"}},
  {name: "Scrap Metal Queen Stoneback Crab", where: [{v: "Eine Kriegsmaschine, die Harkan nach dem Vorbild der Königin der Steinrückenkrebse aus Schrott baute.", c: "unb", q: "th.gl"}, {v: "Bei Yanns verlassenem Wagen nordöstlich der Region Crimson Desert; Oongkas Quest „Ein mysteriöser Angriff“.", c: "unb", q: "Game8"}], drop: {v: "nicht belegt", c: "nb"}},
  {name: "Iron Tyrant Harkan", where: {v: "Direkt nach der Schrottkönigin der Steinrückenkrebse, gleiche Quest", c: "unb", q: "Game8"}, drop: "Flugbahn des Glanzes, Abyss-Artefakt (Questbelohnung von „Ein mysteriöser Angriff“)"},
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
  ["Ort", ["Im Abyss nahe dem Archiv des Axioms: Abyss-Nexus Archiv des Axioms (Pfad der Vorsehung oberhalb von Hernand), dort an Sockel oder Würfel die Gruppe wählen.", {v: "Ansprechpartner Weiße Krähe.", c: "unb", q: "GameRant"}]],
  ["Regeln", "10 Gruppen in frei wählbarer Reihenfolge, allein oder mit bis zu 3 Charakteren (Kliff, Oongka, Damiane). Fällt einer, kämpft der nächste weiter. Gerichte heilen nicht."],
  ["Belohnung je Gruppe", "Jede abgeschlossene Gruppe verbessert eine bestehende Fähigkeit."],
  ["Abschlussbelohnung", "Lumen-Langschwert am hinteren Pfeiler, nachdem alle 10 Gruppen geschafft sind."],
  ["Gruppe wählbar?", {v: "Eine Gruppe soll erst wählbar sein, wenn ihre Bosse in der Oberwelt besiegt sind; Output Lag nennt das ausdrücklich eine Vermutung.", c: "unb", q: "Output Lag"}],
  ["Skillbaum", {v: "Alle 10 verbesserten Fähigkeiten schalten „Ascend“ im Skillbaum frei.", c: "unb", q: "Games Horizon"}],
  ["Erfolg", {v: "„Trial by flower“.", c: "unb", q: "Output Lag"}]
];
const DLC_GARDEN = [
  {n: 1, name: "Battlefield Piercers", b: ["Gwen Kraber", "Half Moon Reaper", "Antumbra's Spear"], reward: "Ascend Stab (kürzere Ladezeit von Slash)"},
  {n: 2, name: "The Deathbringers", b: ["Walter Lanford", "The Crimson Warden", "Samara the Sandwatcher"], reward: "Perfektion des Ausweichhiebs", bc: "ok"},
  {n: 3, name: "Marni's Relics", b: ["Marni's Clockwork Mantis", "Mechanicus", "Dreadnought"], reward: "Elemente verstärken: Perfektion (weniger Geist-Kosten beim Element-Imbuen)"},
  {n: 4, name: "Earth-Trampling Giants", b: ["The Raging Tempest", "Bradie Gu", "Mazzul, the Dark Justiciar"], reward: "Bodyslam: Perfektion (weniger Geist-Kosten)"},
  {n: 5, name: "Harbingers of Death", b: ["Reed Devil", "Draven the Crowcaller", "Hexe Marie"], reward: "Flug: Perfektion (weniger Ausdauer im Flug)"},
  {n: 6, name: "The Ironbound Warriors", b: ["Saigord the Staglord", "White Bearclaw", "Cassius Morten"], reward: "Perfektion des Drehhiebs (weniger Geist-Kosten)"},
  {n: 7, name: "Anomalous Beings", b: ["Kailok the Hornsplitter", "Sizlek the Insatiable", "Master Du"], reward: "Trudel: Perfektion (weniger Geist-Kosten)"},
  {n: 8, name: "Earth-Shattering Beasts", b: ["Kearush the Slayer", "White Horn", "Ogre"], reward: "Regeneration (HP und Geist bei unbewaffneten Treffern)"},
  {n: 9, name: "The Soul-Consumed", b: ["Awakened Ludvig", "Awakened Lucian Bastier", "Lava Myurdin (Phase 2)"], reward: "Perfektion des Sturmhiebs"},
  {n: 10, name: "The Apparition Bearers", b: ["Giath", "Fortain the Cursed Knight", "Antumbra's Sword"], reward: "Perfektion des Vorwärtshiebs (weniger Ausdauer)"}
];
const DLC_GARDEN_NOTE = {v: "Gruppennamen und Belohnungen sind belegt. Die Bossnamen der Gruppen nennt nur GameRant (Gruppe 2 auch Sportskeeda); sie sind deshalb außer bei Gruppe 2 unbestätigt. Abweichende Schreibweisen der Quelle (z. B. „Crowcaller“, „White Horn, Shepherd of Souls“, „Lava-Myurdin“) stehen hier unter dem Namen aus der Bossliste des Wikis.", c: "unb", q: "GameRant"};

// K Burgen, Wohnen, Verwaltung, Soziales. g = Gruppe.
const DLC_LIVING = [
  {g: "Burgen", t: "Burg Drachensturz", d: ["Selbst gestaltbar; nach „Ende der Reise“ und der Befreiung des Stützpunkts.", {v: "Schenkung durch Duke Celeste über „Schild von Hernand“; Burgbau-Entsendung 30.000 Camp-Mittel, 20 Gefährten (1 mit Construction), 15 Spieltage. Ort nicht genannt.", c: "unb", q: "Game8"}]},
  {g: "Burgen", t: "Burg der Flammenritter (Flame Knight's Castle)", d: ["Selbst gestaltbar; nach Damianes Quest „Politiker“ und der Befreiung des Stützpunkts.", {v: "Liegt in Demeniss; die Befreiung schaltet „Erinnerung jenseits der Asche“ frei; Burgbau 100.000 Camp-Mittel, 10.000 Lagerwaffen, 40.000 Lagerstein, 40.000 Camp Wood, 10.000 Camp Provisions, 20 Gefährten (1 mit Construction), 15 Spieltage.", c: "unb", q: "Game8 (schreibt wie th.gl „Flame Knights' Castle“)"}]},
  {g: "Burgen", t: "Dritte Burg?", d: {v: "Die Feature-Übersicht spricht von drei Burgen, die Patch-Notes nennen zwei, kein Guide findet eine dritte. Burg Schmorstein ist nur Questort, keine gestaltbare Burg.", c: "nb"}},
  {g: "Wohnen", t: "Freies Bauen", d: "Grundriss selbst entwerfen, Wände und Fenster frei setzen (Dekorieren, Hausgrundriss, Freies Bauen); Voraussetzung siehe Zugang."},
  {g: "Wohnen", t: "17 neue Wohnsitze", d: ["Werden per Entsendung errichtet; der Ehepartner lebt im zugewiesenen Wohnsitz, die Karte zeigt das Symbol des Besitzers.", {v: "Namen und Orte der Wohnsitze", c: "nb"}]},
  {g: "Wohnen", t: "Neue Wohnobjekte", d: "Wege, Bäume, Blumenbeete, Katzenwachtürme, Hundekissen; Katzenwachtürme beim neuen Katzenwachturm-Händler."},
  {g: "Verwaltung", t: "Kartenreiter „Einrichtung“", d: "Befreite Stützpunkte pachten und als Restaurant, Sägewerk, Schmiede oder Schneiderei betreiben. Die Einrichtungen laufen auch weiter, wenn du weit weg bist; gelegentlich kommen besondere Kunden. Graumähnen-Stützpunkte sind auf der Karte jetzt blau."},
  {g: "Verwaltung", t: "Beispiele", d: ["Restaurant in Vellua, Schmiede in der Zargan-Panzerfabrik, Sägewerk Scheitheim-Sägewerk (Hernand).", {v: "Die Pacht des Sägewerks läuft laut Game8 über „Neuer Elan“ bzw. „Die stillstehenden Sägeblätter“.", c: "unb", q: "Game8"}, {v: "Ort der Schneiderei", c: "nb"}]},
  {g: "Verwaltung", t: "Betrieb", d: "Personal mit passenden Fähigkeiten zuweisen, Waren und Preise festlegen, Einrichtungsgegenstände platzieren; ein steigender Recognition Level schaltet Rezepte frei."},
  {g: "Verwaltung", t: "Herausforderung „Management“", d: {v: "„Die Früchte rastloser Tage“ mit 6 Zielen für Einrichtungen; die Belohnungen sind Einrichtungsgegenstände: Stolz des Fischers, Fähren-Bücherregal, Erhabenes Bett des Kapitäns, Erhabener Stuhl des Kapitäns, Goldenes Schiffsmodell und Prunkvolles Steuerrad mit Goldverzierung.", c: "unb", q: "th.gl"}},
  {g: "Verwaltung", t: "Miete und Ertrag", d: ["Hotfix 2.04.02 korrigierte abnormal steigende Erträge.", {v: "Zahlen zu Miete und Ertrag", c: "nb"}]},
  {g: "Soziales", t: "Romanze und Ehe", d: "Flirten verlangt zuerst normales Vertrauen 100 (mehrere Guides), sonst kostet jeder Versuch 10 Vertrauen. Über „Interagieren“ und „Flirten“; bei Vertrauen 100 auf der erweiterten Stufe ist ein Heiratsantrag möglich. Hexen brauchen dafür ihre abgeschlossenen Sanktum-Quests. Der Ehepartner reist mit, schenkt regelmäßig etwas und lässt sich beim Friseur anpassen. Scheidung ist möglich, „hat jedoch seinen Preis“."},
  {g: "Soziales", t: "Kandidaten", d: ["Die Hexen sind als Partnerinnen möglich: Elowen, Bari, Lyselia und Areciel (Spieldaten und mehrere Guides). Heiraten kann sie nur Kliff (Game8, VICE, passend zu den Spieldaten; Pearl Abyss bestätigt das nicht). Dazu NPCs mit Herzsymbol. Flirten unter dem Maximum kostet je 10 Vertrauen (mehrere Guides); mehrere Romanzen, aber nur eine Ehe.", {v: "Oongka und Damiane brauchen erst einen Wohnsitz.", c: "unb", q: "Game8"}]},
  {g: "Soziales", t: "Romanze-Hotfixes", d: "2.04.02: Ehepartner folgte ins Wasser und verhielt sich im Kampf abnormal. 2.04.03: keine Geschenke nach der Hochzeit, Gegenstände wurden zurückgegeben statt übergeben, Mehrfachauswahl bei „Gift“. 2.04.04: Teile des Schenken-Menüs auf Koreanisch. 2.04.05: Quests für den Antrag ließen sich bei einigen Hexen nicht fortsetzen. 2.04.06: Rückfall zum Titelbildschirm beim Verschenken mehrerer Gegenstände."},
  {g: "Soziales", t: "Fest im Camp", d: ["Mission für ein Fest: NPCs mit genug Vertrauen besuchen das Camp, bestimmte Besucher lassen sich als Ehrengraumähnen anheuern.", {v: "Entsendung „Festival Preparations“ bei Ross im Camp: 3 Mitglieder, 18 Spielstunden, 13.000 Holz, 43.000 Nahrung, 35.000 Camp-Mittel; das Fest dauert danach 1 Tag 8 Stunden. Im Pailune-Camp vorher die Bauaufträge „Pond“ und „Insect Holders“ erledigen.", c: "unb", q: "Game8"}]},
  {g: "Soziales", t: "Würfelspiel", d: ["Neues Minispiel in Demeniss und Delesyia.", "Gespielt wird mit drei Würfeln: Es zählt die Summe der drei Augenzahlen, und wer die höchste Summe wirft, streicht den gesamten Einsatz ein (Spieltext).", {v: "Genaue Orte und Einsätze", c: "nb"}]},
  {g: "Soziales", t: "Legendäre Insekten", d: ["Drei neue legendäre Insekten samt eigenem Insektenlager.", {v: "Goldener Schmetterling (nahe einem Tempel mitten in einer zerklüfteten Felsregion), Goldener Prachtkäfer und Goldener Riesenkäfer (sehr selten, an Orten mit alter mystischer Energie).", c: "unb", q: "th.gl"}, {v: "Genaue Fundorte", c: "nb"}]},
  {g: "Soziales", t: "Friseur und Outfits", d: "Friseure in größeren Städten; das Graumähnen-Outfit wechselst du im Graumähnen-Verwaltungsbüro."}
];

// Hinweise im Ausruestungsblock (keine Waffen-/Ruestungszeilen; die stehen datengetrieben aus WEAPONS/ARMOR).
const DLC_GEAR_TOOLS = ["Frying Pan", "Ladle", "Frying Pan Lid", "Jar Lid", "Kitchen Knife"];
const DLC_GEAR_TOOLS_DE = {"Frying Pan": "Bratpfanne", "Ladle": "Schöpfkelle", "Frying Pan Lid": "Pfannendeckel", "Jar Lid": "Krugdeckel", "Kitchen Knife": "Küchenmesser"};
const DLC_GEAR_NOTES = [
  "Offiziell neu: Rüstungen, Waffen, Ausrüstung für Transportmittel und Haustiere sowie Abyss-Ausrüstung, ohne Einzelnamen. Alle Guides waren am 02.11.2026, drei Tage nach Release, ausdrücklich unvollständig; einzelne Seiten sind am 05.11.2026 nachgeprüft.",
  "Vorbesteller-Bonus: „Tauchanzug-Set des Entdeckers“ (Charter's Diving Set) für Kliff und Oongka, „Leichtes Tauchanzug-Set des Entdeckers“ (Charter's Light Diving Set) für Damiane; abholen über Pause, Others, Add-ons, Receive. Ohne Vorbestellung gibt es Tauchanzug-Teile bei Relikt-Händlern.",
  "Twitch-Drops Woche 1 (29.10. bis 04.11.2026, auch ohne DLC): Piratenschwert und Piraten-Augenklappe nach 120 Minuten Zuschauzeit. Bei Abholproblemen bleiben die Belohnungen von Woche 1 bis 11.11.2026, 23:59 UTC erhältlich."
];

// Seehandel-Waren, Wohnsitze, Relic-Haendler (Nachtlauf 01.11.2026; Felder siehe Dateikopf, leer = ausgeblendet)
const DLC_TRADE = [
  {name: "Packaged Red Seaweed Bundle", c: "unb", q: "th.gl", buy: "Insel-Handelsposten (Ludic), Insel Xamaca: 1.289 Camp-Mittel", sell: {v: "nicht belegt", c: "nb"}},
  {name: "Packaged Kelp Bundle", c: "unb", q: "th.gl", buy: "Insel-Handelsposten (Ludic), Insel Xamaca: 1.521 Camp-Mittel", sell: {v: "nicht belegt", c: "nb"}},
  {name: "Packaged Special Abalone", c: "unb", q: "th.gl", buy: "Insel-Handelsposten (Ludic), Insel Xamaca: 3.161 Camp-Mittel", sell: {v: "nicht belegt", c: "nb"}},
  {name: "Packaged Premium Mussels", c: "unb", q: "th.gl", buy: "Insel-Handelsposten (Killiian), Insel Satyros: 1.321 Camp-Mittel", sell: {v: "nicht belegt", c: "nb"}},
  {name: "Packaged Premium Sea Pineapples", c: "unb", q: "th.gl", buy: "Insel-Handelsposten (Killiian), Insel Satyros: 1.594 Camp-Mittel", sell: {v: "nicht belegt", c: "nb"}},
  {name: "Packaged Premium Scallops", c: "unb", q: "th.gl", buy: "Insel-Handelsposten (Killiian), Insel Satyros: 1.622 Camp-Mittel", sell: {v: "nicht belegt", c: "nb"}},
  {name: "Packaged Pearl Remembrance Lamp", c: "unb", q: "th.gl", buy: "Insel-Handelsposten (Harris), Insel Samora: 31.992 Camp-Mittel", sell: {v: "nicht belegt", c: "nb"}},
  {name: "Packaged Octopus-legged Candlestick", c: "unb", q: "th.gl", buy: "Insel-Handelsposten (Harris), Insel Samora: 10.397 Camp-Mittel", sell: {v: "nicht belegt", c: "nb"}},
  {name: "Packaged Blue Coral Lamp", c: "unb", q: "th.gl", buy: "Insel-Handelsposten (Harris), Insel Samora: 12.790 Camp-Mittel", sell: {v: "nicht belegt", c: "nb"}}
];
const DLC_HOMES = [
];
const DLC_RELIC_SHOPS = [
  {name: "Reyard", where: "Insel Auronui (Archäologe)", sells: ["Blaupause für das Atemgerät des Entdeckers", {v: "Preise in Uralten Relikten. Blaupausen Tauchhelm für Assistenten des Entdeckers und Suit (je 7), Rezept: Quallensalat (4), Alchemieformel: Luftis' minderes Elixier (6) und Luftis' Elixier (12), Vergessene Schatzkarten #22, #34 und #27 (2 bis 50), Schriftstück Gedanken über glänzendes Erz", c: "unb", q: "th.gl"}], unlock: [{v: "Nach „Auf in eine größere Welt“ und der Befreiung von Auronui, am Ankerplatz.", c: "unb", q: "Game8"}, {v: "Zwei Schatzkarten erst ab Vertrauen 100.", c: "unb", q: "th.gl"}]},
  {name: "Sulivan", where: "Hafen von Demeniss (Archäologe)", sells: ["Marine Charter's Diving Set, Blaupause für das Antriebs-Atemgerät", {v: "Preise in Uralten Relikten. Helm, Anzug, Handschuhe und Stiefel je normal und Light (5 bzw. 7), Propulsion-Blaupause 30, Vergessene Schatzkarten #9 und #26, Schriftstücke wie „Nahrung und Vorlieben des Mondfischs“", c: "unb", q: "th.gl"}], unlock: {v: "Schatzkarten erst ab Vertrauen 100.", c: "unb", q: "th.gl"}},
  {name: "Rafi", where: "Hafen Delesyia (Reliktsammler, „Relic Collector“)", sells: ["Möbel-Blaupausen", {v: "Preise in Uralten Relikten. Erhabener Teppich des Kapitäns, drei Ancient Runic Stone Sconces, Schiffsteil-Blaupausen (Galionsfigur des Langhorn-Fisches und Stern je 50, Großes Segel des Wogenwunsches 12), Alchemieformel: Lucaris' minderes Elixier und Lucaris' Elixier, Vergessene Schatzkarte #33, Schriftstücke", c: "unb", q: "th.gl"}], unlock: {v: "Schiffsteil-Blaupausen und Schatzkarte erst ab Vertrauen 100.", c: "unb", q: "th.gl"}},
  {name: "Cartaine", where: "Insel Samora (Archäologe der Samora-Ruinen)", sells: ["Beruf- und Haustier-Outfits", {v: "Preise in Uralten Relikten. Cook's, Architect's und Fisherman's Outfits (9 bis 20), Katzen- und Hunde-Outfits (nur mit passendem Haustier), Rezept: Flachnudeln mit Teppichmuscheln und Gegrillte Muscheln mit Käse, Alchemieformel: Fluvas minderes Elixier und Fluvas Elixier, Vergessene Schatzkarten #16 und #6", c: "unb", q: "th.gl"}], unlock: {v: "Schatzkarten erst ab Vertrauen 100.", c: "unb", q: "th.gl"}},
  {name: "Evander", where: "Insel Satyros (erforscht die Wandbilder der Satyrn)", sells: ["Abyss-Gear-Blaupausen und Haustierkleidung", {v: "Preise in Uralten Relikten. Gear Blueprints Writhebolt, Flugbahn des Glanzes, Stromüberlastung, Jagd der Giftzähne, Tobender Lebensodem und Echo des Sturms (22 bis 27), Scholastein- und Ludeon-Outfits für Katze und Hund, Vergessene Schatzkarten #37 und #38", c: "unb", q: "th.gl"}], unlock: {v: "Schatzkarten erst ab Vertrauen 100. Den Namen Evander bestätigen die Spieldaten (Archäologe, der die Wandbilder der Satyrn erforscht).", c: "unb", q: "th.gl"}}
];

// L Was noch offen ist
const DLC_OPEN = [
  "Waffen und Rüstung: Seit 05.11.2026 stehen 17 weitere Waffen, 16 Rüstungsteile und Oongkas Stirnreif aus den Spieldaten (Datensatz dlc_01) im Wiki. Der Fundort ist bei 12 dieser Waffen und 12 dieser Teile nicht belegt (Game8-Einzelseiten gibt es nur für 5 Waffen und 5 Rüstungsteile). Eine zweite Quelle für die Werte der übrigen DLC-Waffen und Rüstungsteile (bisher nur th.gl), Sockel und Charakter-Zuordnung der meisten DLC-Waffen, Zusatzeffekte der meisten neuen Rüstungsteile.",
  "Weitere Gegenstände: Neben der DLC-Ausrüstung stehen weitere Einträge in den Spieldaten (seit 05.11.2026 erfasst: Reittierrüstungen, Accessoires, Elixiere, Meeresgerichte, Meereskisten), bei vielen sind Fundort und damit die DLC-Zugehörigkeit nicht belegt.",
  "Void-Set: Das Wiki folgt jetzt der Spieldaten-Datenbank th.gl und GameRant („of Void“, z. B. „Plattenhelm der Leere“); Mobalytics schreibt „of the Void“. Zahlenwerte der Void-Teile stehen bisher nur bei th.gl, einen Set-Bonus nennt keine Quelle.",
  "Eine zweite Quelle für den Angriffswert des Lumen-Langschwerts (th.gl: 64 bei +10).",
  "Kosten und Dauer der Entsendung „Bau eines kleinen Segelschiffs“; welches Schiff „Schiffbau“ und „Bau eines großen Segelschiffs“ ergeben; wie man Medium und Großes Graumähnen-Segelschiff, Kommandoschiff des Ostens, Der trunkene Wels und das Marine-Segelschiff von Delesyia (L) bekommt (für Geisterschiff und Sturmschiff des Ostens gibt es je eine Quelle).",
  "Werte der Demenissian und Delesyian ships, Besatzungsplätze je Schiff, Kanonenwerte, Boni der Fair-Wind-Teile und der Blaupausen-Teile.",
  "Genaue Lage der Inseln auf der Karte (die Spieldaten nennen keine Koordinaten; nur für fünf Inseln gibt es Routenangaben einer Quelle) und die Inhalte von Phragma, Carcano, Saeon, Drangar und Spagnola; Lösungen der Schatzkarten.",
  "Wo und zu welchem Preis man die neuen Handelswaren verkauft (bei der Gegenprobe 05.11.2026 keine Quelle gefunden), Seerouten.",
  "Verfeinerungsstufen und Materialien des Tauchanzugs, Namen der Atem-Gerichte, Erhalt der A.T.A.G.-Meereserkundungsausrüstung (Namen bisher nur laut th.gl).",
  "Zähmmethode von Sea Turtle, Futter für den Sun Fish, Vertrauensschwellen außer beim Schläferrochen, Werte der Unterwasser-Reittiere.",
  "Belohnungen der Schritte von „Neubeginn jenseits der Wellen“, „Schild von Hernand“, „Neuer Elan“ und der vier ergänzten Piratenschiffe; die Schritte von „Erinnerung jenseits der Asche“; amtliche Reihenfolge der Romanze-Missionen; Reihenfolge und Voraussetzungen der Inselmissionen; die drei Piratenschiffe Crimson Shield, Vengeance und Faunus haben in den Spieldaten keinen Steckbrieftext.",
  "Ort von Panzer des Tanzenden Welses; zweite Quelle für die Bossnamen im Garten der Prüfungen.",
  "Dritte Burg aus der Feature-Übersicht, Ort von Burg Drachensturz, Ort der Schneiderei, Miete und Ertrag der Einrichtungen, die 17 Wohnsitze.",
  "Orte und Einsätze des Würfelspiels, Fundorte der drei legendären Insekten, vollständige Liste der Romanze-Kandidaten, Preis der Scheidung, Punktwerte auf der erweiterten Stufe, Wert eines Goldbarrens.",
  "Kampf-Alltagswerkzeuge (Bratpfanne und Co.): Fundort bzw. Erhalt, dazu eine zweite Quelle für Werte und Waffentyp (bisher nur th.gl).",
  "Ob die Twitch-Drop-Gegenstände nach dem Ende des Events (11.11.2026) noch auf anderem Weg erhältlich sind.",
  "Wirkung der neun Meeresgerichte (Hearty-Stufe) und Rezeptfundorte von sechs davon, Atemluft-Wert der Luftis-Elixiere, Formeln der drei Greater-Elixiere von Luftis, Fluva und Lucaris, Fundorte der neun neuen Accessoires, Fundorte der vier Reittierrüstungen."
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
  {t: "Hotfix 2.04.06", url: "https://crimsondesert.pearlabyss.com/en-US/News/Notice/Detail?_boardNo=150"},
  {t: "Hotfix 2.04.07", url: "https://crimsondesert.pearlabyss.com/en-US/News/Notice/Detail?_boardNo=151"},
  {t: "Patch 2.04.08", url: "https://crimsondesert.pearlabyss.com/en-US/News/Notice/Detail?_boardNo=152"},
  {t: "Patch 2.05.00", url: "https://crimsondesert.pearlabyss.com/en-US/News/Notice/Detail?_boardNo=157"},
  {t: "Game8 Schiffe", url: "https://game8.co/games/Crimson-Desert/archives/635788"},
  {t: "KeenGamer Phantom Ship", url: "https://www.keengamer.com/articles/guides/crimson-desert-how-to-get-the-legendary-phantom-ship/"},
  {t: "KeenGamer Assault Ship of the East", url: "https://www.keengamer.com/articles/guides/crimson-desert-how-to-get-the-legendary-assault-ship-of-the-east/"},
  {t: "KeenGamer Schiffsbau", url: "https://www.keengamer.com/articles/guides/crimson-desert-dlc-shipbuilding-guide-all-ships-and-upgrades/"},
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
  {name: "Bear Dverkhan Armor", kind: "Reittier-Ausrüstung", slot: "Rüstung für das Bärenreittier", char: "Bärenreittier", stats: [{v: "23 Angriff, 120 Verteidigung"}, {v: "600 Gesundheit", c: "unb", q: "nur Mobalytics"}], source: "Truhe in einer Höhle hinter einem Wasserfall auf Insel Samora (Mobalytics, geprüft 01.11.2026); das Item steht in den Spieldaten als Rüstung für spezielles Transportmittel (th.gl)", req: "Mit einem Stoßangriff durch den Wasserfall; ein Bärenreittier", q: "Angriff und Verteidigung laut Mobalytics und th.gl"},
  {name: "Explorer's Breathing Device", kind: "Taucher-Zubehör", slot: {v: "Rucksack", c: "unb", q: "Mobalytics"}, stats: {v: "Mehr maximales Atemvolumen und höheres Schwimmtempo, Zahlen nicht belegt", c: "unb", q: "Mobalytics"}, source: "Blaupause beim Relikt-Austausch-Händler Reyard auf Insel Auronui für 3 Uralte Relikte, danach herstellen (th.gl, GameRant, Mobalytics, geprüft 01.11.2026; den Preis nennt nur th.gl)", req: "Uralte Relikte; der Händler erscheint nach der Befreiung von Insel Auronui in „Auf in eine größere Welt“"},
  {name: "Propulsion Breathing Device", kind: "Taucher-Zubehör", stats: {v: "Verbesserung des Atemgeräts des Entdeckers: +600 Sekunden Atemvolumen, mehr Schwimmtempo und ein Unterwasser-Antrieb, der bei gehaltener Sprinttaste Ausdauer verbraucht", c: "unb", q: "Mobalytics, einzige Quelle"}, source: "Blaupause beim Relikt-Austausch-Händler Sulivan im Hafen von Demeniss für 30 Uralte Relikte; hergestellt wird es aus dem Atemgerät des Entdeckers (th.gl, GameRant, Mobalytics, geprüft 01.11.2026; den Preis nennt nur th.gl)", req: "Uralte Relikte und ein Atemgerät des Entdeckers", q: "Name laut th.gl und GameRant; Mobalytics schreibt Propulsion-Type Breathing Device"},
  {name: "Enhanced Propulsion Breathing Device", kind: "Taucher-Zubehör", stats: {v: "Weiterentwicklung des Antriebs-Atemgeräts: größerer Sauerstoffvorrat für längere Tauchzeit, Schubdüsen an beiden Flügelspitzen erhöhen das Schwimmtempo (Itembeschreibung), Zahlen nicht belegt", c: "unb", q: "th.gl Spieldaten, geprüft 05.11.2026"}, source: "Wird aus dem Antriebs-Atemgerät hergestellt (th.gl, geprüft 01.11.2026); Rezept und Blaupause nicht belegt", c: "unb", q: "th.gl Spieldaten, einzige Quelle"},
  {name: "Charter Assistant's Diving Helm und Diving Suit (Blaupausen)", kind: "Taucher-Zubehör", source: "Je eine Blaupause beim Relikt-Austausch-Händler Reyard auf Insel Auronui für 7 Uralte Relikte (th.gl, geprüft 01.11.2026)", stats: {v: "Werte und Material nicht belegt", c: "nb"}, c: "unb", q: "th.gl Spieldaten, einzige Quelle"},
  {name: "A.T.A.G. Marine Exploration Plating, Pack und Feet", kind: "Taucher-Zubehör (A.T.A.G.)", slot: "A.T.A.G.-Rüstung, -Rucksack und -Füße", stats: [{v: "Mit dieser Meereserkundungsausrüstung kann der A.T.A.G. unter Wasser eingesetzt werden und tauchen (Pearl Abyss, Patch-Notes 2.04.00)", c: "ok"}, {v: "je 80 Verteidigung", c: "unb", q: "th.gl Spieldaten"}], source: {v: "Erhalt und Rezept nicht belegt", c: "nb"}, c: "unb", q: "Namen laut th.gl (Spieldaten), Existenz offiziell"},
  {name: "Wagen-Laderäume (Cargo Hold)", kind: "Wagenausrüstung", slot: "Laderaum", stats: "Wandering Merchant's, Meticulous Carpenter's, Seasoned Comrade's, Rugged Traveler's, The Laughing Marionette's, Renowned Magnate's, Elegant Noble's und Frachtraum der Adelsdelegation; alle auch herstellbar", source: "Wagon Workshop in Hernand (Wandering Merchant's, 800 Kupfer), Pailune (Meticulous Carpenter's, 2.500 Kupfer) und Demeniss (The Laughing Marionette's, 4.000 Kupfer); die übrigen nur per Herstellung (th.gl, geprüft 01.11.2026)", req: "Neue Wagenwerkstatt laut Patch-Notes 2.04.00", c: "unb", q: "Namen und Preise laut th.gl Spieldaten; die Wagenausrüstung selbst ist offiziell"},
  {name: "Wagen-Kutschbock (Wagon Seat)", kind: "Wagenausrüstung", slot: "Kutschbock", stats: "Meticulous Carpenter's, The Laughing Marionette's, Seasoned Comrade's, Noble Delegation's, Wandering Merchant's, Renowned Magnate's, Eccentric Doctor's, Eccentric Lord's und Kutschbock des alten Adels; alle auch herstellbar", source: "Wagon Workshop in Hernand (Seasoned Comrade's, 750 Kupfer), Pailune (Meticulous Carpenter's, 2.300 Kupfer) und Demeniss (The Laughing Marionette's, 4.000 Kupfer); die übrigen nur per Herstellung (th.gl, geprüft 01.11.2026)", c: "unb", q: "th.gl Spieldaten, einzige Quelle"},
  {name: "Wagenräder (Wheel)", kind: "Wagenausrüstung", slot: "Räder", stats: "Seasoned Comrade's, Meticulous Carpenter's, The Laughing Marionette's, Renowned Magnate's, Wandering Merchant's, Elegant Noble's und Rad der Adelsdelegation; alle auch herstellbar", source: "Wagon Workshop in Hernand (Seasoned Comrade's, 600 Kupfer), Pailune (Meticulous Carpenter's, 2.000 Kupfer) und Demeniss (The Laughing Marionette's, 3.500 Kupfer); die übrigen nur per Herstellung (th.gl, geprüft 01.11.2026)", c: "unb", q: "th.gl Spieldaten, einzige Quelle"},
  {name: "Wagon Lantern", kind: "Wagenausrüstung", slot: "Wagenlaterne", source: "Nur per Herstellung (th.gl, geprüft 01.11.2026)", stats: {v: "Leuchtet die Straße vor dem Wagen hell aus, auch auf dunklen Wegen (Itembeschreibung), Zahlen nicht belegt", c: "unb", q: "th.gl Spieldaten, geprüft 05.11.2026"}, c: "unb", q: "th.gl Spieldaten, einzige Quelle"},
  {name: "Skyway Rocket Pack", kind: "Ausrüstung (Rucksack)", char: "Oongka (laut Itembeschreibung kann ihn kaum ein anderer Graumähne bändigen)", slot: "Rucksack", source: "Belohnung der Quest „Ungeschickte Hände, fester Wille“ in Oongkas Reihe „Geschmiedete Entschlossenheit“ (th.gl, geprüft 01.11.2026); verbesserte Fassung des Kuku-Raketenrucksacks", stats: {v: "Mehr Schub als der Kuku-Raketenrucksack, Zahlen nicht belegt", c: "unb", q: "Itembeschreibung laut th.gl"}, c: "unb", q: "th.gl Spieldaten, einzige Quelle"},
  {name: "Pirate Eyepatch", kind: "Ausrüstung (Twitch-Drop)", slot: {v: "Brille", c: "unb", q: "th.gl Spieldaten"}, source: "Twitch-Drop Woche 1 (29.10.2026 22:00 UTC bis 04.11.2026 23:59 UTC; bei Abholproblemen bis 11.11.2026 23:59 UTC erhältlich) nach 120 Minuten Zuschauzeit, zusammen mit dem Piratenschwert (Pearl-Abyss-Drops-Seite und Notice 136, geprüft 01.11.2026)", req: "Eine Crimson Desert Edition genügt, der DLC ist nicht nötig; Steam direkt im Spiel, PlayStation, Xbox und Epic per Code", stats: {v: "Werte nicht belegt", c: "nb"}},
  {name: "Oongka's Circlet", de: "Oongkas Stirnreif", kind: "Ausrüstung (Brille)", slot: {v: "Brille", c: "unb", q: "th.gl Spieldaten"}, char: "Oongka (laut Itemname)", source: "Laut Spieltext ein Geschenk von Meister Du; Quest und Fundort nicht belegt (Spieldaten dlc_01 und th.gl geprüft 05.11.2026)", stats: {v: "Spieltext: Der Stirnreif enthält die Kraft, die Meister Du in langem asketischem Training gesammelt hat; entfesselt löst er eine Reihe blendender Lichtexplosionen aus, die alles vor dem Träger in Brand setzen. Zahlenwerte nicht belegt (th.gl führt Tier 5 und keine Werte)", c: "unb", q: "Spieldaten, einzige Quelle"}, c: "unb", q: "Spieldaten (dlc_01) und th.gl, einzige Quellen"},
  {name: "Pirate Lantern", kind: "Werkzeug (Laterne)", source: "Twitch-Drop Woche 1 (bei Abholproblemen bis 11.11.2026 23:59 UTC erhältlich) nach 60 Minuten Zuschauzeit, zusammen mit Gedünstetes Fleisch x10 (Pearl-Abyss-Drops-Seite und Notice 136, geprüft 01.11.2026)", req: "Eine Crimson Desert Edition genügt, der DLC ist nicht nötig", stats: {v: "Dekorative Laterne aus Metall und gelbem Glas mit sanftem Licht (Itembeschreibung), keine Werte in den Spieldaten", c: "unb", q: "th.gl Spieldaten, geprüft 05.11.2026"}},
  {name: "Parrot Pirate Hat", kind: "Haustier-Ausrüstung", slot: {v: "Haustier-Kopfschmuck (Haustierhelm) für den Pet Parrot", c: "unb", q: "th.gl Spieldaten"}, source: "Twitch-Drop Woche 1 (bei Abholproblemen bis 11.11.2026 23:59 UTC erhältlich) nach 180 Minuten Zuschauzeit, zusammen mit dem Pet Parrot (Pearl-Abyss-Drops-Seite und Notice 136, geprüft 01.11.2026)", req: "Eine Crimson Desert Edition genügt, der DLC ist nicht nötig", stats: {v: "Werte nicht belegt", c: "nb"}},
  {name: "Haustier-Outfits bei Cartaine (Cook's, Worker's, Fishing)", kind: "Haustier-Ausrüstung", char: "Katze (Feline) und Hund (Canine)", stats: "Feline/Kochmütze für Hunde und Outfit, Feline/Arbeitsmütze für Hunde und Outfit, Feline/Anglerhut für Hunde und Outfit", source: "Relikt-Austausch-Händler Cartaine auf Insel Samora: Hut 5, Outfit 9 Uralte Relikte (th.gl, geprüft 01.11.2026; dass Cartaine Katzen- und Hunde-Outfits führt, sagen auch GameRant und Mobalytics)", req: "Wird erst angeboten, wenn man ein passendes Haustier hat", c: "unb", q: "Einzelnamen und Preise nur laut th.gl"},
  {name: "Haustier-Outfits bei Evander (Scholastone, Ludeon)", kind: "Haustier-Ausrüstung", char: "Katze (Feline) und Hund (Canine)", stats: "Feline/Scholastein-Ehrengelehrtenmütze für Hunde und Outfit, Feline/Ludeon-Plattenhelm für Hunde und Outfit", source: "Relikt-Austausch-Händler Evander auf Insel Satyros: Scholastein-Gelehrtenhut 5 und Outfit 9, Ludeon Hat 7 und Outfit 12 Uralte Relikte (th.gl, geprüft 01.11.2026; Haustierkleidung bei diesem Händler nennen auch GameRant und Mobalytics)", req: "Wird erst angeboten, wenn man ein passendes Haustier hat", c: "unb", q: "Einzelnamen und Preise nur laut th.gl"},
  {name: "Feline und Canine Charter's Diving Helm und Suit", kind: "Haustier-Ausrüstung", char: "Katze (Feline) und Hund (Canine)", source: "Nur per Herstellung (th.gl, geprüft 01.11.2026); Blaupause nicht belegt. Laut Patch 2.05.00 (13.11.2026) lassen sich Tauchhelm und Tauchanzug des Entdeckers (Hunde) jetzt an der Werkbank herstellen (offizielle Patch-Notizen)", stats: {v: "Werte nicht belegt", c: "nb"}, c: "unb", q: "th.gl Spieldaten, einzige Quelle"},
  {name: "Solar Transference", kind: "Abyss-Ausrüstung (vorgesockelt)", slot: "Im Lumen-Schwert", source: "Im Lumen-Schwert vorgesockelt (Game8, geprüft 01.11.2026); als Abyss-Ausrüstung auch in den Spieldaten (th.gl)", stats: {v: "Effekt nicht belegt", c: "nb"}},
  {name: "Ascended Incarnate", kind: "Abyss-Ausrüstung (Questbelohnung)", stats: {v: "Eine Erscheinung von T'rukan führt einen verheerenden Schlag mit Bonusschaden aus", c: "unb", q: "th.gl Spieldaten"}, source: "Boss T'rukan in der Arena im Schlangenmoor, Quest „Wegweisende Lehren“ in Kliffs Reihe „Jenseits der Ränder“ (Game8, Sportskeeda, th.gl, geprüft 01.11.2026)", req: "Kliffs DLC-Reihe nach der Hauptquest „Ende der Reise“", slot: {v: "nicht belegt", c: "nb"}},
  {name: "Revelation's End", kind: "Abyss-Ausrüstung (Questbelohnung)", stats: {v: "Beschwört einen riesigen, von böser Macht erfüllten Hammer und schmettert ihn auf den Gegner", c: "unb", q: "th.gl Spieldaten"}, source: "Boss Kharzek, Antumbra-Archon, im Silent Burial Ground, Quest „Der Drahtzieher“ in Kliffs Reihe „Jenseits der Ränder“, dazu 1 Abyss-Artefakt (Game8, Sportskeeda, th.gl, geprüft 01.11.2026)", req: "Kliffs DLC-Reihe nach der Hauptquest „Ende der Reise“", slot: {v: "nicht belegt", c: "nb"}},
  {name: "Ashen Blitz", kind: "Abyss-Ausrüstung (Questbelohnung)", stats: {v: "Entfesselt augenblicklich rohe Kraft und trifft Gegner mit einem verheerenden Schlag", c: "unb", q: "th.gl Spieldaten"}, source: "Quest „Einen Schatten werfen“ in Damianes Reihe „Aus der Asche“ (Boss Pyromane Geago), dazu 1 Abyss-Artefakt (Game8, th.gl, geprüft 01.11.2026)", req: "Damianes DLC-Reihe nach der Hauptquest „Ende der Reise“", slot: {v: "nicht belegt", c: "nb"}},
  {name: "Storm's Echo", kind: "Abyss-Ausrüstung (Questbelohnung)", stats: {v: "Beschwört einen durchdringenden Sturmwind, der Gegner wegbläst", c: "unb", q: "th.gl Spieldaten"}, source: "Quest „Verdrehtes Schicksal“ in Oongkas Reihe „Geschmiedete Entschlossenheit“ (th.gl, geprüft 01.11.2026); Ausrüstungs-Blaupause auch bei Evander (Relikt-Austausch, Insel Satyros) für 27 Uralte Relikte (th.gl)", req: "Oongkas DLC-Reihe nach der Hauptquest „Ende der Reise“", slot: {v: "nicht belegt", c: "nb"}, c: "unb", q: "Name strittig: th.gl Storm's Echo, Game8 Storm Echo"},
  {name: "Radiant Flash", kind: "Abyss-Ausrüstung (Questbelohnung)", stats: {v: "Erzeugt einen grellen Lichtblitz, der Gegner verletzt", c: "unb", q: "th.gl Spieldaten"}, source: "Quest „Ein mysteriöser Angriff“ in Oongkas Reihe „Geschmiedete Entschlossenheit“ (th.gl; Game8 nennt Flugbahn des Glanzes in der Belohnungsliste der Reihe, geprüft 01.11.2026); Ausrüstungs-Blaupause auch bei Evander (Insel Satyros) für 27 Uralte Relikte (th.gl)", req: "Oongkas DLC-Reihe nach der Hauptquest „Ende der Reise“", slot: {v: "nicht belegt", c: "nb"}},
  {name: "Mirage Cascade", kind: "Abyss-Ausrüstung (Questbelohnung)", stats: {v: "Eine Fata Morgana trifft Gegner auf einer sternförmigen Bahn mit einem unablässigen Hagel von Angriffen", c: "unb", q: "th.gl Spieldaten"}, source: "Quest „Der Rachegeist, der durch das Meer treibt“ (Reihe Höhle der Trauer), zusammen mit der Marineoffiziersrüstung (th.gl, geprüft 01.11.2026)", slot: {v: "nicht belegt", c: "nb"}, c: "unb", q: "th.gl Spieldaten, einzige Quelle"},
  {name: "Unfurled Feathers", kind: "Abyss-Ausrüstung (Questbelohnung)", stats: {v: "Verschießt sich teilende Federn, deren Schaden auf nahe Gegner überspringt", c: "unb", q: "th.gl Spieldaten"}, source: "Quest „Unstillbarer Hunger“ (Reihe Prädator der verlassenen Insel), dazu Abyss-Artefakt und 5 Uralte Relikte (th.gl, geprüft 01.11.2026)", slot: {v: "nicht belegt", c: "nb"}, c: "unb", q: "th.gl Spieldaten, einzige Quelle"},
  {name: "Guardian's Gaze", kind: "Abyss-Ausrüstung (Questbelohnung)", stats: {v: "Feuert einen Wächterstrahl auf Gegner", c: "unb", q: "th.gl Spieldaten"}, source: "Quest „Uralte Katastrophe“ (Reihe Nebelmeer), dazu Abyss-Artefakt und 20 Uralte Relikte (th.gl, geprüft 01.11.2026)", slot: {v: "nicht belegt", c: "nb"}, c: "unb", q: "th.gl Spieldaten, einzige Quelle"},
  {name: "Trial by Fire", kind: "Abyss-Ausrüstung (Questbelohnung)", stats: {v: "Verschießt zielsuchende Projektile, die jeden getroffenen Gegner verletzen", c: "unb", q: "th.gl Spieldaten"}, source: "Quest „Das Inseldorf auf dem Meer“ (Reihe Die abgelegene Insel), dazu Abyss-Artefakt und 5 Uralte Relikte (th.gl, geprüft 01.11.2026)", slot: {v: "nicht belegt", c: "nb"}, c: "unb", q: "th.gl Spieldaten, einzige Quelle"},
  {name: "Writhebolt", kind: "Abyss-Ausrüstung (Blaupause)", stats: {v: "Ein Klingenschwung, der allen Gegnern im Umkreis Blitzschaden zufügt", c: "unb", q: "th.gl Spieldaten"}, source: "Ausrüstungs-Blaupause beim Relikt-Austausch-Händler Evander auf Insel Satyros für 24 Uralte Relikte, danach herstellen (th.gl, geprüft 01.11.2026; Abyss-Gear-Blaupausen bei diesem Händler nennen auch GameRant und Mobalytics)", slot: {v: "nicht belegt", c: "nb"}, c: "unb", q: "Name, Effekt und Preis nur laut th.gl"},
  {name: "Power Overload", kind: "Abyss-Ausrüstung (Blaupause)", stats: {v: "Erzeugt ein sich ständig ausdehnendes elektrisches Feld, das Gegner darin verletzt", c: "unb", q: "th.gl Spieldaten"}, source: "Ausrüstungs-Blaupause bei Evander (Relikt-Austausch, Insel Satyros) für 22 Uralte Relikte, danach herstellen (th.gl, geprüft 01.11.2026)", slot: {v: "nicht belegt", c: "nb"}, c: "unb", q: "Name, Effekt und Preis nur laut th.gl"},
  {name: "Venomous Fangs", kind: "Abyss-Ausrüstung (Blaupause)", stats: {v: "Setzt einen Giftnebel frei, der Gegner verfolgt und Giftschaden verursacht", c: "unb", q: "th.gl Spieldaten"}, source: "Ausrüstungs-Blaupause bei Evander (Relikt-Austausch, Insel Satyros) für 24 Uralte Relikte, danach herstellen (th.gl, geprüft 01.11.2026)", slot: {v: "nicht belegt", c: "nb"}, c: "unb", q: "Name, Effekt und Preis nur laut th.gl"},
  {name: "Rushing Wind", kind: "Abyss-Ausrüstung (Blaupause)", stats: {v: "Feuert eine Windkugel, die Gegner verfolgt und Schaden verursacht", c: "unb", q: "th.gl Spieldaten"}, source: "Ausrüstungs-Blaupause bei Evander (Relikt-Austausch, Insel Satyros) für 22 Uralte Relikte, danach herstellen (th.gl, geprüft 01.11.2026)", slot: {v: "nicht belegt", c: "nb"}, c: "unb", q: "Name, Effekt und Preis nur laut th.gl"},
  {name: "Beldrak Warthog Armor", de: "Beldrak-Warzenschweinrüstung", kind: "Reittier-Ausrüstung", slot: "Rüstung für das Warzenschwein-Reittier", char: "Warzenschwein-Reittier", stats: {v: "23 Angriff, 120 Verteidigung, 600 Gesundheit", c: "unb", q: "th.gl Spieldaten"}, source: {v: "Fundort nicht belegt. Steht in den Spieldaten als Rüstung für spezielles Transportmittel (Itemwert 5.000), Plattenrüstung für ein Warzenschwein (Itembeschreibung) (th.gl, geprüft 05.11.2026)", c: "unb", q: "th.gl Spieldaten"}, req: {v: "Ob der Gegenstand zum DLC gehört, ist nicht belegt; die Spieldatei liegt im DLC-Teil der Spieldaten", c: "unb", q: "Spieldaten"}, c: "unb", q: "Werte und Existenz nur laut th.gl, einzige Quelle"},
  {name: "Ibex Shadowleaf Armor", de: "Steinbock-Schattenblattrüstung", kind: "Reittier-Ausrüstung", slot: "Rüstung für das Steinbock-Reittier", char: "Steinbock-Reittier", stats: {v: "23 Angriff, 120 Verteidigung, 600 Gesundheit", c: "unb", q: "th.gl Spieldaten"}, source: {v: "Fundort nicht belegt. Steht in den Spieldaten als Rüstung für spezielles Transportmittel (Itemwert 8.500), aus ineinandergeflochtener Rinde, die zwischen Bäumen tarnt (Itembeschreibung) (th.gl, geprüft 05.11.2026)", c: "unb", q: "th.gl Spieldaten"}, req: {v: "Ob der Gegenstand zum DLC gehört, ist nicht belegt; die Spieldatei liegt im DLC-Teil der Spieldaten", c: "unb", q: "Spieldaten"}, c: "unb", q: "Werte und Existenz nur laut th.gl, einzige Quelle"},
  {name: "Pororin Petal Deer Saddle", de: "Pororin-Blütenhirschsattel", kind: "Reittier-Ausrüstung", slot: "Rüstung für das Hirsch-Reittier", char: "Hirsch-Reittier", stats: {v: "23 Angriff, 120 Verteidigung, 600 Gesundheit", c: "unb", q: "th.gl Spieldaten"}, source: {v: "Fundort nicht belegt. Steht in den Spieldaten als Rüstung für spezielles Transportmittel (Itemwert 4.800), Sattel mit Blumenschmuck um Geweih und Brust (Itembeschreibung) (th.gl, geprüft 05.11.2026)", c: "unb", q: "th.gl Spieldaten"}, req: {v: "Ob der Gegenstand zum DLC gehört, ist nicht belegt; die Spieldatei liegt im DLC-Teil der Spieldaten", c: "unb", q: "Spieldaten"}, c: "unb", q: "Werte und Existenz nur laut th.gl, einzige Quelle"},
  {name: "Brynndor Wolf Armor", de: "Brynndor-Wolfsrüstung", kind: "Reittier-Ausrüstung", slot: "Rüstung für das Wolf-Reittier", char: "Wolf-Reittier", stats: {v: "23 Angriff, 120 Verteidigung, 600 Gesundheit", c: "unb", q: "th.gl Spieldaten"}, source: {v: "Fundort nicht belegt. Steht in den Spieldaten als Rüstung für spezielles Transportmittel (Itemwert 5.000), Lederrüstung, auf einen Wolf zugeschnitten (Itembeschreibung) (th.gl, geprüft 05.11.2026)", c: "unb", q: "th.gl Spieldaten"}, req: {v: "Ob der Gegenstand zum DLC gehört, ist nicht belegt; die Spieldatei liegt im DLC-Teil der Spieldaten", c: "unb", q: "Spieldaten"}, c: "unb", q: "Werte und Existenz nur laut th.gl, einzige Quelle"},
  {name: "Machine Gun Pack", de: "Maschinengewehr-Rucksack", kind: "Ausrüstung (Rucksack)", slot: "Rucksack", stats: {v: "Kampfrucksack mit eingebautem Maschinengewehr und Munitionssystem auf einem Metallrahmen, so ist man auch unterwegs schnell kampfbereit (Itembeschreibung), Zahlen nicht belegt", c: "unb", q: "th.gl Spieldaten, geprüft 05.11.2026"}, source: {v: "Fundort nicht belegt. Laut th.gl dient er zum Herstellen des Kuku-Rucksacks (Stufe 3)", c: "unb", q: "th.gl Spieldaten"}, c: "unb", q: "th.gl Spieldaten, einzige Quelle"},
  {name: "Binoculars", de: "Tragbares Fernglas", kind: "Werkzeug (Fernglas)", stats: {v: "Erweitert das Sichtfeld, um Gefahren und Hinweise in der Ferne früh zu erkennen (Itembeschreibung)", c: "unb", q: "th.gl Spieldaten, geprüft 05.11.2026"}, source: {v: "Fundort nicht belegt. Steht bei th.gl unter Proviant und Sonstiges", c: "nb"}, req: {v: "Ob das Fernglas zum DLC gehört, ist nicht belegt; die Itemnummer liegt im Bereich der Basisspiel-Patches. Das Spiel hat dafür kein Icon.", c: "unb", q: "Spieldaten"}, c: "unb", q: "th.gl Spieldaten, einzige Quelle"},
  {name: "Wooden Roller Mop", de: "Holz-Geweberolle-Nudelholz", kind: "Werkzeug (Haushalt)", slot: {v: "Wischmopp (Mop)", c: "unb", q: "th.gl Spieldaten"}, stats: {v: "Putzwerkzeug zum Wischen des Bodens mit einer Stoffrolle (Itembeschreibung), keine Werte in den Spieldaten", c: "unb", q: "th.gl Spieldaten, geprüft 05.11.2026"}, source: {v: "Fundort nicht belegt", c: "nb"}, c: "unb", q: "th.gl Spieldaten, einzige Quelle"},
  {name: "Giant Jellyfish Skin", de: "Haut der Riesen-Qualle", kind: "Material (Abyss-Ausrüstung und Schiffsteile)", stats: {v: "Durchscheinende Haut einer Riesen-Qualle. Zutat für die meisten neuen Abyss-Gear-Blaupausen (u. a. Bebender Blitz, Flugbahn des Glanzes, Jagd der Giftzähne, Tobender Lebensodem, Echo des Sturms) und für Piratensegel; Itemwert 3.000", c: "unb", q: "th.gl Spieldaten, geprüft 05.11.2026"}, source: {v: "Fundort nicht belegt", c: "nb"}, c: "unb", q: "th.gl Spieldaten, einzige Quelle"},
  {name: "Honeycomb Grouper", de: "Honigwaben-Zackenbarsch", kind: "Zutat (Meeresfisch)", stats: {v: "Meeresfisch mit wabenförmigem Muster, wegen seines feinen, dezent süßlichen Geschmacks begehrt (Itembeschreibung). Zutat für viele Hearty-Fischgerichte, Itemwert 19.200", c: "unb", q: "th.gl Spieldaten, geprüft 05.11.2026"}, source: {v: "Fundort nicht belegt. Das Spiel hat dafür kein Icon", c: "nb"}, c: "unb", q: "th.gl Spieldaten, einzige Quelle"},
  {name: "The Sea's Treasures (zwölf Kisten und Collection)", de: "Schätze der See", kind: "Beute-Behälter (Meer)", stats: {v: "Die Kiste „Collection“ enthält alle zwölf Teilkisten zu je 100 %: Zutaten, Fiber, Crafted Ornaments, Meat, Spices, Processed Foods, Delicacies, Premium Goods, Luxury Goods, Artwork, Armor und Munitions. Beispiel Zutaten: Mehl, Fein gemahlenes Salz, Gut gereifter Käse, Kiefernharz", c: "unb", q: "th.gl Spieldaten, geprüft 05.11.2026"}, source: {v: "Kann beim Erkunden des Meeres gefunden werden (Itembeschreibung); genauer Ort nicht belegt", c: "unb", q: "Spieldaten"}, c: "unb", q: "th.gl Spieldaten, einzige Quelle"},
  {name: "Rare Ocean Relic", de: "Seltenes Relikt des Meeres", kind: "Beute-Behälter (Meer)", stats: {v: "Inhalt mit Menge und Drop-Rate: Glänzendes Erz 5 bis 7, 50 %; Malachit 2 bis 4, 20 %; Silberbeutel 2 bis 4, 16 %; Mangan 2 bis 3, 5 %; Hydrothermale Erzlagerstätte 1 bis 2, 2 %; Obsidian 1 bis 2, 2 %; Goldene Koralle 1 bis 2, 2 %; Ambra 1 bis 2, 1 %; Weichkoralle 1 bis 2, 1 %; Naturperle 1, 1 %. Zu Malachit, Glänzendem Erz und Manganknolle siehe Materialien & Items, Bereich Meeresmaterial", c: "unb", q: "gaming.tools (Spielversion 2.04.00) für Mengen und Raten, th.gl für den Inhalt, geprüft 05.11.2026"}, source: {v: "Kann beim Erkunden des Meeres gefunden werden (Itembeschreibung); genauer Ort nicht belegt", c: "unb", q: "Spieldaten"}, c: "unb", q: "th.gl und gaming.tools (Datenbanken, nicht unabhängig)"},
  {name: "Pirate's Loot", de: "Beute der Piraten", kind: "Beute-Behälter (Meer)", stats: {v: "Inhalt: Silberbeutel und Blaupausen für Piratensegel (Piratenbanden-Segel, Siren's Cry, Sea Claw, Death Blossom, Sea's Vengeance, Black Bloom, Crimson Shield, Vengeance und weitere)", c: "unb", q: "th.gl Spieldaten, geprüft 05.11.2026"}, source: {v: "Wird durch das Besiegen eines Piratenschiffs erhalten (Itembeschreibung)", c: "unb", q: "Spieldaten"}, c: "unb", q: "th.gl Spieldaten, einzige Quelle"}
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
  // 02.11.2026: Pirate Lantern (Icon aus dem Itemdatensatz), drei Schiffsteile (Medium-Variante, passend zu die Blaupausen),
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
  "Sea Turtle":"cd_assets/dlc/mount-sea-turtle.webp",
  "Dolphin":"cd_assets/dlc/mount-dolphin.webp",
  "Pink Dolphin":"cd_assets/dlc/mount-pink-dolphin.webp",
  "Manta Ray":"cd_assets/dlc/mount-manta-ray.webp",
  "Pink Manta Ray":"cd_assets/dlc/mount-pink-manta-ray.webp",
  "Spotted Seal":"cd_assets/dlc/mount-spotted-seal.webp",
  "Hammerhead Shark":"cd_assets/dlc/mount-hammerhead-shark.webp",
  "Eagle Ray":"cd_assets/dlc/mount-eagle-ray.webp",
  "Beldrak Warthog Armor":"cd_assets/dlc/item-1004407.webp",
  "Ibex Shadowleaf Armor":"cd_assets/dlc/item-1004429.webp",
  "Pororin Petal Deer Saddle":"cd_assets/dlc/item-1004501.webp",
  "Brynndor Wolf Armor":"cd_assets/dlc/item-1004878.webp",
  "Machine Gun Pack":"cd_assets/dlc/item-1005304.webp",
  "Wooden Roller Mop":"cd_assets/dlc/item-1004911.webp",
  "Giant Jellyfish Skin":"cd_assets/dlc/item-1006282.webp"
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
// 05.11.2026: vier weitere Steckbriefe (The Sea's Vengeance, The Death Blossom, The Sea Claw, The Drunken Catfish), Textur cd_t0000_boardpaper_0387/0388/0390/0391 (dlc_01, schiffe-roh-png), gleiche Aufbereitung (512 px, WebP).
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
  "Pirate Ship: The Black Curved Blade":"cd_assets/dlc/pirate-black-curved-blade.webp",
  "Pirate Ship: The Sea's Vengeance":"cd_assets/dlc/pirate-sea-vengeance.webp",
  "Pirate Ship: The Death Blossom":"cd_assets/dlc/pirate-death-blossom.webp",
  "Pirate Ship: The Sea Claw":"cd_assets/dlc/pirate-sea-claw.webp",
  "Pirate Ship: The Drunken Catfish":"cd_assets/dlc/pirate-drunken-catfish.webp"
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
