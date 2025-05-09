import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { getUser } from "../adapters/user-adapter";
import ChallengesIcon from "../components/ChallengesIcon";
import LevelBar from "../components/LevelBar";
import "../styles/User.css";

export default function UserPage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser, levelInfo } =
    useContext(CurrentUserContext);
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const isCurrentUserProfile = currentUser && currentUser.id === Number(id);

  useEffect(() => {
    const loadUser = async () => {
      const [user, error] = await getUser(id);
      if (error) return setError(error);
      setUserProfile(user);
    };
    loadUser();
  }, [id]);

  if (error) return <p>Sorry, could not load user.</p>;
  if (!userProfile || !levelInfo) return null;

  const profileUsername = isCurrentUserProfile
    ? currentUser.username
    : userProfile.username;

  return (
    <div className="greenquest-profile">
      <div className="profile-card">
        <div className="profile-picture-ring-wrapper">
          <LevelBar />
          <div className="profile-picture-overlay">
            <img
              src="https://www.perfocal.com/blog/content/images/2021/01/Perfocal_17-11-2019_TYWFAQ_100_standard-3.jpg"
              alt="User Avatar"
              className="profile-image"
            />
          </div>
        </div>

        {/* Level & XP Display under avatar */}
        <div className="level-display">
          <p className="level-text">
            Lv. {levelInfo.level} - {levelInfo.levelTitle}
          </p>
          <p className="xp-text">
            {levelInfo.exp} / {levelInfo.nextLevelExp} XP
          </p>
        </div>

        <h2 className="username">@{profileUsername}</h2>
        <p className="bio">
          Nature enthusiast changing the world one challenge at a time 🌱
        </p>

        <div className="eco-tags">
          <button className="tag-button">♻️ Zero Waste</button>
          <button className="tag-button">🌿 Urban Gardener</button>
        </div>
      </div>

      <div className="user-posts">
        <h2 className="activity">Activity</h2>
        <p>This user hasn't posted anything yet.</p>
      </div>

      <div className="bottom-right-widget">
        <ChallengesIcon />
      </div>
    </div>
  );
}
