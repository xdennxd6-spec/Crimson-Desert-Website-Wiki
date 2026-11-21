
/* ==== MOTION 10/2026 · Bereich B (Inhalte & Seiten-Effekte) ==== */
/* B2 Startseiten-Inszenierung + B3 Seiten-Signatur. Hängt sich per cdMotion.onEnter ein (läuft im gsap.context der Seite). */
(function(){
'use strict';
if(!window.cdMotion||!window.cdMotion.onEnter)return;
var M=window.cdMotion,root=document.documentElement,G=null,cur=null,live=[],seen={};
var COUNT='.sec-stat-val,.stat-val,.rm-prog-pill-val,.sec-hero-num,.cd-hero-stat dd';           /* Kennzahlen-Bänder */
var IMG='[class*=card] img,img.boss-img,img.craft-ico,img.item-ico,img.sk-ico';
var NUM=/^(\D*?)(\d{1,3}(?:\.\d{3})+|\d+)(\s*(?:\/\s*[\d.]+)?\D*)$/;      /* Präfix, Zahl (Tausenderpunkt), Suffix wie " %" oder "/ 175" */
function mob(){return window.innerWidth<=860}
function inView(el,f){var r=el.getBoundingClientRect();return r.width>0&&r.top<window.innerHeight*(f||1)&&r.bottom>0}
function list(x){return Array.prototype.slice.call(x)}

/* ---- Zähler: Endtext wird immer exakt wiederhergestellt, fremd geänderte Knoten bleiben unberührt ---- */
function put(c,v){
  var el=c.el;
  if(!el.isConnected||el.textContent!==c.last){fin(c);return}              /* ersetzt oder von der App geändert */
  if(v===c.v)return;c.v=v;
  el.textContent=c.last=c.pre+(c.dot?v.toLocaleString('de-DE'):v)+c.suf;      /* Suffix unverändert: Einzahl-Kürzen ließ den Kopf mobil umbrechen */
}
function fin(c){
  if(c.done)return;c.done=true;clearTimeout(c.to);if(c.tw)c.tw.kill();
  var el=c.el,i=live.indexOf(c);if(i>-1)live.splice(i,1);
  if(el.isConnected&&el.textContent===c.last)el.textContent=c.end;
  if(c.al&&el.getAttribute('aria-label')===c.end)el.removeAttribute('aria-label');
}
function count(el,delay,dur){
  var m=!el.childElementCount&&NUM.exec(el.textContent),n=m&&+m[2].replace(/\./g,'');
  if(!m||n<2||n>999999||/^0\d/.test(m[2]))return;                           /* nur echte Zahlen */
  var o={v:0},c={el:el,end:el.textContent,last:el.textContent,pre:m[1],suf:m[3],dot:m[2].indexOf('.')>-1,v:-1,al:!el.hasAttribute('aria-label')};
  if(c.al)el.setAttribute('aria-label',c.end);                              /* Endwert sofort für Screenreader */
  live.push(c);put(c,0);c.to=setTimeout(function(){fin(c)},3000);
  later(function(){                                                          /* erst nach dem ersten Bild starten, sonst verpufft der Zähler im Rendern großer Seiten */
    if(c.done)return;clearTimeout(c.to);
    c.tw=G.to(o,{v:n,duration:dur,delay:delay,ease:'power2.out',onUpdate:function(){put(c,Math.round(o.v))},onComplete:function(){fin(c)}});
    c.to=setTimeout(function(){fin(c)},(delay+dur+.2)*1000);                /* Zeit-Fallback, falls der Tween vom Kontext zurückgesetzt wird */
  });
}
function later(fn){requestAnimationFrame(function(){requestAnimationFrame(fn)})}

/* ---- Bilder in Karten: nur ungeladene weich einblenden (onerror-Logik der Bilder bleibt unberührt) ----
   Ohne Rect-Abfragen (content-visibility:auto erzwänge Layout je Karte): Geladene fallen sofort heraus, die ersten 120
   ungeladenen prüft ein IntersectionObserver asynchron, nur sein erster Befund zählt. */
var io=null;
function imgDone(e){var t=e.target;if(t&&t.tagName==='IMG'&&t.dataset.cdIw==='1')t.dataset.cdIw='0'}
function imgs(sec){
  if(io){io.disconnect();io=null}
  var all=sec.querySelectorAll(IMG),todo=[],i,im;
  for(i=0;i<all.length&&todo.length<120;i++){im=all[i];if(!im.complete&&im.dataset.cdIw==null)todo.push(im)}
  if(!todo.length||!window.IntersectionObserver)return;
  var o=io=new IntersectionObserver(function(es){
    var mark=[];o.disconnect();if(io===o)io=null;
    es.forEach(function(e){var im=e.target;if(e.isIntersecting&&mark.length<60&&!im.complete&&im.dataset.cdIw==null){im.dataset.cdIw='1';mark.push(im)}});
    if(mark.length)setTimeout(function(){mark.forEach(function(im){if(im.dataset.cdIw==='1')im.dataset.cdIw='0'})},6000);
  },{rootMargin:'0px 0px 60% 0px'});
  todo.forEach(function(im){o.observe(im)});
}

/* Inline-Werte räumen, aber nur wo welche stehen: gsap.set mit clearProps liest sonst getComputedStyle und
   erzwingt beim Seitenwechsel eine Stil-Neuberechnung des ganzen Dokuments */
function clr(x){x=x.filter(function(e){return e.style.transform||e.style.opacity});if(x.length)G.set(x,{clearProps:'transform,opacity'})}
/* ---- Sicherheitsnetz: alles Eigene sofort fertig ---- */
function finishAll(){
  live.slice().forEach(fin);
  if(cur&&G){cur.tl.kill();G.killTweensOf(cur.els);clr(cur.els);if(cur.sp)cur.sp.revert()}
  cur=null;if(io){io.disconnect();io=null}
  list(document.querySelectorAll('img[data-cd-iw="1"]')).forEach(function(im){im.dataset.cdIw='0'});
  list(document.querySelectorAll('.sec-t.cd-l0')).forEach(function(t){t.classList.remove('cd-l0')});
}

M.onEnter(function(id,sec,L){
  G=(L&&L.gsap)||window.gsap;if(!G||!sec)return;
  finishAll();
  var k=mob()?.5:1,P=function(x){return x*(k<1?.6:1)},D=function(x){return Math.max(.3,x*k)},
      tl=G.timeline({defaults:{ease:'power2.out'}}),my=cur={tl:tl,els:[],sp:null},
      first=!seen[id],cold=!!(L&&L.first);
  seen[id]=1;
  /* Erstes Laden (cold): Inhalt stand schon fertig da, bevor die Bibliotheken kamen. Nichts Sichtbares neu
     abspielen (wie A); die Titellinie zeichnet das CSS ohnehin beim ersten Paint. Beim Seitenwechsel wartet die
     Linie (cd-l0 = eingezogen) bis nach dem ersten Bild, damit sie auf großen Seiten nicht im Rendern verpufft. */
  var lt=!cold&&sec.querySelector('.sec-t');
  if(lt){var rm=function(){lt.classList.remove('cd-l0')};lt.classList.add('cd-l0');later(rm);setTimeout(rm,1500)}
  /* Fremde Tweens (A) auf meinen Elementen beenden und Inline-Werte räumen, dann gehören sie mir */
  function fresh(x){x=list(x);if(x.length){G.killTweensOf(x);clr(x);x.forEach(function(e){e.classList.remove('cdx-run')});my.els.push.apply(my.els,x)}return x}
  function from(x,v,pos){x=fresh(x);if(x.length){v.clearProps='transform,opacity';tl.from(x,v,pos)}}
  function unprep(e){return !e.classList.contains('cdx-wait')&&e.style.opacity===''&&!G.getTweensOf(e).length}   /* A hat diese Kachel nicht vorbereitet */

  if(id==='start'&&!cold){
    var h=sec.querySelector('#start-title'),tn=h&&list(h.childNodes).filter(function(n){return n.nodeType===3&&n.nodeValue.trim()})[0],tx=h&&h.querySelector('.cd-tt');
    if(!tx&&tn){tx=document.createElement('span');tx.className='cd-tt';h.replaceChild(tx,tn);tx.appendChild(tn)}   /* nur der Textteil, .sec-sym bleibt unberührt */
    if(tx&&L.SplitText){
      /* aria:'none': SplitText würde sonst textContent samt Zierzeichen als aria-label setzen; der Titel bleibt als Klartext lesbar, nach der Animation wird zurückgebaut */
      my.sp=L.SplitText.create(tx,{type:'words',mask:'words',wordsClass:'cd-w',aria:'none'});
      tl.from(my.sp.words,{yPercent:110,duration:D(.5),stagger:.05*k,ease:'power3.out',clearProps:'transform',
        onComplete:function(){if(my.sp)my.sp.revert()}},0);
    }
    fresh(sec.querySelectorAll('#start-root'));
    from(sec.querySelectorAll('.so-lead,.so-search'),{opacity:0,y:10*k,duration:D(.4),stagger:.08*k},P(.08));
    from(sec.querySelectorAll('.so-chip'),{opacity:0,y:8*k,duration:D(.35),stagger:.03*k},P(.18));
    /* Kacheln im Bild nur, wenn A sie nicht vorbereitet hat; die unterhalb des Bildes gehören dem Reveal von A */
    from(list(sec.querySelectorAll('.so-tile')).filter(function(e){return unprep(e)&&inView(e,.98)}).slice(0,12),{opacity:0,y:12*k,duration:D(.4),stagger:.03*k},P(.24));
  }
  if(id==='start'){
    /* Seitenzahlen der Kategorie-Köpfe: zählen beim Hereinscrollen (nur beim ersten Besuch; im Bild nicht beim Kaltstart) */
    if(first)list(sec.querySelectorAll('.so-cat-n')).forEach(function(n,i){
      var hd=n.closest('.so-cat-hd')||n;
      if(inView(hd,.95)){if(!cold)count(n,0,D(.6))}                       /* im Bild: zählt ab dem ersten Bild, ohne Wartezeit auf 0 */
      else if(L.ScrollTrigger)L.ScrollTrigger.create({trigger:hd,start:'top 92%',once:true,onEnter:function(){if(cur===my)count(n,0,D(.6))}});
    });
  }else if(first&&!cold){
    list(sec.querySelectorAll(COUNT)).slice(0,24).filter(function(e){return inView(e)}).slice(0,12).forEach(function(e){count(e,0,D(.6))});
  }
  imgs(sec);
});

/* Auslöser des Sicherheitsnetzes */
var si=document.getElementById('si'),mn=document.getElementById('main');
if(si)si.addEventListener('input',finishAll);
if(mn)mn.addEventListener('change',finishAll);
window.addEventListener('beforeprint',finishAll);
new MutationObserver(function(){if(!root.classList.contains('cd-motion'))finishAll()}).observe(root,{attributes:true,attributeFilter:['class']});
document.addEventListener('load',imgDone,true);document.addEventListener('error',imgDone,true);
})();
/* ---- B4: Lichtkegel, Filter-Neurender ---- */
(function(){
'use strict';
var H=document.documentElement;

/* Lichtkegel nach React Bits SpotlightCard, (c) David Haz, MIT+Commons Clause.
   EIN delegierter pointermove (passive, rAF) setzt --mx/--my an der Karte unter dem Zeiger. */
/* R2 Fundament: einziger Lichtkegel-Listener der Seite. Gilt für alle Karten (CD_SPOT_SEL aus dem Fundament-Kern, alles mit .cd-spot)
   und die Navigation (.leaf, .rail-item). Zielsuche und Schreiben erst im rAF: höchstens einmal je Bild. */
if(matchMedia('(hover:hover) and (pointer:fine)').matches){
  var SPOT=(window.CD_SPOT_SEL||'.so-tile,.so-chip,.pet-card,.grid>.card,.cd-spot')+',.leaf,.rail-item',px,py,pe,raf=0;
  var spot=function(){
    raf=0;var t=pe&&pe.closest&&pe.closest(SPOT);if(!t)return;
    var r=t.getBoundingClientRect();
    t.style.setProperty('--mx',(px-r.left)+'px');
    t.style.setProperty('--my',(py-r.top)+'px');
  };
  document.addEventListener('pointermove',function(e){
    if(e.pointerType!=='mouse'||!H.classList.contains('cd-motion'))return;
    px=e.clientX;py=e.clientY;pe=e.target;
    if(!raf)raf=requestAnimationFrame(spot);
  },{passive:true});
}

/* "Alle Details" (~100 Karten): ohne Übergang */
document.addEventListener('click',function(e){
  if(e.target.closest('#boss-more-all')){
    H.classList.add('cd-b4-still');setTimeout(function(){H.classList.remove('cd-b4-still')},700);
  }
},true);

/* Filter-Neurender: neue Karten im Bild (max. 24) blenden kurz ein */
var M=window.cdMotion;
if(!M)return;
var seen=new WeakSet(),tw=0,cur=[],BTN='.tab,.pet-filter-btn,.wpg-btn,.ruin-fbtn,.ichip,.cd-pill';
function cards(){
  var s=document.querySelector('.sec.active');
  return s?[].slice.call(s.querySelectorAll(M.REVEAL_SEL||'.card,.pet-card,.loc-card,.ruin-card')):[];
}
/* R2 Integration (Wunsch B8): Karten in einer schon sichtbaren Eltern-Karte ohne offsetParent abfragen. Die Abfrage erzwang
   je gesperrtem content-visibility-Block ein eigenes Layout (Trophäen: Seitenwechsel 58 -> 30 ms bei 1366). */
function snap(){var on=new Set(),sel=M.REVEAL_SEL||'.card';cards().forEach(function(c){var a=c.parentElement&&c.parentElement.closest(sel);if(a&&on.has(a)){if(!c.hidden&&!c.classList.contains('hide')){seen.add(c);on.add(c);}return;}if(c.offsetParent){seen.add(c);on.add(c);}})}
function stop(){
  if(tw)tw.kill();tw=0;
  cur.forEach(function(c){c.classList.remove('cd-b4-in')});
  if(cur.length)gsap.set(cur,{clearProps:'transform,opacity'});
  cur=[];
}
function run(){
  if(!M.on)return;
  var list=[],m=innerWidth<=860,vh=innerHeight,r,past=false;
  cards().forEach(function(c){
    if(seen.has(c)||!c.offsetParent||c.tagName==='TR')return;
    seen.add(c);
    if(!past&&list.length<24&&!c.closest('[data-cd-noreveal]')){
      r=c.getBoundingClientRect();
      if(r.top>=vh)past=true;else if(r.bottom>0)list.push(c);   /* Dokumentreihenfolge: ab der ersten Karte unter dem Bild keine Abfragen mehr */
    }
  });
  if(!list.length)return;
  stop();cur=list;
  list.forEach(function(c){c.classList.add('cd-b4-in')});
  /* nie ganz unsichtbar (ab 0,3 Deckkraft), Staffel klein: letzte Karte nach höchstens 0,28 s fertig */
  tw=gsap.fromTo(list,{opacity:.3,y:m?3:6},{opacity:1,y:0,duration:m?.16:.2,ease:'power2.out',
    stagger:{amount:m?.06:.08},clearProps:'transform,opacity',onComplete:stop,onInterrupt:stop});
  setTimeout(function(){if(cur===list)stop()},1200);
}
/* Auslöser: change an Select/Checkbox, Filter-Knöpfe; kein input-Event (Tippen flackert nicht) */
function trigger(e){
  var t=e.target;
  if(!M.on||!t.closest||!t.closest('#main'))return;
  if(e.type==='change'?!(t.tagName==='SELECT'||t.type==='checkbox'||t.type==='radio'):!t.closest(BTN))return;
  snap(); /* Stand vor dem Neurender */
  requestAnimationFrame(run);
}
document.addEventListener('change',trigger,true);
document.addEventListener('click',trigger,true);
/* R2 Abnahme: kein snap() mehr beim Seitenauftritt. trigger() ruft snap() ohnehin direkt vor jedem Filter-Neurender auf;
   der zusätzliche Lauf beim Seitenwechsel fragte offsetParent aller Karten ab (Fähigkeiten 390/CPU4: rund 50 ms im Seitenwechsel). */
addEventListener('beforeprint',stop);
})();
/* ==== /Motion B ==== */
