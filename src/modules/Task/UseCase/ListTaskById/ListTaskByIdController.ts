import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListTaskByIdUseCase } from './ListTaskByIdUseCase';

class ListTaskByIdController {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { taskId } = request.params;
            const createTaskUseCase = container.resolve(ListTaskByIdUseCase);
            const tasks = await createTaskUseCase.execute(taskId as string);
            return response.status(200).json(tasks);
        } catch (error) {
            return response.status(400).send(error.message);
        }
    }
}

export { ListTaskByIdController };