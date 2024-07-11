import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/model.user";
import bcrypt from "bcrypt";

export const verifyJwtToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const headerToken = process.env.TOKEN_HEADER_KEY!;
  const jwtSecretKey = process.env.JWT_SECRET_KEY!;

  try {
    const token = req.header(headerToken) || "";
    const userPayload = jwt.verify(token, jwtSecretKey);
    const username = (userPayload as JwtPayload).username;
    const password = (userPayload as JwtPayload).password;
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ msg: "invalid password" });
      return;
    }
    res.locals.user = user;
    next();
  } catch (err) {
    const msg = (err as Error).message;
    res.status(401).json({ msg });
  }
};
