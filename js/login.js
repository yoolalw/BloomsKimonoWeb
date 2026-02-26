document.addEventListener("DOMContentLoaded", () => {


const form = document.getElementById('loginForm');
const message = document.getElementById('message');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const emailUser = document.getElementById('emailUser').value;
        const senhaUser = document.getElementById('senhaUser').value;

        try {
            const response = await fetch('http://localhost:8080/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ emailUser, senhaUser })
            });

            // Use .json() porque seu backend retorna JSON
            const data = await response.json();

            if(response.ok){
                message.innerText = "Login realizado com sucesso!";
                message.style.color = 'green';
                
                
                setTimeout(() => {
                    window.location.href = "home.html";
                }, 1000);
            
            } else {
                message.innerText = data.message || 'Erro ao realizar login';
                message.style.color = 'red';
            }
        } catch(error) {
            message.innerText="Erro de conexão com o servidor!";
            message.style.color = 'red';
            console.error(error);
        }
    });
});