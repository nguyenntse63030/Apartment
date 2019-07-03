var app = angular.module('SWD391')
app.controller('detailController', ['$scope', 'apiService', function ($scope, apiService) {
    const code = $('#code').text().trim()
    $scope.isNotEditing = true

    apiService.getApartmentByCode(code).then(function (res) {
        $scope.apartment = res.data.apartment
    }).catch(function (error) {
        console.log(error)
        showNotification(error.data.errorMessage, 'danger')
    })

    apiService.getUserByRole(COMMON.userRole.MANAGER).then(function (res) {
        $scope.managers = res.data.listUser
    }).catch(function (error) {
        console.log(error)
        showNotification(error.data.errorMessage, 'danger')
    })

    $scope.edit = () => {
        apiService.updateApartment($scope.apartment._id, $scope.apartment).then(function (res) {
            showNotification(res.data.message, 'success')
            setTimeout(() => {
                window.location.reload()
            }, 1000);
        }).catch(function (res) {
            console.log(res.data.errorMessage)
            showNotification(res.data.errorMessage, 'danger')
        })
    }

    $scope.focusName = () => {
        setTimeout(() => {
            $('#selected-manager').val($scope.apartment.manager._id).trigger('change')
            $('#name').focus()
        }, 100);
    }
}])
