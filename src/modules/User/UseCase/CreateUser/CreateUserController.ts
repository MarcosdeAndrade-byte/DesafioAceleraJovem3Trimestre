import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
    async handle(request: Request, response: Response): Promise<void> {
        const { name, email, password } = request.body;

        const createUserUseCase = container.resolve(CreateUserUseCase);
        await createUserUseCase.execute(name, email, password);

        response.status(200).send('OK');
    }
}

export { CreateUserController };