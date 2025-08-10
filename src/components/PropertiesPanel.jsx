import React from 'react';

export default function PropertiesPanel({ selectedIndex, rectangles }) {
    const r = typeof selectedIndex === 'number' ? rectangles[selectedIndex] : null;

    return (
        <div className="w-full md:w-80 p-4 bg-white/90 border-l border-gray-200">
            <h3 className="text-lg font-semibold mb-3">Properties</h3>
            {!r ? (
                <div className="text-sm text-gray-600">Select a rectangle to view details.</div>
            ) : (
                <div className="text-sm text-gray-700 space-y-2">
                    <div className="font-medium">Rectangle #{selectedIndex + 1}</div>
                    <div>x1: <span className="font-semibold">{r.x1}</span></div>
                    <div>y1: <span className="font-semibold">{r.y1}</span></div>
                    <div>x2: <span className="font-semibold">{r.x2}</span></div>
                    <div>y2: <span className="font-semibold">{r.y2}</span></div>
                    <div>width: <span className="font-semibold">{r.width}</span></div>
                    <div>height: <span className="font-semibold">{r.height}</span></div>
                </div>
            )}
        </div>
    );
}