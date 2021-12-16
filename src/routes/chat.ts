import { Router } from 'express';
import asyncHandler from 'express-async-handler';

import { chatController } from '../controllers/chat';
import { validarJWT } from '../middleware/validarJWT';

const router = Router();

router.get('/', asyncHandler(chatController.getChatNew));
router.get(
  '/history',
  validarJWT,
  asyncHandler(chatController.getHistorialChat),
);

export default router;
