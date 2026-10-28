/**
 * NARBE Animal Friends - Romanian text.
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
        'On': 'Pornit',
        'Off': 'Oprit',
        'Default': 'Implicită',
        'Pause': 'Pauză',
        'Pause.': 'Pauză.',
        'NARBE Animal Friends': 'Animale prietenoase',
        'Tap Space = next · hold Space = back · Enter = choose':
            'Space scurt = înainte · Space lung = înapoi · Enter = alege',
        'Which way would you like to play?': 'Cum vrei să joci?',
        'Settings': 'Setări',
        'Settings.': 'Setări.',
        'Paused': 'Pauză',
        'Paused.': 'Pauză.',
        'How to Play': 'Cum se joacă',
        'How to play.': 'Cum se joacă.',
        'How to play. Choose the title to hear the directions.':
            'Cum se joacă. Alege titlul ca să asculți instrucțiunile.',
        'How to play. Choose this to hear the directions.':
            'Cum se joacă. Alege asta ca să asculți instrucțiunile.',
        'Visit the ': 'Vizitează ',
        '{n} animals to meet.': 'Poți cunoaște {n} de animale.',
        'Exit Game': 'Ieșire',
        'Exit game. Goes back to the hub.': 'Ieșire. Te întorci la meniul principal al aplicației.',
        'Press to see who comes out.': 'Apasă ca să vezi cine iese.',
        'Pick an Animal': 'Alege un animal',
        'Pick an animal. Choose who comes out.': 'Alege un animal. Tu alegi cine iese.',
        'Listen and Find': 'Ascultă și găsește',
        'Listen and find. Hear an animal, then find it. Nothing to lose.':
            'Ascultă și găsește. Ascultă indiciul, apoi găsește animalul. Nu poți pierde.',
        'Back': 'Înapoi',
        'Back.': 'Înapoi.',
        'Back to the main menu.': 'Înapoi la meniul principal.',
        'Continue': 'Continuă',
        'Continue playing.': 'Continuă jocul.',
        'Play a Different Game': 'Alt mod de joc',
        'Play a different game. Choose another way to play.': 'Alt mod de joc. Alege alt fel de a juca.',
        'Main Menu': 'Meniul principal',
        'Main menu.': 'Meniul principal.',
        'Speaking': 'Citire cu voce',
        'Speaking on. Everything is read aloud.': 'Citirea cu voce e pornită. Totul este citit cu voce tare.',
        'Speaking off.': 'Citirea cu voce e oprită.',
        'Show Text': 'Arată textul',
        'Show text on. What is spoken is also written on the screen.':
            'Textul e pornit. Ce se spune apare și scris pe ecran.',
        'Show text off. Everything is still read aloud.':
            'Textul e oprit. Totul este citit în continuare cu voce tare.',
        'Voice': 'Voce',
        'Voice. {v}. This is the voice you will hear.': 'Voce. {v}. Aceasta este vocea pe care o vei auzi.',
        'Player Name': 'Numele jucătorului',
        'Not set': 'Nesetat',
        'Player name. {n}. The game says your name while you play.':
            'Numele jucătorului. {n}. Jocul îți spune numele în timp ce joci.',
        'Player name. Someone else can type a name here, and the game will use it while you play.':
            'Numele jucătorului. Altcineva poate scrie aici un nume, iar jocul îl va folosi în timp ce joci.',
        'Auto Scan': 'Scanare automată',
        'On — One Switch': 'Pornită — un buton',
        'Off — Two Switches': 'Oprită — două butoane',
        'Auto scan on. One switch. The highlight moves by itself and Enter chooses.':
            'Scanarea automată e pornită. Un buton. Evidențierea se mută singură, iar Enter alege.',
        'Auto scan off. Two switches. Space moves the highlight, Enter chooses.':
            'Scanarea automată e oprită. Două butoane. Space mută evidențierea, Enter alege.',
        'Scan Speed': 'Viteza scanării',
        'Scan speed {s}. How long you have to press.':
            'Viteza scanării: {s}. Atât timp ai ca să apeși.',
        'Highlight Style': 'Stilul evidențierii',
        'Block': 'Plin',
        'Bold Band': 'Chenar gros',
        'Highlight style, block. The whole button fills with colour.':
            'Stilul evidențierii: plin. Tot butonul se colorează.',
        'Highlight style, bold band. A thick band is drawn around the button.':
            'Stilul evidențierii: chenar gros. Un chenar gros apare în jurul butonului.',
        'Highlight Color': 'Culoarea evidențierii',
        'Highlight color, {c}. This is the colour that shows you where you are.':
            'Culoarea evidențierii: {c}. Această culoare îți arată unde ești.',
        'Animal Sounds': 'Sunetele animalelor',
        'Animal sounds on. You hear each animal when it comes out.':
            'Sunetele animalelor sunt pornite. Auzi fiecare animal când iese.',
        "Animal sounds off. The animal's sound is spoken instead.":
            'Sunetele animalelor sunt oprite. Sunetul animalului este spus cu voce.',
        'Music': 'Muzică',
        'Music on. It plays quietly behind the menus and while you play.':
            'Muzica e pornită. Se aude încet în meniuri și în timpul jocului.',
        'Music off.': 'Muzica e oprită.',
        'Graphics quality': 'Calitatea graficii',
        'Auto': 'Automată',
        'High': 'Înaltă',
        'Standard': 'Standard',
        'Use Hub setting': 'Setarea din meniul principal',
        'full change next launch': 'schimbarea completă la următoarea pornire',
        'Low': 'Scăzută',
        'Player name. Scan to a row and choose it, then scan to a letter in that row and choose it to spell your name. Choose Done at any time to keep it.':
            'Numele jucătorului. Mergi la un rând și alege-l, apoi mergi la o literă din acel rând și alege-o ca să-ți scrii numele. Alege Gata oricând ca să-l păstrezi.',
        'Scan to a row and choose it, then scan to a letter and choose it to spell your name. Someone else can also choose letters with a touchscreen or a mouse. Choose Done to keep it.':
            'Mergi la un rând și alege-l, apoi mergi la o literă și alege-o ca să-ți scrii numele. Altcineva poate alege litere și cu ecranul tactil sau cu mouse-ul. Alege Gata ca să-l păstrezi.',
        'Spell a name below': 'Scrie un nume mai jos',
        'Player name': 'Numele jucătorului',
        'Space': 'Spațiu',
        'Backspace': 'Șterge',
        'Done': 'Gata',
        'Clear the Name': 'Șterge numele',
        'Row: {r}.': 'Rândul: {r}.',
        'and': 'și',
        'Done. Keeps the name and goes back.': 'Gata. Păstrează numele și se întoarce.',
        'Hello {n}!': 'Bună, {n}!',
        'Clear the name.': 'Șterge numele.',
        'Name cleared.': 'Numele a fost șters.',
        'Goodbye.': 'La revedere!'
    };

    const helpLines = [
        'Alege un loc de vizitat: hambarul, acvariul sau safariul.',
        'Apoi alege să-l deschizi. Un animal iese să te salute.',
        '*Apasă scurt Space* ca să muți evidențierea. *Ține apăsat Space* ca să mergi înapoi.',
        '*Enter* alege ce este evidențiat.',
        'Alege *Pauză* ca să te oprești și să schimbi ceva.',
        'În *Setări* poți porni sau opri sunetele și muzica și poți schimba evidențierea și altele.',
        'Nu există scor, nici cronometru și nu poți pierde.'
    ];

    // Same order as HIGHLIGHT_COLORS in settings.js.
    const colors = ['Auriu', 'Turcoaz', 'Albastru', 'Verde deschis', 'Roșu', 'Violet', 'Roz', 'Alb', 'Negru'];

    // The name keyboard, ABC order with the Romanian letters.
    const keyRows = [
        ['A', 'Ă', 'Â', 'B', 'C', 'D'],
        ['E', 'F', 'G', 'H', 'I', 'Î'],
        ['J', 'K', 'L', 'M', 'N', 'O'],
        ['P', 'Q', 'R', 'S', 'Ș', 'T'],
        ['Ț', 'U', 'V', 'W', 'X', 'Y'],
        ['Z', '0', '1', '2', '3', '4'],
        ['5', '6', '7', '8', '9']
    ];

    const zones = {
        barn: {
            name: 'Hambarul',
            words: {
                visit: 'Vizitează hambarul', visitPrefix: 'Vizitează ', visitName: 'hambarul', place: 'hambarul',
                openLabel: 'Deschide hambarul', openSpoken: 'Deschide hambarul',
                inside: 'în hambar', board: 'hambar'
            }
        },
        aquarium: {
            name: 'Acvariul',
            words: {
                visit: 'Vizitează acvariul', visitPrefix: 'Vizitează ', visitName: 'acvariul', place: 'bazinul',
                openLabel: 'Deschide bazinul', openSpoken: 'Deschide bazinul',
                inside: 'în bazin', board: 'acvariu'
            }
        },
        safari: {
            name: 'Safariul',
            words: {
                visit: 'Vizitează safariul', visitPrefix: 'Vizitează ', visitName: 'safariul', place: 'poarta',
                openLabel: 'Deschide poarta', openSpoken: 'Deschide poarta',
                inside: 'după poartă', board: 'safari'
            }
        }
    };

    // id: [name, sound word, "a/an" form, "the" form]
    const animals = {
        cow: ['Vacă', 'Muu', 'o vacă', 'vaca'],
        pig: ['Porc', 'Guiț guiț', 'un porc', 'porcul'],
        goat: ['Capră', 'Behehe', 'o capră', 'capra'],
        sheep: ['Oaie', 'Beee', 'o oaie', 'oaia'],
        horse: ['Cal', 'Ihaha', 'un cal', 'calul'],
        duck: ['Rață', 'Mac mac', 'o rață', 'rața'],
        rooster: ['Cocoș', 'Cucurigu', 'un cocoș', 'cocoșul'],
        dog: ['Câine', 'Ham ham', 'un câine', 'câinele'],
        cat: ['Pisică', 'Miau', 'o pisică', 'pisica'],
        owl: ['Bufniță', 'Hu hu', 'o bufniță', 'bufnița'],
        turkey: ['Curcan', 'Glu glu', 'un curcan', 'curcanul'],
        bull: ['Taur', 'Pfff', 'un taur', 'taurul'],
        llama: ['Lamă', 'Hmmm', 'o lamă', 'lama'],
        rabbit: ['Iepure', 'Tup tup', 'un iepure', 'iepurele'],
        mouse: ['Șoarece', 'Chiț chiț', 'un șoarece', 'șoarecele'],
        bee: ['Albină', 'Bzzz', 'o albină', 'albina'],
        frog: ['Broască', 'Oac oac', 'o broască', 'broasca'],
        butterfly: ['Fluture', 'Flap flap', 'un fluture', 'fluturele'],
        hedgehog: ['Arici', 'Sniff', 'un arici', 'ariciul'],
        squirrel: ['Veveriță', 'Cric cric', 'o veveriță', 'veverița'],
        fish: ['Pește', 'Blub', 'un pește', 'peștele'],
        tropicalfish: ['Pește tropical', 'Blup', 'un pește tropical', 'peștele tropical'],
        blowfish: ['Pește-balon', 'Puf', 'un pește-balon', 'peștele-balon'],
        shark: ['Rechin', 'Hap', 'un rechin', 'rechinul'],
        octopus: ['Caracatiță', 'Pleosc', 'o caracatiță', 'caracatița'],
        squid: ['Calmar', 'Fâș', 'un calmar', 'calmarul'],
        crab: ['Crab', 'Clanț', 'un crab', 'crabul'],
        lobster: ['Homar', 'Clic', 'un homar', 'homarul'],
        shrimp: ['Crevete', 'Pic', 'un crevete', 'crevetele'],
        dolphin: ['Delfin', 'Iii iii', 'un delfin', 'delfinul'],
        whale: ['Orcă', 'Huuu', 'o orcă', 'orca'],
        bigwhale: ['Balenă mare', 'Pleosc', 'o balenă mare', 'balena mare'],
        seal: ['Focă', 'Arf arf', 'o focă', 'foca'],
        penguin: ['Pinguin', 'Cra cra', 'un pinguin', 'pinguinul'],
        turtle: ['Țestoasă', 'Plici', 'o țestoasă', 'țestoasa'],
        otter: ['Vidră', 'Cirip', 'o vidră', 'vidra'],
        jellyfish: ['Meduză', 'Plutește', 'o meduză', 'meduza'],
        starfish: ['Stea de mare', 'Fâș', 'o stea de mare', 'steaua de mare'],
        oyster: ['Stridie', 'Poc', 'o stridie', 'stridia'],
        seasnail: ['Melc de mare', 'Alunecă', 'un melc de mare', 'melcul de mare'],
        lion: ['Leu', 'Rrrooar', 'un leu', 'leul'],
        elephant: ['Elefant', 'Tuuu', 'un elefant', 'elefantul'],
        giraffe: ['Girafă', 'Hmmm', 'o girafă', 'girafa'],
        zebra: ['Zebră', 'Ihaha', 'o zebră', 'zebra'],
        hippo: ['Hipopotam', 'Mor mor', 'un hipopotam', 'hipopotamul'],
        rhino: ['Rinocer', 'Pfff', 'un rinocer', 'rinocerul'],
        monkey: ['Maimuță', 'U u a a', 'o maimuță', 'maimuța'],
        gorilla: ['Gorilă', 'Hu hu', 'o gorilă', 'gorila'],
        tiger: ['Tigru', 'Mârrr', 'un tigru', 'tigrul'],
        leopard: ['Leopard', 'Sss', 'un leopard', 'leopardul'],
        camel: ['Cămilă', 'Mmmm', 'o cămilă', 'cămila'],
        kangaroo: ['Cangur', 'Tup', 'un cangur', 'cangurul'],
        crocodile: ['Crocodil', 'Clanț', 'un crocodil', 'crocodilul'],
        flamingo: ['Flamingo', 'Cra', 'un flamingo', 'flamingoul'],
        peacock: ['Păun', 'Ia-o', 'un păun', 'păunul'],
        parrot: ['Papagal', 'Bună', 'un papagal', 'papagalul'],
        snake: ['Șarpe', 'Sss', 'un șarpe', 'șarpele'],
        lizard: ['Șopârlă', 'Fâș', 'o șopârlă', 'șopârla'],
        eagle: ['Vultur', 'Iiii', 'un vultur', 'vulturul'],
        sloth: ['Leneș', 'Haaa', 'un leneș', 'leneșul']
    };

    const facts = {
        // --- the barn ---------------------------------------------------------
        cow: [
            '{Vaca poate dormi și în picioare, și culcată.|Acest animal poate dormi și în picioare, și culcat.}',
            '{Vacile|Aceste animale} își ating des nasurile ca să se salute.',
            '{Stomacul vacii|Stomacul acestui animal} are patru părți, ca să digere iarba.',
            '{Vaca|Acest animal} nu are dinți în față sus, ci doar o pernuță tare și netedă.',
            '{O vacă|Acest animal} poate bea o cadă întreagă de apă într-o singură zi.',
            '{Vaca|Acest animal} miroase foarte bine și simte mirosuri de departe.',
            '{Vaca|Acest animal} rumegă: aduce mâncarea înapoi în gură ca s-o mestece din nou.',
            '{Vaca|Acest animal} aude sunete mult mai joase și mai înalte decât noi.'
        ],
        pig: [
            '{Porcii|Aceste animale} sunt foarte deștepți și le place să se tăvălească în noroi ca să se răcorească.',
            '{Coada încolăcită a porcului|Coada încolăcită a acestui animal} se mișcă atunci când e fericit.',
            '{Porcii|Aceste animale} au un miros excelent.',
            '{Puiul porcului|Puiul acestui animal} se numește purcel.',
            '{Porcii|Aceste animale} înoată surprinzător de bine.',
            '{Porcul|Acest animal} poate adulmeca mâncarea îngropată în pământ.',
            '{Porcii|Aceste animale} sapă foarte bine și își folosesc râtul ca pe o lopată.',
            '{Porcii|Aceste animale} dorm cu plăcere lipiți unii de alții.'
        ],
        goat: [
            '{Caprele|Aceste animale} se cațără minunat și își țin echilibrul pe margini foarte înguste.',
            '{Puiul caprei|Puiul acestui animal} se numește ied.',
            '{Caprele|Aceste animale} au pupile dreptunghiulare, care le ajută să vadă aproape de jur împrejur.',
            '{Caprele|Aceste animale} trăiesc în grup, în turmă.',
            '{Caprelor|Acestor animale} le place să guste câte puțin din multe plante diferite.',
            '{Iedul|Puiul acestui animal} poate sări și se poate juca la doar o zi după ce se naște.',
            '{Multe capre|Multe dintre aceste animale} au un smoc de păr ca o bărbiță sub bărbie.',
            '{Capra|Acest animal} își poate roti urechile ca să asculte sunete din direcții diferite.'
        ],
        sheep: [
            '{Lâna oii|Lâna acestui animal} crește tot anul, ca părul.',
            '{Oile|Aceste animale} țin minte fețele altor oi ani de zile.',
            '{Oile|Aceste animale} trăiesc împreună, în turmă.',
            '{Puiul oii|Puiul acestui animal} se numește miel.',
            '{Lâna oii|Lâna acestui animal} poate fi tunsă și toarsă într-un fir moale.',
            '{Oaia|Acest animal} vede aproape de jur împrejur fără să întoarcă capul.',
            '{Oile|Aceste animale} stau aproape unele de altele în turmă când pasc.',
            '{Lâna oii|Lâna acestui animal} poate avea multe culori, nu doar albă.'
        ],
        horse: [
            '{Caii|Aceste animale} pot dormi și culcați, și în picioare.',
            '{Calul|Acest animal} poate alerga foarte repede pe un câmp deschis.',
            '{Caii|Aceste animale} văd aproape de jur împrejur fără să întoarcă capul.',
            '{Puiul calului|Puiul acestui animal} se numește mânz.',
            '{Calul|Acest animal} își poate zvâcni pielea ca să alunge o muscă.',
            '{Calul|Acest animal} are la fiecare picior o singură copită mare, ca un pantof.',
            '{Calul|Acest animal} își poate mișca urechile separat, ca să asculte în direcții diferite.',
            '{Calul|Acest animal} poate bea multă apă foarte repede.'
        ],
        duck: [
            '{Penele raței nu lasă apa să treacă, așa că rămâne uscată.|Penele acestui animal nu lasă apa să treacă, așa că rămâne uscat.}',
            '{Rățuștele|Puii acestui animal} pot înota la doar câteva ore după ce ies din ou.',
            '{Rațele|Aceste animale} au o pleoapă în plus, care le apără ochii sub apă.',
            '{Rața|Acest animal} are picioare cu membrane, care merg ca niște vâsle mici.',
            '{Rațele|Aceste animale} înoată des în șir, una după alta.',
            '{Rața poate dormi cu un ochi deschis, ca să fie atentă.|Acest animal poate dormi cu un ochi deschis, ca să fie atent.}',
            '{Ciocul raței este foarte sensibil și o ajută să simtă mâncarea sub apă.|Ciocul acestui animal este foarte sensibil și îl ajută să simtă mâncarea sub apă.}',
            '{Rățoiul și rața|Masculul și femela acestui animal} arată adesea foarte diferit.'
        ],
        rooster: [
            '{Cocoșul|Acest animal} cântă la răsăritul soarelui, dar poate cânta oricând în timpul zilei.',
            '{Cocoșii|Aceste animale} au pene strălucitoare și colorate.',
            '{Cocoșul|Acest animal} poate cânta aproape de oriunde, chiar și de sus.',
            '{Cocoșul|Acest animal} este perechea găinii.',
            '{Cocoșul|Acest animal} are pe cap o creastă roșie și moale.',
            '{Cocoșul|Acest animal} are pinteni în spatele picioarelor.',
            '{Cocoșul|Acest animal} vede culorile și observă ușor culorile vii.',
            '{Cocoșul|Acest animal} se plimbă adesea țanțoș ca să se laude în fața găinilor.'
        ],
        dog: [
            '{Amprenta nasului câinelui|Amprenta nasului acestui animal} este unică, la fel ca amprenta degetului.',
            '{Câinii|Aceste animale} dau din coadă când sunt fericiți sau entuziasmați.',
            '{Unii câini|Unele dintre aceste animale} pot învăța sute de cuvinte.',
            '{Câinele|Acest animal} aude sunete mult mai slabe decât noi.',
            '{Câinele|Acest animal} gâfâie ca să se răcorească.',
            '{Câinele|Acest animal} miroase mult, mult mai bine decât un om.',
            '{Câinii|Aceste animale} transpiră mai ales prin pernuțele labelor.',
            '{Câinele|Acest animal} visează când doarme și uneori își mișcă labele.'
        ],
        cat: [
            '{Pisica își folosește mustățile ca să simtă ce e în jurul ei.|Acest animal își folosește mustățile ca să simtă ce e în jurul lui.}',
            '{Pisicile|Aceste animale} petrec o mare parte din zi dormind și întinzându-se.',
            '{Pisica toarce când se simte liniștită și bine.|Acest animal toarce când se simte liniștit și bine.}',
            '{Pisica poate sări de vreo cinci ori mai sus decât înălțimea ei.|Acest animal poate sări de vreo cinci ori mai sus decât înălțimea lui.}',
            '{Pisica se spală cu grijă cu limbuța ei aspră.|Acest animal se spală cu grijă cu limbuța lui aspră.}',
            '{Pisica are o coloană foarte flexibilă, care o ajută să se întoarcă și să aterizeze pe picioare.|Acest animal are o coloană foarte flexibilă, care îl ajută să se întoarcă și să aterizeze pe picioare.}',
            '{Limba aspră a pisicii|Limba aspră a acestui animal} are mici cârlige pentru spălat blana.',
            '{Pisica|Acest animal} face multe sunete diferite ca să spună ce vrea.'
        ],
        owl: [
            '{Bufnița|Acest animal} își poate întoarce capul aproape complet.',
            '{Bufnița|Acest animal} zboară atât de încet încât abia se aude pe cerul nopții.',
            '{Bufnițele|Aceste animale} au ochi uriași, care le ajută să vadă bine noaptea.',
            '{Bufnița|Acest animal} nu își poate mișca ochii, așa că își întoarce tot capul ca să se uite în jur.',
            '{Puiul bufniței|Puiul acestui animal} iese dintr-un ou, ca toate păsările.',
            '{Unele bufnițe|Unele dintre aceste animale} aud extrem de bine și își folosesc urechile ca să găsească sunetele.',
            '{Bufnița are pene moi și pufoase care o țin la căldură.|Acest animal are pene moi și pufoase care îl țin la căldură.}',
            '{Bufnițele|Aceste animale} sunt treze mai ales noaptea și dorm ziua.'
        ],
        turkey: [
            '{Curcanul|Acest animal} își poate desface penele cozii ca pe un evantai mare.',
            '{Curcanii|Aceste animale} pot alerga destul de repede când vor.',
            '{Capul curcanului|Capul acestui animal} își poate schimba culoarea când e entuziasmat.',
            '{Curcanul|Acest animal} are deasupra ciocului o bucată lungă de piele care atârnă.',
            '{Curcanul|Acest animal} vede culorile, la fel ca noi.',
            '{Curcanul|Acest animal} vede bine și cuprinde cu privirea o zonă foarte largă.',
            '{Curcanii|Aceste animale} umblă des în grup.',
            '{Curcanii sălbatici|Aceste animale, când trăiesc în sălbăticie,} pot zbura pe distanțe scurte, chiar dacă sunt păsări mari.'
        ],
        bull: [
            '{Taurul|Acest animal} este masculul puternic și mare al vitelor.',
            '{Taurii|Aceste animale} au gâtul gros și umerii lați.',
            '{Un taur|Acest animal} poate cântări cât o mașină mică.',
            '{Unii tauri|Unele dintre aceste animale} au o cocoașă puternică și musculoasă pe umeri.',
            '{Mulți tauri|Multe dintre aceste animale} au coarne care cresc toată viața.',
            '{Taurul|Acest animal} are mușchi foarte puternici la umeri și la gât.',
            '{Taurul|Acest animal} poate trăi mulți ani la fermă.',
            '{Taurul|Acest animal} trăiește adesea într-o cireadă, împreună cu alte vite.'
        ],
        llama: [
            '{Lamele|Aceste animale} fredonează ca să se salute.',
            '{Lama|Acest animal} are un gât lung și pufos și lână moale.',
            '{Lamele|Aceste animale} cară foarte bine lucruri pe dealuri abrupte.',
            '{Lama|Acest animal} are tălpi moi, ca niște perne, care se țin bine pe pietre.',
            '{Lama|Acest animal} vine din munții înalți ai Americii de Sud.',
            '{Lama are un stomac cu trei părți, care o ajută să digere plantele tari.|Acest animal are un stomac cu trei părți, care îl ajută să digere plantele tari.}',
            '{Urechile lamei|Urechile acestui animal} au forma unei banane și se pot întoarce în direcții diferite.',
            '{Lama|Acest animal} poate scuipa ca să le transmită ceva celorlalte.'
        ],
        rabbit: [
            '{Iepurele|Acest animal} poate sări de multe ori mai sus decât înălțimea lui.',
            '{Iepurii|Aceste animale} au urechi lungi, care îi ajută să audă de departe.',
            '{Iepurele|Acest animal} bate din picior ca să-i anunțe pe ceilalți că se întâmplă ceva.',
            '{Dinții iepurelui|Dinții acestui animal} nu se opresc din crescut, așa că el roade ca să-i țină scurți.',
            '{Iepurii|Aceste animale} trăiesc adesea în grup, în vizuini sub pământ.',
            '{Urechile lungi ale iepurelui|Urechile lungi ale acestui animal} îl ajută și să se răcorească pe căldură.',
            '{Iepurele|Acest animal} are picioare din spate puternice, făcute pentru salturi rapide.',
            '{Iepurele|Acest animal} e cel mai activ în zori și la apus.'
        ],
        mouse: [
            '{Șoarecele|Acest animal} se poate strecura prin găuri cât o monedă.',
            '{Șoarecii|Aceste animale} își folosesc mustățile lungi ca să-și găsească drumul pe întuneric.',
            '{Coada șoarecelui|Coada acestui animal} îl ajută să-și țină echilibrul când aleargă.',
            '{Șoarecele|Acest animal} aude sunete foarte înalte, pe care noi nu le auzim deloc.',
            '{Șoarecele|Acest animal} se cațără surprinzător de bine și poate urca pe pereți.',
            '{Șoarecele|Acest animal} poate trăi în multe locuri, de la câmpuri la case.',
            '{Șoarecele|Acest animal} nu vede bine, dar se bazează pe mustăți și pe miros.',
            '{Șoarecele|Acest animal} își face un cuib mic din materiale moi pe care le găsește.'
        ],
        bee: [
            '{Albina|Acest animal} vizitează multe flori ca să adune nectar dulce.',
            '{Albinele|Aceste animale} dansează ca să le arate celorlalte unde sunt florile.',
            '{Albina|Acest animal} vizitează mii de flori ca să facă puțină miere.',
            '{Albina|Acest animal} are pe tot corpul peri mici de care se prinde polenul.',
            '{Într-un stup pot trăi zeci de mii de albine.|Zeci de mii de astfel de animale pot trăi într-o singură casă.}',
            '{Albina|Acest animal} are două perechi de aripi care bat foarte repede.',
            '{Albina lucrătoare|Acest animal, când e lucrător,} muncește mult ca să aibă grijă de stup.',
            '{Regina albinelor|Regina acestor animale} este singura din stup care depune ouă.'
        ],
        frog: [
            '{Broasca|Acest animal} poate respira puțin și prin piele.',
            '{Broaștele|Aceste animale} își prind repede mâncarea cu limba lungă și lipicioasă.',
            '{Puiul broaștei|Puiul acestui animal} se numește mormoloc și își începe viața în apă.',
            '{Broasca|Acest animal} își trage ochii în cap când clipește.',
            '{Pielea broaștei|Pielea acestui animal} trebuie să rămână umedă ca să fie sănătoasă.',
            '{Broasca poate sări de multe ori lungimea corpului ei.|Acest animal poate sări de multe ori lungimea corpului lui.}',
            '{Broaștele|Aceste animale} au multe culori vii și modele.',
            '{Broasca|Acest animal} ia apa prin piele, nu o bea cu gura.'
        ],
        butterfly: [
            '{Fluturele|Acest animal} simte gustul cu picioarele.',
            '{Fluturii|Aceste animale} își încep viața ca omizi, înainte să le crească aripi.',
            '{Aripile fluturelui|Aripile acestui animal} sunt acoperite cu solzișori mici și colorați.',
            '{Fluturele|Acest animal} bea printr-o limbă lungă și răsucită, ca un pai mic.',
            '{Fluturele|Acest animal} trebuie să se încălzească înainte să poată zbura.',
            '{Fluturele|Acest animal} are patru aripi, nu doar două.',
            '{Fluturii|Aceste animale} își folosesc antenele ca să miroasă aerul.',
            '{Fluturele|Acest animal} vede mult mai multe culori decât oamenii.'
        ],
        hedgehog: [
            '{Ariciul|Acest animal} se face ghem, o minge mică și țepoasă, ca să fie în siguranță.',
            '{Aricii|Aceste animale} au mii de țepi ascuțiți pe spate.',
            '{Ariciul|Acest animal} iese mai ales noaptea să caute mâncare.',
            '{Ariciul|Acest animal} aleargă mai repede decât ai crede, mai ales când e entuziasmat.',
            '{Ariciul|Acest animal} poate înota dacă trebuie să treacă o apă.',
            '{Ariciul|Acest animal} miroase și aude foarte bine.',
            '{Ariciul|Acest animal} vede cel mai bine în lumină slabă, nu în soare puternic.',
            '{Ariciul|Acest animal} adulmecă des pământul în timp ce explorează.'
        ],
        squirrel: [
            '{Veverița|Acest animal} îngroapă nuci și adesea își amintește unde, chiar și după luni.',
            '{Veverițele|Aceste animale} își folosesc coada stufoasă ca pe o pătură caldă.',
            '{Veverița|Acest animal} sare din copac în copac cu un echilibru uimitor.',
            '{Picioarele din spate ale veveriței|Picioarele din spate ale acestui animal} se pot întoarce, așa că poate coborî din copac cu capul în jos.',
            '{Veverița|Acest animal} doarme în scorburi sau în cuiburi făcute din crenguțe.',
            '{Veverița are gheare ascuțite care o ajută să se țină de scoarța copacilor.|Acest animal are gheare ascuțite care îl ajută să se țină de scoarța copacilor.}',
            '{Ochii veveriței|Ochii acestui animal} sunt așezați așa încât vede o zonă largă în jur.',
            '{Veverița|Acest animal} își găsește din nou mâncarea datorită mirosului excelent.'
        ],

        // --- the aquarium -------------------------------------------------------
        fish: [
            '{Majoritatea peștilor|Majoritatea acestor animale} respiră sub apă prin branhii.',
            '{Solzii peștelui|Solzii acestui animal} îi apără pielea ca niște scuturi mici.',
            '{Peștii|Aceste animale} simt cele mai mici mișcări ale apei din jurul corpului.',
            '{Peștele|Acest animal} doarme cu ochii deschiși, pentru că nu are pleoape.',
            '{Unii pești|Unele dintre aceste animale} pot chiar să învețe să recunoască fața unui om.',
            '{Înotătoarele peștelui|Înotătoarele acestui animal} au forme diferite, ca să se miște în feluri diferite.',
            '{Peștii|Aceste animale} pot fi de multe mărimi, de la foarte mici la uriași.',
            '{Peștele|Acest animal} are o bășică de înot, care îl ajută să plutească la adâncimi diferite.'
        ],
        tropicalfish: [
            '{Peștii tropicali|Aceste animale} au unele dintre cele mai vii culori din mare.',
            '{Peștele tropical|Acest animal} trăiește în jurul recifelor de corali calde și însorite.',
            '{Unii pești tropicali|Unele dintre aceste animale} își schimbă culoarea după starea lor.',
            '{Peștii tropicali|Aceste animale} înoată adesea împreună, într-un grup mare numit banc.',
            '{Culorile vii ale peștelui tropical|Culorile vii ale acestui animal} îl ajută să-i recunoască pe cei de felul lui.',
            '{Modelele peștelui tropical|Modelele acestui animal} îl ajută să se ascundă sau să iasă în evidență pe recif.',
            '{Puii peștilor tropicali|Puii acestor animale} pot arăta foarte diferit față de cum vor arăta când cresc.',
            '{Peștii tropicali|Aceste animale} găsesc pe recif adăpost și mâncare.'
        ],
        blowfish: [
            '{Peștele-balon|Acest animal} se poate umfla ca o minge rotundă ca să fie în siguranță.',
            '{Peștii-balon|Aceste animale} înghit repede apă ca să devină mult mai mari.',
            '{Forma rotundă de balon a peștelui-balon|Forma rotundă de balon a acestui animal} îl face să pară mult mai mare.',
            '{Peștele-balon|Acest animal} se mai numește și pește-ghimpos.',
            '{Peștele-balon|Acest animal} înoată de obicei încet, mișcându-și ușor înotătoarele mici.',
            '{Peștele-balon|Acest animal} are o gură ca un cioc, cu care își sfărâmă mâncarea.',
            '{Peștele-balon|Acest animal} poate trăi în apă sărată sau dulce, după soi.',
            '{Pielea peștelui-balon|Pielea acestui animal} e acoperită de țepi mici, care se văd când se umflă.'
        ],
        shark: [
            '{Rechinul|Acest animal} simte mirosuri în apă de foarte departe.',
            '{Rechinii|Aceste animale} înoată în ocean de sute de milioane de ani.',
            '{Pielea rechinului|Pielea acestui animal} e aspră la atingere, aproape ca șmirghelul.',
            '{Mulți rechini|Multe dintre aceste animale} trebuie să înoate mereu, ca apa să le treacă prin branhii.',
            '{Rechinului|Acestui animal} îi cresc dinți noi în locul celor care cad.',
            '{Scheletul rechinului|Scheletul acestui animal} este făcut din cartilaj, nu din os.',
            '{Există sute de feluri de rechini|Există sute de feluri de astfel de animale}, de la mici la uriași.',
            '{Rechinul|Acest animal} are simțuri speciale care simt semnale electrice mici în apă.'
        ],
        octopus: [
            '{Caracatița|Acest animal} are opt brațe și trei inimi.',
            '{Caracatița se poate strecura prin găuri abia mai mari decât ochiul ei.|Acest animal se poate strecura prin găuri abia mai mari decât ochiul lui.}',
            '{Caracatița|Acest animal} își poate schimba culoarea ca să semene cu pietrele din jur.',
            '{Caracatița|Acest animal} are sângele albastru, nu roșu.',
            '{Caracatița|Acest animal} simte gustul cu ventuzele de pe brațe.',
            '{Caracatița|Acest animal} poate rezolva ghicitori simple, de exemplu cum să deschidă un borcan.',
            '{Caracatița trăiește mai mult singură, nu în grup ca alte animale marine.|Acest animal trăiește mai mult singur, nu în grup ca alte animale marine.}',
            '{Caracatița|Acest animal} vede foarte bine, deși nu vede culorile ca noi.'
        ],
        squid: [
            '{Calmarul|Acest animal} poate țâșni înapoi prin apă foarte repede.',
            '{Calmarii|Aceste animale} au ochi mari, ca să vadă în marea adâncă și întunecată.',
            '{Calmarul|Acest animal} poate împroșca cerneală închisă la culoare ca să se ascundă.',
            '{Calmarul|Acest animal} are trei inimi, la fel ca verișoara lui, caracatița.',
            '{Înotătoarele calmarului|Înotătoarele acestui animal} îl ajută să cârmească în timp ce alunecă prin apă.',
            '{Calmarul|Acest animal} are un cioc tare ascuns printre brațe.',
            '{Calmarul|Acest animal} este rudă apropiată cu caracatița.',
            '{Calmarul|Acest animal} poate fi foarte mic sau uriaș, după soi.'
        ],
        crab: [
            '{Crabul|Acest animal} merge într-o parte, pe cele zece picioare.',
            '{Crabilor|Acestor animale} le crește o carapace nouă și mai mare pe măsură ce cresc.',
            '{Crabul|Acest animal} își folosește cleștii ca să mănânce și ca să facă cu mâna.',
            '{Ochii crabului|Ochii acestui animal} stau pe niște tulpinițe, ca să poată privi în jur.',
            '{Unii crabi|Unele dintre aceste animale} pot trăi și pe uscat, și în apă.',
            '{Crabul|Acest animal} are o carapace tare pe dinafară.',
            '{Unii crabi|Unele dintre aceste animale} au un clește mai mare decât celălalt.',
            '{Carapacea crabului|Carapacea acestui animal} îi apără corpul moale de dedesubt.'
        ],
        lobster: [
            '{Homarului|Acestui animal} îi crește un clește nou dacă pierde unul.',
            '{Homarii|Aceste animale} simt gustul cu perișori mici de pe picioare.',
            '{Homarul|Acest animal} primește o carapace complet nouă când crește.',
            '{Homarul|Acest animal} poate trăi mulți ani, chiar zeci de ani.',
            '{Homarul|Acest animal} își folosește antenele lungi ca să simtă și să exploreze în jur.',
            '{Carapacea homarului|Carapacea acestui animal} e de obicei verde-maronie, dar unele sunt albastre sau chiar portocalii.',
            '{Homarul|Acest animal} are adesea un clește pentru zdrobit și unul pentru tăiat.',
            '{Homarului|Acestui animal} îi poate crește la loc și un picior, nu doar un clește.'
        ],
        shrimp: [
            '{Crevetele|Acest animal} poate înota înapoi, lovind din coadă.',
            '{Creveții|Aceste animale} țin marea curată, strângând bucățelele de mâncare.',
            '{Unii creveți|Unele dintre aceste animale} strălucesc cu mici scântei de lumină.',
            '{Corpul crevetelui|Corpul acestui animal} este adesea transparent și greu de văzut în apă.',
            '{Inima crevetelui|Inima acestui animal} se află aproape de cap.',
            '{Crevetele|Acest animal} are picioare pe ambele părți ale corpului, pentru înot și pentru mers.',
            '{Creveții|Aceste animale} pot fi foarte mici sau destul de mari, după soi.',
            '{Creveții|Aceste animale} trăiesc adesea în grupuri mari, lângă fundul mării sau lângă corali.'
        ],
        dolphin: [
            '{Delfinul|Acest animal} vorbește cu ceilalți prin clicuri și fluierături.',
            '{Delfinii|Aceste animale} sunt foarte deștepți și le place să se joace și să sară.',
            '{Delfinul|Acest animal} iese la suprafață ca să respire aer, la fel ca noi.',
            '{Delfinul|Acest animal} își odihnește doar jumătate din creier odată, cealaltă jumătate rămâne trează.',
            '{Delfinii|Aceste animale} înoată împreună, în grup.',
            '{Delfinul|Acest animal} are pe spate o înotătoare curbată, numită înotătoare dorsală.',
            '{Delfinul|Acest animal} trimite clicuri care se întorc ca un ecou și așa simte ce e în jurul lui.',
            '{Puiul delfinului|Puiul acestui animal} stă aproape de mama lui la începutul vieții.'
        ],
        // Keyed 'whale' because that is the animal's id in zones.js; the animal is an orca.
        whale: [
            '{Orca|Acest animal} are pe spate o înotătoare înaltă, numită înotătoare dorsală.',
            '{Orca|Acest animal} are corpul alb cu negru, cu o pată albă în spatele fiecărui ochi.',
            '{Orcile|Aceste animale} trăiesc și călătoresc împreună, în grup.',
            '{Orca|Acest animal} respiră aer printr-o gaură din vârful capului.',
            '{Orca vorbește cu grupul ei prin clicuri și fluierături.|Acest animal vorbește cu grupul lui prin clicuri și fluierături.}',
            '{Orca|Acest animal} este un vânător puternic, care își prinde mâncarea în ocean.',
            '{Orca are un strat gros de grăsime care o ține la cald în apa rece.|Acest animal are un strat gros de grăsime care îl ține la cald în apa rece.}',
            '{Orca|Acest animal} înoată foarte repede și poate sări din apă.'
        ],
        bigwhale: [
            '{Inima balenei mari|Inima acestui animal} poate fi cât o mașină mică.',
            '{Balenele mari|Aceste animale} își pot ține respirația mai mult decât aproape orice alt animal.',
            '{Coada balenei mari|Coada acestui animal} se numește înotătoare caudală.',
            '{Limba balenei mari|Limba acestui animal} poate cântări cât un elefant.',
            '{Balena mare|Acest animal} poate crește mai lungă decât un autobuz.',
            '{Balena mare|Acest animal} scoate unele dintre cele mai puternice sunete din lumea animalelor.',
            '{Înotătoarele balenei mari o ajută să cârmească în timp ce înoată.|Înotătoarele acestui animal îl ajută să cârmească în timp ce înoată.}',
            '{Puiul balenei mari|Puiul acestui animal} înoată bine la scurt timp după ce se naște.'
        ],
        seal: [
            '{Foca|Acest animal} bate din înotătoare și face un sunet ca un pleoscăit sub apă.',
            '{Foca|Acest animal} își poate ține respirația sub apă multe minute.',
            '{Foca|Acest animal} simte cu mustățile cele mai mici mișcări ale apei, chiar și pe întuneric.',
            '{Foca|Acest animal} se întoarce și se răsucește ușor în apă, deși pe uscat merge legănat.',
            '{Puii unor foci|Puii unora dintre aceste animale} se nasc cu o blăniță albă și pufoasă.',
            '{Foca|Acest animal} se mișcă pe uscat unduindu-și corpul pe nisip.',
            '{Foca|Acest animal} vede bine și în aer, și sub apă.',
            '{Corpul neted al focii o ajută să alunece ușor prin apă.|Corpul neted al acestui animal îl ajută să alunece ușor prin apă.}'
        ],
        penguin: [
            '{Pinguinul|Acest animal} nu poate zbura, dar înoată minunat.',
            '{Pinguinii|Aceste animale} se strâng unii lângă alții ca să le fie cald.',
            '{Pinguinul|Acest animal} merge legănat pe uscat, dar sub apă țâșnește repede.',
            '{Pinguinul|Acest animal} are un strat gros de grăsime și pene care îl țin la cald.',
            '{Pinguinii|Aceste animale} merg adesea în șir, unul după altul.',
            '{Pinguinul|Acest animal} are aripi tari, ca niște lopeți, făcute pentru înot, nu pentru zbor.',
            '{Culorile alb și negru ale pinguinului|Culorile alb și negru ale acestui animal} îl ajută să se ascundă când înoată.',
            '{Părinții pinguinului|Părinții acestui animal} își țin pe rând oul la cald.'
        ],
        turtle: [
            '{Țestoasa își poartă carapacea peste tot cu ea.|Acest animal își poartă carapacea peste tot cu el.}',
            '{Țestoasele|Aceste animale} pot trăi foarte, foarte mult.',
            '{Țestoasa|Acest animal} își trage capul în carapace ca să se simtă în siguranță.',
            '{Carapacea țestoasei face parte din schelet și e legată de coloana ei.|Carapacea acestui animal face parte din schelet și e legată de coloana lui.}',
            '{Unele țestoase|Unele dintre aceste animale} se pot odihni ore întregi sub apă fără să iasă după aer.',
            '{Țestoasa|Acest animal} nu are dinți, ci o gură tare, ca un cioc.',
            '{Țestoasa de mare|Acest animal, când trăiește în mare,} poate înota distanțe foarte mari prin ocean.',
            '{Diferite feluri de țestoase|Diferite feluri ale acestui animal} trăiesc în ocean, în bălți sau pe uscat.'
        ],
        otter: [
            '{Vidrele|Aceste animale} se țin de mână când dorm, ca să nu le ia apa.',
            '{Vidrele|Aceste animale} folosesc pietre ca unelte, ca să deschidă gustările preferate.',
            '{Vidra are o blană deasă care o ține la cald și uscată.|Acest animal are o blană deasă care îl ține la cald și uscat.}',
            '{Blana vidrei|Blana acestui animal} este una dintre cele mai dese, cu milioane de firișoare.',
            '{Vidra|Acest animal} plutește des pe spate ca să se odihnească.',
            '{Vidra|Acest animal} își poate închide urechile și nasul când înoată sub apă.',
            '{Unele vidre|Unele dintre aceste animale} își țin piatra preferată într-un buzunar de piele sub braț.',
            '{Blana vidrei|Blana acestui animal} trebuie îngrijită mereu ca să rămână pufoasă și să nu lase apa să treacă.'
        ],
        jellyfish: [
            '{Meduza|Acest animal} nu are oase, creier sau inimă.',
            '{Meduzele|Aceste animale} își strâng ușor corpul ca să plutească prin apă.',
            '{Meduza|Acest animal} poate străluci încet în oceanul întunecat.',
            '{Meduza este făcută mai ales din apă.|Acest animal este făcut mai ales din apă.}',
            '{Meduzele|Aceste animale} înotau în ocean chiar înainte de dinozauri.',
            '{Meduza|Acest animal} înaintează cu pulsații lente și ritmice ale corpului.',
            '{Există mii de feluri de meduze|Există mii de feluri de astfel de animale} în oceanele lumii.',
            '{Meduza are tentacule care atârnă sub corpul ei rotund.|Acest animal are tentacule care atârnă sub corpul lui rotund.}'
        ],
        starfish: [
            '{Steaua de mare|Acest animal} își poate crește la loc un braț dacă îl pierde.',
            '{Stelele de mare|Aceste animale} se mișcă încet, cu sute de piciorușe mici ca niște tuburi.',
            '{Steaua de mare|Acest animal} nu are creier, dar tot își găsește drumul.',
            '{Steaua de mare|Acest animal} pompează apă de mare prin corp în loc de sânge.',
            '{Majoritatea stelelor de mare|Majoritatea acestor animale} au cinci brațe, dar unele au chiar mai multe.',
            '{Steaua de mare|Acest animal} are la vârful fiecărui braț un punct care simte lumina.',
            '{Pielea stelei de mare|Pielea acestui animal} e acoperită cu mici umflături sau țepi.',
            '{Steaua de mare|Acest animal} poate avea multe culori: portocaliu, roșu, mov și albastru.'
        ],
        oyster: [
            '{Stridia|Acest animal} poate face o perlă rotundă și strălucitoare în cochilie.',
            '{Stridiile|Aceste animale} își petrec toată viața în același loc.',
            '{Cochilia stridiei|Cochilia acestui animal} are două jumătăți care se deschid și se închid.',
            '{Stridia|Acest animal} filtrează și curăță foarte multă apă în fiecare zi.',
            '{Stridia tânără|Acest animal, cât e mic,} plutește liber în apă înainte să se așeze într-un loc.',
            '{Stridiile|Aceste animale} se strâng laolaltă și formează recife mari.',
            '{Stridia|Acest animal} face o perlă atunci când un fir de nisip rămâne prins în cochilie.',
            '{Cochilia aspră a stridiei|Cochilia aspră a acestui animal} este casă pentru alte vietăți mici din mare.'
        ],
        seasnail: [
            '{Melcul de mare|Acest animal} își poartă pe spate cochilia răsucită.',
            '{Melcii de mare|Aceste animale} se mișcă foarte încet pe pietre și pe nisip.',
            '{Melcul de mare|Acest animal} lasă în urmă o dâră strălucitoare când alunecă.',
            '{Melcul de mare|Acest animal} se târăște pe un singur picior puternic.',
            '{Cochilia melcului de mare|Cochilia acestui animal} crește pe măsură ce crește tot corpul.',
            '{Melcul de mare|Acest animal} respiră prin branhii ascunse în cochilie.',
            '{Melcul de mare|Acest animal} are pe cap ochi simpli care simt lumina.',
            '{Melcul de mare|Acest animal} își poate trage tot corpul moale în cochilie ca să fie apărat.'
        ],

        // --- the safari -----------------------------------------------------
        lion: [
            '{Răgetul leului|Răgetul acestui animal} se aude de foarte departe.',
            '{Leii|Aceste animale} trăiesc împreună, într-un grup de familie.',
            '{Leul|Acest animal} adoră să moțăie cea mai mare parte a zilei.',
            '{Leul mascul|Masculul acestui animal} are adesea o coamă groasă și pufoasă în jurul feței.',
            '{Puii de leu|Puii acestui animal} se nasc cu pete mici pe blană.',
            '{Coama leului|Coama acestui animal} poate avea multe culori, de la blond la negru.',
            '{Leul|Acest animal} aleargă foarte repede pe distanțe scurte, dar obosește repede.',
            '{Leul|Acest animal} se odihnește mult și își îngrijește blana cu ceilalți din familie.'
        ],
        elephant: [
            '{Elefantul|Acest animal} își folosește trompa ca pe o mână lungă și îndemânatică.',
            '{Elefanții|Aceste animale} au o memorie uimitoare și își amintesc unii de alții ani de zile.',
            '{Elefantul|Acest animal} dă din urechile mari ca să se răcorească.',
            '{Elefantul|Acest animal} este cel mai mare animal care merge pe uscat.',
            '{Elefantul|Acest animal} își poate face un duș răcoros cu trompa.',
            '{Colții elefantului|Colții acestui animal} sunt de fapt dinți lungi care cresc mereu.',
            '{Elefantul|Acest animal} poate ridica cu trompa și lucruri mici, și lucruri grele.',
            '{Elefantul|Acest animal} vorbește cu ceilalți prin sunete joase, ca un tunet, pe care noi abia le auzim.'
        ],
        giraffe: [
            '{Girafa|Acest animal} are tot atâtea oase în gât ca noi, doar că mult mai mari.',
            '{Girafa|Acest animal} are o limbă lungă și închisă la culoare, cu care ia frunze din copaci înalți.',
            '{Girafa|Acest animal} poate moțăi în picioare, doar câteva minute odată.',
            '{Petele girafei|Petele acestui animal} formează un model unic, ca o amprentă.',
            '{Puiul girafei|Puiul acestui animal} se ridică și merge chiar în prima oră de viață.',
            '{Girafa|Acest animal} are o inimă mare și puternică, ce pompează sângele până sus, pe gâtul lung.',
            '{Girafa|Acest animal} mănâncă frunze din copaci înalți, unde alte animale nu ajung.',
            '{Girafa|Acest animal} este cel mai înalt animal din lume.'
        ],
        zebra: [
            '{Fiecare zebră|Fiecare astfel de animal} are propriul model special de dungi.',
            '{Zebrele|Aceste animale} trăiesc în grup ca să aibă grijă unele de altele.',
            '{Zebra|Acest animal} poate alerga foarte repede prin iarbă.',
            '{Dungile zebrei|Dungile acestui animal} poate că țin departe muștele care înțeapă.',
            '{Coama zebrei|Coama acestui animal} stă dreaptă în sus, nu cade într-o parte.',
            '{Zebra|Acest animal} are de fapt pielea neagră, cu desene albe, nu invers.',
            '{Zebrele|Aceste animale} își transmit lucruri prin sunete, expresii ale feței și mișcări ale corpului.',
            '{Puiul zebrei|Puiul acestui animal} se numește mânz, la fel ca puiul calului.'
        ],
        hippo: [
            '{Hipopotamul|Acest animal} stă cea mai mare parte a zilei în apă, ca să se răcorească.',
            '{Hipopotamii|Aceste animale} își pot ține respirația sub apă câteva minute.',
            '{Pielea hipopotamului|Pielea acestui animal} își face singură o cremă naturală de protecție solară.',
            '{Hipopotamul|Acest animal} poate merge pe fundul râului sau al lacului.',
            '{Ochii, urechile și nasul hipopotamului|Ochii, urechile și nasul acestui animal} sunt toate în partea de sus a capului.',
            '{Hipopotamul|Acest animal} este unul dintre cele mai mari animale de uscat din lume.',
            '{Hipopotamul|Acest animal} își poate închide bine nările și urechile sub apă.',
            '{Gura hipopotamului|Gura acestui animal} se poate deschide foarte, foarte larg.'
        ],
        rhino: [
            '{Cornul rinocerului|Cornul acestui animal} e făcut din același material ca unghiile noastre.',
            '{Rinocerii|Aceste animale} au pielea groasă și tare, aproape ca o armură.',
            '{Rinocerul|Acest animal} aleargă surprinzător de repede pentru un animal atât de mare.',
            '{Unii rinoceri|Unele dintre aceste animale} au un corn, iar alții au două.',
            '{Rinocerul|Acest animal} nu vede prea bine, dar miroase excelent.',
            '{Rinocerul|Acest animal} mănâncă mai ales plante și iarbă.',
            '{Puiul rinocerului|Puiul acestui animal} se numește vițel, la fel ca puiul elefantului.',
            '{Rinocerului|Acestui animal} îi place să se tăvălească în noroi ca să se răcorească și să-și apere pielea.'
        ],
        monkey: [
            '{Maimuța|Acest animal} își folosește coada ca să-și țină echilibrul când se cațără.',
            '{Maimuțele|Aceste animale} sunt jucăușe și adoră să sară și să se legene prin copaci.',
            '{Maimuța|Acest animal} vorbește cu celelalte prin sunete și fețe diferite.',
            '{Mâinile și picioarele maimuței|Mâinile și picioarele acestui animal} se prind foarte bine de crengi.',
            '{Maimuțele|Aceste animale} se îngrijesc des una pe alta, ca să fie curate și ca să-și arate prietenia.',
            '{Există multe feluri de maimuțe|Există multe feluri de astfel de animale} în diferite părți ale lumii.',
            '{Unele maimuțe|Unele dintre aceste animale} au coada lungă, iar altele foarte scurtă.',
            '{Maimuța ia lucruri mici cu degetele ei îndemânatice, cum ar fi fructe sau semințe.|Acest animal ia lucruri mici cu degetele lui îndemânatice, cum ar fi fructe sau semințe.}'
        ],
        gorilla: [
            '{Gorila are grijă de grupul ei de familie.|Acest animal are grijă de grupul lui de familie.}',
            '{Gorilele|Aceste animale} pot învăța să înțeleagă multe semne făcute cu mâna.',
            '{Gorila|Acest animal} se bate cu pumnii în piept ca să le transmită ceva celorlalte.',
            '{Gorila|Acest animal} mănâncă mai ales plante și poate mânca o mare parte din zi.',
            '{Gorila|Acest animal} merge sprijinindu-se pe încheieturile degetelor, folosindu-și brațele puternice.',
            '{Gorila|Acest animal} este cea mai mare dintre toate maimuțele mari.',
            '{Puiul gorilei|Puiul acestui animal} călătorește adesea în spatele mamei lui.',
            '{Gorila|Acest animal} își face în fiecare seară un cuib nou din frunze și crengi ca să doarmă în el.'
        ],
        tiger: [
            '{Fiecare tigru|Fiecare astfel de animal} are propriul model unic de dungi.',
            '{Tigrii|Aceste animale} înoată foarte bine și le place să se răcorească în apă.',
            '{Răgetul tigrului|Răgetul acestui animal} se aude de la aproape trei kilometri.',
            '{Dungile tigrului|Dungile acestui animal} se văd nu doar pe blană, ci și pe piele.',
            '{Tigrul|Acest animal} este cea mai mare dintre toate felinele mari.',
            '{Tigrul|Acest animal} are un model cu dungi unic printre felinele mari.',
            '{Tigrul|Acest animal} trăiește și umblă mai ales singur, nu în grup ca leii.',
            '{Puii de tigru|Puii acestui animal} stau cu mama lor aproape doi ani.'
        ],
        leopard: [
            '{Leopardul|Acest animal} se cațără fantastic și moțăie des sus în copaci.',
            '{Petele leopardului|Petele acestui animal} îl ajută să se ascundă în pădurea plină de lumină și umbră.',
            '{Leopardul|Acest animal} poate sări incredibil de departe dintr-un singur salt.',
            '{Leopardul|Acest animal} e atât de puternic încât poate urca lucruri grele sus în copac.',
            '{Leopardul|Acest animal} e activ mai ales noaptea și se odihnește ziua.',
            '{Leopardul|Acest animal} are o coadă lungă care îl ajută să-și țină echilibrul când se cațără.',
            '{Fiecare leopard|Fiecare astfel de animal} are propriul model special de pete.',
            '{Leopardul|Acest animal} înoată bine, chiar dacă preferă uscatul.'
        ],
        camel: [
            '{Cocoașa cămilei|Cocoașa acestui animal} păstrează grăsime, nu apă, ca să poată călători departe.',
            '{Cămilele|Aceste animale} au gene lungi care le țin nisipul departe de ochi.',
            '{Cămila|Acest animal} poate sta mult timp fără să bea apă.',
            '{Cămila|Acest animal} își poate închide nările ca să nu intre nisipul spulberat de vânt.',
            '{Există două feluri de cămile|Există două feluri de astfel de animale}: unul cu o cocoașă și unul cu două.',
            '{Cămila are tălpi late și moi, care nu o lasă să se afunde în nisip.|Acest animal are tălpi late și moi, care nu îl lasă să se afunde în nisip.}',
            '{Cămila|Acest animal} poate căra greutăți mari pe distanțe lungi.',
            '{Cămila|Acest animal} poate mânca plante cu țepi fără să se rănească.'
        ],
        kangaroo: [
            '{Cangurul|Acest animal} își poartă puiul într-un marsupiu călduros.',
            '{Cangurii|Aceste animale} își folosesc coada puternică pentru echilibru când sar.',
            '{Cangurul|Acest animal} poate sări foarte repede prin iarbă.',
            '{Cangurul|Acest animal} nu poate merge înapoi.',
            '{Cangurii|Aceste animale} trăiesc în Australia.',
            '{Cangurul|Acest animal} are picioare din spate puternice, făcute pentru salturi mari.',
            '{Cangurul|Acest animal} își poate folosi coada ca pe un picior în plus ca să stea pe loc.',
            '{Puiul cangurului|Puiul acestui animal} stă luni întregi în marsupiul mamei în timp ce crește.'
        ],
        crocodile: [
            '{Crocodilul|Acest animal} își poate ține respirația sub apă mult timp.',
            '{Crocodilii|Aceste animale} trăiau cu mult înainte să dispară dinozaurii.',
            '{Ochii și nasul crocodilului|Ochii și nasul acestui animal} ies deasupra apei când plutește.',
            '{Crocodilul|Acest animal} are o coadă puternică, cu care înoată și cârmește prin apă.',
            '{Pielea crocodilului|Pielea acestui animal} are solzi tari și noduroși, care îi apără corpul.',
            '{Crocodilul|Acest animal} are una dintre cele mai puternice mușcături dintre toate animalele.',
            '{Crocodilul|Acest animal} poate pluti nemișcat în apă foarte mult timp.',
            '{Crocodilul|Acest animal} stă la soare pe malul râului ca să se încălzească, pentru că are sângele rece.'
        ],
        flamingo: [
            '{Flamingoul|Acest animal} stă des într-un singur picior ca să se odihnească.',
            '{Flamingoul|Acest animal} își ia culoarea roz din mâncarea pe care o mănâncă.',
            '{Flamingoul|Acest animal} își ține echilibrul surprinzător de grațios.',
            '{Ciocul curbat al flamingoului|Ciocul curbat al acestui animal} îl ajută să scoată mâncarea din apa mică.',
            '{Flamingoii|Aceste animale} se adună des în grupuri mari și colorate.',
            '{Ce pare a fi genunchiul întors al flamingoului|Ce pare a fi genunchiul întors al acestui animal} este de fapt glezna lui.',
            '{Flamingoul|Acest animal} poate zbura distanțe lungi, adesea noaptea.',
            '{Puiul de flamingo|Puiul acestui animal} se naște cu pene gri sau albe și devine roz pe măsură ce crește.'
        ],
        peacock: [
            '{Păunul|Acest animal} își desface penele colorate ale cozii ca pe un evantai uriaș.',
            '{Penele păunului|Penele acestui animal} sclipesc albastru și verde în lumina soarelui.',
            '{Penele frumoase ale păunului|Penele frumoase ale acestui animal} îl ajută să iasă în evidență și să se laude.',
            '{Doar păunul mascul|Doar masculul acestui animal} are pene lungi și colorate la coadă.',
            '{Penele cozii păunului|Penele cozii acestui animal} au pete rotunde care seamănă cu niște ochi.',
            '{Penele cozii păunului|Penele cozii acestui animal} pot fi la fel de lungi cât tot corpul lui.',
            '{Păunița|Femela acestui animal} este maronie, ca să se ascundă în cuib.',
            '{Păunii|Aceste animale} pot zbura, dar de obicei stau aproape de pământ.'
        ],
        parrot: [
            '{Papagalul|Acest animal} poate învăța să imite cuvintele pe care le aude.',
            '{Papagalii|Aceste animale} au pene foarte vii și colorate.',
            '{Papagalul|Acest animal} își folosește ciocul puternic ca să spargă semințe și nuci.',
            '{Papagalul|Acest animal} își ține des mâncarea cu piciorul lui puternic.',
            '{Unii papagali|Unele dintre aceste animale} pot trăi cincizeci de ani sau chiar mai mult.',
            '{Papagalul|Acest animal} are un cioc curbat și puternic, care îl ajută să se cațere și să mănânce.',
            '{Papagalii|Aceste animale} au la fiecare picior două degete spre înainte și două spre înapoi.',
            '{Mulți papagali|Multe dintre aceste animale} trăiesc în părțile calde și tropicale ale lumii.'
        ],
        snake: [
            '{Șarpele|Acest animal} miroase aerul scoțând limba afară.',
            '{Șarpelui|Acestui animal} îi crește o piele nouă și iese pur și simplu din cea veche.',
            '{Șarpele|Acest animal} se mișcă pe pământ într-o linie lină și unduită.',
            '{Șarpele|Acest animal} simte prin burtă vibrațiile pământului.',
            '{Corpul șarpelui|Corpul acestui animal} e acoperit cu solzi uscați și netezi.',
            '{Șarpele|Acest animal} nu are pleoape, așa că ochii îi sunt mereu deschiși, chiar și când doarme.',
            '{Limba despicată a șarpelui|Limba despicată a acestui animal} îl ajută să miroasă în două direcții deodată.',
            '{Există mii de feluri de șerpi|Există mii de feluri de astfel de animale} în toată lumea.'
        ],
        lizard: [
            '{Unor șopârle|Unora dintre aceste animale} le crește coada la loc dacă o pierd.',
            '{Șopârla|Acest animal} stă des la soare pe o piatră caldă ca să se încălzească.',
            '{Șopârla poate fi foarte rapidă și fuge pe pământ cât ai clipi.|Acest animal poate fi foarte rapid și fuge pe pământ cât ai clipi.}',
            '{Șopârla|Acest animal} merge între soare și umbră ca să aibă exact temperatura potrivită.',
            '{Majoritatea șopârlelor|Majoritatea acestor animale} au pielea cu solzi și patru picioare scurte.',
            '{Multe șopârle|Multe dintre aceste animale} se cațără foarte bine, chiar și pe suprafețe netede.',
            '{Șopârla|Acest animal} respiră aer pe nas, la fel ca noi.',
            '{Unele șopârle|Unele dintre aceste animale} își pot schimba culoarea pielii după starea lor sau după ce e în jur.'
        ],
        eagle: [
            '{Vulturul|Acest animal} vede mișcarea de incredibil de sus din cer.',
            '{Vulturii|Aceste animale} își fac cuiburi uriașe sus, în cei mai înalți copaci.',
            '{Vulturul|Acest animal} plutește sus pe vânt, aproape fără să dea din aripi.',
            '{Vederea vulturului|Vederea acestui animal} este de multe ori mai ascuțită decât a noastră.',
            '{Puiul vulturului|Puiul acestui animal} iese dintr-un ou, într-un cuib înalt.',
            '{Vulturul|Acest animal} are la picioare gheare puternice și curbate.',
            '{Vulturii|Aceste animale} folosesc adesea același cuib an de an și îl fac tot mai mare.',
            '{Vulturul|Acest animal} vede culorile foarte bine, mult mai bine decât noi.'
        ],
        sloth: [
            '{Leneșul|Acest animal} se mișcă foarte, foarte încet prin copaci.',
            '{Leneșii|Aceste animale} dorm o mare parte din zi, strânși ghem și liniștiți.',
            '{Pe blana leneșului|Pe blana acestui animal} pot crește chiar și alge mici și verzi.',
            '{Leneșul|Acest animal} coboară din copac doar din când în când.',
            '{Leneșul|Acest animal} înoată surprinzător de bine, deși pe uscat se mișcă încet.',
            '{Leneșul|Acest animal} are gheare lungi și curbate, cu care atârnă de crengi.',
            '{Blana leneșului|Blana acestui animal} crește invers față de a altor mamifere, așa că ploaia se scurge de pe el când atârnă cu capul în jos.',
            '{Leneșul|Acest animal} are nevoie de puțină mâncare pe zi, pentru că se mișcă foarte încet.'
        ]
    };

    // --- spoken phrasing ------------------------------------------------------
    //
    // The Romanian counterpart of NAF.Say in settings.js, with the same
    // functions and the same Words/Style levels. An animal carries its
    // "a/an" and "the" forms (lang[2], lang[3]), so no line has to guess a
    // gender or an article ending.

    function say(h) {
        function lower(s) { return s.toLowerCase(); }
        function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
        function an(a) { return (a.lang && a.lang[2]) || lower(a.name); }
        function the(a) { return (a.lang && a.lang[3]) || lower(a.name); }

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
                    return recorded ? (n + '.') : (n + '. Face ' + lower(animal.says) + '.');
                }
                const it = 'Este ' + an(animal);
                return recorded ? (it + '!') : (it + '! ' + animal.says + '!');
            }
            const who = h.name();
            const lead = h.playful()
                ? (who ? ('Uite, ' + who + ', este ' + an(animal) + '!') : ('Este ' + an(animal) + '!'))
                : ('Este ' + an(animal) + '.');
            if (recorded) return lead;
            return lead + ' ' + cap(the(animal)) + ' face ' + lower(animal.says) + '.';
        }

        function greeting() {
            const who = h.name();
            if (!who) return 'Alege un loc și vezi cine te salută.';
            return h.playful()
                ? ('Bună, ' + who + '! Alege un loc și vezi cine te salută.')
                : (who + '. Alege un loc de vizitat.');
        }

        function barnPrompt() {
            const w = h.words();
            const who = h.name();
            const z = h.W();
            const Place = cap(z.place);
            if (w === 'few') return h.playful() ? (Place + '!') : (Place + '.');
            if (w === 'short') {
                if (!h.playful()) return Place + '. Alege ca să deschizi.';
                return who ? (z.openSpoken + ', ' + who + '!') : (z.openSpoken + '!');
            }
            return h.playful()
                ? (who ? (who + ', ' + lower(z.openSpoken) + ' și vezi cine e ' + z.inside + '.')
                       : (z.openSpoken + ' și vezi cine e ' + z.inside + '.'))
                : (Place + '. Dacă alegi asta, se deschide.');
        }

        function pickPrompt() {
            return h.playful() ? 'Cine să iasă?' : 'Alege un animal.';
        }

        function findPrompt(animal, riddle) {
            const w = h.words();
            if (w === 'few') return riddle + ' Care este?';
            if (w === 'short') return riddle + ' Care dintre aceste animale este?';
            return 'Ascultă cu atenție. ' + riddle + ' Care dintre aceste animale este?';
        }

        function wrongPick(chosen, target) {
            const lead = h.playful()
                ? ('Ai ales: ' + the(chosen) + '! ' + chosen.says + '!')
                : ('Ai ales: ' + the(chosen) + '.');
            return lead + ' Căutăm: ' + the(target) + '.';
        }

        function rightPick(animal) {
            const who = h.name();
            const it = cap(the(animal));
            if (!h.playful()) return 'Corect. ' + it + '.';
            return who ? ('Da, ' + who + '! ' + it + '!') : ('Da! ' + it + '!');
        }

        const CHEERS = ['Ura', 'Bravo', 'Minunat', 'Grozav', 'Super'];
        let cheerAt = 0;

        function friendEarned(animal, fact) {
            fact = fact || NAF.Facts.random(animal);
            if (!h.playful()) return 'Nou pe tablă: ' + the(animal) + '. ' + fact;
            const cheer = CHEERS[cheerAt++ % CHEERS.length];
            if (h.words() === 'few') return cheer + '! ' + animal.name + '!';
            const me = h.name();
            if (h.words() === 'short') return cheer + (me ? (', ' + me) : '') + '! ' + fact;
            return cheer + (me ? (', ' + me) : '') + '! ' + fact + ' Uită-te în partea de sus a ecranului.';
        }

        const ROW_LINES = [
            function (who) { return 'Ai reușit' + who + '! Cinci animale pe tablă! Hai să mai găsim.'; },
            function (who) { return 'Bravo' + who + '! Tabla e plină de animale noi!'; },
            function (who) { return 'Uau' + who + '! Ai găsit cinci animale! Hai să vedem cine mai e pe aici.'; },
            function (who) { return 'Foarte bine' + who + '! Cinci animale sunt în siguranță!'; },
            function (who) { return 'Ura' + who + '! Ai umplut toată tabla! Mai vrei?'; }
        ];
        const ROW_FEW = ['Gata', 'Foarte bine', 'Ura', 'Bravo', 'Super'];
        let rowAt = 0;

        function rowComplete() {
            const who = h.name();
            if (!h.playful()) return 'Toate cinci au fost adăugate. Începem din nou.';
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
        lang: 'ro', ui: ui, helpLines: helpLines, colors: colors, keyRows: keyRows,
        zones: zones, animals: animals, facts: facts, say: say,
        fallbackFact: function (animal) { return animal.name + '.'; }
    };
})();
