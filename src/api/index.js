import { Router } from 'express';
import ProductRouter from './routes/productApi';
import BrandRouter from './routes/brandApi';

const router = Router();

router.use('/products', ProductRouter());
router.use('/brands', BrandRouter());

export default router;
