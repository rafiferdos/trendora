'use client'

import { useUser } from '@/context/UserContext'
import { useWishlist } from '@/context/WishLists.context'
import Link from 'next/link'

import { useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import { toast } from 'sonner'

interface Listing {
  id?: string
  _id?: string
  title: string
  description: string
  price: number
  condition: string
  category: string
  images?: string[]
  userID?: string
  status?: 'available' | 'sold'
}

const WishlistPage = () => {
  const { wishlist, removeWishlist } = useWishlist()
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [listings, setListings] = useState<Listing[]>([])
  const [filteredListings, setFilteredListings] = useState<Listing[]>([])
  const { token, user } = useUser()
  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        // Log the full URL being called
        const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API}/listings`
        console.log('Fetching from:', apiUrl)

        const listingsResponse = await fetch(apiUrl, {
          cache: 'no-store',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!listingsResponse.ok) {
          const errorData = await listingsResponse.text()
          console.error('Response not ok:', listingsResponse.status, errorData)
          throw new Error(`HTTP error! status: ${listingsResponse.status}`)
        }

        const listingsData = await listingsResponse.json()
        console.log('Received data structure:', listingsData)

        if (!listingsData.data || !Array.isArray(listingsData.data)) {
          console.error('Invalid data structure:', listingsData)
          throw new Error('Invalid data format received')
        }

        setListings(listingsData.data)
      } catch (error) {
        console.error('Detailed fetch error:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (listings.length && wishlist.length) {
      const wishlistListings = listings.filter((listing: any) =>
        wishlist.includes(listing._id.toString()),
      )
      setFilteredListings(wishlistListings)
      setProducts(wishlistListings)
      console.log('Filtered wishlist:', wishlistListings)
    }
  }, [listings, wishlist])

  const handleRemove = async (id: string) => {
    try {
      removeWishlist(id)
      toast.success('Item removed from wishlist!')
    } catch (error) {
      console.error('Error removing item:', error)
      toast.error('Failed to remove item from wishlist')
    }
  }

  if (loading) return <div>Loading...</div>
  if (!wishlist.length || !products.length)
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <p className="text-lg text-red-500">
          You don’t have any wishlist items right now.
        </p>
      </div>
    )

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Wishlist</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Image</th>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Details</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Seller</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product: any, index: number) => (
              <tr key={product?._id} className="border-b border-gray-200">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">
                  {product?.images?.[0] ? (
                    <img
                      src={product?.images[0]}
                      alt={product?.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                </td>
                <td className="px-4 py-2">{product?.title}</td>
                {/* <td className="px-4 py-2">{product?.description}</td> */}
                <td className="px-4 py-2">
                  {product?.description?.slice(0, 50)}...
                </td>
                <td className="px-4 py-2">${product?.price}</td>
                <td className="px-4 py-2">{product?.category}</td>
                <td
                  className={`px-4 py-2 font-semibold ${product?.status === 'sold'
                      ? 'text-red-500'
                      : product?.status === 'available'
                        ? 'text-green-500'
                        : ''
                    }`}
                >
                  {product?.status}
                </td>
                <td className="px-4 py-2">{product?.userID?.name}</td>
                <td className="px-4 py-2 ">
                  <button
                    onClick={() => handleRemove(product?._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash className="inline-block" />
                  </button>
                  {/* <Link href={`/product/${product?._id}`}></Link> */}
                  <button className="ml-4 rounded-lg px-3 py-1.5 bg-violet-700 text-sm font-medium text-white  transition-all">
                    <Link href={`/product/${product?._id}`} className="...">
                      View
                    </Link>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default WishlistPage
