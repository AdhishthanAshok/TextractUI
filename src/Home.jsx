import React, { useState, useRef, useEffect } from 'react';
import Toolbar from './components/Toolbar';
import Canvas from './components/Canvas';
import PropertiesPanel from './components/PropertiesPanel';
import { fileToDataUrl } from './utils/imageUtils';
import EntityValueTable from "./components/EntityValueTable";
// import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';

export default function App() {
    const [imageBase64, setImageBase64] = useState(null);
    const [rectangles, setRectangles] = useState([]);
    const [drawEnabled, setDrawEnabled] = useState(true);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [imageType, setImageType] = useState("select");
    const [isPeekActive, setIsPeekActive] = useState(false);
    const [tableData, setTableData] = useState(null);
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
    };

    const handleSubmit = async () => {
        if (!imageBase64 || rectangles.length === 0) {
            return Swal.fire({
                icon: 'warning',
                title: 'Missing Data',
                text: 'Please upload an image and draw at least one rectangle.',
            });
        }

        // Ensure all rectangles have names
        const updatedRectangles = rectangles.map((rect, index) => ({
            ...rect,
            name: rect.name?.trim() ? rect.name : `Entity ${index + 1}`
        }));

        // Update state so UI also reflects the default names
        setRectangles(updatedRectangles);

        const payload = {
            message: "Data Fetched",
            status: true,
            data: {
                image: {
                    image_base_64: imageBase64.split(',')[1],
                    image_type: imageType
                },
                rectangles: updatedRectangles
            }
        };
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
                returnFocus: false,      // Prevents focus shifting back
                heightAuto: false,       // Helps avoid repositioning issues
                backdrop: true,

            }).then(() => {
                // ✅ Let browser settle (important)
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
                setRectangles([]);
                setSelectedIndex(null);
                Swal.fire('Cleared!', 'All rectangles have been removed.', 'success');
            }
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white text-gray-800">
            <Toolbar
                onUpload={handleUpload}
                drawEnabled={drawEnabled}
                onToggleDraw={() => setDrawEnabled(p => !p)}
                onSubmit={handleSubmit}
                onClearAll={handleClearAll}
                rectCount={rectangles.length}
                imageType={imageType}
                setImageType={setImageType}
                onTogglePeek={() => setIsPeekActive(p => !p)}
                isPeekActive={isPeekActive}
            />

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_280px] gap-4 py-6 px-4">
                <Canvas
                    imageBase64={imageBase64}
                    rectangles={rectangles}
                    setRectangles={setRectangles}
                    drawEnabled={drawEnabled}
                    setSelectedIndex={setSelectedIndex}
                    selectedIndex={selectedIndex}
                    isPeekActive={isPeekActive}
                />

                <PropertiesPanel selectedIndex={selectedIndex} rectangles={rectangles} setRectangles={setRectangles} />

                <div ref={tableRef}>
                    {tableData && (
                        <EntityValueTable
                            data={tableData}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}