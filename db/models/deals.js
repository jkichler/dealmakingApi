const db = require('../db');
const Sequelize = require('sequelize');

const Deals = db.define('deals', {
  asset: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.TEXT
  },
  topBid: {
    type: Sequelize.REAL //float for SQLite 3
  },
  topBidId: {
    type: Sequelize.INTEGER
  }
});

module.exports = Deals;
