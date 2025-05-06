const env = process.env.NODE_ENV || "development";
const config = require("../knexfile")[env];
module.exports = require("knex")(config);

const getAllUsers = async () => {
  // knex.raw returns a query result object
  let result = await knex.raw("SELECT * FROM users");
  console.log(result.rows);
  // .rows is an array containing the query data
  return result.rows;
};

// used to send the daily challenges to the database and give it an id
const addDailyChallenge = async (challenge) => {
  // knex.raw returns a query result object
  let result = await knex.raw(
    "INSERT INTO daily_challenges (type, category, description, exp_rewarded) VALUES (?, ?, ?, ?)",
    [challenge.type, challenge.category, challenge.description, challenge.exp]
  );
  console.log(result.rows);
  // .rows is an array containing the query data
  return result.rows;
};

// module.exports = {
//   development: {
//     client: "pg",
//     connection: {
//       database: "react_auth_example",
//       user: "postgres",
//       password: "123",
//     },
//     migrations: {
//       directory: "./db/migrations",
//     },
//     seeds: {
//       directory: "./db/seeds",
//     },
//   },
//   // other environments...
// };
