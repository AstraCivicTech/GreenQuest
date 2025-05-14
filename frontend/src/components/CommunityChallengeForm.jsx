import React, { useState, useContext } from "react";
import CurrentUserContext from "../contexts/current-user-context";

export const CommunityChallengeForm = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Get the form element directly
    const form = event.target;
    const challengeDescription = form.elements["challenge-description"].value;
    console.log("currentUSER: ", currentUser);

    try {
      const response = await fetch("/api/challenges/create", {
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

      const data = await response.json();

      if (!response.ok) {
        setMessage("Failed to submit challenge: " + data.message);
        return;
      }
      console.log("Challenge submitted successfully:", data);
      setMessage("Challenge submitted successfully!");
      form.reset(); // Clear the form
    } catch (error) {
      console.error("Error submitting challenge:", error);
      setMessage("Error submitting challenge. Please try again.");
    }
  };

  return (
    <div className="community-challenge-form">
      <h2>Community Challenge Form</h2>
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
