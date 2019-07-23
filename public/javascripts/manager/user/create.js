
var app = angular.module('SWD391')
app.controller('createController', ['$scope', 'apiService', function ($scope, apiService) {
    $scope.customer = {
        name: '',
        note: '',
        phone: '',
        gender: '',
        email: '',
        role: '',
        address: '',
        note: ''
    }

    $scope.createUser = () => {
        $scope.customer.dateOfBirth = getTimestampFromDatePicker('#birthdate')
        $scope.customer.role = COMMON.userRole.CUSTOMER
        apiService.createUser($scope.customer).then(function (res) {
            showNotification(res.data.message, 'success')
            setTimeout(() => {
                window.location.href = '/user'
            }, 2000);
        }).catch(function (error) {
            console.log(error)
            showNotification(error.data.errorMessage, 'danger')
        })
    }
}])
