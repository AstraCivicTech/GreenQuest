// These functions all take in a body and return an options object
// with the provided body and the remaining options
import { fetchHandler, getPostOptions } from "../utils/fetchingUtils";

const baseUrl = "/api/challenges";

export const getChallenges = async (category) => {
  if (!category) throw new Error("Category is required");
  console.log("category being passed (getChallenges): ", category);

  try {
    const response = await fetch(`/api/challenges?category=${category}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    console.log("response: ", response);
    return response;
  } catch (error) {
    console.error("Error fetching challenges:", error);
    throw error;
  }
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

  try {
    const response = await fetch(`${baseUrl}/complete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        userId,
        challengeId,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    const data = await response.json();
    return [data, null];
  } catch (error) {
    console.error("Error completing challenge:", error);
    return [null, error];
  }
};

// Add a new challenge to the DB (uses a default backend-defined challenge)
export const addChallengeToDB = async (challengeData) => {
  return await fetchHandler(`${baseUrl}/create`, getPostOptions(challengeData));
};
