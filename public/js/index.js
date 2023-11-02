import { emit } from "../../src/socket";

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
})

const formMessageUpdate = document.getElementById('products-update');
formMessageUpdate.addEventListener('submit', (even) =>{
    even.preventDefault();
    const inputTitleUp = document.getElementById('titleUp')
    const title = inputTitleUp.value;
    const inputdescriptionUp = document.getElementById('descriptionUp');
    const description = inputdescriptionUp.value;
    const price = inputPriceUp.value;
    const inputCategoryUp = document.getElementById('categoryUp');
    const category =  inputCategoryUp.value;
    const inputCodeUp = document.getElementById('codeUp');
    const code = inputCodeUp.value;
    const inputStockUp = document.getElementById('stockUp');
    const stock = inputStockUp.value;
    const inputStatusUp = document.getElementById('statusUp');
    const statusP = inputStatusUp.value;

    const updateProduct = {
        title,
        description,
        price,
        category,
        code,
        stock,
        statusP,
    }

    socket.emit('product-update', updateProduct);
})

const formMessageFind = document.getElementById('products-find');
formMessageFind.addEventListener('submit', (even) =>{
    even.preventDefault();
    const IdFind = document.getElementById('findId');
    const findId = IdFind.value;

    socket.emit('products-find', findId);
})

const formMessageDelete = document.getElementById('products-delete');
formMessageDelete.addEventListener('submit', (even) =>{
    even.preventDefault();
    const IdDelete = document.getElementById('deleteId');
    const deleteId = IdDelete.value;

    socket.emit('products-delete', deleteId);
})

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
     prodValues.appendChild('li')  ;
    });

    console.log('List', data);
});
//escucho producto buscado
socket.on('find',(prodFind) =>{
    const productFindContainer  = document.getElementById('product-find')
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
    prodFindVal.appendChild('p');
})
//escucho producto borrado
socket.on('delete',(prodDel) =>{
    const productDelContainer  = document.getElementById('product-delete')
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
    prodDelVal.appendChild('p');
})