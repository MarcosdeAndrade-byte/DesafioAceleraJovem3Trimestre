import { Router } from 'express';
import { CreateUserController } from '../../modules/User/UseCase/CreateUser/CreateUserController';
import { LoginUserController } from '../../modules/User/UseCase/login/LoginUserController';
import { RefreshTokenController } from '../../modules/User/UseCase/RefreshToken/RefreshTokenController';

// Router utilizado para uma melhor divisão de responsabilidades e organização

const userRoutes = Router();

const createUserController = new CreateUserController();
const loginUserController = new LoginUserController();
const refreshTokenController = new RefreshTokenController();

userRoutes.post('/', createUserController.handle);
userRoutes.post('/login', loginUserController.handle);
userRoutes.post('/refresh', refreshTokenController.handle);

export { userRoutes };