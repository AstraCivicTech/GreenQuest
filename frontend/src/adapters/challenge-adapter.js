// These functions all take in a body and return an options object
// with the provided body and the remaining options
import { fetchHandler, getPostOptions } from "../utils/fetchingUtils";

const challengesUrl = "/api/challenges";
const challengeUrl = "/api/challenge";
export const getChallengesByCategory = async (category) => {
  return await fetchHandler(`${challengesUrl}?category=${category}`);
};

// used for daily challenges
export const getCompletedChallenges = async (userId) => {
  if (!userId)
    throw new Error("User ID is required to fetch completed challenges.");
  return await fetchHandler(`/api/users/completed-challenges`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: Number(userId) })
  });
};

export const getCompletedChallenges2 = async (id) => {
  console.log("inside of get..2:", id);
  return await fetchHandler(`/api/users/completed-challenges`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: Number(id) }), // Send as an object
  });
};

export const checkCategory = async (challengeId) => {
  return await fetchHandler(`/api/challenges/getById`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ challengeId: Number(challengeId) }), // Send as an object
  });
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
  return await fetchHandler(`${challengesUrl}/complete`, getPostOptions(body));
};

// Fetches all the users post for a particular challenge.
export const getUserPostsForChallenge = async (challengeId) => {
  if (!challengeId) {
    throw new Error("Challenge ID is required to fetch user posts.");
  }
  return await fetchHandler(`${challengesUrl}/${challengeId}/users`);
};

// Fetches the user information of the specified challenge(challengeId).
export const getChallengeCreator = async (challengeId) => {
  if (!challengeId) {
    throw new Error("Challenge ID is required to fetch user information");
  }
  return await fetchHandler(`${challengeUrl}/${challengeId}/user`);
};
