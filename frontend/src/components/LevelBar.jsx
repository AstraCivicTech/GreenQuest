import "../styles/LevelBar.css";

export default function LevelBar({ level, exp, levelTitle, nextLevelExp }) {
  const percent = Math.min((exp / nextLevelExp) * 100, 100).toFixed(1);

  return (
    <div className="level-bar-container">
      <div className="level-bar-header">
        <h3>
          Level {level}: {levelTitle}
        </h3>
        <span>
          {exp} / {nextLevelExp} XP
        </span>
      </div>
      <div className="level-bar">
        <div className="level-bar-fill" style={{ width: `${percent}%` }}>
          <span className="percent-label">{percent}%</span>
        </div>
      </div>
    </div>
  );
}
