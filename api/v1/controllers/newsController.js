const mongoose = require('mongoose')
const responseStatus = require('../../../configs/responseStatus')
const common = require('../../common')
const News = mongoose.model('News')
const AWS = require('aws-sdk');
const constant = require('../../../configs/constant')
const config = require('../../../config')

const s3 = new AWS.S3({
    accessKeyId: config.AWS.ACCESS_KEY_ID,
    secretAccessKey: config.AWS.SECRETT_KEY
});

async function createNews(data) {

    //Đổ data vào News
    news = new News()

    news.title = data.title || ''
    news.type = data.type || constant.newsTypes.ANNOUNCEMENT
    news.content = data.content || ''
    news.photoURL = data.photoURL || ''
    news.expiredDate = data.expiredDate || new Date().getTime()

    let newsCode = ''
    news.title.split(' ').forEach(function(element) {
        if (element.match(/[a-z]/i)) {
            let str = common.changeAlias(element).toUpperCase()
            newsCode += str[0]
        }
    })
    newsCode += '-' + Date.now().toString().slice(9)
    news.code = newsCode

    news = await news.save() //Lưu news xuống database

    return responseStatus.Code200({ message: responseStatus.CREATE_NEWS_SUCCESS, news: news })
}

async function uploadNewsImage(newsID, fileName, fileType) {
    let news = await News.findById(newsID)
    if (!news) {
        throw responseStatus.Code400({ errorMessage: responseStatus.UPLOAD_IMAGE_FAILD })
    }

    var url = s3.getSignedUrl('putObject', {
        Bucket: 'prc391-bucket',
        Key: 'News/' + fileName,
        ACL: "public-read",
        ContentType: fileType
    });

    news.photoURL = url.slice(0, url.indexOf('?'))
    await news.save()

    return responseStatus.Code200({ message: responseStatus.UPLOAD_IMAGE_SUCCESS, url: url })
}

async function editNews(id, data) {

    let news = await News.findById(id)
    if (!news) {
        throw responseStatus.Code400({ message: responseStatus.NEWS_NOT_FOUND })
    }

    news.title = data.title || news.title
    news.type = data.type || news.type
    news.content = data.content || news.content
    news.photoURL = data.photoURL || news.photoURL
    news.expiredDate = data.expiredDate || news.expiredDate

    news = await news.save()

    return responseStatus.Code200({ message: responseStatus.UPDATE_NEWS_SUCCESS })
}

async function getNewsForMobile() {
    let now = new Date().getTime()
    let news = await News.find({ expiredDate: { $gte: now } }).sort({ createdTime: -1 })
    return responseStatus.Code200({ listNews: news })
}

async function getNews() {
    let news = await News.find().sort({ createdTime: -1 })
    return responseStatus.Code200({ listNews: news })
}

async function getNewsByCode(code) {
    let news = await News.findOne({ code: code })
    if (!news) {
        throw responseStatus.Code400({ errorMessage: responseStatus.NEW_NOT_FOUND })
    }
    return responseStatus.Code200({ news: news })
}

async function deleteNewsById(id) {
    await News.findByIdAndRemove(id)
    return responseStatus.Code200({ message: responseStatus.DELETE_NEWS_SUCCESS })
}

module.exports = {
    createNews,
    getNewsForMobile,
    getNewsByCode,
    getNews,
    deleteNewsById,
    editNews,
    uploadNewsImage
}