const socket = io();


const formMessageAdd = document.getElementById('products-add');
formMessageAdd.addEventListener('submit', (even) =>{
    even.preventDefault();
    const inputTitleAdd = document.getElementById('titleAdd')
    const title = inputTitleAdd.value;
    const inputdescriptionAdd = document.getElementById('descriptionAdd');
    const description = inputdescriptionAdd.value;
    const inputPriceAdd = document.getElementById('priceAdd');
    const price = inputPriceAdd.value;
    const inputCategoryAdd = document.getElementById('categoryAdd');
    const category =  inputCategoryAdd.value;
    const inputCodeAdd = document.getElementById('codeAdd');
    const code = inputCodeAdd.value;
    const inputStockAdd = document.getElementById('stockAdd');
    const stock = inputStockAdd.value;
    const inputStatusAdd = document.getElementById('statusAdd');
    const statusP = inputStatusAdd.value;


    const newProduct = {
                title,
                description,
                price,
                category,
                code,
                stock,
                statusP,
    }
    socket.emit('product-add', newProduct);

    inputTitleAdd.value = '';
    inputdescriptionAdd.value = '';
    inputPriceAdd.value = '';
    inputCategoryAdd.value = '';
    inputCodeAdd.value = '';
    inputStockAdd.value = '';
    inputStatusAdd.value = '';
});

const formMessageUpdate = document.getElementById('products-update');
formMessageUpdate.addEventListener('submit', (even) =>{
    even.preventDefault();
    const idUp = document.getElementById('idUp')
    const prodId = idUp.value;
    const inputTitleUp = document.getElementById('titleUp')
    const newTitle = inputTitleUp.value;
    const inputdescriptionUp = document.getElementById('descriptionUp');
    const newDescription = inputdescriptionUp.value;
    const inputPriceUp = document.getElementById('priceUp');
    const newPrice = inputPriceUp.value;
    const inputCategoryUp = document.getElementById('categoryUp');
    const newCategory =  inputCategoryUp.value;
    const inputCodeUp = document.getElementById('codeUp');
    const newCode = inputCodeUp.value;
    const inputStockUp = document.getElementById('stockUp');
    const newStock = inputStockUp.value;
    const inputStatusUp = document.getElementById('statusUp');
    const newStatusP = inputStatusUp.value;

    const updateProduct = {
        prodId,
        newTitle,
        newDescription,
        newPrice,
        newCategory,
        newCode,
        newStock,
        newStatusP,
    }

    socket.emit('product-update', {updateProduct});

    idUp.value = '';
    inputTitleUp.value = '';
    inputdescriptionUp.value = '';
    inputPriceUp.value = '';
    inputCategoryUp.value = '';
    inputCodeUp.value = '';
    inputStockUp.value = '';
    inputStatusUp.value = '';
});

const formMessageFind = document.getElementById('products-find');
console.log('formMessageFind:', formMessageFind);
formMessageFind.addEventListener('submit', (event) => {
    event.preventDefault();
    const IdFind = document.getElementById('findId');
    const findId = IdFind.value;
    console.log('findId:', findId);
    socket.emit('productsFind', findId);
});

const formMessageDelete = document.getElementById('products-delete');
formMessageDelete.addEventListener('submit', (event) =>{
    event.preventDefault();
    const IdDelete = document.getElementById('deleteId');
    const deleteId = IdDelete.value;
    socket.emit('products-delete', deleteId);
});

//escucha y render lista completa
socket.on('List', (data) => {
    const productRealT = document.getElementById('product-list');
    productRealT.innerHTML = "";
    data.forEach(element => {
     const prodValues = document.createElement('li');
     prodValues.innerText = `
     ${element.title}
     ${element.description}
     ${element.price}
     ${element.category}
     ${element.code}
     ${element.stock}
     ` ;
     productRealT.appendChild(prodValues); ;
    });

    console.log('List', data);
});
//escucho producto buscado
socket.on('find', (prodFind) => {
    console.log('Evento "find" activado');
    const productFindContainer = document.getElementById('findProduct');
    productFindContainer.innerHTML = "";
    const prodFindVal = document.createElement('p');
    prodFindVal.innerText = `
        ${prodFind.title}
        ${prodFind.description}
        ${prodFind.price}
        ${prodFind.category}
        ${prodFind.code}
        ${prodFind.stock}
    `;
    productFindContainer.appendChild(prodFindVal);

   
});


/*
socket.on('delete',(prodDel) =>{
    const productDelContainer  = document.getElementById('deleteProduct')
    productDelContainer.innerHTML = "";
    const prodDelVal = document.createElement('p');
    prodDelVal.innerText = `
                               ${prodDel.title}
                               ${prodDel.description}
                               ${prodDel.price}
                               ${prodDel.category}
                               ${prodDel.code}
                               ${prodDel.stock}
                            `;
    productDelContainer.appendChild(prodDelVal);
});
*/



/* <div id="deleteProduct">
        <h1>Producto Borrado</h1>
    </div>*/

