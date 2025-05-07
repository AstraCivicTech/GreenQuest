const knex = require("../db/knex");

class Challenge {
  constructor({
    category,
    challengeType,
    challengeDescription,
    experienceReward,
    userId,
  }) {
    // userId will be null for daily challenges
    if (
      !category ||
      !challengeType ||
      !challengeDescription ||
      !experienceReward
    ) {
      throw new Error("All fields are required to create a challenge.");
    }

    this.challengeType = challengeType;
    this.challengeDescription = challengeDescription;
    this.experienceReward = experienceReward;
    this.completedAt = null;
  }

  // records a new daily or community challenge to target table
  static async addChallengeToDB(challengeInstance) {
    try {
      console.log("Inserting challenge:", challengeInstance);
      await knex("dailyAndCommunityChallenges").insert({
        category: challengeInstance.category, // Should be "daily" or "community"
        challengeType: challengeInstance.challengeType,
        description: challengeInstance.challengeDescription,
        experienceReward: challengeInstance.experienceReward,
        userId: challengeInstance.userId, // nullable is OK
      });
      return { success: true };
    } catch (error) {
      console.error("Error inserting challenge:", error);
      return { success: false, message: "Failed to insert challenge." };
    }
  }

  // Get today's challenges from the dailyAndCommunityChallenges table
  static async getChallenges(category) {
    return await knex("dailyAndCommunityChallenges")
      .select("id", "description", "experienceReward")
      .where({ category });
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
      throw error;
    }
  }

  // Reset daily challenges at midnight
  static async resetDailyChallenges(newChallenges) {}
}

module.exports = Challenge;
