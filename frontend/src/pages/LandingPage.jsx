import SiteHeadingAndNav from "../components/SiteHeadingAndNav";
import { DeveloperCard } from "../components/DeveloperCard";
import "../styles/LandingPage.css";

export const LandingPage = () => {
  const developers = [
    [
      "Felipe Garcia",
      "https://www.linkedin.com/in/felipe-garcia-136448316/",
      "https://github.com/jfelipe75",
    ],
    [
      "Ibrahim Hudson",
      "https://www.linkedin.com/in/ibrahim-hudson-swe/",
      "https://github.com/Ibra-Hud",
    ],
    [
      "Michael Stawowski",
      "https://www.linkedin.com/in/michael-stawowski-b77630206/",
      "https://github.com/michaels2533",
    ],
  ];

  return (
    <div className="landing-page">
      <SiteHeadingAndNav />
      <div className="intro">
        <h1>Welcome to GreenQuest</h1>
        <div className="app-description">
          <p>
            <span className="highlight">GreenQuest</span> is a community-driven
            platform that turns eco-friendly actions into exciting daily
            challenges. Join our growing community of environmental champions
            and:
          </p>
          <ul className="features-list">
            <li>🌱 Complete daily eco-challenges</li>
            <li>🏆 Earn experience points and level up</li>
            <li>🤝 Create and share community challenges</li>
            <li>🌍 Make a real impact on our planet</li>
          </ul>
        </div>
      </div>
      <div className="why">
        <h2>GreenQuest Mission</h2>
        <p>
          <span className="highlight">GreenQuest</span> was created to inspire
          our generation to pioneer change for our environment as a community.
          As a team comprised of Hikers, Soccer Players, and explorers. The
          disconnect the technical age has facilitated between our generation
          and the planet we live on has caused immense damage. Though this
          damage is not irreversible, as a community if we all make an effort to
          change the world world one challenge at a time.
        </p>
      </div>
      <div className="community-engagement-info">
        <h2>How can you be part of the GreenQuest Community?</h2>
        <p>
          <span className="highlight">GreenQuest</span> heavily highlights
          community engagement, so what does that look like in app? When you
          start playing you'll be able to do main feature: Create/Complete
          challenges created by others in our community and make post
          highlighting your escapades. As you complete challenges your level
          will increase allowing you to show off your commitment to the
          "GreenQuest Mission". Click the button to learn more about how to
          create your first challenge!
        </p>
        {/* This is supposed to show a "How-Tos: Creating a Challenge!" Modal. */}
        <button>Click Me!</button>
      </div>
      <div className="dev-header">
        <h2>The Developers</h2>
        <div className="developer-card-div">
          {console.log("Developers:", developers)}
          {developers.map((dev, index) => {
            console.log("Rendering card for:", dev[0]);
            return (
              <DeveloperCard
                key={index}
                name={dev[0]}
                linkedIn={dev[1]}
                github={dev[2]}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
