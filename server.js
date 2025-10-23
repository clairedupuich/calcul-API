const express = require('express')
const path = require('path')
const app = express();

// 这条命令的作用是：从当前文件所在目录的 ./api/routes.js（或 ./api/routes/index.js）文件中，导入一个已经配置好的路由对象（通常是一个 Express.Router 实例），
// 并将其赋值给本地变量 api_router，以便在当前文件中使用。
const api_router = require('./api/routes')

// app.use(express.json()) 的作用是：解析传入请求中格式为 JSON 的请求体（Body），并将解析出的数据放到 req.body 属性上，这样你的代码就可以直接使用了。
// 没有这个命令的话，客户端发送的 JSON 数据无法被读取
app.use(express.json());
app.use("/api", api_router);
// 'public' est 我们刚刚创建的平级文件夹名字
app.use(express.static(path.join(__dirname, 'public')))
app.listen(3000, () => {
    console.log("Serveur lancé sur http://localhost:3000");    
})
