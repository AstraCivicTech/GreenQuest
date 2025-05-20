import { useState, useEffect, useCallback, useContext } from "react";
import {
  getChallengesByCategory,
  getUserPostsForChallenge,
} from "../adapters/challenge-adapter.js";
import { createPost } from "../adapters/post-adapter.js";
import "../styles/Feed.css"; // Make sure this path matches your project
import CurrentUserContext from "../contexts/current-user-context";
import FeedChallengeCard from "../components/FeedChallengeCard";
import FeedDailyChallengeCard from "../components/FeedDailyChallengeCard.jsx";
import SelectedChallengeDisplay from "../components/SelectedChallengeDisplay.jsx";

// --- Main Feed Component --- //
export default function Feed() {
  const [communityChallenges, setCommunityChallenges] = useState([]);
  const [selectedChallengeId, setSelectedChallengeId] = useState(null);
  const [selectedChallengeDetails, setSelectedChallengeDetails] =
    useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [isLoadingChallenges, setIsLoadingChallenges] = useState(false);
  const [isLoadingUserPosts, setIsLoadingUserPosts] = useState(false);
  const [error, setError] = useState(null);

  const { currentUser } = useContext(CurrentUserContext); // If using context for user

  // Fetch user posts and user details of the selected challenge.
  useEffect(() => {
    if (!selectedChallengeId) {
      setSelectedChallengeDetails(null);
      setUserPosts([]);
      return;
    }
    const fetchUserPosts = async () => {
      setIsLoadingUserPosts(true);
      setError(null);
      try {
        // Fetch selected challenges details by challengeId.
        const [selectedUserPostsData, error] = await getUserPostsForChallenge(
          selectedChallengeId
        );
        console.log("Related User Posts Response", selectedUserPostsData);
        setUserPosts(selectedUserPostsData);
      } catch (error) {
        setError(error.message || "Failed ot load user posts.");
        console.error(error);
      } finally {
        setIsLoadingUserPosts(false);
      }
    };
    fetchUserPosts();
  }, [selectedChallengeId, communityChallenges]); // Reruns if selected challengeId or the main community challenges changes.

  const handleSelectChallenge = useCallback((challengeId) => {
    setSelectedChallengeId(challengeId);
  }, []);

  const handleCloseSelectedChallenge = () => {
    setSelectedChallengeId(null);
  };

  const handleAddPost = async (challengeId, content, userId) => {
    // if (!currentUser || !challengeId) {
    //   return;
    // }
    //    // Format the Data in an Object;
    //    const newPost = {
    //     content,
    //     likes: 0,
    //     userId,
    //     challengeId
    //   }
    //   try {
    //     const createdPost = await createdPost(newPost);
    //   } catch(error) {
    //     console.error('Failed to create a Post', error);
    //   }
  };

  if (isLoadingChallenges)
    return <div className="feed-loading">Loading...</div>;

  return (
    <div className="feed-container">
      <h2 className="feed-title">Community Feed</h2>
      <div className="post-grid">
        {communityChallenges.map((challenge) => (
          <div key={challenge.id}>
            <FeedChallengeCard
              challenge={challenge}
              onSelectChallenge={handleSelectChallenge}
            />
          </div>
        ))}
      </div>
      {selectedChallengeId && (
        <SelectedChallengeDisplay
          challenge={
            communityChallenges.find((c) => c.id === selectedChallengeId) || {}
          }
          relatedUserPosts={userPosts}
          onAddPost={handleAddPost}
          currentUser={currentUser}
          onClose={handleCloseSelectedChallenge}
        />
      )}
    </div>
  );
}
