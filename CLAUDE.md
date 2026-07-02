# CLAUDE.md

Personal portfolio of Jakub Kierznowski (qualv13) — React 19 + Vite 7 +
Tailwind CSS 4 + Framer Motion. Deploys to https://qualv13.github.io via
GitHub Actions on every push to `main`.

## Session context

Read `.claude/memory/` first — it holds project state and user preferences
carried over from previous AI sessions. Keep those files updated when
decisions change.

## Hard rules

- Git commits: the repo owner is the only author. **Never add AI
  co-author / Co-Authored-By lines.**
- All site text lives in `src/data/content.ts` — components only render
  data. Edit content there, not in components.
- This repo is public: no secrets, no tokens, and the owner's phone number
  stays off the site and out of the repo.

## Commands

- `npm run dev` — dev server at http://localhost:5173 (archived design
  drafts at `?draft=aurora` / `?draft=light`)
- `npm run build` — type-check + production build; must pass before pushing
