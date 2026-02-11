const produtos = [ //cria uma div que gera todos os produtos de formas diferentes
    { //criacao da lista dos produtos
        nomeKimono: "Kimono Rosa Floral",
        precoKimono: 119.90,
        imagem: "https://i.pinimg.com/736x/79/2a/ff/792aff8ab6df34b17444c1871b06aefe.jpg/300x340"
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
            <img src="${produtos.imagem}" style="width:100%; height:80%; object-fit:cover;">
            <h3 style="text-align:center;">${produto.nomeKimono}</h3>
            <p style="text-align:center;">R$ ${produto.precoKimono.toFixed(2)}</p>
        </div>
    `;


});