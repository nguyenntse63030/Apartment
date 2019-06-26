const COMMON = {
    setCookie: function (cname, cvalue, exdays) {
        var d = new Date()
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
        var expires = 'expires=' + d.toUTCString()
        document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
    },
    getCookie: function (cname) {
        var name = cname + '='
        var decodedCookie = decodeURIComponent(document.cookie)
        var ca = decodedCookie.split(';')
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i]
            while (c.charAt(0) == ' ') {
                c = c.substring(1)
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length)
            }
        }
        return ''
    },

    userRole: {
        CUSTOMER: 'Customer',
        MANAGER: 'Manager',
        SUPERVISOR: 'Supervisor'
    },

    uploadKey: 'c940089d6e1e3588e2db9c277d519696'
}

function showNotification(message, type) { // type: ['success', 'danger']
    $.notify({
        icon: type === 'success' ? 'check' : 'close',
        message: message
    }, {
            type: type,
            z_index: 2000,
            timer: 4000,
            placement: {
                from: 'top',
                align: 'right'
            }
        })
}

function showModalChangeAvatar() {
    $('#modal-change-avatar').modal('show')
}
