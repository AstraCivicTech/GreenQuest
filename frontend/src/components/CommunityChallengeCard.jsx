import { useContext } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import "../styles/communityChallenges.css";

export const CommunityChallengeCard = ({ challenge, isCompleted }) => {
  const { currentUser, levelInfo, setLevelInfo, setCompletedChallenges } =
    useContext(CurrentUserContext);

  console.log("Card render:", { challengeId: challenge.id, isCompleted });

  return (
    <div
      className={`community-challenge-card ${isCompleted ? "completed" : ""}`}
      data-challenge-id={challenge.id}
    >
      <h3>Created by: {challenge.username || "Anonymous"}</h3>
      <p className={`challenge-description ${isCompleted ? "completed" : ""}`}>
        {challenge.description}
      </p>
      <div className="challenge-footer">
        <p className="challenge-exp">
          Experience Points: {challenge.experienceReward}
        </p>
        <label className="challenge-checkbox">
          <input type="checkbox" checked={isCompleted} disabled={isCompleted} />
          Complete Challenge
        </label>
      </div>
    </div>
  );
};
