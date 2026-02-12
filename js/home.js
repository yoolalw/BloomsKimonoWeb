const container = document.getElementById("produto"); // cria um container pra ficar recriando sempre que entrar um novo produto dentro do estoque

async function carregarProdutos() {
    try{
        const response = await fetch('http://localhost:8081/users/register');
        const produtos = await response.json();

        produtos.forEach(produto => {
            const div = document.createElement("div");
            div.classList.add("image-content");
            div.innerHTML = `
                    <img src="${produto.imagem}" style="width:100%; height:80%; object-fit:cover; border-radius: 10px;">

                    <h3 style="text-align:left; margin-left: 11px; font-size: 22px; margin-top: 10px;">${produto.nomeKimono}</h3>
                    
                    <p style="text-align:left; margin-left: 11px; font-size: 22px; margin-top: 0px;">R$ ${produto.precoKimono.toFixed(2)}</p>

                    <button class="cart-btn-img" onclick="adicionarAoCarrinho()">🛒</button>
                    

                </div>
            `;
            container.appendChild(div);
            
            
            const btnProduto = div.querySelector(".cart-btn-img");
            btnProduto.onclick = () => {
                alert(produto.nomeKimono + " adicionado ao carrinho!");
            };
        });

        }catch(error){
            console.error("Erro ao carregar os produtos", error);
            container.innerHTML = "<p> Erro ao carregar os produtos. </p>";

        }
    }
carregarProdutos();


