"use server"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiResponse, TListing } from "@/types/listings/listing";
import { revalidateTag } from "next/cache";



export async function getListings(): Promise<ApiResponse<TListing[]>> {
  const res = await fetch("http://localhost:5000/api/v1/listings", {
    next: {
      tags: ["LISTINGS"],
    },
  });
// console.log(await res.json());
  if (!res.ok) {
    throw new Error("Failed to fetch listings");
  }

  return res.json();
}

//Add Listing - sends raw JSON
export const addListingItem = async (listingData: Record<string, any>): Promise<any> => {
  try {
    const res = await fetch(`http://localhost:5000/api/v1/listings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: (await cookies()).get("accessToken")!.value, // if needed
      },
      body: JSON.stringify(listingData),
    });

    revalidateTag("LISTINGS");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

//for the delete service
export const deleteListingItem = async (id: string): Promise<any> => {
  try {
    const res = await fetch(`http://localhost:5000/api/v1/listings/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-user-id": "test-user-123",    // mocked userId
        "x-user-role": "user",           // or "admin" if you want admin permissions
      },
    });

    revalidateTag("LISTINGS");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
