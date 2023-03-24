import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListTaskByIdUseCase } from './ListTaskByIdUseCase';

class ListTaskByIdController {
    async handle(request: Request, response: Response): Promise<void> {
        const { taskId } = request.params;
        const createTaskUseCase = container.resolve(ListTaskByIdUseCase);
        const tasks = await createTaskUseCase.execute(taskId as string);
        response.status(200).json(tasks);
    }
}

export { ListTaskByIdController };