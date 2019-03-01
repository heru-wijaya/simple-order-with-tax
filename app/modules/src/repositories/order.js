const model = require('../../../sequelize');

class OrderRepo {
    constructor() {
        this.model = model;
    }

    create(data) {
        return this.model.order.create(data);
    }

    getList() {
        return this.model.order.findAll();
    }
}

module.exports = OrderRepo;
