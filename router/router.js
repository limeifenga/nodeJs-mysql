var express = require('express')
var router = express.Router()
let mysql = require('mysql')
let _DB = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'nodemysql'
})
_DB.connect()

router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

router.get('/', function (req, res, next) {
    res.type('json')
    res.send({name:'home'})
    next()
})

router.post('/queryTest', (req, res, next) => {
    console.log(req.body)
    var obj = {
        age: 18,
        name: '张山'
    }
    res.send(obj)
    next()
})

router.get('/queryTest', (req, res, next) => {
    console.log(req.query)
    var obj = {
        age: 20,
        name: '张山'
    }
    res.send(obj)
    next()
})

router.get('/tiger', (req, res, next) => {
    console.log(req.query)
    var obj = {
        src: '../image/tiger2.jpg',
        name: '老虎2'
    }
    res.send(obj)
    next()
})

router.post('/login', (req, res, next) => {
    console.log(req.body)
    const body = req.body
    console.log(body.userName)
    console.log(body.userPassword)
    const SQL = `SELECT * FROM user WHERE userName = '${body.userName}' and  userPassword = '${body.userPassword}'`
    const SQLPARMAMS = []
    _DB.query(SQL, SQLPARMAMS, function (error, result, field) {    
        if(error){
          console.log('[SELECT ERROR] - ',error);
          res.send({code: 404, result: [], message: '网络错误'})
          next()
        } else {     
            console.log('登录 - ',result);
            if (result.length === 0) {
              res.send({code: 400, result: [], message: '账户密码错误'})
              next()
              return
            }
            res.send({code: 200, result: result, message: '登录成功'})
            next()
        }
    });
})

router.post('/regist', (req, res, next) => {
    console.log(req.body)
    const body = req.body
    console.log(body.userName)
    console.log(body.userPassword)
    const SQL = `SELECT * FROM user WHERE userName = '${body.userName}'`
    const SQLPARMAMS = []
    _DB.query(SQL, SQLPARMAMS, function (error, result) {    
        if(error){
          console.log('[SELECT ERROR] - ',error);
          res.send({code: 404, result: [], message: '网络错误'})
          next()
        } else {
            console.log('查询是否存在 - ',result);                     
            if (result.length === 0) {
                const SQL = `INSERT INTO user(userName, userPassword) VALUES ('${body.userName}', '${body.userPassword}')`
                const SQLPARMAMS = []
                _DB.query(SQL, SQLPARMAMS, function (error, result) {
                    if (error) {
                        console.log('[SELECT ERROR] - ',error);
                        res.send({code: 404, result: [], message: '数据错误，请重新提交'})
                        next()
                    } else {
                        console.log('注册- ',result)
                        res.send({code: 200, result: [{userName: body.userName,userPassword: body.userPassword}], message: '注册成功'})
                        next()
                    }
                })
                return   
            }
            res.send({code: 400,  message: '账户已存在'})
            next()
        }
    });
})

router.post('/userList', (req, res, next) => {
    console.log(req.body)
    const queryValue = req.body.queryValue
    let SQL = `SELECT * FROM user`
    if (queryValue) {
       SQL = `SELECT * FROM user WHERE CONCAT(userId, userName, userPassword) like '%${queryValue}%'`
    }
    const SQLPARMAMS = []
    _DB.query(SQL, SQLPARMAMS, function (error, result) {    
        if(error){
          console.log('[SELECT ERROR] - ',error);
          res.send({code: 404, result: [], message: '网络错误'})
          next()
        } else {
            console.log('查询用户列表 - ', result); 
            res.send({code: 200, result: result, message: ''})
            next()
        }
    });
})

// _DB.end();

module.exports = router