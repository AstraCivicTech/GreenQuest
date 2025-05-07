import { useState } from "react";
import { getDailyChallenges } from "../adapters/ai-adapters";

export const DailyChallengeTest = () => {
  const [dailyChallenges, setDailyChallenges] = useState("");
  const [error, setError] = useState(null);

  const handleClick = async () => {
    const [data, error] = await getDailyChallenges();

    if (error) {
      setError("Failed to fetch daily challenges.");
      return;
    }

    // Parse the JSON string into an array of objects
    const challengesArray = JSON.parse(data.result);
    console.log("Challenges Array: JSON.parse: ", challengesArray);

    setDailyChallenges(challengesArray);
  };

  return (
    <div>
      <h2>Daily Challenge</h2>
      <p>Complete the daily challenge to earn rewards!</p>
      <button onClick={handleClick}>Generate Challenges</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {/* <p>{dailyChallenges}</p> */}
      <ul>
        {dailyChallenges &&
          dailyChallenges.map((challenge, index) => (
            <li key={index}>
              <strong>{challenge.type}</strong>: {challenge.description} (EXP:
              {challenge.exp})
            </li>
          ))}
      </ul>
    </div>
  );
};
