const Sequelize = require('sequelize');

const db = new Sequelize({
  storage: 'memory',
  dialect: 'sqlite',
  logging: false
});

module.exports = db;
