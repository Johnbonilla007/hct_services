const { User } = require('../../infrastructure/models');
const httpCode = require('../httpStatusCode.enum');
const messages = require('../resources/messages');
const { isValidObj, comparePassSync } = require('../utilities');

const validUserMigrateMiddleware = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next({
      code: httpCode.BAD_REQUEST,
      message: messages.fieldUserPassRequired,
    });

  const user = await User.findOne({ where: { email } });

  if (!isValidObj(user))
    return next({ code: httpCode.BAD_REQUEST, message: messages.userNotExist });

  if (!comparePassSync(password, user.password) || !user.allowMigrate)
    return next({ code: httpCode.BAD_REQUEST, message: messages.accessDenied });

  return next();
};

module.exports = validUserMigrateMiddleware;
