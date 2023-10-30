import { IUser, IUserUpdate } from '../../controllers/users/types';
import { UserModel } from '../../models/users';

export class UserService {
  static async getUsers(pageNumber: number, itemPerPage: number) {
    const offset = (pageNumber - 1) * itemPerPage;
    const users = await UserModel.find().skip(offset).limit(itemPerPage);
    return users;
  }

  static async getUser(id: string) {
    const user = await UserModel.find({ _id: id });
    return user;
  }

  static async createUser(userItem: IUser) {
    let user = new UserModel({ ...userItem });
    user = await user.save();

    return user;
  }

  static async updateUser(userItem: IUserUpdate) {
    const user = await UserModel.findByIdAndUpdate(userItem.id, userItem, { new: true });
    return user;
  }

  static async deleteUser(id: string) {
    const user = await UserModel.findByIdAndRemove(id);
    return user;
  }
}
