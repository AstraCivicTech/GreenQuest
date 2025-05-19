import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import { createPost } from "../adapters/post-adapter";
import "../styles/CreatePostModal.css";

export default function CreatePostModal({ onClose }) {
  const { currentUser } = useContext(CurrentUserContext);
  const [content, setContent] = useState("");

  const handleChange = (event) => {
    setContent(event.target.value);
  };
  const handlePostSubmit = async (event) => {
    event.preventDefault();
    // Handle post submission logic here
    console.log(event);
    const post = await createPost({
      content: content,
      likes: 0,
      user_id: currentUser.id,
    });
    onClose(); // Close the modal after submission
  };
  return (
    <div className="modal-overlay">
      <form className="modal-content" onSubmit={handlePostSubmit}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <label className="modal-title">Create a Post</label>
        <input
          name="content"
          type="text"
          value={content}
          className="modal-input"
          onChange={handleChange}
          placeholder="Write your post here..."
        />
        <div className="modal-actions">
          <input type="submit" value="submit" className="submit-button" />
        </div>
      </form>
    </div>
  );
}
