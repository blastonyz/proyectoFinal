
document.addEventListener('submit', function (event)  {
    event.preventDefault();
            const form = event.target;
             const productId = form.getAttribute('data-id');
             const quantityInput = document.getElementById('quantityIn');
            console.log(quantityInput,productId);
            const quantity = parseInt(quantityInput.value);
            console.log(productId,quantity);
            async function addProduct(productId,quantity){
                const data = {
                    productId,
                    quantity:quantity
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
          addProduct(productId,quantity);
    });
    
// const quantityInput = document.getElementById(`${"quantity"+productId}`);
