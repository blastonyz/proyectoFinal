
function renderProducts(products, listContainer) {
    products.forEach(product => {
        const productContainer = document.createElement('div');
        productContainer.classList.add('productContainer');

        productContainer.innerHTML = `
            <article class="productDetails">
                <header class="productTitle">
                    <p>${product.title}</p>
                </header>    
                <p>Descripcion: ${product.description}</p>
                <p>Precio: $${product.price}</p>
                <p>Categoria: ${product.category}</p>
                <p>Codigo: ${product.code}</p>
                <p>Stock: ${product.stock}</p>
                <p>${product.statusP}</p>
                <form id="addCart" data-id="${product._id}">
                    <input type="number" id="quantityIn${product._id}" placeholder="0" min="1" class="inputs">
                    <button type="submit" class="submitButton">Agregar</button>
                </form>
            </article>
        `;
        listContainer.appendChild(productContainer);
    });
}

fetch('/api/productsdb', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
})
    .then(response => response.json())
    .then(productResponse => {
        console.log('product response',productResponse);
        const welcomeContainer = document.querySelector('.welcome');
        const firstNameSpan = welcomeContainer.querySelector('#firstName');
        const lastNameSpan = welcomeContainer.querySelector('#lastName');
        const cartLink = welcomeContainer.querySelector('#cartLink');
   
        firstNameSpan.textContent = productResponse.dataUserDTO.firstName;
        lastNameSpan.textContent = productResponse.dataUserDTO.lastName;
        cartLink.href = `/carts/${productResponse.dataUserDTO.cart}`;

        const listContainer = document.querySelector('.listContainer');
        const productController = document.querySelector('.productController');
        const totalPagesSpan = productController.querySelector('#totalPages');
        const currentPageSpan = productController.querySelector('#currentPage');
        const prevLink = productController.querySelector('#prevLink');
        const nextLink = productController.querySelector('#nextLink');

        listContainer.innerHTML = '';

       renderProducts(productResponse.productResponse.payload, listContainer);

    
        totalPagesSpan.textContent = productResponse.productResponse.totalPages;
        currentPageSpan.textContent = productResponse.productResponse.page;
        const prevLinkHref = productResponse.productResponse.prevLink ? productResponse.productResponse.prevLink : '#';
        prevLink.setAttribute('href', prevLinkHref);
        nextLink.href = productResponse.productResponse.nextLink || '#';

        return productResponse;
        })
        .then(nextPageResponse =>{
            console.log('res pag2',nextPageResponse)
            document.getElementById('nextLink').addEventListener('click',function (event) {
                event.preventDefault();
                
                fetch(nextPageResponse.productResponse.nextLink, {      
                    method: 'GET',
                     headers: {
                         'Content-Type': 'application/json',
                    },
                })
             
                .then(response => response.json())
                .then(nextPageResponse => {
                    const listContainer = document.querySelector('.listContainer');
                    listContainer.innerHTML = '';
                    renderProducts(nextPageResponse.productResponse.payload, listContainer); 
                    currentPage.textContent = nextPageResponse.productResponse.page;
                })    
            }) 
        })    
                    document.getElementById('prevLink').addEventListener('click',function (event) {
                        event.preventDefault();
                        const currentPage = parseInt(document.getElementById('currentPage').textContent);
                        const prevPageLink = document.getElementById('prevLink').getAttribute('href');
                        console.log('link previo',prevPageLink)
                        if (currentPage === 1 || !prevPageLink) {
                            console.log('No hay página anterior disponible.');
                            return;
                        }else{
                            const limit = 10; 
                            const prevPage = currentPage - 1; 
                            
                        fetch(`/api/productsdb?limit=${limit}&page=${prevPage}`, {      
                            method: 'GET',
                             headers: {
                                 'Content-Type': 'application/json',
                            },
                        })
                     
                        .then(response => response.json())
                        .then(prevPageResponse =>{
                            const listContainer = document.querySelector('.listContainer');
                            listContainer.innerHTML = '';
                            renderProducts(prevPageResponse.productResponse.payload,listContainer)
                            document.getElementById('currentPage').textContent = prevPageResponse.productResponse.page;
                        })
                    }
                    })        
       
        
        document.addEventListener('submit', function (event) {
            event.preventDefault();
            const form = event.target;
            const productId = form.getAttribute('data-id');
            const quantityInput = document.getElementById(`quantityIn${productId}`);
            const quantityAd = parseInt(quantityInput.value);
            if (isNaN(quantityAd) || quantityAd <= 0) {
                console.log('Cantidad inválida');
                return;
            }
            async function addProduct(productId, quantityAd) {
                const data = {
                    productId,
                    quantity: quantityAd
                };
                fetch('/api/carts', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })  
                    .then((response) => {
                        console.log(response);
                        Swal.fire({
                            icon: 'success', 
                            title: '¡Producto agregado!',
                            text: 'El producto ha sido agregado al carrito correctamente.',
                                            });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
            addProduct(productId, quantityAd);
            quantityInput.value = '';
        });

        document.getElementById('logoutButton').addEventListener('click', function () {
            fetch('/api/sessions/logout', {
                method: 'GET',
            })
                .then((response) => {
                    window.location.href = response.url;
                })
                .catch((err) => {
                    console.log(err);
                });
        });
 