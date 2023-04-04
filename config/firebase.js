const admin = require('firebase-admin');

let serviceAccount = require('../permission.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const storage = admin.storage();
const auth = admin.auth();

module.exports = {
  db,
  storage,
  auth,
};
