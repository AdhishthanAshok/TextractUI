import { useState, useEffect, useCallback } from 'react';
import { useHotkeys } from '../../../hooks/useHotkeys'; // The generic hotkey hook
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';

// A simple hook to manage undo/redo state
const useUndoRedo = (initialState) => {
    const [history, setHistory] = useState([initialState]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const setState = (newState) => {
        const newHistory = history.slice(0, currentIndex + 1);
        newHistory.push(newState);
        setHistory(newHistory);
        setCurrentIndex(newHistory.length - 1);
    };

    const undo = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    const redo = () => {
        if (currentIndex < history.length - 1) {
            setCurrentIndex(prev => prev + 1);
        }
    };

    // This effect ensures the parent component gets the updated state on undo/redo
    useEffect(() => {
        // This part is tricky; we need a way to sync back to the Editor component.
        // For simplicity, we'll return the current state from the hook.
    }, [currentIndex, history]);


    return [history[currentIndex], setState, undo, redo, currentIndex > 0, currentIndex < history.length - 1];
};


export const useEditorHotkeys = ({
    rectangles,
    setRectangles,
    selectedIndex,
    setSelectedIndex,
    drawEnabled,
    setDrawEnabled
}) => {
    const [clipboard, setClipboard] = useState(null);

    // Undo/Redo state management
    const [history, setHistory] = useState([[]]);
    const [historyIndex, setHistoryIndex] = useState(0);

    // Save state to history, but only if it's different from the last state
    useEffect(() => {
        if (rectangles !== history[historyIndex]) {
            const newHistory = history.slice(0, historyIndex + 1);
            newHistory.push(rectangles);
            setHistory(newHistory);
            setHistoryIndex(newHistory.length - 1);
        }
    }, [rectangles]);


    const handleUndo = () => {
        if (historyIndex > 0) {
            setRectangles(history[historyIndex - 1]);
            setHistoryIndex(prev => prev - 1);
        }
    };

    const handleRedo = () => {
        if (historyIndex < history.length - 1) {
            setRectangles(history[historyIndex + 1]);
            setHistoryIndex(prev => prev + 1);
        }
    };

    const handleDelete = useCallback(() => {
        if (typeof selectedIndex !== 'number') return;
        setRectangles(prev => prev.filter((_, i) => i !== selectedIndex));
        setSelectedIndex(null);
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'Deleted!',
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
        });
    }, [selectedIndex, setRectangles, setSelectedIndex]);

    const handleCopy = useCallback(() => {
        if (typeof selectedIndex !== 'number') return;
        setClipboard(rectangles[selectedIndex]);
    }, [selectedIndex, rectangles]);

    const handlePaste = useCallback(() => {
        if (!clipboard) return;
        const newRect = {
            ...clipboard,
            id: uuidv4(),
            x1: Math.min(clipboard.x1 + 0.02, 1 - clipboard.width),
            y1: Math.min(clipboard.y1 + 0.02, 1 - clipboard.height),
            x2: Math.min(clipboard.x1 + 0.02, 1 - clipboard.width) + clipboard.width,
            y2: Math.min(clipboard.y1 + 0.02, 1 - clipboard.height) + clipboard.height,
            name: `${clipboard.name} (copy)`
        };
        setRectangles(prev => [...prev, newRect]);
        setSelectedIndex(rectangles.length);
    }, [clipboard, rectangles.length, setRectangles, setSelectedIndex]);

    const moveOrResize = useCallback((dx, dy, isResize = false, isShift = false) => {
        if (selectedIndex === null) return;

        setRectangles(prev => prev.map((r, i) => {
            if (i !== selectedIndex) return r;

            let { x1, y1, x2, y2 } = r;

            if (isResize) {
                // Resize logic
                if (dy < 0) y2 = Math.max(y1 + 0.005, y2 + dy); // Up
                if (dy > 0) y2 = Math.min(1, y2 + dy);          // Down
                if (dx < 0) x2 = Math.max(x1 + 0.005, x2 + dx); // Left
                if (dx > 0) x2 = Math.min(1, x2 + dx);          // Right
            } else {
                // Move logic
                x1 = Math.max(0, Math.min(x1 + dx, 1 - r.width));
                y1 = Math.max(0, Math.min(y1 + dy, 1 - r.height));
                x2 = x1 + r.width;
                y2 = y1 + r.height;
            }

            return { ...r, x1, y1, x2, y2, width: x2 - x1, height: y2 - y1 };
        }));
    }, [selectedIndex, setRectangles]);


    const hotkeys = [
        // Basic Actions
        { key: 'Delete', callback: handleDelete },

        // Clipboard
        { key: 'c', ctrlKey: true, callback: handleCopy },
        { key: 'v', ctrlKey: true, callback: handlePaste },

        // Undo/Redo
        { key: 'z', ctrlKey: true, callback: handleUndo },
        { key: 'y', ctrlKey: true, callback: handleRedo },

        // Move Rectangle (nudge)
        // { key: 'ArrowUp', ctrlKey: true, callback: () => moveOrResize(0, -0.005) },
        // { key: 'ArrowDown', ctrlKey: true, callback: () => moveOrResize(0, 0.005) },
        // { key: 'ArrowLeft', ctrlKey: true, callback: () => moveOrResize(-0.005, 0) },
        // { key: 'ArrowRight', ctrlKey: true, callback: () => moveOrResize(0.005, 0) },

    ];

    useHotkeys(hotkeys, [selectedIndex, rectangles, clipboard, historyIndex, history]);

    // Return any handlers that need to be attached to buttons
    return { handleDelete };
};