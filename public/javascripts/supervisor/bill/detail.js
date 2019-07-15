
var app = angular.module('SWD391')
app.controller('createController', ['$scope', 'apiService', function ($scope, apiService) {

    let code = $('#code').text().trim()
    $scope.isNotEditing = true
    apiService.getBillByCode(code).then(function (res) {
        $scope.bill = res.data.bill
        $scope.bill.unitPrice = parseNumberToMoney($scope.bill.unitPrice)
        $scope.bill.oldNumber = parseNumberToMoney($scope.bill.oldNumber)
        $scope.bill.newNumber = parseNumberToMoney($scope.bill.newNumber)
        $scope.bill.total = parseNumberToMoney($scope.bill.total)
    }).catch(function (error) {
        console.log(error)
        showNotification(error.data.errorMessage, 'danger')
    })

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

    $scope.updateBill = () => {
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

        apiService.updateBill($scope.bill._id, $scope.bill).then(function (res) {
            showNotification(res.data.message, 'success')
            setTimeout(() => {
                window.location.reload()
            }, 2000);
        }).catch(function (error) {
            console.log(error)
            showNotification(error.data.errorMessage, 'danger')
        })
    }

    $scope.deleteBill = () => {
        apiService.deleteBill($scope.bill._id).then(function (res) {
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
