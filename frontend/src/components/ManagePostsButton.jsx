import { useState } from "react";
import { updatePost, deletePost } from "../adapters/post-adapter";
import "../styles/ManagePostButton.css";

export default function ManagePostsButton({
  postId,
  content,
  onUpdate,
  onDelete,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [newContent, setNewContent] = useState(content || "");

  const handleDelete = async () => {
    const success = await deletePost(postId);
    if (success) {
      onDelete(postId); // Notify parent to remove post from UI
    }
  };

  const handleUpdate = async () => {
    const updatedPost = await updatePost(postId, { content: newContent });
    console.log(`Updated post: ${updatedPost}`);
    if (updatedPost) {
      onUpdate(updatedPost); // Notify parent to update the content
      setEditing(false);
      setIsOpen(false);
    }
  };

  return (
    <div className="manage-post-wrapper">
      <button className="menu-button" onClick={() => setIsOpen(!isOpen)}>
        •••
      </button>

      {isOpen && (
        <div className="manage-post-dropdown">
          {editing ? (
            <>
              <textarea
                className="edit-textarea"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
              />
              <button className="confirm-button" onClick={handleUpdate}>
                Save
              </button>
            </>
          ) : (
            <>
              <button
                className="dropdown-button"
                onClick={() => setEditing(true)}
              >
                Edit
              </button>
              <button className="dropdown-button delete" onClick={handleDelete}>
                Delete
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
