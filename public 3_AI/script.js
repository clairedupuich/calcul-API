// URL de base de l'API - même serveur que la page web
const API_BASE = '/api';

// Historique des calculs
let calculationHistory = [];

// Fonction principale pour effectuer les calculs
async function calculate(operation) {
    // Récupérer les valeurs des inputs
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    
    // Validation des inputs
    if (isNaN(num1) || isNaN(num2)) {
        showResult('Veuillez entrer deux nombres valides', true);
        return;
    }
    
    // Préparer les données pour l'API
    const requestData = {
        num1: num1,
        num2: num2
    };
    
    try {
        // Afficher "Calcul en cours..."
        showResult('Calcul en cours...', false);
        
        // Envoyer la requête à l'API
        const response = await fetch(`${API_BASE}/${operation}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData)
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            // Gestion des erreurs de l'API
            throw new Error(data.erreur || 'Erreur lors du calcul');
        }
        
        // Afficher le résultat
        const result = data.resultat;
        const operationSymbol = getOperationSymbol(operation);
        
        showResult(result);
        addToHistory(num1, num2, operationSymbol, result);
        
    } catch (error) {
        // Gestion des erreurs réseau ou autres
        showResult(`Erreur: ${error.message}`, true);
    }
}

// Fonction pour afficher le résultat
function showResult(result, isError = false) {
    const resultElement = document.getElementById('resultValue');
    const resultContainer = document.getElementById('result');
    
    resultElement.textContent = result;
    
    // Changer le style en cas d'erreur
    if (isError) {
        resultContainer.style.borderLeftColor = '#e74c3c';
        resultElement.classList.add('error');
        resultElement.classList.remove('success');
    } else {
        resultContainer.style.borderLeftColor = '#27ae60';
        resultElement.classList.add('success');
        resultElement.classList.remove('error');
    }
}

// Fonction pour obtenir le symbole de l'opération
function getOperationSymbol(operation) {
    const symbols = {
        'addition': '+',
        'soustraction': '-',
        'multiplication': '×',
        'division': '÷',
        'puissance': '^'
    };
    return symbols[operation] || operation;
}

// Fonction pour ajouter un calcul à l'historique
function addToHistory(num1, num2, operation, result) {
    const historyItem = {
        num1: num1,
        num2: num2,
        operation: operation,
        result: result,
        timestamp: new Date().toLocaleTimeString()
    };
    
    calculationHistory.unshift(historyItem); // Ajouter au début
    
    // Garder seulement les 10 derniers calculs
    if (calculationHistory.length > 10) {
        calculationHistory = calculationHistory.slice(0, 10);
    }
    
    updateHistoryDisplay();
}

// Fonction pour mettre à jour l'affichage de l'historique
function updateHistoryDisplay() {
    const historyList = document.getElementById('historyList');
    
    if (calculationHistory.length === 0) {
        historyList.innerHTML = '<li style="text-align: center; color: #666;">Aucun calcul effectué</li>';
        return;
    }
    
    historyList.innerHTML = calculationHistory.map(item => 
        `<li>
            <strong>${item.num1} ${item.operation} ${item.num2}</strong> 
            = ${item.result}
            <span style="float: right; color: #666; font-size: 0.8em;">${item.timestamp}</span>
        </li>`
    ).join('');
}

// Fonction pour vider les champs et résultats
function clearCalculator() {
    document.getElementById('num1').value = '';
    document.getElementById('num2').value = '';
    showResult('-', false);
}

// Fonction pour utiliser le résultat précédent comme premier nombre
function usePreviousResult() {
    if (calculationHistory.length > 0) {
        const lastResult = calculationHistory[0].result;
        document.getElementById('num1').value = lastResult;
    }
}

// Raccourcis clavier
document.addEventListener('keypress', function(event) {
    // Enter pour calculer avec la dernière opération
    if (event.key === 'Enter') {
        const buttons = document.querySelectorAll('.buttons button');
        if (buttons.length > 0) {
            buttons[0].click(); // Déclenche la première opération (addition)
        }
    }
    
    // Échap pour effacer
    if (event.key === 'Escape') {
        clearCalculator();
    }
});

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    updateHistoryDisplay();
    
    // Focus sur le premier input
    document.getElementById('num1').focus();
    
    console.log('✅ Calculatrice initialisée avec succès!');
    console.log('📝 Raccourcis: Enter = Calculer, Échap = Effacer');
});