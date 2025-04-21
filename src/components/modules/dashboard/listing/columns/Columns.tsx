import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Loader2, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { TListing } from "@/types/listings/listing";
import { ImageWithLoader } from "./ImageWithLoader";


export const columns: ColumnDef<TListing>[] = [
  {
    id: "serial",
    header: "SL",
    cell: ({ row }) => row.index + 1,
  },
  {
  accessorKey: "images",
  header: "Image",
  cell: ({ row }) => {
    const imageArray = row.original.images;
    const imageUrl = imageArray?.[0]; // Get the first image only

    if (!imageUrl) {
      return <Loader2 className="w-4 h-4 animate-spin text-gray-400" />;
    }

    return <ImageWithLoader src={imageUrl} />;
  },
},
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "price",
    header: "Price ($)",
    cell: ({ row }) => `$${row.getValue("price")}`,
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "condition",
    header: "Condition",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const listing = row.original;

      return (
        <div className="flex gap-2">
          <Link href={`/dashboard/edit/${listing.id}`}>
            <Button variant="outline" size="icon" className="cursor-pointer">
              <Pencil className="h-4 w-4" />
            </Button>
          </Link>
          <Button
            className="cursor-pointer"
            variant="destructive"
            size="icon"
            onClick={() => {
              console.log("Delete listing:", listing.id);
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];
