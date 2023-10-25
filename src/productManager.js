const fs = require('fs');
const { v4: uuidV4} = require('uuid');

class ProductManager{
   

    constructor(){
        this.products = [];
        this.path = './productos.json'
    }

   async getProducts(){
        if(!fs.existsSync(this.path)){
            return console.log('el archivo no se encuentra')
        }else{
            try {                           
                    const listJSON = await fs.promises.readFile(this.path,'utf-8');
                    const list = JSON.parse(listJSON);                    
                    console.log('Lista de productos:',list);
                    return list;
            }catch (error) {
                console.error(`Ocurrio un error: ${error.message}`)
        }
        }
    }

 async addProduct(title,description,price,category,code,stock,statusP,thumbnail){
        if (!title||!description||!price||!category||!code||!stock||!statusP) {
          return  console.warn("Todos los campos son requeridos");
            
             }
             const validCode = this.products.find((p)=> p.code === code)
             if (validCode) {
                return console.log(`Ya existe este codigo ${code} de producto`);
                
             }else{
                const newProduct = {
                    id: uuidV4(),
                    title,
                    description,
                    price,
                    category,
                    code,
                    stock,
                    statusP,
                    thumbnail,
                }
               
                this.products.push(newProduct)
                

                const content = JSON.stringify(this.products,null,'\t')

                try {
                   await fs.promises.writeFile(this.path,content,'utf-8')
                } catch (error) {
                   console.log(`Ha ocurrido un error: ${error.message}`) 
                }

             }

    }

    async getProductsbyId(prodid){

        if(!fs.existsSync(this.path)){
            return console.log('el archivo no se encuentra')
        }else{
            try {                           
                    const listJSON = await fs.promises.readFile(this.path,'utf-8');
                    const list = JSON.parse(listJSON);
                    const getId = list.find((p)=> p.id == prodid)
                    if(!getId){
                        console.warn("Product not Found")
                        return
                    }
                    console.log("Producto Buscado:",getId)
                    return getId;
            }catch (error) {
                console.error(`Ocurrio un error: ${error.message}`)
        }
        }
       
    }

   

    async deleteProduct(prodid){
            
        if(!fs.existsSync(this.path)){
            return console.log('el archivo no se encuentra')
        }else{
            try {                          
                    const listJSON = await fs.promises.readFile(this.path,'utf-8');
                    const list = JSON.parse(listJSON);
                    const deletedList = list.filter((e)=> e.id !== prodid)
                    console.log(deletedList)
                    const content = JSON.stringify(deletedList,null,'\t')
                    try {
                        await fs.promises.writeFile(this.path,content,'utf-8')
                        return console.log('producto borrado')
                          } catch (error) {
                         console.log(`No se pudo borrar: ${error.message}`) 
                          }
                  
            } catch (error) {
            console.error(`No se pudo borrrar el prducto: ${error.message}`)
                }  
        
            }
    }    

}





 const productManager = new ProductManager
//instacia de productos
 productManager.addProduct(
    "Taladro Makita",
    "Rotopercutor",
    60000,
    "equipos manuales",
    23,
    10,
    true,
    [],

 )
 
 productManager.addProduct(
    "Lijadora Orbital",
    "5 velocidades",
    35000,
    "equipos manuales",
    301,
    10,
    true,
    [],
 )
 productManager.addProduct(
    "Compresor Daewo",
    "1/2hp",
    55000,
    "equipos neumaticos",
    375,
    77,
    true,
    [],
 )
 
 productManager.addProduct(
   "Amoladora Stanley" ,
    "2 1/2",
    52000,
    "equipos manuales",
    221,
    32,
    true,
    [],
 )

 productManager.addProduct(
    "Caladora Marolio" ,
    "le da sabor a tu vida",
    2500,
    "equipos manuales",
    475,
    150 ,
    true,
    [],
  )

  productManager.addProduct(
    "Inflador ACME" ,
    "sin garantia",
    1800,
    "ofertas",
    85,
    23,
    true,
    [],
  ) 

  productManager.addProduct(
    "Taladro p/Drywalt Bosch" ,
    "700w",
    25000,
    "equipos manuales",
    566,
    65,
    true,
    [],
  )

  productManager.addProduct(
    "Termofusora Noderrit" ,
    "1500w",
    35000,
    "equipos manuales",
    862,
    65,
    true,
    [],
  )

  productManager.addProduct(
    "Motosierra Truchan" ,
    "Z50",
    21000,
    "equipos a combustion",
    789,
    25,
    true,
    [],
  )

  productManager.addProduct(
    "Soldadora Luqstoff" ,
    "2500w",
    95000,
    "soldadura",
    654,
    68,
    true,
    [],
  )
  
 module.exports = productManager;
 