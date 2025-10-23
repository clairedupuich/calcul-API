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
module.exports = {addition, soustraction,multiplication,division, puissance};