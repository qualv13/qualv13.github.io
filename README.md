# Jakub Kierznowski — Portfolio

Cyberpunk-themed personal portfolio: digital rain, boot sequence, glitch
effects, and an interactive terminal (press <code>`</code> on the site or the
`>_` button in the navbar — try `sudo hire_me`).

> **`netrunner` branch** — a Cyberpunk 2077 restyle: yellow/cyan/red
> palette, Rajdhani HUD type, clipped-corner UI, an optics HUD frame,
> periodic RELIC malfunction bursts, and a **playable Breach Protocol
> minigame** (the CP2077 hacking puzzle — solve daemons to unlock the CV
> and contact links). `main` stays the cleaner cyan/magenta version.

## Stack

- [Vite](https://vite.dev) + [React 19](https://react.dev) + TypeScript
- [Tailwind CSS 4](https://tailwindcss.com) for styling
- [Framer Motion](https://motion.dev) for animations

## Development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build to dist/
```

## Structure

```
src/
├── data/content.ts        # ALL site text/links — edit content here only
├── components/
│   ├── ui/                # Section, Tag, NeonButton primitives
│   ├── effects/           # MatrixRain, BootScreen, GlitchText
│   ├── Navbar/Hero/About/Experience/Projects/Skills/Achievements/Contact/Footer
│   └── TerminalOverlay.tsx  # interactive shell easter egg
├── drafts/                # archived design candidates (Aurora, Light)
├── hooks/useTyping.ts     # typewriter effect
├── lib/motion.ts          # shared Framer Motion variants
├── App.tsx                # shell: boot → site, ?draft= routing
└── index.css              # Tailwind theme tokens + custom keyframes
public/
└── cv/Jakub-Kierznowski-CV.pdf   # served at ./cv link in the navbar
```

## Design drafts

Two earlier design directions are kept for reference and viewable live:

- `http://localhost:5173/?draft=aurora`
- `http://localhost:5173/?draft=light`

## Accessibility & performance notes

- All animations respect `prefers-reduced-motion` (rain, boot screen and
  glitch bursts switch off entirely).
- Matrix rain renders at ~20fps on a DPR-capped canvas to stay cheap.
- Content is plain semantic HTML underneath the effects.

## Deployment (GitHub Pages)

1. Create a repo named `qualv13.github.io` and push this project.
2. Add a GitHub Actions workflow that runs `npm ci && npm run build` and
   deploys `dist/` to Pages (or run `npm run build` and publish `dist/`
   manually).
3. Done — site lives at `https://qualv13.github.io`. For a project repo
   under a subpath instead, set `base: "/repo-name/"` in `vite.config.ts`.

## Updating content

Everything a recruiter reads lives in [`src/data/content.ts`](src/data/content.ts):
experience entries, projects, skills, achievements, education and contact
links. To refresh the CV, replace `public/cv/Jakub-Kierznowski-CV.pdf`.
