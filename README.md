# Jakub Kierznowski, portfolio

Cyberpunk-themed personal portfolio: digital rain, boot sequence, glitch
effects, and an interactive terminal (press <code>`</code> on the site or the
`>_` button in the navbar, try `sudo hire_me`).

> Styled after **Cyberpunk 2077**: yellow/cyan/red palette, Rajdhani HUD
> type, clipped-corner UI, an optics HUD frame, periodic RELIC malfunction
> bursts, and a **playable Breach Protocol minigame** (the CP2077 hacking
> puzzle: solve daemons to unlock the CV and contact links).

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
├── data/content.ts        # ALL site text/links, edit content here only
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

[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) runs
`npm ci && npm run build` on every push to `main` and publishes `dist/` to
Pages, so the live site at `https://qualv13.github.io` is whatever is on the
default branch.

Forking this for a project repo under a subpath means setting
`base: "/repo-name/"` in `vite.config.ts`; a user page like this one needs no
base.

## Updating content

Everything a recruiter reads lives in [`src/data/content.ts`](src/data/content.ts):
experience entries, projects, skills, achievements, education and contact
links. To refresh the CV, replace `public/cv/Jakub-Kierznowski-CV.pdf`.

## Licence

The code is MIT, see [LICENSE](LICENSE). Take the components, the effects, the
Breach Protocol minigame, whatever is useful.

The content is not. The text in `src/data/content.ts`, the CV in `public/cv/`
and the photographs describe a specific person, and MIT would let anyone
republish them as their own. Swap `content.ts` for your own before deploying a
fork.
