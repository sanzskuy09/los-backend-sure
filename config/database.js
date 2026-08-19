const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('gratama', 'postgres', 'gratama2025@', {
  host: '217.196.49.162',
  dialect: 'postgres',
});

module.exports = sequelize;