var mongoose = require('mongoose');

var BillSchema = new mongoose.Schema({
    code: {
        type: String,
        default: ''
    },
    total: {
        type: Number,
        default: 0
    },
    type: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: [true, 'manager is required']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: [true, 'user is required']
    },
    apartment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Apartment',
        require: [true, 'apartment is required']
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        require: [true, 'room is required']
    },
    status: {
        type: String,
        default: 'Unpaid'
    },
    createdTime: {
        type: Number,
        default: Date.now
    },
    expiredTime: {
        type: Number,
        default: Date.now
    },
    oldNumber: {
        type: Number,
        default: 0
    },
    newNumber: {
        type: Number,
        default: 0
    },
    usedNumber: {
        type: Number,
        default: 0
    }

});


mongoose.model('Bill', BillSchema);