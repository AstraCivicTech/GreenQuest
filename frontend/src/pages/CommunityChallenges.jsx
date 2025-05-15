import { useState, useEffect, useContext } from "react";
import { CommunityChallengeForm } from "../components/CommunityChallengeForm";
import { CommunityChallengeCard } from "../components/CommunityChallengeCards";
import {
  getChallenges,
  getCompletedChallenges2,
} from "../adapters/challenge-adapter";
import { getUserLevelInfo } from "../adapters/user-adapter";
import CurrentUserContext from "../contexts/current-user-context";
import "../styles/CommunityChallengePage.css";

export const CommunityChallenges = () => {
  const [challenges, setChallenges] = useState([]);
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

  const fetchCompleted = async () => {
    // "/api/users/completed-challenges"
    try {
      console.log("fetch completed current user:", currentUser);
      const [data, error] = await getCompletedChallenges2(currentUser.id);
      console.log("data from fe.Comp.:", data);
      setCompletedChallenges(data);
    } catch (error) {
      console.error(error.message);
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

      <div className="challenges-grid">
        {challenges.map((challenge) => (
          <CommunityChallengeCard
            key={challenge.id}
            challenge={challenge}
            levelInfo={levelInfo}
            setLevelInfo={setLevelInfo}
            completedChallenges={completedChallenges}
          />
        ))}
      </div>
    </div>
  );
};
