const { post } = require("../../routes/user")

document.getElementById("registerForm").addEventListener('submit', async function(e) {
    e.preventDefault()
    const name = document.getElementById('name').value 
    const email = document.getElementById('email').value 
    const password = document.getElementById('password').value 

    const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, email, password})
    })

    const data = await response.json()
    if(response.ok) {
        alert('Registration successful')

    } else {
        alert(`Regstration failed: ${data.msg}`)
    }
})

document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault()

    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password})
    })

    const data = await response.json()

    if (response.ok) {
        alert('Login Successful')
        //Save the token in MongoDB
        window.location.href = '/profile' //Profile Page
    } else {
        alert('Login Failed')
    }
});