import React, { useEffect, useState } from 'react';

const gifs = [
    "https://media.tenor.com/0chWb5VggvAAAAAM/pizzaninjas-pizza-ninjas.gif",
    "https://media.tenor.com/FawYo00tBekAAAAM/loading-thinking.gif",
    "https://media.tenor.com/zecVkmevzcIAAAAM/please-wait.gif",
    "https://media.tenor.com/-7LKYbNbLiIAAAAm/vodafone-greece-vodafone.webp"
];

const messages = [
    "Putting on my wizard hat... 🧙‍♂️✨",
    "Brewing some fresh entities... ☕️💻",
    "A little Wait but, magic in progress... ⏳✨",
    "Almost there, don't blink! 👀"
];

const Loader = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % Math.min(gifs.length, messages.length));
        }, 2800);

        document.body.style.overflow = 'hidden';

        return () => {
            clearInterval(interval);
            document.body.style.overflow = '';
        };
    }, []);

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-auto backdrop-blur-xs px-4 bg-transparent">
            <div className="bg-white/90 rounded-xl shadow-xl w-[360px] h-[320px] flex flex-col items-center justify-center space-y-6">
                {/* GIF */}
                <img
                    src={gifs[index]}
                    alt="Loading animation"
                    className="w-32 h-32 object-contain"
                    draggable={false}
                />

                {/* Text with fixed height */}
                <div className="h-6">
                    <p className="text-center text-gray-700 font-semibold select-none text-[16px] leading-tight">
                        {messages[index]}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Loader;
