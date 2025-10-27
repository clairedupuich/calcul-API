console.log("salut");
//定义后台运算函数 从postman上可以显示
async function addition(a, b) {
  const response = await fetch("http://localhost:3000/api/addition", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ num1: a, num2: b }),
  });
 
  return response.json();
}
async function soustraction(a, b) {
  const response = await fetch("http://localhost:3000/api/soustraction", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ num1: a, num2: b }), //JSON.stringify()方法将一个JavaScript 对象或值转换为JSON 字符串
  });
  return response.json();
}

async function multiplication(a, b) {
  const response = await fetch("http://localhost:3000/api/multiplication", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ num1: a, num2: b }),
  });
  return response.json();
}
async function division(a, b) {
  const response = await fetch("http://localhost:3000/api/division", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ num1: a, num2: b }),
  });
  return response.json();
}
async function puissance(a, b) {
  const response = await fetch("http://localhost:3000/api/puissance", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ num1: a, num2: b }),
  });
  return response.json();
}


const formulaire = document.getElementById("calcForm");



formulaire.addEventListener("submit" , async (e) => {
    e.preventDefault();
    // console.log("Formulaire submit");
    const num1 = Number(document.getElementById("num1").value);
    const num2 = Number(document.getElementById("num2").value);
    operator = document.getElementById("operator").value;
    
    let data;

    if (operator === "+"){
        data = await addition(num1,num2);
    }else if(operator === "-"){
        data = await soustraction(num1,num2);
    }else if(operator === "*"){
        data = await multiplication(num1,num2);
    }else if(operator === "/"){
        data = await division(num1,num2);
    }else if (operator === "**"){
        data = await puissance(num1,num2);
    }
    
    console.log(data);
    const resultat = document.getElementById("resultat");
    if(data.resultat !== undefined){
        // resultat.textContent = "resultat : " + data.resultat;
        // resultat.style.color = "green";
        resultat.innerHTML = "Résultat : <span style='color: green'>" + data.resultat + "</span>";
        resultat.style.color = "black";
    }else{
        resultat.textContent = data.erreur;
        resultat.style.color = "red";
    }
     
     
    
})
