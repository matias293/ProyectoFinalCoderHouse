import getCarrito from './getCarrito';
import postProductCarrito from './postProductCarrito';
import deleteProductCarrito from './deleteProductCarrito';
import submitCarrito from './submitCarrito';
export default {
  'api/cart': {
    ...getCarrito,
  },
  'api/cart/add': {
    ...postProductCarrito,
  },
  'api/cart/delete': {
    ...deleteProductCarrito,
  },
  'api/cart/submit': {
    ...submitCarrito,
  },
};
