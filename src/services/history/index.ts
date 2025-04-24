import { getValidToken } from "@/lib/verifyToken";
import { ApiResponse, TListing } from "@/types/listings/listing";

export const getSellsHistory = async (id: string): Promise<ApiResponse<TListing>> => {
    const token = await getValidToken()
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/sales/${id}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.json();
};


export const getPurchaseHistory = async (id: string): Promise<ApiResponse<TListing>> => {
    const token = await getValidToken()
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/purchases/${id}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.json();
};