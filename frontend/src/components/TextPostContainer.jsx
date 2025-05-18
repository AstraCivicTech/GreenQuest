import { useState } from "react";
import { updatePost, deletePost } from "../adapters/post-adapter";
import "../styles/TextPostContainer.css";

export default function TextPostContainer({ post, posts, setPosts }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedContent, setUpdatedContent] = useState(post.content);

  const handleDelete = async () => {
    await deletePost({ id: post.postId });
    setPosts((prev) => prev.filter((p) => p.postId !== post.postId));
  };

  const handleUpdate = async () => {
    const updated = {
      content: updatedContent,
    };

    const [result, error] = await updatePost({ id: post.postId }, updated);
    if (!error) {
      setPosts((prev) =>
        prev.map((p) =>
          p.postId === post.postId
            ? {
                ...p,
                content: updated.content,
              }
            : p
        )
      );
      setIsEditing(false);
    }
  };

  return (
    <div className="post-card">
      {isEditing ? (
        <>
          <textarea
            value={updatedContent}
            onChange={(e) => setUpdatedContent(e.target.value)}
            className="edit-textarea"
          />
          <div className="post-actions">
            <button onClick={handleUpdate}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <p className="post-content">{post.content}</p>
          <div className="post-actions">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
}
