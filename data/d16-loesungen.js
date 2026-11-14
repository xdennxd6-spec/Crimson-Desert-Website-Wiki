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
 conf:"belegt", seo:{seite:"der-weg-jenseits-des-sandsturms", h3:"Der Weg jenseits des Sandsturms: Lösung"}},
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
 conf:"belegt", seo:{seite:"uralter-tempel", h3:"Uralter Tempel: Lösung"},
 links:[{sec:"dlc-quests",ziel:"dlc-q-mistbound-sea"},{sec:"ruins",ziel:"r2b4-hero",wo:"nach"}]},
{slug:"jenseits-der-raender", de:"Jenseits der Ränder", en:"Beyond the Margins", art:"quest",
 sec:"dlc-quests", ziel:"dlc-q-beyond-the-margins",
 kurz:"Kliffs 13-teilige DLC-Hauptreihe aus Charting the Unknown. Sie beginnt nach der Hauptquest Ende der Reise in der Taverne von Pailune und endet damit, dass du mit Sebastian die Wüstenkarte vervollständigst.",
 voraussetzung:["Hauptquest Ende der Reise abgeschlossen","Im Journal unter Hauptquests Jenseits der Ränder auswählen und den ersten Schritt verfolgen"],
 schritte:[
  {t:"Ein Augenblick der Rast",d:"Geh in die Taverne von Pailune, folge Oongka zum Angelplatz und fang einen Fisch."},
  {t:"Ein bekanntes Gesicht",d:"Sprich an den Docks von Pailune mit Andrew, besiege Matthias im Duell auf der Treppe von Schloss Pailune und kehr zu Andrew zurück."},
  {t:"Wegweisende Lehren",d:"Sprich im Jijeong-Tempel mit dem Mönchanführer, besiege T'rukan in der Arena im Schlangenmoor und kehr zum Mönchanführer zurück."},
  {t:"Wo Gerüchte entstehen",d:"Reise nach Varnia und such Sebastian. Laut Game8 gewinnst du dafür das Armdrücken in der Taverne und gibst dem Bettler Kupfer; Sebastian steht am Ende am Handelsposten bei den Anschlagtafeln."},
  {t:"Die Hexen des Ostens",d:"Folge Sebastian durch das Sacred Land (EN) und triff die Hexen. Sie öffnen dir den Weg durch die Sandsturmbarriere."},
  {t:"Der Weg jenseits des Sandsturms",d:"Finde dich an den Wegsteinen durch den Sandsturm und nimm die fünf Aufgaben an, die die nächsten Schritte bilden. Die ausführliche Lösung steht im eigenen Abschnitt Der Weg jenseits des Sandsturms."},
  {t:"Vom Sand verhüllte Nachbarn",d:"Zwischen Lukumiya und Maddin vermitteln und die Medizin nach Lukumiya bringen."},
  {t:"Das verirrte Kind",d:"Das Kind vom Wegstein östlich von Maddin nach Faraj begleiten."},
  {t:"Die Gruppe, die nicht zurückkehrte",d:"In Hazran das verirrte Kalb mit der Laterne aufspüren und zurücktragen."},
  {t:"Von Dunkelheit verschlungenes Dorf",d:"Im Dorf Yasmin die Antumbra-Priester und ihre Leute besiegen."},
  {t:"Verzerrter Lichtstrahl",d:"Die korrumpierten Wegsteine läutern, indem du die fünf schwarzen Pfähle entfernst."},
  {t:"Der Drahtzieher",d:"Folge Antumbras Spuren zur Grabstätte des Schweigens, besiege die Wachen am Eingang und dann Kharzek, den Antumbra-Großarchon."},
  {t:"Der Pfad des Kartografen",d:"Kehr zu Sebastian am Pilgrim's Peak (EN) zurück und vervollständige die Karte. Danach zeigt das Journal 13 von 13."}
 ],
 belohnung:["Kamfprüstung des Graumähnenanwärters (Schritt 2) und Matthias als entsendbarer Gefährte","Manifestation des Ultimativen (Abyss-Ausrüstung, Schritt 3)","100 Glänzende Samen (Schritt 5)","Abyss-Artefakt und Vollstrecker der Enthüllung (Schritt 12)","Erkundungsberichte der besuchten Orte (Spieldaten)"],
 hinweise:[
  {kind:"info",txt:"Der Start wird leicht übersehen: Öffne das Journal, wähle Hauptquests und verfolge Jenseits der Ränder. Die Reihe läuft unabhängig von den DLC-Reihen für Oongka und Damiane (Whisper of the House)."},
  {kind:"warn",txt:"Nach dem Kampf gegen T'rukan musst du zum Mönchanführer zurück, sonst geht die Reihe nicht weiter (Whisper of the House)."},
  {kind:"info",txt:"Armdrücken und Kupfer für den Bettler in Varnia nennt nur Game8. Den Kampf gegen Kharzek ordnen Game8 und die Spieldaten Schritt 12 (Der Drahtzieher) zu, nicht Schritt 6."}
 ],
 suchbegriffe:["beyond the margins","beyond the margins walkthrough","kliff dlc quest","kliff dlc reihe","ein augenblick der rast","ein bekanntes gesicht","wegweisende lehren","wo gerüchte entstehen","die hexen des ostens","der drahtzieher","veil of darkness","der pfad des kartografen","path of the mapmaker","sebastian","matthias","andrew","t'rukan","mönchanführer","varnia"],
 quellen:[{t:"Game8: Beyond the Margins",url:"https://game8.co/games/Crimson-Desert/archives/635797",datum:"2026-11-14"},{t:"Game8: alle DLC-Quests",url:"https://game8.co/games/Crimson-Desert/archives/635794",datum:"2026-11-14"},{t:"Whisper of the House: Beyond the Margins",url:"https://www.whisperofthehouse.com/crimson-desert/beyond-the-margins",datum:"2026-11-14"},{t:"Spieldaten (gaming.tools): Der Drahtzieher",url:"https://crimsondesert.gaming.tools/de/quests/mission_mapmakerstory_kliff_mapmaker",datum:"2026-11-14"}],
 conf:"belegt", seo:{seite:"jenseits-der-raender", h3:"Jenseits der Ränder: Lösung aller 13 Schritte"}},
{slug:"schicksalhafte-begegnung", de:"Schicksalhafte Begegnung", en:"Fateful Encounter", art:"quest",
 sec:"dlc-quests", ziel:"dlc-q-forged-resolve",
 kurz:"Sechster Schritt von Oongkas DLC-Reihe Geschmiedete Entschlossenheit. Vargus' Gerät hat Oongka in Marnis Anwesen versetzt; über ein Kerzenrätsel, ein Buch, einen Bilderrahmen und einen falschen Boden gelangst du in Marnis geheimes Labor.",
 voraussetzung:["Hauptquest Ende der Reise abgeschlossen, Reihe Geschmiedete Entschlossenheit im Journal verfolgt","Schritte Ein neuer Weg bis Die rissige Tür erledigt: Türrätsel gelöst (höchstens 15 Züge) und Vargus' Gerät benutzt"],
 schritte:[
  {t:"Kerzen am Eisentor",d:"Sieh dir an der Wand vor dem Eisentor die sechs Kerzen mit Sonnen- und Mondzeichen an. Zünde die drei Kerzen oben, unten rechts und unten links an, die anderen bleiben aus. Das Tor öffnet sich."},
  {t:"Zum Esstisch",d:"Geh durch das Tor zum Esstisch, bis eine Zwischensequenz startet. Danach führt dich Marnis fliegender Butler."},
  {t:"Dem Butler folgen",d:"Folge ihm nach draußen und untersuche den Treibstofftank und die Maschinen.",conf:"einzelquelle"},
  {t:"Gelbes Buch holen",d:"Geh zurück ins Haus und im zweiten Stock zur Kommode zwischen den Rüstungen. Nimm das gelbe Buch mit."},
  {t:"Geheimraum öffnen",d:"Ziel am Bücherregal im Flur oben rechts, bis die Aktion zum Einsetzen (Plant, EN) erscheint, und setz das Buch ein. Der Geheimraum öffnet sich."},
  {t:"Schiefer Bilderrahmen",d:"Such im Erdgeschoss unter der Treppe den schiefen Bilderrahmen und benutze ihn."},
  {t:"Falscher Boden",d:"Geh in den leeren Raum und such im Südwesten den falschen Boden. Fall hindurch, unten liegt Marnis geheimes Labor."}
 ],
 belohnung:["Herstellungsrezept: Verstärkte Handkanone"],
 hinweise:[
  {kind:"warn",txt:"Das Buch nur zu lesen reicht nicht. Am Bücherregal oben rechts zielen, bis die Aktion zum Einsetzen erscheint (Game8, Whisper of the House)."},
  {kind:"info",txt:"Kerzenrätsel kurz: die drei Kerzen auf 12, 4 und 8 Uhr anzünden. Xboxplay beschreibt es als oberste Kerze an, Nachbarn aus, dann abwechselnd."},
  {kind:"info",txt:"Startort der Reihe: Game8 nennt Oongkas Werkstatt im Graumähnen-Camp (dort sprichst du mit Wynstan), Whisper of the House eine Werkstatt im Nordwesten von Pailune. Das Journal zeigt den Weg."},
  {kind:"info",txt:"Danach folgt Verstreute Fragmente: Im Labor sammelst du das Material für die Verbesserte Fatum-Handkanone."}
 ],
 suchbegriffe:["fateful encounter","schicksalhafte begegnung lösung","marnis anwesen","marni's manor","kerzenrätsel","kerzen rätsel eisentor","candle puzzle","locked iron gate","eisentor","gelbes buch","bücherregal","schiefer bilderrahmen","crooked picture frame","geheimraum","falscher boden","marnis geheimes labor","geschmiedete entschlossenheit","forged resolve","oongka","verstärkte handkanone"],
 quellen:[{t:"Game8: Forged Resolve",url:"https://game8.co/games/Crimson-Desert/archives/636231",datum:"2026-11-14"},{t:"Xboxplay: Locked Iron Gate",url:"https://xboxplay.games/crimson-desert/how-to-find-a-way-past-the-locked-iron-gate-in-crimson-desert-77129",datum:"2026-11-14"},{t:"Whisper of the House: Forged Resolve",url:"https://www.whisperofthehouse.com/crimson-desert/forged-resolve",datum:"2026-11-14"}],
 conf:"belegt", seo:{seite:"charting-the-unknown", h3:"Schicksalhafte Begegnung: Lösung (Marnis Anwesen)"}},
{slug:"neuer-elan", de:"Neuer Elan", en:"Renewed Vitality", art:"quest",
 sec:"dlc-quests", ziel:"dlc-q-renewed-vitality",
 kurz:"Zweiteilige DLC-Fraktionsquest der Graumähnen. Du liest in Hernand den Aushang zum Scheitheim-Sägewerk, pachtest es und bringst den Betrieb auf Bekanntheit Lv. 3.",
 voraussetzung:["Graumähnen-Fraktionsquest Ein Gerücht im Handelsposten der Blattgold-Händlergilde abgeschlossen (vierter Teil von Vereinter Wille)","Für die Pacht genug Camp-Mittel (laut Xboxplay 15.000)"],
 schritte:[
  {t:"Aushang lesen",d:"Geh in Hernand zur Anschlagtafel und lies den Aushang über das Scheitheim-Sägewerk. Damit ist der erste Teil, Die stillstehenden Sägeblätter, erledigt."},
  {t:"Sägewerk pachten",d:"Öffne die Weltkarte, wähle im Reiter Einrichtungen das Scheitheim-Sägewerk und schließ den Pachtvertrag ab. Damit beginnt Teil 2, Wieder rotierende Sägeblätter."},
  {t:"Betrieb einrichten",d:"Geh zum Sägewerk und starte die Verwaltung. Weise Gefährten zu, stell die Arbeitsstationen auf und leg Waren und Preise fest."},
  {t:"Laden öffnen",d:"Öffne den Laden. Kunden kommen, deine Gefährten nehmen Bestellungen auf und liefern."},
  {t:"Bekanntheit steigern",d:"Für Lv. 2: Wood Synergy 1 (EN) aktivieren, das Buch The Courtesy of Waiting (EN) lesen, einen Standing Table (EN) bauen und drei Kunden zufriedenstellen. Für Lv. 3: The Nature of Planks (EN) lesen, Plank Workbench (EN) und Plank Box (EN) bauen und zehn Waren aus Planken verkaufen.",conf:"einzelquelle"},
  {t:"Abschluss",d:"Mit Bekanntheit Lv. 3 ist Wieder rotierende Sägeblätter erledigt. Die aktuellen Aufgaben zeigt jederzeit das Verwaltungsmenü."}
 ],
 belohnung:["Die Pacht des Scheitheim-Sägewerks","Einrichtungsgegenstände, zum Beispiel Rustikale Werkbank, Holzlager, Hochofen, Webstuhl und Amboss (Spieldaten)","Laut Game8 schaltet die Quest die übrigen pachtbaren Einrichtungen in Pywel frei","Nur laut Xboxplay: ein Handwerksbuch, Lederhandschuhe des Architekten und passives Einkommen"],
 hinweise:[
  {kind:"info",txt:"Neuer Elan ist eine einzige Reihe mit zwei Teilen (Die stillstehenden Sägeblätter, Wieder rotierende Sägeblätter), auch wenn das Wiki sie an mehreren Stellen erwähnt."},
  {kind:"warn",txt:"Stehen Arbeitsstationen und Lager zu dicht, bleiben Arbeiter hängen. Lass Platz dazwischen (Xboxplay)."},
  {kind:"info",txt:"Camp-Mittel sammelst du am schnellsten über Entsendungen (Xboxplay). Zu hohe Preise verärgern Kunden, zu niedrige drücken den Gewinn; Bekanntheit steigt über Verkäufe und die Aufgaben im Verwaltungsmenü (Game8)."}
 ],
 suchbegriffe:["renewed vitality","neuer elan quest","die stillstehenden sägeblätter","wieder rotierende sägeblätter","the stilled saw","the saw turns again","scheitheim-sägewerk","scheitheim sägewerk","timberham sawmill","sägewerk pachten","einrichtung pachten","bekanntheit","popularität","popularity","lederhandschuhe des architekten","architect's leather gloves"],
 quellen:[{t:"Game8: Einrichtungen verwalten",url:"https://game8.co/games/Crimson-Desert/archives/636169",datum:"2026-11-14"},{t:"Game8: alle DLC-Quests",url:"https://game8.co/games/Crimson-Desert/archives/635794",datum:"2026-11-14"},{t:"Xboxplay: The Saw Turns Again",url:"https://xboxplay.games/crimson-desert/how-to-complete-the-saw-turns-again-quest-in-crimson-desert-77231",datum:"2026-11-14"},{t:"Spieldaten (gaming.tools): Wieder rotierende Sägeblätter",url:"https://crimsondesert.gaming.tools/de/faction-quests/mission_graymane_management_timberhamsawmill_operation",datum:"2026-11-14"}],
 conf:"belegt", seo:{seite:"charting-the-unknown", h3:"Neuer Elan: Lösung (Scheitheim-Sägewerk)"},
 links:[{sec:"dlc",ziel:"dlc-b-leben"}]},
{slug:"grabstaette-des-schweigens", de:"Grabstätte des Schweigens", en:"Silent Burial Ground", art:"ort",
 sec:"dlc-quests", ziel:"dlc-q-beyond-the-margins",
 kurz:"Versteckter Kampfort in Kliffs DLC-Reihe Jenseits der Ränder: Im Schritt Der Drahtzieher wartet dort Kharzek, der Antumbra-Großarchon. Der Eingang öffnet sich erst nach den fünf Aufgaben im Sandsturm.",
 voraussetzung:["Reihe Jenseits der Ränder bis Der Weg jenseits des Sandsturms gespielt, alle fünf Aufgaben im Sandsturm erledigt","Die Aufgaben bei Sebastian abgegeben, Schritt Der Drahtzieher ist aktiv"],
 schritte:[
  {t:"Zur Grabstätte reisen",d:"Folge Antumbras Spuren zu einem Ort, der nicht auf der Karte steht. Laut Game8 liegt er westlich des Sandsturmgebiets.",conf:"einzelquelle"},
  {t:"Wachen besiegen",d:"Besiege die Gegner vor dem versiegelten Eingang. Danach öffnen sich die Tore von selbst, es gibt weder Schlüssel noch Türrätsel."},
  {t:"Hineingehen",d:"Geh hinein, bis eine Zwischensequenz startet. Danach beginnt der Kampf gegen Kharzek."},
  {t:"Kharzek besiegen",d:"Kharzek wechselt oft die Position und kann deine Zielerfassung lösen. Kontere nach seinen Angriffen, renn ihm nicht hinterher und halte Ausdauer zum Ausweichen bereit.",conf:"einzelquelle"},
  {t:"Belohnung und Rückkehr",d:"Nimm nach dem Sieg Abyss-Artefakt und Vollstrecker der Enthüllung mit und kehr zu Sebastian zurück (Der Pfad des Kartografen)."}
 ],
 belohnung:["Abyss-Artefakt","Vollstrecker der Enthüllung (Abyss-Ausrüstung)","Erkundungsbericht über die Grabstätte des Schweigens und ein Erinnerungsfragment (Spieldaten)"],
 hinweise:[
  {kind:"warn",txt:"Bleiben die Tore zu, prüf, ob alle fünf Sandsturm-Aufgaben bei Sebastian abgegeben und die Gegner vor dem Eingang besiegt sind (Showgamer, Xboxplay)."},
  {kind:"info",txt:"Game8 und die Spieldaten ordnen den Kampf dem Schritt Der Drahtzieher zu; Showgamer zählt ihn zur Handlung von Der Weg jenseits des Sandsturms, weil Der Drahtzieher direkt darauf folgt."},
  {kind:"info",txt:"Der Spieltext nennt den Gegner Kharzek, der Antumbra-Großarchon; in der Bossliste dieses Wikis heißt er Antumbra-Archon, Kharzek."}
 ],
 suchbegriffe:["silent burial ground","grabstätte des schweigens öffnen","how to open silent burial ground","kharzek","kharzek besiegen","archon of antumbra","antumbra-großarchon","antumbra-archon","der drahtzieher","veil of darkness","tore öffnen sich nicht","vollstrecker der enthüllung","revelation's end"],
 quellen:[{t:"Game8: Beyond the Margins",url:"https://game8.co/games/Crimson-Desert/archives/635797",datum:"2026-11-14"},{t:"Showgamer: Silent Burial Ground",url:"https://showgamer.com/en/guides/7089-gayd-crimson-desert-kak-otkryt-bezmolvnyy-mogilnik",datum:"2026-11-14"},{t:"Whisper of the House: Beyond the Margins",url:"https://www.whisperofthehouse.com/crimson-desert/beyond-the-margins",datum:"2026-11-14"},{t:"Spieldaten (gaming.tools): Der Drahtzieher",url:"https://crimsondesert.gaming.tools/de/quests/mission_mapmakerstory_kliff_mapmaker",datum:"2026-11-14"}],
 conf:"belegt", seo:{seite:"charting-the-unknown", h3:"Grabstätte des Schweigens: so kommst du hinein"},
 links:[{sec:"dlc-kampf",ziel:"[data-dlc-k=\"Kharzek, Archon of Antumbra\"]"}]},
{slug:"stadt-im-wandel", de:"Stadt im Wandel", en:"The Evolving City", art:"quest",
 sec:"quests", tab:"mq", ziel:"mq-epilog",
 kurz:"Kurze Hauptquest im Epilog Ende der Reise. Du reist nach Delesyia und siehst dir mit dem Visione-Helm eine Erinnerung von Marni an.",
 voraussetzung:["Epilog-Hauptquest Ein neuer Anfang abgeschlossen","Den goldenen Visione-Helm besitzen (Löwenmähne-Wachturm bei Hernand, Hauptquest Erinnerungsfragment)"],
 schritte:[
  {t:"Nach Delesyia reisen",d:"Reise in die Hauptstadt Delesyia und geh zur Burg."},
  {t:"Helm aufsetzen",d:"Trag den Visione-Helm. Mit aufgesetztem Helm lassen dich die Wachen am Burgtor hinein."},
  {t:"Erinnerung auswählen",d:"Wähl im Ausrüstungsmenü den Visione-Helm, dann öffnet sich die Liste der Erinnerungen (Recollections, EN). Öffne im Reiter Delesyia den ersten Eintrag, Visione.",conf:"einzelquelle"},
  {t:"Erinnerung ansehen",d:"Lass die Erinnerung bis zum Ende laufen, es erscheint eine Aufzeichnung von Marni. Damit ist Stadt im Wandel abgeschlossen."}
 ],
 belohnung:["Keine"],
 hinweise:[
  {kind:"info",txt:"Stadt im Wandel ist eine der acht Aufgaben von Ende der Reise: Ein neuer Anfang, Die wiedergefundene Ruhe, Unnachgiebige Schilde, Das Herz von Pywel, Die ewige Flamme, Stadt im Wandel, Der Rand der Wüste und Neue Horizonte (Game8)."},
  {kind:"info",txt:"Burgtor und Menüweg beschreibt nur PowerPyx genau; Game8 sagt kürzer, du sollst im Schloss den Visione-Helm tragen und die Erinnerung über seine Geheimnisse lesen."}
 ],
 suchbegriffe:["evolving city","the evolving city","stadt im wandel lösung","visione helm","visione-helm","visione erinnerung","recollections","erinnerung delesyia","burg delesyia","burgtor delesyia","marni aufzeichnung","epilog ende der reise"],
 quellen:[{t:"PowerPyx: Evolving City",url:"https://www.powerpyx.com/crimson-desert-evolving-city-walkthrough/",datum:"2026-11-14"},{t:"Game8: Journey's End",url:"https://game8.co/games/Crimson-Desert/archives/591746",datum:"2026-11-14"}],
 conf:"belegt", seo:{seite:"hauptquests", h3:"Stadt im Wandel: Lösung"},
 links:[{sec:"chapters",ziel:"ch-Epilog"}]},
{slug:"ein-mysterioeser-angriff", de:"Ein mysteriöser Angriff", en:"Unidentified Attack", art:"quest",
 sec:"dlc-quests", ziel:"dlc-q-forged-resolve",
 kurz:"Letzter Schritt von Oongkas DLC-Reihe Geschmiedete Entschlossenheit. Im Graumähnen-Camp hörst du vom Angriff auf Yanns Wagen, in der Wüste warten die Schrottkönigin der Steinrückenkrebse und danach Eisentyrann Harkan.",
 voraussetzung:["Hauptquest Ende der Reise abgeschlossen und Geschmiedete Entschlossenheit bis Der Weg des Ingenieurs gespielt","Oongkas verbesserte Handkanone und die Ausrüstung aus der Reihe dabei (Whisper of the House)"],
 schritte:[
  {t:"Mit Wynstan sprechen",d:"Geh im Graumähnen-Camp zu Wynstan, der gerade mit Marius redet, und hör dir an, was mit Yann passiert ist."},
  {t:"In die Wüste reisen",d:"Reise in die Region Crimson Desert und folge dem Questmarker zu Yanns verlassenem Wagen. Aus dem Sand taucht ein Gegner auf."},
  {t:"Schrottkönigin besiegen",d:"Die Schrottkönigin der Steinrückenkrebse ist eine Maschine mit Lasern und Raketen. Kletter auf ihren Rücken und triff die Schwachstellen (Game8); die verbesserte Handkanone hilft (Whisper of the House)."},
  {t:"Raketen zurückschicken",d:"Fang ihre Raketen mit Schleier des Windes ab und schick sie zurück, das füllt ihre Betäubungsleiste schnell.",conf:"einzelquelle"},
  {t:"Eisentyrann Harkan besiegen",d:"Direkt nach der Maschine kämpfst du gegen Harkan. Erst nach seinem Sieg ist die Quest geschafft."},
  {t:"Abschluss",d:"Sieh dir den Abschlussdialog an; mit der Meldung Main Quest Complete (EN) endet die Reihe.",conf:"einzelquelle"}
 ],
 belohnung:["Abyss-Artefakt","Flugbahn des Glanzes (Abyss-Ausrüstung)","Ein Erinnerungsfragment des Kampfes (Spieldaten)"],
 hinweise:[
  {kind:"warn",txt:"Der Sieg über die Schrottkönigin beendet die Quest nicht, Harkan folgt sofort (Game8, Whisper of the House)."},
  {kind:"info",txt:"Ort: Game8 nennt den Nordosten der Region Crimson Desert bei Yanns Wagen, Whisper of the House die Nähe der Sunrest Ruins (EN). Beides kann dieselbe Stelle meinen; maßgeblich ist der Questmarker."},
  {kind:"info",txt:"Nur laut Game8: Harkans Zauber stoßen weit zurück. Bleib nicht zu lange nah dran und nutz die Handkanone aus der Distanz."}
 ],
 suchbegriffe:["unidentified attack","ein mysteriöser angriff lösung","schrottkönigin der steinrückenkrebse","schrottkönigin","scrap metal queen","stoneback crab","eisentyrann harkan","iron tyrant harkan","harkan","yanns wagen","yann","flugbahn des glanzes","radiant flash","geschmiedete entschlossenheit","forged resolve","oongka"],
 quellen:[{t:"Game8: Forged Resolve",url:"https://game8.co/games/Crimson-Desert/archives/636231",datum:"2026-11-14"},{t:"Whisper of the House: Forged Resolve",url:"https://www.whisperofthehouse.com/crimson-desert/forged-resolve",datum:"2026-11-14"},{t:"Spieldaten (gaming.tools): Ein mysteriöser Angriff",url:"https://crimsondesert.gaming.tools/de/quests/mission_engineerstory_hunt_sandmachine",datum:"2026-11-14"},{t:"Game8: alle DLC-Quests",url:"https://game8.co/games/Crimson-Desert/archives/635794",datum:"2026-11-14"}],
 conf:"belegt", seo:{seite:"charting-the-unknown", h3:"Ein mysteriöser Angriff: Lösung"},
 links:[{sec:"dlc-kampf",ziel:"[data-dlc-k=\"Scrap Metal Queen Stoneback Crab\"]"},{sec:"dlc-kampf",ziel:"[data-dlc-k=\"Iron Tyrant Harkan\"]"}]},
/* LOES-PFLICHT Ende */
];
const LOESUNGEN_KUER = [
/* LOES-KUER Anfang */
{slug:"abalone", de:"Abalone", en:"Abalone / Giant Abalone", art:"item",
 sec:"gatherables", ziel:null, ort:".gt-xref",
 kurz:"Abalone ist eine Meeresfrucht und Kochzutat, die es als normale Abalone und als größere Riesen-Abalone gibt. Einen festen Fundort nennt keine geprüfte Quelle, belegt ist vor allem, wofür du sie brauchst.",
 voraussetzung:["Keine Quest und kein Werkzeug in den Quellen genannt"],
 schritte:[
  {t:"Normale Abalone sammeln",d:"Laut Spieltext haftet sie fest an Felsen und frisst Seekohl und Algen. Einen festen Sammelort nennt keine geprüfte Quelle. th.gl führt sie zusätzlich als seltene Belohnung der Sammelmission Muscheln (1 bis 2 Stück, Chance 10 Prozent).",conf:"einzelquelle"},
  {t:"Riesen-Abalone sammeln",d:"Laut Spieltext lebt sie an Riffen der Tiefsee und klammert sich so fest an den Fels, dass das Lösen mühsam ist. Ein genauer Fundort ist nicht erfasst.",conf:"einzelquelle"},
  {t:"Abalonebrei kochen",d:"Normale Abalone ist die Hauptzutat für Abalonebrei. Die reichliche Stufe braucht im Kochtopf 8 Abalone, 12 Wasser, 4 Salz, 8 Getreide und 4 Pilze. Abalone steckt außerdem in der Blanchierten Meeresfrüchte-Platte und zählt bei Gegrillten Muscheln als Muschel."},
  {t:"Luftis' Elixier brauen",d:"Riesen-Abalone brauchst du vor allem im Kessel: Luftis' Elixier aus 3 Riesen-Abalone, 3 Riesen-Turbanschnecken, 5 Meerespflanzen und 1 Leere Flasche erhöht 3 Minuten lang die maximale Atemluft. Für Luftis' minderes Elixier reichen 2 Riesen-Abalone, 2 Meerespflanzen und 1 Leere Flasche.",conf:"einzelquelle"}
 ],
 belohnung:["Kochzutat, keine Questbelohnung"],
 hinweise:[
  {kind:"info",txt:"Fundort nicht erfasst: th.gl beschreibt nur den Lebensraum, Fextralife hat keine Seite zu Abalone, der Fischführer von PowerPyx nennt sie nicht."},
  {kind:"info",txt:"Eingepackte Erstklassige Abalonen sind eine Handelsware für den Seehandel (Insel-Handelsposten auf Insel Xamaca, laut th.gl 3.161 Camp-Mittel) und nicht dasselbe wie die Zutat."}
 ],
 suchbegriffe:["abalone","riesen-abalone","giant abalone","abalonebrei","abalone porridge","reichlicher abalonebrei","luftis elixier","meeresfrüchte","muschel","sammelmission muscheln"],
 quellen:[{t:"th.gl: Riesen-Abalone",url:"https://crimsondesert.th.gl/de/db/materials/item_rare_collect_giantabalone",datum:"2026-11-14"},{t:"th.gl: Abalone",url:"https://crimsondesert.th.gl/db/materials/item_rare_collect_abalone",datum:"2026-11-14"},{t:"Materia Crafting: Abalone",url:"https://www.materia-crafting.com/crimson-desert/abalone",datum:"2026-11-14"}],
 conf:"einzelquelle", seo:{seite:"crafting", h3:"Abalone: Fundort und Verwendung"}},
{slug:"hologramm-projektor", de:"Hologramm-Projektor", en:"Hologram Projector", art:"item",
 sec:"crafting", ziel:null, ort:".r2b1-news",
 kurz:"Hologram Projector heißt im deutschen Spiel Hologramm-Projektor. Du bekommst ihn von Glücksritter Merrick und brauchst ihn für den Kuku-Kommunikationsrucksack 999K, der einen holografischen Händler herbeiruft.",
 voraussetzung:["Kampf gegen Glücksritter Merrick bei der Festung im Roten Gebirge (Fraktionsquest Where Greed Takes Root, EN)","Zum Herstellen: Blaupause des Rucksacks und Zugang zur Kilnden-Werkstatt (ab Kapitel 4)"],
 schritte:[
  {t:"Merrick besiegen",d:"Glücksritter Merrick ist ein optionaler Boss in goldener Rüstung bei der Festung im Roten Gebirge. Der Hologramm-Projektor ist die feste Belohnung seiner Mission (100 Prozent)."},
  {t:"Blaupause besorgen",d:"Die Blaupause: Kukuvogel-Kommunikationsrucksack verkauft Hexe Areciel für 999 Silber. Die Wiki-Daten nennen als zweiten Weg die Blaupause als Belohnung der Mission Sanktum der Erhöhung."},
  {t:"Rucksack herstellen",d:"Für den Kuku-Kommunikationsrucksack 999K brauchst du 1 Kuku-Rucksack, 1 Elektrisches Bauteil, 1 Hologramm-Projektor, 1 Abbild der Sühne und 100 Zahnräder."},
  {t:"Händler rufen",d:"Den Rucksack ausrüsten und auslösen. Es erscheint ein holografischer Händler, bei dem du unterwegs kaufen und verkaufen kannst."}
 ],
 belohnung:["Hologramm-Projektor x1","Damit: Kuku-Kommunikationsrucksack 999K mit tragbarem Händler"],
 hinweise:[
  {kind:"info",txt:"Abklingzeit offen: Die Wiki-Daten (questlog) nennen etwa 30 Minuten, Nerdschalk etwa 50 Minuten."},
  {kind:"info",txt:"Station offen: Das Wiki und Nerdschalk nennen die Kilnden-Werkstatt bei Grimnir, gaming.tools den Kuku-Eisentopf."}
 ],
 abgrenzung:"Die Hologramme im Abyss, an denen Kliff Fähigkeiten durch Beobachten lernt, sind etwas anderes.",
 suchbegriffe:["hologram projector","hologram projector deutsch","hologramm-projektor","hologramm projektor","merrick","glücksritter merrick","knight of fortune","kuku transmission 999k pack","kuku-kommunikationsrucksack 999k","holografischer händler","händler beschwören"],
 quellen:[{t:"th.gl: Hologramm-Projektor",url:"https://crimsondesert.th.gl/de/db/materials/item_boss_reward_summonmerchant",datum:"2026-11-14"},{t:"gaming.tools: Hologram Projector",url:"https://crimsondesert.gaming.tools/items/boss_reward_summonmerchant",datum:"2026-11-14"},{t:"Nerdschalk: Kuku Transmission 999K Pack",url:"https://nerdschalk.com/crimson-desert-ultimate-guide-to-summoning-merchant-anywhere-with-kuku-transmission-999k-pack-location-and-crafting-explained/",datum:"2026-11-14"},{t:"GamerGuides: Kuku Transmission 999K Pack",url:"https://www.gamerguides.com/crimson-desert/database/kuku-items/pack/kuku-transmission-999k-pack",datum:"2026-11-14"}],
 conf:"belegt", seo:{seite:"crafting", h3:"Hologram Projector auf Deutsch: Hologramm-Projektor"}},
{slug:"eisresistenz", de:"Eisresistenz", en:"Ice Resistance", art:"thema",
 sec:"food", ziel:null, ort:".fd-xref",
 kurz:"Eisresistenz schützt vor Kälte: In kalten Gebieten verbraucht Kliff sonst mehr Ausdauer und erholt sich langsamer. Du bekommst sie über Essen, Getränke, Mäntel, Rüstung und die Abyss-Ausrüstung Frostschleier.",
 voraussetzung:["Für Abyss-Ausrüstung in der Rüstung: Hexen freigeschaltet"],
 schritte:[
  {t:"Kälte erkennen",d:"Die Temperaturleiste an der Minikarte zeigt, wie kalt es ist. Je tiefer sie sinkt, desto stärker kostet die Kälte Ausdauer."},
  {t:"Früh: Umhang des hernandischen Adels",d:"Im Beitragsladen der Burg Hernand für 19 Beitragspunkte kaufen, er gibt Eisresistenz Stufe 3. Die Punkte kommen aus Nebenquests in Hernand."},
  {t:"Essen und Trinken",d:"Klare Suppe gibt Stufe 2, Fischbrei Stufe 4. Die Wirkdauer geben die Quellen unterschiedlich an. Bier und Tees, vor allem Honigtee, helfen ebenfalls."},
  {t:"Rüstung: Frostfluch-Plattenpanzer",d:"Er liegt in der Nebelscherbenhöhle in den Rauchenden Landen von Demeniss nahe dem Berg des toten Feuers, hinter einem Wasserfall. Mit einem Stoßangriff durch den Wasserfall, den Felsen dahinter zerschlagen und die Truhe öffnen. Er gibt Stufe 7, lässt sich aber nicht aufwerten."},
  {t:"Mehr Schutz: Frostschleier",d:"Die Abyss-Ausrüstung Frostschleier in Rüstungsteile setzen, stärkere Fassungen geben höhere Stufen."},
  {t:"Endstufe: Kälteresistente Kuku-Rüstung",d:"Aus dem Frostfluch-Plattenpanzer lässt sich die Kälteresistente Kuku-Rüstung herstellen, laut den Wiki-Daten mit Eisresistenz Stufe 10.",conf:"einzelquelle"}
 ],
 belohnung:["Weniger Ausdauerverlust in der Kälte, ab hohen Stufen Schutz vor Einfrieren"],
 hinweise:[
  {kind:"info",txt:"Stufen laut Kamigame: Ab Stufe 5 macht dir normale Kälte nichts mehr aus, Stufe 10 schützt gegen Einfrieren, Stufe 15 macht dagegen immun. Stufe 4 reicht noch nicht."},
  {kind:"warn",txt:"In extrem kalten Gebieten sinkt laut Kamigame auch die Gesundheit laufend. Lagerfeuer wärmen."}
 ],
 suchbegriffe:["eis resistenz","eisresistenz","eis-resistenz","ice resistance","kälteresistenz","kälteschutz","kälte","frost","frostfluch","frostschleier","frostward","umhang des hernandischen adels","fischbrei","klare suppe","honigtee","kälteresistente kuku-rüstung"],
 quellen:[{t:"GameRant: Ice Resistance",url:"https://gamerant.com/crimson-desert-ice-protection-resistance-frost/",datum:"2026-11-14"},{t:"GameRant: Frostcursed Armor Set",url:"https://gamerant.com/crimson-desert-frostcursed-armor-set-locations/",datum:"2026-11-14"},{t:"Gfinity: Frostcursed Armor Set",url:"https://www.gfinityesports.com/article/how-to-get-the-frostcursed-armor-set-in-crimson-desert",datum:"2026-11-14"},{t:"Kamigame: Kälte und Eisresistenz",url:"https://kamigame.jp/crimsondesert/page/418385611070637859.html",datum:"2026-11-14"},{t:"ConsolePulse: Kuku-Rüstungen",url:"https://www.consolepulse.com/multiplatform/crimson-desert/guides/crimson-desert-kuku-armor-blueprints-patch-1-13",datum:"2026-11-14"}],
 conf:"belegt", seo:{seite:"crafting", h3:"Eis-Resistenz: Ausrüstung und Essen gegen Kälte"}},
{slug:"harpunengewehr", de:"Harpunengewehr", en:"Harpoon Gun", art:"item",
 sec:"dlc-ausruestung", ziel:"[data-item-id=\"Harpoon Gun\"]",
 kurz:"Die Harpune im DLC Charting the Unknown ist das Harpunengewehr, eine Fernkampfwaffe für den Kampf unter Wasser. Du bekommst es in der Graumähnen-Reihe Auf in eine größere Welt (Quest Wo der Wind weht), seit Patch 2.05.00 auch beim Händler.",
 voraussetzung:["DLC Charting the Unknown","Kapitel 3 Heulender Hügel abgeschlossen und Camp ausgebaut (Start der Ozean-Reihe)"],
 schritte:[
  {t:"Reihe starten",d:"Nach Kapitel 3 und dem Camp-Ausbau startet die Graumähnen-Reihe Auf in eine größere Welt mit dem Schritt Der Ruf jenseits des Horizonts."},
  {t:"Wo der Wind weht abschließen",d:"Das Schiff für die Reise ist bereit: im Hafenort auf Neuigkeiten achten und auslaufen. Das Harpunengewehr ist die Belohnung."},
  {t:"Ausrüsten",d:"Kliff, Damiane und Oongka können es tragen, es hat 5 Sockel für Abyss-Ausrüstung.",conf:"einzelquelle"},
  {t:"Nachkaufen",d:"Seit Patch 2.05.00 (13.11.2026) verkaufen die Händler an Angelplätzen am Meer das Harpunengewehr, sobald du es einmal erhalten hast."}
 ],
 belohnung:["Harpunengewehr x1 (Angriff 40 auf Stufe +10)"],
 hinweise:[
  {kind:"info",txt:"Game8 führt das Gewehr einmal als Belohnung von Wo der Wind weht und einmal als Belohnung der ganzen Reihe."},
  {kind:"info",txt:"Patch 2.05.00 hat behoben, dass Seeschlangen vom Harpunengewehr nicht getroffen wurden."},
  {kind:"warn",txt:"Beim Hai zähmen nur vorsichtig einsetzen: Zu viel Schaden tötet den Hai."}
 ],
 abgrenzung:"Der Harpunenspeer ist eine eigene Stangenwaffe, sein Fundort ist nicht erfasst. Die Harpunenschmiede Halbert ist ein Ort in Pailune.",
 suchbegriffe:["harpune","harpoon","harpoon gun","harpunengewehr","harpunenspeer","wo der wind weht","where the wind blows","auf in eine größere welt","a wider world","angelplatz händler"],
 quellen:[{t:"Game8: Harpoon Gun",url:"https://game8.co/games/Crimson-Desert/archives/635833",datum:"2026-11-14"},{t:"Game8: DLC-Fraktionsquests",url:"https://game8.co/games/Crimson-Desert/archives/635794",datum:"2026-11-14"},{t:"Power Up Gaming: Shark Mount",url:"https://powerupgaming.co.uk/2026/10/31/how-to-tame-shark-mount-in-crimson-desert-charting-the-unknown/",datum:"2026-11-14"},{t:"PSU: Patch 2.05.00",url:"https://www.psu.com/news/crimson-desert-update-2-05-00-brings-multiple-fixes-for-combat-controls-ui-full-patch-notes-listed/",datum:"2026-11-14"},{t:"Patchbot: Patch 2.05.00",url:"https://patchbot.io/games/crimson-desert/articles/2229-patch-notes-version-20500",datum:"2026-11-14"}],
 conf:"belegt", seo:{seite:"charting-the-unknown", h3:"Harpune: Harpunengewehr bekommen"}},
{slug:"der-rachegeist-der-durch-das-meer-treibt", de:"Der Rachegeist, der durch das Meer treibt", en:"A Vengeful Spirit at Sea", art:"quest",
 sec:"dlc-quests", ziel:"dlc-q-cave-of-sorrow",
 kurz:"Einziger Schritt der Ozean-Fraktionsquest Höhle der Trauer auf Insel Bergel: Aus einer dunklen Höhle dringt ein klagender Schrei, dort besiegst du den Geist Rohan Cooper.",
 voraussetzung:["DLC Charting the Unknown","Schritt Uralte Katastrophe erledigt (der Kampf gegen Leviakan in der Reihe Nebelmeer)"],
 schritte:[
  {t:"Zur Höhle der Trauer",d:"Auf Insel Bergel südlich von Delesyia die Höhle der Trauer aufsuchen, der Questmarker zeigt den Weg."},
  {t:"Rohan Cooper besiegen",d:"In der Höhle zeigt sich der ruhelose Geist von Rohan Cooper, Sohn eines Marineoffiziers aus Demeniss. Besiege ihn, danach verstummt das Schluchzen in der Höhle."},
  {t:"Artefakt aufnehmen",d:"Nach dem Kampf das Artefakt aufnehmen. Erst damit gibt es das Abyss-Artefakt und die 5 Uralten Relikte.",conf:"einzelquelle"}
 ],
 belohnung:["Marineoffiziersrüstung","Trugbild-Kaskade (Abyss-Ausrüstung)","Abyss-Artefakt und 5 Uralte Relikte","Notiz von Rohan Cooper und Wissenseinträge zu Rohan Cooper und den Geistern"],
 hinweise:[
  {kind:"info",txt:"Den Kampfablauf haben wir in keiner abrufbaren Quelle gefunden."},
  {kind:"info",txt:"Die Höhle der Trauer gehört zur Fraktion der Inselbewohner (Keepers of the Abandoned Islands, EN) im Ozean."}
 ],
 abgrenzung:"Das Brüllen von Insel Bergel in der Reihe Nebelmeer führt zum Kampf gegen Leviakan (Uralte Katastrophe). Die Höhle der Trauer ist eine eigene Quest, die erst danach startet.",
 suchbegriffe:["a vengeful spirit at sea","vengeful spirit","rachegeist","der rachegeist der durch das meer treibt","höhle der trauer","cave of sorrow","rohan cooper","bergel","insel bergel","marineoffiziersrüstung","trugbild-kaskade"],
 quellen:[{t:"gaming.tools: A Vengeful Spirit at Sea",url:"https://crimsondesert.gaming.tools/faction-quests/mission_oceanstory_vergelisland_rohancooper_boss",datum:"2026-11-14"},{t:"Game8: DLC-Fraktionsquests",url:"https://game8.co/games/Crimson-Desert/archives/635794",datum:"2026-11-14"}],
 conf:"belegt", seo:{seite:"charting-the-unknown", h3:"A Vengeful Spirit at Sea: Lösung"}},
{slug:"fremde-werkstatt", de:"Fremde Werkstatt", en:"Unfamiliar Workshop", art:"quest",
 sec:"dlc-quests", ziel:"dlc-q-forged-resolve",
 kurz:"Dritter Schritt von Oongkas DLC-Reihe Geschmiedete Entschlossenheit: Oongka kommt am Scholastein-Institut an, trifft den Dekan und Vargus und bringt den defekten Power Regulator (EN) mit einer Tastenfolge wieder in Gang.",
 voraussetzung:["Hauptquest Ende der Reise abgeschlossen, als Oongka spielen","Schritte Ein neuer Weg und Nach Scholastein erledigt"],
 schritte:[
  {t:"Dekan treffen",d:"Im Scholastein-Institut Dekan Grundir aufsuchen."},
  {t:"Mit Vargus sprechen",d:"Danach Vargus ansprechen."},
  {t:"Gerät untersuchen",d:"Den defekten Power Regulator (EN) ansehen. Auf PS5 L1 halten, um ihn anzuvisieren, und mit Quadrat bedienen."},
  {t:"Tastenfolge eingeben",d:"Das Gerät hat zwei Tastenreihen, Reihen von oben und Spalten von links gezählt. Drücke: Reihe 2 Spalte 1, Reihe 1 Spalte 3, Reihe 2 Spalte 3, Reihe 1 Spalte 4, Reihe 1 Spalte 5. Die beiden beschädigten Tasten brauchst du nicht."},
  {t:"Zwischensequenz",d:"Nach der fünften Taste läuft das Gerät wieder an und eine Zwischensequenz startet. Weiter geht es mit Ungeschickte Hände, fester Wille."}
 ],
 belohnung:["Kein eigener Gegenstand in diesem Schritt, die Reihe gibt später unter anderem die Verbesserte Fatum-Handkanone"],
 hinweise:[
  {kind:"warn",txt:"Keine zusätzlichen Tasten drücken: Nur die fünf Tasten der Folge sind nötig, Extratasten sind laut Whisper of the House der häufigste Fehler."},
  {kind:"info",txt:"Laut Gaming Deputy sitzt der Dekan im Archiv, Vargus im Amphitheater, und das Gerät steht im Anbau."},
  {kind:"info",txt:"Die Tasten für PC und Xbox nennt keine geprüfte Quelle."}
 ],
 abgrenzung:"Fremde Werkstatt ist kein eigener Ort, sondern ein Questschritt am Scholastein-Institut. Die Reihe beginnt vorher in einer Werkstatt, laut Game8 im Graumähnen-Camp, laut Whisper of the House im Nordwesten von Pailune.",
 suchbegriffe:["fremde werkstatt","unfamiliar workshop","power regulator","power regulator rätsel","operate the power regulator","tastenfolge","scholastein","scholastein-institut","dekan grundir","vargus","geschmiedete entschlossenheit","forged resolve","oongka"],
 quellen:[{t:"GameRant: Power Regulator",url:"https://gamerant.com/crimson-desert-operate-power-regulator-restore-function-puzzle/",datum:"2026-11-14"},{t:"Game8: DLC-Fraktionsquests",url:"https://game8.co/games/Crimson-Desert/archives/635794",datum:"2026-11-14"},{t:"Whisper of the House: Forged Resolve",url:"https://www.whisperofthehouse.com/crimson-desert/forged-resolve",datum:"2026-11-14"},{t:"Gaming Deputy: Régulateur de puissance",url:"https://www.gamingdeputy.com/france/crimson-desert-regulateur-de-puissance-2/",datum:"2026-11-14"},{t:"Gaming Deputy: Forged Resolve",url:"https://www.gamingdeputy.com/france/crimson-desert-forged-resolve-soluce-oongka/",datum:"2026-11-14"}],
 conf:"belegt", seo:{seite:"charting-the-unknown", h3:"Fremde Werkstatt: Lösung mit Power-Regulator-Rätsel"}},
{slug:"ruestung-der-leere", de:"Rüstung der Leere", en:"Void Armor Set (Knight of Void)", art:"item",
 sec:"armorsets", ziel:"[data-s^=\"void-set (knight of void)\"]",
 kurz:"So nennen Guides die fünf Plattenteile der Leere aus dem DLC Charting the Unknown, dazu kommt das Langschwert der Leere. Rüstung und Schwert gibt es beim Boss Ritter der Leere, die übrigen vier Teile liegen in versteckten Anlagen mit Fallen und Hebeln.",
 voraussetzung:["DLC Charting the Unknown","Für Helm und Umhang empfohlen: Kliffs Reihe Jenseits der Ränder spielen, dann ist der Sandsturm leichter zu durchqueren"],
 schritte:[
  {t:"Plattenrüstung und Langschwert (Buried Corridor, EN)",d:"An einer großen Klippe am Meer in der Trivana-Meerenge, auf der Karte etwa über dem R im Schriftzug Crimson Desert. Der Eingang ist eine Illusion im Fels, du gehst einfach hindurch. Den Gang an den Fallen vorbei, am Ende links den Hebel ziehen und den Ritter der Leere besiegen. Er lässt das Langschwert der Leere fallen, die Truhe mit der Plattenrüstung steht in einem Nebenraum des Bosssaals."},
  {t:"Plattenhelm (Forgotten City, EN)",d:"Im Ödland des Ahnen, mitten im Sandsturmgebiet. In der runden Ruine auf die losen Steinplatten in der Mitte treten, der Boden bricht ein. Unten an Stolperdrähten und Feuerfallen vorbei bis zum Gittertor, die zwei Laternen davor anzünden und im nächsten Raum die Truhe öffnen."},
  {t:"Plattenumhang (Ausgetrockneter Wasserweg)",d:"Nördlich von Urd'avah am nordöstlichen Rand des Sandsturms. Der quadratische Höhleneingang in der Westwand ist offen sichtbar. Über die Stachelgrube gleiten oder die Seilrutsche nehmen, rechts halten, an der Feuerfalle vorbei und am Ende links den Hebel ziehen. Dahinter öffnet sich der Raum mit der Truhe."},
  {t:"Plattenhandschuhe (Room of Brass Shackles, EN)",d:"Vom Abyss-Nexus Händlerreich nach Osten zu den Klippen nördlich des Schriftzugs Crimson Desert. Bei den Blutgestein-Vorkommen durch den Fels gehen, der wie ein Höhleneingang ohne Öffnung aussieht. Innen den Hebel ziehen, übers Wasser gleiten und Stolperdrähten ausweichen. Von den drei Hebeltüren am Ende die rechte öffnen, die anderen führen in Fallenräume."},
  {t:"Plattenstiefel (Die Geheimkammer des Grabräubers)",d:"Westlich von Händlerreich an der Küste der Trivana-Meerenge durch den auffälligen Fels in der Westklippe gehen. Die Treppe hinunter und durch den Fallenraum, dann an den elektrischen Eisenkugeln vorbei (Game8 rät, dicht an der Wand zu bleiben). Danach die linke Tür nehmen und den Hebel ziehen, die Truhe steht im geöffneten Raum."}
 ],
 belohnung:["Plattenhelm, Plattenrüstung, Plattenhandschuhe, Plattenstiefel und Plattenumhang der Leere","Langschwert der Leere (Zweihänder mit der Abyss-Ausrüstung Urteil des Ruins)"],
 hinweise:[
  {kind:"warn",txt:"Mehrere Eingänge sind Illusionen im Fels. Wo eine Felswand verdächtig aussieht, einfach hineinlaufen."},
  {kind:"info",txt:"Einen Set-Bonus nennt keine Quelle. Die Werte der Einzelteile stehen bei den Rüstungen."},
  {kind:"info",txt:"Game8 beschreibt die Truhe der Plattenrüstung in einem vergitterten Nebenraum, den eine von zwei Laternen am Eingang öffnet. GameRant und KeenGamer nennen einen kleinen Raum nördlich der Saalmitte, vermutlich derselbe."}
 ],
 suchbegriffe:["rüstung der leere","void armor","void set","void armor set","knight of void","ritter der leere","plattenrüstung der leere","plattenhelm der leere","plattenumhang der leere","plattenhandschuhe der leere","plattenstiefel der leere","langschwert der leere","buried corridor","forgotten city","room of brass shackles"],
 quellen:[{t:"Game8: Void Armor Set",url:"https://game8.co/games/Crimson-Desert/archives/637024",datum:"2026-11-14"},{t:"GameRant: Knight of Void Armor Set",url:"https://gamerant.com/crimson-desert-knight-void-armor-set-locations/",datum:"2026-11-14"},{t:"KeenGamer: Knight of the Void Armor Set",url:"https://www.keengamer.com/articles/guides/crimson-desert-how-to-get-knight-of-the-void-armor-set/",datum:"2026-11-14"}],
 conf:"belegt", seo:{seite:"ruestungen", h3:"Rüstung der Leere (Void Armor): alle Fundorte"}},
{slug:"stab-und-flinkes-stossen", de:"Stab und Flinkes Stoßen", en:"Stab / Swift Stab", art:"skill",
 sec:"skills", ziel:"sk-kliff-stab",
 kurz:"Gesucht wird meist Kliffs Stoß-Fähigkeit Stab (EN) aus dem Ausdauerbaum, die du von Anfang an hast. Ihr bekanntester Ausbau ist Flinkes Stoßen: ein zweiter Treffer direkt nach einem gelungenen aufgeladenen Stoß.",
 voraussetzung:["Figur Kliff, Ausdauerbaum","Abyss-Artefakte für die Ausbaustufen"],
 schritte:[
  {t:"Stab einsetzen",d:"Auf PS5 R1 und Dreieck: Kliff holt aus und stößt schnell nach vorn, der Treffer verursacht Blutung. Kosten 40 Ausdauer.",conf:"einzelquelle"},
  {t:"Stab ausbauen",d:"Stab hat drei Stufen. Ab Stufe 2 lassen sich Flinkes Stoßen und Aufspießender Stoß lernen, ab Stufe 3 der Sprungstoß in der Luft."},
  {t:"Flinkes Stoßen lernen, Weg 1",d:"Stab auf Stufe 2 bringen und Flinkes Stoßen mit einem Abyss-Artefakt freischalten."},
  {t:"Flinkes Stoßen lernen, Weg 2",d:"Kostenlos durch Beobachten: im Kampf gegen den Riedteufel am Ende von Kapitel 3 (Quest Tanz mit dem Teufel) seinen schnellen Stoß ansehen, bis das Spiel die Fähigkeit als gelernt meldet."},
  {t:"Flinkes Stoßen auslösen",d:"Trifft der aufgeladene Stoß, sofort die Angriffstaste nachlegen (PS5: R1). Kliff setzt einen zweiten Angriff nach, das kostet 50 Ausdauer."}
 ],
 belohnung:["Keine Gegenstände: neue Angriffe im Ausdauerbaum"],
 hinweise:[
  {kind:"info",txt:"Der deutsche Name des Grundskills ist nicht sicher belegt: GamePro schreibt Stoßen, die deutsche Datenbank crimsondesert.gg Stechen. Die Ableger heißen Flinkes Stoßen, Aufspießender Stoß, Sprungstoß und Phantom: Stoß."},
  {kind:"info",txt:"Den Sprungstoß haben seit Patch 1.07.00 auch Damiane und Oongka."}
 ],
 suchbegriffe:["stoßen","stoßen skill","stechen","stab","swift stab","flinkes stoßen","aufspießender stoß","sprungstoß","riedteufel","reed devil","beobachten","watch and learn"],
 quellen:[{t:"Game8: Swift Stab",url:"https://game8.co/games/Crimson-Desert/archives/587289",datum:"2026-11-14"},{t:"Fextralife: Swift Stab",url:"https://crimsondesertgame.wiki.fextralife.com/Swift+Stab",datum:"2026-11-14"},{t:"Fextralife: Stab",url:"https://crimsondesertgame.wiki.fextralife.com/Stab",datum:"2026-11-14"},{t:"PC Gamer: Observe-Fähigkeiten",url:"https://www.pcgamer.com/games/action/crimson-desert-observe-this-skill-in-action-to-learn-it",datum:"2026-11-14"},{t:"GamePro: Kliff-Build",url:"https://www.gamepro.de/artikel/crimson-desert-kliff-build,3450030.html",datum:"2026-11-14"},{t:"crimsondesert.gg: Kliff-Skillbaum",url:"https://crimsondesert.gg/de/skill-tree/kliff",datum:"2026-11-14"}],
 conf:"belegt", seo:{seite:"skills", h3:"Stoßen-Skill: Stab und Flinkes Stoßen lernen"}},
{slug:"hai-zaehmen", de:"Hai zähmen", en:"Shark (taming)", art:"thema",
 sec:"mounts", ziel:"[data-mn=\"Shark\"]",
 kurz:"Haie sind Unterwasser-Reittiere aus dem DLC Charting the Unknown. Du betäubst einen Hai mit Kraftfaust, steigst auf und gewinnst das Zähm-Minispiel, danach rufst du ihn als besonderes Reittier.",
 voraussetzung:["DLC Charting the Unknown und Zugang zum Ozean (Ozean-Reihe nach Kapitel 3 Heulender Hügel und Camp-Ausbau)","Kraftfaust (Kliff lernt sie in Kapitel 1)","Möglichst hohe Ausdauer, weil das Minispiel viel kostet, und Tauchausrüstung"],
 schritte:[
  {t:"Hai suchen",d:"Haie sind im Ozean häufig, feste Spawnpunkte gibt es nicht. Viele schwimmen rund um die Inseln, etwa bei der Insel der roten Hänge."},
  {t:"Möglichst ohne Waffen",d:"Waffenschaden kann den Hai töten, dann lässt er sich nicht mehr zähmen. Am sichersten ist Kraftfaust allein."},
  {t:"Mit Kraftfaust betäuben",d:"Kommt der Hai nah heran, mit Kraftfaust auf den Kopf schlagen, bis er betäubt ist."},
  {t:"Aufsteigen und Minispiel",d:"Auf den betäubten Hai steigen. Im Minispiel die Kamera so drehen, dass du die Schwanzflosse siehst, und gegen ihre Bewegung steuern, bis die Anzeige voll ist. Das kostet viel Ausdauer."},
  {t:"Registrieren und rufen",d:"Danach ist der Hai ein dauerhaftes Reittier. Laut Game8 rufst du ihn über den Reiter Special Mounts (EN) der Reittierauswahl."}
 ],
 belohnung:["Hai als dauerhaftes Unterwasser-Reittier"],
 hinweise:[
  {kind:"warn",txt:"Füttern zähmt Haie nicht."},
  {kind:"info",txt:"Power Up Gaming rät, den Hai vorher mit dem Harpunengewehr zu ermüden, ohne ihn zu töten. Game8 rät von jedem Waffeneinsatz ab, der sichere Weg ist nur Kraftfaust."},
  {kind:"info",txt:"Schwertwale zähmst du laut Game8 genauso, den Goldhai laut KeenGamer ebenfalls mit Kraftfaust. Der Hammerhai ist eine eigene, schnellere Art."}
 ],
 suchbegriffe:["hai","hai zähmen","haie zähmen","shark","shark mount","tame shark","unterwasser reittier","kraftfaust","force palm","schwertwal","orca","goldhai","hammerhai"],
 quellen:[{t:"Game8: Hai zähmen",url:"https://game8.co/games/Crimson-Desert/archives/636416",datum:"2026-11-14"},{t:"Game8: Unterwasser-Reittiere",url:"https://game8.co/games/Crimson-Desert/archives/635858",datum:"2026-11-14"},{t:"Game8: DLC-Fraktionsquests",url:"https://game8.co/games/Crimson-Desert/archives/635794",datum:"2026-11-14"},{t:"Power Up Gaming: Shark Mount",url:"https://powerupgaming.co.uk/2026/10/31/how-to-tame-shark-mount-in-crimson-desert-charting-the-unknown/",datum:"2026-11-14"},{t:"KeenGamer: Golden Shark",url:"https://www.keengamer.com/articles/guides/crimson-desert-how-to-get-legendary-golden-shark-mount/",datum:"2026-11-14"}],
 conf:"belegt", seo:{seite:"mounts", h3:"Hai zähmen: Schritt für Schritt"}},
{slug:"unbekanntes-tier", de:"Unbekanntes Tier", en:"Mysterious Animals", art:"thema",
 sec:"pets", ziel:null, ort:"#legendary-pet-guide",
 kurz:"Unbekanntes Tier (englisch Mysterious Animals) ist eine Kategorie der Herausforderungen. Belegt sind zwei Aufgaben: die Hyazinthara und den Uhrwerk-Adler zähmen.",
 voraussetzung:["Totempfahl der Bindung (Belohnung der Mission Das Tor entriegeln aus der Reihe Zitternde Wälder)","Futter: Wüstenmelonen für die Hyazinthara, Quecksilber für den Uhrwerk-Adler"],
 schritte:[
  {t:"Hyazinthara: Ort",d:"Am Außenpostenlager am Hof des Riesen über dem Rotbaumwald nahe dem Roten Fluss. Das Lager vorher befreien: PC Gamer hält das für hilfreich, FinalBoss und Gfinity für nötig, damit der Vogel erscheint."},
  {t:"Hyazinthara: zähmen",d:"Den Totempfahl der Bindung an der Klippe östlich des Lagers aufstellen und Wüstenmelonen einlegen, jede bringt 15 Vertrauen. 10 bis 15 Melonen mitnehmen, weil kleine Vögel mitfressen. Bei 100 Vertrauen den Vogel aufnehmen (EN Take In)."},
  {t:"Uhrwerk-Adler: Ort und Zeit",d:"An den Falkenstein-Ruinen im Osten von Delesyia, auf der Karte über dem A von Delesyia. Der Zahnrad-Mechanismus arbeitet nur kurz in der Morgendämmerung, laut games.gg etwa von 4:45 bis 5:00 Uhr Spielzeit. Die Uhrzeiten schwanken je nach Quelle, also lieber früher da sein."},
  {t:"Uhrwerk-Adler: zähmen",d:"Den Totempfahl aufstellen und Quecksilber als Futter einlegen, laut games.gg und Gfinity mindestens 20 Stück. Den ausführlichen Ablauf zeigt die Karte zum Iron Eagle direkt darüber."}
 ],
 belohnung:["Je gezähmtem Tier ein Haustierheim mit 10 zusätzlichen Haustierplätzen (Wiki-Daten aus questlog)"],
 hinweise:[
  {kind:"info",txt:"Gesucht wird oft Die enthüllte Wahrheit. Ein VULKK-Guide ordnet Unbekanntes Tier der Gruppe The Truth Unveiled zu. Die Seite war für uns nicht abrufbar, und ob die Gruppe im deutschen Spiel Die enthüllte Wahrheit heißt, konnten wir nicht aus dem Spieltext belegen."},{kind:"info",txt:"Laut FinalBoss zuerst die Hyazinthara zähmen, weil sie nach dem Uhrwerk-Adler womöglich nicht mehr erscheint."},
  {kind:"info",txt:"Derselbe VULKK-Guide nennt seit Patch 2.04.00 drei weitere Aufgaben dieser Kategorie: Goldener Schmetterling, Goldener Prachtkäfer und Goldener Riesenkäfer. Ohne lesbare Quelle führen wir sie hier ohne Fundorte."},
  {kind:"info",txt:"Die Hyazinthara erscheint zufällig, das Warten kann dauern."}
 ],
 suchbegriffe:["die enthüllte wahrheit","the truth unveiled","unbekanntes tier","mysterious animals","herausforderung","challenge","hyazinthara","hyacinth macaw","uhrwerk-adler","iron eagle","clockwork eagle","haustierheim","totempfahl der bindung","wüstenmelone","quecksilber"],
 quellen:[{t:"PC Gamer: Hyacinth Macaw",url:"https://www.pcgamer.com/games/action/crimson-desert-hyacinth-macaw-location-tame/",datum:"2026-11-14"},{t:"FinalBoss: Hyacinth Macaw",url:"https://finalboss.io/crimson-desert-how-to-tame-the-hyacinth-macaw",datum:"2026-11-14"},{t:"Gfinity: Hyacinth Macaw",url:"https://www.gfinityesports.com/article/how-to-get-the-hyacinth-macaw-pet-in-crimson-desert",datum:"2026-11-14"},{t:"Gfinity: Iron Eagle",url:"https://www.gfinityesports.com/article/how-to-find-and-tame-the-legendary-iron-eagle-in-crimson-desert",datum:"2026-11-14"},{t:"games.gg: Eisenadler",url:"https://games.gg/de/crimson-desert/guides/crimson-desert-eisenadler-erhalten/",datum:"2026-11-14"}],
 conf:"belegt", seo:{seite:"pets", h3:"Unbekanntes Tier (The Truth Unveiled): Lösung"}},
{slug:"geschenke-fuer-hexen", de:"Geschenke für Hexen", en:"Witch Gifts", art:"thema",
 sec:"romanze", ziel:"rom-geschenke",
 kurz:"Geschenke heben bei den Hexen Elowen, Bari, Lyselia und Areciel zuerst das normale Vertrauen. Am meisten bringen Ring der Hexen und Goldbarren, für die Romanze zählt danach nur ein Geschenk pro Spieltag.",
 voraussetzung:["Sanktum-Quests der jeweiligen Hexe abgeschlossen, Geschenke ersetzen das nicht","Hexen heiraten kann nur Kliff"],
 schritte:[
  {t:"Questreihe der Hexe abschließen",d:"Erst wenn die Sanktum-Reihe der Hexe erledigt ist, lässt sich mit ihr flirten. Welche Quests genau nötig sind, geben die Quellen je Hexe unterschiedlich an."},
  {t:"Vertrauen auf 100 bringen",d:"Ring der Hexen und Goldbarren bringen bei den Hexen je bis zu 100 Vertrauen. Auch das Geheimnisvolle Geschenk bringt viel, laut einer Community-Datenbank bei Lyselia ebenfalls 100. Hirschgeweih-Tee (Rezept im Hexenhaus am Roten See) und passende Blumentöpfe wie der Topf mit einem Wüstenkaktus bringen je 20."},
  {t:"Erst dann flirten",d:"Bei 100 Vertrauen flirten. Wer zu früh flirtet, verliert 10 Vertrauen."},
  {t:"Täglich pflegen",d:"Nach dem Flirt jeden Spieltag grüßen, einmal plaudern und ein Geschenk geben. Mehr als ein Geschenk am Tag bringt für die Romanze nichts, auch ein Mehrfachgeschenk zählt nur einmal."},
  {t:"Antrag",d:"Mit voller Romanzeleiste und erledigten Romanzequests ist ein Antrag möglich. Verheiratet sein kannst du nur mit einer Person."}
 ],
 belohnung:["Mehr Vertrauen, Romanze und am Ende die Heirat"],
 hinweise:[
  {kind:"warn",txt:"Die Punktwerte gelten für das normale Vertrauen. Wie viel ein Geschenk auf der Romanzeleiste bringt, nennt keine geprüfte Quelle."},
  {kind:"info",txt:"Ring der Hexen: Areciel verkauft ihn laut den Wiki-Daten (questlog) für 500 Silber, GuideDragon nennt 25 Silber. Außerdem gibt es ihn als Belohnung des Kampfs gegen Goyen in Kapitel 9."},
  {kind:"info",txt:"Goldbarren: GIGA nennt allgemein 10 Vertrauen, GuideDragon und Game Overdrive bis zu 100 bei den Hexen. Vermutlich hängt der Wert von der Person ab."},
  {kind:"info",txt:"Laut GuideDragon beendet die Heirat die Romanzen mit den anderen Hexen, und der Laden der Ehefrau kann wegfallen."}
 ],
 suchbegriffe:["geschenke für hexen","hexen geschenke","geschenk hexe","witch gifts","ring der hexen","witch's ring","goldbarren","gold bar","geheimnisvolles geschenk","hirschgeweih-tee","wüstenkaktus","vertrauen","flirten","elowen","bari","lyselia","areciel","heiraten"],
 quellen:[{t:"GuideDragon: Alle 4 Hexen heiraten",url:"https://guidedragon.de/en/guides/crimson-desert-alle-4-hexen-heiraten-geschenke-vertrauen-flirten/",datum:"2026-11-14"},{t:"Game8: Romanze",url:"https://game8.co/games/Crimson-Desert/archives/584417",datum:"2026-11-14"},{t:"GIGA: Romanze und Heirat",url:"https://www.giga.de/games/crimson-desert-romanze-starten-beziehungen-beginnen-heiraten--01M66GXSGA89E1VD0ZE0T85WQ8",datum:"2026-11-14"},{t:"Game Overdrive: Lyselia",url:"https://gameoverdrive.com.br/crimson-desert-lyselia-romance-como-casar/",datum:"2026-11-14"},{t:"Nerdschalk: Ring der Hexen",url:"https://nerdschalk.com/crimson-desert-witchs-ring-and-greymanes-earring-location-achieve-enlightenment-in-nest-of-valor-thinning-blade/",datum:"2026-11-14"}],
 conf:"belegt", seo:{seite:"hexen", h3:"Geschenke für Hexen: was wirkt"}},
/* LOES-KUER Ende */
];
const LOESUNGEN = LOESUNGEN_PFLICHT.concat(LOESUNGEN_KUER);
