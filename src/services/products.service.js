import ProductController from "../controller/products.controller.js";
import UsersController from "../controller/users.controller.js";
import EmailServices from "./mail.services.js";


export default class ProductService{
    static async ProductResponse(limit,page,sort,search,baseUrl){
      
        const criterials = {};
        const options = {limit,page};
        if(sort){
           options.sort = {price: sort}
        }
        if(search){
           criterials.category = search;
        }
        const products = await ProductController.getPaginated(criterials,options);
     
        const buildResponse = (prods) => {
           return{
              status: 'succes',
              payload: prods.docs.map((doc)=> doc.toJSON()),
              totalPages: prods.totalPages,
              prevPage: prods.prevPage,
              nextPage: prods.nextPage,
              page: prods.page,
              hasPrevPage: prods.hasPrevPage,
              hasNextPage: prods.hasNextPage,
              prevLink: prods.hasPrevPage ? `${baseUrl}/api/productsdb?limit=${prods.limit}&page=${prods.prevPage}`: null,
              nextLink: prods.hasNextPage ? `${baseUrl}/api/productsdb?limit=${prods.limit}&page=${prods.nextPage}`: null,
           }
        }
        const data = buildResponse({...products,sort,search});
        return data
    }

    static async DeleteProduct(sid){
      const product = await ProductController.getById(sid);
      const user = product.owner;
      if (user) {
         const userData = await UsersController.findById(user);
         if (userData.role === 'premium') {
               const productDelete = await ProductController.deleteById(sid);
               const emailService = EmailServices.getInstance();
               await emailService.sendEmail(
                  `${userData.email}`,
                  'Aviso de Iron Tools',
                  `<h2>${userData.first_name} ${userData.last_name} el producto que creaste: ${product.title} fue eliminado </h2>`
               );
               return productDelete;
         } else {
               throw new Error("El usuario no tiene permisos para eliminar el producto");
         }
      } else {
         // Si el producto no tiene propietario, eliminarlo sin enviar correo
         const productDelete = await ProductController.deleteById(sid);
         console.log('Producto sin creador eliminado');
         return productDelete;
      }
    }
}