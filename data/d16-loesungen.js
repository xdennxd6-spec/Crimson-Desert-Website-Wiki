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
 kurz:"Sechster Schritt von Kliffs DLC-Reihe Jenseits der Ränder. Sobald die Hexen des Ostens die Sandsturmbarriere geöffnet haben, suchst du dir im Sandsturm den Weg an den Marker Stones entlang und erledigst vier Dorfaufgaben und das Läutern der Marker Stones für Sebastian.",
 voraussetzung:["Hauptquest Ende der Reise abgeschlossen (damit startet die Reihe Jenseits der Ränder)","Schritt Die Hexen des Ostens erledigt: die Hexen öffnen die Sandsturmbarriere"],
 schritte:[
  {t:"Durch den Sandsturm finden",d:"Im Sandsturm zeigt die Karte nichts an. Folge den Lichtstrahlen, die zwischen den Marker Stones verlaufen, und wirf Glänzenden Samen, um markierte Wegstücke wiederzuerkennen."},
  {t:"Vom Sand verhüllte Nachbarn",d:"In Lukumiya den Dorfbewohner ansprechen, in Maddin mit dem Bewohner reden (laut Xboxplay holst du dort Heilmittel), zurück nach Lukumiya gehen und Sebastian berichten."},
  {t:"Das verirrte Kind",d:"Das Kind wartet an einem Marker Stone östlich von Maddin. Markiere vorher den Weg nach Faraj (östlich des Sandsturmgebiets) mit Glänzendem Samen und bring das Kind dann in ruhigem Tempo dorthin."},
  {t:"Die Gruppe, die nicht zurückkehrte",d:"In Hazran den Bewohner ansprechen, die Laterne einschalten und den Spuren des Kalbs folgen. Die Gegner bei den Ruinen besiegen und das Kalb nach Hazran zurücktragen."},
  {t:"Von Dunkelheit verschlungenes Dorf",d:"Das Dorf Yasmin aufsuchen (nordwestlich der Sturmmitte) und alle Gegner dort besiegen."},
  {t:"Verzerrter Lichtstrahl",d:"Die korrumpierten Marker Stones läutern: Mit Licht reflektieren machst du die verfluchten Pflöcke sichtbar, mit Macht des Axioms ziehst du sie heraus. Ein Pflock steckt in einem Steinhaus, dessen Eingang du durch Wegschieben eines Steinblocks öffnest."},
  {t:"Bei Sebastian abgeben",d:"Nach jeder Aufgabe zu Sebastian zurück (Abyss-Nexus am Pilgrim's Peak (EN), am Rand des Sandsturms) und berichten. Sind alle Aufgaben erledigt, geht es mit Der Drahtzieher zur Grabstätte des Schweigens weiter."}
 ],
 belohnung:["Erkundungsberichte über Lukumiya, Maddin, Faraj, Hazran, das Dorf Yasmin und die Trümmer des Paradieses (laut th.gl-Spieldaten)","Die Reihenbelohnungen gibt es am Ende von Jenseits der Ränder"],
 hinweise:[
  {kind:"info",txt:"Verirrt? Eine Schnellreise zu einem entdeckten Abyss-Nexus in der Gegend setzt dich zurück (Xboxplay)."},
  {kind:"warn",txt:"Das Kind folgt nur, wenn du ruhig gehst. Läufst du zu weit voraus, kann die Aufgabe scheitern (Game8)."},
  {kind:"info",txt:"Die Verstecke der Pflöcke laut Xboxplay: in Krügen (zerschlagen), in Bismutkristallen (mit Blitzangriffen zerstören), in einem hohlen Baum und einem Keller hinter Dornen (mit Feuer oder Licht reflektieren freibrennen) und im Steinhaus mit dem verschiebbaren Block."},
  {kind:"info",txt:"Offen: Game8 zählt fünf korrumpierte Marker Stones, Xboxplay vier, von denen einer zwei Pflöcke hat. Xboxplay nennt den Sandsturm-Teil optional, schreibt aber selbst, dass erst die erledigten Aufgaben den nächsten Abschnitt freischalten."}
 ],
 suchbegriffe:["beyond the sandstorm","sandsturm lösung","weg durch den sandsturm","marker stones","korrumpierte marker stones","verzerrter lichtstrahl","lukumiya","maddin","faraj","hazran","yasmin","sebastian"],
 quellen:[{t:"Game8: Beyond the Margins",url:"https://game8.co/games/Crimson-Desert/archives/635797",datum:"2026-11-14"},{t:"Xboxplay: Sandsturm",url:"https://xboxplay.games/crimson-desert/how-to-navigate-the-sandstorm-in-crimson-desert-77158",datum:"2026-11-14"}],
 conf:"belegt", seo:{seite:"charting-the-unknown", h3:"Der Weg jenseits des Sandsturms: Lösung"}},
/* LOES-PFLICHT Ende */
];
const LOESUNGEN_KUER = [
/* LOES-KUER Anfang */
/* LOES-KUER Ende */
];
const LOESUNGEN = LOESUNGEN_PFLICHT.concat(LOESUNGEN_KUER);
