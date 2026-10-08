import './AchievementStack.css';
import { ACHIEVEMENTS } from '../../data/portfolioData';

function AchievementStack() {
  return (
    <div className="achievement-stack">
      {ACHIEVEMENTS.map((achievement) => (
        <article className="achievement-stack__card" key={achievement.title}>
          <div className="achievement-stack__content">
            <div className="achievement-stack__eyebrow">{achievement.label}</div>
            <h3 className="achievement-stack__title">{achievement.title}</h3>
            <p className="achievement-stack__desc">{achievement.desc}</p>
          </div>
          <a
            className="achievement-stack__link"
            href={achievement.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open LinkedIn post for ${achievement.title}`}
          >
            <img 
              src={achievement.image} 
              alt={achievement.title} 
              className="achievement-stack__image" 
              loading="lazy"
              decoding="async"
            />
            <span className="achievement-stack__cta">Highlights ↗</span>
          </a>
        </article>
      ))}
    </div>
  );
}

export default AchievementStack;
