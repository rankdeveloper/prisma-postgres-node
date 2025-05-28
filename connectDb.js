const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "prisma_postgres",
  password: "rankush0507",
  port: 5432,
});

pool.on("connect", () => {
  console.log("Connected to database");
});

pool.on("error", (err) => {
  console.log(err);
});

module.exports = pool;
