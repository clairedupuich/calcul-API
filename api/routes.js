// HTTP 接口层. 
// 主要作用：
// 定义 RESTful API 端点
// 处理 HTTP 请求和响应
// 连接前端请求与后端逻辑
// 错误处理和状态码管理


const express = require('express'); //导入 Express 模块
const router = express.Router(); //创建一个独立的路由器实例

// 1. 导入业务逻辑
// 这条命令的作用是：从 ./calcultrice.js 文件中，只导入 addition, soustraction, multiplication, division 这四个特定的函数（或变量），
// 并直接在当前文件中创建同名的常量来使用。
const {
    addition,
    soustraction,
    multiplication,
    division,
    puissance
} = require("./calcultrice");

// creer les routes
// 2. 定义路由处理程序
router.post('/addition', (req, res) => {
    const {num1, num2} = req.body;
    return res.status(200).json({resultat: addition(num1, num2)})
})

router.post('/soustraction', (req, res) => {
    const {num1, num2} = req.body;
    return res.status(200).json({resultat: soustraction(num1, num2)})
})

router.post('/multiplication', (req, res) => {
    const {num1, num2} = req.body;
    return res.status(200).json({resultat: multiplication(num1, num2)})
})

router.post('/division', (req, res) => {
    const {num1, num2} = req.body;
    if(num2 === 0){
        return res.status(400).json({erreur:"il y a une erreur !"})
    };
    return res.status(200).json({resultat: division(num1, num2)})
})

router.post('/puissance', (req, res) => {
    const {num1, num2} = req.body;
    return res.status(200).json({resultat: puissance(num1, num2)})
})

// ⭐ AJOUT: Route de test pour vérifier que l'API fonctionne / 添加测试路由验证API工作
router.get('/test', (req, res) => {
    res.status(200).json({ 
        message: "API calculatrice fonctionne! / 计算器API工作正常!",
        timestamp: new Date().toISOString()
    });
});


//这个命令是 Node.js 的模块导出机制，它在路由文件中是必需的。
// 作用是将创建好的路由器实例"暴露"出去，让其他文件能够导入和使用它。参考第10行创建常量router.
module.exports = router;