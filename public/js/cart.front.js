

const formAddCart = document.getElementById('addCart')
document.addEventListener('addProduct', async(event) => {
    event.preventDefault();

            const productId = form.getAttribute('data-id');
            const quantityInput = document.getElementById('quantity');
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
          addProduct(_id,quantity);
    });
    

