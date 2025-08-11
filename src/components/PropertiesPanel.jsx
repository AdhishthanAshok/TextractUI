import React, { useEffect } from 'react';
import Swal from 'sweetalert2';

export default function PropertiesPanel({ selectedIndex, rectangles, setRectangles, setSelectedIndex }) {
    const r = typeof selectedIndex === 'number' ? rectangles[selectedIndex] : null;

    const handleDelete = () => {
        if (typeof selectedIndex !== 'number') return;
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'Deleted!',
            text: 'Your entity has been removed!',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen: () => {
                setRectangles(prev => prev.filter((_, i) => i !== selectedIndex));
                setSelectedIndex(null);
            },
        });

    };


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
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-full sticky">
            {/* Header */}
            <div className="px-5 py-4 border-b border-gray-200 bg-gray-50">
                <h3 className="text-lg font-medium text-gray-900">Entity Properties</h3>
            </div>

            {/* Content Area */}
            <div className="p-5">
                {!r ? (
                    <div className="text-center py-8">
                        <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                            />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No entity selected</h3>
                        <p className="mt-1 text-sm text-gray-500">Select an entity to view properties</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {/* Editable Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Entity Name
                            </label>
                            <input
                                type="text"
                                value={r.name || ""}
                                onChange={(e) => handleNameChange(e.target.value)}
                                className="border rounded px-2 py-1 w-full text-sm"
                            />
                        </div>

                        {/* Rectangle Info */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    X Position
                                </label>
                                <div className="mt-1 font-mono text-sm bg-gray-50 px-3 py-2 rounded">
                                    {r.x1} - {r.x2}
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Y Position
                                </label>
                                <div className="mt-1 font-mono text-sm bg-gray-50 px-3 py-2 rounded">
                                    {r.y1} - {r.y2}
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Width
                                </label>
                                <div className="mt-1 font-mono text-sm bg-gray-50 px-3 py-2 rounded">
                                    {r.width}px
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Height
                                </label>
                                <div className="mt-1 font-mono text-sm bg-gray-50 px-3 py-2 rounded">
                                    {r.height}px
                                </div>
                            </div>
                        </div>
                        {/* Delete Button */}
                        <div className="pt-4 border-t border-gray-200">
                            <button
                                onClick={handleDelete}
                                className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 transition-colors"
                            >
                                <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                Remove Entity
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

}
