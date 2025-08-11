import React, { useEffect } from 'react';

const Pricing = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);
    return (
        <div className="min-h-screen bg-white py-16 px-6 sm:px-10 lg:px-20">
            <div className="max-w-5xl mx-auto text-center">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
                    Flexible <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Pricing</span> Plans
                </h1>
                <p className="text-lg text-gray-700 mb-10">
                    Choose a plan that fits your needs. Whether you're a startup, solo developer, or enterprise — Textract is built to scale with you.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                    {/* Starter Plan */}
                    <div className="p-6 rounded-lg shadow border hover:shadow-md transition">
                        <h2 className="text-xl font-bold text-purple-600 mb-2">Starter</h2>
                        <p className="text-gray-700 mb-4">Ideal for developers and small projects just getting started.</p>
                        <ul className="text-sm text-gray-600 space-y-2">
                            <li>✔️ 100 Documents/month</li>
                            <li>✔️ OCR Support</li>
                            <li>✔️ JSON Export</li>
                            <li>❌ Handwriting Recognition</li>
                            <li>❌ API Access</li>
                        </ul>
                        <p className="mt-4 text-purple-700 font-semibold">$19/month</p>
                    </div>

                    {/* Pro Plan */}
                    <div className="p-6 rounded-lg shadow-lg border-2 border-purple-600">
                        <h2 className="text-xl font-bold text-purple-600 mb-2">Pro</h2>
                        <p className="text-gray-700 mb-4">For teams and businesses needing more robust features.</p>
                        <ul className="text-sm text-gray-600 space-y-2">
                            <li>✔️ 2,000 Documents/month</li>
                            <li>✔️ OCR & ICR (Handwriting)</li>
                            <li>✔️ Multiple Export Formats</li>
                            <li>✔️ API Access</li>
                            <li>✔️ Priority Support</li>
                        </ul>
                        <p className="mt-4 text-purple-700 font-semibold">$89/month</p>
                    </div>

                    {/* Enterprise Plan */}
                    <div className="p-6 rounded-lg shadow border hover:shadow-md transition">
                        <h2 className="text-xl font-bold text-purple-600 mb-2">Enterprise</h2>
                        <p className="text-gray-700 mb-4">Custom solutions for large-scale, mission-critical operations.</p>
                        <ul className="text-sm text-gray-600 space-y-2">
                            <li>✔️ Unlimited Documents</li>
                            <li>✔️ OCR, ICR & ML Add-ons</li>
                            <li>✔️ Custom Integrations</li>
                            <li>✔️ SLA & Dedicated Support</li>
                            <li>✔️ On-premise Options</li>
                        </ul>
                        <p className="mt-4 text-purple-700 font-semibold">Contact Us</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
