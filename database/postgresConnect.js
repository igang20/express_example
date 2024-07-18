const { password } = require("pg/lib/defaults");

const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "12062021",
  host: "localhost",
  port: 5432,
  atabase: "pindie",
});
