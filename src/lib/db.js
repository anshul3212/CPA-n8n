import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: process.env.DB_HOST, // e.g. "localhost"
  user: process.env.DB_USER, // your mysql user
  password: process.env.DB_PASS, // your mysql password
  database: process.env.DB_NAME, // your database name
});
