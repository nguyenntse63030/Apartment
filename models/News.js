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
    content: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    photoURL: {
        type: String,
        default: ''
    },
    createdTime: {
        type: Number,
        default: Date.now
    },
});

mongoose.model('News', NewsSchema);