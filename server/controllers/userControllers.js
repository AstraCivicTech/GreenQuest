const User = require("../models/User");
const knex = require("../db/knex");
asew2;
/* 
GET /api/users
Returns an array of all users in the database
*/
exports.listUsers = async (req, res) => {
  const users = await User.list();
  res.send(users);
};

/* 
GET /api/users/:id
Returns a single user (if found)
*/
exports.showUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.find(id);
  if (!user) {
    return res.status(404).send({ message: "User not found." });
  }

  res.send(user);
};

/* 
PATCH /api/users/:id
Updates a single user (if found) and only if authorized
*/
exports.updateUser = async (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).send({ message: "New username required." });
  }

  // A user is only authorized to modify their own user information
  // e.g. User 5 sends a PATCH /api/users/5 request -> success!
  // e.g. User 5 sends a PATCH /api/users/4 request -> 403!
  const userToModify = Number(req.params.id);
  const userRequestingChange = Number(req.session.userId);
  if (userRequestingChange !== userToModify) {
    return res.status(403).send({ message: "Unauthorized." });
  }

  const updatedUser = await User.update(userToModify, username);
  if (!updatedUser) {
    return res.status(404).send({ message: "User not found." });
  }

  res.send(updatedUser);
};

exports.getLevelInfo = async (req, res) => {
  // grab the id from the end of the url
  const { id } = req.params;

  try {
    const user = await knex("users").where({ id }).first();
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const currentLevel = await knex("levels")
      .where({ levelId: user.level })
      .first();
    const nextLevel = await knex("levels")
      .where({ levelId: user.level + 1 })
      .first();

    res.json({
      level: user.level,
      exp: user.exp,
      levelTitle: currentLevel ? currentLevel.title : "unranked",
      nextLevelExp: nextLevel ? nextLevel.experienceNeeded : user.exp,
    });
  } catch (error) {
    console.error("Error fetching level info:", error);
    res.status(500).json({ message: "something went wrong." });
  }
};
