"use server"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getValidToken } from "@/lib/verifyToken";
import { ApiResponse, TListing } from "@/types/listings/listing";
import { revalidateTag } from "next/cache";




export async function getListings(): Promise<ApiResponse<TListing[]>> {
  const token = await getValidToken()
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/listings`, {
    next: {
      tags: ["LISTINGS"],
    },
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return res.json();
}

// single fetch data by id
export const getSingleListing = async (id: string): Promise<ApiResponse<TListing>> => {
  const token = await getValidToken()
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/listings/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });
  return res.json();
};


//Add Listing - sends raw JSON
export const addListingItem = async (listingData: Record<string, any>): Promise<any> => {
  
  try {
    const token = await getValidToken()
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/listings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, 
      },
      body: JSON.stringify(listingData),
    });
    revalidateTag("LISTINGS");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
//Update Listing - 
export const updateListingItem = async (
  id: string,
  updatedData: Partial<TListing>
): Promise<any> => {
  try {
    const token = await getValidToken()
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/listings/${id}`, {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    });
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};


//for the delete service
export const deleteListingItem = async (id: string): Promise<any> => {
  try {
    const token = await getValidToken()
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/listings/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    revalidateTag("LISTINGS");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
