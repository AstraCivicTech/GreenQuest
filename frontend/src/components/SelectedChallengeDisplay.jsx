import "../styles/Feed.css";
import { getChallengeCreator } from "../adapters/challenge-adapter";
import { useEffect, useState } from "react";

const SelectedChallengeDisplay = ({ challenge, relatedUserPosts, onAddPost, currentUser, onClose }) => {
    const [newPostContent, setNewPostContent] = useState('');
    const [userDetails, setUserDetails] = useState({});
    const handlePostSubmit = async (event) => {
      event.preventDefault();
      if(!newPostContent.trim() || !challenge?.id) return; 
      // onAddPost, which handles API calls and state updates.
      onAddPost(challenge.id, newPostContent,currentUser.id);
      setNewPostContent('');
    };

    const handleModalClose = async (event) => {
        event.preventDefault();
        onClose();
    }
    // Fetch the user details of the selected challenge.
    useEffect(()=>{
        if (!challenge?.id) return;
        const fetchUserDetailsByChallengeId = async () => {
            try {
                const [userDetailsData,error] = await getChallengeCreator(challenge.id)
                if(error) throw Error("Error: Fetching user details failed.", error);
                console.log('User Details Response',userDetailsData);
                setUserDetails(userDetailsData);
            } catch(error) {
                console.log('Error:',error);
            }
        }
        fetchUserDetailsByChallengeId();
    },[challenge?.id])

    if(!challenge) return null;

    return (
      <div className="selected-challenge-modal"> {/* Or however you want to style the "middle of screen" display */}
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
                                <p>{post.content}</p>
                                <small>Posted on: {new Date(post.createdAt).toLocaleString()}</small>
                            </div> 
                        ))
                    ))):( <p> No posts for this challenge yet.</p> )
                }
            </div>
            {currentUser && (
                <form onSubmit={handlePostSubmit} className="add-post-form">
                    <textarea value={newPostContent}
                    onChange ={(e) => setNewPostContent(e.target.value)}
                    placeholder="Type your post here...."
                     rows="3"
                     required
                    >
                    </textarea>
                    <button type="submit">Add a Post</button>
                </form>
            )}
        </div>
        </div>
      </div>
    );
  };

  export default SelectedChallengeDisplay;