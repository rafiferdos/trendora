const LOCAL_WISHLIST_KEY = 'wishlist'

export type TLocalWishlistItem = {
  listingId: string
}

export const getLocalWishlist = (): TLocalWishlistItem[] => {
  if (typeof window === 'undefined') return []
  const stored = localStorage.getItem(LOCAL_WISHLIST_KEY)
  return stored ? JSON.parse(stored) : []
}

export const addToLocalWishlist = (product: TLocalWishlistItem) => {
  const wishlist = getLocalWishlist()
  const isExist = wishlist.find((item) => item.listingId === product.listingId)

  if (!isExist) {
    wishlist.push(product)
    localStorage.setItem(LOCAL_WISHLIST_KEY, JSON.stringify(wishlist))
  }
}

export const removeFromLocalWishlist = (listingId: string) => {
  const wishlist = getLocalWishlist().filter(
    (item) => item.listingId !== listingId,
  )
  localStorage.setItem(LOCAL_WISHLIST_KEY, JSON.stringify(wishlist))
}

export const isInLocalWishlist = (listingId: string): boolean => {
  return getLocalWishlist().some((item) => item.listingId === listingId)
}

export const clearLocalWishlist = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(LOCAL_WISHLIST_KEY)
  }
}
