/**
 * Puzzle - pick a piece on the left, then the numbered spot on the right.
 *
 * Three types, chosen on the menu: 5 vertical strips, 4 squares (2x2) and a
 * 10-piece jigsaw (5x2). The screen is split in the middle: scrambled pieces on
 * the left, the picture's numbered spots on the right. A right spot keeps the
 * piece; a wrong one says so and sends the piece back to the left. A finished
 * picture is cheered and the next one starts by itself - an endless loop like
 * Animal Friends, with no score, timer or losing.
 *
 * Pieces are cut in code: every piece and spot is an SVG that shows the whole
 * picture through a clip path, so any photo works and the jigsaw shapes need no
 * pre-cut images. The picture is centre-cropped to each type's shape.
 *
 * Every screen is a stationary CHOICE through the shared NarbeChoiceScanAdapter
 * (root -1, Auto Scan, Space brake). Choosing a piece enters the spots as a
 * group with a Back stop (enterGroup wrap + backStop), so Back returns to the
 * same piece. This file forwards Space/Enter after scan-manager's guard and owns
 * only the held-Space backwards scan (1 s, the Hub keyboard's threshold).
 *
 * All text comes from window.PZL (js/lang-*.js). Pictures are listed in
 * images/pictures.json.
 */
(function () {
    'use strict';

    const L = window.PZL;
    const HOLD = 1000;
    const STORE = 'narbe-puzzle-settings';
    const TYPES = {
        strips:   { cols: 5, rows: 1, w: 1500, h: 1000, jigsaw: false, leftCols: 5 },
        quarters: { cols: 2, rows: 2, w: 1000, h: 1000, jigsaw: false, leftCols: 2 },
        jigsaw:   { cols: 5, rows: 2, w: 1500, h: 750,  jigsaw: true,  leftCols: 4 }
    };
    const ICONS = {
        strips: '<svg viewBox="0 0 50 34" aria-hidden="true"><g fill="#fff" stroke="#1f2430" stroke-width="2">' +
            [0, 1, 2, 3, 4].map(i => '<rect x="' + (2 + i * 9.4) + '" y="2" width="8" height="30" rx="1.5"/>').join('') + '</g></svg>',
        quarters: '<svg viewBox="0 0 34 34" aria-hidden="true"><g fill="#fff" stroke="#1f2430" stroke-width="2">' +
            '<rect x="2" y="2" width="14" height="14" rx="1.5"/><rect x="18" y="2" width="14" height="14" rx="1.5"/>' +
            '<rect x="2" y="18" width="14" height="14" rx="1.5"/><rect x="18" y="18" width="14" height="14" rx="1.5"/></g></svg>',
        jigsaw: '<svg viewBox="0 0 40 40" aria-hidden="true"><path fill="#fff" stroke="#1f2430" stroke-width="2" ' +
            'd="M6 10h8c-3-6 9-6 6 0h8v8c6-3 6 9 0 6v8h-8c3 6-9 6-6 0H6v-8c-6 3-6-9 0-6z"/></svg>'
    };

    const $ = function (id) { return document.getElementById(id); };

    let prefs = { sounds: true, ghost: true };
    try { Object.assign(prefs, JSON.parse(localStorage.getItem(STORE) || '{}')); } catch (e) { /* defaults */ }
    function savePrefs() { try { localStorage.setItem(STORE, JSON.stringify(prefs)); } catch (e) { /* not saved */ } }

    // --- speech and sound ---------------------------------------------------------

    function speak(text) {
        try { return window.NarbeVoiceManager.speak(text); } catch (e) { return null; }
    }
    function ttsOn() {
        try { return !!window.NarbeVoiceManager.getSettings().ttsEnabled; } catch (e) { return false; }
    }
    function voiceName() {
        try { return window.NarbeVoiceManager.getVoiceDisplayName(window.NarbeVoiceManager.getCurrentVoice()); } catch (e) { return ''; }
    }
    function voiceRate() {
        try { return window.NarbeVoiceManager.getSettings().rate || 1; } catch (e) { return 1; }
    }
    /** Roughly how long a line takes to say, at the chosen speed. */
    function speechMs(text) {
        if (!ttsOn() || !text) return 0;
        const words = String(text).trim().split(/\s+/).length;
        return 600 + Math.round(words / 2.6 * 1000 / voiceRate());
    }

    ['select', 'hover', 'win'].forEach(function (n) { try { window.SafeAudio.preload(n); } catch (e) { /* no sound */ } });
    function sfx(name, volume) {
        if (!prefs.sounds) return;
        try { window.SafeAudio.play(name, volume); } catch (e) { /* no sound */ }
    }

    // --- scanning -----------------------------------------------------------------

    let screen = 'menu';
    let items = [];
    let index = -1;
    let choice = null;
    let spaceHeld = false, enterHeld = false, braking = false;
    let backTimer = null, backRepeat = null;

    function contextKey() {
        return screen === 'play' && round ? 'pieces:' + round.n + ':' + round.version : screen;
    }

    function mapItems(list) {
        return list.filter(function (it) { return it.el && !it.el.disabled; }).map(function (it) {
            return {
                id: it.id,
                label: function () { return typeof it.speak === 'function' ? it.speak() : it.speak; },
                element: it.el,
                source: it
            };
        });
    }

    function ensureChoice() {
        if (choice) return;
        choice = window.NarbeChoiceScanAdapter.create({
            holdThreshold: HOLD,
            stateHost: $('pz'),
            speak: speak,
            onContext: function (context) {
                items = context.items.map(function (it) { return it.source; });
                // Back from the spots: the piece is no longer being placed.
                if (context.key.indexOf('slots:') !== 0) clearPicked();
            },
            onHighlight: function (item) {
                const before = index;
                index = item && item.source ? items.indexOf(item.source) : -1;
                paint();
                if (item && before !== index) sfx('hover', 0.25);
            },
            onSelect: function (item) { if (item && item.source) activate(item.source); }
        });
    }

    function sync(fresh) {
        ensureChoice();
        choice.sync({ key: contextKey(), statusHost: $('status'), items: mapItems(items) }, { fresh: !!fresh });
        choice.setInputHeld(spaceHeld || enterHeld);
    }

    function paint() {
        document.querySelectorAll('.nf-focus').forEach(function (el) { el.classList.remove('nf-focus'); });
        const it = items[index];
        if (it && it.el) it.el.classList.add('nf-focus');
    }

    function activate(it) {
        if (it && typeof it.action === 'function') it.action(it);
    }

    function refreshItems() {
        items = providers[screen]();
        wireClicks();
        sync(false);
    }

    function wireClicks() {
        items.forEach(function (it) {
            if (!it.el || it.el.dataset.nfWired === '1') return;
            it.el.dataset.nfWired = '1';
            it.el.addEventListener('click', function (e) {
                e.preventDefault();
                const current = items.find(function (x) { return x.el === it.el; });
                if (!current) return;
                if (choice) choice.align(current.id);
                activate(current);
            });
        });
    }

    function clearSpace() {
        if (backTimer) { clearTimeout(backTimer); backTimer = null; }
        if (backRepeat) { clearInterval(backRepeat); backRepeat = null; }
        spaceHeld = false;
    }

    function isSwitchKey(code) { return code === 'Space' || code === 'Enter' || code === 'NumpadEnter'; }

    function onKeyDown(e) {
        if (!isSwitchKey(e.code)) return;
        e.preventDefault();
        if (e.repeat || !choice) return;
        if (e.code !== 'Space') { enterHeld = true; choice.setInputHeld(true); return; }
        if (choice.brakePress()) { braking = true; return; }
        if (spaceHeld) return;
        spaceHeld = true;
        choice.setInputHeld(true);
        backTimer = setTimeout(function () {
            backTimer = null;
            if (!spaceHeld) return;
            choice.step(-1);
            const interval = (window.NarbeScanManager && window.NarbeScanManager.getScanInterval()) || 2000;
            backRepeat = setInterval(function () { choice.step(-1); }, interval);
        }, HOLD);
    }

    function onKeyUp(e) {
        if (!isSwitchKey(e.code)) return;
        e.preventDefault();
        if (!choice) return;
        if (e.code === 'Space') {
            if (braking) { braking = false; choice.brakeRelease(); return; }
            const wasBack = backRepeat !== null;
            const wasHeld = spaceHeld;
            clearSpace();
            choice.setInputHeld(enterHeld);
            if (wasHeld && !wasBack) choice.step(1);
        } else {
            if (!enterHeld) return;
            enterHeld = false;
            choice.setInputHeld(spaceHeld);
            choice.select();
        }
    }

    function cancelInput() {
        clearSpace();
        enterHeld = false;
        braking = false;
        if (choice) choice.cancelInput();
    }

    // --- screens ------------------------------------------------------------------

    let settingsFrom = 'menu';
    let helpTimers = [];
    function stopHelp() { helpTimers.forEach(clearTimeout); helpTimers = []; }

    function show(name, silent) {
        stopHelp();
        screen = name;
        document.querySelectorAll('.nf-screen').forEach(function (s) {
            s.classList.toggle('active', s.id === 'pz-' + name);
        });
        render[name]();
        items = providers[name]();
        index = -1;
        paint();
        wireClicks();
        sync(true);
        if (silent) return;
        const arrival = {
            menu: L.menu.greeting,
            settings: L.settings.title + '.',
            pause: L.pause.spoken,
            help: L.helpScreen.titleSpoken,
            play: L.choosePiece
        }[name];
        if (arrival) speak(arrival);
    }

    function button(parent, cls, text, aria) {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'nf-btn ' + (cls || '');
        if (text !== undefined) b.textContent = text;
        if (aria) b.setAttribute('aria-label', aria);
        parent.appendChild(b);
        return b;
    }

    function exitGame() {
        speak(L.goodbye);
        if (window.parent && window.parent !== window) window.parent.postMessage({ action: 'focusBackButton' }, '*');
        else window.location.href = '../../../index.html';
    }

    function el(listId, id) { return $(listId).querySelector('[data-item="' + id + '"]'); }

    const render = {
        menu: function () {
            const list = $('pz-menu-list');
            list.innerHTML = '';
            const types = document.createElement('div');
            types.className = 'pz-types';
            list.appendChild(types);
            Object.keys(TYPES).forEach(function (t) {
                const b = button(types, 'pz-type', undefined, L.types[t][0]);
                b.dataset.item = t;
                b.innerHTML = ICONS[t] + '<span>' + L.types[t][0] + '</span>';
            });
            ['help', 'settings', 'exit'].forEach(function (k) {
                button(list, '', L.menu[k][0]).dataset.item = k;
            });
        },
        play: function () { renderPlay(); },
        pause: function () {
            const list = $('pz-pause-list');
            list.innerHTML = '';
            ['resume', 'settings', 'menu', 'exit'].forEach(function (k) {
                button(list, k === 'resume' ? 'nf-primary' : '', L.pause[k][0]).dataset.item = k;
            });
        },
        settings: function () {
            const list = $('pz-settings-list');
            list.innerHTML = '';
            settingsRows().forEach(function (r) {
                const b = button(list, 'nf-row');
                b.dataset.item = r.id;
                const label = document.createElement('span');
                label.className = 'nf-row-label';
                label.textContent = r.label;
                const value = document.createElement('span');
                value.className = 'nf-row-value';
                value.textContent = r.value;
                b.append(label, value);
            });
        },
        help: function () {
            $('pz-help-title').textContent = L.helpScreen.title;
            $('pz-help-body').innerHTML = '';
            L.helpScreen.lines.forEach(function (line) {
                const p = document.createElement('p');
                p.textContent = line;
                $('pz-help-body').appendChild(p);
            });
            const list = $('pz-help-list');
            list.innerHTML = '';
            button(list, '', L.helpScreen.back[0]).dataset.item = 'back';
        }
    };

    const providers = {
        menu: function () {
            const list = Object.keys(TYPES).map(function (t) {
                return { id: 'menu:' + t, el: el('pz-menu-list', t), speak: L.types[t][1], action: function () { startPlay(t); } };
            });
            return list.concat([
                { id: 'menu:help', el: el('pz-menu-list', 'help'), speak: L.menu.help[1], action: function () { show('help'); } },
                { id: 'menu:settings', el: el('pz-menu-list', 'settings'), speak: L.menu.settings[1],
                  action: function () { settingsFrom = 'menu'; show('settings'); } },
                { id: 'menu:exit', el: el('pz-menu-list', 'exit'), speak: L.menu.exit[1], action: exitGame }
            ]);
        },
        play: function () {
            const list = [];
            if (round) {
                round.left.forEach(function (pi, pos) {
                    list.push({
                        id: 'piece:' + pi,
                        el: el('pz-pieces', 'piece:' + pi),
                        speak: L.piece(pos + 1),
                        action: function () { pickPiece(pi); }
                    });
                });
            }
            list.push({ id: 'pause', el: $('pz-pause-btn'), speak: L.pause.spoken, action: openPause });
            return list;
        },
        pause: function () {
            return [
                { id: 'pause:resume', el: el('pz-pause-list', 'resume'), speak: L.pause.resume[1], action: resume },
                { id: 'pause:settings', el: el('pz-pause-list', 'settings'), speak: L.pause.settings[1],
                  action: function () { settingsFrom = 'pause'; show('settings'); } },
                { id: 'pause:menu', el: el('pz-pause-list', 'menu'), speak: L.pause.menu[1], action: toMenu },
                { id: 'pause:exit', el: el('pz-pause-list', 'exit'), speak: L.pause.exit[1], action: exitGame }
            ];
        },
        settings: function () {
            return settingsRows().map(function (r) {
                return {
                    id: 'set:' + r.id,
                    el: el('pz-settings-list', r.id),
                    speak: r.speak,
                    action: function () {
                        r.action();
                        if (r.id === 'back') return;
                        render.settings();
                        refreshItems();
                        if (choice) choice.announce();
                    }
                };
            });
        },
        help: function () {
            return [
                { id: 'help:read', el: $('pz-help-title'), speak: L.helpScreen.titleSpoken, action: readHelp },
                { id: 'help:back', el: el('pz-help-list', 'back'), speak: L.helpScreen.back[1],
                  action: function () { stopHelp(); show(round ? 'pause' : 'menu'); } }
            ];
        }
    };

    function rateName() {
        const r = voiceRate();
        return L.settings.rateNames[String(r)] || Math.round(r * 100) + '%';
    }

    function settingsRows() {
        const S = L.settings;
        const auto = !!(window.NarbeScanManager && window.NarbeScanManager.getSettings().autoScan);
        const secs = ((window.NarbeScanManager && window.NarbeScanManager.getScanInterval()) || 2000) / 1000 + ' s';
        return [
            { id: 'tts', label: S.tts[0], value: ttsOn() ? S.on : S.off,
              speak: function () { return ttsOn() ? S.tts[1] : S.tts[2]; },
              action: function () { try { window.NarbeVoiceManager.toggleTTS(); } catch (e) { /* no voice */ } } },
            { id: 'voice', label: S.voice[0], value: voiceName(),
              speak: function () { return S.voice[1](voiceName()); },
              action: function () { try { window.NarbeVoiceManager.cycleVoice(); } catch (e) { /* no voice */ } } },
            { id: 'rate', label: S.rate[0], value: rateName(),
              speak: function () { return S.rate[1](rateName()); },
              action: function () { try { window.NarbeVoiceManager.cycleRate(); } catch (e) { /* no voice */ } } },
            { id: 'ghost', label: S.ghost[0], value: prefs.ghost ? S.on : S.off,
              speak: function () { return prefs.ghost ? S.ghost[1] : S.ghost[2]; },
              action: function () { prefs.ghost = !prefs.ghost; savePrefs(); } },
            { id: 'auto', label: S.auto[0], value: auto ? S.auto[1] : S.auto[2],
              speak: function () { return window.NarbeScanManager.getSettings().autoScan ? S.auto[3] : S.auto[4]; },
              action: function () { try { window.NarbeScanManager.toggleAutoScan(); } catch (e) { /* no scan */ } } },
            { id: 'speed', label: S.speed[0], value: secs,
              speak: function () { return S.speed[1](window.NarbeScanManager.getScanInterval() / 1000 + ' s'); },
              action: function () { try { window.NarbeScanManager.cycleScanSpeed(); } catch (e) { /* no scan */ } } },
            { id: 'sounds', label: S.sounds[0], value: prefs.sounds ? S.on : S.off,
              speak: function () { return prefs.sounds ? S.sounds[1] : S.sounds[2]; },
              action: function () { prefs.sounds = !prefs.sounds; savePrefs(); } },
            { id: 'back', label: S.back[0], value: '', speak: S.back[1],
              action: function () { show(settingsFrom); } }
        ];
    }

    function readHelp() {
        stopHelp();
        let at = 0;
        L.helpScreen.lines.forEach(function (line) {
            helpTimers.push(setTimeout(function () { speak(line); }, at));
            at += speechMs(line) + 300;
        });
    }

    // --- pieces -------------------------------------------------------------------

    let pictures = ['pig.jpg'];
    let pictureAt = 0;
    let round = null;
    let picked = null;
    let nextTimer = null;
    let clipId = 0;

    function shuffle(list) {
        const a = list.slice();
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const t = a[i]; a[i] = a[j]; a[j] = t;
        }
        return a;
    }

    /** One edge from (x1,y1) to (x2,y2); sign 0 = straight, +1/-1 = tab out/in. */
    function edge(x1, y1, x2, y2, sign, size) {
        if (!sign) return ' L ' + x2 + ' ' + y2;
        const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy);
        const ux = dx / len, uy = dy / len, nx = uy, ny = -ux;   // n points out of the piece (clockwise path)
        const P = function (t, h) {
            return (x1 + ux * t * len + nx * h * size * sign).toFixed(1) + ' ' + (y1 + uy * t * len + ny * h * size * sign).toFixed(1);
        };
        return ' L ' + P(0.37, 0) + ' C ' + P(0.44, 0) + ' ' + P(0.30, 1) + ' ' + P(0.50, 1) +
            ' C ' + P(0.70, 1) + ' ' + P(0.56, 0) + ' ' + P(0.63, 0) + ' L ' + x2 + ' ' + y2;
    }

    /** Cut the picture: each piece's cell, outline path and the margin its tabs need. */
    function cut(type) {
        const T = TYPES[type];
        const cw = T.w / T.cols, ch = T.h / T.rows;
        const size = T.jigsaw ? 0.22 * Math.min(cw, ch) : 0;
        const rnd = function () { return Math.random() < 0.5 ? 1 : -1; };
        // V[r][c]: edge right of (c,r); H[r][c]: edge below (c,r). +1 = tab into the next piece.
        const V = [], H = [];
        for (let r = 0; r < T.rows; r++) { V.push([]); H.push([]); for (let c = 0; c < T.cols; c++) { V[r].push(rnd()); H[r].push(rnd()); } }
        const pieces = [];
        for (let r = 0; r < T.rows; r++) {
            for (let c = 0; c < T.cols; c++) {
                const x = c * cw, y = r * ch;
                const j = T.jigsaw;
                const top = j && r > 0 ? -H[r - 1][c] : 0;
                const right = j && c < T.cols - 1 ? V[r][c] : 0;
                const bottom = j && r < T.rows - 1 ? H[r][c] : 0;
                const left = j && c > 0 ? -V[r][c - 1] : 0;
                const path = 'M ' + x + ' ' + y +
                    edge(x, y, x + cw, y, top, size) +
                    edge(x + cw, y, x + cw, y + ch, right, size) +
                    edge(x + cw, y + ch, x, y + ch, bottom, size) +
                    edge(x, y + ch, x, y, left, size) + ' Z';
                pieces.push({ x: x, y: y, w: cw, h: ch, path: path, cx: x + cw / 2, cy: y + ch / 2 });
            }
        }
        return { pieces: pieces, margin: T.jigsaw ? size * 1.15 : 8, w: T.w, h: T.h };
    }

    /** SVG markup showing the picture through one piece's outline. */
    function pieceImage(p, cutData, src) {
        const id = 'pzc' + (++clipId);
        return '<defs><clipPath id="' + id + '"><path d="' + p.path + '"/></clipPath></defs>' +
            '<image href="' + src + '" x="0" y="0" width="' + cutData.w + '" height="' + cutData.h + '" ' +
            'preserveAspectRatio="xMidYMid slice" clip-path="url(#' + id + ')"/>' +
            '<path class="pz-outline" d="' + p.path + '"/>';
    }

    function renderPlay() {
        if (!round) return;
        const T = TYPES[round.type];
        const c = round.cut;
        const m = c.margin;

        const left = $('pz-pieces');
        left.innerHTML = '';
        left.style.setProperty('--cols', T.leftCols);
        left.style.setProperty('--rows', Math.ceil(round.left.length / T.leftCols) || 1);
        round.left.forEach(function (pi, pos) {
            const p = c.pieces[pi];
            const b = button(left, 'pz-piece', undefined, L.piece(pos + 1));
            b.dataset.item = 'piece:' + pi;
            if (picked === pi) b.classList.add('pz-picked');
            b.innerHTML = '<svg viewBox="' + (p.x - m) + ' ' + (p.y - m) + ' ' + (p.w + 2 * m) + ' ' + (p.h + 2 * m) + '">' +
                pieceImage(p, c, round.src) + '</svg>';
        });

        let board = '<svg class="pz-board-svg" viewBox="-10 -10 ' + (c.w + 20) + ' ' + (c.h + 20) + '">';
        if (prefs.ghost && !round.done) {
            board += '<image href="' + round.src + '" x="0" y="0" width="' + c.w + '" height="' + c.h + '" ' +
                'preserveAspectRatio="xMidYMid slice" opacity="0.22"/>';
        }
        const fontSize = Math.round(Math.min(c.pieces[0].w, c.pieces[0].h) * 0.32);
        c.pieces.forEach(function (p, i) {
            if (round.placed[i]) board += '<g class="pz-filled">' + pieceImage(p, c, round.src) + '</g>';
        });
        c.pieces.forEach(function (p, i) {
            if (round.placed[i]) return;
            board += '<g class="pz-slot" data-item="slot:' + i + '" role="button" aria-label="' + L.slot(i + 1) + '">' +
                '<path class="pz-slot-fill" d="' + p.path + '"/>' +
                '<text x="' + p.cx + '" y="' + p.cy + '" font-size="' + fontSize + '" text-anchor="middle" dominant-baseline="central">' +
                (i + 1) + '</text></g>';
        });
        board += '</svg>';
        $('pz-board').innerHTML = board;

        $('pz-instruction').textContent = round.done ? '' : (picked === null ? L.choosePiece : L.chooseSlot);
        $('pz-pause-btn').textContent = L.pause.button;
    }

    function slotItems() {
        const list = [];
        round.cut.pieces.forEach(function (p, i) {
            if (round.placed[i]) return;
            list.push({ id: 'slot:' + i, el: el('pz-board', 'slot:' + i), speak: L.slot(i + 1), action: function () { placeAt(i); } });
        });
        return list;
    }

    function clearPicked() {
        if (picked === null) return;
        picked = null;
        document.querySelectorAll('.pz-picked').forEach(function (b) { b.classList.remove('pz-picked'); });
        if ($('pz-instruction')) $('pz-instruction').textContent = L.choosePiece;
    }

    function pickPiece(pi) {
        if (!round || round.done) return;
        picked = pi;
        const b = el('pz-pieces', 'piece:' + pi);
        if (b) b.classList.add('pz-picked');
        $('pz-instruction').textContent = L.chooseSlot;
        sfx('select', 0.3);
        const slots = slotItems();
        slots.forEach(function (s) { wireSlot(s); });
        // The spots are entered as a group: they loop with a Back stop that
        // returns to this same piece.
        const entered = choice && choice.enterGroup(
            { key: 'slots:' + round.n + ':' + round.version, statusHost: $('status'), items: mapItems(slots) },
            { wrap: true, backStop: true });
        if (!entered) clearPicked();
    }

    // A pointer on a spot places the picked piece there.
    function wireSlot(s) {
        if (!s.el || s.el.dataset.nfWired === '1') return;
        s.el.dataset.nfWired = '1';
        s.el.addEventListener('click', function () { if (picked !== null) placeAt(Number(s.id.split(':')[1])); });
    }

    function placeAt(slot) {
        if (!round || picked === null) return;
        const pi = picked;
        if (slot === pi) {
            round.placed[pi] = true;
            round.left = round.left.filter(function (x) { return x !== pi; });
            round.version++;
            picked = null;
            sfx('win', 0.4);
            if (!round.left.length) return finish();
            renderPlay();
            items = providers.play();
            wireClicks();
            sync(true);            // a fresh list: the placed piece is gone
            speak(L.right[Math.floor(Math.random() * L.right.length)]);
        } else {
            sfx('select', 0.4);
            if (choice) choice.back({ restore: true });   // back on the same piece, on the left
            clearPicked();
            speak(L.wrong);
        }
    }

    function finish() {
        round.done = true;
        renderPlay();
        items = providers.play();
        wireClicks();
        sync(true);
        speak(L.done);
        nextTimer = setTimeout(function () {
            nextTimer = null;
            if (screen === 'play') newRound(round.type);
        }, Math.max(3500, speechMs(L.done) + 1500));
    }

    function newRound(type) {
        const src = 'images/' + pictures[pictureAt % pictures.length];
        pictureAt++;
        const c = cut(type);
        let order;
        do { order = shuffle(c.pieces.map(function (p, i) { return i; })); }
        while (order.length > 1 && order.every(function (v, i) { return v === i; }));   // never already solved
        round = { n: round ? round.n + 1 : 1, version: 0, type: type, src: src, cut: c,
                  left: order, placed: c.pieces.map(function () { return false; }), done: false };
        picked = null;
        show('play');
    }

    function startPlay(type) { round = null; newRound(type); }

    function openPause() {
        if (nextTimer) { clearTimeout(nextTimer); nextTimer = null; }
        clearPicked();
        show('pause');
    }

    function resume() {
        if (round && round.done) newRound(round.type);
        else show('play');
    }

    function toMenu() {
        if (nextTimer) { clearTimeout(nextTimer); nextTimer = null; }
        round = null;
        picked = null;
        show('menu');
    }

    // --- boot ---------------------------------------------------------------------

    function boot() {
        document.documentElement.lang = L.lang;
        document.title = L.title;
        $('pz-title').textContent = L.title;
        document.querySelectorAll('.nf-hint').forEach(function (h) { h.textContent = L.hint; });
        $('pz-pause-title').textContent = L.pause.title;
        $('pz-settings-title').textContent = L.settings.title;

        document.addEventListener('keydown', onKeyDown);
        document.addEventListener('keyup', onKeyUp);
        document.addEventListener('narbe-input-cancelled', cancelInput);
        window.addEventListener('blur', cancelInput);
        if (window.NarbeScanManager && window.NarbeScanManager.subscribe) {
            window.NarbeScanManager.subscribe(function () {
                if (screen === 'settings') { render.settings(); refreshItems(); }
            });
        }
        fetch('images/pictures.json').then(function (r) { return r.json(); }).then(function (list) {
            if (Array.isArray(list) && list.length) pictures = shuffle(list);
        }).catch(function () { /* keep the built-in list */ });
        show('menu');
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
    else boot();
})();
