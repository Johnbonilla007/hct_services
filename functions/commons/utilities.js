const bcrypt = require('bcryptjs');
var crypto = require('crypto');


const cors = require("cors")({ origin: true });

const buildResponse = (req, res, status, data) => {
  return cors(req, res, () => {
    res.status(status).send(JSON.stringify(data));
  });
};


const encrypPasswordAsync = async (password, salt = 10) => {
  const hashSalt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, hashSalt);

  return hash;
}

const comparePassAsync = async (password, hashPassword) => {
  return await bcrypt.compare(password, hashPassword);
}

const comparePassSync = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword);
}

const isValidEmail = (email) => {
  const regexEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return regexEmail.test(email);
}

const isValidPassword = (password) => {
  var regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,30}$/;;

  return password.match(regexPassword);
}

/**
 * @description Object has properties
 * @param {*} obj 
 * @returns bool
 */
const isValidObj = obj => obj && Object.keys(obj).length;

const isValidArray = arr => arr && arr.length;

const generateId = (nByte = 12, encode = 'base64') => crypto.randomBytes(nByte).toString(encode);

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

const unrealized = (data) => JSON.parse(JSON.stringify(data, replacerFunc()));

const distinctBy = (items, fieldName) => {
  const ids = items.reduce((acc, current) => [...acc, current[fieldName]], []);

  return [...new Set(ids)];
}

module.exports = {
  buildResponse,
  encrypPasswordAsync,
  comparePassAsync,
  comparePassSync,
  isValidEmail,
  isValidPassword,
  isValidObj,
  generateId,
  unrealized,
  isValidArray,
  distinctBy
};
