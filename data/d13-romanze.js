// d13-romanze.js: Seite "Romanze & Ehe" (Sektion romanze, URL /romanze), angelegt am 05.11.2026 im Nachtlauf romanze.
// Faktenbasis: ~/cdwiki-nacht/auftraege/romanze/FAKTEN.md, Stand 05.11.2026 (F = Nummer dort). Nichts davon wurde im Spiel getestet.
//
// Feldvertrag wie data/d12-dlc.js: Wert = "Text" | {v:"Text", c:"unb"|"nb", q:"Quelle"} | Liste solcher Werte.
//   normaler Text = amtlich (Pearl-Abyss-Notice), Spieldaten oder mindestens zwei unabhaengige Guides
//   c:"unb" = eine Quelle oder eigener Schluss, grau mit Vermerk; c:"nb" = nicht belegt
// Die Renderer stehen unten in dieser Datei und nutzen die Helfer des Fundaments (cdFold, cdPills, cdHero ...) und _dlcV/_dlcP
// aus index.html. CSS in app.css zwischen den Ankern ROM Anfang und ROM Ende, Praefix rom-.
// Die SEO-Seite (scripts/seo-parts/romanze.mjs) liest dieselben Konstanten per extract(): reine Datenliterale, keine Funktionen.

const ROM_META = {
  checked: "05.11.2026",
  stand: "2.04.07",
  since: "29.10.2026",
  planNote: "Empfehlung dieses Wikis, abgeleitet aus den Belegen. Einen berechneten schnellsten oder billigsten Weg gibt es nicht, weil die Punktwerte auf der erweiterten Stufe bis auf eine Einzelangabe fehlen."
};

// Auf einen Blick. F 1.2 bis 1.6, 1.10, 4.1 bis 4.3, 4.7, 5.2, 5.7
const ROM_PATH = [
  {t: "Herz prüfen", d: "Im Interaktionsmenü zeigt ein Herz an der Vertrauensanzeige, dass die Person romantisierbar ist. Durchgestrichen heißt: nicht romantisierbar, auch nicht mit mehr Vertrauen."},
  {t: "Vertrauen auf 100", d: "Erst das normale Vertrauen füllen: grüßen, erzählen, schenken, Aufträge erledigen."},
  {t: "Flirten", d: "Interagieren > Flirten. Beim ersten Erfolg überreichst du Blumen, danach läuft die zweite Leiste."},
  {t: "Erweiterte Stufe auf 100", d: "Schenken und Erzählen, je Art einmal pro Spieltag."},
  {t: "Heiratsantrag", d: "Möglich bei 100. Hexen verlangen zusätzlich ihre Sanktum-Quests und die Romanze-Reihe."},
  {t: "Hochzeit", d: "Eine eigene Szene. Danach kann der Partner mitreisen, und du kannst ihm einen Wohnsitz zuweisen."}
];

// Die zwei Leisten. F 1.2, 1.3, 3.4, 4.1
const ROM_GAUGES = [
  {t: "Normales Vertrauen", en: "Trust", d: "Die bekannte Vertrauensleiste. Flirten verlangt hier 100; das sagen die Guides, die Notice nennt es nicht ausdrücklich.",
    marks: [{at: 100, t: "Flirten möglich"}]},
  {t: "Erweiterte Stufe", en: "Guides: Romanzeleiste", d: "Beginnt bei 0 und zählt bis 100; dort ist der Antrag möglich. Neue Reihen-Quests der Hexen erscheinen nahe 50, 75 und 100; diese Zahlen stammen aus Guides, nicht von Pearl Abyss.",
    marks: [{at: 50, t: "Quest", near: true}, {at: 75, t: "Quest", near: true}, {at: 100, t: "Antrag"}]}
];

// Vergleich je spielbarem Charakter. F Abschnitt 2 (Tabelle), W1, W2
// k: yes | no | open | warn. flag: Kurzvermerk im Tabellenfeld, q: voller Text fuer den Tooltip
const ROM_FIGS = [
  {id: "kliff", name: "Kliff", port: "cd_assets/romanze/fig-kliff.webp"},
  {id: "oongka", name: "Oongka", port: "cd_assets/romanze/fig-oongka.webp"},
  {id: "damiane", name: "Damiane", port: "cd_assets/romanze/fig-damiane.webp"}
];
const ROM_MATRIX = [
  {t: "Romanze allgemein", kliff: {k: "yes", t: "Ja"}, oongka: {k: "yes", t: "Ja"}, damiane: {k: "yes", t: "Ja"}},
  {t: "Hexen umwerben", kliff: {k: "yes", t: "Ja"},
    oongka: {k: "open", t: "Ungeklärt", flag: "nicht belegt", q: "Game8 sagt ja, VICE sagt nein."},
    damiane: {k: "open", t: "Ungeklärt", flag: "nicht belegt", q: "Game8 sagt ja, VICE sagt nein."}},
  {t: "Hexen heiraten", kliff: {k: "yes", t: "Ja"}, oongka: {k: "no", t: "Nein"}, damiane: {k: "no", t: "Nein"}},
  {t: "NPCs mit Herz heiraten", kliff: {k: "yes", t: "Ja", flag: "Game8", c: "unb"}, oongka: {k: "yes", t: "Ja", flag: "Game8", c: "unb"}, damiane: {k: "yes", t: "Ja", flag: "Game8", c: "unb"}},
  {t: "Auch gleichgeschlechtlich", kliff: {k: "yes", t: "Ja, bei Herz"}, oongka: {k: "yes", t: "Ja, bei Herz"}, damiane: {k: "yes", t: "Ja, bei Herz"}},
  {t: "Eigener Wohnsitz", kliff: {k: "yes", t: "Vorhanden", flag: "Game8", c: "unb"}, oongka: {k: "warn", t: "Muss gebaut werden", flag: "Game8", c: "unb"}, damiane: {k: "warn", t: "Muss gebaut werden", flag: "Game8", c: "unb"}},
  {t: "Fehler bei Graumähnen-Quests", kliff: {k: "yes", t: "Keiner"}, oongka: {k: "warn", t: "Fraktions­quests hängen"}, damiane: {k: "warn", t: "Fraktions­quests hängen"}}
];
const ROM_MATRIX_NOTE = ["Hexen heiraten: nur als Kliff. Das sagen Game8 und VICE ausdrücklich, und in den Spieldaten tragen alle Romanze-Missionen den Namen Kliff.",
  "Pearl Abyss bestätigt das nicht. Andere Guides sagen allgemein „alle drei“, ohne die Hexen gesondert zu nennen.", {v: "OutputLag gibt vom Starttag den Bericht eines Spielers über eine Ehe Damiane und Bari weiter, ohne Beleg.", c: "unb", q: "Gegenstimme OutputLag"}];
const ROM_FIG_HINT = {
  kliff: "Als Kliff heiratbar: die vier Hexen und laut Game8 NPCs mit Herz.",
  oongka: "Als Oongka heiratbar laut Game8: NPCs mit Herz. Die Hexen bleiben ausgegraut sichtbar, weil sie nur Kliff heiratet.",
  damiane: "Als Damiane heiratbar laut Game8: NPCs mit Herz. Die Hexen bleiben ausgegraut sichtbar, weil sie nur Kliff heiratet."
};

// Die vier Hexen. F 2.1, 2.13 bis 2.15, Tabelle Fundort/Einstieg/Sanktums, Abschnitt 3, W7, W8, W14, W15
const ROM_WITCHES = [
  {id: "elowen", name: "Elowen", title: "Hexe der Weisheit", titleEn: "Witch of Wisdom", region: "Hernand", color: "#20a070", port: "cd_assets/npcs/witch-elowen.webp",
    lead: "Blumenumgebene Hütte in den Witchwoods. Ihre Reihe beginnt mit einem Gespräch über das Wissen.",
    where: "Blumenumgebene Hütte in den Witchwoods nahe dem Alfonso-Anwesen, Hernand.",
    entry: ["Kapitel 5, „The Missing Seal“: Haus im Alfonso-Anwesen untersuchen, dann Quest „The Witch of Wisdom“.", {v: "Dazwischen mit Tanya sprechen.", c: "unb", q: "Game8"}],
    sanct: ["Absolution", "Temperance", "Penitence", "Benediction"],
    sanctLoc: {v: "Absolution südlich von Hernand, Temperance Unicorn Cliff, Penitence The Ironwood, Benediction westlich von Hernand.", c: "unb", q: "KeenGamer"},
    orders: {v: "5 Aufträge: Einführung und 4 Sanktums.", c: "unb", q: "Game Overdrive"},
    series: "Missing Final Page", seriesDe: "Ein Buch ohne letzte Seite", seriesFlag: {v: "Zuordnung des Reihennamens zu Elowen", c: "unb", q: "eigener Schluss aus Game Overdrive"},
    steps: [
      {en: "On Knowing", de: "Über das Wissen", d: "Elowen aufsuchen und über ihre Gedanken sprechen."},
      {en: "New Questions", de: "Eine neue Frage", d: ["Nach dem Gespräch über Weisheit kommt ein Brief. Brief lesen.", {v: "Treffen an einer Klippe im Gebiet des Reventine-Klosters.", c: "unb", q: "Game Overdrive"}]},
      {en: "An Evening Toast", de: "Ein Prost zum Abend", d: ["Ein besonderes Geschenk vorbereiten, das ihre Vernunft aufweicht.", {v: "Rezept im Kessel: 2 Wasser, 1 Zucker, 2 Früchte.", c: "unb", q: "Game Overdrive"}]},
      {en: "Known Answers", de: "Die Antwort vor Augen", d: "Elowen die wahren Gefühle sagen."},
      {en: "Propose to Elowen", de: "Mache Elowen einen Heiratsantrag", d: "Eigene Aufgabe nach der Reihe.", last: true}
    ],
    goals: "„Make fruit wine to drink with Elowen“ und „Bring drinks to share with Elowen“",
    extra: {v: "Nach der Heirat bleibt Elowen Anbieterin für Abyss-Ausrüstung.", c: "unb", q: "Game Overdrive"},
    imgs: [
      {f: "elowen-reihe", alt: "Elowen mit rotem Hexenhut steht auf einer Wiese vor einem Dorf"},
      {f: "elowen-date-i", alt: "Zwei Gestalten sitzen von hinten gesehen im Gras und blicken auf ein Gebirge"},
      {f: "elowen-date-ii", alt: "Zwei silberne Kelche auf einem Holztisch zwischen rosa Blumen"},
      {f: "elowen-antrag", alt: "Elowen und eine Gestalt mit Rundschild in einem Raum mit Regal"}
    ]},
  {id: "bari", name: "Bari", title: "Hexe der Güte", titleEn: "Witch of Kindness", region: "Pailune", color: "#4a8aca", port: "cd_assets/npcs/witch-bari.webp",
    lead: "Hütte mitten im Blutroten See. Hinter ihren knappen Bemerkungen steckt mehr.",
    where: "Hütte mitten im Blutroten See (Crimson Lake), Pailune, am Silver Wolf Mountain.",
    entry: "Frierende Gestalt im Unterstand in der Tundra Pailunes: Feuer entzünden, dann zum Crimson Lake, Quest „The Witch of Kindness“. Die Ortsangaben der Guides weichen ab.",
    sanct: ["Exaltation", "Solace", "Deliverance", "Atonement"],
    sanctLoc: "Exaltation am Silver Wolf Mountain, Solace Zentral-Pailune, Deliverance Stormtalon Ridge, Atonement Haunted Hill.",
    orders: {v: "5 Aufträge: Einführung und 4 Sanktums.", c: "unb", q: "Game Overdrive"},
    series: "Beyond the Words", seriesDe: "Wahre Gefühle hinter den Worten", seriesFlag: {v: "Zuordnung des Reihennamens zu Bari", c: "unb", q: "Game Overdrive"},
    steps: [
      {en: "The Heart Held Within", de: "Das behütete Herz", d: "Bari aufsuchen und herausfinden, was hinter ihren knappen Bemerkungen steckt."},
      {en: "Longing for the Ordinary", de: "Sehnsucht nach einem gewöhnlichen Leben", d: "Die Antwort kam gut an, ihr Brief ist da. Brief lesen."},
      {en: "An Unpredictable Heart", de: "Ein unberechenbares Herz", d: ["Dem jungen Mann mit der geheimen Methode helfen, die nur du von ihr kennst.", {v: "Dazu gehört die Palmar Pill.", c: "unb", q: "Game Overdrive"}]},
      {en: "Kind Words", de: "Freundliche Worte", d: "Bari gestehen, was man lange im Herzen trug."},
      {en: "Propose to Bari", de: "Mache Bari einen Heiratsantrag", d: "Eigene Aufgabe nach der Reihe.", last: true}
    ],
    goals: "„Make the Palmar Pill Bari told you about“, „Deliver medicine to Bari“ und „A Village Date with Bari“",
    imgs: [
      {f: "bari-reihe", alt: "Bari und eine Gestalt in Rüstung stehen unter einem roten Holztor vor einem Dorf"},
      {f: "bari-date-i", alt: "Dorf mit roten Holzhäusern zwischen Bäumen mit rotem Herbstlaub"},
      {f: "bari-date-ii", alt: "Aufgeschlagene Bücher und eine Sanduhr auf einem Holztisch"},
      {f: "bari-antrag", alt: "Bari mit blauem Hexenhut neben einer Gestalt mit Rundschild auf einer Brücke im Herbstlaub"}
    ]},
  {id: "lyselia", name: "Lyselia", title: "Hexe der Demut", titleEn: "Witch of Humility", region: "Demeniss", color: "#9a50d0", port: "cd_assets/npcs/witch-lyselia.webp",
    lead: "Verborgene Höhle im Serpent Marsh. Ihre Reihe führt aus der Höhle unter den Nachthimmel.",
    where: "Verborgene Höhle nahe dem Jijeong-Tempel im Serpent Marsh, Süden von Demeniss.",
    entry: "Die Person retten, die an der Brücke östlich von Beighen am Fluss Denn hängt; danach Quest „The Witch of Humility“.",
    sanct: ["Devotion", "Veneration", "Oblation", "Faith"],
    sanctLoc: {v: "Devotion Dewhaven, Veneration Blue Thicket am Mount Benus, Oblation Insel östlich von Delesyia, Faith Grey Forest.", c: "unb", q: "KeenGamer"},
    orders: {v: "5 Aufträge: Einführung und 4 Sanktums.", c: "unb", q: "Game Overdrive"},
    series: "Brave Steps", seriesDe: "Der erste mutige Schritt", seriesFlag: {v: "Zuordnung des Reihennamens zu Lyselia", c: "unb", q: "eigener Schluss aus Game Overdrive"},
    steps: [
      {en: "The Cave's Calling", de: "Der Ruf der Höhle", d: "Lyselia in der Höhle aufsuchen und vorsichtig ansprechen."},
      {en: "A World Beyond", de: "Jenseits der bekannten Welt", d: "Ihr Brief ist da. Brief lesen."},
      {en: "One Starry Night", de: "Sternennacht", d: "Hoffnung, dass ihr der Nachthimmel in Erinnerung bleibt."},
      {en: "Life Ahead of Us", de: "Die Welt, die vor uns liegt", d: "Gemeinsam unter den Sternen."},
      {en: "Propose to Lyselia", de: "Mache Lyselia einen Heiratsantrag", d: "Eigene Aufgabe nach der Reihe.", last: true}
    ],
    imgs: [
      {f: "lyselia-reihe", alt: "Einzelner großer Baum auf einer Wiese vor Felsklippen und blauem Himmel"},
      {f: "lyselia-date-i", alt: "Hohe Felsnadeln über einem Fluss unter blauem Himmel"},
      {f: "lyselia-date-ii", alt: "Zwei kleine Gestalten unter einem Baum auf einer Blumenwiese bei Nacht"},
      {f: "lyselia-antrag", alt: "Lyselia und eine Gestalt mit Umhang stehen in einer hohen grünen Wiese"}
    ]},
  {id: "areciel", name: "Areciel", title: "Hexe der Kraft", titleEn: "Witch of Strength", region: "Rote Wüste", color: "#c0392b", port: "cd_assets/npcs/witch-areciel.webp",
    lead: "Klippenhaus westlich von Urdavah. Ihre Reihe beginnt mit der Frage, warum sie nie pausiert.",
    where: "Klippenhaus im Schatten der Klippen der Roten Wüste, westlich von Urdavah, nahe World's Navel.",
    entry: "Dem bettelnden Kind am Kopfgeldbrett bei Tommaso eine Münze geben; danach Quest „The Witch of Strength“.",
    sanct: ["Expiation", "Renunciation", "Revelation"],
    sanctLoc: "Expiation Nord-Demeniss nahe dem Azerian-Anwesen, Renunciation nordöstlich des Drywind Valley, Revelation Serpent Marsh mit Bosskampf.",
    orders: {v: "4 Aufträge: Einführung und 3 Sanktums.", c: "unb", q: "Game Overdrive"},
    series: "Courage to Be Vulnerable", seriesDe: "Der Mut, Schwäche zu zeigen", seriesFlag: {v: "Zuordnung des Reihennamens zu Areciel", c: "unb", q: "Game Overdrive"},
    steps: [
      {en: "Resilience in the Sandstorm", de: "Standhaftigkeit im Sandsturm", d: "Areciel aufsuchen und fragen, warum sie nie pausiert."},
      {en: "The Undrawn Blade", de: "Das ungezogene Schwert", d: "Ihr Brief ist da. Brief lesen."},
      {en: "Power Yet Unleashed", de: "Noch nicht entfesselte Kraft", d: "Mit ihr sprechen, wo sie das Geschehen aus der Ferne beobachtet."},
      {en: "Someone to Lean On", de: "Ein Mensch zum Anlehnen", d: "Ihr die Gefühle gestehen."},
      {en: "Propose to Areciel", de: "Mache Areciel einen Heiratsantrag", d: "Eigene Aufgabe nach der Reihe.", last: true}
    ],
    goals: "„Return to Areciel“",
    imgs: [
      {f: "areciel-reihe", alt: "Rote Felsenstadt mit einem roten Stoffband über einem Weg"},
      {f: "areciel-date-i", alt: "Wüstendorf bei Nacht mit einer glühenden Feuerschale"},
      {f: "areciel-date-ii", alt: "Zwei Gestalten als Silhouetten in der Abenddämmerung, eine mit Rundschild"},
      {f: "areciel-antrag", alt: "Areciel mit breitkrempigem Hut vor einer Felslandschaft"}
    ]}
];
// F 3.1, 3.3, 3.4, 3.5, 3.6, 4.2, 4.3, Abschnitt 3 Einleitung
const ROM_WITCH_REQ = [
  "Sanktum-Quests dieser Hexe abgeschlossen. Geschenke ersetzen das nicht.",
  "Normales Vertrauen 100 vor dem ersten Flirt.",
  "Für die Heirat als Kliff spielen. Ob Oongka und Damiane sie umwerben können, ist ungeklärt.",
  "Eine Taube bringt ihren Brief; gelesen steht die Quest im Tagebuch. Neue Reihen-Quests erscheinen nahe 50, 75 und 100 auf der erweiterten Stufe."
];
const ROM_ORDER_NOTE = {v: "Reihenfolge erschlossen, nicht amtlich.", c: "unb", q: "Game Overdrive"};
const ROM_IMG_NOTE = "Spielbilder zu dieser Reihe aus den Spieldaten. Welcher Schritt zu welchem Bild gehört, ist nicht belegt.";
const ROM_CAND_NOTE = "Pearl Abyss hat keine Kandidatenliste veröffentlicht. Namentlich belegt sind nur die vier Hexen; die Spieldaten nennen sie, die Notice sagt nur „Hexen“.";
const ROM_CAND_FOOT = "Fundorte und Einstieg der Hexen stammen überwiegend aus Guides vor dem DLC. Je Hexe laufen zwei getrennte Linien: die Fraktionsreihe mit den Sanktums aus dem Basisspiel und die Romanze-Reihe aus dem DLC. Titel und Inhalte der Reihen stehen in den Spieldaten; die Reihenfolge ist aus deren Abschlusstexten erschlossen und stimmt mit Game Overdrive überein, amtlich ist sie nicht.";

// Alle anderen NPCs. F Abschnitt 2 Tabelle, 2.5 bis 2.7, 3.8, 4.4, Luecken 6 und 7
const ROM_NPCS = {
  title: "NPCs mit Herzsymbol",
  lead: "Ladenbesitzer, Handwerker, wandernde Bewohner und Orks können infrage kommen. Eine Namensliste gibt es in keiner Quelle.",
  rows: [
    ["Woran erkennen", "Nur am Herzsymbol an der Vertrauensanzeige im Interaktionsmenü. Durchgestrichen: nicht romantisierbar, unabhängig vom Vertrauen."],
    ["Beispiele", {v: "Schmied, Priester, Bettler.", c: "unb", q: "OutputLag"}],
    ["Questreihe", {v: "Keine eigene Reihe; bei Meilensteinen geben sie Rezepte oder Gegenstände.", c: "unb", q: "Game8"}],
    ["Antrag", {v: "Es genügt die Leiste. Das passt zur Notice, die nur für einige NPCs zusätzliche Voraussetzungen nennt.", c: "unb", q: "Game8"}],
    ["Spielfiguren", "Alle drei. Auch gleichgeschlechtlich, solange das Herz angezeigt wird; Kliff also auch mit Männern."],
    ["Spieldaten", {v: "Die Tabellen kennen einen Antrag im Laden und eine Bedingung „heiratbar“; das passt zu Ladenbesitzern als Kandidaten.", c: "unb", q: "eigene Auslegung"}]
  ],
  gap: "Namen und Fundorte weiterer Kandidaten sind nirgends belegt, weder je Figur noch insgesamt. Offen ist auch, ob Oongka und Damiane die Hexen umwerben können und ob die berichtete Ehe Damiane und Bari wirklich möglich war."
};
// F 2.8 bis 2.12, W6, W12
const ROM_OUT = {
  title: "Wer nicht infrage kommt",
  lead: "Die Spielfiguren untereinander, Graumähnen-Gefährten und einige Einzelfälle.",
  rows: [
    "Die drei Spielfiguren können einander nicht umwerben.",
    "Graumähnen-Gefährten sind nicht romantisierbar.",
    {v: "Goblins, Gassenhändler und Kinder sind ausgeschlossen.", c: "unb", q: "OutputLag"},
    {v: "Woosa und Naira zeigen keine Romanze-Option; Cordelia ist unbestätigt.", c: "unb", q: "OutputLag"},
    {v: "Sylvia und White Crow (Weiße Krähe) gelten als nicht romantisierbar; in den Spieltabellen fehlt für sie ein Eintrag.", c: "unb", q: "NoobFeed"}
  ]
};

// Empfohlenes Vorgehen. F Abschnitt 10, W1, W2
const ROM_PLAN = [
  {t: "Spiel aktuell halten", d: "Mindestens 2.04.05, weil die Antrags-Quests bei einigen Hexen davor hängen konnten."},
  {t: "Eine Figur je Zielperson", d: "Für eine Hexe Kliff wählen."},
  {t: "Herzsymbol prüfen", d: "Bevor du Zeit und Geschenke investierst."},
  {t: "Bei Hexen zuerst die Sanktums", d: ["Sanktums und Fraktionsreihe abschließen.", {v: "Das gibt ohnehin Vertrauen.", c: "unb", q: "games.gg"}]},
  {t: "Normales Vertrauen auf 100", d: "Täglich grüßen, erzählen, schenken, Aufträge erledigen; Solidarität und Hasenledermaske anlegen."},
  {t: "Erst bei 100 flirten", d: "Sonst kostet es 10 Vertrauen je Versuch."},
  {t: "Jeden Spieltag einmal schenken und erzählen", d: "Mit Schlafen beginnst du den nächsten Tag."},
  {t: "Bei rund 50, 75 und 100 auf den Brief achten", d: "Die Taube bringt ihn; dann die Reihe spielen."},
  {t: "Camp-Fest nutzen", d: "Wenn du viele Kandidaten aufbaust oder Tage sparen willst. Kosten stehen unten beim Fest."},
  {t: "Als Oongka oder Damiane vorher bauen", d: "Vor dem Antrag einen Wohnsitz errichten. Das ist eine Absicherung, solange die Pflicht ungeklärt ist."}
];
// F 1.13 bis 1.16, 1.23, 1.24, 1.26, 7.3
const ROM_VALUES = {
  up: [
    {k: "Grüßen", v: "+5", d: "normales Vertrauen"},
    {k: "Erzählen", v: "bis +20", d: "seltene Informationen; bei Game8 im Abschnitt zur Romanzeleiste", q: "Game8"},
    {k: "Aufträge", v: "meist +50", d: "Stand vor dem DLC", q: "Game8"},
    {k: "Solidarität I bis III", v: "+1 bis +3", d: "Stand vor dem DLC", q: "Game8"},
    {k: "Hasenledermaske", v: "+2 je Aktion", d: "Stand vor dem DLC", q: "Game8"}
  ],
  down: [
    {k: "Flirten vor Vertrauen 100", v: "−10", d: "je Versuch"},
    {k: "Antrag zu früh", v: "−15", d: "abgelehnt; Leiste nicht genannt", q: "GIGA"}
  ],
  foot: "Für die erweiterte Stufe ist sonst keine Zahl sicher zugeordnet: Neben den bis +20 beim Erzählen (nur Game8) sagt VICE nur „ein paar Punkte“, und die Geschenkwerte unten nennen keine Leiste."
};
// F 1.2, 1.6 bis 1.12, 1.15, 1.17, 1.18, 1.20 bis 1.25
const ROM_RULES = {
  title: "Regeln im Detail",
  lead: "Tageslimit, Spieltag, Herzsymbol, Kennenlern-Gespräch, Ausrüstung und was ohne DLC geht.",
  rows: [
    ["Seit wann", "Romanze und Heirat kamen mit DLC und Patch 2.04.00 am 29.10.2026. Artikel von März 2026, nach denen es keine Romanze gibt, sind überholt."],
    ["Tageslimit", ["Die erweiterte Stufe steigt je Interaktionsart nur einmal pro Tag; eine Gesamtgrenze nennt die Notice nicht. Gemeint ist der Spieltag. Nach einer Steigerung zeigt das Spiel die Wartezeit bis zur nächsten gleichen Steigerung an.", {v: "Grüßen zählt ebenfalls auf die erweiterte Stufe.", c: "unb", q: "Game8"}]],
    ["Spieltag", ["Schlafen beginnt den nächsten Tag.", {v: "Ohne Zeitsprung dauert ein Spieltag etwa zwei reale Stunden.", c: "unb", q: "games.gg"}]],
    ["Erzählen", "Teilt Wissen mit dem NPC und gibt Vertrauen, abhängig von seinem Interesse."],
    ["Herzsymbol", ["Das Spiel zeigt es je nach Quelle als Herz oder als Person mit Herz; gemeint ist dasselbe Symbol. In den Notices und Spieltexten steht es nicht, ein eigener Screenshot fehlt.", {v: "Es gilt für die gerade gespielte Figur.", c: "unb", q: "games.gg, nicht getestet"}]],
    ["Kennenlern-Gespräch", "„Getting to Know Them“ gibt es nur bei Haupt-Liebesinteressen; empathische Antworten wählen. In den entpackten Spieltexten steht die Option nicht."],
    ["Ausrüstung", ["Solidarität I bis III, Verwandte Seele und Hasenledermaske erhöhen den Vertrauensgewinn.", {v: "Verwandte Seele gilt für Tiervertrauen.", c: "unb", q: "Game8, vor dem DLC"}]],
    ["Bücher", "Neue Bücher verraten die Vorlieben der Bewohner. Titel und Fundorte nennt keine geprüfte Quelle."],
    ["Hauptstory", "Die Romanze braucht keinen abgeschlossenen Hauptstrang, nur das DLC."],
    ["Ohne DLC", ["Spielstände mit DLC lassen sich ohne DLC nicht laden.", {v: "Ohne DLC gibt es keine Flirten-Option; das Gratis-Update bringt nur die Änderungen an Erzählen und Schenken.", c: "unb", q: "OutputLag"}]]
  ]
};
// F 9.1 bis 9.10, W3
const ROM_GIFTS = {
  title: "Geschenke, Goldbarren, Platin",
  lead: "Was wirkt, was offen ist und warum hier kein fester Wert für Goldbarren steht.",
  rows: [
    ["Was wirkt", "Lieblingsgegenstände des NPC und Goldbarren (Gold Bar)."],
    ["Während der Romanze", [{v: "Bei NPCs ohne eigene Romanze-Reihe bringen Geschenke deutlich weniger Vertrauen, solange du sie umwirbst.", c: "unb", q: "Game8"}, {v: "Die Spieltabellen kennen eine eigene Geschenk-Funktion zur Romanze, was dazu passen könnte.", c: "unb", q: "eigene Auslegung"}]],
    ["Wert eines Goldbarrens", [{v: "+10 bei GIGA, 100 bei Lyselia in einer Community-Datenbank, +20 beim Troll Grovand in einem Suchauszug. Vermutlich hängt das von NPC und Leiste ab.", c: "nb"}, {v: "Hilft beim normalen Vertrauen.", c: "unb", q: "KeenGamer"}, {v: "Hilft schnell bei der Romanzeleiste.", c: "unb", q: "OutputLag"}]],
    ["Beispiel Lyselia", {v: "Goldbarren, Geheimnisvolles Geschenk (Mysterious Gift) und Ring der Hexen (Witch's Ring) je 100 Punkte; Aushang: Sternbild Schild (Shield Constellation Poster) 40 Punkte; Horn Tea und bestimmte Blumenvasen je 20 Punkte. „Horn Tea“ steht so nicht in den Spieltexten. Der Artikel rät selbst zur Prüfung im Spiel.", c: "unb", q: "Game Overdrive, Fremddatenbank"}],
    ["Nach Volk", {v: "Zwerg Bier und Erze +10, Ork Wein +10 und Elfenbein +20, Goblin Edelstein +10, Shai Palmar-Blatt +30.", c: "unb", q: "Game8, vor dem DLC"}],
    ["Platin", {v: "In keiner Quelle als Geschenk erwähnt. Der Spieltext nennt es Material für Katalysatoren.", c: "nb"}],
    ["Mehrfach schenken", ["Seit 2.04.03 mehrere Gegenstände mit Mengenwahl.", {v: "Ein Mehrfachgeschenk zählt als eine Geschenk-Handlung fürs Tageslimit.", c: "unb", q: "OutputLag, Spielerbericht"}]],
    ["Goldbarren sonst", {v: "Lassen sich auch verkaufen, bei der Bank anlegen und stehlen.", c: "unb", q: "KeenGamer"}]
  ]
};

// Heirat. F 4.1 bis 4.8, W2, W5, W9
const ROM_WEDDING = {
  img: {key: "rom-hochzeit", f: "cd_assets/scenes/rom-hochzeit-2x.webp", w: 996, h: 547, alt: "Hochzeitsszene: ein Paar in Weiß unter einem großen Baum, dahinter ein Geistlicher, Blumen, Lichterketten und Gäste"},
  cap: "Die Hochzeitsszene als Spielbild aus den Spieldaten. Wer unter dem Schleier steht, bleibt offen.",
  rows: [
    {t: "Grundregel", d: "Antrag bei 100 auf der erweiterten Stufe."},
    {t: "Hexen", d: "Zusätzlich die Quests in ihren Sanktums, das Geständnis und die vollständige Romanze-Reihe. Dann erscheint die Antrags-Option."},
    {t: "Andere NPCs", d: ["Für einige gelten zusätzliche Voraussetzungen.", {v: "Bei normalen NPCs genügt die Leiste.", c: "unb", q: "Game8"}]},
    {t: "Ablehnung", d: "Anträge können abgelehnt werden."},
    {t: "Wohnsitz vorher?", d: [{v: "Ungeklärt: Game8 verlangt ihn, OutputLag nennt das unbestätigt, die Notice spricht nur von der Zuweisung nach der Heirat. Kliff hat ohnehin ein Heim.", c: "nb"}]},
    {t: "Die Szene", d: ["Eigene Szene mit Blumenbogen, Gästen und Geistlichem.", {v: "Die Spielfigur trägt ein festes Outfit, ohne Wahl.", c: "unb", q: "OutputLag"}, "„Wedding Attire“ und drei weitere Hochzeitsgegenstände sind laut Spieltext kaputte, nicht ausrüstbare Rüstung."]}
  ]
};
// F 5.1 bis 5.12
const ROM_PERKS = [
  {i: "pin", t: "Symbol auf der Karte", d: "Der Ehepartner erscheint auf Welt- und Minikarte."},
  {i: "go", t: "Zusammen reisen", d: "Gemeinsam unterwegs über die Interaktion „Zusammen reisen“."},
  {g: "❖", t: "Geschenke", d: ["Der Ehepartner überreicht regelmäßig Geschenke. Art und Takt nennt die Notice nicht.", {v: "Auch Briefe zählen dazu.", c: "unb", q: "OutputLag"}]},
  {g: "✂", t: "Friseur", d: ["Neu in größeren Städten; passt auch das Aussehen des Ehepartners an.", {v: "Beim Ehepartner nur Make-up: Lidschatten, Rouge, Lippenstift.", c: "unb", q: "GIGA"}]},
  {g: "⌂", t: "Wohnsitz", d: ["17 neue Wohnsitze, errichtbar über Missionsentsendungen. Ein zugewiesener wird zum Wohnort des Ehepartners; die Karte zeigt Kliff, Oongka oder Damiane als Besitzer.", {v: "Die Hochzeit schenkt kein Haus.", c: "unb", q: "Game Overdrive"}, {v: "Kosten in Camp-Mitteln.", c: "unb", q: "OutputLag"}]},
  {g: "♥", t: "Mehr Nähe", d: {v: "Weitere Interaktionen: Umarmung und Kopftätscheln.", c: "unb", q: "OutputLag"}},
  {i: "info", t: "Keine Spielwerte genannt", d: ["Kampfboni durch die Ehe nennt keine Quelle; das ist kein Beweis, dass es keine gibt.", {v: "Kinder, Familie und Trophäen zur Heirat sind nicht bestätigt.", c: "nb"}]}
];
// F 8.1 bis 8.10, N137, W12
const ROM_FEST = {
  title: "Camp-Fest",
  de: "Fest der Graumähnen-Gäste im Camp",
  lead: "Eine Mission richtet im Camp ein zeitlich begrenztes Fest aus. NPCs mit ausreichend Vertrauen kommen zu Besuch, dort steigt ihr Vertrauen schneller.",
  chips: [
    {v: "3", t: "Mitglieder"}, {v: "18", t: "Spielstunden"}, {v: "13.000", t: "Holz"}, {v: "43.000", t: "Nahrung"}, {v: "35.000", t: "Camp-Mittel"}
  ],
  chipsQ: "Game8",
  steps: [
    {t: "Voraussetzung", d: ["Die Camp-Reihe am Howling Hill; die Vorschau der Notice spricht von einer bestimmten Ausbaustufe.", {v: "Genauer: die beiden „Expanding the Camp“-Quests.", c: "unb", q: "games.gg"}]},
    {t: "Entsendung", d: ["„Festival Preparations“ bei Ross im Camp, am Howling Hill oder in Pailune.", {v: "Im Pailune-Camp vorher die Bauaufträge „Pond“ und „Insect Holders“ erledigen.", c: "unb", q: "Game8"}]},
    {t: "Fest", d: [{v: "Beginnt nach der Entsendung und dauert 1 Tag 8 Stunden (32 Spielstunden).", c: "unb", q: "Game8"}, {v: "Die angezeigten Wartezeiten gelten auch beim Fest.", c: "unb", q: "games.gg"}, "Seit 2.04.03 werden die Abstände der Kundenbesuche bei Festen nachts nicht mehr länger."]},
    {t: "Ehrengraumähnen", d: ["Bestimmte Besucher lassen sich als Ehrengraumähnen (Honorary Greymanes) anheuern und wie Graumähnen entsenden; einige Funktionen fehlen ihnen.", {v: "Ladenbesitzer behalten den Laden.", c: "unb", q: "Game8"}]}
  ],
  gap: "Vertrauensschwelle, Faktor und benötigte Ausbaustufe sind nicht veröffentlicht."
};
// F 6.4, 7.1, 7.2, 7.5
const ROM_MULTI = {
  title: "Mehrere Romanzen",
  lead: "Mehrere NPCs lassen sich gleichzeitig umwerben, verheiratet ist man mit einem.",
  rows: [
    ["Gleichzeitig", "Mehrere Romanzen laufen parallel. Die Notice sagt dazu nichts, die Guides stimmen überein."],
    ["Neuer Partner", "Dafür musst du dich zuerst trennen."],
    ["Eine Ehe je Figur?", {v: "Ob jede der drei Figuren einen eigenen Ehepartner haben kann, beantwortet keine Quelle. Die Besitzer-Symbole der Wohnsitze legen es nahe.", c: "nb"}],
    ["Figurenwechsel", "Je Zielperson nur eine Figur verwenden; warum, steht bei den Stolperfallen."]
  ]
};

// Stolperfallen. F 1.13, 1.14, 2.4, 3.5, 3.6, 6.1 bis 6.5, 7.3 bis 7.7, N68
const ROM_TRAPS = [
  {kind: "warn", t: "Zu früh flirten", d: "Flirten vor normalem Vertrauen 100 wird abgelehnt und kostet 10 Vertrauen je Versuch."},
  {kind: "warn", t: "Zu früher Antrag", d: ["Ein zu früher Antrag wird abgelehnt.", {v: "Das kostet 15 Vertrauen.", c: "unb", q: "GIGA"}]},
  {kind: "miss", t: "Figurenwechsel kostet", d: ["Flirtest du als eine Figur mit einem NPC, sinkt dessen Vertrauen zu den beiden anderen. Die deutsche Notice ergänzt: bei anschließender Vertrauenssteigerung.", {v: "Betrag und betroffene Leiste nennt keine geprüfte Quelle.", c: "nb"}]},
  {kind: "miss", t: "Scheidung hat ihren Preis", d: ["Im Interaktionsmenü „Ehe auflösen“ (Break Up), dann eine kurze Szene mit Standesbeamtem oder Annullierungsschreiben. Die Notice sagt nur: „Dies hat jedoch seinen Preis.“", {v: "Art und Höhe des Preises nennt keine geprüfte Quelle.", c: "nb"}, {v: "Elowen kehrte als Händlerin in ihr Hexenhaus zurück, die Romanze ließ sich nicht neu aufbauen. Ob das allgemein gilt, ist offen.", c: "unb", q: "GIGA"}]},
  {kind: "warn", t: "Als Oongka oder Damiane", d: ["Graumähnen-Fraktionsquests laufen mit diesen Figuren nicht weiter (bekannter Fehler laut Pearl Abyss).", {v: "Die Romanze-Reihen sind intern solche Fraktionsquests und dürften betroffen sein.", c: "unb", q: "eigener Schluss"}]},
  {kind: "info", t: "Flirten fehlt bei einer Hexe", d: "Vor dem Abschluss der Sanktums steht die Flirt-Option für die Reihe nicht zur Verfügung; das Spiel verweist dann auf noch offene Geschichte."},
  {kind: "info", t: "Quest erscheint nicht", d: {v: "Neue Quests erscheinen nicht immer sofort; Briefe und Tagebuch prüfen.", c: "unb", q: "Game Overdrive"}},
  {kind: "info", t: "Interaktion fehlt", d: ["In manchen Situationen sind Interaktionen mit NPCs nicht verfügbar; laut Pearl Abyss hilft ein Neustart vorübergehend.", {v: "Das Kennenlern-Gespräch schließt sich sofort: anderes versuchen und am nächsten Tag wiederholen.", c: "unb", q: "OutputLag, Spielerbericht"}]},
  {kind: "info", t: "Gespräche", d: [{v: "Dieselbe Aktion am selben Tag zu wiederholen bringt nichts, schadet aber nicht.", c: "unb", q: "Game Overdrive"}, {v: "Grobe Dialogantworten können die Beziehung bremsen.", c: "unb", q: "NoobFeed"}]}
];
// F Abschnitt 12, W13
const ROM_FIXES = [
  {ver: "2.04.02", date: "30.10.", d: "Ehepartner und Gefährte folgten ins Wasser; der Ehepartner verhielt sich im Kampf abnormal. Beides behoben."},
  {ver: "2.04.03", date: "31.10.", d: "Mehrfach-Schenken neu. Gegenstände wurden zurückgegeben statt übergeben und der Ehepartner gab keine Geschenke: behoben. Die Abstände der Kundenbesuche bei Festen werden nachts nicht mehr länger."},
  {ver: "2.04.04", date: "01.11.", d: "Teile des Schenken-Menüs auf Koreanisch: behoben."},
  {ver: "2.04.05", date: "01.11.", d: "Quests für den Antrag ließen sich bei einigen Hexen nicht fortsetzen: behoben. Welche Hexen, nennt die Notice nicht."},
  {ver: "2.04.06", date: "04.11.", d: "Rückfall zum Titelbildschirm beim Verschenken mehrerer Gegenstände: behoben. Mehrfach-Schenken ist damit kein bekanntes Risiko mehr."},
  {ver: "2.04.07", date: "05.11.", d: "Nichts zur Romanze."}
];
const ROM_FIX_NOTE = "Die Liste bekannter Probleme von Pearl Abyss führt am 05.11.2026 keinen Eintrag zu Romanze, Flirten oder Ehe. Offen bleiben dort die Graumähnen-Fraktionsquests als Damiane oder Oongka und die zeitweise fehlenden Interaktionen.";

// In der App sichtbare FAQ. Die SEO-Seite hat eigene Texte in scripts/seo-content/seiten/romanze.json.
const ROM_FAQ = [
  {q: "Wie beginne ich eine Romanze?", a: "Herzsymbol prüfen, normales Vertrauen auf 100 bringen, dann über Interagieren > Flirten. Danach steigt die erweiterte Stufe über Schenken und Erzählen."},
  {q: "Wen kann ich heiraten?", a: ["Die Hexen Elowen, Bari, Lyselia und Areciel sowie NPCs mit Herzsymbol.", {v: "Eine Namensliste weiterer Kandidaten gibt es nirgends.", c: "nb"}]},
  {q: "Können Oongka und Damiane heiraten?", a: ["Romanze und Heirat gelten für alle drei Figuren, die Hexen heiraten aber nur als Kliff.", {v: "Oongka und Damiane heiraten NPCs mit Herz und müssen erst einen Wohnsitz bauen.", c: "unb", q: "Game8"}]},
  {q: "Brauche ich das DLC?", a: ["Ja, Romanze und Heirat kamen mit „Charting the Unknown“. Einen abgeschlossenen Hauptstrang braucht es nicht.", {v: "Ohne DLC gibt es keine Flirten-Option.", c: "unb", q: "OutputLag"}]},
  {q: "Wie viele Tage dauert es bis zur Hochzeit?", a: {v: "Das lässt sich nicht berechnen: Die Punktwerte fehlen bis auf eine Einzelangabe, die Mindestzahl der Tage bis 100 nennt keine geprüfte Quelle.", c: "nb"}},
  {q: "Was bringt ein Goldbarren, was bringt Platin?", a: {v: "Für Goldbarren nennen die Quellen verschiedene Werte, kein Wert ist gesichert. Platin erwähnt keine Quelle als Geschenk.", c: "nb"}},
  {q: "Was bringt die Ehe?", a: "Kartensymbol, gemeinsames Reisen, regelmäßige Geschenke, Friseur und einen Wohnort für den Partner. Kampfboni nennt keine Quelle."},
  {q: "Kann ich mich scheiden lassen?", a: ["Ja, die Ehe lässt sich auflösen, „dies hat jedoch seinen Preis“.", {v: "Art und Höhe des Preises nennt keine geprüfte Quelle.", c: "nb"}]}
];

// F Abschnitt 16
const ROM_GAPS = [
  "Punktwerte je Flirt und Geschenk auf der erweiterten Stufe (beim Erzählen nur Game8: bis +20), Mindestzahl der Spieltage bis 100",
  "Wert eines Goldbarrens; Platin als Geschenk",
  "Vertrauensverlust bei den anderen Figuren: Betrag und betroffene Leiste",
  "Preis der Scheidung; ob erneute Heirat oder eine neue Romanze mit derselben Person möglich ist",
  "Kandidatenliste je Figur außer den vier Hexen; ausgeschlossene NPCs jenseits der Einzelfälle; ob Oongka und Damiane Hexen umwerben können; ob die berichtete Ehe Damiane und Bari möglich war",
  "Ob ein Wohnsitz vor der Hochzeit Pflicht ist; Namen, Orte und Kosten der 17 Wohnsitze",
  "Ob jede Figur einen eigenen Ehepartner haben kann",
  "Belohnungen der Romanze-Reihen, Art und Takt der Ehepartner-Geschenke, Spielwerte der Ehe, Trophäen, Kinder",
  "Titel und Fundorte der neuen Vorlieben-Bücher",
  "Fest: Vertrauensschwelle, Faktor, benötigte Ausbaustufe; Zweitquelle für Kosten und Dauer",
  "Amtliche Reihenfolge der Questschritte; welche Hexen der Fehler aus 2.04.05 betraf",
  "Spieldaten reichen nur bis 2.04.03, alles ist ungetestet im Spiel"
];
const ROM_LEGEND = "Normaler Text ist amtlich, aus den Spieldaten oder von mindestens zwei unabhängigen Guides.";
const ROM_SOURCES = [
  {t: "Pearl Abyss, Patch Notes 2.04.00 (29.10.2026)", url: "https://crimsondesert.pearlabyss.com/de-DE/News/Notice/Detail?_boardNo=140"},
  {t: "Feature-Übersicht (20.10.2026)", url: "https://crimsondesert.pearlabyss.com/de-DE/News/Notice/Detail?_boardNo=137"},
  {t: "Hotfix 2.04.02", url: "https://crimsondesert.pearlabyss.com/de-DE/News/Notice/Detail?_boardNo=146"},
  {t: "Hotfix 2.04.03", url: "https://crimsondesert.pearlabyss.com/de-DE/News/Notice/Detail?_boardNo=147"},
  {t: "Hotfix 2.04.04", url: "https://crimsondesert.pearlabyss.com/de-DE/News/Notice/Detail?_boardNo=148"},
  {t: "Hotfix 2.04.05", url: "https://crimsondesert.pearlabyss.com/de-DE/News/Notice/Detail?_boardNo=149"},
  {t: "Hotfix 2.04.06", url: "https://crimsondesert.pearlabyss.com/de-DE/News/Notice/Detail?_boardNo=150"},
  {t: "Hotfix 2.04.07", url: "https://crimsondesert.pearlabyss.com/de-DE/News/Notice/Detail?_boardNo=151"},
  {t: "Bekannte Probleme (05.11.2026)", url: "https://crimsondesert.pearlabyss.com/de-DE/News/Notice/Detail?_boardNo=68"},
  {t: "Game8 Romanze (04.11.2026)", url: "https://game8.co/games/Crimson-Desert/archives/584417"},
  {t: "Game8 Fest (03.11.2026)", url: "https://game8.co/games/Crimson-Desert/archives/636534"},
  {t: "Game8 Vertrauen (27.10.2026, vor DLC)", url: "https://game8.co/games/Crimson-Desert/archives/586801"},
  {t: "Game8 Elowen (05.05.2026, vor DLC)", url: "https://game8.co/games/Crimson-Desert/archives/587604"},
  {t: "KeenGamer (05.11.2026)", url: "https://www.keengamer.com/articles/guides/crimson-desert-dlc-complete-romance-guide/"},
  {t: "GIGA (30.10.2026)", url: "https://www.giga.de/games/crimson-desert-romanze-starten-beziehungen-beginnen-heiraten--01M66GXSGA89E1VD0ZE0T85WQ8"},
  {t: "games.gg Romanze (30.10.2026)", url: "https://games.gg/crimson-desert/guides/crimson-desert-romance-guide/"},
  {t: "games.gg Heirat (31.10.2026)", url: "https://games.gg/crimson-desert/guides/crimson-desert-marriage-guide-how-to-flirt-and-propose/"},
  {t: "games.gg DLC-Überblick (27.10.2026, vor dem Start)", url: "https://games.gg/crimson-desert/guides/charting-the-unknown-dlc-features-unlocks/"},
  {t: "games.gg Fest (01.11.2026)", url: "https://games.gg/crimson-desert/guides/crimson-desert-honorary-greymanes-festival-recruitment/"},
  {t: "OutputLag (31.10.2026)", url: "https://outputlag.com/guides/crimson-desert-romance-guide-complete-breakdown/"},
  {t: "VICE (02.11.2026)", url: "https://www.vice.com/en/article/crimson-desert-just-added-a-full-romance-system-including-marriage-and-divorce/"},
  {t: "NoobFeed (30.10.2026)", url: "https://www.noobfeed.com/articles/crimson-desert-enhanced-charting-the-unknown-marry-npcs"},
  {t: "Game Overdrive (01.11.2026)", url: "https://gameoverdrive.com.br/crimson-desert-como-casar-romances/"},
  {t: "Game Overdrive Elowen (01.11.2026)", url: "https://gameoverdrive.com.br/elowen-crimson-desert-como-casar/"},
  {t: "Game Overdrive Bari (01.11.2026)", url: "https://gameoverdrive.com.br/bari-crimson-desert-romance-casamento/"},
  {t: "Game Overdrive Lyselia (02.11.2026)", url: "https://gameoverdrive.com.br/crimson-desert-lyselia-romance-como-casar/"},
  {t: "Game Overdrive Areciel (02.11.2026)", url: "https://gameoverdrive.com.br/areciel-crimson-desert-romance-casamento/"},
  {t: "Destructoid (30.10.2026)", url: "https://www.destructoid.com/how-to-romance-and-get-married-in-crimson-desert/"}
];

/* ===== Renderer der Seite „Romanze & Ehe“ =====
   Aufbau: Kopf, Stepper „Auf einen Blick“, zwei Leisten, Vergleich je Figur mit Filter-Pillen, Porträtkarten (cdFold),
   Vorgehen und Zahlen, Heirat und Nutzen, Fest, Stolperfallen, FAQ, Lücken, Quellen. Der Filter schaltet nur Klassen um
   (kein Neuaufbau); ausgegraute Hexen bleiben sichtbar und aufklappbar. */
function _romPlain(x){return typeof _dlcP==='function'?_dlcP(x):String(x==null?'':x);}
function _romV(x){return typeof _dlcV==='function'?_dlcV(x):cdEsc(_romPlain(x));}
function _romFlat(l){return [].concat(l||[]).map(_romPlain).join(' ');}
function _romSec(id,title,en,body,cls){
  return '<section class="rom-sec'+(cls?' '+cls:'')+'" id="'+id+'"><h3 class="sub-t rom-h">'+cdEsc(title)+(en?' <small class="rom-h-en" lang="en">'+cdEsc(en)+'</small>':'')+'</h3>'+body+'</section>';
}
function _romRows(rows){return cdFacts(rows.map(r=>[r[0],{h:_romV(r[1])}]),{wide:true,cls:'rom-facts'});}
function _romPath(){
  return '<ol class="rom-path">'+ROM_PATH.map((p,i)=>'<li class="rom-node'+(i===ROM_PATH.length-1?' rom-node--end':'')+'" data-s="'+cdEsc((p.t+' '+p.d).toLowerCase())+'">'
    +'<span class="rom-node-n" aria-hidden="true">'+(i===ROM_PATH.length-1?'♥':i+1)+'</span><b class="rom-node-t">'+cdEsc(p.t)+'</b><span class="rom-node-d">'+cdEsc(p.d)+'</span></li>').join('')+'</ol>';
}
function _romGauges(){
  return '<div class="rom-gauges">'+ROM_GAUGES.map(g=>'<article class="rom-gauge cd-spot" data-s="'+cdEsc((g.t+' '+g.en+' '+g.d+' '+g.marks.map(m=>m.t).join(' ')).toLowerCase())+'">'
    +'<header class="rom-gauge-h"><b>'+cdEsc(g.t)+'</b><small>'+cdEsc(g.en)+'</small></header>'
    +'<div class="rom-track" role="img" aria-label="'+cdEsc(g.t+': '+g.marks.map(m=>(m.near?'nahe ':'bei ')+m.at+' '+m.t).join(', '))+'"><span class="rom-track-fill"></span>'
    +g.marks.map(m=>'<span class="rom-mark'+(m.at===100?' rom-mark--end':'')+'" style="--at:'+m.at+'%"><i aria-hidden="true"></i><b>'+(m.near?'~':'')+m.at+'</b><small>'+cdEsc(m.t)+'</small></span>').join('')+'</div>'
    +'<p class="rom-gauge-d">'+cdEsc(g.d)+'</p></article>').join('')+'</div>';
}
function _romCell(c){
  return '<span class="rom-val rom-val--'+c.k+(c.c?' dlc-unb':'')+'"'+(c.q?' title="'+cdEsc(c.q)+'"':'')+'>'+cdEsc(c.t)+'</span>'+(c.flag?'<i class="dlc-flag rom-flag">'+cdEsc(c.flag)+'</i>':'')+(c.q?'<small class="rom-cell-q">'+cdEsc(c.q)+'</small>':'');
}
function _romMatrix(){
  const s=ROM_MATRIX.map(r=>r.t+' '+ROM_FIGS.map(f=>r[f.id].t+' '+(r[f.id].q||'')).join(' ')).join(' ').replace(/­/g,'')+' '+_romFlat(ROM_MATRIX_NOTE);
  return '<div class="rom-mx-w cd-spot" data-s="'+cdEsc(s.toLowerCase())+'"><table class="rom-mx" role="table"><caption class="vh">Was jede spielbare Figur kann</caption>'
    +'<thead role="rowgroup"><tr role="row"><td role="cell"></td>'+ROM_FIGS.map(f=>'<th scope="col" role="columnheader" data-col="'+f.id+'"><span class="rom-fig"><img src="'+f.port+'" alt="" width="44" height="44" loading="lazy" decoding="async">'+f.name+'</span></th>').join('')+'</tr></thead>'
    +'<tbody role="rowgroup">'+ROM_MATRIX.map(r=>'<tr role="row"><th scope="row" role="rowheader">'+cdEsc(r.t)+'</th>'+ROM_FIGS.map(f=>'<td role="cell" data-col="'+f.id+'">'+_romCell(r[f.id])+'</td>').join('')+'</tr>').join('')+'</tbody></table>'
    +'<p class="rom-mx-n">'+_romV(ROM_MATRIX_NOTE)+'</p></div>';
}
function _romSeriesLine(w){
  return '<p class="rom-series"><span class="rom-series-k">Romanze-Reihe</span><b lang="en">'+cdEsc(w.series)+'</b> <span class="rom-de">'+cdEsc(w.seriesDe)+'</span>'+(w.seriesFlag?' '+_romV(w.seriesFlag):'')+'</p>';
}
function _romWitchBody(w){
  const steps=w.steps.map(s=>({t:{h:'<span lang="en">'+cdEsc(s.en)+'</span> <span class="rom-de">'+cdEsc(s.de)+'</span>'},d:{h:_romV(s.d)}}));
  return '<div class="rom-wb"><div class="rom-wb-a">'
    +cdFacts([['Fundort',w.where],['Einstieg',{h:_romV(w.entry)}],
      ['Sanktums',{h:w.sanct.map(x=>'<span class="rom-tag" lang="en">'+cdEsc(x)+'</span>').join('')+(w.sanct.length<4?' <span class="rom-de">nur drei</span>':'')}],
      ['Lage der Sanktums',{h:_romV(w.sanctLoc)}],
      ['Fraktionsreihe',{h:'Gibt eine Hexen-Marke (Witch\'s Token) und nach dem Säubern ein Rezeptbuch. '+_romV(w.orders)}]],{wide:true,cls:'rom-facts'})
    +'<div class="rom-req"><h5 class="rom-k">Voraussetzungen</h5><ul>'+ROM_WITCH_REQ.map(x=>'<li>'+cdIcon('check')+'<span>'+cdEsc(x)+'</span></li>').join('')+'</ul></div>'
    +'</div><div class="rom-wb-b">'+_romSeriesLine(w)
    +cdStepper(steps,'rom-steps')
    +'<p class="rom-small">'+_romV(ROM_ORDER_NOTE)+(w.goals?' Zielnamen in den Spieldaten: '+cdEsc(w.goals)+'.':'')+'</p>'
    +(w.extra?'<p class="rom-small">'+_romV(w.extra)+'</p>':'')
    +'</div></div>'
    +'<figure class="rom-gal"><div class="rom-gal-g">'+w.imgs.map(i=>'<img src="cd_assets/romanze/'+i.f+'-2x.webp" alt="'+cdEsc(i.alt)+'" width="1024" height="1024" loading="lazy" decoding="async">').join('')+'</div><figcaption>'+cdEsc(ROM_IMG_NOTE)+'</figcaption></figure>';
}
function _romWitchFold(w){
  const s=[w.name,w.title,w.titleEn,w.region,w.lead,w.where,_romFlat(w.entry),w.sanct.join(' '),_romPlain(w.sanctLoc),_romPlain(w.orders),w.series,w.seriesDe,
    w.steps.map(x=>x.en+' '+x.de+' '+_romFlat(x.d)).join(' '),w.goals||'',_romPlain(w.extra),ROM_WITCH_REQ.join(' '),_romPlain(ROM_ORDER_NOTE),ROM_IMG_NOTE,'Hexen-Marke Witch\'s Token Rezeptbuch Fraktionsreihe romanze heirat hexe witch'].join(' ');
  return cdFold({title:{h:cdEsc(w.name)+' <small class="rom-t-sub">'+cdEsc(w.title)+'</small>'},lead:w.lead,
    icon:{src:w.port,alt:'Porträt von '+w.name,photo:true},tone:w.color,id:'rom-c-'+w.id,cls:'rom-cand',h:4,
    chips:[{i:'pin',t:w.region},{v:String(w.sanct.length),t:'Sanktums',c:'gold'},{v:'4',t:'Quests + Antrag'},{g:'♥',t:'Heirat als Kliff',c:'red'}],
    scene:{keys:['rom-'+w.id],tone:w.color,glyph:'♥'},
    aside:'<span class="rom-off-chip" aria-hidden="true"></span>',
    attrs:{'data-fig':'kliff','data-go-id':w.id},s,body:()=>_romWitchBody(w)});
}
function _romNpcFold(){
  const N=ROM_NPCS,s=[N.title,N.lead,N.rows.map(r=>r[0]+' '+_romFlat(r[1])).join(' '),N.gap,'kliff oongka damiane ladenbesitzer handwerker orks'].join(' ');
  return cdFold({title:N.title,lead:N.lead,icon:{h:'<i class="cd-g rom-heart">♥</i>'},tone:'var(--red)',id:'rom-c-npcs',cls:'rom-cand rom-cand--npc',h:4,
    chips:[{t:'Kliff, Oongka, Damiane',c:'gold'},{t:'Keine eigene Reihe (Game8)'},{t:'Liste fehlt',c:'warn'}],
    scene:{keys:['reg-pailune'],tone:'red',glyph:'♥'},aside:'<span class="rom-off-chip" aria-hidden="true"></span>',
    attrs:{'data-fig':'kliff oongka damiane','data-go-id':'npcs'},s,
    body:()=>_romRows(N.rows)+cdNote(N.gap,{kind:'warn',title:'Was fehlt'})});
}
function _romOutFold(){
  const O=ROM_OUT,s=[O.title,O.lead,_romFlat(O.rows)].join(' ');
  return cdFold({title:O.title,lead:O.lead,icon:{src:'cd_assets/npcs/witch-sylvia.webp',alt:'Porträt von Sylvia',photo:true},tone:'var(--slate)',id:'rom-c-aus',cls:'rom-cand rom-cand--out',h:4,s,
    attrs:{'data-go-id':'ausgeschlossen'},
    body:()=>'<ul class="rom-list">'+O.rows.map(r=>'<li>'+_romV(r)+'</li>').join('')+'</ul>'});
}
function _romCands(){
  const n=ROM_WITCHES.length+1,nOther=1;
  const pills=cdPills([{v:'all',t:'Alle',n,on:true}].concat(ROM_FIGS.map(f=>({v:f.id,t:f.name,n:f.id==='kliff'?n:nOther}))),{name:'rom-fig',label:'Kandidaten nach spielbarer Figur filtern',cls:'rom-pills'});
  return '<p class="rom-p">'+cdEsc(ROM_CAND_NOTE)+'</p>'
    +'<div class="rom-filter"><span class="rom-filter-l">Ich spiele</span>'+pills+'<span class="rom-cnt" id="rom-cnt" role="status" aria-live="polite">'+n+' Kandidaten-Einträge</span></div>'
    +_romMatrix()
    +'<div class="cd-folds rom-cands" id="rom-cands">'+ROM_WITCHES.map(_romWitchFold).join('')+_romNpcFold()+_romOutFold()+'</div><p class="rom-small rom-cand-foot">'+cdEsc(ROM_CAND_FOOT)+'</p>';
}
function _romValueList(list,cls){
  return '<ul class="rom-vals'+(cls?' '+cls:'')+'">'+list.map(x=>'<li><span class="rom-vals-k">'+cdEsc(x.k)+(x.d||x.q?'<small>'+cdEsc(x.d||'')+(x.q?' <i class="dlc-flag rom-flag">'+cdEsc(x.q)+'</i>':'')+'</small>':'')+'</span><b class="rom-vals-v'+(x.q?' dlc-unb':'')+'">'+cdEsc(x.v)+'</b></li>').join('')+'</ul>';
}
function _romPlan(){
  const V=ROM_VALUES,sV=[V.up,V.down].flat().map(x=>x.k+' '+x.v+' '+(x.d||'')+' '+(x.q||'')).join(' ')+' '+V.foot;
  const sP=ROM_PLAN.map(p=>p.t+' '+_romFlat(p.d)).join(' ')+' '+ROM_META.planNote;
  return '<div class="rom-plan">'
    +'<article class="rom-card rom-plan-a cd-spot" data-s="'+cdEsc(sP.toLowerCase())+'"><header class="rom-card-h"><span class="rom-k">Empfehlung dieses Wikis</span><h4>Reihenfolge, die sich aus den Belegen ergibt</h4></header>'
    +cdStepper(ROM_PLAN.map(p=>({t:p.t,d:{h:_romV(p.d)}})),'rom-steps')+'<p class="rom-small">'+cdEsc(ROM_META.planNote)+'</p></article>'
    +'<aside class="rom-card rom-plan-b cd-spot" data-s="'+cdEsc(sV.toLowerCase())+'"><header class="rom-card-h"><span class="rom-k">Vertrauen in Zahlen</span><h4>Was bekannt ist</h4></header>'
    +'<h5 class="rom-k rom-k--ok">Bringt</h5>'+_romValueList(V.up)+'<h5 class="rom-k rom-k--warn">Kostet</h5>'+_romValueList(V.down,'rom-vals--down')+'<p class="rom-small">'+cdEsc(V.foot)+'</p></aside></div>'
    +'<div class="cd-folds rom-folds">'
    +cdFold({title:ROM_RULES.title,lead:ROM_RULES.lead,icon:{h:cdIcon('info')},tone:'gold',id:'rom-regeln',h:4,s:[ROM_RULES.title,ROM_RULES.lead,ROM_RULES.rows.map(r=>r[0]+' '+_romFlat(r[1])).join(' ')].join(' '),body:()=>_romRows(ROM_RULES.rows)})
    +cdFold({title:ROM_GIFTS.title,lead:ROM_GIFTS.lead,icon:{h:'<i class="cd-g">❖</i>'},tone:'gold',id:'rom-geschenke',h:4,s:[ROM_GIFTS.title,ROM_GIFTS.lead,ROM_GIFTS.rows.map(r=>r[0]+' '+_romFlat(r[1])).join(' ')].join(' '),body:()=>_romRows(ROM_GIFTS.rows)})
    +'</div>';
}
function _romWedding(){
  const W=ROM_WEDDING,s=W.cap+' '+W.rows.map(r=>r.t+' '+_romFlat(r.d)).join(' ');
  const sc=ROM_PERKS.map(p=>'<article class="rom-perk cd-spot" data-s="'+cdEsc((p.t+' '+_romFlat(p.d)).toLowerCase())+'"><span class="rom-perk-i" aria-hidden="true">'+(p.i?cdIcon(p.i):'<i class="cd-g">'+cdEsc(p.g)+'</i>')+'</span><div><h4>'+cdEsc(p.t)+'</h4><p>'+_romV(p.d)+'</p></div></article>').join('');
  return '<div class="rom-wed rom-card cd-spot" data-s="'+cdEsc(s.toLowerCase())+'"><figure class="rom-wed-f"><img src="'+W.img.f+'" alt="'+cdEsc(W.img.alt)+'" width="'+W.img.w+'" height="'+W.img.h+'" loading="lazy" decoding="async"><figcaption>'+cdEsc(W.cap)+'</figcaption></figure>'
    +'<dl class="rom-wed-l">'+W.rows.map(r=>'<div><dt>'+cdEsc(r.t)+'</dt><dd>'+_romV(r.d)+'</dd></div>').join('')+'</dl></div>'
    +'<div class="rom-perks-w"><h4 class="rom-sub">Was du davon hast</h4><div class="rom-perks">'+sc+'</div></div>';
}
function _romSocial(){
  const F=ROM_FEST,M=ROM_MULTI;
  const chips=F.chips.map(c=>Object.assign({},c,{c:'gold'}));
  return '<div class="cd-folds rom-folds">'
    +cdFold({title:{h:cdEsc(F.title)+' <small class="rom-t-sub">'+cdEsc(F.de)+'</small>'},lead:F.lead,icon:{h:'<svg class="cd-i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m3.5 20 9.7-16"/><path d="m20.5 20-9.7-16"/><path d="M2.5 20h19"/><path d="m9 20 3-5.5 3 5.5"/></svg>'},tone:'amber',id:'rom-fest',cls:'rom-cand--fest',h:4,
      chips:chips.concat([{h:'<i class="dlc-flag rom-flag">'+cdEsc(F.chipsQ)+'</i>'}]),scene:{keys:['camp'],tone:'amber',glyph:'♥'},
      s:[F.title,F.de,F.lead,F.chips.map(c=>c.v+' '+c.t).join(' '),F.steps.map(x=>x.t+' '+_romFlat(x.d)).join(' '),F.gap,'festival preparations ross ehrengraumähnen honorary greymanes'].join(' '),
      body:()=>'<div class="rom-fest-b">'+cdStepper(F.steps.map(x=>({t:x.t,d:{h:_romV(x.d)}})),'rom-steps')
        +'<aside class="rom-req"><h5 class="rom-k">Was fehlt</h5><p class="rom-small">'+_romV({v:F.gap,c:'nb'})+'</p><p class="rom-small">'+cdGoLink('camp','','Zum Graumähnen-Camp')+'</p></aside></div>'})
    +cdFold({title:M.title,lead:M.lead,icon:{h:'<i class="cd-g">♥</i>'},tone:'red',id:'rom-mehrere',h:4,
      chips:[{t:'Parallel umwerben',c:'ok'},{t:'Eine Ehe, je Figur offen',c:'gold'},{t:'Eine Figur je Zielperson'}],
      s:[M.title,M.lead,M.rows.map(r=>r[0]+' '+_romFlat(r[1])).join(' ')].join(' '),body:()=>_romRows(M.rows)})
    +'</div>';
}
function _romTraps(){
  /* Erst was wirklich kostet (rot vor gold), dann ruhig als Liste, was nur hakt */
  const ds=t=>' data-s="'+cdEsc((t.t+' '+_romFlat(t.d)).toLowerCase())+'"',kind=k=>ROM_TRAPS.filter(t=>t.kind===k);
  return '<div class="rom-traps">'+kind('miss').concat(kind('warn')).map(t=>'<div class="rom-trap rom-trap--'+t.kind+'"'+ds(t)+'>'+cdNote({h:_romV(t.d)},{kind:t.kind,title:t.t})+'</div>').join('')+'</div>'
    +'<div class="rom-tips-w"><h4 class="rom-sub">Wenn etwas hakt</h4><ul class="rom-tips rom-card cd-spot">'+kind('info').map(t=>'<li class="rom-tip"'+ds(t)+'>'+cdIcon('info')+'<b>'+cdEsc(t.t)+'</b><span>'+_romV(t.d)+'</span></li>').join('')+'</ul></div>'
    +'<div class="cd-folds rom-folds">'+cdFold({title:'Hotfixes zur Romanze',lead:ROM_FIX_NOTE,icon:{h:cdIcon('neutral')},tone:'ice',id:'rom-hotfixes',h:4,
      chips:[{v:String(ROM_FIXES.length),t:'Versionen'},{t:'Stand '+ROM_META.stand,c:'ice'}],s:['Hotfixes bekannte Fehler',ROM_FIX_NOTE,ROM_FIXES.map(f=>f.ver+' '+f.d).join(' ')].join(' '),
      body:()=>'<ol class="rom-fixes">'+ROM_FIXES.map(f=>'<li><b class="rom-fix-v">'+cdEsc(f.ver)+'</b><span class="rom-fix-date">'+cdEsc(f.date)+'</span><span class="rom-fix-d">'+cdEsc(f.d)+'</span></li>').join('')+'</ol>'})+'</div>';
}
function _romFaq(){
  return '<div class="cd-folds rom-faq">'+ROM_FAQ.map((f,i)=>cdFold({title:f.q,id:'rom-faq-'+i,s:f.q+' '+_romFlat(f.a),h:4,tone:'gold',body:()=>'<p>'+_romV(f.a)+'</p>'})).join('')+'</div>';
}
function _romEnd(){
  return '<section class="rom-sec rom-gaps" id="rom-offen" data-s="'+cdEsc(('was noch nicht belegt ist '+ROM_GAPS.join(' ')).toLowerCase())+'"><h3 class="sub-t rom-h">Was noch nicht belegt ist</h3>'
    +'<ul>'+ROM_GAPS.map(x=>'<li>'+cdEsc(x)+'</li>').join('')+'</ul></section>'
    +cdSrc(ROM_SOURCES,'Quellen')+'<p class="cd-src">Geprüft am '+cdEsc(ROM_META.checked)+'. Spielstand der Notices: Patch '+cdEsc(ROM_META.stand)+'.</p>';
}
/* Filter: kein Neuaufbau, nur Zustände (Fokus und aufgeklappte Karten bleiben erhalten). */
function _romFilter(f){
  const box=document.getElementById('rom-cands'),wrap=box&&box.closest('.rom-sec');if(!box)return;
  wrap.setAttribute('data-fig',f);
  const fig=ROM_FIGS.find(x=>x.id===f);let n=0,all=0;
  box.querySelectorAll('.rom-cand[data-fig]').forEach(c=>{
    all++;const on=f==='all'||c.getAttribute('data-fig').split(' ').indexOf(f)>-1;
    c.classList.toggle('is-off',!on);if(on)n++;
    const chip=c.querySelector('.rom-off-chip');if(chip){chip.textContent=on||!fig?'':'Als '+fig.name+': keine Heirat';chip.removeAttribute('aria-hidden');}
  });
  const cnt=document.getElementById('rom-cnt');
  if(cnt)cnt.textContent=f==='all'?all+' Kandidaten-Einträge':ROM_FIG_HINT[f];
}
document.addEventListener('cd-pills',function(e){if(e.detail&&e.detail.name==='rom-fig')_romFilter(e.detail.value);});
function renderRomanze(){
  const root=document.getElementById('rom-root');if(!root)return;
  if(root.firstChild){reapplySearch(root,null,0);return;}
  /* Kopf wie drHead, aber Szene nicht über die volle Breite (kleines Spielbild); w schiebt die Silhouetten in die Lücke vor den Kacheln */
  drMount('romanze',cdHero({kicker:'Welt & Karte',title:'Romanze & Ehe',glyph:'♥',tone:'red',cls:'dr-hero rom-hero',
      scene:{keys:['romanze','reg-pailune'],full:false,w:88},
      sub:'Seit dem DLC „Charting the Unknown“ lassen sich NPCs umwerben und heiraten. Hier steht, wie das geht und was noch offen ist.',
      stats:[[ROM_WITCHES.length,'Hexen namentlich belegt'],[ROM_FIGS.length,'spielbare Figuren'],[100,'erweiterte Stufe für den Antrag'],[17,'neue Wohnsitze']]})
    +'<nav class="dr-jump" aria-label="Verwandte Seiten">'+[['npcs','Charaktere & NPCs'],['witches','Hexen & Fusion'],['camp','Graumähnen-Camp'],['dlc','Charting the Unknown'],['dlc-quests','DLC-Quests']].map(l=>cdGoLink(l[0],'',l[1],'dr-jl')).join('')+'</nav>');
  root.innerHTML=
    cdNote({h:cdEsc(ROM_LEGEND)+' <span class="dlc-unb">Grau mit Vermerk '+_dlcFlag('unb')+'</span> nennt nur eine Quelle oder einen eigenen Schluss, <span class="dlc-nb">'+_dlcFlag('nb')+'</span> heißt gesucht, aber nichts gefunden. Nichts davon wurde im Spiel getestet.'},{kind:'info',title:'So liest du die Seite',cls:'rom-legend'})
    +_romSec('rom-weg','Auf einen Blick','',_romPath()+_romGauges())
    +_romSec('rom-kandidaten','Wer kommt infrage','',_romCands(),'rom-sec--cands')
    +_romSec('rom-vertrauen','Vertrauen aufbauen','',_romPlan())
    +_romSec('rom-heirat','Heirat und was sie bringt','',_romWedding())
    +_romSec('rom-sozial','Camp-Fest und mehrere Romanzen','',_romSocial())
    +_romSec('rom-fallen','Stolperfallen','',_romTraps())
    +_romSec('rom-fragen','Häufige Fragen','',_romFaq())
    +_romEnd();
  reapplySearch(root,null,0);
}
