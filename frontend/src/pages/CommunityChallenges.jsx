import { useState, useEffect, useContext } from "react";
import { CommunityChallengeForm } from "../components/CommunityChallengeForm";
import { CommunityChallengeCard } from "../components/CommunityChallengeCards";
import {
  getChallenges,
  getCompletedChallenges2,
  checkCategory,
} from "../adapters/challenge-adapter";
import { getUserLevelInfo } from "../adapters/user-adapter";
import CurrentUserContext from "../contexts/current-user-context";
import "../styles/CommunityChallengePage.css";

export const CommunityChallenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [completedCount, setCompletedCount] = useState(0);
  const [canComplete, setCanComplete] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const {
    currentUser,
    levelInfo,
    setLevelInfo,
    completedChallenges,
    setCompletedChallenges,
  } = useContext(CurrentUserContext);

  const fetchChallenges = async () => {
    try {
      const [data, error] = await getChallenges("community");

      if (error) {
        throw error;
      }

      console.log("Fetched data:", data); // Debug log

      const communityChallenges = data.filter(
        (challenge) => challenge.category === "community"
      );
      console.log("Filtered challenges:", communityChallenges); // Debug log

      setChallenges(communityChallenges);
      setIsLoading(false);
    } catch (err) {
      console.error("Fetch error:", err); // Debug log
      setError(err.message);
      setIsLoading(false);
    }
  };

  const fetchLevelInfo = async () => {
    const [levelData, levelError] = await getUserLevelInfo(id);
    if (!levelError) setLevelInfo(levelData);
  };

  // Should be called on every challenge in the completed challenges array
  const checkCompletionProgress = async (challengeId) => {
    try {
      const response = await checkCategory(challengeId);
      const category = response[0][0].category;

      if (category === "community") {
        // Use callback form of setState to ensure accurate count
        setCompletedCount((prevCount) => {
          const newCount = prevCount + 1;
          // Update canComplete based on new count
          if (completedCount >= 5) {
            setCanComplete(false);
          }

          console.log("canComplete:", canComplete);
          return newCount;
        });
      }
    } catch (error) {
      console.error("Error checking completion:", error);
    }
  };

  const fetchCompleted = async () => {
    try {
      const [data, error] = await getCompletedChallenges2(currentUser.id);
      if (error) throw error;

      setCompletedChallenges(data);

      // Reset count before checking challenges
      setCompletedCount(0);

      // Use Promise.all to process all challenges
      await Promise.all(
        data.map((challengeId) => checkCompletionProgress(challengeId))
      );
    } catch (error) {
      console.error("Error fetching completed challenges:", error);
    }
  };

  const refresh = () => {
    fetchChallenges();
  };

  useEffect(() => {
    fetchLevelInfo();
    fetchCompleted();
    fetchChallenges();
  }, []);

  if (isLoading) return <div>Loading challenges...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="community-challenges-container">
      <div className="create-challenge-section">
        <h2>Create a New Challenge</h2>
        <CommunityChallengeForm refresh={refresh} />
      </div>
      <h1>Community Challenges</h1>
      <p>
        Community Challenges Completed Today: <span>{completedCount}</span>/5
      </p>

      <div className="challenges-grid">
        {challenges.map((challenge) => (
          <CommunityChallengeCard
            key={challenge.id}
            challenge={challenge}
            levelInfo={levelInfo}
            setLevelInfo={setLevelInfo}
            completedChallenges={completedChallenges}
            setCompletedCount={setCompletedCount}
            completedCount={completedCount}
            canComplete={canComplete}
          />
        ))}
      </div>
    </div>
  );
};
