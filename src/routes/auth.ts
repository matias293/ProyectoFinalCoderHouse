import { Router } from 'express';
import asyncHandler from 'express-async-handler';

import { authController } from '../controllers/auth';

const router = Router();

router.post('/login', asyncHandler(authController.postLogin));

router.post('/signup', asyncHandler(authController.postSignUp));

export default router;
