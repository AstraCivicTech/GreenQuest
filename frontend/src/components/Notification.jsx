import React from "react";
import "../styles/Notification.css";

export const Notification = ({ message, reason, onClose }) => {
  return (
    <div className="notification-overlay">
      <div className="notification-modal">
        <div className="notification-content">
          <div className="img" />
          <div className="textBox">
            <div className="textContent">
              <p className="h1">{reason}</p>
              <span className="span">Just Now</span>
            </div>
            <p className="p">{message}</p>
          </div>
          <button className="close-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
