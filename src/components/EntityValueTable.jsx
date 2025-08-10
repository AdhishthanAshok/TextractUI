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
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-white">Extracted Results</h3>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        {rectData.length} {rectData.length === 1 ? "entity" : "entities"}
                    </span>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Entity
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Extracted Value
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {rectData.length > 0 ? (
                            rectData.map((r) => (
                                <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 font-semibold">
                                                {r.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{r.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900 font-mono bg-gray-50 px-3 py-2 rounded">
                                            {r.value || (
                                                <span className="text-gray-400">No value detected</span>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="2"
                                    className="px-6 py-4 text-center text-sm text-gray-500"
                                >
                                    No entities processed yet. Upload an image and click "Process Image" to extract data.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );

}
