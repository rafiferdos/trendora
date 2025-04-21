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
import { getCurrentUser, getCurrentUserInfo } from "@/services/AuthService";
import { getColumns } from "@/components/modules/dashboard/listing/columns/Columns";
import { useUser } from "@/context/UserContext";


export default function DashboardPage() {
  const [data, setData] = useState<TListing[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { role, userId } = await getCurrentUser();
      
        const listings = await getListings()

        if (role === "admin" && listings?.success) {
          setData(listings?.data)
        } else if (role === "user" && listings?.success) {
          const data = listings?.data.filter((item) => {
            const Id = item.userID?._id
            return Id.toString() === userId.toString();
          })
          setData(data)
        }
      } catch (error) {
        console.error("Error fetching listings", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Your Listings</h2>
        <Link href="/user/dashboard/listings/create-listing">
          <Button className="cursor-pointer">
            <Plus className="mr-2 h-4 w-4" />
            Create Listings
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="space-y-2">
          <p className="text-muted-foreground text-sm">
            Loading your listings...
          </p>
          <Skeleton
            count={10}
            height={10}
            borderRadius="0.5rem"
            highlightColor="#e0e0e0"
          />
        </div>
      ) : (
        <DataTable
          columns={getColumns({
            onDeleteSuccess: (id: string) => {
              setData((prev) => prev.filter((item) => item._id !== id))
            },
          })}
          data={data}
        />
      )}
    </div>
  )
}
