import mongoose from "mongoose";
import { User } from "./models/model.user";

export const connectDb = async () => {
  try {
    const uri = process.env.uri || "";
    await mongoose.connect(uri);
    console.log("mongoose has been connected");
  } catch (error) {
    const msg = (error as Error).message;
    console.log("error connecting to mongo db", msg);
    process.exit(1);
  }
};

export const disconnectDb = async () => {
  try {
    await mongoose.disconnect();
    console.log("mongoose has been disconnected");
  } catch (err) {
    const msg = (err as Error).message;
    console.log("error in disconnecting mongoose", msg);
  }
};
