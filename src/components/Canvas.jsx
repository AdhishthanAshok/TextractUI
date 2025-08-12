import React, { useRef, useState, useEffect } from 'react';
import Rectangle from './Rectangle';
import { v4 as uuidv4 } from 'uuid';

export default function Canvas({ imageBase64, rectangles, setRectangles, drawEnabled, setSelectedIndex, selectedIndex, isPeekActive }) {
    const containerRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [startPoint, setStartPoint] = useState(null);
    const [currentRect, setCurrentRect] = useState(null);
    const [draggingIndex, setDraggingIndex] = useState(null);
    const [dragOffset, setDragOffset] = useState(null); // relative offset
    const [isResizing, setIsResizing] = useState(false);
    const [resizeDirection, setResizeDirection] = useState(null);

    const [imgSize, setImgSize] = useState({
        naturalWidth: 0,
        naturalHeight: 0,
        width: 0,
        height: 0
    });

    // refs to keep latest values
    const currentRectRef = useRef(currentRect);
    const isDrawingRef = useRef(isDrawing);

    useEffect(() => { currentRectRef.current = currentRect; }, [currentRect]);
    useEffect(() => { isDrawingRef.current = isDrawing; }, [isDrawing]);

    // Load natural size of image
    useEffect(() => {
        if (imageBase64) {
            const img = new Image();
            img.src = imageBase64;
            img.onload = () => {
                setImgSize(prev => ({
                    ...prev,
                    naturalWidth: img.naturalWidth,
                    naturalHeight: img.naturalHeight
                }));
                updateRenderedSize();
            };
        }
    }, [imageBase64]);

    // Update rendered image size
    const updateRenderedSize = () => {
        if (containerRef.current) {
            const bounds = containerRef.current.getBoundingClientRect();
            setImgSize(prev => ({
                ...prev,
                width: bounds.width,
                height: bounds.height
            }));
        }
    };

    useEffect(() => {
        window.addEventListener("resize", updateRenderedSize);
        return () => window.removeEventListener("resize", updateRenderedSize);
    }, []);

    // Get relative position (0–1)
    const getRelativePos = (e) => {
        const bounds = containerRef.current.getBoundingClientRect();
        let x = (e.clientX - bounds.left) / bounds.width;
        let y = (e.clientY - bounds.top) / bounds.height;
        x = Math.max(0, Math.min(x, 1));
        y = Math.max(0, Math.min(y, 1));
        return { x, y };
    };

    // Global mouseup
    useEffect(() => {
        const handleWindowMouseUp = () => {
            if (isDrawingRef.current && currentRectRef.current) {
                setRectangles(prev => {
                    const newRects = [
                        ...prev,
                        {
                            id: uuidv4(),
                            name: `Entity ${prev.length + 1}`,
                            ...currentRectRef.current
                        }
                    ];
                    setSelectedIndex(newRects.length - 1);
                    return newRects;
                });
            }
            setIsDrawing(false);
            setStartPoint(null);
            setCurrentRect(null);
            setDraggingIndex(null);
            setDragOffset(null);
            setIsResizing(false);
            setResizeDirection(null);
        };

        window.addEventListener('mouseup', handleWindowMouseUp);
        return () => window.removeEventListener('mouseup', handleWindowMouseUp);
    }, [setRectangles, setSelectedIndex]);

    const onMouseDown = (e) => {
        if (!imageBase64 || !drawEnabled) return;
        const pos = getRelativePos(e);

        // check if clicked inside any rectangle to start dragging
        const clickedIndex = rectangles.findIndex(r => pos.x >= r.x1 && pos.x <= r.x2 && pos.y >= r.y1 && pos.y <= r.y2);
        if (clickedIndex !== -1) {
            setDraggingIndex(clickedIndex);
            setDragOffset({ x: pos.x - rectangles[clickedIndex].x1, y: pos.y - rectangles[clickedIndex].y1 });
            setSelectedIndex(clickedIndex);
            return;
        }

        // start drawing new rectangle
        setSelectedIndex(null);
        setIsDrawing(true);
        setStartPoint(pos);
        setCurrentRect(null);
    };

    const onMouseMove = (e) => {
        if (!imageBase64) return;
        const pos = getRelativePos(e);

        // drawing new rectangle
        if (isDrawing && startPoint) {
            const rect = {
                x1: Math.min(startPoint.x, pos.x),
                y1: Math.min(startPoint.y, pos.y),
                x2: Math.max(startPoint.x, pos.x),
                y2: Math.max(startPoint.y, pos.y),
                width: Math.abs(startPoint.x - pos.x),
                height: Math.abs(startPoint.y - pos.y)
            };
            setCurrentRect(rect);
        }

        // dragging existing rectangle
        if (draggingIndex !== null && dragOffset) {
            setRectangles(prev => {
                return prev.map((r, i) => {
                    if (i !== draggingIndex) return r;
                    const newX1 = Math.max(0, Math.min(pos.x - dragOffset.x, 1 - r.width));
                    const newY1 = Math.max(0, Math.min(pos.y - dragOffset.y, 1 - r.height));
                    return {
                        ...r,
                        x1: newX1,
                        y1: newY1,
                        x2: newX1 + r.width,
                        y2: newY1 + r.height
                    };
                });
            });
        }

        // resizing existing rectangle
        if (isResizing && selectedIndex !== null && resizeDirection) {
            setRectangles(prev => {
                return prev.map((r, i) => {
                    if (i !== selectedIndex) return r;

                    let { x1, y1, x2, y2 } = r;

                    if (resizeDirection.includes('e')) x2 = pos.x;
                    if (resizeDirection.includes('s')) y2 = pos.y;
                    if (resizeDirection.includes('w')) x1 = pos.x;
                    if (resizeDirection.includes('n')) y1 = pos.y;

                    return {
                        ...r,
                        x1: Math.min(x1, x2),
                        y1: Math.min(y1, y2),
                        x2: Math.max(x1, x2),
                        y2: Math.max(y1, y2),
                        width: Math.abs(x2 - x1),
                        height: Math.abs(y2 - y1)
                    };
                });
            });
        }
    };

    const onMouseUpContainer = () => {
        if (isDrawing && currentRect) {
            setRectangles(prev => [...prev, { id: uuidv4(), ...currentRect }]);
            setCurrentRect(null);
        }
        setIsDrawing(false);
        setDraggingIndex(null);
        setDragOffset(null);
        setIsResizing(false);
        setResizeDirection(null);
    };

    // ----------- RETURN (unchanged except coordinate conversion) -----------
    return (
        <div className="w-full flex-1 p-4 flex items-start justify-center">
            <div
                ref={containerRef}
                className="relative bg-gray-50 border border-gray-200 rounded overflow-hidden"
                style={{ maxWidth: 900, width: '100%', minHeight: 400 }}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUpContainer}
            >
                {!imageBase64 ? (
                    <div className="w-full h-96 flex items-center justify-center text-gray-400">Upload an image to start annotating</div>
                ) : (
                    <img src={imageBase64} alt="uploaded" style={{ display: 'block', width: '100%', height: 'auto' }} draggable={false}
                        onDragStart={(e) => e.preventDefault()}
                    />
                )}

                {/* existing rectangles */}
                {!isPeekActive && rectangles.map((r, i) => {
                    const pxRect = {
                        x1: r.x1 * imgSize.width,
                        y1: r.y1 * imgSize.height,
                        width: r.width * imgSize.width,
                        height: r.height * imgSize.height,
                        x2: r.x2 * imgSize.width,
                        y2: r.y2 * imgSize.height
                    };
                    return (
                        <Rectangle
                            key={i}
                            r={pxRect}
                            index={i}
                            onMouseDown={(e, idx, direction) => {
                                const pos = getRelativePos(e);
                                setSelectedIndex(idx);
                                if (direction) {
                                    setIsResizing(true);
                                    setResizeDirection(direction);
                                } else {
                                    setDraggingIndex(idx);
                                    setDragOffset({ x: pos.x - rectangles[idx].x1, y: pos.y - rectangles[idx].y1 });
                                }
                            }}
                            isSelected={selectedIndex === i}
                        />
                    );
                })}

                {/* current preview */}
                {currentRect && (
                    <div
                        style={{
                            position: 'absolute',
                            left: `${currentRect.x1 * imgSize.width}px`,
                            top: `${currentRect.y1 * imgSize.height}px`,
                            width: `${currentRect.width * imgSize.width}px`,
                            height: `${currentRect.height * imgSize.height}px`,
                            border: '2px dashed #2563eb',
                            backgroundColor: 'rgba(37,99,235,0.08)',
                            pointerEvents: 'none'
                        }}
                    />
                )}
            </div>
        </div>
    );
}
