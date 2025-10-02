# Portfolio Site (Next.js 13 + TailwindCSS)

A minimal, modern personal portfolio using Next.js App Router and TailwindCSS.

## Getting Started

1. Install dependencies:
```bash
npm i # or pnpm i / yarn
```
2. Run the dev server:
```bash
npm run dev # or pnpm dev / yarn dev
```
3. Open `http://localhost:3000`.

## GitHub Pinned Repos
The homepage shows your pinned GitHub repositories (via GraphQL).

- Set your token in `.env.local`:
```bash
GITHUB_TOKEN=ghp_xxx
```
- Change the username in `app/page.tsx` if needed (currently `acsahl`).

Note: Pinned repos require a token; public REST API can't fetch them directly.

## Customization
- Update text in `app/page.tsx` and metadata in `app/layout.tsx`.
- Replace placeholder project images/links in `projects` array in `app/page.tsx`.
- Tailwind tokens live in `app/globals.css` and `tailwind.config.ts`.
- Update image domains in `next.config.js` if you use other hosts.

## Build
```bash
npm run build && npm start
```

## Restart dev server
```bash
# In the project folder
Ctrl+C            # stop current dev server
npm run dev       # start again
```
If you change `.env.local`, fully stop then re-run dev.
