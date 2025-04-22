import { ListingCategory, ListingCondition, ListingLocation, ListingStatus } from "@/types/listings/listing";
import * as z from "zod";

const baseListingSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  price: z.preprocess(
    (val) => (val !== undefined && val !== null ? Number(val) : undefined),
    z.number({ invalid_type_error: "Price must be a number" })
      .positive("Price must be a positive number")
  ) as z.ZodType<number | undefined, any, any>,
  condition: z.nativeEnum(ListingCondition),
  images: z
    .array(
      z.object({
        value: z.string().url("Invalid image URL"),
      })
    )
    .min(1, "At least one image is required"),
  status: z.nativeEnum(ListingStatus).optional().default(ListingStatus.AVAILABLE),
  category: z.nativeEnum(ListingCategory),
  location: z.nativeEnum(ListingLocation),
  customLocation: z.string().max(100).optional(),
});

export const createListingSchema = baseListingSchema.refine(
  (data) => data.location !== "Other" || !!data.customLocation,
  {
    message: "Custom location is required when 'Other' is selected",
    path: ["customLocation"],
  }
);



export const editListingSchema = baseListingSchema.partial().refine(
  (data) => {
    if (data.location === "Other") {
      return !!data.customLocation;
    }
    return true;
  },
  {
    message: "Custom location is required when 'Other' is selected",
    path: ["customLocation"],
  }
);
