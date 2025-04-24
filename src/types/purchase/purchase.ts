export type PurchaseHistoryResponse = {
    success: boolean;
    message: string;
    data: {
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPage: number;
        };
        result: PurchaseItem[];
    };
};

export type PurchaseItem = {
    _id: string;
    buyerID: User;
    sellerID: User;
    itemID: Item;
    status: 'pending' | 'completed' | 'cancelled'; // Extend status types as needed
    createdAt: string;
    updatedAt: string;
    __v: number;
};

export type User = {
    _id: string;
    name: string;
    email: string;
    role: 'user' | 'admin'; // Extend roles if necessary
};

export type Item = {
    _id: string;
    title: string;
    description: string;
    price: number;
    condition: string;
    images: string[];
    userID: string;
    status: 'available' | 'sold' | 'reserved'; // Extend as needed
    category: string;
    location: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
};
