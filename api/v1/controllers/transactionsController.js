const mongoose = require('mongoose')
const responseStatus = require('../../../configs/responseStatus')
const constant = require('../../../configs/constant')
const common = require('../../common')

const User = mongoose.model('User')
const Room = mongoose.model('Room')
const Apartment = mongoose.model('Apartment')
const Bill = mongoose.model('Bill')
const Transactions = mongoose.model('Transactions')



async function createTransaction(billId, paid) {
    let bill = await Bill.findById(billId)
    if (!bill) {
        throw responseStatus.Code400({ errorMessage: responseStatus.BILL_NOT_FOUND })
    }

    let transaction = new Transactions()
    transaction.code = bill.code
    transaction.apartment = bill.apartment
    transaction.user = bill.user
    transaction.room = bill.room

    let billDate = bill.title.slice(bill.title.lastIndexOf(' '), bill.title.length)
    let content = 'Paid ' + bill.type + ' Bill ' + billDate
    transaction.content = content
    transaction.payments = bill.total

    await transaction.save()

    return responseStatus.Code200({ message: responseStatus.CREATE_TRANSACTION_SUCCESS })
}

async function getAllTransactions() {
    let transactions = await Transactions.find().sort({ createdTime: -1 })
    .populate('user', 'name')
    .populate('apartment', 'name')
    .populate('room', 'roomNumber')

    let total = 0
    for(let transaction of transactions){
        total += transaction.payments
    }

    return responseStatus.Code200({ transactions: transactions, total: total })
}


module.exports = {
    createTransaction,
    getAllTransactions
}