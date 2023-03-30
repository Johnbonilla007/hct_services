
const httpCode = require('../commons/httpStatusCode.enum');

const { CarruselService, CategoryService, PromotionService, ProductService } = require('../services');

const applyMigrationAsync = async (req, res, next) => {
    const { products, categories, carrusels, users, promotions } = req.body;

    const categoryResponse = await CategoryService.addCategoriesAsync(categories);
    // if(categoryResponse.code !== httpCode.OK)
    //     return next(categoryResponse);


    const carruselResponse = await CarruselService.addRangeAsync(carrusels);
    // if(carruselResponse.code !== httpCode.OK)
    //     return next(carruselResponse);


    const promotionResponse = await PromotionService.addPromotionsAsync(promotions);
    // if(promotionResponse.code !== httpCode.OK)
    //     return next(promotionResponse);


    const productResponse = await ProductService.addRangeAsync(products);
    // if (productResponse.code !== httpCode.OK)
    //     return next(productResponse);

    res.json({
        message: {
            category: { message: categoryResponse.code === httpCode.OK ? 'Ok' : categoryResponse.message },
            carrusel: { message: carruselResponse.code === httpCode.OK ? 'Ok' : carruselResponse.message },
            promotion: { message: promotionResponse.code === httpCode.OK ? 'Ok' : promotionResponse.message },
            product: { message: productResponse.code === httpCode.OK ? 'Ok' : productResponse.message },
        }
    });
}


module.exports = migrationHCT = {
    applyMigrationAsync
}
