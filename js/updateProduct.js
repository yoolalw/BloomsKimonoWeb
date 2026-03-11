const form = document.getElementById('updateProductForm');
const message = document.getElementById('message');

const produtoEditar = localStorage.getItem("produtoEditar");

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nomeKimono = document.getElementById('nomeKimono').value;
  const precoKimono = document.getElementById('precoKimono').value.replace(',', '.');
  const quantidadeKimono = document.getElementById('quantidadeKimono').value;
  const imagem = document.getElementById('imagem').files[0];

  const formData = new FormData();
  formData.append("nomeKimono", nomeKimono);
  formData.append("precoKimono", precoKimono);
  formData.append("quantidadeKimono", quantidadeKimono);
  formData.append("imagem", imagem);

  alert(produtoEditar)

  try {
    const response = await fetch(`http://localhost:8080/products/${produtoEditar}`, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data"
      },
      body: formData

    });

    if (response.ok) {
      message.innerText = "Produto atualizado com sucesso!";
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
