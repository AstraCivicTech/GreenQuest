const knex = require("../db/knex");

class Post {
  constructor({ postId, userId, content, createdAt, updated_at }) {
    this.postId = postId;
    this.userId = userId;
    this.content = content;
    this.createdAt = createdAt;
    this.updatedAt = updated_at;
  }

  static async create(content, user_id) {
    try {
      const [post] = await knex("posts")
        .insert({
          content,
          userId: user_id,
          createdAt: new Date(),
          updated_at: new Date(),
        })
        .returning("*");
      return new Post(post);
    } catch (err) {
      console.error("Error creating post:", err);
      throw new Error("Failed to create post");
    }
  }

  static async findAll() {
    try {
      const posts = await knex("posts").select("*");
      console.log(posts);
      return posts.map((post) => new Post(post));
    } catch (err) {
      console.error("Error retrieving posts:", err);
      throw new Error("Failed to retrieve posts");
    }
  }

  static async findById(id) {
    try {
      const [post] = await knex("posts").where({ postId: id }).select("*");
      return post ? new Post(post) : null;
    } catch (err) {
      console.error("Error retrieving post by ID:", err);
      throw new Error("Failed to retrieve post");
    }
  }

  static async update(id, fieldsToUpdate) {
    const { content } = fieldsToUpdate;

    try {
      const [updatedPost] = await knex("posts")
        .where({ postId: id })
        .update({ content, updated_at: new Date() })
        .returning("*");
      return updatedPost ? new Post(updatedPost) : null;
    } catch (err) {
      console.error("Error updating post:", err);
      throw new Error("Failed to update post");
    }
  }

  static async delete(id) {
    try {
      const deletedCount = await knex("posts").where({ postId: id }).del();
      return deletedCount > 0;
    } catch (err) {
      console.error("Error deleting post:", err);
      throw new Error("Failed to delete post");
    }
  }

  static async findByUserId(userId) {
    try {
      const posts = await knex("posts").where({ user_id: userId }).select("*");
      return posts.map((post) => new Post(post));
    } catch (err) {
      console.error("Error retrieving posts for user:", err);
      throw new Error("Failed to retrieve posts for user");
    }
  }
}

module.exports = Post;
