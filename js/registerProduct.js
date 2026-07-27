const supabase = window.supabase.createClient(
  "https://neyrjxcpalyrewvwyoui.supabase.co",
  "sb_publishable_V1-gtZmUOULjpLNML9DPzA_FhUO1dj3"
)
console.log(supabase)

const form = document.getElementById('registerProductForm');
const message = document.getElementById('message');

const token = localStorage.getItem("token")
console.log(token)

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  const url = await storageImagem(formData.get("imagem"))

  const json = {
    nomeKimono: formData.get("nomeKimono"),
    precoKimono: formData.get("precoKimono"),
    quantidadeKimono: formData.get("quantidadeKimono"),
    imagem: url //mano
  };

  try {
    const response = await fetch('http://localhost:8080/products/registerProd', {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(json)
    });


    if (response.ok) {
      message.innerText = "Produto cadastrado com sucesso!";
      message.style.color = "green";

      setTimeout(() => {
        window.location.href = "home.html";
      }, 2000);

    } else {
      const data = await response.json();
      message.innerText = data.message || "Erro ao cadastrar produto.";
      message.style.color = "red";
    }
  } catch (error) {
    message.innerText = "Erro de conexão com servidor!";
    message.style.color = "red";
  }
});

/**
 * @param img {File}
 * @returns {string}
 */
async function storageImagem(imagem) {
  const urlImg = `produto-${Date.now()}.png`;

  //faz o upload pro storage
  const { data, error } = await supabase
    .storage
    .from('products')
    .upload(`public/${urlImg}`, imagem)

  if (error) throw error

  const { data: urlData } = await supabase
    .storage
    .from('products')
    .getPublicUrl(`public/${urlImg}`)

  return urlData.publicUrl;
}