import React, { useEffect } from 'react';

export default function PropertiesPanel({ selectedIndex, rectangles, setRectangles }) {
    const r = typeof selectedIndex === 'number' ? rectangles[selectedIndex] : null;

    // Assign default name only once per rectangle if no name exists
    useEffect(() => {
        if (typeof selectedIndex === 'number' && rectangles[selectedIndex] && !rectangles[selectedIndex].name) {
            setRectangles(prev => {
                const updated = [...prev];
                updated[selectedIndex] = {
                    ...updated[selectedIndex],
                    name: `Entity ${selectedIndex + 1}`
                };
                return updated;
            });
        }
        // only run when selectedIndex changes
    }, [selectedIndex, setRectangles]);

    const handleNameChange = (value) => {
        setRectangles(prev => {
            const updated = [...prev];
            updated[selectedIndex] = {
                ...updated[selectedIndex],
                name: value
            };
            return updated;
        });
    };

    return (
        <div className="w-full md:w-80 p-4 bg-white/90 border-l border-gray-200">
            <h3 className="text-lg font-semibold mb-3">Properties</h3>
            {!r ? (
                <div className="text-sm text-gray-600">
                    Select a rectangle to view details.
                </div>
            ) : (
                <div className="text-sm text-gray-700 space-y-2">
                    {/* Editable name field */}
                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            value={r.name || ""}
                            onChange={(e) => handleNameChange(e.target.value)}
                            className="border rounded px-2 py-1 w-full text-sm"
                        />
                    </div>

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
