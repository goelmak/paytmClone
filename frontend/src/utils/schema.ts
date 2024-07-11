import { z } from "zod";

const userSchema = z.object({
  username: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  firstName: z.string().min(1, { message: "This is a required field" }),
  lastName: z.string(),
  password: z.string().min(1, { message: "This is a required field" }),
});

export { userSchema };
