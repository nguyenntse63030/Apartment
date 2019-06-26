const mongoose = require('mongoose')
const responseStatus = require('../../../configs/responseStatus')
const common = require('../../common') 
const News = mongoose.model('News')


async function createNews(data) {
    let news = await News.findOne({ code: data.code })   //Tìm trong database theo code

    if (news) {
        //Nếu người dùng đã tồn tại
        //Thống báo về phía client một message
        throw responseStatus.Code400({ errorMessage: responseStatus.NEWS_EXISTED })
    }

    //Đổ data vào News
    news = new News()
    
    news.title = data.title || ''
    news.description = data.description || ''
    news.contentDetail = data.contentDetail || ''
    news.dateOfNews = data.dateOfNews || ''
    news.image = data.image || 0

    let newsCode = ''
    // User Code 
    news.title.split(' ').forEach(function (element) {
        if (element.match(/[a-z]/i)) {
            let str = common.changeAlias(element).toUpperCase()
            newsCode += str[0]
        }
    })
    newsCode += '-' + Date.now().toString().slice(9)
    news.code = newsCode

    news = await news.save()       //Lưu news xuống database

    return responseStatus.Code200({ message: responseStatus.CREATE_NEWS_SUCCESS, news: news })
}

async function getNews(){
    let news = await News.find().sort({createdTime: -1})
    return responseStatus.Code200({ listNews: news })
}
module.exports = {
    createNews,
    getNews,
}