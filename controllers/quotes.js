const { buildResponse } = require("../commons/utilities");

const { Quote, QuoteDetail } = require('../infrastructure/models');

const addQuote = async (req, res) => {
  const {
    uid,
    items,
    available,
    total,
    subTotal,
    isv,
    email_afiliado,
    phone,
    number_quote,
    name,
  } = req.body;

  try {
    const quoteDetails = items.cartItems.map(cart => ({
      name: cart.name,
      quality: cart.cantidad,
      price: cart.price,
      available: cart.available,
      description: cart.description,
      image: cart.image,
      subTotal: cart.subTotal,
      total: cart.total || null,
    }))

    const newQuote = {
      number_quote: 2,
      name,
      phone,
      available,
      email_affiliate: email_afiliado,
      isv,
      subTotal,
      total,
      uid,
      QuoteDetails: quoteDetails
    }

    await Quote.create(newQuote, {
      include: [QuoteDetail]
    });


    buildResponse(req, res, 200, {
      success: true,
      title: "Confirmación",
      message: "Ok",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const getQuoteUid = async (req, res) => {
  const { uid } = req.params;
  try {

    const quotes = await Quote.findAll({
      where: { uid },
      include: [QuoteDetail]
    })

    if (quotes.length <= 0) {
      return buildResponse(req, res, 400, {
        success: false,
        message: "No hay resultados",
      });
    }

    buildResponse(req, res, 200, {
      success: true,
      message: "OK",
      response: quotes,
    });
  } catch (error) {
    console.log(error.message);
    buildResponse(req, res, 400, {
      success: false,
      title: "error",
      message: error.message,
    });
  }
};

module.exports = quote = {
  addQuote,
  getQuoteUid,
};
