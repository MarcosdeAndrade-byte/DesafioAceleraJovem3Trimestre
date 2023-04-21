import { RefreshArray, User } from '../../Entities/User';
import { IUserRepository } from '../MongoDB/IUserRepository';

class InMemoryUsersRepository implements IUserRepository {
  private users: User[] = [];

  private id = 1;

  async findUserById(userId: string): Promise<User> {
    const user = this.users.find((u) => u._id === userId);
    return user;
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = this.users.find((u) => u.email === email);
    return user ?? null;
  }

  async createUser(
    name: string,
    email: string,
    password: string
  ): Promise<void> {
    const refresh_token: RefreshArray[] = [];
    const user: User = {
      name,
      email,
      password,
      refresh_token,
      _id: `${this.id++}`,
    };
    this.users.push(user);
  }

  async updateRefreshToken(
    id: string,
    refreshToken: string,
    created_at: Date
  ): Promise<void> {
    const index = this.users.findIndex((u) => u._id === id);
    if (index === -1) {
      console.log('DEU RUIM');
      throw new Error(`User with id ${id} not found`);
    }

    Object.assign(this.users[index].refresh_token, [refreshToken, created_at]);
  }
}

export { InMemoryUsersRepository };
