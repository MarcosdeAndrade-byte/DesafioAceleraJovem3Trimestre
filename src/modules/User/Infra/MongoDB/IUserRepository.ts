import { User } from '../../Entities/User';

interface IUserRepository {
    createUser(name: string, email: string, password: string): void;
    findUserByEmail(email: string): Promise<User>;
}

export { IUserRepository };