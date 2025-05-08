// require('dotenv').config({
//   path: require('path').resolve(__dirname, '../.env'),
// }); // Ensure .env is loaded relative to server folder
// const { GoogleGenerativeAI } = require('@google/generative-ai');
// const knex = require('../db/knex'); // Assuming your knex instance is exported from here
// const { generateUniqueId } = require('../utils/generateId'); // Assuming you have this utility

// const { API_KEY } = process.env;

// if (!API_KEY) {
//   console.error(
//     'API_KEY is not defined. Please check your .env file in the server directory.'
//   );
//   // Potentially throw an error or exit if API_KEY is critical for this service
// }

// const genAI = new GoogleGenerativeAI(API_KEY);

// /**
//  * Fetches new daily challenges from the AI and processes them.
//  * This function should also handle storing these challenges (e.g., in a database or cache).
//  */
// async function fetchAndProcessDailyChallenges() {
//   console.log('Attempting to fetch new daily challenges...');
//   try {
//     const prompt =
//       'Generate 5 unique daily eco-friendly challenges, each with a short description and an experience point (XP) reward. Return as a JSON array.'; // Customize your prompt
//     const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const responseText = response.text();

//     let challengesArray = JSON.parse(responseText);

//     // 1. Validate the structure of challengesArray (optional, but good practice)
//     // e.g., if (!Array.isArray(challengesArray) || challengesArray.some(c => !c.description || !c.experienceReward)) throw new Error('Invalid challenge format from AI');

//     // 2. Add unique IDs if your AI doesn't provide them and your DB table doesn't auto-generate them.
//     // If your DB auto-generates IDs, you can skip this for the 'id' field.
//     challengesArray = challengesArray.map((challenge) => ({
//       ...challenge,
//       // id: generateUniqueId(), // Uncomment if you need to generate IDs here and your table doesn't auto-increment 'id'
//       // Ensure other fields like description, experienceReward are present from the AI
//     }));

//     // 3. Store these challenges in the database.
//     // IMPORTANT: Adjust 'daily_challenges' to your actual table name.
//     // This example deletes all old challenges and inserts new ones.
//     console.log('Deleting old daily challenges...');
//     await knex('daily_challenges').del();

//     console.log('Inserting new daily challenges...', challengesArray);
//     // Ensure the objects in challengesArray match your table columns.
//     // If your table has an auto-incrementing ID, do not include `id` in the insert data
//     // or ensure the `id` from `generateUniqueId` is what you intend to insert.
//     await knex('daily_challenges').insert(
//       challengesArray.map(({ id, ...rest }) => rest)
//     ); // Example: assuming DB auto-generates ID, so we omit it from insert
//     // If you generated and want to use your own IDs, use: await knex('daily_challenges').insert(challengesArray);

//     console.log('Successfully fetched and stored new daily challenges.');
//     return challengesArray;
//   } catch (error) {
//     console.error('Error in fetchAndProcessDailyChallenges:', error);
//     // Depending on your error handling strategy, you might re-throw,
//     // or handle it and return an error status.
//     throw error;
//   }
// }

// module.exports = { fetchAndProcessDailyChallenges };
