import { useContext, useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { registerUser } from "../adapters/auth-adapter";
import "../styles/SignUp.css";

export default function SignUpPage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const [errorText, setErrorText] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    zipcode: "",
  });

  if (currentUser) return <Navigate to={`/users/${currentUser.id}`} />;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorText("");

    const { username, password, confirmPassword, email, zipcode } = formData;
    if (!username || !password || !confirmPassword || !email || !zipcode) {
      return setErrorText("Missing field");
    }

    const [user, error] = await registerUser(formData);
    if (error) return setErrorText(error.message);

    setCurrentUser(user);
    navigate(`/users/${user.id}`);
  };

  return (
    <div className="signup-page">
      <form
        className="signup-form"
        onSubmit={handleSubmit}
        aria-labelledby="create-heading"
      >
        <h1>Sign Up</h1>
        <h2 id="create-heading">Create New Account</h2>

        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <label htmlFor="zipcode">ZIP Code</label>
        <input
          type="text"
          id="zipcode"
          name="zipcode"
          value={formData.zipcode}
          onChange={handleChange}
        />

        <button type="submit">Sign Up Now!</button>

        {!!errorText && <p className="error-text">{errorText}</p>}

        <p>
          Already have an account? <Link to="/login">Log in!</Link>
        </p>
      </form>
    </div>
  );
}
