// 业务逻辑核心
// 主要作用：
// 实现具体的数学运算逻辑
// 封装可重用的纯函数
// 提供运算功能的 API


// 纯粹的数学运算函数（无 HTTP 相关代码）
function addition(a, b) {
    return a + b;
}

function soustraction(a, b) {
    return a - b};

function multiplication(a, b) {
    return a * b;
}

function division(a, b) {
    if (b === 0) {
        return "divison par 0 est pas possicible !"
    }
    return a / b};

function puissance(a, b) {
    return a**b;
}

// 输出上述四个函数
// 暴露函数供其他模块使用
module.exports = {addition, soustraction,multiplication,division, puissance};