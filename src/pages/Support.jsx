import React, { useEffect } from 'react';

const Support = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);
    return (
        <div className="min-h-screen bg-white py-16 px-6 sm:px-10 lg:px-20">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 text-center mb-6">
                    We’re Here to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Help</span>
                </h1>
                <p className="text-lg text-gray-700 text-center mb-10">
                    Whether it's a technical issue, billing question, or feedback — our support team is here to ensure your experience with Textract is seamless.
                </p>

                <div className="grid gap-8 sm:grid-cols-2">
                    <div className='rounded border-1 border-gray-300 hover:border-gray-500 p-4'>
                        <h2 className="text-xl font-semibold text-purple-600 mb-2">📘 Documentation</h2>
                        <p className="text-gray-600 mb-2">Get started quickly using our API and editor with comprehensive guides.</p>
                        <a href="/docs" className="text-purple-600 font-medium hover:underline">Go to Docs →</a>
                    </div>

                    <div className='rounded border-1 border-gray-300 hover:border-gray-500 p-4'>
                        <h2 className="text-xl font-semibold text-purple-600 mb-2">💬 Community</h2>
                        <p className="text-gray-600 mb-2">Join our Discord or forum to connect with developers and get peer help.</p>
                        <a href="#" className="text-purple-600 font-medium hover:underline">Join Community →</a>
                    </div>

                    <div className='rounded border-1 border-gray-300 hover:border-gray-500 p-4'>
                        <h2 className="text-xl font-semibold text-purple-600 mb-2">🛠 Technical Support</h2>
                        <p className="text-gray-600 mb-2">Found a bug or need technical help? Our engineers are standing by.</p>
                        <a href="mailto:support@textract.com" className="text-purple-600 font-medium hover:underline">Email Support →</a>
                    </div>

                    <div className='rounded border-1 border-gray-300 hover:border-gray-500 p-4'>
                        <h2 className="text-xl font-semibold text-purple-600 mb-2">💼 Business Inquiries</h2>
                        <p className="text-gray-600 mb-2">For partnership or enterprise deals, talk to our business team.</p>
                        <a href="/contact" className="text-purple-600 font-medium hover:underline">Contact Us →</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Support;
