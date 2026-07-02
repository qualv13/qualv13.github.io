/**
 * Single source of truth for all site content.
 * Update text, links and lists here — components only render this data.
 *
 * Sources: CV (2026), LinkedIn profile, github.com/qualv13.
 */

export const profile = {
  name: "Jakub Kierznowski",
  firstName: "Jakub",
  lastName: "Kierznowski",
  role: "Software Developer Intern @ IBM",
  education: "CS & Intelligent Systems student @ AGH",
  headline: "I build production-grade Java backends.",
  tagline:
    "Backend engineering with Spring Boot, graph data and AI integration. " +
    "Currently optimizing Data Lineage with graph algorithms in Java at IBM Kraków " +
    "and building my own SaaS on the side.",
  location: "Kraków, Poland",
  workMode: "on-site · hybrid · remote",
  availability: "Open to Junior Java roles",
  email: "jakub.kierznowskiii@gmail.com",
  /** Served from public/cv/ — path resolved against Vite's base URL. */
  cvFile: "cv/Jakub-Kierznowski-CV.pdf",
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
    "Computer Science & Intelligent Systems student at AGH University of Krakow, " +
      "genuinely excited about coding, problem-solving and all things tech. " +
      "Especially into Java, Python, graph data and neural networks — always exploring " +
      "tools that turn concepts into something real.",
    "At IBM Software Lab I work on Data Lineage: optimizing performance with advanced " +
      "graph and tree algorithms in Java Spring, right where big graph data meets LLMs. " +
      "Outside work I lead the IT team of my faculty's Student Council (WRSS WEAIiIB), " +
      "running our technical infrastructure and automation.",
    "After hours you'll find me feeding another Docker container to my Raspberry Pi " +
      "home lab, where I self-host quantized LLMs and n8n workflows on my own VPS.",
  ],
  drives: [
    "clean, testable, purposeful code",
    "graph data & AI integration",
    "tech that solves real-world problems",
    "mentoring, teamwork & community",
  ],
  quickFacts: [
    { key: "base", value: "Kraków, PL (hybrid/remote friendly)" },
    { key: "degree", value: "BE Computer Science & Intelligent Systems, 2023–2027" },
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
    meta: "Kraków · hybrid",
    current: true,
    bullets: [
      "Optimizing Data Lineage performance with advanced graph and tree algorithms in Java Spring — working where big graph data meets LLMs.",
      "Built automated test suites in Python/pytest with advanced fixtures, boosting coverage 5% and cutting pipeline runtime 10%.",
      "Managing CI/CD via Jenkins job scheduling on cloud infrastructure.",
      "Daily Agile/Scrum with cross-functional teams; enterprise architecture best practices via internal tech talks.",
    ],
    tags: ["Java", "Spring", "Graph Algorithms", "Python", "pytest", "Jenkins"],
  },
  {
    company: "WRSS WEAIiIB · AGH Faculty Students Council",
    role: "IT Team Lead · Web & Workflow Automation",
    period: "Mar 2024 — present",
    meta: "Kraków",
    current: true,
    bullets: [
      "Develop and maintain the faculty council website (Vue, TailwindCSS, JavaScript).",
      "Build workflow automations with self-hosted n8n on my own VPS — Slack, Google API, OAuth2.0.",
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
    period: "Nov 2023 — Mar 2025",
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
      "Biomedical AI agent that navigates a knowledge graph to explain drug mechanisms, " +
      "interactions and repurposing hypotheses. The graph stores relationships between facts — " +
      "that's where non-obvious (and dangerous) connections emerge. Educational project on public research data.",
    stats: "47,031 nodes · 293k relationships · 1 traversable graph",
    tech: ["Neo4j Aura", "Cypher", "AI Agents", "Python"],
    links: { github: "https://github.com/qualv13/neo4j-agent" },
  },
  {
    name: "InstalDesk",
    year: "2026",
    badge: "solo SaaS · in development",
    description:
      "Desktop invoicing app for Polish contractors: KSeF e-invoicing integration, Stripe " +
      "subscription payments, offline-first architecture, email activation and subscription " +
      "reminders. Designed, built and shipped end-to-end solo.",
    tech: ["Python", "FastAPI", "Stripe", "KSeF API"],
    links: {},
    private: true,
  },
  {
    name: "IoTServerApp",
    year: "2026",
    badge: "full IoT backend",
    description:
      "Backend platform for managing fleets of IoT smart lamps: JWT auth, real-time MQTT " +
      "communication via RabbitMQ, OTA firmware delivery, telemetry ingestion and fleet " +
      "management. Containerized with Docker Compose.",
    tech: ["Java", "Spring Boot", "MQTT", "RabbitMQ", "PostgreSQL", "Protobuf", "AWS S3", "Docker"],
    links: { github: "https://github.com/qualv13/IoTServerApp" },
  },
  {
    name: "CarCharging",
    year: "2025",
    description:
      "EV charging optimizer integrating the UK Carbon Intensity API to recommend the cleanest " +
      "48-hour charging window using a sliding-window algorithm.",
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
      "Workout playlist generator matched to BPM preferences — the unusual approach in the " +
      "biohacking track. Built in 24h with a team of four; scored 3.9/5 and placed TOP 8 " +
      "of 65+ projects at Poland's biggest hackathon.",
    tech: ["Python", "Flask", "Docker"],
    links: {},
  },
  {
    name: "hardware-hub",
    year: "2026",
    description:
      "AI-native internal hardware rental & inventory hub — agent-friendly tooling for tracking " +
      "equipment, availability and hand-offs.",
    tech: ["Python", "AI Agents"],
    links: { github: "https://github.com/qualv13/hardware-hub" },
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
      { name: "JUnit" },
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
      { name: "Cypher" },
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
      { name: "Git / GitHub" },
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
  },
  {
    title: "Neo4j Certified Professional",
    detail: "Graph database certification straight from Neo4j",
    year: "2026",
    kind: "cert",
  },
  {
    title: "Building Agents in Neo4j Aura",
    detail: "Agentic AI on graph data, certified by Neo4j",
    year: "2026",
    kind: "cert",
  },
  {
    title: "Amazon certificates ×3",
    detail: "Programming with Java · Data Structures & Algorithms · Application Development",
    year: "2024–25",
    kind: "cert",
  },
  {
    title: "VOLT 2025 — Coordinator",
    detail: "Co-organized AGH's two-day tech conference: talks, workshops, industry partners",
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
  },
] as const;

export const education = [
  {
    school: "AGH University of Krakow",
    degree: "BE, Computer Science & Intelligent Systems",
    period: "2023 — 2027",
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
