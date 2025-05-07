import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { generateUniqueId } from "../utils/generateId";
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

export const DailyChallenges = () => {
  const { id } = useParams();
  const { levelInfo, setLevelInfo } = useContext(CurrentUserContext);
  // checks if a challenge has been completed via it's id
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

    // Parse the JSON string into an array of objects
    const challengesArray = JSON.parse(data.result);
    console.log("Challenges Array: JSON.parse: ", challengesArray);

    challengesArray.forEach((challenge) => {
      // Add a unique ID to each challenge
      challenge.id = generateUniqueId();
    });

    setDailyChallenges(challengesArray);
  };

  const generateDaily = () => {
    // Get the current date and time
    const now = new Date();
    console.log("Current Date and Time: ", now);

    // Create a new date object for the next midnight
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0); // Set to the next midnight

    // Calculate the time difference in milliseconds
    // change to the commented value for the demo and or testing
    let timeUntilMidnight = midnight.getTime() - now.getTime(); //10000;

    // If it's already past midnight, schedule for the next day
    if (timeUntilMidnight < 0) {
      midnight.setDate(midnight.getDate() + 1);
      timeUntilMidnight = midnight.getTime() - now.getTime();
    }

    // Schedule the daily challenge generation
    setTimeout(async () => {
      const [data, error] = await getDailyChallenges();

      if (error) {
        setError("Failed to fetch daily challenges.");
        return;
      }

      // Parse the JSON string into an array of objects
      const challengesArray = JSON.parse(data.result);
      console.log("Challenges Array: JSON.parse: ", challengesArray);

      challengesArray.forEach((challenge) => {
        // Add a unique ID to each challenge
        challenge.id = generateUniqueId();
      });

      // Update the daily challenges
      setDailyChallenges(challengesArray);

      // Recursively call `generateDaily` to schedule the next execution
      generateDaily();
    }, timeUntilMidnight);
  };

  // Start the process
  generateDaily();

  // Renders daily challenges though the disabled checkbox happens for all of the challenges when clicked.
  // I hypothesis that this is the result of how I am adding the id to the challenges in the prompt. Which makes them not unique
  // and therefore the completedChallenges will always have the id
  // I can try using recursion to generate the id vs the database
  return (
    <div className="daily-challenges-container">
      <h3>Today's Challenges</h3>
      <button onClick={handleClick}>Generate Challenges</button>
      <ul>
        {dailyChallenges.map(
          (challenge) => (
            console.log("Challenge: ", challenge),
            (
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
            )
          )
        )}
      </ul>
    </div>
  );
};
