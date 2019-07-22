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

    gender: {
        MALE: 'Male',
        FEMALE: 'Female'
    },

    billTypes: {
        ELECTRICITY: 'Electricity',
        WATER: 'Water',
        SERVICE: 'Service'
    },

    billStatus: {
        UNPAID: 'UNPAID',
        PAID: 'PAID'
    },

    newsTypes: {
        ANNOUNCEMENT: 'Announcement',
        LIFE_AND_SOCIETY: 'Life And Society',
        EVENT: 'Event'
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

function getTimestampFromDatePicker(selector) {
    var str = $(selector).datepicker({ dateFormat: 'dd/mm/yy' }).val()
    str = str.split('/')
    var year = parseInt(str[2])
    var month = parseInt(str[1]) - 1
    var day = parseInt(str[0])
    return new Date(year, month, day).getTime()
}

function numberFormat() {
    (function ($, undefined) {
        'use strict'
        $(function () {
            $('.numberInput').on('keyup', function (event) {
                var $this = $(this)
                var input = $this.val()
                var input = input.replace(/[\D\s\._\-]+/g, '')
                $this.val(function () {
                    return input.toLocaleString('en-US')
                })
            })
        })
    })(jQuery)
}

function currencyFormat() {
    (function ($, undefined) {
        'use strict'

        // When ready.
        $(function () {
            $('.currencyInput').on('keyup', function (event) {
                // When user select text in the document, also abort.
                var selection = window.getSelection().toString()
                if (selection !== '') {
                    return
                }

                // When the arrow keys are pressed, abort.
                if ($.inArray(event.keyCode, [38, 40, 37, 39]) !== -1) {
                    return
                }

                var $this = $(this)

                // Get the value.
                var input = $this.val()

                input = input.replace(/[^0-9-]/g, '').replace(/(?!^)-/g, '') // https://stackoverflow.com/a/43670484
                if (!input) {
                    return $this.val('')
                }
                input = isNaN(input) ? input : parseInt(input, 10)
                $this.val(function () {
                    return input.toLocaleString('en-US')
                })
            })

            /**
               * ==================================
               * When Form Submitted
               * ==================================
               */
            $('form').on('submit', function (event) {
                var $this = $(this)
                var arr = $this.serializeArray()

                for (var i = 0; i < arr.length; i++) {
                    arr[i].value = arr[i].value.replace(/[($)\s\._\-]+/g, '') // Sanitize the values.
                };

                event.preventDefault()
            })
        })
    })(jQuery)
}

function change_alias(str) {
    if (!str) return ''
    str = str.toLowerCase().trim()
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
    str = str.replace(/đ/g, 'd')
    return str
}

function parseNumberToMoney(number) {
    if (!number) return 0
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

function parseMoneyToNumber(money) {
    if (!money) return 0
    return parseInt(money.toString().replace(/,/g, ''))
}