import './SkillColorStack.css';
import cssImg from '../../assets/css.png';
import gitImg from '../../assets/git.png';
import htmlImg from '../../assets/html.png';
import javaImg from '../../assets/java.png';
import javascriptImg from '../../assets/javascript.png';
import jupyterImg from '../../assets/jupyte.png';
import linuxImg from '../../assets/linux.png';
import mongodbImg from '../../assets/mongoDB.png';
import powerbiImg from '../../assets/powerbi.png';
import pythonImg from '../../assets/python.png';
import reactImg from '../../assets/react.png';
import sqlImg from '../../assets/sql.png';
import vscodeImg from '../../assets/vscode.png';

const SKILLS = [
  { name: 'HTML', image: htmlImg },
  { name: 'CSS', image: cssImg },
  { name: 'JavaScript', image: javascriptImg },
  { name: 'React', image: reactImg },
  { name: 'Python', image: pythonImg },
  { name: 'Java', image: javaImg },
  { name: 'SQL', image: sqlImg },
  { name: 'MongoDB', image: mongodbImg },
  { name: 'Jupyter', image: jupyterImg },
  { name: 'Power BI', image: powerbiImg },
  { name: 'Git', image: gitImg },
  { name: 'Linux', image: linuxImg },
  { name: 'VS Code', image: vscodeImg },
];

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
            <img src={skill.image} alt="" className="skills-stack__image" />
          </button>
        ))}
      </div>
    </div>
  );
}

export default SkillColorStack;
