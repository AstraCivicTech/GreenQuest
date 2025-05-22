import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import "../styles/LevelBar.css";

export default function LevelBar() {
  const { levelInfo } = useContext(CurrentUserContext);

  if (!levelInfo) {
    return <div className="level-ring level-ring-loading" />;
  }

  console.log(levelInfo);
  // Safely handle levelInfo and provide fallback values
  const level = levelInfo?.level || 0;
  const currentLevelExp = levelInfo?.currentLevelExp || 0;
  const nextLevelExp = levelInfo?.nextLevelExp || 1; // Avoid division by zero
  const exp = levelInfo?.exp || 0;

  console.log(`currentLevelExp: ${currentLevelExp}`);
  console.log(`nextLevelExp: ${nextLevelExp}`);
  console.log(`exp: ${exp}`);

  const percent = levelInfo
    ? Math.min(
        ((exp - currentLevelExp) /
          Math.max(nextLevelExp - currentLevelExp, 1)) *
          100,
        100
      ).toFixed(1)
    : 0;

  // Always call hooks
  const [prevLevel, setPrevLevel] = useState(null);
  const [shouldPulse, setShouldPulse] = useState(false);

  useEffect(() => {
    if (!levelInfo) return;

    if (prevLevel !== null && levelInfo.level > prevLevel) {
      setShouldPulse(true);
      setTimeout(() => setShouldPulse(false), 3000);
    }

    setPrevLevel(levelInfo.level);
  }, [level, prevLevel]);

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
