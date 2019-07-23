var cron = require('node-cron')
const userController = require('./v1/controllers/userController')
const billController = require('./v1/controllers/billController')



const RUN_AT_1_AM = '0 0 1 * * *'
const RUN_AT_6_AM_30 = '0 30 6 * * *'
const RUN_AT_BEGIN_OF_MONTH = '1 0 0 1 * *'
const RUN_CREATE_BILL = '0 0 8 1 * *'

cron.schedule(RUN_CREATE_BILL, async function () {
  try {
    await billController.createMonthyBill()
  } catch (error) {
    console.log('cronjob monthly bill failed')
    console.log(error)
  }
})

