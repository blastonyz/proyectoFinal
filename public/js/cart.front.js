document.addEventListener('addProduct', () => {
    const addToCartForms = document.querySelectorAll('.addCart');

    addToCartForms.forEach(form => {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const productId = form.getAttribute('data-id');
            const quantityInput = form.querySelector('quantity');
            const quantity = parseInt(quantityInput.value);

          
                // Enviar la información al servidor
                fetch('/api/cart', {
                    method: 'POST',
                    body: JSON.stringify({ productId, quantity }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    
                });
                 
    });
    });
});
