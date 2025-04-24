'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useUser } from '@/context/UserContext'
import { toast } from 'sonner'

type WishlistContextType = {
  wishlist: string[]
  toggleWishlist: (id: string) => void
  isWishlisted: (id: string) => boolean
  removeWishlist: (id: string) => void
  clearWishlist: () => void
  setWishlist: (items: string[]) => void
}

const WishlistContext = createContext<WishlistContextType | null>(null)

export const WishlistProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [wishlist, setWishlistState] = useState<string[]>([])
  const [wishlistLoading, setWishlistLoading] = useState(true)
  const { user, token } = useUser()

  // 🔄 Fetch wishlist depending on user login state
  useEffect(() => {
    const fetchWishlist = async () => {
      setWishlistLoading(true)
      try {
        if (!user) {
          const stored = localStorage.getItem('wishlist')
          if (stored) setWishlistState(JSON.parse(stored))
        }
        if (user) {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/wishlists`,
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          )

          const data = await res.json()
          const wishlistIds =
            data?.data?.map((item: any) => item.listing._id) || []
          setWishlistState(wishlistIds)
        }
      } catch (error) {
        console.error('Error fetching wishlist:', error)
      } finally {
        setWishlistLoading(false)
      }
    }

    fetchWishlist()
  }, [token])

  useEffect(() => {
    if (!token && wishlist.length > 0) {
      localStorage.setItem('wishlist', JSON.stringify(wishlist))
    }
  }, [wishlist, token])

  const toggleWishlist = async (id: string) => {
    if (wishlistLoading) return

    const isInWishlist = wishlist.includes(id)

    if (!token || !user) {
      // 🧑‍🚀 Guest logic
      const updated = isInWishlist
        ? wishlist.filter((item) => item !== id)
        : [...wishlist, id]
      setWishlistState(updated)

      localStorage.setItem('wishlist', JSON.stringify(updated))
      toast.success(
        isInWishlist ? 'Removed from Wishlist!' : 'Added to Wishlist!',
      )
      return
    }

    // 🛡️ Authenticated user logic
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/wishlists${isInWishlist ? `/${id}` : ''}`,
        {
          method: isInWishlist ? 'DELETE' : 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          ...(isInWishlist ? {} : { body: JSON.stringify({ listing: id }) }),
        },
      )

      if (!res.ok) throw new Error('Failed to update wishlist')
      toast.success(
        isInWishlist ? 'Removed from Wishlist!' : 'Added to Wishlist!',
      )

      setWishlistState((prev) =>
        isInWishlist ? prev.filter((item) => item !== id) : [...prev, id],
      )
    } catch (error) {
      console.error('Wishlist update error:', error)
    }
  }

  const removeWishlist = async (id: string) => {
    if (!token || !user) {
      // 🧑‍🚀 Guest logic
      const updated = wishlist.filter((item) => item !== id)
      setWishlistState(updated)
      localStorage.setItem('wishlist', JSON.stringify(updated))
      toast.success('Removed from Wishlist!')
      return
    }

    // 🛡️ Authenticated user logic
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/wishlists/${id}`,
        {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        },
      )

      if (!res.ok) throw new Error('Failed to remove from wishlist')

      setWishlistState((prev) => prev.filter((item) => item !== id))

      toast.success('Removed from Wishlist!')
    } catch (error) {
      console.error('Wishlist remove error:', error)
    }
  }

  const isWishlisted = (id: string) => wishlist.includes(id)

  const clearWishlist = () => {
    setWishlistState([]) // clear state
    localStorage.removeItem('wishlist') // clear localStorage
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        removeWishlist,
        isWishlisted,
        clearWishlist,
        setWishlist: setWishlistState,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used inside WishlistProvider')
  return ctx
}
