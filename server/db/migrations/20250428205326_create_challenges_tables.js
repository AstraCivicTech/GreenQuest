/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("challengesTracker", (table) => {
      table.increments("challengeId").primary();
      table.string("challengeType").notNullable();
      table.timestamp("createdAt").defaultTo(knex.fn.now());
      table.integer("expirienceReward").notNullable();
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
  return knex.schema.dropTable("challengesTracker").dropTable("challengesCompletedPerType");
};
