import { useContext } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import "../styles/LevelBar.css";

export default function LevelBar() {
  const { levelInfo } = useContext(CurrentUserContext);

  if (!levelInfo) return null;

  const percent = Math.min(
    (levelInfo.exp / levelInfo.nextLevelExp) * 100,
    100
  ).toFixed(1);

  return (
    <div className="level-bar-container">
      <div className="level-bar-header">
        <h3>
          Level {levelInfo.level}: {levelInfo.levelTitle}
        </h3>
        <span>
          {levelInfo.exp} / {levelInfo.nextLevelExp} XP
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
