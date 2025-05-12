/* eslint-disable max-len */
/* eslint-disable func-style */
require('dotenv').config({
  // eslint-disable-next-line global-require
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

// A customized prompt that is sent to the LLM to generate the 3 daily challenges.
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
]`

// A custom parser to remove the content inside the think tags and return the JSON array of objects.
const parseThinkTagsAndReturnJSON = (response) => {

  // RegEx to match everything inside the think tags.
  const thinkTagPattern = /<think>[\s\S]*?<\/think>/;

 // Remove the content within the think tags.
 let cleanInput = response.replace(thinkTagPattern,'');

 // Removes the JSON formatted markdown
 cleanInput = cleanInput.replace(/```json\s*/g, '').replace(/```\s*/g,'');

// Trim the whitespace to get the JSON array.
const jsonString = cleanInput.trim();
  return jsonString;
}

// Fetches the new daily challenges from the AI.
const fetchDailyChallenges = async () => {
  console.log('Starting fetchDailyChallenges function...');
  try {
    console.log('Attempting to fetch from local model...');
    const response = await fetch(process.env.domain, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'deepseek-r1:8b',
        prompt,
        stream: false,
      }),
    });
    console.log('Got response from local model');
    const data = await response.json();
    // console.log('Parsed response data:', JSON.parse(parseThinkTagsAndReturnJSON(data.response)));
    // console.log('Running fetchDailyChallenges function');
    const challengesArray = JSON.parse(parseThinkTagsAndReturnJSON(data.response));
    return challengesArray;
  } catch (error) {
    console.log('Local model fetch failed, trying Gemini fallback...', error);
    // Fallback to the Gemini model if the locally deployed models is offline.
    try {
      console.log('Initializing Gemini model...');
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }); // Use correct method name & version
      const result = await model.generateContent(prompt);
      const response = await result.response.text(); // text()

      const challengesArray = JSON.parse(response);
      console.log('Successfully got response from Gemini:', challengesArray);
      return challengesArray;
    } catch (error) {
      console.error('Failed to fetch from local model and Gemini Model', error);
      throw error;
    }
  }
};
/**
 * Process the daily challenges from the AI and stores them in the database.
 */
async function processDailyChallenges() {
  console.log('Attempting to fetch new daily challenges...');
  try {
    // Fetches the daily challenges from the LLM and stores them in an array of objects.
    const challengesArray = await fetchDailyChallenges();
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
    console.error('Error in processDailyChallenges:', error);
    throw error;
  }
}

module.exports = { processDailyChallenges, fetchDailyChallenges };
