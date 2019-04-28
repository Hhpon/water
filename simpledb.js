let mongoose = require('mongoose');

let env = process.env.NODE_ENV || 'development'
let dbUrl = 'mongodb://127.0.0.1:20811/water'
// 开发环境连接测试使用的 MongoDB 服务器
if (env === 'development') {
    dbUrl = 'mongodb://127.0.0.1/water'
}

mongoose.connect(dbUrl, { useNewUrlParser: true })  //连接数据库//连接数据库

const articleSchema = new mongoose.Schema({  //schema
    nickName: String,
    avatarUrl: String,
    userInfo: Object,
    openId: String,
    session_key: String
})

module.exports = mongoose.model('simplearticle', articleSchema);  // model