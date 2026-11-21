
/* ==== R2 FUNDAMENT · Kern (Redesign 2, 21.10.2026) ====
   Gemeinsame Bausteine für alle Seiten. API, Beispiele, Do/Don't: redesign-2/FUNDAMENT.md.
   Alle Helfer liefern HTML-Strings (Text wird escaped, rohes HTML nur über {h:'…'} bzw. body/aside).
   CSS: Block "R2 FUNDAMENT" am Ende des Haupt-Stylesheets. Bauer ändern hier NICHTS (Wünsche in den Bericht). */
/* Lichtkegel: alle Karten-/Kacheltypen (gleiche Liste wie im CSS-Block "Lichtkegel"); neue Karten bekommen einfach .cd-spot */
var CD_SPOT_SEL='.card,.so-tile,.so-chip,.pet-card,.set-card,.sk-c,.witch-card,.witch-svc,.te-grp,.ch-card,.chap,.build-card,.ov-card,.ach-card,.rm-task,.fac-reg,.sec-block,.qhero-stat,.qst-node,.upg-fact,.col-stat,.fav-item,.sg-card,.comm-it,.loc-pc,.cmt-item,.bo-saved-card,.sim-stat,.ov-miss-it,.disarm-hero,.sec-hero,.qhero,.qst-hero,.cd-spot,.cd-fold,.cd-hero,.cd-check';
function cdEsc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
/* Text oder {h:'roh'} */
function _cdT(x){return x&&typeof x==='object'&&'h' in x?String(x.h):cdEsc(typeof deT==='function'?deT(x):x);}
/* LEITPLANKEN 4: klein, Umlaute/Akzente weg, ß→ss, alles außer a-z0-9 → '-', Ränder ohne '-' */
function cdSlug(s){return String(s==null?'':s).toLowerCase().replace(/ß/g,'ss').normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');}
function _cdFoldTxt(s){return String(s==null?'':s).toLowerCase().replace(/ß/g,'ss').normalize('NFD').replace(/[̀-ͯ]/g,'');}
function _cdAttrs(a){
  if(!a)return '';
  if(typeof a==='string')return ' '+a.trim();
  var o='';for(var k in a){if(a[k]==null||a[k]===false)continue;o+=' '+k+(a[k]===true?'':'="'+cdEsc(a[k])+'"');}
  return o;
}

/* ---- Icons: ein SVG-Sprite (24er Raster, Strich), Aufruf cdIcon('fire') ---- */
var CD_ICONS={
  hp:'<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
  stam:'<path d="M5 19c0-8.3 5.7-14 14-14 0 8.3-5.7 14-14 14z"/><path d="M5 19l8-8"/>',
  spirit:'<path d="M12 3l6 9-6 9-6-9z"/><path d="M12 8v8"/>',
  ice:'<path d="M12 2v20M3.4 7l17.2 10M3.4 17L20.6 7"/><path d="M9 3.6l3 2 3-2M9 20.4l3-2 3 2"/>',
  fire:'<path d="M12 21c-3.9 0-6-2.6-6-5.6 0-3.3 2.6-5 3.6-8.4.4 1.7 1.4 2.7 2.4 3.2C12.6 7 13.8 4.6 13.5 3c3 2 4.5 6 4.5 10.4 0 4.6-2.4 7.6-6 7.6z"/>',
  bolt:'<path d="M13 2L5 14h6l-1 8 8-12h-6z"/>',
  poison:'<path d="M12 3c3 4.5 6 7.6 6 11a6 6 0 0 1-12 0c0-3.4 3-6.5 6-11z"/><path d="M10 14.5h.01M14 16.5h.01M12.5 12h.01"/>',
  atk:'<path d="M20 4l-9.5 9.5M20 4h-5M20 4v5M7.5 12.5l4 4M5 19l3-3M3.5 20.5l1.5-1.5"/>',
  def:'<path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"/>',
  speed:'<path d="M4 6l6 6-6 6M12 6l6 6-6 6"/>',
  res:'<path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"/><path d="M9 12l2 2 4-4"/>',
  neutral:'<path d="M12 4l2 6 6 2-6 2-2 6-2-6-6-2 6-2z"/>',
  chev:'<path d="M6 9l6 6 6-6"/>',
  check:'<path d="M5 12.5l4.5 4.5L19 7"/>',
  info:'<path d="M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18z"/><path d="M12 11v5M12 8h.01"/>',
  warn:'<path d="M12 4l9 16H3z"/><path d="M12 10v4M12 17h.01"/>',
  miss:'<path d="M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18z"/><path d="M12 7v6l3.5 2"/>',
  go:'<path d="M5 12h14M13 6l6 6-6 6"/>',
  pin:'<path d="M12 21s-6-5.6-6-11a6 6 0 0 1 12 0c0 5.4-6 11-6 11z"/><path d="M12 8a2 2 0 1 0 0 4a2 2 0 1 0 0-4z"/>',
  key:'<path d="M8 15a4 4 0 1 1 3.4-6.1L21 9v3h-2v2h-3v-2h-4.6A4 4 0 0 1 8 15z"/>'
};
function cdIcon(n,cls){return '<svg class="cd-i'+(cls?' '+cls:'')+'" aria-hidden="true" focusable="false"><use href="#cd-i-'+(CD_ICONS[n]?n:'neutral')+'"/></svg>';}
(function(){
  var s='';for(var k in CD_ICONS)s+='<symbol id="cd-i-'+k+'" viewBox="0 0 24 24">'+CD_ICONS[k]+'</symbol>';
  document.body.insertAdjacentHTML('afterbegin','<svg class="cd-sprite" aria-hidden="true" focusable="false">'+s+'</svg>');
})();

/* ---- Akzentfarbe: tone = Token-Name (gold, red, violet, ok, warn, ice, slate, amber) oder CSS-Farbe; region = Regionsname ---- */
var CD_TONES={gold:'var(--gold)',red:'var(--red)',violet:'var(--violet)',ok:'var(--cd-ok)',warn:'var(--warn)',ice:'var(--cd-fx-ice)',slate:'var(--slate)',amber:'var(--amber)'};
function cdTone(o){
  o=o||{};
  if(o.tone)return CD_TONES[o.tone]||(/^(#|rgb|hsl|var\(|color-mix)/.test(o.tone)?o.tone:null);
  if(o.region&&typeof REGION_COLORS!=='undefined'){
    var r=typeof normReg==='function'?normReg(o.region):o.region,m=r&&REGION_COLORS[r]&&/#[0-9a-f]{6}/i.exec(REGION_COLORS[r]);
    if(m)return m[0];
  }
  return null;
}

/* ---- Szene (Epitome-Technik, LEITPLANKEN 4) ----
   keys: 'reg-hernand' | ['ruin-x','reg-hernand'] | {src,pos} (gemischt erlaubt). Erster vorhandener Schlüssel gewinnt,
   die übrigen sind Ladefehler-Rückfall. Ohne Bild: Akzentverlauf + Glyphe. opts: region, tone, glyph, full, hero, pos, w, op, cls */
function _cdSceneSrc(k){
  if(!k)return null;
  if(typeof k==='object'&&k.src)return {src:k.src,pos:k.pos||'',alt:k.alt||'',w:k.w,h:k.h};
  var e=typeof SCENES!=='undefined'&&SCENES[k];
  if(!e||!e.f)return null;
  return {src:e.f.indexOf('/')>-1?e.f:'cd_assets/scenes/'+e.f,pos:e.pos||'',w:e.w,h:e.h};
}
function cdSceneHas(keys){return [].concat(keys||[]).some(function(k){return !!_cdSceneSrc(k);});}
function cdScene(keys,opts){
  opts=opts||{};
  var list=[].concat(keys||[]).map(_cdSceneSrc).filter(Boolean),acc=cdTone(opts),st='';
  if(acc)st+='--cd-acc:'+acc+';';
  if(opts.w)st+='--cd-scene-w:'+(+opts.w)+'%;';
  if(opts.op!=null)st+='--cd-op:'+(+opts.op)+';';
  var h='<div class="cd-scene'+(opts.full?' cd-scene--full':'')+(opts.hero?' cd-scene--hero':'')+(opts.cls?' '+cdEsc(opts.cls):'')+'" aria-hidden="true"'+(st?' style="'+cdEsc(st)+'"':'')+'>';
  if(list.length){
    var a=list[0],pos=opts.pos||a.pos,next=list.slice(1).map(function(x){return x.src+'|'+(x.pos||'');}).join(';;');
    /* opts.prio: Bild im ersten Bildschirm (LCP), sofort und mit hoher Priorität laden */
    h+='<img class="cd-scene-img" src="'+cdEsc(a.src)+'" alt="" '+(opts.prio?'decoding="async" fetchpriority="high"':'loading="lazy" decoding="async" fetchpriority="low"')
      +(a.w&&a.h?' width="'+(+a.w)+'" height="'+(+a.h)+'"':'')
      +(pos?' style="--cd-pos:'+cdEsc(pos)+'"':'')+(next?' data-cd-next="'+cdEsc(next)+'"':'')+'>';
  }
  if(opts.glyph)h+='<i class="cd-scene-g cd-g">'+cdEsc(deT(opts.glyph))+'</i>';
  return h+'</div>';
}
/* Ladefehler: nächster Schlüssel der Kette, sonst Bild weg (Farbfläche + Glyphe bleiben) */
document.addEventListener('error',function(e){
  var t=e.target;
  if(!t||t.tagName!=='IMG'||!t.classList.contains('cd-scene-img'))return;
  var n=(t.getAttribute('data-cd-next')||'').split(';;').filter(Boolean);
  if(!n.length){t.remove();return;}
  var p=n.shift().split('|');
  if(n.length)t.setAttribute('data-cd-next',n.join(';;'));else t.removeAttribute('data-cd-next');
  t.removeAttribute('width');t.removeAttribute('height');
  if(p[1])t.style.setProperty('--cd-pos',p[1]);else t.style.removeProperty('--cd-pos');
  t.src=p[0];
},true);

/* ---- Chips: 'Text' | {t, v, c, g, i, h, title} (v = fetter Wert, c = gold|red|violet|ok|warn|ice, g = Glyphe, i = Icon) ---- */
function cdChip(x){
  if(x==null||x==='')return '';
  if(typeof x!=='object')return '<span class="cd-chip">'+cdEsc(deT(x))+'</span>';
  if('h' in x&&!('t' in x))return String(x.h);
  return '<span class="cd-chip'+(x.c?' cd-chip--'+cdEsc(x.c):'')+'"'+(x.title?' title="'+cdEsc(deT(x.title))+'"':'')+'>'
    +(x.i?cdIcon(x.i):x.g?'<i class="cd-g" aria-hidden="true">'+cdEsc(deT(x.g))+'</i>':'')
    +(x.v!=null&&x.v!==''?'<b>'+cdEsc(x.v)+'</b>':'')+(x.t!=null?'<span>'+cdEsc(deT(x.t))+'</span>':'')+'</span>';
}
function cdChips(list,cls){list=[].concat(list||[]).map(cdChip).join('');return list?'<span class="cd-chips'+(cls?' '+cls:'')+'">'+list+'</span>':'';}

/* ---- Effekt-Badges: Kategorie per Stichwort (frühester Treffer gewinnt, bei Gleichstand die Reihenfolge) ---- */
var CD_FX=[
  ['res',/[a-z]*(?:resist|widerstand|immun)/],
  ['speed',/angriffs(?:tempo|geschw)|attack speed|tempo|speed|geschwindigkeit|schneller|bewegung|movement/],
  ['stam',/ausdauer|stamina/],
  ['hp',/\bhp\b|\bleben|lebens|health|gesundheit|\bheil|\bheal/],
  ['spirit',/\bgeist|spirit|\bmana\b/],
  ['ice',/kalte|\bfrost|\bcold\b|\bice\b|\beis\b|\beis(?:schaden|resist|wider|-)|\bfreez|gefrier|erfrier|schnee|\bsnow/],
  ['fire',/feuer|\bfire|hitze|\bheat|\bbrand|\bburn|flamm|flame|\bglut/],
  ['bolt',/blitz|lightning|elektr|electr|donner|thunder|schock|shock/],
  ['poison',/\bgift|poison|toxi|venom/],
  ['atk',/angriff|attack|\batk\b|schaden|damage|\bdmg\b|kritisch|\bcrit/],
  ['def',/abwehr|defen[cs]e|\bdef\b|verteidigung|rustung|\barmou?r|\bblock|parier/]
];
var CD_FX_LBL={res:'Resistenz',speed:'Tempo',stam:'Ausdauer',hp:'Leben',spirit:'Geist',ice:'Kälte',fire:'Feuer',bolt:'Blitz',poison:'Gift',atk:'Angriff',def:'Abwehr',neutral:'Effekt'};
function cdFxKind(text){
  var t=_cdFoldTxt(text),best='neutral',bi=1e9;
  for(var i=0;i<CD_FX.length;i++){var m=CD_FX[i][1].exec(t);if(m&&m.index<bi){bi=m.index;best=CD_FX[i][0];}}
  return best;
}
/* text: String (wird an ; · | Zeilenumbruch geteilt, opts.split = eigenes RegExp oder false) oder Liste. opts: kind (erzwingen), bare, cls */
function cdFx(text,opts){
  opts=opts||{};
  var parts=Array.isArray(text)?text:(opts.split===false?[text]:String(text==null?'':text).split(opts.split||/\s*(?:;|·|\||\n)\s*/));
  var h=parts.map(function(p){return String(p==null?'':p).trim();}).filter(Boolean).map(function(p){
    var k=opts.kind||cdFxKind(p);
    return '<span class="cd-fx cd-fx--'+k+'" title="'+CD_FX_LBL[k]+'">'+cdIcon(k)+'<span>'+cdEsc(deT(p))+'</span></span>';
  }).join('');
  if(!h)return '';
  return opts.bare?h:'<span class="cd-fx-list'+(opts.cls?' '+cdEsc(opts.cls):'')+'">'+h+'</span>';
}

/* ---- Fortschritt (für Faltkarten-Kopf, Checklisten) ---- */
function cdProg(done,total,label){
  done=+done||0;total=+total||0;var p=total?Math.round(done/total*100):0;
  return '<span class="cd-prog'+(total&&done>=total?' is-done':'')+'" role="img" aria-label="'+cdEsc(deT(label||(done+' von '+total+' erledigt')))+'">'
    +'<span class="cd-prog-bar"><i style="--p:'+p+'%"></i></span>'+done+'/'+total+'</span>';
}

/* ---- Faltkarte ----
   cdFold({title, lead, chips, scene, icon, aside, prog, body, open, cls, attrs, id, s, tone, region, h})
   scene: {keys, ...cdScene-opts} oder fertiges HTML; icon: Glyphe | {src, alt, photo}; body: HTML oder Funktion (lazy, erst beim Öffnen);
   s: Volltext für data-s (Suche); prog: {done,total,label}; h: Überschriftenebene (Standard 3). */
var _cdLazy=new Map(),_cdLazyN=0;
/* Fraktionsbanner aus den Spieldateien (FAC_WAPPEN in data/d11): Pfad oder '' wenn für den Namen keines belegt ist.
   kind 'fac' = Fraktionsname, 'reg' = Regionsname. */
function facWappen(name,kind){
  var m=typeof FAC_WAPPEN==='object'&&FAC_WAPPEN&&FAC_WAPPEN[kind||'fac'],k=m&&m[String(name).trim()];
  return k?'cd_assets/factions/wappen/'+k+'.webp':'';
}
function facWappenImg(name,kind){
  var s=facWappen(name,kind);
  return s?'<img class="fac-wappen" src="'+s+'" alt="" loading="lazy" decoding="async" width="20" height="29">':'';
}
function cdFold(o){
  o=o||{};
  var acc=cdTone(o),body=o.body,lazy='';
  if(typeof body==='function'){
    if(_cdLazy.size>4000)_cdLazy.forEach(function(v,k){if(!document.querySelector('[data-cd-lazy="'+k+'"]'))_cdLazy.delete(k);});
    lazy=String(++_cdLazyN);_cdLazy.set(lazy,body);body=o.open?body():'';if(o.open){_cdLazy.delete(lazy);lazy='';}
  }
  var sc=o.scene?(typeof o.scene==='string'?o.scene:cdScene(o.scene.keys,o.scene)):'';
  var ico='';
  if(o.icon){
    ico=typeof o.icon==='object'&&o.icon.h!=null&&!o.icon.src
      ?'<span class="cd-fold-ico" aria-hidden="true">'+o.icon.h+'</span>' /* R2 Integration (Wunsch B4/B7): rohes Icon-HTML */
      :typeof o.icon==='object'
      ?'<span class="cd-fold-ico'+(o.icon.photo?' is-photo':'')+'"><img src="'+cdEsc(o.icon.src)+'" alt="'+cdEsc(deT(o.icon.alt||''))+'" loading="lazy" decoding="async" width="40" height="40"></span>'
      :'<span class="cd-fold-ico" aria-hidden="true"><i class="cd-g">'+cdEsc(deT(o.icon))+'</i></span>';
  }
  var hl=Math.min(6,Math.max(2,+o.h||3)),
    aside=(o.prog?cdProg(o.prog.done,o.prog.total,o.prog.label):'')+(o.aside||'');
  return '<details class="cd-fold cd-spot'+(o.cls?' '+cdEsc(o.cls):'')+(ico?'':' cd-fold--noico')+'"'
    +(o.id?' id="'+cdEsc(o.id)+'"':'')+(o.s!=null?' data-s="'+cdEsc(String(o.s).toLowerCase())+'"':'')
    +(acc?' style="--cd-acc:'+cdEsc(acc)+'"':'')+(lazy?' data-cd-lazy="'+lazy+'"':'')+(o.open?' open':'')+_cdAttrs(o.attrs)+'>'
    +'<summary>'+sc+ico
    +'<span class="cd-fold-main"><h'+hl+' class="cd-fold-t">'+_cdT(o.title)+'</h'+hl+'>'
    +(o.lead?'<span class="cd-fold-lead">'+_cdT(o.lead)+'</span>':'')
    +(o.chips&&[].concat(o.chips).length?cdChips(o.chips,'cd-fold-chips'):'')+'</span>'
    +(aside?'<span class="cd-fold-aside">'+aside+'</span>':'')
    +'<span class="cd-fold-arr" aria-hidden="true">'+cdIcon('chev')+'</span></summary>'
    +'<div class="cd-fold-body">'+(body||'')+'</div></details>';
}
/* lazy Inhalt einsetzen (beim Öffnen, bei Such-Öffnung und cdGo sofort) */
function cdFoldFill(d){
  var k=d&&d.getAttribute&&d.getAttribute('data-cd-lazy');if(!k)return;
  d.removeAttribute('data-cd-lazy');
  var fn=_cdLazy.get(k);_cdLazy.delete(k);if(!fn)return;
  var b=d.querySelector(':scope>.cd-fold-body');
  try{if(b)b.innerHTML=fn();}catch(e){console.error('cdFold body:',e);}
  if(b&&typeof _reapplyActiveSearch==='function')_reapplyActiveSearch(b);
}
document.addEventListener('toggle',function(e){var d=e.target;if(d.open&&d.classList&&d.classList.contains('cd-fold'))cdFoldFill(d);},true);
/* eigener Klick auf den Kopf: Such-Öffnung wird zur Nutzer-Öffnung (bleibt beim Leeren der Suche offen) */
document.addEventListener('click',function(e){var s=e.target.closest&&e.target.closest('.cd-fold>summary');if(s)s.parentElement.removeAttribute('data-srch-open');},true);

/* ---- Suche: Faltkarte öffnen, wenn der Treffer nicht schon im Kopf steht (needles: gefaltete Suchbegriffe) ----
   Aufgerufen aus _openForSearch (Suchablauf); Öffnungen tragen data-srch-open und schließen beim Leeren wieder. */
function _cdFoldSearch(el,needles){
  if(!el||!needles||!needles.length)return;
  var fs=el.classList&&el.classList.contains('cd-fold')?[el]:(el.querySelectorAll?[].slice.call(el.querySelectorAll('.cd-fold:not([open])'),0,6):[]);
  fs.forEach(function(d){
    if(d.open)return;
    var sm=d.querySelector(':scope>summary');
    if(d._cdHead===undefined)d._cdHead=_cdFoldTxt(sm?sm.textContent:'').replace(/\s+/g,' ');
    if(_nHit(d._cdHead,needles))return;
    cdFoldFill(d);d.open=true;d.dataset.srchOpen='1';
  });
}

/* ---- Pillen (Filter/Reiter) ----
   cdPills(items,{name, mode:'filter'|'tab', multi, label, cls, wrap}); items: [{v, t, n, g, on}]
   Klick → aria-pressed/aria-selected umschalten + Ereignis 'cd-pills' (bubbles) mit detail {name, value, values, pill, group} */
function cdPills(items,o){
  o=o||{};var tab=o.mode==='tab';
  var h=[].concat(items||[]).map(function(x,i){
    if(typeof x!=='object')x={v:x,t:x};
    var on=!!x.on,v=x.v!=null?x.v:x.t;
    return '<button type="button" class="cd-pill" data-v="'+cdEsc(v)+'"'
      +(tab?' role="tab" aria-selected="'+on+'" tabindex="'+(on?0:-1)+'"'+(x.controls?' aria-controls="'+cdEsc(x.controls)+'"':''):' aria-pressed="'+on+'"')+'>'
      +(x.g?'<i class="cd-pill-g cd-g" aria-hidden="true">'+cdEsc(deT(x.g))+'</i>':'')+'<span>'+cdEsc(deT(x.t))+'</span>'
      +(x.n!=null?'<span class="cd-pill-n">'+cdEsc(deT(x.n))+'</span>':'')+'</button>';
  }).join('');
  return '<div class="cd-pills'+(o.wrap?' cd-pills--wrap':'')+(o.cls?' '+cdEsc(o.cls):'')+'" role="'+(tab?'tablist':'group')+'"'
    +(o.label?' aria-label="'+cdEsc(deT(o.label))+'"':'')+' data-cd-pills="'+cdEsc(o.name||'')+'"'+(o.multi&&!tab?' data-multi':'')+'>'+h+'</div>';
}
function _cdPillsFire(g,p){
  var tab=g.getAttribute('role')==='tablist',vals=[];
  g.querySelectorAll('.cd-pill').forEach(function(b){if(b.getAttribute(tab?'aria-selected':'aria-pressed')==='true')vals.push(b.dataset.v);});
  g.dispatchEvent(new CustomEvent('cd-pills',{bubbles:true,detail:{name:g.dataset.cdPills,value:p.dataset.v,values:vals,pill:p,group:g}}));
}
document.addEventListener('click',function(e){
  var p=e.target.closest&&e.target.closest('.cd-pill'),g=p&&p.closest('[data-cd-pills]');if(!g||p.disabled)return;
  if(g.getAttribute('role')==='tablist')g.querySelectorAll('.cd-pill').forEach(function(b){var on=b===p;b.setAttribute('aria-selected',on);b.tabIndex=on?0:-1;});
  else if(g.hasAttribute('data-multi'))p.setAttribute('aria-pressed',p.getAttribute('aria-pressed')!=='true');
  else g.querySelectorAll('.cd-pill').forEach(function(b){b.setAttribute('aria-pressed',b===p);});
  _cdPillsFire(g,p);
});
document.addEventListener('keydown',function(e){
  var p=e.target.closest&&e.target.closest('[role=tablist][data-cd-pills] .cd-pill');if(!p)return;
  var all=[].slice.call(p.parentElement.querySelectorAll('.cd-pill')),i=all.indexOf(p),j=-1;
  if(e.key==='ArrowRight'||e.key==='ArrowDown')j=(i+1)%all.length;else if(e.key==='ArrowLeft'||e.key==='ArrowUp')j=(i-1+all.length)%all.length;
  else if(e.key==='Home')j=0;else if(e.key==='End')j=all.length-1;
  if(j<0)return;e.preventDefault();all[j].focus();all[j].click();
});

/* ---- Abhaken ----
   cdCheck({key, id, title, sub, go:{sec,q,label}, checked, cls, s}); key = localStorage-Schlüssel (bestehende weiterverwenden,
   neue mit eigenem Präfix 'cd_r2_<bauer>_…'). Speicherform des Schlüssels bleibt erhalten (Liste oder Objekt).
   Änderung → Speicher + Ereignis 'cd-check' (bubbles) mit detail {key, id, checked}. key:false = nur Ereignis, kein Speichern. */
function _cdCkRead(key){var raw=null;try{raw=JSON.parse(localStorage.getItem(key));}catch(e){}return raw;}
function cdCheckGet(key){
  var r=_cdCkRead(key),s=new Set();
  if(Array.isArray(r))r.forEach(function(x){s.add(String(x));});
  else if(r&&typeof r==='object')Object.keys(r).forEach(function(k){if(r[k])s.add(k);});
  return s;
}
function cdCheckSet(key,id,on){
  var r=_cdCkRead(key);id=String(id);
  if(r&&typeof r==='object'&&!Array.isArray(r)){if(on)r[id]=true;else delete r[id];}
  else{ /* R2 Integration (Wunsch B3): Zahlen-Listen (z. B. cd_ch_done) bleiben Zahlen-Listen */
    r=Array.isArray(r)?r:[];var num=r.length>0&&r.every(function(x){return typeof x==='number';}),i=-1;
    r.forEach(function(x,j){if(i<0&&String(x)===id)i=j;});
    if(on&&i<0)r.push(num&&/^-?\d+(\.\d+)?$/.test(id)?+id:id);if(!on&&i>-1)r.splice(i,1);}
  var v=JSON.stringify(r);
  try{typeof lsSet==='function'?lsSet(key,v):localStorage.setItem(key,v);}catch(e){}
  return cdCheckGet(key);
}
function cdCheck(o){
  o=o||{};
  var on=o.checked!=null?!!o.checked:(o.key?cdCheckGet(o.key).has(String(o.id)):false),
    uid='cdck-'+cdSlug((o.key||'x')+'-'+o.id);
  return '<div class="cd-check cd-spot'+(o.cls?' '+cdEsc(o.cls):'')+'"'+(o.s!=null?' data-s="'+cdEsc(String(o.s).toLowerCase())+'"':'')+'>'
    +'<label class="cd-check-l" for="'+uid+'"><input type="checkbox" class="cd-check-in" id="'+uid+'"'+(on?' checked':'')
    +' data-ck-key="'+cdEsc(o.key||'')+'" data-ck-id="'+cdEsc(o.id)+'">'
    +'<span class="cd-check-box" aria-hidden="true">'+cdIcon('check')+'</span>'
    +'<span class="cd-check-txt"><span class="cd-check-t">'+_cdT(o.title)+'</span>'+(o.sub?'<span class="cd-check-sub">'+_cdT(o.sub)+'</span>':'')+'</span></label>'
    +(o.go&&o.go.sec?'<a class="cd-check-go" href="'+cdGoHref(o.go.sec,o.go.q)+'" data-go="'+cdEsc(o.go.sec)+'"'+(o.go.q?' data-goq="'+cdEsc(o.go.q)+'"':'')
      +' aria-label="'+cdEsc(deT(o.go.label||'Zum Eintrag springen'))+'" title="'+cdEsc(deT(o.go.label||'Zum Eintrag springen'))+'">'+cdIcon('go')+'</a>':'')
    +'</div>';
}
document.addEventListener('change',function(e){
  var t=e.target;if(!t.classList||!t.classList.contains('cd-check-in'))return;
  var key=t.getAttribute('data-ck-key'),id=t.getAttribute('data-ck-id');
  if(key)cdCheckSet(key,id,t.checked);
  t.dispatchEvent(new CustomEvent('cd-check',{bubbles:true,detail:{key:key,id:id,checked:t.checked}}));
});

/* ---- Sprung: Seite öffnen, Eintrag finden (id, data-go-id, Titel, data-s), aufklappen, hinscrollen, aufleuchten ----
   cdGo(sec, q, {tab, noShow, flash:false}); Link: cdGoLink(sec,q,label) bzw. <a href="#sec=x&go=q" data-go="x" data-goq="q"> */
function cdGoHref(sec,q){return '#sec='+encodeURIComponent(sec)+(q?'&go='+encodeURIComponent(q):'');}
function cdGoLink(sec,q,label,cls){
  return '<a class="cd-go'+(cls?' '+cdEsc(cls):'')+'" href="'+cdGoHref(sec,q)+'" data-go="'+cdEsc(sec)+'"'+(q?' data-goq="'+cdEsc(q)+'"':'')+'>'
    +_cdT(label==null?q:label)+cdIcon('go')+'</a>';
}
/* Sprungziel: alte Links tragen den englischen Namen, die Überschrift zeigt den deutschen (und umgekehrt). */
function _cdGoNadeln(q,n){
  var ns=[n];if(typeof deN==='function'){var d=_cdFoldTxt(deN(q)).replace(/\s+/g,' ').trim();if(d&&ns.indexOf(d)<0)ns.push(d);}
  if(typeof deQ==='function')deQ(q).slice(1).forEach(function(x){if(ns.indexOf(x)<0)ns.push(x);});
  return ns;
}
function _cdGoFind(root,q){
  if(!root||!q)return null;
  var byId=document.getElementById(q);if(byId&&root.contains(byId))return byId;
  var all=root.querySelectorAll('[data-go-id]');
  for(var i=0;i<all.length;i++)if(all[i].getAttribute('data-go-id')===q)return all[i];
  var n=_cdFoldTxt(q).replace(/\s+/g,' ').trim(),ns=_cdGoNadeln(q,n),c=root.querySelectorAll('[data-s]'),first=null,firstVis=null,T='.cd-fold-t,.fd-name,.col-name,.ct,.sk-n,.pet-card-name,.fac-qh,h3,h4,strong';
  for(var j=0;j<c.length;j++){
    var el=c[j];if(el.dataset.filtered==='1')continue;
    var hd=el.querySelector(T),ht=hd&&_cdFoldTxt(hd.textContent).replace(/\s+/g,' ').trim();
    var vis=!el.closest('.hide');
    if(ns.indexOf(ht)>-1&&vis)return el;
    var sf=_cdFoldTxt(el.dataset.s);if(ns.some(function(x){return sf.indexOf(x)>-1;})){if(!first)first=el;if(vis&&!firstVis)firstVis=el;}
  }
  return firstVis||first;
}
function _cdGoOpen(t){
  for(var d=t.closest('details');d;d=d.parentElement&&d.parentElement.closest('details')){if(!d.open){cdFoldFill(d);d.open=true;}}
  if(t.tagName==='DETAILS'&&!t.open){cdFoldFill(t);t.open=true;}
  var cb=t.closest('.chap-body');
  if(cb&&!cb.classList.contains('open')){var hd=cb.previousElementSibling;if(hd&&hd.click)hd.click();if(!cb.classList.contains('open'))cb.classList.add('open');}
  var pane=t.closest('.pane');
  if(pane&&!pane.classList.contains('active')&&pane.parentElement){
    var ps=[].slice.call(pane.parentElement.querySelectorAll(':scope > .pane')),bs=[].slice.call(pane.parentElement.querySelectorAll(':scope > .tabs > button')),k=ps.indexOf(pane);
    if(k>-1&&bs.length===ps.length){ps.forEach(function(p,i){p.classList.toggle('active',i===k);});bs.forEach(function(b,i){b.classList.toggle('active',i===k);});}
  }
}
function cdFlash(t){
  if(!t)return;t.classList.remove('cd-flash');void t.offsetWidth;t.classList.add('cd-flash');
  clearTimeout(t._cdFl);t._cdFl=setTimeout(function(){t.classList.remove('cd-flash');},1900);
}
function cdGo(sec,q,o){
  o=o||{};
  if(sec&&!o.noShow&&typeof showSec==='function'){var cur=document.querySelector('#main > .sec.active');if(!cur||cur.id!=='sec-'+sec)showSec(sec);}
  if(o.tab&&typeof _applyTabParam==='function')_applyTabParam(sec,o.tab);
  if(!q)return Promise.resolve(null);
  var root=document.getElementById('sec-'+sec)||document,tries=0;
  return new Promise(function(res){
    (function look(){
      var t=_cdGoFind(root,q);
      if(!t){if(++tries===1)document.dispatchEvent(new CustomEvent('cd-go-miss',{detail:{sec:sec,q:q}}));if(tries<12)return setTimeout(look,100);return res(null);}
      _cdGoOpen(t);
      requestAnimationFrame(function(){
        var land=function(){
          var f=t.tagName==='DETAILS'?t.querySelector(':scope>summary'):t;
          if(f&&f.focus){if(!f.matches('a,button,summary,input,select,textarea,[tabindex]'))f.setAttribute('tabindex','-1');try{f.focus({preventScroll:true});}catch(e){}}
          if(o.flash!==false)cdFlash(t);res(t);
        };
        if(window.cdMotion&&cdMotion.scrollTo){var d=0,end=function(){if(d++)return;
            setTimeout(function(){var r=t.getBoundingClientRect().top-cdMotion.headerOffset();if(Math.abs(r)>4)cdMotion.scrollTo(t,{immediate:true});land();},120);};
          cdMotion.scrollTo(t,{onComplete:end});setTimeout(end,1400);}
        else{t.scrollIntoView({block:'start'});land();}
      });
    })();
  });
}
document.addEventListener('click',function(e){
  if(e.defaultPrevented||e.button!==0||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;
  var a=e.target.closest&&e.target.closest('a[data-go]');if(!a||a.closest('#start-root'))return;
  e.preventDefault();cdGo(a.dataset.go,a.dataset.goq||'',{tab:a.dataset.tab});
});

/* ---- Seitenkopf: cdHero({title, sub, kicker, scene, stats:[[wert,label]], glyph, region, tone, cls, h}) ---- */
function cdHero(o){
  o=o||{};
  var acc=cdTone(o),sc=o.scene?(typeof o.scene==='string'?o.scene:cdScene(o.scene.keys,Object.assign({hero:true,full:true,glyph:o.glyph,region:o.region,tone:o.tone},o.scene))):cdScene([],{hero:true,glyph:o.glyph,region:o.region,tone:o.tone}),
    hl=Math.min(6,Math.max(2,+o.h||2)),st=[].concat(o.stats||[]).slice(0,4);
  return '<header class="cd-hero cd-scened cd-spot'+(o.cls?' '+cdEsc(o.cls):'')+'"'+(acc?' style="--cd-acc:'+cdEsc(acc)+'"':'')+'>'+sc
    +'<div class="cd-hero-main">'+(o.kicker?'<p class="cd-hero-k">'+_cdT(o.kicker)+'</p>':'')
    +'<h'+hl+' class="cd-hero-t">'+_cdT(o.title)+'</h'+hl+'>'+(o.sub?'<p class="cd-hero-sub">'+_cdT(o.sub)+'</p>':'')+'</div>'
    +(st.length?'<dl class="cd-hero-stats" data-n="'+st.length+'">'+st.map(function(s){return '<div class="cd-hero-stat"><dt>'+_cdT(s[1])+'</dt><dd>'+cdEsc(deT(s[0]))+'</dd></div>';}).join('')+'</dl>':'')
    +'</header>';
}

/* ---- Kleine Bausteine ---- */
/* steps: ['Text'] | [{t:'Titel', d:'Beschreibung'}] */
function cdStepper(steps,cls){
  return '<ol class="cd-stepper'+(cls?' '+cdEsc(cls):'')+'">'+[].concat(steps||[]).map(function(s){
    return '<li>'+(typeof s==='object'&&!('h' in s)?(s.t?'<span class="cd-step-t">'+_cdT(s.t)+'</span>':'')+(s.d?'<span class="cd-step-d">'+_cdT(s.d)+'</span>':''):'<span class="cd-step-d">'+_cdT(s)+'</span>')+'</li>';
  }).join('')+'</ol>';
}
/* rows: [[label, wert]] (wert Text oder {h}); leere Werte fallen weg; opts.wide = eine Spalte */
function cdFacts(rows,o){
  o=o||{};
  var h=[].concat(rows||[]).filter(function(r){return r&&r[1]!=null&&r[1]!=='';}).map(function(r){return '<div><dt>'+_cdT(r[0])+'</dt><dd>'+_cdT(r[1])+'</dd></div>';}).join('');
  return h?'<dl class="cd-facts'+(o.wide?' cd-facts--wide':'')+(o.cls?' '+cdEsc(o.cls):'')+'">'+h+'</dl>':'';
}
/* kind: info | warn | miss (Verpassbar); title optional */
function cdNote(text,o){
  o=o||{};var k=o.kind==='warn'||o.kind==='miss'?o.kind:'info',
    tt=o.title!=null?o.title:(k==='miss'?'Verpassbar':'');
  return '<div class="cd-note cd-note--'+k+(o.cls?' '+cdEsc(o.cls):'')+'" role="note">'+cdIcon(k)
    +'<div>'+(tt?'<b class="cd-note-t">'+_cdT(tt)+'</b>':'')+_cdT(text)+'</div></div>';
}
/* list: ['Name'] | [{t:'Name', url:'https://…'}] */
function cdSrc(list,label){
  var h=[].concat(list||[]).filter(Boolean).map(function(s){
    if(typeof s!=='object')return cdEsc(s);
    return /^https?:\/\//.test(s.url||'')?'<a href="'+cdEsc(s.url)+'" target="_blank" rel="noopener noreferrer">'+cdEsc(s.t||s.url)+'</a>':cdEsc(s.t);
  }).join(', ');
  return h?'<p class="cd-src"><span class="cd-src-l">'+cdEsc(label||'Quellen')+'</span>'+h+'</p>':'';
}
function cdKey(k){return '<kbd class="cd-keycap">'+cdEsc(k)+'</kbd>';}
/* ==== /R2 FUNDAMENT · Kern ==== */
