'use strict';
const pool = require('../Pool');

const getUserBysub_id = function(sub_id) {
  const queryString = `
    SELECT * FROM customers
    WHERE sub_id = $1;
  `;
  return pool.query(queryString, [sub_id])
    .then(res => {
      if (res.rows.length > 0) {
        return res.rows;
      } else {
        return null;
      }
    })
    .catch(err => {
      console.log('query error:', err);
    });
};

const addCustomer = function(user) {
  const queryString = `
    INSERT INTO customers (first_name, email, sub_id)
    VALUES ($1, $2, $3)
    RETURNING*;
  `;
  

  const values = [ user.name, user.email, user.sub];
  return pool.query(queryString, values)
  .then(res => {
    return res.rows[0];
  })
  .catch(err => {
    console.log('query error:', err);
  });

}

module.exports = {
  getUserBysub_id,
  addCustomer
};