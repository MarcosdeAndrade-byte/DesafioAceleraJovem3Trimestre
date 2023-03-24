import { Router } from 'express';
import { CreateUserController } from '../../modules/User/UseCase/CreateUser/CreateUserController';
import { LoginUserController } from '../../modules/User/UseCase/login/LoginUserController';
import { RefreshTokenController } from '../../modules/User/UseCase/RefreshToken/RefreshTokenController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const userRoutes = Router();

const createUserController = new CreateUserController();
const loginUserController = new LoginUserController();
const refreshTokenController = new RefreshTokenController();

userRoutes.post('/', createUserController.handle);
userRoutes.post('/login', loginUserController.handle);
userRoutes.post('/refresh', refreshTokenController.handle);


userRoutes.get('/teste',ensureAuthenticated, (request,response) => {
    response.status(200).send('<h1>TESTE</h1>');
});

export { userRoutes };