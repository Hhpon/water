let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/article', { useNewUrlParser: true });  //连接数据库

const articleSchema = new mongoose.Schema({  //schema
    userInfo: Object,
    openId: String,
    session_key: String
})

module.exports = mongoose.model('simplearticle', articleSchema);  // model