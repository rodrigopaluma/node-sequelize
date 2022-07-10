const {Sequuelize, Sequelize} = require('sequelize');

const sequelize = new Sequelize('node_sequelize', 'root', '12345', {
    host: 'localhost',
    dialect: 'mysql',
})

module.exports = sequelize;