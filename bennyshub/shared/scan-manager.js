/**
 * Unified Scan Manager for Narbehouse Accessibility Hub
 * Provides centralized scanning settings and logic helpers across all apps
 */

window.NarbeScanManager = (function() {
  'use strict';

  // Storage key for scan settings
  const STORAGE_KEY = 'narbe-scan-settings';

  // Available scan speeds in milliseconds
  const SCAN_SPEEDS = [1000, 2000, 3000, 4000];

  // Available input sensitivity thresholds in milliseconds (anti-tremor)
  // Lower = more sensitive (less filtering), Higher = more filtering (for severe tremors)
  const INPUT_SENSITIVITIES = [50, 100, 200, 300];

  // Default settings
  const DEFAULT_SETTINGS = {
    autoScan: false,   // Default per agents.md (Off for Ben games)
    scanSpeedIndex: 1,  // Default to 2000ms (index 1)
    inputSensitivityIndex: 0,  // Default to 50ms (index 0) - most responsive
    // Scan direction. Off = a tap steps forward, holding Space steps backward.
    // On = mirrored: a tap steps backward, holding Space steps forward. For
    // switches that cannot hold, so backward scanning stays reachable.
    reverseScan: false
  };

  // Internal state
  let settings = { ...DEFAULT_SETTINGS };
  let observers = []; // For notifying games of setting changes

  /**
   * Load settings from localStorage
   */
  function loadSettings() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Validate and merge
        settings = { ...DEFAULT_SETTINGS, ...parsed };

        // Ensure scan speed index is valid
        if (settings.scanSpeedIndex < 0 || settings.scanSpeedIndex >= SCAN_SPEEDS.length) {
          settings.scanSpeedIndex = DEFAULT_SETTINGS.scanSpeedIndex;
        }

        // Ensure input sensitivity index is valid
        if (typeof settings.inputSensitivityIndex !== 'number' ||
            settings.inputSensitivityIndex < 0 ||
            settings.inputSensitivityIndex >= INPUT_SENSITIVITIES.length) {
          settings.inputSensitivityIndex = DEFAULT_SETTINGS.inputSensitivityIndex;
        }
      }
    } catch (error) {
      console.warn('NarbeScanManager: Error loading settings:', error);
      settings = { ...DEFAULT_SETTINGS };
    }
  }

  /**
   * Save settings to localStorage
   */
  function saveSettings() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
      notifyObservers();

      // Broadcast to any iframes (for parent window)
      broadcastToIframes();

      // If running inside an iframe (e.g. a game), notify the parent hub
      // directly via postMessage so the hub's scan manager stays in sync.
      broadcastToParent();
    } catch (error) {
      console.error('NarbeScanManager: Error saving settings:', error);
    }
  }

  /**
   * Notify the parent window (hub) of the current settings.
   * Called whenever settings are saved from within an iframe.
   */
  function broadcastToParent() {
    if (!window.parent || window.parent === window) return;
    try {
      window.parent.postMessage({
        type: 'narbe-scan-settings-changed',
        settings: getPublicState()
      }, '*');
    } catch (e) {
      // Ignore cross-origin errors
    }
  }

  /**
   * Broadcast current settings to all iframes
   */
  function broadcastToIframes() {
    const state = getPublicState();
    // Try to send to any iframe on the page
    try {
      const iframes = document.querySelectorAll('iframe');
      iframes.forEach(iframe => {
        try {
          if (iframe.contentWindow) {
            iframe.contentWindow.postMessage({
              type: 'narbe-scan-settings-changed',
              settings: state
            }, '*');
          }
        } catch (e) {
          // Ignore cross-origin errors
        }
      });
    } catch (e) {
      // Ignore errors
    }
  }

  /**
   * Notify all registered observers of changes
   */
  function notifyObservers() {
    observers.forEach(callback => {
      try {
        callback(getPublicState());
      } catch (e) {
        console.error('NarbeScanManager: Error in observer callback:', e);
      }
    });
  }

  /**
   * Get current state for public consumption
   */
  function getPublicState() {
    return {
      autoScan: settings.autoScan,
      scanSpeedIndex: settings.scanSpeedIndex,
      scanInterval: SCAN_SPEEDS[settings.scanSpeedIndex],
      inputSensitivityIndex: settings.inputSensitivityIndex,
      inputSensitivity: INPUT_SENSITIVITIES[settings.inputSensitivityIndex],
      reverseScan: !!settings.reverseScan,
      // Read by choice-scan.js. This Hub has no Parking/Brake/Wait settings
      // yet, so they stay at the shared defaults: parking off, Space brake on,
      // no waiting for speech.
      parking: 'off',
      loopsBeforeParking: 2,
      spaceBrake: true,
      waitForSpeech: false
    };
  }

  /**
   * Get current input sensitivity threshold (for anti-tremor logic)
   */
  function getInputSensitivity() {
    // Safety fallback: if inputSensitivityIndex is undefined or invalid, use default (200ms = index 2)
    const index = (typeof settings.inputSensitivityIndex === 'number' &&
                   settings.inputSensitivityIndex >= 0 &&
                   settings.inputSensitivityIndex < INPUT_SENSITIVITIES.length)
                  ? settings.inputSensitivityIndex
                  : 2;
    return INPUT_SENSITIVITIES[index];
  }

  // Initialize
  loadSettings();

  // Listen for storage events from other windows/iframes
  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY) {
      loadSettings();
      notifyObservers();
    }
  });

  // Cross-iframe message handling for settings sync
  window.addEventListener('message', (event) => {
    if (!event.data) return;

    // Handle incoming settings change from parent/child
    if (event.data.type === 'narbe-scan-settings-changed') {
      try {
        const newSettings = event.data.settings;
        if (newSettings && typeof newSettings === 'object') {
          if (typeof newSettings.autoScan === 'boolean') {
            settings.autoScan = newSettings.autoScan;
          }
          if (typeof newSettings.scanSpeedIndex === 'number') {
            settings.scanSpeedIndex = newSettings.scanSpeedIndex;
          }
          if (typeof newSettings.inputSensitivityIndex === 'number') {
            settings.inputSensitivityIndex = newSettings.inputSensitivityIndex;
          }
          if (typeof newSettings.reverseScan === 'boolean') {
            settings.reverseScan = newSettings.reverseScan;
          }
          // Save to localStorage (won't broadcast back since we received it)
          localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
          notifyObservers();
          console.log('NarbeScanManager: Synced settings from message:', settings);
        }
      } catch (error) {
        console.warn('NarbeScanManager: Error handling scan settings message:', error);
      }
    }

    // Handle request for settings (from child iframe)
    if (event.data.type === 'narbe-scan-settings-request') {
      if (event.source) {
        event.source.postMessage({
          type: 'narbe-scan-settings-changed',
          settings: getPublicState()
        }, '*');
      }
    }
  });

  // Request settings from parent (if we are in a child iframe)
  if (window.parent && window.parent !== window) {
    window.parent.postMessage({ type: 'narbe-scan-settings-request' }, '*');
  }

  // Reload settings when page gains focus or visibility changes
  // This ensures settings are always in sync, especially after parent changes them
  window.addEventListener('focus', () => {
    loadSettings();
  });

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      loadSettings();
    }
  });

  // Universal Input Cooldown
  // Blocks rapid repetitive inputs (spamming) to prevent accidental double-scanning
  // Implements a strict cooldown after any valid release (Key Up / Click)
  // INPUT_COOLDOWN_MS and INPUT_MIN_HOLD_MS now use configurable INPUT_SENSITIVITIES

  let lastValidReleaseTime = 0; // Shared timestamp for the last VALID release (passed duration check)
  const lastKeyDownTimes = {}; // Track when each key was last pressed down (per-key, for rapid press detection)
  const lastKeyUpTimes = {}; // Track when each key was last released (per-key, for cooldown after release)
  const blockedInteractions = new Set(); // Set of IDs currently in a blocked sequence
  const keyPressStartTimes = {}; // Track when keys were pressed down (for hold duration check)
  const keyHeldSince = {}; // Last keydown of each key not yet released (held-switch repeats)
  // Longest gap between a press and its first repeat: Windows' slowest key
  // repeat delay is 1 s.
  const HOLD_REPEAT_GAP_MS = 1200;

  /**
   * Reset all input tracking state
   * CRITICAL: Call this when transitioning from iframe back to hub to prevent
   * "stuck" keyboard state that blocks navigation after leaving an app
   */
  function resetInputState() {
    lastValidReleaseTime = 0;
    // Clear all key tracking objects
    for (const key in lastKeyDownTimes) delete lastKeyDownTimes[key];
    for (const key in lastKeyUpTimes) delete lastKeyUpTimes[key];
    for (const key in keyPressStartTimes) delete keyPressStartTimes[key];
    for (const key in keyHeldSince) delete keyHeldSince[key];
    blockedInteractions.clear();
    console.log('NarbeScanManager: Input state reset');
  }

  function handleGlobalInput(e) {
    // CRITICAL: Don't interfere with iframe content
    // Check if an iframe is active (has class 'active' on its container)
    const iframeContainer = document.querySelector('.iframe-container');
    if (iframeContainer && iframeContainer.classList.contains('active')) {
      // Let iframe handle its own keyboard events
      return;
    }

    let id;
    let isTargetEvent = false;

    // 1. Identify Source
    if (e.type.startsWith('key')) {
      // Only target Space and Enter for cooldown logic as requested.
      // By code, key name or key number: switch boxes do not always report a code.
      if (e.code === 'Space' || e.key === ' ' || e.key === 'Spacebar' || (!e.code && e.keyCode === 32)) {
        id = 'Space';
        isTargetEvent = true;
      } else if (e.code === 'Enter' || e.code === 'NumpadEnter' || e.key === 'Enter' || (!e.code && e.keyCode === 13)) {
        id = e.code === 'NumpadEnter' ? 'NumpadEnter' : 'Enter';
        isTargetEvent = true;
      }
    } else {
        // For mouse/touch events, skipping the strict blocking allows normal direct interaction.
        // We only want to block bounces on actual accessibility switches (often mapped to space/enter).
        // Since mouse clicks are direct navigation here, we disable the strict blocking for pointer events.
        // id = 'pointer';
        // isTargetEvent = true;
        return; // Skip blocking logic for mouse
    }

    // Pass through non-target keys (e.g. arrows, letters)
    if (!isTargetEvent) return;

    // 2. Start of Sequence (Down)
    // Check if we start a new press. If we are in cooldown, BLOCK IT.
    if (e.type === 'keydown' || e.type === 'mousedown' || e.type === 'touchstart') {

      const now = Date.now();
      const sensitivity = getInputSensitivity(); // Get current configurable threshold

      // A held switch: some switch boxes (e.g. a Trinkey) send the key again
      // while it is held without marking it as a repeat, so every app saw a
      // string of new presses and holding Space never scanned backwards. A
      // press that arrives while the key is still down, soon after its last
      // press, is a repeat of the hold. A long silence means the release was
      // lost, so that press stays a new press.
      const lastHeldDown = keyHeldSince[id];
      keyHeldSince[id] = now;
      if (lastHeldDown && !e.repeat && now - lastHeldDown < HOLD_REPEAT_GAP_MS) {
        try { Object.defineProperty(e, 'repeat', { value: true, configurable: true }); } catch (err) {}
      }

      // Strict global cooldown check from last VALID release. Only a new press
      // is blocked: blocking a repeat of a press that already got through (e.g.
      // Space held while Enter is tapped) also swallowed that key's release, so
      // Space stayed "held" and the backward scan never stopped. Repeats of a
      // blocked press are still blocked below.
      if (!e.repeat && now - lastValidReleaseTime < sensitivity) {
        blockedInteractions.add(id);
        e.preventDefault();
        e.stopImmediatePropagation();
        e.stopPropagation();
        console.log(`Input blocked: Cooldown active (${now - lastValidReleaseTime}ms since last valid release, threshold: ${sensitivity}ms)`);
        return false;
      }

      // ANTI-RAPID-PRESS: Block if this key was released too recently (ANY release, valid or not)
      // This prevents rapid tapping from being misinterpreted as a long hold
      const lastUpForThisKey = lastKeyUpTimes[id] || 0;
      if (!e.repeat && now - lastUpForThisKey < sensitivity) {
        blockedInteractions.add(id);
        e.preventDefault();
        e.stopImmediatePropagation();
        e.stopPropagation();
        console.log(`Input blocked: Rapid ${id} - keydown too soon after keyup (${now - lastUpForThisKey}ms, threshold: ${sensitivity}ms)`);
        return false;
      }

      // Also block if this specific source is already flagged (e.g. held down repeats)
      if (blockedInteractions.has(id)) {
        e.preventDefault();
        e.stopImmediatePropagation();
        e.stopPropagation();
        return false;
      }

      // If allowed to proceed, record start time for duration check later
      // Only for initial press (not auto-repeat)
      if (!e.repeat) {
        keyPressStartTimes[id] = now;
        lastKeyDownTimes[id] = now;
      }
    }

    // 3. End of Sequence (Up/Click)
    else if (e.type === 'keyup' || e.type === 'mouseup' || e.type === 'touchend' || e.type === 'click' || e.type === 'touchcancel') {

      const now = Date.now();
      const isFinalEvent = (e.type === 'keyup' || e.type === 'click' || e.type === 'touchend' || e.type === 'touchcancel');

      // ALWAYS record keyup time for this key (for rapid-press detection on next keydown)
      if (isFinalEvent) {
        lastKeyUpTimes[id] = now;
        delete keyHeldSince[id];
      }

      // If this sequence was blocked, consume the release event and clear the flag
      if (blockedInteractions.has(id)) {
        e.preventDefault();
        e.stopImmediatePropagation();
        e.stopPropagation();

        // Clear flag on final events
        if (isFinalEvent) {
             blockedInteractions.delete(id);
             // Also clear the press start time to reset state
             delete keyPressStartTimes[id];
        }
        return false;
      }

      // No minimum press length (ACCESSIBILITY.md §4 and §11): a short release
      // is a valid press. Swallowing the keyup of a keydown that already reached
      // the page left the Hub and apps believing Space was still held, so they
      // scanned backwards forever and ignored Enter (virtual keyboards and quick
      // switch taps release within a few milliseconds).
      if (isFinalEvent) {
        delete keyPressStartTimes[id];
      }

      // Valid release: Update the cooldown timer
      if (e.type === 'keyup' || e.type === 'mouseup') {
        lastValidReleaseTime = now;
      }
    }
  }

  // Register capturing listeners to intercept events before they reach apps
  ['keydown', 'keyup', 'mousedown', 'mouseup', 'click', 'touchstart', 'touchend'].forEach(type => {
    window.addEventListener(type, handleGlobalInput, true);
  });
  // A release lost with the focus must not turn the next press into a "repeat".
  window.addEventListener('blur', () => {
    for (const key in keyHeldSince) delete keyHeldSince[key];
  });

  // Public API
  return {
    /**
     * Force reload settings from storage
     */
    reload: function() {
      loadSettings();
      notifyObservers();
    },

    /**
     * Get current scan settings
     * @returns {Object} { autoScan, scanSpeedIndex, scanInterval }
     */
    getSettings: function() {
      return getPublicState();
    },

    /**
     * Get the actual scan interval in milliseconds
     * @returns {number} Milliseconds
     */
    getScanInterval: function() {
      return SCAN_SPEEDS[settings.scanSpeedIndex];
    },

    /**
     * Update multiple settings at once
     * @param {Object} newSettings Partial settings object
     */
    updateSettings: function(newSettings) {
      if (!newSettings) return;

      let changed = false;

      if (typeof newSettings.autoScan === 'boolean') {
        settings.autoScan = newSettings.autoScan;
        changed = true;
      }

      if (typeof newSettings.scanSpeedIndex === 'number' &&
          newSettings.scanSpeedIndex >= 0 &&
          newSettings.scanSpeedIndex < SCAN_SPEEDS.length) {
        settings.scanSpeedIndex = newSettings.scanSpeedIndex;
        changed = true;
      }

      if (typeof newSettings.inputSensitivityIndex === 'number' &&
          newSettings.inputSensitivityIndex >= 0 &&
          newSettings.inputSensitivityIndex < INPUT_SENSITIVITIES.length) {
        settings.inputSensitivityIndex = newSettings.inputSensitivityIndex;
        changed = true;
      }

      if (typeof newSettings.reverseScan === 'boolean') {
        settings.reverseScan = newSettings.reverseScan;
        changed = true;
      }

      if (changed) {
        saveSettings();
      }
    },

    /**
     * Scan direction (Hub Settings). True = a tap steps backward and holding
     * Space steps forward, in the Hub and every app.
     */
    isReverseScan: function() {
      return !!settings.reverseScan;
    },

    setReverseScan: function(enabled) {
      settings.reverseScan = !!enabled;
      saveSettings();
    },

    /**
     * Direction of a tap step: 1 (forward) or -1 (reverse). Multiply a step
     * by this; the held-Space step is the opposite (-tapDirection()).
     */
    tapDirection: function() {
      return settings.reverseScan ? -1 : 1;
    },

    /**
     * Set auto scan enabled/disabled
     * @param {boolean} enabled
     */
    setAutoScan: function(enabled) {
      settings.autoScan = !!enabled;
      saveSettings();
    },

    /**
     * Toggle auto scan enabled/disabled
     */
    toggleAutoScan: function() {
      this.setAutoScan(!settings.autoScan);
    },

    /**
     * Set scan speed by index
     * @param {number} index 0-3 corresponding to 1s, 2s, 3s, 4s
     */
    setScanSpeedIndex: function(index) {
      if (index >= 0 && index < SCAN_SPEEDS.length) {
        settings.scanSpeedIndex = index;
        saveSettings();
      }
    },

    /**
     * Cycle to next scan speed
     */
    cycleScanSpeed: function() {
      let next = settings.scanSpeedIndex + 1;
      if (next >= SCAN_SPEEDS.length) next = 0;
      this.setScanSpeedIndex(next);
      return next;
    },

    /**
     * Subscribe to setting changes
     * @param {Function} callback Function to call when settings change
     */
    subscribe: function(callback) {
      if (typeof callback === 'function' && !observers.includes(callback)) {
        observers.push(callback);
      }
    },

    /**
     * Unsubscribe from setting changes
     * @param {Function} callback
     */
    unsubscribe: function(callback) {
      observers = observers.filter(obs => obs !== callback);
    },

    /**
     * Helper to get available speeds
     */
    getAvailableSpeeds: function() {
      return [...SCAN_SPEEDS];
    },

    /**
     * Helper to get available input sensitivity thresholds
     */
    getAvailableSensitivities: function() {
      return [...INPUT_SENSITIVITIES];
    },

    /**
     * Get current input sensitivity threshold in milliseconds
     * @returns {number} Milliseconds
     */
    getInputSensitivity: function() {
      return INPUT_SENSITIVITIES[settings.inputSensitivityIndex];
    },

    /**
     * Set input sensitivity by index
     * @param {number} index 0-3 corresponding to 50ms, 100ms, 200ms, 300ms
     */
    setInputSensitivityIndex: function(index) {
      if (index >= 0 && index < INPUT_SENSITIVITIES.length) {
        settings.inputSensitivityIndex = index;
        saveSettings();
      }
    },

    /**
     * Cycle to next input sensitivity level
     */
    cycleInputSensitivity: function() {
      let next = settings.inputSensitivityIndex + 1;
      if (next >= INPUT_SENSITIVITIES.length) next = 0;
      this.setInputSensitivityIndex(next);
      return next;
    },

    /**
     * Reset all input tracking state
     * CRITICAL: Call this when transitioning from iframe back to hub to prevent
     * "stuck" keyboard state that blocks navigation after leaving an app
     */
    resetInputState: function() {
      resetInputState();
    },

    // Used by choice-scan.js and choice-scan-adapter.js. Parking is always off
    // in this Hub (see getPublicState).
    isParkingEnabled: function() { return false; },
    shouldParkAfterLoop: function() { return false; },

    /** Explicit creation only. No app is converted just by loading this file. */
    createChoiceScan: function(options) {
      return window.NarbeChoiceScan.create(window.NarbeScanManager, options);
    }
  };
})();

// Direction of a tap step for the Hub and every app: 1 = forward, -1 = backward
// (Scan direction in Hub Settings). Holding Space steps the opposite way.
window.narbeTapDir = function() {
  try { return window.NarbeScanManager.tapDirection(); } catch (e) { return 1; }
};
