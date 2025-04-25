
import { getValidToken } from "@/lib/verifyToken";
import {  TUserInfo } from "@/types"; // adjust this path as needed
import { ApiResponse } from "@/types/listings/listing";
import { revalidateTag } from "next/cache";

const BASE_API = process.env.NEXT_PUBLIC_BASE_API;

export const getUser = async (userId: string): Promise<any> => {
  const token = await getValidToken()
  const res = await fetch(`${BASE_API}/users/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch user: ${res.statusText}`);
  }

  return res.json();
};

// export const getAllUsers = async (): Promise<IUser[]> => {
//   const res = await fetch(`${BASE_API}/user`, {
//     method: "GET",
//     headers: { "Content-Type": "application/json" },
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch users");
//   }

//   return res.json();
// };

export const updateUser = async (
  id: string,
  updates: Partial<TUserInfo>
): Promise<any> => {
  const token = await getValidToken()
  const res = await fetch(`${BASE_API}/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(updates),
  });
  
  if (!res.ok) {
    throw new Error("Failed to update user");
  }

  return res.json();
};
