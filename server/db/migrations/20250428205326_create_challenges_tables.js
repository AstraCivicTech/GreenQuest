/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

// to select this table since there are capital letters in the name you must include quotes around the table name.
exports.up = function (knex) {
  return knex.schema
    .createTable("dailyAndCommunityChallenges", (table) => {
      table.increments("id").primary(); // Shared unique ID for today's challenge
      table.integer("userId").nullable();
      table.string("description").notNullable();
      table.string("challengeType").notNullable(); // planting, recycle
      table.string("category").notNullable(); // either community or daily challenge
      table.integer("experienceReward").notNullable();
      table.timestamp("createdAt").defaultTo(knex.fn.now());
    })
    .createTable("completedChallenges", (table) => {
      table.increments("id").primary();
      table.integer("userId").unsigned().notNullable();
      table.integer("challengeId").unsigned().notNullable();
      table.timestamp("completedAt").defaultTo(knex.fn.now());

      table.foreign("userId").references("users.id").onDelete("CASCADE");
      table
        .foreign("challengeId")
        .references("dailyAndCommunityChallenges.id")
        .onDelete("CASCADE");
      table.unique(["userId", "challengeId"]); // prevent duplicate completion
    })
    .createTable("challengesCompletedPerType", (table) => {
      table.integer("userId").unsigned().notNullable();
      table.string("type").notNullable();
      table.integer("count").unsigned().notNullable();

      table.foreign("userId").references("users.id").onDelete("CASCADE");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTable("challengesCompletedPerType")
    .dropTable("completedChallenges")
    .dropTable("dailyAndCommunityChallenges");
};
