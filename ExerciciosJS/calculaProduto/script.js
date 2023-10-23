function calcularPreco() {
    const precoOriginal = parseFloat(document.getElementById('precoOriginal').value);
    const precoEtiqueta = parseFloat(document.getElementById('precoEtiqueta').value);
    const formaPagamento = document.querySelector('input[name="formaPagamento"]:checked').value;

    // Realize o cálculo com base na forma de pagamento selecionada
    let resultado = 0;
    if (formaPagamento === 'debito') {
        // 10% de desconto
        resultado = precoEtiqueta * 0.9;
    } else if (formaPagamento === 'vista') {
        // 15% de desconto
        resultado = precoEtiqueta * 0.85;
    } else if (formaPagamento === 'credito2') {
        // Preço de etiqueta (sem juros)
        resultado = precoEtiqueta;
    } else if (formaPagamento === 'credito10') {
        // 10% de juros
        resultado = precoEtiqueta * 1.1;
    }

    document.getElementById('resultado').textContent = `O preço final é: R$ ${resultado.toFixed(2)}`;
}
