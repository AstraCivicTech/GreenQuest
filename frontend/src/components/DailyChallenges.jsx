// import { useContext, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// // import { generateUniqueId } from '../utils/generateId'; // Likely not needed here anymore
// // import { getDailyChallenges } from '../adapters/ai-adapters'; // AI adapter removed
// import {
//   getUserLevelInfo,
//   updateUserLevelInfo,
// } from "../adapters/user-adapter";
// import {
//   // getChallenges, // Removed if activeTab is removed
//   getChallenges,
//   getCompletedChallenges,
//   completeChallenge,
//   // getDailyChallengesFromDB, // << ASSUMED NEW ADAPTER FUNCTION
// } from "../adapters/challenge-adapter";
// import CurrentUserContext from "../contexts/current-user-context";
// import "../styles/dailyChallenges.css";

// // Removed activeTab from props
// export const DailyChallenges = ({ activeTab }) => {
//   const { id } = useParams(); // User ID
//   const { levelInfo, setLevelInfo } = useContext(CurrentUserContext);
//   const [completedChallenges, setCompletedChallenges] = useState([]);
//   const [dailyChallenges, setDailyChallenges] = useState([]); // This will hold challenges from DB
//   const [error, setError] = useState(null);
//   // const [challenges, setChallenges] = useState([]); // Removed, was for activeTab

//   //////////////////////////////
//   // useEffect: fetches user level info, daily challenges from DB, and completed challenges
//   //////////////////////////////

//   useEffect(() => {
//     const fetchComponentData = async () => {
//       if (!id) return; // Ensure user ID is present

//       setError(null); // Reset error on new fetch
//       try {
//         // Fetch user level info
//         const [levelData, levelError] = await getUserLevelInfo(id);
//         if (levelError) {
//           console.error("Error fetching level info:", levelError);
//           setError(
//             (error) =>
//               (error ? error + "\n" : "") + "Failed to fetch level info."
//           );
//         } else {
//           setLevelInfo(levelData);
//         }

//         // Fetch daily challenges from the database
//         const [dbDailyChallenges, dbDailyError] = await getChallenges(
//           activeTab
//         );
//         if (dbDailyError) {
//           console.error(
//             "Error fetching daily challenges from DB:",
//             dbDailyError
//           );
//           setError(
//             (error) =>
//               (error ? error + "\n" : "") + "Failed to load daily challenges."
//           );
//           setDailyChallenges([]); // Clear or set to empty on error
//         } else {
//           setDailyChallenges(dbDailyChallenges || []);
//         }

//         // Fetch completed challenges
//         const [completed, completedError] = await getCompletedChallenges(id);
//         if (completedError) {
//           console.error("Error fetching completed challenges:", completedError);
//           // Optionally set an error state or just log
//         } else {
//           setCompletedChallenges((completed || []).map(Number));
//         }
//       } catch (err) {
//         console.error("Unexpected error in fetchComponentData:", err);
//         setError("An unexpected error occurred.");
//         setDailyChallenges([]);
//       }
//     };

//     fetchComponentData();
//     // Dependencies: id, setLevelInfo.
//     // getDailyChallengesFromDB might need to be stable or wrapped in useCallback if it were a prop.
//   }, [id, setLevelInfo]);

//   //////////////////////////////
//   // handleChallengeComplete: when a challenge is completed this sets the new level info and marks the challenge as complete
//   //////////////////////////////

//   const handleChallengeComplete = async (challenge) => {
//     // Assuming challenge.exp is the correct property for experience points
//     // and matches the data structure from your daily_challenges table.
//     const newExp = levelInfo.exp + challenge.exp;

//     // First, update level info locally and on the backend
//     const [updatedInfo, levelUpdateError] = await updateUserLevelInfo(
//       id,
//       newExp
//     );
//     if (levelUpdateError) {
//       console.error("Error updating level info:", levelUpdateError);
//       // Potentially show an error to the user
//       return;
//     }
//     setLevelInfo(updatedInfo);

//     // Then, mark challenge as complete on the backend
//     // This 'completeChallenge' adapter needs to correctly target the daily challenge in the DB
//     const [_, completionError] = await completeChallenge(id, challenge.id);
//     if (completionError) {
//       console.error("Challenge completion error:", completionError);
//       // Potentially revert level update or show error
//       // For now, we'll keep the local state for completed challenges optimistic if backend fails
//       // but ideally, this would be more robust.
//       return;
//     }

//     // Update local state for completed challenges
//     setCompletedChallenges((prev) => [...prev, Number(challenge.id)]);
//   };

//   // Removed handleClick and generateDaily functions

//   if (error) {
//     return <div className="daily-challenges-container error-text">{error}</div>;
//   }

//   if (!levelInfo) {
//     // or a more specific loading state
//     return (
//       <div className="daily-challenges-container">
//         <p>Loading user data...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="daily-challenges-container">
//       <h3>Today's Challenges</h3>
//       {/* Removed Generate Challenges button */}
//       {dailyChallenges.length === 0 && !error && (
//         <p>No daily challenges available at the moment, or still loading...</p>
//       )}
//       <ul>
//         {dailyChallenges.map((challenge) => (
//           <li key={challenge.id} style={{ marginBottom: "1em" }}>
//             <label>
//               <input
//                 type="checkbox"
//                 checked={completedChallenges.includes(challenge.id)} // Use checked for controlled component
//                 disabled={completedChallenges.includes(challenge.id)}
//                 onChange={() => handleChallengeComplete(challenge)}
//               />
//               {challenge.description} ({challenge.exp} XP)
//             </label>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

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
} from "../adapters/challenge-adapter";
import CurrentUserContext from "../contexts/current-user-context";
import "../styles/dailyChallenges.css";

export const DailyChallenges = () => {
  const { id } = useParams();
  const {
    levelInfo,
    setLevelInfo,
    completedChallenges,
    setCompletedChallenges,
  } = useContext(CurrentUserContext);

  const [challenges, setChallenges] = useState([]);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const fetchAllData = async () => {
      const [levelData, levelError] = await getUserLevelInfo(id);
      if (!levelError) setLevelInfo(levelData);

      const [challengeData, challengeError] = await getChallenges("Daily");
      if (!challengeError) setChallenges(challengeData);

      const [completed, completedError] = await getCompletedChallenges(id);
      if (!completedError) {
        setCompletedChallenges(completed.map(Number));
      }
    };

    fetchAllData();
  }, [id, setLevelInfo]);

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
    if (!id || !challenge?.id) return;

    const [_, error] = await completeChallenge(id, challenge.id);
    if (error) return;

    const newExp = levelInfo.exp + challenge.experienceReward;
    const [updatedInfo, levelError] = await updateUserLevelInfo(id, newExp);

    if (!levelError) {
      setLevelInfo(updatedInfo);
      setCompletedChallenges((prev) => [...prev, Number(challenge.id)]);

      const rect = e.target.getBoundingClientRect();
      triggerParticles(rect.left + 10, rect.top + 10);
    }
  };
  console.log(particles);
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
