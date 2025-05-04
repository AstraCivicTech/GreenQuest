import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getUserLevelInfo,
  updateUserLevelInfo,
} from "../adapters/user-adapter";
import CurrentUserContext from "../contexts/current-user-context";

const challenges = [
  { id: 1, description: "Take a walk", exp: 50 },
  { id: 2, description: "Recycle your trash", exp: 100 },
  { id: 3, description: "Plant a seed", exp: 150 },
];

export default function DailyChallenges() {
  const { id } = useParams();
  const { levelInfo, setLevelInfo } = useContext(CurrentUserContext);
  const [completedChallenges, setCompletedChallenges] = useState([]);

  useEffect(() => {
    const fetchUserLevel = async () => {
      const [data, error] = await getUserLevelInfo(id);
      if (!error) setLevelInfo(data);
    };
    fetchUserLevel();
  }, [id, setLevelInfo]);

  const handleChallengeComplete = async (challenge) => {
    const newExp = levelInfo.exp + challenge.exp;
    const [updatedInfo, error] = await updateUserLevelInfo(id, newExp);
    if (!error) {
      setLevelInfo(updatedInfo);
      setCompletedChallenges([...completedChallenges, challenge.id]);
    }
  };

  if (!levelInfo) return <p>Loading...</p>;

  return (
    <div className="daily-challenges-container">
      <h3>Today's Challenges</h3>
      <ul>
        {challenges.map((challenge) => (
          <li key={challenge.id} style={{ marginBottom: "1em" }}>
            <label>
              <input
                type="checkbox"
                disabled={completedChallenges.includes(challenge.id)}
                onChange={() => handleChallengeComplete(challenge)}
              />
              {challenge.description} ({challenge.exp} XP)
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
