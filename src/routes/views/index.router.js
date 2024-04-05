import {Router} from 'express';
import ProductService from '../../services/products.service.js';
import UsersDTO from '../../dto/users.dto.js';
import { logger } from '../../utils/logger.js';

const router = Router();


router.get('/productsdb', async(req,res) => {
   if(!req.user){
      req.logger.warning('Usuario sin autenticar');
      return res.redirect('/login')
  }
   const baseUrl = req.protocol + '://' + req.get('host');
   const {limit = 10, page = 1, sort, search} = req.query;   
   const dataUserDTO = new UsersDTO(req.user);
   logger.info('datos de usuario',dataUserDTO);
   const data = await ProductService.ProductResponse(limit,page,sort,search,baseUrl);
   res.render('productsdb' ,{...data,title: 'integracion de DB',dataUserDTO});

})

export default router;

