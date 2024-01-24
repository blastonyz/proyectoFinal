import {Router} from 'express';
import ProductController from '../../controller/products.controller.js';
import UsersDTO from '../../dto/users.dto.js';
import EmailServices from '../../services/mail.services.js';

const router = Router();


router.get('/productsdb', async(req,res) => {
  
   const {limit = 10, page = 1, sort, search} = req.query;
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
         prevLink: prods.hasPrevPage ? `http://localhost:8080/api/productsdb?limit=${prods.limit}&page=${prods.prevPages}`: null,
         nextLink: prods.hasNextPage ? `http://localhost:8080/api/productsdb?limit=${prods.limit}&page=${prods.nextPage}`: null,
      }

      
   }
   
   const dataUserDTO = new UsersDTO(req.user);
   console.log(dataUserDTO)
 
   const data = buildResponse({...products,sort,search});
   res.render('productsdb' ,{...data,title: 'integracion de DB',dataUserDTO});
   
})

router.get('/mail', async (req,res) =>{
   const emailService = EmailServices.getInstance();
   const result = await emailService.sendEmail(
      'blastonyzamora@gmail.com',
      'Hola desde la app',
      '<h1>Hola desde el mail service</h1>'
   );
   res.status(200).json(result);
})

export default router;

