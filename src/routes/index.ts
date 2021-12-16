import { Router } from 'express';
import productsRouter from './productos';
import cartRouter from './carrito';
import authRouter from './auth';
import imageRouter from './image';
import orderRouter from './orden';
import chatRouter from './chat';

const router = Router();

router.use('/products', productsRouter);
router.use('/cart', cartRouter);
router.use('/user', authRouter);
router.use('/image', imageRouter);
router.use('/orders', orderRouter);
router.use('chat', chatRouter);

export default router;
