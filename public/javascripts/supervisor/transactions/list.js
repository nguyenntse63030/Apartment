var app = angular.module('SWD391')
app.controller('listController', ['$scope', 'apiService', function ($scope, apiService) {

    function initTransactionsDatatable() {
        transactionstable = $('#transactions-table').DataTable({
            deferRender: true,
            serverSide: false,
            processing: true,
            paging: true,
            pageLength: 10,
            ajax: {
                url: '/api/v1/transactions/month',
                type: 'GET',
                dataSrc: function (response) {
                    $scope.total = response.total
                    let dataHandle = response.transactions.map(function (transaction) {
                        return {
                            createdDate: generateATag(transaction, 'createdTime'),
                            apartment: generateATag(transaction, 'apartment'),
                            roomNumber: generateATag(transaction, 'room'),
                            customer: generateATag(transaction, 'user'),
                            payment: generateATag(transaction, 'payments'),
                        }
                    })
                    return dataHandle
                },
                data: function (data) {
                    data.time = getTimestampFromDatePickerMonth('#datepicker')
                    return data
                }
            },
            columns: [
                { data: 'createdDate' },
                { data: 'apartment' },
                { data: 'roomNumber' },
                { data: 'customer' },
                { data: 'payment' },
            ],
            aLengthMenu: [
                [20, 50, 100, Number.MAX_SAFE_INTEGER],
                [20, 50, 100, 'Tất cả']
            ],
            language: {
                decimal: '.',
                thousands: ',',
                url: '//cdn.datatables.net/plug-ins/1.10.15/i18n/Vietnamese.json'
            },
            search: {
                caseInsensitive: true
            },
            order: [0, 'desc'],
        })
    }

    setTimeout(() => {
        initTransactionsDatatable()
    }, 1000);

    function generateATag(transaction, property) {
        let data = transaction[property]
        if (property === 'createdTime') {
            data = formatDate(data)
        } else if (property === 'payments') {
            data = parseNumberToMoney(data)
        } else if (property === 'apartment' || property === 'user') {
            data = data.name
        } else if (property === 'room') {
            data = data.roomNumber
        }
        let result = '<a href="' + transaction.code + '">' + data + '</a>'
        return result
    }

    $scope.reloadData = () => {
        transactionstable.ajax.reload()
    }
}])
