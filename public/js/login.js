const logForm = document.getElementById('formLogin');
logForm.addEventListener('submit', async (event) =>{
    event.preventDefault();
    const email = document.getElementById('emailInp').value;
    const password = document.getElementById('passwordInp').value;    
    const formData = {
        email,
        password
    };

   
    fetch('/api/sessions/login', {
            method: 'POST',
            body: JSON.stringify(formData) ,
            headers: {
        'Content-Type': 'application/json'
           },                    
    }
)
.then((response) => {
    if (response.status === 401) {
        window.location.href = '/login';
    }
    
return response.json();


})
.then((data) => {
    console.log('data',data); 
    window.location.href = data.url; 
    
})
.catch((error) => {
    console.log(error);
    window.location.href = '/login';
});
});