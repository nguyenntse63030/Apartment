'use strict'

var passport = require('passport')
var mongoose = require('mongoose')
var User = mongoose.model('User')
var jwt = require('jsonwebtoken')
var responseStatus = require('./responseStatus')
const config = require('../config')
var LocalStrategy = require('passport-local').Strategy

async function createPassportConfig(app) {
  try {
    passport.use(new LocalStrategy(
      {
        usernameField: 'phone',
        passwordField: 'password',
        passReqToCallback: true
      },
      async function (req, username, password, done) {
        const usernameTrim = trimUsername(username);
        let user = await User.findOne({ phone: usernameTrim })

        if (user) {
          if (!await user.authenticate(password)) {
            return done(responseStatus.Code401({ errorMessage: responseStatus.IVALID_PHONE_OR_PASSWORD }), false)
          }

          let token = jwt.sign({ id: user._id, phone: user.phone, name: user.name, role: user.role, loggedInTimestamp: Date.now() }, config.secret, {
            expiresIn: config.tokenExpire
          })
          delete user.password
          return done(null, true, {
            user: user,
            token: token
          })
        }
      }
    ))
  } catch (error) {
    console.log(error)
    return res.status(error.status || 500).send(error)
  }
  const trimUsername = name => {
    return name.replace(/[\s.,]/g, '')
  }

  app.use(passport.initialize())
  app.use(passport.session())
}

module.exports = {
  createPassportConfig: createPassportConfig,
  passport: passport
}
