// Crimson-Desert-Wiki — Datenbestand, am 23.08.2026 aus index.html ausgelagert.
// REIHENFOLGE IST TRAGEND: Bloecke referenzieren frueher definierte (TDZ) — nicht umsortieren,
// Datei laedt als klassisches Script-Tag (src) VOR dem Hauptscript in index.html.
// Enthaelt: PATCHES, MINIGAMES, ENEMY_IMGS, ENEMIES, BEST_PH_PAL, NPC_PAL, QLG, NPC_IMGS, NPC_IMGS_CDN, NPCS
const PATCHES=[
  {ver:"1.18.02",date:"16.08.2026",size:"Zweiter Hotfix des Tages, sechs Stunden nach 1.18.01. Release 10:00 UTC. Vier Fehlerbehebungen unter der einzigen Überschrift Patch-Details — die Notes kennen für diesen Patch keine Unterkategorien. Alle sechs Plattformen (Steam PC, Steam Mac, PlayStation, Xbox, Epic Games Store, Mac App Store) sind einzeln mit dem Status <em>Patch jetzt verfügbar</em> aufgeführt; damit ist der Mac App Store erstmals seit 1.16.04 wieder zeitgleich versorgt. Schwerpunkt sind zwei Fehler, die Spielerbesitz betrafen: eine auf 0 stehende Graumähnen-Anzeige und zurückgesetztes Silber",features:[
    {cat:"Patch-Details",items:[
      "Im <b>Währung-UI des Camps</b> wurde die Anzahl der <b>Graumähnen</b> als <b>0</b> angezeigt — behoben. <span style='color:var(--gdim)'>Einordnung: Die Notes sagen nicht, ob nur die Anzeige falsch war oder der Bestand selbst, und nennen weder Bedingung noch betroffene Spielstände. Die englische Fassung spricht an dieser Stelle von <em>comrades</em>, die deutsche von <em>Graumähnen</em> — derselbe Fix, nur je Sprachfassung anders benannt.</span>",
      "Bei bestimmten Spielständen wurde die Menge des im Besitz befindlichen <b>Silbers zurückgesetzt</b>, wenn die Quest <b>Geheimes Geschäft</b> abgeschlossen wurde — behoben. <span style='color:var(--gdim)'>Einordnung: der schwerwiegendste Punkt dieses Hotfixes, weil er Spielerbesitz vernichtete. Die Notes sagen NICHT, ob bereits verlorenes Silber erstattet wird, welche Spielstände betroffen waren und ob der Verlust vollständig oder teilweise war.</span>",
      "Die <b>Animationen des Spielers beim Bewegen</b> wirkten abgehackt oder unnatürlich — behoben. <span style='color:var(--gdim)'>Einordnung: Ob das an eine Plattform, eine Bildrate oder eine bestimmte Fortbewegungsart gebunden war, steht nicht da.</span>",
      "In bestimmten Situationen ließ sich der <b>Charakter nach der Nutzung des Ladens</b> nicht mehr steuern — behoben. <span style='color:var(--gdim)'>Einordnung: Die auslösende Situation wird nicht genannt. Ob ein Neuladen half oder der Spielstand blockiert war, sagen die Notes ebenfalls nicht.</span>"
    ]},
    {cat:"Known Issues (Stand 17.08.2026)",items:[
      "Die offizielle Known-Issues-Seite (boardNo 68) wurde am <b>17.08.2026 um 09:00 UTC</b> überarbeitet und führt jetzt <b>10 Punkte</b> statt der 13 vom Stand 15.08.2026. <span style='color:var(--gdim)'>Einordnung: Das ist keine Fortschreibung, sondern eine Neufassung der Liste. Die Seite führt keine Änderungshistorie, welche Punkte gestrichen und welche zusammengefasst wurden, ist daher nicht nachvollziehbar. Die Patchnotes zu 1.18.01 und 1.18.02 erwähnen die Überarbeitung mit keinem Wort.</span>",
      "<b>Die zuvor ungeklärte Zähl-Differenz hat sich erledigt</b>: Die Seite nannte am 15.08.2026 eine Gesamtzahl von 14 bei nur 13 aufgeführten Punkten. In der Fassung vom 17.08.2026 fehlt eine Gesamtangabe vollständig. <span style='color:var(--gdim)'>Einordnung: Die Differenz wurde also nicht korrigiert, sondern die Zahl ersatzlos gestrichen. Welche Zählung stimmte, bleibt offen.</span>",
      "<span style='color:var(--gdim)'>Die zehn geführten Punkte: fehlende Interaktion mit NPCs, Reittieren und Objekten (mit dem offiziellen Behelf, das Spiel neu zu starten), unbewegliche Fische beim Angeln, blockierte Greymane-Fraktionsquests als Damiane oder Oongka, die Ausweichen-Taste bei Einstellung <em>Gedrückt halten</em>, NPCs die für den Questfortschritt nicht auf legendären Reittieren mitreiten, zwei Mac-Punkte (Mauszeigerposition im Wohnen-Modus, Farbenblind-Filter nicht auf der UI), der PlayStation-Freeze bei schneller Namenseingabe über die virtuelle Tastatur (mit der Bitte, langsam zu tippen), der weiße Bildschirm auf der GTX 1060 bei FSR Upscaling zusammen mit Frame-Generierung und der FSR4-Regenfehler.</span>",
      "<span style='color:var(--gdim)'>Auffälligkeit auf der offiziellen Seite, hier bewusst nicht geglättet: Der Mac-Punkt zum Farbenblind-Filter steht als einziger im Perfekt („wurde ein Problem behoben“), obwohl er unter <em>Bekannte Probleme</em> gelistet ist. Entweder ist der Fix versehentlich in der Liste verblieben oder die Formulierung ist ein redaktioneller Fehler. Dieses Wiki gibt den Wortlaut wieder, ohne ihn zu deuten.</span>"
    ]},
    {cat:"Quelle",items:[
      "Offizielle Pearl-Abyss-Patchnotes 1.18.02 (Notice-Board boardNo 120, Release 16.08.2026 10:00 UTC), Titel <b>Patch-Notizen Version 1.18.02 (Hotfix für alle Plattformen)</b>. Primärquelle in beiden Sprachfassungen direkt abgerufen. Drei unabhängige Erfassungen stimmen in allen vier Punkten überein und wurden zusätzlich gegen den Seitenvolltext gegengeprüft.",
      "<span style='color:var(--gdim)'>Negativbefunde, ausdrücklich geprüft: Die Seite nennt <b>keine Build-Nummer</b> im Format 1.000.xxx — gezielte Textsuche über beide Sprachfassungen liefert null Treffer. Sie kennt außerdem <b>keine Unterkategorien</b> wie Content, Bug Fixes oder Others, sondern nur die eine Überschrift <em>Patch-Details</em>; anderslautende Gliederungen stammen aus der Fachpresse, nicht von Pearl Abyss. Unter <em>Bekannte Probleme</em> steht auf der Patchseite selbst kein einziger inhaltlicher Punkt, nur ein Verweislink auf boardNo 68.</span>",
      "<span style='color:var(--gdim)'>Die Angabe „vier Punkte“ ist die Zählung dieses Wikis, kein Zitat: Vor der Liste unter <em>Patch-Details</em> steht auf der offiziellen Seite kein Einleitungssatz, der eine Anzahl nennt.</span>"
    ]}
  ]},
  {ver:"1.18.01",date:"16.08.2026",size:"Erster von zwei Hotfixes an diesem Tag, keine 25 Stunden nach dem großen Sammel-Patch 1.18.00. Release 04:00 UTC. Vier Fehlerbehebungen unter der einzigen Überschrift Patch-Details, alle sechs Plattformen einzeln mit dem Status <em>Patch jetzt verfügbar</em>. Bemerkenswert ist weniger der Inhalt als der Bezug: drei der vier Punkte räumen genau die Fehler ab, die am Vortag neu in die offizielle Known-Issues-Liste aufgenommen worden waren",features:[
    {cat:"Patch-Details",items:[
      "Bei <b>angezündeter Laterne</b> öffnete sich das <b>Interaktionsmenü verzögert</b>, wenn mit einem NPC gesprochen wurde — behoben. <span style='color:var(--gdim)'>Einordnung: Dieser Punkt stand am 15.08.2026 als neuer Eintrag in der offiziellen Known-Issues-Liste und war damit rund einen Tag lang offiziell bekannt. Wie groß die Verzögerung war, sagen die Notes nicht.</span>",
      "Einige <b>Gegenstände des Wohn-Systems</b>, die in <b>Version 1.12.00 oder früher</b> platziert worden waren, wurden nicht angezeigt — behoben. <span style='color:var(--gdim)'>Einordnung: ebenfalls ein Punkt, der tags zuvor neu in die Known-Issues-Liste aufgenommen worden war. Ob die Gegenstände nur unsichtbar oder tatsächlich verloren waren und ob sie nach dem Patch von selbst zurückkehren, steht nicht da.</span>",
      "Das Spiel <b>stürzte in bestimmten Situationen direkt nach der Verbindung ab</b> — behoben. <span style='color:var(--gdim)'>Einordnung: der schwerwiegendste der drei zurückgenommenen Known-Issues-Punkte, dort formuliert als unerwartetes Schließen nach dem Start. Die deutsche Fassung spricht von einem Absturz nach der Verbindung, die englische vom unerwarteten Schließen nach dem Start — dieselbe Behebung, unterschiedlich übersetzt. Die auslösende Situation wird in keiner Fassung genannt.</span>",
      "Bestimmte <b>Regionen auf der Weltkarte</b> wurden fehlerhaft dargestellt — behoben. <span style='color:var(--gdim)'>Einordnung: der einzige der vier Punkte ohne Vorlauf in der Known-Issues-Liste. Welche Regionen betroffen waren und worin die Fehldarstellung bestand, sagen die Notes nicht. Ein Bezug zu der in 1.18.00 eingeführten Unterscheidung von Kartenbereichen ist naheliegend, wird von den Notes aber nicht hergestellt.</span>"
    ]},
    {cat:"Einordnung",items:[
      "<b>Drei der vier neuen Known Issues vom 15.08.2026 sind mit diesem Hotfix erledigt</b>: verzögertes Interaktionsmenü, unsichtbare Housing-Gegenstände und der Absturz nach dem Start. <span style='color:var(--gdim)'>Offen bleibt aus dieser Vierergruppe allein der Punkt, dass Interaktionen mit NPCs, Reittieren und bestimmten Objekten in bestimmten Situationen nicht verfügbar sind — er steht in der überarbeiteten Liste vom 17.08.2026 weiterhin an erster Stelle, jetzt ergänzt um den offiziellen Behelf, das Spiel neu zu starten.</span>",
      "<span style='color:var(--gdim)'>Diese Zuordnung ist eine Gegenüberstellung dieses Wikis, keine Aussage von Pearl Abyss: Die Patchnotes zu 1.18.01 nennen die Known-Issues-Liste nicht und behaupten nirgends, Punkte daraus abzuräumen. Die Übereinstimmung der Formulierungen ist jedoch so eng, dass ein Zufall ausscheidet.</span>"
    ]},
    {cat:"Quelle",items:[
      "Offizielle Pearl-Abyss-Patchnotes 1.18.01 (Notice-Board boardNo 119, Release 16.08.2026 04:00 UTC), Titel <b>Patch-Notizen Version 1.18.01 (Hotfix für alle Plattformen)</b>. Primärquelle in beiden Sprachfassungen direkt abgerufen, drei unabhängige Erfassungen zusätzlich gegen den Seitenvolltext gegengeprüft.",
      "<span style='color:var(--gdim)'>Negativbefunde, ausdrücklich geprüft: <b>keine Build-Nummer</b> im Format 1.000.xxx auf der Seite (die einzige ähnlich aussehende Zahl ist die Versionsreferenz 1.12.00 im Fließtext), <b>keine Unterkategorien</b> außer <em>Patch-Details</em>, und unter <em>Bekannte Probleme</em> nur ein Verweislink statt eigener Punkte. Eine der drei Erfassungen zählte diesen Verweis fälschlich als fünften Patchpunkt mit — die belegte Zahl ist vier.</span>"
    ]}
  ]},
  {ver:"1.18.00",date:"15.08.2026",size:"Großer Sammel-Patch, laut Notes auf allen Plattformen ausgerollt. Steam (PC), Steam (Mac), PlayStation, Xbox & Epic Games Store sofort; Mac App Store laut Notes zu einem späteren Zeitpunkt (in-progress). Release 03:43 UTC. 42 Einzelpunkte unter der offiziellen Sammelüberschrift Main Improvements in sieben Kategorien — inhaltlich die größte Neuerung ist die Wissenskategorie <b>Quests</b> mit 8 Unterkategorien, dazu die von zwei auf drei Stufen erweiterte Lock-on-Kameradrehung. Die offizielle Selbstbeschreibung nennt trotzdem nur Fehlerbehebungen und Stabilität",features:[
    {cat:"Content",items:[
      "Die neue Wissenskategorie <b>Quests</b> wurde hinzugefügt. <span style='color:var(--gdim)'>Einordnung: Die Notes sagen nicht, wo die Kategorie im Menü sitzt, ob sie eine Vervollständigungsanzeige oder Belohnungen hat und ob das Sammeln einen Gameplay-Effekt hat. Ob bestehende Wissenskategorien dabei umsortiert wurden, steht ebenfalls nicht da.</span>",
      "Die neue Kategorie besteht aus <b>8 Unterkategorien</b>: Hauptquests, Fraktionsquests, Ermittlungsquests, Forschungsquests, Alltagsquests, Guide, Archivaufzeichnungen und Sternbilder. <span style='color:var(--gdim)'>Einordnung: Wie viele Einträge je Unterkategorie existieren und ob die Liste später wächst, sagen die Notes nicht. Vorsicht bei <em>Guide</em> — die offizielle deutsche Fassung übersetzt das als <em>Anführer</em> (Person), nicht als Leitfaden; welche Lesart im Spiel gemeint ist, geht aus den Notes nicht hervor. Auch <em>Constellations</em> bleibt ohne Bezug zu einem System.</span>",
      "Bestimmte Quest-Wissenseinträge werden <b>rückwirkend</b> gewährt, wenn die zugehörige Quest bereits abgeschlossen wurde. <span style='color:var(--gdim)'>Einordnung: Das Schlüsselwort ist <em>Certain</em>. Es steht ausdrücklich NICHT da, dass alle abgeschlossenen Quests nachträglich gutgeschrieben werden, und auch nicht, wann die Gutschrift erfolgt.</span>",
      "Die für <b>Forschung</b> benötigte Ressource wurde von <b>Silber</b> auf <b>Camp-Mittel</b> (camp funds) umgestellt. <span style='color:var(--gdim)'>Einordnung: Die Notes nennen keinen einzigen Zahlenwert — keine Kosten, keinen Umrechnungskurs und keine Aussage, ob Forschung dadurch teurer oder billiger wird. Ob bereits ausgegebenes Silber erstattet wird und ob laufende Forschungen betroffen sind, steht nicht da.</span>",
      "<b>Hochwertige Handelswaren</b> konnten in Mengen von bis zu <b>100</b> gestapelt und verladen werden — behoben. <span style='color:var(--gdim)'>Einordnung: Welche Waren gemeint sind und welches Limit jetzt stattdessen gilt, sagen die Notes nicht. Das Wort Exploit fällt nicht, und ob bereits verladene Bestände korrigiert werden, bleibt offen.</span>",
      "In bestimmten Situationen erschienen keine <b>Händler an Handelsständen</b> — behoben. <span style='color:var(--gdim)'>Einordnung: Ort, Tageszeit und Ursache werden nicht genannt. Die deutsche Fassung präzisiert abweichend auf <em>Straßen-Handelsposten</em>, das englische Original sagt nur <em>trading stalls</em>.</span>",
      "Der Fundort des Gegenstands <b>Baker's Note</b> aus der Quest <b>Haverson's Request</b> wurde geändert. <span style='color:var(--gdim)'>Einordnung: Weder der alte noch der neue Fundort wird genannt. Ob Spieler mit laufender Quest den Gegenstand am alten Ort noch finden, steht nicht da. Offizielle deutsche Namen: Quest <em>Anfrage von Haverson</em>, Gegenstand <em>Notiz des Bäckers</em>.</span>",
      "<b>Tierwissen durch Aufheben</b>: Wissen über bestimmte Tiere lässt sich jetzt durch Aufheben statt durch Töten erlangen. <span style='color:var(--gdim)'>Einordnung: Welche Tiere betroffen sind, steht nicht da. Ob Töten weiterhin funktioniert oder ersetzt wurde und ob bereits getötete Tiere rückwirkend zählen, sagen die Notes nicht.</span>",
      "Die Formulierung bestimmter <b>Boss-Wissenseinträge</b> wurde verbessert. <span style='color:var(--gdim)'>Einordnung: Rein textlich. Kein Boss wird namentlich genannt, kein alter und kein neuer Text gezeigt. Die deutsche Fassung ergänzt die Wertung, die Einträge hätten <em>unpassend</em> gewirkt — diese Wertung fehlt im englischen Original.</span>",
      "Im <b>Stall</b> kann jetzt <b>Pferdeausrüstung</b> angelegt werden. <span style='color:var(--gdim)'>Einordnung: Welche Ausrüstungsteile (Sattel, Zaumzeug, Hufeisen, Rüstung) gemeint sind, ob das an allen Ställen gilt und wie es zuvor ging, sagen die Notes nicht. Offizieller deutscher Begriff: <em>Pferdegeschirr</em>.</span>",
      "Die <b>sinnende Statue</b> fiel während der Reparatur-Quest im <b>Jijeong-Tempel</b> in bestimmten Situationen in ihren unreparierten Zustand zurück — behoben. <span style='color:var(--gdim)'>Einordnung: Die deutsche Fassung ordnet das <b>Kapitel 9</b> zu, die englische nennt gar kein Kapitel — die Kapitelangabe ist also nur übersetzungsseitig belegt. Ob betroffene Spielstände sich selbst reparieren, steht nicht da.</span>",
      "<b>Kilnden-Werkstatt</b>: In der Quest aus Kapitel 4 <em>The Price of Knowledge > Mysterious Pot > Kiln Repair</em> lassen sich die zerbrochenen Teile des Brennofens jetzt mit <b>Force Current</b> wieder ansetzen. <span style='color:var(--gdim)'>Einordnung: Die Notes schreiben <em>Improved</em>, nicht <em>Fixed</em> — ob die Reparatur vorher überhaupt funktionierte und ob die alte Methode weiterhin geht, bleibt offen. Offizielle deutsche Namen: <em>Der Preis des Wissens > Geheimnisvoller Eisentopf > Brennofen-Reparatur</em>, Fähigkeit <em>Kraftübertragung</em>. Die deutsche Fassung spricht vom abgetrennten Teil im Singular, die englische von <em>the broken pieces</em> im Plural.</span>",
      "Die Teilaufgabe <b>Defeat the enemies around the cabin</b> erschien nicht in der Nähe von <b>Cairn House</b> — behoben. <span style='color:var(--gdim)'>Einordnung: Zu welcher Hauptquest die Teilaufgabe gehört und ob sie ein Progressionsblocker war, sagen die Notes nicht. Offizielle deutsche Namen: <em>Besiege die Feinde rund um die Hütte</em> beim <em>Haus Steinhügel</em>.</span>",
      "Das Wissen <b>Mysterious Invitation</b> lässt sich jetzt nach Abschluss von <b>Read the memory beneath Delesyia Castle</b> erlangen. <span style='color:var(--gdim)'>Einordnung: Die Notes schreiben <em>Improved</em> und lassen damit offen, ob das Wissen vorher gar nicht erreichbar war (Bug) oder nur anders (Design-Änderung). Ob rückwirkend vergeben wird, steht nicht da. Offizielle deutsche Namen: Wissen <em>Geheimnisvolle Einladung</em>, Vorbedingung <em>Sieh dir die Erinnerung in der Burg Delesyia an</em>.</span>"
    ]},
    {cat:"Controls",items:[
      "Neue Optionen für <b>Lock-on Camera Rotation</b> (Drehung der fixierten Kamera) wurden hinzugefügt. <span style='color:var(--gdim)'>Einordnung: Reine Überschriftszeile der offiziellen Notes; die Details stehen in den folgenden Punkten. Welche Option nach dem Patch voreingestellt ist, sagen die Notes NICHT — das ist die praktisch wichtigste offene Frage, weil unklar bleibt, worauf die bisherige An/Aus-Einstellung gemappt wird.</span>",
      "<b>Lock-on Camera Rotation</b> unter <em>Input</em> in den Spieleinstellungen hat jetzt <b>drei Optionen</b> — manual, semi-auto und auto — statt der bisherigen zwei (aktiviert und deaktiviert). <span style='color:var(--gdim)'>Einordnung: Ob die Option global, pro Waffe oder pro Gegnertyp wirkt und ob sie auf Konsole und PC gleich heißt, steht nicht da.</span>",
      "<b>Manual</b>: Bei aktivem Lock-on lässt sich die Kamera mit rechtem Stick oder Maus drehen. <span style='color:var(--gdim)'>Entspricht laut Notes ausdrücklich der bisherigen Einstellung <em>aktiviert</em>. Ob die Kamera dabei das Ziel verlieren kann, steht nicht da.</span>",
      "<b>Semi-auto</b>: Bei aktivem Lock-on lässt sich die Kamera mit rechtem Stick oder Maus nur innerhalb eines begrenzten Bereichs drehen. <span style='color:var(--gdim)'>Einordnung: Das ist die einzige echt neue Option — sie trägt als einzige keine Angabe zu einer bisherigen Entsprechung. Der begrenzte Bereich wird nicht beziffert: kein Winkel, kein Gradwert, keine Angabe ob konfigurierbar. Die deutsche Fassung präzisiert auf <em>Winkelbereich</em>.</span>",
      "<b>Auto</b>: Bei aktivem Lock-on lässt sich die Kamera weder mit dem rechten Stick noch mit der Maus drehen. <span style='color:var(--gdim)'>Entspricht laut Notes ausdrücklich der bisherigen Einstellung <em>deaktiviert</em>. Wonach die Kamera sich in diesem Modus richtet, sagen die Notes nicht.</span>",
      "In bestimmten Situationen ließen sich <b>beim Reiten mit einer Fernkampfwaffe</b> keine Ziele erfassen — behoben. <span style='color:var(--gdim)'>Einordnung: Keine Waffe wird namentlich genannt, kein Reittiertyp, keine Ursache.</span>",
      "Der <b>Schnellwahl-Pfeil</b> bewegte sich unnatürlich — behoben. <span style='color:var(--gdim)'>Einordnung: Ob ein UI-Zeiger im Schnellwahlrad oder ein Pfeil-Item gemeint ist, lässt das englische Original offen; die deutsche Fassung übersetzt <em>arrow</em> als <em>Zeiger</em>, was für die UI-Lesart spricht.</span>"
    ]},
    {cat:"Combat/Action",items:[
      "Bestimmte <b>spezielle Reittiere</b> blieben beim Überqueren niedriger Vorsprünge hängen — verbessert. <span style='color:var(--gdim)'>Einordnung: Die Notes schreiben bewusst <em>Improved</em> statt <em>Fixed</em>, behaupten also ausdrücklich keine vollständige Behebung. Welche Reittiere gemeint sind und was <em>low ledges</em> in Zahlen bedeutet, steht nicht da.</span>",
      "Der Spieler konnte <b>nicht durch Fenster klettern</b>, obwohl kein Hindernis vorhanden war — behoben. <span style='color:var(--gdim)'>Einordnung: Keine Ortsangabe, keine betroffenen Fenstertypen oder Gebäude, keine Ursache.</span>",
      "<b>Sir Catfish</b> führte unter bestimmten Umständen wiederholt dieselbe Aktion an derselben Stelle aus — behoben. <span style='color:var(--gdim)'>Einordnung: Welche Aktion und welche Stelle, sagen die Notes nicht. Dass Sir Catfish ein Boss ist, steht nur in der deutschen Fassung (<em>der Boss Welsmensch</em>), nicht im englischen Original. Ob der Kampf dadurch unschaffbar war, bleibt offen. Dieses Wiki führt ihn als optionalen Faction-Boss am Teich der Süd-Küste von Hernand (Vellua/Vallua) aus der Quest <em>Beyond the Silent Waves</em> der Vellua Fishermen's Guild — diese Verortung stammt aus dem Wiki-Bestand, nicht aus den Patchnotes.</span>"
    ]},
    {cat:"UI",items:[
      "Auf der <b>Karte</b> lassen sich jetzt Gebiete, die durch das <b>Läuten der Glocke</b> aufgedeckt wurden, optisch von selbst erkundeten Gebieten unterscheiden. <span style='color:var(--gdim)'>Einordnung: WIE die Unterscheidung aussieht, beschreiben die Notes nicht — keine Farbe, kein Nebel-Effekt, keine Helligkeitsstufe. Eine in Fachpresse-Meldungen kursierende Beschreibung mit dunklerem und hellerem Nebel steht in keiner der beiden Sprachfassungen und ist damit unbelegt. Die deutsche Fassung spricht präzisierend von der Weltkarte.</span>"
    ]},
    {cat:"Graphics/Settings",items:[
      "<b>Innenraum-Lichteffekte</b> waren in bestimmten Situationen instabil — behoben. <span style='color:var(--gdim)'>Einordnung: Was <em>unstable</em> bedeutet (Flackern, Aussetzer, Farbsprung), sagen die Notes nicht; auch keine Ortsangabe und keine Hardware-Abhängigkeit.</span>",
      "Die <b>Kamera</b> ruckelte oder zitterte bei Steuerung unter <b>niedrigen FPS</b> — behoben. <span style='color:var(--gdim)'>Einordnung: Es wird keine FPS-Schwelle genannt. Behoben wurde das Kamera-Zittern, nicht die niedrige Framerate selbst.</span>",
      "Auf bestimmten <b>leistungsschwächeren Grafikkarten</b>, darunter die <b>GTX 1060</b>, wurde das Rendering bei aktiviertem <b>FSR Frame Generation</b> oder <b>XeSS Frame Generation</b> fehlerhaft dargestellt — behoben. <span style='color:var(--gdim)'>Einordnung: Die GTX 1060 ist die einzige namentlich genannte Karte, die übrigen bleiben offen — die Notes behaupten also nicht, alle betroffenen Karten aufzuzählen. DLSS Frame Generation wird ausdrücklich nicht erwähnt. Was <em>corrupted</em> konkret hieß, steht nicht da. Zum Vergleich: die Known-Issues-Liste führte für die GTX 1060 bisher den weißen Bildschirm bei FSR Upscaling zusammen mit Frame Generation.</span>"
    ]},
    {cat:"Localization",items:[
      "Diverse Lokalisierungsfehler behoben und die Lokalisierungsqualität in allen Sprachen verbessert. <span style='color:var(--gdim)'>Einordnung: Wortgleicher Sammelposten wie in 1.17.00. Keine Sprache, kein konkreter Textfehler, kein Umfang wird genannt — es ist nicht prüfbar, ob Deutsch überhaupt betroffen war.</span>"
    ]},
    {cat:"Others",items:[
      "Beim <b>Wiederbeleben an einem Wiederbelebungspunkt</b> kehrte das Spiel gelegentlich zum <b>Titelbildschirm</b> zurück — behoben. <span style='color:var(--gdim)'>Einordnung: Ob es ein Absturz oder ein kontrollierter Rückwurf war, ob Fortschritt verloren ging und welche Plattformen betroffen waren, sagen die Notes nicht. Die deutsche Fassung sagt abweichend <em>Kontrollpunkt</em>.</span>",
      "Die <b>Sprachausgabe eines Hilfe-Pop-ups</b> wurde beim Vorspulen einer Zwischensequenz ebenfalls beschleunigt abgespielt — behoben. <span style='color:var(--gdim)'>Einordnung: Um welches Hilfe-Pop-up es geht, steht nicht da.</span>",
      "<b>Arbeiter</b> funktionierten nach dem Laden eines Spielstands nicht richtig — behoben. <span style='color:var(--gdim)'>Einordnung: Was <em>workers</em> genau meint (Camp-/Lagerarbeiter) und worin die Fehlfunktion bestand, sagen die Notes nicht. Die deutsche Fassung engt auf Bewegung ein (<em>bewegten sich nicht ordnungsgemäß</em>). Ob Produktion ausfiel oder Verluste erstattet werden, bleibt offen.</span>",
      "Gewöhnliche <b>NPCs</b> waren in <b>abgeriegelten Gebieten</b> platziert — behoben. <span style='color:var(--gdim)'>Einordnung: Keine Ortsangabe. Die deutsche Fassung übersetzt <em>blockaded</em> als <em>besetzte Regionen</em>, was etwas anderes nahelegt (militärisch besetzt statt abgesperrt) — welche Lesart korrekt ist, lässt sich aus den Notes nicht entscheiden.</span>",
      "Die <b>Animation eines reitenden Charakters</b> sah fehlerhaft aus — behoben. <span style='color:var(--gdim)'>Einordnung: Weder Reittier noch Charakter noch Art der Fehldarstellung werden genannt.</span>",
      "Der Charakter geriet auf der <b>Abyss Skyloop Bridge</b> gelegentlich in die <b>zerbrochene Abyss-Schleife</b> — behoben. <span style='color:var(--gdim)'>Einordnung: Ob der Charakter dort feststeckte, starb oder nur falsch positioniert wurde, steht nicht da. Offizielle deutsche Namen: <em>Himmelsschleifenbrücke</em> und <em>Zerbrochener Abyss-Ring</em> — Ring und loop decken sich nicht sauber.</span>",
      "Der <b>Zeitraffer-Effekt</b> wurde nach Nutzung des <b>Fokusmodus</b> nicht angewendet — behoben. <span style='color:var(--gdim)'>Einordnung: Was der Effekt im Spiel bewirkt, erklären die Notes nicht; die deutsche Fassung beschreibt ihn als Effekt für den beschleunigten Zeitablauf. Ob visueller Effekt oder Spielmechanik, bleibt offen.</span>",
      "Bestimmte <b>Ausrüstung</b> schien durch den Charakter zu <b>clippen</b> — behoben. <span style='color:var(--gdim)'>Einordnung: Kein Rüstungsteil, kein Charakter und kein Modell werden benannt.</span>",
      "<b>Aeserions</b> Bewegungen wirkten fehlerhaft — behoben. <span style='color:var(--gdim)'>Einordnung: Die Notes sagen nicht, wer oder was Aeserion ist und worin die Fehlbewegung bestand. Dieses Wiki führt <b>Aeserion, the Great Serpent</b> als Boss am Serpent Shrine in Delesyia (südlich Dewhaven) aus der Faction <em>Shackled God</em> — diese Zuordnung stammt aus dem Wiki-Bestand, nicht aus den Patchnotes, und die Notes bestätigen nicht ausdrücklich, dass derselbe Aeserion gemeint ist.</span>",
      "<b>Progressionsblocker behoben</b>: Der Fortschritt war blockiert, wenn der Spieler während <b>Time to Face Justice</b> vor dem Treffen mit <b>Torstein</b> zu <b>Oongka</b> wechselte. <span style='color:var(--gdim)'>Einordnung: Der einzige ausdrücklich als Fortschrittsblockade benannte Fehler dieses Patches. Ob bereits blockierte Spielstände durch den Patch gelöst werden oder ein älterer Spielstand geladen werden muss, sagen die Notes nicht. Offizieller deutscher Questname: <em>Zeit, der Gerechtigkeit ins Auge zu blicken</em>.</span>",
      "Beim Bedienen der <b>Heizung</b> ließen sich mehrere <b>Ölkanister</b> in denselben Slot einsetzen — behoben. <span style='color:var(--gdim)'>Einordnung: Ob dabei Kanister verloren gingen oder es ein Duplikations-Exploit war, steht nicht da. Die Sprachfassungen weichen ab: die deutsche spricht von Ölfässern, einer Ölfass-Halterung und davon, dass sie übereinander angebracht werden konnten.</span>",
      "In <b>Läden</b> und <b>Färbehäusern</b> wurde bei aktivem <b>Preview Only Selected</b> nach dem Ausrüsten von <b>Doppelwaffen</b> ein Schild angezeigt — behoben. <span style='color:var(--gdim)'>Einordnung: Reiner Vorschau-Darstellungsfehler; die Notes sagen nicht, dass die tatsächliche Ausrüstung betroffen war. Offizieller deutscher Optionsname: <em>Nur ausgewählte Gegenstände anzeigen</em>. Themenverwandt, aber ein anderer Fehler als der Schild-Bug aus 1.16.03.</span>",
      "Soundeffekte von <b>Abyss-Gear-Fähigkeiten</b> wurden selbst dann abgespielt, wenn ihre Lautstärke auf <b>0</b> stand — behoben. <span style='color:var(--gdim)'>Einordnung: Also zu laut, nicht zu leise. Fachpresse-Meldungen, die diesen Punkt als zu geringe Lautstärke beschreiben, kehren den offiziellen Wortlaut um und sind falsch. Die deutsche Fassung präzisiert auf Soundeffektlautstärke, die englische sagt nur <em>their volume</em>.</span>"
    ]},
    {cat:"Known Issues (Stand 15.08.2026)",items:[
      "Die offizielle Known-Issues-Seite (boardNo 68) wurde am <b>15.08.2026 um 12:50 UTC</b> aktualisiert, also rund neun Stunden NACH dem Patch. Sie führt jetzt <b>13 aufgeführte Punkte</b> gegenüber 9 zum bisher dokumentierten Stand vom 04.08.2026. <span style='color:var(--gdim)'>Einordnung: Die Patchnotes zu 1.18.00 selbst führen kein einziges bekanntes Problem auf und sagen auch nicht, ob die Liste zu diesem Patch aktualisiert wurde. Die Seite führt keine Änderungshistorie; der zeitliche Zusammenhang ist naheliegend, aber nicht offiziell bestätigt. Hinweis zur Zählung: Eine Gesamtangabe der Seite nannte 14, tatsächlich aufgeführt waren 13 Punkte. <b>Nachtrag vom 21.08.2026:</b> Die Differenz wurde nie korrigiert — die Seite wurde am 17.08.2026 neu gefasst und nennt seither gar keine Gesamtzahl mehr, bei 10 statt 13 Punkten. Siehe den Eintrag zu 1.18.02.</span>",
      "<b>Neu gegenüber dem Stand 04.08.2026</b> sind vier Punkte: Das Interaktionsmenü öffnet sich <b>verzögert</b>, wenn man bei brennender Laterne mit einem NPC spricht. <span style='color:var(--gold);font-weight:600'>Behoben in Hotfix 1.18.01 am 16.08.2026.</span>",
      "Interaktionen mit <b>NPCs, Reittieren und bestimmten Objekten</b> sind in bestimmten Situationen nicht verfügbar. <span style='color:var(--gdim)'>Als einziger der vier neuen Punkte weiterhin offen — er steht in der überarbeiteten Liste vom 17.08.2026 an erster Stelle, jetzt ergänzt um den offiziellen Behelf, das Spiel neu zu starten.</span>",
      "<b>Housing-Gegenstände</b>, die in Version 1.12.00 oder früher platziert wurden, werden nicht angezeigt. <span style='color:var(--gold);font-weight:600'>Behoben in Hotfix 1.18.01 am 16.08.2026.</span>",
      "Das Spiel kann sich in bestimmten Situationen nach dem Start <b>unerwartet schließen</b>. <span style='color:var(--gold);font-weight:600'>Behoben in Hotfix 1.18.01 am 16.08.2026.</span> <span style='color:var(--gdim)'>Einordnung: der schwerwiegendste der vier neuen Punkte. Plattform, Ursache und Häufigkeit nennt die Liste nicht — er stand knapp einen Tag offiziell offen.</span>",
      "<span style='color:var(--gdim)'>Unverändert weiter geführt werden die bekannten neun Punkte: unbewegliche Fische beim Angeln, blockierte Greymane-Fraktionsquests als Damiane oder Oongka, die Evasion-Control-Taste bei Einstellung Hold, NPCs die nicht auf Legendary-Animal-Reittieren mitreiten, zwei Mac-Punkte (Cursorposition bei Möbelplatzierung, Farbenblindheitsfilter nicht auf der UI), der PlayStation-Freeze bei schneller Eingabe über die virtuelle Tastatur, der weiße Bildschirm auf der GTX 1060 bei FSR Upscaling zusammen mit Frame Generation und der FSR4-Regenfehler. Bemerkenswert: Der GTX-1060-Punkt bleibt in der Liste, obwohl 1.18.00 einen Renderfehler mit FSR und XeSS Frame Generation ausdrücklich für diese Karte behebt — es handelt sich also entweder um zwei verschiedene Fehler oder die Liste ist an dieser Stelle noch nicht nachgezogen.</span>"
    ]},
    {cat:"Quelle",items:[
      "Offizielle Pearl-Abyss-Patchnotes 1.18.00 (Notice-Board boardNo 117, Release 15.08.2026 03:43 UTC), englischer Titel <b>[Updates] Patch Notes Version 1.18.00</b>. Primärquelle in beiden Sprachfassungen direkt abgerufen und aus dem Seitenquelltext extrahiert, nicht aus Suchsnippets. Die offizielle Gliederung lautet Major Updates / Update Schedule / Update / Patch Details > Main Improvements (Content, Controls, Combat / Action, UI, Graphics / Settings, Localization, Others) / Known Issues. Alle 42 Punkte unter Main Improvements sind oben erfasst; drei unabhängige Erfassungen der Primärquelle stimmen Punkt für Punkt überein.",
      "Die offizielle Selbstbeschreibung unter <b>Major Updates</b> lautet vollständig: dieser Patch bringe diverse Fehlerbehebungen und Stabilitätsverbesserungen. <span style='color:var(--gdim)'>Bemerkenswert: Die neue Wissenskategorie Quests, inhaltlich die größte Änderung, wird dort NICHT als Highlight ausgewiesen, sondern nur unten unter Content geführt. Ein Wartungsfenster, eine Downloadgröße und ein Termin für den Mac App Store werden nicht genannt.</span>",
      "Konsolen-Build <b>1.000.457</b> — <b>nicht offiziell dokumentiert</b>. Eine Regex-Suche nach dem Muster 1.000.xxx über das komplette HTML beider Sprachfassungen liefert null Treffer; Pearl Abyss nennt in dieser Notice überhaupt keine Build-Nummer. Die Zahl stammt allein aus dem MP1st-Artikeltitel, dessen Text wegen HTTP 403 nicht lesbar war. Auf welche Plattform sie sich bezieht, ist unbelegt.",
      "Die Notes verweisen am Ende auf die separate Notice <b>Crimson Desert Known Issues</b> (boardNo 68), führen aber selbst kein einziges bekanntes Problem auf und sagen auch nicht, ob die Liste zu diesem Patch aktualisiert wurde.",
      "<span style='color:var(--gdim)'>Tippfehler im englischen Original, hier bewusst nicht stillschweigend korrigiert: <em>consits</em> statt consists, <em>obatined</em> statt obtained, <em>revivival point</em> statt revival point, <em>volumne</em> statt volume sowie <em>auto., where as</em> statt auto, whereas.</span>",
      "<span style='color:var(--gdim)'>Abweichungen zwischen englischer und deutscher Fassung, die den Sinn berühren: Nur die deutsche Fassung nennt bei der Jijeong-Tempel-Statue <em>Kapitel 9</em> und bezeichnet Sir Catfish als Boss. Weiter: trading stalls gegen Straßen-Handelsposten, blockaded areas gegen besetzte Regionen, revival point gegen Kontrollpunkt, quick slot arrow gegen Zeiger im Schnellzugriff, broken abyss loop gegen Zerbrochener Abyss-Ring, oil canisters in einem Slot gegen Ölfässer übereinander in einer Halterung, Plural broken pieces gegen Singular abgetrennter Teil. Der deutsche Seitentitel wird ohne Leerzeichen als <em>Patch-Notizen: Version1.18.00</em> ausgeliefert.</span>",
      "<span style='color:var(--gdim)'>Abgrenzung: boardNo 118 trägt den Titel [Notices] Update Highlights und ist KEINE Patch-Notiz, obwohl seine Nummer höher liegt als die des Patches. Die boardNo-Reihenfolge bildet die Veröffentlichungsreihenfolge nicht ab: 118 datiert auf den 12.08.2026 13:00 UTC, der jüngere Patch 1.18.00 auf den 15.08.2026 03:43 UTC.</span>"
    ]}
  ]},
  {ver:"1.17.00",date:"07.08.2026",size:"Bugfix-Patch, laut Notes auf allen Plattformen ausgerollt. Steam (PC), Steam (Mac), PlayStation, Xbox & Epic Games Store sofort; Mac App Store laut Notes zu einem späteren Zeitpunkt (in-progress). Release 12:30 UTC. Sieben Fehlerbehebungen unter der offiziellen Sammelüberschrift Main Improvements — kein neuer Inhalt, keine Balance-Änderung",features:[
    {cat:"Content",items:[
      "Der Fortschritt für die Challenge <b>Desperate Rescue</b> wurde nicht korrekt gezählt — behoben. <span style='color:var(--gdim)'>Einordnung: reiner Zählungs-Fix. Die Notes nennen keine Änderung an Ablauf, Voraussetzungen oder Belohnung der Challenge.</span>",
      "Waren alle dem <b>Quick Slot</b> zugewiesenen Nahrungsmittel verbraucht, wurde dem Slot ein nicht vorgesehenes Item zugewiesen — behoben. <span style='color:var(--gdim)'>Einordnung: Welches Item das war, sagen die Notes nicht.</span>",
      "Die einzigartigen Effekte von <b>special headgear</b> (speziellen Kopfbedeckungen) aktivierten sich in bestimmten Situationen nicht korrekt — behoben. <span style='color:var(--gdim)'>Einordnung: Die Notes nennen weder konkrete Kopfbedeckungen noch die betroffenen Situationen. Eine Zuordnung zu einzelnen Helmen im Rüstungs-Bereich dieses Wikis wäre unbelegt.</span>"
    ]},
    {cat:"Combat/Action",items:[
      "Schrittgeräusche konnten sich überlagern oder Animationen konnten stocken, während sich der Spieler bewegte — behoben."
    ]},
    {cat:"UI",items:[
      "Symbole <b>nicht erlangbarer</b> Schatzkisten (<b>unobtainable treasure chests</b>) erschienen auf der Karte — behoben. <span style='color:var(--gdim)'>Einordnung: Das Original sagt <em>unobtainable</em>, also nicht mehr beziehbar — nicht <em>unerreichbar</em> im Sinne eines räumlichen Zugangsproblems. Betroffen ist allein die Kartenanzeige, nicht Bestand oder Inhalt von Kisten.</span>",
      "Handelsrouten (<b>trade routes</b>) wurden auf der Karte fehlerhaft dargestellt — behoben. <span style='color:var(--gdim)'>Einordnung: betrifft den mit 1.16.00 eingeführten Handels-Tab der Karte. Worin die Fehldarstellung bestand, sagen die Notes nicht.</span>"
    ]},
    {cat:"Localization",items:[
      "Diverse Lokalisierungsfehler behoben und die Lokalisierungsqualität in allen Sprachen verbessert. <span style='color:var(--gdim)'>Einordnung: Der offizielle Wortlaut ist <em>across all languages</em>; einzelne Sprachen, Regionen oder Beispiele werden nicht genannt.</span>"
    ]},
    {cat:"Quelle",items:[
      "Offizielle Pearl-Abyss-Patchnotes 1.17.00 (Notice-Board boardNo 116, Release 07.08.2026 12:30 UTC), Primärquelle direkt abgerufen und wortgetreu gegengeprüft: Datum, UTC-Zeit, Plattform-Status und alle 7 Punkte in den vier Kategorien Content, Combat / Action, UI und Localization bestätigt. Gespiegelt in den Steam-News zum Spiel.",
      "Konsolen-Build <b>1.000.434</b> — <b>nicht offiziell dokumentiert</b>; die Nummer steht nur in den Artikeltiteln von MP1st und updatecrazy.com, die offizielle Seite nennt keine Build-Nummer. Ob sie für PS5, Xbox oder beide gilt, ist unbelegt. Eine Patch-Größe nennt keine geprüfte Quelle.",
      "Die offizielle <b>Known-Issues-Liste</b> (boardNo 68) trägt weiterhin den Stand 04.08.2026 05:20 UTC und wurde zu diesem Patch nicht erneut aktualisiert; ihre 9 Punkte stehen beim Eintrag 1.16.03.",
      "<span style='color:var(--gdim)'>Abweichungen der Fachpresse: DSOGaming datiert den Patch auf den 08.08.2026 (vermutlich lokale Zeit), VULKK und GameRant auf den 07.08.2026. TwistedVoxel führt eine eigene Kategorie <em>Stabilität</em>; unter <em>Main Improvements</em> gibt es sie offiziell nicht — die Notes erwähnen Stabilität nur im Vorspann unter <em>Major Updates</em> („This patch adds various bug fixes and stability improvements“), also redaktionelle Zusammenfassung statt offizieller Kategorie. Die von MP1st im selben Artikel gelisteten Known Issues sind keine Inhalte dieses Patches.</span>"
    ]}
  ]},
  {ver:"1.16.04",date:"05.08.2026",size:"Hotfix (All Platforms). Steam (PC), Steam (Mac), PlayStation, Xbox & Epic Games Store sofort; Mac App Store laut Notes zu einem späteren Zeitpunkt (in-progress). Release 09:00 UTC. Ein einziger Fix zu falschen Ausrüstungs-Stückzahlen nach Speichern und Neuladen — kein neuer Inhalt, keine Balance-Änderung",features:[
    {cat:"Fixes",items:[
      "<b>Falsche Ausrüstungsmenge nach Speichern und Laden</b>: Der Erhalt bestimmter Ausrüstung mit anschließendem Speichern und erneutem Laden des Spiels konnte dazu führen, dass die <b>Menge anderer Ausrüstungsgegenstände</b> falsch war — behoben. <span style='color:var(--gdim)'>Einordnung: Der offizielle Wortlaut ist <em>the quantity of other equipment to become incorrect</em>. Ob nur die Anzeige oder der tatsächliche Bestand betroffen war, sagen die Notes nicht; Ursache und betroffene Ausrüstungsteile werden ebenfalls nicht genannt.</span>"
    ]},
    {cat:"Quelle",items:[
      "Offizielle Pearl-Abyss-Patchnotes 1.16.04 (Notice-Board boardNo 115, Release 05.08.2026 09:00 UTC), Titel <b>Patch Notes Version 1.16.04 (All Platforms Hotfix)</b>. Primärquelle direkt abgerufen: der oben genannte Fix ist der einzige inhaltliche Punkt. Trotz des Titels <em>All Platforms</em> war der <b>Mac App Store</b> zum Veröffentlichungszeitpunkt ausdrücklich noch nicht versorgt (Patch available at a later time, in-progress). Am Ende verweisen die Notes auf die separate Notice <b>Crimson Desert Known Issues</b>.",
      "Konsolen-Build <b>1.000.428</b> — <b>nicht offiziell dokumentiert</b>, nur bei MP1st und dem Aggregator updatecrazy.com gefunden; beide Seiten waren nur über Suchsnippets lesbar (Direktabruf HTTP 403). Eine eigenständige zweite Presseabdeckung des Fixes selbst fehlt, eine Patch-Größe nennt keine Quelle.",
      "<span style='color:var(--gdim)'>Abgrenzung: Fachpresse-Zusammenfassungen zum Build 1.000.428 nennen zusätzlich den Shield-Fix und den Ladebildschirm-/Schwarzbild-Fix. Beide gehören nicht zu 1.16.04 — der Shield-Fix stammt aus 1.16.03 (boardNo 114), der Ladebildschirm-Fix aus 1.16.02 (boardNo 112). Ob der Konsolen-Build technisch mehrere Hotfixes bündelt oder die Presse nur kumulativ zusammenfasst, ist unbelegt.</span>"
    ]}
  ]},
  {ver:"1.16.03",date:"04.08.2026",size:"Hotfix (All Platforms). Steam (PC), Steam (Mac), PlayStation, Xbox & Epic Games Store sofort; Mac App Store laut Notes zu einem späteren Zeitpunkt (in-progress). Release 04:50 UTC. Ein einziger Fix zu verschwindenden Schilden — dritter Patch innerhalb von drei Tagen, kein neuer Inhalt, keine Balance-Änderung",features:[
    {cat:"Fixes",items:[
      "<b>Shields</b> beim <b>Dual-Wielding</b>: Bestimmte Schilde verschwanden, nachdem auf <b>Dual-Wielded Weapons</b> (das beidhändige Führen zweier Waffen) gewechselt, gespeichert und der Spielstand anschließend neu geladen wurde — behoben. <span style='color:var(--gdim)'>Einordnung: Dies ist der einzige inhaltliche Punkt der offiziellen Notes; sie führen ihn ohne eigene Kategorie-Überschrift, die Einordnung unter Fixes ist sinngemäß. Ursache, betroffene Schilde und mögliche Nebenwirkungen werden offiziell nicht benannt.</span>"
    ]},
    {cat:"Known Issues (Stand 04.08.2026)",items:[
      "Die offizielle Known-Issues-Seite (boardNo 68, Last updated 04.08.2026 05:20 UTC) führt jetzt <b>9 Punkte</b>; nach dem in diesem Wiki dokumentierten Stand vom 02.08.2026 waren es 12. Unter den entfallenen Punkten ist der eigenständige <b>Ray-Regeneration</b>-Punkt — passend dazu behebt Hotfix 1.16.02 den Grafikfehler auf Radeon RX 9070 XT und höher. <span style='color:var(--gdim)'>Einordnung: Die Seite führt keine Änderungshistorie und begründet Streichungen nicht; der Zusammenhang ist naheliegend, aber nicht offiziell bestätigt. Welche zwei weiteren Punkte gestrichen wurden, lässt sich nicht belegen. Die 9 Punkte im Wortlaut:</span>",
      "Fische, die beim Angeln in bestimmten Gebieten gefangen werden, können sich nicht bewegen",
      "Fraktionsquests von <b>Greymane</b> lassen sich nicht fortsetzen, wenn man als <b>Damiane</b> oder <b>Oongka</b> spielt",
      "Steht die Option <b>Evasion Control</b> auf 'Hold', funktioniert weiterhin die Standard-Ausweichtaste, auch nachdem die Taste geändert wurde",
      "Für den Questfortschritt benötigte NPCs können nicht gemeinsam auf <b>Legendary Animal</b>-Reittieren mitreiten",
      "[Mac] Bei Tastatur und Maus weicht in bestimmten Auflösungen die Cursorposition vom tatsächlichen Platzierungspunkt für Einrichtungsgegenstände ab",
      "[Mac] Der Farbenblindheitsfilter wird bei aktiviertem <b>Colorblind Mode</b> nicht auf die UI angewendet",
      "[PlayStation] Der Bildschirm kann einfrieren, wenn bei der Namensvergabe für Haustier oder Pferd über die virtuelle Tastatur zu schnell getippt wird",
      "[NVIDIA GTX 1060] 'FSR Upscaling' zusammen mit 'Frame Generation' verursacht einen weißen Bildschirm",
      "[FSR4] In Regen-Umgebungen verschwindet der Regen, oder das Bild wird unscharf bzw. verzerrt"
    ]},
    {cat:"Quelle",items:[
      "Offizielle Pearl-Abyss-Patchnotes 1.16.03 (Notice-Board boardNo 114, Release 04.08.2026 04:50 UTC), Titel <b>Patch Notes Version 1.16.03 (All Platforms Hotfix)</b>. Primärquelle direkt abgerufen und wortgetreu gegengeprüft; am Ende verweisen die Notes auf die separate Notice <b>Crimson Desert Known Issues</b> (boardNo 68), deren 9 Punkte oben stehen.",
      "Konsolen-Build <b>1.000.426</b> — <b>nicht offiziell dokumentiert</b>; die Zuordnung steht ausdrücklich im MP1st-Artikeltitel, der Artikeltext war nicht abrufbar (HTTP 403). Eine Patch-Größe nennt keine geprüfte Quelle; DSOGaming, TwistedVoxel und GameRant haben keinen eigenen Artikel zu 1.16.03.",
      "<span style='color:var(--gdim)'>Warnung zu Suchmaschinen: KI-Zusammenfassungen mischen wiederholt die Fixes aus 1.16.02 (Ladebildschirm/Schwarzbild, Ray Regeneration, Mac MetalFX) in 1.16.03 hinein. Der direkte Abruf von boardNo 114 zeigt eindeutig nur den einen Shield-Fix.</span>"
    ]}
  ]},
  {ver:"1.16.02",date:"03.08.2026",size:"Hotfix (All Platforms). Steam (PC), PlayStation, Xbox & Epic Games Store sofort; Steam (Mac) und Mac App Store in Arbeit. Release 14:40 UTC. Vier reine Fehlerbehebungen — kein neuer Inhalt, keine Balance-Änderung",features:[
    {cat:"Fixes",items:[
      "Unter bestimmten Umständen blieb beim <b>Laden eines Spielstands</b> der Ladebildschirm hängen oder es erschien ein Schwarzbild — behoben.",
      "<b>AMD Radeon RX 9070 XT</b> und höher: Grafikfehler bei aktivierter <b>Ray Regeneration</b> behoben. <span style='color:var(--gdim)'>Einordnung: Ray Regeneration steht auch in der offiziellen Known-Issues-Liste zu 1.16.00 — dieser Hotfix deckt davon den AMD-Teil ab. Die Known-Issues-Seite führt seit dem Stand 04.08.2026 nur noch 9 Punkte und nennt Ray Regeneration nicht mehr — eine Begründung für die Streichung gibt sie nicht.</span>",
      "<b>Mac:</b> Absturz bei aktiviertem <b>MetalFX Denoising Upscaler</b> behoben.",
      "Im <b>Housing-Modus</b> waren unter bestimmten Umständen die <b>Innenraum-Funktionen</b> nicht verfügbar — behoben."
    ]},
    {cat:"Quelle",items:[
      "Offizielle Pearl-Abyss-Patchnotes 1.16.02 (Notice-Board boardNo 112, Release 03.08.2026 14:40 UTC). Konsolen-Build 1.000.425 — diese Nummer ist <b>nicht offiziell dokumentiert</b> und wurde nur bei MP1st gefunden; die offizielle Seite selbst nennt keine Build-Nummer."
    ]}
  ]},
  {ver:"1.16.01",date:"02.08.2026",size:"Hotfix (All Platforms). Steam (PC/Mac), PlayStation, Xbox & Epic Games Store sofort; Mac App Store in Arbeit. Release 01:00 UTC. Ein einziger Fix — der Lager-Bug, den der große Handels-Patch 1.16.00 einen Tag zuvor eingeschleppt hatte",features:[
    {cat:"Content",items:[
      "Nach dem Beladen von Handelswaren an einer <b>regionalen Wagenwerkstatt</b> zeigten die Lager-Oberflächen im Camp (Privatlager, Futtertrog, Sammelgut-Truhe) teilweise die Wagenladeraum-Oberfläche statt ihrer eigenen — behoben. <span style='color:var(--gdim)'>Der offizielle Text sagt ausdrücklich nur, dass die <em>Oberfläche</em> falsch erschien. Ob dabei auch Inhalte vertauscht wurden, steht nirgends; entsprechende Community-Deutungen sind unbelegt.</span>"
    ]},
    {cat:"Quelle",items:[
      "Offizielle Pearl-Abyss-Patchnotes 1.16.01 (Notice-Board boardNo 111, Release 02.08.2026 01:00 UTC). Konsolen-Build 1.000.424 — diese Nummer ist <b>nicht offiziell dokumentiert</b> und wurde in der geprüften Fachpresse nur bei MP1st gefunden. Der Formulierung 'regionale Wagenwerkstatt' liegt keine erklärte Absicht zugrunde; sie trennt sprachlich von Brices Werkstatt im Camp."
    ]}
  ]},
  {ver:"1.16.00",date:"01.08.2026",size:"Großes Handels-Update (All Platforms). Steam (PC/Mac), PlayStation, Xbox Series X|S & Epic Games Store sofort; Mac App Store in Arbeit. Release 03:30 UTC. Laut DSOGaming rund 5,7 GB und etwa 150 Änderungen. Der bislang größte Eingriff ins Handelssystem: 133 neue Handelsposten, vervierfachte Preise an Königlichen Handelsposten, 7 regionale Wagenwerkstätten und ein Anleihen-System bei der Bank",features:[
    {cat:"Neu · Handelsposten",items:[
      "<b>133 neue Handelsposten</b> hinzugefügt, darunter ausdrücklich der Händler am <b>Pailuner Handelsposten</b>",
      "Neue Handelsposten erscheinen <b>erst nach Fortschritt</b>: entweder wenn bestehende Händlergilden-Quests abgeschlossen sind oder die Bedrohung in der Umgebung beseitigt wurde. <span style='color:var(--gdim)'>Dieser Satz steht nur in der deutschen und der koreanischen Fassung der Patch-Notes — die englische Fassung bricht offiziell mitten im Satz ab ('quests related to'). Wer sich auf die EN-Notes stützt, findet die Bedingung nicht.</span>",
      "Art und Menge der an Handelsposten verkauften Waren insgesamt angepasst",
      "Posten, die <b>mit dem Wagen schwer zu erreichen</b> sind, bringen höhere Gewinne",
      "<b>Dynamische Preise:</b> Der Preis einer Handelsware sinkt, wenn an einem Ort zu viel davon verkauft wurde. Der alte Dauerlauf auf eine einzige Route lohnt damit nicht mehr unbegrenzt",
      "Der insgesamt durch Handel erzielbare Gewinn wurde erhöht",
      "<b>Wagen verschwinden nicht mehr</b> nach einer Lieferung an einen Königlichen Handelsposten (vorher war das Fahrzeug danach weg)",
      "Preise für Handelswaren an <b>Königlichen Handelsposten vervierfacht</b>. <span style='color:var(--gdim)'>Was das in absoluten Zahlen bedeutet, nennt keine Quelle — weder Pearl Abyss noch Fachpresse oder Guides führen Vorher-Nachher-Preise.</span>"
    ]},
    {cat:"Neu · Handelswaren",items:[
      "<b>28 neue Handelswaren</b>: 24 hochwertige und 4 allgemeine. <span style='color:var(--gdim)'>Die Namen sind offiziell nicht aufgelistet.</span>",
      "<b>Stapelgrenzen geändert:</b> verpackte Handelswaren stapeln je nach Preis bis 10 oder 100 (vorher einheitlich 50 bei allen 31 verpackten Waren), unverpackte bis 5 oder 50",
      "Handelswaren können jetzt auch <b>einzeln verkauft</b> werden — die alte Mindestmenge von 25 Stück pro Ware entfällt",
      "Auf Wagen und Pferd geladene Handelswaren lassen sich <b>untereinander verschieben</b>",
      "<b>Mehr Warenverlust</b> beim Zurückholen des Pferdes sowie beim Zerstören und Einsammeln des Wagens. <span style='color:var(--gdim)'>Ob das gezielt den von PowerPyx empfohlenen Pferderuf-Schnellreise-Trick treffen soll, sagen die Notes nicht — naheliegend, aber unbelegt.</span>"
    ]},
    {cat:"Neu · Wagenwerkstätten",items:[
      "<b>7 Wagenwerkstätten</b> in ganz Pywel als Zwischenstützpunkte: <b>Hernand, Demeniss, Delesyia, Pailune, Tommaso, Urd'avah, Varnia</b>",
      "In der Wagenwerkstatt lassen sich Handelswaren <b>verpacken und beladen</b> — Verpacken ist damit nicht mehr allein an Carl im Greymane Camp gebunden"
    ]},
    {cat:"Neu · Karte & Komfort",items:[
      "Beim Reiten auf einem Wagen zeigt die Minikarte die <b>befahrbaren Wege</b>",
      "<b>Neuer Handels-Tab auf der Karte</b> mit Handelsposten, Königlichen Handelsposten, Wagenwerkstätten und Wagenwegen",
      "Filterfunktion für Posten, die eine gewünschte Ware verkaufen; Detailansicht zeigt die gesamten Marktpreise",
      "Der <b>durchschnittliche Kaufpreis</b> einer Handelsware wird angezeigt — Grundlage, um Gewinn überhaupt zu berechnen",
      "Verpackte Waren lassen sich aus Pferde-, Wagen-, Laden- und Lagerbildschirm heraus in den Gegenstandsfilter der Karte übernehmen; beim Prüfen auf der Karte erscheint die vorhandene Menge auf Pferd und Wagen",
      "Händler mit Waren aus laufenden <b>Handels-Events</b> tragen im Handels-Tab eine eigene Markierung"
    ]},
    {cat:"Neu · Bank & Anleihen",items:[
      "Gewinn und Verlust aus Bankzinsen sind auf <b>maximal 40 Goldbarren</b> begrenzt. <span style='color:var(--gdim)'>Dass der Zins vorher unbegrenzt gewesen wäre, steht nur in Sekundärquellen und ist offiziell nicht bestätigt.</span>",
      "<b>Tresorraum der Anleihebank</b> hinzugefügt. Eine Investition startet, sobald <b>10 oder mehr Anleihen</b> eingezahlt sind. <span style='color:var(--gdim)'>Die koreanische Fassung nennt als Ort die Bank von Hernand, die englische und deutsche nennen keinen.</span>",
      "Umtausch Anleihe ↔ Goldbarren im Verhältnis <b>1 zu 10</b>. <span style='color:var(--gdim)'>Die Richtung ist unklar: der offizielle Satz ist grammatisch mehrdeutig, die koreanische Fassung liest sich eher als 'Anleihe gegen 10 Goldbarren eintauschbar', Sportskeeda liest es umgekehrt als Kauf. Bis zur Klärung im Spiel keine Kaufempfehlung daraus ableiten.</span>",
      "<b>Anleihen-Laden</b> hinzugefügt, in dem sich seltene Gegenstände mit Anleihen kaufen lassen. <span style='color:var(--gdim)'>Kursierende Preislisten (300–800 Goldbarren je Objekt) stammen aus nicht überprüfbaren Forenbeiträgen und stehen bewusst nicht hier.</span>"
    ]},
    {cat:"Content",items:[
      "Herausforderung 'Der lange Arm des Gesetzes' ließ sich nicht abschließen, wenn bereits alle Gesetzlosen abgeliefert waren — behoben",
      "Fortschritt von 'Schild des unveränderlichen Willens V' und 'Harmonische Hufe VIII' wurde nicht korrekt erfasst — behoben; 'Überwältigender Hieb II' ließ sich nicht abschließen — behoben",
      "<b>421 questbezogene Wissenseinträge</b>, die bisher nicht in der Wissensliste erschienen, werden dort jetzt angezeigt",
      "Beim Besiegen von <b>Karanda</b> lässt sich jetzt das Wissen über Harpyien erlangen; bei den <b>Tobenden Stürmen</b> ist das Wissen jetzt garantiert. <span style='color:var(--gdim)'>Ob ein Boss-Rematch die Nachvergabe für bereits besiegte Bosse auslöst, ist offen — keine Quelle bestätigt das.</span>",
      "<b>Eichhörnchen und ähnliche Tiere lassen sich jetzt häuten</b> (vorher gar nicht möglich, sie waren daher keine Thin-Hide-Quelle)",
      "Quest 'Schatten über dem Fluss' (Kapitel 2) muss jetzt abgeschlossen sein, um mit 'Wo das Elend herrscht' fortzufahren",
      "Graf Byron ließ sich in 'Meuchle Graf Byron' nicht töten, wodurch die Quest hängen blieb — behoben",
      "Item umbenannt: 'Bannerlanze der Vellua-Piraten' → <b>'Bannerlanze des Tanzenden Welses'</b>",
      "<b>Pilze</b> wurden von Kochzutat zu <b>Alchemiezutat</b> umkategorisiert",
      "Beitragspunkte konnten 100 überschreiten — behoben; Bomben stapeln jetzt in 10er-Einheiten und sind im Schnellzugriff registrierbar",
      "Interaktionsanimationen mit Tieren ergänzt und verbessert (Schnabeltier, Waldwiesel, Gürteltier, Stachelschwein, Igel)",
      "Weitere Behebungen u. a. am Sanktum der Transzendenz, an Marnis Labor, an der Tür der Spitze der Sterne, am Abyss 'Megalithkrone' und an der Quest 'Gesetzloser Markt' (läuft jetzt weiter, wenn ein Einspänner gestohlen wird)"
    ]},
    {cat:"Combat/Action",items:[
      "Wyvern können nicht mehr gleichzeitig angreifen und ausweichen",
      "'Präzisionsschuss' mit der Schrotflinte verbrauchte ungewöhnlich viele Kugeln — behoben; 'Präzisionsschuss' ist jetzt auch im Laufen mit Fernkampfwaffe einsetzbar",
      "Verkettungsfähigkeiten nach 'Stechen' mit Schwert, Zweihandschwert oder Dolch gehen leichter von der Hand",
      "Angriffsmuster von 'Antumbras Schwert' brach trotz erfolgreichem Blitz-Konter nicht ab — behoben",
      "Zahlreiche Damiane- und Oongka-Korrekturen (Schild-Fähigkeiten, Himmelsschritt, Auge des Taifuns, Gleiten nach Abbruch, Fokus: Abwehr)",
      "Bomben aus dem Alchemie-Bombenrucksack der Blut-Banditen treffen keine Verbündeten mehr"
    ]},
    {cat:"Steuerung",items:[
      "Spezialausrüstung im Schnellzugriff war nach dem ersten Laden nicht sofort nutzbar — behoben",
      "Essen von Gerichten auf Reittieren war im Schwierigkeitsgrad 'Schwer' unmöglich — behoben",
      "Mit einer Keule ließ sich nicht aufsteigen — behoben; unabsichtliches wiederholtes Stoppen beim Rennen korrigiert"
    ]},
    {cat:"Graphics",items:[
      "[PC] <b>AMD FSR SDK 2.3.0</b> implementiert; FSR Upscaling 4.1 wird jetzt auch auf <b>Radeon RX 7000 (RDNA 3)</b> unterstützt; Ray Regeneration auf 1.2.0 aktualisiert",
      "Flackern an Fensterrahmen und Rändern behoben; entfernte Objekte waren in bestimmten Bereichen unsichtbar — behoben",
      "<span style='color:var(--gdim)'>Gegenläufige Meldung: gamegpu berichtet, der Patch habe die Bildqualität auf Radeon RX 7000 verschlechtert (Ray Regeneration ohne Wirkung, FSR 4.1 unscharf, fehlende Regentropfen). Pearl Abyss führt Ray-Regeneration- und FSR-4.1-Fehler selbst als bekannte Probleme.</span>"
    ]},
    {cat:"Localization",items:[
      "Lokalisierungsfehler in allen Sprachen behoben und die allgemeine Qualität verbessert"
    ]},
    {cat:"Others",items:[
      "Abstürze behoben beim Verbessern von Gesundheits-/Ausdauer-/Geist-Fähigkeiten, im Kartenmenü, beim Charakterwechsel mit folgendem Begleiter und im Kampf gegen den 'Vergessenen General'",
      "Nazk-Schwert wurde im Laden zu niedrig verkauft — behoben",
      "[Oongka/Damiane] Der Silber-Erhöhungseffekt von Abyss-Ausrüstung griff bei Gegenständen wie dem Kupferbeutel nicht — behoben",
      "Diverse Darstellungsfehler an Waffen, Outfits, Färbungen und Kameraführung korrigiert"
    ]},
    {cat:"Known Issues (Stand 02.08.2026)",items:[
      "Die offizielle Known-Issues-Seite führt 12 Punkte, darunter Fehler an Ray Regeneration und FSR 4.1. <b>Nicht mehr enthalten</b> ist der Camp-Lager-/Wagenladeraum-Fehler — passend dazu behebt ihn Hotfix 1.16.01",
      "<span style='color:var(--gdim)'>Weiterhin offen und <b>nicht</b> durch 1.16.00 verursacht: der seit April 2026 gemeldete Timer-Fehler beim Bank-Investment (Status bleibt auf 'REFRESHING' stehen). Er besteht auch nach dem Patch fort.</span>"
    ]},
    {cat:"Quelle",items:[
      "Offizielle Pearl-Abyss-Patchnotes 1.16.00 (Notice-Board boardNo 110, Release 01.08.2026 03:30 UTC), hier nach der <b>deutschen Fassung</b> ausgewertet, weil die englische bei den Handelsposten mitten im Satz abbricht; strittige Stellen zusätzlich gegen die koreanische Fassung geprüft. Größe und Änderungszahl von DSOGaming. Konsolen-Build 1.000.423 ist <b>nicht offiziell dokumentiert</b> und stammt aus der Fachpresse (MP1st); die dort genannte Datierung auf den 31.07. ist ein Zeitzonen-Artefakt der US-Redaktion. Sekundärquellen: PC Gamer, GamesRadar, allthings.how, gamegpu, Steam-Guides. 298 Einzelfakten erhoben, 82 davon gegengeprüft; unbelegte Community-Zahlen (Anleihen-Laden-Preise, Wagen-Statwerte, neue Truhen-Fundorte) wurden bewusst nicht übernommen."
    ]}
  ]},
  {ver:"1.15.00",date:"24.07.2026",size:"Bugfix-Patch (All Platforms). Steam (PC/Mac), PlayStation, Xbox Series X|S & Epic Games Store sofort; Mac App Store in Arbeit. Release 02:40 UTC (Fach-/Guide-Presse datiert ihn nach lokaler Zeit auf den 23.07.2026). Konsolen-Build 1.000.407. Kein neuer Content außer der Verlegung des 'Mace of Ambition' — sonst reine Fehlerbehebungen",features:[
    {cat:"Content",items:[
      "'Mace of Ambition' verlegt und dadurch regulär erreichbar: Die Einhandwaffe (eingebauter Feuerangriff, vergleichbar Electro-Mecha Spear/Longsword, aber ohne Abyss-Gear-Slot-Kosten; ursprünglich von Inquisitor Bastier geführt) lag bisher in einem unzugänglichen Raum nahe der Spitze der Spire of Clockwork in Demeniss und war nur durch Clipping in die Geometrie erreichbar. Sie befindet sich jetzt einige Stockwerke tiefer im Raum mit der Drehtür (spinning door)",
      "Bosse erschienen im Kampf teilweise transparent — behoben",
      "Feldfrüchte wuchsen bzw. ließen sich in bestimmten Situationen nicht mehr ernten — behoben",
      "Der Sperrstatus (Lock) ausgerüsteter Ausrüstung wurde für Oongka/Damiane nicht gespeichert — behoben",
      "In der Quest 'Scattered Honey Jars' ließ sich der als Questziel gerittene Bär nicht angreifen — Angriff während des Reitens jetzt möglich",
      "Ein großer Fisch verschwand beim Einsammeln aus Fischfallen — behoben"
    ]},
    {cat:"Combat/Action",items:[
      "Wyvern-Beschwörung ließ sich nicht aus der Luft auslösen — behoben (Beschwörung im Flug/Sprung jetzt möglich)",
      "Distanz des 'Aerial Roll' nach Einsatz von 'Aerial Maneuver' normalisiert"
    ]},
    {cat:"Controls",items:[
      "Das Fadenkreuz für 'Axiom Force' wurde auch dann angezeigt, wenn das Ziel außerhalb der Aktivierungsreichweite lag — behoben",
      "Fehlerhaftes Kamera-Zoom-Verhalten beim Schwimmen an bestimmten Orten korrigiert"
    ]},
    {cat:"Graphics",items:[
      "HDR-bezogene Farb- und Transparenz-Anomalien in der UI behoben"
    ]},
    {cat:"Localization",items:[
      "Diverse Lokalisierungsfehler in allen Sprachen korrigiert und die Lokalisierungsqualität verbessert"
    ]},
    {cat:"Others",items:[
      "Absturz beim Laden von Cross-Save-Daten verhindert (Nachbesserung zum 1.14.00-Cross-Save)",
      "Unnatürlich wirkende Reithaltung des Charakters auf einem Mount korrigiert",
      "Stabilität der Fluchtfunktion mit einem gestohlenen Wagen verbessert (Wagen verschwand)",
      "Kliff versank bei 'Blinding Flash Finisher' an Hängen im Boden — behoben"
    ]},
    {cat:"Known Issues (Stand 24.07.2026)",items:[
      "Diverse Vorgänger-Probleme bleiben offen (u. a. plattformspezifische Cross-Save-Fehler auf PlayStation, Bewegungseinschränkungen beim Fischen sowie einzelne UI-Glitches); die offizielle Known-Issues-Seite wird separat gepflegt"
    ]},
    {cat:"Quelle",items:[
      "Offizielle Pearl-Abyss-Patchnotes 1.15.00 (Notice-Board boardNo 109, Release 24.07.2026 02:40 UTC), Konsolen-Build 1.000.407. Verifiziert gegen VULKK, TwistedVoxel, GameRant und MP1st. Reiner Bugfix-Patch ohne neue Quests, Gebiete oder Balance-Änderungen; einziger content-relevanter Punkt ist die Verlegung des 'Mace of Ambition'."
    ]}
  ]},
  {ver:"1.14.00",date:"16.07.2026",size:"Cross-Save-Update (All Platforms). Steam (PC/Mac), PlayStation, Xbox Series X|S & Epic Games Store sofort; Mac App Store folgt später (in Arbeit). Release 09:00 UTC",features:[
    {cat:"Neues Feature",items:[
      "Cross-Save (Cross-Progression) eingeführt: Speicherstände lassen sich jetzt plattformübergreifend über die Pearl-Abyss-ID verknüpfen — unterstützt werden PS5, Xbox Series X|S, Steam und Epic Games Store",
      "Pro Pearl-Abyss-ID existiert genau ein gemeinsamer Cross-Save-Slot, den sich alle verknüpften Accounts teilen",
      "Kein automatischer Sync: der Fortschritt muss vor jedem Plattformwechsel manuell in den Cross-Save-Slot hochgeladen werden, es gilt jeweils der zuletzt hochgeladene Stand",
      "Aktivierung: Save-Game-Menü → 'Cross-Save Settings' → per Link oder QR-Code zur Cross-Save-Seite → Accounts mit der Pearl-Abyss-ID verknüpfen → im Spiel 'Refresh' auswählen → der Cross-Save-Slot erscheint anschließend unten rechts im Save-Game-Menü",
      "Kein Cross-Buy: das Spiel muss auf jeder gewünschten Plattform separat gekauft sein",
      "Bezahlte Deluxe- und Vorbesteller-Kosmetik bleibt plattformgebunden — auf Plattformen ohne eigenen Kauf erscheint sie deaktiviert und muss dort ggf. separat nachgekauft werden",
      "Mac App Store folgt laut Pearl Abyss zu einem späteren Zeitpunkt in einem zukünftigen Update; die Steam-Version für Mac hat Cross-Save dagegen bereits erhalten",
      "Mit mittlerer Belegsicherheit: maximal ein Account pro Plattform verknüpfbar; werden alle verknüpften Accounts wieder entkoppelt, gehen die Cross-Save-Daten unwiderruflich verloren; regionale Einschränkungen können gelten, falls die Pearl-Abyss-ID in einer bestimmten Region nicht zugelassen ist"
    ]},
    {cat:"Content",items:[
      "Quest 'A Dwarf's Concern' ließ sich nicht abschließen — behoben",
      "Charaktersteuerung blockierte, wenn ein Haustier während einer Interaktion aufs Bett sprang — als behoben gemeldet; auf der separat gepflegten offiziellen Known-Issues-Seite steht der Bug jedoch am selben Tag weiterhin als offenes Problem samt Workaround (Pet entsummonen), unklar ob nur ein Teilfall behoben wurde"
    ]},
    {cat:"Combat/Action",items:[
      "Damianes 'Skystep' nutzt jetzt denselben Steuerungs-Input wie Oongkas 'Vertical Flight' (reine Eingabe-Vereinheitlichung, kein Balance-Change)",
      "'Aerial Force Palm' wurde fälschlicherweise im freien Fall unterbrochen — behoben"
    ]},
    {cat:"Localization",items:[
      "Diverse Lokalisierungsfehler in allen Sprachen korrigiert und die Lokalisierungsqualität verbessert"
    ]},
    {cat:"Others",items:[
      "Unnatürlich wirkende Bewegungsanimation eines Charakters auf einem schnell reitenden Mount behoben",
      "Fehlende Soundeffekte nach dem Kampf gegen Praevus the Ancient behoben",
      "Soundeffekte von 'Ator's Orb' liefen weiter, obwohl der Orb bereits verschwunden war — behoben",
      "NPCs konnten offene Holztore nicht passieren — behoben"
    ]},
    {cat:"Known Issues (Stand 16.07.2026)",items:[
      "[AMD] Absturz bei Treiberversion 26.6.2 oder höher (inkl. Hotfix 26.6.3) — Workaround: Treiber 26.6.1 oder älter bzw. 26.6.4 oder neuer",
      "[NVIDIA GTX 1060] 'FSR Upscaling' zusammen mit 'Frame Generation' verursacht einen weißen Bildschirm",
      "[FSR4] In Regen-Umgebungen verschwindet der Regen, oder das Bild wird unscharf bzw. verzerrt",
      "[PlayStation] Bildschirm friert bei zu schneller Eingabe über die virtuelle Tastatur ein — Workaround: langsam mit Pausen tippen",
      "Greymane-Fraktionsquests lassen sich nicht fortsetzen, wenn man als Damiane oder Oongka spielt",
      "Stirbt Damiane unmittelbar nach 'Shield Toss', kann sie Schild und zugehörige Skills nicht mehr nutzen — Workaround: Speicherstand neu laden"
    ]},
    {cat:"Quelle",items:[
      "Offizielle Pearl-Abyss-Patchnotes 1.14.00 (Notice-Board boardNo 108, Release 16.07.2026 09:00 UTC) sowie der separate Cross-Save-Guide (boardNo 107, 16.07.2026 10:10 UTC) und die aktualisierte Known-Issues-Seite (boardNo 68, 16.07.2026 10:30 UTC). Verifiziert gegen VULKK, GamesRadar+, RPG Site, Noisy Pixel und DSOGaming. Die Patch-Notes umfassen 10 dokumentierte Punkte: 1 neues Feature (Cross-Save) plus 9 Fixes (Content 2, Combat/Action 2, Localization 1, Others 4) — keine Balance-Änderungen, keine neuen Items, Quests oder Gebiete."
    ]}
  ]},
  {ver:"1.13.00",date:"03.07.2026",size:"Major Update. Steam (PC/Mac), PlayStation, Xbox, Epic Games Store & Mac App Store (Epic-Nutzer müssen sich laut Notes ggf. neu einloggen). Konsolen-Build 1.000.379 (laut mp1st)",features:[
    {cat:"Neuer Content",items:[
      "Abyss-Endgame jetzt auch für Oongka und Damiane geöffnet",
      "Memory-Fragment-Fundorte von vier Rematch-Bossen wurden im Zuge der Abyss-Öffnung verlegt: Corrupted Caliburn, Goyen, Draven the Crowcaller und Clockwork White Horn",
      "39 neue Ausrüstungsteile für Kliff/Oongka: 20 Boss-Ausrüstungsteile aus 5 Sets (Tarandus the Ashen 5, Unyielding Hero 5, Knight of Carnage 5, Martial Monk 3, Grand General of Demeniss 2), dazu 16 weitere Rüstungsteile und 3 Kopfbedeckungen",
      "Oongka kann jetzt die meisten Kliff-Outfits tragen",
      "6 zusätzliche Kuku-Ausrüstungsteile für Kliff/Oongka (separat von den 39): Kuku Lightning-Resistant Armor, Kuku Flame-Resistant Armor, Kuku Ice-Resistant Armor, Kuku Breeze-Step Boots, Kuku Rishi's Boots, Kuku Marni Laser Helm",
      "8 neue Ausrüstungsteile für Damiane laut Notes-Zahl; separat nennen die Notes zusätzlich, dass Damiane jetzt Boss-Ausrüstung tragen kann: 5 Teile Odeck's Protector/Guardian of Odeck, 3 Teile Dark Marksman, 1 Teil Masked Liberator (Summe 9 — andere Zählung als die genannten 8 Teile)",
      "Neues Item 'Hunter's Sigil': lässt ein Vogel-Pet Beute und Sammelobjekte passend zu seiner Spezialisierung apportieren",
      "Neue Crafting-Rezepte: 4 Teppich-Typen sowie die Plattenpanzer Lightning Bolt, Scorchflame und Frostcursed",
      "Neue Spezialangriffe für Gegner hinzugefügt: Flame Knight, Wyvernflames, Savage Fang, Goldenscale Bandits",
      "Alchemy Explosive Pack der Bleed Bandits verliert jetzt bei jeder Bombenbeschwörung Haltbarkeit"
    ]},
    {cat:"Charaktere & Skills",items:[
      "Iron Eagle und Phoenix können jetzt das 'Sigil of Valor' ausrüsten (Historie siehe ältere Einträge: Freischaltung war in der revidierten 1.11.00-Notice vom 12.06. gestrichen worden, 1.10.01 hatte nur die Item-Beschreibung korrigiert)",
      "Damiane 'Smiting Strike': Speer-Proficiency (Waffenmeisterschaft) freigeschaltet",
      "Damiane 'Lightning Strike': Bewegungsablauf verbessert",
      "Damiane: Timing des element-imbued 'Smiting Strike' mit 'Groundsurge Abyss Gear' korrigiert",
      "Damiane 'Flame Rush': Besen-Wechsel-Geschwindigkeit normalisiert (Fehler behoben)",
      "Oongka: Aerial Grapple mit dem Kuku Rocket Pack nutzbar, Zielerfassung im Flug korrigiert, Greathammer-Finisher-Treffgenauigkeit verbessert, durch Gegner blockiertes Charging behoben, Puzzles jetzt mit 'Scatter Shot' lösbar",
      "Oongka: Beschreibungen bestimmter Greathammer-Skills korrigiert, sodass sie dem tatsächlichen Verhalten entsprechen (offizielle Notes nennen die betroffenen Skills nicht)",
      "Oongka: Beschreibung des Skills 'Restrain' an die ausgerüstete Waffe angepasst",
      "Musketen und Pistolen können jetzt während des Slidings (Rutschens) genutzt werden",
      "Counter Stance: konnte fälschlich mit ausgerüsteter Flagge genutzt werden — behoben (mit Flagge jetzt nicht mehr nutzbar)",
      "Axiom Force: Soft-Lock-On-Nutzung verbessert; Steuerungs-Blockade beim Beschwören von Blackstar während Axiom Force behoben (außer Bewegung/Sprung war keine Eingabe möglich)"
    ]},
    {cat:"Quality of Life",items:[
      "Beschworene Pets ruhen jetzt gemeinsam mit dem Charakter, wenn dieser sich in ein Bett legt",
      "Verkleidungs-Outfits sind jetzt färbbar",
      "Die meisten Waffen und Sekundärwaffen sind jetzt färbbar",
      "Glühwürmchen-Sammeln liefert jetzt bis zu 3 Glühwürmchen pro Vorkommen",
      "'Gate to Advancement' ist jetzt auch ohne ausgerüstetes Visione nutzbar"
    ]},
    {cat:"Steuerung & UI",items:[
      "Neue Option 'Hide Minimap and Status' (Einstellungen > Others > Gameplay): blendet Minimap und Status-HUD aus",
      "Inventar schließt sich jetzt automatisch nach dem Benutzen eines Elixiers",
      "Charakterwechsel-UI für Oongka/Damiane verbessert",
      "Färbe-UI (Dye) filtert nicht-färbbare Items aus",
      "Minimap zeigt jetzt nur noch die aktuell verfolgte Quest an",
      "Wyvern-Ei-Bergungshinweise wiederhergestellt; Trust-Benachrichtigungen werden korrekt angezeigt",
      "Anzeige der Liberation-Gauge-Prozente korrigiert; Charaktersteuerung während Ladevorgängen unterbunden"
    ]},
    {cat:"Grafik & Performance",items:[
      "PS5: gelegentliches Ruckeln in bestimmten Cutscenes behoben",
      "Allgemeine Ladezeiten optimiert",
      "Absturz beim Öffnen der Karte behoben",
      "Absturz bei einem Boss-Rematch behoben",
      "Fehlermeldung bei fehlgeschlagenen Engine-Optionen ergänzt"
    ]},
    {cat:"Bugfixes",items:[
      "Die offizielle Bugfix-Liste umfasst über 60 Einzelkorrekturen; hier eine Auswahl der wichtigsten",
      "Ruderboot versank in bestimmten Situationen — behoben",
      "Wagen verschwand in der Quest 'A Sack of Pepper' — behoben",
      "Moren verschwand beim Kampf-Tracking — behoben",
      "Kriminalitäts-Bußgelder werden jetzt auch während der Wiedergabe von Memory Fragments durchgesetzt",
      "Möbel-Rückkauf-Menü korrigiert",
      "Duane-Reittier-Reise in der Quest 'Skilled in Archery' wiederhergestellt",
      "Anomalie beim Anstieg der Contribution behoben",
      "Jump-Attack-Freeze behoben; Slide-Angriffe mit bestimmter Ausrüstung wiederhergestellt",
      "Wyvern-Flug-Animationen verbessert; Wyvern bleibt bei seinem Tod nicht mehr stecken",
      "Monster-Spawns in den Sovereign Wastes wiederhergestellt",
      "Knowledge-Eintrag 'Injured Ludvig' in 'One-Armed Ludvig' umbenannt",
      "Meadow Bunting: In-Game-Beschreibungstext aktualisiert (Wortlaut in den Notes nicht spezifiziert)",
      "Knowledge-Beschreibungen für Salmon und Burbot überarbeitet",
      "Zahlreiche Clipping-, Silhouetten-, Beschreibungs- und Lokalisierungsfehler in allen Sprachen behoben"
    ]},
    {cat:"Quelle",items:[
      "Offizielle Pearl-Abyss-Patchnotes 1.13.00 (Notice-Board boardNo 105, Release 03.07.2026 03:00 UTC). Verifiziert gegen VULKK, GamesRadar, GameWatcher und MP1st. Konsolen-Build 1.000.379 laut mp1st (Drittquelle, nicht in den offiziellen Notes). Teile-Zählung: 39 (Kliff/Oongka) + 8 (Damiane), die 6 Kuku-Teile separat; die von manchen Quellen genannte '47' ist schlicht 39+8. Die genauen neuen Memory-Fragment-Fundorte der vier Rematch-Bosse nennen die offiziellen Notes nicht."
    ]}
  ]},
  {ver:"1.13.01",date:"08.07.2026",size:"Hotfix (All Platforms) — Steam (PC/Mac), PlayStation, Xbox, Epic Games Store & Mac App Store. Nachschärfung von 1.13.00; keine Build-Nummer in den Notes",features:[
    {cat:"Bugfixes",items:[
      "Behoben: gelegentlicher Absturz beim Reiten eines Bären",
      "Behoben: Charaktere wurden auf Konsolen und AMD-basierten Systemen teils fehlerhaft dargestellt (Rendering)",
      "Behoben: Oongka folgte Kliff in bestimmten Hauptquest-Cutscenes nicht",
      "Behoben: Belohnungen für den Abschluss bestimmter Challenges wurden nicht vergeben",
      "Behoben: die Hoenmark Ruins konnten nicht befreit werden",
      "Behoben: der Futterstand-Vorrat verringerte sich nicht, obwohl Nutztiere der Ranch in der Nähe fraßen"
    ]},
    {cat:"Grafik & Performance",items:[
      "Verbessert: Framerate-Einbrüche in bestimmten Umgebungen"
    ]},
    {cat:"Quelle",items:[
      "Offizielle Pearl-Abyss-Patchnotes 1.13.01 'Version 1.13.01 (All Platforms Hotfix)' (Notice-Board boardNo 106, Release 08.07.2026 05:51 UTC). Die Notes betreffen ausschließlich Bären-Reiten, Rendering, NPC-/Quest-Bugs (Oongka-Follow, Hoenmark-Ruins, Challenge-Belohnungen, Ranch-Futterstand) und Performance — KEIN Bosskampf-Fix (ein kursierendes X-Gerücht dazu ist von den offiziellen Notes nicht gedeckt)."
    ]}
  ]},
  {ver:"1.12.02",date:"24.06.2026",size:"Hotfix (All Platforms); Steam (PC/Mac), PlayStation & Xbox sofort, Epic Games Store & Mac App Store folgen später",features:[
    {cat:"Bugfixes",items:[
      "Behoben: Absturz bei 1080p (FHD) mit Grafikkarten der AMD Radeon RX 5000 Series",
      "Behoben: Absturz bei Nutzung des Photo Mode nach dem Deaktivieren von HDR",
      "Behoben: bestimmte Meeresbereiche waren fälschlich als 'No Fishing Zones' (Angelverbotszonen) klassifiziert"
    ]},
    {cat:"Quelle",items:[
      "Offizielles Pearl-Abyss Notice-Board boardNo 102 (Patch Notes 1.12.02, All Platforms Hotfix, 24.06.2026 01:15 UTC). Konsolen-Build 1.000.358 laut Drittquelle mp1st."
    ]}
  ]},
  {ver:"1.12.01",date:"20.06.2026",size:"Hotfix (All Platforms); Steam (PC/Mac), PlayStation & Xbox sofort, Epic Games Store & Mac App Store folgen später",features:[
    {cat:"Bugfixes",items:[
      "Behoben: im Freien platzierte Hausgegenstände verschwanden in bestimmten Situationen",
      "Behoben: Klettern auf bewegte Objekte war in bestimmten Situationen nicht möglich",
      "Behoben: unnatürliche Lichtdarstellung auf Glasmaterialien",
      "Behoben: schwebendes Terrain auf dem Weg zum Sanctum of Faith neu positioniert",
      "Behoben: Pet 'Skunky' verschwand nach dem Absetzen im Camp"
    ]},
    {cat:"Quelle",items:[
      "Offizielles Pearl-Abyss Notice-Board boardNo 101 (Patch Notes 1.12.01, All Platforms Hotfix, 20.06.2026 02:00 UTC). Konsolen-Build 1.000.354 laut Drittquelle mp1st (nicht in den offiziellen Notes)."
    ]}
  ]},
  {ver:"1.12.00",date:"19.06.2026",size:"Steam (PC/Mac), PlayStation & Xbox; Epic Games Store & Mac App Store folgen später",features:[
    {cat:"Neuer Content",items:[
      "Neues Feature: Der Außenbereich rund um das eigene Haus kann jetzt dekoriert werden ('Decorate the area outside your house')",
      "Zwei neue Crafting-Werkbänke hinzugefügt: Workstation (Greymane Camp, Timberham Sawmill) und Loom (Hernand Tailor's Shop); an ihnen werden die neuen Hausgegenstände gefertigt",
      "Werkbank-Funktion laut Community-Guides (steht NICHT in den offiziellen Notes): Workstation für Holzmöbel, Loom für Stoffwaren wie Banner und Teppiche",
      "58 neue Hausgegenstände hinzugefügt. Aufschlüsselung: Facilities (4 Tools, 10 Sotdaes, 7 Fountains, 6 Wells), Lights (8 Braziers, 6 Streetlights), Decorations/Pet Furniture (4 Carpets, 6 Hanging Planters, 4 Automata Toys, 1 Music Box, 2 Pet Furniture)",
      "Gegenstände und ihre Crafting-Anleitungen erhältlich über Shops, Claw Machines (Greifautomaten), die Flower-Basket-Crafting-Mission, die Box of Fortune und die Orb-Roll-Challenge",
      "'Box of Fortune' zum Mysterious Shop hinzugefügt: 100 Silver, maximal 3 Stück pro Restock",
      "51 neue Wissens-Einträge (Knowledge) der Kategorie 'Collectibles - Contract' hinzugefügt",
      "Zuvor nicht erhältliche Knowledge-Einträge wieder verfügbar: Exploding Bismuth Spider, Jarback Crab, Skull Knight Followers, Jared, Darksworn Armor Spectral Soldier, Giant Rock Tusk Warthog"
    ]},
    {cat:"Charaktere & Skills",items:[
      "Damiane und Oongka können jetzt Visiones ausrüsten und Erinnerungen lesen (read memories)",
      "Damiane und Oongka können jetzt Blackstar als Reittier nutzen",
      "Alle Charaktere: Kettenangriffe (chain attacks) während des Slidings (Rutschens) für jeden Waffentyp hinzugefügt",
      "Neue Kliff-Kopfausrüstung: Silent Conqueror Plate Helm, Sentinel of Tenacity Helm, Feral Sentinel Helm, Sentinel of Trust Helm, Steelmaw Plate Helm",
      "Neues Kliff-Rüstungsset: Greymane Light Armor",
      "Neue Damiane-Handschuhe: Honorary Greymane Cloth Gloves",
      "Neues Accessoire für alle Charaktere: Greymane Signet",
      "'Aerial Force Palm' kann jetzt in Safe Zones genutzt werden",
      "'Nature's Snare' kann jetzt im Flug platziert werden und wird auch von Oongka/Damiane erlernt",
      "Spear-'Quick Swap'-Skill verbessert",
      "Damiane: eigene Sitz-Animation hinzugefügt; Reichweite des unbewaffneten 'Whirl Kick' angepasst",
      "Queen Bismuth Oreback Crab: neues Angriffsmuster hinzugefügt"
    ]},
    {cat:"Quality of Life",items:[
      "Beim Wiederholen eines Bosskampfes bleiben die Einstellungen des vorherigen Versuchs erhalten (Knowledge, Waffen, Element, Quick-Slot-/Instant-Items)",
      "Rematches sind jetzt auch an im Wiederaufbau befindlichen Strongholds verfügbar",
      "Logging verbessert: Fine Timber droppt jetzt bei aktivem 'Logging Quality Up Lv 2'",
      "Kuku Cooler und Enhanced Kuku Cooler können jetzt verkauft werden",
      "Foul-Bedingungen bestimmter Skills in All-Out Duels angepasst",
      "'Pets - Tailor's Shop' in 'Pet Shop' umbenannt"
    ]},
    {cat:"Steuerung & UI",items:[
      "Während ein Interaktions-Prompt beim Zielen angezeigt wird, werden andere Eingaben jetzt blockiert",
      "Steuerungs-Customizing: Fehler behoben, bei dem die Interaktionsfunktion fälschlich ausgelöst wurde, wenn eine deaktivierte Taste und die Interaktionstaste auf denselben Input gelegt waren",
      "Tastenhinweis (Key Guide) für 'Explosive Evasive Shot' hinzugefügt",
      "Collectibles Chest: besessene und nicht besessene Items werden jetzt per Slot-Schattierung unterschieden",
      "Settings-Menü: direktes Springen zum Anfang/Ende des Menüs möglich",
      "Beim ersten Spielstart wird jetzt ein Prompt zum Einstellen der Mindest-Schriftgröße angezeigt"
    ]},
    {cat:"Grafik & Performance",items:[
      "Charakter-Ladebildschirm wird jetzt auch beim Laden als Oongka oder Damiane angezeigt; Ladevorgang optimiert (leicht verkürzte Ladezeit)",
      "Wyvern-Sturzflug-Animation (dive) verbessert",
      "Performance-Einbruch beim Reiten bestimmter Mounts behoben",
      "Frame-Drops beim Drehen der Kamera an bestimmten Orten behoben",
      "Übermäßige visuelle Effekte bei bestimmten Möbeln reduziert"
    ]},
    {cat:"Bugfixes",items:[
      "Eier verschwinden nicht mehr beim Schlüpfen, wenn die maximale Pet-Kapazität erreicht ist",
      "Duplikation von Kuku Bird's Egg / Wyvern Egg in den Recoverable Items beim Ausbrüten behoben",
      "Investment-Strategie ändert sich nicht mehr nach Speichern/Laden",
      "Mounts können Verbündete nicht mehr angreifen, während der Spieler eine Maske trägt",
      "Absturz beim Waffenwechsel unmittelbar nach 'Nature's Echo' behoben",
      "Erstellung von Sockets für bestimmte Ausrüstung korrigiert",
      "Erinnerungen (Memories) sind nicht mehr auf sich bewegenden Objekten lesbar; Memory-Lese-Orte natürlicher platziert",
      "Waffen werden in der Nähe der Smithy nicht mehr automatisch weggesteckt bzw. lassen sich wieder ziehen",
      "Kamerawinkel verschiebt sich nicht mehr beim Betreten des Housing-Modus",
      "Items können nicht mehr außerhalb des Housing-Bereichs platziert werden",
      "Mac: Platzierung von Hausgegenständen per Tastatur/Maus korrigiert; Möbel werden nicht mehr in nicht-platzierbarem Zustand entnommen",
      "Fusion Reactor Core des Sanctum of Penitence respawnt nach Abschluss nicht mehr",
      "Wissens-Erwerb nach Besiegen der Hexe Earthen Exploding Spider korrigiert",
      "Pets werden während bestimmter Quests/Minispiele nicht mehr entbeschworen",
      "Blackstar und Wyverns landen jetzt wieder am Boden",
      "Automatischer Erwerb von Timber korrigiert",
      "Absturz beim Öffnen des Färbe-/Dye-Menüs mit bestimmter Ausrüstung behoben; Vorschau-Item-Größe im Dyehouse korrigiert",
      "Quest 'Repair the water tower': Reparatur des Wasserturms bleibt nach Speichern/Laden erhalten",
      "Transit Station verschwindet nicht mehr, wenn der Ironcrawler hindurchfährt",
      "'The Singing Catfish' sinkt beim Angreifen nicht mehr gelegentlich unter Wasser",
      "Verbrechens-Soundeffekte werden jetzt auch ohne anwesende Zeugen korrekt abgespielt",
      "NPC-Folgeverhalten während erforderlicher Quests wiederhergestellt; Werkzeug-Entnahme während NPC-Gesprächen deaktiviert",
      "Wagon-Crafting-Mission kann nicht mehr mehrfach ausgeführt werden",
      "Sehr große Fische (u.a. Striped Marlin) werden nicht mehr in Fischreusen (Fish Traps) gefangen",
      "'Lightning Kick' kann nicht mehr in Safe Zones genutzt werden",
      "Ausgerüstetes Werkzeug wechselt nicht mehr beim Benutzen mit einer anderen Waffe",
      "Shotgun-Feuersteuerung beim Fahren auf einem Wagon wiederhergestellt",
      "Shield Toss: Schild kehrt bei Nutzung von 'Smiting Bolt' wieder korrekt zurück",
      "Wagen können sich aus festsitzendem Gelände/Objekten befreien, ohne zerstört zu werden",
      "Diskrepanz bei der Ressourcenmenge bei Camp-Fonds-Spenden behoben",
      "Outfit-Darstellung in bestimmten Situationen korrigiert (u.a. beim Bärenreiten)",
      "Gegner-Icons werden wieder korrekt auf der Minimap angezeigt",
      "Verbesserung des Einhandschwerts schließt die Crafting-Challenge ('Artisan's Touch') nicht mehr fälschlich ab",
      "Belohnungsausgabe der Quest 'Followers from Frost' korrigiert",
      "Fortschrittsblockade in St. Halssius's House of Healing behoben",
      "Quest-Leittext wird in bestimmten Situationen wieder korrekt angezeigt",
      "Tracking-Marker auf Welt-/Minimap wechseln nicht mehr fälschlich zum Bounty-Hunt-Icon; unzugängliches Shop-Icon auf der Weltkarte entfernt",
      "Aktualisierung des Stronghold-Wiederaufbau-Timers in der Detailansicht korrigiert",
      "'Wild Honey' wird jetzt in den Kochmethoden honigbasierter Rezepte angezeigt",
      "Autosave-Hinweis erscheint nicht mehr in unzugänglichen Bereichen",
      "Damiane/Oongka: Absturz nach Camp-Erweiterung behoben",
      "Damiane/Oongka: falsche Blatt-Effekte (leaf effects) werden nicht mehr angezeigt",
      "Damiane/Oongka: Mehrfachfeuer von 'Focused Charged Shot' in der Luft korrigiert",
      "Oongka: 'Scatter Shot' feuert außerhalb des Kampfes in die anvisierte Richtung",
      "Oongka: Greifen während des Springens mit dem Kuku Rocket Pack funktioniert wieder",
      "Oongka: 'Charge' verursacht mit allen Waffen konsekutiven Schaden",
      "Oongka: Fallschaden-Timing bei 'Spinning Strike' aus der Höhe korrigiert"
    ]},
    {cat:"Sonstiges",items:[
      "Verifiziert gegen die offiziellen Pearl-Abyss-Patchnotes 1.12.00 (Notice boardNo 100) sowie VULKK, GameWatcher und DSOGaming. Alle Punkte offiziell belegt; einzige Ausnahme die als solche markierte Community-Angabe zur Werkbank-Funktion",
      "Diverse Lokalisierungsfehler behoben und Lokalisierungsqualität in allen Sprachen verbessert"
    ]}
  ]},
  {ver:"1.11.00",date:"12.06.2026",size:"Console-Build 1.000.341",features:[
    {cat:"Neuer Content",items:[
      "4 neue Pet-Challenges schalten zusätzliche Pet-Slots frei: maximal 100 registrierbare Pets (Summon-Limit im Camp bleibt bei 50)",
      "Bestehende Pet-Challenges um Belohnungs-Items ergänzt — wer sie bereits abgeschlossen hat, erhält die Belohnungen rückwirkend",
      "Baby-Wyverns haben jetzt ein eigenes Karten-Icon",
      "Verlorene Rare-Ausrüstung ist wiederbeschaffbar: Shopkeeper sammeln verlorenes Rare Equipment (aus Truhen, Quests etc.) ein und bieten es 7 Tage lang zum Rückkauf an — teurer als der Originalwert",
      "'Flower Basket' neu im Sortiment des Hernand Provisioner's Shop",
      "Neues Buch 'Ranged Weapons of the World - Bows, Vol. I' im Hernand Equipment Shop",
      "Knowledge-Eintrag 'Irkyn' nach Abschluss der Kiln-Repair-Quest erhältlich"
    ]},
    {cat:"Charaktere & Skills",items:[
      "Damiane und Oongka können jetzt 'Mining Drill' und 'Chainsaw' ausrüsten",
      "Damiane/Oongka: Spirit-Recovery-Steigerung beim Leveln von 'Focus' griff nicht korrekt — behoben",
      "'Explosive Evasive Shot' und 'Multishot' verbessert — Special Arrows lösen zuverlässiger aus",
      "Wyvern lässt sich per 'Axiom Force' jetzt direkt besteigen (ohne 'Back Hang')",
      "Angriffsmuster der Golem-Monster angepasst",
      "Oongka: Kanonenkugel-Verbrauch von 'Scatter Shot' beim Wall-Cling korrigiert; Drill-Bonus-Yield beim Wall-Cling gefixt",
      "Stamina-Verbrauch des Wyvern-Bodenangriffs reduziert"
    ]},
    {cat:"Quality of Life",items:[
      "Controller: Buttons für Inventory, Map, Skills, Journal und Photo Mode frei belegbar",
      "Pinball-Minigame entschärft: trägerer Ball, weniger Durch-Wand-Glitches, angepasste Pin-Positionen und Portal-Abschüsse, kein Festhängen mehr im oberen linken Bereich",
      "Pet-Namen bleiben beim Aufwachsen (Growth) jetzt erhalten",
      "Hard Difficulty: doppelter Nahrungsverbrauch entfernt",
      "Photo Mode: Option zum Deaktivieren von 'Depth of Field' wiederhergestellt",
      "Mounts werden nicht mehr in Gefahrenzonen beschworen",
      "Foul-Erkennung im 'Duel'-Minigame verbessert",
      "Tierbilder, Knowledge-Einträge und Guides überarbeitet"
    ]},
    {cat:"Bugfixes",items:[
      "'Sigil of Solidarity' war in bestimmten Situationen nicht nutzbar — behoben",
      "Angekündigt, aber in den offiziellen Notes am Revisionstag (12.06.) wieder gestrichen: 'Iron Eagle und Phoenix können das Sigil of Valor ausrüsten' — in der revidierten Notice (Pearl Abyss boardNo 99, 'Revised: 2026/06/12') als '(Removed: 2026/06/12)' markiert; laut VULKK (Community-Beleg, nicht offiziell) verhinderte ein Bug das Anlegen. Der in 1.10.00 als 'Termin für eine Freischaltung offen' notierte Punkt bleibt damit weiterhin offen",
      "Wyvern-Beschwörung im nicht-reitbaren Zustand korrigiert",
      "Auto-Wiederaufsitzen nach Wyvern-Absprung in der Luft behoben",
      "'Kuku Bird'-Eier und Wyvern-Eier sind nicht mehr stapelbar",
      "Housing Mode: Items blieben nach dem Entfernen bewegungsgesperrt — behoben",
      "Rancher's Shop: Tiernamen zeigten '???' — behoben",
      "Experience-UI erschien nach Pet-Fütterung nicht — behoben",
      "Wasser-Eintauch-Probleme bei Blackstar und Wyvern behoben",
      "Diverse Lokalisierungsfehler in allen Sprachen korrigiert"
    ]}
  ]},
  {ver:"1.10.01",date:"06.06.2026",size:"Hotfix, alle Plattformen",features:[
    {cat:"Bugfixes",items:[
      "Crash beim Teleport zum Abyss Nexus behoben",
      "Crash beim Schlüpfen eines Eis am Wyvern's Cradle behoben",
      "Spielerbewegung wurde durch Kleintiere blockiert — behoben",
      "Bestimmte Tiere spawnten nicht mehr — behoben",
      "Mission-Dispatch: Filter setzte sich beim Öffnen zurück — behoben",
      "Koreanische Systemmeldung beim Wyvern-Flug in nicht-koreanischen Sprachversionen korrigiert",
      "Sigil of Valor: Item-Beschreibung korrigiert — sie behauptete fälschlich, das Sigil sei auch von Iron Eagle und Phoenix tragbar (Anlegen bleibt auf Hunde und Baby-Wyverns beschränkt)"
    ]}
  ]},
  {ver:"1.10.00",date:"05.06.2026",size:"Console-Build 1.000.327",features:[
    {cat:"Neuer Content",items:[
      "Re-Blockade überarbeitet: neue Phasen 'Battle' und 'Reconstruct' vor und nach Blockaden ergänzt",
      "Große Festungen: Spieler können über den Contribution Assessor 'Protection' anfordern",
      "Festungs-Befreiung belohnt jetzt mit Contribution, Proviant, Handelsgütern und weiteren Items",
      "Neues Minigame 'Pinball' am Inn nahe dem Delesyian Institute",
      "Neuer 'Marni Token Exchange': am Pinball-Automaten erhaltene Token gegen Items tauschbar (u.a. Material Box of Fortune, Abyss Artifact, 2 Arten Artifact Chests, ein Helm, 13 Arten Möbel, 3 Gear-Crafting-Rezepte)",
      "Neues Minigame 'Orb Roll' am Great Gate of Urdavah (Items u.a. Material Box of Fortune, Abyss Artifact, 2 Arten Artifact Chests, goldener Apfel, 3 Teppiche, 3 Lichter)",
      "Neues Reittier 'Wyvern'",
      "Neues Pet 'Kuku Bird Chick'",
      "Kuku Bird Chicks und Baby-Wyverns wachsen durchs Füttern und sind ab einem bestimmten Wachstumsgrad als Spezial-Mounts registrierbar",
      "Neue Mount-Ausrüstung 'Wyvern Saddle'",
      "Neue Pet-Ausrüstung 'Small Kuku Bird Eggshell' und 'Small Wyvern Aviator Hat'",
      "Neue Deko-Kategorie 'Carpet' (Teppich) für die Haus-Dekoration",
      "Teppiche zum Sortiment einiger Färbereien (Dyehouses) hinzugefügt",
      "Katzenturm zur Furlington Farm im Azerian Estate hinzugefügt"
    ]},
    {cat:"Quality of Life",items:[
      "Gesperrte (locked) Items: Abyss-Ausrüstung kann jetzt daraus entfernt werden",
      "Große Erntesense (Large Farming Scythe) liefert jetzt auch sammelbare Items",
      "Element-Slot- bzw. Pfeil-/Kugel-/Kanonenkugel-Slot-Wechsel im Bosskampf bleibt nach Tod und Wiederholung erhalten",
      "Pfeile: bei aufgebrauchter Auffüllung werden zuerst normale Pfeile genutzt",
      "Sigil of Valor jetzt auf Hunde und Baby-Wyverns anlegbar (Iron Eagle und Phoenix können es weiterhin nicht tragen — 1.10.01 hat lediglich die irreführende Item-Beschreibung korrigiert)",
      "Karte zum Sternbild-Forschungsjournal hinzugefügt — Sternbild-Standorte darüber auffindbar",
      "Fütter-Animation beim Halten bestimmter Wildtiere verbessert",
      "Trageposen einiger Pets geändert",
      "Animationen für das Hinein- und Herauslegen lebender Fische aus dem Inventar",
      "Freilass-Funktion: auch beschworene Pets können freigelassen werden",
      "Bewegungs-/Posture-Animationen verbessert (natürlichere Optik von Outfits und Charakteren)"
    ]},
    {cat:"Charaktere & Skills",items:[
      "Neuer Bodenangriff-Skill für Blackstar",
      "[Damiane] Schaden der unbewaffneten Skills angepasst (Balance — Patch-Notes nennen keine Zahlenwerte)",
      "[Damiane] Dreh-/Roll-Animation beim Tragen einer Muskete hinzugefügt",
      "[Oongka] Effekt der Fähigkeit 'Devastation' verbessert"
    ]},
    {cat:"Steuerung & UI",items:[
      "[Controller] Basis-Interaktion (Y/Dreieck) ist im 'Default'-Preset kein langes Drücken mehr",
      "[Controller] Axiom Force: Buttons jetzt frei anpassbar",
      "[Tastatur/Maus] Speicherfehler bei Sekundär-Tastenbelegung behoben",
      "[Tastatur/Maus] Bogenschieß-/Schießwettbewerbe: Charakter geht sofort in den Zielmodus",
      "Mission-Dispatch-Menü: Kategorie-Tabs von regions- auf missionsbasiert umgestellt",
      "Journal > Knowledge > Gatherables: Wissen zu 'Dye Colors' und 'Small Tools' ergänzt",
      "Neue Wachstums-UI im Inventar — Wachstumsstufen von Pets und Pferden prüfbar",
      "Photo-Mode-UI verbessert",
      "Name des Contribution-Shops und seines Managers geändert",
      "Fix: fehlende Tastenleitfaden-Infos unten rechts in bestimmten Situationen",
      "Fix: überlappende Text-UI beim Kauf des Writ of Absolution auf 5K-Monitoren"
    ]},
    {cat:"Grafik & Performance",items:[
      "Fix: Power Core funktionierte nach Wechsel zur 'Fleet of Archives'-Abyss zeitweise nicht",
      "Fix: Barriere in der 'Fleet of Archives'-Abyss wurde beim Annähern deaktiviert",
      "Fix: Regen erschien in Innenräumen",
      "Fix: instabiles Rendering bei nassem (Regen-)Terrain in bestimmten Gebieten",
      "Regen-Effekt verbessert — nasser Boden wird klarer dargestellt",
      "Abgemildert: kurzes Aufblitzen der vorherigen Ausrüstungs-Optik beim Wechsel",
      "Fix: bestimmte Objekte sanken abnormal ins Terrain ein",
      "Fix: unnatürliche Effekte bei Kollision mit bestimmten Möbeln",
      "Fix: bestimmte Tätowierungs-Muster wurden falsch angezeigt",
      "Optik einiger Outfits und Charaktere natürlicher gestaltet",
      "Zirkus-Schilder-Lichter leuchten jetzt auch aus der Ferne"
    ]},
    {cat:"Fixes",items:[
      "Rematch: Fortschritt sprang nach Sieg nicht mehr auf einen früheren Stand zurück",
      "Manche Bosse fügten sich beim Angreifen selbst Schaden zu — behoben",
      "Abbrechende Angriffs-Animationen bei Axiom Force / Force Palm auf einem Mount — behoben",
      "Doppelsprung aktivierte trotz nur einmaliger Vault-Eingabe — behoben",
      "Vault konnte nicht als Konter genutzt werden — behoben",
      "Falsche Angriffskraft-Berechnung bei Kliffs 'Nature's Echo' und Damianes 'Reckoning' — behoben",
      "Force Current funktionierte in der Quest 'Jijeong Temple in Chaos' (Mission 'Repair the second pensive statue') nicht korrekt — behoben",
      "Homing-Skills/-Items visieren keine unbeabsichtigten Objekte mehr an",
      "Pet ließ aufgesammelte Items bei vollem Inventar verschwinden — behoben",
      "Doppelte Legendary Fish im Teich nach erneutem Laden — behoben",
      "Legendary Fish können nicht mehr aus Quick-Slots genutzt werden",
      "Wissen konnte in bestimmten Situationen nicht erhalten werden — behoben",
      "Karte ließ sich in bestimmten Situationen nicht schließen — behoben",
      "Abstürze im Färbe-Menü in bestimmten Situationen — behoben",
      "Wagen fahren in einigen Regionen reibungsloser (Terrain/Objektplatzierung in Passagen verbessert)",
      "Berittene Charaktere waren in bestimmten Situationen nicht steuerbar — behoben",
      "Pferde im Stall ließen sich in manchen Speicherdateien nicht wechseln — behoben",
      "Contribution-UI erschien beim erneuten Betreten des Spiels — behoben",
      "Dauerhaft bestehender Effekt von Focused Force Palm — behoben",
      "Auflösen von Comrades zu Pferd entließ auch das Pferd — behoben",
      "Kopfgeld-Quests schritten in bestimmten Situationen nicht korrekt fort — behoben",
      "Überlappende Dialoge im Kampf gegen Sir Catfish — behoben",
      "Vogel-Pets hoben manchmal Gimmick-Elemente an — behoben",
      "Ausweichen während 'Examine' in der Fraktions-Quest 'Bandits Riding Wolves' nicht möglich — behoben",
      "Fehlende NPCs in der Quest 'Swift Delivery, Safe Borders' — behoben",
      "Quest 'Harvest of Greed': verschwindender Wagen beim Wiederholen — behoben",
      "Kliff konnte nach Tod als Begleiter nicht erneut beschworen werden — behoben",
      "Kamera folgte dem fokussierten Ziel im Focus-Modus nicht — behoben",
      "Abnormale Anzeige von Wissens-Benachrichtigungen — behoben",
      "Zwei Alchemie-Materialien wurden auf Schwierigkeit Hard gleichzeitig verbraucht — behoben",
      "[Damiane] Abnormale Greatsword-Optik nach Aufgabe während eines Rematch — behoben",
      "[Damiane] Abnormal bestehende Schild-Optik nach Shield Toss — behoben",
      "Diverse Lokalisierungsfehler behoben, Lokalisierungsqualität in allen Sprachen verbessert"
    ]},
    {cat:"Sonstiges",items:[
      "Bekanntes Problem: Phoenix und Iron Eagle können das 'Sigil of Valor' nicht anlegen — Termin für eine Freischaltung offen (1.10.01 hat nur die Item-Beschreibung korrigiert)"
    ]}
  ]},
  {ver:"1.09.00",date:"29.05.2026",size:"",features:[
    {cat:"Neuer Content",items:[
      "Controller-Remapping: frei belegbare Tastenbelegung für Controller",
      "~30 weitere Kleintier-Arten als Pets registrierbar (zusätzlich zu Patch 1.08)",
      "Neue Skills für Oongka und Damiane — Eingabe identisch zu Kliffs 'Blinding Flash Finisher' (schwerer Angriff aus Blinding Flash)",
      "Neue Animationen für das Aufheben und Absetzen bestimmter Pets"
    ]},
    {cat:"Quality of Life",items:[
      "Farming: Saatgut kann jetzt auf Quickslots gelegt und von dort genutzt werden",
      "Dispatch-UI: Kameraden mit den für die Mission benötigten Skills werden zuoberst angezeigt",
      "'Repeating Mission' erscheint im UI bei wiederholtem Ausführen einer Mission",
      "Tastatur/Maus: Cursor verschwindet jetzt beim Betrachten von Dokumenten",
      "Bestimmte 2D-Assets ersetzt (bessere Abstimmung auf die Art-Direction)"
    ]},
    {cat:"Charaktere & Skills",items:[
      "Oongka: Stagger-Aufbau von 'Quaking Fury' angepasst (Balance — Patch-Notes nennen keine Schadenswerte)",
      "Kliff-Fix: 'Evasive Kick' verbrauchte unbewaffnet kein Spirit",
      "Kliff-Fix: 'Blinding Flash Finisher' war auch bei unzureichendem Spirit nutzbar"
    ]},
    {cat:"Fixes — Content",items:[
      "Farbprüfung beim Färben/Customizing war je nach Lichtquelle erschwert",
      "Legendäre Fische konnten gespendet werden",
      "Manche Challenges wurden trotz erhaltenem Wissen nicht abgeschlossen",
      "'Pond Management' war in bestimmten Situationen nicht betretbar",
      "Steuerung blockierte beim Tod im Pond-Management-Menü unter Schaden",
      "Bären versuchten, am Boden liegende Fische zu fressen, scheiterten aber"
    ]},
    {cat:"Fixes — Steuerung & UI",items:[
      "Foto-Modus wurde beim Betrachten von Items ausgelöst",
      "Werkzeug-Nutzung: 'Magic Scythe' bei vollem Inventar, 'Scythe' in sicheren Zonen, 'Mining Knuckledrill' an der Wand jeweils blockiert — behoben",
      "Kameradenzahl wurde im Camp-Ressourcen-UI als 0 angezeigt",
      "QTE-Eingabe-Icon fehlte bei angepassten Eingabeoptionen",
      "UI-Freeze beim Wiedereinstieg nach fehlerbedingter Rückkehr zum Titelbildschirm",
      "'Clean' wurde auch für nicht ausnehmbare Fische angezeigt",
      "Ausrüstung wechselte beim Angriff mit bestimmten ausgerüsteten Werkzeugen ungewollt zu einer anderen Waffe"
    ]},
    {cat:"Fixes — Grafik & Performance",items:[
      "PC: Schatten entfernter Objekte bei 'Raytraced Sun/Moon Light Shadows' falsch gerendert",
      "Mac: 'Raytraced Sun/Moon Light Shadows' wurde nicht angewendet",
      "Ausrüstung erschien transparent beim Wechsel des gezogenen Werkzeugs",
      "Damiane: Effekt-Stacking an Sanctum-Cores (Elementangriffe) → Performance-Einbruch behoben",
      "Crash beim Wechsel zum 'Tree Branch' Crafting-Reiter behoben",
      "Diverse Animations-Fixes (Landung, Ausweichen im Sturz, Leiche-Absetzen beim Schwimmen)"
    ]},
    {cat:"Sonstiges",items:[
      "Audio spielte beim Betrachten von Dokumenten (Bücher, Steckbriefe) bei englischer Sprachausgabe",
      "Soundeffekte fehlten beim Kochen mit Spezial-Kochwerkzeug",
      "Lokalisierung: Übersetzungskorrekturen und -verbesserungen",
      "Verfügbar: Steam (PC/Mac), PlayStation, Xbox, Epic Games Store — Mac App Store folgt später"
    ]}
  ]},
  {ver:"1.08.00",date:"22.05.2026",size:"",features:[
    {cat:"Neuer Content",items:[
      "Tools-Slot: eigener Ausrüstungs-Slot für Werkzeuge (Holzaxt, Hammer, Schaufel, Besen, Sense, Spitzhacke, Bohrer/Kettensäge, Fächer) — getrennt von Sekundärwaffen. Masken & Circlets in den Rüstungs-Tab verschoben",
      "Fish Pond: Teich bei Howling Hill + Pailune Camp anlegbar (Completion-Mission, ~2 Ingame-Tage). Fische vermehren sich bei gleicher Art; Legendary-Fische bleiben permanent, nicht verkauf-/wegwerfbar",
      "20 neue Kleintier-Arten als Pets + Baby Wyvern (Ei in Südwest-Delesyia, schlüpft am nahen Nest)"
    ]},
    {cat:"Mounts",items:[
      "Wilde Wyvern nach Subduing temporär als Mount reitbar",
      "Baby Wyvern: Mount-Funktion später geplant"
    ]},
    {cat:"Charaktere & Skills",items:[
      "Kliff kann jetzt Musketen und Schrotflinten nutzen",
      "Damiane & Oongka: neuer Skill äquivalent zum Focused Aerial Roll",
      "Infinite Arrows Abyss Gear wirkt jetzt auch mit Kugeln und Kanonenkugeln",
      "Gefesselte Outlaws beim Transport zum Schweigen bringen"
    ]},
    {cat:"Crafting",items:[
      "Instant-Refinement ohne Materialauswahl",
      "Superior Branches via Spezial-Tree-Branch-Blueprint; Tree Branches → Rough Tree Branches (stackbar)",
      "Neue Missionen: Mass Craft Paintings / Craft Fine Paintings",
      "Logging-/Quarry-Missionen belohnen jetzt Timber & Stones; Fischfallen funktional"
    ]},
    {cat:"Steuerung",items:[
      "Sekundär-Keybinds für alle Eingaben (Maus & Tastatur)",
      "Photo-Mode-Shortcut (Default P)",
      "Blackstar: Kamera-Verbesserungen + Blinding Flash jetzt beim Reiten nutzbar",
      "Pet-Interaktion erfordert vorheriges Anvisieren"
    ]},
    {cat:"UI",items:[
      "Getrennte Map-Marker für Land- vs. Abyss-Locations + Minimap-Tracking",
      "Waffen-Typ-Filter im Skill-Menü (Suche)",
      "Grüne Häkchen für abgeschlossene Knowledge-Kategorien"
    ]},
    {cat:"Grafik & Performance",items:[
      "Raytraced Sun/Moon Light Shadows (PC, Settings > Grafik)",
      "Reduzierte GPU-Last in 4K+-Umgebungen",
      "Fixes für DLSS Frame Generation & Intel XeSS; Metal4 Standard ab macOS 26.5+",
      "Vegetations-Flackern und Glas-Material-Smearing behoben"
    ]},
    {cat:"Fixes",items:[
      "Wagen-Wechsel beim Wagonmaster repariert",
      "Türen nach Mission-Reset wieder öffenbar",
      "Diverse charakterspezifische Animations-, Positions- und Visual-Fixes; NPC-Respawn verbessert"
    ]}
  ]},
  {ver:"1.07.00",date:"15.05.2026",size:"381 MB · Console-Build 1.000.283",features:[
    {cat:"Bosse",items:[
      "5 weitere Rematch-Bosse via Laterne: Muskan (Bonepit), Corrupted Caliburn (Fort Musket), Goyen (Spire of the Sun), Draven the Crowcaller (Church of West Demeniss), Clockwork White Horn (Gate to Advancement)",
      "Abyss-Bosse jetzt an Land-Locations rematched"
    ]},
    {cat:"Damiane",items:[
      "Komplettes Fists-Skill-Set (eigener Combat-Mode im Skill-Menü)",
      "Bewegungs-Animationen verbessert"
    ]},
    {cat:"Skills",items:[
      "Aerial Stab für Damiane + Oongka (Luft-Mobility wie Kliff)",
      "Oongka Explosive Strike hat jetzt Charge-Phase",
      "Oongka Dual-Wield → Stab-Chain flüssiger",
      "Kliff Blinding Flash Finisher auch unbewaffnet"
    ]},
    {cat:"Mounts",items:[
      "Mehr Wolf- und Bär-Typen als Mounts registrierbar",
      "Zügel für weitere Mounts"
    ]},
    {cat:"Fixes",items:[
      "AMD GPU-Treiber 26.5.1 Crash behoben (PC-Stabilität)"
    ]}
  ]},
  {ver:"1.06.01",date:"12.05.2026",size:"Hotfix",features:[
    {cat:"Bugfixes",items:[
      "Progression-Blocker im Vault of Vengeance Abyss behoben (Weiterspielen war dort nicht möglich)",
      "Bekanntes Problem dokumentiert: Elegant Carmine Leather Armor fehlerhaft (offizieller Hinweis in den Notes)"
    ]}
  ]},
  {ver:"1.06.00",date:"11.05.2026",size:"",features:[
    {cat:"Mounts",items:[
      "Tiger Mount — Peninsula South Crimson Desert, Unnamed Lake bei Giant's Yard Watchtower",
      "Wild taming: Fleisch füttern → 100% Trust → Take In",
      "Achtung: Legendary White Tiger führt Gruppe — bei dessen Tod ggf. kein Respawn"
    ]},
    {cat:"Skills",items:[
      "Kliff Blinding Flash auch ohne Waffe ausführbar",
      "Oongka komplettes Unarmed/Fists-Skillset"
    ]},
    {cat:"Crafting",items:[
      "Smithy Extraction: 100% Artifacts/Aeserion's Scale zurück, ~70% Erz/Bloodstones",
      "Refine-Stufe wird auf Basis zurückgesetzt, Item bleibt erhalten"
    ]},
    {cat:"Minigames",items:[
      "The Laughing Marionette (Claw Machine, 1 Silver/Versuch) — 12 Beleuchtungsitems, Spezial-Kopfbedeckung, Abyss Artifacts, Abyss Gears"
    ]},
    {cat:"UI",items:[
      "Display Sheath toggle (Schwertscheide an/aus)",
      "Night Tone Mode (Grafik-Option, dämpft Farben + hellt Schatten)"
    ]}
  ]},
  {ver:"1.05.01",date:"03.05.2026",size:"Hotfix, alle Plattformen",features:[
    {cat:"Bugfixes",items:[
      "Laufende Dispatch-Missionen wurden unter bestimmten Umständen abgebrochen — behoben (verbrauchte Ressourcen/Contribution sollten mit dem Folgepatch erstattet werden)",
      "Pets konnten unter bestimmten Bedingungen nicht beschworen werden — behoben"
    ]}
  ]},
  {ver:"1.05.00",date:"02.05.2026",size:"",features:[
    {cat:"Bosse",items:[
      "Boss-Rematch via Laterne + Memory Fragment am Kampfort",
      "Reminisce- und Resonate-Modi",
      "69 Bosse Start-Roster für Rematch"
    ]},
    {cat:"Forts",items:[
      "Re-Blockade für 23 Forts mit 3 Frequenz-Modi (Stable / Conflict / War)"
    ]}
  ]},
  {ver:"1.04.00",date:"23.04.2026",size:"",features:[
    {cat:"Neuer Content",items:[
      "Schwierigkeitsgrade Easy / Normal / Hard (Easy: längere Parry-/Dodge-Fenster; Hard: stärkere Gegner, weniger Roll-Unverwundbarkeit, mehr Boss-Konter)",
      "Massive Lager-Erweiterung: Sturdy Gatherables Chest (1.000 Slots), Kuku Cooler, Collectibles Chest (1.000), Wardrobe bis 1.000 Outfit-Slots + 'Select House'-Layouts",
      "Vogel-Pets in ganz Pywel, 5 neue Katzen-Typen, Abyss Heuklang als Pet, Pet-Umbenennung, Pet-Geheimshop in Pororin",
      "Neue Ausrüstung: Damianes 'Sword of Starlight' (Quest), Tree Branch / Sturdy Tree Branch, Kliffs 'Baltheon'-Rüstung",
      "Welt: Konstabuleien in Hernand/Demeniss, Vieh-Händler, Cloudcart als permanentes Mount, Item-Lock-Funktion, 13 neue Tattoos"
    ]},
    {cat:"Kampf & Skills",items:[
      "Bosse nicht mehr immun während starker Angriffe; Konter-/Fluchtfrequenz angepasst; Elementarschaden erhöht",
      "Force Palm Pulse mit drei Ladestufen; Kliff: Weapon-Throw-Skill; Damiane/Oongka: Ambush-Skill; Oongka: Blaster im Flug",
      "Marni's Mechahorse kann sprinten und schwimmen"
    ]},
    {cat:"Steuerung & UI",items:[
      "Preset-Feature für Tastatur/Maus + Controller (inkl. Classic Preset), erweiterte Keybinding-Optionen",
      "Inventar-Kategorie-Tabs (All/Documents/Equipment/Food/Materials/Others) mit gespeicherten Sortierungen",
      "Map: Filter/Suche, anpassbare Marker, Memory-Fragment- und Brunnen-Icons; Shops zeigen Besitzanzahl + Kaufbedingungen"
    ]},
    {cat:"Grafik & Accessibility",items:[
      "Renderqualität entfernter Objekte/Texturen verbessert; Colorblind Mode, Photosensitive-Mode-Optionen",
      "Mac: MetalFX Denoising Upscaler (macOS Tahoe+), HDR-Verbesserungen",
      "Bounty-System: hohe Kopfgelder führen zu Verhaftung statt Übergabe-Cutscene"
    ]},
    {cat:"Hotfixes 1.04.01 / 1.04.02 (23.–24.04.)",items:[
      "1.04.01: Pet-/Pferde-Umbenennung auf L3/LS verlegt, Mount-Quick-Slot-Fix, Stamina-Exploit behoben, Crash-Fixes (Färben, Umbra-Bosskampf)",
      "1.04.02: Bewegungsgeschwindigkeit leicht erhöht, Pferde-Ausrüstung färbbar, Greymane Contribution Shop bei Carl, Möbel ziehen beim Camp-Umzug mit"
    ]}
  ]},
  {ver:"1.03.00",date:"11.04.2026",size:"",features:[
    {cat:"Content",items:[
      "Greymane-Camp-Zugänglichkeit und NPC-Platzierung verbessert; Farm-/Ranch-Flächen erweitert",
      "Schnellvorlauf in normalen Dialogszenen; Bankdienste bei 'Wanted'-Status eingeschränkt; 3 neue Kampfmusik-Tracks"
    ]},
    {cat:"Kampf & Steuerung",items:[
      "Teleportation nun auch beritten, fallend, schwimmend oder kletternd möglich",
      "Neue Fähigkeit 'Focused Aerial Roll' (Kliff); Damiane/Oongka erhalten 'Axiom Force' und 'Nature's Snare'",
      "Boss-Lock-on-Distanz und -Mechanik verbessert"
    ]},
    {cat:"UI & Grafik",items:[
      "Truhen-/Höhlen-/Abyss-Icons zeigen Sammel-/Erkundungsstatus; Bulk-Gruppierung von Items",
      "Intel-Arc-GPU-Support, Intel XeSS 3.0 + Frame Generation, AMD Anti-Lag 2; Enhanced Raytracing (PS5 Base/Xbox Series X)",
      "Neue Accessibility-Optionen: Minimum Font Size, Schnellvorlauf bis 4x, erweiterte Kamera-Optionen, 'Weapon Display'"
    ]},
    {cat:"Hotfix 1.03.01 (12.04.)",items:[
      "Nature's Snare: Projektile prallten ab/verschwanden (u.a. Xbox-Wireless-Controller) — behoben",
      "Loot wurde nach Befreiung unter bestimmten Bedingungen nicht im Private Storage abgelegt — behoben"
    ]}
  ]},
  {ver:"1.02.00",date:"04.04.2026",size:"",features:[
    {cat:"Content",items:[
      "Private Storage über fünfstufigen Camp-Ausbau von 240 auf max. 1.000 Slots erweiterbar",
      "Neuer Abyss Nexus in Pailune; neues Katzen-Rüstungsset + Helm; explosive Fässer besser sichtbar"
    ]},
    {cat:"Steuerung & Kampf",items:[
      "Neue Option 'Movement Controls': 'Basic' (Sprint halten) vs. 'Classic' (wiederholt drücken)",
      "Flight per gehaltenem Sprung in der Luft aktivierbar; Sprungreaktion nach Angriffen verbessert",
      "Fixes: Parry im Fokus mit Zweihänder, Boss-Teleport-Distanz, Double Boost, Pferde-Speed-Exploit"
    ]},
    {cat:"Quests & UI",items:[
      "Kapitel-6-Boss-Blocker nach Save/Load gefixt; Kapitel-11-Schlüssel-Verschwinden behoben",
      "Save/Load-Menüs getrennt mit Slot-Nummern; Shop-UI priorisiert verkäufliche Items"
    ]},
    {cat:"Grafik",items:[
      "Neue Option 'Headgear Visibility' (Always Show / Show in Combat / Hide in Cutscenes / Always Hide)",
      "FSR-Qualität verbessert (FSR SDK 2.2 auf PC); PS5 Pro: PSSR Sharpen + Native AA; Xbox Series X: 4K-Upscaling im Performance Mode"
    ]}
  ]},
  {ver:"1.01.00",date:"28.03.2026",size:"",features:[
    {cat:"Content",items:[
      "5 neue beschwörbare Mounts: White Bear, Silver Fang, Snowwhite Deer, Rock Tusk Warthog, Icicle Edge Alpine Ibex",
      "Neues Item 'Refinement Token' (Tempering bis Stufe 4); Material-Truhen in ganz Pywel",
      "'Make Now' (Sofort-Kochen/-Craften) und 'Store all selected items' (Massentransfer)",
      "Photo Mode: größere Kameradistanz + FOV-Regler; Bank-Geldverlust beim Zins-Refresh gefixt"
    ]},
    {cat:"Steuerung & Kampf",items:[
      "Sprint per Halten/Tippen wählbar; Flug: weniger Stamina-Verbrauch, Equipment im Flug nutzbar",
      "Inventar-Interaktion umgebaut (Klick = auswählen, Rechtsklick/Doppelklick = benutzen)",
      "Schwachpunkt-Indikatoren nach Element; Waffe im Kampf jederzeit ziehbar"
    ]},
    {cat:"Quests & UI",items:[
      "Progressionsblocker gefixt: 'New Journey' (Prolog), 'Missing Companion' (Kap. 2), 'Dance with the Devil' (Kap. 3)",
      "Minimap nordfixierbar; Notifications-Menü mit Quest-/Challenge-Verlauf (2.000 Einträge); Rezepte nach Typ gruppiert"
    ]},
    {cat:"Hotfixes 1.01.01–1.01.03 (30.–31.03.)",items:[
      "1.01.01: Mount-Talisman-, Blackstar-, A.T.A.G.- und Tempering-UI-Fixes; Sprint auf White Bear ermöglicht",
      "1.01.02 (Steam): DLSS-/Ray-Reconstruction-Verbesserungen, Flacker-Fixes an Himmel-/Wolkengrenzen",
      "1.01.03: Bosse blieben gelegentlich im Kampf stehen — behoben"
    ]}
  ]},
  {ver:"1.00.03",date:"23.03.2026",size:"",features:[
    {cat:"Quality of Life",items:[
      "Mehr Abyss-Nexus in ganz Pywel (schnelleres Fast Travel); Private Storage in Hernand-Unterkünften + Howling Hill Camp",
      "Knowledge schneller erlernbar (Skill-Beobachtung nur noch einmal nötig); Erze/Sammelobjekte werden in der Nähe automatisch entdeckt",
      "Baumfällen erleichtert; Heilwirkung von Zutaten/Essen erhöht; Witches-Shop mit täglichem Reset",
      "Essen wird bei Erhalt automatisch in Quick Slots registriert; Knowledge/Notifications ins Journal verschoben"
    ]},
    {cat:"Kampf & Balance",items:[
      "HP/Angriff früher Gegner und Main-Quest-Bosse reduziert (u.a. T'rukan the Ascended, Kearush the Slayer); Reed-Devil-Hinterhalt leichter",
      "Block-Stamina-Verbrauch gesenkt; mehr Stun-Aufbau bei erfolgreichen Parrys; Boss-Schwachstellen ohne Vorwissen sichtbar"
    ]},
    {cat:"Steuerung & Technik",items:[
      "Menü-Shortcuts I/K/J/M; bessere Standard-Mausbelegung (Guard/Aim/Evade); reaktionsschnellere Interaktions-UI",
      "PS5/Xbox: optionale 120-Hz-Ausgabe (HDMI 2.1); Mac-Crash-Fixes; PS5-Map-Crash behoben; Xbox-Offline-Spielbarkeit gefixt",
      "Carls Heilitem-Preise von 10 auf 1 Silber gesenkt; Quest-Fixes (u.a. 'Reunion', 'Mysterious Pot', 'Turnali's Request')"
    ]},
    {cat:"Hotfix 1.00.04 (23.–24.03.)",items:[
      "PlayStation: Interaktionen nach Charakterwechsel zu Kliff teils nicht ausführbar — behoben",
      "Mac (Steam): Crashes bei Quest-Abschluss, Spielstart und Spielbeendigung behoben"
    ]}
  ]},
  {ver:"1.00.02",date:"19.03.2026",size:"Erster Patch nach Release",features:[
    {cat:"Stabilisierung & Balance",items:[
      "Tutorial-Quest für die Abyss-Gear-Mechanik in Kapitel 3 ergänzt; diverse Quest-Progressionsfehler behoben",
      "QTE-Schwierigkeit bei Gefangennahme skaliert nun graduell; Instant-Kill-Schaden des Bären entfernt",
      "Boss-Balance angepasst (u.a. Reed Devil); Bosse greifen nicht mehr während der Wiederbelebungsanimation an",
      "Neue Folgeangriffe: Kliffs Flurry of Blows (Finisher), Damianes Großschwert-Stich/Uppercut, Oongkas Dual-Wield-Stich",
      "Tenebrum-Kampf (Kap. 4): Puzzle-Abschnitt muss nach Tod nicht mehr wiederholt werden",
      "'Watch and Learn' verbessert; Skill-Namen/-Beschreibungen nach Waffentyp getrennt",
      "UI-, Lokalisierungs- und Crash-Fixes auf allen Plattformen"
    ]}
  ]}
];
const MINIGAMES=[
 {icon:"🪩",name:"Pinball",patch:"1.10.00",conf:"high",ort:"Gasthaus am Hafen von Delesyia, rechts neben dem Delesyian Institute",start:"Mit dem Flipperautomaten interagieren, 1 Silber pro Runde (beliebig wiederholbar)",ablauf:"Klassischer Flipper: L2/LT linker, R2/RT rechter Flipper, mit L3/W lässt sich der Automat rütteln. Je höher der Score, desto mehr Marni-Token gibt es für die Token Exchange nebenan.",belohnung:"Marni-Token → Material Box of Fortune, Abyss Artifact, 2 Artefakt-Truhen, Helm, 13 Möbelstücke, 3 Gear-Craftingrezepte"},
 {icon:"🎰",name:"Marni Token Exchange",patch:"1.10.00",conf:"high",ort:"Händlerin neben dem Pinball-Automaten (Gasthaus beim Delesyian Institute)",start:"Mit der Händlerin sprechen, sobald Marni-Token vorhanden sind",ablauf:"Kein eigenes Spiel, sondern der Tausch-Shop zum Pinball: erspielte Marni-Token werden hier gegen Items eingelöst.",belohnung:"Material Box of Fortune, Abyss Artifact, Artefakt-Truhen, Helm, Möbel, Craftingrezepte (gegen Token)"},
 {icon:"🎯",name:"Orb Roll",patch:"1.10.00",conf:"high",ort:"Great Gate of Urdavah (Ostturm), Crimson Desert — 4 Automaten",start:"Kostenlos; Start mit 10 Versuchen, mehr durch 5 gesammelte Würfel oder perfekte Level",ablauf:"50 immer schwerere Level: Mit Viereck/X Schusskraft aufladen, mit L1/R1 die Kanone ausrichten und die Kugel an Hindernissen vorbei ins rote Zielfeld rollen. Alle 10 Level gibt es über die Challenge 'A Fragment of Forgotten Childhood' Belohnungen.",belohnung:"Material Box of Fortune, Abyss Artifact, 2 Artefakt-Truhen, Goldener Apfel, Teppiche, Lampen; für alle 50 Level laut Berichten Abyss Gear"},
 {icon:"🦾",name:"Claw Machine (Greifautomat)",patch:"1.06.00",conf:"high",ort:"'Laughing Marionette', Jahrmarkt nordwestlich der City of Demeniss (Zelt mit 3 Automaten am Riesenrad)",start:"Am Automaten interagieren und mit Silber zahlen",ablauf:"Jeder Preis steckt in einem Käfig mit einer offenen fünfeckigen Seite — der Greifstab muss exakt durch diese Öffnung abgesenkt werden, um den Käfig von innen zu haken. Preise rotieren täglich.",belohnung:"Deko-Lampen, Stuhl, spezielle Kopfbedeckungen, Abyss Artifacts, Abyss Gear"},
 {icon:"✂️",name:"Schere, Stein, Papier",patch:"Release",conf:"high",ort:"Kinder in allen größeren Städten (Hernand, Demeniss, Delesyia, Tashkalp, Varnia, Pailune)",start:"Kind ansprechen und herausfordern; danach ~23 Ingame-Stunden Cooldown",ablauf:"Best-of-3 Schere-Stein-Papier. Siege zählen für die Mind-Games-Challenge 'A Silent War' (3 Siege an verschiedenen Tagen/Orten).",belohnung:"Zufälliges Insekt pro Sieg + Beziehungspunkte zur Fraktion"},
 {icon:"💪",name:"Armdrücken",patch:"Release",conf:"high",ort:"Hernand Inn (City of Hernand) u.a.",start:"Sitzenden Einwohner am Tisch herausfordern",ablauf:"Button-Mashing plus Kreis-QTE: Schnelles Drücken füllt die rote Leiste; beim QTE warten, bis der Zeiger auf dem weißen Segment links landet. Guide-Tipp: Grafik-Preset 'Performance' verlangsamt den QTE-Zeiger.",belohnung:"Kleinere Geld-/Beziehungsgewinne (nicht eindeutig belegt)"},
 {icon:"🃏",name:"Duo (Kartenspiel)",patch:"Release",conf:"high",ort:"1. Stock des Hernand Inn; auch Tashkalp und Beighen",start:"Am Glücksspieltisch Platz nehmen, Einsatz 15 Silber",ablauf:"Glücksspiel nach Art des koreanischen Seotda: 2 Karten, höchste Kombination gewinnt den Pot (Check, All-in, Half-/Double-Raise, Call, Fold). Wer die Mischbewegung des Gegners dreimal beobachtet (blaue Umrandung), schaltet eine Schummel-Fähigkeit frei. Mind-Games-Challenge: 'A Bloom of High Stakes'.",belohnung:"Geldgewinne (Pot)"},
 {icon:"🂠",name:"Five-Card (Kartenspiel)",patch:"Release",conf:"high",ort:"Spielhölle in Beighen (Gebäude mit Ork-Türsteher), Pailune",start:"Erst nach der Odeck-Questreihe 'Executioner of Justice' zugänglich",ablauf:"Duo-Variante mit 5 Karten und gleicher Setz-/Schummelmechanik. Beste Hand: 'Prime Pair' (rote 3 + rote 8). Mind-Games-Challenge: 'Key of Destiny'.",belohnung:"Geldgewinne"},
 {icon:"🏹",name:"Shot Contest: Bogen",patch:"Release",conf:"high",ort:"Lioncrest Manor, Hernand",start:"Beim Veranstalter anmelden, 80 Kupfer Startgebühr",ablauf:"Wettschießen: Wer zuerst 10 zufällig erscheinende Ziele trifft, gewinnt. L2 spannt und zielt, Loslassen schießt.",belohnung:"Preisgeld"},
 {icon:"🔫",name:"Shot Contest: Gewehr",patch:"Release",conf:"high",ort:"City of Hernand",start:"Beim Veranstalter anmelden, 1 Silber Startgebühr",ablauf:"Wie der Bogenwettbewerb, nur mit Gewehr: zuerst 10 Zufallsziele treffen.",belohnung:"Preisgeld"},
 {icon:"🥊",name:"Unarmed Duel: Boxen",patch:"Release",conf:"high",ort:"Goldenfist Arena, Hernand",start:"In der Arena antreten, 30 Kupfer Startgebühr",ablauf:"Duell nur mit bloßen Fäusten — Waffen oder regelwidrige Angriffe führen zur sofortigen Disqualifikation. Teil der Duel-Challenges.",belohnung:"Arena-Preisgeld"},
 {icon:"🔱",name:"Weapon Duel: Speer",patch:"Release",conf:"high",ort:"City of Hernand",start:"Zum Speerduell herausfordern, 45 Kupfer Startgebühr",ablauf:"Duell, bei dem ausschließlich der Speer erlaubt ist; Regelverstöße disqualifizieren.",belohnung:"Duell-Preisgeld"},
 {icon:"🤼",name:"Ringkampf",patch:"Release",conf:"high",ort:"Kharonso, Hernand",start:"In der Arena antreten, 1 Silber; alle Waffen ablegen",ablauf:"Reiner Grappling-Wettkampf ohne Schläge — der Sieg fällt ausschließlich über Griffe und Würfe.",belohnung:"Preisgeld"},
 {icon:"🏇",name:"Pferderennen",patch:"Release",conf:"medium",ort:"Rennstrecke neben der Breesman Pasture bei Demeniss",start:"Nach Befreiung von Demeniss (ab Kapitel 10) beim Veranstalter an der Tribüne",ablauf:"3 Runden gegen einen NPC-Gegner. Entscheidend ist das Stamina-Management des Pferdes: Sprintphasen mit kurzen Erholungen abwechseln, Innenbahn halten. Verknüpft mit Racing-Challenges wie dem 'Darkhooves Grand Prix'.",belohnung:"Challenge-Fortschritt; konkrete Preise nicht eindeutig belegt"},
 {icon:"🎣",name:"Angeln",patch:"Release",conf:"medium",ort:"Fast alle Gewässer in Pywel (Angel-Icon: blaues Fadenkreuz = möglich)",start:"Mit Angelrute am Ufer L2 halten und zielen",ablauf:"Vier Phasen — Cast, Hook, Fight, Reel: Köder auswerfen und bewegen, beim Anbiss mit R2 anschlagen, die Rute gegen die Schwimmrichtung halten bis der Fisch ermüdet, dann einholen.",belohnung:"Fische für Quests, Kochen und seltene/legendäre Fänge"}
];
const ENEMY_IMGS={
 "Wolf":"https://cdn.questlog.gg/crimson-desert/assets/_sprites/cd_mercenary_portrait_domestic_animal_riding_wolf_1.webp",
 "Bear":"https://cdn.questlog.gg/crimson-desert/assets/_sprites/cd_portraitimage_animal_bear_wild_30048.webp",
 "Boar":"https://cdn.questlog.gg/crimson-desert/assets/_sprites/cd_knowledgeimage_knowledge_wild_boar.webp",
 "Deer":"https://cdn.questlog.gg/crimson-desert/assets/_sprites/cd_portraitimage_animal_deer_wild_30031.webp",
 "Highland Cow":"https://cdn.questlog.gg/crimson-desert/assets/_sprites/cd_portraitimage_animal_hamish_wild_32223.webp",
 "White-Striped Longhorn":"https://cdn.questlog.gg/crimson-desert/assets/_sprites/cd_portraitimage_animal_longhorn_wild_32246.webp",
 "Fox":"https://cdn.questlog.gg/crimson-desert/assets/_sprites/cd_portraitimage_animal_fox_wild_30046.webp",
 "Goat":"https://cdn.questlog.gg/crimson-desert/assets/_sprites/cd_mercenary_portrait_domestic_animal_goat_domestic_30027.webp",
 "Sheep":"https://cdn.questlog.gg/crimson-desert/assets/_sprites/cd_mercenary_portrait_domestic_animal_sheep_domestic_30026.webp",
 "Cow":"https://cdn.questlog.gg/crimson-desert/assets/_sprites/cd_portraitimage_animal_bull_wild_32217.webp",
 "Rhinoceros":"https://cdn.questlog.gg/crimson-desert/assets/_sprites/cd_knowledgeimage_knowledge_rhino.webp",
 "Elephant":"https://cdn.questlog.gg/crimson-desert/assets/_sprites/cd_portraitimage_riding_elephant_1.webp",
 "Hedgehog":"https://cdn.questlog.gg/crimson-desert/assets/_sprites/cd_portraitimage_animal_hedgehog_wild_30045.webp",
 "Wandershrub":"https://cdn.questlog.gg/crimson-desert/assets/_sprites/cd_knowledgeimage_knowledge_naturecreature_rush.webp",
 "Bismuth Oreback Crab":"https://cdn.questlog.gg/crimson-desert/assets/_sprites/cd_knowledgeimage_knowledge_bismuth_landspider.webp",
 "Stoneback Crab":"https://cdn.questlog.gg/crimson-desert/assets/_sprites/cd_knowledgeimage_knowledge_small_landspider.webp",
 "Harpy":"https://cdn.questlog.gg/crimson-desert/assets/_sprites/cd_knowledgeimage_knowledge_harpy.webp",
 "Webbed Spider":"https://cdn.questlog.gg/crimson-desert/assets/_sprites/cd_knowledgeimage_knowledge_web_spider.webp",
 "Heloderma Lizard":"https://cdn.questlog.gg/crimson-desert/assets/_sprites/cd_portraitimage_animal_hila_lizard_wild_30122.webp",
 // Waran: questlog-Slug "goanna" (Goanna = Varanide) — Bild-QA 2026-07-06: eindeutig grosser Waran, passt zum Eintrag (nicht die blaue lizard- noch die frilled_lizard-Variante). HTTP-200-verifiziert.
 "Monitor Lizard":"https://cdn.questlog.gg/crimson-desert/assets/_sprites/cd_knowledgeimage_knowledge_goanna.webp",
 // Krokodil: HTTP-200-verifiziert, Bild-QA 2026-07-06 (In-Game-Screenshot eines Krokodils).
 "Crocodile":"https://cdn.questlog.gg/crimson-desert/assets/_sprites/cd_knowledgeimage_knowledge_crocodile.webp",
 "Ogre":"https://cdn.questlog.gg/crimson-desert/assets/_sprites/cd_knowledgeimage_knowledge_unique_ogre.webp",
 "Bleed Bandits":"https://cdn.questlog.gg/crimson-desert/assets/_sprites/cd_knowledgeimage_node_bleed_ruffians.webp",
 "Fundamentalist Goblins":"https://cdn.questlog.gg/crimson-desert/assets/_sprites/cd_knowledgeimage_faction_reglegoblin.webp",
 "Wolf Trackers":"https://cdn.questlog.gg/crimson-desert/assets/_sprites/cd_knowledgeimage_knowledge_faction_wolfpursuer.webp",
 "Southern Bandits":"https://cdn.questlog.gg/crimson-desert/assets/_sprites/cd_knowledgeimage_knowledge_faction_bandit1.webp",
 "Hornsplitter's Guards":"https://cdn.questlog.gg/crimson-desert/assets/_sprites/cd_knowledgeimage_knowledge_faction_splithornguard.webp",
 "St. Halssius's House of Healing":"https://cdn.questlog.gg/crimson-desert/assets/_sprites/cd_knowledgeimage_faction_halsius.webp",
 "Reed Devil Minions":"https://cdn.questlog.gg/crimson-desert/assets/_sprites/cd_knowledgeimage_knowledge_faction_reeddevil.webp",
 "Dancing Catfish Pirates":"https://cdn.questlog.gg/crimson-desert/assets/_sprites/cd_knowledgeimage_node_piratei.webp",
 "Antumbra Order":"https://cdn.questlog.gg/crimson-desert/assets/_sprites/cd_knowledgeimage_knowledge_faction_antumbra.webp",
 "Bastier's Inquisitors":"https://cdn.questlog.gg/crimson-desert/assets/_sprites/cd_knowledgeimage_node_caliburnclan_ii.webp",
 "Crow Brothers":"https://cdn.questlog.gg/crimson-desert/assets/_sprites/cd_questimage_quest_crowman_boss.webp",
 // Flame Knights: offizielles questlog-Fraktions-Sprite (zeigt die Flame Knights Castle in West-Demeniss,
 // gleiche Konvention wie Dusksong/The Faceless, deren Fraktions-Icons ebenfalls ihre Festung zeigen).
 // HTTP-200-verifiziert und visuell geprueft 2026-07-27.
 "Flame Knights":"https://cdn.questlog.gg/crimson-desert/assets/_sprites/cd_knowledgeimage_faction_flame_knights.webp",
 "Mistwood Hunters":"https://cdn.questlog.gg/crimson-desert/assets/_sprites/cd_knowledgeimage_knowledge_faction_enthunter.webp",
 "Black Bears":"https://cdn.questlog.gg/crimson-desert/assets/_sprites/cd_questimage_quest_mjordin_boss.webp",
 "Lonely Jackals":"https://cdn.questlog.gg/crimson-desert/assets/_sprites/cd_knowledgeimage_knowledge_faction_lonelyjackal.webp",
 "The Wyvernflames":"https://cdn.questlog.gg/crimson-desert/assets/_sprites/cd_knowledgeimage_node_wyvern_tamers.webp",
 "The Helms":"https://cdn.questlog.gg/crimson-desert/assets/_sprites/cd_knowledgeimage_faction_desert_harrier.webp",
 "The Faceless":"https://cdn.questlog.gg/crimson-desert/assets/_sprites/cd_knowledgeimage_node_sacked_fortress.webp",
 "Muiquun Outlaws":"https://cdn.questlog.gg/crimson-desert/assets/_sprites/cd_knowledgeimage_node_crimson_riverruins.webp",
 "Sandfang Marauders":"https://cdn.questlog.gg/crimson-desert/assets/_sprites/cd_knowledgeimage_faction_goblin_riders.webp",
 "Goldenscale Bandits":"https://cdn.questlog.gg/crimson-desert/assets/_sprites/cd_knowledgeimage_node_iguana_riders.webp",
 "Dusksong":"https://cdn.questlog.gg/crimson-desert/assets/_sprites/cd_knowledgeimage_node_isvatufortress.webp",
 "Savage Fangs":"https://cdn.questlog.gg/crimson-desert/assets/_sprites/cd_knowledgeimage_node_crim_stompsandfortruins.webp",
 // Hostile Machines: questlog hat keinen eigenen Sammel-Sprite; Mechanicus Mk.XII (eine von Marnis Kampfmaschinen) als repraesentatives Konstrukt-Bild (HTTP-200-verifiziert, visuell geprueft 2026-06-18).
 "Hostile Machines":"https://cdn.questlog.gg/crimson-desert/assets/_sprites/cd_knowledgeimage_knowledge_mechanicusmk12.webp"
};
const ENEMIES={
 wild:[
  {name:"Wolf",de:"Wolf",region:"Westliches Pywel",drops:"Small Bone, Long Hair Hide, Fine Meat, Fang",note:"Rudeljäger mit hoher Ausdauer und Intelligenz — testet Beute erst auf Schwächen und greift dann koordiniert an. Wird von den Sandfang Marauders als Reittier genutzt."},
  {name:"Bear",de:"Bär",region:"Ganz Pywel außer Crimson Desert",drops:"Large Bone, Thick Hide, Tough Meat, Fang; seltener: Honey, Bear's Gallbladder, Boss Bear Hat, Bear Hide Cloak",tipp:"Wehrt sich beim Farmen massiv — Proviant mitnehmen. Kann geritten, aber nicht dauerhaft gezähmt werden.",note:"Spitzenprädator an der Spitze von Pywels Nahrungskette — trotz niedlicher Optik dominiert er das Ökosystem."},
  {name:"Boar",de:"Wildschwein",region:"Ganz Pywel außer Crimson Desert",drops:"Small Bone, Long Hair Hide, Fine Meat, Fang",note:"Wildschwein mit langen, gebogenen Hauern für Kraftproben gegen Rivalen. Die Savage Fangs reiten Eber als Reittiere."},
  {name:"Deer",de:"Hirsch",region:"Ganz Pywel außer Crimson Desert",drops:"Small Bone, Short Hair Hide, Fine Meat, Long Horn",note:"Nicht aggressives Herdentier und beliebtes Jagdziel — Männchen tragen mehrendige Geweihe."},
  {name:"Fox",de:"Fuchs",region:"Südliche Regionen",drops:"Small Bone, Thin Hide, Lean Meat",note:"Anpassungsfähiger Beutegreifer nahe Siedlungen (stiehlt Vieh); tappt dank seiner Schläue selten in Fallen. Varianten: Snowfield Fox, Desert Fox."},
  {name:"Goat",de:"Ziege",region:"Ganz Pywel",drops:"Small Bone, Short Hair Hide, Fine Meat, Short Horn",note:"Überlebenskünstler in rauen Umgebungen — liefert Milch, Fleisch, Wolle und Leder."},
  {name:"Sheep",de:"Schaf",region:"Ganz Pywel",drops:"Small Bone, Short Hair Hide, Fine Meat, Short Horn, Fleece",note:"Wichtigstes Nutztier der Bewohner Pywels — einzige Wildtier-Quelle für Fleece (Skinning)."},
  {name:"Cow",de:"Kuh/Stier",region:"Ganz Pywel",drops:"Large Bone, Short Hair Hide, Tender Meat, Short Horn",note:"Häufigstes Nutztier — muskulöses Zug- und Arbeitstier mit markanten Hörnern."},
  {name:"Highland Cow",de:"Hochlandrind",region:"Pailune, Hernand",drops:"Large Bone, Short Hair Hide, Tender Meat, Short Horn",note:"Rinderrasse mit langen Stirnfransen; das dichte, wellige Fell schützt gegen Kälte. Trotz langer Hörner sanftmütig und daher beliebtes Nutztier. Eigener Knowledge-Eintrag; kein registrierbarer Mount (Audit 23.08.2026)."},
  {name:"White-Striped Longhorn",de:"Weißgestreiftes Langhorn",region:"Pailune",drops:"Large Bone, Short Hair Hide, Tender Meat, Short Horn",note:"Bovine mit auffällig gebogenen Hörnern und leuchtend weißen Streifen im Fell; wehrt sich gegen Raubtiere mit Hornstößen. Eigener Knowledge-Eintrag; kein registrierbarer Mount (Audit 23.08.2026)."},
  {name:"Rhinoceros",de:"Nashorn",region:"Crimson Desert",drops:"Large Bone, Thick Hide, Tough Meat, Ivory",note:"Einzelgänger mit panzerartiger Haut, aber empfindlichem Gemüt — schützt sich mit Schlamm vor der Sonne. Ivory-Quelle."},
  {name:"Elephant",de:"Elefant",region:"Demeniss (Wildlife Park)",drops:"Large Bone, Thick Hide, Tough Meat, Ivory",note:"Sanftes, hochintelligentes Großtier aus einem fernen Land — erinnert sich an Orte und erkennt Menschen wieder."},
  {name:"Hedgehog",de:"Igel",region:"Hernand",drops:"Small Bone, Thin Hide, Lean Meat",tipp:"Der Golden Apple Hedgehog (u.a. bei Grey Rock Dock) trägt sichtbar einen Goldenen Apfel — Zutat fürs Gold-Barren-Crafting bei den Hexen (1 Golden Apple + 3 Gold Ores).",note:"Klein, aber durch dichte Stacheln gut geschützt; beim Dauerfressen bleiben Früchte auf den Stacheln hängen — daher die Apple-/Mushroom-/Grape-/Orange-Varianten."}
 ],
 kreaturen:[
  {name:"Wandershrub",de:"Wandershrub",region:"Pywel (u.a. Haunted Hill)",drops:"Core-Drops: Swift I, Haste I, Ascent I (selten); Stein-Variante: Abyss Cell (Chance)",tipp:"Perfekt getarnt als Gestrüpp — lauert reglos und stürmt im letzten Moment los. Die große Blitz-Variante greift mit Elektrizität an; auf Haunted Hill bewachen sie den Abyss Nexus.",note:"Pflanzenwesen in Klein/Groß- sowie Dry- und Lightning-Varianten."},
  {name:"Bismuth Oreback Crab",de:"Bismut-Erzrücken-Krabbe",region:"Crimson Desert; Farm-Spot: Drakesfall Castle (N von Hernand)",drops:"Bismuth Ore (100%), Abyss Cell (30%), Destruction I/Insight I (selten)",tipp:"Tarnt sich als unscheinbarer Metall-/Erzklumpen am Boden — zuerst mit Force Palm (R3) enttarnen, dann wird sie feindlich und angreifbar. Kontaktschaden ist nicht zu unterschätzen, Heil-Food mitnehmen. Beste frühe Abyss-Cell-Farmquelle: Drakesfall Castle (N von Hernand, am Drakesfall Gorge, nahe Abyss-Schnellreisepunkt). Nur die kleinen Krabben killen — große töten lässt Hernands Soldaten das Gebiet besetzen und stoppt das Respawnen. Zum Respawnen wegreisen und zurück-schnellreisen oder am Lagerfeuer rasten.",note:"Züchtet Bismutkristalle auf dem Panzer — Rüstung und Waffe zugleich, bei Sammlern begehrt."},
  {name:"Stoneback Crab",de:"Steinrücken-Krabbe",region:"Pywel-weit (auch Wüsten-Varianten)",drops:"Iron Ore (100%), Abyss Cell (30%), Destruction I/Insight I (selten)",note:"Trägt Steine verschiedener Größen auf dem Panzer und tauscht sie mit Artgenossen gegen besser passende; Varianten Klein/Mittel/Groß bis zur Queen Stoneback Crab."},
  {name:"Harpy",de:"Harpyie",region:"Pailune (Karanda-Gebiet)",drops:"Harpy Feather (50%)",note:"Fliegende Kreatur mit Frauenkopf und Vogelschwingen — verfolgt Eindringlinge ins Nest unerbittlich, sehr schnell, durchdringender Schrei. Auch als Shadow Harpy."},
  {name:"Webbed Spider",de:"Netzspinne",region:"Hernand (Queen-Spider-Nester)",drops:"Spider Web (100%), Acidic Spider Venom (20%)",note:"Komplett in klebrige Netze gehüllt — verlangsamt Beute und fängt Angreifer; Varianten: Acid Spider, Golden Silk Spider, Queen Spider (Boss)."},
  {name:"Heloderma Lizard",de:"Heloderma-Echse",region:"Crimson Desert, Hernand",drops:"Small Bone, Lean Meat",note:"Auffällig schwarz-orange gemusterte Echse trockener Regionen; verbringt die heißen Stunden im Bau. Verwandte: Monitor Lizard, Frilled-Neck Lizard."},
  {name:"Monitor Lizard",de:"Waran",region:"Demeniss (Norden) u.a.; auch Forebearer's Barrens (NO Hernand)",drops:"Sturdy Hide, Bones, Poison",conf:"medium",note:"Großer Waran, eigenständig von der Heloderma-Echse. Beliebteste Poison-Farmquelle (mehrere Poison je Tier, schneller Respawn außerhalb der Render-Reichweite) und zugleich Lieferant für Sturdy Hide."},
  {name:"Crocodile",de:"Krokodil",region:"Flüsse östlich/nördlich von Delesyia; östlich von Demeniss",drops:"Sturdy Hide, Large Bone, Tough Meat",conf:"medium",note:"Wasser-Reptil und kanonische Sturdy-Hide-Quelle (eine der fünf Pflicht-Hautarten der Hunting Challenges). Das legendäre White-Scaled Crocodile (nördlich Delesyia) ist Jagdziel der Challenge 'The End of Myth' (Challenge 10)."},
  {name:"Ogre",de:"Oger",region:"Crimson Desert (versiegelt)",drops:"—",note:"Kolossales, rätselhaftes Monster der Wüste — fertigt sich Kleidung aus Tierhäuten, besitzt also eine gewisse Intelligenz. Herkunft und Zweck unbekannt; Ogre's-Items (Necklace/Ring) stammen aus anderen Quellen."},
  {name:"Hostile Machines",de:"Feindliche Maschinen",region:"Delesyia (um Marnis Labor, SO der Stadt)",drops:"Cogwheel, Small Battery",conf:"medium",note:"Maschinen-Konstrukte, die auf Nah- und Ferndistanz kämpfen. Cogwheels braucht man u.a. für Kuku-Items aus Grimnirs Werkstatt in Hernand."}
 ],
 fraktionen:[
  {name:"Bleed Bandits",region:"Hernand",drops:"Cloth Piece, Pelt, Fleece (Chance)",note:"Bewaffnete Banditen, die Hernand in Angst versetzen: Sie machen Opfer mit der Albtraum-Droge Dreamer's Bliss abhängig und versklaven sie — gestützt von einem mächtigen Hintermann im Schatten. [1.13.00: Alchemy Explosive Pack verliert jetzt bei jeder Bombenbeschwörung Haltbarkeit.]"},
  {name:"Fundamentalist Goblins",region:"Hernand",drops:"Iron Ore, Copper Ore, Fleece, Small Bone; selten: Regglin Plate Helm, Silver Bullet",note:"Goblin-Gelehrte, kaum besser als gewöhnliche Diebe — forschen ohne Skrupel und schrecken vor unmenschlichen Taten nicht zurück; etablierte Institute erkennen sie nicht an."},
  {name:"Wolf Trackers",region:"Hernand",drops:"Iron Ore, Copper Ore, Fleece, Small Bone",note:"Schlacht-besessene Jägerbande — keine Jäger, die der Natur danken, sondern Schlächter auf der Suche nach immer aufregenderer Beute, aktuell dem legendären Wolf. Blockieren mehrere Posten und Minen in Hernand."},
  {name:"Southern Bandits",region:"Hernand (Süden, Lager bei Fort Anvil)",drops:"Iron Ore, Copper Ore, Fleece, Poison Arrow, Mask, Liquor Bottle",note:"Gewöhnliche Wegelagerer, die Händler und Reisende aus dem Hinterhalt überfallen — weniger berüchtigt als Bleed Bandits oder Fundamentalist Goblins."},
  {name:"Hornsplitter's Guards",region:"Hernand",drops:"Bounty Hunter's Cloth Armor, Varnian Equipment Blueprint, Gunpowder (Chance)",note:"Die persönliche Elitegarde von Kailok the Hornsplitter (Goldleaf-Handelsgilde) — nur seine vertrautesten Leute, bereit, jeden Preis für seine Interessen zu zahlen."},
  {name:"St. Halssius's House of Healing",region:"Hernand",drops:"Decent Copper Pouch, Bread, Cloth Piece, Thin Hide",note:"Einst eine Heilanstalt für psychisch Kranke, heute faktisch ein Gefängnis: Statt Patienten werden vor allem 'ideologisch Unreine' aus Demeniss weggesperrt; Besuche sind verboten."},
  {name:"Reed Devil Minions",region:"Hernand (Schilffelder, Sunset Valley)",drops:"Hay, Battered Grains, Cloth Piece, Thin Hide",tipp:"Stehen immer wieder auf, egal wie oft man sie niederstreckt — es sind böse Geister in Vogelscheuchen-Körpern.",note:"Diener des Reed Devil (Boss). Für die Kranken von Sunset Valley paradoxerweise ein Hoffnungssymbol."},
  {name:"Dancing Catfish Pirates",region:"Hernand/Delesyia (Küsten)",drops:"Iron Ore, Fleece, Copper Ore, Cogwheel, Small Battery; selten: A.T.A.G. Plating Mk III",note:"Skrupellose Piratencrew, die ihren aus Menschenexperimenten hervorgegangenen Anführer Sir Catfish fanatisch verehrt — Wracks und Opfer an fast jeder Küste Pywels."},
  {name:"Antumbra Order",region:"Ganz Pywel",drops:"Cloth Piece, Thin Hide; selten: Sword of Greed, Greymane Leather Helm",note:"Dunkler Kult, der Licht und Leben lästert und die Finsternis mit Menschenopfern verehrt — Heiligtümer in ganz Pywel; verspricht 'Gleichheit und Freiheit durch Dunkelheit'."},
  {name:"Bastier's Inquisitors",region:"Demeniss",drops:"Iron Ore, Copper Ore, Fleece, Captive's Cloth Armor; Kampfhunde: Small Bone, Long Hair Hide, Fang",note:"Das einst gegen Korruption gegründete Righteous Tribunal, degeneriert zu Bastiers Machtinstrument — verfolgt heute das Volk, statt es zu schützen."},
  {name:"Crow Brothers",region:"Demeniss",drops:"Cloth Piece, Thin Hide; selten: Greymanes' Leather Armor",note:"Anhänger von Draven, dem Crowcaller — lernen seine Tötungstechniken, erhalten einen Teil seiner Macht und wirken finstere Magie; gieren ständig nach der Anerkennung ihres Meisters."},
  {name:"Flame Knights",region:"Demeniss (Flame Knights Castle, West)",drops:"—",note:"Feuerbesessene Ritter unter der Schirmherrschaft von Lucian Bastier, die die Flame Knights Castle im Westen von Demeniss besetzen — kämpfen mit feuergetränkten Waffen und Schießpulver; kommandiert vom optionalen Boss Tristan the Flame Knight. [1.13.00: neue Spezialangriffe erhalten — Details noch nicht dokumentiert.]"},
  {name:"Mistwood Hunters",region:"Pailune (Wayward Woods)",drops:"Sleep Arrow, Bundle of Arrows, Packaged Salt, Cloth Piece",note:"Wilderer, die die Waldgeister der Wayward Woods zu Geld machen — jagen alles, was sich bewegt, und stürzen die Ordnung des Waldes ins Chaos."},
  {name:"Black Bears",region:"Pailune (Ashclaw Keep u.a.)",drops:"Cogwheel, Lubricant; selten: Crimson Banquet Helm Blueprint, Small Staglord Banner Pike",note:"Myurdins Fraktion — einst neben den Greymanes eine der stärksten Kampftruppen Pailunes, ermordete feige Jian und zerschlug die Greymanes; Belagerungsmaschinen und Lava Bears im Arsenal."},
  {name:"Lonely Jackals",region:"Pailune (Hauptstadt)",drops:"Decent Copper Pouch, Beer, Golden Beer, Jerky, Arrow",note:"Ludvigs Fraktion — lebte einst neben den Greymanes, schwor nach deren Vertreibung den Black Bears die Treue und unterdrückt seither rücksichtslos die Bevölkerung der Hauptstadt."},
  {name:"The Wyvernflames",region:"Delesyia (Windridge Fortress)",drops:"Gunpowder, Bundle of Bullets, Cloth Piece; selten: Sonic Resonator, Gear Blueprint: Spirit's Judgment",note:"Fremde Invasoren in ausländischer Tracht, die plötzlich in Dewhaven auftauchten — massakrieren oder versklaven Bewohner und befehligen mehrere Wyvern. [1.13.00: neue Spezialangriffe erhalten — Details noch nicht dokumentiert.]"},
  {name:"The Helms",region:"Crimson Desert (Raids bis Demeniss/Delesyia)",drops:"Abyss Cell, Sealed Abyss Artifact, Bundle of Bullets, Destruction I; Hyänen: Small Bone, Fang",note:"Der bösartigste Stamm der Wüste — der gesamte Stamm operiert als eine einzige Banditenbande und baut aus gestohlener Technik massive Kriegsmaschinen."},
  {name:"The Faceless",region:"Crimson Desert",drops:"Bulging Copper Pouch, Wine, Cheese; selten: Abyss Artifact Fabricator",note:"Maskierte Banditen in auffälligen Kampfroben, die an sich selbst statt an Götter glauben — reden von 'Befreiung', leben aber schlicht von Plünderung."},
  {name:"Muiquun Outlaws",region:"Crimson Desert (Muiquun)",drops:"Bulging Copper Pouch, Wine, Cheese, Cloth Piece",note:"Verbannte, Berüchtigte und Ausgestoßene, die sich in der Wüste zusammengeschlossen haben — in Muiquun zählen weder Name noch Vergangenheit, nur die Stärke zu überleben."},
  {name:"Sandfang Marauders",region:"Crimson Desert (größtes Territorium)",drops:"Bundle of Arrows, Heavy Copper Pouch (Chance)",note:"Die berüchtigtste Banditengruppe der Wüste, organisiert um Goblins, die wilde Wölfe zähmen und reiten — ihr Ziel: die Crimson Desert zu einen und ein eigenes Königreich zu errichten."},
  {name:"Goldenscale Bandits",region:"Crimson Desert",drops:"Iron Ore, Copper Ore, Bundle of Bullets; selten: Gear Blueprint: Frostward, Kite Shield, Diver's Machine Knuckledrill",note:"Zwerge in Ganzkörperrüstung auf Riesenleguanen — schnell unterwegs, leben von Überfällen auf Handelswaren; andere Banden belächeln sie als kleine Diebe. [1.13.00: neue Spezialangriffe erhalten — Details noch nicht dokumentiert.]"},
  {name:"Dusksong",region:"Crimson Desert (Isvatu-Festung)",drops:"Cloth Piece; selten: Groundsurge, Counterweight Leather Gloves, Autumn Banquet Leather Armor",note:"Banditen aus Musketen-Deserteuren — als Berufssoldaten ausgebildet, wenige, aber mit gestohlenen Armeewaffen verheerend effektiv; desertierten vermutlich nach Verbrechen."},
  {name:"Savage Fangs",region:"Crimson Desert (Feuchtgebiete)",drops:"Honey Tea, Thin Hide, Bulging Copper Pouch; selten: Ancient Shell Ring",note:"Nomadische Eberreiter, viele aus dem friedlichen Trolldorf Kharonso — müssen ihre Reit-Eber tränken und beanspruchen darum ein riesiges Gebiet samt Feuchtgebieten; wachsen rasant. [1.13.00: neue Spezialangriffe erhalten — Details noch nicht dokumentiert.]"}
 ]
};
const BEST_PH_PAL={
  wild:['#15110a','rgba(201,162,39,.45)','rgba(201,162,39,.6)'],
  kreaturen:['#0b0e12','rgba(74,138,202,.45)','rgba(120,170,220,.66)'],
  fraktionen:['#160a0a','rgba(180,45,32,.45)','rgba(210,80,70,.66)']
};
const NPC_PAL={
  companions:['linear-gradient(135deg,#1a1407,#0c0c0c)','rgba(201,162,39,.5)','#d9b441'],
  allies:['linear-gradient(135deg,#0b1410,#0c0c0c)','rgba(90,170,120,.45)','#7fc99a'],
  antagonists:['linear-gradient(135deg,#160a0a,#0c0c0c)','rgba(180,45,32,.5)','#d2554a'],
  merchants:['linear-gradient(135deg,#0b1014,#0c0c0c)','rgba(70,140,170,.45)','#6fb3cf']
};
const QLG='https://cdn.questlog.gg/crimson-desert/assets/_sprites/cd_knowledgeimage_knowledge_';
const NPC_IMGS={
  "Kliff":"cd_assets/npcs/kliff.webp",
  "Damiane":"cd_assets/npcs/damiane.webp",
  "Oongka":"cd_assets/npcs/oongka.webp",
  "Carl":"cd_assets/npcs/carl.webp",
  "Andrew":"cd_assets/npcs/andrew.webp",
  "Alan Serkis":"cd_assets/npcs/alan_serkis.webp",
  "Shakatu":"cd_assets/npcs/shakatu.webp",
  "Charles Celeste":"cd_assets/npcs/charles_celeste.webp",
  "Jian":"cd_assets/npcs/jian.webp",
  "Marius":"cd_assets/npcs/marius.png",
  "Ross":"cd_assets/npcs/ross.webp",
  "Brice":"cd_assets/npcs/brice.webp",
  "Myurdin":"cd_assets/npcs/myurdin.webp",
  "Kailok the Hornsplitter":"cd_assets/npcs/kailok.webp",
  "Ludvig":"cd_assets/npcs/ludvig.webp",
  "Gabriel Caliburn":"cd_assets/npcs/gabriel.webp",
  "Lucian Bastier":"cd_assets/bosses/lucian_bastier.webp",
  "Draven the Crowcaller":"cd_assets/npcs/draven.webp",
  "Walter Lanford":"cd_assets/npcs/walter_lanford.webp",
  "Valgash":"cd_assets/npcs/valgash.webp",
  "Oliver":"cd_assets/npcs/oliver.webp",
  "Ronnie":"cd_assets/npcs/ronnie.webp",
  "Rhett":"cd_assets/npcs/rhett.webp",
  "Patrigio":"cd_assets/npcs/patrigio.webp",
  "Tina":"cd_assets/npcs/tina.webp",
  "Alden":"cd_assets/npcs/alden.webp",
  "Merton":"cd_assets/npcs/merton.webp",
  "Tranan":"cd_assets/npcs/tranan.webp",
  "Barden Middler":"cd_assets/npcs/barden_middler.webp"
};
const NPC_IMGS_CDN={
  "Kliff":QLG+"kliff.webp",
  "Damiane":QLG+"demian.webp",
  "Oongka":QLG+"oongka.webp",
  "Carl":QLG+"greyfur_carl.webp",
  "Andrew":QLG+"greyfur_andrew.webp",
  "Alan Serkis":QLG+"alan_serkis.webp",
  "Shakatu":QLG+"shakatu.webp",
  "Charles Celeste":QLG+"charles_selester.webp",
  "Jian":QLG+"ziane.webp",
  "Marius":"https://static0.fextralifeimages.com/file/crimsondesertgame/c/c2/Marius-npc-crimson-desert-wiki-guide-250px-fix.png",
  "Ross":QLG+"greyfur_russo.webp",
  "Brice":QLG+"greyfur_brice.webp",
  "Myurdin":QLG+"myordin.webp",
  "Kailok the Hornsplitter":QLG+"kailokthehornsplitter.webp",
  "Ludvig":QLG+"ludvig.webp",
  "Gabriel Caliburn":QLG+"caliburn.webp",
  "Lucian Bastier":QLG+"basteer.webp",
  "Draven the Crowcaller":QLG+"draven.webp",
  "Walter Lanford":QLG+"walter_bliss.webp",
  "Valgash":QLG+"valgash.webp",
  "Oliver":QLG+"greyfur_oliver.webp",
  "Ronnie":QLG+"greyfur_ronnie.webp",
  "Rhett":QLG+"rhett.webp",
  "Patrigio":QLG+"patrigio.webp",
  "Tina":QLG+"tina.webp",
  "Alden":QLG+"aldun.webp",
  "Merton":QLG+"merton.webp",
  "Tranan":QLG+"greyfur_tranan.webp",
  "Barden Middler":"https://cdn.questlog.gg/crimson-desert/assets/_sprites/cd_knowledgeimage_knowledge_barden_midler.webp"
};
const NPCS={
  companions:[
    {name:"Kliff",role:"Protagonist · Anführer der Greymanes",region:"Greymane Camp / Hernand",conf:"high",bio:"Erfahrener Greymane-Kämpfer. Nach der Ermordung des Pailune-Anführers Jian durch die Black Bears übernimmt er die Führung und sammelt die verstreuten Mitglieder. Erwacht im 'Realm of Uncertainty' in der Abyss und kehrt mit neuen Kräften zurück."},
    {name:"Damiane",role:"Spielbar (ab Kapitel 3) · Gast des Marquis",region:"Demeniss (Herkunft) / Greymane Camp",conf:"high",bio:"Nachfahrin der zerstörten Familie Spencer, aus Demeniss nach Hernand geflohen. Kämpft mit Rapier, Großschwert und Pistole. Sie ist kein Greymane-Mitglied, sondern Gast des Marquis und bleibt auf Drängen von Marshall Barden Middler zu ihrer Sicherheit bei der Gruppe."},
    {name:"Oongka",role:"Spielbar (nach Kapitel 7) · Greymane-Mitglied",region:"Pailune (Herkunft)",conf:"high",bio:"Ork-Krieger und Kliffs engster Gefährte, bekannt für außergewöhnliche Stärke und eine massive Axt. Wird nach dem Sieg über Myurdin spielbar."}
  ],
  allies:[
    {name:"Carl",role:"Greymane-Mitglied · Versorger/Quartiermeister",region:"Greymane Camp",conf:"high",bio:"Wurde beim Durchwühlen einer Greymane-Tasche erwischt, durfte wegen seines guten Wesens bleiben und verwaltet heute genau die Vorräte, die er stehlen wollte. Ab Kapitel 3 zusammen mit Ross im Camp. Nimmt Spenden für den Ressourcenpool an, verpackt Handelswaren für den Transport und verwahrt Fundsachen. Eigene Commission \u0027Carl\u0027s Request\u0027 (5 Thick Hides zur Totesmith Tannery, Medium Bag)."},
    {name:"Andrew",role:"Greymane-Kämpfer (Axt) · Questgeber im Camp",region:"Greymane Camp / Hernand",conf:"high",bio:"Ruhiger, verlässlicher Axtkämpfer, laut Beschreibung Oongka ebenbürtig; enge Beziehung zu Naira. Erstkontakt außerhalb des Camps in den Reedfield Graves (\u0027Nonhuman\u0027), ab \u0027Hope After the Draught\u0027 im Camp. Vergibt dort die Fraktionsquests \u0027The Greymanes\u0027 New Fangs\u0027 (Belohnung Pet Brown Dog) und \u0027The First Steps of Little Marksmen\u0027. Kein Händler, keine eigene Commission."},
    {name:"Alan Serkis",role:"Marquis von House Serkis",region:"Oakenshield Manor, Hernand",conf:"high",bio:"Weithin respektiert für seinen Einsatz für die Sicherheit der Region. Erster wichtiger Verbündeter — erlaubt Kliff, das Greymane-Lager in Howling Hill aufzubauen."},
    {name:"Shakatu",role:"Trademaster der Goldleaf Merchant Guild",region:"Goldleaf Tradepost, Hernand",conf:"high",bio:"Goblin mit außergewöhnlichem Verstand. Beauftragt Kliff mit der Tötung Kailoks und wird danach selbst Gildenchef; erscheint in mehreren Hauptquests."},
    {name:"Charles Celeste",role:"Herzog · Gouverneur von Hernand Castle",region:"Hernand Castle",conf:"medium",bio:"Leitet House Celeste und ist durch gegenseitiges Vertrauen mit Marquis Alan Serkis verbunden."},
    {name:"Jian",role:"Ehem. Anführer von Pailune (verstorben)",region:"Pailune",conf:"high",bio:"Gütiger, außergewöhnlicher Anführer, von fast allen in Pailune respektiert. Seine Ermordung durch die Black Bears löst die Haupthandlung aus."},
    {name:"Marius",role:"Greymane-Mitglied · Ermittler",region:"Greymane Camp",conf:"high",bio:"Erscheint in der Quest 'Return of the Comrade', in der Kliff ihn zum Greymane-Lager eskortiert."},
    {name:"Ross",role:"Greymane-Mitglied · Personalmanager",region:"Greymane Camp",conf:"medium",bio:"Stationiert im Greymane-Lager und verwaltet die Besatzung der Fraktion."},
    {name:"Brice",role:"Wagenmeister · Base Camp Wagon Management Office",region:"Greymane Camp / Howling Hill",conf:"high",bio:"Wagenmeister der Greymanes; Fextralife beschreibt ihn als Fatalisten, der die Zukunft f\u00fcr unver\u00e4nderlich h\u00e4lt und deshalb oft f\u00fcr einen Pessimisten gehalten wird. Erste Begegnung auf der Glenbright Farm zusammen mit Ronnie und Tranan; danach leitet er in Howling Hill das Base Camp Wagon Management Office und schaltet damit das Handelssystem frei. Seine Commission \u0027Brice\u0027s Request\u0027 schickt Kliff zu Timberturner Wainwright; danach l\u00e4sst sich per Dispatch eines Kameraden mit Engineering-F\u00e4higkeit ein Old, Freight oder Trading Wagon bauen \u2014 ein Wagen fasst deutlich mehr verpackte Handelsg\u00fcter als das Pferd. Belohnung ist ein Medium Bag; die Item-Beschreibung lautet \u0027A medium bag that provides handy room for three extra items\u0027 \u2014 Item-Name und der andernorts genannte Effekt \u0027Inventar +3\u0027 meinen dasselbe, ein Widerspruch besteht nicht. Der Medium Bag ist zudem die Standardbelohnung der Greymane-Requests (auch Eric\u0027s, Oliver\u0027s und Morrow\u0027s Request geben ihn). Quelle: questlog-API + game8."},
    {name:"Barden Middler",role:"Marshall von Hernand",region:"Hernand / Howling Hill",conf:"high",bio:"Treuer Gefolgsmann von Marquis Alan Serkis; als Marshall stellt er die Sicherheit der Bewohner Hernands an erste Stelle. Empfängt Kliff in Kapitel 3 am neuen Greymane-Lager in Howling Hill (Quest 'A Fresh Start') und sorgt dafür, dass die aus Demeniss geflohene Damiane zu ihrer Sicherheit bei den Greymanes bleibt (sie ist Gast des Marquis, kein Greymane-Mitglied). Erscheint zudem in Awestruck, Demenissian Delegation und To the Battlefield."}
  ],
  antagonists:[
    {name:"Myurdin",role:"Hauptantagonist · Anführer der Black Bear Forces",region:"Hills of No Return / Ashclaw Keep",conf:"high",bio:"Grausamer Angreifer mit der Überzeugung, nur die Mächtigen verdienten alles. Ermordete Jian und vernichtete das Greymane-Lager am Nas River; erscheint später als 'Lava Myurdin'."},
    {name:"Kailok the Hornsplitter",role:"Erzwungener Anführer der Goldleaf Merchant Guild",region:"Hernand",conf:"high",bio:"Goblin, der die Gilde mit Gewalt übernahm. Shakatu beauftragt Kliff mit seiner Tötung — ein Boss-Kampf im Spiel."},
    {name:"Ludvig",role:"Anführer der Lonely Jackals",conf:"high",bio:"Barbar mit einer Unterdrückungsphilosophie ähnlich der Myurdins. Verwandelt sich durch verbotene Magie in 'Awakened Ludvig'. Boss."},
    {name:"Gabriel Caliburn",role:"Korrupter Herzog von Demeniss · Oberhaupt House Caliburn",region:"Demeniss",conf:"high",bio:"Kam durch ein Massaker an König Thorels Loyalisten an die Macht; begleitet von seinem Leutnant Lucian Bastier. Erscheint später als 'Corrupted Caliburn' (Kapitel 12). Boss."},
    {name:"Lucian Bastier",role:"Caliburns Leutnant · Anführer der Righteous Inquisitors",conf:"high",bio:"Führt die Inquisitoren und besitzt eine 'Awakened'-Form. Boss."},
    {name:"Draven the Crowcaller",role:"Anführer der Crow Brothers",conf:"high",bio:"Will böse Seelen aus 'Heaven's Gate' freisetzen und führt eine fanatische Gefolgschaft. Boss."},
    {name:"Walter Lanford",role:"Anführer der Bleed Bandits · Adoptivsohn House Lanford",region:"Hernand - Fort Warspike",conf:"high",bio:"Waise, vom Marquis Stefan Lanford adoptiert und als Erbe aufgebaut; aus tiefer Standesunsicherheit verließ er House Lanford und gründete die Bleed Bandits, die nur ihm dienen. Meisterschütze mit Doppellaufgewehr; Boss in der House-Serkis-Questreihe ('Name Written in Blood', Fort Warspike). Drops u.a. Dane Shotgun."},
    {name:"Valgash",role:"Anführer der Ironflame Orcs",region:"Delesyia",conf:"medium",bio:"Kontrolliert die Gorthak-Eisenwerke in Delesyia."}
  ],
  merchants:[
    {name:"Oliver",role:"Camp-Färber (Dyehouse)",region:"Greymane Camp",conf:"high",bio:"Betreibt den Färbestand im Westen von Howling Hill nahe der Farm. Kommt über die Greymane-Reihe \u0027Solid Foundation\u0027 ins Camp, konkret über \u0027A Rumor at the Inksworth Bindery\u0027 — zusammen mit Eric und Connor. Färbt Kleidung und Pferd in bereits gefundene Farben. Eigene Commission \u0027Oliver\u0027s Request\u0027 (3 Rosemary aus den Hernand Highlands, Medium Bag)."},
    // Ronnie am 22.08.2026 nachgetragen (Recherche mit adversarialer Gegenpruefung; Quellen Fextralife, VULKK, game8, camzillasmom, GameRant).
    // Brice steht bei den Verbuendeten und nicht hier, weil er nichts verkauft, sondern das Wagon Management Office fuehrt.
    // Eric bleibt bewusst NICHT eingetragen: Fextralife fuehrt ihn als Dyehouse-Betreiber, game8 als Barbier mit anderem Freischaltweg
    // — echter Widerspruch zwischen zwei etablierten Quellen, nicht durch Vermutung aufloesbar.
    {name:"Ronnie",role:"Koch & Food-Shop-Händler (Greymane-Camp)",region:"Greymane Camp / Howling Hill",conf:"high",bio:"Koch der Greymanes; laut seiner Spielbeschreibung tr\u00e4gt er die volle Verantwortung f\u00fcr die Verpflegung und hat zuletzt einen Jungen namens Jonny als Lehrling angenommen. Erste Begegnung auf der Glenbright Farm zusammen mit Brice und Tranan; danach betreibt er im Camp den Base Camp Food Shop am Lagerfeuer. Sein Stand vereint die Funktionen von Grocer, Butcher und Taverne und l\u00e4sst sich \u00fcber einen Handelsvertrag von Dahlia erweitern. Eigene Commission \u0027Ronnie\u0027s Request\u0027: nach Carl\u0027s und Ross\u0027s Request 5\u00d7 Marbled Meat f\u00fcr ein Fest, Belohnung Medium Bag plus Trust- und Contribution-EXP. Beim Umzug nach Pailune ersetzt das Special Cooking Tool seinen Kochtopf (nur bei VULKK belegt). Nicht zu verwechseln mit Ronald, einem eigenen NPC mit eigener Request."},
    {name:"Rhett",role:"Waffen- & Ausrüstungshändler ('The Artist of Iron')",region:"Hernand Equipment Shop",conf:"high",bio:"Verkauft Waffen und Ausrüstung in Hernand."},
    {name:"Patrigio",role:"Geheimer Wanderhändler",region:"Hernand (nachts, zufällig)",conf:"high",bio:"Nachts schwer auffindbarer Händler mit besonderen Waren; erscheint u.a. westlich des Kilnden Workshop und nahe der Springtide Mill."},
    {name:"Tina",role:"Schneiderin",region:"Hernand Tailor's Shop",conf:"high",bio:"Betreibt den Schneiderladen in Hernand."},
    {name:"Alden",role:"Allgemeinhändler",region:"Hernand Provisioner's Shop",conf:"high",bio:"Verkauft Verbrauchsgüter und Vorräte in Hernand."},
    {name:"Merton",role:"Stallhalter",region:"Hernand Stable",conf:"high",bio:"Betreut die Ställe in Hernand."},
    {name:"Tranan",role:"Ausrüstungshändler (Greymane-Mitglied)",region:"Greymane Camp",conf:"high",bio:"Verkauft Ausrüstung direkt im Greymane-Lager."}
  ]
};
