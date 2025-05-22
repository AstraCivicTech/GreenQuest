import { useEffect, useState } from "react";
import CurrentUserContext from "./current-user-context";
import { getUserLevelInfo } from "../adapters/user-adapter";
import { checkForLoggedInUser } from "../adapters/auth-adapter";

export default function CurrentUserContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [levelInfo, setLevelInfo] = useState(null);
  const [completedChallenges, setCompletedChallenges] = useState([]);
  const [loading, setLoading] = useState(true); // Wait for user and level info to load
  const [levelLoading, setLevelLoading] = useState(false); // Separate loading for level info

  // Load current user from session (cookie)
  useEffect(() => {
    const loadUser = async () => {
      const [user, error] = await checkForLoggedInUser();
      if (!error) {
        setCurrentUser(user);
      }
      setLoading(false); // Whether user is null or not, we're done loading
    };
    loadUser();
  }, []);

  // Once currentUser is known, load their levelInfo
  useEffect(() => {
    if (!currentUser?.id) return;

    const fetchLevelInfo = async () => {
      setLevelLoading(true); // Start loading level info
      const [data, error] = await getUserLevelInfo(currentUser.id);
      if (!error) {
        console.log("Updated levelInfo in context:", data); // Debugging log
        setLevelInfo(data);
      }
      setLevelLoading(false); // Done loading level info
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

  // Prevent rendering while checking session or fetching level info
  if (loading || levelLoading) return null;

  return (
    <CurrentUserContext.Provider value={context}>
      {children}
    </CurrentUserContext.Provider>
  );
}
