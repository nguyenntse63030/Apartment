var mongoose = require('mongoose');

var ApartmentSchema = new mongoose.Schema({
    code: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: ''
    },
    floors: {
        type: Number,
        default: 0
    },
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    address: {
        type: String,
        default: ''
    },
    ggMap: {
        type: String,
        default: ''
    },
    createdDate: {
        type: Number,
        default: Date.now
    }
});


mongoose.model('Apartment', ApartmentSchema);