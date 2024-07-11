import { Request, Response } from "express";
import { Account } from "../models/model.account";
import { User } from "../models/model.user";

import { accountTransferSchema } from "../utils/accountSchema";

const getBalance = async (req: Request, res: Response) => {
  const user = res.locals.user;
  try {
    const account = await Account.findOne({ userId: user._id });
    if (account) {
      res.status(200).json({ balance: account.balance });
      return;
    } else {
      throw new Error("Error in finding User Bank");
    }
  } catch (err) {
    res.status(500).json({ msg: (err as Error).message });
  }
};

const transferBalance = async (req: Request, res: Response) => {
  const session = await Account.startSession();
  session.startTransaction();
  try {
    const { to, balance } = accountTransferSchema.parse(req.body);
    const receiver = await User.findOne({ username: to });
    if (!receiver) {
      res.status(400).json({ msg: "invalid account" });
      return;
    }
    const sender = res.locals.user;
    if (sender.balance < balance) {
      res.status(400).json({ msg: "Insufficient Balance" });
      return;
    }
    const opt = { session };
    const decAccount = await Account.findOneAndUpdate(
      { userId: sender._id },
      {
        $inc: { balance: -balance },
      },
      {
        new: true,
        ...opt,
      }
    );
    if (!decAccount) {
      throw new Error("Sender account not found or balance update failed");
    }

    const IncAccount = await Account.findOneAndUpdate(
      { userId: receiver._id },
      {
        $inc: { balance },
      },
      {
        new: true,
        ...opt,
      }
    );
    if (!IncAccount) {
      throw new Error("Sender account not found or balance update failed");
    }
    await session.commitTransaction();
    await session.endSession();
    res.status(200).json({ msg: "Transfer Successful" });
  } catch (err) {
    res.status(500).json({ msg: (err as Error).message });
  }
};
export { getBalance, transferBalance };
