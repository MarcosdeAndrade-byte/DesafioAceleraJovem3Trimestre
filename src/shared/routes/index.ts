import { Router } from 'express';
import { routerTasks } from './task.routes';
import { userRoutes } from './user.routes';

const router = Router();

router.use('/user', userRoutes);
router.use('/task', routerTasks);

export { router };