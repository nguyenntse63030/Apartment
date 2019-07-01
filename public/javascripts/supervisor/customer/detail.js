
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
        if ($scope.apartments.length < 1) {
            setTimeout(() => {
                apiService.getApartments().then(function (res) {
                    $scope.apartments = res.data.apartments
                    $scope.selectedApartment = $scope.apartments[0]._id
                    $scope.getRoom()
                }).catch(function (error) {
                    console.log(error)
                    showNotification(error.data.errorMessage, 'danger')
                })
            }, 100);
        }
    }

    $scope.getRoom = () => {
        apiService.getRooms($scope.selectedApartment).then(function (res) {
            $scope.rooms = res.data.rooms
            $scope.selectedRoom = $scope.rooms[0]._id
        }).catch(function (error) {
            console.log(error)
            showNotification(error.data.errorMessage, 'danger')
        })
    }

    $scope.addRoomForUser = () => {
        if (!$scope.selectedApartment) {
            return showNotification('Please choose the apartment', 'danger')
        }
        if (!$scope.selectedRoom) {
            return showNotification('Please choose the room', 'danger')
        }
        apiService.addRoomForUser($scope.selectedRoom, $scope.customer._id).then(function (res) {
            showNotification(res.data.message, 'success')
            $('#addRoomModel').modal('hide')
        }).catch(function (error) {
            console.log(error)
            showNotification(error.data.errorMessage, 'danger')
        })
    }

    $scope.focusName = () => {
        setTimeout(() => {
            $('#fullname').focus()
        }, 100);
    }
}])
