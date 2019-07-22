const mongoose = require('mongoose');

var NewsSchema = new mongoose.Schema({
    code: {
        type: String,
        default: ''
    },
    title: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: ''
    },
    content: {
        type: String,
        default: ''
    },
    photoURL: {
        type: String,
        default: ''
    },
    expiredDate: {
        type: Number,
        default: Date.now
    },
    createdTime: {
        type: Number,
        default: Date.now
    },
});

mongoose.model('News', NewsSchema);