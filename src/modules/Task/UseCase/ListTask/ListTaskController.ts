import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { ListTaskUseCase } from './ListTaskUseCase';

class ListTaskController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { title, done } = request.body;
      const { userId } = request.user;

      const createTaskUseCase = container.resolve(ListTaskUseCase);
      const tasks = await createTaskUseCase.execute(userId, title, done);

      return response.status(200).json(tasks);
    } catch (error) {
      return response.status(400).send(error.message);
    }
  }
}

export { ListTaskController };
