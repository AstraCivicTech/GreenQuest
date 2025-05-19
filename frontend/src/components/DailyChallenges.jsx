import { useContext, useEffect, useState } from "react";
import {
  getUserLevelInfo,
  updateUserLevelInfo,
} from "../adapters/user-adapter";
import {
  getChallengesByCategory,
  getCompletedChallenges,
  completeChallenge,
} from "../adapters/challenge-adapter";

import CurrentUserContext from "../contexts/current-user-context";
import "../styles/dailyChallenges.css";

export const DailyChallenges = () => {
  const {
    currentUser,
    levelInfo,
    setLevelInfo,
    completedChallenges,
    setCompletedChallenges,
  } = useContext(CurrentUserContext);

  const [challenges, setChallenges] = useState([]);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (!currentUser?.id) return;

    const fetchAllData = async () => {
      const [levelData, levelError] = await getUserLevelInfo(currentUser.id);
      if (!levelError) setLevelInfo(levelData);

      const [challengeData, challengeError] = await getChallengesByCategory("Daily");
      if (!challengeError) setChallenges(challengeData);

      const [completed, completedError] = await getCompletedChallenges(
        currentUser.id
      );
      if (!completedError) {
        setCompletedChallenges(completed.map(Number));
      }
    };

    fetchAllData();
  }, [currentUser?.id, setLevelInfo]);

  const triggerParticles = (x, y, count = 8) => {
    const newParticles = Array.from({ length: count }).map((_, i) => ({
      id: Date.now() + i,
      x,
      y,
      offsetX: Math.random() * 200 - 100,
      offsetY: -Math.random() * 200 - 50,
    }));

    setParticles((prev) => [...prev, ...newParticles]);

    setTimeout(() => {
      setParticles((prev) =>
        prev.filter((p) => !newParticles.find((np) => np.id === p.id))
      );
    }, 4500);
  };

  const handleChallengeComplete = async (challenge, e) => {
    if (!currentUser?.id || !challenge?.id) return;

    const [_, error] = await completeChallenge(currentUser.id, challenge.id);
    if (error) return;

    const newExp = levelInfo.exp + challenge.experienceReward;
    const [updatedInfo, levelError] = await updateUserLevelInfo(
      currentUser.id,
      newExp
    );

    if (!levelError) {
      setLevelInfo(updatedInfo);
      setCompletedChallenges((prev) => [...prev, Number(challenge.id)]);

      const rect = e.target.getBoundingClientRect();
      triggerParticles(rect.left + 10, rect.top + 10);
    }
  };

  if (!levelInfo || challenges.length === 0) return <p>Loading...</p>;

  return (
    <div className="daily-challenges-container">
      <h3>Today's Challenges</h3>
      <ul>
        {challenges.map((challenge) => {
          const isCompleted = completedChallenges.includes(
            Number(challenge.id)
          );

          return (
            <li
              key={challenge.id}
              className={`challenge-item ${isCompleted ? "completed" : ""}`}
            >
              <label>
                <input
                  type="checkbox"
                  checked={isCompleted}
                  disabled={isCompleted}
                  onChange={(e) => handleChallengeComplete(challenge, e)}
                />
                {challenge.description} ({challenge.experienceReward} XP)
              </label>
            </li>
          );
        })}
      </ul>

      {particles.map((p) => (
        <div
          key={p.id}
          className="sparkle-particle"
          style={{
            top: "200px",
            left: "400px",
            position: "fixed",
            transform: "translate(0, -100px) scale(0.3)",
            animation:
              "fadeOut 1.3s ease-out forwards, sparkleTwinkle 1.3s ease-in-out",
          }}
        />
      ))}
    </div>
  );
};
