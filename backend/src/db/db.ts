import Pg from "pg";

const pool = new Pg.Pool({
  user: "Austin",
  password: "password",
  host: "localhost",
  port: 5432,
  database: "node_chat",
});

export default pool;
