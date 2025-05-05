import { useContext, useState } from "react";
import "../styles/ChallengesIcon.css";
import ChallengesModal from "./ChallengesModal";

export default function ChallengesIcon() {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <>
      <button onClick={handleClick} className="challenges-icon-button">
        🌿 Challenges
      </button>

      <ChallengesModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}
