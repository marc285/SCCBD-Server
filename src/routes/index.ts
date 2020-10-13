import { Router } from 'express';
import textRoutes from './textRoutes';

const router: Router = Router();

router.use('/txt', textRoutes);

export default router;