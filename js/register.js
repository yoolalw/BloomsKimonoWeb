const form = document.querySelector("#registerForm");
const message = document.getElementById("message");
const formData = new FormData(form);

form.addEventListener('submit', async function (event) {
    event.preventDefault();
    await registerUser();

    async function registerUser() {

        const nomeUser = document.getElementById("nomeUser").value;
        const emailUser = document.getElementById("emailUser").value;
        const senhaUser = document.getElementById("senhaUser").value;
        const confSenhaUser = document.getElementById("confSenhaUser").value;

        if (senhaUser !== confSenhaUser) {
            message.innerHTML = "As senhas nao coincidem!";
        } else {

            if (msgError()) return
            const isEmailTaken = await verifyEmail(emailUser)

            if (isEmailTaken) {
                message.innerHTML = "Este email ja está sendo utilizado!"
                return
            }
            const newUser = {
                nomeUser: nomeUser,
                emailUser: emailUser,
                senhaUser: senhaUser
            }

            try {
                const response = await fetch('http://localhost:8080/users/register', {
                    method: 'POST',
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(newUser)
                })

                const dataUser = await response.json();
                console.log(dataUser)
                message.innerHTML = "Registro enviado!";

                setTimeout(() => {
                    window.location.href = "home.html";
                }, 2000);

            } catch (error) {
                message.innerHTML = 'Erro de conexão! ' + error;
            }
        }
    }
});

function msgError() {
    if (document.getElementById("nomeUser").value == "") {
        return message.innerHTML = "Campo nome vazio!"
    } else if (document.getElementById("emailUser").value == "") {
        return message.innerHTML = "Campo email vazio!"
    } else if (document.getElementById("senhaUser").value == "" || document.getElementById("confSenhaUser").value == "") {
        return message.innerHTML = "Campos de senha vazio!"
    }
}

async function verifyEmail(emailUser) {
    try {
        const response = await fetch(`http://localhost:8080/users/verifyEmail?emailUser=${encodeURIComponent(emailUser)}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            console.error("erro response");
            return false;
        }

        const data = await response.json();
        return !!data?.existe;
    } catch (e) {
        console.error(e);
        return false;
    }
}
