
var app = angular.module('PRC391')
app.controller('listController', ['$scope', 'apiService', function ($scope, apiService) {

    $scope.user = 'Customer'

    let check = false

    apiService.getCustomerForApartment().then(function (res) {
        $scope.customers = res.data.customers
        setTimeout(() => {
            initCustomersDatatable()
        }, 200);
    }).catch(function (error) {
        console.log(error)
        showNotification(error.data.errorMessage, 'danger')
    })

    $scope.getAllCustomer = () => {
        if (!check) {
            check = true
            apiService.getUserByRole(COMMON.userRole.CUSTOMER).then(function (res) {
                $scope.customersAll = res.data.listUser
                setTimeout(() => {
                    initCustomersAllDatatable()
                }, 200);
            }).catch(function (error) {
                console.log(error)
                showNotification(error.data.errorMessage, 'danger')
            })
        }
    }

    function initCustomersDatatable() {
        customerTable = $('#customer-list-table').DataTable({
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

    function initCustomersAllDatatable() {
        customerAllTable = $('#customer-all-list-table').DataTable({
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
