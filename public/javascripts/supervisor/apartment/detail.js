var app = angular.module('SWD391')
app.controller('detailController', ['$scope', 'apiService', function ($scope, apiService) {
    const code = $('#code').text().trim()
    $scope.isNotEditing = true

    $(document).ready(function () {
        setTimeout(() => {
            $('#selected-floor').val(1).trigger('change');
        }, 2000);
    });

    apiService.getApartmentByCode(code).then(function (res) {
        $scope.apartment = res.data.apartment
        $scope.getRooms()
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

    $scope.getRooms = () => {
        apiService.getRooms($scope.apartment._id).then(function (res) {
            $scope.rooms = res.data.rooms
            setTimeout(() => {
                initRoomsDatatable()
            }, 500);
        }).catch(function (error) {
            console.log(error)
            showNotification(error.data.errorMessage, 'danger')
        })
    }

    $scope.getMaxRoomInFloor = () => {
        apiService.getMaxRoomInFloor($scope.apartment._id, $scope.selectedFloor).then(function (res) {
            $scope.roomNumber = res.data.roomNumber + 1
        }).catch(function (error) {
            console.log(error)
            showNotification(error.data.errorMessage, 'danger')
        })
    }

    $scope.createRoomForApartment = () => {
        let roomFirstNumber = parseInt($scope.roomNumber / 100)
        if (roomFirstNumber != $scope.selectedFloor) {
            return showNotification('Room Number must begin as ' + $scope.selectedFloor + '. ' + $scope.selectedFloor + 'xx')
        }
        let data = {
            roomNumber: $scope.roomNumber
        }
        apiService.createRoomForApartment($scope.apartment._id, data).then(function (res) {
            showNotification(res.data.message, 'success')
            setTimeout(() => {
                window.location.reload()
            }, 1000);
        }).catch(function (error) {
            console.log(error)
            showNotification(error.data.errorMessage, 'danger')
        })
    }

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

    function initRoomsDatatable() {
        roomsTable = $('#rooms-table').DataTable({
            retrieve: true,
            aLengthMenu: [
                [10, 20, 50, -1],
                [10, 20, 50, 'Tất cả']
            ],
            iDisplayLength: 10,
            language: {
                decimal: '.',
                thousands: ',',
                url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/English.json'
            },
            search: {
                caseInsensitive: true
            },
            // aaSorting: [4, 'desc'],
            order: [0, 'asc'],
            columnDefs: [{
                // targets: [0],
                // sortable: false
            }],
            aaSorting: []
        })
    }

    $scope.getNumber = function (num) {
        if (num) {
            let number = Number(num)
            return Array.apply(null, { length: number }).map(Number.call, Number)
        }
        return []
    }
}])
