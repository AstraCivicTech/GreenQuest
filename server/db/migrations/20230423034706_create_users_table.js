/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
  return knex.schema
    .createTable("users", (table) => {
      table.increments("id").primary();
      table.string("username").notNullable().unique();
      table.string("password_hash").notNullable();
      table.string("zipcode").notNullable();
      table.integer("exp").notNullable();
      table.integer("level").notNullable();
    })
    .createTable("friends", (table) => {
      table.integer("userId").unsigned().notNullable();
      table.integer("friendId").unsigned().notNullable;

      // Sets userId and friendId as Foreign KEYS
      table.foreign("userId").references("users.id").onDelete("CASCADE");
      table.foreign("friendId").references("users.id").onDelete("CASCADE");

      // Makes sure that there's no duplicate friendships
      table.primary(["userId", "friendId"]);
    })
    .createTable("posts", (table) => {
      table.increments("postId").primary();
      table.integer("userId").unsigned().notNullable();
      table.string("statusText").nullable();
      table.string("imageUrl").nullable();
      table.timestamp("createdAt").defaultTo(knex.fn.now());

      // Set up the relationship:
      table.foreign("userId").references("users.id").onDelete("CASCADE");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable("users");
