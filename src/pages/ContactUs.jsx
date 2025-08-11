import React, { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';

const ContactUs = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);
    const formRef = useRef();
    const [loading, setLoading] = useState(false);

    const sendEmail = (e) => {
        e.preventDefault();
        setLoading(true);

        emailjs.sendForm(
            import.meta.env.VITE_REACT_APP_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_REACT_APP_EMAILJS_TEMPLATE_ID,
            formRef.current,
            import.meta.env.VITE_REACT_APP_EMAILJS_PUBLIC_KEY
        ).then(
            (result) => {
                setLoading(false);
                Swal.fire({
                    icon: 'success',
                    title: 'Message Sent!',
                    text: 'We received your message. Our team will get back to you shortly.',
                    confirmButtonColor: '#6366f1', // Purple-500
                });
                formRef.current.reset(); // Clear form after send
            },
            (error) => {
                setLoading(false);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong. Please try again later.',
                    confirmButtonColor: '#ef4444', // Red-500
                });
                console.error('EmailJS Error:', error.text);
            }
        );
    };

    return (
        <div className="min-h-screen bg-white py-16 px-6 sm:px-10 lg:px-20">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 text-center">
                    Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Touch</span>
                </h1>
                <p className="text-lg text-gray-700 text-center mb-10">
                    Have a question, suggestion, or business inquiry? We're always happy to hear from you.
                </p>

                <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name</label>
                        <input
                            type="text"
                            name="user_name"
                            id="name"
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-4 py-2"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input
                            type="email"
                            name="user_email"
                            id="email"
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-4 py-2"
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                        <textarea
                            name="message"
                            id="message"
                            rows="5"
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-4 py-2"
                        ></textarea>
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-md hover:from-purple-700 hover:to-indigo-700 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            {loading ? 'Sending...' : 'Send Message'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ContactUs;
