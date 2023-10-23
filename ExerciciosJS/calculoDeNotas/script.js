//Calculo de média de notas


function calcularNota() {
    const nota1 = parseFloat(document.getElementById('nota1').value);
    const nota2 = parseFloat(document.getElementById('nota2').value);
    const nota3 = parseFloat(document.getElementById('nota3').value);
    
    const result = (nota1 + nota2 + nota3) / 3;

    document.getElementById('resultado').textContent = `A média das notas é: ${result.toFixed(2)}`;

    if (result < 5){
        document.getElementById('situacao').textContent = `Você reprovou!`;
    }else if (result >= 5 && result <=7){
        document.getElementById('situacao').textContent = `Você passou na média!`;
    }else{
        document.getElementById('situacao').textContent = `Você passou!`;
    }
 }