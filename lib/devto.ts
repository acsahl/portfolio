export type DevtoPost = {
    id: number;
    title: string;
    description: string;
    url: string;
    published_at: string;
    positive_reactions_count: number;
    tag_list: string[] | string;
    cover_image: string | null;
};

export async function fetchDevtoPosts(username: string, opts?: { perPage?: number }) {
    const perPage = opts?.perPage ?? 6;
    const res = await fetch(`https://dev.to/api/articles?username=${username}&per_page=${perPage}`, {
        next: { revalidate: 300 },
    });
    if (!res.ok) throw new Error(`Dev.to API error: ${res.status}`);
    const data: DevtoPost[] = await res.json();
    return data;
}
