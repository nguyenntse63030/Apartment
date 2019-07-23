const mongoose = require('mongoose');

var TransactionsSchema = new mongoose.Schema({
    code: {
        type: String,
        default: ''
    },
    apartment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Apartment',
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    bill: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Bill'
    },
    content: {
        type: String,
        default: ''
    },
    payments: {
        type: Number,
        default: 0
    },
    createdTime: {
        type: Number,
        default: Date.now
    }
});

mongoose.model('Transactions', TransactionsSchema);