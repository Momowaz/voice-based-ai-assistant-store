const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.user,
    password: process.env.password,
    host: process.env.host,
    database: process.env.database
  })

  module.exports = pool;