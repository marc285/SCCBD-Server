import { Router } from 'express';
import textRoutes from './textRoutes';
import AEScriptoRoutes from './AEScriptoRoutes';
import RSAcriptoRoutes from './RSAcriptoRoutes';
import bsRoutes from './bsRoutes';
import ttpRoutes from './ttpRoutes';

import keyExchangeController from '../controllers/keyExchangeController';

const router: Router = Router();

router.use('/txt', textRoutes);
router.use('/cripto/AES', AEScriptoRoutes);
router.use('/cripto/RSA', RSAcriptoRoutes);
router.use('/bs', bsRoutes);
router.use('/ttp', ttpRoutes);
router.post('/keyExchange', keyExchangeController.keyExchange);

export default router;