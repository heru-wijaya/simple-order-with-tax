const Sequelize = require('sequelize');
const OrderModel = require('./models/order');

const sequelize = new Sequelize('test', 'root', '12345', {
    host: 'db',
    dialect: 'mysql',
    operatorsAliases: false,
    freezeTableName: true,
});

exports.order = OrderModel(sequelize, Sequelize);

module.exports = exports;
