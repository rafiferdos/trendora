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
  console.log('wishlist:', wishlist)
  // Load wishlist from backend or localStorage
  useEffect(() => {
    const fetchWishlist = async () => {
      if (token) {
        setWishlistLoading(true) // start loading

        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/wishlists`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )
          if (!res.ok) throw new Error('Failed to fetch wishlist')
          const data = await res.json()
          const wishlistIds =
            data?.data?.map((item: any) => item.listing._id) || [] // extract only the IDs
          setWishlistState(wishlistIds) // store only the IDs
        } catch (error) {
          console.error('Failed to fetch wishlist from backend:', error)
        } finally {
          setWishlistLoading(false) // finish loading
        }
      } else {
        const stored = localStorage.getItem('wishlist')
        if (stored) setWishlistState(JSON.parse(stored))
        setWishlistLoading(false)
      }
    }

    fetchWishlist()
  }, [user])

  // Save to localStorage for guests
  useEffect(() => {
    if (!token) {
      localStorage.setItem('wishlist', JSON.stringify(wishlist))
    }
  }, [wishlist, user])

  const toggleWishlist = async (id: string) => {
    if (wishlistLoading) return // ❌ Don't do anything until loaded

    const isInWishlist = wishlist.includes(id)

    if (token) {
      try {
        if (isInWishlist) {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/wishlists/${id}`,
            {
              method: 'DELETE',
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )
          if (!res.ok) throw new Error('Failed to remove from wishlist')
          toast.success('Removed from Wishlist!')
        } else {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/wishlists`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ listing: id }),
            },
          )
          if (!res.ok) throw new Error('Failed to add to wishlist')

          toast.success('Added to Wishlist!')
        }

        setWishlistState((prev) =>
          isInWishlist ? prev.filter((item) => item !== id) : [...prev, id],
        )
      } catch (error) {
        console.error('Wishlist update error:', error)
      }
    } else {
      setWishlistState((prev) =>
        isInWishlist ? prev.filter((item) => item !== id) : [...prev, id],
      )
    }
  }

  const removeWishlist = async (id: string) => {
    if (token) {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API}/wishlists/${id}`,
          {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )

        if (!res.ok) throw new Error('Failed to remove from wishlist')

        setWishlistState((prev) => prev.filter((item) => item !== id))
      } catch (error) {
        console.error('Wishlist remove error:', error)
      }
    } else {
      setWishlistState((prev) => prev.filter((item) => item !== id))
    }
  }

  const isWishlisted = (id: string) => wishlist.includes(id)

  const clearWishlist = () => {
    setWishlistState([])
    if (!user?.accessToken) localStorage.removeItem('wishlist')
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
