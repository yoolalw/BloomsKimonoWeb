const container = document.getElementById("produto"); // cria um container pra ficar recriando sempre que entrar um novo produto dentro do estoque
const cartContainer = document.querySelector(".cart-content");
const totalElement = document.querySelector(".total-price");

let carrinho = [];

async function carregarProdutos() {
    try{
        const response = await fetch('http://localhost:8081/produtos'); //começa a puxar os dados vindo da /products
        const produtos = await response.json(); 

        produtos.forEach(produto => {

            const div = document.createElement("div"); //cria uma class html dentro do js, para gerar automaticamente todos os produtos dentro da tela home (para nao ficar fixo, e sim de acordo com oq esta no banco de dados)
            div.classList.add("image-content"); //adiciona a lista o image-content
            div.innerHTML  = ` 
                    <img src="${produto.imagem}" style="width:100%; height:80%; object-fit:cover; border-radius: 10px;">

                    <h3 style="text-align:left; margin-left: 11px; font-size: 22px; margin-top: 10px;">${produto.nomeKimono}</h3>
                    
                    <p style="text-align:left; margin-left: 11px; font-size: 22px; margin-top: 0px;">R$ ${produto.precoKimono.toFixed(2)}</p>

                    <button class="cart-btn-img">🛒</button>
                    

                </div>
            `; //inicia a funcao do html + css
            container.appendChild(div); //"coloque essa div dentro do container no html " basicamente cria uma div nova dentro do html e fixa isso o appendChild() sempre insere dados dentro de outros
            
            const btnProduto = div.querySelector(".cart-btn-img");  //o div.querySelector procura dentro de uma div o ".item"

            btnProduto.onclick = () => {
                adicionarAoCarrinho(produto);
             }; //adiciona ao btnProduto uma funcao que toda vez que ele for clicado a funcao de adicionarAoCarrinho(produto) seja chamada
                
        });

        }catch(error){ //por mais que seja explicativo, ele verifica se os dados foram inseridos e depois mostra na tela com o innerHTML
            console.error("Erro ao carregar os produtos", error);
            container.innerHTML = "<p> Erro ao carregar os produtos. </p>";

        }
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
            <img src=" ${produto.imagem}" class="cart-img">
            <div class="detail-box">
                    <div class="cart-product-title">${produto.nomeKimono}</div>
                    <div class="cart-price">R$ ${produto.precoKimono.toFixed(2)}</div>
                    <input type="number" min="1" value="${produto.quantidadeKimono}" 
                    class="cart-quantity" data-id="${produto.id}">
                </div>
            <div class="cart-remove-item" data-id="${produto.id}">🗑️</div>
            `

            cartContainer.appendChild(div); //insere os dados

    });

    totalElement.textContent = "R$ " + total.toFixed(2); //mantém o total fixo e adiciona text content nele
}
carregarProdutos(); //após toda a injeção de dados, a funcao "geral" é chamada e verifica se tudo ocorreu como desejado