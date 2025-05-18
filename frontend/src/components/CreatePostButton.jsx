import { useState } from "react";
import CreatePostModal from "./CreatePostModal";

export default function CreatePostButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        className="button-post"
        onClick={() => setIsModalOpen(true)}
        style={{
          marginTop: "0.5rem",
          background: "#3ddc91",
          color: "white",
          padding: "0.4rem 1rem",
          border: "none",

          borderRadius: "8px",
          fontSize: "0.9rem",
          cursor: "pointer",
        }}
      >
        Create a Post
      </button>

      {isModalOpen && <CreatePostModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
}
