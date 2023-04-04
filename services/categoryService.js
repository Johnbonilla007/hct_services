const { Op } = require('sequelize');
const {
  isValidArray,
  isValidObj,
  unrealized,
  distinctBy,
} = require('../commons/utilities');
const httpCode = require('../commons/httpStatusCode.enum');

const { Category, SubCategory } = require('../infrastructure/models');
const messages = require('../commons/resources/messages');

class CategoryService {
  static addCategoriesAsync = async categories => {
    if (!isValidArray(categories))
      return {
        code: httpCode.BAD_REQUEST,
        message: messages.fieldCategories_required,
      };

    const categoriesIN = distinctBy(categories, 'name');

    let categoriesFound = await Category.findAll(
      {
        where: {
          name: {
            [Op.in]: categoriesIN,
          },
        },
      },
      { include: [SubCategory] },
    );

    categoriesFound = unrealized(categoriesFound);

    // Si encuentra categorias se comenzará a validar las nuevas.
    if (isValidArray(categoriesFound)) {
      // Obtener las categorías que no existen.
      const newCategories = categories.filter(category => {
        if (categoriesFound.some(s => s.name.includes(category.name)))
          return false;

        return true;
      });

      // Guardar las nuevas categorías
      await Category.bulkCreate(newCategories, { include: SubCategory });

      // Obtener las subCategors nuevas de la lista.
      const newSubCategoriesToExistCategories = categories.reduce(
        (acc, category) => {
          if (!isValidArray(category.subCategories)) return acc;

          const categoryFound = categoriesFound.find(s =>
            s.name.includes(category.name),
          );

          let newSubCategories = [];
          if (isValidArray(categoryFound.subCategories)) {
            // Comparar las subCategorías y obtener las que no existen.
            newSubCategories = category.subCategories.filter(subCategory => {
              if (
                categoryFound.subCategories.some(s =>
                  s.name.includes(subCategory.name),
                )
              )
                return false;

              return true;
            });
          }

          newSubCategories = isValidArray(newSubCategories)
            ? newSubCategories
            : categoryFound.subCategories;

          // Mapear las subCategorias que no existen.
          return [
            ...acc,
            ...newSubCategories.map(subCategory => ({
              categoryId: categoryFound.id,
              ...subCategory,
            })),
          ];
        },
        [],
      );

      // Guardar las subCategorias a las categorias existentes.
      await SubCategory.bulkCreate(newSubCategoriesToExistCategories);

      return {
        code: httpCode.OK,
        message: messages.createdSuccess('La categoría'),
      };
    }

    // Gudarda todo si no se encontraron categorías.
    await Category.bulkCreate(categories, { include: SubCategory });

    return {
      code: httpCode.OK,
      message: messages.createdSuccess('La categoría'),
    };
  };

  // {name, active, subCategories: [{name, description, active}]}
  static addCategoryAsync = async ({ name, active, subCategories }) => {
    if (!name)
      return {
        code: httpCode.BAD_REQUEST,
        message: messages.fieldUserRequired,
      };

    const category = await Category.findOne({ where: { name } });

    // Sí existe la categoría se procederán a agregar las subCategorías.
    if (isValidObj(category)) {
      return await CategoryService.addSubCategoriesToCategoyIdAsync(
        category.id,
        subCategories,
      );
    }

    await Category.create(
      {
        name,
        active: active == null || active == undefined ? true : active,
        SubCategories: subCategories,
      },
      { include: [SubCategory] },
    );

    return {
      code: httpCode.OK,
      message: messages.createdSuccess('La categoría'),
    };
  };

  static addSubCategoriesToCategoyIdAsync = async (
    categoryId,
    subCategories,
  ) => {
    if (!categoryId || categoryId <= 0 || !isValidArray(subCategories))
      return {
        code: httpCode.BAD_REQUEST,
        message: messages.fieldSubCategory_required,
      };

    const category = await Category.findByPk(categoryId);

    if (!isValidObj(category))
      return { code: httpCode.BAD_REQUEST, message: messages.categoryNotExist };

    const subCategoriesAssigned = await category.getSubCategories();

    const subCategoriesToCreate = subCategories
      .filter(s =>
        isValidArray(subCategoriesAssigned)
          ? !subCategoriesAssigned.some(sub => sub.name?.includes(s.name))
          : true,
      )
      .map(subCategory => ({
        categoryId,
        name: subCategory.name,
        description: subCategory.description,
        active: subCategory.active,
      }));

    if (!isValidArray(subCategoriesToCreate))
      return {
        code: httpCode.OK,
        title: info.ADVERTENCIA,
        message: messages.subCategoriesAlready,
      };

    await SubCategory.bulkCreate(subCategoriesToCreate);

    return { code: httpCode.OK, message: messages.subCategorySuccess };
  };
}

module.exports = CategoryService;
