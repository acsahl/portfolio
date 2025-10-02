export type MediumPost = {
    title: string;
    link: string;
    pubDate: string;
};

export async function fetchMediumRss(feedUrl: string, opts?: { limit?: number }) {
    const limit = opts?.limit ?? 6;
    const res = await fetch(feedUrl, { next: { revalidate: 300 } });
    if (!res.ok) throw new Error(`Medium RSS error: ${res.status}`);
    const xml = await res.text();
    const items = Array.from(xml.matchAll(/<item>([\s\S]*?)<\/item>/g)).slice(0, limit);
    return items.map((match) => {
        const itemXml = match[1];
        const title = (itemXml.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/) || itemXml.match(/<title>(.*?)<\/title>/))?.[1] || "Untitled";
        const link = (itemXml.match(/<link>(.*?)<\/link>/) || itemXml.match(/<guid.*?>(.*?)<\/guid>/))?.[1] || "#";
        const pubDate = (itemXml.match(/<pubDate>(.*?)<\/pubDate>/))?.[1] || "";
        return { title, link, pubDate } as MediumPost;
    });
}
