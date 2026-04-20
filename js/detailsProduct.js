const params = new URLSearchParams(document.location.search)
const id = params.get("id")
const detalhesProduto = document.getElementById("detalhesProduto")
console.log(id)

const urlFindByIDToFetch = `http://localhost:8080/products/${id}`
console.log(urlFindByIDToFetch)

async function getProdutDetailsById() {
    try {
        const response = await fetch(urlFindByIDToFetch)
        console.log(response.status)

        if (response.ok) {
            const dadosId = await response.json()
            console.log(dadosId)
            detalhesProduto.innerHTML = `
                <div class="itensSessInn" id="itensSessInn">
                    
                    <div class="imgDetails">
                        <img src="${dadosId.imagem}">
                    </div>

                    <h1 >${dadosId.nomeKimono}</h1>
                    <h2>${dadosId.precoKimono}</h2>
                    <p>Quantidade em estoque: ${dadosId.quantidadeKimono}</p>

                    <button type="button" id="cartBtn" class="cartBtn">Adicionar ao carrinho</button>
                </div>
                `


            const cartBtn = document.getElementById("cartBtn").addEventListener('click', async () => {

                try {
                    const response = await fetch('http://localhost:8080/cart/add', {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ id: Number(id), quantidade: 1 })
                    }
                    )
                    if (response.ok) {
                        console.log(response)
                        alert("Item adicionado com sucesso!");
                    } else {
                        alert("Ocorreu um erro ao tentar adicionar o item ao carrinho, tente novamente!");
                    }
                } catch (err) {
                    console.error("ERROR!!! : ", err);
                }
            })

        }
        } catch (error) {
            throw error
        }

} getProdutDetailsById()

