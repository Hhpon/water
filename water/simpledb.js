let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:20811/water', { useNewUrlParser: true });  //连接数据库

const articleSchema = new mongoose.Schema({  //schema
    nickName: String,
    avatarUrl: String,
    userInfo: Object,
    openId: String,
    session_key: String
})

module.exports = mongoose.model('simplearticle', articleSchema);  // model