import { useContext, useEffect, useState } from "react";
import ManagePostsButton from "./ManagePostsButton";

export default function TextPostContainer({ post, onDelete, onUpdate }) {
  return (
    <div key={post.postId} className="post-card">
      <p className="post-content">{post.content || "No content available"}</p>
      <ManagePostsButton
        postId={post.postId}
        content={post.content}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
    </div>
  );
}
