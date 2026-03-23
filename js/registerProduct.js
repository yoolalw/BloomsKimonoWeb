const message = document.getElementById("message");

const registerProductForm = document.querySelector("#registerProductForm")
const formData = new FormData(registerProductForm);

registerProductForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    async function registerProduct() {
        const nomeKimono = document.getElementById("nomeKimono").value;
        const precoKimono = document.getElementById("precoKimono").value;
        const quantidadeKimono = document.getElementById("quantidadeKimono").value;
        const imagem = document.getElementById("imagem").files[0];

        formData.append('nomeKimono', nomeKimono);
        formData.append('precoKimono', precoKimono);
        formData.append('quantidadeKimono', quantidadeKimono);
        formData.append('imagem', imagem);
        
        try {
            const reponse = await fetch('http://localhost:8080/products', {
                method: 'POST',
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                body: formData
            });
            if (reponse.ok) {
                message.innerHTML = "Conexao realizada"


            } else {
                const jsonResponse = reponse.json();
                console.log(jsonResponse);
                message.innerHTML = "Ocorreu algum erro ao tentar cadastrar"
            }


            const storage = await fetch('https://supabase.com/dashboard/project/neyrjxcpalyrewvwyoui/storage/files/buckets/products', {
                headers: {
                    "apikey": "sb_secret_NVx1DAHUAjAjMrpUlck1Fg_PcKTIB_Q",
                    "Authorization": "Bearer sb_secret_NVx1DAHUAjAjMrpUlck1Fg_PcKTIB_Q"
                },
                method: 'POST',
                body: formData
            })
            if(storage.ok){
                const jsonStorage = storage.json();
                console.log(jsonStorage);
                message.innerHTML("Imagem e produto cadastrados!");
            }

        } catch (error) {
            console.error(error);
            message.innerHTML = "Erro de conexão com servidor!";
        }
    }
    registerProduct();
})