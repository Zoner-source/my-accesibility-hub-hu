/**
 * Phrase board - vertical list mode.
 *
 * A layout switch in Settings. When it is on, the categories and the phrases
 * of a category are one vertical list on the left half of the screen, scanned
 * item by item from top to bottom, and the highlighted item is shown magnified
 * on the right half: a large picture and large text, for players who need a
 * big, clear view (for example with cerebral palsy or low vision). The main
 * menu and the settings keep the grid.
 *
 * Both lists end with "Add phrase": a form for a helper with a mouse and a
 * keyboard (text, spoken text, image link, category). Like the board editor
 * it sits behind a spoken warning, because it cannot be used with a switch.
 * New phrases are written into the personal board saved in this browser
 * (localStorage 'narbe_phrase_builder'), the same place "Load board" saves to.
 *
 * Loaded after the board's own script; it uses that script's state, el,
 * clearGrid, updateScannable, speak and the other board functions. The same
 * file serves the Romanian and the Hungarian Hub: text is picked from <html lang>.
 */
window.VerticalMode = (function () {
    'use strict';

    const TEXT = {
        ro: {
            layout: 'Aspect',
            grid: 'Grilă',
            vertical: 'Listă verticală',
            mainMenu: 'Meniul principal',
            back: 'Înapoi',
            add: 'Adaugă frază',
            chooseCategory: 'Alege o categorie',
            warningTitle: '⚠️ Atenție',
            warning: 'Adăugarea unei fraze deschide un formular care are nevoie de mouse și tastatură. Formularul nu poate fi completat cu butonul de scanare.',
            formTitle: 'Adaugă o frază',
            display: 'Text afișat',
            speakLabel: 'Text rostit (opțional, altfel se rostește textul afișat)',
            image: 'Link imagine (opțional)',
            imageHint: 'Lipește adresa unei imagini, de exemplu https://…/poza.png',
            category: 'Categorie',
            newCategory: 'Categorie nouă…',
            newCategoryName: 'Numele categoriei noi',
            cancel: 'Anulează',
            save: 'Salvează',
            needText: 'Scrie textul frazei.',
            needCategory: 'Scrie numele categoriei noi.',
            saved: 'Fraza a fost salvată.',
            savedElsewhere: function (b) { return 'Fraza a fost salvată în tabla „' + b + '”.'; },
            myBoard: 'Cuvintele mele'
        },
        hu: {
            layout: 'Elrendezés',
            grid: 'Rács',
            vertical: 'Függőleges lista',
            mainMenu: 'Főmenü',
            back: 'Vissza',
            add: 'Kifejezés hozzáadása',
            chooseCategory: 'Válassz kategóriát',
            warningTitle: '⚠️ Figyelmeztetés',
            warning: 'A kifejezés hozzáadása egy űrlapot nyit meg, amelyhez egér és billentyűzet kell. Az űrlapot nem lehet a kapcsolóval kitölteni.',
            formTitle: 'Kifejezés hozzáadása',
            display: 'Megjelenő szöveg',
            speakLabel: 'Kimondott szöveg (nem kötelező, különben a megjelenő szöveget mondja)',
            image: 'Kép hivatkozása (nem kötelező)',
            imageHint: 'Illessz be egy kép címét, például https://…/kep.png',
            category: 'Kategória',
            newCategory: 'Új kategória…',
            newCategoryName: 'Az új kategória neve',
            cancel: 'Mégse',
            save: 'Mentés',
            needText: 'Írd be a kifejezés szövegét.',
            needCategory: 'Írd be az új kategória nevét.',
            saved: 'A kifejezés elmentve.',
            savedElsewhere: function (b) { return 'A kifejezés elmentve a(z) „' + b + '” táblába.'; },
            myBoard: 'Szavaim'
        }
    };
    const L = TEXT[(document.documentElement.lang || 'hu').slice(0, 2)] || TEXT.hu;

    const VISIBLE_ROWS = 6;   // list rows that fit on screen; the rest scroll
    const NEW_CATEGORY = '__new__';
    const HEADER = 'Category,CategoryOrder,Display,Speak,Image,CategoryColor,TileColor,TileOrder,CategoryImage,BoardName,BoardColor,BoardImage';

    let magnifier = null, warningEl = null, formEl = null;

    function isOn() { return state.layout === 'vertical'; }
    function active() { return document.body.classList.contains('vertical-layout'); }

    // --- layout -------------------------------------------------------------------

    function init() {
        // The magnifier sits beside the list in the board area; hidden unless the
        // vertical layout is showing.
        magnifier = document.createElement('aside');
        magnifier.className = 'vm-magnifier';
        magnifier.setAttribute('aria-hidden', 'true');
        el.mainGrid.parentNode.insertBefore(magnifier, el.mainGrid.nextSibling);
        window.addEventListener('resize', sizeRows);
    }

    function enter() {
        document.body.classList.add('vertical-layout');
        el.mainGrid.classList.add('vm-list');
    }

    /** Called from clearGrid: every other screen uses the grid. */
    function leave() {
        document.body.classList.remove('vertical-layout');
        el.mainGrid.classList.remove('vm-list');
    }

    function sizeRows() {
        if (!active()) return;
        const cs = getComputedStyle(el.mainGrid);
        const gap = parseFloat(cs.rowGap) || 0;
        let free = el.mainGrid.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
        if (state.sentenceMode && el.sentenceRow.classList.contains('active')) free -= el.sentenceRow.offsetHeight + gap;
        el.mainGrid.style.setProperty('--vm-row', Math.max(64, Math.floor((free - gap * (VISIBLE_ROWS - 1)) / VISIBLE_ROWS)) + 'px');
    }

    function toggle() {
        state.layout = isOn() ? 'grid' : 'vertical';
        saveSettings();
        return settingLabel();
    }

    function settingLabel() { return L.layout + ': ' + (isOn() ? L.vertical : L.grid); }

    // --- the magnifier ------------------------------------------------------------

    function magnify(text, image, icon) {
        if (!magnifier) return;
        magnifier.innerHTML = '';
        if (image) {
            const img = document.createElement('img');
            img.src = image;
            img.alt = '';
            magnifier.appendChild(img);
        } else if (icon) {
            const span = document.createElement('div');
            span.className = 'vm-mag-icon';
            span.textContent = icon;
            magnifier.appendChild(span);
        }
        const t = document.createElement('div');
        t.className = 'vm-mag-text';
        t.textContent = text || '';
        magnifier.appendChild(t);
    }

    /** Called from highlightScanIndex with the highlighted element. */
    function onHighlight(element) {
        if (!active() || !element) return;
        if (element.dataset.magText !== undefined) {
            magnify(element.dataset.magText, element.dataset.magImg, element.dataset.magIcon);
        } else {
            magnify(cleanTextForTTS(element.textContent));   // sentence bar buttons
        }
    }

    // --- the lists ----------------------------------------------------------------

    function item(o, onClick) {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'grid-button vm-item' + (o.back ? ' back-btn' : '');
        if (o.image) {
            const img = document.createElement('img');
            img.src = o.image;
            img.alt = '';
            b.appendChild(img);
        } else if (o.icon) {
            const s = document.createElement('span');
            s.className = 'vm-icon';
            s.textContent = o.icon;
            b.appendChild(s);
        }
        const t = document.createElement('span');
        t.className = 'vm-text';
        t.textContent = o.text;
        b.appendChild(t);
        b.dataset.magText = o.text;
        if (o.image) b.dataset.magImg = o.image;
        else if (o.icon) b.dataset.magIcon = o.icon;
        if (o.color) b.style.background = rgbaFromHex(o.color, 0.2);
        b.addEventListener('click', onClick);
        el.mainGrid.appendChild(b);
        return b;
    }

    function finish(placeholder) {
        sizeRows();
        magnify(placeholder);
        updateScannable();
    }

    function renderCategories() {
        clearGrid();
        state.currentMenu = 'categories';
        enter();
        item({ text: L.mainMenu, icon: '🏠', back: true }, () => { state.csvLoaded = false; navigateTo('main'); });
        state.categories.forEach(cat => {
            item({ text: cat.name, image: cat.image, color: cat.color }, () => openCategory(cat.name));
        });
        item({ text: L.add, icon: '➕' }, () => openAdd(null));
        finish(state.currentBoardTitle || L.chooseCategory);
    }

    function renderPhrases() {
        const cat = state.byCat.get(state.currentCategory);
        if (!cat) return;
        clearGrid();
        state.currentMenu = 'category';
        enter();
        item({ text: L.back, icon: '←', back: true }, () => navigateBack());
        cat.items.forEach(it => {
            const b = item({ text: it.display || it.speak, image: it.image, color: it.tileColor || cat.color }, () => onTileClick(it));
            // Marks it as a phrase: onTileClick speaks it, so selection is not spoken twice.
            b.dataset.speakText = it.speak || it.display || '';
        });
        item({ text: L.add, icon: '➕' }, () => openAdd(state.currentCategory));
        finish(state.currentCategory);
    }

    // --- adding a phrase ----------------------------------------------------------

    /** The warning first: the form needs a mouse and a keyboard. */
    function openAdd(category) {
        if (!warningEl) {
            warningEl = document.createElement('div');
            warningEl.className = 'warning-modal';
            warningEl.setAttribute('role', 'dialog');
            warningEl.setAttribute('aria-modal', 'true');
            warningEl.innerHTML = '<div class="warning-content"><div class="warning-title"></div>' +
                '<div class="warning-message"></div><div class="warning-buttons">' +
                '<button class="warning-button back"></button><button class="warning-button proceed"></button></div></div>';
            warningEl.querySelector('.warning-title').textContent = L.warningTitle;
            warningEl.querySelector('.warning-message').textContent = L.warning;
            // Same labels as the board's other warnings: selectModalButton matches on them.
            warningEl.querySelector('.back').textContent = el.createBoardBack.textContent;
            warningEl.querySelector('.proceed').textContent = el.createBoardProceed.textContent;
            warningEl.querySelector('.back').addEventListener('click', hideWarningModal);
            warningEl.querySelector('.proceed').addEventListener('click', () => {
                const go = state.pendingAction;
                hideWarningModal();
                if (go) go();
            });
            document.body.appendChild(warningEl);
        }
        state.modalActive = true;
        state.modalScanIndex = -1;
        if (state.scanning || state.autoScan) { stopScanning(); state.autoScan = false; }
        warningEl.classList.add('active');
        // The way out comes first in the scan order.
        state.modalButtons = [warningEl.querySelector('.back'), warningEl.querySelector('.proceed')];
        state.pendingAction = () => openForm(category);
        if (window.NarbeVoiceManager.getSettings().ttsEnabled) speak(L.warningTitle.replace('⚠️', '').trim() + '. ' + L.warning);
    }

    function field(form, label, input) {
        const wrap = document.createElement('label');
        wrap.className = 'vm-field';
        const span = document.createElement('span');
        span.textContent = label;
        wrap.append(span, input);
        form.appendChild(wrap);
        return wrap;
    }

    function openForm(category) {
        if (formEl) formEl.remove();
        stopScanning();
        formEl = document.createElement('div');
        formEl.className = 'vm-form-overlay';
        const form = document.createElement('form');
        form.className = 'vm-form';
        const title = document.createElement('h2');
        title.textContent = L.formTitle;
        form.appendChild(title);

        const display = document.createElement('input');
        display.type = 'text';
        display.required = true;
        field(form, L.display, display);

        const spoken = document.createElement('input');
        spoken.type = 'text';
        field(form, L.speakLabel, spoken);

        const image = document.createElement('input');
        image.type = 'url';
        image.placeholder = L.imageHint;
        field(form, L.image, image);
        const preview = document.createElement('img');
        preview.className = 'vm-preview';
        preview.alt = '';
        preview.hidden = true;
        form.appendChild(preview);
        image.addEventListener('input', () => {
            const url = image.value.trim();
            preview.hidden = !/^https?:\/\//i.test(url);
            if (!preview.hidden) preview.src = url;
        });
        preview.addEventListener('error', () => { preview.hidden = true; });

        const select = document.createElement('select');
        state.categories.forEach(c => {
            const o = document.createElement('option');
            o.value = c.name;
            o.textContent = c.name;
            select.appendChild(o);
        });
        const n = document.createElement('option');
        n.value = NEW_CATEGORY;
        n.textContent = L.newCategory;
        select.appendChild(n);
        select.value = category && state.byCat.has(category) ? category : (state.categories.length ? state.categories[0].name : NEW_CATEGORY);
        field(form, L.category, select);

        const newName = document.createElement('input');
        newName.type = 'text';
        const newWrap = field(form, L.newCategoryName, newName);
        const syncNew = () => { newWrap.hidden = select.value !== NEW_CATEGORY; };
        select.addEventListener('change', syncNew);
        syncNew();

        const error = document.createElement('p');
        error.className = 'vm-error';
        error.setAttribute('role', 'alert');
        form.appendChild(error);

        const buttons = document.createElement('div');
        buttons.className = 'vm-form-buttons';
        const cancel = document.createElement('button');
        cancel.type = 'button';
        cancel.textContent = L.cancel;
        const save = document.createElement('button');
        save.type = 'submit';
        save.className = 'vm-save';
        save.textContent = L.save;
        buttons.append(cancel, save);
        form.appendChild(buttons);

        cancel.addEventListener('click', closeForm);
        form.addEventListener('submit', e => {
            e.preventDefault();
            const text = display.value.trim();
            const cat = select.value === NEW_CATEGORY ? newName.value.trim() : select.value;
            if (!text) { error.textContent = L.needText; display.focus(); return; }
            if (!cat) { error.textContent = L.needCategory; newName.focus(); return; }
            const result = savePhrase({ display: text, speak: spoken.value.trim(), image: image.value.trim(), category: cat });
            closeForm();
            speak(result.here ? L.saved : L.savedElsewhere(result.board));
            if (result.here) {
                state.currentCategory = cat;
                renderPhrases();
            }
        });

        // Typing belongs to the form: keep Space and Enter away from the board's scanner.
        ['keydown', 'keyup'].forEach(type => formEl.addEventListener(type, e => {
            e.stopPropagation();
            if (type === 'keydown' && e.key === 'Escape') closeForm();
        }));

        formEl.appendChild(form);
        document.body.appendChild(formEl);
        display.focus();
    }

    function closeForm() {
        if (formEl) { formEl.remove(); formEl = null; }
        document.body.focus();
        if (typeof syncScanSettings === 'function') syncScanSettings();
    }

    function csvField(v) {
        const s = String(v == null ? '' : v);
        return /[",\r\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
    }

    /**
     * Append one phrase to the personal board, creating it if there is none.
     * Returns whether the board on screen is that board (and was rebuilt).
     */
    function savePhrase(p) {
        const local = getLocalSavedBoard();
        const board = local ? local.name : L.myBoard;
        const lines = (local ? local.csv : HEADER).split(/\r?\n/).filter(Boolean);
        const names = parseCSVLine(lines[0]).map(h => h.trim());
        const lower = names.map(h => h.toLowerCase());
        // Older boards may lack a column; add it so nothing is lost.
        HEADER.split(',').forEach(h => { if (lower.indexOf(h.toLowerCase()) < 0) { names.push(h); lower.push(h.toLowerCase()); } });

        const rows = local ? parseCSV(local.csv) : [];
        const same = rows.filter(r => r.category === p.category);
        const values = {
            category: p.category,
            categoryorder: same.length ? same[0].categoryOrder : rows.reduce((m, r) => Math.max(m, r.categoryOrder === 9999 ? 0 : r.categoryOrder), 0) + 1,
            display: p.display,
            speak: p.speak || p.display,
            image: p.image,
            categorycolor: same.length ? same[0].categoryColor : '#5bb0ff',
            tilecolor: '',
            tileorder: same.reduce((m, r) => Math.max(m, r.tileOrder === 9999 ? 0 : r.tileOrder), 0) + 1,
            categoryimage: same.length ? same[0].categoryImage : p.image,
            boardname: board,
            boardcolor: rows.length ? (rows[0].boardColor || '') : '',
            boardimage: rows.length ? (rows[0].boardImage || '') : ''
        };
        const line = lower.map(h => csvField(values[h])).join(',');
        const csv = [names.map(csvField).join(','), ...lines.slice(1), line].join('\n');
        localStorage.setItem('narbe_phrase_builder', JSON.stringify({ boardName: board, csv: csv }));

        const here = !local || state.currentBoardTitle === board;
        if (here) {
            state.currentBoardTitle = board;
            buildIndex(parseCSV(csv));
        }
        return { here: here, board: board };
    }

    return {
        init: init, isOn: isOn, active: active, leave: leave, toggle: toggle, settingLabel: settingLabel,
        renderCategories: renderCategories, renderPhrases: renderPhrases, onHighlight: onHighlight, sizeRows: sizeRows
    };
})();
