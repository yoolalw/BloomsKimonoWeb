const message = document.getElementById("message");

const registerProductForm = document.querySelector("#registerProductForm")
const formData = new FormData(registerProductForm);

registerProductForm.addEventListener('submit',  async function (event) {
    event.preventDefault();

    async function registerProduct() {
        const nomeKimono = document.getElementById("nomeKimono").value;
        const precoKimono = document.getElementById("precoKimono").value;
        const quantidadeKimono = document.getElementById("quantidadeKimono").value;
        const imagem = document.getElementById("imagem").files[0];
        
        const product = {
            nomeKimono: nomeKimono,
            precoKimono: precoKimono,
            quantidadeKimono: quantidadeKimono,
            imagem: imagem
        }

        try{
            const reponse = await fetch('http://localhost:8080/products', {
                method: 'POST',
                body: formData
            })

            if(reponse.ok){ 
                message.innerHTML = "Produto adicionado!"  
            
            
            } else {
                const jsonResponse = reponse.json();
                console.log(jsonResponse);
                message.innerHTML = "Ocorreu algum erro ao tentar cadastrar"
            }

        } catch (error) {
            console.error(error);
            message.innerHTML = "Erro de conexão com servidor!";
        }
    }
    registerProduct();
})