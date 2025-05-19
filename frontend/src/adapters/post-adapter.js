// These functions all take in a body and return an options object
// with the provided body and the remaining options
import {
  fetchHandler,
  getPostOptions,
  deleteOptions,
  updatePostOptions,
} from "../utils/fetchingUtils";

// Multiple posts URL
const postsUrl = "/api/posts/";
// One post URL
const postUrl = "/api/post";

// Retrieves all the posts
export const getAllPosts = async () => {
  return await fetchHandler(`${postsUrl}`);
};

// Add a new challenge to the DB (uses a default backend-defined challenge)
export const createPost = async (postData) => {
  return await fetchHandler(`${postUrl}`, getPostOptions(postData));
};

// Updates an existing post with the specified values.
export const updatePost = async (post, fieldsToUpdate) => {
  return await fetchHandler(
    `${postUrl}/update/${post.id}`,
    updatePostOptions(fieldsToUpdate)
  );
};

// Deletes a post based on the post Id.
export const deletePost = async (post) => {
  console.log("Deleting post with ID:", post.id);
  return await fetchHandler(`${postUrl}/delete/${post.id}`, deleteOptions);
};
