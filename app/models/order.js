module.exports = (sequelize, type) => sequelize.define('orders', {
    id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: type.STRING,
        allowNull: false,
    },
    tax_code: {
        type: type.INTEGER,
        allowNull: false,
    },
    price: {
        type: type.INTEGER,
        allowNull: false,
    },
});
