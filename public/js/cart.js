const cartDiv = document.getElementById('cart');
const cid = cartDiv.dataset.cid;
console.log('cid', cid)
fetch(`/api/carts/${cid}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
})
    .then(response => response.json())
    .then(cartDb =>{
       console.log(cartDb); 
       const cartContainer = document.querySelector('.productDetailsCart');
       cartContainer.innerHTML = '';

       cartDb.cartDb.forEach(product => {
            
        
        const productContainer = document.createElement('div');
        productContainer.classList.add('productContainerCart');
        
        productContainer.innerHTML = `
                        <article class="productDetailsCart">
                            <header class="productTitle">
                                <p>${product.title}</p>
                            </header>    
                            <p>Descripcion: ${product.description}</p>
                            <p>Precio: $${product.price}</p>
                            <p>Categoria: ${product.category}</p>
                            <p>Cantidad: ${product.quantity}</p>
                            <p>Subtotal: ${product.subTotal}</p>
                        </article>
                    `;
                    cartContainer.appendChild(productContainer);
    });
    const purchaseLink = document.createElement('a');
    purchaseLink.setAttribute('href', `/purchase/${cid}`);
    purchaseLink.textContent = 'Comprar';
    purchaseLink.classList.add('link');
    cartContainer.appendChild(purchaseLink);
    return cartDb;
})
.then(cartDb=>{
    const notStockContainer = document.getElementById('notStockContainer');
    notStockContainer.innerHTML = '';
    if (cartDb.notStock && cartDb.notStock.length > 0) {
   
     
        cartDb.notStock.forEach(product => {
            
        
            const productContainer = document.createElement('div');
            productContainer.classList.add('productContainerCart');
            
            productContainer.innerHTML = `
            <article class="productDetailsCart">
            <header class="productTitle">
                <p>${product.prodId.title}</p>
            </header>    
            <p>Descripcion: ${product.prodId.description}</p>
            <p>Precio: $${product.prodId.price}</p>
            <p>Categoria: ${product.prodId.category}</p>
            <p>Cantidad: ${product.quantity}</p>
          
        </article>`;
                        notStockContainer.appendChild(productContainer);
        });
    }
})