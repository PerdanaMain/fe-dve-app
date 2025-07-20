import { z } from "zod";

export const registerSchema = z
  .object({
    fullname: z.string().min(5),
    username: z.string().min(6),
    password: z.string().min(5),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "password do not match!",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});
