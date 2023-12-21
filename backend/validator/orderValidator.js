const { body, validationResult } = require('express-validator');

const orderValidationRules = () => {
    return [
        body('user_id').isInt(),
        body('product_id').isInt(),
        body('quantity').isInt(),
        body('order_date').isISO8601().toDate(),
        body('status').isArray(),
        body('total_amount').isFloat(),
        body('payment_method').isString(),
        body('notes').isString().optional(),
    ];
};

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    return res.status(400).json({ errors: errors.array() });
};

module.exports = {
    orderValidationRules,
    validate,
};
