export interface IUser {
  name: string;
  email: string;
  createdAt: Date;
}

export interface IUserUpdate {
  id: string;
  name?: string;
  email?: string;
  createdAt?: Date;
}
