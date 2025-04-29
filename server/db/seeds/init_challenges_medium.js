/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Optional: If you want to clear medium challenges separately, or append.

  await knex("challengesTracker").insert([
    {
      challengeType: "volunteering",
      challengeDescription: "Volunteer 1 hour for a local environmental group",
      experienceReward: 100,
      createdAt: knex.fn.now(),
    },
    {
      challengeType: "treeplanting",
      challengeDescription: "Plant a tree at a local park or your home",
      experienceReward: 120,
      createdAt: knex.fn.now(),
    },
    {
      challengeType: "recyclingbin",
      challengeDescription: "Set up a recycling station at your house",
      experienceReward: 90,
      createdAt: knex.fn.now(),
    },
    {
      challengeType: "carpooling",
      challengeDescription: "Carpool to school or work at least once this week",
      experienceReward: 80,
      createdAt: knex.fn.now(),
    },
    {
      challengeType: "composting",
      challengeDescription: "Start a home composting bin for food waste",
      experienceReward: 110,
      createdAt: knex.fn.now(),
    },
    {
      challengeType: "energysaving",
      challengeDescription: "Unplug unused electronics for one full day",
      experienceReward: 85,
      createdAt: knex.fn.now(),
    },
    {
      challengeType: "naturehike",
      challengeDescription: "Go on a nature hike and document biodiversity",
      experienceReward: 95,
      createdAt: knex.fn.now(),
    },
    {
      challengeType: "clothingdonation",
      challengeDescription: "Donate unused clothes to eco-friendly shops",
      experienceReward: 75,
      createdAt: knex.fn.now(),
    },
    {
      challengeType: "lowwaste",
      challengeDescription: "Produce zero waste for 24 hours",
      experienceReward: 115,
      createdAt: knex.fn.now(),
    },
    {
      challengeType: "ecoeducation",
      challengeDescription: "Spend 30 minutes learning about a climate issue",
      experienceReward: 80,
      createdAt: knex.fn.now(),
    },
  ]);
};
