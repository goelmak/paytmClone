import { Schema, model } from "mongoose";

interface IUser {
  username: string;
  firstName: string;
  lastName?: string;
  password: string;
}

const schema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String },
  password: { type: String, required: true },
});

const User = model<IUser>("User", schema);

export { User, IUser };
