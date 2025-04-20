/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
export const registerUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );
    const result = await res.json();
    if ((await cookies()).set("accessToken", result.data.accessToken))
      return result;
  } catch (error: any) {
    Error(error);
  }
};
export const loginUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const result = await res.json();
    if ((await cookies()).set("accessToken", result.data.accessToken))
      return result;
  } catch (error: any) {
    Error(error);
  }
};

// Import js-cookie for cookie management

export const getCurrentUser = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  let decodedData = null;
  if (accessToken) {
    decodedData = await jwtDecode(accessToken);
    return decodedData;
  } else {
    return null;
  }
};

export const getNewAccessToken = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/refresh-token`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res.json();
  } catch (error: any) {
    console.error("Error refreshing token:", error.message);
    return null;
  }
};

export const getCurrentUserInfo = async () => {
  try {
    const user = await getCurrentUser();

    // If user is not logged in, just return null
    if (!user?.userId) {
      return null;
    }

    const accessToken = (await cookies()).get("accessToken")?.value;
    if (!accessToken) {
      return null;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/users/${user.userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch user info");
    }

    return await res.json();
  } catch (error: any) {
    console.error("Error fetching user info:", error.message);
    return null;
  }
};

// export const getCurrentUserInfo = async () => {
//   try {
//     let accessToken = (await cookies()).get("accessToken")?.value;

//     const user = accessToken ? await getCurrentUser() : null;

//     if (!user?.userId) {
//       // If no userId, try refreshing token
//       accessToken = await getNewAccessToken();

//       if (!accessToken) {
//         return null;
//       }
//     }

//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_API}/users/${user?.userId}`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${accessToken}`,
//         },
//         cache: "no-store",
//       }
//     );

//     if (!res.ok) {
//       throw new Error("Failed to fetch user info");
//     }

//     return await res.json();
//   } catch (error: any) {
//     console.error("Error fetching user info:", error.message);
//     return null;
//   }
// };

export const logout = async () => {
  (await cookies()).delete("accessToken");
};
