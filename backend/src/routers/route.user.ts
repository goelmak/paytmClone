import { Router } from "express";
import {
  getAllUsers,
  getUserDetails,
  userSignIn,
  userSignUp,
  userUpdate,
} from "../controllers/controller.user";
import { verifyJwtToken } from "../middleware/jwtMiddleware";

const userRouter = Router();

userRouter.use(["/update", "/userDetails", "/users"], verifyJwtToken);

userRouter.post("/signup", userSignUp);

userRouter.post("/signIn", userSignIn);

userRouter.put("/update", userUpdate);

userRouter.get("/userDetails", getUserDetails);

userRouter.get("/users", getAllUsers);

export { userRouter };
