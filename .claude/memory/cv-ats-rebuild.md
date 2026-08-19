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

Pagination in ATS mode is tight and the failure is counter-intuitive. One
column runs taller than two, and `.row{break-inside:avoid}` keeps entries whole,
so a row that does not fit leaves the rest of the page empty and shifts
everything after it down. That gap, not the text length, is what spilled the
last GDPR line onto page 3 (08.2026). Fix it by tightening the ATS rhythm
(`html.ats` row/section margins, rail gap, h2 margin, gdpr padding), never by
switching to `break-inside:auto`: that reclaims the gap but **Chrome ignores
`break-after:avoid`**, so the split entry strands its title and stack line at
the foot of the page. There is a comment in the CSS saying so.

Do not eyeball the page count in a print preview, render it:

    chrome.exe --headless=new --disable-gpu --no-pdf-header-footer       --virtual-time-budget=6000 --print-to-pdf=out.pdf       "http://localhost:5173/cv/source.html?ats"

Then assert on the result: two pages, every entry title on the same page as its
own body, page 2 top gap >= 12mm, no glued words, URLs literal. Re-run with
`--host-resolver-rules="MAP fonts.googleapis.com 127.0.0.1,MAP fonts.gstatic.com 127.0.0.1"`
to prove the layout survives the webfont failing to load. Outfit is not
installed locally, so `OutfitThin-Regular` in the embedded font list means the
webfont **did** load -- that is its PostScript name, not a fallback.

Verify every export against three engines, not one: MuPDF, pdfminer.six and Xpdf
share no code. Check headings, that IBM is the first employer in the extracted
text, that URLs appear as literal text, and that no words are glued together.

**The IoTServerApp test claim was false and is gone (19.08.2026).** All 16 test
files under `src/test` exist, but 15 of them are commented out line by line —
commented in the Jan 2026 commit "working online ver". `mvn test` runs exactly
one test, the Spring context check. The CV and the site both claimed "15 JUnit 5
test classes ... integration tests on Testcontainers"; that sentence is removed
from both, Testcontainers moved from Core to Working knowledge, and the repo
README now says the suite is disabled. Do not put the claim back unless the
tests are actually uncommented and green.

Rewritten again 19.08.2026 against a recruitment-simulation review:
- `SUMMARY` heading added over the lead (a real `h2.lead-head`, sized down for
  the masthead, falls back to normal h2 styling in ATS mode)
- algorithms moved from Working knowledge into **Core**, with the concrete
  techniques named; the summary now names DrugPath and CarCharging as the
  evidence
- IBM bullet 1 says what he did and puts NDA in a parenthesis; bullet 2 leads
  with "20 minutes to 4"
- projects cut 7 → 6: `hardware-hub` out (it was the client-named assignment).
  `GGSN` was cut too and then **put back at the owner's request** — its own repo
  README backs every claim in that entry. Fit2Beat now links the live
  `fit2beat.toadres.pl` instead of implying a repo that 404s, InstalDesk is
  marked "closed source"
- keywords added only where verifiable: GitHub Actions (deploy.yml here,
  deploy-pages.yml in neo4j-agent), OOP and design patterns, RabbitMQ/MQTT
  promoted into the stack bar. Boards read "Agile and Kanban on GitHub project
  boards at IBM, Jira before that" — **IBM runs GitHub boards, not Jira**; the
  owner used Jira earlier, so both are named and neither is implied of the
  wrong employer. **Kubernetes, Kafka, microservices and Mockito stay out** —
  nothing backs them, and Mockito is commented out in the only repo that
  imports it
- CarCharging was described wrong everywhere: it finds the cleanest **1–6 h**
  window inside the next 48 h (`hours < 1 || hours > 6`, `now.plusHours(48)`),
  not "a 48-hour window". Fixed in CV, site and repo description

Availability line, Polish CV and a Polish GDPR clause were all **rejected by the
owner** — do not re-propose them without being asked.

Rewritten again 2026-08-18 against the owner's review list: headline is
**Junior Software Engineer** (not Java-specific), a one-line keyword stack bar
sits under the summary and now carries the ATS keyword load the headline used to,
IBM and InstalDesk are bullets, and **InstalDesk moved out of EXPERIENCE into
PROJECTS** because it has pilot users, not paying ones.

The hours are **off the CV again** (owner's call): the IBM rail says only
`Part-time`. 110 h/month (11/16) is still the true number — it belongs on the
first phone call, not on paper.

See [[user-jakub]], [[portfolio-project-state]] and [[profile-consistency]].
