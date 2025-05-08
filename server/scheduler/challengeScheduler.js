const cron = require('node-cron');
const aiControllers = require('../controllers/aiControllers');
const {
  fetchAndProcessDailyChallenges,
} = require('../services/challengeService');

console.log('Challenge scheduler initialized. Waiting for the scheduled time.');

const { prompt } = {
  prompt: `Return ONLY valid JSON without any markdown formatting or code blocks.
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
]`,
};

// Schedule a task to run every minute for testing.
// Cron expression format: 'minute hour day-of-month month day-of-week'
// IMPORTANT: Change this back to '0 0 * * *' for daily execution at midnight after testing!
cron.schedule(
  '*/15 * * * *', // Runs every minute
  async () => {
    console.log(
      `[${new Date().toISOString()}] Running scheduled job: Fetching new daily challenges...`
    );
    try {
      await fetchAndProcessDailyChallenges();
      console.log(
        `[${new Date().toISOString()}] Daily challenges updated successfully by scheduler.`
      );
    } catch (error) {
      console.error(
        `[${new Date().toISOString()}] Scheduler failed to update daily challenges:`,
        error
      );
    }
  },
  {
    scheduled: true,
    timezone: 'America/New_York', // IMPORTANT: Set this to your server's or target users' timezone
  }
);

// Run the job once immediately on startup for testing.
// IMPORTANT: Comment this out or remove it for production.
(async () => {
  console.log('Running initial fetch for testing upon startup...');
  try {
    const result = await fetchAndProcessDailyChallenges();
    console.log('Generated challenge:', result);
  } catch (error) {
    console.error('Initial fetch failed:', error);
  }
})();
