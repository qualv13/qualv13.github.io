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

Repositioned again 19.08.2026 after comparing the CV against a peer's (same
year, same faculty, same student council) who was getting interviews at the
same companies. What she had and he did not: a summary naming the target role,
and publications. What he has and she does not: a live commercial product,
JVM depth, certifications, a stated GPA. The conclusion was that the gap was
positioning, not material. So:

- the target role is now **stated in the summary**, in bold, and deliberately
  role-shaped rather than language-shaped: "junior software engineer role where
  product engineering meets applied AI". He wants both halves visible — the
  market asks for a developer who can wire AI in, not an AI specialist
- the AI vocabulary is now on the CV **because the repos back it**: DrugPath
  really is an LLM agent with four retrieval tools (three `.cypher` queries plus
  a similarity search, driven by `agent/system_prompt.txt`). Check the repo
  before strengthening this wording further
- new PROJECTS rows: the **power-grid multi-agent RL** work (Unity, PyTorch,
  PPO, ONNX, two-person, paper in preparation — the collaborator is the peer
  above, and the ONNX detail came from her CV, so confirm before restating it)
  and the **engineering thesis** as its own row instead of a clause in Education
- SKILLS gained an **AI:** bucket between Core and Working knowledge; Neo4j and
  Cypher moved there, TensorFlow/scikit-learn/Ollama came up out of "Also used"
- CERTIFICATIONS now sits **above** EDUCATION, so the credentials land higher
- `CarCharging` was cut to pay for the space (IoTServerApp already carries
  Spring, and the sliding window survives in the Skills line)
- the ATS rhythm was tightened a second time (`row` 1.8→1.3mm, `sec` 2.4→2mm,
  `h2` 2→1.7mm, a new `html.ats .row .desc{margin-top:.6mm}`). Page 2 now ends
  at ~284mm of 297. Anything added from here needs something else removed.

**Printing the two-column version has a hand-placed page break (19.08.2026).**
Page 1 bleeds by design (`@page:first{margin:0}`) so the masthead band reaches
the trim, which also means nothing stops the text at the foot of that page —
it was filling to 295mm of 297, inside most printers' unprintable edge. `@page`
cannot be scoped to a class, so `html:not(.ats) .row.break{break-before:page}`
does it instead, and the `break` class sits on the **IoTServerApp** row. ATS
mode is untouched by that rule and paginates on its own. Result: styled 276mm /
287mm, ATS 286mm / 288mm, both two pages. **If entries before IoTServerApp
change, re-measure — the row carrying `.break` is the one that starts page 2.**

Content parity between the two modes is now something to assert, not assume:
extract both renders, strip `·` and `|`, tokenise, compare. They should match
exactly except for hyphenation at line breaks (`session-scoped`,
`English-speaking`). 1142 tokens each as of 19.08.2026.

**Export trap found the hard way:** Chrome's headless PDF export caches the page
per `--user-data-dir`, and `source.html` without a query string comes back stale
while `?ats` does not. Always add a cache-buster (`?v=$RANDOM`) or a fresh
profile, then assert on extracted strings — a stale render looks perfectly fine.

Rewritten again 2026-08-18 against the owner's review list: headline is
**Junior Software Engineer** (not Java-specific), a one-line keyword stack bar
sits under the summary and now carries the ATS keyword load the headline used to,
IBM and InstalDesk are bullets, and **InstalDesk moved out of EXPERIENCE into
PROJECTS** because it has pilot users, not paying ones.

The hours are **off the CV again** (owner's call): the IBM rail says only
`Part-time`. 110 h/month (11/16) is still the true number — it belongs on the
first phone call, not on paper.

Revised again 23.08.2026 against a jobgether CV-review report. **Most of that
report was generic and two of its rewrites were worse** — it asked for the core
skills to be split out from secondary tools when the CV already has
Core/AI/Working-knowledge/Also-used buckets, and its own "recommended" text
collapsed them into one flat list; its summary rewrite dropped every number
except the GPA; and its suggested copy for two entries still had the reviewer's
own commentary pasted inside it. Its only true ATS point was date formatting,
and that was one line: the high-school row, now `Sep 2019 – Jun 2023`. Do not
re-run those suggestions.

What actually changed:
- the **engineering-thesis row was replaced by Hardware Hub** (owner's call — the
  repo now has 72 pytest tests, CI, and a golden query set scoring the graph
  engine against the flat one). The thesis is still named in the summary, so it
  did not leave the CV. `hardware-hub` names no client, so the old reason for
  keeping it off is gone
- the WRSS and VOLT hyperlinks are **unlinked**, see [[profile-consistency]]
- GDPR clause shortened to cite the regulation without reciting its full title;
  the Education row dropped "Student Council since the 2nd" (the WRSS entry
  already says it) and Interests lost the Raspberry-Pi/VPS detail
- parity re-asserted: **1127 tokens** in both renders (was 1142), identical after
  un-hyphenating line breaks. ATS page 2 now ends at **281mm**, page 1 at 286mm

**The styled render's bottom measurement does not respond to content, and that
is by design.** `.sheet` is `display:flex;flex-direction:column` with
`.doc{flex:1}`, so the `.gdpr` band is pushed to the foot of the sheet: styled
page 2 reads 291.6mm no matter how much you cut above it. Three separate trims
moved the ATS figure (289 → 285 → 281) and left styled untouched. Measure
**ATS** when you are checking whether a cut bought space; the styled number only
tells you whether the band spilled to a third page. Before assuming a render is
stale, assert on strings — both renders here were fresh every time.

See [[user-jakub]], [[portfolio-project-state]] and [[profile-consistency]].

**Rewritten again 24.09.2026 to read less machine-written**, after a cold read
by a recruiter-persona agent and a keyword match against 10 live Kraków junior
postings (Motorola, Sabre, BBH, Allegro, AVSystem, BNP, EPAM and others).
- Prose became short bullets; justified text and `hyphens:auto` are **off**
  everywhere (the justified blocks read as pasted prose, and auto-hyphenation
  split keywords for pdftotext). Cut on sight: "rather than", "where X meets
  Y", em-dash tails, bracketed hedges (the NDA note, "Educational project"),
  "AI-native", "Own the...", "Ways of working", the slogan summary opener.
- New section **HACKATHONS AND COMPETITIONS** (DragonByte, Google, HackYeah).
  Fit2Beat lost its project row and lives there; the Neo4j hackathon stays only
  in the DrugPath rail. **DragonByte wording is "competed in the onsite final ...
  on a wild card", never "finalist" or a rank**: the public finals scoreboard
  lists exactly 20 names and wild cards are not on it, so a recruiter can check.
- Skills: no Tech/Soft split heads; two balanced columns (Core + AI | Working
  knowledge, Also used, Process, Languages). Python/FastAPI/pytest moved into
  **Core** (three projects are Python). **Mockito is in Core now**, and it is
  backed: `CarCharging` `ChargingServiceTest` uses `@Mock`/`@InjectMocks`, live,
  CI green. The old "Mockito stays out" note was about IoTServerApp only.
- Projects: both the **thesis row and GGSN** (owner asked to keep both). The
  thesis row is private-repo only: own OccNet (ResNet-18 + FiLM, 15M params,
  1-3 views) vs TripoSR/InstantMesh/TRELLIS/TripoSG (0.4-2.3B) on ShapeNet, GSO,
  Pix3D, paired Wilcoxon tests.
- **The RL row is his own work, but not on GitHub**: it lives in Plastic SCM at
  `H:\UnityProjects\NegotiatingAgents-main` (PVGIS/OPSD data prep in
  `python_files/prepare_profiles.py`, 32 household agents trading energy P2P,
  PPO vs DQN/A2C/heuristics, multi-seed). `nataliadybczak/negotiation_agents` on
  GitHub is the older food-for-energy version with 0 of his commits; do not use
  it as evidence either way.
- Links in `.desc`/`.list` are `white-space:nowrap`: the DrugPath demo URL was
  breaking at its hyphen and extracting as `neo4jagent`.
- No row carries `.break` any more; pages end on their own. Measured: styled
  280.6 / 271.2mm, ATS 278.8 / 278.4mm, **1058 tokens** in both renders.
- `Kraków, Poland` in the contact line; AGH Code Industry rail gained `Kraków`
  so its date is not read as part of the company name.

**ATS mode renders in Arial since 24.09.2026.** With Outfit at one weight, Chrome
fakes every bold (name, headings, titles, `.tag`) as **Type3** glyphs; all three
local extractors read them, but Type3 is a known drop-out for older commercial
parsers, and it would take the name and every heading with it. `html.ats` now
sets `--sans:Arial,...` (real Arial-BoldMT, no Type3). The styled render keeps
Outfit and still has Type3 bold, which is fine because the ATS export is the
file that gets uploaded. Check with `fitz` `get_fonts()`: no `Type3` in the ATS PDF.

The owner **wants "where product engineering meets applied AI" kept** in the
summary (24.09.2026), even though three blind recruiter agents each named it as
the one template-sounding line and read it as "wants AI, Java is a side skill"
for Java roles. Do not rewrite it again unless asked.

Blind test the same day (5 synthetic competitors, 3 real Kraków postings):
Allegro #2/6, BNP (AI team) #3/6, Motorola #2/6, phone screen in all three,
always behind the "Google + Allegro intern, ICPC" profile. Simulated ATS: 2/10
postings clearly reach a human, 2 likely, 5 borderline on real gaps (GCP/Azure/
Kubernetes, 9-12 months required). The rewrite had dropped the literal words
"CI/CD", "Agile", "unit tests", "Bash scripting"; they are back. `.nw` spans keep
stack-bar items and "20 minutes to 4." from orphaning in Arial.
