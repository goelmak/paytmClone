import { Types, Schema, model } from "mongoose";

interface IAccount {
  userId: Types.ObjectId;
  balance: number;
}

const accountSchema = new Schema<IAccount>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const Account = model<IAccount>("Account", accountSchema);

export { Account, IAccount };
