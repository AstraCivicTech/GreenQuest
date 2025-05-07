import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDailyChallenges } from "../adapters/ai-adapters";
import {
  getUserLevelInfo,
  updateUserLevelInfo,
} from "../adapters/user-adapter";
import {
  getChallenges,
  getCompletedChallenges,
  completeChallenge,
  addChallengeToDB,
} from "../adapters/challenge-adapter";
import CurrentUserContext from "../contexts/current-user-context";
import "../styles/DailyChallenges.css";

export default function DailyChallenges({ activeTab }) {
  const { id } = useParams(); // user ID from route
  const {
    levelInfo,
    setLevelInfo,
    completedChallenges,
    setCompletedChallenges,
  } = useContext(CurrentUserContext);

export default function DailyChallenges() {
  const { id } = useParams();
  const { levelInfo, setLevelInfo } = useContext(CurrentUserContext);
  const [completedChallenges, setCompletedChallenges] = useState([]);
  // AI info
  const [dailyChallenges, setDailyChallenges] = useState([]);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchAllData = async () => {
      const [levelData, levelError] = await getUserLevelInfo(id);
      if (!levelError) setLevelInfo(levelData);

      const [challengeData, challengeError] = await getChallenges(activeTab);
      if (!challengeError) setChallenges(challengeData);

      const [completed, completedError] = await getCompletedChallenges(id);
      if (!completedError) {
        // When app gets a list of completed challenge IDs from the server, it might return them as strings, that's why Number helps avoid this behavior by parsing strs into nums
        setCompletedChallenges(completed.map(Number));
      }
    };

    fetchAllData();
  }, [id, activeTab, setLevelInfo]);

  const handleChallengeComplete = async (challenge) => {
    if (!id || !challenge?.id) {
      console.error("Missing userId or challengeId", { id, challenge });
      return;
    }

    const [_, error] = await completeChallenge(id, challenge.id);
    if (error) return console.error("Challenge completion error:", error);

    const newExp = levelInfo.exp + challenge.experienceReward;
    const [updatedInfo, levelError] = await updateUserLevelInfo(id, newExp);

    if (!levelError) {
      setLevelInfo(updatedInfo);
      setCompletedChallenges((prev) => [...prev, Number(challenge.id)]);
    }
  };

  if (!levelInfo || challenges.length === 0) return <p>Loading...</p>;

  // Need to use the dailyChallenges state to display the challenges instead of the static challenges array
  // First I need to send the data to the backend database to get the id

  // return (
  //   <div>
  //     <h2>Daily Challenge</h2>
  //     <p>Complete the daily challenge to earn rewards!</p>
  //     <button onClick={handleClick}>Generate Challenges</button>
  //     {error && <p style={{ color: "red" }}>{error}</p>}
  //     {/* <p>{dailyChallenges}</p> */}
  //     <ul>
  //       {dailyChallenges &&
  //         dailyChallenges.map((challenge, index) => (
  //           <li key={index}>
  //             <strong>{challenge.type}</strong>: {challenge.description} (EXP:
  //             {challenge.exp})
  //           </li>
  //         ))}
  //     </ul>
  //   </div>
  // );
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
                  onChange={() => handleChallengeComplete(challenge)}
                />
                {challenge.description} ({challenge.experienceReward} XP)
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
