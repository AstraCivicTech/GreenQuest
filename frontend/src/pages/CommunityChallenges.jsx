import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import {
  getChallenges,
  getCompletedChallenges,
} from "../adapters/challenge-adapter";
import { CommunityChallengeForm } from "../components/CommunityChallengeForm";
import { CommunityChallengeCard } from "../components/CommunityChallengeCard";

export const CommunityChallengesPage = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const [challenges, setChallenges] = useState([]);
  const [completedChallenges, setCompletedChallenges] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        setLoading(true);
        const [challengesResponse, completedResponse] = await Promise.all([
          getChallenges("community"),
          getCompletedChallenges(currentUser.id),
        ]);

        const challengesData = await challengesResponse.json();
        console.log("Challenges loaded:", challengesData);

        if (completedResponse.ok) {
          const completedData = await completedResponse.json();
          const completedIds = completedData.map((id) => Number(id));
          console.log("Completed challenges:", completedIds);
          setCompletedChallenges(completedIds);
        }

        setChallenges(challengesData);
      } catch (error) {
        console.error("Error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchChallenges();
    }
  }, [currentUser]);

  if (!currentUser) return <Navigate to="/login" />;
  if (loading) return <div>Loading challenges...</div>;
  if (error) return <div>Error fetching community challenges: {error}</div>;

  return (
    <div className="community-challenges-page">
      <h1>Community Challenges</h1>
      <p>
        Welcome to the Community Challenges page! Here, you can view and
        participate in challenges created by other users. As well as create your
        own!
      </p>
      <CommunityChallengeForm />
      <div className="challenges-container">
        {challenges.length > 0 ? (
          <>
            <h2>Available Challenges</h2>
            <div className="challenges-grid">
              {challenges.map((challenge) => (
                <CommunityChallengeCard
                  key={challenge.id}
                  challenge={challenge}
                  isCompleted={completedChallenges.includes(
                    Number(challenge.id)
                  )}
                />
              ))}
            </div>
          </>
        ) : (
          <p>No challenges available yet.</p>
        )}
      </div>
    </div>
  );
};
