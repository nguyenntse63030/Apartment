
var app = angular.module('SWD391')
app.controller('listController', ['$scope', 'apiService', function ($scope, apiService) {
    apiService.getCustomers(COMMON.userRole.CUSTOMER).then(function (res) {
        $scope.customers = res.data.listUser
        setTimeout(() => {
            initCustomersDatatable()
        }, 200);
    }).catch(function (error) {
        console.log(error)
    })

    function initCustomersDatatable() {
        customerTable = $('#user-list-table').DataTable({
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
            // aaSorting: [4, 'desc'],
            order: [4, 'desc'],
            columnDefs: [{
                // targets: [0],
                // sortable: false
            }],
            aaSorting: []
        })
    }
}])
