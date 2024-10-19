function botonesListener() {
    let boton = document.getElementsByClassName('div-wrapper');

    for (var i = 0; i < boton.length; i++) {
        boton[i].addEventListener("click", presion);
    }

    let botones = document.getElementsByClassName('frame-2');
    let botonesNumeros = document.getElementsByClassName('frame-3');
    let boton0 = document.querySelector('[data-value="0"]'); // Asegúrate de que el botón 0 se seleccione
    let botonRetroceso = document.querySelector('[data-value="backspace"]');
    let botonIgual = document.querySelector('[data-value="="]');

    for (let i = 0; i < botones.length; i++) {
        botones[i].addEventListener("click", presion);
    }

    for (let i = 0; i < botonesNumeros.length; i++) {
        botonesNumeros[i].addEventListener("click", presion);
    }

    // Asegurarse de que el botón 0 también tenga el listener
    if (boton0) {
        boton0.addEventListener("click", presion);
    }

    botonRetroceso.addEventListener("click", presion);
    botonIgual.addEventListener("click", presion);

    document.getElementsByTagName("body")[0].addEventListener("keypress", presion);
}


function presion(evt) {
    console.log('dentro');
    let boton1;


    if (evt.target.value == undefined && evt.key != 'Enter') {
        boton1 = evt.target.getAttribute("data-value"); 
    } else if (evt.target.value == undefined && evt.key == 'Enter') {
        boton1 = '=';
    } else {
        boton1 = evt.target.value;
    }


    if (boton1 === null || boton1 === undefined) {
        return; 
    }

    let valor1Escrito = document.getElementById("num1").innerHTML.length > 0;
    let opIniciada = document.getElementById("op").innerHTML.length > 0;

    if (boton1 === '/' || boton1 === 'x' || boton1 === '+' || boton1 === '-') {
        document.getElementById('op').innerHTML = boton1;
        opIniciada = true;
    } else if (boton1 === 'AC') {
        resetear();
    } else if (boton1 === '=') {
        if (valor1Escrito) {
            calcular();
        }
    } else if (boton1 === 'backspace') {
        if (valor1Escrito) {
            borrarUltimoCaracter();
        }
    } else {
        if (!opIniciada) {
            document.getElementById("num1").innerHTML += boton1;
        } else {
            document.getElementById("num2").innerHTML += boton1;
        }
    }
}

function borrarUltimoCaracter() {
    let num1 = document.getElementById("num1");
    let num2 = document.getElementById("num2");
    let op = document.getElementById("op");

    if (num2.innerHTML.length > 0) {
        num2.innerHTML = num2.innerHTML.slice(0, -1);
    } else if (op.innerHTML.length > 0) {
        op.innerHTML = ""; 
    } else if (num1.innerHTML.length > 0) {
        num1.innerHTML = num1.innerHTML.slice(0, -1);
    }
}

function resetear() {
    document.getElementById("num1").innerHTML = "";
    document.getElementById("num2").innerHTML = "";
    document.getElementById("op").innerHTML = "";
    document.getElementById("resultado").innerHTML = "";
}

function calcular() {
    let num1 = parseFloat(document.getElementById('num1').innerHTML);
    let num2 = parseFloat(document.getElementById('num2').innerHTML);
    let op = document.getElementById('op').innerHTML;
    let resultado;

    switch (op) {
        case "/":
            resultado = num1 / num2;
            break;
        case "x":
            resultado = num1 * num2;
            break;
        case "-":
            resultado = num1 - num2;
            break;
        case "+":
            resultado = num1 + num2;
            break;
        default:
            resultado = "Error"; 
            break;
    }

    console.log(resultado);
    document.getElementById('resultado').innerHTML = resultado;
}

document.addEventListener('DOMContentLoaded', botonesListener);
