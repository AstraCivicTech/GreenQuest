import { useEffect, useState } from "react";
import CurrentUserContext from "./current-user-context";
import { getUserLevelInfo } from "../adapters/user-adapter";
import { checkForLoggedInUser } from "../adapters/auth-adapter";

export default function CurrentUserContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [levelInfo, setLevelInfo] = useState(null);
  const [completedChallenges, setCompletedChallenges] = useState([]);
  const [loading, setLoading] = useState(true); //  Wait for user to load

  // Load current user from session (cookie)
  useEffect(() => {
    const loadUser = async () => {
      const [user, error] = await checkForLoggedInUser();
      if (!error) setCurrentUser(user);
      setLoading(false); //  Whether user is null or not, we're done loading
    };
    loadUser();
  }, []);

  // Once currentUser is known, load their levelInfo
  useEffect(() => {
    if (!currentUser?.id) return;

    const fetchLevelInfo = async () => {
      const [data, error] = await getUserLevelInfo(currentUser.id);
      if (!error) setLevelInfo(data);
    };

    fetchLevelInfo();
  }, [currentUser?.id]);

  const context = {
    currentUser,
    setCurrentUser,
    levelInfo,
    setLevelInfo,
    completedChallenges,
    setCompletedChallenges,
  };

  if (loading) return null; //  Prevent rendering while checking session

  return (
    <CurrentUserContext.Provider value={context}>
      {children}
    </CurrentUserContext.Provider>
  );
}
