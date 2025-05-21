import { useContext, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { logUserIn } from "../adapters/auth-adapter";
import CurrentUserContext from "../contexts/current-user-context";
import "../styles/LogIn.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  // If user is already logged in, redirect to their profile page
  if (currentUser) return <Navigate to={`/users/${currentUser.id}`} />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    setErrorText("");
    setIsSubmitting(true);

    if (!username || !password) {
      setErrorText("Please fill in both fields.");
      setIsSubmitting(false);
      return;
    }

    const [user, error] = await logUserIn({ username, password });

    setIsSubmitting(false);

    if (error) return setErrorText(error.message);

    setCurrentUser(user);
    navigate(`/users/${user.id}`);
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="login-title">🌍 Welcome Back</h1>
        <p className="login-subtitle">Log in to continue your mission.</p>

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            autoComplete="username"
            id="username"
            name="username"
            className="form-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            autoComplete="current-password"
            id="password"
            name="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="login-button" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Log in!"}
        </button>

        {!!errorText && <p className="error-text">{errorText}</p>}
      </form>
    </div>
  );
}
