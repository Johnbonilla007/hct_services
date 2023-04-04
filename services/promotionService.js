const httpCode = require('../commons/httpStatusCode.enum');
const messages = require('../commons/resources/messages');
const { isValidArray } = require('../commons/utilities');

const { Promotion } = require('../infrastructure/models');

class PromotionService {
  static getAllAsync = async () => {
    const promotions = await Promotion.findAll();

    return {
      code: httpCode.OK,
      message: messages.foundData,
      response: promotions,
    };
  };

  /**
   * Add new promotions
   * @param {{newPromotions: Array.<{ name:string,description:string,active:true,img:string,type:string }> }} newPromotions
   */
  static addPromotionsAsync = async newPromotions => {
    if (!isValidArray(newPromotions))
      return messages.fieldNewPromotionsRequired;

    // Delete all data
    Promotion.destroy({ where: {}, truncate: true });

    // build entities to save
    const promotionsToSave = newPromotions.map(s => ({
      name: s.name,
      description: s.description,
      active: s.active == null || s.active == undefined ? true : s.active,
      img: s.img,
      type: s.type,
    }));

    // create all data
    await Promotion.bulkCreate(promotionsToSave);

    return { code: httpCode.OK, message: messages.promotionsCreateSuccess };
  };
}

module.exports = PromotionService;
