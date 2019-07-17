
var app = angular.module('SWD391')
app.controller('detailController', ['$scope', 'apiService', function ($scope, apiService) {
    $scope.customer = {
        note: ' '
    }
    const code = $('#code').text().trim()
    $scope.isNotEditing = true

    apiService.getUser(code).then(function (res) {
        $scope.user = res.data.user
    }).catch(function (error) {
        console.log(error)
        showNotification(error.data.errorMessage, 'danger')
    })

    $scope.editProfile = () => {
        $scope.user.dateOfBirth = getTimestampFromDatePicker($('#birthdate'))
        debugger
        apiService.updateUser($scope.user._id, $scope.user).then(function (res) {
            showNotification(res.data.message, 'success')
            setTimeout(() => {
                window.location.reload()
                
            }, 1000);
        }).catch(function (res) {
            console.log(res.data.errorMessage)
            showNotification(res.data.errorMessage, 'danger')
        })
    }
}])
