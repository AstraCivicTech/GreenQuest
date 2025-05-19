import { useContext, useEffect, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import CurrentUserContext from "../contexts/current-user-context";
import { DailyChallenges } from "../components/DailyChallenges";
import LevelBar from "../components/LevelBar";
import "../styles/User.css";
import ScientistCharacter from "../components3D/ScientistCharacter";
import SpeechBubble from "../components/SpeechBubble";

export default function UserPage() {
  const { currentUser, levelInfo } = useContext(CurrentUserContext);
  const [showIntro, setShowIntro] = useState(false);

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
                {levelInfo.exp} / {levelInfo.nextLevelExp} XP
              </p>
            </div>
          )}

          <h2 className="username">@{currentUser.username}</h2>
          <p className="bio">
            Nature enthusiast changing the world one challenge at a time
          </p>

          <div className="eco-tags">
            <button className="tag-button">♻️ Zero Waste</button>
            <button className="tag-button">🌿 Urban Gardener</button>
          </div>
        </div>

        {/* Daily Challenges + Optional Character */}
        <div className="challenges-and-scientist">
          <DailyChallenges/>

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

      <div className="user-posts">
        <h2 className="activity">Activity</h2>
        <p>This user hasn't posted anything yet.</p>
      </div>
    </div>
  );
}
