// These functions all take in a body and return an options object
// with the provided body and the remaining options
import {
  fetchHandler,
  getPostOptions,
} from "../utils/fetchingUtils";

const challengesUrl = "/api/challenges"
const challengeUrl = "/api/challenge";
export const getChallengesByCategory = async (category) => {
  return await fetchHandler(`${challengesUrl}?category=${category}`);
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
  return await fetchHandler(`${challengesUrl}/complete`, getPostOptions(body));
};

// Fetches all the users post for a particular challenge. 
export const getUserPostsForChallenge = async (challengeId) => {
  if(!challengeId){
    throw new Error("Challenge ID is required to fetch user posts.");
  }
  return await fetchHandler(`${challengesUrl}/${challengeId}/users`);
}

// Fetches the user information of the specified challenge(challengeId).
export const getChallengeCreator = async(challengeId) => {
  if(!challengeId) {
    throw new Error('Challenge ID is required to fetch user information')
  }
  return await fetchHandler(`${challengeUrl}/${challengeId}/user`);
} 
