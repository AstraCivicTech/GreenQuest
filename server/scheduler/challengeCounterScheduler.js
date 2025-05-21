const cron = require("node-cron");
const Challenge = require("../models/Challenge");

console.log("Challenge counter scheduler initialized");

cron.schedule(
  "*/3 * * * *",
  async () => {
    try {
      console.log(
        `[${new Date().toISOString()}] Resetting daily challenge counters...`
      );

      // Reset the completedCount in your existing completedChallenges table
      await Challenge.resetDailyCounts();

      // Send websocket event to connected clients to reset their completedCount
      global.io.emit("resetDailyChallenges");

      console.log(
        `[${new Date().toISOString()}] Successfully sent reset signal`
      );
    } catch (error) {
      console.error(
        `[${new Date().toISOString()}] Failed to reset challenge counters:`,
        error
      );
    }
  },
  {
    scheduled: true,
    timezone: "America/New_York",
  }
);
