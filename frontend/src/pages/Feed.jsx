import { useState, useEffect } from "react";
import { getAllPosts } from "../adapters/post-adapter";
import ManagePostsButton from "../components/ManagePostsButton";
import TextPostContainer from "../components/TextPostContainer";
import "../styles/Feed.css";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch posts initially
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await getAllPosts();
      setPosts(response[0] || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  // Called after a post is deleted
  const handleDelete = (deletedId) => {
    setPosts((prev) => prev.filter((post) => post.postId !== deletedId));
  };

  // Called after a post is updated
  const handleUpdate = (updatedContent) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.postId === updatedContent.postId ? updatedContent : post
      )
    );
  };
  console.log(`posts: ${posts}`);
  if (loading) return <div className="feed-loading">Loading...</div>;

  return (
    <div className="feed-container">
      <h2 className="feed-title">Community Feed</h2>
      <div className="post-grid">
        {posts.map((post) => (
          <TextPostContainer
            key={post.postId}
            content={post}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </div>
    </div>
  );
}
