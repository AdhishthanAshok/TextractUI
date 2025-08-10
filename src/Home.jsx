import React, { useState } from 'react';
import Toolbar from './components/Toolbar';
import Canvas from './components/Canvas';
import PropertiesPanel from './components/PropertiesPanel';
import { fileToDataUrl } from './utils/imageUtils';
import { v4 as uuidv4 } from 'uuid';

export default function App() {
    const [imageBase64, setImageBase64] = useState(null);
    const [rectangles, setRectangles] = useState([]);
    const [drawEnabled, setDrawEnabled] = useState(true);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [imageType, setImageType] = useState("normal");

    const handleUpload = async (file) => {
        const dataUrl = await fileToDataUrl(file);
        setImageBase64(dataUrl);
        setRectangles([]);
        setSelectedIndex(null);
    };

    const handleSubmit = async () => {
        if (!imageBase64 || rectangles.length === 0) return alert('Please upload an image and draw at least one rectangle.');

        const payload = {
            message: "Data Fetched",
            status: true,
            data: {
                image: {
                    image_base_64: imageBase64.split(',')[1],
                    image_type: imageType
                },
                rectangles
            }
        };

        try {
            const res = await fetch('http://localhost:3000/save-data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            console.log('Server response:', data);
            alert('Submitted successfully');
        } catch (err) {
            console.error(err);
            alert('Error sending data to backend');
        }
    };

    const handleClearAll = () => {
        setRectangles([]);
        setSelectedIndex(null);
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
            />

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_280px] gap-4 py-6 px-4">
                <Canvas
                    imageBase64={imageBase64}
                    rectangles={rectangles}
                    setRectangles={setRectangles}
                    drawEnabled={drawEnabled}
                    setSelectedIndex={setSelectedIndex}
                    selectedIndex={selectedIndex}
                />

                <PropertiesPanel selectedIndex={selectedIndex} rectangles={rectangles} />
            </div>
        </div>
    );
}