export const RESUME = '/Ethan_Lu_Resume.pdf'

export const links = {
  email: 'ethanlu0929@gmail.com',
  linkedin: 'https://www.linkedin.com/in/ethan-lu/',
  github: 'https://github.com/elu139',
}

export const skills = [
  ['Languages', 'Python, SQL, Java, R, JavaScript, TypeScript, C'],
  ['ML / AI', 'PyTorch, BERT, Transformers, NLP, LangChain, RAG, agentic workflows, MCP'],
  ['Data', 'Pandas, NumPy, scikit-learn, JAX, Power BI, forecasting'],
  ['Engineering', 'FastAPI, Django, React, Node.js, Docker, AWS, GCP'],
  ['Product', 'PRDs, A/B testing, experiment design, usability testing, Agile'],
]

export const experience = [
  {
    org: 'Google',
    role: 'Product Management Fellow',
    when: 'Sep 2026 — now',
    desc: "As one of 10 Product@GT PM fellows selected out of 500+ applications, I'm building AI-powered products to revamp the Google Skills platform to equip young professionals and university students with personalized roadmaps for hands-on skill building towards an ultimate goal: landing a dream job.",
  },
  {
    org: 'Origami Risk',
    role: 'Product Implementation Analyst Intern',
    when: 'May — Aug 2026',
    desc: "At Origami, I helped streamline professional services/configuration workflow using AI for 10 clients including Amazon, UnitedHealth Group, and Kohl's. This included transitioning Origami's knowledge base into Claude Cowork, designing proof of concepts for streamlining internal handoffs using agents, and creating Claude Skills to automate workflow. On top of that, I also worked with configuration changes concerning back-end MSSQL and RBAC architecture.",
  },
  {
    org: 'Center for Teaching and Learning (CTL)',
    role: 'Undergraduate Research Assistant',
    when: 'May 2026 — now',
    desc: "At CTL, I'm collaborating with fellow Georgia Tech student Saloni Agshiker, Director of Research in Education Innovation Dr. Jeonghyun Lee, and research scientist Dr. Meryem Yilmaz Soylu to build a data-driven dashboard for Georgia Tech instructors. We capture real-time discussion forum data and analyze sentiment and cognitive presence. The NLP metrics are driven by a DistilBERT model, and we leverage agentic workflow to create personalized recommendations for instructors to improve their courses in real time. A rolling deployment in GT courses is being implemented through alignment strategy sessions with Georgia Tech faculty.",
  },
]

export const leadership = [
  { org: 'CS 1100 Pathways in Computing', role: 'Teaching Assistant', when: 'Aug 2026 — now' },
  { org: 'CHEFS at Tech', role: 'Vice President', when: 'Jan 2026 — now' },
]

export const projects = [
  {
    title: 'factr',
    img: '/img/factr.webp',
    blurb: 'Browser extension that flags Instagram misinformation through a deterministic multimodal pipeline, served from AWS Lambda.',
    tags: ['PyTorch', 'LLaVA', 'OpenCLIP', 'FastAPI', 'AWS Lambda'],
    href: 'https://github.com/elu139/factr',
  },
  {
    title: 'Premier League Transfer Spending',
    img: '/img/premier-league.webp',
    blurb: 'Scraped 500 relevant transfers from 75,000+ records and regressed big spending against survival for promoted clubs.',
    tags: ['Python', 'Pandas', 'BeautifulSoup', 'Matplotlib'],
    href: 'https://github.com/elu139/SportsAnalysis',
  },
  {
    title: 'Sector Growth & Impact Scoring',
    img: '/img/investment.webp',
    blurb: 'Mapped financial metrics into growth and impact scores across sectors with unsupervised Gaussian Mixture Models.',
    tags: ['PyTorch', 'scikit-learn', 'Pandas'],
  },
  {
    title: 'JobSight',
    img: '/img/jobsight.webp',
    blurb: 'A job-application platform for seekers, recruiters, and admins.',
    tags: ['Django', 'Python', 'SQLite'],
    href: 'https://github.com/elu139/JobSight',
  },
  {
    title: 'MATLAB Math Modeling Challenge',
    img: '/img/m3.webp',
    contain: true,
    blurb: 'Forecasting model for low-income housing metrics across several American cities.',
    tags: ['Python', 'Pandas', 'MATLAB'],
    href: '/m3_paper.pdf',
    linkLabel: 'Paper',
  },
  {
    title: 'MappR',
    img: '/img/mappr.webp',
    contain: true,
    blurb: 'Discover and share local community events on an interactive map.',
    tags: ['Django', 'Python', 'APIs'],
    href: 'https://github.com/elu139/MappR',
  },
  {
    title: 'Senior Home Sign-In',
    img: '/img/senior-home.webp',
    blurb: 'Visitor log app built for a local senior community — one of my first, still a favorite.',
    tags: ['Python', 'Tkinter'],
    href: 'https://github.com/elu139/SeniorHomeApp',
  },
  {
    title: 'The Climate Reality Project',
    img: '/img/climate.webp',
    blurb: 'A site giving access to 100+ climate education resources.',
    tags: ['HTML', 'CSS', 'JavaScript'],
  },
]

export const photos = [
  { src: '/img/cdmx.webp', w: 1000, h: 750, cap: "CDMX, Spring '26" },
  { src: '/img/opo.webp', w: 1000, h: 1333, cap: "OPO, Summer '25" },
  { src: '/img/atl.webp', w: 1000, h: 666, cap: "ATL, Spring '25" },
  { src: '/img/sta.webp', w: 1000, h: 750, cap: "St. A, Summer '26" },
  { src: '/img/nj.webp', w: 1000, h: 1333, cap: "NJ, Summer '24" },
  { src: '/img/sav.webp', w: 1000, h: 684, cap: "SAV, Winter '25" },
]
