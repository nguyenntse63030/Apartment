const apiVersion = '/api/v1'
angular.module('SWD391').factory('apiService', ['$http', function ($http) {
    return {
        getUserByRole: function (role) {
            return $http.get(apiVersion + '/user/role/' + role)
        },
        getUser: function (code) {
            return $http.get(apiVersion + '/user/' + code)
        },
        createUser: function (data) {
            return $http.post(apiVersion + '/user/', data)
        },
        updateUser: function (id, data) {
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
        getRoomForUser: function (userId) {
            return $http.get(apiVersion + '/room/userId/' + userId)
        },
        getAllRooms: function () {
            return $http.get(apiVersion + '/room/')
        },
        addRoomForUser: function (roomId, userId) {
            return $http.put(apiVersion + '/room/' + roomId + '/user/' + userId)
        },
        getAllApartment: function () {
            return $http.get(apiVersion + '/apartment/')
        },
        getApartmentByCode: function (code) {
            return $http.get(apiVersion + '/apartment/' + code)
        },
        updateApartment: function (id, data) {
            return $http.put(apiVersion + '/apartment/' + id, data)
        },
        createApartment: function (data) {
            return $http.post(apiVersion + '/apartment/', data)
        },
        getMaxRoomInFloor: function (apartmentId, floor) {
            return $http.get(apiVersion + '/room/apartment/' + apartmentId + '/floor/' + floor)
        },
        createRoomForApartment: function (apartmentId, data) {
            return $http.post(apiVersion + '/room/apartment/' + apartmentId, data)
        },
        getAllBill: function () {
            return $http.get(apiVersion + '/bill/')
        },
        createBill: function (roomId, data) {
            return $http.post(apiVersion + '/bill/room/' + roomId, data)
        },
        getBillByCode: function (code) {
            return $http.get(apiVersion + '/bill/' + code)
        },
        updateBill: function (id, data) {
            return $http.put(apiVersion + '/bill/' + id, data)
        },
        deleteBill: function (id) {
            return $http.delete(apiVersion + '/bill/' + id)
        },
        getUnitPrice: function () {
            return $http.get(apiVersion + '/unit-price/')
        },
        updateUnitPrice: function (data) {
            return $http.put(apiVersion + '/unit-price/', data)
        },
        getNews: function () {
            return $http.get(apiVersion + '/news/')
        },
        createNews: function (data) {
            return $http.post(apiVersion + '/news/', data)
        },
        getNewsByCode: function (code) {
            return $http.get(apiVersion + '/news/code/' + code)
        },
        deleteNews: function (newsId) {
            return $http.delete(apiVersion + '/news/' + newsId)
        },
        getAllTransactions: function () {
            return $http.get(apiVersion + '/transactions/')
        },
    }
}])
