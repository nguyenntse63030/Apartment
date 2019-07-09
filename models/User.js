const mongoose = require('mongoose');
var crypto = require('crypto-js')

var UserSchema = new mongoose.Schema({
    code: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        default: ''
    },
    dateOfBirth: {
        type: Number,
    },
    gender: {
        type: String,
        default: 'Male'
    },
    role: {
        type: String,
        default: 'Customer'
    },
    phone: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: ''
    },
    note: {
        type: String,
        default: ''
    },
    photoURL: {
        type: String,
        default: ''
    },
    apartment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Apartment'
    },
    isGoogleAcc: {
        type: Boolean,
        default: false
    },
    account: {
        type: Number,
        default: 0
    },
    createdTime: {
        type: Number,
        default: Date.now
    }
});

UserSchema.methods.authenticate = function (password) {
    try {
        var bytes = crypto.AES.decrypt(this.password, this.phone)
        var decryptPass = bytes.toString(crypto.enc.Utf8)
        return password === decryptPass
    } catch (error) {
        console.log(error)
    }
}

UserSchema.methods.hashPassword = function (password) {
    return crypto.AES.encrypt(password, this.phone).toString()
}

mongoose.model('User', UserSchema);