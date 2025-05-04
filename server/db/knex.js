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
