"use client";

import {  useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

import { DataTable } from "@/components/modules/dashboard/listing/dataTable/DataTable";
import { getListings } from "@/services/listings";
import { TListing } from "@/types/listings/listing";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { getCurrentUser } from "@/services/AuthService";
import { getColumns } from "@/components/modules/dashboard/listing/columns/Columns";



export default function DashboardPage() {
  const [data, setData] = useState<TListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, serError] = useState('')
  const [role, setRole] = useState('')

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { role, userId } = await getCurrentUser();

        const listings = await getListings()

        if (!listings?.success) {
          return serError(listings?.message)
        }
        if (role === "admin") {
          setRole(role)
          return setData(listings?.data)
        } 
        const data = listings?.data.filter((item) => (item.userID?._id).toString() === userId.toString())
        setData(data)
        
      } catch (error) {
        console.error("Error fetching listings", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-2 flex justify-center items-center">
        <p className="text-muted-foreground text-3xl">
          Listings are loading.....
        </p>
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
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">
          {role === "admin" ? "All" : "Your"} Listings : Mr/s{' '}
          {role === 'admin' ? 'Admin' : data[0].userID?.name}
        </h2>
        {role === 'admin' ? (
          ''
        ) : (
          <Link href="/dashboard/user/listings/create-listing">
            <Button className="cursor-pointer">
              <Plus className="mr-2 h-4 w-4" />
              Create Listings
            </Button>
          </Link>
        )}
      </div>

      <div>
        <DataTable
          columns={getColumns({
            role,
            onDeleteSuccess: (id: string) => {
              setData((prev) => prev.filter((item) => item._id !== id))
            },
          })}
          data={data}
          error={error}
        />
      </div>
    </div>
  )
}
