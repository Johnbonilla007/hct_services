const httpCode = require('../HttpStatusCode.enum');
const info = require('../Info.enum');

const handleResponse = (res, request, response, next) => {
  const statusCode =
    !res.code || res.code === httpCode.INTERNAL_SERVER
      ? httpCode.INTERNAL_SERVER
      : res.code;

  switch (statusCode) {
    case httpCode.INTERNAL_SERVER: {
      console.log('error -->', res);

      return response
        .status(httpCode.INTERNAL_SERVER)
        .send(getInternalServer(res));
    }

    case httpCode.OK: {
      const result = {
        success: true,
        title: res.title ? res.title : info.CONFIRMATION,
        message: res.message || '',
      };

      if (res.response) result.response = res.response;

      return response.status(statusCode).send(result);
    }

    default:
      return response.status(statusCode).send({
        success: false,
        title: info.ERROR,
        message: res.message || '',
      });
  }
};

const getInternalServer = error => {
  const res = {
    success: false,
    title: info.ERROR,
    code: 500,
    message: 'ocurrio un error',
  };

  res.error = process.env.NODE_ENV === 'production' ? '' : error;

  return res;
};

module.exports = handleResponse;
