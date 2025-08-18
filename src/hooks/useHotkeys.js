import { useEffect, useCallback } from 'react';

/**
 * A custom hook to handle keyboard shortcuts.
 * @param {Array<Object>} hotkeys - An array of hotkey configurations.
 * Each object should have: { key, ctrlKey, shiftKey, altKey, callback }
 */
export const useHotkeys = (hotkeys, deps = []) => {
    const handleKeyDown = useCallback((event) => {
        for (const hotkey of hotkeys) {
            // Check for modifier keys (Ctrl, Shift, Alt)
            const ctrl = hotkey.ctrlKey ? event.ctrlKey || event.metaKey : true; // metaKey for Mac Command
            const shift = hotkey.shiftKey ? event.shiftKey : true;
            const alt = hotkey.altKey ? event.altKey : true;

            if (
                event.key.toLowerCase() === hotkey.key.toLowerCase() &&
                ctrl &&
                shift &&
                alt
            ) {
                event.preventDefault();
                hotkey.callback();
            }
        }
    }, [hotkeys, ...deps]); // Re-create the handler if hotkeys or dependencies change

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]); // Add/remove the listener when the handler changes
};