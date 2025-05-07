// src/components/Navbar.jsx
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import "../styles/Navbar.css";

export default function Navbar() {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <h1 className="logo">🌱</h1>
        <ul className="nav-links">
          <li>
            <NavLink to="/" end>
              Home
            </NavLink>
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
          <li>
            <NavLink to="/feed">Feed</NavLink>
          </li>
          <li>
            <NavLink to="/challenges">Challenges</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
