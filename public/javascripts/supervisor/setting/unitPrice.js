
var app = angular.module('SWD391')
app.controller('unitPriceController', ['$scope', 'apiService', function ($scope, apiService) {

    apiService.getUnitPrice().then(function (res) {
        $scope.unitPrice = res.data.unitPrice
        $scope.unitPrice.electricity = parseNumberToMoney($scope.unitPrice.electricity)
        $scope.unitPrice.water = parseNumberToMoney($scope.unitPrice.water)
    }).catch(function (error) {
        console.log(error)
        showNotification(error.data.errorMessage, 'danger')
    })

    $scope.saveUnitPrice = () => {
        if ($scope.unitPrice.electricity < 1 || $scope.unitPrice.water < 1) {
            return showNotification('Unit Price must > 0', 'danger')
        }
        $scope.unitPrice.electricity = parseMoneyToNumber($scope.unitPrice.electricity)
        $scope.unitPrice.water = parseMoneyToNumber($scope.unitPrice.water)

        apiService.updateUnitPrice($scope.unitPrice).then(function (res) {
            showNotification(res.data.message, 'success')
            setTimeout(() => {
                window.location.reload()
            }, 2000);
        }).catch(function (error) {
            console.log(error)
            showNotification(error.data.errorMessage, 'danger')
        })
    }
}])
