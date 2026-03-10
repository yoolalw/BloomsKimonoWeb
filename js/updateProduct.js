const form = document.getElementById('registerProductForm');
const message = document.getElementById('message');

const produtoId = localStorage.getItem("produtoEditar");

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nomeKimono = document.getElementById('nomeKimono').value;
  const precoKimono = document.getElementById('precoKimono').value.replace(',', '.'); 
  const quantidadeKimono = document.getElementById('quantidadeKimono').value;
  const imagem = document.getElementById('imagem').files[0];

  const formData = {    
  nomeKimono: nomeKimono,
  precoKimono: precoKimono,
  quantidadeKimono: quantidadeKimono,
  imagem: imagem

  };
  try {
    const response = await fetch(`http://localhost:8080/products/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        nomeKimono: "nomeKimono"   
      })
    });

    if (response.ok) {
      message.innerText = "Produto cadastrado com sucesso!";
      message.style.color = "green";

      form.reset();

      setTimeout(() => {
        window.location.href = "home.html";
      }, 1500);

    } else {
      const data = await response.json();
      message.innerText = data.message || "Erro ao atualizar produto.";
      message.style.color = "red";
    }

  } catch (error) {
    message.innerText = "Erro de conexão com servidor!";
    message.style.color = "red";
    console.error(error);
  }
});
