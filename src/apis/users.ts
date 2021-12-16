import { NewUserI, UserI, UserQuery } from '../models/users/user.interface';
import { UserFactoryDAO } from '../models/users/user.factory';
import { TypeModel } from './TipoPersistencia';
import Config from '../config/index';

const tipo = TypeModel.get(Config.ENVIROMENT);

class User {
  private users;

  constructor() {
    this.users = UserFactoryDAO.get(tipo);
  }

  async getUsers(id: string): Promise<UserI> {
    const user = await this.users.get(id);
    return user;
  }

  async addUser(productData: NewUserI): Promise<UserI> {
    const newUser = await this.users.add(productData);

    return newUser;
  }

  async updateUser(id: string, userData: NewUserI) {
    const updatedUser = await this.users.update(id, userData);
    return updatedUser;
  }

  async deleteUser(id: string) {
    await this.users.delete(id);
  }

  async query(email: string): Promise<UserI> {
    const query: UserQuery = { email };

    return this.users.query(query);
  }

  async validatePassword(username: string, password: string) {
    return this.users.validateUserPassword(username, password);
  }
}

export const UserAPI = new User();
