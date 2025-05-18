import { useEffect, useState } from "react";
import CurrentUserContext from "./current-user-context";
import { getUserLevelInfo } from "../adapters/user-adapter";
import { checkForLoggedInUser } from "../adapters/auth-adapter";

export default function CurrentUserContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [levelInfo, setLevelInfo] = useState(null);
  const [completedChallenges, setCompletedChallenges] = useState([]);

  // Load current user from session (cookie)
  useEffect(() => {
    const loadUser = async () => {
      const [user, error] = await checkForLoggedInUser();
      if (!error) setCurrentUser(user);
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

  return (
    <CurrentUserContext.Provider value={context}>
      {children}
    </CurrentUserContext.Provider>
  );
}
