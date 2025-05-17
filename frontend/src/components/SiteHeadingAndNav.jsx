import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import { logUserOut } from "../adapters/auth-adapter";
import "../styles/Navbar.css";

export default function SiteHeadingAndNav() {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    await logUserOut();
    setCurrentUser(null);
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <img src="/logo/green-quest-logo1.png" className="logo" />

        <ul className="nav-links">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/landing-page">Landing Page</NavLink>
          </li>

          {currentUser ? (
            <>
              <li>
                <NavLink to="/community-challenges">
                  Community Challenges
                </NavLink>
              </li>
              <li className="nav-user-menu">
                <div className="nav-username" onClick={toggleDropdown}>
                  <NavLink to={`/users/${currentUser.id}`}>
                    {currentUser.username}
                  </NavLink>
                  <span
                    className={`dropdown-arrow ${showDropdown ? "open" : ""}`}
                  >
                    ▼
                  </span>
                </div>

                <div className={`dropdown-menu ${showDropdown ? "show" : ""}`}>
                  <NavLink to="/settings" className="dropdown-item">
                    Settings
                  </NavLink>
                  <NavLink to="/">
                    <button
                      className="dropdown-item logout-button"
                      onClick={handleLogout}
                    >
                      Log Out
                    </button>
                  </NavLink>
                </div>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/sign-up">Sign Up</NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
