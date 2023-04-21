import { User } from '../../Entities/User';

// Interface ITaskRepository para garantir o baixo acoplamento entre tecnologia utilizada no banco de dados e o nosso código
interface IUserRepository {
  createUser(name: string, email: string, password: string): void;
  findUserByEmail(email: string): Promise<User>;
  updateRefreshToken(
    userId: string,
    refreshToken: string,
    created_at: Date
  ): Promise<void>;
  findUserById(userId: string): Promise<User>;
}

export { IUserRepository };
