import Image from "next/image";
import Reveal from "../components/Reveal";
import { fetchPinnedRepos } from "../lib/github";
import Timeline from "../components/Timeline";
import LazyBored from "../components/LazyBored";

export default async function HomePage() {
    const pinned = await fetchPinnedRepos("acsahl", { first: 6 }).catch(() => []);
    const experience = [
        { title: "Applied Technology Intern", subtitle: "Bank of New York Mellon", period: "Aug 2025 - Present", description: "Collaborating with team to handle an maintain internal applications" },
        { title: "Undergraduate Teaching Assistant", subtitle: "University of Central Florida", period: "Jan 2025 - Present", description: "Teaching students on Data Structures and Algorithms in C as well as an Intro to C class" },
        { title: "Software Engineering and UX/UI Intern", subtitle: "Life Stages", period: "Jun 2025 - Aug 2025", description: "Developed wireframes to revitalize the Life Stages app" },
        { title: "IT Analyst", subtitle: "Foundation Parnters", period: "Jun 2025 - Jul 2025", description: "Solving technical intern issues for employees within the company." },
    ];

    return (
        <main className="min-h-screen">
            {/* Hero with colorful radial gradients */}
            <section className="relative overflow-hidden">
                <div className="pointer-events-none absolute inset-0 -z-10" style={{
                    background:
                        "radial-gradient(40rem 16rem at 20% 0%, rgba(251,146,60,0.15), transparent)," +
                        "radial-gradient(50rem 20rem at 80% 10%, rgba(59,130,246,0.15), transparent)," +
                        "radial-gradient(35rem 14rem at 50% 0%, rgba(251,191,36,0.12), transparent)"
                }} />
                <div className="container relative flex min-h-[70vh] flex-col items-center justify-center gap-6 text-center">
                    <Reveal>
                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900">Acsah Lukose</h1>
                            <p className="section-subtitle mx-auto">
                                A junior at UCF interested in software development and design.
                            </p>
                        </div>
                    </Reveal>
                    <Reveal>
                        <a
                            href="#github"
                            className="inline-block rounded-md bg-gray-900 px-5 py-3 text-white shadow-sm transition hover:bg-gray-800 hover:shadow-md"
                        >
                            View GitHub Pins
                        </a>
                    </Reveal>
                </div>
            </section>

            {/* GitHub pinned repos */}
            <section id="github" className="container py-16 md:py-24">
                <Reveal className="mb-6">
                    <h2 className="section-title">Pinned on GitHub</h2>
                    <p className="section-subtitle mt-2">Highlighted repositories from acsahl</p>
                </Reveal>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {pinned.map((repo: any) => (
                        <Reveal key={repo.id}>
                            <a href={repo.url} target="_blank" rel="noreferrer" className="block rounded-lg border border-orange-100 bg-white p-4 transition hover:-translate-y-[2px] hover:border-orange-200 hover:shadow-lg hover:shadow-orange-50">
                                <div className="flex items-start justify-between gap-4">
                                    <h3 className="font-semibold text-gray-900">{repo.name}</h3>
                                    {repo.primaryLanguage && (
                                        <span className="flex items-center gap-2 text-xs text-gray-700">
                                            <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: repo.primaryLanguage.color }} />
                                            {repo.primaryLanguage.name}
                                        </span>
                                    )}
                                </div>
                                <p className="mt-2 text-sm text-gray-600 line-clamp-3">{repo.description || 'No description'}</p>
                                <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                                    <span>★ {repo.stargazerCount}</span>
                                    <span>⑂ {repo.forkCount}</span>
                                </div>
                            </a>
                        </Reveal>
                    ))}
                    {pinned.length === 0 && (
                        <p className="text-sm text-gray-600">Add GITHUB_TOKEN in .env.local to enable pinned repositories.</p>
                    )}
                </div>
            </section>

            {/* Experience Timeline */}
            <section id="experience" className="container py-16 md:py-24">
                <Reveal className="mb-6">
                    <h2 className="section-title">Experience</h2>
                    <p className="section-subtitle mt-2">A quick look at my roles</p>
                </Reveal>
                <Timeline items={experience} />
            </section>

            {/* Lazy Bored Activity */}
            <section className="container pb-16">
                <Reveal className="mb-6">
                    <h2 className="section-title">A Little Something Extra</h2>
                    <p className="section-subtitle mt-2">Loaded only when you reach here</p>
                </Reveal>
                <LazyBored />
            </section>

            {/* About with colorful radial gradients */}
            <section id="about" className="relative overflow-hidden">
                <div className="pointer-events-none absolute inset-0 -z-10" style={{
                    background:
                        "radial-gradient(30rem 12rem at 10% 0%, rgba(251,191,36,0.12), transparent)," +
                        "radial-gradient(35rem 14rem at 90% 0%, rgba(59,130,246,0.15), transparent)," +
                        "radial-gradient(40rem 16rem at 50% 120%, rgba(59,130,246,0.10), transparent)"
                }} />
                <div className="container relative py-16 md:py-24">
                    <Reveal className="mb-4">
                        <h2 className="section-title">About Me</h2>
                    </Reveal>
                    <Reveal>
                        <p className="section-subtitle">
                            I'm a developer with a passion for building clean, user-focused experiences. This is placeholder text—replace it with a short bio about your background, skills, and interests. Keep it concise and friendly.
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-orange-100">
                <div className="container flex flex-col items-center justify-between gap-3 py-8 text-sm text-gray-600 md:flex-row">
                    <Reveal>
                        <p>© {new Date().getFullYear()} Your Name. All rights reserved.</p>
                    </Reveal>
                    <Reveal>
                        <nav className="flex items-center gap-4">
                            <a href="#" className="hover:text-orange-600 transition-colors">LinkedIn</a>
                            <a href="#" className="hover:text-orange-600 transition-colors">GitHub</a>
                            <a href="#about" className="hover:text-orange-600 transition-colors">About</a>
                        </nav>
                    </Reveal>
                </div>
            </footer>
        </main>
    );
}
