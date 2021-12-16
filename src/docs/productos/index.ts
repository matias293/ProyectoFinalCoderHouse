import getProducts from './getProducts';
import postProduct from './postProduct';
import updateProduct from './updateProduct';
import deleteProduct from './deleteProduct';
import getProductByCategory from './getProductByCategory';

export default {
  'api/products': {
    ...getProducts,
    ...postProduct,
  },
  'api/products/{id}': {
    ...updateProduct,
    ...deleteProduct,
  },
  'api/products/{categoria}': {
    ...getProductByCategory,
  },
};
