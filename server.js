let express = require("express");
let bodyParser  = require("body-parser");
let router = require('./router/router')

let app = express();
app.use(express.static("html"));//关键是这一句，我的目录是html的目录
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/myUrl',router)

app.listen(8082, ()=>{
    console.log("localhost:8082服务启动成功。");
})
