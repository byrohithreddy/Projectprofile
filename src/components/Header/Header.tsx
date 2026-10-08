import React, { useState, useEffect } from 'react';
import { HiDocumentText, HiMail } from 'react-icons/hi';
import './Header.css';

interface HeaderProps {
  onOpenResume: () => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ onOpenResume, activeSection }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`portfolio-header ${scrolled ? 'portfolio-header--scrolled' : ''}`}>
      <div className="portfolio-header__inner">
        {/* Brand Logo & Status */}
        <div className="portfolio-header__brand" onClick={() => scrollTo('home')}>
          <span className="portfolio-header__logo-text">Mushke Rohith Reddy</span>
          <span className="portfolio-header__status-dot-wrap" title="Available for Data Science & ML Opportunities">
            <span className="portfolio-header__status-ping" />
            <span className="portfolio-header__status-dot" />
          </span>
        </div>

        {/* Center Quick Navigation Links */}
        <nav className="portfolio-header__nav" aria-label="Main navigation">
          <button
            type="button"
            className={`portfolio-header__nav-link ${
              activeSection === 'projects' ? 'portfolio-header__nav-link--active' : ''
            }`}
            onClick={() => scrollTo('projects')}
          >
            Projects
          </button>
          <button
            type="button"
            className={`portfolio-header__nav-link ${
              activeSection === 'skills' ? 'portfolio-header__nav-link--active' : ''
            }`}
            onClick={() => scrollTo('skills')}
          >
            Skills
          </button>
          <button
            type="button"
            className={`portfolio-header__nav-link ${
              activeSection === 'growth-journey' ? 'portfolio-header__nav-link--active' : ''
            }`}
            onClick={() => scrollTo('growth-journey')}
          >
            Journey
          </button>
          <button
            type="button"
            className={`portfolio-header__nav-link ${
              activeSection === 'achievements' ? 'portfolio-header__nav-link--active' : ''
            }`}
            onClick={() => scrollTo('achievements')}
          >
            Achievements
          </button>
          <button
            type="button"
            className={`portfolio-header__nav-link ${
              activeSection === 'contact' ? 'portfolio-header__nav-link--active' : ''
            }`}
            onClick={() => scrollTo('contact')}
          >
            Contact
          </button>
        </nav>

        {/* Right CTA Actions */}
        <div className="portfolio-header__actions">
          <button
            type="button"
            className="portfolio-header__resume-btn"
            onClick={onOpenResume}
            title="Preview resume online"
          >
            <HiDocumentText size={16} />
            <span>Resume</span>
          </button>

          <button
            type="button"
            className="portfolio-header__contact-btn"
            onClick={() => scrollTo('contact')}
          >
            <HiMail size={16} />
            <span>Let's Talk</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
