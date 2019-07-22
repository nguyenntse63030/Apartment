var app = angular.module('SWD391')
app.controller('listController', ['$scope', 'apiService', function ($scope, apiService) {

    $scope.deleteNewsId = ''

    apiService.getNews().then(function (res) {
        $scope.news = res.data.listNews
        setTimeout(() => {
            initNewsDatatable()
        }, 200);
    }).catch(function (error) {
        console.log(error)
        showNotification(error.data.errorMessage, 'danger')
    })

    $scope.deleteNews = () => {
        apiService.deleteNews($scope.deleteNewsId).then(function (res) {
            showNotification(res.data.message, 'success')
            setTimeout(() => {
                window.location.reload()
            }, 1000);
        }).catch(function (error) {
            console.log(error)
        })
    }

    function initNewsDatatable() {
        newsTable = $('#news-table').DataTable({
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

    $scope.setDeleteNews = (newsId) => {
        $scope.deleteNewsId = newsId
    }

}])
