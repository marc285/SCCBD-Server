import { Router } from 'express';

import RSAcriptoController from '../controllers/RSAcriptoController';

const router: Router = Router();

router.get('/getEncrypted', RSAcriptoController.getEncrypted);
router.post('/decrypt', RSAcriptoController.decrypt);
router.get('/getSigned', RSAcriptoController.getSigned);
router.post('/verify', RSAcriptoController.verify);

export default router;