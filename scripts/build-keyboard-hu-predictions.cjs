// Builds the Hungarian base vocabulary for the web keyboard.
// Usage: node scripts/build-keyboard-hu-predictions.cjs
// Writes bennyshub/apps/tools/keyboard/hu_predictions.json. Edit the lists below, then re-run.
const fs = require('fs');
const path = require('path');
const OUT = path.join(__dirname, '..', 'bennyshub/apps/tools/keyboard/hu_predictions.json');

// Ordered roughly by usefulness/frequency for everyday AAC communication.
const words = `
IGEN NEM ÉN TE Ő MI TI ŐK ÉS VAGY DE HOGY IS MÁR MÉG CSAK EZ AZ EZT AZT ITT OTT
VAN NINCS VAGYOK VAGY VAGYUNK VOLT LESZ KELL LEHET TUDOK TUDSZ TUD AKAROK AKARSZ AKAR SZERETNÉK
SEGÍTSÉG KÉREM KÉRLEK KÖSZÖNÖM KÖSZI SZIA SZIASZTOK HELLÓ JÓ ROSSZ NAGYON TÖBB KEVÉS MOST MA
HOLNAP TEGNAP REGGEL ESTE ÉJSZAKA NAP ÓRA IDŐ MIKOR HOL KI MI MIT HOGYAN MIÉRT MENNYI MELYIK
BE KI FEL LE VELED VELEM NÁLAM NÁLAD OTTHON HAZA ELŐTT UTÁN ALATT FÖLÖTT MELLETT NÉLKÜL
ANYA APA ANYUKA APUKA MAMA PAPA TESÓ TESTVÉR BÁTYÁM NŐVÉREM ÖCSÉM HÚGOM NAGYMAMA NAGYAPA
CSALÁD BARÁT BARÁTOM ORVOS NŐVÉR TANÁR TANÍTÓ
VÍZ VIZET ÜDÍTŐ TEJ TEA KÁVÉ KENYÉR ÉTEL LEVES HÚS CSIRKE HAL TOJÁS SAJT GYÜMÖLCS ALMA BANÁN
NARANCS SÜTI SÜTEMÉNY CSOKI CSOKOLÁDÉ KEKSZ FAGYI FAGYLALT PIZZA KRUMPLI RIZS TÉSZTA ZÖLDSÉG SALÁTA
ESZEM ISZOM ALSZOM MEGYEK ÜLÖK JÖVÖK JÁTSZOM OLVASOK ÍROK HALLGATOK LÁTOM HALLOM ÉRZEM TUDOM
ENNI INNI ALUDNI MENNI JÁTSZANI NÉZNI CSINÁL CSINÁLOK MONDOK MOND ADD VEDD TEDD MUTASD KERESEM
FÁJ ÉHES SZOMJAS FÁZOM MELEGEM ÁLMOS FÉLEK BETEG FÁRADT BOLDOG SZOMORÚ MÉRGES NYUGODT VIDÁM
FEJ FEJEM HAS HASAM HÁT HÁTAM LÁB LÁBAM KÉZ KEZEM SZEM FÜL TOROK FOG FOGAM ORR SZÁJ SZÍV
VÉCÉ FÜRDŐ FÜRDŐSZOBA ÁGY SZOBA KONYHA ASZTAL SZÉK ABLAK AJTÓ LÁMPA TÉVÉ TV TELEFON TABLET
SZÁMÍTÓGÉP ZENE FILM MESE RAJZFILM KÖNYV JÁTÉK LABDA KINT PARK BOLT ISKOLA KÓRHÁZ
AUTÓ BUSZ SÉTA NYARALÁS HÁZ KERT KUTYA MACSKA
SZERETEM NEM SZERETEM SZERETLEK TETSZIK NEM TETSZIK VÁRJ ÁLLJ KÉSZ ÚJRA MÁSIK MÁST SEMMI MINDEN
MINDENKI SENKI VALAKI VALAMI VALAHOL MINDIG SOHA
EGY KETTŐ HÁROM NÉGY ÖT HAT HÉT NYOLC KILENC TÍZ
PIROS KÉK ZÖLD SÁRGA FEKETE FEHÉR LILA RÓZSASZÍN NARANCSSÁRGA NAGY KICSI ÚJ RÉGI SZÉP
NEHÉZ KÖNNYŰ GYORS GYORSAN LASSAN FENT LENT BAL JOBB BENT KÖZEL MESSZE
MERT HA AKKOR TALÁN BIZTOS NEM TUDOM NEM TUDOK
JÓ REGGELT JÓ NAPOT JÓ ESTÉT JÓ ÉJSZAKÁT VISZLÁT MIZU HOGY VAGY JÓL VAGYOK
BOCSÁNAT SAJNÁLOM GRATULÁLOK BOLDOG SZÜLETÉSNAPOT JÓ ÉTVÁGYAT EGÉSZSÉGEDRE
KAPCSOLD NYISD CSUKD INDÍTSD ÁLLÍTSD ISMÉTELD PRÓBÁLD GYERE GYERÜNK MONDD
`.split(/\s+/).filter(Boolean);

// Common phrases: each consecutive pair becomes a bigram, each triple a trigram.
const phrases = `
SEGÍTSÉGRE VAN SZÜKSÉGEM
VIZET KÉREK
INNI SZERETNÉK
ENNI SZERETNÉK
ALUDNI SZERETNÉK
KI SZERETNÉK MENNI
HAZA SZERETNÉK MENNI
JÁTSZANI SZERETNÉK
FILMET SZERETNÉK NÉZNI
ZENÉT SZERETNÉK HALLGATNI
VÉCÉRE KELL MENNEM
NEM AKAROK ENNI
FÁJ A FEJEM
FÁJ A HASAM
FÁJ A HÁTAM
ÉHES VAGYOK
SZOMJAS VAGYOK
FÁRADT VAGYOK
BOLDOG VAGYOK
JÓL VAGYOK
FÁZOM
MELEGEM VAN
ÁLMOS VAGYOK
FÉLEK
SZERETLEK ANYA
SZERETLEK APA
KÖSZÖNÖM SZÉPEN
NAGYON KÖSZÖNÖM
JÓ REGGELT
JÓ NAPOT
JÓ ESTÉT
JÓ ÉJSZAKÁT
HOGY VAGY
NEM TUDOM
NEM TUDOK
SAJNÁLOM
NAGYON TETSZIK
NEM TETSZIK
SEGÍTENÉL KÉRLEK
GYERE IDE KÉRLEK
MI EZ
HOL VAN ANYA
HOL VAN APA
MIKOR MEGYÜNK HAZA
KAPCSOLD BE A TÉVÉT
VÁLTS CSATORNÁT KÉRLEK
JÓ ÉTVÁGYAT
BOLDOG SZÜLETÉSNAPOT
ANYA GYERE IDE
ANYA SZERETLEK
ANYA SEGÍTS
ANYA HOL VAGY
ANYA VIZET KÉREK
ANYA ÉHES VAGYOK
APA GYERE IDE
APA SZERETLEK
APA HOL VAGY
APA JÁTSSZUNK
`.trim().split('\n').map(p => p.trim().split(/\s+/));

// Base entries are dated well in the past so anything Ben types ranks above them.
const BASE_DATE = '2025-01-01T00:00:00.000Z';
const data = { frequent_words: {}, bigrams: {}, trigrams: {} };
const add = (table, key, count) => {
  if (!table[key]) table[key] = { count, last_used: BASE_DATE };
  else table[key].count = Math.max(table[key].count, count);
};
words.forEach((w, i) => add(data.frequent_words, w, Math.max(1000 - i * 2, 50)));
for (const p of phrases) {
  p.forEach(w => add(data.frequent_words, w, 100));
  for (let i = 1; i < p.length; i++) add(data.bigrams, `${p[i - 1]} ${p[i]}`, 200);
  for (let i = 2; i < p.length; i++) add(data.trigrams, `${p[i - 2]} ${p[i - 1]} ${p[i]}`, 300);
}

// Every entry must be typeable on the Hungarian keyboard (no Q, W, X, no hyphen).
const bad = Object.keys(data.frequent_words).filter(w => /[^A-ZÁÉÍÓÖŐÚÜŰ]|[QWX]/.test(w));
if (bad.length) throw new Error('Untypeable words: ' + bad.join(', '));

fs.writeFileSync(OUT, JSON.stringify(data, null, 1) + '\n');
console.log(`words ${Object.keys(data.frequent_words).length}, bigrams ${Object.keys(data.bigrams).length}, trigrams ${Object.keys(data.trigrams).length}`);
