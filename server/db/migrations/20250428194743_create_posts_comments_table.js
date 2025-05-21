exports.up = function (knex) {
  return knex.schema
    .createTable("posts", (table) => {
      table.increments("postId").primary();
      table.integer("userId").unsigned().notNullable();
      table.string("statusText").nullable();
      table.string("imageUrl").nullable();
      table.timestamp("createdAt").defaultTo(knex.fn.now());

      table.foreign("userId").references("users.id").onDelete("CASCADE");
    })
    .createTable("comments", (table) => {
      table.increments("commentId").primary();
      table.integer("postId").unsigned().notNullable();
      table.integer("userId").unsigned().notNullable();
      table.string("content").notNullable();
      table.timestamp("createdAt").defaultTo(knex.fn.now());

      table.foreign("userId").references("users.id").onDelete("CASCADE");
      table.foreign("postId").references("posts.postId").onDelete("CASCADE");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("comments").dropTable(
    /**
     * @param { import("knex").Knex } knex
     * @returns { Promise<void> }
     */ "posts"
  );
};
