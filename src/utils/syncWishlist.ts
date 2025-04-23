// utils/syncWishlist.ts

import { TLocalWishlistItem } from './localStorage'

export const syncWishlistToDB = async (
  accessToken: string,
  wishlist: TLocalWishlistItem[],
) => {

  try {
    // Loop through each item in the wishlist
    for (const item of wishlist) {
        console.log(item)
      // Send a POST request to the backend to add the item to the user's wishlist
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/wishlists`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`, // Sending the token for authentication
        },
        body: JSON.stringify({
          listing: item.listingId, // Ensure that listingId is a string
        }),
      })
    }

    // After syncing, clear the local storage
    localStorage.removeItem('wishlist')
  } catch (error) {
    console.error('Failed to sync wishlist', error)
  }
}
