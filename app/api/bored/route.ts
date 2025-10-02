import { NextResponse } from "next/server";

export async function GET() {
    try {
        const res = await fetch("https://bored-api.appbrewery.com/random", {
            headers: { "User-Agent": "Next.js Server" },
            cache: "no-store",
        });
        if (!res.ok) {
            return NextResponse.json({ error: "Upstream error" }, { status: res.status });
        }
        const data = await res.json();
        return NextResponse.json(data, {
            headers: {
                "Cache-Control": "no-store",
            },
        });
    } catch (e) {
        return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    }
}
