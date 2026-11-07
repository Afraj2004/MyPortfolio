# Afraj Khan — Product Analyst Portfolio

Live: https://myportfolio-ten-rho-99.vercel.app/

Built with Next.js (App Router), React, TypeScript, Tailwind CSS v4 and Framer Motion.

## Structure

- `app/` — layout, page, global styles, Open Graph image
- `components/sections/` — page sections (hero, about, experience, case studies, education, skills, projects, contact)
- `components/motion/` — count-up, SQL terminal and pipeline graph
- `components/gamification/` — Hiring Progress meter and its state
- `components/ui/` — button, card and badge primitives
- `data/content.ts` — all portfolio copy; `data/case-studies.ts` — case study content
- `public/images/` — site images
- `index.html` — redirect for the old GitHub Pages URL

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build
```

Deployed on Vercel from `main`.
