import CreatePostButton from "./CreatePostButton";

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
        {challenge.description} ({challenge.experienceReward} XP)
      </label>
      {/* {isCompleted && <CreatePostButton />} */}
    </div>
  );
}
