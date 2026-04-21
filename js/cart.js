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
                cartContainer.innerHTML += `
                <div class="containerInn">
                    <div class="itemSessInn" id="itemSessInn-${item.idCartItem}">
                        <img src="${item.productModel.imagem}">
                        <p>${item.productModel.nomeKimono}</p>
                        <p>${item.productModel.precoKimono}</p>
                        <p>${item.total}</p>
            
                        <button type="button" data-id="${item.idCartItem}" class="removeBtn">Remover</button>

                    </div>
                </div>
                `

                const btn = cartContainer.querySelector(`[data-id="${item.idCartItem}"]`)
                btn.addEventListener('click', async () => {
                    const id = btn.dataset.id // ??? 

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
            });
            
        } else {
            throw new Error("erro! ::::: ")
        }
    } catch (error) {
        console.error("ERROR!! : ", error)
    }
} getCartItens()