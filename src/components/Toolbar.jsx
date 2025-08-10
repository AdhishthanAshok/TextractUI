import React from 'react';

export default function Toolbar({
    onUpload,
    drawEnabled,
    onToggleDraw,
    onSubmit,
    onClearAll,
    rectCount,
    imageType,
    setImageType
}) {
    return (
        <div className="w-full flex flex-col md:flex-row gap-3 md:items-center md:justify-between p-4 bg-white/80 border-b border-gray-200">
            <div className="flex items-center gap-3">
                {/* Image Type Selector */}
                <select
                    value={imageType}
                    onChange={(e) => setImageType(e.target.value)}
                    className="border rounded px-2 py-1"
                >
                    <option value="normal">Normal</option>
                    <option value="sketch">Sketch</option>
                </select>

                <label className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded cursor-pointer">
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (e) => {
                            const file = e.target.files && e.target.files[0];
                            if (!file) return;
                            onUpload(file);
                            e.target.value = null;
                        }}
                    />
                    Upload Image
                </label>

                <button
                    onClick={onToggleDraw}
                    className={`px-3 py-2 rounded font-medium transition ${drawEnabled ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-green-600 hover:bg-green-700 text-white'}`}
                >
                    {drawEnabled ? 'Disable Drawing' : 'Enable Drawing'}
                </button>

                <button
                    onClick={onClearAll}
                    className="px-3 py-2 rounded bg-gray-100 hover:bg-gray-200 border"
                >
                    Clear All
                </button>
            </div>

            <div className="flex items-center gap-3">
                <div className="text-sm text-gray-700">Rectangles: <span className="font-semibold">{rectCount}</span></div>
                <button
                    onClick={onSubmit}
                    className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
                >
                    Submit
                </button>
            </div>
        </div>
    );
}