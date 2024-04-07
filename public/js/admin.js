console.log('hola');
const idForm = document.getElementById('findId');
idForm.addEventListener('submit', async (event) =>{
    event.preventDefault();
    const uid = document.getElementById('idInp').value;


    fetch(`/api/users/admin/${uid}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);
        userRender(data)

    })
    .catch((err) => {
        console.log(err);
    });
})

function userRender(data){

    const userContainer = document.createElement('div');
       userContainer.innerHTML = `<article>
       <p>Nombre: ${data.first_name}</p>
       <p>Apellido: ${data.last_name}</p>
       <p>Email: ${data.email}</p>
       <p>Role: ${data.role}</p>
       <p>Cart: ${data.cart}</p>
                                 </article>`
        const userParent = document.querySelector('.userFind')
        userParent.appendChild(userContainer);
}

const changeBoton = document.getElementById('updateRoleBtn');
changeBoton.addEventListener('click', function (){
    const uidValue = document.getElementById('idInp').value;
    
    fetch(`/api/users/admin/${uidValue}`,
        {      
        method: 'PUT',
         headers: {
             'Content-Type': 'application/json',
        },
        }    
)
.then((response) => {
    return response.json();
})
.then((data) => {
    console.log(data);
})
})
const deleteBoton = document.getElementById('deleteUserBtn');
deleteBoton.addEventListener('click', function (){
    const uidVal = document.getElementById('idInp').value;
    
    fetch(`/api/users/admin/${uidVal}`,
        {      
        method: 'DELETE',
         headers: {
             'Content-Type': 'application/json',
        },
        }    
)
.then((response) => {
    return response.json();
})
.then((data) => {
    console.log(data);
})
})