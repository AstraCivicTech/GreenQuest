import { useState, useEffect } from "react";
import { getAllPosts } from "../adapters/post-adapter";
import TextPostContainer from "../components/TextPostContainer";
import "../styles/Feed.css";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const [data, error] = await getAllPosts();
        if (error) return console.error("Failed to load posts:", error);
        setPosts(data);
      } catch (err) {
        console.error("Unexpected error:", err);
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
          <TextPostContainer
            key={post.postId}
            post={post}
            posts={posts}
            setPosts={setPosts}
          />
        ))}
      </div>
    </div>
  );
}
