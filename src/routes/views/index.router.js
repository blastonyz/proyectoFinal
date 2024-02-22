import {Router} from 'express';
import ProductController from '../../controller/products.controller.js';
import UsersDTO from '../../dto/users.dto.js';
import { logger } from '../../utils/logger.js';

const router = Router();


router.get('/productsdb', async(req,res) => {
   if(!req.user){
      req.logger.warning('Usuario sin autenticar');
      return res.redirect('/login')
  }
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
   logger.info('datos de usuario',dataUserDTO)
 
   const data = buildResponse({...products,sort,search});
   res.render('productsdb' ,{...data,title: 'integracion de DB',dataUserDTO});
   
})

export default router;

