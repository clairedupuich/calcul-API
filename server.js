// 服务器入口和配置中心. 角色定位：这是应用的"大门"和"总指挥"，负责接收所有请求并分发给相应的处理模块。

// 这三个命令是 Express 应用的基础模板代码，在绝大多数 Express 项目中都是固定不变的。
// 导入 Express 模块
const express = require('express')
const path = require('path')//导入 Node.js 内置的 path 模块
const app = express(); //创建 Express 应用实例

// ⭐ AJOUT: Importer le module CORS / 添加CORS模块 CORS模块的作用是：让浏览器允许网页从不同的域名（或端口）访问你的API接口。
const cors = require('cors');

// 导入路由配置：从当前文件所在目录的 ./api/routes.js（或 ./api/routes/index.js）文件中，导入一个已经配置好的路由对象（通常是一个 Express.Router 实例），
// 并将其赋值给本地变量 api_router，以便在当前文件中使用。
const api_router = require('./api/routes')

// ⭐ AJOUT: Utiliser CORS middleware / 使用CORS中间件
app.use(cors()); // Autoriser toutes les origines / 允许所有来源
// Ou pour plus de sécurité / 或者为了更安全:
// app.use(cors({
//   origin: 'http://localhost:3000' // Autoriser seulement localhost / 只允许localhost
// }));


// app.use(express.json()) 的作用是：解析传入请求中格式为 JSON 的请求体（Body），并将解析出的数据放到 req.body 属性上，这样你的代码就可以直接使用了。
// 没有这个命令的话，客户端发送的 JSON 数据无法被读取
app.use(express.json());
app.use("/api", api_router);

// 提供静态文件服务
// 'public' est 我们刚刚创建的平级文件夹名字
app.use(express.static(path.join(__dirname, 'public 2_prof')))

//  启动服务器
app.listen(3000, () => {
    console.log("Serveur lancé sur http://localhost:3000");    
})

// ⭐ AJOUT: Gestion des routes non trouvées / 添加未找到路由的处理
app.use((req, res) => {
    res.status(404).json({ erreur: "Route non trouvée / 路由未找到" });
});
