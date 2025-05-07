import {
  fetchHandler,
  buildPostOptions,
  getDailyOptions,
  validateChallengeOptions,
} from "../utils/fetchingUtils";

//if you're getting a 404 error, change the port from 3003 to 3000 or vise versa
const baseUrl = (use) => {
  return `http://localhost:3003/api/ai/${use}`;
};

export const getDailyChallenges = async () => {
  const [data, error] = await fetchHandler(
    //if you're getting a 404 error, change the port from 3003 to 3000 or vise versa
    baseUrl("generate"),
    getDailyOptions
  );

  console.log("getDailyChallenges data:", data);
  return [data, error];
};

export const validateChallenge = async (challengePrompt) => {
  const [data, error] = await fetchHandler(
    //if you're getting a 404 error, change the port from 3003 to 3000 or vise versa
    baseUrl("validate"),
    validateChallengeOptions(challengePrompt)
  );

  console.log("validateChallenge data:", data);
  return [data, error];
};
