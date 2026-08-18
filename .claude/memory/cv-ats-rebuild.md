---
name: cv-ats-rebuild
description: "Jakub's CV was rebuilt as HTML for ATS parsing (08.2026) — where it lives, how to export it, what is still open"
metadata: 
  node_type: memory
  type: project
  originSessionId: 7e929b96-5cd4-4bdc-b501-a6b8e035dd89
  modified: 2026-08-18T13:30:24.726Z
---

Jakub was not failing on competence, he was failing on packaging: his Canva CV
carried no URL as text, parsed in the wrong reading order, and listed IBM third.
Rebuilt 2026-08-18 and pushed as commit `8a59391`.

Layout in the repo:
- `public/cv/source.html` — the CV document. Markup order **is** reading order:
  the left rail sits after its heading and is pulled left with `grid-column`.
  Never reorder the markup to move something, change `grid-column`.
  `?ats` renders it as a plain single column.
- `public/cv/index.html` — viewer at `/cv/`, embeds the PDF via
  `<object type="application/pdf">` at `#zoom=100`. The navbar `./CV` opens
  this; the `download_cv` buttons still point at the raw PDF.
- `public/cv/Jakub-Kierznowski-CV.pdf` — the **ATS export** (`?ats`), 2 pages.

Two export traps, both verified the hard way:
- Outfit must load at **one weight** with `font-kerning:none`. Its 500/600/700
  subsets emit no extractable spaces in Chrome's PDF export, so
  "Software Developer Intern" came out as `SoftwareDeveloperIntern`.
- In the print dialog margins must be **Default**, not None. "None" zeroes the
  `@page` margins and continuation pages lose their 14 mm top gap.

Conventions that must survive future edits:
- dates read **"Mon YYYY"** (`Feb 2026 – Present`), not `02.2026`; US-built parsers
  fail to attach a European numeric date to its role and count the tenure as zero
- headings are **PROJECTS** and **SKILLS**, not "My Projects" / "Skill Set"
- **no arrow glyphs inside a job title** ("Team Mentor and Community Leader")
- the education entry keeps V High School as its own row (owner asked)

Verify every export against three engines, not one: MuPDF, pdfminer.six and Xpdf
share no code. Check headings, that IBM is the first employer in the extracted
text, that URLs appear as literal text, and that no words are glued together.

Still open:
- `IoTServerApp` README says "The Maven configuration and dependencies indicate
  support for" above the test list, though 15 real JUnit 5 classes exist; the
  repo also has no `.github/workflows`, so there is no CI badge behind them.

Rewritten again 2026-08-18 against the owner's review list: headline is
**Junior Software Engineer** (not Java-specific), a one-line keyword stack bar
sits under the summary and now carries the ATS keyword load the headline used to,
IBM and InstalDesk are bullets, and **InstalDesk moved out of EXPERIENCE into
PROJECTS** because it has pilot users, not paying ones.

The hours are **off the CV again** (owner's call): the IBM rail says only
`Part-time`. 110 h/month (11/16) is still the true number — it belongs on the
first phone call, not on paper.

See [[user-jakub]], [[portfolio-project-state]] and [[profile-consistency]].
