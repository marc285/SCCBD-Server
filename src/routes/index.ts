import { Router } from 'express';
import textRoutes from './textRoutes';
import AEScriptoRoutes from './AEScriptoRoutes';
import RSAcriptoRoutes from './RSAcriptoRoutes';

const router: Router = Router();

router.use('/txt', textRoutes);
router.use('/cripto/AES', AEScriptoRoutes);
router.use('/cripto/RSA', RSAcriptoRoutes);

export default router;