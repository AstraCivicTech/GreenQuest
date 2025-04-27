const User = require("../../models/User");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  await knex("users").del();
  await knex.raw("ALTER SEQUENCE users_id_seq RESTART WITH 1");

  await knex("users").insert([
    {
      username: "cool_cat",
      password_hash: "1234",
      zipcode: "12345",
      exp: 0,
      level: 1,
    },
    {
      username: "l33t-guy",
      password_hash: "1234",
      zipcode: "67890",
      exp: 10,
      level: 2,
    },
    {
      username: "wowow",
      password_hash: "1234",
      zipcode: "54321",
      exp: 20,
      level: 3,
    },
  ]);
};
