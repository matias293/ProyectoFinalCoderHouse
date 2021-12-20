import getOrden from './getOrden';
import getOrdenes from './getOrders';
import completeOrder from './completeOrden';
export default {
  'api/orders/': {
    ...getOrdenes,
  },
  'api/orders/{orderId}': {
    ...getOrden,
  },
  'api/orders/complete': {
    ...completeOrder,
  },
};
