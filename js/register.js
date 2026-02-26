
const form = document.getElementById('registerForm'); //pega o id do form
const message = document.getElementById('message'); //Mensagem de verificacao de registro, se foi concluido ou nao

//espera um "evento" do botao enviar || async = recebe as informações do form || (e) = event
form.addEventListener ('submit', async (e) => {
    e.preventDefault();

    // declara a var emailUser/senhaUser, e pega o valor atribuido a ela
    const nomeUser = document.getElementById('nomeUser').value;
    const emailUser = document.getElementById('emailUser').value;
    const senhaUser = document.getElementById('senhaUser').value;
    const confirmarSenhaUser = document.getElementById('confirmarSenhaUser').value;

    if(senhaUser !== confirmarSenhaUser){ //verificacao de senha
        message.innerText = 'As senhas nao coicidissem, por favor tente novamente!';
        message.style.color = 'red';
        return;
    }
    try{
        //fetch = comunicação direta com os servidores e api || await espera api responder antes de realizar alguma ação
        //só funciona dentro do async

        const response = await fetch('http://localhost:8080/users/register',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' }, //informação sobre os dados
            body: JSON.stringify({nomeUser, emailUser, senhaUser}) // traduz o texto js para json || resumindo o codigo caso os dois ids tenham o mesmo nome
        });

        const data = await response.json(); //espera a resposta vinda do json

        if(response.ok){
            message.innerText = 'Registro realizado com sucesso!'; //se retornar ok(200), aparecerá essa notificacao
            message.style.color = 'green';

            setTimeout(() => {
            window.location = "home.html";
            }, 1000 );

        } else {
            message.innerText = data.message || 'Erro ao se registrar';
            message.style.color = 'red';

        }

    } catch(error) {
        message.innerText="Erro de conexao com o servidor!";
        message.style.color = 'red';
        console.error(error)
    }


})
