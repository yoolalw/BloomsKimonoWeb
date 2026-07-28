const urlToFetch = "http://localhost:8080/products"
const produto = document.getElementById("produto")
const message = document.getElementById("message")
const token = localStorage.getItem("token")
console.log(token)
async function getProductsFromDb() {
    try {
        const response = await fetch("http://localhost:8080/products", {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        }
        )
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

                    <a href="updateProduct.html?id=${dataDb.id}">
                        <button type="button"
                            data-id="${dataDb.id}"
                            class="updatePagProd"
                            >Editar
                        </button>
                    </a>

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

                                "Authorization": `Bearer ${token}`,
                                "Content-Type": "application/json"
                            }
                        })
                        if (response.ok) {
                            alert("Item removido.")
                            document.getElementById(`prodSessInn-${dataDb.id}`).remove()

                        } else {
                            console.error()
                        }
                    } catch (err) {
                        console.log(err)
                    }
                });



            });

        }
    } catch (err) {
        console.log(err)
        message.innerText = "Erro ao carregar produtos."
    }

} getProductsFromDb()