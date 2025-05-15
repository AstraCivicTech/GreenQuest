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
  console.log("adapters userId:", userId, "challenge id:", challengeId);
  if (!userId || !challengeId) {
    throw new Error(
      "User ID and Challenge ID are required to complete a challenge."
    );
  }
  const body = { userId, challengeId };
  console.log("body (challenge adapter, complete challenge):", body);
  return await fetchHandler(`${baseUrl}/complete`, getPostOptions(body));
};

// Add a new challenge to the DB (uses a default backend-defined challenge)
export const addChallengeToDB = async (challengeData) => {
  return await fetchHandler(`${baseUrl}/create`, getPostOptions(challengeData));
};
