function initialiser_calc(id) {
    document.getElementById(id + '_resultat').value = '';
}

// Ajoute un chiffre ou symbole à l'écran
function add_calc(id, val) {
    const ecran = document.getElementById(id + '_resultat');
    ecran.value += val;
}

// Gère les actions CE, ←, ±, = et opérateurs
function f_calc(id, action) {
    let ecran = document.getElementById(id + '_resultat');
    let contenu = ecran.value;

    switch (action) {
        case 'ce':
            ecran.value = '';
            break;

        case 'nbs':
            ecran.value = contenu.slice(0, -1);
            break;

        case '+-':
            if (contenu) {
                ecran.value = contenu.startsWith('-') ? contenu.slice(1) : '-' + contenu;
            }
            break;

        case '=':
            try {
                const expression = contenu.replace(/,/g, '.');
                const resultat = calculerExpression(expression);
                ecran.value = resultat;
            } catch (err) {
                ecran.value = 'Erreur';
            }
            break;

        default:
            ecran.value += action;
            break;
    }
}

// Gère les entrées clavier
function key_detect_calc(id, event) {
    const key = event.key;

    if (!isNaN(key) || ['+', '-', '*', '/', '.', ',', '%', '(', ')'].includes(key)) {
        add_calc(id, key === ',' ? '.' : key);
    } else {
        switch (key) {
            case 'Enter':
                f_calc(id, '=');
                break;
            case 'Backspace':
                f_calc(id, 'nbs');
                break;
            case 'Escape':
                f_calc(id, 'ce');
                break;
        }
    }
}

// Calcule une expression mathématique de manière sécurisée
function calculerExpression(expr) {
    // Filtrage des caractères autorisés
    if (!/^[0-9+\-*/%.() ]+$/.test(expr)) {
        throw new Error("Expression non valide");
    }

    // Calcul sécurisé via Function
    const safeEval = new Function("return " + expr);
    return Number(safeEval().toFixed(10)); // Limite les erreurs de précision
}
