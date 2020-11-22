import { Router } from 'express';

import AEScriptoController from '../controllers/AEScriptoController';

const router: Router = Router();

router.get('/getEncrypted', AEScriptoController.getEncrypted);
router.post('/decrypt', AEScriptoController.decrypt);

export default router;