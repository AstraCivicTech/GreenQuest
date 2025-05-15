import React from "react";
import { Link } from "react-router-dom";
import "../styles/ChallengeCards.css";

export const CommunityChallengeCard = ({ challenge }) => {
  return (
    <div className="challenge-card">
      <div className="challenge-card-content">
        <p className="challenge-description">{challenge.description}</p>
        <div className="challenge-exp">
          <span className="exp-points">EXP: {challenge.experienceReward}</span>
        </div>
      </div>
    </div>
  );
};
