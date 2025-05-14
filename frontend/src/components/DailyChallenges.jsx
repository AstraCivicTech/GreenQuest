import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
import "../styles/dailyChallenges.css";

export const DailyChallenges = ({ activeTab }) => {
  const { id } = useParams(); // user ID from route
  const {
    levelInfo,
    setLevelInfo,
    completedChallenges,
    setCompletedChallenges,
    currentUser,
  } = useContext(CurrentUserContext);

  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        // Use activeTab prop for category
        const dailyResponse = await getChallenges("daily");
        console.log("Response (daily):", dailyResponse); // Add this for debugging

        if (!dailyResponse.ok) {
          throw new Error("Failed to fetch challenges");
        }

        const dailyData = await dailyResponse.json();
        console.log("Challenge data (daily):", dailyData); // Add this for debugging

        // Fetch completed challenges if user is logged in
        let completedData = [];
        if (currentUser) {
          const completedResponse = await getCompletedChallenges(
            currentUser.id
          );
          if (completedResponse.ok) {
            completedData = await completedResponse.json();
          }
        }

        setChallenges(dailyData);
        setCompletedChallenges(completedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [activeTab, currentUser]); // Add activeTab to dependencies

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!levelInfo || challenges.length === 0)
    return <p>No challenges available</p>;

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
};
