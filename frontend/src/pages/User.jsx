// src/pages/UserPage.jsx
import { useContext, useEffect, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useParams } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { getUser } from "../adapters/user-adapter";
import { DailyChallenges } from "../components/DailyChallenges";
import LevelBar from "../components/LevelBar";
import "../styles/User.css";
import ScientistCharacter from "../components3D/ScientistCharacter";
import SpeechBubble from "../components/SpeechBubble";

export default function UserPage() {
  // On this first line we access our user context to get the current user and level information
  const { currentUser, levelInfo } = useContext(CurrentUserContext);
  // here we keep track of the state of user profile
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);
  // this is an intro scene to give players a sense of purpose when they first sign up and log in
  const [showIntro, setShowIntro] = useState(false);
  // useParams is used to extract the user ID from the URL
  const { id } = useParams();
  // keeps track of current user profile
  const isCurrentUserProfile = currentUser && currentUser.id === Number(id);

  // Every time a new user logs in re-render the component to fetch their profile data
  useEffect(() => {
    const loadUser = async () => {
      // sends a request to the backend using UserId to fetch user data
      const [user, error] = await getUser(id);
      if (error) return setError(error);
      setUserProfile(user);
    };
    loadUser();
    // re-render the component when the user ID changes
  }, [id]);

  // Check for first login (temporary local check)
  useEffect(() => {
    if (currentUser && currentUser.id) {
      const key = `seenIntro-${currentUser.id}`;
      // check if the user has already seen the intro
      if (!localStorage.getItem(key)) {
        // if not show intro scene
        setShowIntro(true); // This is temporary, we will replace it with a backend solution to ensure data persists
        localStorage.setItem(key, "true");
      }
    }
  }, [currentUser]);

  if (error) return <p>Sorry, could not load user.</p>;
  if (!userProfile) return null;

  const profileUsername = isCurrentUserProfile
    ? currentUser.username
    : userProfile.username;

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

          <h2 className="username">@{profileUsername}</h2>
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
          <DailyChallenges userIdFromParams = {id}/>

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
              <SpeechBubble username={profileUsername} />
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
