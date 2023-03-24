import { Router } from 'express';
import { CreateTaskController } from '../../modules/Task/UseCase/CreateTask/CreateTaskController';
import { ListTaskController } from '../../modules/Task/UseCase/ListTask/ListTaskController';

const routerTasks = Router();

const createTaskController = new CreateTaskController();
const listTaskController = new ListTaskController();

routerTasks.post('/', createTaskController.handle);
routerTasks.get('/', listTaskController.handle);

export { routerTasks };