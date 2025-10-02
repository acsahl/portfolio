'use client';

import { useEffect, useRef, useState } from 'react';

type RevealProps = {
    children: React.ReactNode;
    className?: string;
    as?: keyof React.JSX.IntrinsicElements;
    once?: boolean;
    threshold?: number;
};

function classNames(...values: Array<string | false | undefined>) {
    return values.filter(Boolean).join(' ');
}

export default function Reveal({
    children,
    className,
    as: Tag = 'div',
    once = true,
    threshold = 0.15,
}: RevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        if (!ref.current) return;
        const element = ref.current;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setInView(true);
                        if (once) observer.unobserve(entry.target);
                    } else if (!once) {
                        setInView(false);
                    }
                });
            },
            { threshold }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [once, threshold]);

    return (
        <div ref={ref} className={classNames('reveal', inView && 'in-view', className)}>
            {children}
        </div>
    );
}
