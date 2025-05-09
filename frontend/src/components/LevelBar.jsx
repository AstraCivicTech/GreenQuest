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
    <div
      className="level-ring"
      style={{ "--progress": percent }}
      title={`Level ${levelInfo.level}: ${levelInfo.levelTitle} (${percent}%)`}
    >
      <div className="level-ring-inner"></div>
    </div>
  );
}
