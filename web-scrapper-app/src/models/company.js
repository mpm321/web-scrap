const db = require('../config/db');

const Company = {
  create: (data, callback) => {
    const query = `INSERT INTO companies SET ?`;
    db.query(query, data, callback);
  },

  findAll: (callback) => {
    const query = `SELECT * FROM companies`;
    db.query(query, callback);
  },

  delete: (ids, callback) => {
    const query = `DELETE FROM companies WHERE id IN (?)`;
    db.query(query, [ids], callback);
  }
};

module.exports = Company;
