require('dotenv').config()
const { 
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DB
} = process.env

const Pool = require('pg').Pool

const pool = new Pool({
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  host: POSTGRES_HOST,
  port: POSTGRES_PORT,
  database: POSTGRES_DB
})

module.exports = pool
