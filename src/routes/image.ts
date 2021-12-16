import { Router } from 'express';
import asyncHandler from 'express-async-handler';

import { imageController } from '../controllers/uploads';
import { validarJWT } from '../middleware/validarJWT';
import { checkAdmin } from '../middleware/admin';

const router = Router();

router.get('/:id', asyncHandler(imageController.getImage));
router.post(
  '/upload',
  validarJWT,
  checkAdmin,
  asyncHandler(imageController.postImage),
);
router.delete(
  '/:id',
  validarJWT,
  checkAdmin,
  asyncHandler(imageController.deleteImage),
);

export default router;
