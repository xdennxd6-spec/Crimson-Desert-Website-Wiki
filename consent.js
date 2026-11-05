/* Crimson Desert Wiki: Cookie- und Speicherauswahl (Aufbau wie im Epitome-Wiki, 05.11.2026).
   Optional ist nur „Darstellung merken“. Fortschritt, Navigation und Besucherstatistik laufen immer und sind im Dialog
   so beschrieben (Entscheidung des Betreibers). Wer hier etwas ändert, gleicht den Dialogtext an.
   Die Sperre sitzt in Storage.setItem, damit lsSet und direkte Aufrufe gleich behandelt werden. Gesperrte Werte bleiben
   für die laufende Seite im Speicher und werden bei einer Zustimmung nachgetragen. */
(function () {
  'use strict';
  var COOKIE = 'crimson_consent';
  var MAX_AGE = 60 * 60 * 24 * 180;
  var OPTIONAL = ['cd_theme', 'cd_motion', 'cd_console_collapsed', 'cd_r2_b11_plat'];

  function parse() {
    var m = document.cookie.match(new RegExp('(?:^|;\\s*)' + COOKIE + '=([^;]+)'));
    if (!m) return null;
    var p = decodeURIComponent(m[1]).split('.');
    return p.length === 2 && p[0] === 'v1' && (p[1] === '0' || p[1] === '1') ? { preferences: p[1] === '1' } : null;
  }

  var choice = parse();
  var pending = {};
  var store = null;
  try { store = window.localStorage; } catch (e) { /* Speicher gesperrt */ }
  var hasPref = function () { return !!(choice && choice.preferences); };

  if (store) {
    var setItem = Storage.prototype.setItem;
    Storage.prototype.setItem = function (key, value) {
      if (this === store && OPTIONAL.indexOf(String(key)) !== -1 && !hasPref()) {
        pending[key] = String(value);
        return;
      }
      return setItem.apply(this, arguments);
    };
  }

  function clearOptional() {
    pending = {};
    if (!store) return;
    OPTIONAL.forEach(function (k) { try { store.removeItem(k); } catch (e) { /* egal */ } });
  }

  function flushPending() {
    if (!store) return;
    Object.keys(pending).forEach(function (k) { try { store.setItem(k, pending[k]); } catch (e) { /* egal */ } });
    pending = {};
  }

  function build() {
    var banner = document.createElement('section');
    banner.className = 'cd-consent';
    banner.hidden = !!choice;
    banner.setAttribute('aria-label', 'Cookie- und Speicherauswahl');
    banner.innerHTML =
      '<div class="cd-consent__copy">' +
        '<span class="cd-consent__eyebrow">Deine Datenwahl</span>' +
        '<h2>Was darf dieses Wiki speichern?</h2>' +
        '<p>Notwendige Sicherheitsfunktionen können Cookies setzen. Dein Fortschritt und die anonyme Besucherstatistik laufen immer. Das Merken deiner Darstellung bleibt aus, bis du zustimmst. ' +
        '<button type="button" class="cd-consent__text-button" data-consent-open>Details ansehen</button></p>' +
      '</div>' +
      '<div class="cd-consent__actions">' +
        '<button type="button" class="cd-consent__button" data-consent-action="necessary">Nur notwendige</button>' +
        '<button type="button" class="cd-consent__button" data-consent-open>Einstellungen</button>' +
        '<button type="button" class="cd-consent__button cd-consent__button--primary" data-consent-action="all">Alle akzeptieren</button>' +
      '</div>';
    document.body.appendChild(banner);

    var dialog = document.createElement('dialog');
    dialog.className = 'cd-consent-dialog';
    dialog.setAttribute('aria-labelledby', 'cd-consent-title');
    dialog.innerHTML =
      '<form method="dialog" class="cd-consent-dialog__inner">' +
        '<button class="cd-consent-dialog__close" value="close" aria-label="Schließen">×</button>' +
        '<span class="cd-consent__eyebrow">Datenschutz im Crimson Desert Wiki</span>' +
        '<h2 id="cd-consent-title">Cookies &amp; lokale Speicherung</h2>' +
        '<p class="cd-consent-dialog__intro">Du kannst deine Auswahl jederzeit über „Cookie-Einstellungen“ im Menü ändern.</p>' +
        '<section class="cd-consent-detail">' +
          '<h3>Notwendig · immer aktiv</h3>' +
          '<p>Cloudflare schützt und liefert die Website aus. Je nach Sicherheitslage kann Cloudflare dabei Sicherheits-Cookies wie <code>__cf_bm</code> (Bot-Schutz) oder nach einer Sicherheitsprüfung <code>cf_clearance</code> setzen. <a href="https://developers.cloudflare.com/fundamentals/reference/policies-compliances/cloudflare-cookies/" target="_blank" rel="noopener noreferrer">Cloudflares Cookie-Erklärung</a>. Der Webserver führt Zugriffs- und Fehlerprotokolle.</p>' +
          '<p>Deine Auswahl merken wir für 180 Tage im eigenen Cookie <code>crimson_consent</code>. Abgehakter Fortschritt, Notizen, Merkliste, zuletzt besuchte Seiten und ähnliche Funktionen liegen im Local Storage deines Browsers und verlassen ihn nicht, außer du nutzt den Sync.</p>' +
        '</section>' +
        '<section class="cd-consent-detail">' +
          '<h3>Besucherstatistik · immer aktiv</h3>' +
          '<p>Das Wiki zählt Besuche und führt anonyme Tagessummen auf dem eigenen Server: aufgerufene Seiten, aktive Verweildauer, Einstiegsseite, Herkunft (nur Domain bzw. Suchmaschine), Gerätetyp, Sprache und Land. Der Zählerdienst speichert keine IP-Adressen und keine Einzelbesuche.</p>' +
          '<p>Dafür liegen im Browser eine zufällige Sitzungskennung (Session Storage, endet mit dem Tab), die an den Server geht, um Anwesende zu zählen, sowie ein Zeitstempel und die genannten Merkmale (Local Storage, <code>cd_st_ts</code> und <code>cd_st_k</code>). Die Auswahl in diesem Fenster ändert daran nichts.</p>' +
        '</section>' +
        '<section class="cd-consent-detail">' +
          '<h3>Externe Dienste</h3>' +
          '<p>Die Karte von MapGenie wird erst geladen, wenn du die Kartenseite öffnest. Dabei erhält MapGenie deine IP-Adresse und kann eigene Cookies setzen. Der Link „Read in English“ führt zu Google Translate und wird erst beim Anklicken aufgerufen.</p>' +
        '</section>' +
        '<label class="cd-consent-option"><span><strong>Darstellung merken</strong><small>Speichert Farbschema, Bewegung, eingeklappte Seitenleiste und Plattformfilter im Local Storage, bis du sie löschst oder deine Einwilligung widerrufst. Ohne Zustimmung gilt deine Wahl nur, bis du die Seite verlässt.</small></span><input id="cd-consent-preferences" type="checkbox"></label>' +
        '<p class="cd-consent-dialog__note">Es gibt keine Werbe- oder seitenübergreifenden Analyse-Cookies.</p>' +
        '<div class="cd-consent__actions cd-consent__actions--dialog">' +
          '<button type="button" class="cd-consent__button" data-consent-action="necessary">Nur notwendige</button>' +
          '<button type="button" class="cd-consent__button" data-consent-action="save">Auswahl speichern</button>' +
          '<button type="button" class="cd-consent__button cd-consent__button--primary" data-consent-action="all">Alle akzeptieren</button>' +
        '</div>' +
      '</form>';
    document.body.appendChild(dialog);

    var box = dialog.querySelector('#cd-consent-preferences');

    function openSettings() {
      box.checked = hasPref();
      if (!dialog.open) dialog.showModal();
    }

    function save(preferences) {
      choice = { preferences: !!preferences };
      var secure = location.protocol === 'https:' ? '; Secure' : '';
      document.cookie = COOKIE + '=v1.' + (+choice.preferences) + '; Max-Age=' + MAX_AGE + '; Path=/; SameSite=Lax' + secure;
      if (choice.preferences) flushPending(); else clearOptional();
      banner.hidden = true;
      if (dialog.open) dialog.close();
    }

    document.addEventListener('click', function (ev) {
      var t = ev.target;
      if (!t || !t.closest) return;
      if (t.closest('[data-consent-open]')) { ev.preventDefault(); openSettings(); return; }
      var a = t.closest('[data-consent-action]');
      if (!a) return;
      var action = a.getAttribute('data-consent-action');
      if (action === 'all') save(true);
      else if (action === 'necessary') save(false);
      else if (action === 'save') save(box.checked);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build, { once: true });
  else build();
})();
