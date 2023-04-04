const { Op } = require('sequelize');
const httpCode = require('../commons/httpStatusCode.enum');
const messages = require('../commons/resources/messages');
const {
  distinctBy,
  isValidArray,
  isValidObj,
} = require('../commons/utilities');
const {
  Product,
  Category,
  City,
  ProductCity,
  ProductCategory,
} = require('../infrastructure/models');

class ProductService {
  static addRangeAsync = async productsParam => {
    const categories = distinctBy(productsParam, 'category');

    const categoriesFound = await Category.findAll({
      where: {
        name: {
          [Op.in]: categories,
        },
      },
    });

    if (isValidArray(categories) && !isValidArray(categoriesFound))
      return {
        code: httpCode.BAD_REQUEST,
        message: `Las categorías: ${categories.toString()}  asigadas a algunos products no existen en el maestro.`,
      };

    const cities = [
      ...new Set(
        productsParam.reduce(
          (acc, item) =>
            item.city ? [...acc, ...Object.keys(item.city)] : acc,
          [],
        ),
      ),
    ];

    let citiesFound = {};
    if (isValidArray(cities))
      citiesFound = await City.findAll({
        where: {
          name: {
            [Op.in]: cities,
          },
        },
      });

    const productsToSave = productsParam.map(product => {
      const { category, city } = product;

      const citiesTemp = Object.keys(city || {});

      return {
        ...product,
        ProductCategories: category
          ? categoriesFound
              .filter(s => s.name == category)
              .map(s => ({ categoryId: s.id }))
          : [],

        ProductCities: isValidObj(city)
          ? citiesFound
              .filter(s => citiesTemp.includes(s.name))
              .map(s => ({
                cityId: s.id,
                quality: product.city[s.name],
              }))
          : [],
      };
    });

    await Product.bulkCreate(productsToSave, {
      include: [ProductCity, ProductCategory],
      updateOnDuplicate: [
        'name',
        'available',
        'brand',
        'condition',
        'description',
        'features',
        'image',
        'manufacturer_number',
        'price',
        'quantity_available',
        'rating',
        'manufacturerNumber',
      ], // Los valores que existan en base al id; seran actualiados, el resto se creará en la base de datos.
    });

    return { code: httpCode.OK, message: messages.createdSuccess('Products') };
  };
}

module.exports = ProductService;
