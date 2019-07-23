
var app = angular.module('SWD391')
app.controller('detailController', ['$scope', 'apiService', function ($scope, apiService) {
    $scope.customer = {
        note: ' '
    }
    const code = $('#code').text().trim()
    $scope.isNotEditing = true
    $scope.apartments = []

    apiService.getUser(code).then(function (res) {
        $scope.customer = res.data.user
        $scope.getRoomForUser($scope.customer._id)
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

    $scope.editProfile = () => {
        $scope.customer.dateOfBirth = getTimestampFromDatePicker($('#birthdate'))
        apiService.updateUser($scope.customer._id, $scope.customer).then(function (res) {
            showNotification(res.data.message, 'success')
            setTimeout(() => {
                window.location.reload()
                
            }, 1000);
        }).catch(function (res) {
            console.log(res.data.errorMessage)
            showNotification(res.data.errorMessage, 'danger')
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

    $scope.getRoomForUser = (userId) => {
        apiService.getRoomForUser(userId).then(function(res){
            $scope.rooms = res.data.listRoom
            setTimeout(() => {
                initRoomsDatatable()
            }, 200);
        }).catch(function(error){
            console.log(error)
            showNotification(error.data.errorMessage, 'danger')
        })

    }

    function initRoomsDatatable() {
        roomsTable = $('#rooms-table').DataTable({
            retrieve: true,
            aLengthMenu: [
                [10, 20, 50, -1],
                [10, 20, 50, 'Tất cả']
            ],
            iDisplayLength: 20,
            language: {
                decimal: '.',
                thousands: ',',
                url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/English.json'
            },
            search: {
                caseInsensitive: true
            },
            // aaSorting: [2, 'desc'],
            order: [2, 'desc'],
            columnDefs: [{
                // targets: [0],
                // sortable: false
            }],
            aaSorting: []
        })
    }
}])
