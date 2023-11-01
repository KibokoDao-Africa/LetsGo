import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dob: Date;
  walletAddress: string; // New field for wallet address
  resetCode?: number;
  resetCodeExpires?: Date;
}

const userSchema = new Schema<IUser>({
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
    unique: true,
  },
  password: {
    type: String,
    required: false,
  },
  dob: {
    type: Date,
    required: false,
  },
  walletAddress: {
    type: String,
    required: false,
    unique: true,
  },
  resetCode: {
    type: Number,
  },
  resetCodeExpires: {
    type: Date,
  },
});

const User = model<IUser>('User', userSchema);

export default User;
