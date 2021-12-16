import { Router } from 'express';
import asyncHandler from 'express-async-handler';

import { carritoController } from '../controllers/carrito';
import { validarJWT } from '../middleware/validarJWT';

const router = Router();

router.get('/', validarJWT, asyncHandler(carritoController.getCarrito));

router.post(
  '/add',
  validarJWT,
  asyncHandler(carritoController.addCarritoProduct),
);

router.post('/submit', validarJWT, asyncHandler(carritoController.postCarrito));

router.delete(
  '/delete',
  validarJWT,
  asyncHandler(carritoController.deleteCarritoProduct),
);

export default router;
