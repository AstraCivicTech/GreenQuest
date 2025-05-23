import "../styles/Feed.css";

const CommunityChallengeCard = ({ challenge, onSelectChallenge }) => {
  return (
    <div
      className="challenge-card"
      onClick={() => onSelectChallenge(challenge.id)}
    >
      <div className="challenge-card-content">
        <p className="challenge-description">{challenge.description}</p>
        <div className="xp-progress">
          <span className="xp-progress">EXP: {challenge.experienceReward}</span>
        </div>
      </div>
    </div>
  );
};

export default CommunityChallengeCard;
