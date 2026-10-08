import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HiX, HiExternalLink, HiDownload } from 'react-icons/hi';
import { RESUME_URL } from '../../data/portfolioData';
import './ResumeModal.css';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="resume-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
          <motion.div
            className="resume-modal-content"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Modal Header */}
            <div className="resume-modal-header">
              <div className="resume-modal-title-group">
                <span className="resume-modal-badge">PDF DOCUMENT</span>
                <h3 className="resume-modal-title">Mushke Rohith Reddy — Resume</h3>
              </div>

              <div className="resume-modal-actions">
                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="resume-modal-btn resume-modal-btn--primary"
                  title="Open in new window"
                >
                  <HiExternalLink size={16} />
                  <span>Open Fullscreen</span>
                </a>
                <button
                  type="button"
                  className="resume-modal-close"
                  onClick={onClose}
                  aria-label="Close modal"
                >
                  <HiX size={20} />
                </button>
              </div>
            </div>

            {/* Modal Iframe Viewer */}
            <div className="resume-modal-body">
              <iframe
                src={RESUME_URL}
                title="Mushke Rohith Reddy Resume Preview"
                className="resume-modal-iframe"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ResumeModal;
