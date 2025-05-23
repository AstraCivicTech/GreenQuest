const knex = require("../db/knex");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 12;

class User {
  #passwordHash = null;
  #exp = 0;
  #level = 0;

  constructor({ id, username, password_hash, exp = 0, level = 0 }) {
    this.id = id;
    this.username = username;
    this.#passwordHash = password_hash;
    this.#exp = exp ?? 0;
    this.#level = level ?? 0;
  }

  // Controllers can use this instance method to validate passwords prior to sending responses
  isValidPassword = async (password) => {
    return await bcrypt.compare(password, this.#passwordHash);
  };

  // Hashes the given password and then creates a new user
  // in the users table. Returns the newly created user, using
  // the constructor to hide the passwordHash.
  static async create(email, username, password, zipcode) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        success: false,
        message: "Email must be valid email",
      };
    }
    if (username.length < 6) {
      return {
        success: false,
        message: "Username must be at least 6 characters long. ",
      };
    }

    try {
      // hash the plain-text password using bcrypt before storing it in the database
      const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

      const query = `INSERT INTO users (email, username, password_hash, zipcode)
      VALUES (?, ?, ?, ?) RETURNING *;`;
      const result = await knex.raw(query, [
        email,
        username,
        passwordHash,
        zipcode,
      ]);

      const rawUserData = result.rows[0];
      return new User(rawUserData);
    } catch (error) {
      // unique constrain violation
      if (error.code === "23505") {
        return {
          success: false,
          message: "Username already exists. Please choose another one",
        };
      }

      // Other DB or system errors
      return {
        success: false,
        message: "An unexpected error occurred.",
        detail: error.message,
      };
    }
  }

  static async getLevelInfo(id) {
    // SQL query to join users and levels where user's id matches level.
    const query = `SELECT users.id, users.username, users.exp, 
      users.level, levels.title, levels.experienceNeeded
      FROM users
      JOIN levels ON users.level = levels.levelId
      WHERE users.id = ?;`;

    const result = await knex.raw(query, [id]);
    return result.rows[0] || null;
  }

  // helper to find the next level’s required exp
  static async getNextLevelExp(currentLevelId) {
    const result = await knex("levels")
      .where("levelId", ">", currentLevelId)
      .orderBy("levelId", "asc")
      .limit(1);

    return result[0] ? result[0].experienceNeeded : null; // null if max level
  }

  static async updateLevelInfo(id, currentExp) {
    const parsedExp = parseInt(currentExp, 10);

    if (Number.isNaN(parsedExp)) {
      throw new Error("Invalid experience value");
    }

    await knex("users").where({ id }).update({ exp: parsedExp });

    const query = `SELECT "levelId", title, "experienceNeeded"
      FROM levels
      WHERE "experienceNeeded" <= ?
      ORDER BY "experienceNeeded" DESC
      LIMIT 1;`;

    const levelResult = await knex.raw(query, [parsedExp]);
    const levelData = levelResult.rows[0];

    if (!levelData) {
      throw new Error("No matching level found for given experience");
    }

    await knex("users").where({ id }).update({ level: levelData.levelId });

    return {
      userId: id,
      exp: parsedExp,
      level: levelData.levelId,
      levelTitle: levelData.title,
      nextLevelExp: await this.getNextLevelExp(levelData.levelId),
    };
  }

  // Fetches ALL users from the users table, uses the constructor
  // to format each user (and hide their password hash), and returns.
  static async list() {
    const query = `SELECT * FROM users`;
    const result = await knex.raw(query);
    return result.rows.map((rawUserData) => new User(rawUserData));
  }

  // Fetches A single user from the users table that matches
  // the given user id. If it finds a user, uses the constructor
  // to format the user and returns or returns null if not.
  static async find(id) {
    const query = `SELECT id, username, level, exp FROM users WHERE id = ?;`;
    const result = await knex.raw(query, [id]);
    const rawUserData = result.rows[0];
    return rawUserData ? new User(rawUserData) : null;
  }

  // Same as above but uses the username to find the user
  static async findByUsername(username) {
    const query = `SELECT * FROM users WHERE username = ?;`;
    const result = await knex.raw(query, [username]);
    const rawUserData = result.rows[0];
    return rawUserData ? new User(rawUserData) : null;
  }

  // Updates the user that matches the given id with a new username.
  // Returns the modified user, using the constructor to hide the passwordHash.
  static async update(id, username) {
    const query = `
      UPDATE users
      SET username=?
      WHERE id=?
      RETURNING *
    `;
    const result = await knex.raw(query, [username, id]);
    const rawUpdatedUser = result.rows[0];
    return rawUpdatedUser ? new User(rawUpdatedUser) : null;
  }

  static async deleteAll() {
    return knex("users").del();
  }
}



module.exports = User;
