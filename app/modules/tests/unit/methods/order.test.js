const test = require('ava');
const sinon = require('sinon');
const _ = require('lodash');

const method = require('../../../src/methods/order');
const orderRepo = require('../../../src/repositories/order');

const payload = {
    name: 'snack',
    tax_code: 1,
    price: 100,
};

const resultList = [{
    name: 'snack',
    tax_code: 1,
    price: 100,
}];

const expectedList = [{
    amount: 110,
    name: 'snack',
    price: 100,
    refundable: 1,
    tax: 10,
    tax_code: 1,
    type: 'Food & Beverage',
}];

test.serial('get list success with tax code 1', async (t) => {
    sinon.stub(orderRepo.prototype, 'getList').resolves(resultList);
    const result = await method.getList();
    t.deepEqual(result, expectedList);
});

test.serial('get list success with tax code 2', async (t) => {
    const resultMock = _.cloneDeep(resultList);
    resultMock[0].tax_code = 2;
    const expected = _.cloneDeep(expectedList);
    expected[0].amount = 112;
    expected[0].refundable = 0;
    expected[0].tax = 12;
    expected[0].tax_code = 2;
    expected[0].type = 'Tobacco';
    sinon.stub(orderRepo.prototype, 'getList').resolves(resultMock);
    const result = await method.getList();
    t.deepEqual(result, expected);
});

test.serial('get list success with tax code 3 and price below 100', async (t) => {
    const resultMock = _.cloneDeep(resultList);
    resultMock[0].tax_code = 3;
    resultMock[0].price = 90;
    const expected = _.cloneDeep(expectedList);
    expected[0].amount = 90;
    expected[0].price = 90;
    expected[0].refundable = 0;
    expected[0].tax = 0;
    expected[0].tax_code = 3;
    expected[0].type = 'Entertainment';
    sinon.stub(orderRepo.prototype, 'getList').resolves(resultMock);
    const result = await method.getList();
    t.deepEqual(result, expected);
});

test.serial('get list success with tax code 3 and price greater than 100', async (t) => {
    const resultMock = _.cloneDeep(resultList);
    resultMock[0].tax_code = 3;
    resultMock[0].price = 1000;
    const expected = _.cloneDeep(expectedList);
    expected[0].amount = 1009;
    expected[0].price = 1000;
    expected[0].refundable = 0;
    expected[0].tax = 9;
    expected[0].tax_code = 3;
    expected[0].type = 'Entertainment';
    sinon.stub(orderRepo.prototype, 'getList').resolves(resultMock);
    const result = await method.getList();
    t.deepEqual(result, expected);
});

test.serial('create order success', async (t) => {
    sinon.stub(orderRepo.prototype, 'create').resolves('success');
    const result = await method.create(payload);
    t.deepEqual(result, {
        message: 'success',
    });
});

test.serial('create order failed', async (t) => {
    const mock = _.cloneDeep(payload);
    mock.price = -1000;
    sinon.stub(orderRepo.prototype, 'create').resolves('success');
    try {
        await method.create(mock);
        t.failed('must throw error');
    } catch (err) {
        t.is(err, 'child "price" fails because ["price" must be a positive number]');
    }
});

test.afterEach.always('Restore Sandbox and Configuration After Each Test', () => {
    sinon.restore();
});
