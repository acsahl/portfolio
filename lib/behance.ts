export type BehanceProject = {
    id: number;
    name: string;
    published_on: number;
    url: string;
    covers: { [k: string]: string };
};

export async function fetchBehanceProjects(user: string, apiKey: string, opts?: { perPage?: number }) {
    const perPage = opts?.perPage ?? 6;
    const res = await fetch(`https://api.behance.net/v2/users/${user}/projects?client_id=${apiKey}&per_page=${perPage}`, {
        next: { revalidate: 300 },
    });
    if (!res.ok) throw new Error(`Behance API error: ${res.status}`);
    const data = await res.json();
    return (data.projects || []) as BehanceProject[];
}
