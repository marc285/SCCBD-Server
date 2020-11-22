import { Router } from 'express';

import AEScriptoController from '../controllers/AEScriptoController';
import RSAcriptoController from '../controllers/RSAcriptoController';

const router: Router = Router();

router.get('/AESgetEncrypted', AEScriptoController.getEncrypted);
router.post('/AESdecrypt', AEScriptoController.decrypt);

router.post('/RSAkeyExchange', RSAcriptoController.keyExchange);
router.get('/RSAgetEncrypted', RSAcriptoController.getEncrypted);
router.post('/RSAdecrypt', RSAcriptoController.decrypt);
router.get('/RSAgetSigned', RSAcriptoController.getSigned);
router.post('/RSAverify', RSAcriptoController.verify);

export default router;