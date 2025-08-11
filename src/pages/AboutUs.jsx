import React, { useEffect } from 'react';

const AboutUs = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);
    return (
        <div className="min-h-screen bg-white py-16 px-6 sm:px-10 lg:px-20">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 text-center">
                    About <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Textract</span>
                </h1>

                <p className="text-lg text-gray-700 mb-6">
                    Textract is a modern, AI-powered platform that transforms unstructured image data into meaningful, searchable, and exportable formats. We combine cutting-edge Optical Character Recognition (OCR) and Intelligent Character Recognition (ICR) to deliver high-accuracy form and image parsing for enterprises and developers alike.
                </p>

                <p className="text-lg text-gray-700 mb-6">
                    Our mission is to eliminate the manual inefficiencies in data entry and form processing. Whether you're digitizing thousands of paper forms or analyzing scanned documents, Textract provides a scalable solution that's fast, reliable, and accurate.
                </p>

                <p className="text-lg text-gray-700">
                    We believe in a future where AI bridges the gap between raw data and actionable insights. That’s why we’ve built Textract to be developer-friendly, API-ready, and adaptable across industries—from healthcare and education to finance and logistics.
                </p>
            </div>
        </div>
    );
};

export default AboutUs;
