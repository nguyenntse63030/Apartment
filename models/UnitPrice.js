const mongoose = require('mongoose');

var UnitPriceSchema = new mongoose.Schema({
    electricity: {
        type: Number,
        default: 0
    },
    water: {
        type: Number,
        default: 0
    }
});

mongoose.model('UnitPrice', UnitPriceSchema);