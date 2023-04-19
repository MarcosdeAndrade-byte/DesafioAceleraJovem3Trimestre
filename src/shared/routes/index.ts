import { Router } from 'express';
import { routerTasks } from './task.routes';
import { userRoutes } from './user.routes';

// Router utilizado para uma melhor divisão de responsabilidades e organização

const router = Router();

router.use('/user', userRoutes);
router.use('/task', routerTasks);

export { router };
