var app = angular.module('SWD391')
app.controller('createController', ['$scope', 'apiService', function($scope, apiService) {

    $scope.chooseFile = () => {
        $('#file').click()
    }

    $scope.createNews = () => {
        if (!$('#file').val()) {
            showNotification('Bạn chưa chọn ảnh nào', 'error')
            return
        }
        $('#loading').show()

        setTimeout(function() {
            $('#loading').hide()
            $('#modal-change-avatar').modal('hide')
            showNotification('Time out', 'error')
        }, 30000)

        // let formData = new FormData()
        // formData.append('image', newAvatar)
        // $.ajax('https://api.imgbb.com/1/upload?key=' + COMMON.uploadKey, {
        //     method: 'POST',
        //     data: formData,
        //     processData: false,
        //     contentType: false,
        //     success: function(res) {
        //         $scope.news.photoURL = res.data.display_url
        //         $scope.news.expiredDate = getTimestampFromDatePicker('#expired-date')
        //         apiService.createNews($scope.news).then(function(res) {
        //             showNotification(res.data.message, 'success')
        //             setTimeout(() => {
        //                 window.location.href = '/news'
        //             }, 2000);
        //             $('#loading').hide()
        //         }).catch(function(error) {
        //             console.log(error)
        //             showNotification(error.data.errorMessage, 'danger')
        //         })
        //     },
        //     error: function(err) {
        //         showNotification(err.responseJSON.errorMessage, 'danger')
        //         err && console.log(err)
        //         $('#loading').hide()
        //     }
        // })

        apiService.createNews($scope.news).then(function(res) {
            var files = $('#file').prop('files')[0];
            var filename = Date.now()
            var contentType = files.type;
            var response = res
            $.get('/api/v1/news/upload-news-image?fileName=' + filename + '&type=' + contentType + '&newsID=' + response.data.news._id, function(res) {
                $.ajax({
                    url: res.url,
                    type: 'PUT',
                    dataType: 'html',
                    processData: false,
                    headers: { 'Content-Type': contentType },
                    crossDomain: true,
                    data: files
                }).done(function(data, textStatus, error) {
                    showNotification(response.data.message, 'success')
                    setTimeout(() => {
                        window.location.href = '/news'
                    }, 2000);
                    $('#loading').hide()
                }).fail(function(jqXHR, textStatus, errorThrown) {
                    $('#loading').hide()
                });
            });
        }).catch(function(error) {
            console.log(error)
            showNotification(error.data.errorMessage, 'danger')
        })
    }
}])

var imgtag = document.getElementById('news-image')
var newImage

onChangeImage = (event) => {
    var selectedFile = event.target.files[0]
    var getImagePath = URL.createObjectURL(event.target.files[0])
    imgtag.src = getImagePath
    newAvatar = selectedFile
}