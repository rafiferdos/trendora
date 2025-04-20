import { z } from "zod";

export const registrationSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(2, "Name must be between 2 and 50 characters")
    .max(50, "Name must be between 2 and 50 characters"),
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
  passwordConfirm: z
    .string({ required_error: "Password Confirmation is required" })
    .min(1),
});
