import { User } from '../../Entities/User';

interface IUserRepository {
    createUser(name: string, email: string, password: string): void;
    findUserByEmail(email: string): Promise<User>;
    updateRefreshToken(userId: string, refreshToken: string, created_at: Date): Promise<void>;
}

export { IUserRepository };