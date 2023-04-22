import { FindOneAndUpdateOptions, ObjectId } from 'mongodb';
import { databaseConnect } from '../../../../../shared/mongodb';
import { RefreshArray, User } from '../../../Entities/User';
import { IUserRepository } from '../IUserRepository';

// Metodos para manipulação do repositório
class UserRepository implements IUserRepository {
  async deleteById(userId: string): Promise<void> {
    const db = await databaseConnect();
    db.collection('User').deleteOne({ _id: new ObjectId(userId) });
  }

  async findUserById(userId: string): Promise<User> {
    const db = await databaseConnect();
    const user = await db
      .collection('User')
      .findOne({ _id: new ObjectId(userId) });
    return user as unknown as User;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const db = await databaseConnect();
    const user = await db.collection<User>('User').findOne({ email });
    return user;
  }

  async createUser(
    name: string,
    email: string,
    password: string
  ): Promise<void> {
    const refresh_token: RefreshArray[] = [];
    const db = await databaseConnect();
    db.collection('User').insertOne({ name, email, password, refresh_token });
  }

  async updateRefreshToken(
    id: string,
    refreshToken: string,
    created_at: Date
  ): Promise<void> {
    const db = await databaseConnect();

    const filter = { _id: new ObjectId(id) };
    const update = { $set: { refresh_token: [refreshToken, created_at] } };
    const options = { returnOriginal: false } as FindOneAndUpdateOptions;
    await db.collection('User').findOneAndUpdate(filter, update, options);
  }
}

export { UserRepository };
