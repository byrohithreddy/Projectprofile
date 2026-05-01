import { useState, useEffect } from 'react';
import { VscCode, VscHome, VscVscodeInsiders, VscHistory, VscGraph, VscMail } from 'react-icons/vsc';
import Dock from './components/Dock/Dock';
import Lanyard from './components/Lanyard/Lanyard';
import Particles from './components/Particles/Particles';
import TextType from './components/TextType/TextType';
import BorderGlow from './components/BorderGlow/BorderGlow';
import CardSwap, { Card } from './components/CardSwap/CardSwap';
import SkillColorStack from './components/SkillColorStack/SkillColorStack';
import GrowthJourney from './components/GrowthJourney/GrowthJourney';
import AchievementStack from './components/AchievementStack/AchievementStack';
import TiltedCard from './components/TiltedCard/TiltedCard';
import gateImg from './assets/gate.png';
import githubImg from './assets/github.png';
import linkedinImg from './assets/linkdin.png';
import mailImg from './assets/mail.png';
import movieImg from './assets/movie.png';
import newsImg from './assets/news.png';
import resumeImg from './assets/resume.png';
import { MdOutlineAutoGraph } from "react-icons/md";

const GITHUB_USERNAME = 'byrohithreddy';
const CONTACT_LINKS = [
  {
    label: 'rohith2005hyd@gmail.com',
    value: 'Connect through email',
    href: 'mailto:rohith2005hyd@gmail.com',
    image: mailImg,
  },
  {
    label: '.in/mushkerohithreddy',
    value: 'Professional updates',
    href: 'https://www.linkedin.com/in/mushkerohithreddy',
    image: linkedinImg,
  },
  {
    label: 'byrohithreddy',
    value: `github.com/${GITHUB_USERNAME}`,
    href: `https://github.com/${GITHUB_USERNAME}`,
    image: githubImg,
  },
  {
    label: 'Resume',
    value: 'View resume',
    href: 'https://drive.google.com/file/d/1XuxZFqS5P0K7mLmBOE0U9dFBw7w_gT5b/view?usp=sharing',
    image: resumeImg,
  },
];

const PROJECTS = [
  {
    title: 'Fake News Detector (NLP)',
    github: 'https://github.com/byrohithreddy/Fake_news_detector_NLP',
    live: 'https://byrohithreddy-fake-news-detector.hf.space/',
    desc: 'NLP classifier using TF-IDF, Logistic Regression & Random Forest achieving 85%+ accuracy. Features an interactive Gradio interface for real-time predictions with a full preprocessing pipeline including tokenization and feature engineering.',
    tags: ['Python', 'NLP', 'Gradio', 'ML', 'TF-IDF'],
    image: newsImg,
  },
  {
    title: 'Movie Recommendation System',
    github: 'https://github.com/byrohithreddy/Movie_recommendation_system',
    live: 'https://byrohithreddy-movie-recommendation-system.hf.space/',
    desc: 'Content-based movie recommendation engine using cosine similarity on TF-IDF vectors. Deployed on Hugging Face Spaces with an interactive interface to discover similar movies instantly.',
    tags: ['Python', 'NLP', 'Numpy', 'Scikit-learn'],
    image: movieImg,
  },
  {
    title: 'E-Gatepass Management System',
    github: 'https://github.com/byrohithreddy/Epass-management-system',
    live: 'https://byrohithreddy.github.io/Epass-management-system/',
    desc: 'Full-stack web application with role-based access control and barcode-based verification. Features a responsive dashboard for real-time monitoring, reporting, and student gatepass management.',
    tags: ['React', 'Node.js', 'Barcode', 'Full-Stack'],
    image: gateImg,
  },
];
type Project = {
  title: string;
  github: string;
  live: string;
  desc: string;
  tags: string[];
  image: string;
};

function ProjectPanel({ project, visible }: { project: Project; visible: boolean }) {
  const [rendered, setRendered] = useState(visible);
  const [active, setActive] = useState(visible);

  useEffect(() => {
    if (visible) {
      setRendered(true);
      const t = setTimeout(() => setActive(true), 20);
      return () => clearTimeout(t);
    } else {
      setActive(false);
      const t = setTimeout(() => setRendered(false), 500);
      return () => clearTimeout(t);
    }
  }, [visible]);

  if (!rendered) return null;

  return (
    <div className={`project-panel ${active ? 'project-panel--in' : 'project-panel--out'}`}>
      <a href={project.github} target="_blank" rel="noreferrer" className="project-panel-title">
        {project.title}
      </a>
      <p className="project-panel-desc">{project.desc}</p>
      <div className="project-panel-tags">
        {project.tags.map((tag) => (
          <span key={tag} className="project-tag">{tag}</span>
        ))}
      </div>
      <a href={project.github} target="_blank" rel="noreferrer" className="project-btn">
        GitHub Repo <VscVscodeInsiders size={20} />
      </a>
    </div>
  );
}

function App() {
  const [repos, setRepos] = useState<number | null>(null);
  const [username, setUsername] = useState('');
  const [activeProject, setActiveProject] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 900);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`)
      .then((res) => res.json())
      .then((data) => {
        setRepos(data.public_repos);
        setUsername(data.login);
      });
  }, []);

  const digits = repos !== null
    ? repos.toString().padStart(3, '0').split('')
    : ['·', '·', '·'];

  const dockItems = [
    { icon: <VscHome size={18} />, label: 'Home', onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    { icon: <VscCode size={18} />, label: 'Projects', onClick: () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) },
    { icon: <MdOutlineAutoGraph size={18} />, label: 'Skills', onClick: () => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' }) },
    { icon: <VscHistory size={18} />, label: 'Growth', onClick: () => document.getElementById('growth-journey')?.scrollIntoView({ behavior: 'smooth' }) },
    { icon: <VscGraph size={18} />, label: 'Achievements', onClick: () => document.getElementById('achievements')?.scrollIntoView({ behavior: 'smooth' }) },
    { icon: <VscMail size={18} />, label: 'Contact', onClick: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) },
  ];

  return (
    <div className="app">
      <Particles
        className="particles-bg"
        particleColors={['#c084fc', '#a78bfa', '#e9d5ff']}
        particleCount={200}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover
        alphaParticles={false}
        disableRotation={false}
        pixelRatio={1}
      />
      <div className="hero-frame">
        <Lanyard position={[3, 0, 12]} gravity={[0, -40, 0]} />
        <div className="text-panel">
          <TextType
            className="hero"
            text={['Mushke Rohith Reddy']}
            typingSpeed={30}
            initialDelay={1000}
            pauseDuration={1000}
            showCursor
            cursorCharacter="|"
            deletingSpeed={0}
            variableSpeed={{ min: 40, max: 90 }}
            cursorBlinkDuration={0.55}
            loop={false}
          />
          <TextType
            className="hero-subtext"
            text={['Data Science undergraduate with experience in developing and deploying machine learning solutions, including NLP-based classification and recommendation systems. Proficient in Python, data analysis, and model building, with a focus on real-world applications and scalable solutions. Passionate about solving problems using data-driven approaches.']}
            typingSpeed={30}
            initialDelay={4000}
            pauseDuration={3200}
            showCursor
            cursorCharacter="|"
            deletingSpeed={0}
            variableSpeed={{ min: 40, max: 90 }}
            cursorBlinkDuration={0.55}
            loop={false}
          />
          <BorderGlow
            edgeSensitivity={30}
            glowColor="40 80 80"
            backgroundColor="transparent"
            borderRadius={28}
            glowRadius={40}
            glowIntensity={4}
            coneSpread={25}
            animated={false}
            colors={['#c084fc', '#f472b6', '#38bdf8']}
          >
            <div style={{ padding: '1.75em 2em', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {digits.map((d, i) => (
                    <div key={i} className="gh-digit">{d}</div>
                  ))}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.66)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                  Repositories
                </div>
              </div>
              <div style={{ width: '1px', height: '60px', background: 'rgba(255, 255, 255, 1)' }} />
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.3rem' }}>
                <div className="gh-username">@{username || GITHUB_USERNAME}</div>
                <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noreferrer" className="gh-url">
                  github.com/{GITHUB_USERNAME}
                </a>
              </div>
            </div>
          </BorderGlow>
        </div>
      </div>

      <div className="Projects" id="projects">
        <TextType
          className="heading"
          text={['Projects']}
          typingSpeed={10}
          initialDelay={1000}
          pauseDuration={1000}
          showCursor
          cursorCharacter="|"
          variableSpeed={{ min: 40, max: 90 }}
          cursorBlinkDuration={0.55}
          loop={false}
          startOnVisible
        />

        {isMobile ? (
          <div className="projects-mobile-layout">
            {PROJECTS.map((p, i) => (
              <div key={i} className="mobile-project-item">
                <a href={p.live} target="_blank" rel="noreferrer" className="mobile-project-img-link">
                  <img src={p.image} alt={p.title} className="mobile-project-img" />
                  <div className="mobile-project-img-overlay">
                    <span>View Live →</span>
                  </div>
                </a>
                <div className="mobile-project-info">
                  <a href={p.github} target="_blank" rel="noreferrer" className="project-panel-title">
                    {p.title}
                  </a>
                  <p className="project-panel-desc">{p.desc}</p>
                  <div className="project-panel-tags">
                    {p.tags.map((tag) => (
                      <span key={tag} className="project-tag">{tag}</span>
                    ))}
                  </div>
                  <a href={p.github} target="_blank" rel="noreferrer" className="project-btn">
                    GitHub Repo <VscVscodeInsiders size={20} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="projects-layout">
            {/* LEFT: description panel */}
            <div className="projects-info">
              {PROJECTS.map((p, i) => (
                <ProjectPanel key={i} project={p} visible={activeProject === i} />
              ))}
            </div>

            {/* RIGHT: card swap */}
            <CardSwap
              width={620}
              height={390}
              cardDistance={52}
              verticalDistance={50}
              delay={5000}
              pauseOnHover={true}
              skewAmount={6}
              onActiveChange={setActiveProject}
            >
              {PROJECTS.map((p, i) => (
                <Card key={i} customClass="project-card">
                  <a href={p.live} target="_blank" rel="noreferrer" className="project-card-img-link">
                    <img src={p.image} alt={p.title} className="project-card-img" />
                    <div className="project-card-img-overlay">
                      <span>View Live →</span>
                    </div>
                  </a>
                </Card>
              ))}
            </CardSwap>
          </div>
        )}
      </div>
      <div className="skills" id="skills">
        <TextType
          className="heading"
          text={['Skills']}
          typingSpeed={10}
          initialDelay={1000}
          pauseDuration={1000}
          showCursor
          cursorCharacter="|"
          variableSpeed={{ min: 40, max: 90 }}
          cursorBlinkDuration={0.55}
          loop={false}
          startOnVisible
        />
        <SkillColorStack />
      </div>
      <section className="growth-journey" id="growth-journey">
        <TextType
          className="heading"
          text={['Growth Journey']}
          typingSpeed={10}
          initialDelay={1000}
          pauseDuration={1000}
          showCursor
          cursorCharacter="|"
          variableSpeed={{ min: 40, max: 90 }}
          cursorBlinkDuration={0.55}
          loop={false}
          startOnVisible
        />
        <GrowthJourney />
      </section>
      <section className="achievements" id="achievements">
        <TextType
          className="heading"
          text={['Achievements']}
          typingSpeed={10}
          initialDelay={1000}
          pauseDuration={1000}
          showCursor
          cursorCharacter="|"
          variableSpeed={{ min: 40, max: 90 }}
          cursorBlinkDuration={0.55}
          loop={false}
          startOnVisible
        />
        <AchievementStack />
      </section>
      <section className="contact" id="contact">
        <TextType
          className="heading"
          text={['Contact']}
          typingSpeed={10}
          initialDelay={1000}
          pauseDuration={1000}
          showCursor
          cursorCharacter="|"
          variableSpeed={{ min: 40, max: 90 }}
          cursorBlinkDuration={0.55}
          loop={false}
          startOnVisible
        />
        <div className="contact-grid">
          {CONTACT_LINKS.map((link) => (
            <a key={link.label} className="contact-card-link" href={link.href} target="_blank" rel="noreferrer">
              <TiltedCard
                imageSrc={link.image}
                altText={`${link.label} contact card`}
                captionText={link.label}
                className={`contact-tilted-card contact-tilted-card--${link.label.toLowerCase()}`}
                containerHeight="220px"
                containerWidth="100%"
                imageHeight="220px"
                imageWidth="100%"
                rotateAmplitude={18}
                scaleOnHover={1.04}
                showMobileWarning={false}
                showTooltip
                displayOverlayContent
                overlayContent={
                  <div className="contact-card">
                  </div>
                }
              />
            </a>
          ))}
        </div>
      </section>
      <div className="dock-root">
        <Dock items={dockItems} panelHeight={68} baseItemSize={50} magnification={70} />
      </div>
    </div>
  );
}

export default App;
