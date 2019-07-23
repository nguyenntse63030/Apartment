var mongoose = require('mongoose');

var BillSchema = new mongoose.Schema({
    code: {
        type: String,
        default: ''
    },
    title: {
        type: String,
        default: ''
    },
    unitPrice: {
        type: Number,
        default: 0
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
    editor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    apartment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Apartment',
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
    },
    status: {
        type: String,
        default: 'UNPAID',
        enum: ['UNPAID', 'PAID']
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
    },
    paid: {
        type: Number, 
        default: 0
    }
});


mongoose.model('Bill', BillSchema);