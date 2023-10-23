//Faça um programa para calcular o custo de uma viagem
//Você terá 3 variáveis, sendo elas:
//1 - Gasto de combustivel;
//2 - Gasto médio de combustível;
//3 - Distancia em km da viagem;

function calcularViagem() {
    const precoCombustivel = parseFloat(document.getElementById('precoCombustivel').value);
    const consumoMedio = parseFloat(document.getElementById('consumoMedio').value);
    const distancia = parseFloat(document.getElementById('distancia').value);
  
    const litrosConsumidos = distancia / consumoMedio;
    const valorGasto = litrosConsumidos * precoCombustivel;
  
    document.getElementById('resultado').textContent = `O valor gasto na viagem é de R$ ${valorGasto.toFixed(2)}`;
  }
  