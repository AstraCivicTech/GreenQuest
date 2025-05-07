import { AIPromptForm } from "../components/CreateChallengeForm";
import { CreateChallengeForm } from "../components/CreateChallengeForm.jsx";
import { DailyChallengeTest } from "../components/DailyChallengeTest.jsx";
import { DailyChallenges } from "../components/DailyChallenges.jsx";

export default function HomePage() {
  return (
    <>
      <h1>Welcome to GreenQuest!</h1>
      <p>
        GreenQuest is a community based eco-friendly habit tracker! Where users
        can create challenges for others in their community to complete. Gain
        experience and level up to become an eco-warrior.
      </p>
      <CreateChallengeForm />
      <br />
      {/* <DailyChallengeTest /> */}
      <DailyChallenges />
      <br />
      <p>Put something interesting here!</p>
    </>
  );
}
