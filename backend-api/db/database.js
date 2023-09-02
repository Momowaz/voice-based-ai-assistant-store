'use strict';
const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: '123',
  host: 'localhost',
  database: 'store_ai'
});

const getUserByEmail = function(email) {
  const queryString = `
    SELECT * FROM users
    WHERE users.email = $1;
  `;
  return pool.query(queryString, email)
    .then(res => {
      if (res.rows) {
        return res.rows[0];
      } else {
        return null;
      }
    })
    .catch(err => {
      console.log('query error:', err);
    });



};

module.exports = {
  getUserByEmail
};