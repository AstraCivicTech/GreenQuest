import React, { useState, useContext } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import "../styles/CreateForm.css";

export const CommunityChallengeForm = ({ refresh }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Get the form element directly
    const form = event.target;
    const formData = new FormData(form);
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    const challengeDescription = form.elements["challenge-description"].value;
    console.log("currentUSER: ", currentUser);

    try {
      const response = await fetch("/api/challenges/create-community", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: challengeDescription,
          userId: currentUser.id,
          username: currentUser.username,
        }),
      });

      console.log("form response: ", response);

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message);
        return;
      }
      console.log("Challenge submitted successfully:", data);
      setMessage("Challenge submitted successfully!");
      form.reset(); // Clear the form
      refresh();
    } catch (error) {
      console.error("Error submitting challenge:", error);
      setMessage("Error submitting challenge. Please try again.");
    }
  };

  return (
    <div className="community-challenge-form">
      <h2>Create a New Challenge</h2>
      {message && <div className="message">{message}</div>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="challenge-description">Description:</label>
        <input
          id="challenge-description"
          name="challenge-description"
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
