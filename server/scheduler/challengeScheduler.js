const cron = require("node-cron");
const {
  fetchAndProcessDailyChallenges,
} = require("../services/challengeService");

console.log("Challenge scheduler initialized. Waiting for the scheduled time.");

// Schedule a task to run every minute for testing.
// Cron expression format: 'minute hour day-of-month month day-of-week'
// IMPORTANT: Change this back to '0 0 * * *' for daily execution at midnight after testing!
cron.schedule(
  "0 0 * * *",
  async () => {
    const now = new Date();
    console.log(`
      Cron job triggered at: 
      - Date: ${now.toLocaleDateString()}
      - Time: ${now.toLocaleTimeString()}
      - Timezone: ${now.toString().match(/\(([^)]+)\)/)[1]}
    `);
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
    timezone: "America/New_York", // IMPORTANT: Set this to your server's or target users' timezone
  }
);
const initJob = async () => {
  console.log("Running initial fetch for testing upon startup...");
  try {
    const result = await fetchAndProcessDailyChallenges();
    console.log("Generated challenge:", result);
  } catch (error) {
    console.error("Initial fetch failed:", error);
  }
};
// Run the job once immediately on startup for testing.
// IMPORTANT: Comment this out or remove it for production.
initJob();
