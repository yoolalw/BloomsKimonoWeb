const message = document.getElementById('message')
const loginForm = document.getElementById('loginForm')



loginForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const formData = new FormData(loginForm)

    const logData = {
        emailUser: formData.get('emailUser'),
        senhaUser: formData.get('senhaUser')
    }

    async function loginPost() {

        try {

            const response = await fetch('http://localhost:8080/users/login', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(logData)
            })

            const result = await response.json().catch(()=>({}));

            if (!response.ok) {
                console.log('login nao efetuado')
                message.textContent = "Nome ou senha inválidos."
                return
            } 

            console.log(response.status)
            message.textContent = "Login efetuado com sucesso!"
            setTimeout(() => {
                window.location.href = "home.html"
            }, 2000)

        } catch (e) {
            throw new Error(e)
        }
    } loginPost()
})

