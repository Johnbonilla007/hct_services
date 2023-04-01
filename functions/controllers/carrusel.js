const { CarruselService } = require("../services");

const getCarrusels = async (req, res, next) => {
  const response = await CarruselService.getAllAsync();

  return next(response);
};

module.exports = carrusel = {
  getCarrusels,
};
