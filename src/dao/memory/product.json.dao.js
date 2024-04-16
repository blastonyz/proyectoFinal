import fs from 'fs';
import {v4 as uuidV4} from 'uuid';
import ProductsDao from '../products.dao.js';

export default class ProductJsonDao extends ProductsDao{
   

    constructor(){
        super();
        this.products = [];
        this.path = './productos.json'
    }
    
    async getPaginated() {
      if (!fs.existsSync(this.path)) {
          console.log('El archivo no se encuentra');
          return []; 
      } else {
          try {
              const listJSON = await fs.promises.readFile(this.path, 'utf-8');
              const list = JSON.parse(listJSON);
              return {
                  docs: list, 
                  totalPages: 1,
                  prevPage: null,
                  nextPage: null,
                  page: 1,
                  hasPrevPage: false,
                  hasNextPage: false,
                  limit: list.length // Podrías establecer el límite en la longitud de la lista
              };
          } catch (error) {
              console.error(`Ocurrió un error: ${error.message}`);
              return []; // Retorna un array vacío si ocurre un error
          }
      }
  }

 async create({title,description,price,category,code,stock,statusP,thumbnail}){
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

    async findAndUpdate(sid,{newTitle,newDescription,newPrice,newCategory,newCode,newStock,newStatusP}){
        
      if(!fs.existsSync(this.path)){
          return console.log('el archivo no se encuentra')
      }else{
          try {                           
                  const listJSON = await fs.promises.readFile(this.path,'utf-8');
                  const list = JSON.parse(listJSON);
                  const index = list.findIndex((e)=> e.id === sid);
                  console.log(index)
                     if(index !== -1){
                      const updatedObj = {...this.products[index],
                        title: newTitle ? newTitle: this.products[index].title, 
                        description: newDescription ? newDescription : this.products[index].description,
                        price: newPrice ? newPrice: this.products[index].price,
                        category: newCategory ? newCategory: this.products[index].category , 
                        code: newCode? newCode:this.products[index].code, 
                        stock: newStock? newStock:this.products[index].stock,
                        statusP: newStatusP? newStatusP:this.products[index].newStatusP,
                      };
                      this.products[index] = updatedObj;
                      const content = JSON.stringify(this.products,null,'\t')

                       try {
                         await fs.promises.writeFile(this.path,content,'utf-8')
                         return updatedObj;
                           } catch (error) {
                          console.log(`No pudo actualizarse el producto: ${error.message}`) 
                           }
                                    }
          
                  }catch (error) {
                      console.error(`Ocurrio un error: ${error.message}`)
               }
          }
      }

    async getById(sid){

        if(!fs.existsSync(this.path)){
            return console.log('el archivo no se encuentra')
        }else{
            try {                           
                    const listJSON = await fs.promises.readFile(this.path,'utf-8');
                    const list = JSON.parse(listJSON);
                    const getId = list.find((p)=> p.id == sid)
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

   

    async deleteById(sid){
            
        if(!fs.existsSync(this.path)){
            return console.log('el archivo no se encuentra')
        }else{
            try {                          
                    const listJSON = await fs.promises.readFile(this.path,'utf-8');
                    const list = JSON.parse(listJSON);
                    const deletedList = list.filter((e)=> e.id !== sid)
                    this.products= deletedList;
                    const content = JSON.stringify(this.products,null,'\t')
                    try {
                        await fs.promises.writeFile(this.path,content,'utf-8')
                        return console.log('producto borrado',this.products);
                          } catch (error) {
                         console.log(`No se pudo borrar: ${error.message}`) 
                          }
                  
            } catch (error) {
            console.error(`No se pudo borrrar el prducto: ${error.message}`)
                }  
        
            }
    }    

}






//instacia de productos
/*
 productManager.create(
    "Taladro Makita",
    "Rotopercutor",
    60000,
    "equipos manuales",
    23,
    10,
    true,
    [],

 )
 
 productManager.create(
    "Lijadora Orbital",
    "5 velocidades",
    35000,
    "equipos manuales",
    301,
    10,
    true,
    [],
 )
 productManager.create(
    "Compresor Daewo",
    "1/2hp",
    55000,
    "equipos neumaticos",
    375,
    77,
    true,
    [],
 )
 
 productManager.create(
   "Amoladora Stanley" ,
    "2 1/2",
    52000,
    "equipos manuales",
    221,
    32,
    true,
    [],
 )

 productManager.create(
    "Caladora Marolio" ,
    "le da sabor a tu vida",
    2500,
    "equipos manuales",
    475,
    150 ,
    true,
    [],
  )

  productManager.create(
    "Inflador ACME" ,
    "sin garantia",
    1800,
    "ofertas",
    85,
    23,
    true,
    [],
  ) 

  productManager.create(
    "Taladro p/Drywalt Bosch" ,
    "700w",
    25000,
    "equipos manuales",
    566,
    65,
    true,
    [],
  )

  productManager.create(
    "Termofusora Noderrit" ,
    "1500w",
    35000,
    "equipos manuales",
    862,
    65,
    true,
    [],
  )

  productManager.create(
    "Motosierra Truchan" ,
    "Z50",
    21000,
    "equipos a combustion",
    789,
    25,
    true,
    [],
  )

  productManager.create(
    "Soldadora Luqstoff" ,
    "2500w",
    95000,
    "soldadura",
    654,
    68,
    true,
    [],
  )*/
  

 
