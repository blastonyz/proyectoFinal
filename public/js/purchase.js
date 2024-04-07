const cartDiv = document.getElementById('cart');
const cid = cartDiv.dataset.cid;
console.log('cid', cid);
fetch(`/api/${cid}/purchase`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
})
.then(response => response.json())
.then(data =>{
    const purchaseDetailsContainer = document.querySelector('.productDetailsCart');
    purchaseDetailsContainer.innerHTML = `
        <header class="productTitle">
            <p>Detalles de tu Compra</p>
        </header>
        <p>Codigo: ${data.purchase.code}</p>
        <p>Total: ${data.purchase.amount}</p>
        <p>Usuario: ${data.purchase.purchaser}</p>
    `;

    
    
const notStockContainer = document.querySelector('.notStockContainer');
    notStockContainer.innerHTML = '';
    data.notStock.forEach(product => {
        
        
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
                <p>Stock: ${product.prodId.stock} unidades</p>
                <p>Cantidad: ${product.quantity}</p>
            </article>
        `;
        notStockContainer.appendChild(productContainer);
    });
})


   
