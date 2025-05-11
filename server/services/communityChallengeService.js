/* eslint-disable max-len */
/* eslint-disable func-style */
require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env"),
}); // Ensure .env is loaded relative to server folder
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Challenge = require("../models/Challenge");

const { API_KEY } = process.env;

// Ensure the API key is defined in the environment variables file.
if (!API_KEY) {
  console.error(
    "API_KEY is not defined. Please check your .env file in the server directory."
  );
}

const genAI = new GoogleGenerativeAI(API_KEY);

/**
 * Fetches new daily challenges from the AI and processes them.
 * This function should also handle storing these challenges (e.g., in a database or cache).
 */
async function validateAndProcessCommunityChallenges(req, res) {
  console.log("Attempting to validate challenge...");

  const challenge = req.body;
  console.log("Challenge received:", challenge);
  try {
    const prompt = `
Please evaluate this eco-challenge description for appropriateness and validity.
Check for:
1. Malicious or harmful content
2. Relevance to environmental sustainability
3. Feasibility for users to complete

Challenge description: "${challenge.description}"

Respond with only "yes" if the challenge is appropriate and valid, or "no" if it should be rejected.
`;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Use correct method name & version
    const result = await model.generateContent(prompt);
    const response = await result.response.text(); // text()

    let valid = response;
    console.log("AI Response:", valid); // Add this to debug the AI response

    if (!valid.includes("yes")) {
      return res.status(400).json({
        success: false,
        message:
          "Malicious or invalid challenge description detected, please try again.",
      });
    }

    // If validation passes, add to database
    const added = await Challenge.addCommunityChallengeToDB(challenge);
    console.log("Challenge added to the database:", challenge);

    return res.status(201).json({
      success: true,
      result: challenge,
    });
  } catch (error) {
    console.error("Error in validateAndProcessCommunityChallenges:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while processing challenge",
    });
  }
}

module.exports = validateAndProcessCommunityChallenges;

// This creates and saves new challenges
