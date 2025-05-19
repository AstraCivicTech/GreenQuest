const knex = require("../db/knex");

class Challenge {
  constructor({
    id,
    category,
    challengeType,
    description,
    experienceReward,
    userId,
  }) {
    // userId will be null for daily challenges
    if (
      !category ||
      !challengeType ||
      !description ||
      !experienceReward ||
      !id
    ) {
      throw new Error("All fields are required to create a challenge.");
    }
    this.id = id;
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

  // Method to retrieve the challenge by a specified category.
  static async findChallengesByCategory(category) {
    try {
      const dailyChallenges = await knex("dailyAndCommunityChallenges")
        .where({ category }) // Filters by the daily column.
        .select("*") // Selects all the columns.
        .orderBy("createdAt", "desc"); // orders creation date or description.
      return dailyChallenges.map((challenge) => new Challenge(challenge));
    } catch (err) {
      console.error("Error retrieving daily challenges:", err);
      throw new Error("Failed to retrieve daily challenges");
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
        userId: challengeInstance.userId,
      });
      return { success: true }; // Add this return statement
    } catch (error) {
      console.error("Error inserting community challenge:", error);
      return {
        success: false,
        message: "Failed to insert community challenge.",
      };
    }
  }

  static async getChallengeDetailsFromId(challengeId) {
    try {
      return await knex("dailyAndCommunityChallenges")
        .select(
          "id",
          "userId",
          "description",
          "challengeType",
          "category",
          "experienceReward",
          "createdAt"
        )
        .where({ id: challengeId });
      // return { success: true }
    } catch (error) {
      console.error("Error getting challenge based on id: ", error.message);
      return { success: false }; // Add this return statement
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
  static async resetDailyChallenges() {
    // deletes all rows from dailyAndCommunityChallenges table (must delete rows not drop table in order to avoid reseting the ids)
    await knex("dailyAndCommunityChallenges")
      .where({ category: "Daily" })
      .del();

    // make the call here to record the new daily and community challenges into the database
  }

  // Finds the user information of the user that posted the challenge itself.
  static async findChallengeCreator(challengeId) {
    try {
      const creator = await knex("users")
        .select("users.id", "users.username", "users.level", "users.exp")
        .join(
          "dailyAndCommunityChallenges",
          "users.id",
          "=",
          "dailyAndCommunityChallenges.userId"
        )
        .where("dailyAndCommunityChallenges.id", challengeId)
        .first();
      return creator;
    } catch (error) {
      console.error("Error finding challenge creator", error);
    }
  }
}

module.exports = Challenge;
