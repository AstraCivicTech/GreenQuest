/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.updateTable('posts', function(table) {
    table.increments('id').primary();
    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.text('content').notNullable(); // Changed from title, description, difficulty, category, points
    table.timestamps(true, true); // Adds created_at and updated_at columns
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('posts');
};
