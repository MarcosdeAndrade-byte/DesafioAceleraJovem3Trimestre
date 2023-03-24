import { Router } from 'express';
import { CreateTaskController } from '../../modules/Task/UseCase/CreateTask/CreateTaskController';

const routerTasks = Router();

const createTaskController = new CreateTaskController();

routerTasks.post('/', createTaskController.handle);

export { routerTasks };