import { ListingCategory, ListingCondition, ListingLocation, ListingStatus } from "@/types/listings/listing";


export const categoriesArray: ListingCategory[] = [
  ListingCategory.Electronics,
  ListingCategory.Mobile,
  ListingCategory.Computers,
  ListingCategory.Appliances,
  ListingCategory.Furniture,
  ListingCategory.Clothing,
  ListingCategory.Footwear,
  ListingCategory.Accessories,
  ListingCategory.Vehicles,
  ListingCategory.Books,
  ListingCategory.Sports,
  ListingCategory.Toys,
  ListingCategory.Health,
  ListingCategory.Beauty,
  ListingCategory.Jewelry,
  ListingCategory.Tools,
  ListingCategory.Gardening,
  ListingCategory.MusicalInstruments,
  ListingCategory.OfficeSupplies,
  ListingCategory.PetSupplies,
  ListingCategory.BabyProducts,
  ListingCategory.ArtCollectibles,
  ListingCategory.Gaming,
  ListingCategory.Cameras,
  ListingCategory.RealEstate,
  ListingCategory.Other,
];

export const conditionArray: ListingCondition[] = [
  ListingCondition.EXCELLENT,
  ListingCondition.GOOD,
  ListingCondition.FAIR,
  ListingCondition.POOR
]

export const statusArray: ListingStatus[] = [
  ListingStatus.AVAILABLE,
  ListingStatus.SOLD
]

export const locationArray: ListingLocation[] = [
  ListingLocation.BARISAL,
  ListingLocation.CHATTOGRAM,
  ListingLocation.DHAKA,
  ListingLocation.KHULNA,
  ListingLocation.MYMENSINGH,
  ListingLocation.RAJSHAHI,
  ListingLocation.RANGPUR,
  ListingLocation.SYLHET,
  ListingLocation.OTHER,
]