/* eslint-disable max-len */
/* eslint-disable func-style */
require('dotenv').config({
  path: require('path').resolve(__dirname, '../.env'),
}); // Ensure .env is loaded relative to server folder
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Challenge = require('../models/Challenge');

const { API_KEY } = process.env;

// Ensure the API key is defined in the environment variables file.
if (!API_KEY) {
  console.error(
    'API_KEY is not defined. Please check your .env file in the server directory.'
  );
}

const genAI = new GoogleGenerativeAI(API_KEY);

/**
 * Fetches new daily challenges from the AI and processes them.
 * This function should also handle storing these challenges (e.g., in a database or cache).
 */
async function fetchAndProcessDailyChallenges() {
  console.log('Attempting to fetch new daily challenges...');
  try {
    const prompt = `Return ONLY valid JSON without any markdown formatting or code blocks.
Generate 3 real-life daily challenges following these themes: Eco Habit, Nature Appreciation, and Community Engagement. Challenges should be short (1 sentence), engaging, and written in the tone of an energetic game master. Each challenge should have a unique name and a playful description that encourages real-world action.
Format the response as a JSON array of objects with these fields:
- "challengeType": Must be exactly one of these strings: "Eco-Habit", "Nature Appreciation", or "Community Engagement"
- "category": should always be "Daily"
- "description": A single sentence challenge description
- "experienceReward": A number between 33-133
Challenges should be suitable for all ages and not require special equipment or long travel.
Example of desired format:
[
  {
    "challengeType": "Eco-Habit",
    "category": "Daily",
    "description": "Today's mission, Eco-Warriors: Collect all recyclable items in your immediate vicinity and get them to the recycling bin – let's conquer waste!",
    "experienceReward": 78
  },
  {
    "challengeType": "Nature Appreciation",
    "category": "Daily",
    "description": "Calling all Nature Scouts! Spend 10 minutes observing and writing down 3 details you notice about nature around you – a flower's color, a bird's song, anything! Let's unlock nature's secrets!",
    "experienceReward": 124
  },
  {
    "challengeType": "Community Engagement",
    "category": "Daily",
    "description": "Citizens of Kindness Kingdom! Perform a small act of kindness for a neighbor or family member today – a helping hand earns you major points in the Kindness Games!",
    "experienceReward": 92
  }
]`; // Customize your prompt
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }); // Use correct method name & version
    const result = await model.generateContent(prompt);
    const response = await result.response.text(); // text()

    let challengesArray = JSON.parse(response);

    // 1. Validates the structure of challengesArray
    if (
      !Array.isArray(challengesArray) ||
      challengesArray.some(
        (c) =>
          !c.challengeType ||
          !c.category ||
          !c.description ||
          !c.experienceReward
      )
    ) {
      throw new Error('Invalid challenge object structure from AI');
    }
    // 2. Add unique IDs if your AI doesn't provide them and your DB table doesn't auto-generate them.
    // If your DB auto-generates IDs, you can skip this for the 'id' field.
    challengesArray = challengesArray.map((challenge) => ({
      ...challenge,
      // id: generateUniqueId(), // Uncomment if you need to generate IDs here and your table doesn't auto-increment 'id'
      // Ensure other fields like description, experienceReward are present from the AI
    }));

    // 3. Store these challenges in the database.
    // IMPORTANT: Adjust 'daily_challenges' to your actual table name.
    // This example deletes all old challenges and inserts new ones.
    console.log('Deleting old daily challenges...');
    Challenge.resetDailyChallenges();

    console.log('Inserting new daily challenges...', challengesArray);

    challengesArray.forEach((challenge) => {
      // add the challenge to the database
      Challenge.addChallengeToDB(challenge);
    });

    return challengesArray;
  } catch (error) {
    console.error('Error in fetchAndProcessDailyChallenges:', error);
    throw error;
  }
}

module.exports = { fetchAndProcessDailyChallenges };

// This creates and saves new challenges
