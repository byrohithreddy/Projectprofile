import startImg from '../../assets/start.jpg';
import gdgImg from '../../assets/gdg.jpeg';
import blitzImg from '../../assets/blitz.jpg';
import './AchievementStack.css';

const ACHIEVEMENTS = [
  {
    title: 'Blitz Cohort',
    label: 'Highlights',
    desc: 'Completed startup Mentorship Program From ideation to MVP, working on Buddy through the BlitZ Startup Program from T-Hub has been an incredible experience, led a team TEAM : Buddy',
    image: blitzImg,
    href: 'https://www.linkedin.com/posts/mushkerohithreddy_startups-innovation-skills-activity-7241838610717560832-0uCH',
  },
  {
    title: 'Winner',
    label: 'Highlights',
    desc: 'MRCET Startup Competition secured first place among 30+ teams,pitched Credit card leaning platform ',
    image: startImg,
    href: 'https://www.linkedin.com/posts/mushkerohithreddy_startup-innovation-onemanshow-activity-7226873749101264896-r7S8',
  },
  {
    title: 'Core Team Member',
    label: 'Highlights',
    desc: 'Part of Organizing committee, Organized GDG Internal Hackathon with 800+ participants with a team of 30 members',
    image: gdgImg,
    href: 'https://www.linkedin.com/posts/mushkerohithreddy_gdg-recon2root-teamwork-activity-7455554205316067328-RPNC',
  },
];

function AchievementStack() {
  return (
    <div className="achievement-stack">
      {ACHIEVEMENTS.map((achievement) => (
        <article className="achievement-stack__card" key={achievement.title}>
          <div className="achievement-stack__content">
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
            <img src={achievement.image} alt={achievement.title} className="achievement-stack__image" />
            <span className="achievement-stack__cta">Highlights</span>
          </a>
        </article>
      ))}
    </div>
  );
}

export default AchievementStack;
