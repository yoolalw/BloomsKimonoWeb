const form = document.querySelector("#payForm")
const message = document.getElementById("message")

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value
    const dadosCartao = document.getElementById("dadosCartao").value
    const validade = document.getElementById("validade").value
    const cvc = document.getElementById("cvc").value
    const nomeCartao = document.getElementById("nomeCartao").value
    const endereco = document.getElementById("endereco").value
    const tipoCartao = document.getElementsByName("tipoCartao")
        .forEach(radio => {
            if (radio.checked) {
                return radio.value
            }
        })

    const dadosDoCartao = {
        email: email,
        dadosCartao: dadosCartao,
        validade: validade,
        cvc: cvc,
        nomeCartao: nomeCartao,
        endereco: endereco,
        tipoCartao: tipoCartao
    }
    try {
        async function connectionFetch() {
            try {
                const response = await fetch('http://localhost:8080/card-payments', {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    method: 'POST',
                    body: JSON.stringify(dadosDoCartao)

                });
                if (response.ok) {
                    message.innerText = "Pagamento bem sucedido!"

                    setTimeout(() => {
                        window.location.href = "home.html";
                    }, 2000)
                }
            } catch (error) {
                message.innerText = "Ocorreu um erro! Tente novamente.";
                console.log("ERRO!:   ", error);
            }
        } connectionFetch()
    } catch (error) {
        message.innerText = "Erro de conexão com servidor."
        console.log(error)
    }


})