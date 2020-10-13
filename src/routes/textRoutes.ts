import { Router } from 'express';
import textController from '../controllers/textController';

const router: Router = Router();

router.get('/get', textController.getText);
router.post('/post', textController.postText);

export default router;