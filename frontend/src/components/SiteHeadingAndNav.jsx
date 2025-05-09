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
                <NavLink to="/users" end={true}>
                  Users
                </NavLink>
              </li>
              <li
                className="nav-user-menu"
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
              >
                <NavLink
                  to={`/users/${currentUser.id}`}
                  className="nav-username"
                >
                  {currentUser.username}
                </NavLink>
                {showDropdown && (
                  <div className="dropdown-menu glass">
                    <NavLink to="/settings" className="dropdown-item">
                      Settings
                    </NavLink>
                    <NavLink
                      to="/"
                      className="dropdown-item"
                      onClick={handleLogout}
                    >
                      Log Out
                    </NavLink>
                  </div>
                )}
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
