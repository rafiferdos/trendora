import * as z from "zod";

export const listingSchema = z.object({
  title: z.string().min(1, "Title is required"),
  price: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Price must be a number",
  }),
  category: z.string().min(1, "Category is required"),
  condition: z.string().min(1, "Condition is required"),
  location: z.string().min(1, "Location is required"),
  customLocation: z.string().optional(),
  description: z.string().min(10, "Description must be at least 10 characters"),
  images: z
    .array(z.object({ value: z.string().url("Invalid image URL") }))
    .min(1, "At least one image is required"),
  status: z.string().optional(),
});
