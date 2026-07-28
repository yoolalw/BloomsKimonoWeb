const params = new URLSearchParams(document.location.search)
const id = params.get("id")
const message = document.getElementById("message")
const form = document.getElementById("updateProductForm")
const token = localStorage.getItem('token')
form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const formData = new FormData(form)

    const editedProdJson = {
        nomeKimono: formData.get("nomeKimono"),
        precoKimono: formData.get("precoKimono"),
        quantidadeKimono: formData.get("quantidadeKimono")
    }

    try {
        async function editProductById() {

            console.log("hi")

            const response = await fetch(`http://localhost:8080/products/${id}`, {
                method: 'PUT',
                headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json" },
                body: JSON.stringify({
                    nomeKimono: editedProdJson.nomeKimono,
                    precoKimono: editedProdJson.precoKimono,
                    quantidadeKimono: editedProdJson.quantidadeKimono
                })
            })
            if (response.ok) {
                message.innerHTML = "Produto alterado com sucesso!"
                console.log(response.status)

                setTimeout(() => {
                    window.location.href = "home.html"
                }, 1500)

            } else {
                console.error()
            }

        } editProductById()
    } catch (erro) {
        console.error("ERROOO :: ", erro)
    }
})