const knex = require("../db/knex");
const Post = require("../models/Post");

// Create a new post
exports.createPost = async (req, res) => {
  const { content, likes, userId, challengeId} = req.body;
  // Validate input
  if (
    (typeof content !== "string" && likes === undefined) ||
    userId === undefined || challengeId === undefined
  ) {
    return res.status(400).json({ message: "Content, likes,userId and challengeId are required." });
  }

  try {
    const newPost = await Post.create(content, userId, challengeId); // Return all columns of the new post
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Error creating post", error: error.message });
  }
};

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    console.log(posts);
    console.log(posts);
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Error fetching posts", error: error.message });
  }
};

// Get a single post by ID
exports.getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" })
    }
    res.status(200).json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ message: "Error fetching post", error: error.message });
      
  }
};

// Update a post
exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { content, likes } = req.body;

  // Validate input
  if (!content && likes === undefined) {
    return res.status(400).json({ message: "Content or likes must be provided to update." });
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
    const updatedPost = await Post.update(id, fieldsToUpdate);
    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ message: "Error updating post", error: error.message });
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  const postId = parseInt(req.params.id);
  if (isNaN(postId)) return res.status(400).json({ error: "Invalid post ID" });

  try {
    const success = await Post.delete(postId);
    if (success) {
      res.sendStatus(204); // No Content
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (err) {
    console.error("Error deleting post:", err);
    res.status(500).json({ error: "Failed to delete post" });
  }
};