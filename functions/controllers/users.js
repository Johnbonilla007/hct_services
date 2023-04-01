const {
  buildResponse,
  isValidEmail,
  isValidObj,
} = require("../commons/utilities");

const { Affiliate, Quote, QuoteDetail } = require("../infrastructure/models");

const addUser = async (req, res) => {
  const { address, email, name, phone, city, uid } = req.body;

  try {
    if (!isValidEmail(email)) {
      return buildResponse(req, res, 400, {
        success: false,
        title: "Error",
        message: "Correo no valido.",
      });
    }

    const affiliate = await Affiliate.findOne({
      where: {
        email,
      },
    });

    const emailExist = isValidObj(affiliate);
    if (emailExist) {
      buildResponse(req, res, 200, {
        success: false,
        title: "Advertencia",
        message: "El correo ya existe",
      });

      return;
    }

    const newAffiliate = {
      name,
      address,
      email,
      phone,
      city,
      uid,
    };

    await Affiliate.create(newAffiliate);

    buildResponse(req, res, 200, {
      success: true,
      title: "Confirmación",
      message: "Ok",
    });
  } catch (error) {
    console.log(error);
    buildResponse(req, res, 500, {
      success: false,
      title: "error",
      message: "ocurrio un error",
    });
  }
};

const getUserUId = async (req, res) => {
  const { uid } = req.body;
  try {
    // const query = db.collection("affiliate").where("uid", "==", uid);
    // const querySnapshot = await query.get();
    // const docs = querySnapshot.docs;
    // const response = docs.map((doc) => ({
    //   id: doc.id,
    //   ...doc.data(),
    // }));

    // console.log(uid)

    const response = await Affiliate.findAll({
      where: { uid },
      attributes: [
        "number_affiliate",
        "identification_card",
        "name",
        "email",
        "phone",
        "city",
        "address",
        "uid",
        "company",
      ],
      // include: {
      //   model: Quote,
      //   include: {
      //     model: QuoteDetail
      //   }
      // }
    });

    buildResponse(req, res, 200, {
      success: true,
      title: "Confirmación",
      message: "Ok",
      response,
    });
  } catch (error) {
    console.log(error.message);
    buildResponse(req, res, 400, {
      success: false,
      title: "Error",
      message: "Ha ocurrido un error al traer la data",
    });
  }
};

const updateInfotUser = async (req, res) => {
  const { uid, name, address, city, phone } = req.body;
  try {
    const query = db.collection("affiliate").where("uid", "==", uid);
    const result = await query.get();
    const docs = result.docs;
    const user = docs.map((doc) => ({
      id: doc.id,
    }));

    const affiliate = db.collection("affiliate").doc(user[0].id);
    await affiliate.update({
      name,
      address,
      city,
      phone,
      date_modification: Date.now(),
    });
    buildResponse(req, res, 200, {
      success: true,
      title: "confirmación",
      message: "Datos actualizados",
    });
  } catch (error) {
    buildResponse(req, res, 400, {
      success: false,
      title: "Error",
      message: error.message,
    });
  }
};

module.exports = user = {
  addUser,
  getUserUId,
  updateInfotUser,
};
