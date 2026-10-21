// Redesign 2 (21.10.2026): Szenen-Hintergruende fuer Karten und Seitenkoepfe.
// Schluessel-Schema und Technik: redesign-2/LEITPLANKEN.md Abschnitt 4, API: redesign-2/FUNDAMENT.md (cdScene).
// Eintrag: key: {f:'<datei>.webp' (relativ zu cd_assets/scenes/) oder Pfad mit '/', alt:'…', pos:'50% 40%', w:1280, h:720}
// Wird vom Integrator aus redesign-2/scenes/manifest-*.json erzeugt. Fehlt ein Schluessel, greift der naechste
// Schluessel der Kette bzw. die Farbflaeche mit Glyphe (cdScene-Rueckfall).
const SCENES={};
