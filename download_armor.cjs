const https = require('https');
const fs = require('fs');
const path = require('path');

const BASE = 'https://static0.fextralifeimages.com/file/crimsondesertgame/';
const OUT = path.join(__dirname, 'cd_assets', 'armor');

if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

const DOWNLOADS = [
  // ── Body Armor (Torso) ──
  ['9/9a/Ashclaw_leather_armor_armor_crimson_desert_wiki_guide.png',       'ashclaw-leather.png'],
  ['b/b6/Belkandor_plate_armor_armor_crimson_desert_wiki_guide.png',       'belkandor-plate.png'],
  ['6/61/Blackwing_leather_armor_crimson_desert_wiki_guide.png',           'blackwing-leather.png'],
  ['1/19/Bolton_plate_armor_armor_crimson_desert_wiki_guide.png',          'bolton-plate.png'],
  ['0/00/Canta_plate_armor_armor_crimson_desert_wiki_guide.png',           'canta-plate.png'],
  ['8/8b/Dark_ringleaders_cloth_armor_armor_crimson_desert_wiki_guide.png','dark-ringleader-cloth.png'],
  ['f/ff/Demeniss_elite_uniform_leather_armor_armor_crimson_desert_wiki_guide.png','demeniss-elite-uniform.png'],
  ['d/dd/Duskfang_leather_armor_armor_crimson_desert_wiki_guide.png',      'duskfang-leather.png'],
  ['2/2e/Elegant_carmine_leather_armor_armor_crimson_desert_wiki_guide.png','elegant-carmine-leather.png'],
  ['1/13/Frostcursed_plate_armor_armor_crimson_desert_wiki_guide.png',     'frostcursed-plate.png'],
  ['b/b7/Golden_greed_plate_armor_crimson_desert_wiki_guide.png',          'golden-greed-plate.png'],
  ['f/f5/Grey_wolf_leather_armor_armor_crimson_desert_wiki_guide.png',     'grey-wolf-leather.png'],
  ['0/0f/Hernand_ceremonial_guard_armor_armor_crimson_desert_wiki_guide.png','hernand-ceremonial-guard.png'],
  ['f/fb/Jackals_leather_armor_armor_crimson_desert_wiki_guide.png',       'jackals-leather.png'],
  ['e/e6/Leather_armor_of_the_fallen_kingdom_armor_crimson_desert_wiki_guide.png','leather-armor-fallen.png'],
  ['5/5b/Light_of_the_battlefield_plate_armor_armor_crimson_desert_wiki_guide.png','light-battlefield-plate.png'],
  ['0/08/Northern_fighters_chain_mail_armor_crimson_desert_wiki_guide.png','northern-chainmail.png'],
  ['6/61/Official_knights_plate_armor_armor_crimson_desert_wiki_guide.png','official-knights-plate.png'],
  ['f/f3/Plate_armor_of_cursed_soul_armor_crimson_desert_wiki_guide.png',  'plate-armor-cursed-soul.png'],
  ['7/77/Plate_armor_of_the_shadows_armor_crimson_desert_wiki_guide.png',  'plate-armor-shadows.png'],
  ['3/3d/Scarlet_blades_cloth_armor_armor_crimson_desert_wiki_guide.png',  'scarlet-blades-cloth.png'],
  ['c/c9/Scholastone_uniform_armor_crimson_desert_wiki_guide.png',         'scholastone-uniform.png'],
  ['8/8f/Scorchflame_plate_armor_armor_crimson_desert_wiki_guide.png',     'scorchflame-plate.png'],
  ['1/1b/Skyblazer_cloth_armor_armor_crimson_desert_wiki_guide.png',       'skyblazer-cloth.png'],
  ['6/68/Solas_plate_armor_armor_crimson_desert_wiki_guide.png',           'solas-plate.png'],
  ['4/41/Sunset_reed_leather_armor_armor_crimson_desert_wiki_guide.png',   'sunset-reed-leather.png'],
  ['6/60/Unyieldingg_warriors_plate_armor_armor_crimson_desert_wiki_guide.png','unyielding-warriors-plate.png'],
  ['7/7b/Weasel_leather_armor_armor_crimson_desert_wiki_guide.png',        'weasel-leather.png'],
  ['b/b7/Ynitium_leather_armor_armor_crimson_desert_wiki_guide.png',       'ynitium-leather.png'],

  // ── Headgear (Kopf) ──
  ['e/e4/Alpha_wolf_helm_armor_crimson_desert_wiki_guide.png',             'alpha-wolf-helm.png'],
  ['f/f1/Ashad_plate_helm_crimson_desert_wiki_guide.png',                  'ashad-plate-helm.png'],
  ['c/c5/Blackwing_mask_armor_crimson_desert_wiki_guide.png',              'blackwing-mask.png'],
  ['c/cc/Bolton_plate_helm_armor_crimson_desert_wiki_guide.png',           'bolton-plate-helm.png'],
  ['3/3e/Canta_plate_helm_armor_crimson_desert_wiki_guide.png',            'canta-plate-helm.png'],
  ['3/39/Dark_ringleaders_cloth_helm_armor_crimson_desert_wiki_guide.png', 'dark-ringleader-helm.png'],
  ['8/85/Flame_knights_plate_helm_crimson_desert_wiki_guide.png',          'flame-knights-helm.png'],
  ['2/21/Frostcursed_plate_helm_crimson_desert_wiki_guide.png',            'frostcursed-plate-helm.png'],
  ['6/69/Golden_greed_plate_helm_armor_crimson_desert_wiki_guide.png',     'golden-greed-helm.png'],
  ['2/2d/Helm_of_ignition_armor_crimson_desert_wiki_guide.png',            'helm-of-ignition.png'],
  ['e/e9/Helm_of_knowledge_armor_crimson_desert_wiki_guide.png',           'helm-of-knowledge.png'],
  ['6/62/Hernandian_crown_armor_crimson_desert_wiki_guide.png',            'hernandian-crown.png'],
  ['6/67/Jackals_leather_helm_armor_crimson_desert_wiki_guide.png',        'jackals-helm.png'],
  ['2/2c/Leather_helm_of_the_fallen_kingdom_armor_crimson_desert_wiki_guide.png','leather-helm-fallen.png'],
  ['3/3a/Light_of_the_battlefield_plate_helm_crimson_desert_wiki_guide.png','light-battlefield-helm.png'],
  ['7/7a/Plate_helm_of_cursed_soul_armor_crimson_desert_wiki_guide.png',   'plate-helm-cursed-soul.png'],
  ['7/73/Scorchflame_plate_helm_armor_crimson_desert_wiki_guide.png',      'scorchflame-helm.png'],
  ['3/38/Unyielding_warriors_plate_helmet_armor_crimson_desert_wiki_guide.png','unyielding-warriors-helm.png'],
  ['1/11/Visione_armor_crimson_desert_wiki_guide.png',                     'visione-helm.png'],

  // ── Gloves (Hände) ──
  ['7/75/Blackwing_leather_gloves_crimson_desert_wiki_guide.png',          'blackwing-leather-gloves.png'],
  ['4/43/Canta_plate_gloves_armor_crimson_desert_wiki_guide.png',          'canta-plate-gloves.png'],
  ['1/18/Combat_gods_plate_gloves_armor_crimson-desert_wiki_guide.png',    'combat-gods-gloves.png'],
  ['5/5d/Counterweight_leather_gloves_armor_crimson_desert_wiki_guide.png','counterweight-gloves.png'],
  ['1/1d/Demeniss_elite_solider_plate_gloves_crimson_desert_wiki_guide.png','demeniss-elite-gloves.png'],
  ['a/aa/Duskfang_leather_gloves_crimson_desert_wiki_guide.png',           'duskfang-gloves.png'],
  ['d/db/Frostcursed_plate_gloves_crimson_desert_wiki_guide.png',          'frostcursed-gloves.png'],
  ['6/6d/Golden_greed_plate_gloves_armor_crimson_desert_wiki_guide.png',   'golden-greed-gloves.png'],
  ['9/9d/Hernand_ceremonial_guard_gloves_armor_crimson_desert_wiki_guide.png','hernand-ceremonial-gloves.png'],
  ['6/69/Light_of_the_battlefield_plate_gloves_armor_crimson_desert_wiki_guide.png','light-battlefield-gloves.png'],
  ['8/8f/Plate_gloves_of_cursed_soul_armor_crimson_desert_wiki_guide.png', 'plate-gloves-cursed-soul.png'],
  ['e/e2/Plate_gloves_of_the_shadows_armo_crimson_desert_wiki_guide.png',  'plate-gloves-shadows.png'],
  ['a/ab/Scorchflame_plate_gloves_armor_crimson_desert_wiki_guide.png',    'scorchflame-gloves.png'],
  ['6/64/Ynitium_leather_gloves_armor_crimson_desert_wiki_guide.png',      'ynitium-gloves.png'],

  // ── Boots (Schuhe) ──
  ['b/bd/Ashen_wolfs_leather_boots_armor_crimson_desert_wiki_guide.png',   'ashen-wolf-boots.png'],
  ['5/59/Autumn_banquet_leather_boots_armor_crimson_desert_wiki_guide.png','autumn-banquet-boots.png'],
  ['2/28/Belkandor_plate_boots_armor_crimson_desert_wiki_guide.png',       'belkandor-plate-boots.png'],
  ['7/7e/Blackwing_leather_boots_armor_crimson_desert_wiki_guide.png',     'blackwing-leather-boots.png'],
  ['c/c4/Bolton_leather_boots_armor_crimson_desert_wiki_guide.png',        'bolton-leather-boots.png'],
  ['c/c9/Canta_plate_boots_armor_crimson_desert_wiki_guide.png',           'canta-plate-boots.png'],
  ['4/4c/Dark_marksmans_plate_boots_crimson_desert_wiki_guide.png',        'dark-marksman-boots.png'],
  ['f/fd/Embersteps_leather_boots_crimson_desert_wiki_guide.png',          'embersteps-boots.png'],
  ['c/cd/Fire_walk_boots_armor_crimson_desert_wiki_guide.png',             'fire-walk-boots.png'],
  ['0/04/Frostcursed_plate_boots_crimson_desert_wiki_guide.png',           'frostcursed-plate-boots.png'],
  ['3/3d/Golden_greed_plate_boots_crimson_desert_wiki_guide.png',          'golden-greed-boots.png'],
  ['7/72/Hernand_ceremonial_guard_boots_armor_crimson_desert_wiki_guide.png','hernand-ceremonial-boots.png'],
  ['1/11/Icewing_plate_boots_armor_crimson_desert_wiki_guide.png',         'icewing-plate-boots.png'],
  ['3/3f/Kairos_plate_boots_armor_crimson_desert_wiki_guide.png',          'kairos-plate-boots.png'],
  ['0/0a/Light_of_the_battlefield_plate_boots_armor_crimson_desert_wiki_guide.png','light-battlefield-boots.png'],
  ['2/2b/Lightning_bolt_plate_boots_armor_crimson_desert_wiki_guide.png',  'lightning-bolt-boots.png'],
  ['e/ec/Pailunese_boots_armor_crimson_desert_wiki_guide.png',             'pailunese-boots.png'],

  // ── Cloaks (Mantel) ──
  ['1/1a/Ashad_plate_cloak_armor_crimson_desert_wiki_guide.png',           'ashad-plate-cloak.png'],
  ['6/64/Ashen_wolfs_leather_cloak_armor_crimson_desert_wiki_guide.png',   'ashen-wolf-cloak.png'],
  ['0/0a/Belkandor_plate_cloak_armor_crimson_desert_wiki_guide.png',       'belkandor-plate-cloak.png'],
  ['1/1d/Black_bears_cloth_cloak_armor_crimson_desert_wiki_guide.png',     'black-bears-cloak.png'],
  ['b/b7/Blackwing_leather_cloak_armor_crimson_desert_wiki_guide.png',     'blackwing-leather-cloak.png'],
  ['6/63/Bolton_plate_cloak_armor_crimson_desert_wiki_guide.png',          'bolton-plate-cloak.png'],
  ['9/99/Dragon_flame_cloak_armor_crimson_desert_wiki_guide.png',          'dragon-flame-cloak.png'],
];

function download(wikiPath, localFile) {
  const dest = path.join(OUT, localFile);
  if (fs.existsSync(dest)) {
    console.log(`SKIP  ${localFile}`);
    return Promise.resolve();
  }
  const url = BASE + wikiPath;
  return new Promise((resolve) => {
    const file = fs.createWriteStream(dest);
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode === 200) {
        res.pipe(file);
        file.on('finish', () => { file.close(); console.log(`OK    ${localFile}`); resolve(); });
      } else {
        file.close();
        fs.unlinkSync(dest);
        console.log(`FAIL  ${localFile}  (HTTP ${res.statusCode})`);
        resolve();
      }
    }).on('error', (e) => {
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      console.log(`ERR   ${localFile}  ${e.message}`);
      resolve();
    });
  });
}

(async () => {
  for (const [wikiPath, localFile] of DOWNLOADS) {
    await download(wikiPath, localFile);
  }
  console.log('Done.');
})();
