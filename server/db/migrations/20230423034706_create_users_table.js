/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary(); // added id
    table.string("username").notNullable().unique();
    table.string("password_hash").notNullable();
    table.string("zipcode").notNullable();
    table.integer("exp").notNullable();
    table.integer("level").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable("users");
