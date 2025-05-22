/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("email").notNullable().unique();
    table.string("username").notNullable().unique();
    table.string("password_hash").notNullable();
    table.string("zipcode").notNullable();
    table.integer("exp").nullable().defaultTo(0);
    table.integer("level").nullable().defaultTo(1);
    table.integer("streak").nullable().defaultTo(0);
    table.timestamp("lastChallengeCompletedAt").nullable().defaultTo(null);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable("users");
