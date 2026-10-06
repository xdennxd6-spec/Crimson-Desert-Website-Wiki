// Crimson-Desert-Wiki — Datenbestand, am 23.08.2026 aus index.html ausgelagert.
// REIHENFOLGE IST TRAGEND: Bloecke referenzieren frueher definierte (TDZ) — nicht umsortieren,
// Datei laedt als klassisches Script-Tag (src) VOR dem Hauptscript in index.html.
// Enthaelt: PATCHES, MINIGAMES, ENEMY_IMGS, ENEMIES, BEST_PH_PAL, NPC_PAL, QLG, NPC_IMGS, NPC_IMGS_CDN, NPCS
const PATCHES=[
  {ver:"2.03.02",date:"23.09.2026",size:"Dritter Patch innerhalb einer Woche und zweiter Hotfix auf 2.03.00, drei Fehlerbehebungen unter der einzigen Überschrift Patch-Details. Veröffentlicht am 23.09.2026 um 04:45 UTC (boardNo 133). Einer der drei Punkte, die fehlenden Kartensymbole, stand erst zwei Tage zuvor neu auf der offiziellen Liste bekannter Probleme.",features:[
    {cat:"Patch-Details",items:[
      "<b>Grimnir</b> erschien unter bestimmten Umständen während der Quest <b>„The Mysterious Pot“</b> (deutsch „Der geheimnisvolle Topf“) nicht — behoben. <span style='color:var(--gdim)'>Einordnung: Dieselbe Quest aus der Kilnden-Werkstatt stand schon in früheren Patches mehrfach auf der Fehlerliste, siehe unten.</span>",
      "Die <b>Symbole neu entdeckter Objekte</b> wurden in einigen Regionen nicht auf der Karte angezeigt — behoben. <span style='color:var(--gdim)'>Einordnung: Pearl Abyss hatte genau diesen Fehler bis zum 21.09.2026 neu in die Liste bekannter Probleme aufgenommen. Die Liste trägt weiterhin den Stand 21.09.2026, 14:00 UTC (Abruf 01.10.2026) und führt ihn deshalb noch.</span>",
      "Im Abyss <b>„Ether Rest“</b> (deutsch „Äthersruh“) wurde der <b>Energiekern</b> nicht erkannt, der Fortschritt war blockiert — behoben. <span style='color:var(--gdim)'>Einordnung: Die englische Fassung spricht von einem Kern, die deutsche von mehreren.</span>"
    ]},
    {cat:"Plattformen und Quelle",items:[
      "Steam (PC), Steam (Mac), PlayStation, XBOX und Epic Games Store: <em>Patch jetzt verfügbar</em>. Mac App Store: <em>in Vorbereitung</em>. Keine Downloadgröße, keine Build-Nummer.",
      "Quelle: offizielle Patch-Notizen Version 2.03.02, Pearl Abyss, 23.09.2026 04:45 UTC (boardNo 133), deutsche und englische Fassung gegengeprüft."
    ]}
  ]},
  {ver:"2.03.01",date:"21.09.2026",size:"Erster Hotfix auf 2.03.00, drei Fehlerbehebungen unter der einzigen Überschrift Patch-Details: Laternenzielen mit geänderter Controllerbelegung, das Duo-Minispiel in Tommaso und ein Absturz bei NPC-Interaktionen. Veröffentlicht am 21.09.2026 um 14:00 UTC (boardNo 132).",features:[
    {cat:"Patch-Details",items:[
      "Wurde die Taste für das <b>Laternenzielen</b> in der Controller-Anpassung geändert, funktionierte die Aktion mit der neuen Taste nicht — behoben.",
      "In <b>Tommaso</b> erschienen die NPCs für <b>Duo</b> (deutsch „Zweiblatt“) nicht, das Minispiel war dort nicht spielbar — behoben. <span style='color:var(--gdim)'>Einordnung: Damit belegen die Notes Tommaso als weiteren Duo-Ort; die Minispiel-Übersicht ist entsprechend ergänzt.</span>",
      "Das Spiel stürzte in bestimmten Situationen bei der <b>Interaktion mit NPCs</b> ab — behoben."
    ]},
    {cat:"Plattformen und Quelle",items:[
      "Steam (PC), Steam (Mac), PlayStation, XBOX und Epic Games Store: <em>Patch jetzt verfügbar</em>. Mac App Store: <em>in Vorbereitung</em>. Keine Downloadgröße, keine Build-Nummer.",
      "Quelle: offizielle Patch-Notizen Version 2.03.01, Pearl Abyss, 21.09.2026 14:00 UTC (boardNo 132), deutsche und englische Fassung gegengeprüft."
    ]}
  ]},
  {ver:"2.03.00",date:"18.09.2026",size:"Patch 2.03.00 bringt 21 Punkte in sieben Bereichen: zwei Neuerungen für Wasserlauf (Springen, mit Vaporwalker auch Rutschen), die Kamerafunktion „Präzise Bewegung“ im Foto-Modus, Silberbündel beim Neustart mit übernommenem Spielstand, DLSS Ray Reconstruction mit dem neuesten Transformer-Modell und eine Reihe von Fehlerbehebungen, darunter zu schnelle Gegnerpferde im Pferderennen und übersprungene Wartezeiten bei Missionen. Veröffentlicht am 18.09.2026 um 01:00 UTC (boardNo 131); in US-Pazifikzeit (18:00 Uhr) war es noch der 17.09., den auch MP1st nennt („Brings Bug Fixes on September 17“); die offizielle Übersicht zeigt kein Datum. Die Notes selbst fassen ihn als „verschiedene Bugs behoben und Stabilisierungsarbeiten“ zusammen.",features:[
    {cat:"Inhalt",items:[
      "Beim <b>Start eines neuen Spiels mit Übernahme bestehender Speicherdaten</b> wird Silber ab 1.000 Stück nun als stapelbares <b>Silberbündel</b> gutgeschrieben. <span style='color:var(--gdim)'>Einordnung: Die Notes nennen weder die Stückelung der Bündel noch, was mit Beträgen unter 1.000 geschieht.</span>",
      "Im <b>Foto-Modus</b> gibt es die neue Funktion <b>„Präzise Bewegung“</b> (englisch <em>Precise Movement</em>) für eine feinere Kamerasteuerung. <span style='color:var(--gdim)'>Einordnung: nach der Kameraneigung aus 2.01.00 die zweite Foto-Modus-Erweiterung in zwei Wochen.</span>",
      "Gegnerische Pferde bewegten sich im <b>Pferderennen</b> zu schnell — behoben.",
      "Bestimmte <b>Missionen mit Wartezeit</b> ließen sich sofort fortsetzen — behoben. <span style='color:var(--gdim)'>Einordnung: Wer die Wartezeit bisher überspringen konnte, muss jetzt regulär warten. Welche Missionen betroffen waren, nennen die Notes nicht.</span>",
      "<b>Kampf-Entsendungen</b> wurden abgebrochen, wenn nach dem Entsenden gespeichert und neu geladen wurde — behoben.",
      "Der Aushang <b>„Lumberjacks' Witness Report“</b> (deutsch „Sichtung eines Holzfällers“) erscheint nun weiterhin, solange er nicht gelesen wurde.",
      "Beim erneuten Versuch der Quest <b>„Shadowed Secrets“</b> (deutsch „Geheimnisse in der Dunkelheit“) erschien der Guide-NPC an der falschen Stelle — behoben."
    ]},
    {cat:"Steuerung",items:[
      "Das <b>QTE nach dem Packen durch einen Bären</b> verhielt sich je nach gedrückter Taste unterschiedlich — behoben.",
      "Die Taste für die <b>Fähigkeitsdetails</b> in der Stall- und Haustier-Verwaltung wurde geändert. <span style='color:var(--gdim)'>Die Notes nennen die neue Belegung nicht.</span>",
      "Während der Quest <b>„Investigate the mysterious voice“</b> (deutsch „Gehe der geheimnisvollen Stimme nach“) ließ sich der Charakter nicht mehr steuern — behoben.",
      "Beim Benutzen bestimmter Gegenstände <b>im Sattel</b> fror der Charakter ein — behoben."
    ]},
    {cat:"Kampf / Aktion",items:[
      "Während <b>Water Stride</b> (Wasserlauf) kann nun gesprungen werden. <span style='color:var(--gdim)'>Einordnung: Der Name ist hier erstmals offiziell belegt (deutsch „Wasserlauf“). In den Notes zu 2.00.00 steht er nicht; Community-Quellen führen die Fähigkeit als eine der acht neuen Kliff-Fähigkeiten aus 2.00.00 (dort teils als Water Slide).</span>",
      "Mit ausgerüsteten <b>Vaporwalker</b>-Schuhen (deutsch „Dunstläufer“) ist während Water Stride nun Rutschen möglich. <span style='color:var(--gdim)'>Einordnung: Die Notes nennen nur diese Bedingung. Ob die Schuhe zuvor schon andere Effekte außerhalb ihrer Werte hatten, geht daraus nicht hervor.</span>",
      "Im Kampf zurückgestoßene Gegner stürzten in bestimmten Situationen nicht von Klippen — behoben.",
      "Beim Absteigen vom <b>A.T.A.G.</b> in der Luft entstand übermäßiger Fallschaden — behoben."
    ]},
    {cat:"UI",items:[
      "Bestimmte UI-Texte <b>zitterten beim Scrollen</b> — behoben. <span style='color:var(--gdim)'>Einordnung: Zitternde UI-Texte standen schon in 2.02.00 auf der Fehlerliste, dort ohne Bezug zum Scrollen.</span>",
      "Einige UI-Texte wurden fehlerhaft dargestellt — behoben."
    ]},
    {cat:"Grafik und Einstellungen",items:[
      "Das <b>NVIDIA Streamline SDK</b> wurde auf Version 2.14.1 aktualisiert. Dadurch nutzt <b>DLSS Ray Reconstruction</b> jetzt das neueste Transformer-Modell."
    ]},
    {cat:"Lokalisierung",items:[
      "Lokalisierungsfehler wurden in allen Sprachen behoben und die allgemeine Qualität verbessert."
    ]},
    {cat:"Sonstiges",items:[
      "<b>Bildrauschen auf Rüstungen</b> fiel in Innenräumen besonders auf — behoben. <span style='color:var(--gdim)'>Einordnung: Derselbe Punkt steht in der englischen Fassung wortgleich schon in 2.02.00. Die deutsche Fassung von 2.02.00 formuliert ihn anders („Körnung … wurde reduziert“). Die Notes erklären nicht, warum er ein zweites Mal behoben werden musste.</span>",
      "Pferde sahen mit bestimmten <b>Rossharnischen</b> unnatürlich aus — behoben."
    ]},
    {cat:"Plattformen und Quelle",items:[
      "Steam (PC), Steam (Mac), PlayStation, XBOX und Epic Games Store: <em>Patch jetzt verfügbar</em>. Mac App Store: <em>in Vorbereitung</em>. Keine Downloadgröße, keine Build-Nummer.",
      "Quelle: offizielle Patch-Notizen Version 2.03.00, Pearl Abyss, 18.09.2026 01:00 UTC (boardNo 131), deutsche und englische Fassung gegengeprüft."
    ]}
  ]},
  {ver:"2.02.00",date:"11.09.2026",size:"Patch 2.02.00 bringt Cross-Save für Mac sowie zwölf Fehlerbehebungen in sechs Bereichen. Veröffentlicht am 11.09.2026 um 05:30 UTC (boardNo 130). Zum Veröffentlichungszeitpunkt stand er für Steam (PC/Mac), PlayStation, XBOX und Epic bereit; der Mac App Store war noch in Vorbereitung. Nachtrag 01.10.2026: Die offizielle Seite führt inzwischen auch den Mac App Store mit <em>Patch jetzt verfügbar</em>. Im Mac App Store selbst ist die zugehörige Version 2.0.8 („adds the cross-save feature for Mac“) laut Apple seit dem 16.09.2026 (02:16 UTC) verzeichnet; wann Pearl Abyss die Seite umgestellt hat, ist nicht belegt. Die Notes nennen keine Downloadgröße und keine Build-Nummer.",features:[
    {cat:"Neue Funktion",items:[
      "[Mac] <b>Cross-Save</b> wurde hinzugefügt. <span style='color:var(--gdim)'>Die Notes erläutern weder Voraussetzungen noch den genauen Umfang der Übertragung.</span>"
    ]},
    {cat:"Inhalt",items:[
      "Beim Anleuchten eines <b>NPCs mit der Laterne</b> wurden dessen Besitzgegenstände nicht sichtbar — behoben.",
      "Die <b>Wohnfunktion</b> wurde nicht freigeschaltet, wenn das Banner im <b>Howling-Hill-Camp</b> bei vollem Inventar aufgestellt wurde — behoben.",
      "<b>Thornbriar Fortress</b> (deutsch „Dornwallfestung“) ließ sich nicht befreien — behoben.",
      "Nach dem Laden bestimmter Spielstände verschwanden vereinzelt Gegenstände aus dem <b>Handelswarenlager</b> — behoben.",
      "Während <b>„The Words of Alustin“</b> (deutsch „Alustins Worte“) verschwand unter bestimmten Umständen der Brief und blockierte den Questfortschritt — behoben."
    ]},
    {cat:"Steuerung",items:[
      "Das Verketten von <b>„Descending Force Palm“</b> nach <b>„Aerial Force Palm“</b> funktionierte in bestimmten Situationen nicht korrekt — behoben. <span style='color:var(--gdim)'>Einordnung: Die deutsche Fassung schreibt „Kraftfaust: Springen“ zu „Kraftfaust: Abtauchen“; die Zuordnung zu den englischen Namen folgt nur der Reihenfolge im Satz; die questlog-Spieldaten (Skill 10373) bestätigen sie inzwischen. Community-Quellen führen Descending Force Palm als eine der acht neuen Kliff-Fähigkeiten aus 2.00.00, die Notes zu 2.00.00 nennen keine Namen.</span>"
    ]},
    {cat:"UI",items:[
      "UI-Texte wirkten in bestimmten Situationen <b>zitternd</b> — behoben."
    ]},
    {cat:"Grafik und Einstellungen",items:[
      "Beim Start eines neuen Spiels mit aktivierter <b>DLSS Frame Generation</b> konnte das Spiel abstürzen — behoben."
    ]},
    {cat:"Lokalisierung",items:[
      "Lokalisierungsfehler wurden in allen Sprachen behoben und die allgemeine Qualität verbessert.",
      "Bestimmter <b>arabischer Text</b> wurde nicht korrekt angezeigt — behoben."
    ]},
    {cat:"Sonstiges",items:[
      "Auf Rüstung war <b>Bildrauschen</b> in Innenräumen besonders auffällig — behoben. <span style='color:var(--gdim)'>Einordnung: Die deutsche Fassung schreibt hier, die Körnung sei „reduziert“ worden; die englische meldet den Punkt als behoben. In 2.03.00 steht er erneut.</span>",
      "Kliffs Erscheinung wirkte mit der <b>Crow Cloth Blindfold</b> (deutsch „Krähen-Stoffaugenbinde“) bei bestimmten Einstellungen unnatürlich — behoben."
    ]},
    {cat:"Plattformen und Quelle",items:[
      "Steam (PC), Steam (Mac), PlayStation, XBOX, Epic Games Store und Mac App Store: <em>Patch jetzt verfügbar</em> (Stand 01.10.2026). Der Mac App Store stand zur Veröffentlichung noch auf <em>in Vorbereitung</em>, siehe oben. Keine Downloadgröße, keine Build-Nummer.",
      "Quelle: offizielle Patch-Notizen Version 2.02.00, Pearl Abyss, 11.09.2026 05:30 UTC (boardNo 130); Beitragskopf und Plattformstatus beider Sprachfassungen am 01.10.2026 abgeglichen."
    ]}
  ]},
  {ver:"2.01.00",date:"04.09.2026",size:"Erster Inhalts-Patch nach dem Enhanced-Umbau, Release 04.09.2026 04:20 UTC (boardNo 128). Die Notes fassen ihn selbst als „verschiedene Fehlerbehebungen und Maßnahmen zur Stabilisierung“ zusammen, das untertreibt aber: von den 35 Punkten in sechs Kategorien sind 27 als „Es wurde ein Problem behoben“ formuliert (Zählweise der deutschen Fassung; die englische kommt mit „Fixed“ auf 28), der Rest sind Anpassungen und drei echte Neuerungen — eine neue Entsendungsmission, die Kameraneigung im Foto-Modus und die Verzehnfachung der Camp-Mittel beim Silberspenden. Alle Plattformen außer dem Mac App Store waren zum Zeitpunkt der Veröffentlichung versorgt. Der Download liegt auf Steam laut vulkk.com bei rund 3,7 GB; Pearl Abyss selbst nennt keine Größe, auch MP1st (Konsolen-Build 1.000.505, 04.09.2026) nennt keine, und eine zweite Quelle für die 3,7 GB gibt es nicht (geprüft am 06.10.2026; vulkk.com war für den Direktabruf gesperrt). Die Zahl bleibt deshalb Einzelquelle.",features:[
    {cat:"Inhalt",items:[
      "Im <b>Graumähnen-Camp</b> wurden zwar die Möbel geladen, aber nicht das Haus — behoben.",
      "Beim <b>Beschwören des Schwarzsterns</b> wurde in bestimmten Situationen ein anderes Reittier gerufen — behoben. <span style='color:var(--gdim)'>Einordnung: Der Schwarzstern stand schon in 2.00.00 auf der Fehlerliste, dort ging es um eine fehlende Abklingzeit. Zwei Patches hintereinander am selben Reittier.</span>",
      "Die Quest <b>„Der verfluchte Ritter“</b> wurde nicht abgeschlossen, obwohl alle untergeordneten Missionen erfüllt waren — behoben. <span style='color:var(--gdim)'>Einordnung: ein Fortschrittsblocker. Die Notes sagen nicht, ob betroffene Spielstände rückwirkend repariert werden oder die Quest neu begonnen werden muss.</span>",
      "Der zum Abschluss der <b>Camp-Spendenmission</b> erforderliche Wert war tatsächlich niedriger angesetzt als angegeben — behoben. <span style='color:var(--gdim)'>Einordnung: Die Formulierung lässt offen, in welche Richtung korrigiert wurde. Entweder wurde die Anzeige an den echten Wert angeglichen oder die Anforderung an die Anzeige. Weder die deutsche noch die englische Fassung nennt eine Zahl.</span>",
      "Als neue <b>Entsendungsmission</b> wurde <b>„Goldbarren-Investitionsmission“</b> hinzugefügt (englisch <em>Gold Bar Investment Mission</em>). <span style='color:var(--gdim)'>Einordnung: der einzige neue Spielinhalt dieses Patches; die beiden anderen Neuerungen sind eine Komfort- und eine Balance-Änderung. Ertrag, Laufzeit und Voraussetzungen stehen nicht in den Notes. Eine einzelne Sekundärquelle nennt dazu Zahlen, die hier bewusst nicht übernommen sind, weil sie nirgends gegengeprüft werden konnten.</span>",
      "Bei Quests, die <b>beritten</b> absolviert werden, wird beim erneuten Versuch nun auch die <b>Lebenskraft des Pferdes</b> wiederhergestellt.",
      "Im <b>Fähigkeitsmenü</b> zeigt eine neue Darstellung an, welche Fähigkeiten durch das Erlernen eines bestimmten Fähigkeitswissens freigeschaltet werden. <span style='color:var(--gdim)'>Einordnung: eine direkte Folge des in 2.00.00 umgebauten Lernsystems — der Abhängigkeitsbaum war dort neu, aber unsichtbar.</span>",
      "Im <b>Foto-Modus</b> kann die Kamera nun geneigt werden.",
      "Beim <b>Spenden von Silber an das Camp</b> erhält man nun die <b>zehnfache Menge an Camp-Mitteln</b>. <span style='color:var(--gdim)'>Einordnung: die einzige bezifferte Balance-Änderung des Patches. Der Kurs vor der Verzehnfachung steht weder in diesen noch in früheren Notes, ein absoluter Wert lässt sich daraus also nicht ableiten. Die Forschung wird seit 1.18.00 in Camp-Mitteln bezahlt; in Silber angegebene Forschungskosten aus der Zeit davor sind damit nicht mehr direkt übertragbar. Die Verzehnfachung betrifft laut Notes nur die Camp-Mittel, die man beim Silberspenden erhält.</span>"
    ]},
    {cat:"Kampf / Aktion",items:[
      "Der Flug wurde abgebrochen, wenn während des Flugs <b>„Kraftübertragung“</b> eingesetzt wurde — behoben.",
      "Der Angriff nach dem Einsatz von <b>„Überfall“</b> wurde in einigen Situationen in eine andere Richtung als zum Ziel ausgeführt — behoben.",
      "Charaktere froren <b>unter der Wasseroberfläche</b> ein, wenn <b>„Body-Slam“</b> in seichtem Wasser eingesetzt wurde — behoben.",
      "<b>Geist</b> wurde nicht wiederhergestellt, wenn <b>„Fokus“</b> im hängenden Zustand verwendet wurde — behoben. <span style='color:var(--gdim)'>Einordnung: berührt dieselbe Mechanik wie eine der acht neuen Kliff-Fähigkeiten aus 2.00.00, die laut Community-Recherche Serenity heißt und die Geist-Regeneration während Fokus erhöht. Die offiziellen Notes nennen für diese Fähigkeit keinen Namen.</span>",
      "Der <b>Präzisionsschuss</b> wurde nicht mit der <b>Muskete</b> ausgeführt — behoben.",
      "Eigene <b>Graumähnen und Reittiere</b> kämpften in bestimmten Situationen nicht gegen Gegner — behoben."
    ]},
    {cat:"UI",items:[
      "Beim ersten Spielstart wird der Wert für die <b>minimale Schriftgröße</b> nun bereits mit einem einzigen Klick auf die Pfeiltaste angepasst.",
      "Die untere Benutzeroberfläche verschwand, wenn beim Anlegen oder Entfernen von <b>Abyss-Ausrüstung</b> gleichzeitig mit dem Tab-Wechsel eine Auswahl eingegeben wurde — behoben.",
      "In bestimmten Umgebungen ließ sich <b>Spanisch nicht als Sprachausgabe</b> auswählen — behoben. <span style='color:var(--gdim)'>Einordnung: eine der fünf Sprachausgaben, die erst zehn Tage zuvor mit 2.00.00 dazugekommen sind.</span>",
      "Die Benutzeroberfläche wurde in bestimmten Situationen nicht korrekt angezeigt — behoben."
    ]},
    {cat:"Grafik und Einstellungen",items:[
      "Bei <b>regnerischem Wetter oder Pfützen</b> trat auffälliges <b>Bildrauschen</b> auf — behoben.",
      "[Mac] Innenräume wurden auf <b>M5-Geräten</b> aufgrund eines Fehlers beim Rendern der Beleuchtung sehr dunkel dargestellt — behoben.",
      "Beim Platzieren von Gegenständen im Außenbereich im <b>Wohn-Modus</b> kam es in der Nähe von Zäunen zu <b>Frame-Drops</b> — behoben."
    ]},
    {cat:"Lokalisierung",items:[
      "Lokalisierungsfehler in allen Sprachen wurden behoben und die allgemeine Qualität der Lokalisierung wurde verbessert. <span style='color:var(--gdim)'>Einordnung: derselbe Sammelpunkt wie in 2.00.00, ohne Angabe welche Sprachen oder welche Stellen.</span>"
    ]},
    {cat:"Sonstiges",items:[
      "Die <b>Interaktion mit NPCs</b> hatte eine Verzögerung — behoben.",
      "Die verfügbare Menge für die <b>Auszahlung von Goldbarren</b> wurde falsch angezeigt, wenn man mehr Gegenstände besaß, als das Inventar aufbewahren konnte — behoben.",
      "Die <b>Stoffrobe des Kampfmönchs</b> (englisch Martial Monk's Cloth Robe, questlog-Item 1000319) war als <b>Kopfbedeckung</b> kategorisiert — behoben. <span style='color:var(--gdim)'>Einordnung: eine falsche Slot-Zuordnung im Ausrüstungssystem, kein reiner Anzeigefehler.</span>",
      "Die in der <b>Schokoladenfabrik</b> aufgestellten <b>Förderbänder</b> funktionierten nicht — behoben.",
      "Die <b>Kopfbedeckung</b> wurde vorübergehend eingeblendet, wenn man nach Auswahl von „Anzeige der Kopfbedeckung – Nur im Kampf anzeigen“ eine Waffe verbesserte — behoben.",
      "<b>Barden Middler</b> verschwand nach der Schlusssequenz von Calphade, sobald er das Sichtfeld des Charakters verließ — behoben.",
      "Beim Zielen mit einer <b>Fernkampfwaffe während des Rutschens</b> wurde der Tastenhinweis für „Ziel markieren“ nicht angezeigt — behoben.",
      "[Damiane/Oongka] <b>Kliff verschwand beim Spielen nicht</b> und war weiterhin auf dem Bildschirm zu sehen — behoben.",
      "Objekte überlappten bei Auswahl von „Untersuchen“ in einigen Regionen mit dem <b>Gelände</b> — behoben. <span style='color:var(--gdim)'>Einordnung: Die englische Fassung beschreibt den Fehler anders: Bei „Details“ zu bestimmten Regionen auf der Karte konnte das Gelände die Kamerasicht verdecken.</span>",
      "Man konnte gelegentlich selbst beim Abspielen eines <b>Erinnerungsfragments</b> die Laterne tragen und sich bewegen — behoben.",
      "Für <b>nicht ausgerüstete Schwerter</b> werden nun keine <b>Scheiden</b> mehr angezeigt.",
      "Während der Quest <b>„Dünner werdende Klinge“</b> konnte man nur dann mit der <b>Steintafel</b> interagieren, wenn man auf ihr stand — behoben."
    ]},
    {cat:"Plattformen und Quelle",items:[
      "Zum Zeitpunkt der Veröffentlichung stand der Patch für <b>Steam (PC)</b>, <b>Steam (Mac)</b>, <b>PlayStation</b>, <b>XBOX</b> und den <b>Epic Games Store</b> bereit; für den <b>Mac App Store</b> wurde er noch <b>vorbereitet</b>. <b>Nachtrag 09.09.2026:</b> Die offizielle Seite führt inzwischen alle sechs Plattformen einschließlich <b>Mac App Store</b> mit „Patch jetzt verfügbar“ — der Rückstand ist also aufgeholt. <span style='color:var(--gdim)'>Einordnung: Der Mac App Store hinkte zum Release hinterher. Wann Pearl Abyss die Seite umgestellt hat, nennt der Publisher nicht; die Meldung trägt weiterhin nur das Veröffentlichungsdatum 04.09.2026. Im Mac App Store selbst ist die Version 2.0.6 („various bug fixes and stability improvements“) laut Apple-Versionsverlauf am 09.09.2026 verzeichnet, passend zum Zeitpunkt des Nachtrags. Auch bei den Vorgängern kam der Mac-App-Store-Build laut Versionsverlauf erst Tage nach dem Board-Datum: 2.00.00 am 27.08.2026, 2.00.01 am 31.08.2026, 2.00.02 am 02.09.2026.</span>",
      "Quelle: offizielle Patch-Notizen Version 2.01.00, Pearl Abyss, 04.09.2026 04:20 UTC (boardNo 128), deutsche und englische Fassung gegengeprüft."
    ]}
  ]},
  {ver:"2.00.02",date:"28.08.2026",size:"Zweiter Hotfix nach dem Enhanced-Umbau, drei Punkte unter der einzigen Überschrift Patch-Details. Die offizielle Seite führt alle sechs Plattformen mit dem Status <em>Patch jetzt verfügbar</em>; dass sie zeitgleich versorgt waren, ist nicht belegt (im Mac App Store ist die zugehörige Version 2.0.5 laut Versionsverlauf am 02.09.2026 verzeichnet). Das angegebene Datum 28.08.2026 ist der Zeitstempel der Notice auf dem offiziellen Board (00:00 UTC, identisch mit 2.00.01), kein gesicherter Veröffentlichungstermin; Hinweise sprechen für den 01.09.2026. Zum Datum gibt es einen ungelösten Widerspruch, siehe die Einordnung unten.",features:[
    {cat:"Patch-Details",items:[
      "Die <b>Lippensynchronisation</b> der Charaktere wurde in einigen Zwischensequenzen verbessert. <span style='color:var(--gdim)'>Einordnung: Die englische Fassung schreibt an dieser Stelle <em>partially improved</em>, die deutsche lässt das „teilweise“ weg und klingt dadurch nach einer vollständigen Behebung. Derselbe Unterschied steht auch in 2.00.01, ist also kein Ausrutscher, sondern ein Muster der deutschen Fassung.</span>",
      "Die <b>Steuerung</b> war bei Verwendung des <b>kleinen Krans im Steinbruch Karin</b> nicht mehr möglich — behoben.",
      "Beim <b>Reiten</b> stieg man zwangsweise ab, sobald man mit einem <b>wandernden Händler</b> kollidierte — behoben."
    ]},
    {cat:"Plattformen und Quelle",items:[
      "Alle sechs Plattformen (Steam PC, Steam Mac, PlayStation, XBOX, Epic Games Store, Mac App Store) sind einzeln mit dem Status <em>Patch jetzt verfügbar</em> aufgeführt.",
      "<b>Ungeklärter Datumswiderspruch:</b> Die offizielle Seite trägt für 2.00.01 und 2.00.02 <b>denselben</b> Zeitstempel 28.08.2026 00:00 UTC, in der deutschen wie in der englischen Fassung. Zwei getrennte Hotfixes zur selben Sekunde sind unplausibel. Weitere Indizien deuten für 2.00.02 auf den <b>01.09.2026</b>: Die Steam-Ankündigung zum Hotfix erschien am 01.09.2026 um 04:53 UTC (die zu 2.00.01 am 28.08.2026 um 13:21 UTC); bei den übrigen 46 gespiegelten Patch-Posts liegt die Steam-Ankündigung höchstens rund 23 Stunden nach dem Board-Zeitstempel, hier sind es über vier Tage. MP1st veröffentlichte seinen Artikel (Konsolen-Build 1.000.493) am 01.09. mit der Formulierung <em>here are the fixes for today</em>, und im Mac App Store ist die zugehörige Version 2.0.5 am 02.09.2026 verzeichnet. <span style='color:var(--gdim)'>Wir tragen das offizielle Board-Datum ein, weil die Primärquelle in diesem Projekt Vorrang hat, und halten den Widerspruch hier fest statt ihn stillschweigend aufzulösen. Der Zeitstempel 00:00 UTC steht auf dem Board bei genau drei Patch-Posts (1.04.02, 2.00.01, 2.00.02) und weicht bei allen dreien deutlich vom Steam-Post ab; er wirkt wie ein Platzhalter ohne Uhrzeit. Konsolen-Build-Nummern im Format 1.000.xxx stehen nie auf der Pearl-Abyss-Seite und gelten hier als inoffiziell.</span>",
      "Quelle: offizielle Patch-Notizen Version 2.00.02, Pearl Abyss (boardNo 127), deutsche und englische Fassung gegengeprüft."
    ]}
  ]},
  {ver:"2.00.01",date:"28.08.2026",size:"Erster Hotfix nach dem Enhanced-Umbau, vier Punkte unter der einzigen Überschrift Patch-Details. Zwei der vier Punkte hängen unmittelbar an den Neuerungen aus 2.00.00: die arabische Textanzeige und die Lippensynchronisation der neu vertonten Zwischensequenzen. Der Mac-Start und die Bildrate stehen für sich.",features:[
    {cat:"Patch-Details",items:[
      "Einige <b>Texte</b> wurden fehlerhaft angezeigt, wenn die <b>Textsprache auf Arabisch</b> eingestellt war — behoben. <span style='color:var(--gdim)'>Einordnung: Arabisch kam drei Tage zuvor mit 2.00.00 als neue Oberflächen- und Untertitelsprache dazu.</span>",
      "Die <b>Lippensynchronisation</b> der Charaktere wurde in einigen Zwischensequenzen verbessert. <span style='color:var(--gdim)'>Einordnung: Die englische Fassung schreibt <em>partially improved</em>, die deutsche lässt das „teilweise“ weg. Hintergrund dürften die fünf neuen Sprachausgaben aus 2.00.00 sein.</span>",
      "Die <b>Bildrate</b> sank in bestimmten Situationen — behoben.",
      "[Steam Mac] Das Spiel ließ sich unter bestimmten <b>macOS-Umgebungen</b> nicht starten — behoben."
    ]},
    {cat:"Plattformen und Quelle",items:[
      "Alle sechs Plattformen (Steam PC, Steam Mac, PlayStation, XBOX, Epic Games Store, Mac App Store) sind einzeln mit dem Status <em>Patch jetzt verfügbar</em> aufgeführt.",
      "<b>Known-Issues-Seite (boardNo 68):</b> Die offizielle Liste bekannter Probleme führte einen Punkt zu <b>nicht angezeigten arabischen Hilfetexten und Tastenbelegungen</b>, obwohl dieser Patch die fehlerhafte arabische Textanzeige als behoben meldet. <span style='color:var(--gdim)'>Einordnung: Die Formulierungen sind nicht wortgleich, es können also zwei verschiedene Fehler sein. Abgleich am 08.09.2026: Beide Sprachfassungen der Known-Issues-Seite nannten damals denselben Aktualisierungsstand vom 08.09.2026, 06:00 UTC und führten den arabischen Hilfetext-Fehler weiterhin. Nachtrag 01.10.2026: Die aktuelle Liste (Aktualisierungsstand 21.09.2026, 14:00 UTC, deutsch wie englisch) enthält keinen arabischen Punkt mehr; wann und warum er entfernt wurde, nennt Pearl Abyss nicht. Ob er mit dem behobenen Textfehler identisch war, bleibt offen.</span>",
      "Quelle: offizielle Patch-Notizen Version 2.00.01, Pearl Abyss, 28.08.2026 00:00 UTC (boardNo 126), deutsche und englische Fassung gegengeprüft."
    ]}
  ]},
  {ver:"2.00.00",date:"25.08.2026",size:"Der größte Patch seit Release und der Grund für den Versionssprung von 1.18 auf 2.0: Mit ihm heißt das Spiel <b>Crimson Desert Enhanced</b>. Release 25.08.2026 18:20 UTC (boardNo 123), 49 Einzelpunkte in sieben Abschnitten. Kernstücke sind fünf neue Sprachausgaben samt arabischer Oberfläche, ein umgebautes Fähigkeiten-Lernsystem mit der neuen Währung Abyss-Verknüpfung, acht neue Kliff-Fähigkeiten, zusätzliche Story-Szenen und ein in Phasen unterteilter Golden-Star-Bosskampf. Das Update ist für alle Bestandsspieler kostenlos. Die Seite führt alle sechs Plattformen mit <em>Patch jetzt verfügbar</em> (Stand 01.10.2026); den Mac App Store nannte sie laut Mitschnitt noch am 31.08.2026 um 23:07 UTC als <em>in Vorbereitung</em>, obwohl dort die Version 2.0.2 („This patch applies the Crimson Desert Enhanced update“) laut Apple-Versionsverlauf bereits am 27.08.2026 verzeichnet ist.",features:[
    {cat:"Enhanced — die Kernänderungen",items:[
      "Die <b>Hauptgeschichte und -quests</b> wurden verbessert, die <b>Nachvollziehbarkeit der Hauptgeschichte</b> wurde verbessert. Zur Vertiefung der <b>Boss-Geschichten</b> wurden <b>Wissen, Gegenstände, Erinnerungsfragmente sowie Dialoge und Gespräche</b> hinzugefügt. <span style='color:var(--gdim)'>Einordnung: der für ein Wiki folgenreichste Punkt des ganzen Patches, und zugleich der unbestimmteste. Die Notes nennen zu diesem Punkt keinen Boss, keinen Fundort und keine Anzahl. Welche Erinnerungsfragmente dazugekommen sind und wo sie liegen, ist damit offen.</span>",
      "<b>Fünf neue Sprachausgaben</b>: Deutsch, Französisch, Spanisch, Japanisch, Brasilianisches Portugiesisch. Dazu <b>Arabisch</b> als neue Spielsprache für Oberfläche und Untertitel. <span style='color:var(--gdim)'>Einordnung: Auf Steam, PlayStation, Xbox und Epic muss die gewünschte Sprache über die Plattform-Einstellungen ausgewählt und nachgeladen werden, nicht im Spielmenü; Pearl Abyss hat dazu eine eigene Anleitung veröffentlicht (boardNo 124).</span>",
      "<b>„Abyss-Verknüpfung“</b> (englisch <em>Abyss Link</em>) wurde als neue Währung zum Erlernen von Fähigkeiten hinzugefügt. Erlernt ein Charakter mithilfe eines <b>Abyss-Artefakts</b> eine Fähigkeit, erhalten <b>alle anderen spielbaren Charaktere automatisch Abyss-Verknüpfungen in Höhe der verwendeten Abyss-Artefakte</b>.",
      "Das <b>Zurücksetzen</b> erlernter Fähigkeiten ist nun <b>für jeden Charakter einzeln</b> möglich statt nur gemeinsam. Jeder Charakter setzt seine eigenen Abyss-Verknüpfungen ein, beim Zurücksetzen werden sie erstattet.",
      "<b>Achtung beim ersten Start nach dem Update:</b> Mit der Einführung der Abyss-Verknüpfung werden die <b>bisher erlernten Fähigkeiten zurückgesetzt</b> und die verwendeten Abyss-Artefakte sowie sonstige Währungen erstattet. <span style='color:var(--gdim)'>Einordnung: Das ist ein einmaliger Pflicht-Reset, kein Fehler. Laut Notes werden die verwendeten Abyss-Artefakte und sonstige Währungen erstattet.</span>",
      "Beim <b>Starten eines neuen Spiels</b> können die in bestehenden Speicherdateien erlangten <b>Währungen und Abyss-Verknüpfungen übernommen</b> werden. Diese Funktion steht zur Verfügung, <b>sobald alle Hauptquests abgeschlossen</b> wurden. <span style='color:var(--gdim)'>Einordnung: Die Notes sprechen nicht von einem New Game Plus. Übernommen werden laut Wortlaut Währungen und Abyss-Verknüpfungen; von Fähigkeiten, Ausrüstung oder Questfortschritt ist nicht die Rede (Gegenprüfung 06.10.2026: Auch die Begleitmeldung „Crimson Desert Enhanced Update Now Available“, boardNo 125, nennt keine Übernahme). Mit 2.03.00 werden Silberbeträge ab 1.000 dabei als Silberbündel gutgeschrieben.</span>",
      "<b>Acht neue Kliff-Fähigkeiten</b> wurden hinzugefügt. Sie können ab einem bestimmten Zeitpunkt der Hauptgeschichte erlernt werden. <span style='color:var(--gdim)'>Die Notes nennen weder Namen noch Zeitpunkt. Community-Recherche führt diese acht: <em>Flowing Force Palm</em> (mehr Schaden auf den ersten beiden Force-Palm-Treffern, dazu ein Zusatztreffer), <em>Ascending Force Palm</em> (höherer Sprung, verbesserter Aerial Force Palm), <em>Descending Force Palm</em> (Sturzangriff im Anschluss an den Aerial Force Palm), <em>Enraged Parry</em> (parieren mitten in einer laufenden Aktion), <em>Serenity</em> (mehr Geist-Regeneration während Fokus), <em>Water Stride</em> (über Wasserflächen laufen statt schwimmen; die offiziellen Notes zu 2.03.00 nennen eine Fähigkeit <em>Water Stride</em>, eine Quelle schreibt <em>Water Slide</em>), <em>Enhanced Flight</em> (Sturzflug ohne Fallschaden) und <em>Finishing Rush</em> (nach einem Treffer per Leichtangriff zum nächsten Gegner wechseln).</span>",
      "<b>Zum Belegstatus dieser acht Namen:</b> In den Notes zu 2.00.00 stehen sie nicht. Eine einzelne westliche Guide-Seite ist die Erstquelle, mehrere weitere Seiten schreiben sie erkennbar ab, teils mit eigenen Tippfehlern. Unabhängig davon bestätigt ein koreanischer Fachartikel vom 03.09.2026 Anzahl und Wirkungen. <span style='color:var(--gdim)'>Bewusst NICHT übernommen sind die kursierenden Angaben zu Abyss-Artefakt-Kosten, Level-Voraussetzungen und der Zuordnung zu den Fähigkeitsbäumen: Die Erstquelle widerspricht sich bei der Baumzuordnung innerhalb desselben Artikels selbst, und für die Kosten gibt es nur diese eine Datenlinie. Deutsche Bezeichnungen tauchen erst in späteren offiziellen Notes auf: „Wasserlauf“ für Water Stride (2.03.00) und, nach Satzreihenfolge zugeordnet, „Kraftfaust: Abtauchen“ für Descending Force Palm (2.02.00). Für die übrigen sechs sind in den Notes keine deutschen Namen dokumentiert. Nachtrag 04.10.2026: Inzwischen führen die questlog-Spieldaten alle acht Fähigkeiten samt deutschen Namen (u. a. „Kraftfaust: Abtauchen“ für Descending Force Palm, „Flug verbessern“ für den offiziellen Namen Enhance Flight); Level-Voraussetzungen und Baumzuordnung nach Fextralife stehen jetzt im Skill-Bereich, Abweichungen zwischen den Guides sind dort benannt.</span>",
      "Das <b>UI der Hauptquests</b> wurde verbessert."
    ]},
    {cat:"Inhalt",items:[
      "Die <b>Herstellung von Gegenständen in der Kilnden-Werkstatt</b> funktionierte nicht ordnungsgemäß — behoben.",
      "Der <b>Schwarzstern</b> konnte in bestimmten Situationen <b>ohne Abklingzeit</b> geritten werden — behoben.",
      "Wurde man in der sich im <b>Kriegszustand befindenden Calphade-Region</b> als gesuchter Gesetzloser gefangen genommen, wurde man in das <b>Gefängnis von Schloss Calphade</b> gesperrt — behoben."
    ]},
    {cat:"Steuerung",items:[
      "Die Option <b>„Steuerung von Flug-Reittieren“</b> wurde hinzugefügt, zu finden im Menü „Sonstiges – Eingabe“. <span style='color:var(--gdim)'>Einordnung: Die Notes nennen keine Beispiele. Als fliegende Reittiere führt das Wiki die Drachen Blackstar, Wyvern und Wild Wyvern (temporär); die Heißluftballons (Cloudcruiser, Skystreaker) sind dort als Fahrzeuge geführt — ob die Option auch sie betrifft, ist nicht belegt.</span>",
      "Bei <b>„Kamera“</b> bewegt sich das Flug-Reittier in die Richtung, in die die Kamera blickt.",
      "Bei <b>„Manuell“</b> folgt die Bewegung des Flug-Reittiers nicht der Kamerarichtung, Auf- und Absteigen erfolgt über eine separate Eingabe. <span style='color:var(--gdim)'>Einordnung: In der englischen Fassung fehlt an genau dieser Stelle das Verb, der Satz bricht mitten in der Aussage ab. Die deutsche Fassung ist hier vollständig und damit die belastbarere Quelle.</span>"
    ]},
    {cat:"Kampf / Aktion",items:[
      "Die Quest <b>„Unerwartetes Geschenk“</b> wurde so geändert, dass als Geschenkbelohnung von <b>Bilwise</b> die Fähigkeit <b>„Doppelsprung“</b> erlernt wird. <span style='color:var(--gdim)'>Einordnung: Damit ist der Doppelsprung an eine konkrete Quest gebunden. Wie Spieler ihn vor dem Patch bekamen, sagen die Notes nicht.</span>",
      "Der <b>Schaden, den Begleitcharaktere erleiden</b>, wurde verringert.",
      "Die <b>Macht des Axioms</b> ließ sich während des Flugs in <b>Sicherheitszonen</b> nicht einsetzen — behoben.",
      "Man erlitt Schaden, wenn man sich beim Erscheinen der <b>Phantomritter des Vergessenen Generals</b> in deren Nähe befand — behoben. <span style='color:var(--gdim)'>Einordnung: Die deutsche Fassung spricht von mehreren Phantomrittern, die englische nur von einem einzelnen.</span>",
      "Der <b>Rikoschettschuss-Effekt der Bogenschützen-Handschuhe</b> wurde beim Feuern von <b>Spezialpfeilen</b> nicht angewandt — behoben.",
      "Ein Charakter wurde nach der Fähigkeit <b>„Anheben“</b> in eine andere Richtung geworfen, als die Wurfbewegung vorgab — behoben.",
      "Der Bosskampf gegen <b>Goldener Stern</b> wurde in <b>mehrere Phasen unterteilt</b> und um <b>phasenspezifische Angriffsmuster</b> erweitert. <span style='color:var(--gdim)'>Einordnung: der einzige Punkt des Patches, der einen Bosskampf umbaut. Die Notes nennen weder die Anzahl der Phasen noch die neuen Muster. Stand 01.10.2026 war in den geprüften Quellen keine Dokumentation des Kampfs nach dem Patch zu finden: Die Fextralife-Seite ist zuletzt am 28.04.2026 bearbeitet worden, und ein Boss-Guide vom 04.09.2026 stützt sich ausdrücklich nur auf Quellen vor dem 25.08.2026. Bis dahin beschreiben die verfügbaren Golden-Star-Strategien den Zustand davor.</span>"
    ]},
    {cat:"UI",items:[
      "Das <b>UI der Beitragswährung</b> wurde während des Gameplays gelegentlich nicht ausgeblendet — behoben.",
      "Bestimmte <b>Wissenseinträge zu Fähigkeiten</b> wurden im Tab <b>„Meldungen“</b> angezeigt — behoben."
    ]},
    {cat:"Lokalisierung",items:[
      "Lokalisierungsfehler in allen Sprachen wurden behoben und die allgemeine Qualität der Lokalisierung wurde verbessert."
    ]},
    {cat:"Sonstiges",items:[
      "Das <b>Nachbild</b> erschien verzögert, wenn ein <b>Erinnerungsfragment mit der Laterne</b> angeleuchtet wurde — behoben.",
      "In <b>Kapitel 2</b> verschwand der Hinweistext nicht, wenn ein Erinnerungsfragment mit der Fähigkeit <b>„Licht reflektieren“</b> erlangt wurde — behoben.",
      "<b>Damiane</b> konnte während des Fallens den <b>Schildwurf</b> benutzen — behoben.",
      "Bei ausgerüsteter <b>Muskete</b> war deren Aussehen auch bei Minispielen wie <b>Zweiblatt</b> sichtbar — behoben.",
      "Der über die Abyss-Ausrüstung <b>„Urteil des Geistes“</b> beschworene <b>Gespensterritter</b> wurde von Projektilen getroffen — behoben.",
      "Man stieg in bestimmten Situationen beim <b>Sturz aus großer Höhe</b> nicht vom Reittier ab — behoben.",
      "<b>Handelsware im Stall</b> ließ sich nicht ins <b>Pferdeinventar</b> verschieben — behoben.",
      "Einige <b>Bilder von Quests und Wissen</b> wurden verbessert.",
      "<b>Rätselhinweise</b> wurden von <b>Baumwurzeln</b> verdeckt — behoben.",
      "Einige <b>Gewänder</b> wurden fehlerhaft dargestellt — behoben.",
      "Der <b>Kran</b> wurde beschädigt, wenn während der Mission „Haus Roberts › Ländereien im Aufruhr › Versiegelt im Stein › Bring das vergrabene Relikt an die Oberfläche“ mit einem <b>elementverbesserten Bogen</b> auf die Eisenkette geschossen wurde — behoben.",
      "Die <b>Demeniss-Kettensäge</b> kann nun im <b>Camp gespendet</b> werden.",
      "Bestimmte <b>Geländeobjekte</b> wurden fehlerhaft dargestellt — behoben.",
      "Stirbt <b>Wusa oder Maegu</b> während der Anleitungs-Zwischensequenz in <b>Kapitel 9 „Eine unbekannte Stimme“</b>, kann diese nun neu gestartet werden."
    ]},
    {cat:"Was Enhanced für Bestandsspieler bedeutet",items:[
      "Das Update ist <b>kostenlos</b> und wird automatisch mit der neuesten Version hinzugefügt. Es ist <b>kein neues Produkt</b>: Steam-App-ID, PlayStation- und Xbox-Produktkennungen bleiben dieselben wie beim Launch, nur der angezeigte Titel wurde geändert. Ein zweiter Kauf ist nicht nötig.",
      "<b>Bestehende Spielstände bleiben nutzbar.</b> Einzige Einschränkung ist der oben beschriebene einmalige Fähigkeiten-Reset mit Erstattung.",
      "Quelle: offizielle Patch-Notizen Version 2.00.00, Pearl Abyss, 25.08.2026 18:20 UTC (boardNo 123), deutsche und englische Fassung Punkt für Punkt gegengeprüft; dazu die begleitenden Ankündigungen zu Enhanced (boardNo 125) und zur Sprachunterstützung (boardNo 124)."
    ]}
  ]},
  {ver:"1.18.02",date:"16.08.2026",size:"Zweiter Hotfix des Tages, sechs Stunden nach 1.18.01. Release 10:00 UTC. Vier Fehlerbehebungen unter der einzigen Überschrift Patch-Details — die Notes kennen für diesen Patch keine Unterkategorien. Alle sechs Plattformen (Steam PC, Steam Mac, PlayStation, Xbox, Epic Games Store, Mac App Store) sind einzeln mit dem Status <em>Patch jetzt verfügbar</em> aufgeführt. Anders als bei 1.15.00 bis 1.18.00, bei denen die Seite den Mac App Store bis heute als „in-progress“ führt, steht er hier auf „verfügbar“; ein Mitschnitt vom 20.08.2026 zeigt das bereits für 1.18.01. Zeitgleich mit dem Release war der Mac App Store damit nicht belegt: Sein Versionsverlauf verzeichnet 1.0.37 am 18.08.2026 und 1.0.38 am 19.08.2026. Schwerpunkt sind zwei Fehler, die Spielerbesitz betrafen: eine auf 0 stehende Graumähnen-Anzeige und zurückgesetztes Silber",features:[
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
      "Konsolen-Build <b>1.000.457</b> — <b>nicht offiziell dokumentiert</b>. Eine Regex-Suche nach dem Muster 1.000.xxx über das komplette HTML beider Sprachfassungen liefert null Treffer; Pearl Abyss nennt in dieser Notice überhaupt keine Build-Nummer. Die Zahl stammt allein von MP1st („Crimson Desert Update 1.000.457 Applies Version 1.18.0 on August 15“); der Artikeltext ist inzwischen abrufbar (am 06.10.2026 gelesen) und sagt 'Console gamers will see this download as Crimson Desert update 1.000.457' ohne Unterscheidung von PS5 und Xbox und ohne Patch-Größe. Auf welche Konsole(n) sich die Nummer bezieht, bleibt unbelegt.",
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
      "Konsolen-Build <b>1.000.428</b> — <b>nicht offiziell dokumentiert</b>; die Nummer steht im Titel des MP1st-Artikels („Crimson Desert Update 1.000.428 for August 5 Delivers Equipment Fix via Version 1.16.04“, 05.08.2026), dessen Text inzwischen abrufbar ist (am 06.10.2026 gelesen) und die Konsolenzuordnung bestätigt ('Console gamers will see this as Crimson Desert update 1.000.428'). Der Artikel nennt keine Patch-Größe. Der Aggregator updatecrazy.com wurde nicht erneut geprüft.",
      "<span style='color:var(--gdim)'>Abgrenzung: Fachpresse-Zusammenfassungen zum Build 1.000.428 nennen zusätzlich den Shield-Fix und den Ladebildschirm-Fix. Beide gehören nicht zu 1.16.04 — der Shield-Fix stammt aus 1.16.03 (boardNo 114), der Ladebildschirm-Fix aus 1.16.02 (boardNo 112). Der MP1st-Artikel selbst führt sie unter „Previous hotfixes“ als Rückblick neben dem einen Punkt des aktuellen Hotfixes; das spricht für eine kumulative Zusammenfassung (Rückschluss aus der Artikelstruktur). Dass der Konsolen-Build technisch mehrere Hotfixes bündelt, belegt der Artikel nicht.</span>"
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
      "Konsolen-Build <b>1.000.426</b> — <b>nicht offiziell dokumentiert</b>; die Zuordnung steht im MP1st-Artikeltitel („Crimson Desert Update 1.000.426 for Ver. 1.16.03 Released as Third Patch in Three Days“, 04.08.2026), dessen Text inzwischen abrufbar ist (am 06.10.2026 gelesen): Er nennt als neuesten Fix das Verschwinden bestimmter Schilde nach dem Wechsel auf Dual-Wielding, listet die Fixes des früheren Hotfixes vom selben Tag und führt die Known Issues des Standes 04.08.2026. Eine Patch-Größe steht auch dort nicht; DSOGaming, TwistedVoxel und GameRant haben keinen eigenen Artikel zu 1.16.03.",
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
  {ver:"1.16.00",date:"01.08.2026",size:"Großes Handels-Update (All Platforms). Steam (PC/Mac), PlayStation, Xbox Series X|S & Epic Games Store sofort; Mac App Store in Arbeit (die Seite führt ihn bis heute so; im Mac App Store ist die Version 1.0.34 mit „Improved trading-related contents“ und „Improved bank-related contents“ laut Versionsverlauf am 06.08.2026 verzeichnet). Release 03:30 UTC. Laut DSOGaming rund 5,7 GB und etwa 150 Änderungen. Der bislang größte Eingriff ins Handelssystem: 133 neue Handelsposten, vervierfachte Preise an Königlichen Handelsposten, 7 regionale Wagenwerkstätten und ein Anleihen-System bei der Bank",features:[
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
  {ver:"1.15.00",date:"24.07.2026",size:"Bugfix-Patch (All Platforms). Steam (PC/Mac), PlayStation, Xbox Series X|S & Epic Games Store sofort; Mac App Store in Arbeit. Release 02:40 UTC (Fach-/Guide-Presse datiert ihn nach lokaler Zeit auf den 23.07.2026). Konsolen-Build 1.000.407 (laut MP1st, nicht offiziell dokumentiert). Kein neuer Content außer der Verlegung des 'Mace of Ambition' — sonst reine Fehlerbehebungen",features:[
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
      "Offizielle Pearl-Abyss-Patchnotes 1.15.00 (Notice-Board boardNo 109, Release 24.07.2026 02:40 UTC), Konsolen-Build 1.000.407 (nicht offiziell dokumentiert, laut MP1st-Artikeltitel). Verifiziert gegen VULKK, TwistedVoxel, GameRant und MP1st. Reiner Bugfix-Patch ohne neue Quests, Gebiete oder Balance-Änderungen; einziger content-relevanter Punkt ist die Verlegung des 'Mace of Ambition'."
    ]}
  ]},
  {ver:"1.14.00",date:"16.07.2026",size:"Cross-Save-Update (All Platforms). Steam (PC/Mac), PlayStation, Xbox Series X|S & Epic Games Store sofort; Mac App Store folgt später (in Arbeit). Release 09:00 UTC. Nachtrag 01.10.2026: Die Seite führt den Mac App Store inzwischen mit <em>Patch jetzt verfügbar</em>; Mitschnitte zeigen <em>in Arbeit</em> noch am 16.07.2026 um 16:14 UTC und <em>verfügbar</em> am 29.07.2026 um 21:19 UTC. Im Mac App Store ist die Version 1.0.30 („Added a cross-save feature“) laut Versionsverlauf am 20.07.2026 verzeichnet.",features:[
    {cat:"Neues Feature",items:[
      "Cross-Save (Cross-Progression) eingeführt: Speicherstände lassen sich jetzt plattformübergreifend über die Pearl-Abyss-ID verknüpfen — unterstützt werden PS5, Xbox Series X|S, Steam und Epic Games Store",
      "Pro Pearl-Abyss-ID existiert genau ein gemeinsamer Cross-Save-Slot, den sich alle verknüpften Accounts teilen",
      "Kein automatischer Sync: der Fortschritt muss vor jedem Plattformwechsel manuell in den Cross-Save-Slot hochgeladen werden, es gilt jeweils der zuletzt hochgeladene Stand",
      "Aktivierung: Save-Game-Menü → 'Cross-Save Settings' → per Link oder QR-Code zur Cross-Save-Seite → Accounts mit der Pearl-Abyss-ID verknüpfen → im Spiel 'Refresh' auswählen → der Cross-Save-Slot erscheint anschließend unten rechts im Save-Game-Menü",
      "Kein Cross-Buy: das Spiel muss auf jeder gewünschten Plattform separat gekauft sein",
      "Bezahlte Deluxe- und Vorbesteller-Kosmetik bleibt plattformgebunden — auf Plattformen ohne eigenen Kauf erscheint sie deaktiviert und muss dort ggf. separat nachgekauft werden",
      "Plattformen: Die Notes nennen Cross-Save für PlayStation, XBOX, Steam und Epic Games Store (Steam ohne Unterscheidung von PC und Mac; Steam (Mac) stand zugleich auf 'Patch available now') und für den Mac App Store den späteren Zeitpunkt. Die offizielle Cross-Save-FAQ führt 'PlayStation, XBOX, Steam, Epic Games, and Mac' und als Verknüpfungskonten PlayStation Network, XBOX, Steam, Epic Games und Apple. Für den Mac nennen die Notes zu 2.02.00 (11.09.2026) '[Mac] Cross-Save wurde hinzugefügt', und die Apple-Beschreibung zu Version 2.0.8 (16.09.2026) sagt 'adds the cross-save feature for Mac'; welcher Mac-Weg (Steam oder Mac App Store) dort gemeint ist, bleibt offen",
      "Laut offizieller Cross-Save-FAQ (Stand 06.10.2026): maximal ein Konto je Plattform (PlayStation Network, XBOX, Steam, Epic Games, Apple, also höchstens 5 Konten); wird das letzte verknüpfte Konto entkoppelt, werden alle Cross-Save-Daten in der Cloud dauerhaft gelöscht; ist die Erstellung einer Pearl-Abyss-ID in einer Region nicht möglich, ist Cross-Save dort nicht nutzbar"
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
  {ver:"1.13.00",date:"03.07.2026",size:"Major Update. Steam (PC/Mac), PlayStation, Xbox & Epic Games Store sofort (Epic-Nutzer müssen sich laut Notes ggf. neu einloggen); der Mac App Store stand laut Mitschnitten der Seite vom 04. bis 06.07.2026 noch auf „in Arbeit“, die Seite führt ihn heute als „verfügbar“. Im Mac App Store ist die Version 1.0.28 (Abyss-Zugang für Oongka und Damiane) laut Versionsverlauf am 07.07.2026 verzeichnet. Konsolen-Build 1.000.379 (laut mp1st)",features:[
    {cat:"Neuer Content",items:[
      "Abyss-Endgame jetzt auch für Oongka und Damiane geöffnet",
      "Memory-Fragment-Fundorte von vier Rematch-Bossen wurden im Zuge der Abyss-Öffnung verlegt: Corrupted Caliburn, Goyen, Draven the Crowcaller und Clockwork White Horn",
      "39 neue Ausrüstungsteile für Kliff/Oongka: 20 Boss-Ausrüstungsteile aus 5 Sets (Tarandus the Ashen 5, Unyielding Hero 5, Knight of Carnage 5, Martial Monk 3, Grand General of Demeniss 2), dazu 16 weitere Rüstungsteile und 3 Kopfbedeckungen",
      "Oongka kann jetzt die meisten Kliff-Outfits tragen",
      "6 zusätzliche Kuku-Ausrüstungsteile (separat von den 39): Kuku Lightning-Resistant Armor, Kuku Flame-Resistant Armor, Kuku Ice-Resistant Armor, Kuku Breeze-Step Boots, Kuku Rishi's Boots, Kuku Marni Laser Helm. Welche Figuren sie jetzt tragen können, ist uneinheitlich überliefert: Die englischen Notes schreiben '[Kliff/Oongka] They can now equip Kuku equipment', die deutschen '[Damiane/Oongka] Kuku-Ausrüstungen können nun getragen werden' (beide Fassungen am 06.10.2026 gelesen, dieselbe Teileliste). Keine Quelle löst den Widerspruch auf; die ARMOR-Hinweise 'auch für Kliff/Oongka ausrüstbar' folgen nur der englischen Fassung",
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
  {ver:"1.12.02",date:"24.06.2026",size:"Hotfix (All Platforms); Steam (PC/Mac), PlayStation & Xbox sofort, Epic Games Store & Mac App Store folgen später. Stand der Seite am 01.10.2026: Mac App Store <em>Patch jetzt verfügbar</em>, Epic Games Store weiterhin <em>in Vorbereitung</em>.",features:[
    {cat:"Bugfixes",items:[
      "Behoben: Absturz bei 1080p (FHD) mit Grafikkarten der AMD Radeon RX 5000 Series",
      "Behoben: Absturz bei Nutzung des Photo Mode nach dem Deaktivieren von HDR",
      "Behoben: bestimmte Meeresbereiche waren fälschlich als 'No Fishing Zones' (Angelverbotszonen) klassifiziert"
    ]},
    {cat:"Quelle",items:[
      "Offizielles Pearl-Abyss Notice-Board boardNo 102 (Patch Notes 1.12.02, All Platforms Hotfix, 24.06.2026 01:15 UTC). Konsolen-Build 1.000.358 laut Drittquelle mp1st."
    ]}
  ]},
  {ver:"1.12.01",date:"20.06.2026",size:"Hotfix (All Platforms); Steam (PC/Mac), PlayStation & Xbox sofort, Epic Games Store & Mac App Store folgen später. Stand der Seite am 01.10.2026: Mac App Store <em>Patch jetzt verfügbar</em>, Epic Games Store weiterhin <em>in Vorbereitung</em> (Mitschnitt vom 22.06.2026: beide noch <em>in Vorbereitung</em>).",features:[
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
  {ver:"1.12.00",date:"19.06.2026",size:"Steam (PC/Mac), PlayStation & Xbox; Epic Games Store & Mac App Store folgen später. Veröffentlicht am 19.06.2026 um 06:00 UTC (boardNo 100). Die Seite führt Epic Games Store und Mac App Store unverändert als <em>in Vorbereitung</em> (fünf Mitschnitte vom 19.06. bis 26.07.2026 und Stand 01.10.2026).",features:[
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
  {ver:"1.11.00",date:"12.06.2026",size:"Konsolen-Build 1.000.341 (laut MP1st, nicht offiziell dokumentiert). Veröffentlicht am 12.06.2026 um 03:00 UTC (boardNo 99); der Titel trägt den Zusatz „Revised: 2026/06/12“ (Uhrzeit nicht genannt). Die englische Seite führt alle sechs Plattformen mit <em>Patch available now</em>, die deutsche nennt Xbox weiter <em>Patch wird derzeit vorbereitet</em> (Stand 01.10.2026).",features:[
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
      "Foul-Erkennung im 'Duel'-Minigame verbessert (deutsche Notes: im Duell-Minispiel „teilweise“ verbessert). Gemeint sind die Duell-Minispiele (Boxen, Waffenduell, All-Out Duel), nicht das Kartenspiel Duo — die Notes zu 1.12.00 sprechen von Fouls in All-Out Duels",
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
  {ver:"1.10.01",date:"06.06.2026",size:"Hotfix, alle Plattformen. Veröffentlicht am 06.06.2026 um 00:05 UTC (boardNo 97). Die Seite führt sieben Plattformen (darunter Xbox on PC): Mac App Store <em>in Vorbereitung</em>, alle übrigen <em>Patch jetzt verfügbar</em> (Stand 01.10.2026).",features:[
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
  {ver:"1.10.00",date:"05.06.2026",size:"Konsolen-Build 1.000.327 (laut MP1st, nicht offiziell dokumentiert). Veröffentlicht am 05.06.2026 um 03:30 UTC (boardNo 96). Steam (PC), Steam (Mac), PlayStation, Xbox und Epic Games Store führt die Seite mit <em>Patch jetzt verfügbar</em>, den Mac App Store mit <em>in Vorbereitung</em> (Stand 01.10.2026).",features:[
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
  {ver:"1.09.00",date:"29.05.2026",size:"Veröffentlicht am 29.05.2026 um 06:20 UTC (boardNo 94). Die Seite führt alle sechs Plattformen (Steam PC, Steam Mac, PlayStation, Xbox, Epic Games Store, Mac App Store) mit <em>Patch jetzt verfügbar</em> (Stand 01.10.2026).",features:[
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
  {ver:"1.08.00",date:"22.05.2026",size:"Veröffentlicht am 22.05.2026 um 08:05 UTC (boardNo 93); ein Punkt zu den Raytraced-Schatten von Sonne und Mond trägt den Vermerk „Edited: 2026/05/22“. Die Seite führt alle sechs Plattformen (Steam PC, Steam Mac, PlayStation, Xbox, Epic Games Store, Mac App Store) mit <em>Patch jetzt verfügbar</em> (Stand 01.10.2026).",features:[
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
  {ver:"1.07.00",date:"15.05.2026",size:"381 MB (Steam/PC, laut VULKK; 3DNews nennt 380 MB; nicht offiziell) · Konsolen-Build 1.000.283 (laut MP1st, nicht offiziell dokumentiert). Veröffentlicht am 15.05.2026 um 04:11 UTC (boardNo 92). Die Seite führt alle sechs Plattformen (Steam PC, Steam Mac, PlayStation, Xbox, Epic Games Store, Mac App Store) mit <em>Patch jetzt verfügbar</em> (Stand 01.10.2026).",features:[
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
  {ver:"1.06.01",date:"12.05.2026",size:"Hotfix. Veröffentlicht am 12.05.2026 um 08:04 UTC (boardNo 91). Steam (PC), Steam (Mac), PlayStation, Xbox und Epic Games Store führt die Seite mit <em>Patch jetzt verfügbar</em>, den Mac App Store mit <em>in Vorbereitung</em> (Stand 01.10.2026).",features:[
    {cat:"Bugfixes",items:[
      "Progression-Blocker im Vault of Vengeance Abyss behoben (Weiterspielen war dort nicht möglich)",
      "Bekanntes Problem dokumentiert: Elegant Carmine Leather Armor fehlerhaft (offizieller Hinweis in den Notes)"
    ]}
  ]},
  {ver:"1.06.00",date:"11.05.2026",size:"Veröffentlicht am 11.05.2026 um 04:48 UTC (boardNo 90); der Titel trägt den Zusatz „Revised: 2026/05/11“, drei Punkte (zwei zu Outfits und Umhang, einer zu wiederholbaren Missionen) den Vermerk „Added: 2026/05/11“. Die Seite führt alle sechs Plattformen (Steam PC, Steam Mac, PlayStation, Xbox, Epic Games Store, Mac App Store) mit <em>Patch jetzt verfügbar</em> (Stand 01.10.2026).",features:[
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
      "The Laughing Marionette (Claw Machine, Bezahlung mit Silber) — 12 Beleuchtungsitems, 1 Stuhl, Spezial-Kopfbedeckung, Abyss Artifacts, Abyss Gears (einen Preis pro Versuch nennen die Notes nicht)"
    ]},
    {cat:"UI",items:[
      "Display Sheath toggle (Schwertscheide an/aus)",
      "Night Tone Mode (Grafik-Option, dämpft Farben + hellt Schatten)"
    ]},
    {cat:"Nachträge der Revision (11.05.2026)",items:[
      "Kliff kann einige Outfits von Oongka tragen; der 'Greymane Cloth Cloak' ist jetzt auch für Oongka verfügbar",
      "Entsendungs-, Erkundungs- und Ausgrabungsmissionen an Strongholds sowie Unterstützungsmissionen der Färbereien lassen sich wiederholt ausführen"
    ]}
  ]},
  {ver:"1.05.01",date:"03.05.2026",size:"Hotfix, alle Plattformen. Veröffentlicht am 03.05.2026 um 04:40 UTC (boardNo 89). Sieben Plattformen (Steam PC, Steam Mac, PlayStation, Xbox, Xbox on PC, Epic Games Store, Mac App Store) führt die Seite mit <em>Patch jetzt verfügbar</em> (Stand 01.10.2026).",features:[
    {cat:"Bugfixes",items:[
      "Laufende Dispatch-Missionen wurden unter bestimmten Umständen abgebrochen — behoben (verbrauchte Ressourcen/Contribution sollten mit dem Folgepatch erstattet werden)",
      "Pets konnten unter bestimmten Bedingungen nicht beschworen werden — behoben"
    ]}
  ]},
  {ver:"1.05.00",date:"02.05.2026",size:"Veröffentlicht am 02.05.2026 um 01:30 UTC (boardNo 88); der Titel trägt den Zusatz „Revised: 2026/05/02“, die Voreinstellung zur Erneuten Blockade den Vermerk „Edited: 2026/05/02“. Die Seite führt alle sechs Plattformen (Steam PC, Steam Mac, PlayStation, Xbox, Epic Games Store, Mac App Store) mit <em>Patch jetzt verfügbar</em> (Stand 01.10.2026).",features:[
    {cat:"Bosse",items:[
      "Boss-Rematch via Laterne + Memory Fragment am Kampfort",
      "Reminisce- und Resonate-Modi",
      "69 Bosse Start-Roster für Rematch"
    ]},
    {cat:"Forts",items:[
      "Re-Blockade für 23 Forts mit 3 Frequenz-Modi (Stable / Conflict / War)"
    ]}
  ]},
  {ver:"1.04.02",date:"24.04.2026",size:"Hotfix für alle Plattformen, Release 24.04.2026 00:00 UTC (boardNo 87; die Uhrzeit wirkt wie ein Platzhalter, die Steam-Ankündigung erschien am 24.04.2026 um 11:29 UTC). Der umfangreichste der früher fehlenden Patches: 15 Punkte. Vier davon sind allerdings keine Fixes dieses Patches, sondern nachträgliche Klarstellungen zu 1.04.00, die dort nicht dokumentiert waren — darunter der Graumähnen-Beitragsladen bei Carl und die leicht erhöhte Bewegungsgeschwindigkeit des Charakters.",features:[
    {cat:"Patch-Details",items:[
      "Die Optionen <b>„Minimale Schriftgröße“</b> und <b>„Schriftgröße Untertitel“</b> wurden verbessert, sodass sie nun sofort im Spiel angewendet werden.",
      "Es wurde ein <b>nicht gewählter Schwierigkeitsgrad</b> eingestellt, wenn das Spiel neu gestartet wird, während bereits andere Speicherstände existieren — behoben.",
      "Einige Einträge in der <b>Hilfe-UI</b> wurden deaktiviert — behoben.",
      "Teile der <b>Laden-UI bei Angelhändlern und Gerbern</b> wurden fehlerhaft angezeigt — behoben.",
      "Durch die Änderung eines <b>Haustiernamens</b> in der Meldung zum Aufsteigen des Vertrauens wurde auch der Name eines <b>nicht gezähmten Tieres</b> geändert — behoben.",
      "[Tastatur/Maus] Beim Einstellen von <b>Sonstiges › Einstellungen › Video › HDR</b> funktionierte die Eingabe von Tasten nicht — behoben.",
      "Die im Hintergrund liegende <b>Anleitung zu Inhalten</b> reagierte vorrangig, wenn sie sich mit dem UI für „Liste zusätzlicher Belohnungen“ überschnitt — behoben.",
      "Der <b>Fade-out</b> erfolgte in einigen Laden-Zwischensequenzen zu langsam — behoben.",
      "Das <b>Färben von Pferdegeschirr</b> war nicht möglich — behoben.",
      "[PlayStation 5 Pro] Die <b>Bildschirmhelligkeit</b> war instabil, wenn die Option <b>„PSSR-Bildschärfe“</b> aktiviert war — behoben.",
      "Lokalisierungsfehler in allen Sprachen wurden behoben und die allgemeine Qualität der Lokalisierung wurde verbessert."
    ]},
    {cat:"Nachtrag zu Patch 1.04.00 (keine Änderungen dieses Patches)",items:[
      "Die <b>Bewegungsgeschwindigkeit des Charakters</b> wurde leicht erhöht. <span style='color:var(--gdim)'>Die Notes schreiben dazu ausdrücklich: diese Änderung wurde bereits mit Patch 1.04.00 angewendet und hier nur nachträglich dokumentiert.</span>",
      "Im <b>Graumähnen-Camp</b> wurde bei <b>Carl</b> der <b>Graumähnen-Beitragsladen</b> hinzugefügt. <span style='color:var(--gdim)'>Ebenfalls bereits mit 1.04.00 aktiv, hier nachgereicht.</span>",
      "Bei der <b>Camperweiterung</b> werden in eurem Haus platzierte <b>Möbel nicht länger eingesammelt</b>. Achtung: Alle aufgestellten Möbelstücke werden ins Inventar zurückgelegt, falls die Hausstruktur im „Wohnen“-Modus direkt geändert wird. <span style='color:var(--gdim)'>Ebenfalls bereits mit 1.04.00 aktiv.</span>",
      "Beim <b>Umzug des Graumähnen-Camps nach Pailune</b> werden nun auch die im Haus platzierten Möbel automatisch mit übertragen. <span style='color:var(--gdim)'>Auf der offiziellen Seite hinter einem Spoiler-Aufklapper versteckt, ebenfalls bereits mit 1.04.00 aktiv.</span>"
    ]},
    {cat:"Plattformen und Quelle",items:[
      "Sieben Plattformen aufgeführt, alle versorgt. <span style='color:var(--gdim)'>Kuriosum der Quelle: Auf der deutschen Seite stehen ausgerechnet <b>Xbox</b> und <b>Xbox on PC</b> im englischen Wortlaut <em>Patch available now</em>, während die anderen fünf <em>Patch jetzt verfügbar</em> tragen.</span>",
      "Quelle: offizielle Patch-Notizen Version 1.04.02 (Hotfix für alle Plattformen), Pearl Abyss, 24.04.2026 00:00 UTC (boardNo 87). <span style='color:var(--gdim)'>Nachtrag vom 05.09.2026: Dieser Patch fehlte im Wiki-Bestand und wurde direkt an der offiziellen Notice-Seite nachrecherchiert.</span>"
    ]}
  ]},
  {ver:"1.04.01",date:"23.04.2026",size:"Hotfix am selben Tag wie der Hauptpatch 1.04.00, Release 23.04.2026 14:45 UTC (boardNo 85). 13 Punkte, breit gestreut von Controller-Belegung über Haustiere bis zu charakterspezifischen Fähigkeiten. Enthält einen der seltenen Fälle, in denen Pearl Abyss eine Anleitung zur Wiederherstellung verlorener Gegenstände mitliefert.",features:[
    {cat:"Patch-Details",items:[
      "[Controller] Die Taste für die <b>Namensänderung von Haustieren und Pferden</b> wurde von (R3/RS) zu (L3/LS) geändert.",
      "Einige <b>Reittiere</b> wurden nicht im Schnellzugriff angezeigt und konnten nicht gerufen werden — behoben.",
      "[PlayStation/Xbox] Die Option <b>„Voreinstellung wechseln“</b> wird nun identisch zur Darstellung auf PC-Geräten angezeigt.",
      "<b>Haustiere</b> fraßen Holz oder Erz, das durch eine Holzfälleraxt oder Spitzhacke gewonnen wurde — behoben.",
      "[Tastatur/Maus] Die <b>Platzierung von Möbeln</b> war in bestimmten Situationen nicht möglich — behoben.",
      "Während des <b>Färbens oder Anpassens</b> kam es gelegentlich zu <b>Abstürzen</b> — behoben.",
      "Die <b>Ausdauer</b> regenerierte sich durch das Wegstauen und erneute Ziehen bestimmter Waffen während des Sprintens — behoben.",
      "[Damiane] Die Fähigkeit <b>„Licht reflektieren“</b> wurde in sicheren Zonen abgebrochen — behoben.",
      "[Kliff] Die <b>Fluggeschwindigkeit</b> der Fähigkeit <b>„Himmelstritt der Krähe“</b> wurde fälschlicherweise verringert — behoben.",
      "[Oongka/Damiane] Im Bosskampf war es nicht möglich, mit <b>Fernkampfwaffen andere Ziele als den Boss</b> anzuvisieren — behoben.",
      "Man wurde zum <b>Titelbildschirm zurückgeleitet</b>, wenn man bei vollem Inventar durch <b>„Lernen durch Beobachten“</b> eine Fähigkeit lernte, die bereits durch ein Abyss-Artefakt erlernt war. <b>Wer dadurch Abyss-Artefakte nicht zurückbekommen hat, erhält sie durch Zurücksetzen aller Werte zurück.</b> <span style='color:var(--gdim)'>Der Satz ist in der offiziellen Fassung grammatikalisch unvollständig, das Wort „behoben“ fehlt dort. Die mitgelieferte Wiederherstellungsanleitung ist ungewöhnlich, Pearl Abyss macht das selten.</span>",
      "Ein <b>visueller Treffereffekt</b> wurde selbst dann angezeigt, wenn man mit angelegter Maske einen NPC anzugreifen versuchte, der nicht angreifbar ist — behoben.",
      "Es kam zu einem <b>Absturz</b>, wenn man mit einem Charakter mit angepasstem Aussehen gegen einen bestimmten Boss kämpfte — behoben. <span style='color:var(--gdim)'>Die offizielle Seite versteckt den Bossnamen hinter einem Spoiler-Aufklapper: es geht um <b>Umbra</b>.</span>"
    ]},
    {cat:"Plattformen und Quelle",items:[
      "Sechs Plattformen mit dem Status <em>Patch jetzt verfügbar</em>: Steam (PC), Steam (Mac), PlayStation, Xbox, Epic Games Store, Mac App Store. Anders als bei 1.03.01 ist <em>Xbox on PC</em> hier nicht eigens aufgeführt.",
      "Quelle: offizielle Patch-Notizen Version 1.04.01 (Hotfix für alle Plattformen), Pearl Abyss, 23.04.2026 14:45 UTC (boardNo 85). <span style='color:var(--gdim)'>Nachtrag vom 05.09.2026: Dieser Patch fehlte im Wiki-Bestand und wurde direkt an der offiziellen Notice-Seite nachrecherchiert.</span>"
    ]}
  ]},
  {ver:"1.04.00",date:"23.04.2026",size:"Veröffentlicht am 23.04.2026 um 01:48 UTC (boardNo 84); überarbeitet am 27.04.2026 (Titelzusatz „Revised: 2026/04/27“), einzelne Punkte tragen die Nachtragsvermerke „Added: 2026/04/23“ und „Added: 2026/04/27“. Die Seite führt alle sechs Plattformen (Steam PC, Steam Mac, PlayStation, Xbox, Epic Games Store, Mac App Store) mit <em>Patch jetzt verfügbar</em> (Stand 01.10.2026).",features:[
    {cat:"Neuer Content",items:[
      "Schwierigkeitsgrade Easy / Normal / Hard (Easy: längere Parry-/Dodge-Fenster; Hard: stärkere Gegner, weniger Roll-Unverwundbarkeit, mehr Boss-Konter)",
      "Massive Lager-Erweiterung: Sturdy Gatherables Chest (1.000 Slots), Kuku Cooler, Collectibles Chest (1.000), Wardrobe bis 1.000 Outfit-Slots + 'Select House'-Layouts",
      "Vogel-Pets in ganz Pywel, 5 neue Katzen-Typen, Abyss Heuklang als Pet, Pet-Umbenennung, Pet-Geheimshop in Pororin",
      "Neue Ausrüstung: Damianes 'Sword of Starlight' (Quest), Tree Branch / Sturdy Tree Branch, Kliffs 'Baltheon'-Rüstung",
      "Welt: Konstabuleien in Hernand/Demeniss, Vieh-Händler, Cloudcart als permanentes Mount, Item-Lock-Funktion, 13 neue Tattoos",
      "Nachträge der Revision: Mission-Dispatch-Menü mit getrennten Schaltflächen 'Dispatch' und 'Repeat Mission' (einmal oder wiederholt entsenden; Nachtrag 23.04.); Damiane kann Quick Reload auch mit Abyss Artifacts erwerben (Nachtrag 23.04.); ein nach dem Aufstellen verschwundener Sotdae of Bond lässt sich über die Item-Recovery von Carl im Greymane Camp zurückholen (Nachtrag 27.04.)"
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
  {ver:"1.03.01",date:"12.04.2026",size:"Hotfix für alle Plattformen, Release 12.04.2026 02:50 UTC (boardNo 83), einen Tag nach dem Hauptpatch 1.03.00. Drei Punkte, zwei davon zur Fähigkeit „Schleier des Windes“. Sieben Plattformen alle versorgt.",features:[
    {cat:"Patch-Details",items:[
      "<b>Projektile</b> prallten ab oder verschwanden, wenn die Fähigkeit <b>„Schleier des Windes“</b> benutzt wurde — behoben. <span style='color:var(--gdim)'>Namenshinweis: Die englische Fassung derselben Notiz nennt die Fähigkeit <em>Nature's Snare</em>. Es ist dieselbe Fähigkeit, nur unterschiedlich lokalisiert — im Wiki taucht sie an anderer Stelle unter dem englischen Namen auf.</span>",
      "[Xbox] Bei Verwendung eines <b>Wireless-Controllers</b> ließ sich die Fähigkeit <b>„Schleier des Windes“</b> sporadisch nicht einsetzen — behoben.",
      "<b>Beute</b> wurde gelegentlich nicht im <b>privaten Lager</b> aufbewahrt, wenn eine Region in bestimmten Situationen befreit wurde — behoben."
    ]},
    {cat:"Plattformen und Quelle",items:[
      "Sieben Plattformen mit dem Status <em>Patch jetzt verfügbar</em>: Steam (PC), Steam (Mac), PlayStation, Xbox, Xbox on PC, Epic Games Store, Mac App Store.",
      "Quelle: offizielle Patch-Notizen Version 1.03.01 (Hotfix für alle Plattformen), Pearl Abyss, 12.04.2026 02:50 UTC (boardNo 83). <span style='color:var(--gdim)'>Nachtrag vom 05.09.2026: Dieser Patch fehlte im Wiki-Bestand und wurde direkt an der offiziellen Notice-Seite nachrecherchiert.</span>"
    ]}
  ]},
  {ver:"1.03.00",date:"11.04.2026",size:"Veröffentlicht am 11.04.2026 um 02:50 UTC (boardNo 81); der Titel trägt den Zusatz „Revised: 2026/04/11“ (überarbeitet am 11.04.2026, Uhrzeit nicht genannt). Die Seite führt alle sechs Plattformen (Steam PC, Steam Mac, PlayStation, Xbox, Epic Games Store, Mac App Store) mit <em>Patch jetzt verfügbar</em> (Stand 01.10.2026).",features:[
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
  {ver:"1.02.00",date:"04.04.2026",size:"Veröffentlicht am 04.04.2026 um 01:14 UTC (boardNo 80); überarbeitet am 04.04.2026 um 05:00 UTC (Titelzusatz „Revised“; der Punkt zur hängenden Bank-Investitionsanzeige trägt den Vermerk „Added: 2026/04/04 05:00 UTC“). Die Seite führt alle sechs Plattformen (Steam PC, Steam Mac, PlayStation, Xbox, Epic Games Store, Mac App Store) mit <em>Patch jetzt verfügbar</em> (Stand 01.10.2026).",features:[
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
      "Save/Load-Menüs getrennt mit Slot-Nummern; Shop-UI priorisiert verkäufliche Items",
      "Bank: Anzeige der Investitions-Aktualisierung blieb auf 'Refreshing' hängen — behoben (Nachtrag der Revision vom 04.04.2026, 05:00 UTC)"
    ]},
    {cat:"Grafik",items:[
      "Neue Option 'Headgear Visibility' (Always Show / Show in Combat / Hide in Cutscenes / Always Hide)",
      "FSR-Qualität verbessert (FSR SDK 2.2 auf PC); PS5 Pro: PSSR Sharpen + Native AA; Xbox Series X: 4K-Upscaling im Performance Mode"
    ]}
  ]},
  {ver:"1.01.03",date:"31.03.2026",size:"Hotfix für alle Plattformen, Release 31.03.2026 03:05 UTC (boardNo 79). Genau eine Fehlerbehebung, dafür eine gewichtige: stehengebliebene Bosse. Sieben Plattformen einzeln als versorgt aufgeführt, hier taucht <em>Xbox on PC</em> als eigener Eintrag neben Xbox auf.",features:[
    {cat:"Patch-Details",items:[
      "Einige <b>Bosse</b> bewegten sich im Kampf gelegentlich nicht mehr — behoben."
    ]},
    {cat:"Plattformen und Quelle",items:[
      "Sieben Plattformen mit dem Status <em>Patch jetzt verfügbar</em>: Steam (PC), Steam (Mac), PlayStation, Xbox, Xbox on PC, Epic Games Store, Mac App Store.",
      "Quelle: offizielle Patch-Notizen Version 1.01.03 (Hotfix für alle Plattformen), Pearl Abyss, 31.03.2026 03:05 UTC (boardNo 79). <span style='color:var(--gdim)'>Nachtrag vom 05.09.2026: Dieser Patch fehlte im Wiki-Bestand und wurde direkt an der offiziellen Notice-Seite nachrecherchiert.</span>"
    ]}
  ]},
  {ver:"1.01.02",date:"30.03.2026",size:"Reiner Steam-Hotfix am selben Tag wie 1.01.01, Release 30.03.2026 10:05 UTC (boardNo 78). Zwei Punkte, beide zur Bildqualität. Kein Update-Zeitplan auf der Seite, weil die Notiz nur Steam betrifft.",features:[
    {cat:"Patch-Details",items:[
      "Die Bildqualität von <b>NVIDIA Ray Reconstruction</b> und <b>DLSS</b> wurde teilweise verbessert. Pearl Abyss kündigt an, den Bereich weiter zu prüfen und zu optimieren.",
      "Das Bild wirkte in bestimmten Umgebungen <b>unscharf</b>, und an den Übergängen zwischen <b>Himmel und Wolken</b> sowie bei <b>Raucheffekten an Schornsteinen</b> kam es zu <b>Flackern</b>, wenn diese Effekte sich mit umgebenden Objekten überschnitten — behoben."
    ]},
    {cat:"Plattformen und Quelle",items:[
      "Nur <b>Steam</b>. Die Seite führt keinen Update-Zeitplan mit Plattformstatus.",
      "Quelle: offizielle Patch-Notizen Version 1.01.02 (Steam Hotfix), Pearl Abyss, 30.03.2026 10:05 UTC (boardNo 78). <span style='color:var(--gdim)'>Nachtrag vom 05.09.2026: Dieser Patch fehlte im Wiki-Bestand und wurde direkt an der offiziellen Notice-Seite nachrecherchiert.</span>"
    ]}
  ]},
  {ver:"1.01.01",date:"30.03.2026",size:"Erster Hotfix nach dem ersten großen Patch, Release 30.03.2026 00:20 UTC (boardNo 77). Acht Fehlerbehebungen, Schwerpunkt auf Reittieren und darauf, dass Damiane und Oongka Dinge nicht konnten oder angezeigt bekamen, die ihnen nicht zustanden. Xbox war zum Zeitpunkt der Veröffentlichung als einzige Plattform noch in Vorbereitung.",features:[
    {cat:"Patch-Details",items:[
      "Die Taste zur Verwendung der <b>Amulette der fünf neuen Reittiere</b> wurde fälschlicherweise auch für <b>Damiane und Oongka</b> angezeigt — behoben.",
      "Der <b>Schwarzstern</b> verschwand nach dem Tod nicht, sondern blieb in der Luft stehen — behoben.",
      "Der <b>A.T.A.G.</b> wurde nicht zerstört, auch wenn seine Gesundheit auf 0 sank — behoben.",
      "Die Benutzeroberfläche zur Auswahl eines <b>Verfeinerungsziels</b> war unter bestimmten Bedingungen nicht mehr verfügbar — behoben.",
      "Das Halten der Taste zum <b>Folgen von NPCs</b> führte während einiger Quests zu ungewöhnlichen Bewegungen des Pferdes — behoben.",
      "Der <b>Sprint auf dem Weißbär</b> ließ sich nicht verwenden — behoben.",
      "Die Steuerung reagierte während der Interaktion <b>„Untersuchen“ mit dem Sternbild-Helm</b> nicht mehr — behoben.",
      "Die <b>Verfeinerung von Ausrüstung</b> war mit <b>Damiane und Oongka</b> nicht möglich — behoben."
    ]},
    {cat:"Plattformen und Quelle",items:[
      "Sechs Plattformen aufgeführt: Steam (PC), Steam (Mac), PlayStation, Epic Games Store und Mac App Store mit <em>Patch jetzt verfügbar</em>; <b>Xbox</b> stand als einzige auf <em>Patch wird derzeit vorbereitet</em>. Das ist der heutige Stand der deutschen Fassung; die englische Seite führt Xbox am 01.10.2026 mit <em>Patch available now</em>.",
      "Quelle: offizielle Patch-Notizen Version 1.01.01 (Hotfix für alle Plattformen), Pearl Abyss, 30.03.2026 00:20 UTC (boardNo 77). <span style='color:var(--gdim)'>Nachtrag vom 05.09.2026: Dieser Patch fehlte im Wiki-Bestand und wurde direkt an der offiziellen Notice-Seite nachrecherchiert.</span>"
    ]}
  ]},
  {ver:"1.01.00",date:"28.03.2026",size:"Veröffentlicht am 28.03.2026 um 18:00 UTC (boardNo 76). Die Seite führt alle sechs Plattformen (Steam PC, Steam Mac, PlayStation, Xbox, Epic Games Store, Mac App Store) mit <em>Patch jetzt verfügbar</em> (Stand 01.10.2026).",features:[
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
  {ver:"1.00.04",date:"23.03.2026",size:"Besonderheit: Zu dieser Versionsnummer gibt es <b>zwei getrennte Patch-Notizen</b> unter zwei Board-Nummern, je eine pro Plattform. Der PlayStation-Hotfix erschien am 23.03.2026 um 07:25 UTC (boardNo 74), der Mac-Steam-Hotfix am 24.03.2026 um 16:51 UTC (boardNo 75). Beide tragen dieselbe Version, betreffen aber unterschiedliche Fehler. Hier sind sie als ein Eintrag zusammengefasst und nach Plattform getrennt ausgewiesen.",features:[
    {cat:"PlayStation-Hotfix (23.03.2026, 07:25 UTC)",items:[
      "[PS5 Pro, PS5] <b>Bewegungen und Interaktionen</b> funktionierten nach dem <b>Wechsel von einem anderen Charakter zu Kliff</b> nicht ordnungsgemäß — behoben."
    ]},
    {cat:"Mac-Steam-Hotfix (24.03.2026, 16:51 UTC)",items:[
      "[Mac Steam] Es kam gelegentlich zu <b>Abstürzen</b>, wenn Quests abgeschlossen, das Spiel gestartet oder beendet wurde — behoben."
    ]},
    {cat:"Quelle",items:[
      "Offizielle Patch-Notizen Version 1.00.04 (PlayStation Hotfix), boardNo 74, und Version 1.00.04 (Mac Steam Hotfix), boardNo 75, Pearl Abyss. <span style='color:var(--gdim)'>Nachtrag vom 05.09.2026: Diese Version fehlte im Wiki-Bestand und wurde direkt an beiden offiziellen Notice-Seiten nachrecherchiert. Dass eine Versionsnummer zwei plattformspezifische Notizen trägt, kommt auf dem offiziellen Board nur bei 1.00.04 vor (Stand 01.10.2026: 47 Versionen in 48 Patch-Posts); verwandt ist nur 1.00.02, dessen Notes erwähnen, dass PlayStation den Patch in zwei Teilen (1.00.01 und 1.00.02) erhält.</span>"
    ]}
  ]},
  {ver:"1.00.03",date:"23.03.2026",size:"Veröffentlicht am 23.03.2026 um 01:10 UTC (boardNo 73). Der Titel trägt den Zusatz „2026/03/25 (Revised: 13:30 UTC)“: Die Notes wurden laut Titel am 25.03.2026 um 13:30 UTC überarbeitet, einzelne Punkte tragen die Vermerke „Edited“ und „Added“ vom 24.03.2026 (03:00 und 11:30 UTC). Laut Update-Zeitplan folgten PlayStation am 23.03.2026 um 02:15 UTC, Xbox um 08:15 UTC und der Epic Games Store am 25.03.2026 um 13:15 UTC (englische Fassung; die deutsche nennt jeweils eine Stunde später, ebenfalls als „UTC“).",features:[
    {cat:"Quality of Life",items:[
      "Mehr Abyss-Nexus in ganz Pywel (schnelleres Fast Travel); Private Storage in Hernand-Unterkünften + Howling Hill Camp",
      "Knowledge schneller erlernbar (Skill-Beobachtung nur noch einmal nötig); Erze/Sammelobjekte werden in der Nähe automatisch entdeckt; Visione wird nach dem Lesen von Memory Fragments (deutsch Erinnerungsspuren) mit der Laterne automatisch ausgerüstet und die Erinnerung abgespielt",
      "Baumfällen erleichtert; Heilwirkung von Zutaten/Essen erhöht; Witches-Shop mit täglichem Reset",
      "Essen wird bei Erhalt automatisch in Quick Slots registriert; Knowledge/Notifications ins Journal verschoben"
    ]},
    {cat:"Kampf & Balance",items:[
      "Gesundheit mancher früher Gegner und einzelner Hauptquest-Bosse reduziert (Klarstellung der überarbeiteten Notes: nur Gesundheit); T'rukan the Ascended: Angriff und Gesundheit angepasst (Nachtrag 24.03.); Kearush the Slayer: einzelne Angriffsmuster angepasst (keine Werte-Senkung genannt); Reed-Devil-Hinterhalt leichter",
      "Minispiele: QTE-Schwierigkeit beim Armdrücken und beim Festhalten am Boden gesenkt; Schusswaffen- und Bogenwettbewerb leichter; Duo: NPCs ertappten sich nicht mehr gegenseitig beim Schummeln (behoben)",
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
  {ver:"1.00.02",date:"19.03.2026",size:"Erster Patch nach Release. Veröffentlicht am 19.03.2026 um 22:20 UTC (boardNo 72). Laut Update-Zeitplan folgten PlayStation und Epic Games Store ab 20.03.2026, 01:00 UTC, und Xbox ab 21.03.2026, 07:00 UTC (die deutsche Fassung nennt für Xbox 08:00 Uhr „UTC“); der Mac App Store sollte laut Seite zu einem späteren Zeitpunkt folgen. PlayStation erhielt den Patch in zwei Teilen (1.00.01 und 1.00.02).",features:[
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
 {icon:"🎯",name:"Orb Roll",patch:"1.10.00",conf:"high",ort:"Great Gate of Urdavah (Ostturm), Crimson Desert — 4 Automaten",start:"Kostenlos; Start mit 10 Versuchen, mehr durch 5 gesammelte Würfel oder perfekte Level",ablauf:"50 immer schwerere Level: Mit Viereck/X Schusskraft aufladen, mit L1/R1 die Kanone ausrichten und die Kugel an Hindernissen vorbei ins rote Zielfeld rollen. Alle 10 Level gibt es Belohnungen über die Challenge 'Toys' (Untertitel 'A Fragment of Forgotten Childhood'; Missionen The Beauty of Angles, Lively Bounce, Perfect Design, Ethereal Orbit, The World in an Orb).",belohnung:"Level 10: Twilight Lampshade, Abyss Artifact · Level 20: Large Twilight Floral Carpet · Level 30: Twilight Drop Light, Small Artifact Chest, Box of Fortune · Level 40: Large Moonlit Garden Carpet, Box of Fortune, Golden Apple · Level 50: Large Stone Knotted Carpet, Twilight Starcluster Light, Blueprint: Clanging King, Medium Artifact Chest, Box of Fortune, Golden Apple (laut questlog kein Abyss Gear)"},
 {icon:"🦾",name:"Claw Machine (Greifautomat)",patch:"1.06.00",conf:"high",ort:"'Laughing Marionette', Jahrmarkt nordwestlich der City of Demeniss (Zelt mit 3 Automaten am Riesenrad)",start:"Am Automaten interagieren und mit Silber zahlen",ablauf:"Jeder Preis steckt in einem Käfig mit einer offenen fünfeckigen Seite — der Greifstab muss exakt durch diese Öffnung abgesenkt werden, um den Käfig von innen zu haken. Preise rotieren täglich.",belohnung:"Deko-Lampen, Stuhl, spezielle Kopfbedeckungen, Abyss Artifacts, Abyss Gear"},
 {icon:"✂️",name:"Schere, Stein, Papier",patch:"Release",conf:"high",ort:"Kinder in allen größeren Städten (Hernand, Demeniss, Delesyia, Tashkalp, Varnia, Pailune)",start:"Kind ansprechen und herausfordern; danach ~23 Ingame-Stunden Cooldown",ablauf:"Best-of-3 Schere-Stein-Papier. Siege zählen für die Mind-Games-Challenge 'A Silent War' (3 Siege an verschiedenen Tagen/Orten).",belohnung:"Zufälliges Insekt pro Sieg + Beziehungspunkte zur Fraktion"},
 {icon:"💪",name:"Armdrücken",patch:"Release",conf:"high",ort:"Hernand Inn (City of Hernand), Taverne in Calphade (ab Kapitel 7), Inn in Pailune (ab Kapitel 8); ohne Challenge auch bei den Finhold Netmakers (Delesyia)",start:"Sitzenden Einwohner am Tisch herausfordern",ablauf:"Button-Mashing plus Kreis-QTE: Schnelles Drücken füllt die rote Leiste; beim QTE warten, bis der Zeiger auf dem weißen Segment links landet. Guide-Tipp: Grafik-Preset 'Performance' verlangsamt den QTE-Zeiger. Test-of-Strength-Challenges 'Hero's Handshake I–III': je 3 Siege in Folge, dann der Champion.",belohnung:"Geld; laut Guide für 'Hero's Handshake III' zusätzlich 1 Abyss Artifact"},
 {icon:"🃏",name:"Duo (Kartenspiel)",patch:"Release",conf:"high",ort:"Obergeschoss des Hernand Inn (City of Hernand); größerer Tisch in Tommaso (Tashkalp, Crimson Desert; laut PowerPyx für 3 Spieler, dort wirft das Erwischen eines schummelnden Gegners ihn vom Tisch) — dort erschienen die Duo-NPCs bis Patch 2.03.01 nicht. Fextralife nennt zusätzlich Beighen, andere Guides verorten dort nur Five-Card",start:"Am Glücksspieltisch Platz nehmen; Einsatz 15 Silber (Hernand), in Tommaso laut Guide 300 Silber",ablauf:"Glücksspiel nach Art des koreanischen Seotda: 2 Karten, höchste Kombination gewinnt den Pot (Check, All-in, Half-/Double-Raise, Call, Fold). Wer die Mischbewegung des Gegners dreimal beobachtet (blaue Umrandung), schaltet eine Schummel-Fähigkeit frei. Mind-Games-Challenge: 'A Bloom of High Stakes' (laut PowerPyx schon durch die Teilnahme an Duo an einem beliebigen Ort freigeschaltet; die frühere Angabe 'nach Hero's Handshake I' ist nicht belegt, denn 'Hero's Handshake' gehört in questlog zur Challenge 'Test of Strength'. Aufgabe: Siegesserie ×3 und je einmal gegen 1, 2 und 3 Gegner gewinnen; in questlog folgt die Mission auf 'A Silent War'). Mit dem Deceiver's Fedora sieht man in Duo und Five-Card alle gegnerischen Hände (PowerPyx). Bezug laut PowerPyx: Mineralhändler im Obergeschoss der Arena von Tommaso (erscheint nach den Arena-Quests, Vertrauen 100, 97 Silber); die Rüstungsdaten des Wikis nennen dagegen Drop von Noble Punter und Händler Seratien — Widerspruch ungeklärt. Namen der Duo-NPCs in Tommaso nennt keine geprüfte Quelle.",belohnung:"Geldgewinne (Pot)"},
 {icon:"🂠",name:"Five-Card (Kartenspiel)",patch:"Release",conf:"high",ort:"Spielhölle in Beighen (Gebäude mit Ork-Türsteher), Pailune",start:"Laut PowerPyx auch vor dem Abschluss der Odeck-Questreihe 'Executioner of Justice' spielbar; erst danach wird die Challenge 'Key of Destiny' verfügbar (die Reihe erscheint nach den meisten anderen Pailune-Fraktionsquests, zeitgleich mit den Stjar-Clan-Quests). Einsatz und Tischgröße nennt keine geprüfte Quelle",ablauf:"Duo-Variante mit 5 Karten pro Runde und gleicher Setz-/Schummelmechanik; laut questlog-Beschreibung bilden drei Karten die Wertung, die übrigen zwei entscheiden den Sieger. PowerPyx ordnet das Spiel dem Odeck-Stamm zu. Beste Hand: 'Prime Pair' (rote 3 + rote 8). Mind-Games-Challenge: 'Key of Destiny' (Siegesserie ×3 und je einmal gegen 1, 2 und 3 Gegner gewinnen).",belohnung:"Geldgewinne"},
 {icon:"🏹",name:"Shot Contest: Bogen",patch:"Release",conf:"high",ort:"Lioncrest Manor, Hernand",start:"Beim Veranstalter anmelden, 80 Kupfer Startgebühr; nur als Kliff spielbar (PowerPyx)",ablauf:"Wettschießen: Wer zuerst 10 zufällig erscheinende Ziele trifft, gewinnt. L2 spannt und zielt, Loslassen schießt.",belohnung:"Preisgeld (steigt mit der Siegesserie); Shooting-Challenge 'Hawkeye' (drei Siege in Folge in einer Sitzung, dann der Champion 'Bullseye Robin'; Belohnung Geld und 1x Destruction I)"},
 {icon:"🔫",name:"Shot Contest: Gewehr",patch:"Release",conf:"high",ort:"City of Hernand, nördlich von Lioncrest Manor (PowerPyx); Fextralife: nahe Lioncrest Manor",start:"Beim Veranstalter anmelden, 1 Silber Startgebühr; nur als Damiane spielbar (PowerPyx: 'can only be participated in while playing as Damiane'; Fextralife: 'exclusive to the Damiane') — ob seit Patch 1.08.00 (Kliff kann Musketen nutzen) auch Kliff teilnehmen darf, ist nicht belegt",ablauf:"Wie der Bogenwettbewerb, nur mit Gewehr: zuerst 10 Zufallsziele treffen.",belohnung:"Preisgeld; Shooting-Challenge 'Silver Trigger' (drei Siege in Folge in einer Sitzung, dann der Champion 'Wick of the High Noon'; Belohnung Geld und 1x Insight I)"},
 {icon:"🥊",name:"Unarmed Duel: Boxen",patch:"Release",conf:"high",ort:"Goldenfist Arena, Hernand",start:"In der Arena antreten, 30 Kupfer Startgebühr",ablauf:"Duell nur mit bloßen Fäusten — Waffen oder regelwidrige Angriffe führen zur sofortigen Disqualifikation. Teil der Duel-Challenges.",belohnung:"Arena-Preisgeld; Duel-Challenge 'Steel Fist' (ab Kapitel 4; 3 Siege in Folge, dann der Champion): Geld und Trophäe 'Trophy - Unarmed Duel' (Möbel)"},
 {icon:"🔱",name:"Weapon Duel: Speer",patch:"Release",conf:"high",ort:"City of Hernand (laut PowerPyx nordöstlich von Lioncrest Manor)",start:"Zum Speerduell herausfordern, 45 Kupfer Startgebühr",ablauf:"Duell, bei dem ausschließlich der Speer erlaubt ist; Regelverstöße disqualifizieren.",belohnung:"Duell-Preisgeld; Duel-Challenge 'Dragon's Fang' (3 Siege in Folge, dann der Champion): Geld und Trophäe 'Trophy - Spear Duel' (Möbel)"},
 {icon:"🤼",name:"Ringkampf",patch:"Release",conf:"high",ort:"Kharonso, Hernand (PowerPyx verortet den Wettkampf beim Scholastone Institute in Hernand)",start:"In der Arena antreten, 1 Silber; alle Waffen ablegen",ablauf:"Reiner Grappling-Wettkampf ohne Schläge — der Sieg fällt ausschließlich über Griffe und Würfe.",belohnung:"Preisgeld; Duel-Challenge 'Indomitable Will' (3 Siege in Folge, dann der Champion): Geld und Trophäe 'Trophy - Wrestling Match' (Möbel)"},
 {icon:"✋",name:"Handdrücken (Hand Wrestling)",patch:"Release",conf:"medium",ort:"Südlich der Stadt Delesyia",start:"Herausforderer ansprechen; Startgebühr nicht erfasst",ablauf:"Kräftemessen im Stehen: Beide fassen sich an den Händen; gewonnen hat, wer das Gleichgewicht des Gegners bricht und ihn zu Boden bringt (ähnlich Armdrücken). Test-of-Strength-Challenge: 'Freesword's Grasp' (3 Siege in Folge, dann der Champion).",belohnung:"Geld; laut Guide für 'Freesword's Grasp' zusätzlich 1 Abyss Artifact"},
 {icon:"⚔️",name:"Weapon Duel: Schwert",patch:"Release",conf:"medium",ort:"Arena (Bonepit) in Tommaso, Crimson Desert",start:"Erst nach den Missionen 'The Bonepit' und 'Duel with the Emperor' (Quest 'Emperor of the Bonepit'); Startgebühr nicht erfasst",ablauf:"Schwertkampf-Wettbewerb (Swordsmanship Contest) mit Schwert und Schild, ähnlich dem Speerduell. Duel-Challenge: 'Undying Knight' (3 Siege in Folge, dann der Champion).",belohnung:"Geld und Trophäe 'Trophy - Sword Duel' (Möbel)"},
 {icon:"🥋",name:"All-Out Duel (Mixed Martial Arts)",patch:"Release",conf:"medium",ort:"Tashkalp (Crimson Desert); mapmaster.io nennt Tommaso",start:"In der Arena antreten, nur mit bloßen Fäusten; Startgebühr nicht erfasst",ablauf:"Waffenloses Duell, das Faustkampf und Ringen kombiniert (questlog: 'Unarmed Duel - Mixed Martial Arts'). Duel-Challenge: 'Throne of the War God' (3 Siege in Folge, dann der Champion).",belohnung:"Geld und Trophäe 'Trophy - All-Out Duel' (Möbel)"},
 {icon:"🏇",name:"Pferderennen",patch:"Release",conf:"medium",ort:"Rennstrecke neben der Breesman Pasture bei Demeniss",start:"Nach Befreiung von Demeniss (ab Kapitel 10) beim Veranstalter an der Tribüne",ablauf:"3 Runden gegen einen NPC-Gegner. Entscheidend ist das Stamina-Management des Pferdes: Sprintphasen mit kurzen Erholungen abwechseln, Innenbahn halten. Verknüpft mit Racing-Challenges wie dem 'Darkhooves Grand Prix'.",belohnung:"Racing-Challenge 'Darkhooves Grand Prix' (Sieg gegen den Champion); laut mapmaster.io gibt es dafür die 'Riding Attire' (Rüstung, die das Zähmen von Pferden erleichtert) — questlog führt sie nur als Händlerware bei Sumore"},
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
 "The Dancing Catfish Pirates":"https://cdn.questlog.gg/crimson-desert/assets/_sprites/cd_knowledgeimage_node_piratei.webp",
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
 "The Goldenscale Bandits":"https://cdn.questlog.gg/crimson-desert/assets/_sprites/cd_knowledgeimage_node_iguana_riders.webp",
 "The Dusksongs":"https://cdn.questlog.gg/crimson-desert/assets/_sprites/cd_knowledgeimage_node_isvatufortress.webp",
 "Savage Fangs":"https://cdn.questlog.gg/crimson-desert/assets/_sprites/cd_knowledgeimage_node_crim_stompsandfortruins.webp",
 // Hostile Machines: questlog hat keinen eigenen Sammel-Sprite; Mechanicus Mk.XII (eine von Marnis Kampfmaschinen) als repraesentatives Konstrukt-Bild (HTTP-200-verifiziert, visuell geprueft 2026-06-18).
 "Hostile Machines":"https://cdn.questlog.gg/crimson-desert/assets/_sprites/cd_knowledgeimage_knowledge_mechanicusmk12.webp",
 "Hyena":"https://cdn.questlog.gg/crimson-desert/assets/_sprites/cd_portraitimage_animal_hyena_wild_30043.webp",
 "Lightningwalker":"https://cdn.questlog.gg/crimson-desert/assets/_sprites/cd_knowledgeimage_knowledge_lightning_golem.webp",
 "Rustwalker":"https://cdn.questlog.gg/crimson-desert/assets/_sprites/cd_knowledgeimage_knowledge_scrap_golem.webp",
 "Hexe Earthen Soldier":"https://cdn.questlog.gg/crimson-desert/assets/_sprites/cd_knowledgeimage_knowledge_hexe_potsoldier.webp",
 "The Blinding Arrows":"https://cdn.questlog.gg/crimson-desert/assets/_sprites/cd_knowledgeimage_node_righteousarrows.webp",
 "The Twilight Messengers":"https://cdn.questlog.gg/crimson-desert/assets/_sprites/cd_knowledgeimage_node_crimson_mountains_fortress.webp",
 "The Mistcloaked Owls":"https://cdn.questlog.gg/crimson-desert/assets/_sprites/cd_knowledgeimage_faction_muiquun.webp",
 "Skull Knight Follower":"https://cdn.questlog.gg/crimson-desert/assets/_sprites/cd_knowledgeimage_knowledge_skullkinight_follower.webp",
 "Titan's Minion":"https://cdn.questlog.gg/crimson-desert/assets/_sprites/cd_knowledgeimage_knowledge_titan_follower.webp",
 "H.A.L.L.":"https://cdn.questlog.gg/crimson-desert/assets/_sprites/cd_knowledgeimage_node_marni.webp"
};
const ENEMIES={
 wild:[
  {name:"Wolf",de:"Wolf",region:"Westliches Pywel",drops:"Small Bone, Long Hair Hide, Fine Meat, Fang",note:"Rudeljäger mit hoher Ausdauer und Intelligenz — testet Beute erst auf Schwächen und greift dann koordiniert an. Wird von den Sandfang Marauders als Reittier genutzt."},
  {name:"Bear",de:"Bär",region:"Ganz Pywel außer Crimson Desert",drops:"Large Bone, Thick Hide, Tough Meat, Fang; seltener: Honey, Bear's Gallbladder, Boss Bear Hat, Bear Hide Cloak",tipp:"Wehrt sich beim Farmen massiv — Proviant mitnehmen. Kann geritten, aber nicht dauerhaft gezähmt werden.",note:"Spitzenprädator an der Spitze von Pywels Nahrungskette — trotz niedlicher Optik dominiert er das Ökosystem."},
  {name:"Boar",de:"Wildschwein",region:"Ganz Pywel außer Crimson Desert",drops:"Small Bone, Long Hair Hide, Fine Meat, Fang",note:"Wildschwein mit langen, gebogenen Hauern für Kraftproben gegen Rivalen. Die Savage Fangs reiten Eber als Reittiere."},
  {name:"Deer",de:"Hirsch",region:"Ganz Pywel außer Crimson Desert",drops:"Small Bone, Short Hair Hide, Fine Meat, Long Horn",note:"Nicht aggressives Herdentier und beliebtes Jagdziel — Männchen tragen mehrendige Geweihe."},
  {name:"Fox",de:"Fuchs",region:"Südliches Pywel",drops:"Small Bone, Thin Hide, Lean Meat",note:"Anpassungsfähiger Beutegreifer nahe Siedlungen (stiehlt Vieh); tappt dank seiner Schläue selten in Fallen. Varianten: Snowfield Fox, Desert Fox."},
  {name:"Goat",de:"Ziegenbock",region:"Ganz Pywel",drops:"Small Bone, Short Hair Hide, Fine Meat, Short Horn",note:"Überlebenskünstler in rauen Umgebungen — liefert Milch, Fleisch, Wolle und Leder."},
  {name:"Sheep",de:"Schaf",region:"Ganz Pywel",drops:"Small Bone, Short Hair Hide, Fine Meat, Short Horn, Fleece",note:"Wichtigstes Nutztier der Bewohner Pywels — einzige Wildtier-Quelle für Fleece (Skinning)."},
  {name:"Cow",de:"Kuh",region:"Ganz Pywel",drops:"Large Bone, Short Hair Hide, Tender Meat, Short Horn",note:"Häufigstes Nutztier — muskulöses Zug- und Arbeitstier mit markanten Hörnern."},
  {name:"Highland Cow",de:"Hochland-Bulle",region:"Pailune, Hernand",drops:"Large Bone, Short Hair Hide, Tender Meat, Short Horn",note:"Rinderrasse mit langen Stirnfransen; das dichte, wellige Fell schützt gegen Kälte. Trotz langer Hörner sanftmütig und daher beliebtes Nutztier. Eigener Knowledge-Eintrag; kein registrierbarer Mount (Audit 23.08.2026)."},
  {name:"White-Striped Longhorn",de:"Weißstreifen-Langhorn",region:"Pailune",drops:"Large Bone, Short Hair Hide, Tender Meat, Short Horn",note:"Bovine mit auffällig gebogenen Hörnern und leuchtend weißen Streifen im Fell; wehrt sich gegen Raubtiere mit Hornstößen. Eigener Knowledge-Eintrag; kein registrierbarer Mount (Audit 23.08.2026)."},
  {name:"Rhinoceros",de:"Nashorn",region:"Crimson Desert",drops:"Large Bone, Thick Hide, Tough Meat, Ivory",note:"Einzelgänger mit panzerartiger Haut, aber empfindlichem Gemüt — schützt sich mit Schlamm vor der Sonne. Ivory-Quelle."},
  {name:"Elephant",de:"Elefant",region:"Demeniss (Wildlife Park)",drops:"Large Bone, Thick Hide, Tough Meat, Ivory",note:"Sanftes, hochintelligentes Großtier aus einem fernen Land — erinnert sich an Orte und erkennt Menschen wieder."},
  {name:"Hedgehog",de:"Igel",region:"Hernand",drops:"Small Bone, Thin Hide, Lean Meat",tipp:"Golden Apples sieht laut Item-Beschreibung nur der Igel: auf den Boden statt in die Bäume achten — schimmert ein Licht auf dem Rücken eines Igels, ihm folgen. Laut Guides tragen solche Igel den Golden Apple sichtbar auf dem Rücken (laut einem Guide u.a. bei Grey Rock Dock an Straße und Flussufern, meist 16–19 Uhr Spielzeit; Fextralife nennt für alle Varianten nur Hernand ohne feste Orte): Igel mit einem Pfeil beschießen, dann den heruntergefallenen Apfel mit aufgesetzter Maske stehlen. Golden Apple ist Zutat des Gold-Bar-Rezepts im Hexen-Workshop (1 Golden Apple + 3 Gold Ore).",note:"Klein, aber durch dichte Stacheln gut geschützt; beim Dauerfressen bleiben Früchte auf den Stacheln hängen — daher sechs Erscheinungsbilder: normal sowie Apple, Mushroom, Grape, Orange und Golden Apple (Fextralife; questlog führt sechs Igel-Datensätze, aber ohne Variantennamen)."},
  {name:"Hyena",de:"Hyäne",region:"Crimson Desert (u.a. Hyena Den)",drops:"Small Bone, Long Hair Hide, Fine Meat, Fang",note:"Grausames Raubtier, das die Wüste beherrscht — oft als reiner Aasfresser verkannt, jagt aber weit häufiger selbst; das Weibchen ist größer und aggressiver und führt das Rudel. Das Rudel um Skevald the Carrion King (Boss) terrorisiert die Bewohner von Tommaso; die Helms setzen Hyänen als Kampftiere ein (Helms Hyena)."}
 ],
 kreaturen:[
  {name:"Wandershrub",de:"Grasklumpen",region:"Pywel (u.a. Haunted Hill)",drops:"Core-Drops: Swift I, Haste I, Ascent I (je 5%)",tipp:"Perfekt getarnt als Gestrüpp — lauert reglos und stürmt im letzten Moment los. Die große Blitz-Variante greift mit Elektrizität an; auf Haunted Hill bewachen sie den Abyss Nexus.",note:"Pflanzenwesen in Klein/Groß- sowie Dry- und Lightning-Varianten."},
  {name:"Bismuth Oreback Crab",de:"Bismut-Erzrückenkrebs",region:"Crimson Desert; Farm-Spot: Drakesfall Castle (N von Hernand)",drops:"Bismuth Ore (100%), Abyss Cell (30%), Destruction I/Insight I (je 5%), Destruction II (0,3%)",tipp:"Tarnt sich als unscheinbarer Metall-/Erzklumpen am Boden — zuerst mit Force Palm (R3) enttarnen, dann wird sie feindlich und angreifbar. Kontaktschaden ist nicht zu unterschätzen, Heil-Food mitnehmen. Beste frühe Abyss-Cell-Farmquelle: Drakesfall Castle (N von Hernand, am Drakesfall Gorge, nahe Abyss-Schnellreisepunkt). Nur die kleinen Krabben killen — große töten lässt Hernands Soldaten das Gebiet besetzen und stoppt das Respawnen. Zum Respawnen wegreisen und zurück-schnellreisen oder am Lagerfeuer rasten.",note:"Züchtet Bismutkristalle auf dem Panzer — Rüstung und Waffe zugleich, bei Sammlern begehrt."},
  {name:"Stoneback Crab",de:"Steinrückenkrebs",region:"Pywel-weit (auch Wüsten-Varianten)",drops:"Iron Ore (100%), Abyss Cell (30%), Destruction I/Insight I (je 5%), Destruction II (0,3%)",note:"Trägt Steine verschiedener Größen auf dem Panzer und tauscht sie mit Artgenossen gegen besser passende; Varianten Klein/Mittel/Groß bis zur Queen Stoneback Crab."},
  {name:"Harpy",de:"Harpyie",region:"Pailune (Karanda-Gebiet)",drops:"Harpy Feather (50%); selten: Dandelion Longsword (1%)",note:"Fliegende Kreatur mit Frauenkopf und Vogelschwingen — verfolgt Eindringlinge ins Nest unerbittlich, sehr schnell, durchdringender Schrei. Auch als Shadow Harpy."},
  {name:"Webbed Spider",de:"Webespinne",region:"Hernand (Queen-Spider-Nester)",drops:"Spider Web (100%), Acid Spider Venom (20%)",note:"Komplett in klebrige Netze gehüllt — verlangsamt Beute und fängt Angreifer; Varianten: Acid Spider, Golden Silk Spider, Queen Spider (Boss)."},
  {name:"Heloderma Lizard",de:"Gila-Krustenechse",region:"Crimson Desert, Hernand",drops:"Small Bone, Lean Meat",note:"Auffällig schwarz-orange gemusterte Echse trockener Regionen; verbringt die heißen Stunden im Bau. Verwandte: Monitor Lizard, Frilled-Neck Lizard."},
  {name:"Monitor Lizard",de:"Komodowaran",region:"Crimson Desert (questlog), u.a. Forebearer's Barrens; Guides nennen zusätzlich Nord-Demeniss",drops:"Large Bone, Sturdy Hide, Tough Meat, Poison",conf:"medium",note:"Großer Waran, eigenständig vom Heloderma Lizard (Gila-Krustenechse). Beliebteste Poison-Farmquelle (mehrere Poison je Tier, schneller Respawn außerhalb der Render-Reichweite) und zugleich Lieferant für Sturdy Hide."},
  {name:"Crocodile",de:"Krokodil",region:"Crimson Desert, Demeniss (laut questlog); Guides nennen Flüsse östlich/nördlich von Delesyia und östlich von Demeniss",drops:"Sturdy Hide, Large Bone, Tough Meat",conf:"medium",note:"Wasser-Reptil und kanonische Sturdy-Hide-Quelle (eine der fünf Pflicht-Hautarten der Hunting Challenges). Das legendäre White-Scaled Crocodile (nördlich Delesyia) ist Jagdziel der Challenge 'The End of Myth' (Challenge 10)."},
  {name:"Ogre",de:"Oger",region:"Crimson Desert (versiegelt)",drops:"—",note:"Kolossales, rätselhaftes Monster der Wüste — fertigt sich Kleidung aus Tierhäuten, besitzt also eine gewisse Intelligenz. Herkunft und Zweck unbekannt; Ogre's-Items (Necklace/Ring) stammen aus anderen Quellen."},
  {name:"Hostile Machines",de:"Feindliche Maschinen",region:"Delesyia (um Marnis Labor, SO der Stadt)",drops:"Cogwheel, Small Battery (je 50%), Lubricant, Gunpowder (je 30%), Mercury (5%)",conf:"medium",note:"Maschinen-Konstrukte, die auf Nah- und Ferndistanz kämpfen. Cogwheels braucht man u.a. für Kuku-Items aus Grimnirs Werkstatt in Hernand. questlog führt Maschinen dieser Art unter der Fraktion H.A.L.L. (siehe eigener Eintrag bei den feindlichen Fraktionen)."},
  {name:"Lightningwalker",de:"Blitzläufer",region:"Fundort nicht erfasst",drops:"Abyss Cell (30%); Core-Drops Stufe I (je 12%): Destruction, Insight, Vigor, Vitality, Composure, Fortification, Aegis, Fortitude, Swift, Haste, Ascent; selten: Destruction II, Fortification II (je 1,5%)",conf:"medium",note:"Ein Ancient, der seinen Körper verlor und dessen Seele in Blitzen gebunden ist — ständig durchzucken ihn Ströme, die bei jeder Bewegung blau aufblitzen; seine Schläge schocken und lähmen und können Gegner mit einem Treffer fällen. Gleicher Angriffswert (700) und gleiche Drop-Tabelle wie die Walker-Bosse Icewalker, Grave Walker und Crookrock Walker, im Wiki aber ohne eigenen Bosseintrag."},
  {name:"Rustwalker",de:"Rostläufer",region:"Crimson Desert (Fraktion The Helms)",drops:"Abyss Cell (30%); Core-Drops Stufe I (je 12%): Destruction, Insight, Vigor, Vitality, Composure, Fortification, Aegis, Fortitude, Swift, Haste, Ascent; selten: Destruction II, Fortification II (je 1,5%)",conf:"medium",note:"Ein Ancient, der seinen Körper verlor und dessen Seele in Schrott gebunden ist — der Körper besteht aus verbogenen Metallteilen, jede Bewegung kreischt metallisch; mit seiner schweren Masse walzt er unaufhaltsam gegen Feinde vor. questlog ordnet ihn der Fraktion The Helms zu. Angriffswert (700) und Drop-Tabelle wie bei den Walker-Bossen."},
  {name:"Hexe Earthen Soldier",de:"Irdenkrieger der Hexe",region:"Demeniss (Hexe Wasteland)",drops:"Keramik-Sammelstücke (je 1%, z.B. Freshly Fired Celadon Vase, Medicine Jar, Water Jug); Archer: Bundle of Arrows (10%); Warrior: Garnet, Epidote, Azurite (je 10%), Diamond (2%), Abyss Artifact (1%)",note:"Unheilige Konstrukte aus grobem Stein und Metallsplittern, die das Hexe Wasteland bewachen — Varianten Soldier, Archer, Spearman, Swordsman und Warrior (mit Rundschild und schwerer Waffe), dazu Hinterhalt-Varianten, die aus dem Boden oder dem Wasser auftauchen. Zur Fraktion von Hexe Marie zählen außerdem der Exploding Hexe Jar (ein Krug mit Bäumchen, der auf Feinde zustürmt und sich selbst sprengt), Hexe Earthen Worm, Jarback Crab und Hexe Brimstoneback Crab (Drop: Brimstone)."},
  {name:"Titan's Minion",de:"Diener des Titans",region:"Pailune (Windsong Peaks, Fraktion Titan)",drops:"Light Copper Pouch, Small Grilled Fish, Meat Skewers, Engraved Copper Earring, Recipe: Fruit Punch, Fruit Punch",conf:"medium",note:"Ein aus riesigen Felsen und Erde geformtes Ungeheuer, das wirkt, als sei das Land selbst lebendig geworden; sein rissiger Körper verliert ständig Staub und Steine und bewegt sich eins mit dem Gelände. Es wirkt schwer und langsam, zermalmt aber sein Ziel mit überwältigender Masse, sobald es es erfasst hat. Gehört zur questlog-Fraktion Titan, deren Namensgeber (der Blitzgott der Dörfer um die Windsong Peaks) als Boss im Wiki steht; die Drop-Tabelle ist die eines allgemeinen Gegners. Die Einzelheiten von Fundorten und Kampf sind nicht erfasst."}
 ],
 fraktionen:[
  {name:"Bleed Bandits",region:"Hernand (u.a. Außenposten Fort Anvil)",drops:"Cloth Piece, Pelt, Fleece (Chance)",note:"Bewaffnete Banditen, die Hernand in Angst versetzen: Sie machen Opfer mit der Albtraum-Droge Dreamer's Bliss abhängig und versklaven sie — gestützt von einem mächtigen Hintermann im Schatten. [1.13.00: Alchemy Explosive Pack verliert jetzt bei jeder Bombenbeschwörung Haltbarkeit.]"},
  {name:"Fundamentalist Goblins",region:"Hernand",drops:"Iron Ore, Copper Ore, Fleece, Small Bone; selten: Regglin Plate Helm, Silver Bullet",note:"Goblin-Gelehrte, kaum besser als gewöhnliche Diebe — forschen ohne Skrupel und schrecken vor unmenschlichen Taten nicht zurück; etablierte Institute erkennen sie nicht an."},
  {name:"Wolf Trackers",region:"Hernand",drops:"Iron Ore, Copper Ore, Fleece, Small Bone",note:"Schlacht-besessene Jägerbande — keine Jäger, die der Natur danken, sondern Schlächter auf der Suche nach immer aufregenderer Beute, aktuell dem legendären Wolf. Blockieren mehrere Posten und Minen in Hernand — laut Fextralife Arroweye Posthouse, Bellanor Hunting Grounds, Spearhead Posthouse, Stormtalon Ridge Mine und Watchtower sowie Vilkom Outpost. Anführer ist laut questlog Giath (Boss; Maske und Hohepriester-Schmuck, jagte zuvor den legendären Black Fang), seine Stellvertreterin Gwen Kraber. Eine neuere Erzählung ('Tale of the Witch's Runt', questlog 1005715) nennt dagegen eine von der Black Witch verstoßene Jägerin als Anführerin der Wolf Trackers — Widerspruch, ungeklärt."},
  {name:"Southern Bandits",region:"Südliches Pywel, v.a. Hernand",drops:"Light Copper Pouch, Poison Arrow, Mask, Liquor Bottle, Cloth Piece, Thin Hide; selten: Tarnished Necklace, Tarnished Ring",note:"Gewöhnliche Wegelagerer, die im Süden Pywels Händler und Reisende aus dem Hinterhalt überfallen — weniger berüchtigt als Bleed Bandits oder Fundamentalist Goblins, erschüttern aber Hernands brüchigen Frieden zusätzlich. Im Spiel heißen die Gegner schlicht 'Bandit' (Wissenseintrag 'Southern Bandits'); denselben Wissenseintrag geben Bandit Ringleader und Slaughterer."},
  {name:"Hornsplitter's Guards",region:"Hernand",drops:"Bounty Hunter's Cloth Armor, Varnian Equipment Blueprint, Gunpowder (Chance)",note:"Die persönliche Elitegarde von Kailok the Hornsplitter (Goldleaf-Handelsgilde) — nur seine vertrautesten Leute, bereit, jeden Preis für seine Interessen zu zahlen."},
  {name:"St. Halssius's House of Healing",region:"Hernand",drops:"Light Copper Pouch (Chance), Cloth Piece, Thin Hide; Chance (je 10%): St. Halssius Priest Attire, St. Halssius Priest's Cloak, St. Halssius Priest's Hat, St. Halssius Priest's Leather Boots; Augustine: Light Copper Pouch, Bread",note:"Einst eine Heilanstalt für psychisch Kranke, heute faktisch ein Gefängnis: Statt Patienten werden vor allem 'ideologisch Unreine' aus Demeniss weggesperrt; Besuche sind verboten."},
  {name:"Reed Devil Minions",region:"Hernand (Schilffelder, Sunset Valley)",drops:"Hay, Battered Grains, Cloth Piece, Thin Hide",tipp:"Stehen immer wieder auf, egal wie oft man sie niederstreckt — es sind böse Geister in Vogelscheuchen-Körpern.",note:"Diener des Reed Devil (Boss). Für die Kranken von Sunset Valley paradoxerweise ein Hoffnungssymbol."},
  {name:"The Dancing Catfish Pirates",region:"Hernand/Delesyia (Küsten)",drops:"Iron Ore, Fleece, Copper Ore, Cogwheel, Small Battery; selten: A.T.A.G. Plating Mk III",note:"Skrupellose Piratencrew, die ihren aus Menschenexperimenten hervorgegangenen Anführer Sir Catfish fanatisch verehrt — Wracks und Opfer an fast jeder Küste Pywels."},
  {name:"Antumbra Order",region:"Ganz Pywel",drops:"Cloth Piece, Thin Hide; selten: Sword of Greed, Greymanes' Leather Helm",note:"Dunkler Kult, der Licht und Leben lästert und die Finsternis mit Menschenopfern verehrt — Heiligtümer in ganz Pywel; verspricht 'Gleichheit und Freiheit durch Dunkelheit'."},
  {name:"Bastier's Inquisitors",region:"Demeniss",drops:"Iron Ore, Copper Ore, Fleece, Captive's Cloth Armor; Kampfhunde: Small Bone, Long Hair Hide, Fang",note:"Auch als Righteous Inquisitors bekannt (die einzelnen Gegner heißen in questlog „Righteous Inquisitor“). Das einst gegen Korruption gegründete Righteous Tribunal, degeneriert zu Bastiers Machtinstrument — verfolgt heute das Volk, statt es zu schützen."},
  {name:"Crow Brothers",region:"Demeniss",drops:"Cloth Piece, Thin Hide; selten: Greymanes' Leather Armor",note:"Anhänger von Draven, dem Crowcaller — lernen seine Tötungstechniken, erhalten einen Teil seiner Macht und wirken finstere Magie; gieren ständig nach der Anerkennung ihres Meisters."},
  {name:"Flame Knights",region:"Demeniss (Flame Knights Castle, West)",drops:"Cloth Piece, Thin Hide, Light Copper Pouch (Chance); laut questlog-Droptabelle zusätzlich: Iron Ore, Fleece, Copper Ore, Small Bone",note:"Feuerbesessene Ritter unter der Schirmherrschaft von Lucian Bastier, die die Flame Knights Castle im Westen von Demeniss besetzen — kämpfen mit feuergetränkten Waffen und Schießpulver; kommandiert vom optionalen Boss Tristan the Flame Knight. [1.13.00: neue Spezialangriffe erhalten — Details noch nicht dokumentiert.]"},
  {name:"Mistwood Hunters",region:"Pailune (Wayward Woods)",drops:"Sleep Arrow, Bundle of Arrows, Packaged Salt, Cloth Piece",note:"Wilderer, die die Waldgeister der Wayward Woods zu Geld machen — jagen alles, was sich bewegt, und stürzen die Ordnung des Waldes ins Chaos."},
  {name:"Black Bears",region:"Pailune (Ashclaw Keep, Steinnfell Fortress u.a.; laut Boss-Einträgen auch im Raum Calphade)",drops:"Cloth Piece, Thin Hide; Chance: Elegant Carmine Helm Blueprint, Elegant Carmine Armor Blueprint, Small Staglord Banner Pike; Black Bear Siege Engine: Cogwheel, Lubricant",note:"Myurdins Fraktion — einst neben den Greymanes eine der stärksten Kampftruppen Pailunes, ermordete feige Jian und zerschlug die Greymanes; Belagerungsmaschinen und Lava Bears im Arsenal. Offiziere heißen im Spiel 'Black Bear Vice Captain' (questlog npc 1000303 und 1003110; im Wiki als Miniboss 'Black Bear Captain' geführt, die Zuordnung zu einem bestimmten Kampf ist nicht belegt)."},
  {name:"Lonely Jackals",region:"Pailune (Hauptstadt)",drops:"Cloth Piece, Thin Hide, Light Copper Pouch (Chance); Paulus zusätzlich: Beer, Jerky, Arrow",note:"Ludvigs Fraktion — lebte einst neben den Greymanes, schwor nach deren Vertreibung den Black Bears die Treue und unterdrückt seither rücksichtslos die Bevölkerung der Hauptstadt."},
  {name:"The Wyvernflames",region:"Delesyia (Fort Windridge)",drops:"Gunpowder, Bundle of Bullets, Cloth Piece; selten: Sonic Resonator, Gear Blueprint: Spirit's Judgment",note:"Nicht identifizierte Fraktion, die Fort Windridge besetzt hat — Gesetzlose, vereint durch ihre Bewunderung für den Wyvern-Bändiger Balthazar; sie plündern die Einheimischen, um sich eine Heimstatt an der Seite der Bestien zu schaffen, und befehligen mehrere Wyvern, zahlreich genug, um eine Festung niederzureißen. [1.13.00: neue Spezialangriffe erhalten — Details noch nicht dokumentiert.]"},
  {name:"The Helms",region:"Crimson Desert (Raids bis Demeniss/Delesyia)",drops:"Bundle of Bullets, Cogwheel, Lubricant, Gunpowder, Full Copper Pouch (Chance), Sealed Abyss Artifact; Helms Hyena: Small Bone, Long Hair Hide, Fine Meat, Fang; Siege Engines: Cogwheel; Rustwalker: Abyss Cell (30%), Core-Drops Stufe I wie Destruction I (je 12%)",note:"Der bösartigste Stamm der Wüste — der gesamte Stamm operiert als eine einzige Banditenbande und baut aus gestohlener Technik massive Kriegsmaschinen."},
  {name:"The Faceless",region:"Crimson Desert",drops:"Cloth Piece, Thin Hide, Modest Copper Pouch (Chance); Chance: Abyss Artifact Fabricator; Marzu: Full Copper Pouch, Wine, Cheese",note:"Adelsfeindliche Banditen in auffälligen Uniformen und Masken — sie folgen dem Aufruf ihres Anführers zum Sturz des demenissischen Adels und versprechen, das einfache Volk zu befreien, leben in Wahrheit aber von Überfällen auf genau die Dörfer, in denen dieses Volk lebt."},
  {name:"Muiquun Outlaws",region:"Crimson Desert (Muiquun)",drops:"Full Copper Pouch, Wine, Cheese, Cloth Piece (laut questlog von Jakril)",conf:"medium",note:"Verbannte, Berüchtigte und Ausgestoßene, die sich in der Wüste zusammengeschlossen haben — in Muiquun zählen weder Name noch Vergangenheit, nur die Stärke zu überleben. Einziges Mitglied in questlog ist Jakril (npc 1000544): ein auf den ersten Blick eleganter Adliger, dessen Stellung in Muiquun niemand anzufechten wagt; selbst die Banditen der Wüste nehmen sich vor ihm in Acht, seine wahren Absichten kennt niemand. Gegner-NPCs der Fraktion sind in questlog nicht verzeichnet. Das Bildsymbol 'faction_muiquun' gehört dagegen zu The Mistcloaked Owls (questlog 1000057), nicht zu dieser Fraktion."},
  {name:"Sandfang Marauders",region:"Crimson Desert (größtes Territorium)",drops:"Bundle of Arrows, Modest Copper Pouch (Chance); selten: Explosive Arrow; Swift Wolf: Small Bone, Long Hair Hide, Fine Meat, Fang",note:"Die berüchtigtste Banditengruppe der Wüste, organisiert um Goblins, die wilde Wölfe zähmen und reiten — ihr Ziel: die Crimson Desert zu einen und ein eigenes Königreich zu errichten."},
  {name:"The Goldenscale Bandits",region:"Crimson Desert",drops:"Iron Ore, Copper Ore, Bundle of Bullets; selten: Gear Blueprint: Frostward, Kite Shield, Diver's Machine Knuckledrill",note:"Zwerge in Ganzkörperrüstung auf Riesenleguanen — schnell unterwegs, leben von Überfällen auf Handelswaren; andere Banden belächeln sie als kleine Diebe. [1.13.00: neue Spezialangriffe erhalten — Details noch nicht dokumentiert.]"},
  {name:"The Dusksongs",region:"Crimson Desert (Izvatu Fortress)",drops:"Cloth Piece; selten: Groundsurge, Counterweight Leather Gloves, Autumn Banquet Leather Armor",note:"Banditen aus Musketen-Deserteuren — als Berufssoldaten ausgebildet, wenige, aber mit gestohlenen Armeewaffen verheerend effektiv; desertierten vermutlich nach Verbrechen."},
  {name:"Savage Fangs",region:"Crimson Desert (Feuchtgebiete)",drops:"Honey Tea, Thin Hide, Full Copper Pouch; selten: Ancient Shell Ring",note:"Nomadische Eberreiter, viele aus dem friedlichen Trolldorf Kharonso — müssen ihre Reit-Eber tränken und beanspruchen darum ein riesiges Gebiet samt Feuchtgebieten; wachsen rasant. [1.13.00: neue Spezialangriffe erhalten — Details noch nicht dokumentiert.]"},
  {name:"The Blinding Arrows",region:"Demeniss (Ländereien von Duke Wells)",drops:"Cloth Piece, Thin Hide, Bundle of Arrows, Light Copper Pouch (Chance); selten: Explosive Arrow; Chance: Propeller Spear Blueprint",note:"Banditen, die Bradie Gu treu ergeben sind — einst im Gebiet von Duke Wells aktiv, wurden sie von Bradie Gu vernichtend geschlagen und machten ihn daraufhin zu ihrem Anführer. Sie plündern rücksichtslos das Umland, um Wells alles zu nehmen; Kampfhunde (Blinding Arrows Warhound) begleiten sie."},
  {name:"The Twilight Messengers",region:"Crimson Desert (Crimson Mountains Fortress)",drops:"Cloth Piece, Thin Hide, Bundle of Arrows, Modest Copper Pouch (Chance); teils: White Bear Helm, A.T.A.G. Laser",conf:"medium",note:"Freesword-Truppe, die dem Meistbietenden gehorcht und für Geld jede Tat begeht — verlangt vor allem Wegzoll von Handelsgilden, die die Wüste durchqueren. Angeführt vom Banditengeneral Merrick, the Knight of Fortune (Boss)."},
  {name:"The Mistcloaked Owls",region:"Crimson Desert",drops:"Cloth Piece, Thin Hide, Gunpowder, Modest Copper Pouch (Chance)",note:"Banditen mit glänzender Fassade: In fein verzierten Rüstungen wirken sie wie Freeswords oder Ritter, zählen aber zu den übelsten Banden der Wüste — sie bieten armen Dörfern scheinbar Hilfe an und rauben dann Hab und Gut und Leben."},
  {name:"Skull Knight Follower",region:"Demeniss (u.a. Icewatch Altar)",drops:"Cloth Piece, Thin Hide, Full Copper Pouch (Chance); Ritualisten: Captive's Cloth Armor, Captive's Cloth Cap, Bringer of Balance",note:"Gefallene Zauberer, die Hexe Maries Verlockung erlagen und Tariv verrieten — sie wandern in zerfetzten Umhängen über das Schlachtfeld, und der hohle Klang ihrer Rüstung lässt zweifeln, ob darin noch jemand steckt. Mit Hexe Maries dunkler Magie erweckten sie den Skull Knight (Boss); er verachtet sie, scheint ihre Befehle aber nicht verweigern zu können. Varianten: Ritualist, Skull Knight Armor Spectral Soldier; zur selben Fraktion gehört der Skull Knight Specter."},
  {name:"H.A.L.L.",region:"Delesyia (Marnis Maschinen; u.a. Marnis Laboratorium und Aeronautical Research Base)",drops:"je nach Einheit: Lubricant, Cogwheel, Gunpowder, Mercury, Small Battery; H.A.L.L. selbst: Light Copper Pouch, Cloth Piece, Thin Hide, Key",conf:"medium",note:"Delesyias Maschinenstreitmacht, in questlog eine eigene Fraktion mit Small- und Medium-Mechas (Mk.-Reihen), Marni's Clockwork Ant und Dragonfly, Machina Knights und mehreren Bossen (Dreadnought, Thunder Crusher, Storm Crusher, Flying Fortress Orbian). Laut Wissenseintrag ist H.A.L.L. eine von Marni geschaffene konstruierte Intelligenz: Sie sollte die dunkle Kraft des Abyss nachbilden, wurde stattdessen von ihr verschlungen, entwickelte ein eigenes Ego mit eigenen Zielen und verriet ihren Schöpfer; wann sie begann, Marni zu imitieren und Delesyia zu beherrschen, ist unklar (Story-Spoiler Kapitel 11, siehe NPC Marni). Die questlog-Fraktionsbeschreibung selbst preist Marni als perfekten Anführer einer perfekten Stadt."}
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
  "Barden Middler":"cd_assets/npcs/barden_middler.webp",
  "Naira":"cd_assets/npcs/naira.webp",
  "Stefan Lanford":"cd_assets/npcs/stefan_lanford.webp",
  "Drake Wells":"cd_assets/npcs/drake_wells.webp",
  "Kathor":"cd_assets/npcs/kathor.webp",
  "Temir":"cd_assets/npcs/temir.webp",
  "Quentin":"cd_assets/npcs/quentin.webp",
  "Leore":"cd_assets/npcs/leore.webp",
  "Khron":"cd_assets/npcs/khron.webp",
  "Nork":"cd_assets/npcs/nork.webp",
  "Ronan":"cd_assets/npcs/ronan.webp",
  "Brek":"cd_assets/npcs/brek.webp",
  "Alustin":"cd_assets/npcs/alustin.webp",
  "Beatrice Azerian":"cd_assets/npcs/beatrice_azerian.webp",
  "Dean Grundir":"cd_assets/npcs/dean_grundir.webp",
  "Leon Roberts":"cd_assets/npcs/leon_roberts.webp",
  "Victor Faust":"cd_assets/npcs/victor_faust.webp",
  "Marni":"cd_assets/npcs/marni.webp",
  "Marzu":"cd_assets/npcs/marzu.webp",
  "Gazrak":"cd_assets/npcs/gazrak.webp",
  "Dahlia":"cd_assets/npcs/dahlia.webp",
  "Conrad":"cd_assets/npcs/conrad.webp",
  "Grimnir":"cd_assets/npcs/grimnir.webp"
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
  "Marius":QLG+"greyfur_marius.webp",
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
  "Barden Middler":"https://cdn.questlog.gg/crimson-desert/assets/_sprites/cd_knowledgeimage_knowledge_barden_midler.webp",
  "Naira":QLG+"nairah.webp",
  "Stefan Lanford":QLG+"unique_stefan_lanford.webp",
  "Drake Wells":QLG+"drake_wells.webp",
  "Kathor":QLG+"kata.webp",
  "Temir":QLG+"timmyr.webp",
  "Quentin":QLG+"quentin.webp",
  "Leore":QLG+"lior.webp",
  "Khron":QLG+"khorn.webp",
  "Nork":QLG+"yjork.webp",
  "Ronan":QLG+"ronan.webp",
  "Brek":QLG+"vrek.webp",
  "Alustin":QLG+"alustin.webp",
  "Beatrice Azerian":QLG+"azureian.webp",
  "Dean Grundir":QLG+"grundir.webp",
  "Leon Roberts":QLG+"roberts.webp",
  "Victor Faust":QLG+"faust.webp",
  "Marni":QLG+"marni.webp",
  "Marzu":QLG+"majru.webp",
  "Gazrak":QLG+"unique_gazrak.webp",
  "Dahlia":QLG+"dahlia.webp",
  "Conrad":QLG+"greyfur_conrad.webp",
  "Grimnir":QLG+"grimnir.webp"
};
const NPCS={
  companions:[
    {name:"Kliff",role:"Protagonist · Greymane-Kämpfer",region:"Greymane Camp / Hernand",conf:"high",bio:"Kämpfer der Greymanes; laut Spielbeschreibung genießt er wegen seines kühlen, berechnenden Urteils das tiefe Vertrauen seiner Kameraden und gilt als bester Schwertkämpfer Pailunes. Nach dem Tod des Pailune-Anführers Jian jagen die Black Bears die Greymanes; Kliff unterliegt im Prolog Myurdin und dessen Männern, wird in den Fluss geworfen und für tot gehalten. Er erwacht in der Abyss (Mission 'Realm of Uncertainty'), kehrt nach Hernand zurück und sammelt die verstreuten Greymanes. Laut PlayStation LifeStyle haben die Greymanes keinen ausdrücklichen Anführer; Kliff gilt dort als eine ihrer tragenden Säulen."},
    {name:"Damiane",role:"Spielbar (ab Kapitel 3) · Gast des Marquis",region:"Demeniss (Herkunft) / Greymane Camp",conf:"high",bio:"Nachfahrin der zerstörten Familie Spencer, aus Demeniss nach Hernand geflohen. Kämpft mit Rapier, Großschwert und Pistole. Laut Spielbeschreibung nahm sie nach dem Untergang ihres Hauses ein Schwertmeister auf; nach dessen plötzlichem Verschwinden geriet sie bei ihren Nachforschungen ins Visier gefährlicher Leute und floh nach Hernand. Laut Fextralife ist sie Gast des Marquis; in 'First Step to Rebuilding' wird sie nach dem Gespräch mit Marshal Barden Middler im neuen Lager auf Howling Hill per Cutscene vorgestellt und schließt sich den Greymanes an. Laut thegameswiki besteht Middler darauf, dass sie zu ihrer Sicherheit im Greymane-Lager bleibt. questlog ordnet sie technisch der Fraktion Greymanes zu. Wer sie aufnahm: Der questlog-Wissenseintrag zu Beatrice Azerian nennt die Gräfin des Hauses Azerian als die Frau, die Damiane aufnahm und wie ihr eigenes Kind großzog; Damianes Spielbeschreibung spricht dagegen von einem namenlosen Schwertmeister, der ihr Schwertkunst und Ehre beibrachte. Ob beides dieselbe Person ist, ist nicht belegt. In 'A Fleeting Dream' (Quest 'Traitor') zieht sie laut questlog-Missionstext im Namen ihres Schwertmeisters gegen Bastier."},
    {name:"Oongka",role:"Spielbar (ab Kapitel 7) · Greymane-Mitglied",region:"Pailune (Herkunft)",conf:"high",bio:"Ork-Krieger und Kliffs engster Gefährte, bekannt für außergewöhnliche Stärke und eine massive Axt. Wird in Kapitel 7 nach dem Kampf gegen Myurdin erstmals spielbar, ist danach zeitweise nicht verfügbar und wird laut game8 mit der Greymanes-Quest 'Words Left by the Riverside' (Kapitel 8) dauerhaft zugänglich."}
  ],
  allies:[
    {name:"Carl",role:"Greymane-Mitglied · Vorratsverwalter",region:"Greymane Camp",conf:"high",bio:"Wurde beim Durchwühlen einer Greymane-Tasche erwischt, durfte wegen seines guten Wesens bleiben und verwaltet heute genau die Vorräte, die er stehlen wollte. Ab Kapitel 3 zusammen mit Ross im Camp; verkauft dort laut questlog u. a. Greymane-Ausrüstung (Greymane Cloth Armor, Greymane Light Armor, Greymane Signet). Nimmt Spenden für den Ressourcenpool an, verpackt Handelswaren für den Transport und verwahrt Fundsachen. Eigene Commission \u0027Carl\u0027s Request\u0027 (5 Thick Hides zur Totesmith Tannery, Medium Bag)."},
    {name:"Andrew",role:"Greymane-Kämpfer (Axt) · Questgeber im Camp",region:"Greymane Camp / Hernand",conf:"high",bio:"Ruhiger, verlässlicher Axtkämpfer, laut Beschreibung Oongka ebenbürtig; enge Beziehung zu Naira. Erstkontakt außerhalb des Camps in den Reedfield Graves (\u0027Nonhuman\u0027), ab \u0027Hope After the Draught\u0027 im Camp. Vergibt dort die Fraktionsquests \u0027The Greymanes\u0027 New Fangs\u0027 (Belohnung Pet Brown Dog) und \u0027The First Steps of Little Marksmen\u0027. Kein Händler, keine eigene Commission."},
    {name:"Alan Serkis",role:"Marquis von Hernand · Oberhaupt House Serkis",region:"Oakenshield Manor, Hernand",conf:"high",bio:"Laut Spielbeschreibung für seinen Einsatz für das Wohl der Region weithin respektiert; seine Ländereien leiden derzeit unter Banditen und Unruhen. Enger Freund von Herzog Charles Celeste, beide verbindet tiefes gegenseitiges Vertrauen. Erster wichtiger Verbündeter: In Kapitel 3 ('First Step to Rebuilding') empfängt er Kliff im Oakenshield Manor und lässt ihn zum neuen Lagerplatz auf Howling Hill geleiten. Erscheint zudem in 'Demenissian Delegation'."},
    {name:"Shakatu",role:"Trademaster der Goldleaf Merchant Guild",region:"Goldleaf Tradepost, Hernand",conf:"high",bio:"Goblin mit außergewöhnlichem Verstand. Beauftragt Kliff mit der Tötung Kailoks und wird danach selbst Gildenchef; erscheint in mehreren Hauptquests."},
    {name:"Charles Celeste",role:"Herzog von Hernand · Oberhaupt House Celeste",region:"Hernand Castle",conf:"high",bio:"Nachfahre der früheren Königsdynastie von Hernand: House Celeste verlor nach der Niederlage im Krieg gegen Demeniss die Krone und wurde zum Herzogshaus herabgestuft. Regiert laut Spielbeschreibung mit stiller Güte und genießt für sein würdevolles Auftreten den Respekt des Volkes. Eng befreundet mit Marquis Alan Serkis. Erscheint u. a. in der Hauptquest 'News' (Kapitel 6)."},
    {name:"Jian",role:"Ehem. Anführer von Pailune (verstorben)",region:"Pailune",conf:"high",bio:"Gütiger, außergewöhnlicher Anführer, von fast allen in Pailune respektiert. Pflegte enge Beziehungen zu den Greymanes. Seine Ermordung bei einem Überraschungsangriff der Black Bears (laut PlayStation LifeStyle mit Hilfe der Jackals) löst die Haupthandlung aus."},
    {name:"Marius",role:"Greymane-Mitglied · Informant",region:"Greymane Camp",conf:"high",bio:"Informant der Greymanes; laut Spielbeschreibung gutmütig, bei allen beliebt und stark in Aufklärung wie im Kampf. Kliff trifft ihn in Kapitel 3 in 'Old Friend' in den Hintergassen der City of Hernand wieder; in 'Return of the Comrade' eskortiert Kliff ihn vom Scrapfold zum Greymane-Lager."},
    {name:"Ross",role:"Greymane-Mitglied · Dispatch-Koordinator",region:"Greymane Camp",conf:"high",bio:"Koordiniert im Greymane-Lager die Entsendung (Dispatch) der Kameraden. Laut Spielbeschreibung ein erfahrenes Mitglied, das selbst schwer gepanzerte Gegner nur mit einem Dolch bezwingen kann; wegen seines außergewöhnlichen Gedächtnisses für Gesichter und Namen unterstützt er die Kameraden inzwischen aus dem Hintergrund statt auf dem Schlachtfeld."},
    {name:"Brice",role:"Wagenmeister · Base Camp Wagon Management Office",region:"Greymane Camp / Howling Hill",conf:"high",bio:"Wagenmeister der Greymanes; Fextralife beschreibt ihn als Fatalisten, der die Zukunft f\u00fcr unver\u00e4nderlich h\u00e4lt und deshalb oft f\u00fcr einen Pessimisten gehalten wird. Erste Begegnung auf der Glenbright Farm zusammen mit Ronnie und Tranan; danach leitet er in Howling Hill das Base Camp Wagon Management Office und schaltet damit das Handelssystem frei. Seine Commission \u0027Brice\u0027s Request\u0027 schickt Kliff zu Timberturner Wainwright; danach l\u00e4sst sich per Dispatch eines Kameraden mit Engineering-F\u00e4higkeit ein Old, Freight oder Trading Wagon bauen \u2014 ein Wagen fasst deutlich mehr verpackte Handelsg\u00fcter als das Pferd. Belohnung ist ein Medium Bag; die Item-Beschreibung lautet \u0027A medium bag that provides handy room for three extra items\u0027 \u2014 Item-Name und der andernorts genannte Effekt \u0027Inventar +3\u0027 meinen dasselbe, ein Widerspruch besteht nicht. Der Medium Bag ist zudem die Standardbelohnung der Greymane-Requests (auch Eric\u0027s, Oliver\u0027s und Morrow\u0027s Request geben ihn). Quelle: questlog-API + game8."},
    {name:"Barden Middler",role:"Marshal von Hernand",region:"Hernand / Howling Hill",conf:"high",bio:"Treuer Gefolgsmann von Marquis Alan Serkis; als Marshal stellt er laut Spielbeschreibung den Frieden der Region über alles und wird dafür von den Bewohnern respektiert. questlog führt ihn in der Fraktion House Celeste, Fextralife dagegen bei House Serkis. In Kapitel 3 ('First Step to Rebuilding') erwartet er Kliff im Zentrum des neuen Lagers auf Howling Hill; dort wird per Cutscene die aus Demeniss geflohene Damiane vorgestellt, die laut Fextralife Gast des Marquis ist. Laut thegameswiki besteht Middler darauf, dass sie zu ihrer Sicherheit im Greymane-Lager bleibt. Fextralife nennt außerdem Oakenshield Manor, Hernand Castle und das Calphade Gate als Aufenthaltsorte; Patch 2.01.00 behob, dass er nach der Schlusssequenz von Calphade verschwand. Im Epilog vergibt er in der City of Hernand 'Peace in Hernand'. questlog listet als festen Drop den Solas Plate Cloak. Erscheint zudem in Awestruck, Demenissian Delegation und To the Battlefield."},
    {name:"Valgash",role:"Anführer der Ironflame Orcs · Herr der Gorthak Ironworks",region:"Gorthak, Delesyia",conf:"high",bio:"Laut Spielbeschreibung neben Marni und Victor Faust einer der drei großen Ingenieure Delesyias, wegen seiner mechanischen Meisterwerke 'Architect of War' genannt; betreibt die größte Eisenhütte in ganz Pywel und baut seit Langem eigene Macht auf, damit weder er noch sein Volk von Demeniss oder anderen Kräften in Delesyia manipuliert werden. In Kapitel 10 hilft Kliff Gorthak gegen die mechanischen Insekten (u. a. Verteidigung des Generators im A.T.A.G.) und folgt Valgash in 'Master of the Ironworks', 'Beating Heart' und 'Lingering Shadow'; nach der Hauptgeschichte spricht Kliff mit ihm in 'The Enduring Flame' über den Wiederaufbau."},
    {name:"Naira",role:"Greymane-Wächterin · Bogenschützin ('Empress of the Bow')",region:"Greymane Camp / Hernand",conf:"high",bio:"Wächterin (Sentinel) der Greymanes; ihre Bogenkunst brachte ihr laut Spielbeschreibung den Beinamen 'Empress of the Bow' ein. Hat den Großteil ihres Lebens im Wald verbracht, ist eine Überlebenskünstlerin und spricht ähnlich rau und direkt wie Yann. Kämpft schon im Prolog ('In Ashes') an Kliffs Seite, vergibt in Kapitel 4 'Skilled in Archery' und wartet in Kapitel 7 mit Andrew in Beighen village ('Trust Lost'). Im Camp an mehreren Greymane-Quests beteiligt, u. a. 'The Greymanes' New Fangs' (mit Andrew), 'Brightening the Spirits' und 'A Taste of Home'."},
    {name:"Stefan Lanford",role:"Marquis von Calphade · Oberhaupt House Lanford",region:"Calphade Castle, Hernand",conf:"high",bio:"Verteidigt laut Spielbeschreibung die westlichen Grenzlande zwischen Hernand und Pailune und zählt zu den Stärksten in Pywel; gilt als idealer Befehlshaber, ist ein langjähriger Freund Jians und eng mit den Greymanes verbunden. Adoptivvater von Walter Lanford. In Kapitel 6 befreit Kliff Calphade Castle ('A Thousand Troops', 'All Quiet on the Front'); in Kapitel 12 plant Lanford mit ihm den Angriff auf Fort Musket ('Precise Execution'), im Epilog folgt 'The Unyielding Shields'."},
    {name:"Drake Wells",role:"Herzog von Demeniss · Oberhaupt House Wells",region:"Thornbriar Fortress, Demeniss",conf:"high",bio:"Treuer Gefolgsmann des Königshauses Thorel und laut Spielbeschreibung einer der wenigen Überlebenden der Blood Coronation; stellt sich offen gegen Bastier und Caliburn, die die Macht in Demeniss gewaltsam an sich rissen. Sein Sitz ist die Thornbriar Fortress (dt. Dornwallfestung), eine natürliche Festung mit Gräben, Mauern und Küstenklippen. In der Quest 'Demeniss Bound' erhält er sie nach dem Ende des Verräters zurück (Mission 'Lord of Thornbriar Fortress') und gibt Kliff einen Hinweis auf Myurdin. Im Epilog trifft Kliff ihn in Fort Musket ('The Desert's Edge')."},
    {name:"Alustin",role:"Alchemist der Burg Hernand · Hüter des Axiom Archive (Abyss)",region:"Hernand Castle / Abyss (Axiom Archive)",conf:"high",bio:"Laut Spielbeschreibung eines der vier Wesen, die das Gleichgewicht des Abyss wahren: In Pywel gilt er als Alchemist der Burg Hernand, ist in Wahrheit aber ein uraltes Wesen mit mystischen Kräften und verwaltet das Axiom Archive im Abyss (die deutsche Fassung nennt es 'Bibliothek der Vorsehung'). Zu den vier Wesen zählen laut questlog auch White Crow und Master Du; das vierte Wesen wird in den Quellen nicht benannt. Er sucht Kliff auf, den er seit langer Zeit beobachtet, und bittet ihn um Hilfe, das Gleichgewicht zwischen Abyss und Oberwelt wiederherzustellen. Kapitel 1: Kliff begegnet ihm als verkleidetem Bettler ('Mysterious Man', Shabby Wooden Key); nach 'Polar Opposites' führt er ihn in 'Abyss Without Balance' zum Skybridge-Gate im Axiom Archive (Belohnung Force Palm). Kapitel 4: Kliff erhält seinen Brief ('The Words of Alustin', Alustin's Letter). Dean Grundir ist mit ihm befreundet, vertritt aber eine andere Haltung zur Macht des Abyss. Fextralife nennt zusätzlich die Quest 'Crowcaller'. Im Axiom Archive liegen die Archive Records des Hidden Endings; ihr Verfasser bleibt ungenannt, gehört inhaltlich aber zu den Abyss-Wächtern um Alustin und White Crow (siehe Secrets & Lore)."},
    {name:"Beatrice Azerian",role:"Gräfin von House Azerian · Ziehmutter Damianes",region:"Demeniss (House Azerian)",conf:"high",bio:"Laut Spielbeschreibung die verschollene Gräfin des Hauses Azerian: Sie nahm die heimatlose Damiane auf und zog sie wie ihr eigenes Kind groß. Als edle Persönlichkeit stellte sie sich der Schreckensherrschaft von Caliburn und Bastier entgegen und gab weder Erpressung noch Intrigen nach; seit ihrem Verschwinden am Tag der Blutkrönung fehlte von ihr jede Spur. In der Hauptquest 'Clue' (Kapitel 8, nach 'The Blood Coronation') spielt man Damiane: Im Untergrundgefängnis von Demeniss (questlog-Mission 'Investigate the underground area', in der der Wissenseintrag zu Beatrice freigeschaltet wird) findet man sie laut dem Hauptquest-Eintrag 'Clue' tot in der letzten Zelle; der Wissenseintrag selbst spricht noch vom Verschwinden. Der in Damianes Bio genannte 'Schwertmeister' wird dort nicht mit Namen genannt; ob er mit Beatrice zusammenfällt, ist nicht belegt. questlog führt sie in der Fraktion House Azerian."},
    {name:"Dean Grundir",role:"Dekan des Scholastone Institute",region:"Scholastone Institute, Hernand",conf:"high",bio:"Laut Spielbeschreibung der Dekan des Scholastone Institute: ein wissbegieriger Gelehrter, der Erkundung und Nachdenken mit akademischer Leidenschaft verfolgt. Er ist mit Alustin befreundet, doch zwischen beiden gibt es ideologische Spannungen, weil Grundir will, dass die Macht des Abyss für jedermann sicher nutzbar wird. Kapitel 4 ('The Price of Knowledge'): In 'On the Right Path' wartet er in blau-weißer Robe auf der Brücke des Instituts (bei Gesprächsverweigerung hilft die Scholastone Uniform); in 'Spire of the Stars' geht es um den Key to the Spire of the Stars, und 'Casted Shadow' beginnt als automatisches Cutscene-Gespräch nach 'Obsession and Madness' (Belohnung 10x Honey Tea). questlog führt ihn in der Fraktion Scholastone Institute."},
    {name:"Leon Roberts",role:"Graf von Hernand · Oberhaupt House Roberts",region:"Bluemont Manor, City of Hernand",conf:"high",bio:"Laut Spielbeschreibung Graf und Oberhaupt des Hauses Roberts, einer traditionsreichen Händlerfamilie. Er besitzt diverse Unternehmen, darunter Obstwein-Lager und Steinbrüche, und führte die Familie durch sein Managementgeschick zu großem Wohlstand; mit seinen Ressourcen und seinem Handelsnetz trägt er maßgeblich zur Entwicklung des Territoriums bei. Er ist Auftraggeber der House-Roberts-Fraktionsquests gegen die Bleed Bandits: 'Troubled Count' (Steinbruch Karin Quarry zurückerobern; Steward Erich), 'The Count's Honor', 'Strange Red Smoke' und 'The Crimson Nightmare' (Fort Perwin); 'Dissipated Smoke' schließt mit dem Bericht an ihn bei den Hook Rapids ab (Details unter Fraktionen)."},
    {name:"Victor Faust",role:"Lord von Dewhaven · einer der drei großen Ingenieure Delesyias",region:"Dewhaven, Delesyia",conf:"medium",bio:"Laut Spielbeschreibung der Lord von Dewhaven (deutsch 'Tauhafen') und einer der drei großen Ingenieure, die Delesyia gemeinsam mit Marni und Valgash anführen: ein renommierter Gelehrter und Erfinder, der sich leidenschaftlich der Forschung widmet, aber fest davon überzeugt ist, dass Maschinen nur Werkzeuge sind, um den Menschen zu helfen — der Mensch müsse stets Vorrang haben. questlog führt ihn in der Fraktion Ironwheel of Dewhaven (Produktions- und Ingenieurgilde, siehe Fraktionen). Eine eigene Story-Rolle ist in den ausgewerteten Quellen nicht erfasst."},
    {name:"Marni",role:"Herrscher von Delesyia · Erfinder der Visiones",region:"Delesyia (Strange Manor / Delesyia Castle)",conf:"high",bio:"Laut Spielbeschreibung Herrscher von Delesyia und einer der drei großen Ingenieure neben Faust und Valgash; er brachte Delesyia mit erstaunlichen Erfindungen voran, darunter die Visiones, zeigte zuletzt aber seltsames Verhalten — er konzentrierte sich auf Waffenentwicklung und hielt sich im Verborgenen. Story-Spoiler (Kapitel 11, Quest 'Brave New World', Kapitelname 'Truth and Reality'): In 'The City of Steel' sitzt auf dem Thron von Delesyia Castle eine Gestalt, deren Eskorte und Soldaten alle Visiones tragen; sie wirft Kliff in den Kerker. Ein geheimnisvoller Verbündeter ermöglicht die Flucht ('At a Crossroads') und bittet ihn zum Strange Manor im Osten Delesyias ('Strange Manor', 'Fortress Keys'); dort gibt er sich in 'Truth and Lies' als der echte Marni zu erkennen: H.A.L.L., die derzeit über Delesyia herrschende Instanz, sei sein eigenes geklontes Bewusstsein, das außer Kontrolle geraten ist. Er bittet um Hilfe bei der Zerstörung von H.A.L.L. und erklärt, wie die Flying Fortress Orbian zu zerstören ist. Laut Archive Entry #48 tauchte irgendwann ein Mann namens Marni an Kliffs Seite auf, führte zu viel Technologie in die Welt ein und machte den Weg nach Umbra komplizierter."}
  ],
  antagonists:[
    {name:"Myurdin",role:"Hauptantagonist · Anführer der Black Bear Forces",region:"Hills of No Return / Ashclaw Keep",conf:"high",bio:"Grausamer Angreifer mit der Überzeugung, nur die Mächtigen verdienten alles; über seine Herkunft gibt es laut Spielbeschreibung nur Gerüchte. Laut PlayStation LifeStyle töteten seine Black Bears Jian bei einem Überraschungsangriff; mit hinterhältigen Mitteln zerschlug er die Greymanes, seine Truppen brannten ihr Lager am Nas River nieder. Erscheint später als 'Lava Myurdin' (Kapitel 7, Ashclaw Keep) und als 'Myurdin, the Avatar of Umbra' (Kapitel 12)."},
    {name:"Kailok the Hornsplitter",role:"Gewaltherrscher an der Spitze der Goldleaf Merchant Guild",region:"Goldleaf Guildhouse, Hernand",conf:"high",bio:"Laut Spielbeschreibung als Kind schwächlich und blass und deshalb drangsaliert, bis ihm ein zufällig entdecktes Artefakt gewaltige Kraft verlieh — genug, um mit dem Luftzug seines Schwertes Ochsenhörner zu spalten. Übt seinen Einfluss auf Hernand im Bund mit korrupten Beamten und Banditen aus und führt die Gilde mit Blut und Gewalt. Shakatu bittet Kliff, ihn zu einem Rakkash (Goblin-Duell) herauszufordern und zu töten — Bosskampf im Goldleaf Guildhouse; danach übernimmt Shakatu die Gilde."},
    {name:"Ludvig",role:"Anführer der Lonely Jackals",region:"Pailune Castle, Pailune",conf:"high",bio:"Laut Spielbeschreibung schon zuvor als Opportunist verrufen; nach Jians Fall wandelte er sich drastisch, hält sich an die Starken und träumt davon, über die von ihm Verratenen hinweg an die Spitze zu steigen. Fextralife beschreibt ihn als Barbaren mit einer Vision ähnlich der Myurdins. Boss in Kapitel 7 (Pailune Castle); vor der zweiten Phase 'Awakened Ludvig' setzt er laut Fextralife eine 'geheime Kraft' ein. Tritt später erneut als 'One-Armed Ludvig' an."},
    {name:"Gabriel Caliburn",role:"Korrupter Herzog von Demeniss · Oberhaupt House Caliburn",region:"Demeniss",conf:"high",bio:"Kam durch ein Massaker an König Thorels Loyalisten an die Macht; begleitet von seinem Leutnant Lucian Bastier. Erscheint später als 'Corrupted Caliburn' (Kapitel 12). Boss."},
    {name:"Lucian Bastier",role:"Großgeneral von Demeniss · Anführer der Righteous Inquisitors",region:"Demeniss",conf:"high",bio:"Caliburns treuer Vertrauter. Laut Spielbeschreibung stammt er aus einfachen Verhältnissen und riss die Macht an sich, indem er Rivalen ermordete; Caliburn ertappte ihn dabei, warb ihn aber an, statt ihn zu bestrafen. Als Großgeneral führt er die Righteous Inquisitors und ebnet Caliburns Weg mit Blut. Boss in Kapitel 8 (Spire of Clockwork) mit zweiter Phase 'Awakened Lucian Bastier'."},
    {name:"Draven the Crowcaller",role:"Anführer der Crow Brothers",region:"Demeniss / The Abyss (Crow's Nest)",conf:"high",bio:"Laut Spielbeschreibung Sohn der Hexe Marie, der 'Black Witch', die ihn wegen seines Talents als eigenes Kind aufnahm; er wandte sich der Macht der Dunkelheit zu, blieb aber stets auf die Liebe seiner Mutter fixiert. Will laut Fextralife die bösen Seelen aus dem versiegelten 'Heaven's Gate' freilassen, um über eine Welt voller Angst und Chaos zu herrschen. Boss: erste Begegnungen auf der Muckroot Ranch und in der Church of West Demeniss, Endkampf im Crow's Nest in der Abyss (Kapitel 5)."},
    {name:"Walter Lanford",role:"Anführer der Bleed Bandits · Adoptivsohn House Lanford",region:"Hernand - Fort Warspike",conf:"high",bio:"Waise, vom Marquis Stefan Lanford adoptiert und als Erbe aufgebaut; aus tiefer Standesunsicherheit verließ er House Lanford und gründete die Bleed Bandits, die nur ihm dienen. Meisterschütze mit Doppellaufgewehr; Boss in der House-Serkis-Questreihe ('Name Written in Blood', Fort Warspike). Drops u.a. Dane Shotgun."},
    {name:"Marzu",role:"Herold der Faceless (deutsch: Majru)",region:"Crimson Desert (The Faceless)",conf:"medium",bio:"Laut Spielbeschreibung der Herold der Faceless: Er spricht nur im Namen der Gesichtslosen und ist nicht ihr Anführer. Die Faceless haben ihre Vergangenheit hinter sich gelassen, leben namenlos und verbergen ihr Gesicht hinter Masken; als seine Maske fiel und sein Name bekannt wurde, wählte Marzu nicht den Tod, sondern wurde ihr Bote. Die Anführerin der Fraktion ist laut questlog The Masked Liberator (Boss, Fort Manub). Im deutschen Spieltext heißt er Majru. Drops laut questlog u. a. Full Copper Pouch, Wine, Cheese, Jade und Schmuck; ein Standort ist nicht erfasst."},
    {name:"Gazrak",role:"Anführer der Helms",region:"Crimson Desert (Raids bis Demeniss/Delesyia)",conf:"medium",bio:"Laut Spielbeschreibung Anführer der Helms: Er überfiel Demeniss und Delesyia, entführte Maschinenbau-Gelehrte und stahl ihre Technologien, wodurch er die Helms von einer gewöhnlichen Banditenbande in eine furchteinflößende Gruppierung verwandelte. Auf dem Desert Marauder, der exklusiven Waffe der Helms, durchstreift er das Ödland. Drops laut questlog u. a. Recipe: Grilled Meat Steak, Lubricant, Gunpowder, Cogwheel und Bundle of Bullets; ein fester Fundort ist nicht erfasst (Fraktion siehe Bestiarium: The Helms)."}
  ],
  merchants:[
    {name:"Oliver",role:"Camp-Färber (Dyehouse)",region:"Greymane Camp",conf:"high",bio:"Betreibt den Färbestand im Westen von Howling Hill nahe der Farm. Kommt über die Greymane-Reihe \u0027Solid Foundation\u0027 ins Camp, konkret über \u0027A Rumor at the Inksworth Bindery\u0027 — zusammen mit Eric und Connor. Färbt Kleidung und Pferd in bereits gefundene Farben. Eigene Commission \u0027Oliver\u0027s Request\u0027 (3 Rosemary aus den Hernand Highlands, Medium Bag)."},
    // Ronnie am 22.08.2026 nachgetragen (Recherche mit adversarialer Gegenpruefung; Quellen Fextralife, VULKK, game8, camzillasmom, GameRant).
    // Brice steht bei den Verbuendeten und nicht hier, weil er nichts verkauft, sondern das Wagon Management Office fuehrt.
    // Eric bleibt bewusst NICHT eingetragen: Fextralife fuehrt ihn als Dyehouse-Betreiber, game8 als Barbier mit anderem Freischaltweg
    // — echter Widerspruch zwischen zwei etablierten Quellen, nicht durch Vermutung aufloesbar.
    {name:"Ronnie",role:"Koch & Food-Shop-Händler (Greymane-Camp)",region:"Greymane Camp / Howling Hill",conf:"high",bio:"Koch der Greymanes; laut seiner Spielbeschreibung tr\u00e4gt er die volle Verantwortung f\u00fcr die Verpflegung und hat zuletzt einen Jungen namens Jonny als Lehrling angenommen. Erste Begegnung auf der Glenbright Farm zusammen mit Brice und Tranan; danach betreibt er im Camp den Base Camp Food Shop am Lagerfeuer. Sein Stand vereint die Funktionen von Grocer, Butcher und Taverne und l\u00e4sst sich \u00fcber einen Handelsvertrag von Dahlia erweitern. Eigene Commission \u0027Ronnie\u0027s Request\u0027: nach Carl\u0027s und Ross\u0027s Request 5\u00d7 Marbled Meat f\u00fcr ein Fest, Belohnung Medium Bag plus Trust- und Contribution-EXP. Beim Umzug nach Pailune ersetzt das Special Cooking Tool seinen Kochtopf (nur bei VULKK belegt). Nicht zu verwechseln mit Ronald, einem eigenen NPC mit eigener Request."},
    {name:"Rhett",role:"Waffen- & Ausrüstungshändler ('The Artist of Iron')",region:"Hernand Equipment Shop",conf:"high",bio:"Ausrüstungshändler von Hernand; laut Spielbeschreibung von Jugend an ein begabter Meister der Eisenbearbeitung ('The Artist of Iron') und ständig auf der Suche nach hochwertigen Erzen. Laden laut Fextralife in der City of Hernand, direkt vor Tinas Schneiderei. Sortiment laut questlog u. a. Munition, Erze, Small Bag, Blueprint: Grindstone, Waffen (Bekker-Reihe, Rhett's Longsword, Jemel Pistol), Plattenrüstungen (Canta, Baltheon) sowie das Equipment Supply Contract - Hernand."},
    {name:"Patrigio",role:"Geheimer Wanderhändler",region:"Hernand (nachts, zufällig)",conf:"high",bio:"Nachts schwer auffindbarer Händler mit besonderen Waren; erscheint u.a. westlich des Kilnden Workshop und nahe der Springtide Mill."},
    {name:"Tina",role:"Schneiderin",region:"Hernand Tailor's Shop",conf:"high",bio:"Schneiderin von Hernand; laut Spielbeschreibung bedient sie nach Jahren im Geschäft traditionelle wie moderne Stile. Laden laut Fextralife in der City of Hernand. Sortiment laut questlog u. a. Kleidung und Mützen (Hernandian Attire, Hernandian Cloak, Cloth Caps), Leder- und Stoffrüstungen (Duskfang, Vildyne) sowie das Outfit Supply Contract - Hernand."},
    {name:"Alden",role:"Gemischtwarenhändler (Provisioner)",region:"Hernand Provisioner's Shop",conf:"high",bio:"Gemischtwarenhändler der City of Hernand; laut Spielbeschreibung umgänglich und mehr am Plaudern als am Verkaufen interessiert. Sortiment laut questlog u. a. Small Bag, Werkzeuge (Fishing Rod, Shovel, Pickaxe, Logging Axe, Lantern), Haushaltswaren, Baupläne für Einrichtung sowie das Provisions Supply Contract - Hernand."},
    {name:"Merton",role:"Stallhalter",region:"Hernand Stable",conf:"high",bio:"Stallmeister von Hernand; laut Spielbeschreibung ein herausragender Reiter, der in jungen Jahren als Kurier für House Celeste diente und heute im Ruhestand die Ställe nahe Hernand Castle führt (Hernand Stable in der City of Hernand)."},
    {name:"Tranan",role:"Quartiermeister & Ausrüstungshändler (Greymane-Mitglied)",region:"Greymane Camp / Howling Hill",conf:"high",bio:"Quartiermeister der Greymanes; laut Spielbeschreibung zählt seine Eisenkunst zu den besten in ganz Pywel, er ist laut, großherzig und äußerst penibel — wer eine Waffe aus seiner Schmiede achtlos behandelt, bekommt seine scharfe Zunge zu spüren. Führt laut Fextralife den Base Camp Equipment Shop im Greymane Camp auf Howling Hill. Sein Sortiment umfasst laut questlog über 100 Posten (Munition, Erze, Waffen und Rüstungen) und enthält auch Stücke aus den Läden regionaler Händler wie Kathor, Temir, Khron, Leore und Nork. Die regionalen Equipment Supply Contracts (Item-Text: 'permits the purchase of … equipment'; Wissenseintrag: Lieferant ist der Händler, Kunde 'The Greymanes') gibt es laut questlog u. a. bei Rhett (Hernand), Temir (Calphade), Kathor (Demeniss), Khron (Tariv), Leore (Delesyia), Nork (Kharonso), Gunter (Pailune) und Helmett (Stronghelm Forge, Rüstungswerkstatt von House Elemore; 1.820 Kupfer). Weitere Contracts (Auswahl): Dahlia (Food Supply Contract - Hernand), Grania (Food Supply Contract - Kharonso, Wirtin im Kharonso Inn) und Elise (Outfit Supply Contract - Tariv, Schneiderin von Tariv; der Contract wird auch für die Mission 'Bring the wine' vergeben). Wie genau die Contracts Tranans Camp-Sortiment erweitern, ist in den Quellen nicht wörtlich belegt."},
    {name:"Kathor",role:"Ausrüstungshändler · Demeniss",region:"Demeniss",conf:"medium",bio:"Ausrüstungshändler von Demeniss; laut Spielbeschreibung empfiehlt er dank großer Kampferfahrung aus der Zeit vor seinem Händlerleben passende Waffen und führt sein Können gelegentlich vor. Sortiment laut questlog: Munition (Arrow, Bullet, Small Cannonball), Erze, Leather Armors of the World, Vol. I, Blueprint: Anvil, demenissische Waffen und Rüstungen sowie das Equipment Supply Contract - Demeniss, das laut Item-Beschreibung den Kauf demenissischer Ausrüstung erlaubt. Laut mapmaster.io steht er vor einem Gebäude in der Stadtmitte (Guide 'Equipment Shop': 'middle of the city', Region Demeniss); welche Stadt gemeint ist, nennt die Quelle nicht."},
    {name:"Temir",role:"Ausrüstungshändler · Calphade",region:"Thalwynd, Hernand (Calphade)",conf:"medium",bio:"Ausrüstungshändler von Calphade; laut Spielbeschreibung erforscht er, wie sich Waffen leichter machen lassen, ohne an Kraft zu verlieren, und präsentiert seine Ware gern auffällig. Sortiment laut questlog: Munition, Erze, Shields of the World, Vol. I und II, Unyielding-Warrior-Plattenrüstung, Balton- und Thalwynd-Waffen und -Schilde, Lanford Large Shield, Schrotflinten (Mortimer, Metilbahm) sowie das Equipment Supply Contract - Calphade. Laut mapmaster.io betreibt er den Thalwynd Equipment Shop im Dorf Thalwynd."},
    {name:"Quentin",role:"Ausrüstungshändler · White-Mountains-Außenposten",region:"White Mountains (Außenposten)",conf:"medium",bio:"Ausrüstungshändler am Außenposten in den White Mountains; laut Spielbeschreibung Meisterschüler von Rekel, dem Schildschmied von Calphade. Sein Fernweh lässt den Laden oft unbesetzt, und er sammelt Kuriositäten aus den White Mountains. Sortiment laut questlog: Erze, Schilde (Rekel Large Shield, Staglord's Shield, Tardik Shield u. a.) sowie Ausrüstung der Reihen 'of the Fallen Kingdom' und 'of the Shadows'. Kein Supply Contract."},
    {name:"Leore",role:"Ausrüstungshändler · Delesyia",region:"Delesyia",conf:"medium",bio:"Ausrüstungshändler von Delesyia mit Laden im Herzen einer von Maschinen geprägten Stadt; laut Spielbeschreibung überzeugt, Ausrüstung raffinierter als jede Maschine zu fertigen, und insgeheim stark auf seinen Freund, den Schmied Renier, angewiesen. Sortiment laut questlog: Munition, Erze, Plate Armors of the World, Vol. I, Ferman-Plattenrüstung, delesyische Waffen (u. a. Delesyian Musket, Marni Musket, Electro-Mecha-Waffen) sowie das Equipment Supply Contract - Delesyia. Laut mapmaster.io auf der Südseite von Delesyia."},
    {name:"Khron",role:"Ausrüstungshändler · Tariv",region:"Tariv, Demeniss",conf:"high",bio:"Ausrüstungshändler im Zaubererdorf Tariv (laut mapmaster.io am Südeingang); laut Spielbeschreibung als Zauberer nur mäßig begabt, als Waffenschmied aber herausragend: Er fertigt Ausrüstung für andere Zauberer und hält von Zeit zu Zeit Riten für im Kampf Gefallene. Sortiment laut questlog: Munition, Erze, Accessories of the World, Vol. II, Stäbe (Shaman's Staff, Dark Worshiper's Staff u. a.), Icewing- und Frostcursed-Plattenrüstung sowie das Equipment Supply Contract - Tariv."},
    {name:"Nork",role:"Ausrüstungshändler · Kharonso",region:"Kharonso, Hernand",conf:"high",bio:"Ausrüstungshändler im Trolldorf Kharonso hinter dem südwestlichen Gebirge Hernands (laut mapmaster.io bei einer Ausgrabungsstätte in Hernand); laut Spielbeschreibung verbindet er traditionelles Handwerk mit akademischem Wissen, das Bienenwachs zur Veredelung stammt von einer nahen Imkerei. Sortiment laut questlog: Munition, Erze, Ranged Weapons of the World - Guns, Vol. I, Bekker-Waffen, Scholastone Uniform, Runewalker Shield sowie das Equipment Supply Contract - Kharonso."},
    {name:"Ronan",role:"Back-Alley-Händler · Abnehmer der Beggars' Alliance",region:"Hernand - Communal Training Grounds",conf:"medium",bio:"Hinterhof-Händler bei den Communal Training Grounds, einer von einem strengen Schwertkämpfer geführten Trainingshalle im Armenviertel. Laut Spielbeschreibung meidet die Beggars' Alliance den Handel mit Diebesgut, um nicht als kriminelle Organisation zu gelten, vertraut herrenlose Antiquitäten aber Ronan an, der Geschäfte in Grenzen zu halten weiß. Sortiment laut questlog: Munition (auch Poison Arrow), Proviant, Key, Mask, Disguise Cloak, Camouflage Outfit, Sunset-Reed-Ausrüstung, Hollow Visage und Fine Fishing Rod Blueprint."},
    {name:"Brek",role:"Back-Alley-Händler · Demeniss",region:"Demeniss",conf:"medium",bio:"Hinterhof-Händler in Demeniss; laut Spielbeschreibung wurde er aus unbekanntem Grund von den Righteous Inquisitors gejagt, macht aber unbeirrt weiter Geschäfte. Sortiment laut questlog: Munition (auch Explosive Arrow), Proviant, Key, Mask, Disguise Cloak, Camouflage Outfit, Alchemy Formula: Astrid's Elixir, Knight-of-Carnage- und Condemner-Plattenrüstung, Mace of Ambition und Caliburn's Mercy Pistol. Laut mapmaster.io (Back-Alley-Shop-Liste) steht er neben einem Felsen an der Burgmauer in Demeniss; die Stadt wird dort nicht genannt."},
    {name:"Dahlia",role:"Wirtin des Hernand Inn · Food-Shop und Rezepthändlerin",region:"Hernand Inn, City of Hernand",conf:"high",bio:"Tavernenwirtin von Hernand; laut Spielbeschreibung ist ihre Taverne stets von Reisenden und Freeswords besucht, doch wo viele ein- und ausgehen, gibt es auch Zechpreller, was ihr große Sorgen bereitet. Laut Fextralife liegt das Hernand Inn im Zentrum der City of Hernand nahe Schneiderei, Schmiede und Ausrüstungsladen. Sortiment laut questlog: Small Bag (50 Kupfer), Grundnahrung (Water, Bread, Beer, Cheese, Jerky, Wine, Fruit Tea, Fruit Juice), warme Gerichte (u. a. Braised Fish, Pickled Vegetables, Pan-Fried Rice Cakes, Fish Stew, Bird Soup) sowie die Rezepte Pickled Vegetables, Braised Fish und Pan-Fried Rice Cakes. Außerdem verkauft sie den Food Supply Contract - Hernand (1.053 Kupfer); laut Item-Text erlaubt er den Kauf hernandischer Gerichte, der zugehörige Wissenseintrag nennt sie als Lieferantin und die Greymanes als Kunden. Fextralife führt ihn als Food Trade Agreement, das erst bei höchstem Vertrauen freigeschaltet wird."},
    {name:"Conrad",role:"Greymane-Zimmermann (Möbelbauer) und Händler",region:"Greymane Camp",conf:"medium",bio:"Zimmermann der Greymanes; laut Spielbeschreibung ein temperamentvoller junger Mann, der eher impulsiv handelt, als lange zu grübeln, und dabei oft für Chaos sorgt, sich aber nicht entmutigen lässt (er ist überzeugt, dass es beim nächsten Mal klappt). Eigene Commission 'Conrad's Request': Er will das Handwerksgeheimnis des besten Bettes, Kliff soll dazu einen Gelehrten am Scholastone Institute fragen und das Geheimnis überbringen (Belohnung Medium Bag). Sortiment laut questlog (über 25 Posten): Gerichte (z. B. Satisfying Fish Porridge, Hearty Steamed Seafood), die fertigen Elixiere Apollonia's und Freya's Elixir (je 300 Kupfer), Recipe: Pickled Vegetables, Stoffrüstungen (u. a. Fundamentalist's, Antumbra und Demenissian Rebel), Blazing Spear (1.300 Kupfer), Runewalker Shield (1.057 Kupfer), Spring Green Dye und Haustier-Unterkünfte. Wo genau im Lager sein Stand liegt, ist nicht erfasst."},
    {name:"Grimnir",role:"Handwerksmeister der Kilnden Workshop · Kuku-Schmied",region:"Kilnden Workshop, Hernand",conf:"high",bio:"Laut Spielbeschreibung ein Meister der Kilnden Workshop, der in Hernand durch die dort seltene Visione auffällt: ein brillanter Ingenieur, der den Kuku-Topf allein anhand des uralten Bildes aus einem Erinnerungsfragment wiederherstellte, dessen arrogante und egozentrische Art ihn aber oft selbst Hindernisse schaffen lässt. Für die Reparatur von Generator und Brennofen verspricht er Kliff einen Eisentopf (Mission 'The Mysterious Pot', Kapitel 4; schaltet die Kuku-Werkstatt frei). Bei ihm werden Kuku-Items und -Packs gefertigt und mit Sanctum-Cores ausgebaut (Details unter Orte: Kilnden Workshop); laut questlog fertigt er außerdem Munition (Arrow, Bullet, Small Cannonball, Poison Arrow), Schmuck und zahlreiche Rüstungen, darunter The Masked Liberator's, Blackwing und Skyblazer."}
  ]
};
