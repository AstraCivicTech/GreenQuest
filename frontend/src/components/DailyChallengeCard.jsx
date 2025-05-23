import CreatePostButton from "./CreatePostButton";
import "../styles/DailyChallengeCard.css";

export default function DailyChallengeCard({
  challenge,
  isCompleted,
  onComplete,
}) {
  return (
    <div className={`challenge-card ${isCompleted ? "completed" : ""}`}>
      <label>
        <input
          type="checkbox"
          checked={isCompleted}
          disabled={isCompleted}
          onChange={(e) => onComplete(challenge, e)}
        />
        <p> {challenge.description} </p>
        <p className="xp-progress">{challenge.experienceReward} XP</p>
      </label>
      {/* {isCompleted && <CreatePostButton />} */}
    </div>
  );
}
