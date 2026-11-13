// Crimson-Desert-Wiki — Bildanleitungen zu Fraktionsquests (24.10.2026).
// Schluessel "Fraktion|Quest" exakt wie f.name und q.q in FAC_DATA (data/d05-fac-data.js),
// Wert: [[Dateiname unter cd_assets/factions/, Bildunterschrift], ...] in Spielreihenfolge.
// Bilder: ConsolePulse-Guides, Nutzung vom Betreiber erlaubt; Arbeitsstand in G:\Claude\Crimson-Desert-Wiki\fraktion-bilder\.
// 38 Quests, 62 Bilder (12.11.2026 auf Einzelquests umgehaengt).
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
 ]
};
const FAC_QUEST_IMG_DIR = "cd_assets/factions/";

// Fraktionsbanner aus den Spieldateien (09.11.2026): UI-Atlas cd_icon_faction_flag_00..04, per KI-Mix 2x hochgerechnet,
// Dateien cd_assets/factions/wappen/<wert>.webp. Zuordnung nur, wo eine Quest/Mission der Fraktion im Spiel dieses
// Banner traegt (questinfo/missioninfo); Fraktionen ohne Beleg behalten das Textsymbol. Belege und Skripte:
// G:\Claude\Crimson-Desert-Wiki\fraktion-wappen\ (einbau.cjs). Schluessel fac = f.name in FAC_DATA bzw. lore.faction,
// reg = r.region in FAC_DATA.
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
  "Lonely Jackals": "f116"
 },
 "reg": {
  "Hernand": "sub01",
  "Pailune": "sub07",
  "Demeniss": "sub03",
  "Delesyia": "sub06",
  "Crimson Desert (Tashkalp)": "f029"
 }
};
