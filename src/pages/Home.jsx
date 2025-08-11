import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative z-10 bg-white pt-12 sm:pt-16 md:pt-20 lg:flex lg:items-center lg:pt-28 xl:pt-32 pb-10">
                        {/* Left Text Content */}
                        <main className="lg:w-1/2">
                            <div className="text-center lg:text-left">
                                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                                    <span className="block">Extract Text with</span>
                                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                                        Precision
                                    </span>
                                </h1>
                                <p className="mt-4 pr-4 text-base text-gray-500 sm:mt-6 sm:text-lg md:text-xl">
                                    Transform your images into structured data with our advanced annotation tools. Perfect for developers, researchers, and businesses.
                                </p>
                                <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4 sm:gap-6 items-center">
                                    <button
                                        onClick={() => navigate('/editor')}
                                        className="w-full sm:w-auto inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition md:py-4 md:text-lg md:px-10"
                                    >
                                        Try Demo Editor
                                    </button>

                                    <button
                                        onClick={() => navigate('/docs')}
                                        className="w-full sm:w-auto inline-flex justify-center items-center px-6 py-3 border border-purple-300 text-purple-700 bg-purple-100 hover:bg-purple-200 rounded-md text-base font-medium transition md:py-4 md:text-lg md:px-10"
                                    >
                                        View Documentation
                                    </button>
                                </div>
                            </div>
                        </main>

                        {/* Right Image Content */}
                        <div className="mt-10 lg:mt-0 lg:w-1/2 flex justify-center items-center">
                            <img
                                src="https://miro.medium.com/v2/resize:fit:1100/format:webp/1*hVxkXe35kRcAht3QpJylyg.gif"
                                alt="Image annotation example"
                                className="rounded-lg shadow-lg max-w-full h-auto"
                                style={{ maxHeight: '500px' }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:text-center mb-12">
                        <h2 className="text-base text-purple-600 font-semibold tracking-wide uppercase">Features</h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            A better way to extract data
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                name: 'Intuitive Editor',
                                description: 'Our drag-and-drop interface makes annotation simple and efficient.',
                                icon: '✏️'
                            },
                            {
                                name: 'AI Assistance',
                                description: 'Smart suggestions help you annotate faster and more accurately.',
                                icon: '🤖'
                            },
                            {
                                name: 'Team Collaboration',
                                description: 'Work together in real-time with your team members.',
                                icon: '👥'
                            },
                            {
                                name: 'Export Formats',
                                description: 'Export your data in multiple formats including JSON, CSV, and XML.',
                                icon: '📤'
                            },
                            {
                                name: 'Version Control',
                                description: 'Track changes and revert to previous versions when needed.',
                                icon: '🔄'
                            },
                            {
                                name: 'API Access',
                                description: 'Integrate directly with your existing workflows using our API.',
                                icon: '🔌'
                            }
                        ].map((feature) => (
                            <div key={feature.name} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow h-full">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 bg-purple-100 rounded-md p-3 text-purple-600 text-2xl">
                                        {feature.icon}
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-medium text-gray-900">{feature.name}</h3>
                                        <p className="mt-2 text-sm text-gray-500">{feature.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
