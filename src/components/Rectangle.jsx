import React from 'react';

export default function Rectangle({ r, index, onDelete, onMouseDown, isSelected }) {
    const borderColor = isSelected ? 'rgba(6,182,212,1)' : 'rgba(239,68,68,1)';
    const shadow = isSelected ? '0 0 0 6px rgba(6,182,212,0.08)' : 'none';

    return (
        <div
            onMouseDown={(e) => {
                e.stopPropagation();
                onMouseDown(e, index);
            }}
            style={{
                position: 'absolute',
                left: `${r.x1}px`,
                top: `${r.y1}px`,
                width: `${r.width}px`,
                height: `${r.height}px`,
                border: `2px solid ${borderColor}`,
                backgroundColor: 'rgba(239,68,68,0.12)',
                boxShadow: shadow,
                cursor: 'move',
            }}
        >
            {/* index badge */}
            <div style={{ position: 'absolute', left: 6, top: 6 }}>
                <div className="text-xs px-2 py-0.5 bg-white/80 rounded-full border">#{index + 1}</div>
            </div>

            {/* delete button */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete(index);
                }}
                style={{
                    position: 'absolute',
                    left: '50%',
                    top: -10,
                    transform: 'translateX(-50%)',
                    width: 22,
                    height: 22,
                    borderRadius: 9999,
                    background: '#ef4444',
                    color: 'white',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                }}
                title="Delete rectangle"
            >
                ×
            </button>
            <div
                onMouseDown={(e) => {
                    e.stopPropagation();
                    onMouseDown(e, index, 'se'); // southeast corner
                }}
                style={{
                    position: 'absolute',
                    right: -4,
                    bottom: -4,
                    width: 8,
                    height: 8,
                    background: 'white',
                    border: '1px solid black',
                    cursor: 'se-resize'
                }}
            />
            <div
                onMouseDown={(e) => {
                    e.stopPropagation();
                    onMouseDown(e, index, 'ne'); // northeast corner
                }}
                style={{
                    position: 'absolute',
                    right: -4,
                    top: -4,
                    width: 8,
                    height: 8,
                    background: 'white',
                    border: '1px solid black',
                    cursor: 'ne-resize'
                }}
            />
            {/* Southwest corner */}
            <div
                onMouseDown={(e) => {
                    e.stopPropagation();
                    onMouseDown(e, index, 'sw'); // southwest corner
                }}
                style={{
                    position: 'absolute',
                    left: -4,
                    bottom: -4,
                    width: 8,
                    height: 8,
                    background: 'white',
                    border: '1px solid black',
                    cursor: 'sw-resize'
                }}
            />

            {/* Northwest corner */}
            <div
                onMouseDown={(e) => {
                    e.stopPropagation();
                    onMouseDown(e, index, 'nw'); // northwest corner
                }}
                style={{
                    position: 'absolute',
                    left: -4,
                    top: -4,
                    width: 8,
                    height: 8,
                    background: 'white',
                    border: '1px solid black',
                    cursor: 'nw-resize'
                }}
            />

        </div>
    );
}