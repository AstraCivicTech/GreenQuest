import { useState } from "react";
import CreatePostModal from "./CreatePostModal";
import "../styles/CreatePostButton.css";

export default function CreatePostButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button onClick={handleOpenModal}>+ Post</button>
      {isModalOpen && <CreatePostModal onClose={handleCloseModal} />}
    </>
  );
}
