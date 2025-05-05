const knex = require("../db/knex");

class Challenges {
  constructor({ challengeType, challengeDescription, experienceReward }) {
    if (!challengeType || !challengeDescription || !experienceReward) {
      throw new Error("All fields are required to create a challenge.");
    }

    this.challengeType = challengeType;
    this.challengeDescription = challengeDescription;
    this.experienceReward = experienceReward;
    this.createdAt = new Date();
    this.completedAt = null;
  }
  // Get today's challenges from the challenges table
  static async getDailyChallenges() {}

  // Check if a user already completed a challenge
  static async isChallengeCompleted(userId, challengeId) {}

  // Mark a challenge as completed by a user
  static async completeChallenge(userId, challengeId) {}

  // (Optional) Reset daily challenges at midnight
  static async resetDailyChallenges(newChallenges) {}

  // (Optional) Get all completed challenges for a user
  static async getCompletedChallenges(userId) {}
}
