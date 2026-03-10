const container = document.getElementById("produto"); // cria um container pra ficar recriando sempre que entrar um novo produto dentro do estoque
const cartContainer = document.querySelector(".cart-content");
const totalElement = document.querySelector(".total-price");

let carrinho = [];

// Tenta recuperar o carrinho salvo
const carrinhoSalvo = localStorage.getItem("carrinho");
if (carrinhoSalvo) {
    carrinho = JSON.parse(carrinhoSalvo);
    atualizarCarrinho();
}


async function carregarProdutos() {
    try {
        const response = await fetch('http://localhost:8080/products');
        const produtos = await response.json();

        container.innerHTML = "";

        produtos.forEach(produto => {
            const div = document.createElement("div");
            div.classList.add("image-content");

            // Estilo do card responsivo
            Object.assign(div.style, {
                flex: "1 1 calc(25% - 20px)",
                maxWidth: "300px",
                minWidth: "200px",
                backgroundColor: "#D5B6C5",
                borderRadius: "10px",
                margin: "10px",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                overflow: "hidden",
                boxSizing: "border-box",
                height: "500px" // padroniza a altura do card
            });

            div.innerHTML = `
                <div class="img-wrapper">
                    <img src="${produto.imagem}" class="product-img">
                </div>
                <h3 class="product-title">${produto.nomeKimono}</h3>
                <p class="product-price">R$ ${produto.precoKimono.toFixed(2)}</p>

                <button class="cart-btnCart-img">🛒</button>

                <button class="edit-product-btn">Editar</button>
                
                <button class="remove-product-btn">Remover</button>                
            `;

            // Wrapper da imagem para padronizar altura
            const imgWrapper = div.querySelector(".img-wrapper");
            Object.assign(imgWrapper.style, {
                width: "100%",
                height: "76%", 
                overflow: "hidden",
                borderRadius: "10px 10px 0 0"
            });

            // Imagem responsiva e padronizada
            const img = div.querySelector(".product-img");
            Object.assign(img.style, {
                width: "100%",
                height: "100%",
                objectFit: "cover" // mantém proporção e corta o excesso
            });

            // Título
            const title = div.querySelector(".product-title");
            Object.assign(title.style, {
                fontSize: "1.2rem",
                margin: "2px 16px 0",
                wordWrap: "break-word",
                textAlign: "left",
                flex: "0 0 auto"
            });

            // Preço
            const price = div.querySelector(".product-price");
            Object.assign(price.style, {
                fontSize: "1.1rem",
                margin: "0 1rem 0.5rem",
                color: "#e670be",
                textAlign: "left",
                flex: "0 0 auto"
            });

            // Botão de carrinho
            const btnCart = div.querySelector(".cart-btnCart-img");
            Object.assign(btnCart.style, {
                position: "absolute",
                bottom: "15px",
                right: "15px",
                backgroundColor: "#fff",
                border: "1px solid #3f0a19",
                padding: "10px 14px",
                borderRadius: "30px",
                fontSize: "18px",
                cursor: "pointer",
                transition: "0.2s ease"
            });

            const editProductBtn = div.querySelector(".edit-product-btn");
            Object.assign(editProductBtn.style, {                
                position: "absolute",
                bottom: "15px",
                left: "15px",
                backgroundColor: "#fff",
                border: "1px solid #3f0a19",
                padding: "10px 14px",
                borderRadius: "30px",
                fontSize: "18px",
                cursor: "pointer",
                transition: "0.2s ease"
            });

            const removeProductBtn = div.querySelector(".remove-product-btn");
            Object.assign(removeProductBtn.style, {
                position: "absolute",
                bottom: "15px",
                left: "100px",
                backgroundColor: "#fff",
                border: "1px solid #3f0a19",
                padding: "10px 14px",
                borderRadius: "30px",
                fontSize: "18px",
                cursor: "pointer",
                transition: "0.2s ease"
            });


            btnCart.onclick = () => adicionarAoCarrinho(produto); //monta o onclick, e atribui a funcao dps passando o parametro

            editProductBtn.onclick = () => editarProduto(produto);

            removeProductBtn.onclick = () => removerProduto(produto);


            container.appendChild(div);
        });

        // Container principal flexível
        Object.assign(container.style, {
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "20px",
            marginRight: "460px"
        });

        // Ajustes responsivos
        function ajustarResponsividade() {
            const width = window.innerWidth;

            if (width <= 480) {
                container.style.marginRight = "20px";
                container.childNodes.forEach(card => card.style.flex = "1 1 100%");
            } else if (width <= 768) {
                container.style.marginRight = "100px";
                container.childNodes.forEach(card => card.style.flex = "1 1 calc(50% - 20px)");
            } else if (width <= 1200) {
                container.style.marginRight = "200px";
                container.childNodes.forEach(card => card.style.flex = "1 1 calc(33.33% - 20px)");
            } else {
                container.style.marginRight = "460px";
                container.childNodes.forEach(card => card.style.flex = "1 1 calc(25% - 20px)");
            }
        }

        ajustarResponsividade();
        window.addEventListener("resize", ajustarResponsividade);

    } catch (error) {
        console.error("Erro ao carregar os produtos", error);
        container.innerHTML = "<p> Erro ao carregar os produtos. </p>";
    }
}

async function removerProduto(id) {
    await fetch(`http://localhost:8080/products/${id}`, {
        method: 'DELETE'
    });
    carregarProdutos();
}

function editarProduto(id){
    localStorage.setItem("produtoEditar", id);
    window.location.href="updateProduct.html";
}



function adicionarAoCarrinho(produto){ //funcao que quando clica em um botao de carrinho, o produto é adicionado ao carrinho
    const produtoExistente = carrinho.find(p => p.id === produto.id); //procura se o produto existe
        if(produtoExistente){ 
             produtoExistente.quantidadeKimono += 1;
        } else {
            carrinho.push({
                id: produto.id,
                nomeKimono: produto.nomeKimono,
                precoKimono: produto.precoKimono,
                imagem: produto.imagem,
                quantidadeKimono: 1
            });
        }
         atualizarCarrinho();  //se essa função ocorrer, chama a outra funcao que adiciona o produto ao carrinho
}

function atualizarCarrinho(){ // quando todo item é adicionado essa funcao atualiza

    cartContainer.innerHTML = ""; //chama a variavel do cartContainer e atribui a ela a funcao do innerHTML para ser modificado

    let total = 0; //atribui o padrao do total pra 0

    carrinho.forEach(produto => { // verifica toda o vetor do cartContainer pra fazer calculo de total e inserção de dados
        total += produto.precoKimono * produto.quantidadeKimono; //calcula o total de acordo com o preco e a quant

        const div = document.createElement("div"); //cria a div 
        div.classList.add("cart-box"); //adiciona aa class lista (na classe existente do html)

        div.innerHTML= ` 
           <img src="${produto.imagem}" class="cart-img">
            <div class="detail-box">
                    <div class="cart-product-title">${produto.nomeKimono}</div>
                    <div class="cart-price">R$ ${produto.precoKimono.toFixed(2)}</div>
                    <input type="number" min="1" value="${produto.quantidadeKimono}" 
                    class="cart-quantity" data-id="${produto.id}">
                </div>
            <div class="cart-remove-item" data-id="${produto.id}">🗑️</div>
            `

            cartContainer.appendChild(div); //insere os dados

            localStorage.setItem("carrinho", JSON.stringify(carrinho));

    });

    function removerDoCarrinho(idProduto) {
    // filtra o array e remove o item com o id correspondente
    carrinho = carrinho.filter(p => p.id !== idProduto);

    // atualiza o carrinho na tela
    atualizarCarrinho();
    }

    totalElement.textContent = "R$ " + total.toFixed(2); //mantém o total fixo e adiciona text content nele

    const botoesRemover = document.querySelectorAll(".cart-remove-item");
    botoesRemover.forEach(botao => {
        botao.addEventListener("click", () => {
            const idProduto = parseInt(botao.getAttribute("data-id"));
            removerDoCarrinho(idProduto);
        });
    });

    // Atualiza quantidade ao alterar o input
    const inputsQuantidade = document.querySelectorAll(".cart-quantity");
    inputsQuantidade.forEach(input => {
        input.addEventListener("change", (e) => {
            const idProduto = parseInt(input.getAttribute("data-id"));
            const novaQuantidade = parseInt(e.target.value);

            const produto = carrinho.find(p => p.id === idProduto);
            if (produto && novaQuantidade > 0) {
                produto.quantidadeKimono = novaQuantidade;
                atualizarCarrinho(); // atualiza total e salva no localStorage
            }
        });
    });



}
const btnBuy = document.getElementById("btnBuy");

if (btnBuy) {
  btnBuy.addEventListener("click", () => {
    if (carrinho.length === 0) {
      alert("Seu carrinho está vazio!");
      return;
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    window.location.href = "paypage.html";
  });
}
carregarProdutos(); //após toda a injeção de dados, a funcao "geral" é chamada e verifica se tudo ocorreu como desejado