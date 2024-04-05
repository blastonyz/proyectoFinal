import ProductController from "../controller/products.controller.js";



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
}