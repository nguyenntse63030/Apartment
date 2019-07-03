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
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    address: {
        type: String,
        default: ''
    },
    createdDate: {
        type: Number,
        default: Date.now
    }
});


mongoose.model('Apartment', ApartmentSchema);