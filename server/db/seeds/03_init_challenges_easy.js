// seeds/01_daily_challenges.js
/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries in dailyChallenges
  await knex("dailyAndCommunityChallenges").del();

  // Inserts 3 new daily challenges (global to all users)
  await knex("dailyAndCommunityChallenges").insert([
    {
      userId: null,
      category: "daily",
      challengeType: "cleanup",
      category: "daily",
      description: "Pick up 5 pieces of litter during a walk",
      experienceReward: 1000,
      createdAt: knex.fn.now(),
    },
    {
      userId: null,
      category: "daily",
      challengeType: "savewater",
      category: "daily",
      description: "Take a 5-minute shower",
      experienceReward: 100,
      createdAt: knex.fn.now(),
    },
    {
      userId: null,
      category: "daily",
      challengeType: "reuse",
      category: "daily",
      description: "Use a reusable water bottle all day",
      experienceReward: 3000,
      createdAt: knex.fn.now(),
    },
  ]);
};
