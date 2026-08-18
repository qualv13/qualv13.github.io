---
name: cv-ats-rebuild
description: "How the CV under public/cv/ is built, exported and routed (08.2026)"
metadata:
  node_type: memory
  type: project
---

The CV is authored as HTML and exported to PDF, so that it parses top-down for
applicant tracking systems while still looking two-column on paper.

Layout:
- `public/cv/source.html` — the CV document. Markup order **is** reading order:
  the left rail sits after its heading and is pulled left with `grid-column`.
  To move something visually change `grid-column`, never reorder the markup.
  `?ats` renders it as a plain single column.
- `public/cv/index.html` — the viewer at `/cv/`, embedding the PDF via
  `<object type="application/pdf">` at `#zoom=100`.
- `public/cv/Jakub-Kierznowski-CV.pdf` — the ATS export (`?ats`), 2 pages.

Routing: the navbar `./CV` opens `profile.cvPage` = `cv/index.html`; the
`download_cv` buttons in Hero, Contact, Breach Protocol and the terminal still
point at `profile.cvFile`. `cvPage` is spelled out to `index.html` on purpose —
Vite's dev server has no directory index for `public/`, so a bare `cv/` falls
through to the SPA locally, even though GitHub Pages resolves it fine.

Two export traps, both found the hard way:
- Outfit must load at **one weight** with `font-kerning:none`. Its 500/600/700
  subsets emit no extractable spaces in Chrome's PDF export, which turned
  "Software Developer Intern" into a single unsearchable word.
- In the print dialog margins must be **Default**, not None. "None" zeroes the
  `@page` margins, so continuation pages lose their 14 mm top gap.

Verify an export with three independent engines before trusting it — MuPDF,
pdfminer.six and Xpdf share no code, so agreement between them means something:
check heading names survive, that IBM is the first employer in the text, that
the URLs appear as literal text, and that no words are glued together.
