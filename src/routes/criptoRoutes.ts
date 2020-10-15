import { Router } from 'express';
import criptoController from '../controllers/criptoController';

const router: Router = Router();

router.get('/encrypt', criptoController.AESencrypt);
router.post('/decrypt', criptoController.AESdecrypt);

export default router;