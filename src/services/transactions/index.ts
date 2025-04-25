import { getValidToken } from '@/lib/verifyToken'
import { updateListingItem } from '../listings'

// export const addListingItem = async (
//   transactionData: Record<string, any>,
// ): Promise<any> => {
//   console.log('transactionData ', transactionData)
//   try {
//     const token = await getValidToken()
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_API}/transactions`,
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(transactionData),
//         credentials: 'include',
//       },
//     )
//     const data = await res.json()
//     if (!res.ok) {
//       throw new Error(data.message || 'Failed to create transaction')
//     }

//     return { ok: true, data }
//   } catch (error: any) {
//     return Error(error)
//   }
// }




import { TransactionData, TransactionResponse } from '@/types/transactions/transactions'

// Use Set instead of WeakMap for more reliable tracking
const processedTransactions = new Set<string>()

export const addListingItem = async (
  transactionData: TransactionData
): Promise<TransactionResponse> => {
  if (processedTransactions.has(transactionData.transactionId)) {
    return { ok: false, error: 'Transaction already processed' }
  }

  try {
    processedTransactions.add(transactionData.transactionId)
    
    const token = await getValidToken()
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/transactions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...transactionData,
          createdAt: new Date().toISOString(),
          status: 'pending'
        }),
        credentials: 'include',
      }
    )

    const data = await res.json()
    
    if (!res.ok) {
      processedTransactions.delete(transactionData.transactionId)
      throw new Error(data.message || 'Failed to create transaction')
    }

    return { ok: true, data }
  } catch (error) {
    processedTransactions.delete(transactionData.transactionId)
    return {
      ok: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}
// services/transactionService.ts

export const updateTransactionStatus = async (
  transactionId: string,
  status: 'pending' | 'completed',
): Promise<any> => {
  try {
    const token = await getValidToken()
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/transactions/${transactionId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      },
    )

    return res.json()
  } catch (error: any) {
    console.error('Failed to update transaction status:', error)
    return Error(error)
  }
}

export const markItemAsSold = async (
  itemId: string,
  onSuccess?: () => void,
  onError?: (error: unknown) => void,
) => {
  try {
    await updateListingItem(itemId, { status: 'sold' })
    onSuccess?.()
  } catch (error) {
    onError?.(error)
  }
}
