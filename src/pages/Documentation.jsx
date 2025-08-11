import React from "react";
import { Link } from "react-router-dom";

const Documentation = () => {
    return (
        <div className="min-h-screen bg-white text-gray-800">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16 px-6 sm:px-10 lg:px-20">
                <div className="max-w-5xl mx-auto text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
                        Textract Documentation
                    </h1>
                    <p className="mt-6 text-lg sm:text-xl max-w-3xl mx-auto">
                        Learn how to extract and annotate text from images with our powerful tools.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                    {/* Sidebar Navigation */}
                    <nav className="lg:col-span-1 sticky top-20 space-y-2 bg-white p-4 rounded-md border border-gray-200 shadow-sm max-h-[calc(100vh-5rem)] overflow-y-auto">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            Guide
                        </h2>
                        <a
                            href="#getting-started"
                            className="block px-4 py-2 rounded-md bg-purple-50 text-purple-700 font-semibold"
                        >
                            Getting Started
                        </a>
                        <a
                            href="#uploading-images"
                            className="block px-4 py-2 rounded-md hover:bg-gray-50 text-gray-600 hover:text-gray-900 transition"
                        >
                            Uploading Images
                        </a>
                        <a
                            href="#annotation"
                            className="block px-4 py-2 rounded-md hover:bg-gray-50 text-gray-600 hover:text-gray-900 transition"
                        >
                            Annotation Tools
                        </a>
                        <a
                            href="#processing"
                            className="block px-4 py-2 rounded-md hover:bg-gray-50 text-gray-600 hover:text-gray-900 transition"
                        >
                            Processing Data
                        </a>
                        <a
                            href="#exporting"
                            className="block px-4 py-2 rounded-md hover:bg-gray-50 text-gray-600 hover:text-gray-900 transition"
                        >
                            Exporting Results
                        </a>
                        <a
                            href="#faq"
                            className="block px-4 py-2 rounded-md hover:bg-gray-50 text-gray-600 hover:text-gray-900 transition"
                        >
                            FAQ
                        </a>
                    </nav>

                    {/* Documentation Content */}
                    <div className="lg:col-span-3 space-y-16 prose max-w-none">
                        {/* Getting Started */}
                        <section id="getting-started" className="scroll-mt-24">
                            <h2 className="text-2xl font-bold mb-4 text-gray-900">
                                Getting Started
                            </h2>
                            <p>
                                Welcome to Textract, your solution for extracting text from images
                                and documents. Follow this guide to make the most of our annotation
                                tools.
                            </p>

                            <h3 className="mt-8 font-semibold text-lg">Prerequisites</h3>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>A modern web browser (Chrome, Firefox, Safari, or Edge)</li>
                                <li>Images or documents you want to process (JPG, PNG, PDF supported)</li>
                                <li>An account (optional for basic features)</li>
                            </ul>

                            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <p className="text-blue-800">
                                    <strong>Tip:</strong> Try our{" "}
                                    <Link
                                        to="/editor"
                                        className="text-blue-600 hover:underline"
                                    >
                                        demo editor
                                    </Link>{" "}
                                    to explore features without an account.
                                </p>
                            </div>
                        </section>

                        {/* Uploading Images */}
                        <section id="uploading-images" className="scroll-mt-24">
                            <h2 className="text-2xl font-bold mb-4 text-gray-900">
                                Uploading Images
                            </h2>
                            <h3>Supported Formats</h3>
                            <p>Textract supports the following file formats:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Images: JPG, PNG, BMP, TIFF</li>
                                <li>Documents: PDF (first page only for free tier)</li>
                                <li>Maximum file size: 10MB (free tier)</li>
                            </ul>

                            <h3 className="mt-8">Step-by-Step Upload</h3>
                            <ol className="list-decimal pl-6 space-y-4">
                                <li>
                                    <strong>Click the "Upload" button</strong> in the toolbar
                                    <div className="mt-3">
                                        <button
                                            // no onClick or use onClick={() => {}}
                                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer transition-colors"
                                            type="button"
                                        >
                                            <svg
                                                className="-ml-1 mr-2 h-5 w-5"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            Upload Image
                                        </button>
                                    </div>
                                </li>

                                <li>
                                    <strong>Select your file</strong> from your device
                                </li>
                                <li>
                                    <strong>Wait for processing</strong> - the image will appear in the editor
                                </li>
                            </ol>
                        </section>

                        {/* Annotation Tools */}
                        <section id="annotation" className="scroll-mt-24">
                            <h2 className="text-2xl font-bold mb-4 text-gray-900">
                                Annotation Tools
                            </h2>
                            <p>
                                Our annotation tools let you mark specific areas of your document for
                                text extraction.
                            </p>

                            <h3>Basic Tools</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                                {[
                                    {
                                        title: "Rectangle Selection",
                                        description: "Click and drag to create selection boxes around text areas",
                                        icon: "🟦",
                                    },
                                    {
                                        title: "Text Recognition",
                                        description: "Automatically detects text within your selections",
                                        icon: "🔍",
                                    },
                                    {
                                        title: "Manual Correction",
                                        description: "Edit extracted text directly when needed",
                                        icon: "✏️",
                                    },
                                    {
                                        title: "Multi-page Support",
                                        description: "Process multiple pages in documents",
                                        icon: "📄",
                                    },
                                ].map((tool, idx) => (
                                    <div
                                        key={idx}
                                        className="p-5 border rounded-lg hover:shadow-md transition-shadow border-gray-200"
                                    >
                                        <div className="text-3xl mb-3">{tool.icon}</div>
                                        <h4 className="font-semibold text-lg">{tool.title}</h4>
                                        <p className="text-gray-600 mt-1">{tool.description}</p>
                                    </div>
                                ))}
                            </div>

                            <h3 className="mt-10">Advanced Features</h3>
                            <div className="mt-4 p-5 bg-purple-50 rounded-lg border border-purple-200">
                                <h4 className="font-semibold text-purple-800">Batch Processing</h4>
                                <p className="text-purple-700 mt-2">
                                    Upgrade to Pro to process multiple files simultaneously with our batch processing feature.
                                </p>
                            </div>
                        </section>

                        {/* Processing Data */}
                        <section id="processing" className="scroll-mt-24">
                            <h2 className="text-2xl font-bold mb-4 text-gray-900">
                                Processing Data
                            </h2>
                            <p>Once you've annotated your document, you can process the data for extraction.</p>

                            <h3>Processing Steps</h3>
                            <ol className="list-decimal pl-6 space-y-2">
                                <li>Review all your annotation boxes</li>
                                <li>Click the "Process Image" button</li>
                                <li>Wait for the extraction to complete</li>
                                <li>Review the results table</li>
                            </ol>

                            <div className="mt-6 bg-gray-50 p-5 rounded-lg border border-gray-200">
                                <h4 className="font-semibold">Understanding Results</h4>
                                <p className="mt-3">
                                    The results table shows:
                                </p>
                                <ul className="list-disc pl-6 mt-2 space-y-1">
                                    <li>Extracted text content</li>
                                    <li>Confidence score (how accurate the extraction was)</li>
                                    <li>Position coordinates of each extraction</li>
                                </ul>
                            </div>
                        </section>

                        {/* Exporting Results */}
                        <section id="exporting" className="scroll-mt-24">
                            <h2 className="text-2xl font-bold mb-4 text-gray-900">
                                Exporting Results
                            </h2>
                            <p>Export your extracted data in various formats for use in other applications.</p>

                            <h3>Supported Export Formats</h3>
                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                {[
                                    { name: "CSV", desc: "Spreadsheet format", icon: "📊" },
                                    { name: "JSON", desc: "Structured data format", icon: "🔣" },
                                    { name: "TXT", desc: "Plain text", icon: "📝" },
                                    { name: "XML", desc: "Markup format", icon: "📑" },
                                    { name: "PDF", desc: "Portable Document", icon: "📄" },
                                    { name: "Excel", desc: "Microsoft Excel", icon: "📈" },
                                ].map((format, i) => (
                                    <div
                                        key={i}
                                        className="border rounded-lg p-4 flex items-center space-x-4 border-gray-200"
                                    >
                                        <span className="text-3xl">{format.icon}</span>
                                        <div>
                                            <h4 className="font-medium">{format.name}</h4>
                                            <p className="text-sm text-gray-600">{format.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <h3 className="mt-10">Export Steps</h3>
                            <ol className="list-decimal pl-6 space-y-2">
                                <li>Click the "Export" button in the results panel</li>
                                <li>Select your desired format</li>
                                <li>Choose to download or copy to clipboard</li>
                            </ol>
                        </section>

                        {/* FAQ */}
                        <section id="faq" className="scroll-mt-24">
                            <h2 className="text-2xl font-bold mb-4 text-gray-900">
                                Frequently Asked Questions
                            </h2>
                            <div className="space-y-8">
                                {[
                                    {
                                        question: "How accurate is the text extraction?",
                                        answer:
                                            "Accuracy depends on image quality. Clear, high-resolution images typically achieve 95%+ accuracy. Handwriting and low-quality scans may require manual correction.",
                                    },
                                    {
                                        question: "Is my data stored on your servers?",
                                        answer:
                                            "For free users, files are processed temporarily and deleted after 24 hours. Paid plans offer longer storage options.",
                                    },
                                    {
                                        question: "Can I process handwritten text?",
                                        answer:
                                            "Basic handwriting is supported, but accuracy varies. For best results, use clear printed text.",
                                    },
                                    {
                                        question: "What's the difference between free and paid plans?",
                                        answer:
                                            "Free has limited daily processing and basic features. Paid plans offer batch processing, API access, and priority support.",
                                    },
                                ].map((faq, idx) => (
                                    <div
                                        key={idx}
                                        className="border-b pb-6 last:border-b-0 border-gray-200"
                                    >
                                        <h3 className="font-semibold text-lg">{faq.question}</h3>
                                        <p className="mt-2 text-gray-600">{faq.answer}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Documentation;
