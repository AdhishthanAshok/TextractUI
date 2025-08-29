import React, { useState, useRef, useEffect } from 'react';
import Toolbar from './components/Toolbar';
import Canvas from './components/Canvas';
import PropertiesPanel from './components/PropertiesPanel';
import { fileToDataUrl } from '../../utils/imageUtils';
import EntityValueTable from "../../components/common/EntityValueTable";
import Swal from 'sweetalert2';
import { saveData, detectEntities } from '../../api/editorService';
import { useEditorHotkeys } from './hooks/useEditorHotkeys';

const Editor = () => {
    const [imageBase64, setImageBase64] = useState(null);
    const [rectangles, setRectangles] = useState([]);
    const [drawEnabled, setDrawEnabled] = useState(true);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [imageType, setImageType] = useState("select");
    const [isPeekActive, setIsPeekActive] = useState(false);
    const [tableData, setTableData] = useState(null);
    const [imageNaturalSize, setImageNaturalSize] = useState({ width: 0, height: 0 });
    const tableRef = useRef(null);

    const { handleDelete } = useEditorHotkeys({
        rectangles, setRectangles,
        selectedIndex, setSelectedIndex,
        drawEnabled, setDrawEnabled
    });

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

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
        const img = new Image();
        img.src = dataUrl;
        img.onload = () => {
            setImageNaturalSize({
                width: img.naturalWidth,
                height: img.naturalHeight
            });
        };
    };

    /**
     * NEW: Converts absolute pixel coordinates (from API) to relative (0-1) coordinates.
     * This is the key function to fix the issue.
     */
    const convertActualToRelativePixels = (actualRect) => {
        const { width: naturalWidth, height: naturalHeight } = imageNaturalSize;
        if (!naturalWidth || !naturalHeight) return null; // Avoid division by zero if image isn't loaded

        return {
            ...actualRect, // Keep id, name, etc.
            x1: actualRect.x1 / naturalWidth,
            y1: actualRect.y1 / naturalHeight,
            x2: actualRect.x2 / naturalWidth,
            y2: actualRect.y2 / naturalHeight,
            width: actualRect.width / naturalWidth,
            height: actualRect.height / naturalHeight,
        };
    };

    /**
     * Converts relative (0-1) coordinates (from drawing) to absolute pixel coordinates for the backend.
     */
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
        const updatedRectangles = rectangles.map((rect, index) => {
            const rectWithName = {
                ...rect,
                name: rect.name?.trim() ? rect.name : `Entity ${index + 1}`
            };
            return convertToActualPixels(rectWithName);
        });
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
        try {
            const data = await saveData(payload);
            setTableData(data);
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Submitted successfully',
            }).then(() => {
                setTimeout(() => {
                    tableRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 200);
            });
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Submission Failed',
                text: err.message,
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
        if (!imageBase64) {
            return Swal.fire({
                icon: "warning",
                title: "No Image",
                text: "Please upload an image first."
            });
        }
        try {
            const data = await detectEntities(imageBase64, imageType, 180000);

            // *** THE FIX: Convert API response to relative coordinates before setting state ***
            const relativeRects = data.rectangles
                .map(convertActualToRelativePixels)
                .filter(Boolean); // .filter(Boolean) removes any nulls if image size wasn't ready

            setRectangles(prev => [...prev, ...relativeRects]);

        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: err.message
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
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

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
                <div className="flex flex-col lg:flex-row gap-8">
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
                    <aside className="lg:w-1/4 w-full sticky top-24 self-start">
                        <PropertiesPanel
                            selectedIndex={selectedIndex}
                            rectangles={rectangles}
                            setRectangles={setRectangles}
                            setSelectedIndex={setSelectedIndex}
                            imageNaturalSize={imageNaturalSize}
                            onDelete={handleDelete}
                        />
                    </aside>
                </div>
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
