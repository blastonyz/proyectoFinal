//agregar producto y cantidad al carrito
document.addEventListener('submit', function (event)  {
    event.preventDefault();
            const form = event.target;
             const productId = form.getAttribute('data-id');
             const quantityInput = document.getElementById(`${"quantityIn"+productId}`);
            console.log(quantityInput,productId);
            const quantityAd = parseInt(quantityInput.value);
            console.log('productId:', productId);
            console.log('quantityInput:', quantityInput);
            console.log('quantityAd:', quantityAd);
        
            if (isNaN(quantityAd) || quantityAd <= 0) {
                console.log('Cantidad inválida');
                return;
            }
            console.log(productId,quantityAd);
            async function addProduct(productId,quantityAd){
                const data = {
                    productId,
                    quantity:quantityAd
                };
                
                // Enviar la información al servidor
                fetch('/api/carts', {
                    method: 'POST',
                    body: JSON.stringify(data),
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
                 
            }
          addProduct(productId,quantityAd);
          quantityInput.value = '';
    });
    //manejo logout
    document.getElementById('logoutButton').addEventListener('click', function () {
        
        fetch('/sessions/logout', {
            method: 'GET',
        })
            .then((response) => {
                window.location.href = response.url;
               
            })
            .catch((err) => {
                console.log(err);
            });
    });
