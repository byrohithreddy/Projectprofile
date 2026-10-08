import { useEffect, useState } from 'react';
import './ProgressBar.css';

export function ProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (totalHeight > 0) {
            const currentScroll = window.scrollY;
            setScrollProgress(Math.min(100, Math.max(0, (currentScroll / totalHeight) * 100)));
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="scroll-progress-track" aria-hidden="true">
      <div 
        className="scroll-progress-indicator" 
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
      />
    </div>
  );
}

export default ProgressBar;
