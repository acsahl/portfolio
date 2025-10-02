'use client';

import { useEffect, useRef, useState } from 'react';

export type TimelineItem = {
    title: string;
    subtitle?: string;
    period?: string;
    description?: string;
};

type TimelineProps = {
    items: TimelineItem[];
};

export default function Timeline({ items }: TimelineProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const lineRef = useRef<HTMLDivElement | null>(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const handleScroll = () => {
            const rect = el.getBoundingClientRect();
            const viewHeight = window.innerHeight;
            const start = Math.max(0, viewHeight * 0.15);
            const end = Math.max(1, rect.height - viewHeight * 0.15);
            const scrolled = Math.min(Math.max(start - rect.top, 0), end);
            const ratio = Math.min(Math.max(scrolled / end, 0), 1);
            setProgress(ratio);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    const progressStyle = {
        height: `${Math.round(progress * 100)}%`,
    } as React.CSSProperties;

    return (
        <div ref={containerRef} className="relative">
            {/* rail */}
            <div className="absolute left-4 top-0 h-full w-[2px] bg-gray-200 md:left-1/2 md:-translate-x-1/2" />
            {/* progress */}
            <div ref={lineRef} className="absolute left-[calc(1rem-1px)] top-0 w-[2px] bg-gray-900 transition-[height] duration-300 md:left-1/2 md:-translate-x-1/2" style={progressStyle} />

            <div className="space-y-10 md:space-y-14">
                {items.map((it, idx) => (
                    <div key={idx} className="relative pl-10 md:pl-0">
                        {/* dot */}
                        <div className="absolute left-4 top-1 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-white bg-gray-900 shadow md:left-1/2" />
                        <div className="md:grid md:grid-cols-2 md:gap-10">
                            <div className={`md:text-right ${idx % 2 === 1 ? 'md:order-2 md:text-left' : ''}`}>
                                <h3 className="font-semibold text-gray-900">{it.title}</h3>
                                {it.subtitle && <div className="text-sm text-gray-600">{it.subtitle}</div>}
                            </div>
                            <div className={`${idx % 2 === 1 ? 'md:order-1' : ''}`}>
                                {it.period && <div className="text-sm text-gray-500">{it.period}</div>}
                                {it.description && <p className="mt-1 text-sm text-gray-600">{it.description}</p>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
