import { compare } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import { User } from '../../Entities/User';
import { IUserRepository } from '../../Infra/MongoDB/IUserRepository';

@injectable()
class LoginUserUseCase {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository
    ) {}

    async execute(email: string, password: string): Promise<User> {
        const user = await this.userRepository.findUserByEmail(email);

        if(!user) {
            throw new Error('Senha ou email incorretos');
        }

        const passwordVerification = await compare(password,user.password);

        if(!passwordVerification) {
            throw new Error('Senha ou email incorretos');
        }

        return user;
    }
}

export { LoginUserUseCase };