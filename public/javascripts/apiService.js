const apiVersion = '/api/v1'
angular.module('SWD391').factory('apiService', ['$http', function ($http) {
    return {
        getUserByRole: function (role) {
            return $http.get(apiVersion + '/user/role/' + role)
        },
        getUser: function (code) {
            return $http.get(apiVersion + '/user/' + code)
        },
        updateUser: function (id,data) {
            return $http.put(apiVersion + '/user/' + id, data)
        },
        getApartments: function () {
            return $http.get(apiVersion + '/apartment')
        },
        changeAvatar: function (userCode, data) {
            return $http.put(apiVersion + '/user/changeAvatar/' + userCode, data)
        },
        getRooms: function (apartmentId) {
            return $http.get(apiVersion + '/room/apartment/' + apartmentId)
        },
        getRoomByCode: function (roomCode) {
            return $http.get(apiVersion + '/room/code/' + roomCode)
        },
        getAllRooms: function () {
            return $http.get(apiVersion + '/room/')
        },
        addRoomForUser: function (roomId, userId) {
            return $http.put(apiVersion + '/room/' + roomId + '/user/' + userId)
        },
        getAllApartment: function(){
            return $http.get(apiVersion + '/apartment/')
        },
        getApartmentByCode: function(code){
            return $http.get(apiVersion + '/apartment/' + code)
        },
        updateApartment: function(id, data){
            return $http.put(apiVersion + '/apartment/' + id, data)
        }
    }
}])
