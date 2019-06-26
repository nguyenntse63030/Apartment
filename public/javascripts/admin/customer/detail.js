
var app = angular.module('SWD391')
app.controller('detailController', ['$scope', 'apiService', function ($scope, apiService) {
    const code = $('#code').text().trim()
    $scope.isNotEditing = true
    $scope.apartments = []
    apiService.getUser(code).then(function (res) {
        $scope.customer = res.data.user
    }).catch(function (error) {
        console.log(error)
        showNotification(error.data.errorMessage, 'danger')
    })

    $scope.getApartments = () => {
        setTimeout(() => {
            apiService.getApartments().then(function (res) {
                $scope.apartments = res.data.apartments
                $('#selected-apartment').select2().val($scope.apartments[0]._id);
                $('#selected-apartment').select2().trigger().change()
            }).catch(function (error) {
                console.log(error)
                showNotification(error.data.errorMessage, 'danger')
            })
        }, 100);
    }

    $scope.focusName = () => {
        setTimeout(() => {
            $('#fullname').focus()
        }, 100);
    }
}])
