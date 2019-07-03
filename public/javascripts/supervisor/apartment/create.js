var app = angular.module('SWD391')
app.controller('createController', ['$scope', 'apiService', function ($scope, apiService) {
    $scope.numberOfFloor = 1
    $scope.floors = []

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

    $scope.getNumber = function (num) {
        if (num) {
            let number = Number(num)
            return Array.apply(null, { length: number }).map(Number.call, Number)
        }
        return []
    }

    $scope.initFormat = function () {
        $(document).ready(function () {
            setTimeout(function () {
                numberFormat()
            }, 200)
        })
    }

    $scope.createRoomData = function (index) {
        if (index == 0) {
            for (let i = index + 1; i < $scope.floors.length; i++) {
                if ($scope.floors[i] == 0) {
                    $scope.floors[i] = Number($scope.floors[index])
                }
            }
            $scope.floors[index] = Number($scope.floors[index])
        }
    }

    $scope.createApartment = function () {
        $('#loading').show()
        setTimeout(function () {
            $('#loading').hide()
            showNotification('Time out', 'error')
        }, 15000)
        let data = {
            apartment: $scope.apartment,
            floors: $scope.floors
        }
        apiService.createApartment(data).then(function (res) {
            $('#loading').hide()
            showNotification(res.data.message, 'success')
            setTimeout(() => {
                window.location.href = '/apartment'
            }, 2000);
        }).catch(function (res) {
            $('#loading').hide()
            console.log(res.data.errorMessage)
            showNotification(res.data.errorMessage, 'danger')
        })
    }
}])
