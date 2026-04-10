const urlToFetch = "http://localhost:8080/products"
const produto = document.getElementById("produto")
const message = document.getElementById("message")

async function getProductsFromDb() {
    try {
        const response = await fetch(urlToFetch)
        console.log(response.status)

        if (response.ok) {
            const dados = await response.json();

            console.log(dados)

            dados.forEach((dataDb) => {
                produto.innerHTML += `
                <a href="detailsProduct.html?id=${dataDb.id}">
                <div class="prodSessInn" id="prodSessInn-${dataDb.id}">
                    <img src="${dataDb.imagem}">
                    <p>${dataDb.nomeKimono}</p>
                    <h3>${dataDb.precoKimono}</h3>
                </div>  
                </a>
                `
            });
        }
    } catch (err) {
        console.log(err)
        message.innerText = "Erro ao carregar produtos."
    }

} getProductsFromDb()

