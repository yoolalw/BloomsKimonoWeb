async function getProductsFromDb() {
    const urlToFetch = "http://localhost:8080/products"

    try {
        const response = await fetch(urlToFetch)

        console.log(response.status)

        if (response.ok) {
            const dados = await response.json();

            console.log(dados)

            const product = document.getElementById("produto")

            dados.forEach((dataDb) => {
                product.innerHTML += `
                <div class="prodSessInn">
                    <img src="${dataDb.imagem}">
                    <p>${dataDb.nomeKimono}</p>
                    <h3>${dataDb.precoKimono}</h3>
                </div>
                <style scoped>
                    .prodSessInn {
                        display: inline-block;
                        background-color: #4e363d;
                        width: 300px;
                        margin-top: 20px;
                        border-radius: 20px;
                        cursor: pointer;
                    }
                    .prodSessInn p{
                        color: #fce7f1;
                        font-size: 25px;
                        margin-left: 10px;
                        margin-top: 2px;

                    }
                    .prodSessInn img {
                        width: 300px
                    }
                    
                    .prodSessInn h3 {
                        position: flex;
                        font-size: 35px;
                        color: white;
                        margin-left: 20px;
                    }

                </style>
                `

            });
        }

    } catch (err) {
        console.log(err)
    }

} getProductsFromDb()
