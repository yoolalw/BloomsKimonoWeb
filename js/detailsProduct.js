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
                
                <img src="${dadosId.imagem}">
                <h1>${dadosId.nomeKimono}</h1>
                <h2>${dadosId.precoKimono}<h2>
                <p>Quantidade em estoque: ${dadosId.quantidadeKimono}</p>
                <input type="submit" id="addCart" class="addCart" value="Adicionar ao carrinho">
                `
 

        }

    } catch (error) {
        throw error
    }
} getProdutDetailsById()