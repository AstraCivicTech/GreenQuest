const knex = require("../db/knex");

class Challenge {
  constructor({
    category,
    challengeType,
    description,
    experienceReward,
    userId,
  }) {
    // userId will be null for daily challenges
    if (!category || !challengeType || !description || !experienceReward) {
      throw new Error("All fields are required to create a challenge.");
    }
    this.category = category;
    this.challengeType = challengeType;
    this.description = description;
    this.experienceReward = experienceReward;
    this.completedAt = null;
    this.userId = userId;
  }

  // records a new daily or community challenge to target table
  static async addChallengeToDB(challengeInstance) {
    try {
      console.log("Inserting challenge:", challengeInstance);
      await knex("dailyAndCommunityChallenges").insert({
        category: challengeInstance.category, // Should be "daily" or "community"
        challengeType: challengeInstance.challengeType,
        description: challengeInstance.description,
        experienceReward: challengeInstance.experienceReward,
        userId: challengeInstance.userId, // nullable is OK
      });
      return { success: true };
    } catch (error) {
      console.error("Error inserting challenge:", error);
      return { success: false, message: "Failed to insert challenge." };
    }
  }

  static async addCommunityChallengeToDB(challengeInstance) {
    try {
      console.log("Inserting community challenge:", challengeInstance);
      await knex("dailyAndCommunityChallenges").insert({
        category: "community",
        challengeType: "Eco-Habit",
        description: challengeInstance.description,
        experienceReward: Math.floor(Math.random() * (133 - 33 + 1) + 33),
        userId: challengeInstance.userId, // this should be passed in from the form
      });
    } catch (error) {
      console.error("Error inserting community challenge:", error);
      return {
        success: false,
        message: "Failed to insert community challenge.",
      };
    }
  }

  // Get today's challenges from the dailyAndCommunityChallenges table
  static async getChallenges(category) {
    return await knex("dailyAndCommunityChallenges")
      .select("id", "description", "experienceReward")
      .where({ category });
  }
  // used to get the id for user challenges
  static async getChallengeForID() {
    return await knex("dailyAndCommunityChallenges")
      .select("id", "userId", "description", "experienceReward")
      .where("community");
  }

  // Check if a user already completed a challenge
  static async getCompletedChallenges(userId) {
    const rows = await knex("completedChallenges")
      .select("challengeId")
      .where({ userId });

    return rows.map((row) => row.challengeId);
  }

  // Mark a challenge as completed by a user
  static async completeChallenge(userId, challengeId) {
    try {
      await knex("completedChallenges").insert({
        userId,
        challengeId,
      });
      return { success: true };
    } catch (error) {
      if (error.code === "23505") {
        // Unique violation: already completed
        return { success: false, message: "Challenge already completed." };
      }
      console.error("Error completing challenge:", error);
      return { success: false, message: "Failed to complete challenge" };
    }
  }

  // Reset daily challenges at midnight
  static async resetDailyChallenges() {
    // deletes all rows from dailyAndCommunityChallenges table (must delete rows not drop table in order to avoid reseting the ids)
    await knex("dailyAndCommunityChallenges")
      .where({ category: "daily" })
      .del();

    // make the call here to record the new daily and community challenges into the database
  }
}

module.exports = Challenge;
