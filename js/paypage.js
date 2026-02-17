const form = document.getElementById('payForm');
const message = document.getElementById('message');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const dadosCartao = document.getElementById('dadosCartao').value;
    const validade = document.getElementById('validade').value;
    const cvc = document.getElementById('cvc').value;
    const nomeCartao = document.getElementById('nomeCartao').value;
    const endereco = document.getElementById('endereco').value;
    const tipoCartao = document.querySelector('input[name="tipoCartao"]:checked')?.id || '';


    try{
        const response = await fetch('http://localhost:8081/card-payments',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'},
            body: JSON.stringify({email, dadosCartao, validade, cvc, nomeCartao, endereco, tipoCartao})
        });

        const data = await response.json();

        if(response.ok){
            message.innerText = 'Pagamento concluído com sucesso! Retornando a pagina inicial..';
            message.style.color = 'green';

            setTimeout(() => {
                window.location = "home.html";
            }, 2000);
        } else {
            message.innerText = 'Erro, por favor tente novamente.';
            message.style.color = 'red';
        }
    } catch(error) {
        message.innerText = 'Erro de conexão com servidor.';
        message.style.color = 'red';
        console.error(error);
    }

})