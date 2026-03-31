import { createClient } from "https://esm.sh/@supabase/supabase-js"

const supabase = createClient('https://neyrjxcpalyrewvwyoui.supabase.co',
    'sb_publishable_V1-gtZmUOULjpLNML9DPzA_FhUO1dj3')

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const message = document.getElementById("message");
const registerProductForm = document.querySelector("#registerProductForm")

registerProductForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    
    const formData = new FormData(registerProductForm);
    async function registerProduct() {

        
    const nomeKimono = document.getElementById("nomeKimono").value;
    const precoKimono = document.getElementById("precoKimono").value;
    const quantidadeKimono = document.getElementById("quantidadeKimono").value;
    const imagem = document.getElementById("imagem").files[0];

    console.log(nomeKimono)

        try{
        const { data, error } = await supabase.from('products').insert()
        } catch (error){
            return error;
        }
    
        try {
            const reponse = await fetch('http://localhost:8080/products/registerProd', {
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


        } catch (error) {
            console.error(error);
            message.innerHTML = "Erro de conexão com servidor!";
        }
    }
    registerProduct();
})