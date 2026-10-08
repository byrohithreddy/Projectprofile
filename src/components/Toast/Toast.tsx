import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HiCheckCircle } from 'react-icons/hi';
import './Toast.css';

interface ToastProps {
  message: string | null;
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          className="portfolio-toast"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          role="status"
          aria-live="polite"
        >
          <HiCheckCircle className="portfolio-toast__icon" />
          <span className="portfolio-toast__text">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
