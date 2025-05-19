/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.alterTable('posts', function(table) {
    table.integer('challengeId').unsigned(); 
    table.foreign('challengeId').references('id').inTable('dailyAndCommunityChallenges').onDelete('CASCADE');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('posts', function(table) {
        table.dropForeign('challengeId');
        table.dropColumn('challengeId');
      })
};
