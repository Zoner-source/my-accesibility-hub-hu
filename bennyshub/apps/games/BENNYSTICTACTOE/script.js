// --- Configuration & Constants ---
const config = {
    longPress: 3000,
    repeatInterval: 2000,
    enterLongPress: 6000
};

const themes = [
    { name: 'Alapértelmezett', bg: 'linear-gradient(135deg, #ff4b1f, #ff9068)' },
    { name: 'Óceán', bg: 'linear-gradient(135deg, #2193b0, #6dd5ed)' },
    { name: 'Éjfél', bg: 'linear-gradient(135deg, #232526, #414345)' },
    { name: 'Erdő', bg: 'linear-gradient(135deg, #134e5e, #71b280)' },
    { name: 'Naplemente', bg: 'linear-gradient(135deg, #f12711, #f5af19)' },
    { name: 'Levendula', bg: 'linear-gradient(135deg, #834d9b, #d04ed6)' },
    { name: 'Menta', bg: 'linear-gradient(135deg, #00b09b, #96c93d)' },
    { name: 'Sötétkék', bg: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)' }
];

const basicColors = [
    'Red', 'Orange', 'Yellow', 'Lime', 'Green', 'Teal', 'Cyan', 'Blue', 'Purple', 'Magenta', 'Pink', 'White', 'Gray', 'Black'
];
// Hungarian display names. basicColors itself is fed directly into
// cell.style.color, so the array must stay in English — only the
// settings-menu label is translated, via this lookup.
const basicColorNamesHU = {
    'Red': 'Piros', 'Orange': 'Narancs', 'Yellow': 'Sárga', 'Lime': 'Lime zöld', 'Green': 'Zöld',
    'Teal': 'Pávakék', 'Cyan': 'Ciánkék', 'Blue': 'Kék', 'Purple': 'Lila', 'Magenta': 'Bíbor',
    'Pink': 'Rózsaszín', 'White': 'Fehér', 'Gray': 'Szürke', 'Black': 'Fekete'
};

const highlightColors = [
    'Theme Default', 'Yellow', 'White', 'Cyan', 'Lime', 'Magenta', 'Red', 'Orange', 'Pink', 'Gold', 'DeepSkyBlue', 'SpringGreen', 'Violet'
];
// Same rule: highlightColors feeds style.borderColor/backgroundColor
// directly (see getHighlightColor/updateHighlights), so it stays English —
// only the label text is translated.
const highlightColorNamesHU = {
    'Theme Default': 'Alapértelmezett (téma)', 'Yellow': 'Sárga', 'White': 'Fehér', 'Cyan': 'Ciánkék',
    'Lime': 'Lime zöld', 'Magenta': 'Bíbor', 'Red': 'Piros', 'Orange': 'Narancs',
    'Pink': 'Rózsaszín', 'Gold': 'Arany', 'DeepSkyBlue': 'Égkék', 'SpringGreen': 'Tavaszi zöld', 'Violet': 'Ibolya'
};

// Note: Scan speeds are now managed by NarbeScanManager

const gameStats = {
    single: { wins: 0, losses: 0, ties: 0 },
    two: { p1Wins: 0, p2Wins: 0, ties: 0 }
};

// --- State Management ---
const state = {
    mode: 'menu', // menu, game, pause, gameover
    menuState: 'main', 
    gameMode: 'single',
    menuIndex: 0,
    pauseIndex: 0,
    gameoverIndex: 0,
    pauseMenuState: 'main', // main, settings
    
    // Game State
    turn: 'X',
    board: Array(9).fill(""),
    scanIndex: 0,
    computerThinking: false,
    
    // Input State
    input: {
        spaceHeld: false,
        enterHeld: false,
        spaceTime: 0,
        enterTime: 0,
        pauseTriggered: false
    },
    timers: {
        space: null,
        enter: null,
        spaceRepeat: null,
        enterRepeat: null,
        autoScan: null
    }
};

const settings = {
    themeIndex: 0,
    tts: true,
    locationTTS: false,
    sound: true,
    voiceIndex: 0,
    p1Color: 'Red',
    p2Color: 'Blue',
    
    // New Settings
    scanSpeedIndex: 0, // 0 = Off
    highlightColorIndex: 0, // 0 = Theme Default (Yellow generally)
    highlightStyle: 'outline' // 'outline' or 'full'
};

// --- Initialization ---

function init() {
    loadSettings();
    applyTheme();
    setupInput();
    createDOMStructure();
    
    // Scan Manager Integration
    if (window.NarbeScanManager) {
        window.NarbeScanManager.subscribe(() => {
             // If currently active and auto scan is on, restart it to pick up new speed
             if (window.NarbeScanManager.getSettings().autoScan) {
                 startAutoScan();
             } else {
                 stopAutoScan();
             }
             // Refresh definition of current menu item if it displays speed/status
             if(state.mode === 'menu' && state.menuState === 'settings') refreshMenu();
             if(state.mode === 'pause' && state.pauseMenuState === 'settings') refreshPauseMenu();
        });
        
        // Initial check
        if (!window.NarbeScanManager.getSettings().autoScan) {
            stopAutoScan();
        }
    }

    showMainMenu();
}

function loadSettings() {
    try {
        const saved = localStorage.getItem('tictactoe_settings');
        if (saved) {
            Object.assign(settings, JSON.parse(saved));
        }
        const savedStats = localStorage.getItem('tictactoe_stats');
        if (savedStats) {
            Object.assign(gameStats, JSON.parse(savedStats));
        }
    } catch(e) {
        console.error("Failed to load settings", e);
    }
}

function saveSettings() {
    localStorage.setItem('tictactoe_settings', JSON.stringify(settings));
    localStorage.setItem('tictactoe_stats', JSON.stringify(gameStats));
}

function createDOMStructure() {
    const mainContent = document.getElementById('main-content');
    
    // Menu Container
    const menuContainer = document.createElement('div');
    menuContainer.id = 'menu-container';
    menuContainer.className = 'menu-container';
    mainContent.appendChild(menuContainer);
    
    // Game Container
    const gameContainer = document.createElement('div');
    gameContainer.id = 'game-container-inner';
    gameContainer.className = 'game-container';
    gameContainer.style.display = 'none';
    gameContainer.innerHTML = `
        <div class="game-board" id="game-board">
            ${Array(9).fill(0).map((_, i) => `<div class="cell" id="cell-${i}"></div>`).join('')}
        </div>
    `;
    mainContent.appendChild(gameContainer);
    
    // Initial Mouse Bindings for the Board cells (Click Only, Hover logic separate)
    for (let i = 0; i < 9; i++) {
        const cell = document.getElementById(`cell-${i}`);
        cell.onclick = () => {
            if (state.mode === 'game' && !state.computerThinking) {
                // Manually setting scan index so logic follows focus
                state.scanIndex = i;
                // Wait small tick to ensure state is consistent then act
                playerMove(i);
            }
        };
        // Removed onmouseenter to prevent auto-highlight/scan override
    }
    
    // Pause Overlay
    const pauseOverlay = document.createElement('div');
    pauseOverlay.id = 'pause-overlay';
    pauseOverlay.className = 'pause-overlay';
    pauseOverlay.style.display = 'none';
    document.body.appendChild(pauseOverlay);
    
    // Pause Button (Bottom Left)
    const pauseBtn = document.createElement('div');
    pauseBtn.id = 'pause-button';
    pauseBtn.innerHTML = '&#10074;&#10074;'; // Pause symbol
    pauseBtn.onclick = () => {
        if (state.mode === 'game') showPauseMenu();
    };
    pauseBtn.style.display = 'none'; // Only show in game
    document.body.appendChild(pauseBtn);
    
    // Header
    const header = document.getElementById('header');
    if (!header.querySelector('#status-display')) {
        const status = document.createElement('div');
        status.id = 'status-display';
        header.appendChild(status);
    }
}

function applyTheme() {
    document.body.style.background = themes[settings.themeIndex].bg;
    updateHighlights(); 
}

// --- Menu System ---

function getColorSwatch(color) {
    if (color.startsWith('Theme')) return '';
    return `<span style="display:inline-block; width:24px; height:24px; background-color:${color}; border:2px solid #fff; margin-left:10px; vertical-align:middle; border-radius: 50%; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></span>`;
}

const menus = {
    main: [
        { text: "Egy játékos", action: () => startGame('single') },
        { text: "Két játékos", action: () => startGame('two') },
        { text: "Beállítások", action: () => showSettingsMenu() },
        { text: "Kilépés", action: () => {
             speak("Vissza a főmenübe");
             setTimeout(() => {
                 if (window.parent && window.parent !== window) {
                     window.parent.postMessage({ action: 'focusBackButton' }, '*');
                 } else {
                     window.location.href = '../../../index.html';
                 }
             }, 500);
        } }
    ],
    settings: [
        { text: () => `Téma váltása: ${themes[settings.themeIndex].name}`, action: () => cycleTheme(1), onPrev: () => cycleTheme(-1) },
        { text: () => `Hangvisszajelzés: ${(window.NarbeVoiceManager ? window.NarbeVoiceManager.getSettings().ttsEnabled : settings.tts) ? 'Be' : 'Ki'}`, action: () => toggleTTS(), onPrev: () => toggleTTS() },
        { text: () => `Pozíció hang: ${settings.locationTTS ? 'Be' : 'Ki'}`, action: () => toggleLocationTTS(), onPrev: () => toggleLocationTTS() },
        { 
            text: () => {
                 if(window.NarbeScanManager) return `Automatikus pásztázás: ${window.NarbeScanManager.getSettings().autoScan ? 'Be' : 'Ki'}`;
                 return "Automatikus pásztázás: Ki";
            }, 
            action: () => toggleAutoScan(), 
            onPrev: () => toggleAutoScan() 
        },
        { 
            text: () => {
                 if(window.NarbeScanManager) return `Pásztázási sebesség: ${window.NarbeScanManager.getScanInterval()/1000} mp`;
                 return "Pásztázási sebesség: 2 mp";
            }, 
            action: () => cycleScanSpeed(1), 
            onPrev: () => cycleScanSpeed(-1) 
        },
        { text: () => `Kiemelés stílusa: ${settings.highlightStyle === 'outline' ? 'Körvonal' : 'Teljes mező'}`, action: () => toggleHighlightStyle(), onPrev: () => toggleHighlightStyle() },
        { text: () => `Kiemelés színe: ${highlightColorNamesHU[highlightColors[settings.highlightColorIndex]]}${getColorSwatch(highlightColors[settings.highlightColorIndex])}`, action: () => cycleHighlightColor(1), onPrev: () => cycleHighlightColor(-1) },
        { text: () => `1. játékos színe (X): ${basicColorNamesHU[settings.p1Color]}${getColorSwatch(settings.p1Color)}`, action: () => cycleP1Color(1), onPrev: () => cycleP1Color(-1) },
        { text: () => `2. játékos színe (O): ${basicColorNamesHU[settings.p2Color]}${getColorSwatch(settings.p2Color)}`, action: () => cycleP2Color(1), onPrev: () => cycleP2Color(-1) },
        { text: "Vissza", action: () => showMainMenu() }
    ],
    pause: [
        { text: "Játék folytatása", action: () => resumeGame() },
        { text: "Beállítások", action: () => showPauseSettings() },
        { text: "Vissza a menübe", action: () => showMainMenu() },
        { text: "Kilépés", action: () => {
             speak("Vissza a főmenübe");
             setTimeout(() => {
                 if (window.parent && window.parent !== window) {
                     window.parent.postMessage({ action: 'focusBackButton' }, '*');
                 } else {
                     window.location.href = '../../../index.html';
                 }
             }, 500);
        } }
    ],
    pauseSettings: [
        { text: () => `Téma váltása: ${themes[settings.themeIndex].name}`, action: () => cycleTheme(1, true), onPrev: () => cycleTheme(-1, true) },
        { text: () => `Hangvisszajelzés: ${(window.NarbeVoiceManager ? window.NarbeVoiceManager.getSettings().ttsEnabled : settings.tts) ? 'Be' : 'Ki'}`, action: () => toggleTTS(true), onPrev: () => toggleTTS(true) },
        { text: () => `Pozíció hang: ${settings.locationTTS ? 'Be' : 'Ki'}`, action: () => toggleLocationTTS(true), onPrev: () => toggleLocationTTS(true) },
        { 
            text: () => {
                 if(window.NarbeScanManager) return `Automatikus pásztázás: ${window.NarbeScanManager.getSettings().autoScan ? 'Be' : 'Ki'}`;
                 return "Automatikus pásztázás: Ki";
            }, 
            action: () => toggleAutoScan(true), 
            onPrev: () => toggleAutoScan(true) 
        },
        { 
            text: () => {
                 if(window.NarbeScanManager) return `Pásztázási sebesség: ${window.NarbeScanManager.getScanInterval()/1000} mp`;
                 return "Pásztázási sebesség: 2 mp";
            }, 
            action: () => cycleScanSpeed(1, true), 
            onPrev: () => cycleScanSpeed(-1, true) 
        },
        { text: () => `Kiemelés stílusa: ${settings.highlightStyle === 'outline' ? 'Körvonal' : 'Teljes mező'}`, action: () => toggleHighlightStyle(true), onPrev: () => toggleHighlightStyle(true) },
        { text: () => `Kiemelés színe: ${highlightColorNamesHU[highlightColors[settings.highlightColorIndex]]}${getColorSwatch(highlightColors[settings.highlightColorIndex])}`, action: () => cycleHighlightColor(1, true), onPrev: () => cycleHighlightColor(-1, true) },
        { text: () => `1. játékos színe (X): ${basicColorNamesHU[settings.p1Color]}${getColorSwatch(settings.p1Color)}`, action: () => cycleP1Color(1, true), onPrev: () => cycleP1Color(-1, true) },
        { text: () => `2. játékos színe (O): ${basicColorNamesHU[settings.p2Color]}${getColorSwatch(settings.p2Color)}`, action: () => cycleP2Color(1, true), onPrev: () => cycleP2Color(-1, true) },
        { text: "Vissza", action: () => showPauseMenu() }
    ],
    gameover: [
        { text: "Igen", action: () => restartGame() },
        { text: "Nem", action: () => showMainMenu() }
    ]
};

function renderMenu(containerId, items, titleText) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    
    if (titleText) {
        const title = document.createElement('div');
        title.className = state.mode === 'menu' ? 'menu-title' : 'pause-title';
        title.innerHTML = titleText; // Changed to innerHTML for line breaks
        container.appendChild(title);
    }

    let buttonContainer = container;
    // Use grid for settings
    const isSettings = (state.mode === 'pause' && state.pauseMenuState === 'settings') || (state.mode === 'menu' && state.menuState === 'settings');

    if (isSettings) {
        buttonContainer = document.createElement('div');
        buttonContainer.className = 'menu-grid';
        container.appendChild(buttonContainer);
    }
    
    items.forEach((item, index) => {
        const btn = document.createElement('button');
        btn.className = 'menu-button';
        btn.id = `btn-${containerId}-${index}`; // Unique ID per container
        btn.innerHTML = typeof item.text === 'function' ? item.text() : item.text;
        
        // Remove hover logic as requested
        btn.onclick = () => {
             // Sync state index just in case
             if (state.mode === 'menu') state.menuIndex = index;
             else if (state.mode === 'pause') state.pauseIndex = index;
             else if (state.mode === 'gameover') state.gameoverIndex = index;
             
             if (item.action) item.action();
        };

        if (isSettings && index === items.length - 1) {
            btn.classList.add('span-two-cols');
        }
        
        buttonContainer.appendChild(btn);
    });
    
    updateHighlights();
}

function showMainMenu() {
    state.mode = 'menu';
    state.menuState = 'main';
    state.menuIndex = 0;
    
    document.getElementById('menu-container').style.display = 'flex';
    document.getElementById('game-container-inner').style.display = 'none';
    document.getElementById('pause-overlay').style.display = 'none';

    const pBtn = document.getElementById('pause-button');
    if (pBtn) pBtn.style.display = 'none';

    document.getElementById('status-display').innerText = ""; // Clear status
    
    renderMenu('menu-container', menus.main, "BENNY'S<br>TIC TAC TOE");
    speak("Benny Tic Tac Toe játéka. Egy játékos");
    startAutoScan();
}

function showSettingsMenu() {
    state.menuState = 'settings';
    state.menuIndex = 0;
    renderMenu('menu-container', menus.settings, "BEÁLLÍTÁSOK");
    announceCurrentMenuItem();
    startAutoScan();
}

function showPauseMenu() {
    state.mode = 'pause';
    state.pauseMenuState = 'main'; // default pause menu
    state.pauseIndex = 0;
    
    const overlay = document.getElementById('pause-overlay');
    overlay.style.display = 'flex';
    overlay.innerHTML = ''; // Clear previous
    
    renderMenu('pause-overlay', menus.pause, "SZÜNET");
    updateHighlights();
    speak("Szünet. Játék folytatása");
    startAutoScan();
}

function showPauseSettings() {
    state.pauseMenuState = 'settings';
    state.pauseIndex = 0;
    renderMenu('pause-overlay', menus.pauseSettings, "BEÁLLÍTÁSOK");
    announceCurrentPauseItem();
    startAutoScan();
}

function showGameOver(result) {
    state.mode = 'gameover';
    state.gameoverIndex = 0;
    
    // Update Stats
    if (state.gameMode === 'single') {
        if (result === 'X') gameStats.single.wins++;
        else if (result === 'O') gameStats.single.losses++;
        else gameStats.single.ties++;
    } else {
        if (result === 'X') gameStats.two.p1Wins++;
        else if (result === 'O') gameStats.two.p2Wins++;
        else gameStats.two.ties++;
    }
    saveSettings();

    const overlay = document.getElementById('pause-overlay');
    overlay.style.display = 'flex';
    overlay.innerHTML = '';
    
    let message = result === 'Tie' ? "Döntetlen!" : `${result} nyer!`;
    
    renderMenu('pause-overlay', menus.gameover, message);

    const title = overlay.querySelector('.pause-title');
    
    // Stats Display
    const statsDiv = document.createElement('div');
    statsDiv.className = 'status-message';
    statsDiv.style.fontSize = '24px';
    if (state.gameMode === 'single') {
        statsDiv.innerText = `Győzelmek: ${gameStats.single.wins} | Vereségek: ${gameStats.single.losses} | Döntetlenek: ${gameStats.single.ties}`;
    } else {
         statsDiv.innerText = `1. játékos győzelmei: ${gameStats.two.p1Wins} | 2. játékos győzelmei: ${gameStats.two.p2Wins} | Döntetlenek: ${gameStats.two.ties}`;
    }
    title.insertAdjacentElement('afterend', statsDiv);

    const sub = document.createElement('div');
    sub.className = 'status-message';
    sub.innerText = "Újra játszol?";
    statsDiv.insertAdjacentElement('afterend', sub);
    
    updateHighlights();
    speak(message + ". Újra játszol? Igen");
    startAutoScan();
}

// --- Settings Logic ---

function cycleTheme(dir, isPause = false) {
    settings.themeIndex = (settings.themeIndex + dir + themes.length) % themes.length;
    applyTheme();
    saveSettings();
    isPause ? refreshPauseMenu() : refreshMenu();
}

function toggleTTS(isPause = false) {
    if (window.NarbeVoiceManager) {
        window.NarbeVoiceManager.toggleTTS();
        settings.tts = window.NarbeVoiceManager.getSettings().ttsEnabled;
    } else {
        settings.tts = !settings.tts;
    }
    saveSettings();
    isPause ? refreshPauseMenu() : refreshMenu();
}

function toggleLocationTTS(isPause = false) {
    settings.locationTTS = !settings.locationTTS;
    saveSettings();
    isPause ? refreshPauseMenu() : refreshMenu();
}

function cycleScanSpeed(dir, isPause = false) {
    if (window.NarbeScanManager) {
        window.NarbeScanManager.cycleScanSpeed();
        // UI refresh happens via observer callback or we force it here
        isPause ? refreshPauseMenu() : refreshMenu();
        startAutoScan(); // Restart with new speed
    }
}

function toggleHighlightStyle(isPause = false) {
    settings.highlightStyle = settings.highlightStyle === 'outline' ? 'full' : 'outline';
    saveSettings();
    updateHighlights();
    isPause ? refreshPauseMenu() : refreshMenu();
}

function cycleHighlightColor(dir, isPause = false) {
    settings.highlightColorIndex = (settings.highlightColorIndex + dir + highlightColors.length) % highlightColors.length;
    saveSettings();
    updateHighlights();
    isPause ? refreshPauseMenu() : refreshMenu();
}

function cycleP1Color(dir, isPause = false) {
    let newIdx = basicColors.indexOf(settings.p1Color);
    do {
        newIdx = (newIdx + dir + basicColors.length) % basicColors.length;
    } while (basicColors[newIdx] === settings.p2Color);
    settings.p1Color = basicColors[newIdx];
    saveSettings();
    isPause ? refreshPauseMenu() : refreshMenu();
    if(state.mode === 'game' || state.mode === 'pause') updateBoardUI();
}

function cycleP2Color(dir, isPause = false) {
    let newIdx = basicColors.indexOf(settings.p2Color);
    do {
        newIdx = (newIdx + dir + basicColors.length) % basicColors.length;
    } while (basicColors[newIdx] === settings.p1Color);
    settings.p2Color = basicColors[newIdx];
    saveSettings();
    isPause ? refreshPauseMenu() : refreshMenu();
    if(state.mode === 'game' || state.mode === 'pause') updateBoardUI();
}

function refreshMenu() {
    const items = menus[state.menuState];
    const btn = document.getElementById(`btn-menu-container-${state.menuIndex}`);
    if (btn) btn.innerHTML = typeof items[state.menuIndex].text === 'function' ? items[state.menuIndex].text() : items[state.menuIndex].text;
    announceCurrentMenuItem();
}

function refreshPauseMenu() {
    const items = state.pauseMenuState === 'settings' ? menus.pauseSettings : menus.pause;
    const btn = document.getElementById(`btn-pause-overlay-${state.pauseIndex}`);
    if (btn) btn.innerHTML = typeof items[state.pauseIndex].text === 'function' ? items[state.pauseIndex].text() : items[state.pauseIndex].text;
    announceCurrentPauseItem();
}

function announceCurrentMenuItem() {
    const items = menus[state.menuState];
    const item = items[state.menuIndex];
    if (item) {
        const datext = typeof item.text === 'function' ? item.text() : item.text;
        const cleanText = datext.replace(/<[^>]*>/g, ""); 
        speak(cleanText);
    }
}

function announceCurrentPauseItem() {
    const items = state.pauseMenuState === 'settings' ? menus.pauseSettings : menus.pause;
    const item = items[state.pauseIndex];
    if (item) {
        const datext = typeof item.text === 'function' ? item.text() : item.text;
        const cleanText = datext.replace(/<[^>]*>/g, "");
        speak(cleanText);
    }
}

// --- Auto Scan Logic ---

function startAutoScan() {
    // Clear existing
    if (state.timers.autoScan) {
        clearInterval(state.timers.autoScan);
        state.timers.autoScan = null;
    }

    // Only start if enabled in settings
    if (window.NarbeScanManager && !window.NarbeScanManager.getSettings().autoScan) return;

    const speedVal = (typeof NarbeScanManager !== 'undefined') ? NarbeScanManager.getScanInterval() : 2000;
    
    // Safety check just in case
    if (speedVal > 0) {
        state.timers.autoScan = setInterval(() => {
            // Check flags inside the interval to be responsive
            if (state.computerThinking || state.input.spaceHeld || state.input.enterHeld) return; 
            scanForward();
        }, speedVal);
    }
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

// --- Game Logic ---

function startGame(mode) {
    state.mode = 'game';
    state.gameMode = mode;
    state.board.fill("");
    state.scanIndex = 0;
    state.computerThinking = false;
    
    const pBtn = document.getElementById('pause-button');
    if (pBtn) pBtn.style.display = 'flex';
    
    // Determine Turn
    if (mode === 'single') {
        state.turn = Math.random() < 0.5 ? 'X' : 'O';
    } else {
        state.turn = 'X';
    }

    document.getElementById('menu-container').style.display = 'none';
    document.getElementById('game-container-inner').style.display = 'flex';
    document.getElementById('pause-overlay').style.display = 'none';

    updateBoardUI();
    updateHighlights();
    startAutoScan();
    
    let turnMsg = state.turn === 'X' ? "X kezd" : "O kezd";
    document.getElementById('status-display').innerText = `${turnMsg}`;
    
    if (state.gameMode === 'single' && state.turn === 'O') {
        speak(turnMsg + ". A számítógép következik.");
        setTimeout(computerMove, 1000);
    } else {
        speak(turnMsg + ". Te jössz.");
    }
}

function restartGame() {
    startGame(state.gameMode);
}

function resumeGame() {
    state.mode = 'game';
    document.getElementById('pause-overlay').style.display = 'none';
    updateHighlights();
    speak("A játék folytatódik");
    startAutoScan();
}

// Improved Computer Logic
function getBestMove(board, computerPlayer) {
    const opponent = computerPlayer === 'X' ? 'O' : 'X';
    
    // 1. Check for immediate win
    for (let i = 0; i < 9; i++) {
        if (board[i] === "") {
            board[i] = computerPlayer;
            if (checkWinResult(board) === computerPlayer) {
                board[i] = ""; // Reset
                return i;
            }
            board[i] = ""; // Reset
        }
    }
    
    // 2. Block immediate threat
    for (let i = 0; i < 9; i++) {
        if (board[i] === "") {
            board[i] = opponent;
            if (checkWinResult(board) === opponent) {
                board[i] = ""; // Reset
                return i;
            }
            board[i] = ""; // Reset
        }
    }
    
    // 3. Take center if available
    if (board[4] === "") return 4;
    
    // 4. Take corners if available
    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter(i => board[i] === "");
    if (availableCorners.length > 0) {
        return availableCorners[Math.floor(Math.random() * availableCorners.length)];
    }
    
    // 5. Random Available
    const emptyIndices = board.map((v, i) => v === "" ? i : null).filter(v => v !== null);
    if (emptyIndices.length > 0) {
        return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    }
    
    return null;
}

function checkWinResult(b) {
    const wins = [
        [0,1,2], [3,4,5], [6,7,8], // Rows
        [0,3,6], [1,4,7], [2,5,8], // Cols
        [0,4,8], [2,4,6]           // Diagonals
    ];
    for (let combo of wins) {
        const [x,y,z] = combo;
        if (b[x] && b[x] === b[y] && b[x] === b[z]) return b[x];
    }
    return null;
}

function computerMove() {
    if (state.mode !== 'game') return;

    state.computerThinking = true;
    
    // Wait a bit to simulate thinking delay
    setTimeout(() => {
        // Double check mode in case user exited during timeout
        if (state.mode !== 'game') return;

        const move = getBestMove(state.board, 'O');
        
        if (move !== null) {
             if (settings.locationTTS) {
                 speak(`A számítógép a ${move + 1}. mezőre tette: O`);
             } else {
                 // Minimal announcement
             }
             
             makeMove(move, 'O');
             
             const result = checkWin();
             if (result) {
                 showGameOver(result);
                 return;
             }
             
             state.turn = 'X';
             state.computerThinking = false;
             document.getElementById('status-display').innerText = `Következik: ${state.turn}`;
             
             setTimeout(() => speak("Te jössz"), settings.locationTTS ? 1500 : 500);
        }
    }, 1000);
}

function playerMove(index) {
    if (state.board[index] !== "") {
        speak("Foglalt");
        return;
    }
    
    if (state.gameMode === 'single' && state.turn !== 'X') return;

    // Reset autoscan timer on interaction
    resetAutoScan();

    if (settings.locationTTS) {
         speak(`${index + 1}. mezőre került: ${state.turn}`);
    } else {
         speak(`${state.turn}`);
    }

    makeMove(index, state.turn);
    
    const result = checkWin();
    if (result) {
        showGameOver(result);
        return;
    }
    
    state.turn = state.turn === 'X' ? 'O' : 'X';
    document.getElementById('status-display').innerText = `Következik: ${state.turn}`;
    
    if (state.gameMode === 'single' && state.turn === 'O') {
        state.computerThinking = true;
        computerMove(); // Handled with internal timeout
    } else {
        setTimeout(() => speak("Következő játékos"), 1000);
    }
}

function makeMove(index, player) {
    state.board[index] = player;
    updateBoardUI();
}

function checkWin() {
    if (checkWinResult(state.board)) return checkWinResult(state.board);
    if (state.board.every(cell => cell !== "")) return 'Tie';
    return null;
}

// --- UI Updates ---

function getHighlightColor() {
    const name = highlightColors[settings.highlightColorIndex];
    if (name === 'Theme Default') return '#ffcc00'; // Default fallback
    // We can rely on CSS color names for the rest
    return name;
}

function updateHighlights() {
    // Clear all highlights
    document.querySelectorAll('.highlight, .highlight-full').forEach(el => {
        el.classList.remove('highlight');
        el.classList.remove('highlight-full');
        el.style.borderColor = '';
        el.style.backgroundColor = '';
        if (el.classList.contains('cell') && !el.classList.contains('highlight')) {
             // Reset cell background if it was highlighted
             let baseBg = 'rgba(255, 255, 255, 0.9)'; // Default
             if (el.classList.contains('winning')) baseBg = '#2ecc71';
             el.style.background = baseBg;
        }
    });

    let target = null;

    if (state.mode === 'menu') {
        target = document.getElementById(`btn-menu-container-${state.menuIndex}`);
    } else if (state.mode === 'game') {
        target = document.getElementById(`cell-${state.scanIndex}`);
    } else if (state.mode === 'pause') {
        target = document.getElementById(`btn-pause-overlay-${state.pauseIndex}`);
    } else if (state.mode === 'gameover') {
        target = document.getElementById(`btn-pause-overlay-${state.gameoverIndex}`);
    }

    if (target) {
        const color = getHighlightColor();
        
        if (settings.highlightStyle === 'full') {
            target.classList.add('highlight-full'); // Helper class for transforms/z-index
            target.style.backgroundColor = color;
            target.style.borderColor = 'white'; // Contrast border
        } else {
            target.classList.add('highlight');
            target.style.borderColor = color;
            target.style.backgroundColor = ''; // Keep default
        }
    }
}

function updateBoardUI() {
    state.board.forEach((val, i) => {
        const cell = document.getElementById(`cell-${i}`);
        cell.innerText = val;
        cell.className = 'cell'; // reset classes
        cell.style.color = ''; 
        cell.style.background = 'rgba(255, 255, 255, 0.9)'; 
        
        if (val === 'X') {
            cell.classList.add('x-mark');
            cell.style.color = settings.p1Color;
        }
        if (val === 'O') {
            cell.classList.add('o-mark');
            cell.style.color = settings.p2Color;
        }
    });
    // Apply highlight on top
    updateHighlights();
}

function announceCell(index) {
    if (!settings.locationTTS) {
         const val = state.board[index];
         speak(val === "" ? "Üres" : val);
         return;
    }
    
    const val = state.board[index];
    if (val === "") speak(`${index + 1}. mező: üres`);
    else speak(`${index + 1}. mező: ${val}`);
}

// --- Input Handling ---

function setupInput() {
    document.addEventListener('keydown', e => {
        if (e.code === 'Space') {
            if (!state.input.spaceHeld) {
                state.input.spaceHeld = true;
                state.input.spaceTime = Date.now();
                resetAutoScan(); // Pause/Reset scan on user interaction
                e.preventDefault();
                state.timers.space = setTimeout(startBackwardsScan, config.longPress);
            }
        } else if (e.code === 'Enter') {
            if (!state.input.enterHeld) {
                state.input.enterHeld = true;
                state.input.enterTime = Date.now();
                resetAutoScan();
                
                if (state.mode === 'game') {
                    state.timers.enter = setTimeout(() => {
                         if(state.mode === 'game') {
                             showPauseMenu();
                             state.input.pauseTriggered = true;
                         }
                    }, config.enterLongPress);
                } else if (state.mode === 'menu' || state.mode === 'pause') {
                     state.timers.enter = setTimeout(startBackwardsToggle, config.longPress);
                }
            }
        }
    });

    document.addEventListener('keyup', e => {
        if (e.code === 'Space') {
            if (state.input.spaceHeld) {
                clearTimeout(state.timers.space);
                clearInterval(state.timers.spaceRepeat);
                
                const duration = Date.now() - state.input.spaceTime;
                state.input.spaceHeld = false;
                
                if (duration < config.longPress) {
                    scanForward();
                }
                // Restart auto scan after interaction gap
                resetAutoScan();
            }
        } else if (e.code === 'Enter') {
            if (state.input.enterHeld) {
                clearTimeout(state.timers.enter);
                clearInterval(state.timers.enterRepeat);
                state.input.enterHeld = false;
                
                if (state.input.pauseTriggered) {
                    state.input.pauseTriggered = false;
                } else {
                    const duration = Date.now() - state.input.enterTime;
                    if (duration < config.longPress) {
                        selectItem();
                    }
                }
                resetAutoScan();
            }
        }
    });
}

function scanForward() {
    if (state.mode === 'menu') {
        const items = menus[state.menuState];
        state.menuIndex = (state.menuIndex + 1) % items.length;
        announceCurrentMenuItem();
    } else if (state.mode === 'game') {
        let start = state.scanIndex;
        let next = start;
        let attempts = 0;
        do {
            next = (next + 1) % 9;
            attempts++;
        } while (state.board[next] !== "" && attempts < 9);
        
        state.scanIndex = next;
        announceCell(state.scanIndex);
    } else if (state.mode === 'pause') {
        const items = state.pauseMenuState === 'settings' ? menus.pauseSettings : menus.pause;
        state.pauseIndex = (state.pauseIndex + 1) % items.length;
        announceCurrentPauseItem();
    } else if (state.mode === 'gameover') {
        state.gameoverIndex = (state.gameoverIndex + 1) % menus.gameover.length;
        speak(menus.gameover[state.gameoverIndex].text);
    }
    updateHighlights();
}

function scanBackward() {
    if (state.mode === 'menu') {
        const items = menus[state.menuState];
        state.menuIndex = (state.menuIndex - 1 + items.length) % items.length;
        announceCurrentMenuItem();
    } else if (state.mode === 'game') {
        let start = state.scanIndex;
        let next = start;
        let attempts = 0;
        do {
            next = (next - 1 + 9) % 9;
            attempts++;
        } while (state.board[next] !== "" && attempts < 9);
        
        state.scanIndex = next;
        announceCell(state.scanIndex);
    } else if (state.mode === 'pause') {
        const items = state.pauseMenuState === 'settings' ? menus.pauseSettings : menus.pause;
        state.pauseIndex = (state.pauseIndex - 1 + items.length) % items.length;
        announceCurrentPauseItem();
    } else if (state.mode === 'gameover') {
        state.gameoverIndex = (state.gameoverIndex - 1 + menus.gameover.length) % menus.gameover.length;
        speak(menus.gameover[state.gameoverIndex].text);
    }
    updateHighlights();
}

function startBackwardsScan() {
    scanBackward();
    state.timers.spaceRepeat = setInterval(scanBackward, config.repeatInterval);
}

function selectItem() {
    if (state.mode === 'menu') {
        const item = menus[state.menuState][state.menuIndex];
        if (item.action) item.action();
    } else if (state.mode === 'game') {
        playerMove(state.scanIndex);
    } else if (state.mode === 'pause') {
        const items = state.pauseMenuState === 'settings' ? menus.pauseSettings : menus.pause;
        const item = items[state.pauseIndex];
        if (item.action) item.action();
    } else if (state.mode === 'gameover') {
        const item = menus.gameover[state.gameoverIndex];
        if (item.action) item.action();
    }
}

// Backwards Toggle (Long Press Enter on Menu Items)
function startBackwardsToggle() {
    performBackwardsToggle();
    state.timers.enterRepeat = setInterval(performBackwardsToggle, config.repeatInterval);
}

function performBackwardsToggle() {
    if (state.mode === 'menu') {
        const item = menus[state.menuState][state.menuIndex];
        if (item.onPrev) item.onPrev();
    } else if (state.mode === 'pause') {
        const items = state.pauseMenuState === 'settings' ? menus.pauseSettings : menus.pause;
        const item = items[state.pauseIndex];
        if (item.onPrev) item.onPrev();
    }
}

// --- TTS ---

// A voice may read a bare "X" as a Roman numeral, and
// a bare "O" as an ambiguous letter. The board marks must stay 'X' / 'O'
// internally and on screen (checkWinResult, gameStats and the cell display
// all compare against them), so the fix happens here, at the last moment
// before speech: X is spoken as "iksz" and O as "nulla".
// Only standalone uppercase X / O are replaced (\b word boundaries), so no
// other Romanian word is affected.
function toSpokenMarks(text) {
    return String(text).replace(/\bX\b/g, 'iksz').replace(/\bO\b/g, 'nulla');
}

function speak(text) {
    text = toSpokenMarks(text);
    if (window.NarbeVoiceManager) {
        window.NarbeVoiceManager.speak(text);
    } else if (settings.tts && 'speechSynthesis' in window) {
        speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'hu-HU';
        speechSynthesis.speak(u);
    }
}

function toggleAutoScan(isPause = false) {
    if (window.NarbeScanManager) {
        const current = window.NarbeScanManager.getSettings().autoScan;
        window.NarbeScanManager.setAutoScan(!current);
        isPause ? refreshPauseMenu() : refreshMenu();
        startAutoScan(); // Restart logic 
    }
}

window.onload = init;
