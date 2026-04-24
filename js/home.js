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
                produto.insertAdjacentHTML('beforeend', `
                <a href="detailsProduct.html?id=${dataDb.id}">
                <div class="prodSessInn" id="prodSessInn-${dataDb.id}">
                    <img src="${dataDb.imagem}">
                    </a>
                    <p>${dataDb.nomeKimono}</p>
                    <h3>${dataDb.precoKimono}</h3>

                    <button type="button"
                        data-id="${dataDb.id}"
                        class="removeProd"
                        >Deletar
                    </button>

                    
                    <button type="button"
                        data-id="${dataDb.id}"
                        class="updatePagProd"
                        >Editar
                    </button>

                </div>  
                `)

                const decProd = produto.lastElementChild
                const removeProd = decProd.querySelector(".removeProd")
                const upgradePagProd = decProd.querySelector(".updatePagProd")
                
                // botao de remover produto
                removeProd.addEventListener("click", async (e) => {
                    e.preventDefault()

                    const id = removeProd.dataset.id
                    console.log(id)

                    try {
                        const response = await fetch(`http://localhost:8080/products/${id}`, {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })
                        if (response.ok) {
                            alert("Item removido.")
                            document.getElementById(`prodSessInn-${dataDb.id}`).remove()

                        } else {
                            throw new Error();
                        }
                    } catch (err) {
                        throw new Error('error::: ', err)
                    }
                });

                //redirecionamento de pagina - update product
                upgradePagProd.addEventListener("click", async (e) => {
                    window.location.href = "updateProduct.html"
                })

            });

        }
    } catch (err) {
        console.log(err)
        message.innerText = "Erro ao carregar produtos."
    }

} getProductsFromDb()