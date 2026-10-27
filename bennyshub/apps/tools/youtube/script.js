// =====================================================================
//  Videoclipuri YouTube — Benny's Accessibility Hub
//
//  - Videos are listed top to bottom, one highlighted at a time.
//  - Space = move to the next row, Enter = select  (same as the other tools)
//  - Space held 3s = scan backwards, Enter held 3s = reverse a setting
//  - While a video plays, ANY Space/Enter pauses it and shows a small
//    top-to-bottom menu (Lejátszás / Elölről / Következő / Vissza a listához).
//    The video is paused while that menu is up, so speech never competes
//    with the video's own sound.
//  - Videos come from videos.json (see that file).
// =====================================================================

// ---------------------------------------------------------------------
//  All user-facing text lives here, so wording can be changed in one place.
// ---------------------------------------------------------------------
const STR = {
    listTitle: 'YOUTUBE VIDEÓK',
    settingsTitle: 'BEÁLLÍTÁSOK',
    hint: 'Szóköz = előre  ·  Enter = kiválaszt',
    listSpoken: 'Videók',
    settingsSpoken: 'Beállítások',
    settings: 'Beállítások',
    exit: 'Kilépés',
    back: 'Vissza',
    on: 'Be',
    off: 'Ki',
    tts: 'Hangvisszajelzés',
    autoScan: 'Automatikus pásztázás',
    scanSpeed: 'Pásztázási sebesség',
    hlStyle: 'Kiemelés stílusa',
    hlOutline: 'Körvonal',
    hlFull: 'Teljes mező',
    hlColor: 'Kiemelés színe',
    nowPlaying: t => `Lejátszás: ${t}`,
    paused: 'Szünet',
    resume: 'Lejátszás',
    restart: 'Elölről',
    next: 'Következő videó',
    backToList: 'Vissza a listához',
    loading: 'Betöltés…',
    ended: 'A videó véget ért',
    notStarted: 'A videó nem indult el',
    cannotPlay: 'Ez a videó nem játszható le',
    cannotLoad: 'A YouTube nem tölthető be. Ellenőrizze az internetkapcsolatot.',
    empty: 'Nincsenek videók. Adja hozzá őket a videos.json fájlban.',
    untitled: 'Cím nélküli videó',
    exiting: 'Vissza a főmenübe'
};

// ---------------------------------------------------------------------
//  Configuration
// ---------------------------------------------------------------------
const config = {
    longPress: 3000,        // hold Space this long to scan backwards
    repeatInterval: 2000,   // how often backwards scan / reverse-toggle repeats
    loadWatchdog: 12000     // ms to wait for a video to start before reporting a problem
};

// Used only if videos.json cannot be loaded at all.
const DEFAULT_VIDEOS = [
    { title: 'Példa: az első YouTube-videó', id: 'jNQXAC9IVRw' }
];

// Highlight colours. These are real CSS colour names applied directly via the
// --hl CSS variable, so the array must stay in English. Only the label shown or
// spoken is translated (same rule as the other tools).
const highlightColors = ['Yellow', 'Cyan', 'Lime', 'Magenta', 'Orange', 'White'];
const highlightColorNamesHU = {
    Yellow: 'Sárga', Cyan: 'Ciánkék', Lime: 'Lime zöld',
    Magenta: 'Bíbor', Orange: 'Narancs', White: 'Fehér'
};

// ---------------------------------------------------------------------
//  State
// ---------------------------------------------------------------------
let videos = [];            // [{ id, title, thumb }]
let ytPlayer = null;        // YT.Player instance (created on first use)
let playerPromise = null;   // resolves with ytPlayer once it is ready
let ytApiPromise = null;
let watchdogTimer = null;
let messageTimer = null;

const settings = {
    tts: true,
    highlightColorIndex: 0,
    highlightStyle: 'outline',   // 'outline' | 'full'
    // Only used when the shared NarbeScanManager is missing (standalone testing)
    autoScan: false,
    scanInterval: 2000
};

const state = {
    mode: 'list',               // 'list' | 'settings' | 'player'
    idx: { list: 0, settings: 0, player: 0 },
    currentVideo: -1,
    controlsVisible: false,
    playerReady: false,
    playingSeen: false,
    input: { spaceHeld: false, enterHeld: false, spaceTime: 0, enterTime: 0 },
    timers: { space: null, enter: null, spaceRepeat: null, enterRepeat: null, autoScan: null }
};

// ---------------------------------------------------------------------
//  DOM shortcuts
// ---------------------------------------------------------------------
const $ = id => document.getElementById(id);
const el = {};

function cacheElements() {
    el.listView = $('list-view');
    el.title = $('title');
    el.hint = $('hint');
    el.note = $('note');
    el.list = $('list');
    el.playerView = $('player-view');
    el.overlay = $('player-overlay');
    el.status = $('player-status');
    el.controlsWrap = $('controls-wrap');
    el.controlsTitle = $('controls-title');
    el.controls = $('controls');
    el.message = $('message');
}

// ---------------------------------------------------------------------
//  Speech
// ---------------------------------------------------------------------
function speak(text) {
    if (!text) return;
    if (window.NarbeVoiceManager) {
        window.NarbeVoiceManager.speak(text);
    } else if (settings.tts && 'speechSynthesis' in window) {
        speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'hu-HU';
        speechSynthesis.speak(u);
    }
}

// "Prefix. Text" — without doubling the full stop when the prefix already ends with one.
function joinSpeech(prefix, text) {
    return `${String(prefix).replace(/[.!?…]+$/, '')}. ${text}`;
}

function ttsOn() {
    if (window.NarbeVoiceManager) return !!window.NarbeVoiceManager.getSettings().ttsEnabled;
    return !!settings.tts;
}

// ---------------------------------------------------------------------
//  Scan manager helpers (fall back to local values if the shared one is absent)
// ---------------------------------------------------------------------
function autoScanOn() {
    if (window.NarbeScanManager) return !!window.NarbeScanManager.getSettings().autoScan;
    return !!settings.autoScan;
}

function scanInterval() {
    if (window.NarbeScanManager) return window.NarbeScanManager.getScanInterval();
    return settings.scanInterval;
}

// ---------------------------------------------------------------------
//  Loading videos
// ---------------------------------------------------------------------
function extractVideoId(url) {
    const raw = String(url || '').trim();
    try {
        const u = new URL(raw);
        const host = u.hostname.replace(/^www\./, '');
        if (host === 'youtu.be') return u.pathname.slice(1).split('/')[0];
        if (host.endsWith('youtube.com') || host.endsWith('youtube-nocookie.com')) {
            const v = u.searchParams.get('v');
            if (v) return v;
            const m = u.pathname.match(/^\/(?:embed|shorts|live|v)\/([\w-]{11})/);
            if (m) return m[1];
        }
    } catch (e) { /* not a URL — maybe a bare ID, handled below */ }
    return /^[\w-]{11}$/.test(raw) ? raw : '';
}

function normalizeVideo(v) {
    if (!v) return null;
    const id = v.id ? String(v.id).trim() : extractVideoId(v.url);
    if (!/^[\w-]{11}$/.test(id)) {
        console.warn('videos.json: entry skipped (no valid YouTube ID):', v);
        return null;
    }
    return {
        id,
        title: (v.title && String(v.title).trim()) || STR.untitled,
        thumb: v.thumbnail || `https://i.ytimg.com/vi/${id}/mqdefault.jpg`
    };
}

async function loadVideos() {
    let list = DEFAULT_VIDEOS;
    try {
        const res = await fetch('videos.json', { cache: 'no-store' });
        if (res.ok) {
            const data = await res.json();
            const arr = Array.isArray(data) ? data : data.videos;
            if (Array.isArray(arr)) list = arr;
        }
    } catch (e) {
        console.warn('Could not read videos.json, using built-in example list.', e);
    }
    videos = list.map(normalizeVideo).filter(Boolean);
}

// ---------------------------------------------------------------------
//  Settings storage
// ---------------------------------------------------------------------
function loadSettings() {
    try {
        const saved = localStorage.getItem('youtube_settings');
        if (saved) Object.assign(settings, JSON.parse(saved));
        if (settings.highlightColorIndex >= highlightColors.length) settings.highlightColorIndex = 0;
    } catch (e) { console.warn('Could not load settings', e); }
}

function saveSettings() {
    try { localStorage.setItem('youtube_settings', JSON.stringify(settings)); } catch (e) { /* ignore */ }
}

function applyHighlight() {
    document.documentElement.style.setProperty('--hl', highlightColors[settings.highlightColorIndex]);
    document.body.classList.toggle('hl-full', settings.highlightStyle === 'full');
}

// ---------------------------------------------------------------------
//  Menu items for each mode
// ---------------------------------------------------------------------
function itemText(item) {
    return typeof item.text === 'function' ? item.text() : item.text;
}

function listItems() {
    const items = videos.map((v, i) => ({
        thumb: v.thumb,
        text: v.title,
        action: () => playVideo(i)
    }));
    items.push({ icon: '⚙️', text: STR.settings, action: () => showSettings() });
    items.push({ icon: '🚪', text: STR.exit, action: () => exitApp() });
    return items;
}

function settingsItems() {
    return [
        { icon: '🔊', text: () => `${STR.tts}: ${ttsOn() ? STR.on : STR.off}`,
          action: toggleTTS, onPrev: toggleTTS },
        { icon: '⏱️', text: () => `${STR.autoScan}: ${autoScanOn() ? STR.on : STR.off}`,
          action: toggleAutoScan, onPrev: toggleAutoScan },
        { icon: '⏩', text: () => `${STR.scanSpeed}: ${scanInterval() / 1000}s`,
          action: cycleScanSpeed, onPrev: cycleScanSpeed },
        { icon: '🔲', text: () => `${STR.hlStyle}: ${settings.highlightStyle === 'outline' ? STR.hlOutline : STR.hlFull}`,
          action: toggleHighlightStyle, onPrev: toggleHighlightStyle },
        { icon: '🎨', text: () => `${STR.hlColor}: ${highlightColorNamesHU[highlightColors[settings.highlightColorIndex]]}`,
          action: () => cycleHighlightColor(1), onPrev: () => cycleHighlightColor(-1) },
        { icon: '◀', text: STR.back, action: () => showList() }
    ];
}

function controlItems() {
    return [
        { icon: '▶', text: STR.resume, action: resumeVideo },
        { icon: '↺', text: STR.restart, action: restartVideo },
        { icon: '⏭', text: STR.next, action: nextVideo },
        { icon: '☰', text: STR.backToList, action: () => showList() }
    ];
}

function currentItems() {
    if (state.mode === 'list') return listItems();
    if (state.mode === 'settings') return settingsItems();
    if (state.mode === 'player') return controlItems();
    return [];
}

function containerFor(mode) {
    return mode === 'player' ? el.controls : el.list;
}

// ---------------------------------------------------------------------
//  Rendering
// ---------------------------------------------------------------------
function renderRows(container, items, selectedIndex) {
    container.textContent = '';
    items.forEach((item, i) => {
        const row = document.createElement('div');
        row.className = 'row' + (item.thumb ? '' : ' compact') + (i === selectedIndex ? ' selected' : '');
        row.setAttribute('role', 'button');

        const lead = document.createElement('div');
        lead.className = 'lead';
        if (item.thumb) {
            const img = document.createElement('img');
            img.className = 'thumb';
            img.alt = '';
            img.onerror = () => {           // offline / thumbnail missing: show a play icon instead
                lead.textContent = '▶';
                lead.classList.add('lead-icon');
            };
            img.src = item.thumb;
            lead.appendChild(img);
        } else {
            lead.classList.add('lead-icon');
            lead.textContent = item.icon || '';
        }

        const label = document.createElement('div');
        label.className = 'label';
        label.textContent = itemText(item);     // textContent: video titles can never inject HTML

        row.appendChild(lead);
        row.appendChild(label);
        row.onclick = () => {
            state.idx[state.mode] = i;
            updateSelection();
            if (item.action) item.action();
        };
        container.appendChild(row);
    });
}

function renderList() {
    el.title.textContent = state.mode === 'settings' ? STR.settingsTitle : STR.listTitle;
    el.hint.textContent = STR.hint;
    if (state.mode === 'list' && videos.length === 0) {
        el.note.textContent = STR.empty;
        el.note.hidden = false;
    } else {
        el.note.hidden = true;
    }
    const items = currentItems();
    state.idx[state.mode] = Math.min(state.idx[state.mode], items.length - 1);
    renderRows(el.list, items, state.idx[state.mode]);
    scrollSelectedIntoView();
}

function updateSelection() {
    const container = containerFor(state.mode);
    const rows = Array.from(container.children);
    rows.forEach((r, i) => r.classList.toggle('selected', i === state.idx[state.mode]));
    scrollSelectedIntoView();
}

function scrollSelectedIntoView() {
    const container = containerFor(state.mode);
    const sel = container.children[state.idx[state.mode]];
    if (sel && sel.scrollIntoView) sel.scrollIntoView({ block: 'center', behavior: 'smooth' });
}

function showView(name) {
    el.listView.hidden = name !== 'list';
    el.playerView.hidden = name !== 'player';
}

function showMessage(text, ms = 6000) {
    el.message.textContent = text;
    el.message.hidden = false;
    clearTimeout(messageTimer);
    messageTimer = setTimeout(() => { el.message.hidden = true; }, ms);
}

// ---------------------------------------------------------------------
//  Screens
// ---------------------------------------------------------------------
function showList(opts = {}) {
    leavePlayer();
    state.mode = 'list';
    showView('list');
    renderList();
    startAutoScan();
    const items = currentItems();
    const cur = items[state.idx.list] || items[0];
    const prefix = opts.prefix || (videos.length ? STR.listSpoken : STR.empty);
    speak(joinSpeech(prefix, itemText(cur)));       // ONE speak() call — a second one would cut this off
}

function showSettings() {
    state.mode = 'settings';
    state.idx.settings = 0;
    showView('list');
    renderList();
    startAutoScan();
    speak(joinSpeech(STR.settingsSpoken, itemText(currentItems()[0])));
}

// Re-draw after a setting changed, keep the cursor where it is, and say the new label.
function refreshCurrent() {
    renderList();
    const item = currentItems()[state.idx[state.mode]];
    if (item) speak(itemText(item));
}

function exitApp() {
    speak(STR.exiting);
    setTimeout(() => {
        if (window.parent && window.parent !== window) {
            window.parent.postMessage({ action: 'focusBackButton' }, '*');
        } else {
            window.location.href = '../../../index.html';
        }
    }, 500);
}

// ---------------------------------------------------------------------
//  Settings actions
// ---------------------------------------------------------------------
function toggleTTS() {
    if (window.NarbeVoiceManager) {
        window.NarbeVoiceManager.toggleTTS();
        settings.tts = !!window.NarbeVoiceManager.getSettings().ttsEnabled;
    } else {
        settings.tts = !settings.tts;
    }
    saveSettings();
    refreshCurrent();
}

function toggleAutoScan() {
    if (window.NarbeScanManager) {
        window.NarbeScanManager.setAutoScan(!window.NarbeScanManager.getSettings().autoScan);
    } else {
        settings.autoScan = !settings.autoScan;
    }
    saveSettings();
    startAutoScan();
    refreshCurrent();
}

function cycleScanSpeed() {
    if (window.NarbeScanManager) {
        window.NarbeScanManager.cycleScanSpeed();
    } else {
        const speeds = [1000, 2000, 3000, 4000];
        settings.scanInterval = speeds[(speeds.indexOf(settings.scanInterval) + 1) % speeds.length];
    }
    saveSettings();
    startAutoScan();
    refreshCurrent();
}

function toggleHighlightStyle() {
    settings.highlightStyle = settings.highlightStyle === 'outline' ? 'full' : 'outline';
    saveSettings();
    applyHighlight();
    refreshCurrent();
}

function cycleHighlightColor(dir) {
    const n = highlightColors.length;
    settings.highlightColorIndex = (settings.highlightColorIndex + dir + n) % n;
    saveSettings();
    applyHighlight();
    refreshCurrent();
}

// ---------------------------------------------------------------------
//  YouTube player
// ---------------------------------------------------------------------
function loadYouTubeAPI() {
    if (window.YT && window.YT.Player) return Promise.resolve();
    if (ytApiPromise) return ytApiPromise;
    ytApiPromise = new Promise((resolve, reject) => {
        const previous = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = () => {
            if (typeof previous === 'function') previous();
            resolve();
        };
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        tag.onerror = () => { ytApiPromise = null; reject(new Error('YouTube API blocked or offline')); };
        document.head.appendChild(tag);
        setTimeout(() => {
            if (!(window.YT && window.YT.Player)) { ytApiPromise = null; reject(new Error('YouTube API timeout')); }
        }, 10000);
    });
    return ytApiPromise;
}

function ensurePlayer() {
    if (playerPromise) return playerPromise;
    playerPromise = loadYouTubeAPI().then(() => new Promise(resolve => {
        const vars = {
            autoplay: 1, controls: 0, disablekb: 1, fs: 0, rel: 0,
            modestbranding: 1, playsinline: 1, iv_load_policy: 3, hl: 'hu'
        };
        if (/^https?:$/.test(location.protocol)) vars.origin = location.origin;
        ytPlayer = new YT.Player('yt-player', {
            width: '100%',
            height: '100%',
            host: 'https://www.youtube-nocookie.com',
            playerVars: vars,
            events: {
                onReady: () => { state.playerReady = true; resolve(ytPlayer); },
                onStateChange: onPlayerStateChange,
                onError: e => handleVideoError(e.data)
            }
        });
    }));
    playerPromise.catch(() => { playerPromise = null; });   // allow a retry next time
    return playerPromise;
}

function onPlayerStateChange(e) {
    if (state.mode !== 'player') return;
    const S = window.YT.PlayerState;
    if (e.data === S.PLAYING || e.data === S.BUFFERING) {
        state.playingSeen = true;
        el.status.textContent = '';
        clearTimeout(watchdogTimer);
    }
    // If a key was pressed while the video was still starting, keep it paused.
    if (e.data === S.PLAYING && state.controlsVisible) {
        try { ytPlayer.pauseVideo(); } catch (err) { /* ignore */ }
    }
    if (e.data === S.ENDED) handleEnded();
}

function playVideo(i) {
    const v = videos[i];
    if (!v) return;
    stopAutoScan();
    clearTimeout(watchdogTimer);
    hideControls();

    state.mode = 'player';
    state.currentVideo = i;
    state.idx.list = i;                  // so "back to list" lands on this video
    state.playingSeen = false;
    showView('player');
    el.status.textContent = STR.loading;
    speak(STR.nowPlaying(v.title));

    ensurePlayer().then(p => {
        if (state.mode !== 'player' || state.currentVideo !== i) return;   // user already moved on
        p.loadVideoById(v.id);
        window.focus();
    }).catch(err => {
        console.warn(err);
        handleVideoError('api');
    });

    // If nothing starts playing, say so on screen and out loud instead of staying silent.
    watchdogTimer = setTimeout(() => {
        if (state.mode !== 'player' || state.playingSeen) return;
        if (state.playerReady) {
            el.status.textContent = '';
            showControls(STR.notStarted);       // user can press "Lejátszás" (a real key press can start playback)
        } else {
            handleVideoError('timeout');
        }
    }, config.loadWatchdog);
}

function handleVideoError(code) {
    if (state.mode !== 'player') return;
    console.warn('YouTube player problem:', code);
    const msg = (code === 'api' || code === 'timeout') ? STR.cannotLoad : STR.cannotPlay;
    showMessage(msg);
    showList({ prefix: msg });
}

function handleEnded() {
    if (state.mode !== 'player') return;
    state.idx.list = state.currentVideo;
    showList({ prefix: STR.ended });
}

function leavePlayer() {
    clearTimeout(watchdogTimer);
    hideControls();
    el.status.textContent = '';
    try { if (ytPlayer && state.playerReady) ytPlayer.stopVideo(); } catch (e) { /* ignore */ }
}

// ---- Player controls (the paused menu) ----
function showControls(prefix) {
    state.controlsVisible = true;
    state.idx.player = 0;
    try { if (ytPlayer && state.playerReady) ytPlayer.pauseVideo(); } catch (e) { /* ignore */ }
    const v = videos[state.currentVideo];
    el.controlsTitle.textContent = v ? v.title : '';
    el.controlsWrap.hidden = false;
    const items = controlItems();
    renderRows(el.controls, items, 0);
    startAutoScan();
    speak(joinSpeech(prefix || STR.paused, itemText(items[0])));
}

function hideControls() {
    state.controlsVisible = false;
    el.controlsWrap.hidden = true;
    stopAutoScan();
}

function resumeVideo() {
    hideControls();
    try { if (ytPlayer) ytPlayer.playVideo(); } catch (e) { /* ignore */ }
}

function restartVideo() {
    hideControls();
    try { if (ytPlayer) { ytPlayer.seekTo(0, true); ytPlayer.playVideo(); } } catch (e) { /* ignore */ }
}

function nextVideo() {
    if (!videos.length) return;
    playVideo((state.currentVideo + 1) % videos.length);
}

// ---------------------------------------------------------------------
//  Scanning
// ---------------------------------------------------------------------
function scan(dir) {
    // While a video is playing, the first key press just pauses it and opens the menu.
    if (state.mode === 'player' && !state.controlsVisible) {
        showControls();
        return;
    }
    const items = currentItems();
    if (!items.length) return;
    const key = state.mode;
    state.idx[key] = (state.idx[key] + dir + items.length) % items.length;
    updateSelection();
    speak(itemText(items[state.idx[key]]));
}

function selectItem() {
    if (state.mode === 'player' && !state.controlsVisible) {
        showControls();
        return;
    }
    const item = currentItems()[state.idx[state.mode]];
    if (item && item.action) item.action();
}

function startAutoScan() {
    stopAutoScan();
    if (!autoScanOn()) return;
    const ms = scanInterval();
    if (!(ms > 0)) return;
    state.timers.autoScan = setInterval(() => {
        if (state.input.spaceHeld || state.input.enterHeld) return;
        if (state.mode === 'player' && !state.controlsVisible) return;   // never auto-scan over a playing video
        scan(1);
    }, ms);
}

function stopAutoScan() {
    if (state.timers.autoScan) {
        clearInterval(state.timers.autoScan);
        state.timers.autoScan = null;
    }
}

function resetAutoScan() {
    stopAutoScan();
    startAutoScan();
}

// ---------------------------------------------------------------------
//  Input
// ---------------------------------------------------------------------
function startBackwardsScan() {
    scan(-1);
    state.timers.spaceRepeat = setInterval(() => scan(-1), config.repeatInterval);
}

function performBackwardsToggle() {
    if (state.mode !== 'list' && state.mode !== 'settings') return;
    const item = currentItems()[state.idx[state.mode]];
    if (item && item.onPrev) item.onPrev();
}

function startBackwardsToggle() {
    performBackwardsToggle();
    state.timers.enterRepeat = setInterval(performBackwardsToggle, config.repeatInterval);
}

function clearInputTimers() {
    clearTimeout(state.timers.space);
    clearTimeout(state.timers.enter);
    clearInterval(state.timers.spaceRepeat);
    clearInterval(state.timers.enterRepeat);
    state.input.spaceHeld = false;
    state.input.enterHeld = false;
}

function setupInput() {
    document.addEventListener('keydown', e => {
        if (e.code === 'Space') {
            e.preventDefault();                       // also on key-repeat, so the page never scrolls by itself
            if (!state.input.spaceHeld) {
                state.input.spaceHeld = true;
                state.input.spaceTime = Date.now();
                resetAutoScan();
                state.timers.space = setTimeout(startBackwardsScan, config.longPress);
            }
        } else if (e.code === 'Enter') {
            e.preventDefault();
            if (!state.input.enterHeld) {
                state.input.enterHeld = true;
                state.input.enterTime = Date.now();
                resetAutoScan();
                if (state.mode === 'list' || state.mode === 'settings') {
                    state.timers.enter = setTimeout(startBackwardsToggle, config.longPress);
                }
            }
        }
    });

    document.addEventListener('keyup', e => {
        if (e.code === 'Space') {
            if (!state.input.spaceHeld) return;
            clearTimeout(state.timers.space);
            clearInterval(state.timers.spaceRepeat);
            const duration = Date.now() - state.input.spaceTime;
            state.input.spaceHeld = false;
            if (duration < config.longPress) scan(1);
            resetAutoScan();
        } else if (e.code === 'Enter') {
            if (!state.input.enterHeld) return;
            clearTimeout(state.timers.enter);
            clearInterval(state.timers.enterRepeat);
            const duration = Date.now() - state.input.enterTime;
            state.input.enterHeld = false;
            if (duration < config.longPress) selectItem();
            resetAutoScan();
        }
    });

    // If the window loses focus (e.g. the YouTube frame grabbed it), drop held keys
    // and take the focus back so Space/Enter keep reaching this page.
    window.addEventListener('blur', () => {
        clearInputTimers();
        setTimeout(() => {
            const a = document.activeElement;
            if (a && a.tagName === 'IFRAME') { a.blur(); window.focus(); }
        }, 0);
    });

    // Mouse: click the video to pause + open the menu, click the dark background to resume.
    el.overlay.addEventListener('click', () => {
        if (state.mode === 'player' && !state.controlsVisible) showControls();
    });
    el.controlsWrap.addEventListener('click', e => {
        if (e.target === el.controlsWrap && state.controlsVisible) resumeVideo();
    });
}

function bindScanManager() {
    if (!window.NarbeScanManager) return;
    window.NarbeScanManager.subscribe(() => {
        startAutoScan();
        if (state.mode === 'settings') renderList();   // keep the speed/auto-scan labels current
    });
}

// ---------------------------------------------------------------------
//  Start
// ---------------------------------------------------------------------
async function init() {
    cacheElements();
    loadSettings();
    applyHighlight();
    setupInput();
    bindScanManager();
    await loadVideos();
    showList();
}

window.onload = init;
