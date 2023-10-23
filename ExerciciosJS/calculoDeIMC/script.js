//Calculo de média de notas


function calcularImc() {
    const altura = parseFloat(document.getElementById('altura').value);
    const peso = parseFloat(document.getElementById('peso').value);

    const imc = peso / Math.pow(altura,2)

    document.getElementById('resultado').textContent = `Seu IMC é: ${imc.toFixed(2)}`;

    if (imc < 18.5){
        document.getElementById('situacao').textContent = `Você está abaixo do peso!`;
    }else if (imc >= 18.5 && imc <= 25) {
        document.getElementById('situacao').textContent = `Você está com o peso normal!`;
    }else if (imc >= 25 && imc <= 30) {
        document.getElementById('situacao').textContent = `Você está acima do peso!`;
    }else if (imc >= 30 && imc <= 40) {
        document.getElementById('situacao').textContent = `Você está acima obeso!`;
    }else{
        document.getElementById('situacao').textContent = `Você está com obesidade de nível grave!`;
    }
 }