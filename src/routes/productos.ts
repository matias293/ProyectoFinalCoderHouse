import { Router } from 'express';
import asyncHandler from 'express-async-handler';

import { validarJWT } from '../middleware/validarJWT';
import { productsController } from '../controllers/productos';
import { checkAdmin } from '../middleware/admin';

const router = Router();

router.get('/', asyncHandler(productsController.getProducts));

router.get(
  '/:categoria',
  asyncHandler(productsController.getProductByCategory),
);

router.post(
  '/',
  validarJWT,
  checkAdmin,
  asyncHandler(productsController.addProducts),
);

router.patch(
  '/:id',
  validarJWT,
  checkAdmin,
  productsController.checkProductExists,
  asyncHandler(productsController.updateProducts),
);

router.delete(
  '/:id',
  validarJWT,
  checkAdmin,
  productsController.checkProductExists,
  asyncHandler(productsController.deleteProducts),
);

export default router;
