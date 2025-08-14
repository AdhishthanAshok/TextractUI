import React, { useState, useRef, useEffect } from 'react';
import Toolbar from '../components/Toolbar';
import Canvas from '../components/Canvas';
import PropertiesPanel from '../components/PropertiesPanel';
import { fileToDataUrl } from '../utils/imageUtils';
import EntityValueTable from "../components/EntityValueTable";
import Swal from 'sweetalert2';

const Editor = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const [imageBase64, setImageBase64] = useState(null);
    const [rectangles, setRectangles] = useState([]);
    const [drawEnabled, setDrawEnabled] = useState(true);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [imageType, setImageType] = useState("select");
    const [isPeekActive, setIsPeekActive] = useState(false);
    const [tableData, setTableData] = useState(null);
    const [imageNaturalSize, setImageNaturalSize] = useState({ width: 0, height: 0 });
    const tableRef = useRef(null);
    const baseUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL;

    useEffect(() => {
        if (tableData) {
            tableRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [tableData]);

    const handleUpload = async (file) => {
        const dataUrl = await fileToDataUrl(file);
        setImageBase64(dataUrl);
        setRectangles([]);
        setSelectedIndex(null);

        // Get natural image dimensions
        const img = new Image();
        img.src = dataUrl;
        img.onload = () => {
            setImageNaturalSize({
                width: img.naturalWidth,
                height: img.naturalHeight
            });
        };
    };

    // Convert relative coordinates to actual pixel coordinates
    const convertToActualPixels = (relativeRect) => {
        return {
            id: relativeRect.id,
            name: relativeRect.name,
            x1: Math.round(relativeRect.x1 * imageNaturalSize.width),
            y1: Math.round(relativeRect.y1 * imageNaturalSize.height),
            x2: Math.round(relativeRect.x2 * imageNaturalSize.width),
            y2: Math.round(relativeRect.y2 * imageNaturalSize.height),
            width: Math.round(relativeRect.width * imageNaturalSize.width),
            height: Math.round(relativeRect.height * imageNaturalSize.height),
            // Keep relative coordinates for internal use
            // relative: {
            //     x1: relativeRect.x1,
            //     y1: relativeRect.y1,
            //     x2: relativeRect.x2,
            //     y2: relativeRect.y2,
            //     width: relativeRect.width,
            //     height: relativeRect.height
            // }
        };
    };

    const handleSubmit = async () => {
        if (!imageBase64 || rectangles.length === 0) {
            return Swal.fire({
                icon: 'warning',
                title: 'Missing Data',
                text: 'Please upload an image and draw at least one rectangle.',
            });
        }

        // Ensure all rectangles have names and convert to actual pixels
        const updatedRectangles = rectangles.map((rect, index) => {
            const rectWithName = {
                ...rect,
                name: rect.name?.trim() ? rect.name : `Entity ${index + 1}`
            };
            return convertToActualPixels(rectWithName);
        });

        // Update state so UI also reflects the default names
        setRectangles(rectangles.map((rect, index) => ({
            ...rect,
            name: rect.name?.trim() ? rect.name : `Entity ${index + 1}`
        })));

        const payload = {
            data: {
                image: {
                    image_base_64: imageBase64.split(',')[1],
                    image_type: imageType,
                    natural_width: imageNaturalSize.width,
                    natural_height: imageNaturalSize.height
                },
                rectangles: updatedRectangles
            }
        };

        // Log the payload to see the actual pixel coordinates being sent
        console.log('Sending payload with actual pixel coordinates:', JSON.stringify(payload));

        // Calling the API
        try {
            const res = await fetch(`${baseUrl}/save-data`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await res.json();
            setTableData(data);
            console.log('Server response:', data);

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Submitted successfully',
                returnFocus: false,
                heightAuto: false,
                backdrop: true,
            }).then(() => {
                setTimeout(() => {
                    tableRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 200);
            });

        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: 'error',
                title: 'Submission Failed',
                text: 'Error sending data to backend',
            });
        }
    };

    const handleClearAll = () => {
        if (rectangles.length === 0) return;
        Swal.fire({
            title: 'Are you sure?',
            text: "This will remove all drawn rectangles.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, clear all'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: 'Deleted!',
                    text: 'Your entities have been removed!',
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                    didOpen: () => {
                        setRectangles([]);
                        setSelectedIndex(null);
                    },
                });
            }
        });
    };

    const handleDetectEntities = async () => {
        try {
            if (!imageBase64) {
                Swal.fire({
                    icon: "warning",
                    title: "No Image",
                    text: "Please upload an image first."
                });
                return;
            }

            const res = await fetch(`${baseUrl}/detect-entities`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    image: imageBase64,
                    image_dimensions: imageNaturalSize
                })
            });

            const data = await res.json();
            if (!data.status) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: data.message || "Detection failed"
                });
                return;
            }

            setRectangles(data.rectangles);
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Something went wrong while detecting entities."
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <Toolbar
                        onUpload={handleUpload}
                        drawEnabled={drawEnabled}
                        onToggleDraw={() => setDrawEnabled(prev => !prev)}
                        onSubmit={handleSubmit}
                        onClearAll={handleClearAll}
                        rectCount={rectangles.length}
                        imageType={imageType}
                        setImageType={setImageType}
                        onTogglePeek={() => setIsPeekActive(prev => !prev)}
                        isPeekActive={isPeekActive}
                        imageBase64={imageBase64}
                        onDetectEntities={handleDetectEntities}
                    />
                </div>
            </header>

            {/* Main content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Canvas Section */}
                    <section className="lg:w-3/4 w-full">
                        <Canvas
                            imageBase64={imageBase64}
                            rectangles={rectangles}
                            setRectangles={setRectangles}
                            drawEnabled={drawEnabled}
                            setSelectedIndex={setSelectedIndex}
                            selectedIndex={selectedIndex}
                            isPeekActive={isPeekActive}
                        />
                    </section>

                    {/* Properties Panel */}
                    <aside className="lg:w-1/4 w-full sticky top-24 self-start">
                        <PropertiesPanel
                            selectedIndex={selectedIndex}
                            rectangles={rectangles}
                            setRectangles={setRectangles}
                            setSelectedIndex={setSelectedIndex}
                            imageNaturalSize={imageNaturalSize}
                        />
                    </aside>
                </div>

                {/* Results Table */}
                {tableData && (
                    <section ref={tableRef}>
                        <EntityValueTable data={tableData} />
                    </section>
                )}
            </main>
        </div>
    );
};

export default Editor;