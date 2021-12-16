import { Router } from 'express';
import asyncHandler from 'express-async-handler';

import { ordenController } from '../controllers/ordenes';
import { validarJWT } from '../middleware/validarJWT';

const router = Router();

router.get('/', validarJWT, asyncHandler(ordenController.getOrdenes));
router.get('/:orderId', validarJWT, asyncHandler(ordenController.getOrden));
router.post('/complete', validarJWT, asyncHandler(ordenController.postOrden));

export default router;
