import { z } from "zod";

export const accountTransferSchema = z.object({
  to: z.string().min(1, { message: "user is required" }),
  balance: z.number().min(0, { message: "balance is required" }),
});
