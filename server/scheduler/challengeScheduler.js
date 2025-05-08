const cron = require('node-cron');
// const {
//   fetchAndProcessDailyChallenges,
// } = require('../services/challengeService');

console.log('Challenge scheduler initialized. Waiting for the scheduled time.');

// Schedule a task to run every minute for testing.
// Cron expression format: 'minute hour day-of-month month day-of-week'
// IMPORTANT: Change this back to '0 0 * * *' for daily execution at midnight after testing!
cron.schedule(
  '*/1 * * * *', // Runs every minute
  async () => {
    console.log(
      `[${new Date().toISOString()}] Running scheduled job: Fetching new daily challenges...`
    );
    try {
      // await fetchAndProcessDailyChallenges();
      // console.log(
      //   `[${new Date().toISOString()}] Daily challenges updated successfully by scheduler.`
      // );
      console.log('Hello');
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
    console.log('Hello World');
  } catch (error) {
    console.error('Initial fetch failed:', error);
  }
})();
