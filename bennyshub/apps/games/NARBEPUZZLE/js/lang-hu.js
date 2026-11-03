/**
 * Puzzle - Hungarian text. index.html loads exactly one lang-*.js file before
 * game.js; everything the game prints or says comes from here.
 */
window.PZL = {
    lang: 'hu',
    title: 'Puzzle',
    types: {
        strips: ['5 csík', '5 csík. A kép öt függőleges csíkra van vágva.'],
        quarters: ['4 négyzet', '4 négyzet. A kép négy részre van vágva.'],
        jigsaw: ['10 darab', 'Tízdarabos kirakó.']
    },
    piece: function (n) { return n + '. darab'; },
    slot: function (n) { return n + '. hely'; },
    choosePiece: 'Válassz egy darabot',
    chooseSlot: 'Válaszd ki a darab helyét',
    right: ['Ügyes! A darab a helyén van.', 'Nagyon jó!', 'Szuper! Ide illik.', 'Helyes!'],
    wrong: 'Ez nem ide illik. A darab visszakerül balra.',
    done: 'Gratulálok! Befejezted a puzzle-t!',
    hint: 'Szóköz röviden = tovább · Szóköz hosszan = vissza · Enter = kiválaszt',
    menu: {
        greeting: 'Puzzle. Válassz kirakót.',
        help: ['Hogyan kell játszani', 'Hogyan kell játszani.'],
        settings: ['Beállítások', 'Beállítások.'],
        exit: ['Kilépés', 'Kilépés. Vissza a központba.']
    },
    pause: {
        title: 'Szünet', button: 'Szünet', spoken: 'Szünet.',
        resume: ['Folytatás', 'Játék folytatása.'],
        settings: ['Beállítások', 'Beállítások.'],
        menu: ['Főmenü', 'Főmenü.'],
        exit: ['Kilépés', 'Kilépés. Vissza a központba.']
    },
    settings: {
        title: 'Beállítások',
        on: 'Be', off: 'Ki',
        tts: ['Felolvasás', 'Felolvasás bekapcsolva.', 'Felolvasás kikapcsolva.'],
        voice: ['Hang', function (v) { return 'Hang. ' + v + '.'; }],
        rate: ['Beszéd sebessége', function (r) { return 'Beszéd sebessége: ' + r + '.'; }],
        rateNames: { '0.5': 'Nagyon lassú', '0.65': 'Lassú', '0.8': 'Kicsit lassabb', '1': 'Normál', '1.2': 'Gyors' },
        ghost: ['Segítő kép', 'Segítő kép bekapcsolva. Halványan látszik a helyek mögött.', 'Segítő kép kikapcsolva.'],
        auto: ['Automatikus léptetés', 'Be — egy kapcsoló', 'Ki — két kapcsoló',
            'Automatikus léptetés bekapcsolva. Egy kapcsoló. A kiemelés magától lép, az Enter kiválaszt.',
            'Automatikus léptetés kikapcsolva. Két kapcsoló. A Szóköz lépteti a kiemelést, az Enter kiválaszt.'],
        speed: ['Léptetési sebesség', function (s) { return 'Léptetési sebesség: ' + s + '.'; }],
        sounds: ['Hangeffektek', 'Hangeffektek bekapcsolva.', 'Hangeffektek kikapcsolva.'],
        back: ['← Vissza', 'Vissza.']
    },
    helpScreen: {
        title: 'Hogyan kell játszani',
        titleSpoken: 'Hogyan kell játszani. Válaszd a címet, és felolvasom a leírást.',
        lines: [
            'Bal oldalon vannak az összekevert darabok. Jobb oldalon a számozott helyek.',
            'Válassz egy darabot, aztán válaszd ki a helyet, ahová illik.',
            'Ha a hely nem jó, a darab visszakerül balra, és újra próbálkozhatsz.',
            'A Szóköz lépteti a kiemelést, az Enter kiválaszt. Az utolsó hely után jön a Vissza, ha másik darabot választanál.',
            'Nincs pontszám, nincs időzítő, és nem lehet veszíteni.'
        ],
        back: ['Vissza', 'Vissza.']
    },
    goodbye: 'Viszlát!'
};
