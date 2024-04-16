import config from '../config/config.js';


 let productDao;

switch (config.persistence) {
  case 'MongoDB':
    const ProductsMongoDao = (await import('./mongo/products.mongo.dao.js')).default;
    productDao = new ProductsMongoDao();
    break;
  case 'JSON':
    const ProductJsonDao = (await import('./memory/product.json.dao.js')).default;
    productDao = new ProductJsonDao();
    break;

}
export default productDao;
