import "../styles/CreatePostModal.css";

export default function CreatePostModal({ onClose }) {
  const handlePostSubmit = (event) => {
    event.preventDefault();
    // Handle post submission logic here

    onClose(); // Close the modal after submission
  };
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h2 className="modal-title">Create a Post</h2>
        <textarea
          className="modal-textarea"
          placeholder="What's on your mind?"
          rows={6}
        ></textarea>
        <div className="modal-actions">
          <button className="submit-button" onClick={handlePostSubmit}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
