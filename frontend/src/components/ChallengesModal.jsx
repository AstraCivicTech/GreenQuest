import { useState } from "react";
import "../styles/ChallengesModal.css";
import { DailyChallenges } from "./DailyChallenges.jsx"; // Component for daily challenge content
import LevelBar from "./LevelBar";
export default function ChallengesModal({ isOpen, onClose }) {
  // Local state to track which tab is active ("daily" or "community")
  const [activeTab, setActiveTab] = useState("daily");

  // If the modal is not open, render nothing
  if (!isOpen) return null;

  return (
    <>
      <div className="modal-overlay">
        <div className="modal-content">
          {/* ---------- Tab Buttons for Daily & Community ---------- */}
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

          {/* ---------- Dynamic Content Area Based on Active Tab ---------- */}
          <div className="modal-body">
            {activeTab === "daily" ? (
              <div>
                <DailyChallenges activeTab={activeTab} />{" "}
                {/* Prop determines if we fetch daily or community challenges */}
              </div>
            ) : (
              <div>
                {/* Replace with CommunityChallenges component later if needed */}
                <p>[ Community challenge content goes here ]</p>
              </div>
            )}
          </div>

          {/* ---------- Close Modal Button ---------- */}
          <button className="close-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </>
  );
}
