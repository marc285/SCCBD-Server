import { Router } from 'express';

import ttpController from '../controllers/ttpController';

const router: Router = Router();

router.get('/getContent', ttpController.getContent);
router.post('/sendInterest', ttpController.sendInterest);

export default router;