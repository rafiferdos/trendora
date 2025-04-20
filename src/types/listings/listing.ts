

export enum ListingCondition {
  EXCELLENT = "excellent",
  GOOD = "good",
  FAIR = "fair",
  POOR = "poor",
}

export enum ListingStatus {
  AVAILABLE = "available",
  SOLD = "sold",
}

export enum ListingCategory {
  Electronics = "electronics",
  Mobile = "mobile",
  Computers = "computers",
  Appliances = "appliances",
  Furniture = "furniture",
  Clothing = "clothing",
  Footwear = "footwear",
  Accessories = "accessories",
  Vehicles = "vehicles",
  Books = "books",
  Sports = "sports",
  Toys = "toys",
  Health = "health",
  Beauty = "beauty",
  Jewelry = "jewelry",
  Tools = "tools",
  Gardening = "gardening",
  MusicalInstruments = "musicalinstruments",
  OfficeSupplies = "officesupplies",
  PetSupplies = "petsupplies",
  BabyProducts = "babyproducts",
  ArtCollectibles = "artcollectibles",
  Gaming = "gaming",
  Cameras = "cameras",
  RealEstate = "realestate",
  Other = "other",
}

export enum ListingLocation {
  DHAKA = "Dhaka",
  CHATTOGRAM = "Chattogram",
  RAJSHAHI = "Rajshahi",
  KHULNA = "Khulna",
  BARISAL = "Barisal",
  SYLHET = "Sylhet",
  RANGPUR = "Rangpur",
  MYMENSINGH = "Mymensingh",
  OTHER = "Other",
}

// ==================== LISTING TYPES ====================
// export interface IListing  {
//   title: string;
//   description: string;
//   price: number;
//   condition: ListingCondition;
//   images: string[];
//   userID: object;
//   status?: ListingStatus;
//   isDeleted?: boolean;
//   category: ListingCategory;
//   location: ListingLocation;
//   customLocation?: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

// export type TListing = Omit<
//   IListing,
//   "createdAt" | "updatedAt" | "status" | "userID"
// >;

export type TListing= {
  id: string;
  images: string[];       // Array of image URLs
  title: string;
  price: number;
  category: string;
  condition: string;
  location: string;
  status: string;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};
