import { useContext, useEffect, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import CurrentUserContext from "../contexts/current-user-context";
import { DailyChallengesContainer } from "../components/DailyChallengesContainer";
import LevelBar from "../components/LevelBar";
import "../styles/User.css";
import ScientistCharacter from "../components3D/ScientistCharacter";
import SpeechBubble from "../components/SpeechBubble";
import { getCompletedChallenges2 } from "../adapters/challenge-adapter";

export default function UserPage() {
  const { currentUser, levelInfo } = useContext(CurrentUserContext);
  const [showIntro, setShowIntro] = useState(false);
  const [totalCompleted, setTotalCompleted] = useState(0);

  // Show intro animation if it's the user's first time
  useEffect(() => {
    if (currentUser?.id) {
      const key = `seenIntro-${currentUser.id}`;
      if (!localStorage.getItem(key)) {
        setShowIntro(true);
        localStorage.setItem(key, "true");
      }
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchCompletedChallenges = async () => {
      const [data, error] = await getCompletedChallenges2(currentUser.id);
      if (error) {
        console.error("Error fetching completed challenges:", error);
        return;
      }
      setTotalCompleted(data.length);
    };

    fetchCompletedChallenges();
  }, []);

  if (!currentUser) return <p>Loading user...</p>;

  return (
    <div className="greenquest-profile">
      <div className="profile-banner" />

      <div className="profile-main">
        {/* Profile Card */}
        <div className="profile-card">
          <div className="profile-picture-ring-wrapper">
            <LevelBar />
            <div className="profile-picture-overlay">
              <img
                src="https://thumbs.wbm.im/pw/small/c8f447e28f84f8ac64100cdb60e71d77.jpg"
                alt="User Avatar"
                className="profile-image"
              />
            </div>
          </div>

          {levelInfo && (
            <div className="level-info-text">
              <p className="level-title">
                Level {levelInfo.level}:{" "}
                <span className="title-text">{levelInfo.levelTitle}</span>
              </p>
              <p className="xp-progress">
                {levelInfo.exp - levelInfo.currentLevelExp} /{" "}
                {levelInfo.nextLevelExp - levelInfo.currentLevelExp} XP
              </p>
              <p className="xp-progress">
                {"All Time Experience: "}
                {levelInfo.exp} XP
              </p>
            </div>
          )}

          <h2 className="username">@{currentUser.username}</h2>
          <p className="bio">
            Nature enthusiast changing the world one challenge at a time
          </p>
          <p style={{ color: "#4F8268" }}>
            Completed Challenges: {totalCompleted}
          </p>

          <div className="eco-tags">
            <button className="tag-button">♻️ Zero Waste</button>
            <button className="tag-button">🌿 Urban Gardener</button>
          </div>
        </div>

        {/* Daily Challenges + Optional Character */}
        <div className="challenges-and-scientist">
          <DailyChallengesContainer />
          {/*<DailyChallenges />*/}

          {showIntro && (
            <div className="character-widget">
              <div className="character-canvas-wrapper">
                <Canvas camera={{ position: [0, 1.5, 3], fov: 80 }}>
                  <ambientLight />
                  <Suspense fallback={null}>
                    <ScientistCharacter />
                  </Suspense>
                </Canvas>
              </div>
              <SpeechBubble username={currentUser.username} />
            </div>
          )}
        </div>
      </div>

      {/* <div className="user-posts">
        <h2 className="activity">Activity</h2>
        <p>This user hasn't posted anything yet.</p>
      </div>*/}
    </div>
  );
}
