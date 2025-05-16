const knex = require('../db/knex');

class Post {
  constructor({ id, user_id, content, created_at, updated_at }) {
    this.id = id;
    this.user_id = user_id;
    this.content = content;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static async create(content, user_id) {
    try {
      const [post] = await knex('posts')
        .insert({content, userId:user_id , createdAt: new Date(), updated_at: new Date()})
        .returning('*');
      return new Post(post);
    } catch (err) {
      console.error('Error creating post:', err);
      throw new Error('Failed to create post');
    }
  }

  static async findAll() {
    try {
      const posts = await knex('posts').select('*');
      return posts.map((post) => new Post(post));
    } catch (err) {
      console.error('Error retrieving posts:', err);
      throw new Error('Failed to retrieve posts');
    }
  }

  static async findById(id) {
    try {
      const [post] = await knex('posts').where({ postId: id }).select('*');
      return post ? new Post(post) : null;
    } catch (err) {
      console.error('Error retrieving post by ID:', err);
      throw new Error('Failed to retrieve post');
    }
  }

  static async update(id, fieldsToUpdate) {

    const {content} = fieldsToUpdate;

    try {
      const [updatedPost] = await knex('posts')
        .where({ id })
        .update({ content, updated_at: new Date() })
        .returning('*');
      return updatedPost ? new Post(updatedPost) : null;
    } catch (err) {
      console.error('Error updating post:', err);
      throw new Error('Failed to update post');
    }
  }

  static async delete(id) {
    try {
      const deletedCount = await knex('posts').where({ id }).del();
      return deletedCount > 0;
    } catch (err) {
      console.error('Error deleting post:', err);
      throw new Error('Failed to delete post');
    }
  }

  static async findByUserId(userId) {
    try {
      const posts = await knex('posts').where({ user_id: userId }).select('*');
      return posts.map((post) => new Post(post));
    } catch (err) {
      console.error('Error retrieving posts for user:', err);
      throw new Error('Failed to retrieve posts for user');
    }
  }
}

module.exports = Post; 