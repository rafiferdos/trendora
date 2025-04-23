import { getValidToken } from "@/lib/verifyToken";


export const addListingItem = async (transactionData: Record<string, any>): Promise<any> => {
  console.log("transactionData ", transactionData)
  try {
    const token = await getValidToken()
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, 
      },
      body: JSON.stringify(transactionData),
       credentials: 'include'
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Failed to create transaction');
    }

    return { ok: true, data };
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};