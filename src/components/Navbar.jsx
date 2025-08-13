import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Docs', path: '/docs' },
        { name: 'Pricing', path: '/pricing' },
        { name: 'Contact', path: '/contact' },
        { name: 'Try Editor!', path: '/editor' },
    ];

    // Placeholder function for theme toggle - you'll implement this later
    const toggleTheme = () => {
        console.log('Theme toggle clicked');
        // You'll implement the actual theme switching logic here later
    };

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100 ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
                        <img
                            src="/logo.png"
                            alt="Textract Logo"
                            className="h-8 w-auto mr-2"
                        />
                        <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                            Textract
                        </span>
                    </div>

                    {/* Desktop Navigation - Centered */}
                    <div className="hidden md:flex md:items-center md:justify-center md:flex-1">
                        <div className="flex space-x-8">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.name}
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `px-1 py-2 text-sm font-medium transition-colors duration-200 ${isActive
                                            ? 'text-purple-600  border-b-2 border-purple-500  font-semibold'
                                            : 'text-gray-600  hover:text-purple-500  hover:border-b-2 hover:border-purple-300 '
                                        }`
                                    }
                                >
                                    {item.name}
                                </NavLink>
                            ))}
                        </div>
                    </div>

                    {/* Right-side actions (Theme toggle) */}
                    <div className="flex items-center space-x-4">
                        {/* Theme Toggle Button */}
                        <button
                            onClick={toggleTheme}
                            className="hidden md:flex items-center justify-center p-2 rounded-full text-gray-600  hover:bg-gray-100  focus:outline-none transition-colors"
                            aria-label="Toggle theme"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
                            </svg>
                        </button>

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-500  hover:text-gray-700  hover:bg-gray-100 focus:outline-none"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {mobileMenuOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-white  shadow-lg">
                    <div className="pt-2 pb-4 space-y-1 px-4">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                className={({ isActive }) =>
                                    `block px-3 py-3 rounded-md text-base font-medium ${isActive
                                        ? 'bg-purple-50  text-purple-600 '
                                        : 'text-gray-600  hover:bg-gray-50  hover:text-purple-500 '
                                    }`
                                }
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item.name}
                            </NavLink>
                        ))}
                        {/* Mobile Theme Toggle Button */}
                        <button
                            onClick={toggleTheme}
                            className="w-full flex items-center px-3 py-3 rounded-md text-base font-medium text-gray-600  hover:bg-gray-50 "
                        >
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
                            </svg>
                            Toggle Theme
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}