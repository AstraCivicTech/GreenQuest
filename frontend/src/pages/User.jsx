import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { getUser, getUserLevelInfo } from "../adapters/user-adapter";
import { logUserOut } from "../adapters/auth-adapter";
import UpdateUsernameForm from "../components/UpdateUsernameForm";
import LevelBar from "../components/LevelBar";

export default function UserPage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [userProfile, setUserProfile] = useState(null);
  const [levelInfo, setLevelInfo] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const isCurrentUserProfile = currentUser && currentUser.id === Number(id);

  useEffect(() => {
    const loadUser = async () => {
      // fetch user info
      const [user, error] = await getUser(id);
      if (error) return setError(error);
      setUserProfile(user);

      // fetch level info
      const [levelData] = await getUserLevelInfo(id);
      setLevelInfo(levelData);
    };

    loadUser();
  }, [id]);

  const handleLogout = async () => {
    logUserOut();
    setCurrentUser(null);
    navigate("/");
  };

  if (error)
    return (
      <p>Sorry, there was a problem loading user. Please try again later.</p>
    );

  if (!userProfile) return null;

  // When we update the username, the userProfile state won't change but the currentUser state will.
  const profileUsername = isCurrentUserProfile
    ? currentUser.username
    : userProfile.username;

  return (
    <>
      <h1>{profileUsername}</h1>
      <p>If the user had any data, here it would be</p>
      <p>Fake Bio or something</p>
      {isCurrentUserProfile ? (
        <>
          <UpdateUsernameForm
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
          <button onClick={handleLogout}>Log Out</button>
          {levelInfo && (
            <LevelBar
              level={levelInfo.level}
              exp={levelInfo.exp}
              levelTitle={levelInfo.levelTitle}
              nextLevelExp={levelInfo.nextLevelExp}
            />
          )}
        </>
      ) : (
        ""
      )}
    </>
  );
}
