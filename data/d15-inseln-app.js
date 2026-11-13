// d15-inseln-app.js: Renderer der App-Seite "Inseln" (11.11.2026). Klassisches Script, wird von index.html (inselnLaden)
// NACH data/d15-inseln.js nachgeladen. Daten: INSELN, INSELN_META, optional INSELN_OHNE_INSEL (Vertrag: Briefing Abschnitt 4.2).
// Globale Funktion: inselnRender(root, slug); slug '' = Uebersicht, sonst Detailansicht. Mehrfach aufrufbar (idempotent).
// DOM-Vertrag: .ins-ueb (Uebersicht), svg.ins-skizze mit a.ins-pkt[data-insel], a.ins-karte[data-insel][data-s],
// article.ins-detail[data-insel], a.ins-zurueck[data-insel=""], h3.ins-name, h4.ins-h, span.ins-beleg, Zeilen .ins-unb bei unbestaetigtem Beleg.
// Hilfsfunktionen aus index.html (R2 Fundament): cdEsc, cdHero, cdNote, cdGoLink, reapplySearch (optional).

var _INS_ORT={dorf:'Dorf',kueste:'Küste',ruine:'Ruine',wachturm:'Wachturm',ankerplatz:'Ankerplatz',nest:'Nest',haus:'Haus',gebiet:'Gebiet'};
var _INS_BEW={npc:'Figur',fraktion:'Fraktion',volk:'Volk'};
var _INS_TIER={reittier:'Reittier',gegner:'Gegner',boss:'Boss',schiff:'Schiff'};
var _INS_GO={weapons:'Zur Waffe',armor:'Zur Rüstung',accessories:'Zum Schmuck',items:'Zum Gegenstand',bosses:'Zum Boss',bestiary:'Zum Gegner',
  mounts:'Zum Reittier','dlc-ausruestung':'Zur DLC-Ausrüstung',quests:'Zur Quest',npcs:'Zur Figur'};

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
/* Absaetze an Leerzeilen, einzelne Umbrueche als <br> */
function _insParas(txt,cls){
  return _insStr(txt).split(/\n{2,}/).map(function(p){return p.trim();}).filter(Boolean).map(function(p){
    return '<p class="'+cls+'">'+cdEsc(p).replace(/\n/g,'<br>')+'</p>';
  }).join('');
}
function _insUnb(b){return /unbestätigt$/.test(_insStr(b).trim());}
function _insBeleg(b){
  b=_insStr(b).trim();if(!b)return '';
  var h='<span class="ins-beleg">'+_insText(b)+'</span>';
  if(_insUnb(b))h+=' <span class="ins-unb-v">unbestätigt</span>';
  return h;
}
/* Kurzname fuer die Skizze: "Insel Samora" -> "Samora"; "Insel der roten Hänge" und "Krähenklaueninsel" bleiben voll */
function _insKurz(de){var s=_insStr(de).trim(),m=/^Insel\s+(.+)$/.exec(s);return m&&/^[A-ZÄÖÜ]/.test(m[1])?m[1]:s;}
function _insKuerzen(t,n){
  t=_insStr(t).replace(/\s+/g,' ').trim();if(t.length<=n)return t;
  var c=t.slice(0,n),i=c.lastIndexOf(' ');if(i>n*0.6)c=c.slice(0,i);
  return c.replace(/[\s,;:.\-]+$/,'')+'…';
}
function _insHref(slug){return '#sec=inseln'+(slug?'&amp;insel='+cdEsc(slug):'');}
function _insLink(l,ctx){
  if(!l||!l.sec)return '';
  return cdGoLink(l.sec,l.go||'',ctx==='quest'?'Zur Quest':(_INS_GO[l.sec]||'Im Wiki ansehen'),'ins-go');
}
function _insZahl(n){return n==null||!isFinite(n)?'':String(Math.round(n));}

/* Zeile (Listeneintrag) mit Name, EN, Etikett, Text, Sprung, Beleg */
function _insZeile(o){
  var unb=_insUnb(o.beleg);
  return '<li class="ins-z'+(unb?' ins-unb':'')+'">'
    +'<div class="ins-z-k"><b class="ins-z-n">'+cdEsc(o.name)+'</b>'
    +(o.en&&o.en!==o.name?'<span class="ins-z-en">'+cdEsc(o.en)+'</span>':'')
    +(o.art?'<span class="ins-art" data-art="'+cdEsc(o.artKey||'')+'">'+cdEsc(o.art)+'</span>':'')+'</div>'
    +(o.txt?_insParas(o.txt,'ins-z-t'):'')
    +(o.link?'<p class="ins-z-l">'+o.link+'</p>':'')
    +(o.beleg?'<p class="ins-z-b">'+_insBeleg(o.beleg)+'</p>':'')+'</li>';
}
function _insListe(rows){return rows.length?'<ul class="ins-liste">'+rows.join('')+'</ul>':'';}
function _insAbs(titel,n,body,cls){
  if(!body)return '';
  return '<section class="ins-abs cd-spot'+(cls?' '+cls:'')+'"><h4 class="ins-h">'+cdEsc(titel)
    +(n!=null?' <span class="ins-h-n">'+n+'</span>':'')+'</h4>'+body+'</section>';
}

/* ---------- Lageskizze ---------- */
/* Platzierung der Beschriftungen: je Punkt Kandidaten (rechts, links, oben, unten, vier Diagonalen; erst am Punkt, dann mit
   Abstand 20 und 32 und kurzer Fuehrungslinie). Textbreite geschaetzt (Zeichen x Schrift x 0,64). Der erste Kandidat ohne
   Ueberschneidung mit schon gesetzten Beschriftungen, Punkten, Nordpfeil und Rand gewinnt; gibt es keinen, der mit der
   kleinsten Ueberdeckung. Eng stehende Punkte werden zuerst platziert. */
function _insSkizze(liste){
  var W=480,FS=16,PX=86,PT=44,PB=38,i,k;
  var pts=liste.filter(function(x){return x&&x.lage&&isFinite(x.lage.x)&&isFinite(x.lage.z);});
  if(!pts.length)return '';
  var xs=pts.map(function(x){return +x.lage.x;}),zs=pts.map(function(x){return +x.lage.z;});
  var xmin=Math.min.apply(null,xs),xmax=Math.max.apply(null,xs),zmin=Math.min.apply(null,zs),zmax=Math.max.apply(null,zs);
  var sc=Math.min((W-2*PX)/Math.max(xmax-xmin,1),0.05),H=Math.max(Math.round((zmax-zmin)*sc+PT+PB),200);
  var P=pts.map(function(x){return {i:x,x:PX+(x.lage.x-xmin)*sc,y:PT+(zmax-x.lage.z)*sc,n:_insKurz(x.de)};});
  var R=6,hh=FS*1.05,occ=[],lab=[];
  var nord={x0:6,y0:6,x1:42,y1:46};occ.push(nord);
  P.forEach(function(p){occ.push({x0:p.x-R,y0:p.y-R,x1:p.x+R,y1:p.y+R});});
  var order=P.slice().sort(function(a,b){
    function nn(p){var m=1e9;P.forEach(function(q){if(q!==p)m=Math.min(m,Math.hypot(p.x-q.x,p.y-q.y));});return m;}
    return nn(a)-nn(b);
  });
  var DIRS=[[1,0],[-1,0],[0,-1],[0,1],[1,-1],[-1,-1],[1,1],[-1,1]];
  function ueber(a,b){var w=Math.min(a.x1,b.x1)-Math.max(a.x0,b.x0),h=Math.min(a.y1,b.y1)-Math.max(a.y0,b.y0);return w>-2&&h>-2?(Math.max(w,0)+2)*(Math.max(h,0)+2):0;}
  function kand(p,w,d,u){
    var f=1,ax=p.x+u[0]*d*f,ay=p.y+u[1]*d*f,b={},an,bl;
    if(u[0]>0){an='start';b.x0=ax;b.x1=ax+w;}else if(u[0]<0){an='end';b.x0=ax-w;b.x1=ax;}else{an='middle';b.x0=ax-w/2;b.x1=ax+w/2;}
    if(u[1]<0){b.y1=ay;b.y0=ay-hh;bl=ay-FS*0.22;}else if(u[1]>0){b.y0=ay;b.y1=ay+hh;bl=ay+FS*0.8;}else{b.y0=ay-hh/2;b.y1=ay+hh/2;bl=ay+FS*0.32;}
    b.ax=ax;b.bl=bl;b.an=an;b.d=d;
    return b;
  }
  function pen(b){
    var s=0;
    occ.forEach(function(o){s+=ueber(b,o);});
    if(b.x0<3)s+=(3-b.x0)*hh*4;if(b.x1>W-3)s+=(b.x1-(W-3))*hh*4;if(b.y0<3)s+=(3-b.y0)*hh*4;if(b.y1>H-3)s+=(b.y1-(H-3))*hh*4;
    return s;
  }
  order.forEach(function(p){
    var w=Math.ceil(p.n.length*FS*0.64)+2,best=null,bp=1e18;
    outer:for(i=0;i<3;i++){
      var d=[9,20,32][i];
      for(k=0;k<DIRS.length;k++){
        var b=kand(p,w,d,DIRS[k]),s=pen(b)+d*0.01;
        if(s<bp){bp=s;best=b;}
        if(s<0.5+d*0.01)break outer;
      }
    }
    occ.push({x0:best.x0,y0:best.y0,x1:best.x1,y1:best.y1});
    p.l=best;
  });
  var gx='',x0w=xmin-PX/sc,x1w=xmax+PX/sc,z1w=zmax+PT/sc,z0w=zmin-PB/sc,g;
  for(g=Math.ceil(x0w/2000);g<=Math.floor(x1w/2000);g++){var gxp=PX+(g*2000-xmin)*sc;gx+='<line x1="'+gxp.toFixed(1)+'" y1="2" x2="'+gxp.toFixed(1)+'" y2="'+(H-2)+'"/>';}
  for(g=Math.ceil(z0w/2000);g<=Math.floor(z1w/2000);g++){var gyp=PT+(zmax-g*2000)*sc;gx+='<line x1="2" y1="'+gyp.toFixed(1)+'" x2="'+(W-2)+'" y2="'+gyp.toFixed(1)+'"/>';}
  var h='<svg class="ins-skizze" viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Lageskizze der Inseln aus Spielkoordinaten, Norden oben, keine Karte" focusable="false">'
    +'<rect class="ins-rahmen" x="1" y="1" width="'+(W-2)+'" height="'+(H-2)+'" rx="10"/>'
    +'<g class="ins-gitter">'+gx+'</g>'
    +'<g class="ins-nord" aria-hidden="true"><path d="M24 40V14M24 12l-5 8M24 12l5 8"/><text x="24" y="52" text-anchor="middle">N</text></g>';
  P.forEach(function(p){
    var l=p.l,lx=l.ax,line='';
    if(l.d>12){
      var tx=Math.max(l.x0,Math.min(p.x,l.x1)),ty=Math.max(l.y0,Math.min(p.y,l.y1)),dx=tx-p.x,dy=ty-p.y,dl=Math.hypot(dx,dy)||1,
        sx=p.x+dx/dl*6,sy=p.y+dy/dl*6;
      line='<line class="ins-pkt-l" x1="'+sx.toFixed(1)+'" y1="'+sy.toFixed(1)+'" x2="'+tx.toFixed(1)+'" y2="'+ty.toFixed(1)+'"/>';
    }
    h+='<a class="ins-pkt" href="'+_insHref(p.i.slug)+'" data-insel="'+cdEsc(p.i.slug)+'" aria-label="'+cdEsc(_insStr(p.i.de))+'">'
      +'<circle class="ins-pkt-hit" cx="'+p.x.toFixed(1)+'" cy="'+p.y.toFixed(1)+'" r="12"/>'+line
      +'<circle class="ins-pkt-p" cx="'+p.x.toFixed(1)+'" cy="'+p.y.toFixed(1)+'" r="5"/>'
      +'<text class="ins-pkt-t" x="'+lx.toFixed(1)+'" y="'+l.bl.toFixed(1)+'" text-anchor="'+l.an+'">'+cdEsc(p.n)+'</text></a>';
  });
  return h+'</svg>';
}

/* ---------- Uebersicht ---------- */
function _insKarte(i){
  var meer=i.meer&&(i.meer.de||i.meer.en)?(i.meer.de||i.meer.en)+(_insUnb(i.meer.beleg)?' (unbestätigt)':''):'',
    kz=[[_insArr(i.hoehlen).length,'Höhlen'],[_insArr(i.quests).length,'Quests'],[_insArr(i.wissen).length,'Wissen'],[_insArr(i.fundorte).length,'Fundorte']],
    s=[i.de,i.en,meer].filter(Boolean).join(' ').toLowerCase();
  return '<a class="ins-karte cd-spot" href="'+_insHref(i.slug)+'" data-insel="'+cdEsc(i.slug)+'" data-s="'+cdEsc(s)+'">'
    +'<b class="ins-k-de">'+cdEsc(i.de)+'</b>'
    +(i.en&&i.en!==i.de?'<span class="ins-k-en">'+cdEsc(i.en)+'</span>':'')
    +'<span class="ins-k-meer'+(meer?'':' ins-null')+'">'+cdEsc(meer||'Meeresgebiet nicht erfasst')+'</span>'
    +(i.kurz&&i.kurz.txt?'<span class="ins-k-txt">'+cdEsc(_insKuerzen(i.kurz.txt,140))+'</span>':'')
    +'<span class="ins-k-z">'+kz.map(function(z){return '<span class="ins-k-zi'+(z[0]?'':' ins-null')+'"><b>'+z[0]+'</b><span>'+z[1]+'</span></span>';}).join('')+'</span></a>';
}
function _insOhne(o){
  if(!o||typeof o!=='object')return '';
  var gr=[['Höhlen',_insArr(o.hoehlen)],['Meere',_insArr(o.meere)],['Sonstiges',_insArr(o.sonst)]],n=0,h='';
  gr.forEach(function(g){
    var rows=g[1].filter(function(x){return x&&(x.de||x.en);});
    if(!rows.length)return;
    n+=rows.length;
    h+='<h4 class="ins-h">'+g[0]+' <span class="ins-h-n">'+rows.length+'</span></h4><ul class="ins-liste ins-mini">'
      +rows.map(function(x){return _insZeile({name:x.de||x.en,en:x.en,txt:x.hinweis,beleg:x.beleg});}).join('')+'</ul>';
  });
  if(!n)return '';
  return '<details class="ins-ohne-ins"><summary><span>Meeresgebiet, Insel nicht belegt</span> <span class="ins-h-n">'+n+'</span></summary>'
    +'<div class="ins-ohne-b"><p class="ins-hinweis">Diese Namen stehen in den Spieldaten, ohne dass eine Insel dazu belegt ist. Sie werden deshalb keiner Insel zugeordnet.</p>'+h+'</div></details>';
}
function _insUebersicht(unbekannt){
  var L=_insArr(INSELN),mit=L.filter(function(i){return i&&i.lage&&isFinite(i.lage.x)&&isFinite(i.lage.z);}),
    ohne=L.filter(function(i){return mit.indexOf(i)<0;}),
    hoe=0,wis=0;
  L.forEach(function(i){hoe+=_insArr(i.hoehlen).length;wis+=_insArr(i.wissen).length;});
  var stats=[[L.length,'Inseln']];
  if(mit.length)stats.push([mit.length,'mit bekannter Lage']);
  if(hoe)stats.push([hoe,'Höhlen']);
  if(wis)stats.push([wis,'Wissenseinträge']);
  var h='<div class="ins-ueb">'
    +cdHero({kicker:'Welt & Karte',title:'Inseln',glyph:'⛰',tone:'gold',sub:'Alle Inseln aus dem DLC und zwei aus dem Hauptspiel mit Orten, Höhlen, Quests und Spieltexten.',stats:stats})
    +(unbekannt?cdNote('Diese Insel gibt es im Wiki nicht.',{kind:'warn'}):'')
    +cdNote('Jede Angabe nennt klein ihren Beleg. Gestrichelt umrandete Zeilen mit dem Vermerk „unbestätigt“ sind nicht doppelt belegt.',{kind:'info'});
  if(mit.length){
    h+='<figure class="ins-fig">'+_insSkizze(mit)
      +'<figcaption class="ins-cap"><b>Lageskizze aus Spielkoordinaten, keine Karte.</b> Norden oben. Ein Klick auf einen Punkt öffnet die Insel.</figcaption></figure>';
  }
  if(ohne.length){
    h+='<div class="ins-ohne"><h3 class="ins-ueb-h">Lage nicht in den Daten <span class="ins-h-n">'+ohne.length+'</span></h3><ul class="ins-chips">'
      +ohne.map(function(i){return '<li><a class="ins-chip" href="'+_insHref(i.slug)+'" data-insel="'+cdEsc(i.slug)+'">'+cdEsc(i.de)+'</a></li>';}).join('')+'</ul></div>';
  }
  if(L.length)h+='<h3 class="ins-ueb-h">Alle Inseln <span class="ins-h-n">'+L.length+'</span></h3><div class="ins-grid">'+L.map(_insKarte).join('')+'</div>';
  if(typeof INSELN_OHNE_INSEL!=='undefined')h+=_insOhne(INSELN_OHNE_INSEL);
  return h+'</div>';
}

/* ---------- Detailansicht ---------- */
function _insWissen(list){
  var w=list.filter(function(x){return x&&(x.titel||x.txt);}),fold=w.length>3;
  if(!w.length)return '';
  return '<div class="ins-wl">'+w.map(function(x){
    var unb=_insUnb(x.beleg),t=cdEsc(x.titel||'Eintrag'),b=_insParas(x.txt,'ins-w-p')+(x.beleg?'<p class="ins-z-b">'+_insBeleg(x.beleg)+'</p>':'');
    return fold
      ?'<details class="ins-w'+(unb?' ins-unb':'')+'"><summary><span class="ins-w-t">'+t+'</span></summary><div class="ins-w-b">'+b+'</div></details>'
      :'<div class="ins-w'+(unb?' ins-unb':'')+'"><h5 class="ins-w-t">'+t+'</h5><div class="ins-w-b">'+b+'</div></div>';
  }).join('')+'</div>';
}
function _insQuellen(list){
  var q=list.map(_insStr).filter(function(s){return s.trim();});
  if(!q.length)return '';
  return '<ul class="ins-quellen">'+q.map(function(s){return '<li class="'+(_insUnb(s)?'ins-unb':'')+'"><span class="ins-beleg">'+_insText(s)+'</span></li>';}).join('')+'</ul>';
}
function _insDetail(i,idx){
  var L=_insArr(INSELN),h='<article class="ins-detail" data-insel="'+cdEsc(i.slug)+'">'
    +'<a class="ins-zurueck" href="#sec=inseln" data-insel="">Alle Inseln</a>'
    +'<header class="ins-kopf"><h3 class="ins-name" tabindex="-1">'+cdEsc(i.de)+'</h3>'
    +(i.en&&i.en!==i.de?'<p class="ins-en">'+cdEsc(i.en)+'</p>':'')
    +'<p class="ins-meer'+(i.meer&&(i.meer.de||i.meer.en)?'':' ins-null')+'">'+cdEsc(i.meer&&(i.meer.de||i.meer.en)?'Meeresgebiet: '+(i.meer.de||i.meer.en):'Meeresgebiet nicht erfasst')+'</p>'
    +(i.kurz&&i.kurz.txt?'<div class="ins-kurz'+(_insUnb(i.kurz.beleg)?' ins-unb':'')+'">'+_insParas(i.kurz.txt,'ins-kurz-t')+(i.kurz.beleg?'<p class="ins-z-b">'+_insBeleg(i.kurz.beleg)+'</p>':'')+'</div>':'')
    +'</header>',n=0,s,rows;

  /* Lage und Meeresgebiet */
  var fk=[];
  if(i.meer&&(i.meer.de||i.meer.en)){
    fk.push('<div class="ins-fk'+(_insUnb(i.meer.beleg)?' ins-unb':'')+'"><dt>Meeresgebiet</dt><dd><b>'+cdEsc(i.meer.de||i.meer.en)+'</b>'
      +(i.meer.de&&i.meer.en&&i.meer.en!==i.meer.de?' <span class="ins-z-en">'+cdEsc(i.meer.en)+'</span>':'')
      +(i.meer.hinweis?'<span class="ins-z-t">'+cdEsc(i.meer.hinweis)+'</span>':'')
      +(i.meer.beleg?'<span class="ins-z-b">'+_insBeleg(i.meer.beleg)+'</span>':'')+'</dd></div>');
  }
  if(i.lage&&isFinite(i.lage.x)&&isFinite(i.lage.z)){
    fk.push('<div class="ins-fk'+(_insUnb(i.lage.beleg)?' ins-unb':'')+'"><dt>Lage</dt><dd><b>Spielkoordinaten x '+_insZahl(i.lage.x)+', z '+_insZahl(i.lage.z)+'</b>'
      +(i.lage.beleg?'<span class="ins-z-b">'+_insBeleg(i.lage.beleg)+'</span>':'')+'</dd></div>');
  }
  if(fk.length){h+=_insAbs('Lage und Meeresgebiet',null,'<dl class="ins-fakten">'+fk.join('')+'</dl>');n++;}

  /* Orte */
  rows=_insArr(i.orte).filter(function(x){return x&&(x.de||x.en);}).map(function(x){
    return _insZeile({name:x.de||x.en,en:x.en,art:_INS_ORT[x.art]||'Ort',artKey:x.art,txt:x.txt,beleg:x.beleg});});
  if(rows.length){h+=_insAbs('Orte auf der Insel',rows.length,_insListe(rows));n++;}

  /* Hoehlen */
  rows=_insArr(i.hoehlen).filter(Boolean).map(function(x){
    return _insZeile({name:x.de||x.en||(x.unterwasser?'Unterwasserhöhle':'Höhle'),en:x.de?x.en:null,art:x.unterwasser&&(x.de||x.en)?'Unterwasser':'',artKey:'unterwasser',txt:x.txt,beleg:x.beleg});});
  if(rows.length){h+=_insAbs('Höhlen und Unterwasserhöhlen',rows.length,_insListe(rows));n++;}

  /* Bewohner */
  rows=_insArr(i.bewohner).filter(function(x){return x&&(x.de||x.en);}).map(function(x){
    return _insZeile({name:x.de||x.en,en:x.de?x.en:null,art:_INS_BEW[x.art]||'Bewohner',artKey:x.art,txt:x.txt,beleg:x.beleg});});
  if(rows.length){h+=_insAbs('Bewohner und Fraktionen',rows.length,_insListe(rows));n++;}

  /* Quests */
  rows=_insArr(i.quests).filter(function(x){return x&&(x.de||x.en);}).map(function(x){
    return _insZeile({name:x.de||x.en,en:x.de?x.en:null,txt:x.txt,link:_insLink(x.link,'quest'),beleg:x.beleg});});
  if(rows.length){h+=_insAbs('Quests und Erschließung',rows.length,_insListe(rows));n++;}

  /* Wissen */
  s=_insArr(i.wissen).filter(function(x){return x&&(x.titel||x.txt);});
  if(s.length){h+=_insAbs('Wissenseinträge',s.length,_insWissen(s));n++;}

  /* Fundorte */
  rows=_insArr(i.fundorte).filter(function(x){return x&&(x.de||x.item);}).map(function(x){
    return _insZeile({name:x.de||x.item,en:x.de?x.item:null,txt:x.txt,link:_insLink(x.link),beleg:x.beleg});});
  if(rows.length){h+=_insAbs('Schätze und Ausrüstung',rows.length,_insListe(rows));n++;}

  /* Tiere */
  rows=_insArr(i.tiere).filter(function(x){return x&&(x.de||x.en);}).map(function(x){
    return _insZeile({name:x.de||x.en,en:x.de?x.en:null,art:_INS_TIER[x.art]||'Eintrag',artKey:x.art,txt:x.txt,link:_insLink(x.link),beleg:x.beleg});});
  if(rows.length){h+=_insAbs('Reittiere, Gegner und Bosse',rows.length,_insListe(rows));n++;}

  /* Items */
  rows=_insArr(i.items).filter(function(x){return x&&(x.de||x.en);}).map(function(x){
    return _insZeile({name:x.de||x.en,en:x.de?x.en:null,txt:x.txt,beleg:x.beleg});});
  if(rows.length){h+=_insAbs('Gegenstände mit Inselbezug',rows.length,_insListe(rows));n++;}

  if(!n)h+=cdNote('Zu dieser Insel sind bisher keine Einzelheiten erfasst.',{kind:'info'});

  /* Quellen */
  s=_insQuellen(_insArr(i.quellen));
  if(s){h+=_insAbs('Quellen',_insArr(i.quellen).filter(function(q){return _insStr(q).trim();}).length,s,'ins-abs--q');}

  /* Vorherige / naechste Insel */
  var pv=idx>0?L[idx-1]:null,nx=idx<L.length-1?L[idx+1]:null;
  if(pv||nx){
    h+='<nav class="ins-nav" aria-label="Weitere Inseln">'
      +(pv?'<a class="ins-nav-a ins-nav-v" href="'+_insHref(pv.slug)+'" data-insel="'+cdEsc(pv.slug)+'"><span class="ins-nav-l">Vorherige Insel</span><b>'+cdEsc(pv.de)+'</b></a>':'<span></span>')
      +(nx?'<a class="ins-nav-a ins-nav-n" href="'+_insHref(nx.slug)+'" data-insel="'+cdEsc(nx.slug)+'"><span class="ins-nav-l">Nächste Insel</span><b>'+cdEsc(nx.de)+'</b></a>':'<span></span>')
      +'</nav>';
  }
  return h+'</article>';
}

/* ---------- Einstieg ---------- */
function _insBinden(root){
  if(root.dataset.insBound)return;
  root.dataset.insBound='1';
  root.addEventListener('click',function(e){
    if(e.defaultPrevented||e.button!==0||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;
    var a=e.target.closest&&e.target.closest('a[data-insel]');
    if(!a||!root.contains(a))return;
    e.preventDefault();
    var s=a.getAttribute('data-insel')||'';
    history.pushState(null,'',s?'#sec=inseln&insel='+s:'#sec=inseln');
    try{if(typeof _inSoll!=='undefined')_inSoll=s;}catch(x){}
    inselnRender(root,s);
    var sec=document.getElementById('sec-inseln');
    if(sec){if(window.cdMotion&&cdMotion.scrollTo)cdMotion.scrollTo(sec,{immediate:true});else sec.scrollIntoView({block:'start'});}
  });
}
function inselnRender(root,slug){
  if(!root)return;
  slug=_insStr(slug);
  _insBinden(root);
  var L=_insArr(INSELN),idx=-1,k;
  for(k=0;k<L.length;k++)if(L[k]&&L[k].slug===slug){idx=k;break;}
  if(slug&&idx>-1){
    root.innerHTML=_insDetail(L[idx],idx);
    root.dataset.insel=slug;
    var hd=root.querySelector('.ins-name');
    if(hd){try{hd.focus({preventScroll:true});}catch(e){}}
  }else{
    root.innerHTML=_insUebersicht(!!slug);
    root.dataset.insel='';
    if(typeof reapplySearch==='function')reapplySearch(root,null,0);
  }
}
