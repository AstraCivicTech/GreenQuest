import { useState, useEffect } from "react";
import { CommunityChallengeForm } from "../components/CommunityChallengeForm";
import { CommunityChallengeCard } from "../components/CommunityChallengeCards";
import { getChallenges } from "../adapters/challenge-adapter";
import "../styles/CommunityChallengePage.css";

export const CommunityChallenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

    fetchChallenges();
  }, []);

  if (isLoading) return <div>Loading challenges...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="community-challenges-container">
      <div className="create-challenge-section">
        <h2>Create a New Challenge</h2>
        <CommunityChallengeForm />
      </div>
      <h1>Community Challenges</h1>

      <div className="challenges-grid">
        {challenges.map((challenge) => (
          <CommunityChallengeCard key={challenge.id} challenge={challenge} />
        ))}
      </div>
    </div>
  );
};
