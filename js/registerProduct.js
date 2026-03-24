import { createClient } from "https://esm.sh/@supabase/supabase-js"

const supabase = createClient('https://supabase.com/dashboard/project/neyrjxcpalyrewvwyoui/storage/files/buckets/products',
    'sb_publishable_V1-gtZmUOULjpLNML9DPzA_FhUO1dj3')


console.log(supabase);

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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
        
        

// Create a single supabase client for interacting with your database
        
        try{
        const { error } = await supabase
            .from('imagem')
            .insert({imagem})
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
            createClient


        } catch (error) {
            console.error(error);
            message.innerHTML = "Erro de conexão com servidor!";
        }
    }
    registerProduct();
})