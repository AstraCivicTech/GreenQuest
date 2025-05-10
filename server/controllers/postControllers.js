const knex = require('../db/knex');

// Create a new post
exports.createPost = async (req, res) => {
  const { content, likes, user_id } = req.body;

  // Validate input
  if (!content || likes === undefined || !user_id) {
    return res
      .status(400)
      .json({ message: 'Content, likes, and user_id are required.' });
  }

  try {
    const [newPost] = await knex('post')
      .insert({
        content,
        likes,
        user_id,
      })
      .returning('*'); // Return all columns of the new post
    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res
      .status(500)
      .json({ message: 'Error creating post', error: error.message });
  }
};

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await knex('post').select('*');
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res
      .status(500)
      .json({ message: 'Error fetching posts', error: error.message });
  }
};

// Get a single post by ID
exports.getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await knex('post').where({ id }).first();
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    res
      .status(500)
      .json({ message: 'Error fetching post', error: error.message });
  }
};

// Update a post
exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { content, likes } = req.body;

  // Validate input
  if (!content && likes === undefined) {
    return res
      .status(400)
      .json({ message: 'Content or likes must be provided to update.' });
  }

  const fieldsToUpdate = {};
  if (content) {
    fieldsToUpdate.content = content;
  }
  if (likes !== undefined) {
    fieldsToUpdate.likes = likes;
  }
  fieldsToUpdate.updated_at = knex.fn.now(); // Update the timestamp

  try {
    const [updatedPost] = await knex('post')
      .where({ id })
      .update(fieldsToUpdate)
      .returning('*');

    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error('Error updating post:', error);
    res
      .status(500)
      .json({ message: 'Error updating post', error: error.message });
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCount = await knex('post').where({ id }).del();
    if (deletedCount === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json({ message: 'Post deleted successfully' }); // Or res.status(204).send(); for no content
  } catch (error) {
    console.error('Error deleting post:', error);
    res
      .status(500)
      .json({ message: 'Error deleting post', error: error.message });
  }
};
