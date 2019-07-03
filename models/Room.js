const mongoose = require('mongoose');

var RoomSchema = new mongoose.Schema({
    code: {
        type: String,
        default: ''
    },
    roomNumber: {
        type: Number,
        default: 0
    },
    apartment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Apartment',
        require: [true, 'apartment is required']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, // Kiểu dữ liệu này có thể reference tới một object trong DB khác, lấy mọi thông tin của Object đó ra
        ref: 'User'
    },
    signDate: {
        type: Number,
        default: 0
    },
    expiredDate: {
        type: Number,
        default: 0
    },
    note: {
        type: String,
        default: ''
    },
    createdDate: {
        type: Number,
        default: Date.now
    }
});

mongoose.model('Room', RoomSchema);