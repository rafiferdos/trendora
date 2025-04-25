'use client'
import ListingForm from '@/components/modules/dashboard/listing/addToListing/ListingForm'
import { getSingleListing } from '@/services/listings'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FieldValues } from 'react-hook-form'
import Skeleton from 'react-loading-skeleton'
import { toast } from 'sonner'

const ListingEditPage = () => {
  const { listingId }: { listingId: string } = useParams()

  const [listingData, setListingData] = useState<Partial<FieldValues>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const listingData = await getSingleListing(listingId)
        if (listingData.success) {
          setListingData(listingData?.data)
        } else {
          toast.error(listingData?.message)
        }
      } catch (error) {
        console.error(error)
        toast.error('Something went wrong!')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [listingId])

  if (loading) {
    return (
      <div className="space-y-2 text-center flex justify-center items-center">
        <p className="text-muted-foreground text-sm">Loading The listing...</p>
        <Skeleton
          count={10}
          height={10}
          borderRadius="0.5rem"
          highlightColor="#e0e0e0"
        />
      </div>
    )
  }

  return (
    listingData && (
      <div className="flex justify-center items-center py-24">
        <ListingForm initialData={listingData} isEditMode />
      </div>
    )
  )
}

export default ListingEditPage
