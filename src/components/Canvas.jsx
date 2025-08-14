import React, { useRef, useState, useEffect } from 'react';
import Rectangle from './Rectangle';
import { v4 as uuidv4 } from 'uuid';

export default function Canvas({ imageBase64, rectangles, setRectangles, drawEnabled, setSelectedIndex, selectedIndex, isPeekActive }) {
    const containerRef = useRef(null);
    const imgRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [startPoint, setStartPoint] = useState(null);
    const [currentRect, setCurrentRect] = useState(null);
    const [draggingIndex, setDraggingIndex] = useState(null);
    const [dragOffset, setDragOffset] = useState(null);
    const [isResizing, setIsResizing] = useState(false);
    const [resizeDirection, setResizeDirection] = useState(null);

    const [imgSize, setImgSize] = useState({
        naturalWidth: 0,
        naturalHeight: 0,
        displayWidth: 0,
        displayHeight: 0
    });

    // refs to keep latest values
    const currentRectRef = useRef(currentRect);
    const isDrawingRef = useRef(isDrawing);

    useEffect(() => { currentRectRef.current = currentRect; }, [currentRect]);
    useEffect(() => { isDrawingRef.current = isDrawing; }, [isDrawing]);

    // Load natural size of image and update display size
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
                // Update display size after natural size is loaded
                setTimeout(updateDisplaySize, 0);
            };
        }
    }, [imageBase64]);

    // Update display size of the image
    const updateDisplaySize = () => {
        if (imgRef.current) {
            const rect = imgRef.current.getBoundingClientRect();
            setImgSize(prev => ({
                ...prev,
                displayWidth: rect.width,
                displayHeight: rect.height
            }));
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setTimeout(updateDisplaySize, 100);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Get relative position (0–1) based on image bounds
    const getRelativePos = (e) => {
        if (!imgRef.current) return { x: 0, y: 0 };

        const imgBounds = imgRef.current.getBoundingClientRect();
        let x = (e.clientX - imgBounds.left) / imgBounds.width;
        let y = (e.clientY - imgBounds.top) / imgBounds.height;

        // Clamp to 0-1 range
        x = Math.max(0, Math.min(x, 1));
        y = Math.max(0, Math.min(y, 1));

        return { x, y };
    };

    // Convert relative coordinates to pixel coordinates (for display)
    const relativeToPixel = (relativeRect) => {
        return {
            x1: relativeRect.x1 * imgSize.displayWidth,
            y1: relativeRect.y1 * imgSize.displayHeight,
            x2: relativeRect.x2 * imgSize.displayWidth,
            y2: relativeRect.y2 * imgSize.displayHeight,
            width: relativeRect.width * imgSize.displayWidth,
            height: relativeRect.height * imgSize.displayHeight
        };
    };

    // Convert relative coordinates to actual image pixel coordinates
    const relativeToActualPixel = (relativeRect) => {
        return {
            x1: Math.round(relativeRect.x1 * imgSize.naturalWidth),
            y1: Math.round(relativeRect.y1 * imgSize.naturalHeight),
            x2: Math.round(relativeRect.x2 * imgSize.naturalWidth),
            y2: Math.round(relativeRect.y2 * imgSize.naturalHeight),
            width: Math.round(relativeRect.width * imgSize.naturalWidth),
            height: Math.round(relativeRect.height * imgSize.naturalHeight)
        };
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

        e.preventDefault();
        const pos = getRelativePos(e);

        // Check if clicked inside any rectangle to start dragging
        const clickedIndex = rectangles.findIndex(r =>
            pos.x >= r.x1 && pos.x <= r.x2 && pos.y >= r.y1 && pos.y <= r.y2
        );

        if (clickedIndex !== -1) {
            setDraggingIndex(clickedIndex);
            setDragOffset({
                x: pos.x - rectangles[clickedIndex].x1,
                y: pos.y - rectangles[clickedIndex].y1
            });
            setSelectedIndex(clickedIndex);
            return;
        }

        // Start drawing new rectangle
        setSelectedIndex(null);
        setIsDrawing(true);
        setStartPoint(pos);
        setCurrentRect(null);
    };

    const onMouseMove = (e) => {
        if (!imageBase64) return;

        const pos = getRelativePos(e);

        // Drawing new rectangle
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

        // Dragging existing rectangle
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

        // Resizing existing rectangle
        if (isResizing && selectedIndex !== null && resizeDirection) {
            setRectangles(prev => {
                return prev.map((r, i) => {
                    if (i !== selectedIndex) return r;

                    let { x1, y1, x2, y2 } = r;

                    // Apply resize based on direction
                    if (resizeDirection.includes('e')) x2 = Math.max(x1 + 0.01, Math.min(pos.x, 1));
                    if (resizeDirection.includes('s')) y2 = Math.max(y1 + 0.01, Math.min(pos.y, 1));
                    if (resizeDirection.includes('w')) x1 = Math.max(0, Math.min(pos.x, x2 - 0.01));
                    if (resizeDirection.includes('n')) y1 = Math.max(0, Math.min(pos.y, y2 - 0.01));

                    // Ensure proper ordering
                    const finalX1 = Math.min(x1, x2);
                    const finalX2 = Math.max(x1, x2);
                    const finalY1 = Math.min(y1, y2);
                    const finalY2 = Math.max(y1, y2);

                    return {
                        ...r,
                        x1: finalX1,
                        y1: finalY1,
                        x2: finalX2,
                        y2: finalY2,
                        width: finalX2 - finalX1,
                        height: finalY2 - finalY1
                    };
                });
            });
        }
    };

    const onMouseUpContainer = () => {
        if (isDrawing && currentRect) {
            setRectangles(prev => [
                ...prev,
                {
                    id: uuidv4(),
                    name: `Entity ${prev.length + 1}`,
                    ...currentRect
                }
            ]);
            setSelectedIndex(prev => prev === null ? rectangles.length : prev);
            setCurrentRect(null);
        }
        setIsDrawing(false);
        setDraggingIndex(null);
        setDragOffset(null);
        setIsResizing(false);
        setResizeDirection(null);
    };

    // Debug function to show actual pixel coordinates
    const getActualCoordinates = (rect) => {
        const actualCoords = relativeToActualPixel(rect);
        console.log('Relative coordinates:', {
            x1: rect.x1.toFixed(4),
            y1: rect.y1.toFixed(4),
            x2: rect.x2.toFixed(4),
            y2: rect.y2.toFixed(4)
        });
        console.log('Actual pixel coordinates:', actualCoords);
        return actualCoords;
    };

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
                    <div className="w-full h-96 flex items-center justify-center text-gray-400">
                        Upload an image to start annotating
                    </div>
                ) : (
                    <img
                        ref={imgRef}
                        src={imageBase64}
                        alt="uploaded"
                        style={{ display: 'block', width: '100%', height: 'auto' }}
                        draggable={false}
                        onDragStart={(e) => e.preventDefault()}
                        onLoad={updateDisplaySize}
                    />
                )}

                {/* Existing rectangles */}
                {!isPeekActive && rectangles.map((r, i) => {
                    const displayRect = relativeToPixel(r);
                    return (
                        <Rectangle
                            key={r.id || i}
                            r={displayRect}
                            index={i}
                            onMouseDown={(e, idx, direction) => {
                                e.preventDefault();
                                const pos = getRelativePos(e);
                                setSelectedIndex(idx);
                                if (direction) {
                                    setIsResizing(true);
                                    setResizeDirection(direction);
                                } else {
                                    setDraggingIndex(idx);
                                    setDragOffset({
                                        x: pos.x - rectangles[idx].x1,
                                        y: pos.y - rectangles[idx].y1
                                    });
                                }
                            }}
                            isSelected={selectedIndex === i}
                        />
                    );
                })}

                {/* Current drawing preview */}
                {currentRect && (
                    <div
                        style={{
                            position: 'absolute',
                            left: `${currentRect.x1 * imgSize.displayWidth}px`,
                            top: `${currentRect.y1 * imgSize.displayHeight}px`,
                            width: `${currentRect.width * imgSize.displayWidth}px`,
                            height: `${currentRect.height * imgSize.displayHeight}px`,
                            border: '2px dashed #2563eb',
                            backgroundColor: 'rgba(37,99,235,0.08)',
                            pointerEvents: 'none'
                        }}
                    />
                )}
            </div>

            {/* Debug info - you can remove this in production */}
            {/* {selectedIndex !== null && rectangles[selectedIndex] && (
                <div className="fixed bottom-4 right-4 bg-black text-white p-2 rounded text-xs max-w-xs">
                    <div>Selected Rectangle #{selectedIndex + 1}</div>
                    <div>Relative: ({rectangles[selectedIndex].x1.toFixed(3)}, {rectangles[selectedIndex].y1.toFixed(3)}) to ({rectangles[selectedIndex].x2.toFixed(3)}, {rectangles[selectedIndex].y2.toFixed(3)})</div>
                    <div>Actual Pixels:
                        {(() => {
                            const actual = relativeToActualPixel(rectangles[selectedIndex]);
                            return `(${actual.x1}, ${actual.y1}) to (${actual.x2}, ${actual.y2})`;
                        })()}
                    </div>
                    <div>Image: {imgSize.naturalWidth}x{imgSize.naturalHeight} → {Math.round(imgSize.displayWidth)}x{Math.round(imgSize.displayHeight)}</div>
                </div>
            )} */}
        </div>
    );
}