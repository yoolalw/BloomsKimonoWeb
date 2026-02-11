const produtos = [ //cria uma div que gera todos os produtos de formas diferentes
    { //criacao da lista dos produtos
        nomeKimono: "Kimono Rosa Floral",
        precoKimono: 119.90,
        imagem: "https://i.pinimg.com/736x/a9/be/2d/a9be2d5bd3afe8c88d6704c8b550395f.jpg"
    }, 
    {
        nomeKimono: "Kimono azul",
        precoKimono: 120.00,
        imagem: "https://i.pinimg.com/736x/98/79/a1/9879a145d580556d14991fb16d27fc59.jpg"
    }
]


const container = document.getElementById("produto"); // cria um container pra ficar recriando sempre que entrar um novo produto dentro do estoque

produtos.forEach(produto => {
    container.innerHTML += `
        <div class="image-content">
            <img src="${produto.imagem}" style="width:100%; height:80%; object-fit:cover; border-radius: 10px;">

            <h3 style="text-align:left; margin-left: 11px; font-size: 22px; margin-top: 10px;">${produto.nomeKimono}</h3>
            
            <p style="text-align:left; margin-left: 11px; font-size: 22px; margin-top: 0px;">R$ ${produto.precoKimono.toFixed(2)}</p>

            <button class="cart-btn-img" onclick="adicionarAoCarrinho()">🛒</button>
            

        </div>
    `;


});




function adicionarAoCarrinho(nomeKimono){
    alert(nomeKimono + "foi adicionado ao carrinho!");
}

const btn = document.getElementById("cart-button-header"); //declara o botao

    btn.onclick = () => { //botao.evento (onclick)
        window.open("http://127.0.0.1:5500/BloomsKimonoWeb/carrinho.html"); //sempre que clicar no botao, vai abrir essa pag}
}