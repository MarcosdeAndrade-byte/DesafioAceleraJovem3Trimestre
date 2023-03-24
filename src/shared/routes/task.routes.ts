import { Router } from 'express';
import { CreateTaskController } from '../../modules/Task/UseCase/CreateTask/CreateTaskController';
import { DeleteTaskController } from '../../modules/Task/UseCase/DeleteTask/DeleteTaskController';
import { ListTaskController } from '../../modules/Task/UseCase/ListTask/ListTaskController';
import { ListTaskByIdController } from '../../modules/Task/UseCase/ListTaskById/ListTaskByIdController';
import { UpdatedTaskController } from '../../modules/Task/UseCase/UpdateTask/UpdateTaskController';

const routerTasks = Router();

const createTaskController = new CreateTaskController();
const listTaskController = new ListTaskController();
const listTaskByIdController = new ListTaskByIdController();
const updatedTaskController = new UpdatedTaskController();
const deleteTaskController = new DeleteTaskController();

routerTasks.post('/', createTaskController.handle);
routerTasks.get('/', listTaskController.handle);
routerTasks.get('/specific/:taskId', listTaskByIdController.handle);
routerTasks.put('/', updatedTaskController.handle);
routerTasks.delete('/', deleteTaskController.handle);

export { routerTasks };