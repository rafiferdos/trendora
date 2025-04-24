export type SalesHistoryResponse = {
    success: boolean;
    message: string;
    data: {
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPage: number;
        };
        result: Sale[];
    };
};

export type Sale = {
    _id: string;
    buyerID: User;
    sellerID: User;
    itemID: Item;
    status: "pending" | "completed" | string;
    createdAt: string;
    updatedAt: string;
    __v: number;
};

export type User = {
    _id: string;
    name: string;
    email: string;
    role: string;
};

export type Item = {
    _id: string;
    title: string;
    description: string;
    price: number;
    condition: string;
    images: string[];
    userID: string;
    status: string;
    category: string;
    location: string;
    customLocation: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
};
