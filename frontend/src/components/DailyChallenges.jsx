import { useState, useEffect, usePa } from "react";
import { useParams } from "react-router-dom";
import { getUserLevelInfo } from "../adapters/user-adapter";

const challenges = [
  { id: 1, description: "Take a walk", exp: 50 },
  { id: 2, description: "Recycle your trash", exp: 100 },
  { id: 3, description: "Plant a seed", exp: 150 },
];

export default function DailyChallenges() {
  const [userLevel, setUserLevel] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchUserLevel = async () => {
      // fetch level info
      const [levelData] = await getUserLevelInfo(id);
      set(levelData);
    };
  }, [userLevel]);

  const handleChallengeComplete = (expGained) => {
    setUserLevel((prevExp) => prevExp + expGained);
    // update user level and exp in DB
  };
}
