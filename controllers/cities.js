const { buildResponse } = require("../commons/utilities");

const { City } = require('../infrastructure/models');

const setCity = async (req, res) => {
  const { name, acronym, active } = req.body;
  try {
    await City.create({ acronym, name, active });

    return res.status(200).json({
      success: true,
      message: "se guardo exitosamente",
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

const getCity = async (req, res) => {
  try {

    const cities = await City.findAll({});

    buildResponse(req, res, 200, {
      success: true,
      title: "Confirmación",
      message: "Ok",
      response: cities,
    });
  } catch (error) {
    buildResponse(req, res, 400, {
      success: false,
      message: "ocurrio un error",
    });
  }
};

module.exports = city = {
  setCity,
  getCity,
};
