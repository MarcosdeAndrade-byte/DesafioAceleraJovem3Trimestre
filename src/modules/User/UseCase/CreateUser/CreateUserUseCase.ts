import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../../Infra/MongoDB/IUserRepository';
import { hash } from 'bcryptjs';

@injectable()
class CreateUserUseCase {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository
    ) {}

    async execute(name: string, email: string, password: string): Promise<void> {
        const userVerificationExist = await this.userRepository.findUserByEmail(email);

        if(userVerificationExist){
            throw new Error('Esse email já foi cadastrado!');
        }

        const passwordHash = await hash(password, 8);
        this.userRepository.createUser(name,email,passwordHash);
    }
}

export { CreateUserUseCase };