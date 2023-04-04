const handleResponse = require('./handleResponse.middleware');
const notFound404 = require('./notfound.middleware');

module.exports = {
  handleResponse,
  notFound404,
};
