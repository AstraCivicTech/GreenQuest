import { useState, useEffect, useCallback, useContext } from "react";
import {
  getChallengesByCategory,
  getUserPostsForChallenge,
} from "../adapters/challenge-adapter.js";
import { createPost, updatePost, deletePost } from "../adapters/post-adapter.js";
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

  const fetchChallenges = async () => {
    setIsLoadingChallenges(true);
    try {
      const [data, error] = await getChallengesByCategory("community");
      if (error) throw error;
      setCommunityChallenges(data.filter(challenge => challenge.category === "community"));
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoadingChallenges(false);
    }
  };

  const refreshUserPosts = async (challengeId) => {
    if (!challengeId) return;
    setIsLoadingUserPosts(true);
    try {
      const [selectedUserPostsData, error] = await getUserPostsForChallenge(challengeId);
      if (error) throw error;
      setUserPosts(selectedUserPostsData);
    } catch (error) {
      setError(error.message || "Failed to load user posts.");
    } finally {
      setIsLoadingUserPosts(false);
    }
  };

  useEffect(() => {
    fetchChallenges();
  }, []);

  useEffect(() => {
    if (!selectedChallengeId) {
      setSelectedChallengeDetails(null);
      setUserPosts([]);
      return;
    }
    refreshUserPosts(selectedChallengeId);
  }, [selectedChallengeId]);

  const handleSelectChallenge = useCallback((challengeId) => {
    setSelectedChallengeId(challengeId);
  }, []);

  const handleCloseSelectedChallenge = () => {
    setSelectedChallengeId(null);
  };

  const handleAddPost = async (challengeId, content, userId) => {
    if (!currentUser || !challengeId) return;
    
    const newPost = {
      content,
      likes: 0,
      userId,
      challengeId
    };
    try {
      await createPost(newPost);
      await refreshUserPosts(challengeId);
    } catch(error) {
      console.error('Failed to create a Post', error);
    }
  };

  const handleUpdatePost = async (postId, updatedContent) => {
    if (!selectedChallengeId) return;
    
    try {
      const [result, error] = await updatePost({ id: postId }, { content: updatedContent });
      if (error) throw error;
      await refreshUserPosts(selectedChallengeId);
    } catch (error) {
      console.error('Failed to update post:', error);
    }
  };

  const handleDeletePost = async (postId) => {
    if (!selectedChallengeId) return;
    
    try {
      await deletePost({ id: postId });
      await refreshUserPosts(selectedChallengeId);
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
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
          onUpdatePost={handleUpdatePost}
          onDeletePost={handleDeletePost}
          currentUser={currentUser}
          onClose={handleCloseSelectedChallenge}
        />
      )}
    </div>
  );
}
