/**
 * Puzzle - Romanian text. index.html loads exactly one lang-*.js file before
 * game.js; everything the game prints or says comes from here.
 */
window.PZL = {
    lang: 'ro',
    title: 'Puzzle',
    types: {
        strips: ['5 benzi', '5 benzi. Imaginea e tăiată în cinci benzi verticale.'],
        quarters: ['4 pătrate', '4 pătrate. Imaginea e tăiată în patru.'],
        jigsaw: ['10 piese', 'Puzzle cu 10 piese.']
    },
    piece: function (n) { return 'Piesa ' + n; },
    slot: function (n) { return 'Locul ' + n; },
    choosePiece: 'Alege o piesă',
    chooseSlot: 'Alege locul piesei',
    right: ['Bravo! Piesa e la locul ei.', 'Foarte bine!', 'Super! Se potrivește.', 'Corect!'],
    wrong: 'Nu se potrivește. Piesa se întoarce în stânga.',
    done: 'Felicitări! Ai terminat puzzle-ul!',
    hint: 'Space scurt = înainte · Space lung = înapoi · Enter = alege',
    menu: {
        greeting: 'Puzzle. Alege un tip de puzzle.',
        help: ['Cum se joacă', 'Cum se joacă.'],
        settings: ['Setări', 'Setări.'],
        exit: ['Ieșire', 'Ieșire. Te întorci la meniul principal al aplicației.']
    },
    pause: {
        title: 'Pauză', button: 'Pauză', spoken: 'Pauză.',
        resume: ['Continuă', 'Continuă jocul.'],
        settings: ['Setări', 'Setări.'],
        menu: ['Meniul principal', 'Meniul principal.'],
        exit: ['Ieșire', 'Ieșire. Te întorci la meniul principal al aplicației.']
    },
    settings: {
        title: 'Setări',
        on: 'Pornit', off: 'Oprit',
        tts: ['Citire cu voce', 'Citirea cu voce e pornită.', 'Citirea cu voce e oprită.'],
        voice: ['Voce', function (v) { return 'Voce. ' + v + '.'; }],
        rate: ['Viteza vocii', function (r) { return 'Viteza vocii: ' + r + '.'; }],
        rateNames: { '0.5': 'Foarte lentă', '0.65': 'Lentă', '0.8': 'Puțin mai lentă', '1': 'Normală', '1.2': 'Rapidă' },
        ghost: ['Imagine ajutătoare', 'Imaginea ajutătoare e pornită. Se vede palid în spatele locurilor.', 'Imaginea ajutătoare e oprită.'],
        auto: ['Scanare automată', 'Pornită — un buton', 'Oprită — două butoane',
            'Scanarea automată e pornită. Un buton. Evidențierea se mută singură, iar Enter alege.',
            'Scanarea automată e oprită. Două butoane. Space mută evidențierea, Enter alege.'],
        speed: ['Viteza scanării', function (s) { return 'Viteza scanării: ' + s + '.'; }],
        sounds: ['Efecte sonore', 'Efectele sonore sunt pornite.', 'Efectele sonore sunt oprite.'],
        back: ['← Înapoi', 'Înapoi.']
    },
    helpScreen: {
        title: 'Cum se joacă',
        titleSpoken: 'Cum se joacă. Alege titlul ca să asculți instrucțiunile.',
        lines: [
            'În stânga sunt piesele amestecate. În dreapta sunt locurile, numerotate.',
            'Alege o piesă, apoi alege locul unde se potrivește.',
            'Dacă locul nu e bun, piesa se întoarce în stânga și poți încerca din nou.',
            'Space mută evidențierea, iar Enter alege. După ultima piesă vine Înapoi, ca să alegi altă piesă.',
            'Nu există scor, nici cronometru și nu poți pierde.'
        ],
        back: ['Înapoi', 'Înapoi.']
    },
    goodbye: 'La revedere!'
};
