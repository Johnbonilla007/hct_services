const { Op } = require("sequelize");
const { buildResponse } = require("../commons/utilities");

const { Product, ProductCity, ProductCategory, Category, City, Ranting } = require('../infrastructure/models');

const replacerFunc = () => {
  const visited = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (visited.has(value)) {
        return;
      }
      visited.add(value);
    }
    return value;
  };
};

const relationProducts = {
  include: [{
    model: ProductCategory,
    include: {
      model: Category,
      attributes: ['name']
    }
  },
  {
    model: ProductCity,
    include: {
      model: City
    }
  }
  ]
}

const createProduct = async (req, res) => {
  const {
    name,
    description,
    features,
    condition,
    available,
    price,
    quantity_available,
    brand,
    image,
    category,
    city,
    rating,
    manufacturerNumber
  } = req.body;

  try {

    const categories = await Category.findAll({
      where: {
        name: {
          [Op.in]: category
        }
      }
    });

    let cities = {};
    if (city)
      cities = await City.findAll({
        where: {
          name: {
            [Op.in]: Object.keys(city)
          }
        }
      })


    const newProduct = {
      name, available, brand, condition, description,
      features, image, price, quantity_available,
      rating, manufacturerNumber,
      ProductCategories: category ? categories.map(s => ({ categoryId: s.id })) : [],
      ProductCities: city ? cities.map(s => ({
        cityId: s.id,
        quality: city[s.name]
      })) : []
    }

    await Product.create(newProduct, {
      include: [Category, City]
    })

    return res.status(200).json({ message: "se guardo exitosamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const getProductId = async (req, res) => {
  //busqueda por id
  const { idProduct } = req.params;

  try {
    const response = await Product.findOne({
      where: { id: idProduct },
      ...relationProducts
    });


    if (!response) {
      return res.status(200).json({
        success: false,
        title: "Error",
        message: "El producto no existee",
      });
    }

    const unrealizeResponse = JSON.parse(JSON.stringify(response, replacerFunc()));

    const result = {
      ...unrealizeResponse,
      category: unrealizeResponse.ProductCategories.map(cat => cat?.Category.name),
      cities: unrealizeResponse.ProductCities.reduce((acc, item) => {
        const { name } = item.City
        return { ...acc, [name]: item.quality }
      }, {})
    }

    result.id = idProduct;


    buildResponse(req, res, 200, {
      success: true,
      title: "Confirmación",
      message: "Ok",
      response: result
    });
  } catch (error) {
    console.log(error);
    buildResponse(req, res, 400, {
      success: false,
      message: "ocurrio un error",
      error
    });
  }
};

const getProducts = async (req, res) => {
  try {

    const response = await Product.findAll({ ...relationProducts });

    const response1 = JSON.parse(JSON.stringify(response, replacerFunc()));

    const result = response1.map(row => ({
      ...row,
      categories: row.ProductCategories?.map(cat => cat?.Category.name),
      cities: row.ProductCities?.reduce((acc, item) => {
        const { name } = item.City
        return { ...acc, [name]: item.quality }
      }, {})
    }))

    buildResponse(req, res, 200, {
      success: true,
      title: "Confirmación",
      message: "Ok",
      response: result
    });
  } catch (error) {
    console.log(error.message);
    buildResponse(req, res, 400, {
      success: false,
      message: "ocurrio un error",
      error: error.message
    });
  }
};

const getProductCategory = async (req, res) => {
  const { category } = req.body;
  try {

    const products = await Product.findAll({
      include: [{
        model: ProductCategory,
        required: true,
        include: {
          model: Category,
          required: true,
          where: {
            name: category.toLowerCase().trim()
          },
          attributes: ['name']
        }
      },
      {
        model: ProductCity,
        include: {
          model: City
        }
      }
      ]
    })

    if (!products.length) {
      return buildResponse(req, res, 400, {
        success: false,
        title: "Confirmación",
        message: "No se encontraron resultados",
      });
    }

    buildResponse(req, res, 200, {
      success: true,
      title: "Confirmación",
      message: "Ok",
      products,
    });
  } catch (error) {
    buildResponse(req, res, 400, {
      success: false,
      message: "ocurrio un error",
    });
  }
};

const getProductName = async (req, res) => {
  const { name } = req.body;
  try {
    const products = await Product.findAll({
      where: { name },
      ...relationProducts
    })

    if (!products.length) {
      return buildResponse(req, res, 400, {
        success: false,
        title: "Confirmación",
        message: "No se encontraron resultados",
      });
    }
    buildResponse(req, res, 200, {
      success: true,
      title: "Confirmación",
      message: "Ok",
      products,
    });
  } catch (error) {
    console.log(error.message);
    buildResponse(req, res, 400, {
      success: false,
      message: "ocurrio un error",
    });
  }
};

const updateRatingProduct = async (req, res) => {
  const { id_product } = req.body;
  let size = 0;
  let votes = 0;

  try {
    const ratings = await Ranting.findAll({ where: { id_product } });

    size = ratings.length;
    votes = ratings.reduce((a, b) => a + b.vote, 0);

    const promedio = votes / size;

    const product = await Product.findOne({ where: { id_product } })
    await product.update({
      rating: promedio,
    });

    buildResponse(req, res, 200, {
      success: true,
      title: "confirmación",
      message: "rating actualizado",
    });
  } catch (error) {
    buildResponse(req, res, 400, {
      success: false,
      title: "Error",
      message: error.message,
    });
  }
};

module.exports = product = {
  createProduct,
  getProductId,
  getProducts,
  getProductCategory,
  getProductName,
  updateRatingProduct,
};
