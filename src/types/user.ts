export type TUserInfo = {
  _id?: string
  name: string
  email?: string
  phone?: string
  imgUrl?: string
  role: 'user' | 'admin'
  isBlocked: boolean
  isDeleted: boolean
  createdAt?: string
  updatedAt?: string
  accessToken?: string; 
  data?: { name: string; email: string }
}

export type TUser = {
  exp?: number
  iat?: number
  role: 'user' | 'admin'
  userId: string
}

export type TOrder = {
  _id: string;
  userId: TUser; // previously was string; now proper type
  products: TOrderProduct[];
  totalAmount: number; // ensure this is not optional
  status: TOrderStatus;
  transaction: TTransaction;
  createdAt: string;
  updatedAt?: string;
}

// product entry in an order
export type TOrderProduct = {
  _id: string; // this is usually the order item ID
  productId: TProduct; // previously this was just string
  quantity: number;
};

export type TOrderStatus =
  | "Pending"
  | "Paid"
  | "Shipped"
  | "Completed"
  | "Cancelled";

export type TTransaction = {
  id: string;
  transactionStatus: string;
  bank_status: string;
  sp_code: string;
  sp_message: string;
  method: string;
  date_time: string;
};

// product type used inside order
export type TProduct = {
  _id: string;
  name: string;
  image: string;
};

