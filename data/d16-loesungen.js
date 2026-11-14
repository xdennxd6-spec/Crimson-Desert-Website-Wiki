// d16-loesungen.js: Lösungsabschnitte für einzelne Quests, Orte, Items (Lauf quest-loesungen, 14.11.2026)
// Datenmodell und Einhängen in die App: data/d16-loesungen-app.js (Kopfkommentar), SEO-Fassung: scripts/seo-parts/_loesungen.mjs.
// Eintrag: { slug, de, en, art:"quest"|"ort"|"item"|"skill"|"thema", sec, ziel, tab?, kurz, voraussetzung:[...],
//   schritte:[{t,d,conf?}], belohnung:[...], hinweise:[{kind:"info"|"warn"|"miss", txt}], suchbegriffe:[...],
//   quellen:[{t,url,datum}], conf:"belegt"|"einzelquelle", seo:{seite, h3}, links?:[{sec, ziel, wo?}], abgrenzung?,
//   abgrenzungLink?:{sec, go?, text, seite?}, ort? (nur bei ziel:null) }
// Keine Kommentare mit Anführungszeichen oder Apostroph innerhalb der beiden Blöcke (gen-seo liest die Arrays per Klammerzählung).
const LOESUNGEN_PFLICHT = [
/* LOES-PFLICHT Anfang */
{slug:"der-weg-jenseits-des-sandsturms", de:"Der Weg jenseits des Sandsturms", en:"Beyond the Sandstorm", art:"quest",
 sec:"dlc-quests", ziel:"dlc-q-beyond-the-margins",
 kurz:"Sechster Schritt von Kliffs DLC-Reihe Jenseits der Ränder. Sobald die Hexen des Ostens die Sandsturmbarriere geöffnet haben, findest du dich an den Lichtstrahlen der Wegsteine durch den Sturm, erledigst fünf Aufgaben und gibst sie bei Sebastian ab.",
 voraussetzung:["Hauptquest Ende der Reise abgeschlossen (damit startet die Reihe Jenseits der Ränder)","Schritt Die Hexen des Ostens erledigt: die Hexen öffnen die Sandsturmbarriere","Die Fähigkeiten Licht reflektieren und Macht des Axioms"],
 schritte:[
  {t:"Durch den Sandsturm finden",d:"Im Sandsturm zeigt die Karte fast nichts an. Folge den Lichtstrahlen zwischen den Wegsteinen (Marker Stones) und wirf Glänzende Samen, um schon gegangene Strecken zu markieren."},
  {t:"Die fünf Aufgaben",d:"Das Questziel verlangt fünf Teilaufgaben, die laut Spieldaten gleichzeitig offen sind: Vom Sand verhüllte Nachbarn, Das verirrte Kind, Die Gruppe, die nicht zurückkehrte, Von Dunkelheit verschlungenes Dorf und Verzerrter Lichtstrahl."},
  {t:"Vom Sand verhüllte Nachbarn",d:"Sprich in Lukumiya den Dorfbewohner an und geh nach Maddin. Hol dort beim Bewohner die Medizin und bring sie zum Dorfbewohner am Brunnen in Lukumiya."},
  {t:"Das verirrte Kind",d:"Das weinende Kind wartet am Wegstein östlich von Maddin. Markiere zuerst mit Glänzenden Samen den Weg nach Faraj und führ das Kind dann dorthin. Geh gleichmäßig und warte, bis es aufgeschlossen hat."},
  {t:"Die Gruppe, die nicht zurückkehrte",d:"Sprich in Hazran den Bewohner am Baum an. Steck die Waffen weg und schalte die Laterne ein, sie zeigt die Spur des Kalbs. Besiege die Gegner bei den Ruinen und trag das Kalb nach Hazran zurück."},
  {t:"Von Dunkelheit verschlungenes Dorf",d:"Geh ins Dorf Yasmin, das Antumbra-Priester besetzt halten, und besiege alle Gegner dort."},
  {t:"Verzerrter Lichtstrahl",d:"Läutere die korrumpierten Wegsteine, indem du die fünf schwarzen Pfähle entfernst: Licht reflektieren zeigt, wo ein Pfahl steckt, Macht des Axioms zieht ihn heraus. Ein Pfahl steckt in einem zerstörbaren Baum, einer in einem Haus, dessen Eingang ein Steinblock versperrt (Block wegschieben)."},
  {t:"Bei Sebastian abgeben",d:"Reise nach jeder Aufgabe zum Abyss-Nexus am Pilgrim's Peak (EN) und melde sie Sebastian. Sind alle fünf abgegeben, dokumentiert ihr das Land jenseits der Wüste; als Nächstes folgt Der Drahtzieher an der Grabstätte des Schweigens."}
 ],
 belohnung:["Erkundungsberichte über Lukumiya, Maddin, Faraj, Hazran, das Dorf Yasmin und die Trümmer des Paradieses (Spieldaten)","Die großen Belohnungen gibt es über die ganze Reihe Jenseits der Ränder"],
 hinweise:[
  {kind:"info",txt:"Eigene Kartenmarkierungen gehen im Sandsturm nicht. Wer sich verirrt, reist zu einem entdeckten Abyss-Nexus und startet von dort neu."},
  {kind:"warn",txt:"Beim Kind nicht zu weit vorauslaufen, sonst scheitert die Aufgabe (Game8)."},
  {kind:"info",txt:"Nur laut Xboxplay: Weitere Pfähle stecken hinter zerschlagbaren Töpfen, in Wismutkristallen (mit Blitzangriffen zerstören) und in einem Keller hinter Dornen (mit Feuer oder Licht reflektieren freibrennen). Grobe Lage dort: Lukumiya nördlich von Sebastian, Maddin weit im Norden, Hazran im Westen, Yasmin im Nordwesten."},
  {kind:"info",txt:"Zählung geklärt: Xboxplay nennt vier Dorfaufgaben plus Verzerrter Lichtstrahl, also wie Game8 fünf Aufgaben, und vier Wegsteine, von denen einer zwei Pfähle hat (fünf Pfähle wie in den Spieldaten). Xboxplay nennt den Schritt optional, in den Spieldaten ist er fester Teil der 13 Schritte."}
 ],
 suchbegriffe:["beyond the sandstorm","sandsturm lösung","weg durch den sandsturm","sandsturm barriere","marker stones","wegsteine","schwarzer pfahl","dark stake","verzerrter lichtstrahl","distorted light","vom sand verhüllte nachbarn","das verirrte kind","die gruppe, die nicht zurückkehrte","missing calf","von dunkelheit verschlungenes dorf","lukumiya","maddin","faraj","hazran","yasmin","sebastian","pilgrim's peak"],
 quellen:[{t:"Game8: Beyond the Margins",url:"https://game8.co/games/Crimson-Desert/archives/635797",datum:"2026-11-14"},{t:"Xboxplay: Sandsturm",url:"https://xboxplay.games/crimson-desert/how-to-navigate-the-sandstorm-in-crimson-desert-77158",datum:"2026-11-14"},{t:"Whisper of the House: Beyond the Margins",url:"https://www.whisperofthehouse.com/crimson-desert/beyond-the-margins",datum:"2026-11-14"},{t:"Spieldaten (gaming.tools): Der Weg jenseits des Sandsturms",url:"https://crimsondesert.gaming.tools/de/quests/mission_mapmakerstory_kliff_count",datum:"2026-11-14"},{t:"Spieldaten (gaming.tools): Verzerrter Lichtstrahl",url:"https://crimsondesert.gaming.tools/de/quests/mission_mapmakerstory_kliff_milestone",datum:"2026-11-14"}],
 conf:"belegt", seo:{seite:"charting-the-unknown", h3:"Der Weg jenseits des Sandsturms: Lösung"}},
{slug:"uralter-tempel", de:"Uralter Tempel", en:"Ancient Shrine", art:"ort",
 sec:"dlc-quests", ziel:"dlc-q-weitere-missionen-auf-see",
 kurz:"Versunkenes Heiligtum bei der Insel Phragma im Südmeer und zweiter Schritt der DLC-Reihe Nebelmeer. Du tauchst hinein, öffnest einen Drehmechanismus und holst die Schlangenreliquie.",
 voraussetzung:["Reihe Die abgelegene Insel abgeschlossen (Insel Samora befreit)","Schritt Die geraubte Reliquie erledigt, dort erzählt Milo vom Tempel","Ein Schiff und Tauchen"],
 schritte:[
  {t:"Zur Insel Phragma segeln",d:"Fahr mit dem Schiff ins Südmeer zur Insel Phragma und folge dem Questmarker. Das Questziel lautet im Spiel: Breche zum Unterwassertempel auf."},
  {t:"Zum Eingang tauchen",d:"Tauch nahe der Insel ab und folge dem Marker zu einer Unterwasserruine. Der Eingang liegt südöstlich davon bei einer großen Schlangenstatue, dort lauert ein Pearl Moss Crocodile (EN)."},
  {t:"Drehhebel finden",d:"Schwimm im Tempel nach Norden zum drehbaren Hebel an der Wand. Rote Seeigel in der Nähe verletzen dich, schieb sie mit Kraftfaust oder Schleier des Windes weg."},
  {t:"Boden öffnen",d:"Greif den vorstehenden Arm unten rechts am Mechanismus und dreh ihn gegen den Uhrzeigersinn. Im Boden öffnet sich ein Durchgang."},
  {t:"Durch das runde Gitter",d:"Schwimm hindurch bis zum großen runden Gitter. Halt dich fest, halte Resist (EN) gedrückt und setz Kraftfaust ein, um auf die andere Seite zu kommen."},
  {t:"Schlangenreliquie nehmen",d:"Tauch auf, nimm die Treppe zum Podest und heb die Schlangenreliquie auf. Eine Zwischensequenz startet."},
  {t:"Weiter mit Uralte Katastrophe",d:"Danach ertönt ein Brüllen von der Insel Bergel südwestlich des Tempels. Es leitet den Kampf gegen Leviakan ein."}
 ],
 belohnung:["Die Schlangenreliquie (Questziel); eine eigene Belohnung für diesen Schritt nennen die Quellen nicht","Für die ganze Reihe Nebelmeer: Abyss-Artefakt, Uralte Relikte und Blick des Beschützers"],
 hinweise:[
  {kind:"info",txt:"Anfahrt: Game8 startet am Steinwacht-Hafen in Delesyia, PatchCrazy am Vellua Port (EN), beide mit Kurs Südost. Im Tempel schwimmt Game8 nach Nordosten zum Hebel, PatchCrazy nach Norden. Folge im Zweifel dem Questmarker."},
  {kind:"info",txt:"Das Wiki führt den Tempel in der Questliste unter Weitere Missionen auf See. Laut Spieldaten und Game8 ist er Schritt 2 von Nebelmeer: Die geraubte Reliquie, Uralter Tempel, Uralte Katastrophe, Das ruhig gewordene Meer."},
  {kind:"info",txt:"Die Ozeanruinen der Insel Phragma sind eine eigene DLC-Herausforderung mit Fliesenrätsel und nicht dieser Tempel (Game8)."},
  {kind:"info",txt:"Uralte Relikte für Nebelmeer: Spieldaten und Game8 vom 3.11. nennen 20, die Game8-Übersicht vom 13.11. nennt 5. Für den Kampf gegen Leviakan empfiehlt Game8 vorher die Fähigkeit Kraftübertragung."}
 ],
 abgrenzung:"Der Uralte Tempel ist ein Unterwasserort aus dem DLC Charting the Unknown. Mit den 37 Uralten Ruinen des Hauptspiels (Abyss-Grenzstein-Rätsel in Hernand, Pailune, Demeniss, Delesyia und der Region Crimson Desert) hat er nichts zu tun.",
 abgrenzungLink:{sec:"ruins", text:"Zu den Uralten Ruinen", seite:"ruinen"},
 suchbegriffe:["uralter tempel","ancient shrine","ancient shrine quest","unterwassertempel","underwater shrine","schlangenreliquie","serpent relic","insel phragma","phragma","nebelmeer","mistbound sea","die geraubte reliquie","uralte katastrophe","leviakan","pearl moss crocodile","drehhebel","gitter"],
 quellen:[{t:"Game8: Mistbound Sea",url:"https://game8.co/games/Crimson-Desert/archives/636570",datum:"2026-11-14"},{t:"PatchCrazy: Ancient Shrine",url:"https://patchcrazy.co.uk/ancient-shrine-quest-guide-crimson-desert-dlc/",datum:"2026-11-14"},{t:"GamesHorizon: Ancient Shrine und Leviakan",url:"https://gameshorizon.com/?p=81038",datum:"2026-11-14"},{t:"Spieldaten (gaming.tools): Nebelmeer",url:"https://crimsondesert.gaming.tools/de/faction-quests/mission_oceanstory_explore_sea",datum:"2026-11-14"},{t:"Game8: alle DLC-Quests",url:"https://game8.co/games/Crimson-Desert/archives/635794",datum:"2026-11-14"}],
 conf:"belegt", seo:{seite:"charting-the-unknown", h3:"Uralter Tempel: Lösung"},
 links:[{sec:"dlc-quests",ziel:"dlc-q-mistbound-sea"},{sec:"ruins",ziel:"r2b4-hero",wo:"nach"}]},
/* LOES-PFLICHT Ende */
];
const LOESUNGEN_KUER = [
/* LOES-KUER Anfang */
/* LOES-KUER Ende */
];
const LOESUNGEN = LOESUNGEN_PFLICHT.concat(LOESUNGEN_KUER);
