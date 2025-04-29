// src/db/seeds/init.js
const bcrypt = require("bcrypt");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  // 1. Clear the table
  await knex("users").del();

  // 2. Reset auto-incrementing ID
  await knex.raw("ALTER SEQUENCE users_id_seq RESTART WITH 1");

  // 3. Insert fresh users
  const saltRounds = 10;
  await knex("users").insert([
    {
      username: "cool_cat",
      password_hash: await bcrypt.hash("1234", saltRounds),
      zipcode: "12345",
      exp: 0,
      level: 1,
      streak: 2,
    },
    {
      username: "l33t-guy",
      password_hash: await bcrypt.hash("1234", saltRounds),
      zipcode: "54321",
      exp: 0,
      level: 1,
      streak: 1,
    },
    {
      username: "wowow",
      password_hash: await bcrypt.hash("1234", saltRounds),
      zipcode: "11223",
      exp: 0,
      level: 1,
      streak: 3,
    },
  ]);
};
