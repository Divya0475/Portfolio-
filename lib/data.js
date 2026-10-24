export const profile = {
  firstName: 'Moka',
  lastName: 'Divya',
  tagline: '',
  subtitle:
    'I build retrieval-augmented chatbots, multilingual on-device AI and full-stack products. I lead a five-person team at NexCura and contribute to open source with Sugar Labs through the C4GT Fellowship at IIIT Hyderabad.',
  email: 'divyamoka7511@gmail.com',
  linkedin: 'https://linkedin.com/in/moka-divya',
  github: 'https://github.com/Divya0475',
};

export const projects = [
  {
    name: 'CampusFlow',
    kind: 'College digital permission and approval platform',
    description:
      'A deployed full-stack platform that routes student permission requests through role-based approvals, with REST APIs and JWT authentication.',
    stack: ['React', 'Node.js', 'Express.js', 'MongoDB'],
    href: 'https://github.com/Divya0475/College-Digital-Permission',
    liveUrl: 'https://college-digital-permission-frontend.onrender.com/',
    tint: ['#ff8a3d', '#5b1e3a'],
  },
  {
    name: 'SevaSetu AI',
    kind: 'RAG-based government scheme chatbot',
    description:
      'A chatbot that answers natural-language questions about government schemes. ChromaDB stores the scheme documents, MiniLM embeddings retrieve the right passages, and Qwen 2.5 writes the answer.',
    stack: ['Python', 'FastAPI', 'ChromaDB', 'Qwen 2.5'],
    href: 'https://github.com/Divya0475/SEVASETU-AI',
    tint: ['#ffb36b', '#1f4b63'],
  },
  {
    name: 'Sign Language Detection',
    kind: 'Real-time gesture to text',
    description:
      'Detects hand gestures in real time from MediaPipe hand landmarks and classifies them with scikit-learn, translating signs into readable text.',
    stack: ['Python', 'OpenCV', 'MediaPipe', 'Scikit-learn', 'FastAPI'],
    href: 'https://github.com/Divya0475/SIGN-LANGUAGE-DETECTION',
    tint: ['#5ec8ff', '#3a1f5b'],
  },
];

export const nav = [
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects', id: 'work' },
  { label: 'Contact', id: 'contact' },
];

export const about = {
  paragraphs: [
    'I am a final-year B.Tech student in Artificial Intelligence Engineering at Kakinada Institute of Engineering and Technology.',
    'I build Generative AI products end to end: retrieval pipelines with ChromaDB and embeddings, LLMs served through Ollama, and FastAPI backends that put them in front of real users.',
    'I work in shared codebases with Git, code review and clear documentation, and I pick up new tools quickly. I am looking for an AI Engineer or Developer role.',
  ],
  stats: [
    { value: '5', label: 'engineers led on NexCura' },
    { value: '4', label: 'languages supported: English, Telugu, Hindi, Tamil' },
    { value: '3', label: 'projects on GitHub' },
    { value: '8.15', label: 'CGPA in B.Tech AI Engineering' },
  ],
};

export const skills = [
  { group: 'Languages', items: ['Python', 'SQL', 'JavaScript'] },
  {
    group: 'Generative AI and RAG',
    items: ['LLMs via Ollama (Llama, Qwen)', 'Prompt engineering', 'RAG', 'LangChain', 'ChromaDB', 'Embeddings (MiniLM, Sentence Transformers)'],
  },
  { group: 'Machine learning', items: ['Scikit-learn', 'PyTorch', 'TensorFlow', 'Pandas', 'NumPy', 'OpenCV'] },
  { group: 'APIs and data', items: ['FastAPI', 'REST APIs', 'JSON', 'SQL', 'MongoDB'] },
  { group: 'Practices and tools', items: ['Git', 'GitHub', 'Code review', 'Debugging', 'Technical documentation', 'VS Code', 'Docker (basics)'] },
  { group: 'Cloud', items: ['Microsoft Azure AI Fundamentals (certified)'] },
];

export const experience = [
  {
    role: 'Developer Intern',
    org: 'Code for GovTech (C4GT), RCTS Lab, IIIT Hyderabad',
    period: 'Aug 2026 – Present',
    note: '8-month internship',
    points: [
      'Selected as a Developer Intern under the C4GT Fellowship, contributing to open-source projects under Sugar Labs.',
      'Work in a shared codebase through Git workflows, code reviews and issue-based development, acting on mentor feedback.',
    ],
  },
  {
    role: 'Team Lead and AI Systems Architect',
    org: 'NexCura',
    period: '2026 – Present',
    note: 'Team of 5',
    points: [
      'Lead a 5-member team on a multilingual AI application, from system architecture through implementation and documentation.',
      'Build the FastAPI backend and integrate an on-device AI pipeline supporting English, Telugu, Hindi and Tamil.',
    ],
  },
];

export const education = {
  degree: 'B.Tech in Artificial Intelligence Engineering',
  school: 'Kakinada Institute of Engineering and Technology',
  period: '2023 – 2027',
  score: 'CGPA 8.15 / 10',
};

export const certifications = [
  { name: 'Foundation of Modern Machine Learning (FMML)', by: 'IIIT Hyderabad' },
  { name: 'Microsoft Azure AI Fundamentals', by: 'Microsoft Learn' },
  { name: 'Artificial Intelligence Fundamentals', by: 'IBM' },
  { name: 'Data Analytics using Python and Power BI', by: 'Deloitte' },
  { name: 'SQL and Database Management Systems', by: 'EduSkills Academy' },
  { name: 'TCS iON Young Professional Certification', by: 'TCS iON' },
];

export const location = 'Kakinada, Andhra Pradesh, India';
