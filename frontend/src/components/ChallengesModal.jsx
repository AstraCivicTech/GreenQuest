import { useState } from "react";
import "../styles/ChallengesModal.css";

export default function ChallengesModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("daily"); //  define state locally
  const [dailyChallenges, setDailyChallenges] = useState("");

  if (!isOpen) return null;

  // Mounter to render daily challenges every time the daily challenges value changes
  // useEffect(() => {
  //   const doFetch = async () => {};
  // }, [dailyChallenges]);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-tabs">
          <button
            className={activeTab === "daily" ? "tab active" : "tab"}
            onClick={() => setActiveTab("daily")}
          >
            Daily Challenges
          </button>
          <button
            className={activeTab === "community" ? "tab active" : "tab"}
            onClick={() => setActiveTab("community")}
          >
            Community Challenges
          </button>
        </div>

        <div className="modal-body">
          {activeTab === "daily" ? (
            <div>
              <p>[ Daily challenge content goes here ]</p>
            </div>
          ) : (
            <div>
              <p>[ Community challenge content goes here ]</p>
            </div>
          )}
        </div>

        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
