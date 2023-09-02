'use strict';
const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: '123',
  host: 'localhost',
  database: 'store_ai'
});

pool
    .query("SELECT * FROM customers;").then(response => {console.log(response)})