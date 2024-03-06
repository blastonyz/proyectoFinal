import { expect } from 'chai';
import supertest from 'supertest';

const requester = supertest.agent('http://localhost:8080');

describe('Router Test',function () {
    describe('login admin', function () {

        it('deberia loguearse el admin', async function(){
            const userAdmin = {
                email:'adminCoder@coder.com',
                password:'adminCod3e123'
            };

            const {statusCode, ok, _body} = await requester
                .post('/sessions/login')
                .send(userAdmin);
                
            expect(statusCode).to.be.equal(302);
            console.log(statusCode, ok , _body);    
        });

        it('accediendo a ruta de productos', async function(){
           
            const {statusCode, ok, _body} = await requester.get('/api/productsdb')

            expect(statusCode).to.be.equal(200);
            expect(ok).to.be.ok;
            console.log(statusCode, ok , _body);    
        });

        it('accediendo a ruta de realtime products', async function(){
           
            const {statusCode, ok, _body} = await requester.get('/set/realtimeproducts')

            expect(statusCode).to.be.equal(200);
            expect(ok).to.be.ok;
            console.log(statusCode, ok , _body);    
        });

        it('logout', async function(){
           
            const {statusCode, ok, _body} = await requester.get('/sessions/logout')

            expect(statusCode).to.be.equal(302);    
            console.log(statusCode, ok , _body);    
        });
    })

    describe('registro, login y cart',async function(){
        it('registrando usuario, sin un campo', async function(){
            const userTest = {
                first_name: 'user',
                last_name: 'test',
                email:'userTest@test.com',
                password:'testing'
            };

            const {statusCode, ok, _body} = await requester
                .post('/sessions/register')
                .send(userTest);
            
            expect(statusCode).to.be.equal(400);
            console.log(statusCode, ok , _body);    
        });

        it('registro de un usuario anteriormente registrado', async function(){
            const userTest = {
                first_name: 'user',
                last_name: 'test',
                age: 35,
                email:'userTest@test.com',
                password:'testing'
            };

            const {statusCode, ok, _body} = await requester
                .post('/sessions/register')
                .send(userTest);
            
            expect(statusCode).to.be.equal(400);
            console.log(statusCode, ok , _body);    
        });

        it('deberia loguear el usuario', async function(){
            const userTest = {
                email:'userTest@test.com',
                password:'testing'
            };

            const {statusCode, ok, _body} = await requester
                .post('/sessions/login')
                .send(userTest);

            expect(statusCode).to.be.equal(302);    
            console.log(statusCode, ok , _body);    
        });

        it('deberia fallar al agregar un producto al carrito', async function(){
            const userTest = {
                productId:'productTestId',
                quantity:10
            };

            const {statusCode, ok, _body} = await requester
                .post('/api/carts')
                .send(userTest);

            expect(statusCode).to.be.equal(500);     
            console.log(statusCode, ok , _body);    
        });

        it('deberia agregar un producto al carrito', async function(){
            const userTest = {
                productId:'655a5148d55c6ea6ebbb40c6',
                quantity:10
            };

            const {statusCode, ok, _body} = await requester
                .post('/api/carts')
                .send(userTest);
            
            expect(statusCode).to.be.equal(200); 
            expect(ok).to.be.ok;
            expect(_body).to.be.has.property('newCart');
            console.log(statusCode, ok , _body);    
        });

        it('deberia borrar el producto agregado al carrito', async function(){
           
            const {statusCode, ok, _body} = await requester.delete('/api/carts/65e8a5dd697c433484592efb/products/655a5148d55c6ea6ebbb40c6')
                
            expect(statusCode).to.be.equal(204); 
            expect(ok).to.be.ok;
            console.log(statusCode, ok , _body);    
        });

        it('deberia actualizar el carrito con un array', async function(){
            const products = [{prodId:'655a5148d55c6ea6ebbb40c9', quantity: 10},{prodId:'655a5148d55c6ea6ebbb40c8', quantity: 10}]
            const {statusCode, ok, _body} = await requester
                .put('/api/carts/65e8a5dd697c433484592efb')
                .send(products)

            expect(statusCode).to.be.equal(204); 
            expect(ok).to.be.ok;    
            console.log(statusCode, ok , _body);    
        });

        it('deberia vaciar el carrito', async function(){
          
            const {statusCode, ok, _body} = await requester
                .delete('/api/carts/65e8a5dd697c433484592efb')
             
            expect(statusCode).to.be.equal(204); 
            expect(ok).to.be.ok;    
            console.log(statusCode, ok , _body);    
        });
    })
})