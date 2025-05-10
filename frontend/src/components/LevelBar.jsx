import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import "../styles/LevelBar.css";

export default function LevelBar() {
  const { levelInfo } = useContext(CurrentUserContext);
  const [prevLevel, setPrevLevel] = useState(levelInfo?.level);
  const [shouldPulse, setShouldPulse] = useState(false);

  if (!levelInfo) return null;

  const percent = Math.min(
    (levelInfo.exp / levelInfo.nextLevelExp) * 100,
    100
  ).toFixed(1);

  useEffect(() => {
    if (levelInfo.level > prevLevel) {
      setShouldPulse(true);
      setTimeout(() => setShouldPulse(false), 1000);
      setPrevLevel(levelInfo.level);
    }
  }, [levelInfo.level, prevLevel]);

  return (
    <div
      className={`level-ring ${shouldPulse ? "pulse" : ""}`}
      style={{ "--progress": percent }}
      title={`Level ${levelInfo.level}: ${levelInfo.levelTitle} (${percent}%)`}
    >
      <div className="level-ring-inner"></div>
    </div>
  );
}
