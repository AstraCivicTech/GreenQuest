import "../styles/Feed.css";
import { getChallengeCreator } from "../adapters/challenge-adapter";
import { useEffect, useState } from "react";

const SelectedChallengeDisplay = ({ 
  challenge, 
  relatedUserPosts, 
  onAddPost, 
  onUpdatePost,
  onDeletePost,
  currentUser, 
  onClose 
}) => {
    const [newPostContent, setNewPostContent] = useState('');
    const [userDetails, setUserDetails] = useState({});
    const [editingPostId, setEditingPostId] = useState(null);
    const [updatedContent, setUpdatedContent] = useState('');

    const handlePostSubmit = async (event) => {
      event.preventDefault();
      if(!newPostContent.trim() || !challenge?.id) return;
      onAddPost(challenge.id, newPostContent, currentUser.id);
      setNewPostContent('');
    };

    const handleDelete = async (postId) => {
      await onDeletePost(postId);
    };

    const handleUpdate = async (postId) => {
      await onUpdatePost(postId, updatedContent);
      setEditingPostId(null);
    };

    const handleModalClose = async (event) => {
        event.preventDefault();
        onClose();
    }

    useEffect(()=>{
        if (!challenge?.id) return;
        const fetchUserDetailsByChallengeId = async () => {
            try {
                const [userDetailsData, error] = await getChallengeCreator(challenge.id)
                if(error) throw Error("Error: Fetching user details failed.", error);
                setUserDetails(userDetailsData);
            } catch(error) {
                console.error('Error:', error);
            }
        }
        fetchUserDetailsByChallengeId();
    },[challenge?.id])

    if(!challenge) return null;

    return (
      <div className="selected-challenge-modal">
        <div className="selected-challenge-content-box">
          <button onClick={handleModalClose} className="selected-challenge-close-button">X</button>
          <h4>Username: {userDetails.username} </h4>
          <h2>{challenge.challengeType || 'Selected Challenge'}</h2>
          <p>{challenge.description || 'Detailed description of the selected challenge.'}</p>
          <div className="challenge-exp">
            <span className="exp-points">EXP: {challenge.experienceReward}</span>
          </div>
          <div className="related-posts-section">
            <h4>Related Posts</h4>
            <div className="post-scroll-container">
                { 
                    relatedUserPosts.length > 0 ? (relatedUserPosts.map(userpost => (
                        userpost.posts.map((post) => (
                            <div key={post.postId} className='post-item'>
                                <p><strong>User: {userpost.username}</strong></p>
                                {editingPostId === post.postId ? (
                                    <>
                                        <textarea
                                            value={updatedContent}
                                            onChange={(e) => setUpdatedContent(e.target.value)}
                                            className="edit-textarea"
                                        />
                                        <div className="post-actions">
                                            <button onClick={() => handleUpdate(post.postId)}>Save</button>
                                            <button onClick={() => setEditingPostId(null)}>Cancel</button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <p>{post.content}</p>
                                        <small>Posted on: {new Date(post.createdAt).toLocaleString()}</small>
                                        {currentUser && currentUser.id === userpost.id && (
                                            <div className="post-actions">
                                                <button onClick={() => {
                                                    setEditingPostId(post.postId);
                                                    setUpdatedContent(post.content);
                                                }}>Edit</button>
                                                <button onClick={() => handleDelete(post.postId)}>Delete</button>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div> 
                        ))
                    ))):( <p> No posts for this challenge yet.</p> )
                }
            </div>
            {currentUser && (
                <form onSubmit={handlePostSubmit} className="add-post-form">
                    <textarea 
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                        placeholder="Type your post here...."
                        rows="3"
                        required
                    />
                    <button type="submit">Add a Post</button>
                </form>
            )}
          </div>
        </div>
      </div>
    );
  };

  export default SelectedChallengeDisplay;