import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { generateUniqueId } from '../utils/generateId';
import { getDailyChallenges } from '../adapters/ai-adapters';
import {
  getUserLevelInfo,
  updateUserLevelInfo,
} from '../adapters/user-adapter';
import {
  getChallenges,
  getCompletedChallenges,
  completeChallenge,
} from '../adapters/challenge-adapter';
import CurrentUserContext from '../contexts/current-user-context';
import '../styles/DailyChallenges.css';

export const DailyChallenges = ({ activeTab }) => {
  const { id } = useParams();
  const { levelInfo, setLevelInfo } = useContext(CurrentUserContext);
  const [completedChallenges, setCompletedChallenges] = useState([]);
  const [dailyChallenges, setDailyChallenges] = useState([]);
  const [error, setError] = useState(null);
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    const fetchAllData = async () => {
      const [levelData, levelError] = await getUserLevelInfo(id);
      if (!levelError) setLevelInfo(levelData);

      const [challengeData, challengeError] = await getChallenges(activeTab);
      if (!challengeError) setChallenges(challengeData);

      const [completed, completedError] = await getCompletedChallenges(id);
      if (!completedError) {
        setCompletedChallenges(completed.map(Number));
      }
    };

    fetchAllData();
  }, [id, activeTab, setLevelInfo]);

  useEffect(() => {
    generateDaily();
  }, []);

  const handleChallengeComplete = async (challenge) => {
    if (!id || !challenge?.id) {
      console.error('Missing userId or challengeId', { id, challenge });
      return;
    }
    // use to record completed challenges in the database
    //const [_, error] = await completeChallenge(id, challenge.id);
    //if (error) return console.error("Challenge completion error:", error);

    const newExp = levelInfo.exp + challenge.exp;
    const [updatedInfo, levelError] = await updateUserLevelInfo(id, newExp);

    if (!levelError) {
      setLevelInfo(updatedInfo);
      setCompletedChallenges((prev) => [...prev, Number(challenge.id)]);
    }
  };

  const handleClick = async () => {
    const [data, error] = await getDailyChallenges();
    if (error) {
      setError('Failed to fetch daily challenges.');
      return;
    }

    const challengesArray = JSON.parse(data.result);
    challengesArray.forEach((challenge) => {
      challenge.id = generateUniqueId();
    });

    setDailyChallenges(challengesArray);
  };

  const generateDaily = () => {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);

    let timeUntilMidnight = 15000; // for testing

    if (timeUntilMidnight < 0) {
      midnight.setDate(midnight.getDate() + 1);
      timeUntilMidnight = midnight.getTime() - now.getTime();
    }

    setTimeout(async () => {
      const [data, error] = await getDailyChallenges();
      if (error) {
        setError('Failed to fetch daily challenges.');
        return;
      }

      const challengesArray = JSON.parse(data.result);
      challengesArray.forEach((challenge) => {
        challenge.id = generateUniqueId();
      });

      setDailyChallenges(challengesArray);
      generateDaily(); // schedule again
    }, timeUntilMidnight);
  };

  return (
    <div className="daily-challenges-container">
      <h3>Today's Challenges</h3>
      <button onClick={handleClick}>Generate Challenges</button>
      {error && <p className="error-text">{error}</p>}
      <ul>
        {dailyChallenges.map((challenge) => {
          console.log('Challenge: ', challenge);
          return (
            <li key={challenge.id} style={{ marginBottom: '1em' }}>
              <label>
                <input
                  type="checkbox"
                  disabled={completedChallenges.includes(challenge.id)}
                  onChange={() => handleChallengeComplete(challenge)}
                />
                {challenge.description} ({challenge.exp} XP)
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
