/**
 * Single source of truth for all site content.
 * Update text, links and lists here — components only render this data.
 *
 * Sources: CV (2026), LinkedIn profile, github.com/qualv13.
 */

/** Birthday doubles as the netrunner RAM spec: capacity = current age. */
export const BIRTH_DATE = new Date(2004, 0, 15);

/** Current age in full years. */
export function currentAge(): number {
  const now = new Date();
  let age = now.getFullYear() - BIRTH_DATE.getFullYear();
  const beforeBirthday =
    now.getMonth() < BIRTH_DATE.getMonth() ||
    (now.getMonth() === BIRTH_DATE.getMonth() && now.getDate() < BIRTH_DATE.getDate());
  if (beforeBirthday) age -= 1;
  return age;
}

export const profile = {
  name: "Jakub Kierznowski",
  firstName: "Jakub",
  lastName: "Kierznowski",
  role: "Software Developer Intern @ IBM",
  education: "CS & Intelligent Systems student @ AGH",
  headline: "I build production-grade backends.",
  tagline:
    "Backend engineering with Spring Boot, graph data and AI integration. " +
    "Currently optimizing Data Lineage with graph algorithms in Java at IBM Kraków " +
    "and building my own SaaS on the side.",
  location: "Kraków, Poland",
  workMode: "on-site · hybrid",
  availability: "Open to Junior Software Engineer roles",
  email: "jakub.kierznowskiii@gmail.com",
  /** Served from public/cv/ — path resolved against Vite's base URL. */
  cvFile: "cv/Jakub-Kierznowski-CV.pdf",
  /** Viewer page that embeds that PDF — what ./CV in the navbar opens.
   *  Spelled out to index.html on purpose: Vite's dev server has no directory
   *  index for public/, so a bare "cv/" serves the SPA locally. */
  cvPage: "cv/index.html",
  links: {
    github: "https://github.com/qualv13",
    linkedin: "https://www.linkedin.com/in/jakub-kierznowski/",
    linkedinCerts: "https://www.linkedin.com/in/jakub-kierznowski/details/certifications/",
  },
} as const;

/** Short proof-points shown as badges/chips in the hero. */
export const highlights = [
  "HackYeah 2025 · TOP 8",
  "Neo4j Agent Hackathon · TOP 6",
  "Neo4j Certified Professional",
] as const;

/** key:value stats rendered as mono chips in the hero. */
export const heroStats = [
  { key: "class", value: "netrunner" },
  { key: "gpa", value: "4.74/5.00" },
  { key: "certifications", value: "25" },
  { key: "graph_nodes_tamed", value: "47k+" },
] as const;

/** Core stack shown in hero decorations and marquees. */
export const coreStack = [
  "Java",
  "Spring Boot",
  "PostgreSQL",
  "Python",
  "Docker",
  "Neo4j",
  "RabbitMQ",
  "Jenkins",
  "AWS S3",
] as const;

export const about = {
  paragraphs: [
    "Computer Science & Intelligent Systems student at AGH University of Krakow. " +
      "I work mostly in Java and Python, and the parts I keep coming back to are " +
      "graph data and neural networks.",
    "At IBM Software Lab I work on Data Lineage, optimizing performance with graph and " +
      "tree algorithms in Java Spring over large enterprise metadata graphs. Outside work " +
      "I lead the IT team of my faculty's Student Council (WRSS WEAIiIB), running our " +
      "infrastructure and automation.",
    "After hours it's the home lab: a Raspberry Pi and a VPS where I self-host quantized " +
      "LLMs and n8n workflows.",
  ],
  drives: [
    "clean, testable code",
    "graph data & AI integration",
    "software with actual users",
    "mentoring & teamwork",
  ],
  quickFacts: [
    { key: "base", value: "Kraków, PL (on-site / hybrid)" },
    { key: "degree", value: "BE Computer Science & Intelligent Systems, Oct 2023 – Jan 2027" },
    { key: "gpa", value: "4.74/5.00 · Year Representative since 1st semester" },
    { key: "thesis", value: "deep learning for 2D-to-3D mesh conversion" },
    { key: "languages", value: "Polish native · English C1 · French A2" },
  ],
  interests: ["🏂 snowboard", "⛵ sailing", "🎮 gamedev", "🎲 board games", "🦎 home lab"],
} as const;

export type ExperienceEntry = {
  company: string;
  role: string;
  period: string;
  meta?: string;
  bullets: readonly string[];
  tags: readonly string[];
  current?: boolean;
};

export const experience: readonly ExperienceEntry[] = [
  {
    company: "IBM Software Lab",
    role: "Software Developer Intern",
    period: "Feb 2026 — present",
    meta: "Kraków · hybrid · part-time, 110 h/month (11/16)",
    current: true,
    bullets: [
      "Optimizing Data Lineage performance with graph and tree algorithms in Java Spring, over large enterprise metadata graphs.",
      "Built automated test suites in Python/pytest with parametrised and session-scoped fixtures; coverage went up and the CI run got shorter.",
      "Managing CI/CD via Jenkins job scheduling on cloud infrastructure.",
      "Daily Agile/Scrum with cross-functional teams; enterprise architecture knowledge sharing via internal tech talks.",
    ],
    tags: ["Java", "Spring", "Graph Algorithms", "Python", "pytest", "Jenkins"],
  },
  {
    company: "WRSS WEAIiIB · AGH Faculty Students Council",
    role: "IT Team Lead · Web & Workflow Automation",
    period: "Mar 2025 — present",
    meta: "Kraków",
    current: true,
    bullets: [
      "In the council since Mar 2024, leading its IT team since Mar 2025.",
      "Develop and maintain the faculty council website (Vue, TailwindCSS, JavaScript).",
      "Build workflow automations with self-hosted n8n on my own VPS: Slack, Google API, OAuth2.0.",
      "Create event-management tools; coordinate partner relations, fundraising and the council's LinkedIn presence.",
    ],
    tags: ["Vue", "TailwindCSS", "n8n", "OAuth2.0", "Leadership"],
  },
  {
    company: "Microsoft",
    role: "Student Ambassador",
    period: "Oct 2024 — Jan 2025",
    meta: "remote",
    bullets: [
      "Represented Microsoft's developer community on campus, promoting cloud and developer technologies.",
    ],
    tags: ["Community", "Azure"],
  },
  {
    company: "Zwolnieni z Teorii",
    role: "Mentor → Community Leader → Junior User Supporter",
    period: "Sep 2022 — May 2025",
    meta: "remote · Poland's largest practical-education platform",
    bullets: [
      "Mentored 35+ student teams per year through planning and executing social-impact projects.",
      "Led a community of participants as Community Leader (ZWZT × PwC certificate).",
      "Supported olympiad participants and managed a database of schools, teachers and thousands of student users.",
    ],
    tags: ["Mentoring", "Project Management", "Communication"],
  },
  {
    company: "AGH Code Industry",
    role: "Game Developer",
    period: "Dec 2023 — Jun 2024",
    meta: "student game-dev group",
    bullets: [
      "Developed interactive mechanics and features for the game “Student-trainer” in Unity/C# with a mentored team.",
      "Contributed to game design and narrative writing.",
    ],
    tags: ["Unity", "C#", "Game Design"],
  },
] as const;

export type Project = {
  name: string;
  year: string;
  badge?: string;
  description: string;
  stats?: string;
  tech: readonly string[];
  links: { github?: string; demo?: string };
  private?: boolean;
};

export const projects: readonly Project[] = [
  {
    name: "DrugPath",
    year: "2026",
    badge: "Neo4j Aura Agent Hackathon · TOP 6",
    description:
      "Biomedical AI agent that walks a knowledge graph along drug → gene → pathway → disease " +
      "paths to explain drug mechanisms, interactions and repurposing hypotheses. " +
      "Educational project on public research data.",
    stats: "47,031 nodes · 293k relationships · 1 traversable graph",
    tech: ["Neo4j Aura", "Cypher", "AI Agents", "Python"],
    links: {
      github: "https://github.com/qualv13/neo4j-agent",
      demo: "https://qualv13.github.io/neo4j-agent/",
    },
  },
  {
    name: "InstalDesk",
    year: "2026",
    badge: "solo SaaS · live v1.9.0",
    description:
      "Quoting and VAT-invoicing SaaS for Polish installation contractors: a web PWA and a " +
      "Windows desktop client on one account. Native KSeF integration (API v2, FA(3) schema, " +
      "XAdES-BES certificate auth) filed straight to the Ministry of Finance with no third-party " +
      "integrator, Stripe subscription billing, per-tenant isolation and offline-first local " +
      "storage. I built all of it and I support it.",
    tech: ["Python", "FastAPI", "PostgreSQL", "SQLite", "Stripe", "KSeF API"],
    links: { demo: "https://instaldesk.pl" },
    private: true,
  },
  {
    name: "IoTServerApp",
    year: "2026",
    badge: "full IoT backend",
    description:
      "Backend platform for managing fleets of IoT smart lamps: JWT auth, real-time MQTT " +
      "communication via RabbitMQ, OTA firmware delivery, telemetry ingestion and fleet " +
      "management. Layered Spring architecture, Protocol Buffers device protocol, containerized " +
      "with Docker Compose.",
    tech: ["Java", "Spring Boot", "MQTT", "RabbitMQ", "PostgreSQL", "Protobuf", "AWS S3", "Docker"],
    links: {
      github: "https://github.com/qualv13/IoTServerApp",
      demo: "https://iot-frontend-2r8o.onrender.com/",
    },
  },
  {
    name: "CarCharging",
    year: "2025",
    description:
      "EV charging optimizer integrating the UK Carbon Intensity API to find the cleanest 1–6 hour " +
      "charging window inside the next 48 hours, using a sliding window over half-hourly " +
      "generation slots.",
    tech: ["Java", "Spring Boot", "REST API", "Docker"],
    links: {
      github: "https://github.com/qualv13/CarCharging",
      demo: "https://nextjs-render-fuqh.onrender.com",
    },
  },
  {
    name: "Fit2Beat",
    year: "2025",
    badge: "HackYeah 2025 · TOP 8",
    description:
      "Workout playlist generator matched to BPM preferences. Nobody else in the biohacking " +
      "track built it that way. 24 hours, team of four, 3.9/5 from the jury, TOP 8 of 65+ " +
      "projects at Poland's biggest hackathon.",
    tech: ["Python", "Flask", "Docker"],
    links: { demo: "https://fit2beat.toadres.pl" },
  },
  {
    name: "hardware-hub",
    year: "2026",
    description:
      "AI-native internal hardware rental and inventory hub: semantic search, an inventory " +
      "auditor, and Gemini tool-calling with a deterministic fallback behind every call. " +
      "Built as a recruitment assignment that required an AI-native approach.",
    tech: ["Python", "AI Agents"],
    links: {
      github: "https://github.com/qualv13/hardware-hub",
      demo: "https://hardware-hub-2qc7.onrender.com/",
    },
  },
] as const;

export type SkillGroup = {
  dir: string;
  skills: readonly { name: string; core?: boolean }[];
};

/** `core: true` = daily drivers, rendered highlighted. */
export const skillGroups: readonly SkillGroup[] = [
  {
    dir: "~/skills/backend",
    skills: [
      { name: "Java", core: true },
      { name: "Spring Boot", core: true },
      { name: "Hibernate / JPA" },
      { name: "JUnit", core: true },
      { name: "Maven" },
      { name: "Python", core: true },
      { name: "FastAPI" },
      { name: "Flask" },
      { name: "pytest" },
      { name: "RESTful APIs" },
      { name: "OAuth 2.0" },
    ],
  },
  {
    dir: "~/skills/data-and-graphs",
    skills: [
      { name: "PostgreSQL", core: true },
      { name: "Neo4j", core: true },
      { name: "Cypher", core: true },
      { name: "SQL" },
      { name: "Protocol Buffers" },
      { name: "Data Engineering" },
    ],
  },
  {
    dir: "~/skills/devops-and-cloud",
    skills: [
      { name: "Docker", core: true },
      { name: "CI/CD (Jenkins)" },
      { name: "Git / GitHub", core: true },
      { name: "Linux / Bash" },
      { name: "AWS (S3)" },
      { name: "VPS self-hosting" },
    ],
  },
  {
    dir: "~/skills/ai-and-ml",
    skills: [
      { name: "LLM APIs (Anthropic)" },
      { name: "Self-hosted LLMs (Ollama)" },
      { name: "TensorFlow" },
      { name: "scikit-learn" },
      { name: "NumPy / Pandas" },
      { name: "n8n automation" },
      { name: "Neural Networks" },
    ],
  },
  {
    dir: "~/skills/messaging",
    skills: [{ name: "RabbitMQ" }, { name: "MQTT" }],
  },
  {
    dir: "~/skills/also-speak",
    skills: [
      { name: "C# (Unity)" },
      { name: "C++" },
      { name: "JavaScript / TypeScript" },
      { name: "Vue" },
    ],
  },
] as const;

export const softSkills = [
  "Agile & Scrum (daily stand-ups)",
  "Kanban",
  "mentoring (35+ teams/yr)",
  "leadership",
  "event coordination",
  "testing: unit · integration · E2E",
] as const;

export type Achievement = {
  title: string;
  detail: string;
  year: string;
  kind: "award" | "cert" | "leadership";
  /** Proof: certificate page, repo, or announcement. */
  link?: string;
};

export const achievements: readonly Achievement[] = [
  {
    title: "HackYeah 2025 — TOP 8",
    detail: "Fit2Beat, biohacking track · 3.9/5 from the jury · 65+ competing projects · first 24h hackathon",
    year: "2025",
    kind: "award",
  },
  {
    title: "Neo4j Aura Agent Hackathon — TOP 6",
    detail: "DrugPath: biomedical knowledge-graph agent · 47k nodes, 293k relationships",
    year: "2026",
    kind: "award",
    link: "https://community.neo4j.com/t/aura-agent-hackathon-winners-announced/79568",
  },
  {
    title: "Neo4j Certified Professional",
    detail: "Graph database certification straight from Neo4j",
    year: "2026",
    kind: "cert",
    link: "https://graphacademy.neo4j.com/c/6c4023ef-a651-4de9-80cd-bb064f5a7b0b/",
  },
  {
    title: "Building Agents in Neo4j Aura",
    detail: "Agentic AI on graph data, certified by Neo4j",
    year: "2026",
    kind: "cert",
    link: "https://graphacademy.neo4j.com/c/e6140917-3cff-415a-a1b9-7de97e0c3735/",
  },
  {
    title: "Amazon certificates ×3",
    detail: "Programming with Java · Data Structures & Algorithms · Application Development",
    year: "2024–25",
    kind: "cert",
    link: "https://www.linkedin.com/in/jakub-kierznowski/details/certifications/",
  },
  {
    title: "VOLT 2025 — Coordinator",
    detail: "Co-organized AGH's two-day tech conference: talks, workshops, and eight partner companies including Aptiv, PwC Polska and Cytiva",
    year: "2025",
    kind: "leadership",
  },
  {
    title: "Microsoft Student Ambassador",
    detail: "Campus developer-community program",
    year: "2024–25",
    kind: "leadership",
  },
  {
    title: "Unity Junior Programmer",
    detail: "Unity Learn certification path",
    year: "2021",
    kind: "cert",
    link: "https://learn.unity.com/u/5e2039f0edbc2a00d6d818e0",
  },
] as const;

export const education = [
  {
    school: "AGH University of Krakow",
    degree: "BE, Computer Science & Intelligent Systems",
    period: "Oct 2023 — Jan 2027",
    detail:
      "GPA 4.74/5.00 · Year Representative since 1st semester · Student Council since 2nd. " +
      "Engineering thesis: applying deep learning to 2D-to-3D mesh conversion.",
  },
  {
    school: "The August Witkowski 5th High School, Kraków",
    degree: "Extended Mathematics, Physics & Computer Science",
    period: "2019 — 2023",
    detail: "C++ and algorithmic problem solving.",
  },
] as const;
