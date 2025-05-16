// These functions all take in a body and return an options object
// with the provided body and the remaining options
import { fetchHandler, getPostOptions } from "../utils/fetchingUtils";

const baseUrl = "/api/posts/";

export const getAllPosts = async () => {
  return await fetchHandler(`${baseUrl}`);
};

// Add a new challenge to the DB (uses a default backend-defined challenge)
export const addPostToDB = async (postData) => {
  return await fetchHandler("/api/post", getPostOptions(postData));
};
