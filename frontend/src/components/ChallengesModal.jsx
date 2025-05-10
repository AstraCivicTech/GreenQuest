import { useState } from "react";
import "../styles/ChallengesModal.css";
import { DailyChallenges } from "./DailyChallenges.jsx"; // Component for daily challenge content
import LevelBar from "./LevelBar";

export default function ChallengesModal({ activeTab = "Daily" }) {
  return (
    <div className="challenges-panel">
      <div className="modal-tabs">
        <button className={activeTab === "Daily" ? "tab active" : "tab"}>
          Daily Challenges
        </button>
        <button className={activeTab === "community" ? "tab active" : "tab"}>
          Community
        </button>
      </div>
      <div className="modal-body">
        {activeTab === "Daily" ? (
          <DailyChallenges activeTab={activeTab} />
        ) : (
          <p>[ Community challenge content goes here ]</p>
        )}
      </div>
    </div>
  );
}
