let express = require('express');  //引入 express 框架
let bodyParser = require('body-parser'); // 引入 body-parser 中间件
let Article = require('./db');
let simpleArticle = require('./simpledb'); // 引入数据库
let axios = require('axios');

let app = express();  // 把 express 实例化

app.use(bodyParser.json()); // 使用中间件

app.get('/', function (req, res) {
    res.send('你访问到了water')
})

app.post('/upArticle', function (req, res) {  // 新建的路由，以及此路由实现的功能
    Article.create({
        time: req.body.time,
        local: req.body.local,
        num: req.body.num,
        openId: req.body.openid,
        down: 0,
        nickName: req.body.nickName,
        avatarUrl: req.body.avatarUrl
    }, (err, doc) => {
        if (err) {
            res.end('no');
        } else {
            res.end('ok');
        }
    });

})

app.get('/getArticle', function (req, res) {  // 新建的路由，以及此路由实现的功能
    let list = Number(req.query.list)
    let list1 = list - 10
    Article.find({ down: 0 }, (err, doc) => {
        if (doc.length > list1) {
            res.json(doc)
        } if (doc.length <= list1) {
            res.send('ok')
        } if (err) {
            console.log(err)
        }
    }).limit(list);
})

app.get('/getArticleDown', function (req, res) {  // 新建的路由，以及此路由实现的功能
    let list = Number(req.query.list)
    let list1 = list - 10
    Article.find({ down: 1 }, (err, doc) => {
        if (doc.length > list1) {
            res.json(doc)
        } if (doc.length <= list1) {
            res.send('ok')
        } if (err) {
            console.log(err)
        }
    }).limit(list);
})

app.get('/searchTime', function (req, res) {
    let list = Number(req.query.list)
    let list1 = list - 10
    let Time = req.query.time
    Article.find({ time: Time, down: 0 }, function (err, doc) {
        if (doc.length > list1) {
            res.json(doc)
        } if (doc.length <= list1) {
            res.send('ok')
        } if (err) {
            console.log(err)
        }
    }).limit(list);
})

app.get('/searchTimeDown', function (req, res) {
    let list = Number(req.query.list)
    let list1 = list - 10
    let Time = req.query.time
    Article.find({ time: Time, down: 1 }, function (err, doc) {
        if (doc.length > list1) {
            res.json(doc)
        } if (doc.length <= list1) {
            res.send('ok')
        } if (err) {
            console.log(err)
        }
    }).limit(list);
})

app.get('/searchTimeAndNum', function (req, res) {
    let Time = req.query.time
    let Num = req.query.num
    let list = Number(req.query.list)
    let list1 = list - 10
    Article.find({ time: Time, num: Num, down: 0 }, function (err, doc) {
        if (doc.length > list1) {
            res.json(doc)
        } if (doc.length <= list1) {
            res.send('ok')
        } if (err) {
            console.log(err)
        }
    }).limit(list);
})

app.get('/searchTimeAndNumDown', function (req, res) {
    let Time = req.query.time
    let Num = req.query.num
    let list = Number(req.query.list)
    let list1 = list - 10
    Article.find({ time: Time, num: Num, down: 1 }, function (err, doc) {
        if (doc.length > list1) {
            res.json(doc)
        } if (doc.length <= list1) {
            res.send('ok')
        } if (err) {
            console.log(err)
        }
    }).limit(list);
})

app.get('/searchTimeAndLocal', function (req, res) {
    let Time = req.query.time
    let Local = req.query.local
    let list = Number(req.query.list)
    let list1 = list - 10
    Article.find({ time: Time, local: Local, down: 0 }, function (err, doc) {
        if (doc.length > list1) {
            res.json(doc)
        } if (doc.length <= list1) {
            res.send('ok')
        } if (err) {
            console.log(err)
        }
    }).limit(list);
})

app.get('/searchTimeAndLocalDown', function (req, res) {
    let Time = req.query.time
    let Local = req.query.local
    let list = Number(req.query.list)
    let list1 = list - 10
    Article.find({ time: Time, local: Local, down: 1 }, function (err, doc) {
        if (doc.length > list1) {
            res.json(doc)
        } if (doc.length <= list1) {
            res.send('ok')
        } if (err) {
            console.log(err)
        }
    }).limit(list);
})

app.get('/searchAll', function (req, res) {
    let Time = req.query.time
    let Local = req.query.local
    let Num = req.query.num
    let list = Number(req.query.list)
    let list1 = list - 10
    Article.find({ time: Time, local: Local, num: Num, down: 0 }, function (err, doc) {
        if (doc.length > list1) {
            res.json(doc)
        } if (doc.length <= list1) {
            res.send('ok')
        } if (err) {
            console.log(err)
        }
    }).limit(list);
})

app.get('/searchAllDown', function (req, res) {
    let Time = req.query.time
    let Local = req.query.local
    let Num = req.query.num
    let list = Number(req.query.list)
    let list1 = list - 10
    Article.find({ time: Time, local: Local, num: Num, down: 1 }, function (err, doc) {
        if (doc.length > list1) {
            res.json(doc)
        } if (doc.length <= list1) {
            res.send('ok')
        } if (err) {
            console.log(err)
        }
    }).limit(list);
})

app.get('/getCode', function (req, res) {
    let code = req.query.code
    axios({
        method: 'get',
        url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx3e8270aebabd42ee&secret=8f9aa220700936997dea827139c6b022&js_code=' + code + '&grant_type=authorization_code',
        data: {}
    }).then(function (response) {
        res.send(response.data)
    }).catch(function (error) {
    });
})

app.post('/upUserInfo', function (req, res) {
    simpleArticle.create({
        userInfo: req.body.userinfo,
        nickName: req.body.userinfo.nickName,
        avatarUrl: req.body.userinfo.avatarUrl,
        openId: req.body.openid,
        session_key: req.body.session_key
    }, (err, doc) => {
        if (err) {
            res.end('no')
        } else {
            res.end('ok');
        }
    });
})

app.get('/checkFlag', function (req, res) {
    let openId = req.query.openid
    simpleArticle.find({ openId: openId, flag: 1 }, function (err, doc) {
        if (doc.length !== 0) {
            res.send('ok')
        } else {
            res.send('no')
        }
    })
})

app.post('/down', function (req, res) {
    let id = req.body.id
    let down = req.body.down
    Article.updateOne({ _id: id }, { down: down }, function (err, doc) {
        if (err) {
            console.log(err);
            res.send({ code: 0 })
            return
        }
        res.send({ code: 1 })
    })
})

app.listen(3008, function () { console.log('服务器正在监听 3008 端口') });