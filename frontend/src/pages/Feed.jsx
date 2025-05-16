import { useState, useEffect } from "react";
import "../styles/Feed.css"; // Make sure this path matches your project

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Replace with actual adapter or API call
        const response = await fetch("/api/posts");
        if (!response.ok) throw new Error("Failed to fetch posts");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div className="feed-loading">Loading...</div>;

  return (
    <div className="feed-container">
      <h2 className="feed-title">Community Feed</h2>
      <div className="post-grid">
        {posts.map((post) => (
          <div key={post.postId} className="post-card">
            <p className="post-content">{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
