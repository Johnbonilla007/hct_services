const httpCode = require('../commons/httpStatusCode.enum');
const info = require('../commons/Info.enum');
const messages = require('../commons/resources/messages');
const { isValidEmail, isValidObj } = require('../commons/utilities');

const { Affiliate } = require('../infrastructure/models');

class UserService {
  addUser = async (req, res) => {
    const { address, email, name, phone, city, uid, allowMigrate } = req.body;

    if (!isValidEmail(email))
      return next({
        code: httpCode.BAD_REQUEST,
        message: messages.invalidEmail,
      });

    const affiliate = await Affiliate.findOne({
      where: {
        email,
      },
    });

    const emailExist = isValidObj(affiliate);
    if (emailExist)
      return {
        code: httpCode.OK,
        title: info.ADVERTENCIA,
        message: messages.existUser,
      };

    const newAffiliate = {
      name,
      address,
      email,
      phone,
      city,
      uid,
    };

    await Affiliate.create(newAffiliate);

    return { code: httpCode.code, message: messages.ok };
  };
}

module.exports = UserService;
