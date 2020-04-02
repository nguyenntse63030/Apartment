var app = angular.module('PRC391')
app.controller('listController', ['$scope', 'apiService', function ($scope, apiService) {

    apiService.getAllRooms().then(function (res) {
        $scope.rooms = res.data.rooms
        setTimeout(() => {
            initRoomsDatatable()
        }, 200);
    }).catch(function (error) {
        console.log(error)
    })

    apiService.getAllApartment().then(function (res) {
        $scope.apartments = res.data.apartments
    }).catch(function (error) {
        console.log(error)
    })

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
            order: [1, 'desc'],
            columnDefs: [{
                // targets: [0],
                // sortable: false
            }],
            aaSorting: []
        })
    }

    $scope.filterApartment = () => {
        let _table = $('#rooms-table').DataTable()
        _table.columns(2)
            .search($scope.selectedApartment)
            .draw()
    }
}])
