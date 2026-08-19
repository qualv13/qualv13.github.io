---
name: portfolio-project-state
description: "Jakub's portfolio website — decisions, structure, deployment, and current status"
metadata: 
  node_type: memory
  type: project
  originSessionId: 945c189f-7cc8-44c0-a2d4-15d0ad51b97c
---

Portfolio site for Jakub Kierznowski (Java Software Developer Intern @ IBM, targeting junior→regular roles). Built in `H:\Projects\portfolio_web`.

Stack & decisions (2026-07-02):
- Vite 7 + React 19 + TypeScript + Tailwind CSS 4 + Framer Motion 12
- Cyberpunk theme; English only; all animations respect prefers-reduced-motion
- All content in `src/data/content.ts`. IBM = graph algorithms in Java for Data Lineage (LinkedIn was outdated). Public email jakub.kierznowskiii@gmail.com (triple i); phone stays off the rendered site but is allowed under `public/cv/` — it belongs on a CV (owner's call, 08.2026)
- Aurora + Light design drafts kept in `src/drafts/`, viewable at `?draft=aurora` / `?draft=light`
- `./CV` link in navbar → `public/cv/index.html` (PDF viewer page), **not** the raw
  file; the `download_cv` buttons still point at the PDF. See [[cv-ats-rebuild]]

Deployment:
- GitHub repo **qualv13/qualv13.github.io** (user deleted the old 2023 "Hacker page" repo and recreated). Auth via SSH (id_ed25519, no passphrase, registered 2026-07-02).
- Live at **https://qualv13.github.io** via `.github/workflows/deploy.yml` (Actions build, source set to "GitHub Actions" in Pages settings — required manual toggle).
- Git author is user's own (qualv13); **user asked NOT to add Claude as co-author** — respect on future commits here. [[user-jakub]]

Branches:
- `main` — **the netrunner build is now the live site** (fast-forwarded 2026-07-02 at user's request after review; deploys automatically)
- `netrunner` — the CP2077 restyle branch, now identical to main after fast-forward. Contents: yellow/cyan/red palette, Rajdhani HUD font, clipped-corner UI, HUD frame, RELIC malfunction bursts (backdrop-filter bands, NO page shake — user rejected the translate/skew version), playable Breach Protocol minigame, CP77 favicon, live demo links on all projects (instaldesk.pl, DrugPath at qualv13.github.io/neo4j-agent, iot-frontend-2r8o.onrender.com, hardware-hub-2qc7.onrender.com), achievement proof links (GraphAcademy cert URLs = graphacademy.neo4j.com/c/{credential-id}), age-based RAM gag (born 2004-01-15, capacity = age, 2 reserved for hackathons).

Status: netrunner build merged to main and live; site verified serving built assets + CV. Sections: Hero, About, Experience, Projects (DrugPath/InstalDesk/IoTServerApp/Power-Grid RL/CarCharging/Fit2Beat/hardware-hub), Skills, Achievements+Education, Contact, Footer.

Positioning (19.08.2026): the site was saying **"junior java backend"** in three
hardcoded places — Hero's terminal, Contact's status line and the netdeck
overlay — while the CV had moved to "software engineer who builds products and
the AI inside them". All three now render `profile.openTo`
("junior software engineer · product + applied AI"), and the hero terminal
script moved out of `Hero.tsx` into `content.ts` as `heroTerminalLines`, per the
repo rule that all copy lives in `content.ts`. If the positioning changes again,
`profile.headline` / `tagline` / `availability` / `openTo` are the four strings
to edit, and nothing else should hardcode a role name.

**Memory sync**: these memory files are mirrored into the repo at `H:\Projects\portfolio_web\.claude\memory\` (committed, PUBLIC — no secrets there) per user request, plus a repo-root CLAUDE.md with the hard rules. When updating profile memory for this project, update the repo copies too and commit.
