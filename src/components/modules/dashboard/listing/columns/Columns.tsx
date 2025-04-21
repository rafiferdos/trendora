// columns.tsx

import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Pencil, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { TListing } from '@/types/listings/listing'
import { ImageWithLoader } from './ImageWithLoader'
import { deleteListingItem } from '@/services/listings'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog'
import { toast } from 'sonner'

type Props = {
  onDeleteSuccess: (id: string) => void
}

export const getColumns = ({ onDeleteSuccess }: Props): ColumnDef<TListing>[] => [
  {
    id: 'serial',
    header: 'SL',
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: 'images',
    header: 'Image',
    cell: ({ row }) => {
      const imageArray = row.original.images
      const imageUrl = imageArray?.[0]
      return <ImageWithLoader src={imageUrl} />
    },
  },
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'price',
    header: 'Price ($)',
    cell: ({ row }) => `$${row.getValue('price')}`,
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'condition',
    header: 'Condition',
  },
  {
    accessorKey: 'location',
    header: 'Location',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const listing = row.original

      return (
        <div className="flex items-center gap-2">
          {/* Edit Button */}
          <Link href={`/dashboard/listings/edit/${listing._id}`}>
            <Button variant="outline" size="icon">
              <Pencil className="h-4 w-4" />
            </Button>
          </Link>

          {/* Delete Button with Modal */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="icon">
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Listing</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this listing? This action
                  cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={async () => {
                    try {
                      await deleteListingItem(listing._id)
                      toast.success('Listing deleted successfully!')
                      onDeleteSuccess(listing._id)
                    } catch (error) {
                      toast.error('Failed to delete listing.')
                      console.error(error)
                    }
                  }}
                >
                  Confirm
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )
    },
  },
]
