import { z } from "zod";

export const userSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().optional(),
  password: z.string().min(1, { message: "Password is required" }),
});

export const partialUserSchema = userSchema.partial();
