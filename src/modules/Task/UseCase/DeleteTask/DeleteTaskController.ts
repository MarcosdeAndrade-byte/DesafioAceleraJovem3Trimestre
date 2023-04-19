import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DeleteTaskUseCase } from './DeleteTaskUseCase';

class DeleteTaskController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { taskId } = request.params;
      const { userId } = request.user;

      const createTaskUseCase = container.resolve(DeleteTaskUseCase);
      await createTaskUseCase.execute(taskId, userId);

      return response.status(200).send('OK');
    } catch (error) {
      return response.status(400).send(error.message);
    }
  }
}

export { DeleteTaskController };
