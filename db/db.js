const { Client } = require("pg");

const client = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "180700",
  database: "pijarcamp",
});
module.exports = { client };
