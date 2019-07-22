
var app = angular.module('SWD391')
app.controller('detailController', ['$scope', 'apiService', function ($scope, apiService) {
    const code = $('#code').text().trim()
    $scope.isNotEditing = true

    apiService.getNewsByCode(code).then(function (res) {
        $scope.news = res.data.news
    }).catch(function (error) {
        console.log(error)
        showNotification(error.data.errorMessage, 'danger')
    })

}])
