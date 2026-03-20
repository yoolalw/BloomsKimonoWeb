const form = document.querySelector("#registerForm");
const btnRegister = document.getElementById("btnRegister");
const message = document.getElementById("message");
const formData = new FormData(form);

form.addEventListener('submit', async function (event) {
    event.preventDefault();

    async function registerUser() {

        const nomeUser = document.getElementById("#nomeUser").value;
        const emailUser = document.getElementById("#emailUser").value;
        const senhaUser = document.getElementById("#senhaUser").value;
        const confSenhaUser = document.getElementById("#confSenhaUser").value;

        if(senhaUser !== confSenhaUser){
            message.innerHTML = "As senhas nao coincidem!"; 
        } else {

            const newUser = {
                nomeUser: nomeUser,
                emailUser: emailUser,
                senhaUser: senhaUser
            }

            try{

                const response = await fetch('http://localhost:8080/register', {
                    method: 'POST',
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(newUser)
                })
                
                const dataUser = response.json();
                console.log(dataUser)
                message.innerHTML = "Registro enviado!";


            } catch (error){
                message.innerHTML('Erro de conexão! ' + error );    
            }

        }   

        registerUser();     
    }
})