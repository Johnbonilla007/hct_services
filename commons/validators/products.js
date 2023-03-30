const { check, validationResult } = require('express-validator');

const validateCreate = [
    check('products')
        .exists()
        .isArray(),

    check('products.*.name')
        .not()
        .isEmpty(),

    check('products.*.available')
        .not()
        .isEmpty(),

    check('products.*.price')
        .not()
        .isEmpty(),

    check('products.*.category')
        .not()
        .isEmpty(),

    check('categories')
        .exists()
        .isArray(),

    check('categories.*.name')
        .not()
        .isEmpty(),

    check('categories.*.active')
        .not()
        .isEmpty(),

    check('carrusels')
        .exists()
        .isArray(),

    check('carrusels.*.image')
        .not()
        .isEmpty(),

    check('carrusels.*.enable')
        .not()
        .isEmpty(),

    check('promotions')
        .exists()
        .isArray(),

    check('promotions.*.name')
        .not()
        .isEmpty(),

    check('promotions.*.img')
        .not()
        .isEmpty(),

    check('promotions.*.type')
        .not()
        .isEmpty(),

    (req, res, next) => {
        validationResult(req).throw();
        return next();
    }
];


module.exports = { validateCreate };