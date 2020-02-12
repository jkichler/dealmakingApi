const db = require('../db');
const Sequelize = require('sequelize');

const Parties = db.define('parties', {
  name: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  email: {
    type: Sequelize.TEXT,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  }
});

module.exports = Parties;
