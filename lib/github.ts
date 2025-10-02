export type GitHubRepo = {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    stargazers_count: number;
    forks_count: number;
    language: string | null;
    updated_at: string;
};

export async function fetchUserRepos(username: string, opts?: { perPage?: number }) {
    const perPage = opts?.perPage ?? 6;
    const headers: Record<string, string> = {
        Accept: 'application/vnd.github+json',
    };
    if (process.env.GITHUB_TOKEN) {
        headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=${perPage}`, {
        headers,
        // GitHub recommends conditional requests; kept simple here
        next: { revalidate: 300 },
    });
    if (!res.ok) {
        return [];
    }
    const data: GitHubRepo[] = await res.json();
    return data;
}

export type PinnedRepo = {
    id: string;
    name: string;
    description: string | null;
    url: string;
    stargazerCount: number;
    forkCount: number;
    primaryLanguage: { name: string; color: string } | null;
};

export async function fetchPinnedRepos(username: string, opts?: { first?: number }) {
    const first = opts?.first ?? 6;
    if (!process.env.GITHUB_TOKEN) {
        // For static export or local builds without token, just return empty
        return [];
    }
    const res = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
        body: JSON.stringify({
            query: `
        query($login: String!, $first: Int!) {
          user(login: $login) {
            pinnedItems(first: $first, types: REPOSITORY) {
              nodes {
                ... on Repository {
                  id
                  name
                  description
                  url
                  stargazerCount
                  forkCount
                  primaryLanguage { name color }
                }
              }
            }
          }
        }
      `,
            variables: { login: username, first },
        }),
        next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    const nodes = json?.data?.user?.pinnedItems?.nodes ?? [];
    return nodes as PinnedRepo[];
}