import { MdSchool, MdWorkOutline } from 'react-icons/md';
import './GrowthJourney.css';

const JOURNEY = [
  {
    period: 'June 2020 - May 2021',
    title: 'SSC',
    place: 'Narayana E-Techno School',
    detail: 'Completed Secondary School Certificate with 10/10 CGPA.',
    type: 'education',
  },
  {
    period: 'June 2021 - April 2023',
    title: 'Intermediate - MPC',
    place: 'Narayana Junior College',
    detail: 'Completed MPC stream with CGPA 8.7/10.',
    type: 'education',
  },
  {
    period: 'Aug 2023',
    title: 'B.Tech CSE (Data Science)',
    place: 'Undergraduate Program',
    detail: 'Pursuing Computer Science Engineering with Data Science specialization. Current CGPA: 8.7/10.',
    type: 'education',
  },
  {
    period: 'Aug 2024 - Sept 2024',
    title: 'Android Developer Intern',
    place: 'DevElet Company',
    detail: 'Worked as an Android Developer intern, gaining practical development experience.',
    type: 'experience',
  },
];

function GrowthJourney() {
  return (
    <div className="growth-timeline">
      {JOURNEY.map((item) => {
        const Icon = item.type === 'experience' ? MdWorkOutline : MdSchool;

        return (
          <div className="growth-timeline__item" key={`${item.period}-${item.title}`}>
            <div className="growth-timeline__period">{item.period}</div>
            <div className="growth-timeline__marker" aria-hidden="true">
              <Icon size={26} />
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
