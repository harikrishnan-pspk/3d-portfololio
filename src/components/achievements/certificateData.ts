export type CategoryId =
  | 'ai-ml'
  | 'genai-prompting'
  | 'software-dev'
  | 'internships'
  | 'job-simulations'
  | 'data-entrepreneurship';

export interface CategoryInfo {
  id: CategoryId;
  name: string;
  shortName: string;
  color: string;
  glowColor: string;
  iconName: 'Brain' | 'Sparkles' | 'Code' | 'Briefcase' | 'Terminal' | 'Database';
  description: string;
}

export interface Certificate {
  id: number;
  title: string;
  issuer: string;
  categoryId: CategoryId;
  status: 'COMPLETED';
  memoryCode: string;
}

export const CATEGORIES: Record<CategoryId, CategoryInfo> = {
  'ai-ml': {
    id: 'ai-ml',
    name: 'AI & Machine Learning',
    shortName: 'AI / ML',
    color: '#00f0ff',
    glowColor: 'rgba(0, 240, 255, 0.4)',
    iconName: 'Brain',
    description: 'Foundational & applied neural architectures, enterprise ML, and autonomous agents.',
  },
  'genai-prompting': {
    id: 'genai-prompting',
    name: 'Generative AI & Prompting',
    shortName: 'GEN AI',
    color: '#a855f7',
    glowColor: 'rgba(168, 85, 247, 0.4)',
    iconName: 'Sparkles',
    description: 'Prompt synthesis, LLM alignment, Claude ecosystem, and foundation model applications.',
  },
  'software-dev': {
    id: 'software-dev',
    name: 'Software & Development',
    shortName: 'DEV / SWE',
    color: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.4)',
    iconName: 'Code',
    description: 'Modern frontend systems, JavaScript engines, enterprise architecture, and automation.',
  },
  'internships': {
    id: 'internships',
    name: 'Internships',
    shortName: 'INTERNSHIPS',
    color: '#34d399',
    glowColor: 'rgba(52, 211, 153, 0.4)',
    iconName: 'Briefcase',
    description: 'Industry-level engineering practicum, AI workflows, and cloud service integrations.',
  },
  'job-simulations': {
    id: 'job-simulations',
    name: 'Job Simulations',
    shortName: 'SIMULATIONS',
    color: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.4)',
    iconName: 'Terminal',
    description: 'Real-world enterprise scenarios in GenAI analytics and cybersecurity IAM.',
  },
  'data-entrepreneurship': {
    id: 'data-entrepreneurship',
    name: 'Data & Entrepreneurship',
    shortName: 'DATA / E-SDP',
    color: '#ec4899',
    glowColor: 'rgba(236, 72, 153, 0.4)',
    iconName: 'Database',
    description: 'Data science methodologies, tech commercialization, and skill development.',
  },
};

export const CERTIFICATES: Certificate[] = [
  // ── AI & Machine Learning (5 certificates) ──
  {
    id: 1,
    title: 'Introduction to Machine Learning: Art of the Possible',
    issuer: 'AWS Training & Certification',
    categoryId: 'ai-ml',
    status: 'COMPLETED',
    memoryCode: 'NODE-01 // AWS-ML',
  },
  {
    id: 2,
    title: 'Machine Learning Essentials for Business and Technical Decision Makers',
    issuer: 'AWS Training & Certification',
    categoryId: 'ai-ml',
    status: 'COMPLETED',
    memoryCode: 'NODE-02 // AWS-DEC',
  },
  {
    id: 6,
    title: 'Agentic AI Certified Foundations Associate',
    issuer: 'Oracle University',
    categoryId: 'ai-ml',
    status: 'COMPLETED',
    memoryCode: 'NODE-06 // ORCL-AGT',
  },
  {
    id: 7,
    title: 'Principles of Generative AI Certification',
    issuer: 'Infosys Springboard',
    categoryId: 'ai-ml',
    status: 'COMPLETED',
    memoryCode: 'NODE-07 // INF-GEN',
  },
  {
    id: 12,
    title: 'Skill Competency — AI in Manufacturing',
    issuer: 'Microsoft / NCVET / Skill India',
    categoryId: 'ai-ml',
    status: 'COMPLETED',
    memoryCode: 'NODE-12 // MS-MFG',
  },

  // ── Generative AI & Prompting (6 certificates) ──
  {
    id: 3,
    title: 'Craft Precise Prompts for AI Models',
    issuer: 'IBM SkillsBuild',
    categoryId: 'genai-prompting',
    status: 'COMPLETED',
    memoryCode: 'NODE-03 // IBM-PRM',
  },
  {
    id: 11,
    title: 'Gemini for Google Workspace',
    issuer: 'Google Cloud / Simplilearn SkillUp',
    categoryId: 'genai-prompting',
    status: 'COMPLETED',
    memoryCode: 'NODE-11 // GOOG-GEM',
  },
  {
    id: 17,
    title: 'AI Fluency: Framework & Foundations',
    issuer: 'Anthropic',
    categoryId: 'genai-prompting',
    status: 'COMPLETED',
    memoryCode: 'NODE-17 // ANTH-FLU',
  },
  {
    id: 18,
    title: 'Introduction to Claude Cowork',
    issuer: 'Anthropic',
    categoryId: 'genai-prompting',
    status: 'COMPLETED',
    memoryCode: 'NODE-18 // ANTH-COW',
  },
  {
    id: 19,
    title: 'Claude 101',
    issuer: 'Anthropic',
    categoryId: 'genai-prompting',
    status: 'COMPLETED',
    memoryCode: 'NODE-19 // ANTH-101',
  },
  {
    id: 20,
    title: 'What Is Generative AI?',
    issuer: 'LinkedIn Learning',
    categoryId: 'genai-prompting',
    status: 'COMPLETED',
    memoryCode: 'NODE-20 // LI-GEN',
  },

  // ── Software & Development (4 certificates) ──
  {
    id: 10,
    title: 'Frontend Development Internship',
    issuer: 'CodeAlpha',
    categoryId: 'software-dev',
    status: 'COMPLETED',
    memoryCode: 'NODE-10 // CA-FED',
  },
  {
    id: 15,
    title: 'JavaScript Course with Certification: Unlocking the Power of JavaScript',
    issuer: 'Scaler Topics',
    categoryId: 'software-dev',
    status: 'COMPLETED',
    memoryCode: 'NODE-15 // SCL-JS',
  },
  {
    id: 13,
    title: 'Advanced Software Engineering Job Simulation',
    issuer: 'Walmart Global Tech / Forage',
    categoryId: 'software-dev',
    status: 'COMPLETED',
    memoryCode: 'NODE-13 // WMT-SWE',
  },
  {
    id: 14,
    title: 'Certified Advanced Automation Professional',
    issuer: 'Automation Anywhere',
    categoryId: 'software-dev',
    status: 'COMPLETED',
    memoryCode: 'NODE-14 // AA-AUTO',
  },

  // ── Internships (2 certificates) ──
  {
    id: 9,
    title: 'Artificial Intelligence Intern',
    issuer: 'Codec Technologies Pvt. Ltd.',
    categoryId: 'internships',
    status: 'COMPLETED',
    memoryCode: 'NODE-09 // CDC-AII',
  },
  {
    id: 8,
    title: 'ServiceNow Virtual Internship Program',
    issuer: 'ServiceNow University / AICTE / SmartBridge',
    categoryId: 'internships',
    status: 'COMPLETED',
    memoryCode: 'NODE-08 // SNW-VIP',
  },

  // ── Job Simulations (2 certificates) ──
  {
    id: 4,
    title: 'GenAI Powered Data Analytics Job Simulation',
    issuer: 'Tata Group / Forage',
    categoryId: 'job-simulations',
    status: 'COMPLETED',
    memoryCode: 'NODE-04 // TATA-ANA',
  },
  {
    id: 5,
    title: 'Cybersecurity Analyst (IAM) Job Simulation',
    issuer: 'Tata Group / Forage',
    categoryId: 'job-simulations',
    status: 'COMPLETED',
    memoryCode: 'NODE-05 // TATA-IAM',
  },

  // ── Data & Entrepreneurship (1 certificate) ──
  {
    id: 16,
    title: 'Entrepreneurship-Cum-Skill Development Programme (E-SDP) — Data Science & Entrepreneurship',
    issuer: 'Indo Euro Synchronization Pvt Ltd',
    categoryId: 'data-entrepreneurship',
    status: 'COMPLETED',
    memoryCode: 'NODE-16 // IES-ESDP',
  },
];
