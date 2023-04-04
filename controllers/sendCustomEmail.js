const { db } = require('../config/firebase');

const sendCustomEmail = async email_afiliado => {
  try {
    const query = db.collection('mail');
    const emailContent = {
      to: 'jsantos@yourappland.com',
      message: {
        subject: 'Hola hay una nueva cotización!',
        text: `hay una nueva cotización de prueba: ${email_afiliado}`,
      },
    };
    await query.add(emailContent);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  sendCustomEmail,
};
