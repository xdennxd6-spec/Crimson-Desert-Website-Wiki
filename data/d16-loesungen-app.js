// d16-loesungen-app.js: hängt die Lösungsabschnitte aus LOESUNGEN (data/d16-loesungen.js) in die App ein (Lauf quest-loesungen, 14.11.2026).
// Klassisches Script, steht in index.html direkt nach data/d16-loesungen.js (vor dem Fundament-Script). Es definiert nur Funktionen und
// startet einen MutationObserver auf #main; die Fundament-Helfer (cdEsc, cdFold, cdFoldFill, cdFacts, cdNote, cdSrc, cdGoLink, cdIcon)
// werden erst beim Einhängen aufgerufen, dann sind sie geladen.
//
// Vertrag je Eintrag (Feldliste im Kopf von d16-loesungen.js):
//   sec  = Seiten-ID der App (#sec-<sec>), ziel = id (oder data-go-id) der vorhandenen Karte in dieser Seite.
//          Faltkarte (.cd-fold): Die Lösung kommt als <section class="loes" id="loes-<slug>"> ans Ende von .cd-fold-body, sobald
//          der (lazy) Inhalt existiert (Öffnen, Such-Öffnung, cdGo; vorher nur data-s); oben im Inhalt steht eine Zeile
//          .loes-top mit Sprunglinks zu allen Lösungen dieser Karte. Andere Karten: Lösung ans Ende der Karte.
//          data-s der Karte bekommt den Volltext der Lösung (Kurzantwort, Schritte, Suchbegriffe ...), damit die App-Suche trifft.
//   ziel = null: eigene schlanke Faltkarte (id loes-karte-<slug>, Inhalt sofort im DOM) im Behälter #loes-extra-<sec>.
//          Der Behälter steht hinter dem Element, das ort (CSS-Selektor in #sec-<sec>) trifft, sonst am Ende der Seite vor dem
//          SEO-Block „Mehr zu diesem Thema“ (aside.seo-more) bzw. als letztes Kind von #sec-<sec>.
//   tab  = optional: Reiter der Seite (wie #sec=quests&tab=mq); nur für Adressen (SEO-Link #sec=quests&tab=mq&go=loes-…).
//          Beim Sprung aktiviert cdGo den Reiter selbst (_cdGoOpen schaltet das .pane der gefundenen Lösung sichtbar).
//   abgrenzung = optional Satz „Nicht verwechseln“; abgrenzungLink = optional {sec, go?, text, seite?}: Link dazu (App: cdGoLink(sec,go,text),
//          SEO-Seite: /<seite>).
//   links = optional [{sec, ziel, wo?}]: weitere Stellen (K6), die einen kurzen Link „Lösung: <de>“ bekommen. ziel = id, data-go-id
//          oder CSS-Selektor (beginnt mit [ # .) in #sec-<sec>. Faltkarten: Zeile .loes-top oben im Inhalt; wo:"nach" = als
//          eigener Absatz direkt hinter dem Element; sonst ans Ende des Elements (bei Bosskarten in den Detailteil).
// Sprung: #sec=<sec>&go=loes-<slug> bzw. cdGoLink(sec,'loes-<slug>',…). Findet cdGo die Lösung nicht sofort (Seite noch nicht
// gerendert, Reiter lazy), hängt der Handler auf 'cd-go-miss' sie ein; cdGo sucht danach noch 1,2 s weiter.
// Wiederholtes Rendern/Filtern: der MutationObserver hängt neu gerenderte Karten wieder ein; jede Lösung steht höchstens einmal im DOM.

var LOES_IDX = {};
(function(){ if(typeof LOESUNGEN!=='undefined'&&Array.isArray(LOESUNGEN))LOESUNGEN.forEach(function(e){ if(e&&e.slug)LOES_IDX[e.slug]=e; }); })();

function _loesL(x){ return Array.isArray(x)?x.filter(function(v){return v!=null&&v!=='';}):(x==null||x===''?[]:[x]); }
function _loesDatum(d){ var m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(String(d||'')); return m?m[3]+'.'+m[2]+'.'+m[1]:String(d||''); }
/* Volltext für data-s (wird kleingeschrieben) */
function loesText(e){
  if(!e)return '';
  var t=['Lösung',e.de,e.en,e.kurz,e.abgrenzung].concat(_loesL(e.voraussetzung),_loesL(e.belohnung),_loesL(e.suchbegriffe));
  _loesL(e.schritte).forEach(function(s){ if(typeof s==='object'){t.push(s.t,s.d);} else t.push(s); });
  _loesL(e.hinweise).forEach(function(h){ t.push(typeof h==='object'?h.txt:h); });
  return t.filter(Boolean).join(' ').replace(/\s+/g,' ').trim();
}
function _loesListe(arr){
  arr=_loesL(arr); if(!arr.length)return '';
  return arr.length===1?{h:cdEsc(arr[0])}:{h:'<ul class="loes-l">'+arr.map(function(x){return '<li>'+cdEsc(x)+'</li>';}).join('')+'</ul>'};
}
var LOES_HINWEIS_TITEL={info:'Hinweis',warn:'Achtung',miss:'Verpassbar'};
/* Der Lösungsabschnitt (App). h = Überschriftenebene (Standard 4, in Faltkarten mit h3-Titel). */
function loesHtml(e,h){
  if(!e||!e.slug)return '';
  h=Math.min(6,Math.max(3,+h||4));
  var id='loes-'+e.slug,steps=_loesL(e.schritte),unb=steps.filter(function(s){return s&&s.conf==='einzelquelle';}).length;
  var lage=e.conf==='einzelquelle'?'eine Quelle, unbestätigt':'belegt (mindestens zwei übereinstimmende Quellen)';
  if(e.conf!=='einzelquelle'&&unb)lage+='; '+unb+(unb===1?' Schritt':' Schritte')+' nur aus einer Quelle (grau markiert)';
  var html='<section class="loes" id="'+id+'" data-go-id="'+id+'" aria-labelledby="'+id+'-h">'
    +'<h'+h+' class="loes-h" id="'+id+'-h"><span class="loes-k">Lösung:</span> '+cdEsc(e.de)+'</h'+h+'>'
    +(e.en&&e.en!==e.de?'<p class="loes-en" lang="en">'+cdEsc(e.en)+'</p>':'')
    +(e.kurz?'<p class="loes-kurz">'+cdEsc(e.kurz)+'</p>':'')
    +(e.abgrenzung?cdNote({h:cdEsc(e.abgrenzung)+(e.abgrenzungLink&&e.abgrenzungLink.sec?' '+cdGoLink(e.abgrenzungLink.sec,e.abgrenzungLink.go||'',e.abgrenzungLink.text||'Ansehen'):'')},{kind:'info',title:'Nicht verwechseln',cls:'loes-note loes-abgr'}):'')
    +cdFacts([['Voraussetzung',_loesListe(e.voraussetzung)],['Belohnung',_loesListe(e.belohnung)],['Quellenlage',lage]],{cls:'loes-facts'});
  if(steps.length){
    html+='<ol class="cd-stepper loes-steps">'+steps.map(function(s){
      if(typeof s!=='object')s={d:String(s)};
      var u=s.conf==='einzelquelle';
      return '<li'+(u?' class="loes-st-unb"':'')+'>'+(s.t?'<span class="cd-step-t">'+cdEsc(s.t)+'</span>':'')
        +(s.d?'<span class="cd-step-d">'+cdEsc(s.d)+'</span>':'')
        +(u?'<span class="loes-unb">eine Quelle, unbestätigt</span>':'')+'</li>';
    }).join('')+'</ol>';
  }
  _loesL(e.hinweise).forEach(function(n){
    if(typeof n!=='object')n={kind:'info',txt:String(n)};
    var k=n.kind==='warn'||n.kind==='miss'?n.kind:'info';
    html+=cdNote(n.txt,{kind:k,title:n.title||LOES_HINWEIS_TITEL[k],cls:'loes-note'});
  });
  var q=_loesL(e.quellen);
  if(q.length){
    var ds=q.map(function(x){return x&&x.datum;}).filter(Boolean),d=ds.length&&ds.every(function(x){return x===ds[0];})?ds[0]:'';
    html+=cdSrc(q.map(function(x){return typeof x==='object'?{t:x.t||x.url,url:x.url}:x;}),d?'Quellen, nachgelesen am '+_loesDatum(d):'Quellen');
  }
  return html+'</section>';
}
/* Ziel-Element in der Seite: id, data-go-id oder CSS-Selektor */
function _loesZiel(sec,ziel){
  if(!ziel)return null;
  var root=document.getElementById('sec-'+sec);if(!root)return null;
  var z=String(ziel),el=null;
  if(/^[\[#.]/.test(z)){ try{el=root.querySelector(z);}catch(err){el=null;} return el; }
  el=document.getElementById(z);
  if(el&&root.contains(el))return el;
  el=root.querySelector('[data-go-id="'+z.replace(/["\\]/g,'\\$&')+'"]');
  return el||null;
}
function _loesLazy(el){ return !!(el&&el.classList&&el.classList.contains('cd-fold')&&el.hasAttribute('data-cd-lazy')); }
function _loesKoerper(el){
  if(el.classList&&el.classList.contains('cd-fold')){
    return el.querySelector(':scope>.cd-fold-body')||el;
  }
  /* Set-Karte (armorsets, details.set-more) und Reittierkarte (mounts, details.mount-notes): Lösung in deren zugeklappten Detailteil */
  return el.querySelector('.item-more-body')||el.querySelector('.set-more-body,.mount-notes-body')||el;
}
function _loesLink(e){ return cdGoLink(e.sec,'loes-'+e.slug,e.de,'loes-go'); }
/* Zeile oben im Karteninhalt: alle Lösungen dieser Karte (eigene und verlinkte), sortiert wie LOESUNGEN */
function _loesTop(box,slugs){
  var es=slugs.map(function(s){return LOES_IDX[s];}).filter(Boolean);if(!es.length)return false;
  var html='<span class="loes-top-k">'+cdIcon('key')+'Schritt-für-Schritt-Lösung:</span> '+es.map(_loesLink).join('<span class="loes-top-sep" aria-hidden="true"> · </span>');
  var p=box.querySelector(':scope>.loes-top');
  if(p){ if(p.getAttribute('data-loes')===slugs.join(' '))return false; p.innerHTML=html; p.setAttribute('data-loes',slugs.join(' ')); return true; }
  p=document.createElement('p');p.className='loes-top';p.setAttribute('data-loes',slugs.join(' '));p.innerHTML=html;
  box.insertBefore(p,box.firstChild);return true;
}
function _loesSAdd(el,e){
  var have=' '+(el.getAttribute('data-loes-s')||'')+' ';
  if(have.indexOf(' '+e.slug+' ')>-1)return;
  if(el.hasAttribute('data-s'))el.setAttribute('data-s',(el.getAttribute('data-s')+' '+loesText(e)).toLowerCase());
  el.setAttribute('data-loes-s',(have.trim()+' '+e.slug).trim());
  delete el._sf; delete el._cdHead;
}
/* Behälter + Faltkarte für ziel:null */
function _loesExtra(e){
  var sec=document.getElementById('sec-'+e.sec);if(!sec)return false;
  if(document.getElementById('loes-karte-'+e.slug))return false;
  var cid='loes-extra-'+e.sec,box=document.getElementById(cid);
  if(!box){
    var nach=null;
    if(e.ort){ try{nach=sec.querySelector(e.ort);}catch(err){nach=null;} if(!nach)return false; }
    box=document.createElement('div');box.className='cd-folds loes-extra';box.id=cid;
    if(nach)nach.parentNode.insertBefore(box,nach.nextSibling);
    else{ var seo=sec.querySelector(':scope>aside.seo-more'); if(seo)sec.insertBefore(box,seo); else sec.appendChild(box); }
  }
  var n=_loesL(e.schritte).length;
  box.insertAdjacentHTML('beforeend',cdFold({id:'loes-karte-'+e.slug,title:e.de,lead:e.kurz||'',icon:'✎',tone:'gold',
    chips:[{t:'Lösung',c:'gold',i:'key'}].concat(n?[{v:n,t:n===1?'Schritt':'Schritte'}]:[]),
    s:loesText(e),body:loesHtml(e,4),cls:'loes-fold',attrs:{'data-loes-s':e.slug}}));
  return true;
}
var _loesBusy=false;
/* Ein Durchlauf: fehlende Lösungen und Links einhängen. Rückgabe: Anzahl Änderungen. */
function loesEinhaengen(){
  if(_loesBusy||typeof cdFold!=='function'||typeof LOESUNGEN==='undefined')return 0;
  _loesBusy=true;var n=0,tops=[],geaendert=[];
  try{
    var karten=new Map();
    LOESUNGEN.forEach(function(e){
      if(!e||!e.slug||!e.sec)return;
      if(e.ziel==null){ if(_loesExtra(e)){n++;geaendert.push(document.getElementById('sec-'+e.sec));} return; }
      var el=_loesZiel(e.sec,e.ziel);if(!el)return;
      if(!karten.has(el))karten.set(el,[]);karten.get(el).push({e:e,eigen:true});
    });
    LOESUNGEN.forEach(function(e){
      if(!e||!e.slug)return;
      _loesL(e.links).forEach(function(l){
        if(!l||!l.sec||!l.ziel)return;
        var el=_loesZiel(l.sec,l.ziel);if(!el)return;
        if(l.wo==='nach'){
          var nx=el.nextElementSibling;
          if(nx&&nx.classList.contains('loes-verweis')&&(' '+nx.getAttribute('data-loes')+' ').indexOf(' '+e.slug+' ')>-1)return;
          var p=document.createElement('p');p.className='loes-verweis';p.setAttribute('data-loes',e.slug);
          p.innerHTML='<span class="loes-top-k">'+cdIcon('key')+'Schritt-für-Schritt-Lösung:</span> '+_loesLink(e);
          el.parentNode.insertBefore(p,el.nextSibling);n++;return;
        }
        if(!karten.has(el))karten.set(el,[]);karten.get(el).push({e:e,eigen:false});
      });
    });
    karten.forEach(function(liste,el){
      /* Faltkarte noch nicht gefüllt (lazy): nur data-s ergänzen. Den Inhalt erzeugt cdFoldFill beim Öffnen, bei einer
         Such-Öffnung oder bei cdGo; der MutationObserver hängt die Lösung dann sofort ein (spart Renderzeit). */
      if(_loesLazy(el)){ liste.forEach(function(x){ if(x.eigen)_loesSAdd(el,x.e); }); return; }
      var box=null,slugs=[];
      liste.forEach(function(x){
        var e=x.e;slugs.push(e.slug);
        if(!x.eigen)return;
        if(document.getElementById('loes-'+e.slug)){ _loesSAdd(el,e); return; }
        box=box||_loesKoerper(el);
        box.insertAdjacentHTML('beforeend',loesHtml(e,4));
        _loesSAdd(el,e);n++;geaendert.push(el);
      });
      if(_loesTop(_loesKoerper(el),slugs))n++;
    });
    /* laufende Suche: Karten, deren data-s gerade gewachsen ist, neu bewerten */
    if(geaendert.length){
      var si=document.getElementById('si');
      if(si&&si.value.trim()&&typeof _reapplyActiveSearch==='function'){
        var secs=new Set();geaendert.forEach(function(x){var s=x&&x.closest&&x.closest('.sec');if(s)secs.add(s);});
        secs.forEach(function(s){try{_reapplyActiveSearch(s);}catch(err){}});
      }
    }
  }catch(err){ if(window.console)console.error('Lösungen einhängen:',err); }
  finally{ _loesBusy=false; }
  return n;
}
(function(){
  function start(){
    var main=document.getElementById('main');if(!main||main._loesMo)return;
    var mo=new MutationObserver(function(recs){
      for(var i=0;i<recs.length;i++){ if(recs[i].addedNodes&&recs[i].addedNodes.length){ loesEinhaengen(); return; } }
    });
    mo.observe(main,{childList:true,subtree:true});main._loesMo=mo;
    loesEinhaengen();
  }
  if(document.getElementById('main'))start(); else document.addEventListener('DOMContentLoaded',start);
  /* Sprung auf loes-<slug>, der nicht sofort gefunden wird: einhängen; cdGo sucht 1,2 s lang weiter */
  document.addEventListener('cd-go-miss',function(ev){
    var d=ev.detail||{},q=String(d.q||'');if(q.indexOf('loes-')!==0)return;
    var e=LOES_IDX[q.slice(5)];if(!e)return;
    var el=e.ziel!=null?_loesZiel(e.sec,e.ziel):null;
    if(_loesLazy(el)&&typeof cdFoldFill==='function')cdFoldFill(el);
    loesEinhaengen();
  });
  /* Nachführen: Nach einem Sprung auf eine Lösung wächst die Seite oft noch (lazy Reiter, content-visibility der Karten darüber),
     nachdem cdGo schon hingescrollt hat. Bis 5 s nach dem Sprung die Lösung oben halten, solange der Nutzer nicht selbst scrollt. */
  var halt=null,EV=['wheel','touchstart','keydown','pointerdown'];
  function halten(q){
    if(halt)halt();
    var t0=Date.now(),ruhig=0,aus=false,tm=null;
    function stop(){ aus=true;clearTimeout(tm);EV.forEach(function(n){window.removeEventListener(n,stop,true);});halt=null; }
    function tick(){
      if(aus)return;
      var el=document.getElementById(q);
      if(el&&el.getClientRects().length&&!el.closest('details:not([open])')){
        var off=window.cdMotion&&cdMotion.headerOffset?cdMotion.headerOffset():0,top=el.getBoundingClientRect().top-off;
        if(Math.abs(top)>24){ ruhig=0; if(window.cdMotion&&cdMotion.scrollTo)cdMotion.scrollTo(el,{immediate:true}); else el.scrollIntoView({block:'start'}); }
        else ruhig++;
      }
      if(Date.now()-t0>5000||ruhig>=5)return stop();
      tm=setTimeout(tick,250);
    }
    setTimeout(function(){ if(aus)return; EV.forEach(function(n){window.addEventListener(n,stop,true);}); tick(); },1600);
    halt=stop;
  }
  function ausHash(){ var m=/(?:^|[#&])go=(loes-[a-z0-9-]+)(?:&|$)/.exec(location.hash||''); if(m&&LOES_IDX[m[1].slice(5)])halten(m[1]); }
  ausHash();
  window.addEventListener('hashchange',ausHash);
  document.addEventListener('click',function(ev){
    var a=ev.target.closest&&ev.target.closest('a[data-goq^="loes-"]');
    if(a&&!ev.ctrlKey&&!ev.metaKey&&!ev.shiftKey&&!ev.altKey&&ev.button===0)halten(a.getAttribute('data-goq'));
  });
})();
