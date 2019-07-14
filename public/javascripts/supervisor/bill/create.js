
var app = angular.module('SWD391')
app.controller('createController', ['$scope', 'apiService', function ($scope, apiService) {
    $scope.bill = {
        type: 'Electricity',
        oldNumber: 0,
        newNumber: 0,
        usedNumber: 0,
        status: 'UNPAID',
        total: 0
    }
    let roomCode = $('#roomCode').text().trim()

    $scope.unitPrice = 2300

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
        $scope.bill.usedNumber = usedNumber
        $scope.bill.total = parseNumberToMoney(Number(Math.round(usedNumber * $scope.unitPrice, 10)))
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
        $scope.bill.unitPrice = Number($scope.unitPrice)

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
