import { NavLink } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import "../styles/Navbar.css";
export default function SiteHeadingAndNav() {
  const { currentUser } = useContext(CurrentUserContext);

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
              <li>
                <NavLink to={`/users/${currentUser.id}`}>
                  {currentUser.username}
                </NavLink>
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
