// const functions = require("firebase-functions");
const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "javier.ss896@gmail.com",
    pass: "nwqpwfwdujqqlrsi",
  },
});

const sendContactForm = () => {
  return transport
    .sendMail({
      subject: "Tienes una nueva cotización de un cliente ",
      bcc: ["kjsantos@unah.hn"],
      html: "<h1>Hola Mundo</h1>",
    })
    .then((res) => {
      console.log("Accepted =>", res.accepted),
        console.log("Rejected =>", res.rejected);
    })
    .catch((err) => console.log(err));
};

const senEmail = (req, res) => {
  const { secret } = req.body;
  if (secret !== "firebase") {
    return res.send("Falta el secret");
  }
  sendContactForm(req.body);
  return res.status(200).send("enviando cotización");
};

module.exports = {
  senEmail,
};
