/**
 * Feelings (Sentimente) - Romanian text. index.html loads exactly one lang-*.js
 * file before game.js; everything the game prints or says comes from here.
 */
window.NFL = {
    lang: 'ro',
    title: 'Sentimente',
    // Feeling ids match the picture file names in images/.
    feelings: {
        happy: 'fericit', sad: 'trist', afraid: 'speriat',
        surprised: 'surprins', sleepy: 'somnoros', angry: 'supărat'
    },
    question: function (f) { return 'Cine este ' + f + '?'; },
    // Spoken while scanning the faces. Never the feeling: that would give the answer away.
    faceLabel: function (n) { return 'Fața ' + n; },
    cheers: ['Bravo!', 'Foarte bine!', 'Super!', 'Corect!', 'Ura!'],
    right: function (cheer, f) { return cheer + ' Este ' + f + '.'; },
    wrong: function (chosen, target) { return 'Acesta este ' + chosen + '. Cine este ' + target + '?'; },

    hint: 'Space scurt = înainte · Space ținut = înapoi · Enter = alege',
    menu: {
        greeting: 'Sentimente. Alege Joacă pentru a începe.',
        play: ['Joacă', 'Joacă. Hai să începem!'],
        help: ['Cum se joacă', 'Cum se joacă.'],
        settings: ['Setări', 'Setări.'],
        exit: ['Ieșire', 'Ieșire. Te întorci la meniul principal al aplicației.']
    },
    pause: {
        title: 'Pauză',
        button: 'Pauză',
        spoken: 'Pauză.',
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
            'Jocul te întreabă cine simte ceva, de exemplu: Cine este trist?',
            'Vezi trei fețe. Alege fața care se simte așa.',
            'Space mută evidențierea, iar Enter alege.',
            'Dacă alegi altă față, jocul îți spune ce arată ea și te întreabă din nou.',
            'Nu există scor, nici cronometru și nu poți pierde.'
        ],
        back: ['Înapoi', 'Înapoi.']
    },
    goodbye: 'La revedere!'
};
