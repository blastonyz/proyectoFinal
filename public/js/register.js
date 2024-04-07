const regForm = document.getElementById('registerForm');
regForm.addEventListener('submit', async (event) =>{
    event.preventDefault();
    const first_name = document.getElementById('first_nameInp').value;    
    const last_name = document.getElementById('last_nameInp').value;
    const email = document.getElementById('emailInp').value;
    const age = document.getElementById('ageInp').value;
    const password = document.getElementById('passwordInp').value;    

    const user = {
        first_name,
        last_name,
        email,
        age,
        password
    };

    fetch('/api/sessions/register', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data); 
        window.location.href = data.url; 
    })
    .catch((err) => {
        console.log(err);
    });
})

