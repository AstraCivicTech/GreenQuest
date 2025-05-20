import "../styles/Feed.css";

const FeedDailyChallengeCard = ({
  challenge,
  onSelectChallenge
}) => {

  return (
    <div className="challenge-card" onClick={() =>onSelectChallenge(challenge.id)}>
      <div className="challenge-card-content">
        <p className="challenge-description">{challenge.description}</p>
        <div className="challenge-exp">
          <span className="exp-points">EXP: {challenge.experienceReward}</span>
        </div>
      </div>
    </div>
  );
};

export default FeedDailyChallengeCard;