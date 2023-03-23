import { Router } from 'express';
import { CreateUserController } from '../../modules/User/UseCase/CreateUser/CreateUserController';

const userRoutes = Router();

const createUserController = new CreateUserController();

userRoutes.post('/', createUserController.handle);

export { userRoutes };