const Challenge = require("../models/Challenge");
const UserPosts = require("../models/UserPosts");
const knex = require("../db/knex");

exports.getChallengesByCategory = async (req, res) => {
  const { category } = req.query;

  try {
    if (!category) {
      return res.status(400).json({ message: "Category is required." });
    }
   const challenges = await Challenge.findChallengesByCategory(category);

    res.status(200).json(challenges);
  } catch (error) {
    console.error("Failed to get challenges:", error);
    res.status(500).json({
      message: "An error occurred while fetching challenges.",
      detail: error.message,
    });
  }
};

exports.completeChallenge = async (req, res) => {
  const { userId, challengeId } = req.body;

  try {
    const result = await Challenge.completeChallenge(userId, challengeId);
    if (!result.success) {
      return res.status(400).json({ message: result.message });
    }
    res.status(200).json({ message: "Challenge marked as completed." });
  } catch (error) {
    console.error("Error completing challenge:", error);
    res.status(500).json({ message: "Failed to complete challenge." });
  }
};

exports.getCompletedChallenges = async (req, res) => {
  const { id } = req.params;
  try {
    const completed = await Challenge.getCompletedChallenges(id);
    res.status(200).json(completed);
  } catch (error) {
    console.error("Error fetching completed challenges:", error);
    res.status(500).json({ message: "Failed to fetch completed challenges." });
  }
};

exports.createChallenge = async (req, res) => {
  const challengeToAdd = {
    category: "daily",
    challengeType: "planting",
    description: "plant 5 seeds in your backyard or local park",
    experienceReward: 1000,
    userId: null,
  };

  console.log("Attempting to create challenge with:", challengeToAdd); // 👈 add this

  try {
    const challenge = new Challenge(challengeToAdd); // 💥 error likely happens here
    const result = await Challenge.addChallengeToDB(challenge);

    if (!result.success) {
      return res.status(500).json({ message: result.message });
    }

    res.status(201).json({ message: "Challenge successfully created." });
  } catch (error) {
    console.error("Error creating challenge:", error);
    res.status(500).json({ message: "Failed to create challenge." });
  }
};

exports.findUsersAndPostByChallengeId = async(req, res) => {
  try {
    const {challengeId} = req.params;
    const usersWithPosts = await UserPosts.findUsersAndPostByChallengeId(challengeId);

    // // Organize the data using the model methods.
    const organizedResponse = usersWithPosts.map(userpost => ({
      id: userpost.user.id, 
      username: userpost.user.username,
      posts: userpost.posts.map(post => ({
       postId: post.postId, 
       content: post.content, 
       createdAt: post.createdAt
      }))
    }))
    res.status(201).json(organizedResponse)
  } catch(error) {
    console.error("Error finding Users Posts", error);
    res.status(500).json({message:"Failed to fetch user posts."})
  }
}

exports.findChallengeCreatorByChallengeId = async (req, res) => {
  try {
    const {challengeId} = req.params; 
    const challengecreator = await Challenge.findChallengeCreator(challengeId);
    res.status(201).json(challengecreator)
  } catch(error) {
    console.error('Error finding challenge owner', error);
    res.status(500).json({message:"Failed to fetch creator."})
  }
}