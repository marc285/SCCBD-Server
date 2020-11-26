import { Router } from 'express';

import bsController from '../controllers/bsController';

const router: Router = Router();

router.post('/getSigned', bsController.getSigned);

export default router;