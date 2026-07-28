const cartContainer = document.querySelector("#cartContainer")
const message = document.getElementById("message")
const token = localStorage.getItem("token")
const urlFetchCartItens = 'http://localhost:8080/cart'

console.log(urlFetchCartItens)

function atualizarTotalCarrinho() {
    let soma = 0

    document.querySelectorAll(".total").forEach((itemTotal) => {

        const valor = Number(
            itemTotal.textContent
                .replace("Total:", "")
                .trim()
        )

        soma += valor
    })

    document.getElementById("totalCartItens").textContent =
        "Total: " + soma.toFixed(2)
}

async function getCartItens() {

    try {

        const response = await fetch(urlFetchCartItens, {
            headers:{
                "Authorization": `Bearer ${token}`
            }
        })

        console.log(response.status)

        if (response.ok) {
            const cartItem = await response.json()
            console.log(cartItem)
            cartItem.forEach((item) => {
                cartContainer.insertAdjacentHTML('beforeend', `

                <div class="containerInn">

                    <div class="itemSessInn" id="itemSessInn-${item.idCartItem}">

                        <img src="${item.productModel.imagem}">

                        <p>${item.productModel.nomeKimono}</p>

                        <p>${item.productModel.precoKimono}</p>

                        <button 
                            type="button" 
                            data-id="${item.idCartItem}" 
                            data-quantidade-item="${item.quantidadeItem}" 
                            data-valor-item="${item.productModel.precoKimono}"
                            id="addQuant-${item.idCartItem}"
                            class="addQuantBtn"
                        >
                            +
                        </button>

                        <p id="quant-${item.idCartItem}">
                            ${item.quantidadeItem}
                        </p>

                        <button 
                            type="button"
                            data-id="${item.idCartItem}" 
                            data-quantidade-item="${item.quantidadeItem}" 
                            data-valor-item="${item.productModel.precoKimono}"
                            id="removeQuantBtn-${item.idCartItem}"
                            class="removeQuantBtn"
                        >
                            -
                        </button>

                        <p 
                            class="total"
                            id="total-${item.idCartItem}"
                        >
                            Total: ${Number(item.total).toFixed(2)}
                        </p>

                        <button 
                            type="button" 
                            data-id="${item.idCartItem}" 
                            class="removeBtn"
                        >
                            Remover
                        </button>

                    </div>

                </div>

                `)

                const novoItem = cartContainer.lastElementChild

                const btn = novoItem.querySelector('.removeBtn')

                const addQuantBtn = novoItem.querySelector('.addQuantBtn')

                const removeQuantBtn = novoItem.querySelector('.removeQuantBtn')

                const valorItem = Number(addQuantBtn.dataset.valorItem)

                // =========================
                // REMOVER ITEM
                // =========================

                btn.addEventListener('click', async (e) => {

                    e.preventDefault()

                    const id = btn.dataset.id

                    try {

                        const response = await fetch(`http://localhost:8080/cart/${id}`, {
                            method: "DELETE",
                            headers: {
                                "Authorization": `Bearer ${token}`,
                                'Content-Type': 'application/json'
                            }
                        })

                        if (response.ok) {

                            alert("Item removido com sucesso!")

                            document
                                .getElementById(`itemSessInn-${id}`)
                                .remove()

                            atualizarTotalCarrinho()

                        } else {

                            throw new Error("Erro ao remover item")
                        }

                    } catch (error) {

                        console.log("ERROR!! ::", error)
                    }
                })

                // =========================
                // ADICIONAR QUANTIDADE
                // =========================

                addQuantBtn.addEventListener('click', async (e) => {

                    e.preventDefault()

                    const quantidadeAtual = Number(
                        addQuantBtn.dataset.quantidadeItem
                    )

                    const quantNova = quantidadeAtual + 1

                    const calcValue = valorItem * quantNova

                    const id = addQuantBtn.dataset.id

                    removeQuantBtn.disabled = false

                    try {

                        const response = await fetch(`http://localhost:8080/cart/${id}`, {

                            method: "PUT",

                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${token}`
                            },

                            body: JSON.stringify({
                                quantidadeItem: quantNova,
                                total: calcValue.toFixed(2)
                            })
                        })

                        if (response.ok) {

                            document.getElementById(`quant-${id}`)
                                .textContent = quantNova

                            addQuantBtn.dataset.quantidadeItem = quantNova

                            removeQuantBtn.dataset.quantidadeItem = quantNova

                            document.getElementById(`total-${id}`)
                                .textContent = "Total: " + calcValue.toFixed(2)

                            atualizarTotalCarrinho()

                        } else {

                            console.error("Erro de requisição")
                        }

                    } catch (error) {

                        console.error(error)
                    }
                })

                // =========================
                // REMOVER QUANTIDADE
                // =========================

                removeQuantBtn.addEventListener('click', async (e) => {

                    e.preventDefault()

                    const quantidadeAtual = Number(
                        addQuantBtn.dataset.quantidadeItem
                    )

                    if (quantidadeAtual <= 1) {

                        removeQuantBtn.disabled = true
                        return
                    }

                    const quantRemov = quantidadeAtual - 1

                    const calcValue = valorItem * quantRemov

                    const id = removeQuantBtn.dataset.id

                    try {

                        const response = await fetch(`http://localhost:8080/cart/${id}`, {

                            method: "PUT",

                            headers: {

                                "Authorization": `Bearer ${token}`,
                                "Content-Type": "application/json"
                            },

                            body: JSON.stringify({
                                quantidadeItem: quantRemov,
                                total: calcValue.toFixed(2)
                            })
                        })

                        if (response.ok) {

                            document.getElementById(`quant-${id}`)
                                .textContent = quantRemov

                            addQuantBtn.dataset.quantidadeItem = quantRemov

                            removeQuantBtn.dataset.quantidadeItem = quantRemov

                            document.getElementById(`total-${id}`)
                                .textContent = "Total: " + calcValue.toFixed(2)

                            if (quantRemov <= 1) {
                                removeQuantBtn.disabled = true
                            }

                            atualizarTotalCarrinho()
                        }

                    } catch (error) {

                        console.error(error)
                    }
                })

            })

            atualizarTotalCarrinho()

        } else {

            throw new Error("Erro ao buscar itens")
        }

    } catch (error) {

        console.error("ERROR!! : ", error)
    }
}

getCartItens()