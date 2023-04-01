const { isValidArray, isValidObj, unrealized } = require("../commons/utilities");
const httpCode = require('../commons/httpStatusCode.enum');

const { Category, SubCategory } = require('../infrastructure/models');
const CategoryService = require("../services/categoryService");

// {name, active, subCategories: [{name, description, active}]}
const addCategory = async (req, res, next) => {

  const response = await CategoryService.addCategoryAsync(req.body);

  next(response);
};

const getCategories = async (req, res, next) => {

  const categories = await Category.findAll({
    include: [SubCategory]
  });

  next({
    code: httpCode.OK,
    message: "Ok",
    response: unrealized(categories)?.map(category => {
      const { SubCategories, ...item } = category;

      return { ...item, subCategories: SubCategories }
    })
  })
};

// {categoryId, subCategories: [{name, description, active}]}
const addSubCategoriesToCategoyId = async (req, res, next) => {
  const { subCategories } = req.body;
  const { categoryId } = req.params;

  const response = await CategoryService.addSubCategoriesToCategoyIdAsync(categoryId, subCategories);

  next(response);
}


module.exports = category = {
  addCategory,
  getCategories,
  addSubCategoriesToCategoyId
};
