import type { Project } from "./project-card-xray"

export const projects: Project[] = [
  {
    title: "PhisBuster",
    tagline: "AI Phishing Detection + Training",
    description:
      "Analyzes suspicious URLs with threat intelligence APIs (WHOIS, Shodan, VirusTotal) and pairs it with a gamified phishing training simulator so users actually learn what clicked.",
    tags: ["Next.js", "Node.js", "Python", "VirusTotal", "Shodan", "MongoDB"],
    repo: "https://github.com/javadominic/BuildathonxLorn",
    live: "https://buildathonxlorn.vercel.app/",
    year: "2025",
    gradient: ["#ff7a59", "#ffb347"],
    previewLabel: "phisbuster / scan",
    span: "lg:col-span-2",
    architecture: {
      nodes: [
        { id: "user", label: "User Browser", type: "client", x: 12, y: 52 },
        { id: "app", label: "Next.js App", type: "client", x: 34, y: 28 },
        { id: "api", label: "Node API", type: "server", x: 56, y: 52 },
        { id: "ai", label: "Risk Classifier", type: "ai", x: 78, y: 28 },
        { id: "vt", label: "VirusTotal", type: "external", x: 88, y: 62 },
        { id: "db", label: "Mongo Threats", type: "db", x: 56, y: 82 },
      ],
      edges: [
        { from: "user", to: "app" },
        { from: "app", to: "api" },
        { from: "api", to: "ai" },
        { from: "api", to: "vt" },
        { from: "api", to: "db" },
      ],
    },
  },
  {
    title: "Kisan OS",
    tagline: "Operating Layer for Farmers",
    description:
      "A farmer first dashboard that unifies weather, crop advisory, marketplace prices, and government schemes behind a single interface, with regional language support baked in.",
    tags: ["React", "Node.js", "Tailwind", "Firebase", "REST"],
    repo: "https://github.com/MadhuTiwari-345/Kisan-OS",
    live: "https://kisanosprojectcheck.vercel.app/",
    year: "2025",
    gradient: ["#ff8a5c", "#c8a8ff"],
    previewLabel: "kisan.os / home",
    architecture: {
      nodes: [
        { id: "farmer", label: "Farmer App", type: "client", x: 14, y: 50 },
        { id: "api", label: "Node Gateway", type: "server", x: 44, y: 30 },
        { id: "wx", label: "Weather API", type: "external", x: 80, y: 18 },
        { id: "mkt", label: "Mandi Prices", type: "external", x: 80, y: 50 },
        { id: "auth", label: "Firebase Auth", type: "server", x: 44, y: 78 },
        { id: "store", label: "Advisory DB", type: "db", x: 80, y: 82 },
      ],
      edges: [
        { from: "farmer", to: "api" },
        { from: "api", to: "wx" },
        { from: "api", to: "mkt" },
        { from: "farmer", to: "auth" },
        { from: "api", to: "store" },
      ],
    },
  },
  {
    title: "FarmChain",
    tagline: "Decentralized Agri Supply Chain",
    description:
      "Smart contracts plus IPFS give farmers, distributors, and buyers a single source of truth for product movement. Dashboards expose traceability end to end.",
    tags: ["Solidity", "IPFS", "Next.js", "Hardhat", "Ethers"],
    live: "https://farm-chain-blue.vercel.app/",
    repo: "https://github.com/MadhuTiwari-345",
    year: "2025",
    gradient: ["#f2a65a", "#ff6b5b"],
    previewLabel: "farmchain / trace",
    architecture: {
      nodes: [
        { id: "dash", label: "Next.js Dashboard", type: "client", x: 16, y: 50 },
        { id: "wallet", label: "Web3 Wallet", type: "client", x: 38, y: 22 },
        { id: "chain", label: "Smart Contract", type: "server", x: 62, y: 50 },
        { id: "ipfs", label: "IPFS Storage", type: "db", x: 86, y: 24 },
        { id: "ledger", label: "On Chain Ledger", type: "db", x: 86, y: 76 },
      ],
      edges: [
        { from: "dash", to: "wallet" },
        { from: "wallet", to: "chain" },
        { from: "chain", to: "ipfs" },
        { from: "chain", to: "ledger" },
      ],
    },
  },
  {
    title: "FemtoGuard",
    tagline: "AI Fraud Defender for Women",
    description:
      "Shestorm project that flags scam patterns in voice and text in real time and coaches the user through a safe response. Built for scale on Cloud Run.",
    tags: ["Python", "FastAPI", "Gemini", "Cloud Run", "React"],
    repo: "https://github.com/MadhuTiwari-345/GFGBQ-Team-shestorm",
    live: "https://shestorm-ai-fraud-defender-73291669658.us-west1.run.app/",
    year: "2025",
    gradient: ["#ff5e9a", "#ff8a5c"],
    previewLabel: "femtoguard / live",
    span: "lg:col-span-2",
    architecture: {
      nodes: [
        { id: "mobile", label: "Mobile Client", type: "client", x: 14, y: 30 },
        { id: "edge", label: "FastAPI Edge", type: "server", x: 40, y: 54 },
        { id: "stt", label: "Speech to Text", type: "ai", x: 66, y: 22 },
        { id: "gem", label: "Gemini Risk AI", type: "ai", x: 66, y: 54 },
        { id: "alert", label: "Alert Service", type: "server", x: 88, y: 34 },
        { id: "cases", label: "Case Store", type: "db", x: 66, y: 84 },
      ],
      edges: [
        { from: "mobile", to: "edge" },
        { from: "edge", to: "stt" },
        { from: "edge", to: "gem" },
        { from: "gem", to: "alert" },
        { from: "gem", to: "cases" },
      ],
    },
  },
  {
    title: "Legal AI",
    tagline: "Research Assistant for Lawyers",
    description:
      "Summarizes legal documents, extracts precedents, and surfaces citations so research that used to take hours collapses into minutes. MERN stack with Firebase auth.",
    tags: ["MongoDB", "Express", "React", "Node.js", "Firebase"],
    repo: "https://github.com/MadhuTiwari-345",
    year: "2025",
    gradient: ["#c8a8ff", "#ff6b5b"],
    previewLabel: "legal.ai / brief",
    architecture: {
      nodes: [
        { id: "client", label: "React Client", type: "client", x: 14, y: 50 },
        { id: "auth", label: "Firebase Auth", type: "server", x: 38, y: 22 },
        { id: "api", label: "Express API", type: "server", x: 52, y: 56 },
        { id: "nlp", label: "Summarizer", type: "ai", x: 78, y: 28 },
        { id: "db", label: "Mongo Docs", type: "db", x: 78, y: 80 },
      ],
      edges: [
        { from: "client", to: "auth" },
        { from: "client", to: "api" },
        { from: "api", to: "nlp" },
        { from: "api", to: "db" },
      ],
    },
  },
]
