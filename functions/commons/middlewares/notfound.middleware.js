const httpCode = require("../HttpStatusCode.enum")

const notFound404 = (req, res, next) => {
    const error = {
        code: httpCode.NOT_FOUND,
        message: 'Not found'
    };

    next(error);
}

module.exports = notFound404;
