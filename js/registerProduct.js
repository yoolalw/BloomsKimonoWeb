const form = document.getElementById('registerProductForm');
const message = document.getElementById('message');


form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nomeKimono = document.getElementById('nomeKimono').value;
  const precoKimono = document.getElementById('precoKimono').value; 
  const quantidadeKimono = document.getElementById('quantidadeKimono').value;
  const imagem = document.getElementById('imagem').files[0];

  const formData = new FormData();
  formData.append("nomeKimono", nomeKimono);
  formData.append("precoKimono", precoKimono);
  formData.append("quantidadeKimono", quantidadeKimono);
  
  const urlImg = `produto-${Date.now()}.png`;

 try{
  const { data, error } = await supabase
    .storage
    .from('products')
    .upload(urlImg, imagem)

    if (error) throw error

    const { data: urlData } = supabase
    .storage
    .from('products')
    .getPublicUrl(urlImg)

    const url = urlData.publicUrl()

    formData.append('imagem', url)

  }catch(error){
    message.innerText = "Erro inesperado: " + error
  }

  try {
    const response = await fetch('http://localhost:8080/products/registerProd', {
        method: 'POST',
        headers: {
            "Content-Type": "multipart/form-data"
        },
        body: formData
    });

    if (response.ok) {
      message.innerText = "Produto cadastrado com sucesso!";
      message.style.color = "green";

      setTimeout(() => {
        window.location.href = "home.html";
      }, 1500);

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