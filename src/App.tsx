import { useState, useEffect, useCallback } from 'react';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import { VscCode, VscHome, VscVscodeInsiders, VscHistory, VscGraph, VscMail } from 'react-icons/vsc';
import { MdOutlineAutoGraph } from 'react-icons/md';

import Dock from './components/Dock/Dock';
import Lanyard from './components/Lanyard/Lanyard';
import BorderGlow from './components/BorderGlow/BorderGlow';
import MagicBento from './components/MagicBento/MagicBento';
import SkillColorStack from './components/SkillColorStack/SkillColorStack';
import GrowthJourney from './components/GrowthJourney/GrowthJourney';
import AchievementStack from './components/AchievementStack/AchievementStack';
import TiltedCard from './components/TiltedCard/TiltedCard';
import ProgressBar from './components/ProgressBar/ProgressBar';
import StatusBadge from './components/StatusBadge/StatusBadge';
import Toast from './components/Toast/Toast';
import ContactSection from './components/ContactSection/ContactSection';

import frontImage from './assets/frontImage.png';
import backImage from './assets/backImage.png';
import lanyardStrap from './assets/lanyard.png';

import {
  GITHUB_USERNAME,
  EMAIL_ADDRESS,
  CONTACT_LINKS,
  PROJECTS,
} from './data/portfolioData';

function App() {
  const [loaded, setLoaded] = useState(false);
  const [repos, setRepos] = useState<number | null>(null);
  const [username, setUsername] = useState('');
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 900);
  const [activeSection, setActiveSection] = useState('home');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 900);
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch GitHub repos count
  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`)
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.public_repos === 'number') {
          setRepos(data.public_repos);
        }
        if (data.login) {
          setUsername(data.login);
        }
      })
      .catch(() => {
        // Fallback default
        setRepos(12);
        setUsername(GITHUB_USERNAME);
      });
  }, []);

  // Active section scroll spy
  useEffect(() => {
    const sections = [
      { id: 'home', topOffset: 0 },
      { id: 'projects', el: document.getElementById('projects') },
      { id: 'skills', el: document.getElementById('skills') },
      { id: 'growth-journey', el: document.getElementById('growth-journey') },
      { id: 'achievements', el: document.getElementById('achievements') },
      { id: 'contact', el: document.getElementById('contact') },
    ];

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const middleY = scrollY + windowHeight * 0.35;

      let current = 'home';
      for (const section of sections) {
        if (section.el) {
          const top = section.el.offsetTop;
          if (middleY >= top - 120) {
            current = section.id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [loaded]);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 3200);
    return () => clearTimeout(timer);
  }, []);

  const handleCopyEmail = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (navigator.clipboard) {
        navigator.clipboard.writeText(EMAIL_ADDRESS).then(() => {
          showToast(`Copied to clipboard: ${EMAIL_ADDRESS}`);
        });
      } else {
        showToast(`Email: ${EMAIL_ADDRESS}`);
      }
    },
    [showToast],
  );

  const digits = repos !== null ? repos.toString().padStart(3, '0').split('') : ['0', '1', '2'];

  const dockItems = [
    {
      icon: <VscHome size={18} />,
      label: 'Home',
      active: activeSection === 'home',
      onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
    },
    {
      icon: <VscCode size={18} />,
      label: 'Projects',
      active: activeSection === 'projects',
      onClick: () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }),
    },
    {
      icon: <MdOutlineAutoGraph size={18} />,
      label: 'Skills',
      active: activeSection === 'skills',
      onClick: () => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' }),
    },
    {
      icon: <VscHistory size={18} />,
      label: 'Growth',
      active: activeSection === 'growth-journey',
      onClick: () => document.getElementById('growth-journey')?.scrollIntoView({ behavior: 'smooth' }),
    },
    {
      icon: <VscGraph size={18} />,
      label: 'Achievements',
      active: activeSection === 'achievements',
      onClick: () => document.getElementById('achievements')?.scrollIntoView({ behavior: 'smooth' }),
    },
    {
      icon: <VscMail size={18} />,
      label: 'Contact',
      active: activeSection === 'contact',
      onClick: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }),
    },
  ];

  return (
    <>
      <ProgressBar />
      <Toast message={toastMessage} />

      {!loaded && <LoadingScreen onFinish={() => setLoaded(true)} />}

      <div
        className="app"
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.6s ease',
          pointerEvents: loaded ? 'auto' : 'none',
        }}
      >
        {/* HERO SECTION */}
        <section className="hero-frame" id="home">
          <Lanyard
            className="lanyard-wrap"
            frontImage={frontImage}
            backImage={backImage}
            strapImage={lanyardStrap}
            orientation="portrait"
            finish="glossy"
            cornerRadius={0.3}
            size={isMobile ? 0.72 : 0.65}
            strapLength={isMobile ? 0.38 : 0.45}
            strapWidth={0.65}
            metal="silver"
            interactive={true}
            intro={true}
          />

          <div className="text-panel">
            {/* Availability / Status Badge */}
            <StatusBadge statusText="Available for Data Science & ML Opportunities" />

            <h1 className="hero">Mushke Rohith Reddy</h1>
            <p className="hero-subtext">
              Data science undergraduate building practical machine learning tools, from NLP classification to
              recommendation systems. Focused on Python, careful analysis, and models that solve real problems.
            </p>

            {/* Clean Minimal GitHub Stats Pill */}
            <BorderGlow
              edgeSensitivity={30}
              glowColor="0 0 95"
              backgroundColor="transparent"
              borderRadius={28}
              glowRadius={36}
              glowIntensity={2}
              coneSpread={25}
              animated={false}
              colors={['#ffffff', '#cbd5e1', '#94a3b8']}
            >
              <div
                style={{
                  padding: '1.5em 2em',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '2rem',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {digits.map((d, i) => (
                      <div key={i} className="gh-digit">
                        {d}
                      </div>
                    ))}
                  </div>
                  <div
                    style={{
                      fontSize: '0.68rem',
                      color: '#94a3b8',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    Repositories
                  </div>
                </div>

                <div style={{ width: '1px', height: '54px', background: 'rgba(255, 255, 255, 0.16)' }} />

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.25rem' }}>
                  <div className="gh-username">@{username || GITHUB_USERNAME}</div>
                  <a
                    href={`https://github.com/${GITHUB_USERNAME}`}
                    target="_blank"
                    rel="noreferrer"
                    className="gh-url"
                  >
                    github.com/{GITHUB_USERNAME}
                  </a>
                </div>
              </div>
            </BorderGlow>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <div className="Projects" id="projects">
          <h2 className="heading">Selected work</h2>

          <MagicBento
            enableStars={false}
            enableSpotlight={false}
            enableBorderGlow={false}
            enableTilt={false}
            enableMagnetism={false}
            clickEffect={false}
            spotlightRadius={320}
            particleCount={12}
            glowColor="181, 151, 103"
          />
        </div>

        {/* SKILLS SECTION */}
        <div className="skills" id="skills">
          <h2 className="heading">Tools I use</h2>
          <SkillColorStack />
        </div>

        {/* GROWTH JOURNEY SECTION */}
        <section className="growth-journey" id="growth-journey">
          <h2 className="heading">A little context</h2>
          <GrowthJourney />
        </section>

        {/* ACHIEVEMENTS SECTION */}
        <section className="achievements" id="achievements">
          <h2 className="heading">Milestones</h2>
          <AchievementStack />
        </section>

        {/* CONTACT SECTION WITH MODERN INTERACTIVE HUB */}
        <section className="contact" id="contact">
          <h2 className="heading">Start a conversation</h2>

          <ContactSection onShowToast={showToast} />
        </section>

        {/* BOTTOM FLOATING DOCK WITH ACTIVE INDICATOR */}
        <div className="dock-root">
          <Dock
            items={dockItems}
            panelHeight={isMobile ? 54 : 64}
            baseItemSize={isMobile ? 38 : 48}
            magnification={isMobile ? 50 : 66}
            distance={isMobile ? 140 : 200}
          />
        </div>
      </div>
    </>
  );
}

export default App;
