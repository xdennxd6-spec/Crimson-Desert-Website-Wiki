// Crimson-Desert-Wiki — Bildanleitungen zu Fraktionsquests (24.10.2026).
// Schluessel "Fraktion|Quest" exakt wie f.name und q.q in FAC_DATA (data/d05-fac-data.js),
// Wert: [[Dateiname unter cd_assets/factions/, Bildunterschrift], ...] in Spielreihenfolge.
// Bilder: ConsolePulse-Guides, Nutzung vom Betreiber erlaubt; Arbeitsstand in G:\Claude\Crimson-Desert-Wiki\fraktion-bilder\.
// 26 Quests, 62 Bilder.
const FAC_QUEST_IMGS = {
 "House Roberts|First Trial of Trust": [
  [
   "first-trial-of-trust-talk-to-servant.webp",
   "House Roberts's Servant bei Bluemont Manor startet die Quest."
  ],
  [
   "first-trial-of-trust-map-location.webp",
   "Kartenposition: südlich des Notice Board bei Bluemont Manor."
  ],
  [
   "bluemont-cask-house-map-location.webp",
   "Bluemont Cask House liegt südlich der Muckroot Ranch."
  ],
  [
   "troubled-count-caretaker-erich.webp",
   "Erich am Baum der Muckroot Ranch ansprechen."
  ],
  [
   "bluemont-cask-house-clear-the-bandits.webp",
   "Bleed Bandits aus dem Cask House locken und das markierte Gebiet säubern."
  ]
 ],
 "House Roberts|Troubled Count": [
  [
   "troubled-count-map-location.webp",
   "Zurück zu Bluemont Manor, Erich wartet draußen."
  ],
  [
   "bluemont-cask-house-talk-to-leon-roberts.webp",
   "Graf Leon Roberts sitzt im 1. Stock hinter seinem Schreibtisch."
  ]
 ],
 "House Roberts|Stolen Quarry": [
  [
   "stolen-quarry-map-location.webp",
   "Karin Quarry und die verschlossene Excavatron-Arena nördlich von Hernand."
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
   "Danach die Bleed Bandits besiegen, bis die Besatzungsleiste auf null ist."
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
   "Die Truhe hinter der Tür vor dem Verlassen der Karin Quarry öffnen."
  ]
 ],
 "House Roberts|Sealed in Stone": [
  [
   "sealed-in-stone-talk-to-erich.webp",
   "Erich am Kran der Karin Quarry gibt den Crane Control Room Key."
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
   "Zurück zu Graf Roberts in Bluemont Manor."
  ],
  [
   "engraved-gold-earing-info.webp",
   "Belohnung Engraved Gold Earring: Verteidigung und Bewegungstempo beim Verfeinern."
  ]
 ],
 "Pororin Forest Guardians|Children of the Woods": [
  [
   "children-of-the-woods-questline.webp",
   "Start in Pororin Village: mit den Kindern sprechen, A Traveler's Log von Polan annehmen."
  ],
  [
   "ara-shai-mystic-falls-map-location.webp",
   "Ara: unterhalb der Mystic Falls (The Ancient Rift, Pailune)."
  ],
  [
   "ara-shai-mystic-falls-hole.webp",
   "Vor der Runentür links gehen und durch die schmale Öffnung nach unten fallen."
  ],
  [
   "ara-shai-glowing-tree-underground.webp",
   "Ara steht am leuchtenden Baum in der Höhle."
  ],
  [
   "florian-shai-desert-edge-maze-map-location.webp",
   "Florian: unterirdisch im Desert's Edge Maze (Smoking Lands, Nord-Demeniss)."
  ],
  [
   "florian-shai-underground-maze-entrance.webp",
   "Im Labyrinth eine Laterne nutzen und zur mittleren Gabelung gehen."
  ],
  [
   "florian-shai-underground-maze.webp",
   "Florian wartet rechts zwischen Grün und Hasen."
  ],
  [
   "balan-shai-redtree-forest-map-location.webp",
   "Balan: Redtree Forest im Westen von Delesyia, östlich von Demeniss."
  ],
  [
   "balan-shai-red-tree-cave.webp",
   "In der Höhle steht Balan am großen roten Baum."
  ],
  [
   "alder-shai-three-brothers-cliff-map-location.webp",
   "Alder: bei Three Brothers' Cliff und Wyvern's Nest im Süden von Delesyia."
  ],
  [
   "alder-shai-under-stone-structure.webp",
   "Zwischen den Steinformationen hinunter, Alder und eine Truhe unter dem Überhang."
  ],
  [
   "polan-pororin-village-quest-complete.webp",
   "Zurück zu Polan: Belohnung Pororin Petal Hat."
  ]
 ],
 "Greymanes (Scattered Embers / Grounds of the Sunrise / Commissions)|Embers of Return": [
  [
   "embers-return-hills-no-return-greymanes-location.webp",
   "Hills of No Return: Otto, Silvan, Aldric und Fritz."
  ],
  [
   "embers-return-glenbright-farm-greymanes-location.webp",
   "Glenbright Farm: Ronnie, Tranan und Brice."
  ]
 ],
 "Greymanes (Scattered Embers / Grounds of the Sunrise / Commissions)|Gathered Will (Grounds of the Sunrise)": [
  [
   "gathered-will-hook-rapids-greymanes-location.webp",
   "Hook Rapids: Balder und Ryan."
  ]
 ],
 "Greymanes (Scattered Embers / Grounds of the Sunrise / Commissions)|Solid Foundation (Grounds of the Sunrise)": [
  [
   "solid-foundation-inksworth-bindery-waterfall-greymanes-location.webp",
   "Wasserfall über Howling Hill (Inksworth Bindery): Connor, Oliver und Eric."
  ],
  [
   "azerian-manor-defense-mission.webp",
   "Die Camp-Gelder kommen aus der Verteidigungsmission im Azerian Manor."
  ]
 ],
 "Greymanes (Scattered Embers / Grounds of the Sunrise / Commissions)|Greymane Commissions (Tales of the Greymanes: Carl/Ronnie/Ross/Tranan/Brice/Ronald/Pierce u.a.; 27 Aufträge)": [
  [
   "greymane-commissions-journal-medium-bag-reward.webp",
   "Das Journal Tales of the Greymanes listet jeden Auftrag, Belohnung jeweils eine Medium Bag."
  ],
  [
   "medium-bag-three-inventory-slots-reward.webp",
   "Jede Medium Bag erweitert das Inventar um drei Plätze."
  ]
 ],
 "Greymanes (Scattered Embers / Grounds of the Sunrise / Commissions)|Brightening the Spirits": [
  [
   "dye-cauldron-improvise-recipes.webp",
   "Den Farbstoff für Naira im Improvise-Menü am Kessel herstellen."
  ]
 ],
 "Greymanes (Scattered Embers / Grounds of the Sunrise / Commissions)|The First Steps of Little Marksmen": [
  [
   "scattered-embers-white-wood-bow-crafting.webp",
   "Den White Wood Bow in der Schmiede herstellen."
  ]
 ],
 "Greymanes (Scattered Embers / Grounds of the Sunrise / Commissions)|A Taste of Home": [
  [
   "scattered-embers-naira-meat-soup-handover.webp",
   "Die fertige Fleischsuppe an Naira übergeben."
  ]
 ],
 "Greymanes (Scattered Embers / Grounds of the Sunrise / Commissions)|Strongbox with Wheels": [
  [
   "scattered-embers-yann-empty-wagon-sell.webp",
   "Den gestohlenen Wagen beim Hehler abgeben (Empty Wagon)."
  ]
 ],
 "Greymanes (Scattered Embers / Grounds of the Sunrise / Commissions)|Gentle Sound of Flowing River (Words Left by the Riverside)": [
  [
   "scattered-embers-oongka-riverside-fishing.webp",
   "Oongka wartet am Fluss auf die Angel-Herausforderung."
  ]
 ],
 "Greymanes (Scattered Embers / Grounds of the Sunrise / Commissions)|Strength Held in the Fingertips": [
  [
   "scattered-embers-oongka-calphade-arm-wrestling.webp",
   "Armdrücken in der Taverne (How to Distribute Strength)."
  ]
 ],
 "Greymanes (Scattered Embers / Grounds of the Sunrise / Commissions)|Sweet Taste of Bounties (Face on the Bounty Notice -> Plenty of Bounty)": [
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
 "House Celeste|Queen of the Silkspun Citadel (Queen's Nest)": [
  [
   "house-celeste-queen-spider-arboria-castle.webp",
   "Queen Spider in Arboria Castle."
  ]
 ],
 "House Celeste|Abandoned Factory (Restarting the Elixir Factory)": [
  [
   "house-celeste-elixir-factory-perfect-elixir.webp",
   "Die reparierte Produktionslinie stellt das perfekte Elixier her."
  ]
 ],
 "House Celeste|The Hellhounds": [
  [
   "house-celeste-hemon-beindel-fort-hellwood.webp",
   "Hemon Beindel in Fort Hellwood."
  ]
 ],
 "House Celeste|Frozen Eldertree": [
  [
   "defeat-gwen-kraber.webp",
   "Gwen Kraber besiegt, danach ihren Speer an der Stelle aufheben."
  ]
 ],
 "House Celeste|Legendary Animals": [
  [
   "legendary-hunter-legendary-animals-quest.webp",
   "Das Treffen mit dem Legendary Hunter startet die dreiteilige Tier-Untersuchung."
  ],
  [
   "silver-fang-info.webp",
   "Silver Fang, die wichtigste Belohnung dieser Reihe."
  ]
 ],
 "Goldleaf Merchant Guild|Troubled Shakatu": [
  [
   "goldleaf-troubled-shakatu-investigative-log.webp",
   "Shakatus Ermittlungsprotokoll mit den fünf Verdächtigen."
  ]
 ],
 "Goldleaf Merchant Guild|Nogle, the Trade Manager / Skrav, the Trade Manager / Kathan, the Goldleaf Private Soldier / Blique, the Horse Manager / Grimzle, the Ledger Manager (5 Ermittlungs-Schritte)": [
  [
   "goldleaf-nogle-three-evidence-locations.webp",
   "Nogle: Kassenbuch der Taverne, zerbrochenes Fass, Steuerbescheid."
  ],
  [
   "goldleaf-skrav-three-evidence-locations.webp",
   "Skrav: gestapelte Waren, Handelsplan, fallengelassene Laterne."
  ],
  [
   "goldleaf-kathan-three-evidence-locations.webp",
   "Kathan: beschädigter Wagen, Brief der Wache, Wachbericht."
  ],
  [
   "goldleaf-blique-three-evidence-locations.webp",
   "Blique: Futterquittung, alter Sattel, Pferdeverleihbuch."
  ],
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
