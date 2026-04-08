async function getProductsFromDb() {
    const urlToFetch = "http://localhost:8080/products"

    try {
        const response = await fetch(urlToFetch)
        
        console.log(response.status)

        if (response.ok) {
            const dados = await response.json();
            
            console.log(dados)
            
            const product = document.getElementById("produto")
            
            dados.forEach((item) => {
                product.innerHTML = `${item.nomeKimono}`
                console.log(item.nomeKimono)
            });
        }

    } catch (err) {
        console.log(err)
    }
    
} getProductsFromDb()
