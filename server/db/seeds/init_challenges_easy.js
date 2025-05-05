// seeds/01_default_challenges.js
/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("challengesTracker").del();

  // Inserts easier daily challenges
  await knex("challengesTracker").insert([
    {
      challengeType: "planting",
      challengeDescription: "Plant a small plant or herb at home",
      experienceReward: 50,
      createdAt: knex.fn.now(),
    },
    {
      challengeType: "cleanup",
      challengeDescription: "Pick up 5 pieces of litter during a walk",
      experienceReward: 40,
      createdAt: knex.fn.now(),
    },
    {
      challengeType: "recycling",
      challengeDescription: "Recycle all your plastic for the day",
      experienceReward: 30,
      createdAt: knex.fn.now(),
    },
    {
      challengeType: "biking",
      challengeDescription: "Bike to a local store instead of driving",
      experienceReward: 60,
      createdAt: knex.fn.now(),
    },
    {
      challengeType: "reuse",
      challengeDescription: "Use a reusable water bottle all day",
      experienceReward: 25,
      createdAt: knex.fn.now(),
    },
    {
      challengeType: "savewater",
      challengeDescription: "Take a 5-minute shower",
      experienceReward: 35,
      createdAt: knex.fn.now(),
    },
    {
      challengeType: "meatless",
      challengeDescription: "Eat vegetarian for one meal",
      experienceReward: 45,
      createdAt: knex.fn.now(),
    },
    {
      challengeType: "gardening",
      challengeDescription: "Water your plants or garden",
      experienceReward: 30,
      createdAt: knex.fn.now(),
    },
    {
      challengeType: "localshopping",
      challengeDescription: "Buy something from a local farmer’s market",
      experienceReward: 55,
      createdAt: knex.fn.now(),
    },
    {
      challengeType: "energy",
      challengeDescription: "Turn off lights in empty rooms all day",
      experienceReward: 30,
      createdAt: knex.fn.now(),
    },
  ]);
};
