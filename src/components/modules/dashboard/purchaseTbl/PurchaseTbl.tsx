import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { TOrder, TOrderStatus } from "@/types";

type Props = {
    orders: TOrder[];
};

const OrderTbl = ({ orders }: Props) => {
    const getOrderStatusClasses = (status: TOrderStatus) => {
        switch (status) {
            case "Pending":
                return "bg-yellow-100 text-yellow-800";
            case "Paid":
                return "bg-blue-100 text-blue-800";
            case "Shipped":
                return "bg-purple-100 text-purple-800";
            case "Completed":
                return "bg-green-100 text-green-800";
            case "Cancelled":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };



    return (
        <div className="border rounded-lg overflow-hidden">
            <Table className="min-w-full">
                <TableHeader className="bg-gray-800">
                    <TableRow>
                        <TableHead className="px-4 py-3 text-white">SL Number</TableHead>
                        <TableHead className="px-4 py-3 text-white">Order ID</TableHead>
                        <TableHead className="px-4 py-3 text-white">Name</TableHead>
                        <TableHead className="px-4 py-3 text-white">Products</TableHead>
                        <TableHead className="px-4 py-3 text-white">Items</TableHead>
                        <TableHead className="px-4 py-3 text-white">Date</TableHead>
                        <TableHead className="px-4 py-3 text-white">Status</TableHead>
                        <TableHead className="px-4 py-3 text-right text-white">
                            Amount
                        </TableHead>
                    </TableRow>
                </TableHeader>

                {/* End Table Header */}

                <TableBody>
                    {orders.map((order, index) => (
                        <TableRow key={order._id}>
                            <TableCell className="px-4 py-3 font-medium">
                                {index + 1}
                            </TableCell>

                            <TableCell className="px-4 py-3 font-medium">
                                {order?.transaction?.id}
                            </TableCell>

                            <TableCell className="px-4 py-3">
                                <div className="flex flex-col">
                                    <span className="font-medium">{order?.userId?.name}</span>

                                    <span className="text-sm text-gray-500">
                                        {order?.userId?.email}
                                    </span>
                                </div>
                            </TableCell>

                            <TableCell className="px-4 py-3">
                                <div className="flex flex-col space-y-2">
                                    {order?.products?.map((product) => (

                                        <div
                                            key={product?._id}
                                            className="flex items-center space-x-2"
                                        >
                                            <div className="relative h-10 w-10">
                                                <img
                                                    src={product?.productId?.image}
                                                    alt={product?.productId?.name}
                                                    className="rounded-md object-cover h-full w-full"
                                                />

                                            </div>
                                            <span>{product?.productId?.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </TableCell>

                            <TableCell className="px-4 py-3">
                                {order?.products?.reduce(
                                    (total, product) => total + product.quantity,
                                    0
                                )}
                            </TableCell>

                            <TableCell className="px-4 py-3">
                                {formatDate(order?.createdAt)}
                            </TableCell>

                            <TableCell className="px-4 py-3 font-medium ">
                                <p
                                    className={`${getOrderStatusClasses(
                                        order.status
                                    )} w-20 text-center rounded-full py-0.5`}
                                >
                                    {order?.status}
                                </p>
                            </TableCell>

                            <TableCell className="px-4 py-3 text-right">
                                $ {order?.totalAmount?.toFixed(2)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default OrderTbl;
