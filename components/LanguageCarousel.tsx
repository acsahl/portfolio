'use client';

import { useEffect, useRef, useState } from 'react';

const languages = [
    "Python", "C", "JavaScript", "Java", "SQL", "HTML", "CSS", "JSON", "PHP"
];

export default function LanguageCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const carouselRef = useRef<HTMLDivElement>(null);
    const startX = useRef(0);
    const currentX = useRef(0);
    const isDragging = useRef(false);

    const nextSlide = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex((prev) => (prev + 1) % languages.length);
        setTimeout(() => setIsTransitioning(false), 300);
    };

    const prevSlide = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex((prev) => (prev - 1 + languages.length) % languages.length);
        setTimeout(() => setIsTransitioning(false), 300);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        startX.current = e.touches[0].clientX;
        isDragging.current = true;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging.current) return;
        currentX.current = e.touches[0].clientX;
        const diffX = startX.current - currentX.current;

        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
            isDragging.current = false;
        }
    };

    const handleTouchEnd = () => {
        isDragging.current = false;
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        startX.current = e.clientX;
        isDragging.current = true;
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging.current) return;
        currentX.current = e.clientX;
        const diffX = startX.current - currentX.current;

        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
            isDragging.current = false;
        }
    };

    const handleMouseUp = () => {
        isDragging.current = false;
    };

    // Auto-advance slides
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full max-w-md mx-auto">
            {/* Carousel Container */}
            <div
                ref={carouselRef}
                className="relative overflow-hidden rounded-lg bg-white shadow-lg"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                {/* Slides */}
                <div
                    className="flex transition-transform duration-300 ease-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {languages.map((language, index) => (
                        <div
                            key={language}
                            className="w-full flex-shrink-0 flex items-center justify-center p-8"
                        >
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                    {language}
                                </h3>
                                <div className="w-16 h-1 bg-gradient-to-r from-orange-400 to-blue-400 mx-auto rounded-full"></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Navigation Arrows */}
                <button
                    onClick={prevSlide}
                    disabled={isTransitioning}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-all duration-200 hover:scale-110 disabled:opacity-50"
                >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <button
                    onClick={nextSlide}
                    disabled={isTransitioning}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-all duration-200 hover:scale-110 disabled:opacity-50"
                >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-4 space-x-2">
                {languages.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            if (!isTransitioning) {
                                setIsTransitioning(true);
                                setCurrentIndex(index);
                                setTimeout(() => setIsTransitioning(false), 300);
                            }
                        }}
                        className={`w-2 h-2 rounded-full transition-all duration-200 ${index === currentIndex
                                ? 'bg-orange-500 w-6'
                                : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                    />
                ))}
            </div>

            {/* Swipe Instructions */}
            <p className="text-center text-sm text-gray-500 mt-2">
                Swipe or use arrows to navigate
            </p>
        </div>
    );
}
