import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDb, disconnectDb } from "./db";
import { userRouter } from "./routers/route.user";
import { accountRouter } from "./routers/route.account";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

connectDb();

app.use("/api/v1/user", userRouter);
app.use("/api/v1/account", accountRouter);

app.listen(3000, () => {
  console.log("hii do not tell any one i am listening");
});
process.on("SIGINT", async () => {
  await disconnectDb();
});
