
/* ==== MOTION 10/2026 · Bereich A (Bewegungs-Kern & Navigation) ==== */
/* window.cdMotion: GSAP 3.15 (Standard License) + ScrollTrigger + SplitText, Lenis 1.3.26 (MIT) aus vendor/, nur bei
   html.cd-motion nach DOMContentLoaded. Nur transform/opacity; revealAll() = Sicherheitsnetz. Ereignisse: cdmotion:page
   {id,sec,first} (auch ohne Bewegung), cdmotion:state {on}, cdmotion:refresh, cdmotion:revealall. */
(function(){
'use strict';
var H=document.documentElement,KEY='cd_motion',
  VENDOR=['gsap-3.15.0','ScrollTrigger-3.15.0','SplitText-3.15.0','lenis-1.3.26'],
  /* R2 Fundament: alle Karten-/Kacheltypen aller Seiten plus die Bausteine (.cd-spot, .cd-fold, .cd-check, .cd-hero) */
  REVEAL_SEL='.card, .so-tile, .pet-card, .ruin-card, .loc-card, .witch-card, .sk-card, .sk-c, .set-card, .ch-card, .chap, .build-card, .ach-card, .rm-task, .fav-item, .sg-card, .comm-it, .ov-card, .qst-node, .loc-pc, .cmt-item, .bo-saved-card, .witch-svc, .cd-spot, .cd-fold, .cd-check, .cd-hero, tbody tr, [data-cd-reveal], .sec-block, .sec-hero, .col-stat',   /* R2 Abnahme: + Geheimnisse-Blöcke und Sammelgegenstände-Kacheln */
  /* nativ scrollende Bereiche (Lenis greift nicht ein) und Vollbild-Overlays (Lenis hält an, solange eines offen ist) */
  NATIV='#sidebar,#rail,[aria-modal="true"],[role="dialog"],.loc-modal-box,#card-focus,.cs-overlay,.pm-overlay,#ee-overlay,#help-overlay,#cmp-modal,#ic-modal,#sync-overlay,#mount-ingame-modal,#rb-modal,iframe,[data-lenis-prevent],.cdx-pop,input,select,textarea',
  OVERLAY='[aria-modal="true"],.cs-overlay,.pm-overlay,#card-focus',
  mqR=matchMedia('(prefers-reduced-motion: reduce)'),mqM=matchMedia('(max-width:860px)'),
  force=/[?&]motion\b/.test(location.search),
  loading=null,lenis=null,ctx=null,active=false,hooks=[],waiting=new Set(),running=new Set(),batch=[],pages=0,progUntil=0,
  readyRes,readyState='',readyP=new Promise(function(r){readyRes=r;}),
  bb=null,prog=null,progX=null,docShort=true,bbOff=false,bbH='',bbN=0,lastY=0,prevY=0,scAt=0,swT=0,swAt=0,refT=0,ovObs=null,ovSeen=new WeakSet(),ovT=0;
var $=function(id){return document.getElementById(id);},
  mob=function(){return mqM.matches;},
  now=function(){return performance.now();},
  pref=function(){var p='auto';try{p=localStorage.getItem(KEY)||'auto';}catch(e){}return p==='on'||p==='off'?p:'auto';},
  wanted=function(){return pref()!=='off';},   /* Standard an (Wunsch 10.10.2026), nur das Häkchen im Hilfe-Fenster schaltet aus */
  emit=function(n,d){document.dispatchEvent(new CustomEvent(n,{detail:d||{}}));},
  setCls=function(on){H.classList.toggle('cd-motion',on);H.classList.toggle('cd-still',!on);},
  activeSec=function(){return document.querySelector('#main > .sec.active');},
  libs=function(first){return {gsap:window.gsap,ScrollTrigger:window.ScrollTrigger,SplitText:window.SplitText,lenis:lenis,first:!!first,mobile:mob()};};
function settle(v){var st=v?'on':'off';if(readyState===st)return;if(readyState)readyP=new Promise(function(r){readyRes=r;});readyState=st;readyRes(v);}

/* ---- Bibliotheken nachladen (async=false hält die Reihenfolge: gsap vor den Plugins) ---- */
function load(){
  if(loading)return loading;
  loading=new Promise(function(res,rej){
    if(window.gsap&&window.ScrollTrigger&&window.SplitText&&window.Lenis)return res();
    var left=VENDOR.length;
    VENDOR.forEach(function(n){
      var s=document.createElement('script');s.src='vendor/'+n+'.min.js';s.async=false;
      s.onload=function(){if(!--left)res();};
      s.onerror=function(){rej(new Error('Bewegung: '+s.src+' nicht geladen'));};
      document.head.appendChild(s);
    });
  }).then(function(){gsap.registerPlugin(ScrollTrigger,SplitText);ScrollTrigger.config({ignoreMobileResize:true});});
  loading.catch(function(){loading=null;});
  return loading;
}

/* ---- Lenis im gsap-Takt; Touch scrollt nativ (syncTouch:false) ---- */
function raf(t){if(lenis)lenis.raf(t*1000);}
function start(){
  if(active)return;
  active=true;setCls(true);
  /* lerp 0.11 statt 0.1: Nachlauf etwa 10 % kürzer, Scrollen etwas direkter (User-Wunsch 24.10.2026) */
  lenis=window.lenis=new Lenis({lerp:0.11,syncTouch:false,allowNestedScroll:true,stopInertiaOnNavigate:true,
    respectReducedMotion:false,   /* es entscheidet der Schalter cd_motion */
    prevent:function(n){return !!(n&&n.closest&&n.closest(NATIV));}});
  lenis.on('scroll',ScrollTrigger.update);
  lenis.on('scroll',onLenis);
  gsap.ticker.add(raf);gsap.ticker.lagSmoothing(0);
  watchOv();checkOv();
  emit('cdmotion:state',{on:true});
}
function stop(){
  if(!active)return;
  if(lateMo){lateMo.disconnect();lateQ=[];}
  revealAll();
  if(ctx){ctx.revert();ctx=null;}
  gsap.ticker.remove(raf);gsap.ticker.lagSmoothing(500,33);
  lenis.destroy();lenis=window.lenis=null;
  active=false;setCls(false);
  if(prog)prog.style.transform='';
  emit('cdmotion:state',{on:false});
}
function apply(){
  if(wanted()){
    setCls(true);
    load().then(function(){
      if(!wanted()||active)return;
      start();settle(libs(true));
      var s=activeSec();if(s)enter(s.id.slice(4),s,true);
    },function(e){console.warn(e.message);setCls(false);settle(null);emit('cdmotion:state',{on:false});});
  }else{stop();setCls(false);settle(null);}
  syncBtn();
}

/* ---- Seitenauftritt (A4) ---- */
function shown(el){var r=el.getBoundingClientRect();return r.width||r.height;}
function skip(el){return !!el.closest('[data-cd-noreveal]')||!!el.style.opacity||!!el.style.transform;}
/* oberste, schon im Bild stehende Blöcke (Kopf zuerst), höchstens 6; bei nur einem Hüllblock dessen Kinder */
function topBlocks(sec,vh){
  var k=[].filter.call(sec.children,shown),out=[];
  if(k.length===1&&k[0].children.length>1)k=[].filter.call(k[0].children,shown);
  for(var i=0;i<k.length&&out.length<6;i++){
    var r=k[i].getBoundingClientRect();
    if(r.top>=vh*0.96)break;
    if(r.bottom>0&&!skip(k[i]))out.push(k[i]);
  }
  return out;
}
/* Karten unterhalb des Bildes: erst alle Lagen lesen, dann nur Klassen setzen (.cdx-wait); Freigabe per ScrollTrigger.batch.
   Tabellen 40 Zeilen, höchstens 120, Rest sofort sichtbar */
function prep(sec,vh){
  var all=sec.querySelectorAll(REVEAL_SEL),list=[],set=new Set(),rows=new Map();
  for(var i=0;i<all.length&&list.length<120;i++){
    var el=all[i],a,r;
    if(skip(el))continue;
    if(el.tagName==='TR'){a=(rows.get(el.parentNode)||0)+1;rows.set(el.parentNode,a);if(a>40)continue;}
    a=el.parentElement&&el.parentElement.closest(REVEAL_SEL);
    if(a&&set.has(a))continue;                       /* Eltern-Karte blendet schon ein */
    r=el.getBoundingClientRect();
    if((!r.width&&!r.height)||r.top<vh*0.98)continue; /* verborgen oder schon im Bild */
    list.push(el);set.add(el);
  }
  if(!list.length)return;
  list.forEach(function(el){el.classList.add('cdx-wait');waiting.add(el);});
  batch=ScrollTrigger.batch(list,{start:'top 96%',once:true,batchMax:12,interval:0.06,onEnter:function(b){reveal(b);}});
}
/* Freigabe: .cdx-wait weg, .cdx-run hält CSS-Übergänge an */
function reveal(list,instant){
  list=[].filter.call(list,function(el){return waiting.has(el);});
  if(!list.length)return;
  /* R2 Performance: CSS-Übergang statt gsap-Tween je Bild. opacity/transform laufen so auf dem Compositor, ohne
     Stil-Neuberechnung im Hauptthread pro Bild (vorher je Karte und Bild eine, mobil spürbar). Staffel über --cdx-d. */
  var m=mob(),go=!instant,each=Math.min(m?0.02:0.035,0.3/list.length),dur=m?250:420;
  list.forEach(function(el,i){waiting.delete(el);
    if(go){el.style.setProperty('--cdx-d',(i*each).toFixed(3)+'s');el.classList.add('cdx-show');showing.add(el);}
    el.classList.remove('cdx-wait');});
  if(go)setTimeout(function(){list.forEach(unshow);},dur+list.length*each*1000+80);
}
var showing=new Set();
function unshow(el){if(!showing.delete(el))return;el.classList.remove('cdx-show');el.style.removeProperty('--cdx-d');}
function done(el){el.classList.remove('cdx-run','cdx-in');el.style.removeProperty('--cdx-t');el.style.removeProperty('opacity');}
/* Sicherheitsnetz: darüber sofort frei, im Bild eingeblendet (now: sofort) */
function sweep(now){
  if(!waiting.size)return;
  var vh=innerHeight,up=[],vis=[];
  waiting.forEach(function(el){
    if(!el.isConnected)return waiting.delete(el);
    var r=el.getBoundingClientRect();
    if(r.bottom<=0||(!r.width&&!r.height))up.push(el);else if(r.top<vh)vis.push(el);
  });
  if(up.length)reveal(up,true);
  if(vis.length)reveal(vis,now===true);
}
function enter(id,sec,first){
  revealAll(true);
  if(ctx){ctx.revert();ctx=null;}
  if(!active||!sec)return;
  var m=mob(),vh=innerHeight;
  ctx=gsap.context(function(){
    /* erster Aufruf: Inhalt stand schon da. Erst lesen (topBlocks, prep), dann schreiben */
    var b=first?[]:topBlocks(sec,vh);
    prep(sec,vh);
    if(b.length){
      b.forEach(function(el){el.classList.add('cdx-run');});
      var tw=gsap.from(b,{opacity:0,y:m?7:14,duration:m?0.22:0.4,ease:'power2.out',stagger:0.05,clearProps:'transform,opacity',
        onComplete:function(){running.delete(tw);b.forEach(function(el){el.classList.remove('cdx-run');});}});
      running.add(tw);
    }
    var l=libs(first);
    hooks.slice().forEach(function(fn){try{fn(id,sec,l);}catch(e){console.error('cdMotion.onEnter:',e);}});
  },sec);
  lateWatch(sec);
  refreshSoon(60);
}
/* R2 Fundament: spät gerenderte Karten (Reiter, Filter-Neurender, Nachladen, geöffnete Faltkarten) unterhalb des Bildes
   blenden ebenfalls ein. Ein MutationObserver je Seite, gebündelt per rAF, höchstens 120 je Durchgang. */
var lateMo=null,lateQ=[],lateF=0;
function lateWatch(sec){
  if(lateMo){lateMo.disconnect();lateQ=[];}
  if(!active||!sec||!window.MutationObserver)return;
  lateMo=lateMo||new MutationObserver(lateOn);
  lateMo.observe(sec,{childList:true,subtree:true});
}
function lateOn(recs){
  for(var i=0;i<recs.length;i++){var a=recs[i].addedNodes;for(var j=0;j<a.length;j++)if(a[j].nodeType===1&&a[j].tagName!=='MARK')lateQ.push(a[j]);}
  if(lateQ.length&&!lateF)lateF=requestAnimationFrame(lateRun);
}
function lateRun(){
  lateF=0;var q=lateQ;lateQ=[];
  if(!active||!ctx)return;
  var vh=innerHeight,list=[],set=new Set();
  for(var i=0;i<q.length&&list.length<120;i++){
    var n=q[i];if(!n.isConnected)continue;
    var c=(n.matches(REVEAL_SEL)?[n]:[]).concat([].slice.call(n.querySelectorAll(REVEAL_SEL),0,240));
    for(var k=0;k<c.length&&list.length<120;k++){
      var el=c[k],r,p;
      if(set.has(el)||waiting.has(el)||skip(el)||el.classList.contains('cdx-run')||el.classList.contains('cd-b4-in'))continue;
      p=el.parentElement&&el.parentElement.closest(REVEAL_SEL);if(p&&(set.has(p)||waiting.has(p)))continue;
      r=el.getBoundingClientRect();
      if((!r.width&&!r.height)||r.top<vh*0.98)continue;
      list.push(el);set.add(el);
    }
  }
  if(!list.length)return;
  list.forEach(function(el){el.classList.add('cdx-wait');waiting.add(el);});
  ctx.add(function(){batch=batch.concat(ScrollTrigger.batch(list,{start:'top 96%',once:true,batchMax:12,interval:0.06,onEnter:function(b){reveal(b);}}));});
}
function revealAll(quiet){
  lateQ=[];showing.forEach(unshow);
  batch.forEach(function(t){t.kill();});batch=[];
  running.forEach(function(t){t.progress(1).kill();});running.clear();   /* laufende Einblendungen sofort ans Ende */
  waiting.clear();
  var run=document.querySelectorAll('.cdx-run');
  if(run.length&&window.gsap){gsap.killTweensOf(run);gsap.set(run,{clearProps:'transform,opacity'});}
  run.forEach(done);
  document.querySelectorAll('.cdx-wait').forEach(function(el){el.classList.remove('cdx-wait');});
  if(!quiet)emit('cdmotion:revealall');
}
/* Hook am Ende von showSec */
function page(id){
  var sec=$('sec-'+id);if(!sec)return;
  var first=!pages++;
  emit('cdmotion:page',{id:id,sec:sec,first:first});
  if(active)enter(id,sec,first);
  measure();prevY=scrollY;onScroll();
}

/* ---- Scrollen (A3): Versatz = angeheftete Kopfzeile + 8 px ---- */
function headerOffset(){
  bb=bb||$('blattbar');
  var p=bb&&getComputedStyle(bb).position;
  return p==='sticky'||p==='fixed'?Math.round(bb.offsetHeight)+8:8;
}
function scrollTo(target,o){
  o=o||{};
  var y=target,el;
  if(typeof target!=='number'){
    el=typeof target==='string'?document.querySelector(target):target;
    if(!el||!el.getBoundingClientRect||!shown(el))return;
    revealAll();   /* Sprungziel und alles davor sofort sichtbar */
    y=el.getBoundingClientRect().top+scrollY-(o.offset!=null?+o.offset:headerOffset());
  }
  /* R2 Abnahme: Ziel ganz oben (Seitenwechsel) braucht keine Dokumenthöhe; scrollHeight erzwang dort Stil + Layout mitten in showSec */
  y=y>0?Math.round(Math.max(0,Math.min(H.scrollHeight-innerHeight,y))):0;
  var d=Math.abs(y-scrollY),dur=Math.min(0.9,0.35+d/6000),done=function(){progUntil=now()+400;lastY=scrollY;if(typeof o.onComplete==='function')o.onComplete();};
  progUntil=now()+dur*1000+400;setOff(false);   /* Kopfzeile bleibt während des Sprungs stehen */
  if(lenis&&active&&!o.immediate&&d>1)lenis.scrollTo(y,{duration:dur,easing:function(t){return 1-Math.pow(1-t,4);},force:true,onComplete:done});
  else{if(lenis&&active)lenis.scrollTo(y,{immediate:true,force:true});else window.scrollTo({top:y,behavior:'auto'});done();}
}

/* ---- Kopfzeile (A7): Schatten, Lesefortschritt, mobil ausweichen ---- */
function measure(){
  bb=bb||$('blattbar');if(!bb)return;
  var lim=H.scrollHeight-innerHeight;
  docShort=lim<innerHeight;
  bbN=bb.offsetHeight;var h=bbN+'px';if(h!==bbH){bbH=h;H.style.setProperty('--cdx-bb-h',h);}
  if(prog)prog.classList.toggle('on',active&&lim>innerHeight*0.6);
}
function setOff(v){if(bb&&v!==bbOff){bbOff=v;bb.classList.toggle('cdx-bb-off',v);}}
function onScroll(){
  bb=bb||$('blattbar');if(!bb)return;
  var y=scrollY,d=y-lastY,sb=$('sidebar');
  bb.classList.toggle('cdx-scrolled',y>4);
  /* R2: Höhe aus measure() (kein erzwungenes Layout je Scroll-Ereignis) */
  if(!active||!mob()||now()<progUntil||docShort||y<(bbN||64)*2||(sb&&sb.classList.contains('open'))||bb.contains(document.activeElement)||bb.querySelector('[aria-expanded="true"]'))setOff(false);
  else if(d>6)setOff(true);else if(d<-6)setOff(false);
  if(Math.abs(d)>6||y<8)lastY=y;
  var j=Math.abs(y-prevY)>innerHeight*1.5;prevY=y;scAt=now();
  /* Sprung > 1,5 Fenster: sofort frei; Seitenende: Rest einblenden; sonst nachkehren */
  if(waiting.size){clearTimeout(swT);if(j||y>=H.scrollHeight-innerHeight-2)sweep(j);else swT=setTimeout(sweep,140);}
}
function onLenis(l){
  if(progX&&l.limit>0)progX(Math.min(1,l.scroll/l.limit));
  if(waiting.size&&now()-swAt>300){swAt=now();sweep();}
}
function setupBar(){
  bb=$('blattbar');if(!bb)return;
  if(!prog){prog=document.createElement('div');prog.className='cdx-progress';prog.setAttribute('aria-hidden','true');bb.appendChild(prog);}
  progX=active?gsap.quickSetter(prog,'scaleX'):null;
  measure();
}

/* ---- Overlays: Lenis anhalten, solange eines offen ist ---- */
function isOpen(el){
  if(!el.isConnected||!el.getClientRects().length)return false;
  var c=getComputedStyle(el);return c.display!=='none'&&c.visibility!=='hidden'&&+c.opacity>0.05;
}
function checkOv(){
  ovT=0;if(!lenis)return;
  var open=[].some.call(document.querySelectorAll(OVERLAY),isOpen);
  if(open!==lenis.isStopped)open?lenis.stop():lenis.start();
}
function attachOv(){
  document.querySelectorAll(OVERLAY).forEach(function(el){
    if(!ovSeen.has(el)){ovSeen.add(el);ovObs.observe(el,{attributes:true,attributeFilter:['class','style','hidden','open']});}
  });
}
function watchOv(){
  if(ovObs)return;
  var s=function(){ovT=ovT||requestAnimationFrame(checkOv);};
  ovObs=new MutationObserver(s);
  new MutationObserver(function(){attachOv();s();}).observe(document.body,{childList:true});
  attachOv();
}

/* ---- Refresh (entprellt) ---- */
function refreshNow(){
  /* nicht mitten im Scrollen: ScrollTrigger.refresh() misst alle Trigger neu (erzwungenes Layout, 20 bis 80 ms).
     Beim Scrollen wachsen content-visibility-Karten und Bilder laufend, der ResizeObserver feuerte so Ruckler nach;
     Wartende blendet sweep() bis zur Ruhe trotzdem ein. */
  if(now()-scAt<350||(lenis&&lenis.isScrolling)){refreshSoon(350);return;}
  if(lenis)lenis.resize();
  if(active)ScrollTrigger.refresh();
  measure();sweep();emit('cdmotion:refresh');
}
function refreshSoon(ms){clearTimeout(refT);refT=setTimeout(refreshNow,ms==null?150:ms);}

/* ---- Schalter (A2): Automatisch, An, Aus ---- */
var LBL={auto:'Automatisch',on:'An',off:'Aus'},NEXT={auto:'on',on:'off',off:'auto'};
function syncBtn(){
  var b=$('motionBtn');if(!b)return;
  var p=pref(),eff=H.classList.contains('cd-motion'),
    f=force&&p!=='on',
    t='Bewegung: '+LBL[p]+(f?(eff?' (per Adresse erzwungen)':' (per Adresse angefordert, Bibliotheken nicht geladen)'):p==='auto'?(eff?' (an)':' (aus, folgt der Systemeinstellung)'):p==='on'&&!eff?' (Bibliotheken nicht geladen)':'');
  /* Zustand nur im Label (Dreifach-Schalter, kein aria-pressed) */
  b.dataset.state=p;b.title=t;b.removeAttribute('aria-pressed');
  b.setAttribute('aria-label',t+'. Klicken wechselt zu: '+LBL[NEXT[p]]);
}
function setPref(p){
  if(!LBL[p])p='auto';
  try{p==='auto'?localStorage.removeItem(KEY):localStorage.setItem(KEY,p);}catch(e){}
  force=false;   /* ?motion gilt nur, bis jemand selbst schaltet */
  apply();
}

/* ---- öffentliche API (Vertrag 4.1) + Zusätze ---- */
window.cdMotion={
  get on(){return active;},
  get ready(){return readyP;},
  onEnter:function(fn){
    if(typeof fn!=='function')return;
    hooks.push(fn);
    var s=activeSec();   /* spät registriert: für die schon inszenierte Seite nachholen (ohne Auftritt) */
    if(active&&ctx&&s)ctx.add(function(){try{fn(s.id.slice(4),s,libs(true));}catch(e){console.error('cdMotion.onEnter:',e);}});
  },
  scrollTo:scrollTo,
  refresh:function(){refreshSoon();},
  revealAll:function(){revealAll();},
  REVEAL_SEL:REVEAL_SEL,
  get pref(){return pref();},
  setPref:setPref,
  cycle:function(){setPref(NEXT[pref()]);},
  headerOffset:headerOffset,
  _page:page
};

document.addEventListener('input',function(e){if(e.target.id==='si')revealAll();},true);
addEventListener('beforeprint',function(){revealAll();});
document.addEventListener('toggle',function(e){if(waiting.size&&e.target.open)reveal(e.target.querySelectorAll('.cdx-wait'),true);},true);
addEventListener('scroll',onScroll,{passive:true});
addEventListener('resize',function(){refreshSoon(200);},{passive:true});
try{mqR.addEventListener('change',function(){if(pref()==='auto'&&!force)apply();});}catch(e){}
document.addEventListener('cdmotion:state',function(){setupBar();syncBtn();onScroll();});
function boot(){
  var m=$('main');
  /* Umbau: Wartende im Bild vor dem Malen frei, nicht beim Scrollen */
  if(m){m.addEventListener('change',function(){revealAll();});if(window.ResizeObserver)new ResizeObserver(function(){refreshSoon(200);if(now()-scAt>300)sweep(true);}).observe(m);}
  setupBar();syncBtn();
  if(bb)bb.addEventListener('focusin',function(){setOff(false);});
  if(!pages){var s=activeSec();if(s)page(s.id.slice(4));}
  if(wanted())apply();else{setCls(false);settle(null);}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
/* -- A5 Navigation: gleitende Markierungen + Lichtkegel -- */
/* Gleitende Markierungen in Rail und Konsole (ruhig, nach React Bits PillNav, (c) David Haz, MIT+Commons Clause) + Lichtkegel */
(function(){
  'use strict';
  var D=document,M=window.cdMotion,rs=D.getElementById('railScroll'),cl=D.getElementById('conList'),sb=D.getElementById('sidebar');
  if(!M||!rs||!cl) return;
  var on=0,fr=0,sf=0,mo,ro,pt,px,py,fine=matchMedia('(hover:hover) and (pointer:fine)');
  var R={h:rs,r:D.getElementById('rail'),c:'cdx-ind-rail',s:'.rail-item.active',snap:1};
  var C={h:cl,r:cl,c:'cdx-ind-con',s:'.leaf.active'};
  /* Lage im Container, abzüglich einer noch stehenden .cdx-toc davor */
  function box(i,t){
    var h=i.h.getBoundingClientRect(),r=t.getBoundingClientRect(),dy=0,p=t.previousElementSibling,a,b;
    if(r.width<2||r.height<2||(i===C&&sb&&sb.getBoundingClientRect().width<2)) return;
    for(;p;p=p.previousElementSibling) if(p.classList.contains('cdx-toc')){
      a=p.previousElementSibling; b=p.nextElementSibling;
      dy+=a&&b?b.getBoundingClientRect().top-a.getBoundingClientRect().bottom:p.getBoundingClientRect().height;
    }
    return {x:r.left-h.left-i.h.clientLeft+i.h.scrollLeft,y:r.top-dy-h.top-i.h.clientTop+i.h.scrollTop,width:r.width,height:r.height};
  }
  function off(i,rm){
    if(i.e){ gsap.killTweensOf(i.e); if(rm) i.e.remove(); else gsap.set(i.e,{opacity:0}); }
    i.r.classList.remove('cdx-ind-on'); i.l=i.v=0;
  }
  function upd(i){
    var t=i.h.querySelector(i.s),b=t&&box(i,t),e=i.e;
    if(!b) return off(i);
    if(!e){ e=i.e=D.createElement('span'); e.className='cdx-ind '+i.c; e.setAttribute('aria-hidden','true'); }
    if(e.parentNode!==i.h) i.h.appendChild(e);          /* innerHTML der Liste hat ihn ggf. entfernt */
    if(!i.v||!i.l||!i.l.isConnected){                    /* neu oder Liste neu gebaut: einblenden statt quer gleiten */
      gsap.killTweensOf(e); gsap.set(e,b);
      if(i.snap) gsap.set(e,{opacity:1}); else i.w=gsap.fromTo(e,{opacity:0},{opacity:1,duration:.18,ease:'power1.out'});
    } else if(t!==i.l||(i.w&&i.w.isActive()))            /* Blattwechsel oder Ziel wanderte beim Gleiten */
      i.w=gsap.to(e,{x:b.x,y:b.y,width:b.width,height:b.height,opacity:1,duration:.32,ease:'power3.out',overwrite:true,onComplete:sched});
    else gsap.set(e,b);                                  /* nur Größe/Scroll geändert */
    i.l=t; i.v=1; i.r.classList.add('cdx-ind-on');
  }
  function sched(){ if(on&&!fr) fr=requestAnimationFrame(function(){ fr=0; if(on){ upd(R); upd(C); } }); }
  function onMut(m){
    for(var k=0,x,n;k<m.length;k++){
      x=m[k]; n=x.addedNodes&&(x.addedNodes[0]||x.removedNodes[0]);
      if(x.type==='childList'?n!==R.e&&n!==C.e:/\b(leaf|rail-item)\b/.test(x.target.className)) return sched();
    }
  }
  function enable(){
    if(on||!window.gsap||!M.on) return;
    on=1; mo=new MutationObserver(onMut);
    var o={childList:true,subtree:true,attributes:true,attributeFilter:['class']};
    mo.observe(rs,o); mo.observe(cl,o);
    if(window.ResizeObserver){ ro=new ResizeObserver(sched); ro.observe(rs); ro.observe(cl); if(sb) ro.observe(sb); }
    /* Lichtkegel auf .leaf/.rail-item: seit R2 im einen gemeinsamen Listener (Bereich B4, CD_SPOT_SEL) */
    sched();
  }
  function disable(){
    if(!on) return;
    on=0; cancelAnimationFrame(fr); cancelAnimationFrame(sf); fr=sf=0;
    if(mo) mo.disconnect(); if(ro) ro.disconnect();
    off(R,1); off(C,1); R.e=C.e=null;
  }
  ['cdmotion:page','cdmotion:toc','cdmotion:refresh'].forEach(function(n){ D.addEventListener(n,sched); });
  D.addEventListener('cdmotion:state',function(e){ if(e.detail&&e.detail.on) enable(); else disable(); });
  if(M.on) enable(); else if(M.ready) M.ready.then(function(v){ if(v) enable(); });
})();
/* -- /A5 -- */
/* -- A6 Abschnitts-Navigation „Auf dieser Seite“ -- */
/* Überschriften -> Liste in der Konsole oder Popover in der Kopfzeile; Scrollspy per rAF; Gleiten nur bei cdMotion.on */
(()=>{
const SEL='.sub-t,.loc-grp-t,.ch-title,[data-toc]',MIN=3,CAP=14,mq=matchMedia('(max-width:860px)'),$=i=>document.getElementById(i),
  HEAD='<div class="cdx-toc-h" aria-hidden="true">Auf dieser Seite</div>';
let items=[],sig='',sec,nav,btn,pop,mo,more=0,act=-2,hold=-1,busy=0,fy=0,raf=0,tmr=0,ctr={};
const side=()=>mq.matches||$('app').classList.contains('console-collapsed'),
  Y=()=>window.scrollY||0,
  fire=()=>document.dispatchEvent(new CustomEvent('cdmotion:toc')),
  mk=(c,id)=>{const n=document.createElement('nav');n.className=c;n.id=id;n.setAttribute('aria-label','Abschnitte dieser Seite');n.onclick=click;return n};

/* sichtbare Überschriften (nicht in zugeklappten details, ohne wiederholte Karten-Köpfe) */
function collect(){
  const out=[],cnt={},seen=new Set();
  sec.querySelectorAll(SEL).forEach(h=>{
    const t=h.textContent.replace(/\s+/g,' ').trim();
    if(t&&h.getClientRects().length&&!(h.closest('details:not([open])')&&!h.closest('summary')))out.push({el:h,t});
  });
  out.forEach(o=>{const p=o.el.parentElement;if(!seen.has(p)){seen.add(p);cnt[p.className]=(cnt[p.className]||0)+1}});
  return out.filter(o=>!o.el.parentElement.className||cnt[o.el.parentElement.className]<20);
}
const list=cap=>'<div class="cdx-l"><i class="cdx-tbar"></i><ul>'+items.map((o,i)=>
  `<li${cap&&i>=CAP&&!more?' hidden':''}><button type="button" data-i="${i}"><span>${o.t.replace(/[&<]/g,c=>'&#'+c.charCodeAt()+';')}</span></button></li>`).join('')
  +(cap&&items.length>CAP?`<li class="cdx-more"><button type="button" data-m="1" aria-expanded="${!!more}">${more?'Weniger':'+ '+(items.length-CAP)+' weitere'}</button></li>`:'')+'</ul></div>';

/* Liste direkt nach dem aktiven .leaf; weg bei Handy und eingeklappter Konsole */
function put(){
  const leaf=$('conList')?.querySelector('.leaf.active');let ch=0;
  if(items.length<MIN||!leaf||side()){if(nav){nav.remove();nav=0;fire()}return}
  if(!nav){nav=mk('cdx-toc','cdxToc');ch=1}
  if(nav.dataset.s!==sig){nav.dataset.s=sig;nav.innerHTML=HEAD+list(1);ch=1}
  if(nav.previousElementSibling!==leaf){leaf.after(nav);ch=1}
  if(ch){mark();fire()}
}
function bar(){
  const on=items.length>=MIN&&side();
  btn.hidden=!on;if(!on)setPop(0);
  btn.lastChild.textContent=items.length;btn.setAttribute('aria-label','Abschnitte dieser Seite ('+items.length+')');
}
function setPop(v){
  if(pop.hidden===!v)return;
  pop.hidden=!v;btn.setAttribute('aria-expanded',!!v);if(v)mark();
}
function refresh(force){
  tmr=0;if(!sec||!sec.isConnected)return;
  items=collect();
  items.forEach(({el})=>{ /* fehlende IDs vergeben, vorhandene nie ändern; Fokus per Skript ermöglichen */
    if(!el.id){let n=ctr[sec.id]||0,id;do id='cdx-'+sec.id.slice(4)+'-'+ ++n;while($(id));ctr[sec.id]=n;el.id=id}
    if(!el.hasAttribute('tabindex'))el.tabIndex=-1;
  });
  const s=items.map(o=>o.t).join('\n');
  if(force===true||s!==sig){sig=s;act=-2;pop.innerHTML=HEAD+list();if(nav)nav.dataset.s=''}
  put();bar();spy();
}
const sched=()=>{clearTimeout(tmr);tmr=setTimeout(refresh,250)};

/* aktiven Eintrag markieren, Balken gleiten; nachgeführt wird nur der Container */
function mark(anim){
  for(const c of [nav,pop]){
    if(!c||!c.isConnected||c.hidden)continue;
    const ind=c.querySelector('.cdx-tbar');let cur;
    c.querySelectorAll('button[data-i]').forEach(b=>{
      const on=+b.dataset.i===act;if(on)cur=b;
      on?b.setAttribute('aria-current','location'):b.removeAttribute('aria-current');
    });
    if(cur&&cur.parentNode.hidden){if(anim){more=1;nav.dataset.s='';put()}cur=0}
    if(!cur){ind.style.opacity=0;ind.dataset.on='';continue}
    const y=cur.offsetTop,h=cur.offsetHeight,was=ind.dataset.on;ind.dataset.on=1;
    if(cdMotion.on&&window.gsap){
      gsap.set(ind,{height:h,opacity:1});
      anim&&was?gsap.to(ind,{y,duration:.3,ease:'power3.out',overwrite:true}):gsap.set(ind,{y});
    }else ind.style.cssText=`opacity:1;height:${h}px;transform:translateY(${y}px)`;
    const s=c===pop?pop:$('conList'),r=cur.getBoundingClientRect(),q=s.getBoundingClientRect();
    if(r.top<q.top+4)s.scrollTop+=r.top-q.top-24;else if(r.bottom>q.bottom-4)s.scrollTop+=r.bottom-q.bottom+24;
  }
}
/* Scrollspy: letzte Überschrift, deren Oberkante höchstens 30 % der Restfensterhöhe unter der Kopfzeile liegt */
function spy(){
  raf=0;if(items.length<MIN)return;
  const top=Math.max(0,$('blattbar').getBoundingClientRect().bottom),lim=top+(innerHeight-top)*.3,y=Y();let a=-1;
  for(let i=0;i<items.length;i++){
    const e=items[i].el;if(!e.isConnected)continue;
    if(e.getBoundingClientRect().top<=lim)a=i;else break;
  }
  if(y>0&&y+innerHeight>=document.documentElement.scrollHeight-2)a=items.length-1;
  if(hold>=0){if(busy||Math.abs(y-fy)<40)a=hold;else hold=-1}
  if(a!==act){act=a;mark(1)}
}
/* Sprung mit Kopfzeilen-Versatz; nachladende Bilder verschieben das Ziel: bis zu 4 mal nachjustieren */
function go(i){
  const el=items[i]?.el;if(!el||!el.isConnected)return;
  setPop(0);hold=i;busy=1;act=i;mark(1);
  const fin=n=>{
    cdMotion.scrollTo(el,{immediate:true});fy=Y();
    setTimeout(()=>{
      const r=el.getBoundingClientRect().top-cdMotion.headerOffset(),y=Y();
      if(n<4&&Math.abs(r)>3&&Math.abs(y-fy)<40&&y<document.documentElement.scrollHeight-innerHeight-2)return fin(n+1);
      busy=0;fy=y;el.focus({preventScroll:true});
    },250);
  };
  let d=0;const end=()=>{if(!d++)fin(0)};
  cdMotion.scrollTo(el,{onComplete:end});setTimeout(end,1600);
}
function click(e){
  const b=e.target.closest('button');if(!b)return;
  if(b.dataset.m){more=!more;nav.dataset.s='';put();nav.querySelector('[data-m]').focus()}
  else if(b.dataset.i)go(+b.dataset.i);
}
function start(s){
  setPop(0);hold=-1;busy=0;sec=s;mo.disconnect();
  mo.observe(s,{childList:true,subtree:true,attributes:true,attributeOldValue:true,attributeFilter:['class','hidden','open']});   /* ohne style: Lichtkegel --mx/--my */
  /* R2 Integration: erst nach dem ersten Bild sammeln. Synchron erzwang collect() Stil und Layout in noch gesperrten
     content-visibility-Karten (Kapitel-Guide: Seitenwechsel 63 -> 25 ms bei 1366, gemessen mit r2-int-probe.mjs) */
  /* R2 Abnahme: im Leerlauf nach dem ersten Bild (höchstens 400 ms später), nicht mehr zwischen erstem und zweitem Bild des Seitenwechsels */
  const go2=()=>{if(sec===s)refresh(true)};
  items=[];sig='';put();bar();requestAnimationFrame(()=>window.requestIdleCallback?requestIdleCallback(go2,{timeout:400}):setTimeout(go2,60));
}
const bb=$('blattbar'),D=document;
btn=D.createElement('button');btn.type='button';btn.id='cdxBtn';btn.className='bb-console cdx-bbtoc';btn.hidden=true;
btn.setAttribute('aria-expanded','false');btn.setAttribute('aria-controls','cdxPop');
btn.innerHTML='<span aria-hidden="true">&sect;</span><span class="cdx-t">Abschnitte</span><span class="cdx-n"></span>';
btn.onclick=()=>setPop(pop.hidden);
pop=mk('cdx-pop','cdxPop');pop.hidden=true;pop.setAttribute('data-lenis-prevent','');
bb.querySelector('.bb-spacer').after(btn,pop);
/* Beobachter: Seite (ohne Einblendungen), Konsolenliste, Konsolen-Zustand */
/* R2: reine Effekt-Klassen (Einblendung, Aufleuchten, Filter-Tween) lösen keinen Neuaufbau aus */
const FXC=/\b(cdx-[a-z]+|cd-flash|cd-b4-in)\b/g,cls=s=>(s||'').replace(FXC,' ').trim().split(/\s+/).sort().join(' '),
  fxOnly=m=>m.type==='attributes'&&m.attributeName==='class'&&cls(m.oldValue)===cls(m.target.getAttribute('class'));
mo=new MutationObserver(r=>{if(r.some(m=>!fxOnly(m)))sched()});
new MutationObserver(put).observe($('conList'),{childList:true});
new MutationObserver(()=>{bar();put()}).observe($('app'),{attributes:true,attributeFilter:['class']});
mq.addEventListener('change',()=>{bar();put()});
D.addEventListener('cdmotion:page',e=>start(e.detail.sec));
D.addEventListener('cdmotion:state',()=>sec&&refresh(true));
D.addEventListener('cdmotion:refresh',()=>sec&&refresh());
D.addEventListener('toggle',e=>{if(sec&&e.target.tagName==='DETAILS'&&sec.contains(e.target))sched()},true);
const away=e=>{if(!pop.hidden&&!pop.contains(e.target)&&!btn.contains(e.target))setPop(0)};
D.addEventListener('click',away);D.addEventListener('focusin',away);
D.addEventListener('keydown',e=>{if(e.key==='Escape'&&!pop.hidden){setPop(0);btn.focus()}});
addEventListener('scroll',()=>{raf=raf||requestAnimationFrame(spy)},{passive:true});
const s0=D.querySelector('#main > .sec.active');if(s0)start(s0);
window.cdToc={items:()=>items.map(o=>o.t),active:()=>act,el:i=>items[i].el};
})();
/* -- /A6 -- */
/* ==== /Motion A ==== */
