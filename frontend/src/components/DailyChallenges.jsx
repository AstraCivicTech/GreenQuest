import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDailyChallenges } from "../adapters/ai-adapters";
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
  // AI info
  const [dailyChallenges, setDailyChallenges] = useState([]);
  const [error, setError] = useState(null);

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

  // This is the function that will be called when the button is clicked to generate daily challenges
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

  if (!levelInfo) return <p>Loading...</p>;

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
