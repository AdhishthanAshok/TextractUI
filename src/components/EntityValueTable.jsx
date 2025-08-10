import React, { useState, useEffect } from "react";

export default function EntityValueTable({ data }) {
    const [rectData, setRectData] = useState([]);

    useEffect(() => {
        if (data?.status && data?.rectangles) {
            setRectData(data.rectangles);
        }
    }, [data]);

    useEffect(() => {
        console.log("DATA RECEIVED:", rectData);
    }, [rectData]);

    return (
        <div className="max-w-4xl mx-auto mt-8 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
            <div className="px-6 py-4 bg-gradient-to-r from-indigo-100 to-indigo-50 border-b border-gray-200">
                <h3 className="text-2xl font-semibold text-gray-800">📋 Extracted Entity Values</h3>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                        <tr>
                            <th className="px-6 py-3 text-left font-medium">Entity Name</th>
                            <th className="px-6 py-3 text-left font-medium">Extracted Value</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {rectData.length > 0 ? (
                            rectData.map((r) => (
                                <tr key={r.id} className="hover:bg-indigo-50 transition duration-150">
                                    <td className="px-6 py-4 font-medium text-gray-800">{r.name}</td>
                                    <td className="px-6 py-4 text-gray-600">{r.value}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2" className="px-6 py-4 text-center text-gray-500">
                                    No data available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
