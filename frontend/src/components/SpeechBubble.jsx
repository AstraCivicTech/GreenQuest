import { useState } from "react";
import "../styles/SpeechBubble.css";

export default function SpeechBubble({ username }) {
  // array of messages to be displayed in the speech bubble
  const messages = [
    `Welcome, ${username}! 🌱`,
    "My name is Dr. Green, your guide on this eco-adventure.",
    "Here on Green Quest, our mission is simple: turn small actions into big change.",
    "By completing eco-friendly challenges, you gain experience and level up!",
    "Your level reflects your impact — the more actions you take, the greener your legacy.",
    "Ready to grow your quest? 🌍✨",
  ];
  // state to keep track of the current step in the messages array
  const [step, setStep] = useState(0);
  // function to handle click events on the speech bubble
  const handleClick = () => {
    if (step < messages.length - 1) {
      setStep(step + 1);
    }
  };

  return (
    <div className="speech-bubble" onClick={handleClick}>
      <p>{messages[step]}</p>
      {step < messages.length - 1 && (
        <span className="next-hint">Click to continue</span>
      )}
    </div>
  );
}
