/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("friends", (table) => {
    table.integer("userId").unsigned().notNullable();
    table.integer("friendId").unsigned().notNullable;

    // Sets userId and friendId as Foreign KEYS
    table.foreign("userId").references("users.id").onDelete("CASCADE");
    table.foreign("friendId").references("users.id").onDelete("CASCADE");

    // Makes sure that there's no duplicate friendships
    table.primary(["userId", "friendId"]);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable("friends");
