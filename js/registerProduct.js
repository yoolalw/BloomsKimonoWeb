const form = document.getElementById('registerProductForm');
const message = document.getElementById('message');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nomeKimono = document.getElementById('nomeKimono').value;
  const precoKimono = document.getElementById('precoKimono').value.replace(',', '.'); // ✅ Corrige vírgula
  const quantidadeKimono = document.getElementById('quantidadeKimono').value;
  const imagem = document.getElementById('imagem').files[0];

  const formData = new FormData();
  formData.append("nomeKimono", nomeKimono);
  formData.append("precoKimono", precoKimono);
  formData.append("quantidadeKimono", quantidadeKimono);
  formData.append("imagem", imagem);

  message.innerText = "Enviando produto...";
  message.style.color = "#a33";

  try {
    const response = await fetch("http://localhost:8080/products", {
      method: "POST",
      body: formData
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
      message.innerText = data.message || "Erro ao cadastrar produto.";
      message.style.color = "red";
    }

  } catch (error) {
    message.innerText = "Erro de conexão com servidor!";
    message.style.color = "red";
    console.error(error);
  }
});
