// seeds/01_daily_challenges.js
/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries in dailyChallenges
  await knex("dailyAndCommunityChallenges").del();

   //Resets auto-incrementing ID.
 await knex.raw('ALTER SEQUENCE "dailyAndCommunityChallenges_id_seq" RESTART WITH 1');


  // Inserts 3 new daily challenges (global to all users)
  await knex("dailyAndCommunityChallenges").insert([
    {
      userId: null,
      challengeType: "cleanup",
      category: "Daily",
      description: "Pick up 5 pieces of litter during a walk",
      experienceReward: 1000,
      createdAt: knex.fn.now(),
    },
    {
      userId: null,
      category: "Daily",
      challengeType: "savewater",
      category: "Daily",
      description: "Take a 5-minute shower",
      experienceReward: 100,
      createdAt: knex.fn.now(),
    },
    {
      userId: null,
      challengeType: "reuse",
      category: "Daily",
      description: "Use a reusable water bottle all day",
      experienceReward: 3000,
      createdAt: knex.fn.now(),
    },
  ]);

  // Inserts 3 new community challenges (global to all users)
 await knex("dailyAndCommunityChallenges").insert([
  {
    userId: 1,
    challengeType: "cleanup",
    category: "Community",
    description: "Pick up 10 pieces of litter during a walk",
    experienceReward: 1000,
    createdAt: knex.fn.now(),
  },
  {
    userId: 2,
    challengeType: "Emissions",
    category: "Community",
    description: "Ride Your Bike To Work!",
    experienceReward: 100,
    createdAt: knex.fn.now(),
  },
  {
    userId: 3,
    challengeType: "reuse",
    category: "Community",
    description: "Use a reusable water bottle!",
    experienceReward: 3000,
    createdAt: knex.fn.now(),
  },
]);
};