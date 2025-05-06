// These functions all take in a body and return an options object
// with the provided body and the remaining options
import {
  fetchHandler,
  getPatchOptions,
  getPostOptions,
} from "../utils/fetchingUtils";

const baseUrl = "/api/challenges";

export const getChallenges = async (category) => {
  if (!category) throw new Error("Category is required to fetch challenges.");
  return await fetchHandler(`${baseUrl}?category=${category}`);
};

// used for verification
export const getCompletedChallenges = async (userId) => {
  if (!userId)
    throw new Error("User ID is required to fetch completed challenges.");
  return await fetchHandler(`/api/users/${userId}/completed-challenges`);
};

export const completeChallenge = async (userId, challengeId) => {
  if (!userId || !challengeId) {
    throw new Error(
      "User ID and Challenge ID are required to complete a challenge."
    );
  }

  const body = { userId, challengeId };
  return await fetchHandler(`${baseUrl}/complete`, getPostOptions(body));
};
