var android = require('./android')
var mongoose = require('mongoose')
var User = mongoose.model('User')

/**
* @api {post} /api/pushNotification Push notification to device
* @apiVersion 1.0.0
* @apiName Notification
* @apiGroup Notification
*
* @apiParam {String} platform "ios" | "android"
* @apiParam {String} token Token of device
* @apiParam {String} message Message show in notification
* @apiParam {Json} data Data of notification
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*
* @apiErrorExample Error-Response:
*     HTTP/1.1 400 Missing params
*/

async function sendNotifications(users, message, type) {
  // let users = await User.find({ role: roles },
  //   { code: 1, androidToken: 1, iosToken: 1 })
  android.sendNotification(users.map(u => u.androidToken), message)
}

async function sendNotification(androidToken, message) {
  android.sendNotification(androidToken, message)
}

module.exports = {
  sendNotifications,
  sendNotification
}
