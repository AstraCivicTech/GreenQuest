// CurrentUserContextProvider.jsx
import { useState } from "react";
import CurrentUserContext from "./current-user-context";

export default function CurrentUserContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [levelInfo, setLevelInfo] = useState(null);

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, setCurrentUser, levelInfo, setLevelInfo }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
}
