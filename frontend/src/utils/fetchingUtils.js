
export const basicFetchOptions = {
  method: "GET",
  credentials: "include",
};

export const deleteOptions = {
  method: "DELETE",
  credentials: "include",
};

export const getPostOptions = (body) => ({
  method: "POST",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

// Reusable POST option builder
const buildPostOptions = (prompt) => ({
  method: "POST",
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ prompt }),
});

// Challenge generator options
export const getDailyOptions = buildPostOptions(
  `Generate 3 real-life daily challenges following these themes: Eco Habit, Nature Appreciation, and Community Engagement. Challenges should be short (1–2 sentences), engaging, and written in the tone of an energetic game master. Each challenge should have a unique name and a playful description that encourages real-world action. Return the result as a JSON array with 'challengeName' and 'description' fields. Challenges should be suitable for all ages and not require special equipment or long travel.`
);

// Challenge validator options (dynamic)
export const validateChallengeOptions = (challengePrompt) =>
  buildPostOptions(
    `Validate the following user-generated community challenge. Ensure it is family-friendly, engaging, suitable for all ages, and not dangerous or requiring meetups. Return "yes" if the challenge is valid and "no" if it is not. Challenge: "${challengePrompt}"`
  );

export const getPatchOptions = (body) => ({
  method: "PATCH",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

export const fetchHandler = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    const { ok, status, headers } = response;
    if (!ok)
      throw new Error(`Fetch failed with status - ${status}`, {
        cause: status,
      });

    const isJson = (headers.get("content-type") || "").includes(
      "application/json"
    );
    const responseData = await (isJson ? response.json() : response.text());

    return [responseData, null];
  } catch (error) {
    console.warn(error);
    return [null, error];
  }
};
