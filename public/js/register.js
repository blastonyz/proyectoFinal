const regForm = document.getElementById('registerForm');
regForm.addEventListener('submit', (event) =>{
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

    fetch('/sessions/register',{
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((response) => {
        console.log(response);
    })
    .catch((err) => {
        console.log(err);
    });
})