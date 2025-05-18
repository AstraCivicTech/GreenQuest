import React, { useState, useContext } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import { Notification } from "./Notification";
import "../styles/CreateForm.css";

export const CommunityChallengeForm = ({ refresh }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const [message, setMessage] = useState("");
  const [reason, setReason] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const challengeDescription = form.elements["challenge-description"].value;

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

      const data = await response.json();

      if (!response.ok) {
        // Below is for the notifications
        // setReason("Failed to Submit");
        // setMessage(data.message);
        setMessage("Failed to Submit Challenge:", data.message);
        setTimeout(() => {
          setMessage("");
        }, 2000);
      } else {
        setReason("Challenge Created!");
        setMessage("Challenge submitted successfully!");
        setTimeout(() => {
          setMessage("");
        }, 2000);
        form.reset();
        refresh();
      }

      // Show notification
      setShowNotification(true);
      // Hide notification after 3 seconds
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting challenge:", error);
      setReason("Error");
      setMessage("Error submitting challenge. Please try again.");
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    }
  };

  return (
    <div className="community-challenge-form">
      <h2>Create a New Challenge</h2>
      {/* Notification system in work shop */}
      {/* {showNotification && (
        <Notification
          message={message}
          reason={reason}
          onClose={() => setShowNotification(false)}
        />
      )} */}
      <form onSubmit={handleSubmit}>
        <p>{message}</p>
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
