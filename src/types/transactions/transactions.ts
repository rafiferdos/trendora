export type TransactionData =  {
    _id: string;
    buyerID: string;
    sellerID: string;
//     itemID: string;
//     status: 'pending' | 'completed' |  string; // extend as needed
//     createdAt: string; // ISO date string
//     updatedAt: string; // ISO date string
//   }
}
  export type ApiResponse<T> = {
    success: boolean
    message: string
    data: T
  }