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
export const buildPostOptions = (prompt) => ({
  method: "POST",
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ prompt }),
});

// Challenge generator options
export const getDailyOptions = buildPostOptions(
  `Return ONLY valid JSON without any markdown formatting or code blocks.
Generate 3 real-life daily challenges following these themes: Eco Habit, Nature Appreciation, and Community Engagement. Challenges should be short (1 sentence), engaging, and written in the tone of an energetic game master. Each challenge should have a unique name and a playful description that encourages real-world action.
Format the response as a JSON array of objects with these fields:
- "type": Must be exactly one of these strings: "Eco-Habit", "Nature Appreciation", or "Community Engagement"
- "description": A single sentence challenge description
- "exp": A number between 33-133
Challenges should be suitable for all ages and not require special equipment or long travel.
Example of desired format:
[
  {
    "type": "Eco-Habit",
    "category": "Daily",
    "description": "Today's mission, Eco-Warriors: Collect all recyclable items in your immediate vicinity and get them to the recycling bin – let's conquer waste!",
    "exp": 78
  },
  {
    "type": "Nature Appreciation",
    "category": "Daily",
    "description": "Calling all Nature Scouts! Spend 10 minutes observing and writing down 3 details you notice about nature around you – a flower's color, a bird's song, anything! Let's unlock nature's secrets!",
    "exp": 124
  },
  {
    "type": "Community Engagement",
    "category": "Daily",
    "description": "Citizens of Kindness Kingdom! Perform a small act of kindness for a neighbor or family member today – a helping hand earns you major points in the Kindness Games!",
    "exp": 92
  }
]`
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
