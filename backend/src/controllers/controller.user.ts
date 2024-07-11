import { User } from "../models/model.user";
import { partialUserSchema, userSchema } from "../utils/userSchema";
import { Response, Request } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Account } from "../models/model.account";

const signJwtToken = (data: { username: string; password: string }) => {
  let jwtSecretKey = process.env.JWT_SECRET_KEY || "";
  return jwt.sign(data, jwtSecretKey);
};

const randomBalance = (max: number, min: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const userSignUp = async (req: Request, res: Response) => {
  const body = req.body;
  try {
    const { username, firstName, lastName, password } = userSchema.parse(body);
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      firstName,
      lastName,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    const account = new Account({
      userId: savedUser._id,
      balance: randomBalance(1, 10000),
    });
    await account.save();
    const token = signJwtToken({ username, password });
    res.status(201).json({ token });
  } catch (error) {
    const msg = (error as Error).message;
    console.error("Invalid Input");
    res.status(400).json({ error: msg });
  }
};

const userSignIn = async (req: Request, res: Response) => {
  const body = req.body;
  try {
    const { username, password } = userSchema
      .pick({ username: true, password: true })
      .parse(body);
    const user = await User.findOne({ username });
    if (!user) {
      res.status(404).send({ msg: "user not found" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ msg: "invalid password" });
      return;
    }
    const token = signJwtToken({ username, password: password });
    res.status(201).json({ msg: "LoggedIn", token: token });
    return;
  } catch (error) {
    const msg = (error as Error).message;
    console.error("Invalid Input");
    res.status(400).json({ msg });
  }
};

const getUserDetails = async (req: Request, res: Response) => {
  const user = res.locals.user;
  res.status(200).json({
    username: user.username,
    firstName: user.firstName,
    lastName: user?.lastName,
  });
};

const userUpdate = async (req: Request, res: Response) => {
  const user = res.locals.user;
  try {
    const updatedData = partialUserSchema.parse(req.body);
    Object.assign(user, updatedData);
    user.save();
    const token = signJwtToken({
      username: user.username,
      password: user.password,
    });
    res.status(200).json({ msg: "user is updated", token: token });
    return;
  } catch (err) {
    const msg = (err as Error).message;
    res.status(401).json({ msg });
    return;
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  const user = res.locals.user;
  try {
    const entries = await User.find({});
    const filteredEntries = entries
      .filter((item) => !item.equals(user))
      .map((item) => {
        return {
          username: item.username,
          firstName: item.firstName,
          lastName: item.lastName,
        };
      });
    res.status(200).json({ users: filteredEntries });
  } catch (err) {
    const msg = (err as Error).message;
    res.status(500).json({ msg });
  }
};

export { userSignIn, userSignUp, userUpdate, getUserDetails, getAllUsers };
