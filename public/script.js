
console.log("Calculatrice - Connectée à l'API"); 
// 计算器 - 已连接到API

// Récupération des éléments du DOM / 获取DOM元素
const form = document.getElementById("formulaire");
const num1 = document.getElementById("nb1");
const num2 = document.getElementById("nb2");
const operator = document.getElementById("operator"); //select单选框位置
const result = document.getElementById("resultat"); //下方的结果显示处

// ⭐ AJOUT: Fonction pour tester la connexion API / 添加测试API连接的函数
async function testApiConnection() {
    try {
        console.log("🔍 Test de connexion à l'API... / 测试API连接...");
        const response = await fetch('/api/test');
        if (response.ok) {
            const data = await response.json();
            console.log("✅ Test API réussi:", data);
            // ✅ API测试成功
            return true;
        } else {
            console.error("❌ Test API échoué:", response.status);
            // ❌ API测试失败
            return false;
        }
    } catch (error) {
        console.error("❌ Erreur de connexion API:", error);
        // ❌ API连接错误
        return false;
    }
}

// Tester la connexion au chargement / 加载时测试连接
testApiConnection();

// Fonctions locales pour le calcul côté client / 本地计算函数（备用方案）
function addition(a, b) {
  return a + b;
}

function soustraction(a, b) {
  return a - b;
}

function multiplication(a, b) {
  return a * b;
}

function division(a, b) {
  if (b == 0) {
    return "Division par 0 impossible !";
  } else {
    return a / b;
  }
}

function puissance(a, b) {
  return a ** b;
}

// Fonction pour mapper les opérateurs aux endpoints API / 将操作符映射到API端点
// 点. 它根据传入的运算符（例如 '+', '-', '*', '/', '**'）返回对应的 API 接口路径。
function getApiEndpoint(operateur) {
  const endpointMap = {
    '+': '/addition',
    '-': '/soustraction', 
    '*': '/multiplication',
    '/': '/division',
    '**': '/puissance'
  };
  return endpointMap[operateur] || '/addition';   // 如果查不到就使用默认值 '/addition'
}

// ⭐ AMÉLIORATION: Fonction améliorée pour appeler l'API backend / 改进的后端API调用函数
async function callApi(endpoint, num1, num2) {
  try {
    console.log(`📡 Appel API: ${endpoint} avec ${num1} et ${num2}`);
    // 📡 API调用: ${endpoint} 使用 ${num1} 和 ${num2}
    
    const response = await fetch(`/api${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        num1: num1,
        num2: num2
      })
    });

    console.log(`📨 Statut de réponse: ${response.status}`);
    // 📨 响应状态: ${response.status}

    // Vérifier si la réponse est OK / 检查响应是否正常
    if (!response.ok) {
      let errorMessage = `Erreur HTTP: ${response.status}`;
      // 错误消息: HTTP错误: ${response.status}
      
      try {
        const errorData = await response.json();
        errorMessage = errorData.erreur || errorMessage;
      } catch (parseError) {
        // Si la réponse n'est pas du JSON / 如果响应不是JSON格式
        const errorText = await response.text();
        errorMessage = errorText || errorMessage;
      }
      
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log("✅ Réponse API reçue:", data);
    // ✅ API响应已接收
    return data.resultat;

  } catch (error) {
    console.error("❌ Erreur API:", error);
    // ❌ API错误
    throw error;
  }
}

// ⭐ AMÉLIORATION: Gestionnaire d'événement amélioré / 改进的事件处理程序
form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Empêcher le rechargement de la page / 阻止页面刷新

  // Récupération et validation des valeurs / 获取并验证输入值
  const a = parseFloat(num1.value); // Utiliser parseFloat pour les nombres décimaux / 使用parseFloat支持小数
  const b = parseFloat(num2.value);
  const op = operator.value;

  // Validation des entrées / 输入验证
  if (isNaN(a) || isNaN(b)) {
    result.textContent = "Veuillez entrer des nombres valides";
    // 请输入有效的数字
    result.style.color = "red";
    return;
  }

  // Validation spécifique pour la division / 除法的特殊验证
  if (op === '/' && b === 0) {
    result.textContent = "Division par zéro impossible !";
    // 不能除以零！
    result.style.color = "red";
    return;
  }

  // Afficher "Calcul en cours..." / 显示"计算中..."
  result.textContent = "Calcul en cours...";
  result.style.color = "blue";

  // Désactiver le bouton pendant le calcul / 计算期间禁用按钮
  const submitButton = form.querySelector('button[type="submit"]');
  const originalButtonText = submitButton.textContent;
  submitButton.textContent = "Calcul...";
  submitButton.disabled = true;

  try {
    let resultat;
    const endpoint = getApiEndpoint(op);

    console.log(`🔍 Tentative d'appel API: /api${endpoint}`, { num1: a, num2: b });
    // 🔍 尝试调用API: /api${endpoint}

    // Essayer d'abord l'API backend / 首先尝试后端API
    try {
      resultat = await callApi(endpoint, a, b);
      console.log("🎯 Résultat de l'API:", resultat);
      // 🎯 API结果
    } catch (apiError) {
      console.warn("⚠️ API échouée, utilisation du calcul local:", apiError.message);
      // ⚠️ API失败，使用本地计算: ${apiError.message}
      
      // Fallback vers le calcul local / 回退到本地计算
      switch(op) {
        case "+":
          resultat = addition(a, b);
          break;
        case "-":
          resultat = soustraction(a, b);
          break;
        case "*":
          resultat = multiplication(a, b);
          break;
        case "/":
          resultat = division(a, b);
          break;
        case "**":
          resultat = puissance(a, b);
          break;
        default:
          resultat = "Opérateur non reconnu";
          // 无法识别的操作符
      }
      
      console.log("🔄 Résultat local:", resultat);
      // 🔄 本地结果
    }

    // Formater le résultat pour l'affichage / 格式化结果显示
    let resultatAffiche = resultat;
    if (typeof resultat === 'number') {
      // Éviter les nombres avec trop de décimales / 避免过多小数位
      resultatAffiche = parseFloat(resultat.toFixed(8));
      
      // Gérer les très grands/petits nombres / 处理非常大/小的数字
      if (Math.abs(resultat) > 1e10 || (Math.abs(resultat) < 1e-6 && resultat !== 0)) {
        resultatAffiche = resultat.toExponential(4);
      }
    }

    // Afficher le résultat / 显示结果
    result.textContent = `Résultat : ${resultatAffiche}`;
    // 结果: ${resultatAffiche}
    result.style.color = "green";

    // Log pour le débogage / 调试日志
    console.log(`📊 Calcul: ${a} ${op} ${b} = ${resultat}`);
    // 📊 计算: ${a} ${op} ${b} = ${resultat}

  } catch (error) {
    // Gestion des erreurs générales / 通用错误处理
    console.error("💥 Erreur générale:", error);
    // 💥 通用错误
    result.textContent = `Erreur: ${error.message}`;
    // 错误: ${error.message}
    result.style.color = "red";
  } finally {
    // Réactiver le bouton dans tous les cas / 无论如何都重新启用按钮
    submitButton.textContent = originalButtonText;
    submitButton.disabled = false;
  }
});

// Fonction utilitaire pour vider le formulaire / 清空表单的实用函数
function clearForm() {
  form.reset();
  result.textContent = "Résultat : __";
  // 结果: __
  result.style.color = "black";
  console.log("🧹 Formulaire vidé");
  // 🧹 表单已清空
}

// Ajouter un bouton de réinitialisation / 添加重置按钮
const clearButton = document.createElement('button');
clearButton.textContent = 'Nouveau Calcul';
// 新的计算
clearButton.type = 'button';
clearButton.style.marginLeft = '10px';
clearButton.style.backgroundColor = '#6c757d';
clearButton.style.padding = '10px 15px';
clearButton.style.fontSize = '16px';
clearButton.style.border = 'none';
clearButton.style.borderRadius = '5px';
clearButton.style.color = 'white';
clearButton.style.cursor = 'pointer';

clearButton.addEventListener('click', clearForm);
form.appendChild(clearButton);

// Raccourci clavier: Enter pour soumettre / 键盘快捷键: Enter提交
document.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    form.dispatchEvent(new Event('submit'));
  }
});

// ⭐ AJOUT: Gestionnaire d'erreur global pour attraper les erreurs non gérées / 添加全局错误处理
window.addEventListener('error', (e) => {
  console.error('💥 Erreur globale attrapée:', e.error);
  // 💥 捕获的全局错误
});

console.log("✅ Script initialisé avec succès!");
// ✅ 脚本初始化成功!
console.log("📝 Fonctionnalités: API backend + fallback local + gestion d'erreurs");
// 📝 功能: 后端API + 本地备用 + 错误处理