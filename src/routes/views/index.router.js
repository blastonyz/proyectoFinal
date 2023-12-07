import {Router} from 'express';
//import ProductsManager from '../../dao/ProductManagerMdb.js';
import ProductModel from '../../models/products.model.js';

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
   const products = await ProductModel.paginate(criterials,options);

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
   
   const dataUser = req.session.user;
   const data = buildResponse({...products,sort,search});
   console.log(data);
   res.render('productsdb' ,{...data,title: 'integracion de DB',dataUser});
   
})

export default router;

