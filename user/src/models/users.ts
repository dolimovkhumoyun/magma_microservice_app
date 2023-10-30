import mongoose from 'mongoose';
import { IUser } from '../controllers/users/types';

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true,
    minlength: 5,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export const UserModel = mongoose.model<IUser>('Users', userSchema);
