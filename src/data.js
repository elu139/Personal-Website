// Content ported from the original site. Edit here to update the portfolio.

export const projects = [
  {
    title: 'factr',
    image: '/extra/factr icon.png',
    description:
      'Reduced misinformation detection false negatives by ~20% over unimodal baselines by developing a multimodal AI pipeline cross-validating BERT, CLIP, and AudioSet models. Deployed a scalable FastAPI service on Azure with Docker integration.',
    tags: ['BERT', 'CLIP', 'FastAPI', 'Azure', 'Docker'],
    link: 'https://github.com/elu139/factr',
    linkLabel: 'View Project',
  },
  {
    title: 'Investment Portfolio Scoring Framework',
    image: '/extra/investment_management.jpg',
    description:
      'Delivered interpretable 0–1 scaled growth potential and market impact scores for companies in a simulated $100K portfolio. Built data pipelines using Gaussian Mixture Models and real-time financial metrics from the FinancialModelingPrep API.',
    tags: ['Python', 'GMM', 'Finance API'],
    modal: 'investment',
    linkLabel: 'View Project',
  },
  {
    title: 'Premier League Transfer Analysis',
    image: '/extra/tanaka.webp',
    description:
      'Determined that investing in fewer, high-impact rather than many, low-impact players correlated with higher league survival rates. Analyzed ~500 transfer records (2008–2024) from 75K+ entries using BeautifulSoup, Seaborn, and Matplotlib.',
    tags: ['BeautifulSoup', 'Seaborn', 'Matplotlib'],
    link: 'https://github.com/elu139/SportsAnalysis',
    linkLabel: 'View Project',
  },
  {
    title: 'Senior Home Sign-In Application',
    image: '/extra/seniorcenter.png',
    description:
      'Improved accuracy and efficiency of daily resident and visitor log management at a local senior community. Developed a Python application with an accessible Tkinter interface tailored for elderly users and JSON-based data storage.',
    tags: ['Python', 'Tkinter', 'JSON'],
    link: 'https://github.com/elu139/SeniorHomeApp',
    linkLabel: 'View Project',
  },
  {
    title: 'The Climate Reality Project',
    image: '/extra/climate_reality.png',
    description:
      'Expanded access to 100+ climate education resources integrated into the curricula of 15 local schools and libraries. Developed a searchable HTML/CSS/JavaScript website with a TinyMCE rich text editor for real-time content publishing.',
    tags: ['HTML', 'CSS', 'JavaScript', 'TinyMCE'],
    modal: 'climate',
    linkLabel: 'View Project',
  },
  {
    title: 'Homelessness Prediction Model',
    image: '/extra/m3.png',
    description:
      'Achieved 0.86 AUC predictive accuracy in forecasting homelessness trends in U.S. cities. Developed a binomial logistic growth model to analyze complex socioeconomic datasets using Pandas and MATLAB for the MathWorks Math Modeling Challenge.',
    tags: ['Pandas', 'MATLAB', 'Modeling'],
    link: '/m3_paper.pdf',
    linkLabel: 'View Project',
  },
  {
    title: 'Movies Store',
    image: '/extra/movies_store.png',
    description:
      'A Django-based web app iteratively designed using software engineering principles over the course of half a semester.',
    tags: ['Django', 'Python', 'SQLite'],
    link: 'https://github.com/elu139/moviesstore',
    linkLabel: 'View Project',
  },
]

export const experience = [
  {
    title: 'Data-Driven Education at C21U Lab',
    image: '/extra/c21u.jpg',
    description:
      "Increased scalability of model training by generating a synthetic dataset with ~90% statistical similarity using OpenAI's o1 model. Built a React dashboard with pyLDAvis visualizations and developed a BERT-based classifier for cognitive presence categories.",
    tags: ['React', 'BERT', 'pyLDAvis', 'OpenAI'],
    modal: 'c21u',
    linkLabel: 'View Experience',
  },
]

export const skillClusters = [
  {
    name: 'Data & Analytics',
    landscape: 'forest',
    skills: ['Python', 'SQL', 'pandas / numpy', 'scikit-learn', 'Tableau / Power BI'],
  },
  {
    name: 'Statistics & Experimentation',
    landscape: 'water',
    skills: ['A/B Testing', 'Hypothesis Testing', 'Experiment Design'],
  },
  {
    name: 'ML & AI',
    landscape: 'mountain',
    skills: ['Machine Learning', 'Deep Learning', 'LLMs', 'NLP'],
  },
  {
    name: 'Product',
    landscape: 'meadow',
    skills: ['Product Thinking', 'Stakeholder Communication', 'Data Storytelling'],
  },
]

export const favoriteTracks = [
  '1xWrrP4Lhm9NCDdhelaWak',
  '5HQ639Z3ms3hnZx0KfWnkp',
  '1ykhHXDKcusw9Jo4zgJSM5',
  '2XPLk9RyWawxFmVDQsC0ke',
  '6VoIBz0VhCyz7OdEoRYDiA',
]
