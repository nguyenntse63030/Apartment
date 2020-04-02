
var app = angular.module('PRC391')
app.controller('detailController', ['$scope', 'apiService', function ($scope, apiService) {
    const code = $('#code').text().trim()
    $scope.isNotEditing = true

    apiService.getRoomByCode(code).then(function (res) {
        $scope.room = res.data.room
    }).catch(function (error) {
        console.log(error)
        showNotification(error.data.errorMessage, 'danger')
    })

    $scope.removeUserFromRoom = () => {
        apiService.removeUserFromRoom($scope.room._id).then(function (res){
            showNotification(res.data.message, 'success')
            setTimeout(() => {
                window.location.reload()
            }, 1500);
        }).catch(function (error){
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
}])
