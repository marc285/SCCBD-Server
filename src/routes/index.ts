import { Router } from 'express';
import textRoutes from './textRoutes';
import criptoRoutes from './criptoRoutes';

const router: Router = Router();

router.use('/txt', textRoutes);
router.use('/cripto',criptoRoutes);

export default router;