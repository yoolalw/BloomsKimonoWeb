const tableCart = document.getElementById("table-cart");
const carrinhoProdutos= JSON.parse(localStorage.getItem("carrinho")) || [];

tableCart.innerHTML = "";

carrinhoProdutos.forEach(produto => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("table-cart-item"); 
    itemDiv = `
    `
})