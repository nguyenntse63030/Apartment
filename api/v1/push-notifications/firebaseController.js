var admin = require('firebase-admin')

var serviceAccount = require('../../../configs/firebase-config.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://apartment-f5a24.firebaseio.com'
})

module.exports = admin
