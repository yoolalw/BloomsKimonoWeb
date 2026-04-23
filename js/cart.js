const cartContainer = document.querySelector("#cartContainer")
const message = document.getElementById("message")

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
                            data-valor-item="${item.productModel.precoKimono}"
                            id="addQuant-${item.idCartItem}"
                            class="addQuantBtn">+
                        </button>

                        <p id="quant-${item.idCartItem}">${item.quantidadeItem}</p>
                        
                        <button type="button" 
                            data-id="${item.idCartItem}" 
                            data-quantidade-item="${item.quantidadeItem}" 
                            data-valor-item="${item.productModel.precoKimono}"
                            id="removeQuantBtn-${item.idCartItem}"
                            class="removeQuantBtn">-</button>

                        <p class="total"
                            id="total"
                            >Total: ${item.total}</p>
            
                        <button type="button" 
                            data-id="${item.idCartItem}" 
                            class="removeBtn">Remover</button>

                    </div>
                </div>
                `)

                const novoItem = cartContainer.lastElementChild
                const btn = novoItem.querySelector('.removeBtn')
                const addQuantBtn = novoItem.querySelector('.addQuantBtn')
                const removeQuantBtn = novoItem.querySelector('.removeQuantBtn')
                const total = novoItem.querySelector(".total")

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
                //Finaliza funcao de remover item do carrinho

                //Atualizando quantidade de produtos do carrinho!!!!
                addQuantBtn.addEventListener('click', async (e) => {
                    e.preventDefault()

                    const quantidadeAtual = Number(addQuantBtn.dataset.quantidadeItem)
                    const valorItem = Number(addQuantBtn.dataset.valorItem)
                    const quantNova = quantidadeAtual + 1
                    const calcValue = valorItem * quantNova
                    const id = addQuantBtn.dataset.id

                    removeQuantBtn.disabled = false

                    try {

                        const response = await fetch(`http://localhost:8080/cart/${id}`, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({ quantidadeItem: quantNova, total: calcValue })
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
                //Finaliza funcao de adicionar mais quantidade

                removeQuantBtn.addEventListener('click', async (e) => {
                    e.preventDefault()

                    const quantidadeAtual = Number(addQuantBtn.dataset.quantidadeItem)
                    const valorItem = Number(addQuantBtn.dataset.quantidadeItem)
                    const quantRemov = quantidadeAtual - 1
                    const calcValue = valorItem * quantRemov
                    const id = removeQuantBtn.dataset.id

                    removeQuantBtn.disabled = (quantidadeAtual == 1);
                    if(quantidadeAtual > 1) { 
                        removeQuantBtn.disabled = false
                    }

                    try {

                        const response = await fetch(`http://localhost:8080/cart/${id}`, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({ quantidadeItem: quantRemov, total: calcValue })
                        })

                        if (response.ok) {
                            document.getElementById(`quant-${id}`).textContent = quantRemov
                            addQuantBtn.dataset.quantidadeItem = quantRemov
                            
                           
                        }

                    } catch (error) {
                        throw new Error(error)
                    }
                })

             
                

            });
        } else {
            throw new Error("erro! ::::: ")
        }
    } catch (error) {
        console.error("ERROR!! : ", error)
    }
} getCartItens()