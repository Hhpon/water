let mongoose = require('mongoose');

let env = process.env.NODE_ENV || 'development'
let dbUrl = 'mongodb://127.0.0.1:20811/water'
// 开发环境连接测试使用的 MongoDB 服务器
if (env === 'development') {
    dbUrl = 'mongodb://127.0.0.1/water'
}

mongoose.connect(dbUrl, { useNewUrlParser: true })  //连接数据库

const articleSchema = new mongoose.Schema({  //schema
    avatarUrl: Object,
    nickName: Object,
    time: String,
    local: Object,
    num: String,
    openId: String,
    down: Number
})

module.exports = mongoose.model('article', articleSchema);  // model