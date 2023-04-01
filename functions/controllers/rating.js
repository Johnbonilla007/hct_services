const { buildResponse } = require("../commons/utilities");

const { Ranting } = require('../infrastructure/models');

const setRatingPorduct = async (req, res) => {
  const { vote, id_product, comment, uid, email } = req.body;

  try {
    const ratingUser = await Ranting.findAll({
      where: {
        uid,
        id_product
      }
    })

    if (ratingUser.length > 0) {
      return buildResponse(req, res, 400, {
        success: false,
        title: "error",
        message: "Este usuario ya hizo un comentario sobre este producto",
      });
    }

    await Ranting.create({
      id_product, uid, email,
      vote, comment
    });

    buildResponse(req, res, 200, {
      success: true,
      title: "confirmación",
      message: "Valoración realizada",
    });

  } catch (error) {
    buildResponse(req, res, 400, {
      success: false,
      title: "Error",
      message: error.message,
    });
  }
};

const getRatingId = async (req, res) => {
  const { id_product } = req.body;
  let size = 0;
  let votes = 0;

  try {

    const response = await Ranting.findAll({
      where: { id_product },
      attributes: ["id_product", "uid", "email", "vote", "comment"]
    });


    if (!response) {
      return buildResponse(req, res, 400, {
        success: false,
        title: "Error",
        message: "Rango no encontrado",
      });
    }

    size = response.length;
    votes = response.reduce((a, b) => a + Number(b.vote), 0);

    const promedio = votes / size;

    buildResponse(req, res, 200, {
      success: true,
      title: "Confirmación",
      message: "Ok",
      promedio,
      response,
    });
    
  } catch (error) {
    buildResponse(req, res, 400, {
      success: false,
      title: "Error",
      message: error.message,
    });
  }
};

module.exports = rating = {
  getRatingId,
  setRatingPorduct,
};
