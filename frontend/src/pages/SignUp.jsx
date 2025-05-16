import { useContext, useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { registerUser } from "../adapters/auth-adapter";
import "../styles/SignUp.css";

export default function SignUpPage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [errorText, setErrorText] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [zipcode, setZipcode] = useState("");

  if (currentUser) return <Navigate to={`/users/${currentUser.id}`} />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorText("");
    if (!username || !password || !confirmPassword || !email || !zipcode)
      return setErrorText("Missing field");

    const [user, error] = await registerUser({
      username,
      password,
      email,
      zipcode,
      confirmPassword,
    });
    if (error) return setErrorText(error.message);

    setCurrentUser(user);
    navigate(`/users/${user.id}`);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") setEmail(value);
    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
    if (name === "zipcode") setZipcode(value);
  };

  return (
    <div className="signup-page">
      <form
        className="signup-form"
        onSubmit={handleSubmit}
        onChange={handleChange}
        aria-labelledby="create-heading"
      >
        <h1>Sign Up</h1>
        <h2 id="create-heading">Create New Account</h2>

        <label htmlFor="email">Email</label>
        <input type="text" id="email" name="email" value={email} />

        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" value={username} />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" value={password} />

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
        />

        <label htmlFor="zipcode">ZIP Code</label>
        <input type="text" id="zipcode" name="zipcode" value={zipcode} />

        <button type="submit">Sign Up Now!</button>

        {!!errorText && <p className="error-text">{errorText}</p>}
        <p>
          Already have an account? <Link to="/login">Log in!</Link>
        </p>
      </form>
    </div>
  );
}
