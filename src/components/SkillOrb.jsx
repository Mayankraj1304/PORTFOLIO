export default function SkillOrb({ skill, index, active, onClick }) {
  const angle = ((Math.PI * 2) / 5) * index;

  return (
    <button
      className={`skill-orb ${active ? "active" : ""}`}
      style={{
        "--orb": skill.color,
        "--x": `${Math.cos(angle) * 32}%`,
        "--y": `${Math.sin(angle) * 24}%`,
      }}
      onClick={onClick}
      data-cursor
    >
      <span>{skill.name}</span>
    </button>
  );
}
