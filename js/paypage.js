const form = document.querySelector("#payForm")
const message = document.getElementById("message")

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form)

    const dadosDoCartao = {
        email: formData.get('email'),
        dadosCartao: formData.get("dadosCartao"),
        validade: formData.get("validade"),
        cvc: formData.get("cvc"),
        nomeCartao: formData.get("nomeCartao"),
        endereco: formData.get("endereco"),
        tipoCartao: formData.get("tipoCartao")
    }

    console.log(dadosDoCartao)
    try {
        async function connectionFetch() {
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
            } else {
                message.innerText = "Ocorreu um erro! Tente novamente.";
                console.log("ERRO!:   ", error);
            }
        } connectionFetch()
    } catch (error) {
        message.innerText = "Erro de conexão com servidor."
        console.log(error)
    }


})