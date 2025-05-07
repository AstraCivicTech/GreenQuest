const Challenge = require("../models/Challenge");
const knex = require("../db/knex");

exports.getChallenges = async (req, res) => {
  const { category } = req.query;

  try {
    if (!category) {
      return res.status(400).json({ message: "Category is required." });
    }

    const challenges = await knex("dailyAndCommunityChallenges").where({
      category,
    });

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
    challengeType: "planting",
    category: "daily",
    challengeDescription: "plant 5 seeds in your backyard or local park",
    experienceReward: 1000,
    userId: null, // if it's a daily challenge
  };
  try {
    const challenge = new Challenge(challengeToAdd);
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
