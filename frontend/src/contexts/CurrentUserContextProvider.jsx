import { useEffect, useState } from "react";
import CurrentUserContext from "./current-user-context";
import { getUserLevelInfo } from "../adapters/user-adapter";

export default function CurrentUserContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [levelInfo, setLevelInfo] = useState(null);
  const [completedChallenges, setCompletedChallenges] = useState([]);
  // re-renders the component when the user logs in or out
  useEffect(() => {
    const fetchLevelInfo = async () => {
      if (currentUser) {
        const [data, error] = await getUserLevelInfo(currentUser.id);
        if (!error) setLevelInfo(data);
      }
    };
    fetchLevelInfo();
  }, [currentUser]);

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
