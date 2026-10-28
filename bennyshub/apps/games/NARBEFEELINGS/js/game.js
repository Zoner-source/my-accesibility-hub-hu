/**
 * Feelings - "Who is sad?" Three faces, pick the one that shows the feeling.
 *
 * An endless loop like NARBE Animal Friends: no score, no timer, no losing. A
 * right pick is cheered and the next round starts by itself; a wrong pick says
 * which feeling that face shows and asks again.
 *
 * Every screen is a stationary CHOICE (nothing moves if the player stops
 * pressing), so all scanning goes through the shared NarbeChoiceScanAdapter:
 * the root -1 blank, Auto Scan, Space brake and parking come from there. This
 * file forwards Space/Enter after scan-manager's input guard and owns only the
 * held-Space backwards scan, using the Hub keyboard's 1 s hold.
 *
 * All text comes from window.NFL (js/lang-*.js).
 */
(function () {
    'use strict';

    const L = window.NFL;
    const HOLD = 1000;                  // hold Space this long to scan backwards
    const PAIR = { afraid: 'surprised', surprised: 'afraid' };
    const IMAGES = {
        happy: [3245, 31923, 10192],
        sad: [2606, 11959, 31939],
        afraid: [2261, 11951, 31896],
        surprised: [2574, 31099, 32170],
        sleepy: [2314, 28709, 31925],
        angry: [2374, 28671, 31884]
    };
    const FEELINGS = Object.keys(IMAGES);
    const STORE = 'narbe-feelings-settings';

    const $ = function (id) { return document.getElementById(id); };

    // --- settings that belong to this game (access settings are the Hub's) -----

    let prefs = { sounds: true };
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
    /** Roughly how long a line takes to say, for pacing the next one. */
    function speechMs(text) {
        if (!ttsOn() || !text) return 0;
        const words = String(text).trim().split(/\s+/).length;
        return 600 + Math.round(words / 2.6 * 1000);
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
        return screen === 'play' && round ? 'play:' + round.n : screen;
    }

    function sync(fresh) {
        if (!choice) {
            choice = window.NarbeChoiceScanAdapter.create({
                holdThreshold: HOLD,
                stateHost: $('nf'),
                speak: speak,
                onHighlight: function (item) {
                    const before = index;
                    index = item ? items.indexOf(item.source) : -1;
                    paint();
                    if (item && before !== index) sfx('hover', 0.25);
                },
                onSelect: function (item) { if (item) activate(item.source); }
            });
        }
        choice.sync({
            key: contextKey(),
            statusHost: $('status'),
            items: items.filter(function (it) { return it.el && !it.el.disabled; }).map(function (it) {
                return {
                    id: it.id,
                    label: function () { return typeof it.speak === 'function' ? it.speak() : it.speak; },
                    element: it.el,
                    source: it
                };
            })
        }, { fresh: !!fresh });
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

    /** Rebuild the current screen's items in place, keeping the highlight on the same item. */
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
            // A short press steps forward on release; a hold that scanned backwards does not.
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

    function stopHelp() {
        helpTimers.forEach(clearTimeout);
        helpTimers = [];
    }

    function show(name) {
        stopHelp();
        screen = name;
        document.querySelectorAll('.nf-screen').forEach(function (s) {
            s.classList.toggle('active', s.id === 'nf-' + name);
        });
        render[name]();
        items = providers[name]();
        index = -1;
        paint();
        wireClicks();
        sync(true);
        const arrival = {
            menu: L.menu.greeting,
            settings: L.settings.title + '.',
            pause: L.pause.spoken,
            help: L.helpScreen.titleSpoken,
            play: round ? L.question(L.feelings[round.target]) : ''
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
        if (window.parent && window.parent !== window) {
            window.parent.postMessage({ action: 'focusBackButton' }, '*');
        } else {
            window.location.href = '../../../index.html';
        }
    }

    const render = {
        menu: function () {
            const list = $('nf-menu-list');
            list.innerHTML = '';
            ['play', 'help', 'settings', 'exit'].forEach(function (k) {
                button(list, k === 'play' ? 'nf-primary' : '', L.menu[k][0]).dataset.item = k;
            });
        },
        play: function () {
            $('nf-question').textContent = round ? L.question(L.feelings[round.target]) : '';
            const faces = $('nf-faces');
            faces.innerHTML = '';
            if (!round) return;
            round.faces.forEach(function (f, i) {
                const b = button(faces, 'nf-face', undefined, L.faceLabel(i + 1));
                b.dataset.item = 'face:' + i;
                const img = document.createElement('img');
                img.src = f.src;
                img.alt = '';
                img.draggable = false;
                b.appendChild(img);
                if (round.done && f.feeling === round.target) b.classList.add('nf-right');
            });
            $('nf-pause-btn').textContent = L.pause.button;
        },
        pause: function () {
            const list = $('nf-pause-list');
            list.innerHTML = '';
            ['resume', 'settings', 'menu', 'exit'].forEach(function (k) {
                button(list, k === 'resume' ? 'nf-primary' : '', L.pause[k][0]).dataset.item = k;
            });
        },
        settings: function () {
            const list = $('nf-settings-list');
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
            $('nf-help-title').textContent = L.helpScreen.title;
            $('nf-help-body').innerHTML = '';
            L.helpScreen.lines.forEach(function (line) {
                const p = document.createElement('p');
                p.textContent = line;
                $('nf-help-body').appendChild(p);
            });
            const list = $('nf-help-list');
            list.innerHTML = '';
            button(list, '', L.helpScreen.back[0]).dataset.item = 'back';
        }
    };

    function el(listId, id) { return $(listId).querySelector('[data-item="' + id + '"]'); }

    const providers = {
        menu: function () {
            return [
                { id: 'menu:play', el: el('nf-menu-list', 'play'), speak: L.menu.play[1], action: startPlay },
                { id: 'menu:help', el: el('nf-menu-list', 'help'), speak: L.menu.help[1], action: function () { show('help'); } },
                { id: 'menu:settings', el: el('nf-menu-list', 'settings'), speak: L.menu.settings[1],
                  action: function () { settingsFrom = 'menu'; show('settings'); } },
                { id: 'menu:exit', el: el('nf-menu-list', 'exit'), speak: L.menu.exit[1], action: exitGame }
            ];
        },
        play: function () {
            const list = [];
            if (round) {
                round.faces.forEach(function (f, i) {
                    list.push({
                        id: 'face:' + i,
                        el: el('nf-faces', 'face:' + i),
                        speak: L.faceLabel(i + 1),
                        action: function (it) { answer(f, it.el); }
                    });
                });
            }
            // Pause is always in the scan cycle, and always last.
            list.push({ id: 'pause', el: $('nf-pause-btn'), speak: L.pause.spoken, action: openPause });
            return list;
        },
        pause: function () {
            return [
                { id: 'pause:resume', el: el('nf-pause-list', 'resume'), speak: L.pause.resume[1], action: resume },
                { id: 'pause:settings', el: el('nf-pause-list', 'settings'), speak: L.pause.settings[1],
                  action: function () { settingsFrom = 'pause'; show('settings'); } },
                { id: 'pause:menu', el: el('nf-pause-list', 'menu'), speak: L.pause.menu[1], action: toMenu },
                { id: 'pause:exit', el: el('nf-pause-list', 'exit'), speak: L.pause.exit[1], action: exitGame }
            ];
        },
        settings: function () {
            return settingsRows().map(function (r) {
                return {
                    id: 'set:' + r.id,
                    el: el('nf-settings-list', r.id),
                    speak: r.speak,
                    action: function () {
                        r.action();
                        if (r.id === 'back') return;
                        // Redraw in place and stay on the same row, then say the new value.
                        render.settings();
                        refreshItems();
                        if (choice) choice.announce();
                    }
                };
            });
        },
        help: function () {
            return [
                { id: 'help:read', el: $('nf-help-title'), speak: L.helpScreen.titleSpoken, action: readHelp },
                { id: 'help:back', el: el('nf-help-list', 'back'), speak: L.helpScreen.back[1],
                  action: function () { stopHelp(); show(round ? 'pause' : 'menu'); } }
            ];
        }
    };

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

    // --- the game -----------------------------------------------------------------

    let round = null;
    let nextTimer = null;
    let lastTarget = null, lastSrc = null, cheerAt = 0;

    function pick(list) { return list[Math.floor(Math.random() * list.length)]; }
    function shuffle(list) {
        const a = list.slice();
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const t = a[i]; a[i] = a[j]; a[j] = t;
        }
        return a;
    }
    function src(feeling, id) { return 'images/' + feeling + '_' + id + '.png'; }

    function newRound() {
        let target;
        do { target = pick(FEELINGS); } while (target === lastTarget);
        // Afraid and surprised look alike; when one is asked, the other is always
        // one of the three, so the difference gets practised.
        const set = [target];
        if (PAIR[target]) set.push(PAIR[target]);
        while (set.length < 3) {
            const f = pick(FEELINGS);
            if (set.indexOf(f) < 0) set.push(f);
        }
        const faces = shuffle(set).map(function (f) {
            let s;
            do { s = src(f, pick(IMAGES[f])); } while (f === target && s === lastSrc && IMAGES[f].length > 1);
            return { feeling: f, src: s };
        });
        lastTarget = target;
        lastSrc = faces.find(function (f) { return f.feeling === target; }).src;
        round = { n: round ? round.n + 1 : 1, target: target, faces: faces, done: false };
        show('play');
    }

    function startPlay() {
        round = null;
        newRound();
    }

    function answer(face, button) {
        if (!round || round.done) return;
        const target = L.feelings[round.target];
        if (face.feeling === round.target) {
            round.done = true;
            button.classList.add('nf-right');
            sfx('win', 0.5);
            const line = L.right(L.cheers[cheerAt++ % L.cheers.length], target);
            speak(line);
            nextTimer = setTimeout(function () { nextTimer = null; if (screen === 'play') newRound(); },
                Math.max(2200, speechMs(line) + 900));
        } else {
            button.classList.remove('nf-wrong');
            void button.offsetWidth;                // restart the shake
            button.classList.add('nf-wrong');
            sfx('select', 0.4);
            speak(L.wrong(L.feelings[face.feeling], target));
        }
    }

    function openPause() {
        if (nextTimer) { clearTimeout(nextTimer); nextTimer = null; }
        show('pause');
    }

    function resume() {
        if (round && round.done) newRound();
        else show('play');
    }

    function toMenu() {
        if (nextTimer) { clearTimeout(nextTimer); nextTimer = null; }
        round = null;
        show('menu');
    }

    // --- boot -----------------------------------------------------------------------

    function boot() {
        document.documentElement.lang = L.lang;
        document.title = L.title;
        $('nf-title').textContent = L.title;
        document.querySelectorAll('.nf-hint').forEach(function (h) { h.textContent = L.hint; });
        $('nf-pause-title').textContent = L.pause.title;
        $('nf-settings-title').textContent = L.settings.title;

        document.addEventListener('keydown', onKeyDown);
        document.addEventListener('keyup', onKeyUp);
        document.addEventListener('narbe-input-cancelled', cancelInput);
        window.addEventListener('blur', cancelInput);
        if (window.NarbeScanManager && window.NarbeScanManager.subscribe) {
            window.NarbeScanManager.subscribe(function () {
                if (screen === 'settings') { render.settings(); refreshItems(); } else sync(false);
            });
        }
        show('menu');
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
    else boot();
})();
