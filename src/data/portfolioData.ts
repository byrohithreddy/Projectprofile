import gateImg from '../assets/gate.png';
import githubImg from '../assets/github.png';
import linkedinImg from '../assets/linkdin.png';
import mailImg from '../assets/mail.png';
import movieImg from '../assets/movie.png';
import PIImg from '../assets/pi.png';
import newsImg from '../assets/news.png';
import resumeImg from '../assets/resume.png';
import startImg from '../assets/start.jpg';
import gdgImg from '../assets/gdg.jpeg';
import blitzImg from '../assets/blitz.jpg';

import cssImg from '../assets/css.png';
import gitImg from '../assets/git.png';
import htmlImg from '../assets/html.png';
import javaImg from '../assets/java.png';
import javascriptImg from '../assets/javascript.png';
import jupyterImg from '../assets/jupyte.png';
import linuxImg from '../assets/linux.png';
import mongodbImg from '../assets/mongoDB.png';
import powerbiImg from '../assets/powerbi.png';
import pythonImg from '../assets/python.png';
import reactImg from '../assets/react.png';
import sqlImg from '../assets/sql.png';
import vscodeImg from '../assets/vscode.png';
import resumePdf from '../assets/cv.pdf';

export const GITHUB_USERNAME = 'byrohithreddy';
export const EMAIL_ADDRESS = 'rohith2005hyd@gmail.com';
export const RESUME_URL = resumePdf;
export const LINKEDIN_URL = 'https://www.linkedin.com/in/mushkerohithreddy';
export const GITHUB_URL = 'https://github.com/byrohithreddy';

export interface ContactLink {
  label: string;
  value: string;
  href: string;
  image: string;
  isEmail?: boolean;
}

export const CONTACT_LINKS: ContactLink[] = [
  {
    label: 'rohith2005hyd@gmail.com',
    value: 'Click to copy email',
    href: 'mailto:rohith2005hyd@gmail.com',
    image: mailImg,
    isEmail: true,
  },
  {
    label: '.in/mushkerohithreddy',
    value: 'Professional updates',
    href: LINKEDIN_URL,
    image: linkedinImg,
  },
  {
    label: 'byrohithreddy',
    value: `github.com/${GITHUB_USERNAME}`,
    href: GITHUB_URL,
    image: githubImg,
  },
  {
    label: 'Resume',
    value: 'View resume',
    href: RESUME_URL,
    image: resumeImg,
  },
];

export interface Project {
  title: string;
  github: string;
  live: string;
  desc: string;
  tags: string[];
  image: string;
  category?: string;
  highlight?: string;
}

export const PROJECTS: Project[] = [
  {
    title: 'Fake News Detector (NLP)',
    github: 'https://github.com/byrohithreddy/Fake_news_detector_NLP',
    live: 'https://byrohithreddy-fake-news-detector.hf.space/',
    desc: 'NLP classifier using TF-IDF, Logistic Regression & Random Forest achieving 85%+ accuracy. Features an interactive Gradio interface for real-time predictions with a complete preprocessing pipeline.',
    tags: ['Python', 'NLP', 'Gradio', 'ML', 'TF-IDF'],
    image: newsImg,
    category: 'Machine Learning • NLP',
    highlight: '85%+ Accuracy',
  },
  {
    title: 'Movie Recommendation System',
    github: 'https://github.com/byrohithreddy/Movie_recommendation_system',
    live: 'https://byrohithreddy-movie-recommendation-system.hf.space/',
    desc: 'Content-based movie recommendation engine utilizing cosine similarity on TF-IDF vectors. Deployed on Hugging Face Spaces with instant similarity discovery.',
    tags: ['Python', 'NLP', 'NumPy', 'Scikit-learn'],
    image: movieImg,
    category: 'Recommendation Engine',
    highlight: 'TF-IDF Vectors',
  },
  {
    title: 'E-Gatepass Management System',
    github: 'https://github.com/byrohithreddy/Epass-management-system',
    live: 'https://byrohithreddy.github.io/Epass-management-system/',
    desc: 'Full-stack application with role-based access control and barcode-based verification. Features a real-time responsive dashboard for student gatepass authorization.',
    tags: ['React', 'Node.js', 'Barcode', 'Full-Stack'],
    image: gateImg,
    category: 'Full-Stack & Security',
    highlight: 'Role-Based Access',
  },
  {
    title: 'Free Payment Interface',
    github: 'https://github.com/byrohithreddy/Free-pi',
    live: 'https://free-pi.pages.dev/',
    desc: 'Free, developer-friendly UPI orchestration for Indian merchants with zero transaction fees. Fast-tracked payment verification and collection system.',
    tags: ['React', 'Node.js', 'FinTech', 'Full-Stack'],
    image: PIImg,
    category: 'FinTech Infrastructure',
    highlight: 'Zero Fees UPI',
  },
];

export interface SkillItem {
  name: string;
  image: string;
}

export const SKILLS: SkillItem[] = [
  { name: 'Python', image: pythonImg },
  { name: 'SQL', image: sqlImg },
  { name: 'MongoDB', image: mongodbImg },
  { name: 'React', image: reactImg },
  { name: 'JavaScript', image: javascriptImg },
  { name: 'Java', image: javaImg },
  { name: 'HTML', image: htmlImg },
  { name: 'CSS', image: cssImg },
  { name: 'Jupyter', image: jupyterImg },
  { name: 'Power BI', image: powerbiImg },
  { name: 'Git', image: gitImg },
  { name: 'Linux', image: linuxImg },
  { name: 'VS Code', image: vscodeImg },
];

export interface JourneyItem {
  period: string;
  title: string;
  place: string;
  detail: string;
  type: 'education' | 'experience';
}

export const JOURNEY: JourneyItem[] = [
  {
    period: 'June 2020 - May 2021',
    title: 'SSC',
    place: 'Narayana E-Techno School',
    detail: 'Completed Secondary School Certificate with 10/10 CGPA.',
    type: 'education',
  },
  {
    period: 'June 2021 - April 2023',
    title: 'Intermediate - MPC',
    place: 'Narayana Junior College',
    detail: 'Completed MPC stream with CGPA 8.7/10.',
    type: 'education',
  },
  {
    period: 'Aug 2023 - Present',
    title: 'B.Tech CSE (Data Science)',
    place: 'Undergraduate Program',
    detail: 'Pursuing Computer Science Engineering with Data Science specialization. Current CGPA: 8.7/10.',
    type: 'education',
  },
  {
    period: 'Aug 2024 - Sept 2024',
    title: 'Android Developer Intern',
    place: 'DevElet Company',
    detail: 'Worked as an Android Developer intern, gaining practical software development experience.',
    type: 'experience',
  },
];

export interface AchievementItem {
  title: string;
  label: string;
  desc: string;
  image: string;
  href: string;
}

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    title: 'Blitz Cohort',
    label: 'Highlights',
    desc: 'Completed startup Mentorship Program from ideation to MVP, working on Buddy through the BlitZ Startup Program from T-Hub as team lead.',
    image: blitzImg,
    href: 'https://www.linkedin.com/posts/mushkerohithreddy_startups-innovation-skills-activity-7241838610717560832-0uCH',
  },
  {
    title: 'Winner - Startup Competition',
    label: 'Highlights',
    desc: 'MRCET Startup Competition: secured first place among 30+ teams, pitching a credit card learning and optimization platform.',
    image: startImg,
    href: 'https://www.linkedin.com/posts/mushkerohithreddy_startup-innovation-onemanshow-activity-7226873749101264896-r7S8',
  },
  {
    title: 'Core Team Member',
    label: 'Highlights',
    desc: 'Part of organizing committee for GDG Internal Hackathon with 800+ participants and a team of 30 organizers.',
    image: gdgImg,
    href: 'https://www.linkedin.com/posts/mushkerohithreddy_gdg-recon2root-teamwork-activity-7455554205316067328-RPNC',
  },
];
