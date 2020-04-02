var app = angular.module('PRC391')
app.controller('listController', ['$scope', 'apiService', function ($scope, apiService) {

    apiService.getBillForApartment().then(function (res) {
        $scope.bills = res.data.bills
        setTimeout(() => {
            initBillDatatable()
        }, 200);
    }).catch(function (error) {
        console.log(error)
    })

    apiService.getAllApartment().then(function (res) {
        $scope.apartments = res.data.apartments
    }).catch(function (error) {
        console.log(error)
    })

    function initBillDatatable() {
        billTable = $('#bill-table').DataTable({
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
            order: [4, 'desc'],
            columnDefs: [{
                // targets: [0],
                // sortable: false
            }],
            aaSorting: []
        })
    }

    $scope.filterApartment = () => {
        let _table = $('#bill-table').DataTable()
        _table.columns(0)
            .search($scope.selectedApartment)
            .draw()
    }
}])
