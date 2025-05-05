/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

// to select this table since there are capital letters in the name you must include quotes around the table name.
exports.up = function (knex) {
  return knex.schema
    .createTable("challengesTracker", (table) => {
      table.increments("challengeId").primary();
      table.string("challengeType").notNullable();
      table.string("challengeDescription").notNullable();
      table.timestamp("createdAt").defaultTo(knex.fn.now());
      table.integer("experienceReward").notNullable(); // Also typo: "expirienceReward" -> "experienceReward"
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
    .dropTable("challengesCompletedPerType") // drop child table first
    .dropTable("challengesTracker"); // then parent
};
