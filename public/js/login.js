const logForm = document.getElementById('formLogin');
logForm.addEventListener('submit', (event) =>{
    event.preventDefault();
   
    const email = document.getElementById('emailInp').value;
    const password = document.getElementById('passwordInp').value;    

    const userReg = {
                    email,
                    password
    };

    fetch('/api/sessions/login',{
        method: 'POST',
        body: JSON.stringify(userReg),
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