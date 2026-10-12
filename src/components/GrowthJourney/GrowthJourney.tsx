import './GrowthJourney.css';
import { JOURNEY } from '../../data/portfolioData';

function GrowthJourney() {
  return (
    <ol className="growth-timeline">
      {JOURNEY.map((item) => (
        <li className="growth-timeline__item" key={`${item.period}-${item.title}`}>
          <div className="growth-timeline__period">
            <span>{item.period}</span>
            <span className="growth-timeline__kind">
              {item.type === 'experience' ? 'Experience' : 'Education'}
            </span>
          </div>
          <article className="growth-timeline__entry">
            <h3 className="growth-timeline__title">{item.title}</h3>
            <p className="growth-timeline__meta">{item.place}</p>
            <p className="growth-timeline__detail">{item.detail}</p>
          </article>
        </li>
      ))}
    </ol>
  );
}

export default GrowthJourney;
