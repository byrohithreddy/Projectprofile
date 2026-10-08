import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS, type Project } from '../../data/portfolioData';
import './ProjectBento.css';

interface BentoCellProps {
  project: Project;
  slotIndex: number;
  className?: string;
}

const BentoCell: React.FC<BentoCellProps> = ({ project, slotIndex, className = '' }) => {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6.5;
    const rotateY = ((x - centerX) / centerX) * 6.5;

    setRotate({ x: rotateX, y: rotateY });
  }, []);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <motion.a
      ref={cardRef}
      href={project.github}
      target="_blank"
      rel="noreferrer"
      className={`apple-bento-cell apple-bento-cell--slot-${slotIndex} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(${
          isHovered ? 1.015 : 1
        }, ${isHovered ? 1.015 : 1}, 1)`,
        transition: isHovered
          ? 'transform 0.08s ease-out, box-shadow 0.25s ease, border-color 0.25s ease'
          : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Light shine overlay */}
      <div className="apple-bento-glow" aria-hidden="true" />

      {/* Content: ONLY Text & Image */}
      <div className="apple-bento-content">
        <div className="apple-bento-meta">
          <span className="apple-bento-category">{project.category || 'PROJECT'}</span>
          {project.highlight && <span className="apple-bento-highlight">{project.highlight}</span>}
        </div>

        <h3 className="apple-bento-title">{project.title}</h3>

        <p className="apple-bento-desc">{project.desc}</p>

        <div className="apple-bento-tags-text">
          {project.tags.join(' • ')}
        </div>
      </div>

      <div className="apple-bento-media">
        <img
          src={project.image}
          alt={project.title}
          className="apple-bento-img"
          loading="lazy"
          decoding="async"
        />
      </div>
    </motion.a>
  );
};

export const ProjectBento: React.FC = () => {
  const [rotationIndex, setRotationIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-rotation timer: rotate slots every 5.5 seconds unless paused by mouse hover
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setRotationIndex((prev) => (prev + 1) % PROJECTS.length);
    }, 5500);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Order projects based on current rotation
  const orderedProjects = PROJECTS.map((_, i) => {
    const projectIndex = (i + rotationIndex) % PROJECTS.length;
    return PROJECTS[projectIndex];
  });

  return (
    <div
      className="apple-bento-wrapper"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Bento Controls / Status Bar */}
      <div className="apple-bento-header-bar">
        <div className="apple-bento-status">
          <span className="apple-bento-status-dot" />
          <span className="apple-bento-status-label">
            {isPaused ? 'Auto-rotation paused' : 'Rotating bento grid'}
          </span>
        </div>

        <div className="apple-bento-controls">
          {PROJECTS.map((_, idx) => (
            <button
              key={idx}
              type="button"
              className={`apple-bento-control-dot ${
                rotationIndex === idx ? 'apple-bento-control-dot--active' : ''
              }`}
              onClick={() => setRotationIndex(idx)}
              aria-label={`View rotation layout ${idx + 1}`}
            />
          ))}
          <button
            type="button"
            className="apple-bento-rotate-btn"
            onClick={() => setRotationIndex((prev) => (prev + 1) % PROJECTS.length)}
          >
            Rotate Slots
          </button>
        </div>
      </div>

      {/* Asymmetric Bento Grid Matrix */}
      <div className="apple-bento-grid">
        <AnimatePresence mode="popLayout">
          {orderedProjects.map((project, slotIdx) => (
            <BentoCell
              key={`${project.title}-${slotIdx}`}
              project={project}
              slotIndex={slotIdx}
            />
          ))}
        </AnimatePresence>
      </div>

      <div className="apple-bento-footer-hint">
        Click any project card to inspect its full GitHub repository.
      </div>
    </div>
  );
};

export default ProjectBento;
