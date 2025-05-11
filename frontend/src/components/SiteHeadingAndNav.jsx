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
        <h1 className="logo">🌱</h1>

        <ul className="nav-links">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>

          {currentUser ? (
            <>
              <li>
                <NavLink to="/users">Users</NavLink>
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
                  <button
                    className="dropdown-item logout-button"
                    onClick={handleLogout}
                  >
                    Log Out
                  </button>
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
