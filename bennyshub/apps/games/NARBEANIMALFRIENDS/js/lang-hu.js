/**
 * NARBE Animal Friends - Hungarian text.
 *
 * Loaded before every other game module (see index.html). zones.js, facts.js,
 * settings.js, ui.js and main.js read it through NAF.L and fall back to their
 * built-in English wherever an entry is missing, so the game never goes silent
 * over a gap here.
 *
 * Facts mark the animal's own name as {shown|riddle}: a reveal reads the left
 * side, Listen and Find reads the right side, so a clue never names the answer
 * and the sentence stays grammatical either way. Facts that only work in
 * English (collective nouns such as "a parliament of owls") are replaced by
 * other true, kid-simple facts rather than translated word for word.
 */

window.NAF = window.NAF || {};

NAF.L = (function () {
    'use strict';

    // Interface text, keyed by the English it replaces. {x} marks a value
    // filled in by ui.js.
    const ui = {
        'On': 'Be',
        'Off': 'Ki',
        'Default': 'Alapértelmezett',
        'Pause': 'Szünet',
        'Pause.': 'Szünet.',
        'NARBE Animal Friends': 'Barátságos Állatok',
        'Tap Space = next · hold Space = back · Enter = choose':
            'Szóköz röviden = tovább · Szóköz hosszan = vissza · Enter = kiválaszt',
        'Which way would you like to play?': 'Hogyan szeretnél játszani?',
        'Settings': 'Beállítások',
        'Settings.': 'Beállítások.',
        'Paused': 'Szünet',
        'Paused.': 'Szünet.',
        'How to Play': 'Hogyan kell játszani',
        'How to play.': 'Hogyan kell játszani.',
        'How to play. Choose the title to hear the directions.':
            'Hogyan kell játszani. Válaszd a címet, és felolvasom a leírást.',
        'How to play. Choose this to hear the directions.':
            'Hogyan kell játszani. Válaszd ezt, és felolvasom a leírást.',
        'Visit the ': 'Irány: ',
        '{n} animals to meet.': '{n} állattal találkozhatsz.',
        'Exit Game': 'Kilépés',
        'Exit game. Goes back to the hub.': 'Kilépés. Vissza a központba.',
        'Press to see who comes out.': 'Nyomd meg, és nézd meg, ki jön ki.',
        'Pick an Animal': 'Válassz állatot',
        'Pick an animal. Choose who comes out.': 'Válassz állatot. Te döntöd el, ki jön ki.',
        'Listen and Find': 'Figyelj és keresd',
        'Listen and find. Hear an animal, then find it. Nothing to lose.':
            'Figyelj és keresd. Hallgasd meg a nyomot, aztán keresd meg az állatot. Nem lehet veszíteni.',
        'Back': 'Vissza',
        'Back.': 'Vissza.',
        'Back to the main menu.': 'Vissza a főmenübe.',
        'Continue': 'Folytatás',
        'Continue playing.': 'Játék folytatása.',
        'Play a Different Game': 'Másik játékmód',
        'Play a different game. Choose another way to play.': 'Másik játékmód. Válassz másik játékot.',
        'Main Menu': 'Főmenü',
        'Main menu.': 'Főmenü.',
        'Speaking': 'Felolvasás',
        'Speaking on. Everything is read aloud.': 'Felolvasás bekapcsolva. Mindent felolvasok.',
        'Speaking off.': 'Felolvasás kikapcsolva.',
        'Show Text': 'Szöveg mutatása',
        'Show text on. What is spoken is also written on the screen.':
            'Szöveg bekapcsolva. Amit mondok, az a képernyőn is megjelenik.',
        'Show text off. Everything is still read aloud.':
            'Szöveg kikapcsolva. Továbbra is mindent felolvasok.',
        'Voice': 'Hang',
        'Voice. {v}. This is the voice you will hear.': 'Hang. {v}. Ezt a hangot fogod hallani.',
        'Player Name': 'Játékos neve',
        'Not set': 'Nincs megadva',
        'Player name. {n}. The game says your name while you play.':
            'Játékos neve. {n}. A játék játék közben a neveden szólít.',
        'Player name. Someone else can type a name here, and the game will use it while you play.':
            'Játékos neve. Itt valaki beírhat egy nevet, és a játék játék közben használni fogja.',
        'Auto Scan': 'Automatikus léptetés',
        'On — One Switch': 'Be — egy kapcsoló',
        'Off — Two Switches': 'Ki — két kapcsoló',
        'Auto scan on. One switch. The highlight moves by itself and Enter chooses.':
            'Automatikus léptetés bekapcsolva. Egy kapcsoló. A kiemelés magától lép, az Enter kiválaszt.',
        'Auto scan off. Two switches. Space moves the highlight, Enter chooses.':
            'Automatikus léptetés kikapcsolva. Két kapcsoló. A Szóköz lépteti a kiemelést, az Enter kiválaszt.',
        'Scan Speed': 'Léptetési sebesség',
        'Scan speed {s}. How long you have to press.':
            'Léptetési sebesség: {s}. Ennyi időd van megnyomni.',
        'Highlight Style': 'Kiemelés stílusa',
        'Block': 'Kitöltés',
        'Bold Band': 'Vastag keret',
        'Highlight style, block. The whole button fills with colour.':
            'Kiemelés stílusa: kitöltés. Az egész gomb kiszíneződik.',
        'Highlight style, bold band. A thick band is drawn around the button.':
            'Kiemelés stílusa: vastag keret. Vastag keret jelenik meg a gomb körül.',
        'Highlight Color': 'Kiemelés színe',
        'Highlight color, {c}. This is the colour that shows you where you are.':
            'Kiemelés színe: {c}. Ez a szín mutatja, hol vagy.',
        'Animal Sounds': 'Állathangok',
        'Animal sounds on. You hear each animal when it comes out.':
            'Állathangok bekapcsolva. Minden állatot hallasz, amikor kijön.',
        "Animal sounds off. The animal's sound is spoken instead.":
            'Állathangok kikapcsolva. Az állat hangját helyette kimondom.',
        'Music': 'Zene',
        'Music on. It plays quietly behind the menus and while you play.':
            'Zene bekapcsolva. Halkan szól a menükben és játék közben.',
        'Music off.': 'Zene kikapcsolva.',
        'Graphics quality': 'Grafikai minőség',
        'Auto': 'Automatikus',
        'High': 'Magas',
        'Standard': 'Normál',
        'Use Hub setting': 'A központ beállítása',
        'full change next launch': 'teljesen a következő indításkor vált',
        'Low': 'Alacsony',
        'Player name. Scan to a row and choose it, then scan to a letter in that row and choose it to spell your name. Choose Done at any time to keep it.':
            'Játékos neve. Lépj egy sorra, és válaszd ki, aztán lépj egy betűre abban a sorban, és válaszd ki, így írhatod be a neved. A Kész gombbal bármikor elmentheted.',
        'Scan to a row and choose it, then scan to a letter and choose it to spell your name. Someone else can also choose letters with a touchscreen or a mouse. Choose Done to keep it.':
            'Lépj egy sorra, és válaszd ki, aztán lépj egy betűre, és válaszd ki, így írhatod be a neved. Valaki más érintőképernyővel vagy egérrel is választhat betűket. A Kész gombbal mentheted el.',
        'Spell a name below': 'Írj be egy nevet lent',
        'Player name': 'Játékos neve',
        'Space': 'Szóköz',
        'Backspace': 'Törlés',
        'Done': 'Kész',
        'Clear the Name': 'Név törlése',
        'Row: {r}.': 'Sor: {r}.',
        'and': 'és',
        'Done. Keeps the name and goes back.': 'Kész. Megtartja a nevet, és visszalép.',
        'Hello {n}!': 'Szia, {n}!',
        'Clear the name.': 'Név törlése.',
        'Name cleared.': 'Név törölve.',
        'Goodbye.': 'Viszlát!'
    };

    const helpLines = [
        'Válassz egy helyet: a pajtát, az akváriumot vagy a szafarit.',
        'Aztán nyisd ki. Kijön egy állat, hogy köszönjön.',
        '*Nyomd meg röviden a Szóközt* a kiemelés léptetéséhez. *Tartsd lenyomva a Szóközt* a visszalépéshez.',
        'Az *Enter* kiválasztja, ami ki van emelve.',
        'Válaszd a *Szünet* gombot, ha meg akarsz állni, vagy valamit módosítanál.',
        'A *Beállításokban* ki- és bekapcsolhatod a hangokat és a zenét, és módosíthatod a kiemelést és mást is.',
        'Nincs pontszám, nincs időzítő, és nem lehet veszíteni.'
    ];

    // Same order as HIGHLIGHT_COLORS in settings.js.
    const colors = ['Arany', 'Ciánkék', 'Kék', 'Világoszöld', 'Piros', 'Lila', 'Rózsaszín', 'Fehér', 'Fekete'];

    // The name keyboard, ABC order with the Hungarian accented letters.
    const keyRows = [
        ['A', 'Á', 'B', 'C', 'D', 'E'],
        ['É', 'F', 'G', 'H', 'I', 'Í'],
        ['J', 'K', 'L', 'M', 'N', 'O'],
        ['Ó', 'Ö', 'Ő', 'P', 'Q', 'R'],
        ['S', 'T', 'U', 'Ú', 'Ü', 'Ű'],
        ['V', 'W', 'X', 'Y', 'Z', '0'],
        ['1', '2', '3', '4', '5', '6'],
        ['7', '8', '9']
    ];

    const zones = {
        barn: {
            name: 'Pajta',
            words: {
                visit: 'Irány a pajta', visitPrefix: 'Irány a ', visitName: 'pajta', place: 'pajta',
                openLabel: 'Nyisd ki a pajtát', openSpoken: 'Nyisd ki a pajtát',
                inside: 'a pajtában', board: 'pajta'
            }
        },
        aquarium: {
            name: 'Akvárium',
            words: {
                visit: 'Irány az akvárium', visitPrefix: 'Irány az ', visitName: 'akvárium', place: 'medence',
                openLabel: 'Nyisd ki a medencét', openSpoken: 'Nyisd ki a medencét',
                inside: 'a medencében', board: 'akvárium'
            }
        },
        safari: {
            name: 'Szafari',
            words: {
                visit: 'Irány a szafari', visitPrefix: 'Irány a ', visitName: 'szafari', place: 'kapu',
                openLabel: 'Nyisd ki a kaput', openSpoken: 'Nyisd ki a kaput',
                inside: 'a kapu mögött', board: 'szafaripark'
            }
        }
    };

    // id: [name, sound word]
    const animals = {
        cow: ['Tehén', 'Bú'], pig: ['Malac', 'Röf-röf'], goat: ['Kecske', 'Mek-mek'],
        sheep: ['Birka', 'Bee'], horse: ['Ló', 'Nyihaha'], duck: ['Kacsa', 'Háp-háp'],
        rooster: ['Kakas', 'Kukurikú'], dog: ['Kutya', 'Vau-vau'], cat: ['Cica', 'Miaú'],
        owl: ['Bagoly', 'Huhu'], turkey: ['Pulyka', 'Hurukk'], bull: ['Bika', 'Prüssz'],
        llama: ['Láma', 'Hümm'], rabbit: ['Nyuszi', 'Dobb'], mouse: ['Egér', 'Cin-cin'],
        bee: ['Méhecske', 'Zümm'], frog: ['Béka', 'Brekeke'], butterfly: ['Pillangó', 'Röpp'],
        hedgehog: ['Süni', 'Szuszog'], squirrel: ['Mókus', 'Csiri-csiri'],
        fish: ['Hal', 'Blubb'], tropicalfish: ['Trópusi hal', 'Bluu'], blowfish: ['Gömbhal', 'Puff'],
        shark: ['Cápa', 'Hamm'], octopus: ['Polip', 'Placcs'], squid: ['Tintahal', 'Suhh'],
        crab: ['Rák', 'Csipp'], lobster: ['Homár', 'Katt'], shrimp: ['Garnélarák', 'Pöcc'],
        dolphin: ['Delfin', 'Iii-iii'], whale: ['Orka', 'Húúú'], bigwhale: ['Nagy bálna', 'Csobb'],
        seal: ['Fóka', 'Aú-aú'], penguin: ['Pingvin', 'Krá'], turtle: ['Teknős', 'Csubb'],
        otter: ['Vidra', 'Csipp-csipp'], jellyfish: ['Medúza', 'Libeg'], starfish: ['Tengeri csillag', 'Huss'],
        oyster: ['Osztriga', 'Pukk'], seasnail: ['Tengeri csiga', 'Csúsz'],
        lion: ['Oroszlán', 'Grrrau'], elephant: ['Elefánt', 'Trötyö'], giraffe: ['Zsiráf', 'Hümm'],
        zebra: ['Zebra', 'Nyihaha'], hippo: ['Víziló', 'Röff'], rhino: ['Orrszarvú', 'Prüssz'],
        monkey: ['Majom', 'U-u-á-á'], gorilla: ['Gorilla', 'Hu-hu'], tiger: ['Tigris', 'Morr'],
        leopard: ['Leopárd', 'Fúj'], camel: ['Teve', 'Mormog'], kangaroo: ['Kenguru', 'Dobb'],
        crocodile: ['Krokodil', 'Csatt'], flamingo: ['Flamingó', 'Krá'], peacock: ['Páva', 'Kiá'],
        parrot: ['Papagáj', 'Szia'], snake: ['Kígyó', 'Sssz'], lizard: ['Gyík', 'Surr'],
        eagle: ['Sas', 'Kiii'], sloth: ['Lajhár', 'Huááá']
    };

    const facts = {
        // --- the barn ---------------------------------------------------------
        cow: [
            '{A tehén|Ez az állat} állva és fekve is tud aludni.',
            '{A tehenek|Ezek az állatok} gyakran összedörzsölik az orrukat, így köszönnek egymásnak.',
            '{A tehén gyomra|Ennek az állatnak a gyomra} négy részből áll, hogy jól megeméssze a füvet.',
            '{A tehénnek|Ennek az állatnak} nincsenek felső első fogai, csak egy kemény, sima párnája.',
            '{A tehén|Ez az állat} egyetlen nap alatt egy egész kádnyi vizet megihat.',
            '{A tehén|Ez az állat} nagyon jól szagol, és messziről is megérzi a szagokat.',
            '{A tehén|Ez az állat} kérődzik: visszaböfögi az ételt, és újra megrágja.',
            '{A tehén|Ez az állat} sokkal mélyebb és magasabb hangokat is hall, mint mi.'
        ],
        pig: [
            '{A malacok|Ezek az állatok} nagyon okosak, és szeretnek a sárban hemperegni, hogy hűsöljenek.',
            '{A malac kunkori farka|Ennek az állatnak a kunkori farka} csóválódik, ha boldog.',
            '{A malacok|Ezek az állatok} kiválóan szagolnak.',
            '{A malac|Ez az állat} a föld alá rejtett élelmet is kiszimatolja.',
            '{A malacok|Ezek az állatok} meglepően jól úsznak.',
            '{A malacok|Ezek az állatok} ügyesen ásnak, az orrukat lapátként használják.',
            '{A malacok|Ezek az állatok} szívesen alszanak összebújva.',
            '{A malac|Ez az állat} a nevét is megtanulhatja, és odajön, ha hívják.'
        ],
        goat: [
            '{A kecskék|Ezek az állatok} csodásan másznak, és egészen keskeny párkányokon is egyensúlyoznak.',
            '{A kecske kicsinyét|Ennek az állatnak a kicsinyét} gidának hívják.',
            '{A kecskéknek|Ezeknek az állatoknak} téglalap alakú a pupillájuk, így szinte körbe látnak.',
            '{A kecskék|Ezek az állatok} csapatban, nyájban élnek.',
            '{A kecskék|Ezek az állatok} szeretnek sokféle növényből egy kicsit megkóstolni.',
            '{A kicsi kecske|Ennek az állatnak a kicsinye} már egy nappal a születése után ugrál és játszik.',
            '{Sok kecskének|Sok ilyen állatnak} kis szakállszerű szőrpamacs van az álla alatt.',
            '{A kecske|Ez az állat} el tudja fordítani a fülét, hogy minden irányból hallja a hangokat.'
        ],
        sheep: [
            '{A birka gyapja|Ennek az állatnak a gyapja} egész évben nő, mint a haj.',
            '{A birkák|Ezek az állatok} évekig emlékeznek más társaik arcára.',
            '{A birkák|Ezek az állatok} nyájban élnek.',
            '{A birka kicsinyét|Ennek az állatnak a kicsinyét} báránynak hívják.',
            '{A birka gyapját|Ennek az állatnak a gyapját} le lehet nyírni, és puha fonalat lehet fonni belőle.',
            '{A birka|Ez az állat} szinte körbe lát, anélkül hogy elfordítaná a fejét.',
            '{A birkák|Ezek az állatok} legelés közben szorosan együtt maradnak a nyájban.',
            '{A birka gyapja|Ennek az állatnak a gyapja} sokféle színű lehet, nem csak fehér.'
        ],
        horse: [
            '{A lovak|Ezek az állatok} fekve és állva is tudnak aludni.',
            '{A ló|Ez az állat} nagyon gyorsan tud vágtatni a nyílt mezőn.',
            '{A lovak|Ezek az állatok} szinte körbe látnak, anélkül hogy elfordítanák a fejüket.',
            '{A ló kicsinyét|Ennek az állatnak a kicsinyét} csikónak hívják.',
            '{A ló|Ez az állat} meg tudja rándítani a bőrét, hogy elhessegesse a zümmögő legyet.',
            '{A lónak|Ennek az állatnak} minden lábán egyetlen nagy pata van, mint egy beépített cipő.',
            '{A ló|Ez az állat} külön-külön tudja mozgatni a fülét, hogy több irányba figyeljen.',
            '{A ló|Ez az állat} nagyon gyorsan sok vizet meg tud inni.'
        ],
        duck: [
            '{A kacsa tolla|Ennek az állatnak a tolla} vízhatlan, így szárazon marad.',
            '{A kiskacsák|Ennek az állatnak a kicsinyei} már pár órával a kikelésük után úsznak.',
            '{A kacsáknak|Ezeknek az állatoknak} van egy különleges harmadik szemhéjuk, ami a víz alatt védi a szemüket.',
            '{A kacsának|Ennek az állatnak} úszóhártyás lába van, ami kis evezőként működik.',
            '{A kacsák|Ezek az állatok} gyakran sorban úsznak egymás után.',
            '{A kacsa|Ez az állat} fél szemét nyitva tartva is tud aludni, hogy figyeljen.',
            '{A kacsa csőre|Ennek az állatnak a csőre} nagyon érzékeny, és segít a víz alatt kitapintani az élelmet.',
            '{A hím és a tojó kacsa|Ennek az állatnak a hímje és tojója} gyakran nagyon különbözően néz ki.'
        ],
        rooster: [
            '{A kakas|Ez az állat} napfelkeltekor kukorékol, de a nap bármely szakában megteheti.',
            '{A kakasoknak|Ezeknek az állatoknak} fényes, színes tolla van.',
            '{A kakas|Ez az állat} szinte bárhonnan kukorékolhat, akár magasról is.',
            '{A kakas|Ez az állat} a tyúk párja.',
            '{A kakas fején|Ennek az állatnak a fején} puha, piros taraj van.',
            '{A kakas lábán|Ennek az állatnak a lábán} hátul sarkantyú van.',
            '{A kakas|Ez az állat} színesben lát, és könnyen észreveszi az élénk színeket.',
            '{A kakas|Ez az állat} gyakran büszkén feszít, hogy mutassa magát a tyúkoknak.'
        ],
        dog: [
            '{A kutya orrlenyomata|Ennek az állatnak az orrlenyomata} egyedi, mint az ujjlenyomat.',
            '{A kutyák|Ezek az állatok} csóválják a farkukat, ha boldogok vagy izgatottak.',
            '{Néhány kutya|Néhány ilyen állat} több száz szót is megtanulhat.',
            '{A kutya|Ez az állat} sokkal halkabb hangokat is meghall, mint mi.',
            '{A kutya|Ez az állat} lihegéssel hűti le magát.',
            '{A kutya|Ez az állat} sokkal-sokkal jobban szagol, mint egy ember.',
            '{A kutyák|Ezek az állatok} főleg a talppárnájukon keresztül izzadnak.',
            '{A kutya|Ez az állat} álmodik alvás közben, és néha rángatja a mancsát.'
        ],
        cat: [
            '{A cica|Ez az állat} a bajuszával tapogatja ki a környezetét.',
            '{A cicák|Ezek az állatok} a napjuk nagy részét szundikálással és nyújtózkodással töltik.',
            '{A cica|Ez az állat} dorombol, ha nyugodt és jól érzi magát.',
            '{A cica|Ez az állat} a saját magasságának körülbelül ötszörösére tud felugrani.',
            '{A cica|Ez az állat} érdes kis nyelvével gondosan tisztálkodik.',
            '{A cicának|Ennek az állatnak} hajlékony gerince van, ezért esés közben megfordul, és a talpára érkezik.',
            '{A cica érdes nyelvén|Ennek az állatnak az érdes nyelvén} apró, horogszerű dudorok vannak a tisztálkodáshoz.',
            '{A cica|Ez az állat} sokféle hangot ad, hogy elmondja, mit szeretne.'
        ],
        owl: [
            '{A bagoly|Ez az állat} majdnem teljesen hátra tudja fordítani a fejét.',
            '{A bagoly|Ez az állat} olyan csendesen repül, hogy az éjszakai égen alig hallani.',
            '{A baglyoknak|Ezeknek az állatoknak} hatalmas szemük van, ezért éjjel is jól látnak.',
            '{A bagoly|Ez az állat} nem tudja mozgatni a szemét, ezért az egész fejét fordítja, ha körülnéz.',
            '{A bagoly kicsinyét|Ennek az állatnak a kicsinyét} fiókának hívják.',
            '{Némelyik bagoly|Némelyik ilyen állat} nagyon jól hall, és a füle segít megtalálni a hangok forrását.',
            '{A bagolynak|Ennek az állatnak} puha, pihés tolla van, ami melegen tartja.',
            '{A baglyok|Ezek az állatok} főleg éjszaka ébren vannak, nappal pedig alszanak.'
        ],
        turkey: [
            '{A pulyka|Ez az állat} nagy legyezővé tudja széttárni a farktollait.',
            '{A pulykák|Ezek az állatok} elég gyorsan futnak, ha akarnak.',
            '{A pulyka feje|Ennek az állatnak a feje} színt válthat, ha izgatott.',
            '{A pulykának|Ennek az állatnak} hosszú, lógó bőrlebenye van a csőre fölött.',
            '{A pulyka|Ez az állat} színesben lát, akárcsak mi.',
            '{A pulyka|Ez az állat} jól lát, és nagyon széles területet belát.',
            '{A pulykák|Ezek az állatok} gyakran csapatban járnak.',
            '{A vadpulyka|Ez a vadon élő állat} rövid távolságokat repülni is tud, pedig nagy madár.'
        ],
        bull: [
            '{A bika|Ez az állat} a szarvasmarhák erős, felnőtt hímje.',
            '{A bikáknak|Ezeknek az állatoknak} vastag nyakuk és széles válluk van.',
            '{A bika|Ez az állat} annyit is nyomhat, mint egy kis autó.',
            '{Némelyik bikának|Némelyik ilyen állatnak} erős, izmos púp van a vállán.',
            '{Sok bikának|Sok ilyen állatnak} szarva van, ami egész életében nő.',
            '{A bikának|Ennek az állatnak} nagyon erős váll- és nyakizmai vannak.',
            '{A bika|Ez az állat} sok évig élhet egy farmon.',
            '{A bika|Ez az állat} gyakran más marhákkal együtt, csordában él.'
        ],
        llama: [
            '{A lámák|Ezek az állatok} dúdolnak egymásnak, így köszönnek.',
            '{A lámának|Ennek az állatnak} hosszú, bolyhos nyaka és puha gyapja van.',
            '{A lámák|Ezek az állatok} nagyon ügyesen visznek terhet a meredek hegyekben.',
            '{A lámának|Ennek az állatnak} puha, párnás talpa van, ami jól tapad a köves talajon.',
            '{A láma|Ez az állat} Dél-Amerika magas hegyeiből származik.',
            '{A lámának|Ennek az állatnak} háromrészes gyomra van, ami segít megemészteni a kemény növényeket.',
            '{A láma füle|Ennek az állatnak a füle} banán alakú, és különböző irányokba tud fordulni.',
            '{A láma|Ez az állat} köphet is, így üzen a társainak.'
        ],
        rabbit: [
            '{A nyuszi|Ez az állat} a saját magasságának sokszorosára tud ugrani.',
            '{A nyusziknak|Ezeknek az állatoknak} hosszú fülük van, amivel messziről is hallanak.',
            '{A nyuszi|Ez az állat} dobbant a lábával, hogy jelezzen a társainak.',
            '{A nyuszi foga|Ennek az állatnak a foga} sosem áll meg a növésben, ezért rágcsál, hogy rövid maradjon.',
            '{A nyuszik|Ezek az állatok} gyakran föld alatti üregekben, csapatban élnek.',
            '{A nyuszi hosszú füle|Ennek az állatnak a hosszú füle} melegben a hűsölésben is segít.',
            '{A nyuszinak|Ennek az állatnak} erős hátsó lába van, gyors, nagy ugrásokra.',
            '{A nyuszi|Ez az állat} hajnalban és alkonyatkor a legélénkebb.'
        ],
        mouse: [
            '{Az egér|Ez az állat} egy pénzérme méretű résen is átfér.',
            '{Az egerek|Ezek az állatok} a hosszú bajuszukkal tapogatóznak a sötétben.',
            '{Az egér farka|Ennek az állatnak a farka} segít egyensúlyozni futás közben.',
            '{Az egér|Ez az állat} olyan magas hangokat is hall, amilyeneket mi egyáltalán nem.',
            '{Az egér|Ez az állat} meglepően jól mászik, és fel tud szaladni a falon.',
            '{Az egér|Ez az állat} sokféle helyen elél, a mezőn és a házakban is.',
            '{Az egér|Ez az állat} rosszul lát, de a bajuszára és a szaglására támaszkodik.',
            '{Az egér|Ez az állat} puha anyagokból kis fészket épít.'
        ],
        bee: [
            '{A méhecske|Ez az állat} sok virágot meglátogat, hogy édes nektárt gyűjtsön.',
            '{A méhecskék|Ezek az állatok} táncolnak, hogy megmutassák társaiknak, hol vannak a virágok.',
            '{A méhecske|Ez az állat} több ezer virágot meglátogat, hogy egy kevés mézet készítsen.',
            '{A méhecske testét|Ennek az állatnak a testét} apró szőrök borítják, amikre ráragad a virágpor.',
            '{Egy méhkaptárban több tízezer méhecske is élhet.|Ezek az állatok akár több tízezren is élhetnek egyetlen otthonban.}',
            '{A méhecskének|Ennek az állatnak} két pár szárnya van, amik nagyon gyorsan verdesnek.',
            '{A dolgozó méhecske|Ez a dolgozó állat} nagyon szorgalmas, és segít gondozni a kaptárt.',
            '{A méhkirálynő|Ennek az állatnak a királynője} az egyetlen a kaptárban, aki petéket rak.'
        ],
        frog: [
            '{A béka|Ez az állat} a bőrén keresztül is tud egy kicsit lélegezni.',
            '{A békák|Ezek az állatok} hosszú, ragacsos nyelvükkel gyorsan elkapják az élelmüket.',
            '{A béka kicsinyét|Ennek az állatnak a kicsinyét} ebihalnak hívják, és a vízben kezdi az életét.',
            '{A béka|Ez az állat} pislogáskor behúzza a szemét a fejébe.',
            '{A béka bőrének|Ennek az állatnak a bőrének} nedvesnek kell maradnia, hogy egészséges legyen.',
            '{A béka|Ez az állat} a saját testhosszának sokszorosát is át tudja ugrani.',
            '{A békák|Ezek az állatok} sokféle élénk színben és mintában léteznek.',
            '{A béka|Ez az állat} a bőrén keresztül veszi fel a vizet, nem a szájával iszik.'
        ],
        butterfly: [
            '{A pillangó|Ez az állat} a lábával érzi az ízeket.',
            '{A pillangók|Ezek az állatok} hernyóként kezdik az életüket, mielőtt szárnyuk nő.',
            '{A pillangó szárnyát|Ennek az állatnak a szárnyát} apró, színes pikkelyek borítják.',
            '{A pillangó|Ez az állat} hosszú, összetekert nyelvével iszik, mint egy kis szívószállal.',
            '{A pillangó testének|Ennek az állatnak a testének} meg kell melegednie, mielőtt repülni tud.',
            '{A pillangónak|Ennek az állatnak} négy szárnya van, nem csak kettő.',
            '{A pillangók|Ezek az állatok} a csápjukkal szagolják a levegőt.',
            '{A pillangó|Ez az állat} sokkal több színt lát, mint az emberek.'
        ],
        hedgehog: [
            '{A süni|Ez az állat} apró, tüskés gombóccá gömbölyödik, hogy biztonságban legyen.',
            '{A sünik hátán|Ezeknek az állatoknak a hátán} több ezer éles tüske van.',
            '{A süni|Ez az állat} főleg éjszaka jön elő élelmet keresni.',
            '{A süni|Ez az állat} gyorsabban fut, mint gondolnánk, főleg ha izgatott.',
            '{A süni|Ez az állat} úszni is tud, ha át kell jutnia a vízen.',
            '{A süni|Ez az állat} nagyon jól szagol és hall.',
            '{A süni|Ez az állat} félhomályban lát a legjobban, nem az erős napfényben.',
            '{A süni|Ez az állat} felfedezés közben gyakran szuszogva szimatol a földön.'
        ],
        squirrel: [
            '{A mókus|Ez az állat} elássa a diót, és hónapokkal később is gyakran emlékszik, hová.',
            '{A mókusok|Ezek az állatok} bozontos farkukat puha takaróként használják.',
            '{A mókus|Ez az állat} csodás egyensúllyal ugrál fáról fára.',
            '{A mókus hátsó lába|Ennek az állatnak a hátsó lába} megfordul, így fejjel lefelé is le tud mászni a fáról.',
            '{A mókus|Ez az állat} a fák odvában vagy ágakból épített fészekben alszik.',
            '{A mókusnak|Ennek az állatnak} éles karmai vannak, amikkel megkapaszkodik a fakéregben.',
            '{A mókus szeme|Ennek az állatnak a szeme} úgy helyezkedik el, hogy széles területet belásson.',
            '{A mókus|Ez az állat} kiváló szaglásával újra megtalálja az élelmét.'
        ],

        // --- the aquarium -------------------------------------------------------
        fish: [
            '{A legtöbb hal|A legtöbb ilyen állat} a kopoltyújával lélegzik a víz alatt.',
            '{A hal pikkelyei|Ennek az állatnak a pikkelyei} apró pajzsokként védik a bőrét.',
            '{A halak|Ezek az állatok} a testük körül a víz legapróbb mozgását is érzik.',
            '{A hal|Ez az állat} nyitott szemmel alszik, mert nincs szemhéja.',
            '{Némelyik hal|Némelyik ilyen állat} még egy ember arcát is meg tudja jegyezni.',
            '{A hal uszonyai|Ennek az állatnak az uszonyai} különböző alakúak, hogy többféleképpen tudjon mozogni.',
            '{A halak|Ezek az állatok} egészen aprók és hatalmasak is lehetnek.',
            '{A halnak|Ennek az állatnak} úszóhólyagja van, ami segít különböző mélységekben lebegni.'
        ],
        tropicalfish: [
            '{A trópusi halak|Ezek az állatok} a tenger legélénkebb színeiben pompáznak.',
            '{A trópusi hal|Ez az állat} meleg, napsütéses korallzátonyok körül él.',
            '{Némelyik trópusi hal|Némelyik ilyen állat} a hangulatától függően színt vált.',
            '{A trópusi halak|Ezek az állatok} gyakran nagy csapatban, rajban úsznak együtt.',
            '{A trópusi hal élénk színei|Ennek az állatnak az élénk színei} segítenek felismerni a fajtársait.',
            '{A trópusi hal mintája|Ennek az állatnak a mintája} segít elrejtőzni vagy feltűnni a zátonyon.',
            '{A kicsi trópusi halak|Ennek az állatnak a kicsinyei} egészen másképp nézhetnek ki, mint felnőttként.',
            '{A trópusi halak|Ezek az állatok} a zátonyon találnak menedéket és élelmet.'
        ],
        blowfish: [
            '{A gömbhal|Ez az állat} kerek labdává tud felfújódni, hogy biztonságban legyen.',
            '{A gömbhalak|Ezek az állatok} gyorsan vizet nyelnek, hogy sokkal nagyobbak legyenek.',
            '{A gömbhal kerek, léggömbszerű alakja|Ennek az állatnak a kerek, léggömbszerű alakja} sokkal nagyobbnak mutatja.',
            '{A gömbhalat|Ezt az állatot} fújóhalnak is hívják.',
            '{A gömbhal|Ez az állat} általában lassan úszik, kis uszonyait finoman mozgatva.',
            '{A gömbhalnak|Ennek az állatnak} csőrszerű szája van, amivel összeroppantja az élelmét.',
            '{A gömbhal|Ez az állat} fajtától függően sós vagy édes vízben is élhet.',
            '{A gömbhal bőrét|Ennek az állatnak a bőrét} apró tüskék borítják, amik felfújódáskor látszanak.'
        ],
        shark: [
            '{A cápa|Ez az állat} nagyon messziről megérzi a szagokat a vízben.',
            '{A cápák|Ezek az állatok} több százmillió éve úszkálnak már az óceánban.',
            '{A cápa bőre|Ennek az állatnak a bőre} érdes tapintású, majdnem mint a csiszolópapír.',
            '{Sok cápának|Sok ilyen állatnak} folyton úsznia kell, hogy a víz átáramoljon a kopoltyúján.',
            '{A cápának|Ennek az állatnak} új fogak nőnek a kiesettek helyére.',
            '{A cápa csontváza|Ennek az állatnak a csontváza} porcból van, nem csontból.',
            '{A cápáknak|Ezeknek az állatoknak} több száz fajtája van, egészen aprótól a hatalmasig.',
            '{A cápa|Ez az állat} különleges érzékszervvel a vízben lévő apró elektromos jeleket is érzi.'
        ],
        octopus: [
            '{A polipnak|Ennek az állatnak} nyolc karja és három szíve van.',
            '{A polip|Ez az állat} a szeménél alig nagyobb résen is átfér.',
            '{A polip|Ez az állat} színt tud váltani, hogy hasonlítson a körülötte lévő sziklákhoz.',
            '{A polip vére|Ennek az állatnak a vére} kék, nem piros.',
            '{A polip|Ez az állat} a karjain lévő tapadókorongokkal ízlel.',
            '{A polip|Ez az állat} egyszerű feladványokat is megold, például rájön, hogyan nyisson ki egy üveget.',
            '{A polip|Ez az állat} legtöbbször egyedül él, nem csapatban, mint néhány más tengeri állat.',
            '{A polip|Ez az állat} kiválóan lát, bár a színeket nem úgy látja, mint mi.'
        ],
        squid: [
            '{A tintahal|Ez az állat} nagyon gyorsan tud hátrafelé lőni a vízben.',
            '{A tintahalaknak|Ezeknek az állatoknak} nagy szemük van, hogy lássanak a mély, sötét tengerben.',
            '{A tintahal|Ez az állat} sötét tintát fecskendez, hogy elrejtőzzön.',
            '{A tintahalnak|Ennek az állatnak} három szíve van, akárcsak az unokatestvérének, a polipnak.',
            '{A tintahal uszonyai|Ennek az állatnak az uszonyai} segítenek kormányozni, ahogy siklik a vízben.',
            '{A tintahalnak|Ennek az állatnak} kemény csőre van a karjai között elrejtve.',
            '{A tintahal|Ez az állat} közeli rokona a polipnak.',
            '{A tintahal|Ez az állat} fajtától függően egészen kicsi vagy óriási is lehet.'
        ],
        crab: [
            '{A rák|Ez az állat} oldalazva jár a tíz lábán.',
            '{A rákoknak|Ezeknek az állatoknak} új, nagyobb páncél nő, ahogy idősebbek lesznek.',
            '{A rák|Ez az állat} az ollójával eszik, és integet is vele.',
            '{A rák szeme|Ennek az állatnak a szeme} apró nyeleken ül, így körbe tud nézni.',
            '{Némelyik rák|Némelyik ilyen állat} a szárazföldön és a vízben is el tud élni.',
            '{A ráknak|Ennek az állatnak} kemény külső páncélja van.',
            '{Némelyik ráknak|Némelyik ilyen állatnak} az egyik ollója nagyobb, mint a másik.',
            '{A rák páncélja|Ennek az állatnak a páncélja} védi az alatta lévő puha testét.'
        ],
        lobster: [
            '{A homárnak|Ennek az állatnak} új ollója nő, ha elveszít egyet.',
            '{A homárok|Ezek az állatok} a lábukon lévő apró szőrökkel ízlelnek.',
            '{A homár|Ez az állat} egészen új páncélt kap, ahogy nagyobb lesz.',
            '{A homár|Ez az állat} sok évig, akár évtizedekig is élhet.',
            '{A homár|Ez az állat} hosszú csápjaival tapogatja és fedezi fel a környezetét.',
            '{A homár páncélja|Ennek az állatnak a páncélja} általában zöldesbarna, de van kék vagy akár narancssárga is.',
            '{A homárnak|Ennek az állatnak} gyakran az egyik ollója törésre, a másik vágásra való.',
            '{A homárnak|Ennek az állatnak} nemcsak ollója, hanem lába is újranőhet, ha elveszíti.'
        ],
        shrimp: [
            '{A garnélarák|Ez az állat} a farka csapásával hátrafelé úszik.',
            '{A garnélarákok|Ezek az állatok} rendben tartják a tengert, mert feltakarítják az ételmaradékokat.',
            '{Némelyik garnélarák|Némelyik ilyen állat} apró fényszikrákkal világít.',
            '{A garnélarák teste|Ennek az állatnak a teste} gyakran átlátszó, ezért nehéz észrevenni a vízben.',
            '{A garnélarák szíve|Ennek az állatnak a szíve} a feje közelében van.',
            '{A garnélaráknak|Ennek az állatnak} a teste két oldalán lábai vannak, úszásra és járásra is.',
            '{A garnélarákok|Ezek az állatok} fajtától függően egészen aprók vagy elég nagyok is lehetnek.',
            '{A garnélarákok|Ezek az állatok} gyakran nagy csapatban élnek a tengerfenék vagy a korallok közelében.'
        ],
        dolphin: [
            '{A delfin|Ez az állat} kattogással és fütyüléssel beszélget a társaival.',
            '{A delfinek|Ezek az állatok} nagyon okosak, és imádnak játszani és ugrálni.',
            '{A delfin|Ez az állat} feljön a felszínre levegőt venni, ahogy mi is levegőt veszünk.',
            '{A delfin|Ez az állat} egyszerre csak az agya felét pihenteti, a másik fele ébren marad.',
            '{A delfinek|Ezek az állatok} csapatban úsznak együtt.',
            '{A delfin hátán|Ennek az állatnak a hátán} egy ívelt uszony van, a hátúszó.',
            '{A delfin|Ez az állat} kattogó hangokat küld ki, amik visszaverődnek, így érzékeli, mi van körülötte.',
            '{A kis delfin|Ennek az állatnak a kicsinye} élete első részében az anyja közelében marad.'
        ],
        // Keyed 'whale' because that is the animal's id in zones.js; the animal is an orca.
        whale: [
            '{Az orka hátán|Ennek az állatnak a hátán} egy magas uszony van, a hátúszó.',
            '{Az orka|Ez az állat} fekete-fehér, és mindkét szeme mögött fehér folt van.',
            '{Az orkák|Ezek az állatok} csapatban élnek és vándorolnak.',
            '{Az orka|Ez az állat} a feje tetején lévő légzőnyíláson keresztül lélegzik.',
            '{Az orka|Ez az állat} kattogással és fütyüléssel beszél a csapatával.',
            '{Az orka|Ez az állat} erős vadász, és az óceánban szerzi az élelmét.',
            '{Az orkának|Ennek az állatnak} vastag zsírrétege van, ami melegen tartja a hideg vízben.',
            '{Az orka|Ez az állat} nagyon gyorsan úszik, és ki is ugrik a vízből.'
        ],
        bigwhale: [
            '{A nagy bálna szíve|Ennek az állatnak a szíve} akkora lehet, mint egy kis autó.',
            '{A nagy bálnák|Ezek az állatok} szinte minden más állatnál tovább bírják levegő nélkül.',
            '{A nagy bálna farkát|Ennek az állatnak a farkát} farokúszónak hívják.',
            '{A nagy bálna nyelve|Ennek az állatnak a nyelve} annyit nyomhat, mint egy elefánt.',
            '{A nagy bálna|Ez az állat} hosszabbra nőhet egy városi busznál.',
            '{A nagy bálna|Ez az állat} a leghangosabb hangokat adja ki az állatok között.',
            '{A nagy bálna úszói|Ennek az állatnak az úszói} segítenek kormányozni úszás közben.',
            '{A kis bálna|Ennek az állatnak a kicsinye} már nem sokkal a születése után jól úszik.'
        ],
        seal: [
            '{A fóka|Ez az állat} összecsapja az úszóit, és csobbanó hangot ad a víz alatt.',
            '{A fóka|Ez az állat} sok percig bírja levegő nélkül a víz alatt.',
            '{A fóka|Ez az állat} a bajuszával a víz legapróbb mozgását is érzi, még sötétben is.',
            '{A fóka|Ez az állat} a vízben könnyedén fordul és pörög, pedig a szárazon totyog.',
            '{A fóka kicsinyét|Ennek az állatnak a kicsinyét} kölyöknek hívják.',
            '{A fóka|Ez az állat} a szárazföldön a testét tekergetve halad a homokon.',
            '{A fóka|Ez az állat} a levegőben és a víz alatt is jól lát.',
            '{A fóka sima, áramvonalas teste|Ennek az állatnak a sima, áramvonalas teste} segít könnyen siklani a vízben.'
        ],
        penguin: [
            '{A pingvin|Ez az állat} nem tud repülni, de csodásan úszik.',
            '{A pingvinek|Ezek az állatok} szorosan összebújnak, hogy melegen és kényelmesen legyenek.',
            '{A pingvin|Ez az állat} a szárazföldön totyog, de a víz alatt gyorsan suhan.',
            '{A pingvint|Ezt az állatot} vastag zsírréteg és tollak tartják melegen.',
            '{A pingvinek|Ezek az állatok} gyakran sorban, egymás után totyognak.',
            '{A pingvin|Ez az állat} merev, uszonyszerű szárnyai úszásra valók, nem repülésre.',
            '{A pingvin fekete-fehér színe|Ennek az állatnak a fekete-fehér színe} segít elrejtőzni úszás közben.',
            '{A pingvin szülők|Ennek az állatnak a szülei} felváltva melegítik a tojásukat.'
        ],
        turtle: [
            '{A teknős|Ez az állat} mindenhová magával viszi a páncélját.',
            '{A teknősök|Ezek az állatok} nagyon-nagyon sokáig élhetnek.',
            '{A teknős|Ez az állat} behúzza a fejét a páncéljába, hogy biztonságban érezze magát.',
            '{A teknős páncélja|Ennek az állatnak a páncélja} a csontváza része, és a gerincéhez kapcsolódik.',
            '{Némelyik teknős|Némelyik ilyen állat} órákig pihenhet a víz alatt, anélkül hogy feljönne levegőért.',
            '{A teknősnek|Ennek az állatnak} nincs foga, csak kemény, csőrszerű szája.',
            '{A tengeri teknős|Ez a tengeri állat} hatalmas távolságokat úszik az óceánban.',
            '{A különböző teknősök|Ezeknek az állatoknak a különböző fajtái} élnek az óceánban, tavakban vagy a szárazföldön.'
        ],
        otter: [
            '{A vidrák|Ezek az állatok} alvás közben fogják egymás kezét, hogy ne sodródjanak szét.',
            '{A vidrák|Ezek az állatok} köveket használnak eszközként, hogy kinyissák a kedvenc csemegéiket.',
            '{A vidrának|Ennek az állatnak} sűrű bundája van, ami melegen és szárazon tartja.',
            '{A vidra bundája|Ennek az állatnak a bundája} az egyik legsűrűbb az állatok közül, több millió apró szőrrel.',
            '{A vidra|Ez az állat} gyakran a hátán lebeg, amikor pihen.',
            '{A vidra|Ez az állat} be tudja zárni a fülét és az orrát, amikor a víz alatt úszik.',
            '{Némelyik vidra|Némelyik ilyen állat} a hóna alatti bőrzsebben tartja a kedvenc kövét.',
            '{A vidra bundáját|Ennek az állatnak a bundáját} folyton ápolni kell, hogy bolyhos és vízhatlan maradjon.'
        ],
        jellyfish: [
            '{A medúzának|Ennek az állatnak} nincs csontja, agya és szíve sem.',
            '{A medúzák|Ezek az állatok} a testük finom összehúzásával lebegnek a vízben.',
            '{A medúza|Ez az állat} halványan világíthat a sötét óceánban.',
            '{A medúza|Ez az állat} szinte teljesen vízből áll.',
            '{A medúzák|Ezek az állatok} már a dinoszauruszok előtt is úszkáltak az óceánban.',
            '{A medúza|Ez az állat} lassú, ütemes lüktetéssel halad előre.',
            '{A medúzáknak|Ezeknek az állatoknak} több ezer fajtája él a világ óceánjaiban.',
            '{A medúza kerek teste alatt|Ennek az állatnak a kerek teste alatt} hosszú csápok lógnak.'
        ],
        starfish: [
            '{A tengeri csillagnak|Ennek az állatnak} újra kinő a karja, ha elveszít egyet.',
            '{A tengeri csillagok|Ezek az állatok} több száz apró csőlábukkal lassan haladnak.',
            '{A tengeri csillagnak|Ennek az állatnak} nincs agya, mégis eligazodik.',
            '{A tengeri csillag|Ez az állat} vér helyett sós vizet pumpál a testében.',
            '{A legtöbb tengeri csillagnak|A legtöbb ilyen állatnak} öt karja van, de némelyiknek még több.',
            '{A tengeri csillag|Ez az állat} minden karja végén szemfoltokkal érzékeli a fényt.',
            '{A tengeri csillag bőrét|Ennek az állatnak a bőrét} apró dudorok vagy tüskék borítják.',
            '{A tengeri csillag|Ez az állat} sokféle színű lehet: narancs, piros, lila és kék.'
        ],
        oyster: [
            '{Az osztriga|Ez az állat} fényes, kerek gyöngyöt tud készíteni a héjában.',
            '{Az osztrigák|Ezek az állatok} egész életüket egyetlen kényelmes helyen töltik.',
            '{Az osztriga héja|Ennek az állatnak a héja} két részből áll, amik kinyílnak és becsukódnak.',
            '{Az osztriga|Ez az állat} minden nap rengeteg vizet megszűr és megtisztít.',
            '{A fiatal osztriga|Ennek az állatnak a kicsinye} szabadon lebeg a vízben, mielőtt letelepszik egy helyen.',
            '{Az osztrigák|Ezek az állatok} összetapadnak, és nagy zátonyokat alkotnak.',
            '{Az osztriga|Ez az állat} akkor készít gyöngyöt, amikor egy homokszem a héjába szorul.',
            '{Az osztriga érdes héja|Ennek az állatnak az érdes héja} otthont ad más kis tengeri élőlényeknek.'
        ],
        seasnail: [
            '{A tengeri csiga|Ez az állat} a hátán hordja a csavaros házát.',
            '{A tengeri csigák|Ezek az állatok} nagyon lassan haladnak a sziklákon és a homokon.',
            '{A tengeri csiga|Ez az állat} fényes csíkot hagy maga után, ahogy csúszik.',
            '{A tengeri csiga|Ez az állat} egyetlen erős, izmos lábán halad.',
            '{A tengeri csiga háza|Ennek az állatnak a háza} egyre nagyobb lesz, ahogy az egész teste nő.',
            '{A tengeri csiga|Ez az állat} a háza belsejében lévő kopoltyúval lélegzik.',
            '{A tengeri csiga fején|Ennek az állatnak a fején} egyszerű szemek vannak, amik érzékelik a fényt.',
            '{A tengeri csiga|Ez az állat} egész puha testét be tudja húzni a házába, hogy védve legyen.'
        ],

        // --- the safari -----------------------------------------------------
        lion: [
            '{Az oroszlán ordítása|Ennek az állatnak az ordítása} nagyon messzire elhallatszik.',
            '{Az oroszlánok|Ezek az állatok} családi csapatban élnek együtt.',
            '{Az oroszlán|Ez az állat} imád a nap nagy részében szundikálni.',
            '{A hím oroszlán arcát|Ennek az állatnak a hímjénél az arcot} gyakran vastag, bolyhos sörény keretezi.',
            '{Az oroszlán kicsinyét|Ennek az állatnak a kicsinyét} kölyöknek hívják.',
            '{A hím oroszlán sörénye|Ennek az állatnak a sörénye} sokféle színű lehet, a szőkétől a feketéig.',
            '{Az oroszlán|Ez az állat} rövid ideig nagyon gyorsan fut, de hamar elfárad.',
            '{Az oroszlán|Ez az állat} sokat pihen, és a családja tagjaival tisztogatják egymást.'
        ],
        elephant: [
            '{Az elefánt|Ez az állat} az ormányát hosszú, ügyes kézként használja.',
            '{Az elefántok|Ezek az állatok} csodás memóriájúak, és évekig emlékeznek egymásra.',
            '{Az elefánt|Ez az állat} a nagy fülével legyezget, hogy lehűtse magát.',
            '{Az elefánt|Ez az állat} a legnagyobb szárazföldi állat.',
            '{Az elefánt|Ez az állat} az ormányával hűs zuhanyt is tud csinálni magának.',
            '{Az elefánt agyara|Ennek az állatnak az agyara} valójában hosszú fog, ami folyton nő.',
            '{Az elefánt|Ez az állat} az ormányával apró és nehéz tárgyakat is fel tud emelni.',
            '{Az elefánt|Ez az állat} mély, morajló hangokkal beszél a társaival, amiket mi alig hallunk.'
        ],
        giraffe: [
            '{A zsiráfnak|Ennek az állatnak} ugyanannyi nyakcsigolyája van, mint nekünk, csak sokkal nagyobbak.',
            '{A zsiráfnak|Ennek az állatnak} hosszú, sötét nyelve van, amivel leveleket szed a magas fákról.',
            '{A zsiráf|Ez az állat} állva is tud szundikálni, egyszerre csak néhány percig.',
            '{A zsiráf foltos mintája|Ennek az állatnak a foltos mintája} egyedi, mint az ujjlenyomat.',
            '{A kis zsiráf|Ennek az állatnak a kicsinye} már az élete első órájában feláll és jár.',
            '{A zsiráfnak|Ennek az állatnak} nagy, erős szíve van, ami a hosszú nyakán át egészen felpumpálja a vért.',
            '{A zsiráf|Ez az állat} olyan magas fák leveleit is megeszi, amiket más állatok nem érnek el.',
            '{A zsiráf|Ez az állat} a világ legmagasabb állata.'
        ],
        zebra: [
            '{Minden zebrának|Minden ilyen állatnak} saját, különleges csíkmintája van.',
            '{A zebrák|Ezek az állatok} csapatban élnek, hogy vigyázzanak egymásra.',
            '{A zebra|Ez az állat} nagyon gyorsan fut a füves pusztán.',
            '{A zebra csíkjai|Ennek az állatnak a csíkjai} talán a csípő legyeket is távol tartják.',
            '{A zebra sörénye|Ennek az állatnak a sörénye} egyenesen felfelé áll, nem dől oldalra.',
            '{A zebra|Ez az állat} valójában fekete bőrű, fehér mintákkal, és nem fordítva.',
            '{A zebrák|Ezek az állatok} hangokkal, arckifejezésekkel és testtartással üzennek egymásnak.',
            '{A zebra kicsinyét|Ennek az állatnak a kicsinyét} csikónak hívják, akárcsak a kis lovat.'
        ],
        hippo: [
            '{A víziló|Ez az állat} a nap nagy részében a vízben hűsöl.',
            '{A vízilovak|Ezek az állatok} több percig is bírják levegő nélkül a víz alatt.',
            '{A víziló bőre|Ennek az állatnak a bőre} saját, természetes naptejet készít.',
            '{A víziló|Ez az állat} a folyó vagy a tó fenekén is tud sétálni.',
            '{A víziló szeme, füle és orra|Ennek az állatnak a szeme, füle és orra} mind a feje tetején van.',
            '{A víziló|Ez az állat} a világ egyik legnagyobb szárazföldi állata.',
            '{A víziló|Ez az állat} a víz alatt szorosan be tudja zárni az orrlyukát és a fülét.',
            '{A víziló szája|Ennek az állatnak a szája} nagyon-nagyon szélesre ki tud nyílni.'
        ],
        rhino: [
            '{Az orrszarvú szarva|Ennek az állatnak a szarva} ugyanabból az anyagból van, mint a körmünk.',
            '{Az orrszarvúaknak|Ezeknek az állatoknak} vastag, kemény bőrük van, majdnem mint egy páncél.',
            '{Az orrszarvú|Ez az állat} meglepően gyorsan fut ilyen nagy állathoz képest.',
            '{Némelyik orrszarvúnak|Némelyik ilyen állatnak} egy szarva van, másoknak kettő.',
            '{Az orrszarvú|Ez az állat} nem lát túl jól, de kiválóan szagol.',
            '{Az orrszarvú|Ez az állat} főleg növényeket és füvet eszik.',
            '{Az orrszarvú kicsinyét|Ennek az állatnak a kicsinyét} borjúnak hívják, akárcsak a kis elefántot.',
            '{Az orrszarvú|Ez az állat} szeret a sárban hemperegni, hogy lehűljön és védje a bőrét.'
        ],
        monkey: [
            '{A majom|Ez az állat} a farkával egyensúlyoz mászás közben.',
            '{A majmok|Ezek az állatok} játékosak, és imádnak ugrálni és hintázni a fák között.',
            '{A majom|Ez az állat} különféle hangokkal és arcokkal beszél a társaival.',
            '{A majom keze és lába|Ennek az állatnak a keze és lába} remekül kapaszkodik az ágakba.',
            '{A majmok|Ezek az állatok} gyakran tisztogatják egymást, így tisztálkodnak és mutatják a barátságukat.',
            '{A majmoknak|Ezeknek az állatoknak} sokféle fajtája él a világ különböző részein.',
            '{Némelyik majomnak|Némelyik ilyen állatnak} hosszú a farka, másoknak nagyon rövid.',
            '{A majom|Ez az állat} ügyes ujjaival apró dolgokat is felvesz, például gyümölcsöt vagy magot.'
        ],
        gorilla: [
            '{A gorilla|Ez az állat} gondoskodik a családi csapatáról.',
            '{A gorillák|Ezek az állatok} sok kézjelet meg tudnak tanulni.',
            '{A gorilla|Ez az állat} a mellét veri, hogy üzenjen a társainak.',
            '{A gorilla|Ez az állat} főleg növényeket eszik, és a napja nagy részét evéssel tölti.',
            '{A gorilla|Ez az állat} az ujjpercein támaszkodva jár, erős karjaira támaszkodva.',
            '{A gorilla|Ez az állat} a legnagyobb az összes főemlős közül.',
            '{A kis gorilla|Ennek az állatnak a kicsinye} gyakran az anyja hátán utazik.',
            '{A gorilla|Ez az állat} minden este friss fészket épít levelekből és ágakból, hogy abban aludjon.'
        ],
        tiger: [
            '{Minden tigrisnek|Minden ilyen állatnak} saját, egyedi csíkmintája van.',
            '{A tigrisek|Ezek az állatok} kiválóan úsznak, és szeretnek a vízben hűsölni.',
            '{A tigris ordítása|Ennek az állatnak az ordítása} majdnem három kilométerre is elhallatszik.',
            '{A tigris csíkjai|Ennek az állatnak a csíkjai} nemcsak a bundáján, hanem a bőrén is látszanak.',
            '{A tigris|Ez az állat} a legnagyobb az összes nagymacska közül.',
            '{A tigris|Ez az állat} csíkos mintájával egyedi a nagymacskák között.',
            '{A tigris|Ez az állat} főleg egyedül él és vándorol, nem úgy, mint az oroszlánok.',
            '{A tigris kicsinyét|Ennek az állatnak a kicsinyét} kölyöknek hívják, akárcsak a kis oroszlánt.'
        ],
        leopard: [
            '{A leopárd|Ez az állat} remekül mászik, és gyakran fent a fán szundikál.',
            '{A leopárd foltjai|Ennek az állatnak a foltjai} segítenek beleolvadni a napfényes, árnyas erdőbe.',
            '{A leopárd|Ez az állat} egyetlen ugrással elképesztően messzire jut.',
            '{A leopárd|Ez az állat} olyan erős, hogy nehéz dolgokat is fel tud vinni a fára.',
            '{A leopárd|Ez az állat} főleg éjszaka aktív, nappal pihen.',
            '{A leopárdnak|Ennek az állatnak} hosszú farka van, ami segít egyensúlyozni mászás közben.',
            '{Minden leopárdnak|Minden ilyen állatnak} saját, különleges foltmintája van.',
            '{A leopárd|Ez az állat} jól úszik, pedig jobban szereti a szárazföldet.'
        ],
        camel: [
            '{A teve púpja|Ennek az állatnak a púpja} zsírt raktároz, nem vizet, hogy messzire tudjon menni.',
            '{A teveknek|Ezeknek az állatoknak} hosszú szempillájuk van, ami távol tartja a homokot a szemüktől.',
            '{A teve|Ez az állat} sokáig kibírja víz nélkül.',
            '{A teve|Ez az állat} be tudja zárni az orrlyukát, hogy ne menjen bele a szálló homok.',
            '{A tevéknek|Ezeknek az állatoknak} két fajtája van: az egyiknek egy púpja van, a másiknak kettő.',
            '{A tevének|Ennek az állatnak} széles, párnás talpa van, így nem süllyed bele a homokba.',
            '{A teve|Ez az állat} nehéz terhet is el tud vinni nagy távolságokra.',
            '{A teve kicsinyét|Ennek az állatnak a kicsinyét} borjúnak hívják.'
        ],
        kangaroo: [
            '{A kenguru|Ez az állat} a kicsinyét egy kényelmes erszényben hordja.',
            '{A kenguruk|Ezek az állatok} az erős farkukkal egyensúlyoznak ugrálás közben.',
            '{A kenguru|Ez az állat} nagyon gyorsan tud ugrálni a füvön.',
            '{A kenguru|Ez az állat} nem tud hátrafelé menni.',
            '{A kenguruk|Ezek az állatok} Ausztráliában élnek.',
            '{A kengurunak|Ennek az állatnak} erős hátsó lábai vannak, nagy, rugózó ugrásokra.',
            '{A kenguru|Ez az állat} a farkát extra lábként használja, hogy egy helyben álljon.',
            '{A kis kenguru|Ennek az állatnak a kicsinye} hónapokig az anyja erszényében marad, amíg nő.'
        ],
        crocodile: [
            '{A krokodil|Ez az állat} sokáig bírja levegő nélkül a víz alatt.',
            '{A krokodilok|Ezek az állatok} már jóval a dinoszauruszok eltűnése előtt is éltek.',
            '{A krokodil szeme és orra|Ennek az állatnak a szeme és orra} kikandikál a vízből, amikor lebeg.',
            '{A krokodilnak|Ennek az állatnak} erős farka van, amivel úszik és kormányoz a vízben.',
            '{A krokodil bőrén|Ennek az állatnak a bőrén} kemény, dudoros pikkelyek védik a testét.',
            '{A krokodil|Ez az állat} az egyik legerősebben harapó állat.',
            '{A krokodil|Ez az állat} nagyon sokáig tud mozdulatlanul lebegni a vízben.',
            '{A krokodil|Ez az állat} a folyóparton napozik, hogy felmelegedjen, mert hidegvérű.'
        ],
        flamingo: [
            '{A flamingó|Ez az állat} gyakran csak egy lábon áll, amikor pihen.',
            '{A flamingó|Ez az állat} rózsaszín színét attól kapja, amit eszik.',
            '{A flamingó|Ez az állat} meglepően kecsesen tud egyensúlyozni.',
            '{A flamingó görbe csőre|Ennek az állatnak a görbe csőre} segít kimerni az élelmet a sekély vízből.',
            '{A flamingók|Ezek az állatok} gyakran nagy, színes csapatokba gyűlnek.',
            '{A flamingó lábán|Ennek az állatnak a lábán} az, ami hátrafelé hajló térdnek látszik, valójában a bokája.',
            '{A flamingó|Ez az állat} nagy távolságokat repül, gyakran éjszaka.',
            '{A kis flamingó|Ennek az állatnak a kicsinye} szürke vagy fehér tollal születik, és növés közben lesz rózsaszín.'
        ],
        peacock: [
            '{A páva|Ez az állat} óriási legyezővé tárja szét színes farktollait.',
            '{A páva tollai|Ennek az állatnak a tollai} kéken és zölden csillognak a napfényben.',
            '{A páva díszes tollai|Ennek az állatnak a díszes tollai} segítenek feltűnni és mutatni magát.',
            '{Csak a hím pávának|Csak ennek az állatnak a hímjének} nőnek hosszú, színes farktollai.',
            '{A páva farktollain|Ennek az állatnak a farktollain} kerek, szemre hasonlító foltok vannak.',
            '{A páva farktollai|Ennek az állatnak a farktollai} olyan hosszúak lehetnek, mint az egész teste.',
            '{A pávatojó|Ennek az állatnak a tojója} barnás színű, hogy elrejtőzzön a fészken.',
            '{A pávák|Ezek az állatok} tudnak repülni, bár többnyire a föld közelében maradnak.'
        ],
        parrot: [
            '{A papagáj|Ez az állat} meg tudja tanulni utánozni a szavakat, amiket hall.',
            '{A papagájoknak|Ezeknek az állatoknak} nagyon élénk, színes tolluk van.',
            '{A papagáj|Ez az állat} erős csőrével feltöri a magvakat és a diót.',
            '{A papagáj|Ez az állat} gyakran az erős lábával tartja az élelmét.',
            '{Némelyik papagáj|Némelyik ilyen állat} ötven évig vagy még tovább is élhet.',
            '{A papagájnak|Ennek az állatnak} görbe, erős csőre van, ami evésben és mászásban is segít.',
            '{A papagáj|Ez az állat} minden lábán két ujj előre, kettő pedig hátra mutat.',
            '{Sok papagáj|Sok ilyen állat} a világ meleg, trópusi részein él.'
        ],
        snake: [
            '{A kígyó|Ez az állat} a nyelve kiöltögetésével szagolja a levegőt.',
            '{A kígyónak|Ennek az állatnak} vadonatúj bőre nő, és egyszerűen kibújik a régiből.',
            '{A kígyó|Ez az állat} sima, hullámzó vonalban halad a földön.',
            '{A kígyó|Ez az állat} a hasával érzi a föld rezgéseit.',
            '{A kígyó testét|Ennek az állatnak a testét} száraz, sima pikkelyek borítják.',
            '{A kígyónak|Ennek az állatnak} nincs szemhéja, ezért a szeme mindig nyitva van, még alvás közben is.',
            '{A kígyó villás nyelve|Ennek az állatnak a villás nyelve} segít egyszerre két irányba szagolni.',
            '{A kígyóknak|Ezeknek az állatoknak} több ezer fajtája él a világon.'
        ],
        lizard: [
            '{Némelyik gyíknak|Némelyik ilyen állatnak} újra kinő a farka, ha elveszíti.',
            '{A gyík|Ez az állat} gyakran meleg kövön napozik, hogy felmelegedjen.',
            '{A gyík|Ez az állat} nagyon gyors, egy szempillantás alatt átsuhan a földön.',
            '{A gyík|Ez az állat} a nap és az árnyék között jár, hogy éppen jó meleg legyen.',
            '{A legtöbb gyíknak|A legtöbb ilyen állatnak} pikkelyes bőre és négy rövid lába van.',
            '{Sok gyík|Sok ilyen állat} kiválóan mászik, még sima felületeken is.',
            '{A gyík|Ez az állat} az orrán keresztül lélegzik, akárcsak mi.',
            '{Némelyik gyík|Némelyik ilyen állat} a hangulatához vagy a környezetéhez igazítja a bőre színét.'
        ],
        eagle: [
            '{A sas|Ez az állat} hihetetlenül magasról is észreveszi a mozgást.',
            '{A sasok|Ezek az állatok} óriási fészket építenek a legmagasabb fák tetejére.',
            '{A sas|Ez az állat} magasan vitorlázik a szélben, szinte szárnycsapás nélkül.',
            '{A sas látása|Ennek az állatnak a látása} sokszor élesebb a miénknél.',
            '{A sas kicsinyét|Ennek az állatnak a kicsinyét} fiókának hívják.',
            '{A sas lábán|Ennek az állatnak a lábán} erős, görbe karmok vannak.',
            '{A sasok|Ezek az állatok} gyakran évről évre ugyanazt a fészket használják, és egyre nagyobbra építik.',
            '{A sas|Ez az állat} kiválóan látja a színeket, sokkal jobban, mint mi.'
        ],
        sloth: [
            '{A lajhár|Ez az állat} nagyon-nagyon lassan mozog a fák között.',
            '{A lajhárok|Ezek az állatok} a nap nagy részét kényelmesen összegömbölyödve alusszák.',
            '{A lajhár bundáján|Ennek az állatnak a bundáján} még apró zöld algák is nőhetnek.',
            '{A lajhár|Ez az állat} csak nagy ritkán jön le a fájáról.',
            '{A lajhár|Ez az állat} meglepően jól úszik, pedig a szárazon lassan mozog.',
            '{A lajhárnak|Ennek az állatnak} hosszú, görbe karmai vannak, amikkel az ágakon lóg.',
            '{A lajhár szőre|Ennek az állatnak a szőre} fordítva nő, mint a legtöbb emlősé, így fejjel lefelé lógva lefolyik róla az eső.',
            '{A lajhárnak|Ennek az állatnak} naponta csak kevés ételre van szüksége, mert nagyon lassan mozog.'
        ]
    };

    // --- spoken phrasing ------------------------------------------------------
    //
    // The Hungarian counterpart of NAF.Say in settings.js, with the same
    // functions and the same Words/Style levels. Lines are built so a name
    // never needs a case ending: "Ez egy tehén", "A tehén így szól: bú".

    function say(h) {
        function lower(s) { return s.toLowerCase(); }
        function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
        function az(word) { return /^[aáeéiíoóöőuúüű]/i.test(word) ? 'az ' : 'a '; }
        function the(word) { return az(word) + lower(word); }

        function reveal(animal) {
            const w = h.words();
            const recorded = h.recorded(animal);
            const n = animal.name;
            if (w === 'few') {
                if (!h.playful()) return n + '.';
                return recorded ? (n + '!') : (n + '! ' + animal.says + '!');
            }
            if (w === 'short') {
                if (!h.playful()) {
                    return recorded ? (n + '.') : (n + '. Hangja: ' + lower(animal.says) + '.');
                }
                const it = 'Ez egy ' + lower(n);
                return recorded ? (it + '!') : (it + '! ' + animal.says + '!');
            }
            const who = h.name();
            const lead = h.playful()
                ? (who ? ('Nézd, ' + who + ', ez egy ' + lower(n) + '!') : ('Ez egy ' + lower(n) + '!'))
                : ('Ez egy ' + lower(n) + '.');
            if (recorded) return lead;
            return lead + ' ' + cap(the(n)) + ' így szól: ' + lower(animal.says) + '.';
        }

        function greeting() {
            const who = h.name();
            if (!who) return 'Válassz egy helyet, és nézd meg, ki köszön!';
            return h.playful()
                ? ('Szia, ' + who + '! Válassz egy helyet, és nézd meg, ki köszön!')
                : (who + '. Válassz egy helyet.');
        }

        function barnPrompt() {
            const w = h.words();
            const who = h.name();
            const z = h.W();
            const Place = cap(z.place);
            if (w === 'few') return h.playful() ? (cap(the(z.place)) + '!') : (Place + '.');
            if (w === 'short') {
                if (!h.playful()) return Place + '. Válaszd, és kinyílik.';
                return who ? (z.openSpoken + ', ' + who + '!') : (z.openSpoken + '!');
            }
            return h.playful()
                ? (who ? (who + ', ' + lower(z.openSpoken) + ', és nézd meg, ki van ' + z.inside + '!')
                       : (z.openSpoken + ', és nézd meg, ki van ' + z.inside + '!'))
                : (Place + '. Ha ezt választod, kinyílik.');
        }

        function pickPrompt() {
            return h.playful() ? 'Ki jöjjön ki?' : 'Válassz egy állatot.';
        }

        function findPrompt(animal, riddle) {
            const w = h.words();
            if (w === 'few') return riddle + ' Melyik az?';
            if (w === 'short') return riddle + ' Melyik állat ez?';
            return 'Figyelj jól! ' + riddle + ' Melyik állat ez?';
        }

        function wrongPick(chosen, target) {
            const lead = h.playful()
                ? ('Ez ' + the(chosen.name) + '! ' + chosen.says + '!')
                : ('Ez ' + the(chosen.name) + '.');
            return lead + ' Most ezt keressük: ' + lower(target.name) + '.';
        }

        function rightPick(animal) {
            const who = h.name();
            const it = cap(the(animal.name));
            if (!h.playful()) return 'Helyes. ' + it + '.';
            return who ? ('Igen, ' + who + '! ' + it + '!') : ('Igen! ' + it + '!');
        }

        const CHEERS = ['Hurrá', 'Juhé', 'Csodás', 'Szuper', 'Fantasztikus'];
        let cheerAt = 0;

        function friendEarned(animal, fact) {
            fact = fact || NAF.Facts.random(animal);
            if (!h.playful()) return 'Felkerült a táblára: ' + lower(animal.name) + '. ' + fact;
            const cheer = CHEERS[cheerAt++ % CHEERS.length];
            if (h.words() === 'few') return cheer + '! ' + animal.name + '!';
            const me = h.name();
            if (h.words() === 'short') return cheer + (me ? (', ' + me) : '') + '! ' + fact;
            return cheer + (me ? (', ' + me) : '') + '! ' + fact + ' Nézd meg a képernyő tetején!';
        }

        const ROW_LINES = [
            function (who) { return 'Sikerült' + who + '! Már öt állatod van! Keressünk még!'; },
            function (who) { return 'Szép munka' + who + '! Megtelt a tábla új állatokkal!'; },
            function (who) { return 'Hű' + who + '! Öt állatot találtál! Nézzük, ki van még odakint!'; },
            function (who) { return 'Ügyes vagy' + who + '! Öt állat már biztonságban van!'; },
            function (who) { return 'Hurrá' + who + '! Megtelt az egész tábla! Jöhet még?'; }
        ];
        const ROW_FEW = ['Kész', 'Ügyes', 'Hurrá', 'Szép munka', 'Fantasztikus'];
        let rowAt = 0;

        function rowComplete() {
            const who = h.name();
            if (!h.playful()) return 'Mind az öt felkerült. Kezdjük újra.';
            if (h.words() === 'few') {
                const cheer = ROW_FEW[rowAt++ % ROW_FEW.length];
                return who ? (cheer + ', ' + who + '!') : (cheer + '!');
            }
            return ROW_LINES[rowAt++ % ROW_LINES.length](who ? (', ' + who) : '');
        }

        return {
            reveal: reveal, greeting: greeting, barnPrompt: barnPrompt, pickPrompt: pickPrompt,
            findPrompt: findPrompt, wrongPick: wrongPick, rightPick: rightPick,
            friendEarned: friendEarned, rowComplete: rowComplete, playerName: h.name
        };
    }

    return {
        lang: 'hu', ui: ui, helpLines: helpLines, colors: colors, keyRows: keyRows,
        zones: zones, animals: animals, facts: facts, say: say,
        fallbackFact: function (animal) { return animal.name + '.'; }
    };
})();
