import { emit } from "../../src/socket";

const socket = io();


const formMessageAdd = document.getElementById('products-add');
formMessageAdd.addEventListener('submit', (even) =>{
    even.preventDefault();
    const inputTitleAdd = document.getElementById('titleAdd')
    const titAdd = inputTitleAdd.value;
    const inputdescriptionAdd = document.getElementById('descriptionAdd');
    const descAdd = inputdescriptionAdd.value;
    const inputPriceAdd = document.getElementById('priceAdd');
    const priceAdd = inputPriceAdd.value;
    const inputCategoryAdd = document.getElementById('categoryAdd');
    const CategoryAdd =  inputCategoryAdd.value;
    const inputCodeAdd = document.getElementById('codeAdd');
    const codeAdd = inputCodeAdd.value;
    const inputStockAdd = document.getElementById('stockAdd');
    const StockAdd = inputStockAdd.value;
    const inputStatusAdd = document.getElementById('statusAdd');
    const statusAdd = inputStatusAdd.value;

    const newProduct = {
                titAdd,
                descAdd,
                priceAdd,
                CategoryAdd,
                codeAdd,
                StockAdd,
                statusAdd,
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
    const titUp = inputTitleUp.value;
    const inputdescriptionUp = document.getElementById('descriptionUp');
    const descUp = inputdescriptionUp.value;
    const inputPriceUp = document.getElementById('priceUp');
    const priceUp = inputPriceUp.value;
    const inputCategoryUp = document.getElementById('categoryUp');
    const CategoryUp =  inputCategoryUp.value;
    const inputCodeUp = document.getElementById('codeUp');
    const codeUp = inputCodeUp.value;
    const inputStockUp = document.getElementById('stockUp');
    const StockUp = inputStockUp.value;
    const inputStatusUp = document.getElementById('statusUp');
    const statusUp = inputStatusUp.value;

    const updateProduct = {
        titUp,
        descUp,
        priceUp,
        CategoryUp,
        codeUp,
        StockUp,
        statusUp,
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

socket.on('emition', (data) => {
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

    console.log('event emition', data);
});