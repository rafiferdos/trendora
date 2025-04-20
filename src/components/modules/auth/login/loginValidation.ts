import { z } from "zod";

export const loginSchema = z.object({
  identifier: z
    .string({ required_error: "Email or phone is required!" })
    .refine(
      (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || /^\d{11}$/.test(val),
      {
        message: "Must be a valid email or phone number (11 digits)",
      }
    ),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be at least 8 characters"),
});
