import './SkillColorStack.css';
import { SKILLS } from '../../data/portfolioData';

function SkillColorStack() {
  return (
    <div className="skills-stack">
      <div className="skills-stack__items">
        {SKILLS.map((skill) => (
          <button
            key={skill.name}
            className="skills-stack__item"
            aria-label={skill.name}
            type="button"
          >
            <img 
              src={skill.image} 
              alt={skill.name} 
              className="skills-stack__image" 
              loading="lazy"
              decoding="async"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default SkillColorStack;
