'use client';

import { useEffect, useRef, useState } from 'react';

type Activity = {
    activity: string;
    availability: number;
    type: string;
    participants: number;
    price: number;
    accessibility: string;
    duration: string;
    kidFriendly: boolean;
    link?: string;
    key: string;
};

export default function LazyBored() {
    const ref = useRef<HTMLDivElement | null>(null);
    const [hasTriggered, setHasTriggered] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<Activity | null>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasTriggered) {
                        setHasTriggered(true);
                    }
                });
            },
            { threshold: 0.15 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [hasTriggered]);

    useEffect(() => {
        if (!hasTriggered) return;
        let cancelled = false;
        const run = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch('/api/bored', { cache: 'no-store' });
                if (!res.ok) throw new Error('Failed to fetch activity');
                const json = (await res.json()) as Activity;
                if (!cancelled) setData(json);
            } catch (e: any) {
                if (!cancelled) setError(e?.message || 'Error');
            } finally {
                if (!cancelled) setLoading(false);
            }
        };
        run();
        return () => {
            cancelled = true;
        };
    }, [hasTriggered]);

    const refresh = async () => {
        setHasTriggered(true);
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`/api/bored?t=${Date.now()}`, { cache: 'no-store' });
            if (!res.ok) throw new Error('Failed to fetch activity');
            const json = (await res.json()) as Activity;
            setData(json);
        } catch (e: any) {
            setError(e?.message || 'Error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div ref={ref} className="overflow-hidden rounded-xl border border-blue-100 bg-white p-5 shadow-sm">
            <div className="mb-2 text-sm font-medium text-blue-700">Feeling bored? Try this:</div>
            {loading && (
                <div className="animate-pulse space-y-2">
                    <div className="h-4 w-3/4 rounded bg-blue-100" />
                    <div className="h-3 w-1/2 rounded bg-blue-50" />
                </div>
            )}
            {error && <div className="text-sm text-red-600">{error}</div>}
            {!loading && !error && data && (
                <div>
                    <p className="text-base font-semibold text-gray-900">{data.activity}</p>
                    <div className="mt-1 text-xs text-gray-600 capitalize">
                        Type: {data.type} · Participants: {data.participants} · Duration: {data.duration}
                        {data.kidFriendly && <span className="ml-2 text-green-600">👶 Kid-friendly</span>}
                    </div>
                    {data.link ? (
                        <a href={data.link} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm text-blue-700 underline">Learn more</a>
                    ) : null}
                </div>
            )}
            <div className="mt-4">
                <button onClick={refresh} className="rounded-md border border-blue-200 px-3 py-1.5 text-sm text-blue-700 transition hover:bg-blue-50">New idea</button>
            </div>
        </div>
    );
}
