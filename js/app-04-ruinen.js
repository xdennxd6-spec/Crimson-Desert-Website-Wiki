
/* ===== URALTE RUINEN / ABYSS-GRENZSTEINE — alle Regionen ===== */
function _reRuin(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");}
/* ---- R2 B4: Uralte Ruinen als Regions-Atlas (Faltkarten mit Ruinen-Szene, Regionsbänder mit Fortschritt) ----
   Kopf je Ruine: AR-Nummer, deutscher + englischer Name, Chips Mechanik/Ort/Belohnung. Aufgeklappt (lazy): Lösung als Stepper,
   Abhaken, Fakten, Hinweise, Screenshots, Quellen. Kurz-Chips sind wörtliche Ausschnitte aus mech/loc desselben Eintrags
   (_r2b4Cut prüft das, sonst automatischer Rückfall). Fortschritt: localStorage cd_r2_b4_ruins (Liste 'ar<Nr>'). */
var R2B4_KEY='cd_r2_b4_ruins';
var R2B4_SHORT={ /* AR: [Mechanik, Ort] als wörtliche Teilstrings von mech bzw. loc */
  1:['Glocken-Sequenz','in den Stählernen Bergen'],3:['Säulen-Rotation','Nebeltal'],4:['Säulen-Höhenangleichung','Gebiet Duskwood'],
  7:['Steinlaternen anzünden','Jägerhütte'],11:['Wandscheiben-Toggle','Mäandernde Hügel'],12:['Go-/Mühle-artiges Steinbrett','Dämmerwald'],
  14:['Symbol-Kacheln','südlich von Fort Perwin'],15:['Block-/Bild-Schiebepuzzle','Nebeltiefenbecken'],21:['Statuen-Rotation','Südlich von Glenbright Manor'],
  23:['Statuen-Rotation','südwestlich von Arboria Castle'],27:['Wasser abzulassen','Spukhügel'],28:['Statuen-Lichtstrahl','Bereich des Serkis-Anwesens'],
  30:['Statuen-Blick','Drakesfall-Schlucht'],32:['Scheiben-Rotation','Hernand Highlands'],37:['Symbol-Wandscheiben','Phoniel Ranch'],
  10:['Naturgriff','Östlich der Stadt Pailune'],16:['Schiebepuzzle','Fünf-Finger-Berg'],17:['Statuen-Rotation','Fünf-Finger-Berg'],
  26:['Eis brechen + Wasserablassen','Silver Wolf Mountain'],33:['Element-Knöpfe','Silberwolfberg'],
  2:['Wandmosaik','südöstlich von Galleypulley'],8:['Wasser ablassen','nordwestlich der Golden-Gallop-Rennbahn'],19:['Steine stapeln','Bambuswald'],
  20:['Vier Krüge mittig stapeln','westlich von Tariv'],22:['Vier gekoppelte Statuen zur Mitte drehen','östlich des Burnhand Quarry'],
  34:['Symbol-Kacheln','nördlich von Wheelsmith Wainright'],35:['Konstellations-Scheiben','westlich der Rustleleaf Farm'],
  5:['Wandscheiben','Gebiet Timberdale'],6:['Energie-/Wandscheiben','östlich des Sanctum of Devotion'],9:['Naturgriff-Wandscheiben','Nordosten des Blauen Dickichts'],
  13:['Druckplatten-Pfad','westlich des Redfox-Handelspostens'],25:['Wasserstand-Senken','östlich des Redfox-Handelspostens'],
  29:['Symbol-Kacheln/Drehscheibe','südöstlich des Heiligtums der Verehrung'],31:['Rotlicht-Grünlicht','Berg Benus'],
  36:['Knopf-Sequenz','Stoneback Crab Wetlands'],18:['Statuen-Rotation','Klippe am Roten Fluss'],24:['Brunnen-Säulen-Rotation','In den Rauchenden Landen']
};
/* wörtlicher Ausschnitt (nur wenn er im Text steht), sonst erster Abschnitt bis Klammer/Komma; erster Buchstabe groß */
function _r2b4Cut(full,want){
  full=String(full||'');
  var s=want&&full.indexOf(want)>-1?want:full.split(/\s*(?:\(|,|;|·|>| - | – )\s*/)[0];
  s=s.trim();if(s.length>44)s=s.slice(0,42).replace(/\s+\S*$/,'')+' …';
  return s.charAt(0).toUpperCase()+s.slice(1);
}
/* Belohnungs-Chips: nur was wörtlich im reward steht */
function _r2b4Reward(rw){
  rw=String(rw||'');var out=[],seg=[];
  var m=/^(\d+) Abyss-Artefakt/.exec(rw);
  if(m)seg.push('<i class="cd-g" aria-hidden="true">✦</i><b>'+cdEsc(deT(m[1]))+'</b><span>Abyss-Artefakt</span>');
  if(/Schnellreise/.test(rw)&&!/nicht ausdrücklich/.test(rw))seg.push('<i class="cd-g r2b4-rw-ft" aria-hidden="true">⌖</i><span>Schnellreisepunkt</span>');
  /* Feinschliff: Artefakt + Schnellreisepunkt als EIN Belohnungs-Chip (gleicher Wortlaut, weniger Wiederholung je Karte) */
  if(seg.length)out.push({h:'<span class="cd-chip cd-chip--gold r2b4-rw" title="'+cdEsc(deT('Belohnung: '+rw))+'">'+seg.join('<i class="r2b4-rw-sep" aria-hidden="true"></i>')+'</span>'});
  var q=/['„"]((?:Memor|Erinnerung|Forgotten|Vergessen)[^'"“”]*)['"“”]/.exec(rw);
  if(q)out.push({t:q[1],c:'violet',g:'❖'});
  return out;
}
function _r2b4Shots(p){
  var h=(p.imgs||[]).map(function(b,i){
    var f=_RUIN_B+b+'.jpg',t=_RUIN_B+b+'-300x169.jpg',cap=p.name+' · AR'+p.ar+' · Lösung (PowerPyx)';
    return '<button type="button" class="r2b4-shot" data-full="'+cdEsc(f)+'" data-cap="'+cdEsc(cap)+'" aria-label="Screenshot '+(i+1)+' vergrößern">'
      +'<img src="'+cdEsc(t)+'" alt="'+cdEsc(deN(p.name))+', Lösungsbild '+(i+1)+'" width="300" height="169" loading="lazy" decoding="async"></button>';
  }).join('');
  return h?'<div class="r2b4-shots">'+h+'</div>':'';
}
function _r2b4Body(p){
  var warn=(p.warn&&p.warn.length)?cdNote({h:'<ul class="r2b4-ul">'+p.warn.map(function(w){return '<li>'+cdEsc(deT(w))+'</li>';}).join('')+'</ul>'},{kind:'warn',title:'Hinweise'}):'';
  var conf=p.conf==='medium'?cdNote(p.conflicts||'Guides geben die genaue Zugnummerierung unterschiedlich an; die Ziel-Stellung bleibt identisch.',{kind:'info',title:'Exakte Sequenz quellenabhängig'}):'';
  var srcs=cdSrc((p.srcs||[]).map(function(s){return {t:s.n,url:s.u};}),'Quellen');
  return '<div class="r2b4-body">'
    +'<div class="r2b4-sol"><h5 class="r2b4-h">Lösung <span>'+(p.steps||[]).length+' Schritte</span></h5>'+cdStepper(p.steps||[],'r2b4-steps')+'</div>'
    +'<div class="r2b4-side">'
      +cdCheck({key:R2B4_KEY,id:'ar'+p.ar,title:'Gelöst',sub:'Abhaken, sobald der Grenzstein aktiv ist · zählt für den Regions-Fortschritt',cls:'r2b4-ck'})
      +cdFacts([['Ort',p.loc],['Mechanik',p.mech],['Belohnung',p.reward]],{wide:true,cls:'r2b4-facts'})
      +warn+conf+_r2b4Shots(p)
      +'<div class="r2b4-verif">'+(p.conf==='medium'?cdChip({t:'Geprüft · Sequenz quellenabhängig',c:'warn',i:'warn'}):cdChip({t:'Verifiziert',c:'ok',i:'check'}))+'</div>'
      +srcs
    +'</div></div>';
}
function _r2b4Fold(p,reg,done){
  var sh=R2B4_SHORT[p.ar]||[],slug=cdSlug(p.name);
  var title=p.de?{h:cdEsc(p.de)+' <span class="r2b4-en" lang="en">'+cdEsc(deN(p.name))+'</span>'}:{h:'<span lang="en">'+cdEsc(deN(p.name))+'</span>'};
  var chips=[{t:_r2b4Cut(p.mech,sh[0]),c:'violet',g:'⚙',title:'Mechanik: '+p.mech},{t:_r2b4Cut(p.loc,sh[1]),i:'pin',title:'Ort: '+p.loc}].concat(_r2b4Reward(p.reward));
  var s=['AR'+p.ar,p.name,p.de||'',reg,p.loc,p.mech,p.reward].concat(p.steps||[]).concat(p.warn||[]).join(' ')+' grenzstein rätsel ruine';
  var aside='<span class="r2b4-n"><b>'+(p.steps||[]).length+'</b> Schritte</span>'
    +(p.conf==='medium'?'<span class="r2b4-med" title="Exakte Sequenz quellenabhängig">'+cdIcon('warn')+'<span>Sequenz quellenabhängig</span></span>':'')
    +'<span class="r2b4-done">'+cdIcon('check')+'<span>Gelöst</span></span>';
  return cdFold({title:title,icon:String(p.ar),chips:chips,aside:aside,h:4,region:reg,
    scene:{keys:['ruin-'+slug,'reg-'+cdSlug(reg)],region:reg,glyph:'♜'},
    body:function(){return _r2b4Body(p);},s:s,id:'ru-'+slug,
    cls:'r2b4-ruin'+(done?' is-solved':''),attrs:{'data-ar':p.ar,'data-reg':reg,'data-go-id':'ruin-'+slug}});
}
function _r2b4Band(reg,list,i,n,solved){
  var d=list.filter(function(p){return solved.has('ar'+p.ar);}).length,rs=cdSlug(reg);
  var dots=list.map(function(p){
    var on=solved.has('ar'+p.ar),lbl='AR'+p.ar+' '+(p.de||p.name)+(on?' (gelöst)':'');
    return '<a class="r2b4-dot'+(on?' is-done':'')+'" href="'+cdGoHref('ruins','ru-'+cdSlug(p.name))+'" data-go="ruins" data-goq="ru-'+cdSlug(p.name)+'" data-ar="'+p.ar+'" title="'+cdEsc(deT(lbl))+'" aria-label="'+cdEsc(deT(lbl))+'">'+p.ar+'</a>';
  }).join('');
  return '<header class="r2b4-band cd-spot cd-scened">'
    +cdScene(['reg-'+rs],{region:reg,full:true,glyph:'♜',cls:'r2b4-band-sc'})
    +'<div class="r2b4-band-main"><p class="r2b4-band-k">Region '+(i+1)+' von '+n+'</p>'
    +'<h3 class="r2b4-band-t">'+cdEsc(deT(reg))+'</h3>'
    +'<p class="r2b4-band-sub">'+list.length+' Grenzstein-Rätsel · '+list.reduce(function(a,p){return a+(p.steps||[]).length;},0)+' Lösungsschritte</p></div>'
    +'<div class="r2b4-band-prog"><span class="r2b4-band-num"><b>'+d+'</b>/'+list.length+'</span><span class="r2b4-band-lbl">gelöst</span>'
    +'<span class="r2b4-band-bar"><i style="--p:'+(list.length?Math.round(d/list.length*100):0)+'%"></i></span></div>'
    +'<nav class="r2b4-dots" aria-label="Ruinen in '+cdEsc(deT(reg))+'">'+dots+'</nav>'
    +'</header>';
}
var _r2b4St={reg:'all',st:'all'};
function renderRuins(){
  var root=document.getElementById('ruins-root');if(!root)return;
  var bar=document.getElementById('ruins-filter'),hero=document.getElementById('r2b4-hero');
  var order=(window.RUINS_REGION_ORDER||[]).filter(function(r){return (RUINS_DATA[r]||[]).length;});
  var solved=cdCheckGet(R2B4_KEY),total=0,done=0;
  order.forEach(function(r){RUINS_DATA[r].forEach(function(p){total++;if(solved.has('ar'+p.ar))done++;});});
  _r2b4St={reg:'all',st:'all'};
  if(hero)hero.innerHTML=cdHero({kicker:'Abyss-Grenzsteine',title:'Jedes Ruinen-Rätsel, Schritt für Schritt',
    sub:'Jeder gelöste Grenzstein gibt 1 Abyss-Artefakt und einen Schnellreisepunkt. Hake ab, was du schon hast.',
    scene:{keys:['ruin-mount-benus-ruins','reg-delesyia'],pos:'50% 45%'},glyph:'♜',tone:'gold',h:3,cls:'r2b4-hero',
    stats:[[total,'Grenzstein-Rätsel'],[order.length,'Regionen'],[done,'gelöst']]});
  if(bar){
    bar.innerHTML='<div class="r2b4-bar-f">'
      +cdPills([{v:'all',t:'Alle',n:total,on:true}].concat(order.map(function(r){return {v:r,t:r,n:RUINS_DATA[r].length};})),{name:'r2b4-reg',label:'Region',cls:'r2b4-pills-reg'})
      +cdPills([{v:'all',t:'Alle',on:true},{v:'open',t:'Offen'},{v:'done',t:'Gelöst'}],{name:'r2b4-st',label:'Status',cls:'r2b4-pills-st'})
      +'</div><div class="r2b4-bar-p"><span class="r2b4-bar-l">Fortschritt</span><span class="r2b4-total">'+cdProg(done,total,done+' von '+total+' Ruinen gelöst')+'</span></div>';
  }
  root.innerHTML=order.map(function(r,i){
    var list=RUINS_DATA[r],acc=cdTone({region:r});
    return '<section class="ruin-region r2b4-reg" data-reg="'+cdEsc(r)+'" id="r2b4-reg-'+cdSlug(r)+'"'+(acc?' style="--rc:'+cdEsc(acc)+'"':'')+'>'
      +_r2b4Band(r,list,i,order.length,solved)
      +'<div class="cd-folds r2b4-list">'+list.map(function(p){return _r2b4Fold(p,r,solved.has('ar'+p.ar));}).join('')+'</div></section>';
  }).join('')+'<p class="r2b4-empty" hidden>Keine Ruine passt zu diesem Filter.</p>';
  _r2b4Wire();
}
/* Fortschritt nachziehen (Bänder, Punkte, Karten, Kopfzahl, Gesamtbalken) ohne Neuaufbau */
function _r2b4Prog(){
  var root=document.getElementById('ruins-root');if(!root)return;
  var solved=cdCheckGet(R2B4_KEY),all=0,dn=0;
  root.querySelectorAll('.r2b4-reg').forEach(function(sec){
    var cards=sec.querySelectorAll('.r2b4-ruin'),d=0;
    cards.forEach(function(c){var on=solved.has('ar'+c.dataset.ar);c.classList.toggle('is-solved',on);if(on)d++;});
    sec.querySelectorAll('.r2b4-dot').forEach(function(a){
      var on=solved.has('ar'+a.dataset.ar),t=a.title.replace(/ \(gelöst\)$/,'')+(on?' (gelöst)':'');
      a.classList.toggle('is-done',on);a.title=t;a.setAttribute('aria-label',t);
    });
    var b=sec.querySelector('.r2b4-band-num b');if(b)b.textContent=d;
    var i=sec.querySelector('.r2b4-band-bar>i');if(i)i.style.setProperty('--p',(cards.length?Math.round(d/cards.length*100):0)+'%');
    sec.classList.toggle('is-complete',cards.length>0&&d===cards.length);
    all+=cards.length;dn+=d;
  });
  var tp=document.querySelector('#ruins-filter .r2b4-total');if(tp)tp.innerHTML=cdProg(dn,all,dn+' von '+all+' Ruinen gelöst');
  var dd=document.querySelectorAll('#r2b4-hero .cd-hero-stat dd');if(dd[2]){dd[2].textContent=dn;dd[2].removeAttribute('aria-label');}
}
/* Filter über Klassen (kein Neuaufbau): data-filtered + .hide wie die übrigen Sektionsfilter, danach aktive Suche erneut anwenden */
function _r2b4Filter(){
  var root=document.getElementById('ruins-root');if(!root)return;
  var solved=cdCheckGet(R2B4_KEY),st=_r2b4St,vis=0;
  root.querySelectorAll('.r2b4-reg').forEach(function(sec){
    var regOut=st.reg!=='all'&&sec.dataset.reg!==st.reg,n=0;
    sec.querySelectorAll('.r2b4-ruin').forEach(function(c){
      var on=solved.has('ar'+c.dataset.ar),out=regOut||(st.st==='open'&&on)||(st.st==='done'&&!on);
      if(out){c.dataset.filtered='1';c.classList.add('hide');}else{delete c.dataset.filtered;c.classList.remove('hide');n++;}
    });
    sec.classList.toggle('r2b4-out',!n);vis+=n;
  });
  if(typeof _reapplyActiveSearch==='function')_reapplyActiveSearch(root);
  var e=root.querySelector('.r2b4-empty');if(e)e.hidden=vis>0;
}
function _r2b4Wire(){
  var sec=document.getElementById('sec-ruins');if(!sec||sec._r2b4)return;sec._r2b4=true;
  sec.addEventListener('cd-pills',function(e){
    var d=e.detail||{};
    if(d.name==='r2b4-reg')_r2b4St.reg=d.value;else if(d.name==='r2b4-st')_r2b4St.st=d.value;else return;
    _r2b4Filter();
    var bar=document.getElementById('ruins-filter');
    if(bar&&bar.getBoundingClientRect().top<0&&window.cdMotion&&cdMotion.scrollTo)cdMotion.scrollTo(bar,{offset:16});
  });
  sec.addEventListener('cd-check',function(e){if(e.detail&&e.detail.key===R2B4_KEY)_r2b4Prog();});
  sec.addEventListener('click',function(e){
    var b=e.target.closest&&e.target.closest('.r2b4-shot');if(!b)return;
    openRuinImg(b.getAttribute('data-full'),b.getAttribute('data-cap'));
  });
  /* kaputte Lösungsbilder ausblenden (Bild-Fehler steigen nicht auf, darum capture) */
  sec.addEventListener('error',function(e){var t=e.target;if(t&&t.tagName==='IMG'&&t.parentElement&&t.parentElement.classList.contains('r2b4-shot'))t.parentElement.hidden=true;},true);
}
/* Altbestand: Region filtern per Funktionsaufruf (früher Knopfleiste) */
function ruinFilter(reg){
  var g=document.querySelector('#ruins-filter [data-cd-pills="r2b4-reg"]'),v=reg==='__all__'?'all':reg;
  var p=g&&[].slice.call(g.querySelectorAll('.cd-pill')).find(function(x){return x.dataset.v===v;});
  if(p)p.click();
}
function openRuinImg(url,cap){
  var im=document.getElementById("mim-img"); if(im)im.src=url;
  var n=document.getElementById("mim-name"); if(n)n.textContent=cap||"";
  if(typeof _mimSrcLbl==="function")_mimSrcLbl("Rätsel-Bild");
  var m=document.getElementById("mount-ingame-modal"); if(m)m.classList.add("show");
}
// renderRuins laeuft jetzt lazy ueber SEC_RENDERERS.ruins (ensureSecRendered) statt eager bei DOMContentLoaded.
// Falls die Ruins-Sektion beim Laden dieses Blocks bereits offen ist (Deep-Link), direkt nachrendern:
if(document.getElementById("sec-ruins")&&document.getElementById("sec-ruins").classList.contains("active")){try{renderRuins();}catch(e){console.error(e);}}
