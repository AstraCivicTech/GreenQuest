// These functions all take in a body and return an options object
// with the provided body and the remaining options
import { fetchHandler, getPostOptions } from "../utils/fetchingUtils";

const postsUrl = "/api/posts/";
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
export const updatePost = async (updateParams) => {
  return await fetchHandler(`${postUrl}`, updateParams);
};

// Deletes a post based on the post Id.
export const deletePost = async (deleteParams) => {
  return await fetchHandler(`${postUrl}`, deleteParams);
};
