import getOrden from './getOrden';
import getOrdenes from './getOrders';
export default {
  'api/orders/': {
    ...getOrdenes,
  },
  'api/orders/{orderId}': {
    ...getOrden,
  },
  'api/orders/complete': {},
};
