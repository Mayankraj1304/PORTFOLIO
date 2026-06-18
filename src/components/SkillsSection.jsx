import { Sparkles } from "lucide-react";
import SkillOrb from "./SkillOrb";

export default function SkillsSection({ skills, activeSkill, setActiveSkill }) {
  return (
    <section id="skills" className="section ecosystem">
      <div className="section-kicker">Skill Ecosystem</div>
      <h2>Technologies orbit like living planets.</h2>
      <div className="orbit-system">
        {skills.map((skill, index) => (
          <SkillOrb
            key={skill.name}
            skill={skill}
            index={index}
            active={activeSkill === index}
            onClick={() => setActiveSkill(index)}
          />
        ))}
        <div className="skill-detail">
          <Sparkles />
          <h3>{skills[activeSkill].name}</h3>
          <p>{skills[activeSkill].strength}% operational confidence</p>
          <div>
            {skills[activeSkill].tech.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
