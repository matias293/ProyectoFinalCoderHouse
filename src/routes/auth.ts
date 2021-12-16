import { Router } from 'express';
import asyncHandler from 'express-async-handler';

import { authController } from '../controllers/auth';
// import passport from '../middleware/passport';

const router = Router();

router.post('/login', asyncHandler(authController.postLogin));

router.post('/signup', asyncHandler(authController.postSignUp));

router.post('/logout', asyncHandler(authController.postLogOut));

export default router;
