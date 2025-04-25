export interface TransactionData {
  itemID: string;
  sellerID: string;
  transactionId: string;
  orderDetails: {
    address: string;
    phone: string;
    division: string;
    district: string;
    thana: string;
    total: string;
    product: {
      title: string;
      price: number;
      image: string;
      condition: string;
      category: string;
    };
  };
}

export interface TransactionResponse {
  ok: boolean;
  data?: any;
  error?: string;
}