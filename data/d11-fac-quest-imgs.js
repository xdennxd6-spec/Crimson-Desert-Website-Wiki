// Crimson-Desert-Wiki — Bildanleitungen zu Fraktionsquests (24.10.2026).
// Schluessel "Fraktion|Quest" exakt wie f.name und q.q in FAC_DATA (data/d05-fac-data.js),
// Wert: [[Dateiname unter cd_assets/factions/, Bildunterschrift], ...] in Spielreihenfolge.
// Bilder: ConsolePulse-Guides, Nutzung vom Betreiber erlaubt; Arbeitsstand in G:\Claude\Crimson-Desert-Wiki\fraktion-bilder\.
// 66 Quests, 144 Bilder (14.11.2026: Sanktums, Hexen, Glocken ergaenzt; Cache-Auffrischung nach Altstand im CDN).
const FAC_QUEST_IMGS = {
 "House Roberts|First Trial of Trust": [
  [
   "first-trial-of-trust-talk-to-servant.webp",
   "Diener von Haus Roberts beim Bluemont-Anwesen startet die Quest."
  ],
  [
   "first-trial-of-trust-map-location.webp",
   "Kartenposition: südlich der Anschlagtafel beim Bluemont-Anwesen."
  ],
  [
   "bluemont-cask-house-map-location.webp",
   "Bluemont-Winzerei liegt südlich des Sumpfwurzel-Viehhofs."
  ],
  [
   "troubled-count-caretaker-erich.webp",
   "Erich am Baum des Sumpfwurzel-Viehhofs ansprechen."
  ],
  [
   "bluemont-cask-house-clear-the-bandits.webp",
   "Blut-Banditen aus dem Cask House locken und das markierte Gebiet säubern."
  ]
 ],
 "House Roberts|Troubled Count": [
  [
   "troubled-count-map-location.webp",
   "Zurück zum Bluemont-Anwesen, Erich wartet draußen."
  ],
  [
   "bluemont-cask-house-talk-to-leon-roberts.webp",
   "Graf Leon Roberts sitzt im 1. Stock hinter seinem Schreibtisch."
  ]
 ],
 "House Roberts|Stolen Quarry": [
  [
   "stolen-quarry-map-location.webp",
   "Steinbruch Karin und die verschlossene Excavatron-Arena nördlich von Hernand."
  ],
  [
   "marnis-excavatron-climb-up-to-get-to.webp",
   "Weg in die Arena: westlich oder südlich des Tors den Hang hoch und über die Mauer."
  ],
  [
   "marnis-excavatron-run-away-when-hes-underground.webp",
   "Gräbt sich der Excavatron ein, sofort wegsprinten: der Auftauchangriff trifft weiträumig."
  ],
  [
   "fighting-marnis-excavatron.webp",
   "Nach Ausweichen oder Force-Palm-Betäubung kurze Combos, dann wieder Abstand."
  ],
  [
   "stolen-quarry-karin-quarry.webp",
   "Danach die Blut-Banditen besiegen, bis die Besatzungsleiste auf null ist."
  ],
  [
   "stolen-quarry-reduce-enemy-control.webp",
   "Krankenstation, Holzlager, Baracken und den zentralen Steinbruch säubern."
  ],
  [
   "hidden-treasure-piece-6-location.webp",
   "Optional: versteckte Tür neben der Arena führt zu Hidden Treasure Piece 6."
  ],
  [
   "hidden-treasure-piece-6-chest.webp",
   "Die Truhe hinter der Tür vor dem Verlassen des Steinbruchs Karin öffnen."
  ]
 ],
 "House Roberts|Sealed in Stone": [
  [
   "sealed-in-stone-talk-to-erich.webp",
   "Erich am Kran des Steinbruchs Karin gibt den Schlüssel zum Kransteuerungsraum."
  ],
  [
   "sealed-in-stone-talk-to-erich-control-the-crane.webp",
   "Mit dem Schlüssel in den Kontrollraum oberhalb des Steinbruchs."
  ],
  [
   "sealed-in-stone-lift-the-relic.webp",
   "Den Greifer über dem Relikt zentrieren, erst eine Seite ausrichten, dann die andere."
  ],
  [
   "sealed-in-stone-elevate-to-the-top.webp",
   "Sitzt der Greifer, das Relikt ganz nach oben ziehen."
  ]
 ],
 "House Roberts|The Count's Honor": [
  [
   "sealed-in-stone-return-to-roberts.webp",
   "Zurück zu Graf Roberts in Bluemont-Anwesen."
  ],
  [
   "engraved-gold-earing-info.webp",
   "Belohnung Gravierter Goldohrring: Verteidigung und Bewegungstempo beim Verfeinern."
  ]
 ],
 "Pororin Forest Guardians|A Mystical Gathering": [
  [
   "children-of-the-woods-questline.webp",
   "Start in Pororin Village: mit den Kindern sprechen, Logbuch eines Reisenden von Polan annehmen."
  ]
 ],
 "Pororin Forest Guardians|Mystic Falls": [
  [
   "ara-shai-mystic-falls-map-location.webp",
   "Ara: unterhalb der Mystikfälle (The Ancient Rift, Pailune)."
  ],
  [
   "ara-shai-mystic-falls-hole.webp",
   "Vor der Runentür links gehen und durch die schmale Öffnung nach unten fallen."
  ],
  [
   "ara-shai-glowing-tree-underground.webp",
   "Ara steht am leuchtenden Baum in der Höhle."
  ]
 ],
 "Pororin Forest Guardians|Beautiful Desert": [
  [
   "balan-shai-redtree-forest-map-location.webp",
   "Balan: Rotbaumwald im Westen von Delesyia, östlich von Demeniss."
  ],
  [
   "balan-shai-red-tree-cave.webp",
   "In der Höhle steht Balan am großen roten Baum."
  ]
 ],
 "Pororin Forest Guardians|Wyvern's Cradle": [
  [
   "alder-shai-three-brothers-cliff-map-location.webp",
   "Alder: bei Drei-Brüder-Klippe und Wyvern's Nest im Süden von Delesyia."
  ],
  [
   "alder-shai-under-stone-structure.webp",
   "Zwischen den Steinformationen hinunter, Alder und eine Truhe unter dem Überhang."
  ]
 ],
 "Pororin Forest Guardians|Desert's Edge Maze": [
  [
   "florian-shai-desert-edge-maze-map-location.webp",
   "Florian: unterirdisch im Labyrinth am Wüstenrand (Rauchende Lande, Nord-Demeniss)."
  ],
  [
   "florian-shai-underground-maze-entrance.webp",
   "Im Labyrinth eine Laterne nutzen und zur mittleren Gabelung gehen."
  ],
  [
   "florian-shai-underground-maze.webp",
   "Florian wartet rechts zwischen Grün und Hasen."
  ]
 ],
 "Pororin Forest Guardians|A Token of Friendship": [
  [
   "polan-pororin-village-quest-complete.webp",
   "Zurück zu Polan: Belohnung Pororin-Blütenmütze."
  ]
 ],
 "Greymanes (Scattered Embers / Grounds of the Sunrise / Commissions)|A Rumor at Hills of No Return": [
  [
   "embers-return-hills-no-return-greymanes-location.webp",
   "Hügel ohne Wiederkehr: Otto, Silvan, Aldric und Fritz."
  ]
 ],
 "Greymanes (Scattered Embers / Grounds of the Sunrise / Commissions)|A Rumor at Glenbright Farm": [
  [
   "embers-return-glenbright-farm-greymanes-location.webp",
   "Glenbright-Bauernhof: Ronnie, Tranan und Brice."
  ]
 ],
 "Greymanes (Scattered Embers / Grounds of the Sunrise / Commissions)|A Rumor at Hook Rapids": [
  [
   "gathered-will-hook-rapids-greymanes-location.webp",
   "Hakenfurt: Balder und Ryan."
  ]
 ],
 "Greymanes (Scattered Embers / Grounds of the Sunrise / Commissions)|A Rumor at the Inksworth Bindery": [
  [
   "solid-foundation-inksworth-bindery-waterfall-greymanes-location.webp",
   "Wasserfall über dem Heulenden Hügel (Binderei Tintenschatz): Connor, Oliver und Eric."
  ]
 ],
 "Greymanes (Scattered Embers / Grounds of the Sunrise / Commissions)|Secure Resources (Solid Foundation)": [
  [
   "azerian-manor-defense-mission.webp",
   "Die Camp-Gelder kommen aus der Verteidigungsmission im Azerian-Anwesen."
  ]
 ],
 "Greymanes (Scattered Embers / Grounds of the Sunrise / Commissions)|Greymane Commissions (Tales of the Greymanes: Carl/Ronnie/Ross/Tranan/Brice/Ronald/Pierce u.a.; 27 Aufträge)": [
  [
   "greymane-commissions-journal-medium-bag-reward.webp",
   "Das Journal Geschichten der Graumähnen listet jeden Auftrag, Belohnung jeweils eine Mittelgroße Tasche."
  ],
  [
   "medium-bag-three-inventory-slots-reward.webp",
   "Jede Mittelgroße Tasche erweitert das Inventar um drei Plätze."
  ]
 ],
 "Greymanes (Scattered Embers / Grounds of the Sunrise / Commissions)|Vibrant Dye": [
  [
   "dye-cauldron-improvise-recipes.webp",
   "Den Farbstoff für Naira im Improvise-Menü am Kessel herstellen."
  ]
 ],
 "Greymanes (Scattered Embers / Grounds of the Sunrise / Commissions)|White Wood Bow": [
  [
   "scattered-embers-white-wood-bow-crafting.webp",
   "Den Weißholzbogen in der Schmiede herstellen."
  ]
 ],
 "Greymanes (Scattered Embers / Grounds of the Sunrise / Commissions)|A Bowl of Rich Broth": [
  [
   "scattered-embers-naira-meat-soup-handover.webp",
   "Die fertige Fleischsuppe an Naira übergeben."
  ]
 ],
 "Greymanes (Scattered Embers / Grounds of the Sunrise / Commissions)|Empty Wagon": [
  [
   "scattered-embers-yann-empty-wagon-sell.webp",
   "Den gestohlenen Wagen beim Hehler abgeben (Leerer Wagen)."
  ]
 ],
 "Greymanes (Scattered Embers / Grounds of the Sunrise / Commissions)|Gentle Sound of Flowing River": [
  [
   "scattered-embers-oongka-riverside-fishing.webp",
   "Oongka wartet am Fluss auf die Angel-Herausforderung."
  ]
 ],
 "Greymanes (Scattered Embers / Grounds of the Sunrise / Commissions)|How to Distribute Strength": [
  [
   "scattered-embers-oongka-calphade-arm-wrestling.webp",
   "Armdrücken in der Taverne (Wie man Kraft verteilt)."
  ]
 ],
 "Greymanes (Scattered Embers / Grounds of the Sunrise / Commissions)|Plenty of Bounty": [
  [
   "scattered-embers-plenty-of-bounty-captured-outlaw.webp",
   "Den gefangenen Gesetzlosen bei der Wache abliefern."
  ]
 ],
 "House Celeste|Bounty Notice - Jeffrey": [
  [
   "bounty-jeffrey-detail-hero.webp",
   "Steckbrief von Jeffrey."
  ],
  [
   "bounty-jeffrey-notiz.webp",
   "Bei Pedro die Kopfgeldausschreibung hinter ihm nehmen und lesen, das markiert Jeffrey in Hernand."
  ],
  [
   "bounty-jeffrey-karte.webp",
   "Karte: Jeffrey ist tagsüber westlich des Hügelanwesens in Hernand unterwegs."
  ],
  [
   "bounty-jeffrey-fesseln.webp",
   "Sobald Fesseln erscheint, zuhauen aufhören und ihn fesseln."
  ],
  [
   "bounty-jeffrey-abliefern.webp",
   "Gefesselten Jeffrey tragen oder aufs Pferd laden und bei der Hernand Wache abgeben."
  ]
 ],
 "House Celeste|Queen's Nest": [
  [
   "house-celeste-queen-spider-arboria-castle.webp",
   "Spinnenkönigin im Schloss Arboria."
  ]
 ],
 "House Celeste|Restarting the Elixir Factory": [
  [
   "house-celeste-elixir-factory-perfect-elixir.webp",
   "Die reparierte Produktionslinie stellt das perfekte Elixier her."
  ]
 ],
 "House Celeste|The Rabid Hound of Hellwood": [
  [
   "house-celeste-hemon-beindel-fort-hellwood.webp",
   "Hemon Baindel in der Festung Höllenforst."
  ]
 ],
 "House Celeste|The Eldertree": [
  [
   "defeat-gwen-kraber.webp",
   "Gwen Kraber besiegt, danach ihren Speer an der Stelle aufheben."
  ]
 ],
 "House Celeste|Legendary Hunter": [
  [
   "legendary-hunter-legendary-animals-quest.webp",
   "Das Treffen mit dem Legendären Jäger startet die dreiteilige Tier-Untersuchung."
  ]
 ],
 "House Celeste|Dark Catastrophy": [
  [
   "silver-fang-info.webp",
   "Silberzahn, die wichtigste Belohnung dieser Reihe."
  ]
 ],
 "Goldleaf Merchant Guild|Troubled Shakatu": [
  [
   "goldleaf-troubled-shakatu-investigative-log.webp",
   "Shakatus Ermittlungsprotokoll mit den fünf Verdächtigen."
  ]
 ],
 "Goldleaf Merchant Guild|Nogle, the Trade Manager": [
  [
   "goldleaf-nogle-three-evidence-locations.webp",
   "Nogle: Kassenbuch der Taverne, zerbrochenes Fass, Steuerbescheid."
  ]
 ],
 "Goldleaf Merchant Guild|Skrav, the Trade Manager": [
  [
   "goldleaf-skrav-three-evidence-locations.webp",
   "Skrav: gestapelte Waren, Handelsplan, fallengelassene Laterne."
  ]
 ],
 "Goldleaf Merchant Guild|Kathan, the Goldleaf Private Soldier": [
  [
   "goldleaf-kathan-three-evidence-locations.webp",
   "Kathan: beschädigter Wagen, Brief der Wache, Wachbericht."
  ]
 ],
 "Goldleaf Merchant Guild|Blique, the Horse Manager": [
  [
   "goldleaf-blique-three-evidence-locations.webp",
   "Blique: Futterquittung, alter Sattel, Pferdeverleihbuch."
  ]
 ],
 "Goldleaf Merchant Guild|Grimzle, the Ledger Manager": [
  [
   "goldleaf-grimzle-three-evidence-locations.webp",
   "Grimzle: Händlersiegel, Aufenthaltsnachweis, leerer Buchdeckel."
  ]
 ],
 "Goldleaf Merchant Guild|Close Threat": [
  [
   "goldleaf-close-threat-shakatu-dialogue.webp",
   "Shakatu geht die fünf Aussagen durch, dann den Verräter benennen."
  ],
  [
   "goldleaf-close-threat-grimzle-captured.webp",
   "Grimzle wird gefesselt zu Shakatu gebracht."
  ]
 ],
 "Pororin Forest Guardians|Bell Tolling in Hernand": [
  [
   "glockenlaeuten-hernand-karte.webp",
   "Karte: Die erste Glocke steht im Uhrturm von Hernand westlich der Taverne."
  ]
 ],
 "Pororin Forest Guardians|Bell Tolling in Scholastone": [
  [
   "glockenlaeuten-scholastone-karte.webp",
   "Karte: Die Glocke hängt in einer kleinen Pagode im oberen Gartenhof."
  ]
 ],
 "Pororin Forest Guardians|Bell Tolling in Calphade": [
  [
   "glockenlaeuten-calphade-karte.webp",
   "Karte: Den Kirchturm in Thalwynd westlich von Burg Calphade besteigen."
  ]
 ],
 "Pororin Forest Guardians|Bell Tolling in Demeniss": [
  [
   "glockenlaeuten-demeniss-karte.webp",
   "Karte: Erst von der roten Fahnenstange an der Südostseite des Turms hängen."
  ]
 ],
 "Pororin Forest Guardians|Bell Tolling in Delesyia": [
  [
   "glockenlaeuten-delesyia-karte.webp",
   "Karte: Kleiner Turm mit goldenen Rohren und Zahnrädern südlich von Burg Delesyia."
  ]
 ],
 "Pororin Forest Guardians|Bell Tolling in Tommaso": [
  [
   "glockenlaeuten-tommaso-karte.webp",
   "Karte: Über Leitern und Vordächer den hohen Nordturm von Tommaso hinauf."
  ]
 ],
 "Pororin Forest Guardians|Bell Tolling in Varnia": [
  [
   "glockenlaeuten-varnia-karte.webp",
   "Karte: Unter der höchsten Palastkuppel den Holzhebel drehen."
  ]
 ],
 "Pororin Forest Guardians|Bell Tolling in Pailune": [
  [
   "glockenlaeuten-pailune-karte.webp",
   "Karte: Roter Turm am Hafen von Pailune, die Glocke zählt erst nach Kapitel 7."
  ]
 ],
 "Hexen / Witches|The Hermit Witch": [
  [
   "hermit-witch-karte.webp",
   "Karte: Sylvia wartet in der Schattenflüsterhöhle nördlich von Hernand."
  ],
  [
   "hermit-witch-hoehle.webp",
   "Sylvias Höhle: Den Höhleneingang merken, er ist später leicht zu verlieren."
  ]
 ],
 "Hexen / Witches|The Witch of Wisdom": [
  [
   "hexe-der-weisheit-karte.webp",
   "Karte: Elowens Haus liegt im Hexenwald und ist ein wichtiger Ausrüstungsstopp."
  ],
  [
   "hexe-der-weisheit-sanktumsquests.webp",
   "Elowen eröffnet die Sanktum-Questreihe in Hernand."
  ]
 ],
 "Hexen / Witches|The Witch of Kindness": [
  [
   "hexe-der-guete-karte.webp",
   "Karte: Baris Versteck liegt im Schnee von Pailune am Silberwolfberg."
  ],
  [
   "hexe-der-guete-braiser.webp",
   "Das Kohlebecken bei Baris Verkleidung anzünden, das zeigt ihr wahres Ich."
  ]
 ],
 "Hexen / Witches|The Witch of Humility": [
  [
   "hexe-der-demut-karte.webp",
   "Karte: Lyselia erscheint an der kaputten Brücke bei Beighen."
  ],
  [
   "hexe-der-demut-bruecke.webp",
   "Dem Mann an der Brücke helfen, danach zeigt Lyselia ihr wahres Ich."
  ]
 ],
 "Hexen / Witches|The Witch of Strength": [
  [
   "hexe-der-staerke-karte.webp",
   "Karte: Areciel erscheint als Kind beim Tommaso-Fork-Posthaus."
  ],
  [
   "hexe-der-staerke-haus.webp",
   "Karte: Areciels wahres Zuhause liegt beim Nabel der Welt."
  ]
 ],
 "Hexen / Witches|Sanctum of Absolution": [
  [
   "sanctum-of-absolution-lage.webp",
   "Zugang: Das Sanktum öffnet sich über Elowens Hexen-Fortschritt in Kapitel 5."
  ],
  [
   "sanctum-of-absolution-schritt-1.webp",
   "Erster Teil: Das Säulenstück liegt in der Höhle hinter der zentralen Maschine."
  ],
  [
   "sanctum-of-absolution-schritt-2.webp",
   "Zweiter Teil: Im Innenraum die Töpfe zerschlagen und den Reaktorkubus freilegen."
  ],
  [
   "sanctum-of-absolution-truhe.webp",
   "Truhe: Hinter der Kraftfaust-Wand versteckt; nicht direkt nach der Reinigung gehen."
  ]
 ],
 "Hexen / Witches|Sanctum of Atonement": [
  [
   "sanctum-of-atonement-lage.webp",
   "Karte: Das Sanktum liegt am Geisterhügel in Hernand."
  ],
  [
   "sanctum-of-atonement-schritt-1.webp",
   "Zum ersten Teil: die Felsstufe hochklettern und durch das erste Fenster einsteigen."
  ],
  [
   "sanctum-of-atonement-schritt-2.webp",
   "Zweiter Teil: durch das nächste Fenster neben dem Generator greifen."
  ],
  [
   "sanctum-of-atonement-truhe.webp",
   "Truhe: Der Raum hinter den beiden Kohlebecken enthält die versteckte Truhe."
  ]
 ],
 "Hexen / Witches|Sanctum of Benediction": [
  [
   "sanctum-of-benediction-lage.webp",
   "Karte: Das Sanktum liegt im Westen von Hernand."
  ],
  [
   "sanctum-of-benediction-schritt-1.webp",
   "Erster Kern: Im unteren Raum an der Treppe liegt der erste Reaktorkern."
  ],
  [
   "sanctum-of-benediction-schritt-2.webp",
   "Laterne anzünden: Das öffnet den geheimen Raum mit Truhe und zweitem Teil."
  ],
  [
   "sanctum-of-benediction-truhe.webp",
   "Truhe: Der geheime Laternenraum oben im Sanktum enthält die Truhe."
  ]
 ],
 "Hexen / Witches|Sanctum of Deliverance": [
  [
   "sanctum-of-deliverance-lage.webp",
   "Karte: Das Sanktum liegt östlich des Sturmklauenkamms."
  ],
  [
   "sanctum-of-deliverance-schritt-1.webp",
   "Beide Kohlebecken anzünden: Die Gitter öffnen den Raum mit erstem Teil und Truhe."
  ],
  [
   "sanctum-of-deliverance-schritt-2.webp",
   "Über den brüchigen Boden laufen, bis er einbricht und in den Kernraum fallen lässt."
  ],
  [
   "sanctum-of-deliverance-truhe.webp",
   "Truhe: Im Feuerschalenraum liegen das erste Teil und die Alphawolf-Kopfbedeckung."
  ]
 ],
 "Hexen / Witches|Sanctum of Devotion": [
  [
   "sanctum-of-devotion-lage.webp",
   "Karte: Das Sanktum liegt in Delesyia an Lyselias Sanktum-Route."
  ],
  [
   "sanctum-of-devotion-schritt-1.webp",
   "Erster Teil: Im Obergeschoss des Gebäudes, nicht außen herum suchen."
  ],
  [
   "sanctum-of-devotion-schritt-2.webp",
   "Zweiter Teil: Weiter oben im hinteren Innenraum, vor dem Verlassen einsammeln."
  ],
  [
   "sanctum-of-devotion-truhe.webp",
   "Truhe: Die rissige Wand im Obergeschoss einschlagen, dahinter liegt die Truhe."
  ]
 ],
 "Hexen / Witches|Sanctum of Exaltation": [
  [
   "sanctum-of-exaltation-lage.webp",
   "Karte: Das Sanktum liegt in Pailune, zuerst das Wasser ablassen."
  ],
  [
   "sanctum-of-exaltation-schritt-1.webp",
   "Die rissige Wand mit Kraftfaust oder schweren Treffern einschlagen und Wasser ablassen."
  ],
  [
   "sanctum-of-exaltation-schritt-2.webp",
   "Erster Teil: Nach dem Ablauf liegt er im unteren Bereich des Sanktums."
  ],
  [
   "sanctum-of-exaltation-truhe.webp",
   "Truhe: Beide Seitenlaternen anzünden, das öffnet den Raum mit der Rüstung."
  ]
 ],
 "Hexen / Witches|Sanctum of Expiation": [
  [
   "sanctum-of-expiation-lage.webp",
   "Karte: Das Sanktum liegt in Demeniss an Areciels Sanktum-Route."
  ],
  [
   "sanctum-of-expiation-schritt-1.webp",
   "Licht reflektieren auf die Ranken, das öffnet den Weg zum ersten Teil."
  ],
  [
   "sanctum-of-expiation-schritt-2.webp",
   "Truhenweg: Abwärts fallen und der zweiten Rankenöffnung folgen."
  ],
  [
   "sanctum-of-expiation-truhe.webp",
   "Truhe: Abwärts fallen und dem zweiten Rankenweg zur Truhe folgen."
  ]
 ],
 "Hexen / Witches|Sanctum of Faith": [
  [
   "sanctum-of-faith-lage.webp",
   "Karte: Das Sanktum liegt im Südosten von Delesyia."
  ],
  [
   "sanctum-of-faith-schritt-1.webp",
   "Erster Teil: Im Inneren des Gebäudes, nicht außen herum suchen."
  ],
  [
   "sanctum-of-faith-schritt-2.webp",
   "Die erste Rankensperre mit Licht reflektieren wegbrennen, dahinter liegt der Reaktorkern."
  ],
  [
   "sanctum-of-faith-truhe.webp",
   "Truhe: Die zweite Rankensperre mit Licht reflektieren wegbrennen, dahinter liegt die Truhe."
  ]
 ],
 "Hexen / Witches|Sanctum of Oblation": [
  [
   "sanctum-of-oblation-lage.webp",
   "Karte: Das Sanktum liegt in Delesyia westlich von Marnis Labor."
  ],
  [
   "sanctum-of-oblation-schritt-1.webp",
   "Erster Teil: Die Treppe hinunter, dort liegt das fehlende Säulenstück."
  ],
  [
   "sanctum-of-oblation-schritt-2.webp",
   "Das Kohlebecken anzünden, das öffnet den Weg zur versteckten Waffentruhe."
  ],
  [
   "sanctum-of-oblation-truhe.webp",
   "Truhe: Das Kohlebecken anzünden, das öffnet den Zugang zur versteckten Truhe."
  ]
 ],
 "Hexen / Witches|Sanctum of Penitence": [
  [
   "sanctum-of-penitence-lage.webp",
   "Karte: Das Sanktum liegt in Hernand an Elowens Sanktum-Route."
  ],
  [
   "sanctum-of-penitence-schritt-1.webp",
   "Zum ersten Teil: Hinter der Hauptmaschine die Wand hochklettern."
  ],
  [
   "sanctum-of-penitence-schritt-2.webp",
   "Der einzige Teil: im kleinen oberen Raum das Säulenstück greifen."
  ],
  [
   "sanctum-of-penitence-kammer.webp",
   "Truhe: Durch den eingebrochenen Boden in die versteckte Kammer fallen."
  ]
 ],
 "Hexen / Witches|Sanctum of Renunciation": [
  [
   "sanctum-of-renunciation-lage.webp",
   "Karte: Das Sanktum liegt in Tashkalp an Areciels Sanktum-Route."
  ],
  [
   "sanctum-of-renunciation-schritt-1.webp",
   "Erster Teil: Über der vergitterten Lücke nach oben schauen und greifen."
  ],
  [
   "sanctum-of-renunciation-schritt-2.webp",
   "Beide Laternen aktivieren, dann öffnet sich der Raum mit der Helm-Truhe."
  ],
  [
   "sanctum-of-renunciation-truhe.webp",
   "Truhe: Beide Laternen aktivieren, das öffnet den Helmraum mit der Truhe."
  ]
 ],
 "Hexen / Witches|Sanctum of Revelation": [
  [
   "sanctum-of-revelation-lage.webp",
   "Karte: Das Sanktum liegt nördlich des Bambuswaldes beim Hafen von Demeniss."
  ],
  [
   "sanctum-of-revelation-schritt-1.webp",
   "Boss: Antumbras Speer zuerst besiegen, danach beginnt das Reparaturrätsel."
  ],
  [
   "sanctum-of-revelation-schritt-2.webp",
   "Erster Teil: Im Westgebäude mit dem einsturzfähigen Dach liegt das Säulenstück."
  ],
  [
   "sanctum-of-revelation-truhe.webp",
   "Truhe: Der Fundort des Dorns der Finsteren Jagd im Sanktum."
  ]
 ],
 "Hexen / Witches|Sanctum of Solace": [
  [
   "sanctum-of-solace-lage.webp",
   "Karte: Das Sanktum liegt in der Schneeregion von Pailune."
  ],
  [
   "sanctum-of-solace-schritt-1.webp",
   "Boss: Antumbras Stab besiegen und das Gebiet räumen, bevor der Kern zählt."
  ],
  [
   "sanctum-of-solace-schritt-2.webp",
   "Erster Teil: Unter der Brücke fallen und durch die Wandlücke einsteigen."
  ],
  [
   "sanctum-of-solace-truhe.webp",
   "Truhe: Die zweite Truhe liegt oben an der Turmwand und ist leicht zu verpassen."
  ]
 ],
 "Hexen / Witches|Sanctum of Temperance": [
  [
   "sanctum-of-temperance-lage.webp",
   "Karte: Das Sanktum liegt in Hernand südlich der Einhornklippe."
  ],
  [
   "sanctum-of-temperance-schritt-1.webp",
   "Fusionsreaktor-Kern: Durch den eingebrochenen Boden zum Kern fallen."
  ],
  [
   "sanctum-of-temperance-schritt-2.webp",
   "Truhe 1: Hinter den Ranken im selben unteren Raum."
  ],
  [
   "sanctum-of-temperance-truhe.webp",
   "Truhe 2: Die Lampe an der vergitterten Tür anzünden, dahinter liegt die zweite Truhe."
  ]
 ],
 "Hexen / Witches|Sanctum of Veneration": [
  [
   "sanctum-of-veneration-lage.webp",
   "Karte: Das Sanktum liegt im Blauhain in Delesyia."
  ],
  [
   "sanctum-of-veneration-schritt-1.webp",
   "Zum Kern: Den Ruinenpfad hinabsteigen, nicht auf den oberen Felsen suchen."
  ],
  [
   "sanctum-of-veneration-schritt-2.webp",
   "Anheben: Hinter der anhebbaren Wand liegt der fehlende Fusionsreaktor-Kern."
  ],
  [
   "sanctum-of-veneration-truhe.webp",
   "Truhe: Vor der Wand Resist nutzen, dann mit Kraftfaust die Truhe freilegen."
  ]
 ]
};
const FAC_QUEST_IMG_DIR = "cd_assets/factions/";

// Fraktionsbanner aus den Spieldateien (09.11.2026, ergaenzt 14.11.2026): UI-Atlas cd_icon_faction_flag_00..04,
// per KI-Mix 2x hochgerechnet, Dateien cd_assets/factions/wappen/<wert>.webp. Direkte Belege: Quest/Mission der Fraktion
// traegt dieses Banner (questinfo/missioninfo); ohne eigenes Banner im Spiel steht das originale Fraktionsgruppen-Banner
// der Region (sub01 Hernand, sub03 Demeniss, sub06 Delesyia, sub07 Pailune, f029 Crimson Desert, main_icon_chaptergreywolf01
// Graumaehnen). Belege und Skripte: G:\Claude\Crimson-Desert-Wiki\fraktion-wappen\ (einbau.cjs).
// Schluessel fac = f.name in FAC_DATA bzw. lore.faction, reg = r.region in FAC_DATA.
const FAC_WAPPEN = {
 "fac": {
  "House Roberts": "f037",
  "House Serkis": "f035",
  "House Celeste": "sub01",
  "Goldleaf Merchant Guild": "m-chapter01-1",
  "House Alfonso": "f036",
  "House Felix": "f034",
  "House Grace": "f081",
  "House Lanford": "sub05",
  "Scholastone Institute": "m-chapter02-2",
  "Vellua Fishermen's Guild": "f030",
  "Beggars' Alliance": "f102",
  "St. Halssius's House of Healing": "f022",
  "Hernandian Parish of Solumen": "sub01",
  "Calphadean Merchants": "sub05",
  "Pororin Forest Guardians": "f012",
  "Greymanes (Scattered Embers / Grounds of the Sunrise / Commissions)": "m-chaptergreywolf01",
  "Hernand's Politics": "sub01",
  "Pailune Militia": "sub07",
  "Longleaf Tribe": "f008",
  "Beighen Tribe": "f032",
  "Pailune Requests": "sub07",
  "Pailune's Politics": "sub07",
  "Skoghorn Tribe": "f021",
  "House Azerian": "f041",
  "House Elemore": "f052",
  "Tariv Sorcerers": "f023",
  "Silvermoon Trade Collective": "f027",
  "Demeniss Commissions": "sub03",
  "Delesyia Commissions (Outlaws / Sammelkarte)": "sub06",
  "Ironflame Orcs": "f013",
  "Ironwheel of Dewhaven": "f017",
  "National Delesyian Institute": "sub06",
  "Redfox Trading Company": "f094",
  "Aeserion, the Great Serpent": "f080",
  "Marni": "f009",
  "Tashkalp (Tommaso / Varnia)": "f026",
  "Muiquun Outlaws": "f010",
  "Redwind Merchant Guild / Calphadean Merchants (Saltroad)": "f127",
  "Urdavah Research Institute": "f028",
  "Hexen / Witches": "f117",
  "Flame Knights": "f054",
  "Lonely Jackals": "f116",
  "Kharonso Troll Alliance": "sub01",
  "Antumbra Order": "sub07",
  "Stjar Clan": "f062",
  "Odeck Tribe": "f011",
  "Blue Fangs (Beighen Militia)": "sub07",
  "House Wells": "f025",
  "House Thorel": "f052",
  "House Marshell": "f060",
  "Society of Progress": "sub06",
  "Cogknights": "sub06",
  "Delesyian Aerial Force": "sub06",
  "Gearmelt Confectionery": "f003",
  "Blackwater Oil Merchant Guild": "sub06",
  "H.A.L.L.": "sub06",
  "Marni's Tinkertons": "sub06",
  "Marnirail": "sub06",
  "The Wyvernflames": "sub06",
  "Sage of the Desert (Sand Sages)": "f006",
  "Giant's Yard Research Group": "f097",
  "Lords of Unclaimed Lands": "f002",
  "Whitesand Retreat": "f029",
  "The Dusksongs": "f029"
 },
 "reg": {
  "Hernand": "sub01",
  "Pailune": "sub07",
  "Demeniss": "sub03",
  "Delesyia": "sub06",
  "Crimson Desert (Tashkalp)": "f029"
 }
};
