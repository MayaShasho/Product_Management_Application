import { body, validationResult } from 'express-validator';

const validateProduct = [
    body('name').notEmpty().withMessage('Name is required'),
    body('price')
        .isFloat({ gt: 0 })
        .withMessage('Price must be greater than 0'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(400)
                .json({ errors: errors.array().map((err) => err.msg) });
        }
        next();
    },
];

export default validateProduct;
