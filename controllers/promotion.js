const { PromotionService } = require("../services")


const getPromotionsAsync = async (req, res, next) => {
    const response = await PromotionService.getAllAsync();

    next(response);
}

/**
     * Add new promotions
     * @param {{newPromotions: Array.<{ name:string,description:string,active:true,img:string,type:string }> }} req 
     * @param {*} res 
     * @param {*} next 
     */

const addPromotionsAsync = async (req, res, next) => {
    const { newPromotions } = req.body;

    const response = await PromotionService.addPromotionsAsync(newPromotions);

    next(response);
}

module.exports = promotion = {
    getPromotionsAsync,
    addPromotionsAsync
}