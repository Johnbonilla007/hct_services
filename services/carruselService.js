const httpCode = require('../commons/httpStatusCode');
const messages = require('../commons/resources/messages');
const { isValidArray } = require('../commons/utilities');
const { Carrusel } = require('../infrastructure/models');

class CarruselService {
  static getAllAsync = async () => {
    const response = await Carrusel.findAll({});

    return { code: httpCode.OK, message: messages.ok, response };
  };

  static addRangeAsync = async carrusels => {
    if (!isValidArray(carrusels))
      return { code: httpCode.BAD_REQUEST, message: messages.dataNotFound };

    await Carrusel.bulkCreate(carrusels, {
      updateOnDuplicate: ['image', 'enable'], // Los valores que existan en base al id; seran actualiados, el resto se creará en la base de datos.
    });

    return { code: httpCode.ok, message: messages.ok };
  };
}

module.exports = CarruselService;
