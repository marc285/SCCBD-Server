import { Router } from 'express';
import textRoutes from './textRoutes';
import AEScriptoRoutes from './AEScriptoRoutes';
import RSAcriptoRoutes from './RSAcriptoRoutes';
import bsRoutes from './bsRoutes';

const router: Router = Router();

router.use('/txt', textRoutes);
router.use('/cripto/AES', AEScriptoRoutes);
router.use('/cripto/RSA', RSAcriptoRoutes);
router.use('/bs', bsRoutes)

export default router;