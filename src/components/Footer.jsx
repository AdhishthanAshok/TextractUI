import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-50 border-t border-gray-200 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

                    {/* Branding */}
                    <div>
                        <Link to="/" className="flex items-center space-x-2">
                            <img src="/logo.png" alt="Textract Logo" className="h-8 w-auto" />
                            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Textract</span>
                        </Link>
                        <p className="mt-4 text-gray-600 text-sm">
                            Intelligent document processing with AI-powered OCR and ICR. Built for developers and businesses.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="text-gray-800 font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><Link to="/" className="hover:text-purple-600">Home</Link></li>
                            <li><Link to="/about" className="hover:text-purple-600">About Us</Link></li>
                            <li><Link to="/pricing" className="hover:text-purple-600">Pricing</Link></li>
                            <li><Link to="/editor" className="hover:text-purple-600">Demo Editor</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-gray-800 font-semibold mb-4">Support</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><Link to="/support" className="hover:text-purple-600">Help Center</Link></li>
                            <li><Link to="/docs" className="hover:text-purple-600">Documentation</Link></li>
                            <li><Link to="/contact" className="hover:text-purple-600">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Social / Contact */}
                    <div>
                        <h4 className="text-gray-800 font-semibold mb-4">Stay Connected</h4>
                        <p className="text-sm text-gray-600 mb-4">Follow us on social media or email us directly.</p>
                        <div className="flex space-x-4">
                            <Link to="/contact" className="text-gray-600 hover:text-purple-600" aria-label="Contact Us">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M16 12H8m8 0l-4 4m4-4l-4-4" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Link>
                            <a href="#" className="text-gray-600 hover:text-purple-600" aria-label="GitHub">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.387.6.113.793-.263.793-.583v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.082-.73.082-.73 1.204.085 1.837 1.236 1.837 1.236 1.07 1.83 2.807 1.302 3.492.995.108-.776.42-1.303.763-1.602-2.665-.3-5.466-1.334-5.466-5.933 0-1.31.468-2.382 1.235-3.222-.124-.302-.535-1.52.118-3.167 0 0 1.007-.322 3.3 1.23a11.44 11.44 0 0 1 3.003-.403c1.02.005 2.045.138 3.003.403 2.29-1.552 3.295-1.23 3.295-1.23.655 1.647.244 2.865.12 3.167.77.84 1.232 1.912 1.232 3.222 0 4.61-2.805 5.63-5.475 5.922.43.372.823 1.102.823 2.222v3.293c0 .322.192.698.8.58C20.565 21.796 24 17.297 24 12c0-6.63-5.373-12-12-12z" />
                                </svg>
                            </a>
                            <a href="#" className="text-gray-600 hover:text-purple-600" aria-label="Twitter">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.43 1a9.28 9.28 0 01-2.88 1.1A4.52 4.52 0 0016.11 0c-2.5 0-4.52 2.01-4.52 4.5 0 .35.04.69.12 1.02-3.76-.2-7.1-1.99-9.34-4.73-.39.66-.61 1.42-.61 2.23 0 1.54.79 2.9 2 3.7A4.48 4.48 0 012 7v.06c0 2.15 1.53 3.95 3.58 4.36-.37.1-.76.15-1.17.15-.28 0-.56-.03-.83-.08.56 1.75 2.17 3.02 4.08 3.06A9.05 9.05 0 012 19.54a12.77 12.77 0 006.92 2.03c8.3 0 12.84-6.87 12.84-12.83 0-.2 0-.39-.01-.58A9.2 9.2 0 0023 3z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-12 border-t pt-6 text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} Textract. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
