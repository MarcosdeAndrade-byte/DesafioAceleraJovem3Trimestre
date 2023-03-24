import { Router } from 'express';
import { CreateTaskController } from '../../modules/Task/UseCase/CreateTask/CreateTaskController';
import { ListTaskController } from '../../modules/Task/UseCase/ListTask/ListTaskController';
import { ListTaskByIdController } from '../../modules/Task/UseCase/ListTaskById/ListTaskByIdController';

const routerTasks = Router();

const createTaskController = new CreateTaskController();
const listTaskController = new ListTaskController();
const listTaskByIdController = new ListTaskByIdController();

routerTasks.post('/', createTaskController.handle);
routerTasks.get('/', listTaskController.handle);
routerTasks.get('/specific/:taskId', listTaskByIdController.handle);

export { routerTasks };