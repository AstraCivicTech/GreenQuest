import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import "../styles/LevelBar.css";

export default function LevelBar() {
  const { levelInfo } = useContext(CurrentUserContext);

  // Always call hooks
  const [prevLevel, setPrevLevel] = useState(null);
  const [shouldPulse, setShouldPulse] = useState(false);
  console.log(levelInfo);
  const percent = levelInfo
    ? Math.min((levelInfo.exp / levelInfo.nextLevelExp) * 100, 100).toFixed(1)
    : 0;

  useEffect(() => {
    if (!levelInfo) return;

    if (prevLevel !== null && levelInfo.level > prevLevel) {
      setShouldPulse(true);
      setTimeout(() => setShouldPulse(false), 1000);
    }

    setPrevLevel(levelInfo.level);
  }, [levelInfo, prevLevel]);

  if (!levelInfo) {
    return <div className="level-ring level-ring-loading" />;
  }

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
