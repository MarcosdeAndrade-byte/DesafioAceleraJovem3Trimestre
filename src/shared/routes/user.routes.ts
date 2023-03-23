import { Router } from 'express';
import { CreateUserController } from '../../modules/User/UseCase/CreateUser/CreateUserController';
import { LoginUserController } from '../../modules/User/UseCase/login/LoginUserController';

const userRoutes = Router();

const createUserController = new CreateUserController();
const loginUserController = new LoginUserController();

userRoutes.post('/', createUserController.handle);
userRoutes.post('/login', loginUserController.handle);

export { userRoutes };