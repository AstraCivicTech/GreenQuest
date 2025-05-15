import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { updateUserLevelInfo } from "../adapters/user-adapter";
import {
  getCompletedChallenges,
  completeChallenge,
} from "../adapters/challenge-adapter";
import "../styles/ChallengeCards.css";

export const CommunityChallengeCard = ({
  challenge,
  levelInfo,
  setLevelInfo,
}) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const {
    currentUser,
    updateUserExp,
    completedChallenges,
    setCompletedChallenges,
  } = useContext(CurrentUserContext);

  console.log("User context: ", currentUser);
  const id = currentUser.id;

  const handleChallengeComplete = async (e) => {
    console.log("Challenge card clicked and handleComplete started");
    console.log("Check challenge:", challenge);
    console.log(`Id: ${id} | Challenge Id: ${challenge.id}`);
    if (!id || !challenge?.id) return;
    console.log("past id && challenge.id check");

    const [_, error] = await completeChallenge(
      Number(id),
      Number(challenge.id)
    );
    if (error) return;
    console.log("past error");

    console.log(
      `Level Exp: ${levelInfo.exp} | Challenge Exp: ${challenge.experienceReward}`
    );
    const newExp = levelInfo.exp + challenge.experienceReward;
    const [updatedInfo, levelError] = await updateUserLevelInfo(id, newExp);

    if (!levelError) {
      setLevelInfo(updatedInfo);
      setCompletedChallenges((prev) => [...prev, Number(challenge.id)]);

      const rect = e.target.getBoundingClientRect();
      triggerParticles(rect.left + 10, rect.top + 10);
    }

    console.log("onClick event finished");
  };

  return (
    <div
      className={`challenge-card ${isCompleted ? "completed" : ""}`}
      onClick={handleChallengeComplete}
    >
      <div className="challenge-card-content">
        <p className="challenge-description">{challenge.description}</p>
        <div className="challenge-exp">
          <span className="exp-points">EXP: {challenge.experienceReward}</span>
        </div>
      </div>
    </div>
  );
};
