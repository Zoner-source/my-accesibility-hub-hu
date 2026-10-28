/**
 * Feelings (Érzelmek) - Hungarian text. index.html loads exactly one lang-*.js
 * file before game.js; everything the game prints or says comes from here.
 */
window.NFL = {
    lang: 'hu',
    title: 'Érzelmek',
    // Feeling ids match the picture file names in images/.
    feelings: {
        happy: 'vidám', sad: 'szomorú', afraid: 'ijedt',
        surprised: 'meglepett', sleepy: 'álmos', angry: 'mérges'
    },
    question: function (f) { return 'Ki ' + f + '?'; },
    // Spoken while scanning the faces. Never the feeling: that would give the answer away.
    faceLabel: function (n) { return n + '. arc'; },
    cheers: ['Ügyes!', 'Nagyon jó!', 'Szuper!', 'Helyes!', 'Hurrá!'],
    right: function (cheer, f) { return cheer + ' Ő ' + f + '.'; },
    wrong: function (chosen, target) { return 'Ő ' + chosen + '. Ki ' + target + '?'; },

    hint: 'Szóköz röviden = tovább · Szóköz hosszan = vissza · Enter = kiválaszt',
    menu: {
        greeting: 'Érzelmek. Válaszd a Játék gombot a kezdéshez.',
        play: ['Játék', 'Játék. Kezdjük!'],
        help: ['Hogyan kell játszani', 'Hogyan kell játszani.'],
        settings: ['Beállítások', 'Beállítások.'],
        exit: ['Kilépés', 'Kilépés. Vissza a központba.']
    },
    pause: {
        title: 'Szünet',
        button: 'Szünet',
        spoken: 'Szünet.',
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
            'A játék megkérdezi, ki érez valamit, például: Ki szomorú?',
            'Három arcot látsz. Válaszd ki azt, amelyik így érez.',
            'A Szóköz lépteti a kiemelést, az Enter kiválaszt.',
            'Ha mást választasz, a játék megmondja, mit mutat az az arc, és újra megkérdezi.',
            'Nincs pontszám, nincs időzítő, és nem lehet veszíteni.'
        ],
        back: ['Vissza', 'Vissza.']
    },
    goodbye: 'Viszlát!'
};
