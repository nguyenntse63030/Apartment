
var app = angular.module('PRC391')
app.controller('createController', ['$scope', 'apiService', function ($scope, apiService) {
    $scope.bill = {
        type: 'Electricity',
        oldNumber: 0,
        newNumber: 0,
        usedNumber: 0,
        status: 'UNPAY',
        total: 0
    }
    let roomCode = $('#roomCode').text().trim()
    $scope.uPrice = 1000

    $scope.resetValue = () => {
        $scope.bill.oldNumber = 0
        $scope.bill.newNumber = 0
        $scope.bill.usedNumber = 0
        $scope.bill.total = 0
    }

    apiService.getUnitPrice().then(function (res) {
        $scope.unitPrice = res.data.unitPrice
        $scope.unitPrice.electricity = parseNumberToMoney($scope.unitPrice.electricity)
        $scope.unitPrice.water = parseNumberToMoney($scope.unitPrice.water)
        $scope.uPrice = $scope.unitPrice.electricity
    }).catch(function (error) {
        console.log(error)
        showNotification(error.data.errorMessage, 'danger')
    })

    apiService.getRoomByCode(roomCode).then(function (res) {
        $scope.room = res.data.room
    }).catch(function (error) {
        console.log(error)
        showNotification(error.data.errorMessage, 'danger')
    })

    $scope.calTotal = () => {
        let oldNumber = parseMoneyToNumber($scope.bill.oldNumber)
        let newNumber = parseMoneyToNumber($scope.bill.newNumber)
        let usedNumber = newNumber - oldNumber
        let unitPrice = parseMoneyToNumber($scope.uPrice)
        $scope.bill.usedNumber = usedNumber

        $scope.bill.total = parseNumberToMoney(Number(Math.round(usedNumber * unitPrice, 10)))
    }

    $scope.createBill = () => {
        if ($scope.bill.total < 1) {
            return showNotification('Total Bill must > 0', 'danger')
        }
        if ($scope.bill.status === COMMON.billStatus.PAID) {
            $scope.bill.expiredTime = undefined
        } else {
            $scope.bill.expiredTime = (getTimestampFromDatePicker('#expiredDate')) + 86399 * 1000
        }

        $scope.bill.oldNumber = parseMoneyToNumber($scope.bill.oldNumber)
        $scope.bill.newNumber = parseMoneyToNumber($scope.bill.newNumber)
        $scope.bill.total = parseMoneyToNumber($scope.bill.total)


        if ($scope.bill.type === COMMON.billTypes.SERVICE) {
            $scope.bill.unitPrice = 0
        } else {
            $scope.bill.unitPrice = parseMoneyToNumber($scope.uPrice)
        }

        apiService.createBill($scope.room._id, $scope.bill).then(function (res) {
            showNotification(res.data.message, 'success')
            setTimeout(() => {
                window.location.href = '/bill'
            }, 2000);
        }).catch(function (error) {
            console.log(error)
            showNotification(error.data.errorMessage, 'danger')
        })
    }
}])
