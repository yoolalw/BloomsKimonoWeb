const params = new URLSearchParams(document.location.search)
const id = params.get("id")
const detalhesProduto = document.getElementById("detalhesProduto")
console.log(id)

const urlFindByIDToFetch = `http://localhost:8080/products/${id}`
console.log(urlFindByIDToFetch)

async function getProdutDetailsById() {
    try{
        const response = await fetch(urlFindByIDToFetch)
        console.log(response.status)

        if(response.ok){ 
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

                    <input type="submit" id="addCart" class="addCart" value="Adicionar ao carrinho">
                </div>
                `
        }
        const addCart = document.getElementById("addCart");
        addCart.addEventListener("submit", async function (e){
            e.preventDefault();

            alert("Item adicionado ao carrinho!");
            const postItemFetch = await fetch('http://localhost:8080/cart', {
                
            });

        })
    

    } catch (error) {
        throw error
    }
} getProdutDetailsById()