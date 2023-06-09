import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, password } = request.body;

      const createUserUseCase = container.resolve(CreateUserUseCase);
      await createUserUseCase.execute(name, email, password);

      return response.status(200).send('OK');
    } catch (error) {
      return response.status(400).send(error.message);
    }
  }
}

export { CreateUserController };
