exports.transform = (data) => {
    const result = {
        name: data.name,
        tax_code: data.tax_code,
        price: data.price,
    };

    if (data.tax_code === 1) {
        result.type = 'Food & Beverage';
        result.refundable = 1;
        result.tax = 0.1 * data.price;
    } else if (data.tax_code === 2) {
        result.type = 'Tobacco';
        result.refundable = 0;
        result.tax = (0.02 * data.price) + 10;
    } else {
        result.type = 'Entertainment';
        result.refundable = 0;

        if (result.price > 0 && result.price < 100) {
            result.tax = 0;
        } else {
            result.tax = 0.01 * (result.price - 100);
        }
    }

    result.amount = result.price + result.tax;

    return result;
};

module.exports = exports;
