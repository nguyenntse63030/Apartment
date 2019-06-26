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
    description: {
        type: String,
        default: ''
    },
    contentDetail: {
        type: String,
        default: ''
    },
    createdTime:{
        type: Number,
        default: Date.now
    },
    image: {
        type: Number,
        default: 0
    }
});

mongoose.model('News', NewsSchema);