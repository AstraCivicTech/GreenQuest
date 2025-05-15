import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { updateUserLevelInfo } from "../adapters/user-adapter";
import {
  getCompletedChallenges,
  completeChallenge,
  getCompletedChallenges2,
} from "../adapters/challenge-adapter";
import "../styles/ChallengeCards.css";

export const CommunityChallengeCard = ({
  challenge,
  levelInfo,
  setLevelInfo,
  completedChallenges,
}) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const { currentUser, updateUserExp, setCompletedChallenges } =
    useContext(CurrentUserContext);
  const id = currentUser.id;

  const fetchCompleted = async () => {
    // "/api/users/completed-challenges"
    try {
      console.log("fetch completed current user:", currentUser);
      const [data, error] = await getCompletedChallenges2(currentUser.id);
      console.log("data from fe.Comp.:", data);
      return data;
    } catch (error) {
      console.error(error.message);
    }
  };

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

    const completed = await fetchCompleted();

    if (completed) {
      setCompletedChallenges(completed);
    }

    console.log(
      `Level Exp: ${levelInfo.exp} | Challenge Exp: ${challenge.experienceReward}`
    );
    const newExp = levelInfo.exp + challenge.experienceReward;
    const [updatedInfo, levelError] = await updateUserLevelInfo(id, newExp);

    if (!levelError) {
      setLevelInfo(updatedInfo);
      setIsCompleted(true);
    }

    console.log("inside handleComplete (completedChallenges):", completed);
    console.log("bool check:", completed.includes(Number(challenge.id)));
    console.log("onClick event finished");
  };

  useEffect(() => {
    setIsCompleted(completedChallenges.includes(Number(challenge.id)));
  }, [completedChallenges, challenge.id]);

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
