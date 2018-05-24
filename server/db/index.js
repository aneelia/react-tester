const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
})

module.exports = {
  createRow: params => pool.query(`insert into "results" (question, result, type, "activityName ", date, "userName ", store) values($1, $2, $3, $4, $5, $6, $7)`, params),
  getUser: params => pool.query('select id from "users" where login=$1 and password=$2', params),
}
