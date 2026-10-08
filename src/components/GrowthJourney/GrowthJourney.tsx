import { MdSchool, MdWorkOutline } from 'react-icons/md';
import './GrowthJourney.css';
import { JOURNEY } from '../../data/portfolioData';

function GrowthJourney() {
  return (
    <div className="growth-timeline">
      {JOURNEY.map((item) => {
        const Icon = item.type === 'experience' ? MdWorkOutline : MdSchool;

        return (
          <div className="growth-timeline__item" key={`${item.period}-${item.title}`}>
            <div className="growth-timeline__period">{item.period}</div>
            <div className="growth-timeline__marker" aria-hidden="true">
              <Icon size={24} />
            </div>
            <article className="growth-timeline__card">
              <h3 className="growth-timeline__title">{item.title}</h3>
              <p className="growth-timeline__meta">{item.place}</p>
              <p className="growth-timeline__detail">{item.detail}</p>
            </article>
          </div>
        );
      })}
    </div>
  );
}

export default GrowthJourney;
