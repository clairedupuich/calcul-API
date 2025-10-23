const express = require('express');
const router = express.Router();

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
module.exports = router;