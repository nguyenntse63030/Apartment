const apiVersion = '/api/v1'
angular.module('SWD391').factory('apiService', ['$http', function ($http) {
    return {
        getCustomers: function (role) {
            return $http.get(apiVersion + '/user/role/' + role)
        },
    }
}])
