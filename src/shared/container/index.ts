import { container } from 'tsyringe';
import { ITaskRepository } from '../../modules/Task/Infra/MongoDB/ITaskRepository';
import { TaskRepository } from '../../modules/Task/Infra/MongoDB/Repository/TaskRepository';
import { IUserRepository } from '../../modules/User/Infra/MongoDB/IUserRepository';
import { UserRepository } from '../../modules/User/Infra/MongoDB/Repository/UserRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<ITaskRepository>('TaskRepository', TaskRepository);