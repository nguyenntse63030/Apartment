const admin = require('../push-notifications/firebaseController')
const constants = require('../../../configs/constant')

function sendNotification(token, str) {
  if (!token || !token.length) return
  let message = {
    android: {
      notification: {
        title: 'Aparment-PRC391',
        body: str,
        color: '#f45342'
      }
    }
  }
  try {
    message.token = token
    admin.messaging().send(message).catch(reject => console.log(reject))
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  sendNotification: sendNotification
}
