const cartContainer = document.querySelector("#cartContainer")

const urlFetchCartItens = 'http://localhost:8080/cart'
console.log(urlFetchCartItens)

async function getCartItens() {
    try {
        const response = await fetch(urlFetchCartItens)
        console.log(response.status)

        if (response.ok) {
            const cartItem = await response.json()
            console.log(JSON.stringify(cartItem))

            cartItem.forEach((item) => {
                cartContainer.insertAdjacentHTML('beforeend', `
                <div class="containerInn">
                    <div class="itemSessInn" id="itemSessInn-${item.idCartItem}">
                        <img src="${item.productModel.imagem}">
                        <p>${item.productModel.nomeKimono}</p>
                        <p>${item.productModel.precoKimono}</p>
                        
                        <button type="button" 
                            data-id="${item.idCartItem}" 
                            data-quantidade-item="${item.quantidadeItem}" 
                            id="addQuant-${item.idCartItem}"
                            class="addQuantBtn">+
                            </button>

                        <p id="quant-${item.idCartItem}">${item.quantidadeItem}</p>
                        
                        <button type="button" 
                            data-id="${item.idCartItem}" 
                            class="removeQuantBtn">-</button>

                        <p>Total: ${item.total}</p>
            
                        <button type="button" 
                            data-id="${item.idCartItem}" 
                            class="removeBtn">Remover</button>

                    </div>
                </div>
                `)
                // Deletando itens do carrinho!!!!

                const novoItem = cartContainer.lastElementChild
                const btn = novoItem.querySelector('.removeBtn')
                const addQuantBtn = novoItem.querySelector('.addQuantBtn')
                const removeQuantBtn = novoItem.querySelector('.removeQuantBtn')

                btn.addEventListener('click', async (e) => {
                    e.preventDefault()
                    const id = btn.dataset.id

                    try {
                        const response = await fetch(`http://localhost:8080/cart/${id}`, {
                            method: "DELETE",
                            headers: { 'Content-Type': 'application/json' }
                        })

                        if (response.ok) {
                            alert("Item removido com sucesso!")
                            document.getElementById(`itemSessInn-${id}`).remove()
                        } else {
                            throw new Error("erro! ::::: ")
                        }

                    } catch (error) {
                        console.log("ERROR!! ::", error)
                    }
                })
                //Atualizando quantidade de produtos do carrinho!!!!

                addQuantBtn.addEventListener('click', async (e) => {
                    e.preventDefault()

                    const quantidadeAtual = Number(addQuantBtn.dataset.quantidadeItem)
                    const quantNova = quantidadeAtual + 1
                    const id = addQuantBtn.dataset.id

                    try {

                        const response = await fetch(`http://localhost:8080/cart/${id}`, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({ quantidadeItem: quantNova })
                        })

                        if (response.ok) {

                            document.getElementById(`quant-${id}`).textContent = quantNova
                            addQuantBtn.dataset.quantidadeItem = quantNova

                        } else {
                            console.error("Erro de requisicao")
                        }


                    } catch (error) {
                        console.error(error)
                    }
                });
            });
        } else {
            throw new Error("erro! ::::: ")
        }
    } catch (error) {
        console.error("ERROR!! : ", error)
    }
} getCartItens()