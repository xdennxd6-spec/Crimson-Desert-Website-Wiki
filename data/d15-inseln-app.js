// d15-inseln-app.js: Renderer der App-Seite "Inseln" (11.11.2026, Neugestaltung im Fundament-Stil 13.11.2026). Klassisches Script,
// wird von index.html (inselnLaden) NACH data/d15-inseln.js nachgeladen. Daten: INSELN, INSELN_META, optional INSELN_OHNE_INSEL.
// Globale Funktion: inselnRender(root, slug); slug '' = Uebersicht, sonst Detailansicht. Mehrfach aufrufbar (idempotent).
// Seitenkopf: drMount('inseln', …) setzt in BEIDEN Zustaenden den Kopf #dr-head-inseln (nach h2.sec-t, ausserhalb von #inseln-root):
//   Uebersicht = drHead mit Szene, Kennzahlen, Wegweiser und Besucht-Fortschritt; Detail = cdHero der Insel + Leiste + Besucht-Haken.
// DOM-Vertrag: .ins-ueb (Uebersicht), section.ins-grp > a.ins-karte[data-insel][data-s] (Inselkarten, Klassen cd-spot cd-scened),
//   svg.ins-skizze mit a.ins-pkt[data-insel] (Lageskizze in der Faltkarte #ins-lage, Mini-Skizze im Steckbrief),
//   article.ins-detail[data-insel] (in #inseln-root), a.ins-zurueck[data-insel=""] (im Kopf), h3.ins-name (Titel im Kopf, Fokusziel),
//   section.ins-abs > h4.ins-h (Abschnitte), span.ins-beleg (Belege, nur im aufgeklappten Teil und in "Quellen und Belege"),
//   .ins-unb (Eintrag mit unbestaetigtem Beleg: Warnkante + Chip "unbestätigt"). Jeder durchsuchbare Eintrag traegt data-s mit Volltext.
// Klicks auf a[data-insel] (Karte, Skizze, Kopf, Vor/Zurueck) faengt ein Handler an section#sec-inseln ab (pushState + Neurender).
// Besucht-Haken: localStorage cd_r2_dlc_inseln (DLC_KEY_ISLANDS der DLC-Seite), IDs cdSlug(DLC_ISLANDS[k].name), nur DLC-Inseln.
// Reihenfolge von INSELN bleibt unangetastet (verify-seo); sortiert wird nur in der Anzeige (_insOrdnung).
// Hilfsfunktionen aus index.html (R2 Fundament): cdEsc, cdHero, cdScene, cdSceneHas, cdFold, cdChips, cdPills, cdFacts, cdNote, cdGoLink,
//   cdIcon, cdCheck, cdCheckGet, cdProg, cdSlug, drHead, drMount, drInfo, reapplySearch (optional), cdMotion (optional).

var _INS_ORT={dorf:'Dorf',kueste:'Küste',ruine:'Ruine',wachturm:'Wachturm',ankerplatz:'Ankerplatz',nest:'Nest',haus:'Haus',gebiet:'Gebiet'};
var _INS_ORT_G={dorf:'⌂',kueste:'≈',ruine:'⛬',wachturm:'♜',ankerplatz:'⚓\uFE0E',nest:'☠\uFE0E',haus:'⌂',gebiet:'◒'};
var _INS_BEW={npc:'Figur',fraktion:'Fraktion',volk:'Volk'};
var _INS_BEW_G={npc:'♙',fraktion:'⚑',volk:'⚇'};
var _INS_TIER={reittier:'Reittier',gegner:'Gegner',boss:'Boss',schiff:'Schiff'};
var _INS_TIER_C={reittier:'ok',gegner:'warn',boss:'red',schiff:'ice'};
var _INS_GO={weapons:'Zur Waffe',armor:'Zur Rüstung',accessories:'Zum Schmuck',items:'Zum Gegenstand',bosses:'Zum Boss',bestiary:'Zum Gegner',
  mounts:'Zum Reittier','dlc-ausruestung':'Zur DLC-Ausrüstung',quests:'Zur Quest',npcs:'Zur Figur',crafting:'Zum Rezept',
  'dlc-quests':'Zur DLC-Quest','dlc-kampf':'Zum DLC-Kampf','dlc-sammeln':'Zu den Schiffsteilen',dlc:'Zu Charting the Unknown'};
/* Zielseite eines Fundorts als Chip (nur die Seite, auf der der Eintrag im Wiki steht) */
var _INS_ZIEL={weapons:'Waffe',armor:'Rüstung',accessories:'Schmuck',items:'Gegenstand','dlc-ausruestung':'DLC-Ausrüstung',crafting:'Rezept',
  'dlc-sammeln':'Schiffsteil',dlc:'DLC',mounts:'Reittier',bosses:'Boss','dlc-quests':'DLC-Quest','dlc-kampf':'DLC-Kampf'};
/* Ortsbilder (Wissensbilder des Spiels, Szenen-Schluessel aus data/d09-scenes.js) nach englischem Ortsnamen.
   Beleg der drei nicht gleichnamigen Schluessel (regioninfo.dlc_01 im Paket inseln.json):
   Region_SatyrosIsland_NorthVillage = "Satyros Village", Region_SatyrosIsland_BorderZone = "Satyros Outpost",
   Region_RazanuiIsland_Pier = "Outlaw's Rapids Dock". */
var _INS_ORT_BILD={'Samora':'isl-samora-village','Northern Coast of Samora':'isl-samora-northcoast','Southern Coast of Samora':'isl-samora-southcoast',
  'Samora East Coast':'isl-samora-eastcoast','Samora Ruins':'isl-samora-ruins','Samora Watchtower Zone':'isl-samora-watchtower',
  'Satyros Waterfall Village':'isl-satyros-waterfallvillage','Satyros Village':'isl-satyros-northvillage','Satyros Outpost':'isl-satyros-borderzone',
  'Razanui Bone Nest':'isl-razanui-bonenest',"Outlaw's Rapids Dock":'isl-razanui-pier',
  'Abandoned house on Estra Island':'isl-estra-housing','Abandoned house on Phragma Island':'isl-phragma-housing'};
/* Wissenseintraege mit diesen Titeln stehen im Steckbrief (wortgetreu) und nicht noch einmal unter "Wissen" */
var _INS_SB_W=['Lage','Anreise','Erschließung'];
var _insF='all',_insS='empf';

function _insArr(x){return Array.isArray(x)?x:[];}
function _insStr(x){return x==null?'':String(x);}
function _insHost(u){var m=/^https?:\/\/(?:www\.)?([^\/?#:]+)/i.exec(u);return m?m[1]:u;}
/* Text escapen; URLs werden zu Links mit dem Hostnamen als Text */
function _insText(s){
  s=_insStr(s);var out='',last=0,re=/https?:\/\/[^\s)]+/g,m;
  while((m=re.exec(s))){
    var u=m[0],tail='',t=/[.,;:]+$/.exec(u);
    if(t){tail=t[0];u=u.slice(0,u.length-tail.length);}
    out+=cdEsc(s.slice(last,m.index))+'<a href="'+cdEsc(u)+'" target="_blank" rel="noopener noreferrer">'+cdEsc(_insHost(u))+'</a>'+cdEsc(tail);
    last=m.index+m[0].length;
  }
  return out+cdEsc(s.slice(last));
}
function _insAbsae(txt){return _insStr(txt).split(/\n{2,}/).map(function(p){return p.trim();}).filter(Boolean);}
/* Absaetze an Leerzeilen, einzelne Umbrueche als <br>; URLs als Links */
function _insParas(txt,cls){
  return _insAbsae(txt).map(function(p){return '<p'+(cls?' class="'+cls+'"':'')+'>'+_insText(p).replace(/\n/g,'<br>')+'</p>';}).join('');
}
function _insUnb(b){return /unbestätigt$/.test(_insStr(b).trim());}
var _INS_UNB_CHIP={t:'unbestätigt',c:'warn',title:'Nur eine Quelle, nicht doppelt belegt'};
/* Belegzeile ganz unten im aufgeklappten Teil */
function _insBelegZ(b){
  b=_insStr(b).trim();if(!b)return '';
  return '<p class="cd-src ins-bz"><span class="cd-src-l">Beleg</span><span class="ins-beleg">'+_insText(b)+'</span></p>';
}
/* Kurzname: "Insel Samora" -> "Samora"; "Insel der roten Hänge" und "Krähenklaueninsel" bleiben voll */
function _insKurz(de){var s=_insStr(de).trim(),m=/^Insel\s+(.+)$/.exec(s);return m&&/^[A-ZÄÖÜ]/.test(m[1])?m[1]:s;}
function _insHref(slug){return '#sec=inseln'+(slug?'&amp;insel='+cdEsc(slug):'');}
function _insLink(l,ctx){
  if(!l||!l.sec)return '';
  return cdGoLink(l.sec,l.go||'',ctx==='quest'?'Zur Quest':(_INS_GO[l.sec]||'Im Wiki ansehen'),'ins-go');
}
function _insZahl(n){return n==null||!isFinite(n)?'':String(Math.round(n));}
/* Kennzahl-Beschriftung mit Einzahl bei 1 ("1 Fundort", "2 Fundorte") */
var _INS_EZ={'Fundorte':'Fundort','Quests':'Quest','Höhlen':'Höhle','Orte':'Ort','Inseln':'Insel'};
function _insPl(n,t){return n===1&&_INS_EZ[t]?_INS_EZ[t]:t;}
/* Kurzsatz im Kartenkopf ohne Quellenklammern wie "(th.gl, geprüft 01.11.2026)"; der volle Text steht im aufgeklappten Teil */
var _INS_QK=/\s*\((?=[^()]*(?:geprüft|\bth\.gl\b|\bmobalytics\b|\bgame8\b|\bfextralife\b|\bquestlog\b|\bpowerpyx\b|\bkeengamer\b|\bgamerant\b|\bsportskeeda\b|\bpower up gaming\b|\bQuellen?\b))[^()]*\)/gi;
function _insLeadRein(t){return _insStr(t).replace(_INS_QK,'').replace(/\s+([.,;:])/g,'$1').trim();}
function _insHatLage(i){return !!(i&&i.lage&&isFinite(i.lage.x)&&isFinite(i.lage.z));}


/* ---------- Bilder (nur vorhandene Bild-Maps des Wikis, Treffer ueber den englischen Namen) ---------- */
function _insMaps(){
  var m=[];
  if(typeof DLC_IMGS!=='undefined')m.push(DLC_IMGS);
  if(typeof DLC_BOSS_IMGS!=='undefined')m.push(DLC_BOSS_IMGS);
  if(typeof ARMOR_IMGS!=='undefined')m.push(ARMOR_IMGS);
  if(typeof WEAPON_IMGS!=='undefined')m.push(WEAPON_IMGS);
  if(typeof CORE_IMGS!=='undefined')m.push(CORE_IMGS);
  if(typeof BOSS_IMGS!=='undefined')m.push(BOSS_IMGS);
  if(typeof MOUNT_IMGS!=='undefined')m.push(MOUNT_IMGS);
  if(typeof NPC_IMGS!=='undefined')m.push(NPC_IMGS);
  if(typeof ENEMY_IMGS!=='undefined')m.push(ENEMY_IMGS);
  return m;
}
var _insIco=null;
function _insBild(en){
  en=_insStr(en);if(!en)return '';
  if(!_insIco){
    _insIco={};
    try{
      if(typeof CRAFTING!=='undefined'&&typeof CRAFT_CDN!=='undefined')CRAFTING.forEach(function(c){if(c&&c.name&&c.icon&&!_insIco[c.name])_insIco[c.name]=CRAFT_CDN+c.icon;});
      if(typeof ACCESSORIES!=='undefined')ACCESSORIES.forEach(function(a){
        if(a&&a.name&&a.icon&&!_insIco[a.name])_insIco[a.name]=/^(https?:|cd_assets\/)/.test(a.icon)?a.icon:(typeof SYNTH_CDN!=='undefined'?SYNTH_CDN:'cd_assets/ql')+a.icon;});
    }catch(e){}
  }
  var M=_insMaps();
  for(var k=0;k<M.length;k++){var v=M[k]&&M[k][en];if(typeof v==='string'&&v)return v;}
  return _insIco[en]||'';
}
function _insTierBild(t){
  var en=_insStr(t&&t.en);if(!en)return '';
  if(typeof DLC_BOSS_IMGS!=='undefined'&&DLC_BOSS_IMGS[en])return DLC_BOSS_IMGS[en];
  if(typeof DLC_IMGS!=='undefined'&&DLC_IMGS[en])return DLC_IMGS[en];
  if(typeof DLC_QUEST_IMGS!=='undefined'&&DLC_QUEST_IMGS['Pirate Ship: '+en])return DLC_QUEST_IMGS['Pirate Ship: '+en];
  if(typeof BOSS_IMGS!=='undefined'&&BOSS_IMGS[en])return BOSS_IMGS[en];
  if(typeof MOUNT_IMGS!=='undefined'&&MOUNT_IMGS[en])return MOUNT_IMGS[en];
  return '';
}
/* eigenes Bild der Insel als Rueckfall: zuerst Boss, dann Schiff */
function _insEigenBild(i){
  var T=_insArr(i.tiere),k,s;
  for(k=0;k<T.length;k++)if(T[k]&&T[k].art==='boss'&&(s=_insTierBild(T[k])))return s;
  for(k=0;k<T.length;k++)if(T[k]&&(s=_insTierBild(T[k])))return s;
  return '';
}
function _insSzenen(i){var k=['isl-'+i.slug],b=_insEigenBild(i);if(b)k.push({src:b});return k;}
function _insInselBild(i){
  var e=typeof SCENES!=='undefined'&&SCENES['isl-'+i.slug];
  if(e&&e.f)return e.f.indexOf('/')>-1?e.f:'cd_assets/scenes/'+e.f;
  return _insEigenBild(i);
}

/* ---------- Gruppen, Zaehlung, Reihenfolge ---------- */
function _insDlcE(i){
  if(typeof DLC_ISLANDS==='undefined'||!i)return null;
  for(var k=0;k<DLC_ISLANDS.length;k++)if(DLC_ISLANDS[k]&&DLC_ISLANDS[k].name===i.en)return DLC_ISLANDS[k];
  return null;
}
function _insBesKey(){return typeof DLC_KEY_ISLANDS!=='undefined'?DLC_KEY_ISLANDS:'cd_r2_dlc_inseln';}
function _insBesucht(){try{return cdCheckGet(_insBesKey());}catch(e){return new Set();}}
function _insSumme(i){
  return ['fundorte','quests','hoehlen','orte','tiere','wissen','items','bewohner'].reduce(function(n,k){return n+_insArr(i[k]).length;},0);
}
function _insBoss(i){return _insArr(i.tiere).filter(function(t){return t&&t.art==='boss';});}
/* Anzeige-Reihenfolge "Empfohlen": DLC-Inseln (erste unerschlossene Insel laut DLC_ISLANDS.unlock zuerst, dann nach Inhaltsmenge),
   danach die Inseln aus dem Hauptspiel nach Inhaltsmenge. Gleichstand: Datenreihenfolge. */
function _insOrdnung(){
  var L=_insArr(INSELN).filter(Boolean),idx=new Map();
  L.forEach(function(i,n){idx.set(i,n);});
  function cmp(a,b){
    var ua=(_insDlcE(a)||{}).unlock?1:0,ub=(_insDlcE(b)||{}).unlock?1:0;
    return (ub-ua)||(_insSumme(b)-_insSumme(a))||(idx.get(a)-idx.get(b));
  }
  var dlc=L.filter(function(i){return !!_insDlcE(i);}).sort(cmp),haupt=L.filter(function(i){return !_insDlcE(i);}).sort(cmp);
  return {dlc:dlc,haupt:haupt,alle:dlc.concat(haupt)};
}
function _insLead(i){
  if(i.kurz&&i.kurz.txt)return i.kurz.txt;
  var w=_insArr(i.wissen).filter(function(x){return x&&x.titel==='Lage'&&x.txt;})[0];
  return w?w.txt:'';
}
/* Suchtext einer Insel fuer die Uebersicht: Namen, Kurzsatz, Meer und alle Titel ihrer Eintraege */
function _insVolltext(i){
  var a=[i.de,i.en,i.kurz&&i.kurz.txt];
  if(i.meer)a.push(i.meer.de,i.meer.en);
  ['orte','hoehlen','bewohner','quests','tiere','items'].forEach(function(k){_insArr(i[k]).forEach(function(x){if(x)a.push(x.de,x.en);});});
  _insArr(i.fundorte).forEach(function(x){if(x)a.push(x.de,x.item);});
  _insArr(i.wissen).forEach(function(x){if(x)a.push(x.titel);});
  return a.filter(Boolean).join(' ').replace(/\s+/g,' ').toLowerCase();
}

/* ---------- Lageskizze ---------- */
/* Platzierung der Beschriftungen: je Punkt Kandidaten (rechts, links, oben, unten, vier Diagonalen; erst am Punkt, dann mit
   Abstand und kurzer Fuehrungslinie). Textbreite geschaetzt (Zeichen x Schrift x 0,64). Der erste Kandidat ohne Ueberschneidung
   mit schon gesetzten Beschriftungen, Punkten, Kompass und Rand gewinnt; sonst der mit der kleinsten Ueberdeckung.
   o.mini = kleine Skizze im Steckbrief (nur die Insel o.hot beschriftet, uebrige Punkte blass). */
function _insSkizze(liste,o){
  o=o||{};
  var mini=!!o.mini,hot=o.hot||'',W=480,FS=mini?30:16,PX=mini?40:86,PT=mini?36:48,PB=mini?36:38,i,k,f=mini?1.9:1;
  var pts=liste.filter(_insHatLage);
  if(!pts.length)return '';
  var xs=pts.map(function(x){return +x.lage.x;}),zs=pts.map(function(x){return +x.lage.z;});
  var xmin=Math.min.apply(null,xs),xmax=Math.max.apply(null,xs),zmin=Math.min.apply(null,zs),zmax=Math.max.apply(null,zs);
  var sc=Math.min((W-2*PX)/Math.max(xmax-xmin,1),0.05),H=Math.max(Math.round((zmax-zmin)*sc+PT+PB),200);
  var P=pts.map(function(x){
    var s=_insSumme(x),st=s>=30?3:s>=10?2:1;
    return {i:x,x:PX+(x.lage.x-xmin)*sc,y:PT+(zmax-x.lage.z)*sc,n:_insKurz(x.de),r:(2.5+st*1.4)*f,st:st,lab:!mini||x.slug===hot};
  });
  var hh=FS*1.05,occ=[],gid='ins-meer-'+(mini?'m':'g');
  if(!mini)occ.push({x0:4,y0:4,x1:50,y1:54});
  P.forEach(function(p){var R=p.r+4*f;occ.push({x0:p.x-R,y0:p.y-R,x1:p.x+R,y1:p.y+R});});
  var order=P.filter(function(p){return p.lab;}).sort(function(a,b){
    function nn(p){var m=1e9;P.forEach(function(q){if(q!==p)m=Math.min(m,Math.hypot(p.x-q.x,p.y-q.y));});return m;}
    return nn(a)-nn(b);
  });
  var DIRS=[[1,0],[-1,0],[0,-1],[0,1],[1,-1],[-1,-1],[1,1],[-1,1]];
  function ueber(a,b){var w=Math.min(a.x1,b.x1)-Math.max(a.x0,b.x0),h=Math.min(a.y1,b.y1)-Math.max(a.y0,b.y0);return w>-2&&h>-2?(Math.max(w,0)+2)*(Math.max(h,0)+2):0;}
  function kand(p,w,d,u){
    var ax=p.x+u[0]*d,ay=p.y+u[1]*d,b={},an,bl;
    if(u[0]>0){an='start';b.x0=ax;b.x1=ax+w;}else if(u[0]<0){an='end';b.x0=ax-w;b.x1=ax;}else{an='middle';b.x0=ax-w/2;b.x1=ax+w/2;}
    if(u[1]<0){b.y1=ay;b.y0=ay-hh;bl=ay-FS*0.22;}else if(u[1]>0){b.y0=ay;b.y1=ay+hh;bl=ay+FS*0.8;}else{b.y0=ay-hh/2;b.y1=ay+hh/2;bl=ay+FS*0.32;}
    b.ax=ax;b.bl=bl;b.an=an;b.d=d;
    return b;
  }
  function pen(b){
    var s=0;
    occ.forEach(function(q){s+=ueber(b,q);});
    if(b.x0<3)s+=(3-b.x0)*hh*4;if(b.x1>W-3)s+=(b.x1-(W-3))*hh*4;if(b.y0<3)s+=(3-b.y0)*hh*4;if(b.y1>H-3)s+=(b.y1-(H-3))*hh*4;
    return s;
  }
  order.forEach(function(p){
    var w=Math.ceil(p.n.length*FS*0.64)+2,best=null,bp=1e18,D=[p.r+5*f,p.r+16*f,p.r+28*f];
    outer:for(i=0;i<3;i++){
      for(k=0;k<DIRS.length;k++){
        var b=kand(p,w,D[i],DIRS[k]),s=pen(b)+D[i]*0.01;
        if(s<bp){bp=s;best=b;}
        if(s<0.5+D[i]*0.01)break outer;
      }
    }
    occ.push({x0:best.x0,y0:best.y0,x1:best.x1,y1:best.y1});
    p.l=best;p.lf=best.d>p.r+8*f;
  });
  var gx='',x0w=xmin-PX/sc,x1w=xmax+PX/sc,z1w=zmax+PT/sc,z0w=zmin-PB/sc,g;
  for(g=Math.ceil(x0w/2000);g<=Math.floor(x1w/2000);g++){var gxp=PX+(g*2000-xmin)*sc;gx+='<line x1="'+gxp.toFixed(1)+'" y1="2" x2="'+gxp.toFixed(1)+'" y2="'+(H-2)+'"/>';}
  for(g=Math.ceil(z0w/2000);g<=Math.floor(z1w/2000);g++){var gyp=PT+(zmax-g*2000)*sc;gx+='<line x1="2" y1="'+gyp.toFixed(1)+'" x2="'+(W-2)+'" y2="'+gyp.toFixed(1)+'"/>';}
  var h='<svg class="ins-skizze'+(mini?' ins-skizze--mini':'')+'" viewBox="0 0 '+W+' '+H+'" role="img" aria-label="'
      +(mini?'Lage von '+cdEsc(_insStr((pts.filter(function(x){return x.slug===hot;})[0]||{}).de))+' unter den Inseln mit Spielkoordinaten':'Lageskizze der Inseln aus Spielkoordinaten, Norden oben, keine Karte')+'" focusable="false">'
    +'<defs><radialGradient id="'+gid+'" cx="55%" cy="45%" r="75%"><stop offset="0" class="ins-meer-0"/><stop offset="1" class="ins-meer-1"/></radialGradient></defs>'
    +'<rect class="ins-rahmen" x="1" y="1" width="'+(W-2)+'" height="'+(H-2)+'" rx="'+(mini?16:12)+'" fill="url(#'+gid+')"/>'
    +'<g class="ins-gitter">'+gx+'</g>';
  if(!mini)h+='<g class="ins-nord" aria-hidden="true" transform="translate(27 32)"><circle r="14"/><path class="ins-nord-s" d="M0 -12L3.6 0L0 12L-3.6 0Z"/><path class="ins-nord-n" d="M0 -12L3.6 0H-3.6Z"/><text y="-17" text-anchor="middle">N</text></g>';
  P.forEach(function(p){
    var l=p.l,line='',cls='ins-pkt ins-pkt--'+p.st+(mini?(p.i.slug===hot?' is-hier':' is-blass'):'');
    if(l&&p.lf){
      var tx=Math.max(l.x0,Math.min(p.x,l.x1)),ty=Math.max(l.y0,Math.min(p.y,l.y1)),dx=tx-p.x,dy=ty-p.y,dl=Math.hypot(dx,dy)||1,
        sx=p.x+dx/dl*(p.r+3*f),sy=p.y+dy/dl*(p.r+3*f);
      line='<line class="ins-pkt-l" x1="'+sx.toFixed(1)+'" y1="'+sy.toFixed(1)+'" x2="'+tx.toFixed(1)+'" y2="'+ty.toFixed(1)+'"/>';
    }
    h+='<a class="'+cls+'" href="'+_insHref(p.i.slug)+'" data-insel="'+cdEsc(p.i.slug)+'" aria-label="'+cdEsc(_insStr(p.i.de))+'">'
      +'<circle class="ins-pkt-hit" cx="'+p.x.toFixed(1)+'" cy="'+p.y.toFixed(1)+'" r="'+(p.r+8*f).toFixed(1)+'"/>'+line
      +'<circle class="ins-pkt-r" cx="'+p.x.toFixed(1)+'" cy="'+p.y.toFixed(1)+'" r="'+(p.r+3.5*f).toFixed(1)+'"/>'
      +'<circle class="ins-pkt-p" cx="'+p.x.toFixed(1)+'" cy="'+p.y.toFixed(1)+'" r="'+p.r.toFixed(1)+'"/>'
      +(l?'<text class="ins-pkt-t" x="'+l.ax.toFixed(1)+'" y="'+l.bl.toFixed(1)+'" text-anchor="'+l.an+'"'+(mini?' style="font-size:'+FS+'px"':'')+'>'+cdEsc(p.n)+'</text>':'')+'</a>';
  });
  return h+'</svg>';
}

/* ---------- Uebersicht ---------- */
function _insKarte(i,ix,bes){
  var dlc=_insDlcE(i),id=dlc?cdSlug(dlc.name):'',besucht=!!(dlc&&bes.has(id)),
    nf=_insArr(i.fundorte).length,nq=_insArr(i.quests).length,nh=_insArr(i.hoehlen).length,boss=_insBoss(i),
    meer=i.meer&&(i.meer.de||i.meer.en)?(i.meer.de||i.meer.en):'',chips=[],img=_insInselBild(i),lead=_insLead(i),f=[];
  if(nf){chips.push({v:nf,t:nf===1?'Fundort':'Fundorte',c:'gold',i:'key'});f.push('beute');}
  if(nq)chips.push({v:nq,t:nq===1?'Quest':'Quests'});
  if(nh){chips.push({v:nh,t:nh===1?'Höhle':'Höhlen'});f.push('hoehlen');}
  if(boss.length){boss.forEach(function(b){chips.push({t:b.de||b.en,c:'red',g:'☠\uFE0E',title:'Boss'});});f.push('boss');}
  if(meer){var mu=_insUnb(i.meer.beleg);chips.push({t:mu?meer+' (unbestätigt)':meer,c:mu?'warn':'ice',i:'pin',title:mu?'Meeresgebiet, unbestätigt':'Meeresgebiet'});}
  chips=chips.slice(0,4);
  if(!chips.length)chips.push({t:'Noch keine Einzelheiten'});
  if(besucht)chips.push({t:'Besucht',c:'ok',i:'check'});
  if(dlc&&!besucht)f.push('offen');
  return '<a class="ins-karte cd-spot cd-scened" href="'+_insHref(i.slug)+'" data-insel="'+cdEsc(i.slug)+'" data-s="'+cdEsc(_insVolltext(i))+'"'
    +' data-f="'+f.join(' ')+'" data-ord="'+ix+'" data-az="'+cdEsc(_insKurz(i.de).toLowerCase())+'">'
    +cdScene(_insSzenen(i),{tone:'ice',glyph:'◒',w:66})
    +'<span class="ins-k-ico'+(img?'':' is-g')+'" aria-hidden="true">'+(img?'<img src="'+cdEsc(img)+'" alt="" loading="lazy" decoding="async" width="64" height="64">':'<i class="cd-g">◒</i>')+'</span>'
    +'<span class="ins-k-main"><span class="ins-k-tt"><b class="ins-k-de">'+cdEsc(i.de)+'</b>'
    +(i.en&&i.en!==i.de?'<span class="ins-k-en">'+cdEsc(i.en)+'</span>':'')+'</span>'
    +(lead?'<span class="ins-k-txt">'+cdEsc(lead)+'</span>':'')
    +cdChips(chips,'ins-k-chips')+'</span>'
    +'<span class="ins-k-go" aria-hidden="true">'+cdIcon('go')+'</span></a>';
}
function _insGruppe(key,titel,L,bes,off){
  if(!L.length)return '';
  return '<section class="ins-grp" data-grp="'+key+'"><h3 class="sub-t ins-band"><span class="ins-band-g" aria-hidden="true">'+(key==='dlc'?'◒':'⌂')+'</span>'
    +'<span class="ins-band-t">'+cdEsc(titel)+'</span><span class="ins-band-n" aria-label="Anzahl">'+L.length+'</span></h3>'
    +'<div class="ins-grid">'+L.map(function(i,n){return _insKarte(i,off+n,bes);}).join('')+'</div></section>';
}
function _insOhneBody(O){
  var h='',name=function(x){return x.de||x.en||'';};
  var hoe=_insArr(O.hoehlen).filter(function(x){return x&&(x.de||x.en);}),
    meere=_insArr(O.meere).filter(function(x){return x&&(x.de||x.en);}),
    sonst=_insArr(O.sonst).filter(function(x){return x&&(x.de||x.en);});
  if(meere.length){
    h+='<h4 class="ins-h">Meeresgebiete <span class="ins-h-n">'+meere.length+'</span></h4><ul class="ins-meere">'
      +meere.map(function(x){
        var s=[x.de,x.en,x.hinweis,x.beleg].filter(Boolean).join(' ').toLowerCase();
        return '<li data-s="'+cdEsc(s)+'"><span class="cd-chip cd-chip--ice"'+(x.en&&x.en!==x.de?' title="'+cdEsc(x.en)+'"':'')+'>'+cdIcon('pin')+'<span>'+cdEsc(name(x))+'</span></span>'
          +(x.hinweis?'<span class="ins-meer-h">'+cdEsc(x.hinweis)+'</span>':'')+'</li>';
      }).join('')+'</ul>';
  }
  function zeilen(t,l){
    if(!l.length)return '';
    return '<h4 class="ins-h">'+t+' <span class="ins-h-n">'+l.length+'</span></h4><ul class="ins-zl">'+l.map(function(x){
      var s=[x.de,x.en,x.hinweis,x.beleg].filter(Boolean).join(' ').toLowerCase();
      return '<li class="ins-zr" data-s="'+cdEsc(s)+'"><b>'+cdEsc(name(x))+'</b>'+(x.de&&x.en&&x.en!==x.de?'<span class="ins-zr-en">'+cdEsc(x.en)+'</span>':'')
        +(x.hinweis?'<span class="ins-zr-t">'+cdEsc(x.hinweis)+'</span>':'')+(x.beleg?'<span class="ins-beleg">'+_insText(x.beleg)+'</span>':'')+'</li>';
    }).join('')+'</ul>';
  }
  h+=zeilen('Höhlen',hoe)+zeilen('Orte',sonst);
  return h;
}
function _insOhne(O){
  if(!O||typeof O!=='object')return '';
  var nh=_insArr(O.hoehlen).length,nm=_insArr(O.meere).length,ns=_insArr(O.sonst).length;
  if(!nh&&!nm&&!ns)return '';
  var s=[];
  ['hoehlen','meere','sonst'].forEach(function(k){_insArr(O[k]).forEach(function(x){if(x)s.push(x.de,x.en,x.hinweis,x.beleg);});});
  var chips=[];
  if(nh)chips.push({v:nh,t:'Höhlen'});
  if(nm)chips.push({v:nm,t:'Meeresgebiete',c:'ice'});
  if(ns)chips.push({v:ns,t:'Orte'});
  return '<div class="cd-folds ins-ohne-w">'+cdFold({title:'Ohne Inselbezug',lead:'Diese Namen stehen in den Spieldaten, ohne dass eine Insel dazu belegt ist. Sie werden deshalb keiner Insel zugeordnet.',
    icon:'◌',tone:'slate',id:'ins-ohne',cls:'ins-ohne',chips:chips,s:'ohne inselbezug '+s.filter(Boolean).join(' '),
    body:function(){return _insOhneBody(O);}})+'</div>';
}
function _insKopfUeb(){
  var L=_insArr(INSELN).filter(Boolean),O=_insOrdnung(),sum=function(k){return L.reduce(function(n,i){return n+_insArr(i[k]).length;},0);},
    stats=[[L.length,'Inseln']],nWis=sum('wissen');
  [['fundorte','Fundorte'],['quests','Quests'],['hoehlen','Höhlen']].forEach(function(x){var n=sum(x[0]);if(n)stats.push([n,x[1]]);});
  var bes=_insBesucht(),done=O.dlc.filter(function(i){return bes.has(cdSlug(_insDlcE(i).name));}).length;
  var meta=typeof INSELN_META!=='undefined'&&INSELN_META&&INSELN_META.stand?INSELN_META.stand:'';
  return drHead({kicker:'Welt & Karte',title:'Inseln',glyph:'◒',tone:'ice',scene:['isl-spagnola','isl-cloven-hoof','isl-samora'],
    sub:'Alle '+L.length+' Inseln: '+O.dlc.length+' im Großen Ozean des DLC, '+O.haupt.length+' aus dem Hauptspiel. Mit Beute, Quests, Höhlen, Orten und Spieltexten'+(nWis?', darunter '+nWis+' Wissenseinträge':'')+'.',
    stats:stats,links:[['dlc','Charting the Unknown'],['dlc-ausruestung','DLC-Ausrüstung'],['dlc-quests','DLC-Quests'],['map','Karte']],
    after:(O.dlc.length?'<div class="ins-kz"><span class="ins-kz-l">DLC-Inseln besucht</span><span class="ins-kz-p">'+cdProg(done,O.dlc.length,done+' von '+O.dlc.length+' Inseln besucht')+'</span>'
        +'<span class="ins-kz-h">Abhaken in der Ansicht jeder Insel, gleiche Liste wie auf der DLC-Seite.</span></div>':'')
      +drInfo({title:'So liest du die Seite',lead:'Belege, „unbestätigt“ und Lageskizze',id:'ins-info',
        h:'<p>Jede Angabe nennt ihren Beleg im aufgeklappten Teil einer Karte. Angaben mit dem Vermerk „unbestätigt“ und einer farbigen Kante links sind nicht doppelt belegt.</p>'
          +'<p>Die Lageskizze zeigt die Inseln nach ihren Spielkoordinaten, Norden oben. Sie ist keine Karte.</p>'
          +(meta?'<p class="cd-src"><span class="cd-src-l">Datenstand</span>'+cdEsc(meta)+'</p>':'')})});
}
function _insUebersicht(unbekannt){
  var L=_insArr(INSELN).filter(Boolean),O=_insOrdnung(),bes=_insBesucht(),
    mit=L.filter(_insHatLage),ohne=O.alle.filter(function(i){return !_insHatLage(i);});
  var n=function(fn){return O.alle.filter(fn).length;},
    nb=n(function(i){return _insArr(i.fundorte).length>0;}),nbo=n(function(i){return _insBoss(i).length>0;}),
    nh=n(function(i){return _insArr(i.hoehlen).length>0;}),no=O.dlc.filter(function(i){return !bes.has(cdSlug(_insDlcE(i).name));}).length;
  var fp=[{v:'all',t:'Alle',n:L.length}];
  if(nb)fp.push({v:'beute',t:'Mit Beute',n:nb});
  if(nbo)fp.push({v:'boss',t:'Mit Boss',n:nbo});
  if(nh)fp.push({v:'hoehlen',t:'Mit Höhlen',n:nh});
  if(O.dlc.length)fp.push({v:'offen',t:'Noch nicht besucht',n:no});
  if(!fp.some(function(p){return p.v===_insF;}))_insF='all';
  fp.forEach(function(p){p.on=p.v===_insF;});
  var h='<div class="ins-ueb">'
    +(unbekannt?cdNote('Diese Insel gibt es im Wiki nicht. Hier sind alle Inseln.',{kind:'warn'}):'')
    +'<div class="ins-bar">'+cdPills(fp,{name:'ins-f',label:'Inseln filtern',cls:'ins-pf'})
    +'<div class="ins-sort"><span class="ins-sort-l" aria-hidden="true">Sortierung</span>'+cdPills([{v:'empf',t:'Empfohlen',on:_insS==='empf'},{v:'az',t:'A bis Z',on:_insS==='az'}],{name:'ins-sort',label:'Sortierung',cls:'ins-ps'})+'</div></div>';
  if(mit.length){
    var weit=typeof matchMedia==='function'?matchMedia('(min-width:700px)').matches:true;
    h+='<div class="cd-folds ins-lage-w">'+cdFold({title:'Lage der Inseln',lead:mit.length+' von '+L.length+' Inseln mit Spielkoordinaten. Norden oben, keine Karte.',
      icon:'◒',tone:'ice',id:'ins-lage',cls:'ins-lage',open:weit,
      chips:[{v:mit.length,t:'mit Lage',c:'ice',i:'pin'}].concat(ohne.length?[{v:ohne.length,t:'ohne Spielkoordinaten'}]:[]),
      body:function(){
        return '<figure class="ins-fig">'+_insSkizze(mit)+'<figcaption class="ins-cap">Ein Klick auf einen Punkt öffnet die Insel. Größere Punkte stehen für mehr Einträge.</figcaption></figure>'
          +(ohne.length?'<p class="cd-src ins-ohne-lage"><span class="cd-src-l">Ohne Spielkoordinaten</span>'
            +ohne.map(function(i){return '<a class="ins-ol" href="'+_insHref(i.slug)+'" data-insel="'+cdEsc(i.slug)+'">'+cdEsc(i.de)+'</a>';}).join(', ')+'</p>':'');
      }})+'</div>';
  }
  h+=_insGruppe('dlc','Großer Ozean (DLC)',O.dlc,bes,0)+_insGruppe('haupt','Inseln aus dem Hauptspiel',O.haupt,bes,O.dlc.length);
  if(typeof INSELN_OHNE_INSEL!=='undefined')h+=_insOhne(INSELN_OHNE_INSEL);
  return h+'</div>';
}
/* Filter und Sortierung nur ueber Klassen und Umhaengen (kein Neurender) */
function _insUebAnwenden(root){
  var ueb=root.querySelector('.ins-ueb');if(!ueb)return;
  ueb.querySelectorAll('.ins-grp').forEach(function(g){
    var grid=g.querySelector('.ins-grid'),cards=[].slice.call(grid.children),vis=0;
    cards.sort(_insS==='az'?function(a,b){return a.dataset.az.localeCompare(b.dataset.az,'de');}:function(a,b){return a.dataset.ord-b.dataset.ord;});
    cards.forEach(function(c){
      var on=_insF==='all'||(' '+c.dataset.f+' ').indexOf(' '+_insF+' ')>-1;
      c.classList.toggle('ins-off',!on);if(on)vis++;
      grid.appendChild(c);
    });
    g.hidden=!vis;
    var nn=g.querySelector('.ins-band-n');if(nn)nn.textContent=String(vis);
  });
  ueb.querySelectorAll('[data-cd-pills="ins-f"] .cd-pill').forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.v===_insF));});
  ueb.querySelectorAll('[data-cd-pills="ins-sort"] .cd-pill').forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.v===_insS));});
  if(typeof reapplySearch==='function')reapplySearch(root,null,0);
}

/* ---------- Detailansicht ---------- */
function _insFold(o){
  /* englischer Name klein im aufgeklappten Teil (Kopf bleibt einzeilig) */
  if(o.en&&o.en!==o.nm){var b=o.body,z='<p class="ins-en-z"><span class="cd-src-l">Englisch</span>'+cdEsc(o.en)+'</p>';o.body=typeof b==='function'?function(){return z+b();}:z+(b||'');}
  if(o.lead)o.lead=_insLeadRein(o.lead);
  return cdFold(Object.assign({h:5},o));
}
function _insAbs(key,titel,n,body){
  if(!body)return '';
  return '<section class="ins-abs" id="ins-a-'+key+'"><h4 class="ins-h">'+cdEsc(titel)
    +(n!=null?' <span class="ins-h-n">'+n+'</span>':'')+'</h4>'+body+'</section>';
}
function _insJ(a){return a.filter(function(x){return x!=null&&x!=='';}).join(' ');}
function _insSteckbrief(i,dlc){
  var R=[],unb=function(b){return _insUnb(b)?' '+cdChip(_INS_UNB_CHIP):'';},s=[i.de,i.en];
  R.push(['Gruppe',dlc?'Großer Ozean (DLC)':'Inseln aus dem Hauptspiel']);
  if(i.meer&&(i.meer.de||i.meer.en)){
    R.push(['Meeresgebiet',{h:'<b>'+cdEsc(i.meer.de||i.meer.en)+'</b>'+(i.meer.de&&i.meer.en&&i.meer.en!==i.meer.de?' <span class="ins-t-en">'+cdEsc(i.meer.en)+'</span>':'')
      +unb(i.meer.beleg)+(i.meer.hinweis?'<span class="ins-sb-h">'+cdEsc(i.meer.hinweis)+'</span>':'')}]);
    s.push(i.meer.de,i.meer.en,i.meer.hinweis);
  }
  _INS_SB_W.forEach(function(t){
    _insArr(i.wissen).filter(function(w){return w&&w.titel===t&&w.txt;}).forEach(function(w){
      R.push([t,{h:(_insAbsae(w.txt).length>1?_insParas(w.txt,'ins-sb-p'):_insText(w.txt))+unb(w.beleg)}]);s.push(t,w.txt);
    });
  });
  if(_insHatLage(i)){R.push(['Spielkoordinaten','x '+_insZahl(i.lage.x)+', z '+_insZahl(i.lage.z)]);}
  var mini=_insHatLage(i)?_insSkizze(_insArr(INSELN),{mini:true,hot:i.slug}):'';
  /* nur "Gruppe" belegt: die steht schon im Kicker des Kopfs, ein Kasten mit einer Zeile waere reine Leerflaeche */
  if(R.length<2&&!mini)return '';
  return '<section class="ins-sb cd-spot'+(mini?' has-mini':'')+'" data-s="'+cdEsc(_insJ(s).toLowerCase())+'"><div class="ins-sb-f"><h4 class="ins-h">Steckbrief</h4>'+cdFacts(R,{wide:true,cls:'ins-facts'})+'</div>'
    +(mini?'<figure class="ins-sb-m">'+mini+'<figcaption class="ins-cap">Lage unter den Inseln mit Spielkoordinaten</figcaption></figure>':'')+'</section>';
}
function _insFundorte(i){
  var L=_insArr(i.fundorte).filter(function(x){return x&&(x.de||x.item);});
  if(!L.length)return '';
  return '<div class="cd-folds ins-fg">'+L.map(function(x){
    var unb=_insUnb(x.beleg),src=_insBild(x.item),ziel=x.link&&_INS_ZIEL[x.link.sec],ch=[];
    if(ziel)ch.push({t:ziel,c:'gold'});
    if(unb)ch.push(_INS_UNB_CHIP);
    return _insFold({title:x.de||x.item,nm:x.de||x.item,en:x.item,lead:x.txt,icon:src?{src:src,alt:''}:'❖',chips:ch,tone:unb?'warn':'gold',cls:'ins-f'+(unb?' ins-unb':''),
      s:_insJ([x.de,x.item,x.txt,ziel,x.beleg]),attrs:{'data-go-id':x.item},
      body:function(){return _insParas(x.txt)+(x.link?'<p class="ins-gol">'+_insLink(x.link)+'</p>':'')+_insBelegZ(x.beleg);}});
  }).join('')+'</div>';
}
function _insQuests(i){
  var L=_insArr(i.quests).filter(function(x){return x&&(x.de||x.en);});
  if(!L.length)return '';
  var mit=L.filter(function(x){return x.txt||x.link;}),ohne=L.filter(function(x){return !(x.txt||x.link);}),h='';
  if(mit.length)h+='<div class="cd-folds ins-fg">'+mit.map(function(x){
    var unb=_insUnb(x.beleg),p=_insAbsae(x.txt);
    return _insFold({title:x.de||x.en,nm:x.de||x.en,en:x.en,lead:p[0]||'',icon:'⚑',tone:unb?'warn':'gold',cls:'ins-q'+(unb?' ins-unb':''),chips:unb?[_INS_UNB_CHIP]:[],
      s:_insJ([x.de,x.en,x.txt,x.beleg]),body:function(){return _insParas(x.txt)+(x.link?'<p class="ins-gol">'+_insLink(x.link,'quest')+'</p>':'')+_insBelegZ(x.beleg);}});
  }).join('')+'</div>';
  if(ohne.length)h+=(mit.length?'<p class="ins-sub">Weitere Quests und Missionen der Insel <span class="ins-h-n">'+ohne.length+'</span></p>':'')
    +'<ul class="ins-ql">'+ohne.map(function(x){
      var unb=_insUnb(x.beleg);
      return '<li class="cd-spot'+(unb?' ins-unb':'')+'" data-s="'+cdEsc(_insJ([x.de,x.en,x.beleg]).toLowerCase())+'" title="'+cdEsc(_insStr(x.beleg))+'">'
        +'<b>'+cdEsc(x.de||x.en)+'</b>'+(x.de&&x.en&&x.en!==x.de?'<span class="ins-ql-en">'+cdEsc(x.en)+'</span>':'')+(unb?cdChip(_INS_UNB_CHIP):'')+'</li>';
    }).join('')+'</ul>';
  return h;
}
function _insTiere(i){
  var L=_insArr(i.tiere).filter(function(x){return x&&(x.de||x.en);});
  if(!L.length)return '';
  return '<div class="cd-folds ins-fg">'+L.map(function(x){
    var unb=_insUnb(x.beleg),src=_insTierBild(x),p=_insAbsae(x.txt),lead=p.filter(function(a){return /^Gesichtet:/.test(a);})[0]||p.filter(function(a){return !/^Größe:/.test(a);})[0]||'',
      ch=[{t:_INS_TIER[x.art]||'Eintrag',c:_INS_TIER_C[x.art]}];
    if(unb)ch.push(_INS_UNB_CHIP);
    return _insFold({title:x.de||x.en,nm:x.de||x.en,en:x.en,lead:lead,icon:src?{src:src,alt:'',photo:true}:(x.art==='schiff'?'⚓\uFE0E':'☠\uFE0E'),chips:ch,
      tone:unb?'warn':(x.art==='boss'?'red':'ice'),cls:'ins-t'+(unb?' ins-unb':''),s:_insJ([x.de,x.en,_INS_TIER[x.art],x.txt,x.beleg]),attrs:{'data-go-id':x.en},
      body:function(){return _insParas(x.txt)+(x.link?'<p class="ins-gol">'+_insLink(x.link)+'</p>':'')+_insBelegZ(x.beleg);}});
  }).join('')+'</div>';
}
function _insOrte(i){
  var L=_insArr(i.orte).filter(function(x){return x&&(x.de||x.en);});
  if(!L.length)return '';
  return '<div class="cd-folds ins-fg ins-og">'+L.map(function(x){
    var unb=_insUnb(x.beleg),art=_INS_ORT[x.art]||'Ort',key=_INS_ORT_BILD[x.en],ch=[{t:art,c:'ice'}];
    if(unb)ch.push(_INS_UNB_CHIP);
    return _insFold({title:x.de||x.en,nm:x.de||x.en,en:x.en,lead:x.txt||'',icon:_INS_ORT_G[x.art]||'◇',chips:ch,tone:unb?'warn':'ice',cls:'ins-o'+(unb?' ins-unb':''),
      scene:{keys:(key?[key]:[]).concat(['isl-'+i.slug]),tone:'ice',w:58},s:_insJ([x.de,x.en,art,x.txt,x.beleg]),
      body:function(){return _insParas(x.txt)+_insBelegZ(x.beleg);}});
  }).join('')+'</div>';
}
function _insHoehlen(i){
  var L=_insArr(i.hoehlen).filter(Boolean);
  if(!L.length)return '';
  return '<div class="cd-folds ins-fg">'+L.map(function(x,n){
    var unb=_insUnb(x.beleg),p=_insAbsae(x.txt),t=x.de||x.en||((x.unterwasser?'Unterwasserhöhle ':'Höhle ')+(n+1)),ch=[];
    if(x.unterwasser)ch.push({t:'Unterwasser',c:'ice'});
    if(unb)ch.push(_INS_UNB_CHIP);
    return _insFold({title:t,nm:t,en:x.de?x.en:null,lead:p[1]||p[0]||'',icon:'∩',chips:ch,tone:unb?'warn':'slate',cls:'ins-h-f'+(unb?' ins-unb':''),
      s:_insJ([t,x.en,x.unterwasser?'Unterwasser':'',x.txt,x.beleg]),body:function(){return _insParas(x.txt)+_insBelegZ(x.beleg);}});
  }).join('')+'</div>';
}
function _insBewohner(i){
  var L=_insArr(i.bewohner).filter(function(x){return x&&(x.de||x.en);});
  if(!L.length)return '';
  return '<div class="cd-folds ins-fg">'+L.map(function(x){
    var unb=_insUnb(x.beleg),art=_INS_BEW[x.art]||'Bewohner',ch=[{t:art}];
    if(unb)ch.push(_INS_UNB_CHIP);
    return _insFold({title:x.de||x.en,nm:x.de||x.en,en:x.en,lead:x.txt||'',icon:_INS_BEW_G[x.art]||'♙',chips:ch,tone:unb?'warn':'violet',cls:'ins-b'+(unb?' ins-unb':''),
      s:_insJ([x.de,x.en,art,x.txt,x.beleg]),body:function(){return _insParas(x.txt)+_insBelegZ(x.beleg);}});
  }).join('')+'</div>';
}
function _insItems(i){
  var L=_insArr(i.items).filter(function(x){return x&&(x.de||x.en);});
  if(!L.length)return '';
  return '<div class="cd-folds ins-fg">'+L.map(function(x){
    var unb=_insUnb(x.beleg),src=_insBild(x.en);
    return _insFold({title:x.de||x.en,nm:x.de||x.en,en:x.en,lead:x.txt||'',icon:src?{src:src,alt:''}:'❖',chips:unb?[_INS_UNB_CHIP]:[],tone:unb?'warn':'gold',cls:'ins-i'+(unb?' ins-unb':''),
      s:_insJ([x.de,x.en,x.txt,x.beleg]),body:function(){return _insParas(x.txt)+_insBelegZ(x.beleg);}});
  }).join('')+'</div>';
}
function _insWissen(i){
  var L=_insArr(i.wissen).filter(function(x){return x&&(x.titel||x.txt)&&_INS_SB_W.indexOf(x.titel)<0;});
  if(!L.length)return '';
  return '<div class="cd-folds ins-fg">'+L.map(function(x){
    var unb=_insUnb(x.beleg),p=_insAbsae(x.txt);
    return _insFold({title:x.titel||'Eintrag',lead:p[0]||'',icon:'¶',chips:unb?[_INS_UNB_CHIP]:[],tone:unb?'warn':'gold',cls:'ins-w'+(unb?' ins-unb':''),
      s:_insJ([x.titel,x.txt,x.beleg]),body:function(){return _insParas(x.txt)+_insBelegZ(x.beleg);}});
  }).join('')+'</div>';
}
/* Quellen der Insel und jeder Einzelbeleg (nichts geht verloren, eingeklappt) */
function _insQuellen(i){
  var q=_insArr(i.quellen).map(_insStr).filter(function(s){return s.trim();}),B=[];
  function b(name,x){if(x&&_insStr(x.beleg).trim())B.push([name,x.beleg]);}
  if(i.kurz)b('Kurzbeschreibung',i.kurz);
  if(i.meer)b('Meeresgebiet',i.meer);
  if(i.lage)b('Spielkoordinaten',i.lage);
  [['fundorte','Fundort'],['quests','Quest'],['tiere',''],['orte','Ort'],['hoehlen','Höhle'],['bewohner',''],['items','Gegenstand'],['wissen','Wissen']].forEach(function(g){
    _insArr(i[g[0]]).forEach(function(x,n){if(!x)return;var nm=x.de||x.titel||x.item||x.en||(g[1]+' '+(n+1));b((g[1]&&nm.indexOf(g[1])<0?g[1]+': ':'')+nm,x);});
  });
  if(!q.length&&!B.length)return '';
  var all=q.concat(B.map(function(x){return x[0]+' '+x[1];}));
  return '<div class="cd-folds ins-qw">'+_insFold({title:'Quellen und Belege',lead:(q.length?q.length+(q.length===1?' Quelle':' Quellen'):'')+(q.length&&B.length?', ':'')+(B.length?B.length+(B.length===1?' Beleg':' Belege')+' je Eintrag':''),
    icon:{h:cdIcon('info')},tone:'slate',id:'ins-quellen',cls:'ins-qf',s:'quellen belege '+all.join(' '),
    body:function(){
      return (q.length?'<ul class="ins-quellen">'+q.map(function(s){return '<li class="'+(_insUnb(s)?'ins-unb':'')+'"><span class="ins-beleg">'+_insText(s)+'</span></li>';}).join('')+'</ul>':'')
        +(B.length?'<p class="ins-sub">Belege je Eintrag</p><ul class="ins-belege">'+B.map(function(x){
          return '<li class="'+(_insUnb(x[1])?'ins-unb':'')+'"><b>'+cdEsc(x[0])+'</b><span class="ins-beleg">'+_insText(x[1])+'</span></li>';}).join('')+'</ul>':'');
    }})+'</div>';
}
function _insNavKarte(x,rolle){
  if(!x)return '<span></span>';
  var v=rolle==='v',pf='<span class="ins-nav-p" aria-hidden="true">'+cdIcon('go')+'</span>';
  return '<a class="ins-nav-a ins-nav-'+(v?'v':'n')+' cd-spot cd-scened" href="'+_insHref(x.slug)+'" data-insel="'+cdEsc(x.slug)+'">'
    +cdScene(_insSzenen(x),{tone:'ice',glyph:'◒',w:55})
    +(v?pf:'')+'<span class="ins-nav-tx"><span class="ins-nav-l">'+(v?'Vorherige Insel':'Nächste Insel')+'</span><b>'+cdEsc(x.de)+'</b></span>'+(v?'':pf)+'</a>';
}
function _insKopfDetail(i,pv,nx,dlc){
  var st=[];
  [['fundorte','Fundorte'],['quests','Quests'],['hoehlen','Höhlen'],['orte','Orte'],['bewohner','Bewohner'],['wissen','Wissen']].forEach(function(x){
    var n=_insArr(i[x[0]]).length;if(n&&st.length<4)st.push([n,_insPl(n,x[1])]);
  });
  var sub=cdEsc(i.en&&i.en!==i.de?i.en:'')+(i.kurz&&i.kurz.txt?(i.en&&i.en!==i.de?'<br>':'')+'<span class="ins-hero-k">'+cdEsc(i.kurz.txt)+'</span>':'');
  var hero=cdHero({kicker:'Insel · '+(dlc?'Großer Ozean (DLC)':'Hauptspiel'),title:i.de,sub:sub?{h:sub}:'',scene:{keys:_insSzenen(i)},glyph:'◒',tone:'ice',stats:st,h:3,cls:'dr-hero ins-hero'})
    .replace('class="cd-hero-t"','class="cd-hero-t ins-name" tabindex="-1"');
  var nav='<nav class="dr-jump ins-jump" aria-label="Inseln">'
    +'<a class="cd-go ins-zurueck" href="#sec=inseln" data-insel=""><span class="ins-pfeil" aria-hidden="true">←</span>Alle Inseln</a>'
    +(pv?'<a class="cd-go ins-vor" href="'+_insHref(pv.slug)+'" data-insel="'+cdEsc(pv.slug)+'"><span class="ins-pfeil" aria-hidden="true">‹</span>'+cdEsc(pv.de)+'</a>':'')
    +(nx?'<a class="cd-go ins-nach" href="'+_insHref(nx.slug)+'" data-insel="'+cdEsc(nx.slug)+'">'+cdEsc(nx.de)+'<span class="ins-pfeil" aria-hidden="true">›</span></a>':'')
    +'</nav>';
  var ck=dlc?'<div class="cd-checks ins-besucht">'+cdCheck({key:_insBesKey(),id:cdSlug(dlc.name),title:'Besucht',sub:'Abgehakt auch auf der DLC-Seite',s:i.de})+'</div>':'';
  return hero+'<div class="ins-kopfleiste">'+nav+ck+'</div>';
}
function _insDetail(i,O){
  var pos=O.alle.indexOf(i),pv=pos>0?O.alle[pos-1]:null,nx=pos>-1&&pos<O.alle.length-1?O.alle[pos+1]:null,dlc=_insDlcE(i);
  var A=[
    ['beute','Beute und Fundorte','Beute',_insArr(i.fundorte).length,_insFundorte(i)],
    ['quests','Quests','Quests',_insArr(i.quests).length,_insQuests(i)],
    ['gegner','Bosse, Gegner und Schiffe','Gegner & Schiffe',_insArr(i.tiere).length,_insTiere(i)],
    ['orte','Orte','Orte',_insArr(i.orte).length,_insOrte(i)],
    ['hoehlen','Höhlen','Höhlen',_insArr(i.hoehlen).length,_insHoehlen(i)],
    ['bewohner','Bewohner und Fraktionen','Bewohner',_insArr(i.bewohner).length,_insBewohner(i)],
    ['items','Gegenstände mit Inselbezug','Gegenstände',_insArr(i.items).length,_insItems(i)],
    ['wissen','Wissen','Wissen',null,_insWissen(i)]
  ].filter(function(a){return a[4];});
  A.forEach(function(a){if(a[3]==null)a[3]=_insArr(i.wissen).filter(function(x){return x&&(x.titel||x.txt)&&_INS_SB_W.indexOf(x.titel)<0;}).length;});
  var h='<article class="ins-detail" data-insel="'+cdEsc(i.slug)+'">'+_insSteckbrief(i,dlc);
  if(A.length>=3)h+='<nav class="cd-pills ins-anker" aria-label="Abschnitte">'+A.map(function(a){
    return '<button type="button" class="cd-pill" data-ins-sprung="ins-a-'+a[0]+'"><span>'+cdEsc(a[2])+'</span><span class="cd-pill-n">'+a[3]+'</span></button>';}).join('')+'</nav>';
  if(!A.length)h+=cdNote('Zu dieser Insel sind bisher keine Einzelheiten erfasst.',{kind:'info'});
  h+=A.map(function(a){return _insAbs(a[0],a[1],a[3],a[4]);}).join('');
  h+=_insQuellen(i);
  if(pv||nx)h+='<nav class="ins-nav" aria-label="Weitere Inseln">'+_insNavKarte(pv,'v')+_insNavKarte(nx,'n')+'</nav>';
  return {kopf:_insKopfDetail(i,pv,nx,dlc),html:h+'</article>'};
}

/* ---------- Einstieg ---------- */
function _insHot(sec,slug,on){
  if(!slug)return;
  sec.querySelectorAll('.ins-karte[data-insel="'+slug+'"],.ins-pkt[data-insel="'+slug+'"]').forEach(function(el){el.classList.toggle('is-hot',on);});
}
function _insBinden(root){
  var sec=root.closest('.sec')||root.parentElement||root;
  if(sec.dataset.insBound)return;
  sec.dataset.insBound='1';
  sec.addEventListener('click',function(e){
    if(e.defaultPrevented||e.button!==0||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;
    var sp=e.target.closest&&e.target.closest('[data-ins-sprung]');
    if(sp&&sec.contains(sp)){
      var t=document.getElementById(sp.getAttribute('data-ins-sprung'));
      if(t){if(window.cdMotion&&cdMotion.scrollTo)cdMotion.scrollTo(t,{offset:-12});else t.scrollIntoView({block:'start'});}
      return;
    }
    var a=e.target.closest&&e.target.closest('a[data-insel]');
    if(!a||!sec.contains(a))return;
    e.preventDefault();
    var s=a.getAttribute('data-insel')||'';
    history.pushState(null,'',s?'#sec=inseln&insel='+s:'#sec=inseln');
    try{if(typeof _inSoll!=='undefined')_inSoll=s;}catch(x){}
    inselnRender(root,s);
    if(window.cdMotion&&cdMotion.scrollTo)cdMotion.scrollTo(sec,{immediate:true});else sec.scrollIntoView({block:'start'});
  });
  sec.addEventListener('cd-pills',function(e){
    var d=e.detail;if(!d||(d.name!=='ins-f'&&d.name!=='ins-sort'))return;
    if(d.name==='ins-f')_insF=d.value||'all';else _insS=d.value||'empf';
    _insUebAnwenden(root);
  });
  sec.addEventListener('cd-check',function(e){
    if(!e.detail||e.detail.key!==_insBesKey())return;
    var p=document.querySelector('#dr-head-inseln .ins-kz-p');if(!p)return;
    var O=_insOrdnung(),bes=_insBesucht(),done=O.dlc.filter(function(i){return bes.has(cdSlug(_insDlcE(i).name));}).length;
    p.innerHTML=cdProg(done,O.dlc.length,done+' von '+O.dlc.length+' Inseln besucht');
  });
  /* Punkt der Skizze und Inselkarte heben sich gegenseitig hervor (nur Klassen) */
  var cur='';
  sec.addEventListener('pointerover',function(e){
    var a=e.target.closest&&e.target.closest('.ins-karte[data-insel],.ins-pkt[data-insel]'),s=a?a.getAttribute('data-insel'):'';
    if(s===cur)return;
    _insHot(sec,cur,false);cur=s;_insHot(sec,cur,true);
  });
  sec.addEventListener('pointerleave',function(){_insHot(sec,cur,false);cur='';});
}
function inselnRender(root,slug){
  if(!root)return;
  slug=_insStr(slug);
  _insBinden(root);
  var L=_insArr(INSELN),i=null,k;
  for(k=0;k<L.length;k++)if(L[k]&&L[k].slug===slug){i=L[k];break;}
  if(slug&&i){
    var d=_insDetail(i,_insOrdnung());
    if(typeof drMount==='function')drMount('inseln',d.kopf);
    root.innerHTML=d.html;
    root.dataset.insel=slug;
    var hd=document.querySelector('#dr-head-inseln .ins-name');
    if(hd){try{hd.focus({preventScroll:true});}catch(e){}}
    if(typeof reapplySearch==='function')reapplySearch(root,null,0);
  }else{
    if(typeof drMount==='function')drMount('inseln',_insKopfUeb());
    root.innerHTML=_insUebersicht(!!slug);
    root.dataset.insel='';
    _insUebAnwenden(root);
  }
}
