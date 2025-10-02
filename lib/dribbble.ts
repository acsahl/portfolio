export type DribbbleShot = {
    id: number;
    html_url: string;
    title: string;
    images: { hidpi?: string; normal?: string; teaser?: string };
    published_at: string;
};

export async function fetchDribbbleShots(token: string, opts?: { perPage?: number }) {
    const perPage = opts?.perPage ?? 6;
    const res = await fetch(`https://api.dribbble.com/v2/user/shots?per_page=${perPage}`, {
        headers: { Authorization: `Bearer ${token}` },
        next: { revalidate: 300 },
    });
    if (!res.ok) throw new Error(`Dribbble API error: ${res.status}`);
    const data: DribbbleShot[] = await res.json();
    return data;
}
