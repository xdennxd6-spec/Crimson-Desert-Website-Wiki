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
/* LOES-KUER Ende */
];
const LOESUNGEN = LOESUNGEN_PFLICHT.concat(LOESUNGEN_KUER);
