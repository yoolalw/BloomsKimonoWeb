const message = document.getElementById("message");

const registerProductForm = document.querySelector("#registerProductForm")
const formData = new FormData(registerProductForm);

registerProductForm.addEventListener("submit",  async function (event) {
    event.preventDefault();

    async function registerProduct() {
        const nomeKimono = document.getElementById("nomeKimono").value;
        const precoKimono = document.getElementById("precoKimono").value;
        const quantidadeKimono = document.getElementById("quantidadeKimono").value;
        const imagem = document.getElementById("imagem").value
        
        const product = {
            nomeKimono: nomeKimono,
            precoKimono: precoKimono,
            quantidadeKimono: quantidadeKimono,
            imagem: imagem
        }

        try{
            const reponse = await fetch('http://localhost:8080/products', {
                method: 'POST',
                headers: {"Content-type": "multipart"},
                body: JSON.stringify(product)
            })

            const jsonResponse = reponse.json();
            console.log(jsonResponse);
            message.innerHTML = "Produto adicionado!"

           

        } catch (error) {
            console.error("Erro de conexao! ", error);
            message.innerHTML = "Erro de conexão com servidor!";
        }
    }
    registerProduct();
})