const Joi = require('joi');
const OrderRepo = require('../repositories/order');
const TransformOrder = require('../transformers/order');

const inputSchema = Joi.object().keys({
    name: Joi.string().required(),
    tax_code: Joi.number().positive().required(),
    price: Joi.number().positive().required(),
});
exports.getList = async () => {
    const orderRepository = new OrderRepo();
    const order = await orderRepository.getList().then(
        (result) => result.map(TransformOrder.transform),
    );
    return order;
};

exports.create = async (data) => {
    const orderRepository = new OrderRepo();

    let input = data;
    try {
        input = await Joi.validate(data, inputSchema);
    } catch (err) {
        throw err.message;
    }

    await orderRepository.create(input);
    return {
        message: 'success',
    };
};

module.exports = exports;
