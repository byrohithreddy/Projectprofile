import React, { useState } from 'react';
import {
  HiMail,
  HiDocumentText,
  HiClipboardCopy,
  HiCheck,
  HiExternalLink,
  HiEye,
  HiArrowRight,
  HiSparkles,
} from 'react-icons/hi';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import {
  EMAIL_ADDRESS,
  RESUME_URL,
  LINKEDIN_URL,
  GITHUB_URL,
  GITHUB_USERNAME,
} from '../../data/portfolioData';
import ResumeModal from '../ResumeModal/ResumeModal';
import './ContactSection.css';

interface ContactSectionProps {
  onShowToast: (msg: string) => void;
}

const TOPICS = [
  'Data Science / ML Opportunity',
  'Project Collaboration',
];

export const ContactSection: React.FC<ContactSectionProps> = ({ onShowToast }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Quick message form state
  const [name, setName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [selectedTopic, setSelectedTopic] = useState(TOPICS[0]);
  const [message, setMessage] = useState('');

  const handleCopyEmail = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(EMAIL_ADDRESS).then(() => {
        setCopiedEmail(true);
        onShowToast(`Copied to clipboard: ${EMAIL_ADDRESS}`);
        setTimeout(() => setCopiedEmail(false), 2400);
      });
    } else {
      onShowToast(`Email: ${EMAIL_ADDRESS}`);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[Portfolio Inquiry] ${selectedTopic} - from ${name || 'Colleague'}`);
    const body = encodeURIComponent(
      `Hi Rohith,\n\n${message || 'I came across your portfolio and would like to connect with you regarding opportunities.'}\n\nBest regards,\n${name || 'A Visitor'}\n${senderEmail ? `Email: ${senderEmail}` : ''}`
    );
    window.location.href = `mailto:${EMAIL_ADDRESS}?subject=${subject}&body=${body}`;
    onShowToast('Opening your email client to send message...');
  };

  return (
    <div className="contact-section-container">
      {/* Resume Viewer Modal */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />

      {/* Subtitle Banner */}
      <div className="contact-header-info">
        <p className="contact-lead-text">
          Have an exciting role, a machine learning problem, or a project in mind? Let’s talk.
        </p>
        <div className="contact-status-pills">
          <span className="contact-pill">
            <span className="contact-pill-dot" /> Open for Data Science & ML Roles
          </span>
        </div>
      </div>

      <div className="contact-layout-grid">
        {/* LEFT COLUMN: Interactive Message Composer */}
        <div className="contact-form-card">
          <div className="contact-card-badge">
            <HiSparkles size={14} /> Quick Connect
          </div>
          <h3 className="contact-form-title">Send a Direct Message</h3>
          <p className="contact-form-subtitle">
            Fill in your note or pick a topic to instantly initiate a conversation.
          </p>

          <form onSubmit={handleSendMessage} className="contact-form">
            <div className="contact-topics">
              <label className="contact-field-label">Select Purpose</label>
              <div className="contact-topic-chips">
                {TOPICS.map((topic) => (
                  <button
                    key={topic}
                    type="button"
                    className={`contact-topic-chip ${
                      selectedTopic === topic ? 'contact-topic-chip--active' : ''
                    }`}
                    onClick={() => setSelectedTopic(topic)}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>

            <div className="contact-form-row">
              <div className="contact-field-group">
                <label className="contact-field-label" htmlFor="contact-name">
                  Your Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="e.g. Alex Smith"
                  className="contact-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="contact-field-group">
                <label className="contact-field-label" htmlFor="contact-email">
                  Your Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="e.g. alex@company.com"
                  className="contact-input"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="contact-field-group">
              <label className="contact-field-label" htmlFor="contact-message">
                Message / Brief
              </label>
              <textarea
                id="contact-message"
                placeholder="Tell me about the role, project, or what you'd like to collaborate on..."
                rows={4}
                className="contact-textarea"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="contact-submit-btn">
              <span>Compose & Send Message</span>
              <HiArrowRight size={18} />
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN: Executive Direct Hub & Resume */}
        <div className="contact-hub-cards">
          {/* CARD 1: RESUME SHOWCASE */}
          <div className="contact-hub-card contact-hub-card--resume">
            <div className="contact-hub-card-header">
              <div className="contact-hub-icon-wrapper contact-hub-icon-wrapper--cyan">
                <HiDocumentText size={24} />
              </div>
              <div className="contact-hub-title-group">
                <div className="contact-hub-tag">CURRICULUM VITAE</div>
                <h4 className="contact-hub-title">Download or Preview Resume</h4>
              </div>
            </div>

            <p className="contact-hub-desc">
              Data Science undergraduate with practical experience in ML, NLP classification, and end-to-end full-stack architectures.
            </p>

            <div className="contact-resume-actions">
              <button
                type="button"
                className="contact-action-btn contact-action-btn--preview"
                onClick={() => setIsResumeOpen(true)}
              >
                <HiEye size={16} />
                <span>Live Preview</span>
              </button>

              <a
                href={RESUME_URL}
                target="_blank"
                rel="noreferrer"
                className="contact-action-btn contact-action-btn--external"
              >
                <HiExternalLink size={16} />
                <span>Open in Tab</span>
              </a>
            </div>
          </div>

          {/* CARD 2: DIRECT EMAIL HUB */}
          <div className="contact-hub-card contact-hub-card--email">
            <div className="contact-hub-card-header">
              <div className="contact-hub-icon-wrapper contact-hub-icon-wrapper--emerald">
                <HiMail size={24} />
              </div>
              <div className="contact-hub-title-group">
                <div className="contact-hub-tag">PRIMARY INBOX</div>
                <h4 className="contact-hub-title">{EMAIL_ADDRESS}</h4>
              </div>
            </div>

            <p className="contact-hub-desc">
              Preferred contact channel for recruiters, opportunities, and discussions.
            </p>

            <div className="contact-resume-actions">
              <button
                type="button"
                className="contact-action-btn contact-action-btn--copy"
                onClick={handleCopyEmail}
              >
                {copiedEmail ? <HiCheck size={16} color="#10b981" /> : <HiClipboardCopy size={16} />}
                <span>{copiedEmail ? 'Copied Address!' : 'Copy Email'}</span>
              </button>

              <a
                href={`mailto:${EMAIL_ADDRESS}`}
                className="contact-action-btn contact-action-btn--external"
              >
                <HiExternalLink size={16} />
                <span>Open Mail Client</span>
              </a>
            </div>
          </div>

          {/* CARD 3 & 4: SOCIAL TILES (LINKEDIN & GITHUB) */}
          <div className="contact-social-grid">
            {/* LinkedIn */}
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              className="contact-social-tile contact-social-tile--linkedin"
            >
              <div className="contact-social-tile-inner">
                <div className="contact-social-icon-box">
                  <FaLinkedin size={22} />
                </div>
                <div>
                  <div className="contact-social-platform">LinkedIn</div>
                  <div className="contact-social-handle">mushkerohithreddy</div>
                </div>
              </div>
              <HiExternalLink size={16} className="contact-social-arrow" />
            </a>

            {/* GitHub */}
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="contact-social-tile contact-social-tile--github"
            >
              <div className="contact-social-tile-inner">
                <div className="contact-social-icon-box">
                  <FaGithub size={22} />
                </div>
                <div>
                  <div className="contact-social-platform">GitHub</div>
                  <div className="contact-social-handle">@{GITHUB_USERNAME}</div>
                </div>
              </div>
              <HiExternalLink size={16} className="contact-social-arrow" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
