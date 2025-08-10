import React, { useRef } from 'react';
import Swal from 'sweetalert2';

export default function Toolbar({
    onUpload,
    drawEnabled,
    onToggleDraw,
    onSubmit,
    onClearAll,
    rectCount,
    imageType,
    setImageType,
    onTogglePeek,
    isPeekActive
}) {
    const fileInputRef = useRef(null);

    const handleUploadClick = () => {
        if (imageType === "select") {
            Swal.fire({
                icon: "warning",
                title: "Select Image Type",
                text: "Please select an image type from the dropdown before uploading.",
            });
            return;
        }

        // Trigger the hidden input
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        onUpload(file);
        e.target.value = null; // Clear file input
    };

    return (
        <div className="flex flex-col md:flex-row gap-4 py-4 items-start md:items-center justify-between">
            <div className="flex flex-wrap gap-3 items-center">
                {/* Image Type Selector */}
                <select
                    value={imageType}
                    onChange={(e) => setImageType(e.target.value)}
                    className="border rounded px-2 py-1"
                >
                    <option value="select">Image Type</option>
                    <option value="normal">Normal</option>
                    <option value="sketch">Sketch</option>
                </select>

                {/* Upload Button */}
                <button
                    onClick={handleUploadClick}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer transition-colors"
                >
                    <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Upload Image
                </button>

                {/* Hidden File Input */}
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                />

                {/* Toggle Draw Button */}
                <button
                    onClick={onToggleDraw}
                    className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white transition-colors ${drawEnabled
                        ? 'bg-red-600 hover:bg-red-700 '
                        : 'bg-green-600 hover:bg-green-700 '
                        }`}
                >
                    {drawEnabled ? (
                        <>
                            <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
                            </svg>
                            Disable Drawing
                        </>
                    ) : (
                        <>
                            <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                            Enable Drawing
                        </>
                    )}
                </button>

                {/* Clear All Button */}
                <button
                    onClick={onClearAll}
                    className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm bg-white hover:bg-gray-100 text-gray-800 transition-colors"
                >
                    Clear All
                </button>

                {/* Peek Button */}
                <button
                    onClick={onTogglePeek}
                    className={`inline-flex items-center px-4 py-2 border ${isPeekActive
                        ? 'border-transparent bg-amber-500 text-white'
                        : 'border-gray-300 bg-white text-gray-700'
                        } text-sm font-medium rounded-md shadow-sm hover:bg-gray-200 hover:text-gray-800 transition-colors`}
                >
                    <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                    {isPeekActive ? 'Unpeek' : 'Peek'}
                </button>
            </div>

            {/* Submit Section */}
            <div className="flex items-center gap-4">
                <div className="text-sm text-gray-600">
                    Entities: <span className="font-semibold">{rectCount}</span>
                </div>
                <button
                    onClick={onSubmit}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                >
                    <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Process Image
                </button>
            </div>
        </div >
    );

}
