import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../../Infra/MongoDB/IUserRepository';

@injectable()
class CreateUserUseCase {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository
    ) {}

    async execute(name: string, email: string, password: string): Promise<void> {
        this.userRepository.createUser(name,email,password);
    }
}

export { CreateUserUseCase };