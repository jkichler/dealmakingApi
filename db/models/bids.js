const db = require('../db');
const Sequelize = require('sequelize');

const Bids = db.define('bids', {
  amount: {
    type: Sequelize.REAL, //FLOAT for SQLight
    allowNull: false,
    validate: {
      min: 0
    }
  },
  status: {
    type: Sequelize.TEXT
  }
});

module.exports = Bids;
