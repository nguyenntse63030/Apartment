var app = angular.module('SWD391')
app.controller('listController', ['$scope', 'apiService', function ($scope, apiService) {

    apiService.getTransactionsForApartment().then(function (res) {
        $scope.transactions = res.data.transactions
        $scope.total = res.data.total
        setTimeout(() => {
            initTransactionsDatatable()
        }, 200);
    }).catch(function (error) {
        console.log(error)
    })

    function initTransactionsDatatable() {
        transactionsTable = $('#transactions-table').DataTable({
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
            order: [0, 'desc'],
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
